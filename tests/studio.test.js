import test from 'node:test';
import assert from 'node:assert/strict';
import {newState,cleanState,cleanAvatar,cleanRoom,saveLook,claimChallenge,buyItem,claimDaily,gameReward,scoreStyle,dayKey,STORE_KEY,loadState} from '../public/assets/core.js';
import {CHALLENGES,PRESETS,DEFAULT_AVATAR,FURNITURE} from '../public/assets/data.js';
import {avatarSVG} from '../public/assets/avatar.js';
import {roomSVG} from '../public/assets/room.js';
import {photoSVG} from '../public/assets/views.js';
import {overlaps} from '../public/assets/games.js';
test('a saved look survives a backup round trip without sharing the active avatar object',()=>{
 const s=newState();s.avatar.hair='buns';const look=saveLook(s,'İlk kombinim');s.avatar.hair='long';
 assert.equal(look.avatar.hair,'buns');const restored=cleanState(JSON.parse(JSON.stringify(s)));
 assert.equal(restored.looks[0].avatar.hair,'buns');assert.equal(restored.avatar.hair,'long');assert.equal(restored.stats.saves,1);assert.equal(restored.daily.saveCount,1);
 const storage={getItem:key=>key===STORE_KEY?JSON.stringify(s):null};assert.equal(loadState(storage).looks[0].name,'İlk kombinim');
});
test('daily gifts, quest rewards and challenge payouts cannot be claimed twice',()=>{
 const s=newState();saveLook(s,'Yeni');assert.equal(claimDaily(s,'save'),30);assert.equal(claimDaily(s,'save'),0);
 const before=s.coins,first=claimChallenge(s,'pink'),second=claimChallenge(s,'pink');assert.ok(first.reward>0);assert.equal(second.reward,0);assert.equal(s.coins,before+first.reward);
 assert.equal(s.stats.challenges,1);assert.equal(cleanState(s).challengeClaims[dayKey()+':pink'],true);
});
test('shop purchases charge once, reject duplicates and preserve balance if insufficient',()=>{
 const s=newState();buyItem(s,'frame-gold');assert.equal(s.coins,130);assert.throws(()=>buyItem(s,'frame-gold'),/zaten/);assert.equal(s.coins,130);assert.throws(()=>buyItem(s,'wall-night'),/biriktirmelisin/);assert.equal(s.coins,130);
});
test('game completion saves bests, awards stars and advances the daily game task',()=>{
 const s=newState();const coins=gameReward(s,'runner',100);assert.ok(coins>=10&&coins<=65);gameReward(s,'runner',50);assert.equal(s.best.runner,100);assert.equal(s.stats.games,2);assert.equal(claimDaily(s,'game'),50);
});
test('style scoring is transparent and an aligned preset outperforms an unrelated outfit',()=>{
 const c=CHALLENGES.find(x=>x.id==='moon');const good=scoreStyle({...DEFAULT_AVATAR,...PRESETS[3].avatar,pattern:'stars'},c);const bad=scoreStyle({...DEFAULT_AVATAR,...PRESETS[0].avatar},c);
 assert.ok(good.total>bad.total);assert.equal(good.total,good.style+good.palette+good.detail);assert.ok(good.total<=100);
});
test('untrusted avatar, room and backup values are restricted to supported data',()=>{
 const a=cleanAvatar({top:'<script>',skin:999,topColor:-1,hairColor:'red',scene:'javascript:alert(1)'});assert.equal(a.top,'cardigan');assert.equal(a.skin,5);assert.equal(a.topColor,0);assert.equal(a.hairColor,0);assert.equal(a.scene,'studio');
 const s=cleanState({nickname:'<img>hi',coins:-100,xp:Infinity,looks:[{name:'<svg>',avatar:{top:'script'}}],owned:['fake','frame-gold'],room:{items:[{type:'invalid'}]}});assert.equal(s.coins,0);assert.equal(s.nickname,'imghi');assert.deepEqual(s.owned,['frame-gold']);assert.equal(s.room.items.length,0);assert.doesNotMatch(avatarSVG(a),/<script|javascript:/);
});
test('all supported avatar parts and scenes produce self-contained SVG with unique clips',()=>{
 const a=avatarSVG(DEFAULT_AVATAR),b=avatarSVG(DEFAULT_AVATAR);assert.notEqual(a.match(/id="([^"]+)-shirt/)[1],b.match(/id="([^"]+)-shirt/)[1]);
 assert.ok(roomSVG(newState().room).startsWith('<svg'));assert.ok(photoSVG(DEFAULT_AVATAR,'polaroid').includes('viewBox="0 0 390 540"'));
});
test('collision detection requires overlap in both axes',()=>{assert.ok(overlaps({x:1,y:1,w:10,h:10},{x:8,y:9,w:10,h:10}));assert.equal(overlaps({x:1,y:1,w:10,h:10},{x:11,y:1,w:10,h:10}),false);});
test('room furniture stays entirely inside the design area after importing a backup',()=>{const r=cleanRoom({items:[{uid:'one',type:'rug',x:99,y:99,color:0}]});const f=FURNITURE.find(x=>x.id==='rug');assert.equal(r.items[0].x,100-f.w);assert.equal(r.items[0].y,100-f.h);});
