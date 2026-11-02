import {DEFAULT_AVATAR,DEFAULT_ROOM,ITEMS,COLORS,SKINS,HAIR_COLORS,EYE_COLORS,CHALLENGES,FURNITURE,SHOP} from './data.js';
export const STORE_KEY='asya-dream-studio-v3';
export const copy=value=>JSON.parse(JSON.stringify(value));
export const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
export const uid=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);
export const safeText=(value,max=40)=>String(value??'').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,max);
export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function dayKey(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
const integer=(v,f,min,max)=>Number.isInteger(v)?clamp(v,min,max):f;
export function cleanAvatar(raw={}){
 const result={...DEFAULT_AVATAR};
 for(const cat of Object.keys(ITEMS)) if(ITEMS[cat].some(x=>x.id===raw[cat])) result[cat]=raw[cat];
 for(const key of ['topColor','bottomColor','shoeColor','accColor']) result[key]=integer(raw[key],result[key],0,COLORS.length-1);
 result.hairColor=integer(raw.hairColor,result.hairColor,0,HAIR_COLORS.length-1);result.skin=integer(raw.skin,result.skin,0,SKINS.length-1);result.eyes=integer(raw.eyes,result.eyes,0,EYE_COLORS.length-1);
 if(['happy','wink','calm','excited'].includes(raw.expression))result.expression=raw.expression;
 if(['relaxed','wave','hip'].includes(raw.pose))result.pose=raw.pose;
 if(['plain','dots','stripes','stars'].includes(raw.pattern))result.pattern=raw.pattern;
 return result;
}
export function cleanRoom(raw={}){
 const valid=(Array.isArray(raw.items)?raw.items:DEFAULT_ROOM.items).filter(x=>x&&FURNITURE.some(f=>f.id===x.type)).slice(0,30);
 return {wall:integer(raw.wall,0,0,5),floor:integer(raw.floor,0,0,3),items:valid.map(x=>{const f=FURNITURE.find(i=>i.id===x.type);return {uid:safeText(x.uid||uid(),50),type:x.type,x:clamp(Number(x.x)||0,0,100-f.w),y:clamp(Number(x.y)||0,0,100-f.h),color:integer(x.color,0,0,COLORS.length-1)};})};
}
export function newState(){return {version:3,nickname:'Hayalperest',coins:250,xp:0,avatar:copy(DEFAULT_AVATAR),looks:[],photos:[],room:copy(DEFAULT_ROOM),owned:[],best:{},stats:{games:0,saves:0,photos:0,challenges:0,decorations:0},daily:{date:dayKey(),gift:false,claimed:[],gameCount:0,saveCount:0,photoCount:0},challengeClaims:{},favoriteItems:[],settings:{sound:false,reducedMotion:false},tutorialSeen:false};}
export function cleanState(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Geçerli bir stüdyo yedeği seç.');
 const s=newState();s.nickname=safeText(raw.nickname||s.nickname,20)||s.nickname;
 s.coins=integer(raw.coins,250,0,1000000);s.xp=integer(raw.xp,0,0,1000000);s.avatar=cleanAvatar(raw.avatar);
 s.looks=(Array.isArray(raw.looks)?raw.looks:[]).filter(x=>x&&x.avatar).slice(0,120).map(x=>({id:safeText(x.id||uid(),50),name:safeText(x.name||'Kombinim',35),avatar:cleanAvatar(x.avatar),favorite:!!x.favorite,created:Number(x.created)||Date.now()}));
 s.photos=(Array.isArray(raw.photos)?raw.photos:[]).filter(x=>x&&x.avatar).slice(0,60).map(x=>({id:safeText(x.id||uid(),50),name:safeText(x.name||'Hatıram',35),avatar:cleanAvatar(x.avatar),frame:['none','polaroid','flower','gold'].includes(x.frame)?x.frame:'none',created:Number(x.created)||Date.now()}));
 s.room=cleanRoom(raw.room);s.owned=(Array.isArray(raw.owned)?raw.owned:[]).filter(x=>SHOP.some(p=>p.id===x));
 for(const key of Object.keys(s.stats))s.stats[key]=integer(raw.stats?.[key],0,0,1000000);
 for(const key of ['stars','memory','runner','reaction','bounce','palette'])s.best[key]=integer(raw.best?.[key],0,0,1000000);
 s.settings={sound:!!raw.settings?.sound,reducedMotion:!!raw.settings?.reducedMotion};s.tutorialSeen=!!raw.tutorialSeen;
 s.favoriteItems=(Array.isArray(raw.favoriteItems)?raw.favoriteItems:[]).filter(x=>typeof x==='string').slice(0,100);
 if(raw.daily?.date===dayKey())s.daily={date:dayKey(),gift:!!raw.daily.gift,claimed:(raw.daily.claimed||[]).filter(x=>['save','game','photo'].includes(x)),gameCount:integer(raw.daily.gameCount,0,0,100),saveCount:integer(raw.daily.saveCount,0,0,100),photoCount:integer(raw.daily.photoCount,0,0,100)};
 if(raw.challengeClaims&&typeof raw.challengeClaims==='object')for(const key of Object.keys(raw.challengeClaims).slice(-100))if(/^\d{4}-\d{2}-\d{2}:\w+$/.test(key))s.challengeClaims[key]=true;
 return s;
}
export function loadState(storage){try{const raw=storage.getItem(STORE_KEY);return raw?cleanState(JSON.parse(raw)):newState();}catch{return newState();}}
export function refreshDay(s){if(s.daily.date!==dayKey())s.daily=newState().daily;}
export function saveLook(s,name){const look={id:uid(),name:safeText(name,35)||'Yeni kombinim',avatar:copy(s.avatar),favorite:false,created:Date.now()};s.looks.unshift(look);s.looks=s.looks.slice(0,120);s.stats.saves++;refreshDay(s);s.daily.saveCount++;s.xp+=10;return look;}
export function scoreStyle(avatar,challenge){
 const a=cleanAvatar(avatar);let matches=0;const cats=['hair','top','bottom','shoes','accessory'];
 for(const cat of cats)if(ITEMS[cat].find(x=>x.id===a[cat])?.tag===challenge.tag)matches++;
 const style=Math.round(matches/5*60);const colorMatches=[a.topColor,a.bottomColor,a.shoeColor,a.accColor].filter(x=>challenge.colors.includes(x)).length;const palette=colorMatches*7;
 const detail=(a.accessory!=='none'?5:0)+(a.pet!=='none'?3:0)+(a.pattern!=='plain'?4:0);
 return {total:Math.min(100,style+palette+detail),style,palette,detail,matches};
}
export function claimChallenge(s,id){const c=CHALLENGES.find(x=>x.id===id);if(!c)throw Error('Yarışma bulunamadı.');const score=scoreStyle(s.avatar,c);const key=dayKey()+':'+id;if(s.challengeClaims[key])return {...score,reward:0,already:true};const reward=Math.round(c.reward*(.35+score.total/100*.65));s.challengeClaims[key]=true;s.coins+=reward;s.xp+=25;s.stats.challenges++;return {...score,reward,already:false};}
export function buyItem(s,id){const item=SHOP.find(x=>x.id===id);if(!item)throw Error('Ürün bulunamadı.');if(s.owned.includes(id))throw Error('Bu ürün zaten senin.');if(s.coins<item.price)throw Error('Biraz daha yıldız biriktirmelisin.');s.coins-=item.price;s.owned.push(id);return item;}
export function gameReward(s,id,score){if(!['stars','memory','runner','reaction','bounce','palette'].includes(id))throw Error('Oyun bulunamadı.');const n=clamp(Math.round(Number(score)||0),0,100000);s.best[id]=Math.max(s.best[id]||0,n);const coins=clamp(Math.floor(n/15)+10,10,65);s.coins+=coins;s.xp+=15;s.stats.games++;refreshDay(s);s.daily.gameCount++;return coins;}
export const levelInfo=xp=>({level:Math.floor(xp/150)+1,progress:xp%150,next:150});
export const DAILY_TASKS=[{id:'save',name:'Yeni bir kombin kaydet',goal:1,field:'saveCount',reward:30,route:'creator',icon:'shirt'},{id:'game',name:'İki mini oyun tamamla',goal:2,field:'gameCount',reward:50,route:'games',icon:'game'},{id:'photo',name:'Bir hatıra fotoğrafı çek',goal:1,field:'photoCount',reward:25,route:'photo',icon:'camera'}];
export function claimDaily(s,id){refreshDay(s);const t=DAILY_TASKS.find(x=>x.id===id);if(!t||s.daily[t.field]<t.goal||s.daily.claimed.includes(id))return 0;s.daily.claimed.push(id);s.coins+=t.reward;s.xp+=10;return t.reward;}
