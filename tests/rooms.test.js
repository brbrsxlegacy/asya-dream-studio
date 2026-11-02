import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {handleRooms} from '../server/rooms.js';
import {DEFAULT_AVATAR} from '../public/assets/data.js';
function database(){const sqlite=new DatabaseSync(':memory:');sqlite.exec(readFileSync(new URL('../drizzle/0000_goofy_menace.sql',import.meta.url),'utf8'));const wrap=(sql,args=[])=>({bind:(...values)=>wrap(sql,values),first:async()=>sqlite.prepare(sql).get(...args)||null,run:async()=>({meta:{changes:Number(sqlite.prepare(sql).run(...args).changes)}}),all:async()=>({results:sqlite.prepare(sql).all(...args)})});return {prepare:sql=>wrap(sql),batch:async statements=>{sqlite.exec('BEGIN');try{const out=[];for(const s of statements){try{out.push(await s.all());}catch(e){if(!/does not return data|not a reader/.test(e.message))throw e;out.push(await s.run());}}sqlite.exec('COMMIT');return out;}catch(e){sqlite.exec('ROLLBACK');throw e;}},sqlite};}
function api(db){return async(path,method='GET',data,client='client-1234567890',origin='https://studio.test')=>{const request=new Request('https://studio.test/api/studio/'+path,{method,headers:{cookie:'asya_studio_session='+'a'.repeat(64),'x-studio-client':client,origin,...(method!=='GET'?{'content-type':'application/json'}:{})},...(data?{body:JSON.stringify(data)}:{})});const r=await handleRooms(request,{DB:db});return {status:r.status,data:await r.json()};};}
test('real database room flow enforces membership, capacity, safe avatars and private chat',async()=>{
 const db=database(),call=api(db),profile={nickname:'Tasarımcı',avatar:DEFAULT_AVATAR};
 const created=await call('rooms','POST',profile);assert.equal(created.status,201);const code=created.data.code;assert.match(code,/^\d{6}$/);
 const unauthorized=await call('rooms/'+code,'GET',null,'outsider-12345');assert.equal(unauthorized.status,401);
 for(let i=2;i<=4;i++)assert.equal((await call('rooms/'+code+'/join','POST',{...profile,nickname:'Arkadaş '+i},'friend-'+i+'-12345')).status,200);
 const fifth=await call('rooms/'+code+'/join','POST',profile,'friend-5-12345');assert.equal(fifth.status,409);
 assert.equal((await call('rooms/'+code+'/join','POST',profile)).status,200);
 const room=await call('rooms/'+code);assert.equal(room.data.players.length,4);
 const sent=await call('rooms/'+code+'/messages','POST',{text:'<svg>Merhaba',avatar:{top:'script'}});assert.equal(sent.status,201);
 const received=await call('rooms/'+code,'GET',null,'friend-2-12345');assert.equal(received.data.messages[0].text,'svgMerhaba');assert.equal(received.data.messages[0].mine,false);
 assert.equal((await call('rooms/'+code+'/messages','POST',{text:'Hemen ikinci mesaj'})).status,429);
 assert.equal((await call('rooms/'+code+'/leave','POST',{})).status,200);
 assert.equal((await call('rooms/'+code,'GET')).status,401);
 assert.equal((await call('rooms/'+code+'/join','POST',profile,'friend-5-12345')).status,200);
 db.sqlite.close();
});
test('cross-origin writes and expired rooms are rejected',async()=>{
 const db=database(),call=api(db),profile={nickname:'Tasarımcı',avatar:DEFAULT_AVATAR};assert.equal((await call('rooms','POST',profile,undefined,'https://evil.test')).status,403);
 const created=await call('rooms','POST',profile);db.sqlite.prepare('UPDATE dream_rooms SET expires_at=0 WHERE code=?').run(created.data.code);assert.equal((await call('rooms/'+created.data.code)).status,404);db.sqlite.close();
});
