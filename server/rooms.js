import {cleanAvatar,safeText} from '../public/assets/core.js';
const LIVE=90000,TTL=8*3600000;
const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const error=(message,status=400)=>json({error:message},status);
async function hash(text){const bytes=new TextEncoder().encode(text);return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');}
function cookieValue(request){return request.headers.get('cookie')?.match(/(?:^|;\s*)asya_studio_session=([a-f0-9]{64})(?:;|$)/)?.[1];}
function newSecret(){const bytes=new Uint8Array(32);crypto.getRandomValues(bytes);return Array.from(bytes,x=>x.toString(16).padStart(2,'0')).join('');}
function code(){const nums=new Uint32Array(1);crypto.getRandomValues(nums);return String(100000+nums[0]%900000);}
async function readBody(request){if(Number(request.headers.get('content-length')||0)>5000)throw Error('Mesaj çok büyük.');const text=await request.text();if(text.length>5000)throw Error('Mesaj çok büyük.');const data=JSON.parse(text);if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Geçersiz istek.');return data;}
export async function handleRooms(request,env){
 const url=new URL(request.url),path=url.pathname.replace(/\/$/,'');if(!path.startsWith('/api/studio/'))return null;
 const origin=request.headers.get('origin');if(origin&&origin!==url.origin)return error('Bu istek stüdyodan gelmeli.',403);
 if(request.method==='OPTIONS')return new Response(null,{status:204});
 if(path==='/api/studio/session'&&request.method==='GET'){
  if(cookieValue(request))return json({ready:true});const secret=newSecret(),secure=url.protocol==='https:'?'; Secure':'';return json({ready:true},200,{'Set-Cookie':`asya_studio_session=${secret}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000${secure}`});
 }
 if(!env.DB)return error('Oda sunucusu hazırlanıyor. Biraz sonra tekrar dene.',503);
 const secret=cookieValue(request),client=request.headers.get('x-studio-client')||'';if(!secret||!/^[a-zA-Z0-9-]{10,80}$/.test(client))return error('Stüdyo oturumu başlatılmalı.',401);
 if(request.method!=='GET'&&request.headers.get('content-type')?.split(';')[0]!=='application/json')return error('Geçersiz istek biçimi.',415);
 const session=await hash(secret+':'+client),now=Date.now(),db=env.DB;
 try{
  if(path==='/api/studio/rooms'&&request.method==='POST'){
   const body=await readBody(request),nickname=safeText(body.nickname,20);if(!nickname)return error('Bir takma ad seç.');
   const count=await db.prepare('SELECT COUNT(*) AS total FROM dream_rooms WHERE creator=? AND created_at>?').bind(session,now-3600000).first();if(count.total>=10)return error('Bir saatte en fazla 10 oda açabilirsin.',429);
   const avatar=JSON.stringify(cleanAvatar(body.avatar));for(let attempt=0;attempt<4;attempt++){const roomCode=code(),player=crypto.randomUUID();try{await db.batch([
    db.prepare('DELETE FROM dream_players WHERE room_code IN (SELECT code FROM dream_rooms WHERE expires_at<?)').bind(now),
    db.prepare('DELETE FROM dream_messages WHERE room_code IN (SELECT code FROM dream_rooms WHERE expires_at<?)').bind(now),
    db.prepare('DELETE FROM dream_rooms WHERE expires_at<?').bind(now),
    db.prepare('INSERT INTO dream_rooms(code,creator,created_at,expires_at) VALUES(?,?,?,?)').bind(roomCode,session,now,now+TTL),
    db.prepare('INSERT INTO dream_players(id,room_code,session_hash,nickname,avatar,seen_at,joined_at) VALUES(?,?,?,?,?,?,?)').bind(player,roomCode,session,nickname,avatar,now,now)
   ]);return json({code:roomCode,playerId:player},201);}catch(e){if(!/unique|constraint/i.test(String(e)))throw e;}}return error('Oda oluşturulamadı. Tekrar dene.',503);
  }
  const match=path.match(/^\/api\/studio\/rooms\/(\d{6})(?:\/(join|presence|messages|leave))?$/);if(!match)return error('Böyle bir stüdyo yolu yok.',404);const roomCode=match[1],action=match[2];
  const room=await db.prepare('SELECT code,expires_at FROM dream_rooms WHERE code=? AND expires_at>?').bind(roomCode,now).first();if(!room)return error('Oda bulunamadı veya süresi doldu.',404);
  if(action==='join'&&request.method==='POST'){
   const body=await readBody(request),nickname=safeText(body.nickname,20);if(!nickname)return error('Bir takma ad seç.');
   const playerId=crypto.randomUUID();const result=await db.prepare('INSERT INTO dream_players(id,room_code,session_hash,nickname,avatar,seen_at,joined_at) SELECT ?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM dream_players WHERE room_code=? AND seen_at>?)<4 OR EXISTS(SELECT 1 FROM dream_players WHERE room_code=? AND session_hash=?) ON CONFLICT(room_code,session_hash) DO UPDATE SET nickname=excluded.nickname,avatar=excluded.avatar,seen_at=excluded.seen_at').bind(playerId,roomCode,session,nickname,JSON.stringify(cleanAvatar(body.avatar)),now,now,roomCode,now-LIVE,roomCode,session).run();
   if(!result.meta.changes)return error('Bu oda dolu. En fazla 4 kişi katılabilir.',409);const player=await db.prepare('SELECT id FROM dream_players WHERE room_code=? AND session_hash=?').bind(roomCode,session).first();return json({code:roomCode,playerId:player.id});
  }
  const player=await db.prepare('SELECT id,nickname,seen_at FROM dream_players WHERE room_code=? AND session_hash=?').bind(roomCode,session).first();if(!player||player.seen_at<now-LIVE)return error('Oturumun sona erdi. Odaya yeniden katıl.',401);
  if(!action&&request.method==='GET'){
   const [players,messages]=await db.batch([
    db.prepare('SELECT id,nickname,avatar FROM dream_players WHERE room_code=? AND seen_at>? ORDER BY joined_at LIMIT 4').bind(roomCode,now-LIVE),
    db.prepare('SELECT id,player_id,nickname,message,created_at FROM dream_messages WHERE room_code=? ORDER BY created_at DESC LIMIT 40').bind(roomCode)
   ]);return json({code:roomCode,playerId:player.id,players:players.results.map(p=>({session:p.id,nick:safeText(p.nickname,20),avatar:cleanAvatar(JSON.parse(p.avatar))})),messages:messages.results.reverse().map(m=>({id:m.id,nick:safeText(m.nickname,20),text:safeText(m.message,160),mine:m.player_id===player.id,ts:m.created_at}))});
  }
  if(action==='presence'&&request.method==='POST'){
   const body=await readBody(request);await db.prepare('UPDATE dream_players SET nickname=?,avatar=?,seen_at=? WHERE id=? AND session_hash=?').bind(safeText(body.nickname,20)||player.nickname,JSON.stringify(cleanAvatar(body.avatar)),now,player.id,session).run();return json({ok:true});
  }
  if(action==='messages'&&request.method==='POST'){
   const body=await readBody(request),message=safeText(body.text,160);if(!message)return error('Önce bir mesaj yaz.');const last=await db.prepare('SELECT created_at FROM dream_messages WHERE player_id=? ORDER BY created_at DESC LIMIT 1').bind(player.id).first();if(last&&now-last.created_at<900)return error('Bir saniye bekleyip tekrar gönder.',429);
   await db.batch([
    db.prepare('INSERT INTO dream_messages(id,room_code,player_id,nickname,message,created_at) VALUES(?,?,?,?,?,?)').bind(crypto.randomUUID(),roomCode,player.id,player.nickname,message,now),
    db.prepare('DELETE FROM dream_messages WHERE room_code=? AND id NOT IN (SELECT id FROM dream_messages WHERE room_code=? ORDER BY created_at DESC LIMIT 100)').bind(roomCode,roomCode),
    db.prepare('UPDATE dream_players SET seen_at=? WHERE id=?').bind(now,player.id)
   ]);return json({ok:true},201);
  }
  if(action==='leave'&&request.method==='POST'){await db.prepare('DELETE FROM dream_players WHERE id=? AND session_hash=?').bind(player.id,session).run();return json({ok:true});}
  return error('Bu işlem desteklenmiyor.',405);
 }catch(e){if(e instanceof SyntaxError||/Geçersiz|çok büyük/.test(String(e)))return error('Geçerli bir stüdyo isteği gönder.');console.error('Studio room request failed:',e?.message||String(e));return error('Stüdyo sunucusunda bir sorun oldu. Biraz sonra tekrar dene.',500);}
}
