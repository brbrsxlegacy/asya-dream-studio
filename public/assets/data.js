export const COLORS = [
  {id:'rose',name:'Gül kurusu',hex:'#e88ea8'}, {id:'lilac',name:'Leylak',hex:'#b4a1d6'},
  {id:'mint',name:'Nane',hex:'#a8c8ba'}, {id:'cream',name:'Vanilya',hex:'#f3e6c9'},
  {id:'blue',name:'Gökyüzü',hex:'#8daecb'}, {id:'peach',name:'Şeftali',hex:'#eeb89c'},
  {id:'black',name:'Gece',hex:'#414056'}, {id:'white',name:'Bulut',hex:'#fffaf2'},
  {id:'red',name:'Kiraz',hex:'#c96679'}, {id:'brown',name:'Kakao',hex:'#947465'},
  {id:'yellow',name:'Güneş',hex:'#e8c66f'}, {id:'green',name:'Orman',hex:'#6e9986'}
];
export const SKINS=['#f8ddc4','#edc5a5','#dba988','#c18a68','#a66e51','#7e503d'];
export const HAIR_COLORS=['#654238','#382c32','#9b6546','#c69567','#e7c78e','#d3a0b4','#9a87bc','#f4ede0','#516d67'];
export const EYE_COLORS=['#4b3d39','#76928c','#7793b3','#87739e','#9e8251'];
export const CATEGORIES=[
  {id:'hair',name:'Saç',icon:'scissors'}, {id:'face',name:'Yüz',icon:'smile'},
  {id:'top',name:'Üstler',icon:'shirt'}, {id:'bottom',name:'Altlar',icon:'bottom'},
  {id:'shoes',name:'Ayakkabı',icon:'shoe'}, {id:'accessory',name:'Aksesuar',icon:'sparkles'},
  {id:'pet',name:'Dostlar',icon:'paw'}, {id:'scene',name:'Sahne',icon:'image'}
];
export const ITEMS={
 hair:[['waves','Dalgalı saç','cute'],['bob','Küt saç','chic'],['ponytail','At kuyruğu','sport'],['buns','Çift topuz','cute'],['long','Uzun saç','chic'],['braids','Örgülü saç','nature'],['short','Kısa saç','street'],['curly','Kıvırcık','nature'],['pixie','Pixie kesim','street'],['space','Uzay topuzu','dream']],
 top:[['cardigan','Bulut hırka','cute'],['tee','Rahat tişört','street'],['hoodie','Kapüşonlu','sport'],['blouse','Fırfırlı bluz','chic'],['sweater','Örgü kazak','nature'],['jacket','Kolej ceketi','street'],['dress','Masal elbisesi','dream'],['overall','Bahçıvan tulum','nature'],['sailor','Denizci bluz','cute'],['blazer','Şık ceket','chic'],['jersey','Takım forması','sport'],['star','Yıldız üst','dream']],
 bottom:[['skirt','Pileli etek','cute'],['jeans','Düz jean','street'],['shorts','Yazlık şort','sport'],['wide','Bol pantolon','chic'],['tulle','Tül etek','dream'],['cargo','Kargo pantolon','street'],['floral','Çiçekli etek','nature'],['jogger','Eşofman','sport']],
 shoes:[['sneakers','Bulut sneaker','sport'],['boots','Bağcıklı bot','street'],['maryjane','Babet','cute'],['sandals','Yaz sandaleti','nature'],['loafers','Loafer','chic'],['starboots','Yıldız bot','dream']],
 accessory:[['bow','Fiyonk','cute'],['none','Aksesuar yok','basic'],['glasses','Yuvarlak gözlük','chic'],['headphones','Kulaklık','street'],['flower','Papatya toka','nature'],['crown','Yıldız taç','dream'],['cap','Spor şapka','sport'],['bag','Kalp çanta','cute'],['beret','Ressam beresi','chic'],['scarf','Yumuşak atkı','nature'],['wings','Kelebek kanadı','dream'],['earrings','Yıldız küpe','chic']],
 pet:[['cat','Pamuk kedi','cute'],['none','Dost yok','basic'],['bunny','Minik tavşan','cute'],['dog','Tarçın köpek','nature'],['fox','Minik tilki','nature'],['bird','Mavi kuş','dream']],
 scene:[['studio','Pembe stüdyo','cute'],['garden','Papatya bahçesi','nature'],['night','Yıldızlı gece','dream'],['cafe','Küçük kafe','chic'],['beach','Sahil günü','sport'],['city','Şehir ışıkları','street']]
};
for(const [cat,items] of Object.entries(ITEMS)) ITEMS[cat]=items.map(([id,name,tag])=>({id,name,tag,category:cat}));
export const STYLE_NAMES={cute:'Tatlı',chic:'Zarif',sport:'Sportif',street:'Sokak stili',nature:'Doğal',dream:'Masalsı',basic:'Sade'};
export const DEFAULT_AVATAR={hair:'waves',hairColor:0,skin:1,eyes:0,expression:'happy',top:'cardigan',topColor:0,bottom:'skirt',bottomColor:1,shoes:'maryjane',shoeColor:0,accessory:'bow',accColor:0,pet:'cat',scene:'studio',pose:'relaxed',pattern:'plain'};
export const PRESETS=[
 {name:'Papatya rüyası',tag:'nature',avatar:{hair:'braids',hairColor:2,top:'overall',topColor:2,bottom:'shorts',bottomColor:3,accessory:'flower',shoes:'sandals',shoeColor:9,pet:'bunny',scene:'garden'}},
 {name:'Bir tutam pembe',tag:'cute',avatar:{hair:'waves',top:'cardigan',topColor:0,bottom:'skirt',bottomColor:1,accessory:'bow',shoes:'maryjane',scene:'studio'}},
 {name:'Şehir günlüğü',tag:'street',avatar:{hair:'bob',hairColor:1,top:'jacket',topColor:4,bottom:'cargo',bottomColor:6,shoes:'boots',shoeColor:6,accessory:'headphones',scene:'city',pet:'dog'}},
 {name:'Yıldız gezgini',tag:'dream',avatar:{hair:'space',hairColor:6,top:'star',topColor:1,bottom:'tulle',bottomColor:7,shoes:'starboots',shoeColor:1,accessory:'crown',scene:'night',pet:'bird'}},
 {name:'Kafe molası',tag:'chic',avatar:{hair:'long',hairColor:3,top:'blazer',topColor:9,bottom:'wide',bottomColor:3,shoes:'loafers',shoeColor:9,accessory:'beret',scene:'cafe',pet:'none'}},
 {name:'Sahil kulübü',tag:'sport',avatar:{hair:'ponytail',hairColor:4,top:'jersey',topColor:4,bottom:'shorts',bottomColor:7,shoes:'sneakers',shoeColor:7,accessory:'cap',scene:'beach',pet:'dog'}}
];
export const CHALLENGES=[
 {id:'flower',name:'Papatya pikniği',tag:'nature',description:'Doğadan renkler, rahat parçalar ve çiçekli bir dokunuş.',colors:[2,3,10,11],icon:'flower',reward:80},
 {id:'moon',name:'Ay ışığı balosu',tag:'dream',description:'Yıldızların altında, biraz ışıltı ve bolca hayal gücü.',colors:[1,4,6,7],icon:'moon',reward:90},
 {id:'cafe',name:'Paris’te bir gün',tag:'chic',description:'Küçük bir kafe, zarif detaylar ve zamansız bir kombin.',colors:[3,6,7,9],icon:'coffee',reward:85},
 {id:'pink',name:'Pembe bir dünya',tag:'cute',description:'Pembe tonları ve içini ısıtan sevimli aksesuarlar.',colors:[0,1,5,7],icon:'heart',reward:80},
 {id:'city',name:'Şehrin ritmi',tag:'street',description:'Rahat, özgün ve kendinden emin bir sokak stili.',colors:[4,6,8,9],icon:'music',reward:85},
 {id:'weekend',name:'Hareketli hafta sonu',tag:'sport',description:'Koşmaya, oynamaya ve keşfetmeye hazır bir kombin.',colors:[2,4,7,10],icon:'sun',reward:80}
];
export const GAME_DATA=[
 {id:'stars',name:'Yıldız Yağmuru',desc:'Sepetini kaydır, yıldızları yakala. Bulutlara dikkat!',icon:'star',color:'butter',time:'45 sn',skill:'Beceri'},
 {id:'memory',name:'Eşini Bul',desc:'Kartları çevir, sevimli eşleri hafızanda tut.',icon:'cards',color:'lavender',time:'12 kart',skill:'Hafıza'},
 {id:'runner',name:'Bulut Koşusu',desc:'Engellerin üstünden zıpla, hayallerinin peşinden koş.',icon:'cloud',color:'sky',time:'60 sn',skill:'Macera'},
 {id:'reaction',name:'Işık Hızı',desc:'Çiçek yeşile dönünce dokun. Ne kadar hızlısın?',icon:'bolt',color:'peach',time:'5 tur',skill:'Refleks'},
 {id:'bounce',name:'Rüya Sekmesi',desc:'Raketini hareket ettir ve çiçek bloklarını temizle.',icon:'ball',color:'rose',time:'3 can',skill:'Arcade'},
 {id:'palette',name:'Renk Ustası',desc:'Hedef rengi bul, gözünü ve dikkatini test et.',icon:'palette',color:'mint',time:'10 tur',skill:'Dikkat'}
];
export const FURNITURE=[
 {id:'sofa',name:'Bulut koltuk',w:29,h:28,tag:'Oturma'}, {id:'chair',name:'Okuma koltuğu',w:16,h:27,tag:'Oturma'},
 {id:'bed',name:'Rüya yatağı',w:31,h:35,tag:'Oturma'}, {id:'desk',name:'Çalışma masası',w:27,h:25,tag:'Dekor'},
 {id:'plant',name:'Deve tabanı',w:15,h:34,tag:'Bitki'}, {id:'flowers',name:'Papatya vazosu',w:12,h:23,tag:'Bitki'},
 {id:'lamp',name:'Ayaklı lamba',w:13,h:44,tag:'Işık'}, {id:'rug',name:'Yumuşak halı',w:39,h:15,tag:'Dekor'},
 {id:'shelf',name:'Kitaplık',w:20,h:39,tag:'Dekor'}, {id:'mirror',name:'Kemerli ayna',w:17,h:41,tag:'Dekor'},
 {id:'catbed',name:'Kedi köşesi',w:19,h:20,tag:'Dostlar'}, {id:'art',name:'Çiçek tablosu',w:16,h:27,tag:'Duvar'},
 {id:'clock',name:'Duvar saati',w:13,h:20,tag:'Duvar'}, {id:'cloud',name:'Bulut lamba',w:22,h:17,tag:'Duvar'},
 {id:'table',name:'Kahve sehpası',w:21,h:19,tag:'Dekor'}, {id:'teddy',name:'Oyuncak ayı',w:15,h:24,tag:'Dostlar'}
];
export const DEFAULT_ROOM={wall:0,floor:0,items:[{uid:'a',type:'rug',x:26,y:76,color:1},{uid:'b',type:'sofa',x:14,y:48,color:0},{uid:'c',type:'plant',x:72,y:38,color:2},{uid:'d',type:'lamp',x:52,y:27,color:3},{uid:'e',type:'art',x:20,y:16,color:0},{uid:'f',type:'table',x:45,y:72,color:3}]};
export const SHOP=[
 {id:'collection-dream',name:'Ay ışığı koleksiyonu',description:'Özel bir yıldız kombini ve koleksiyon rozeti.',price:180,type:'collection',preset:3,icon:'moon'},
 {id:'collection-city',name:'Şehir koleksiyonu',description:'Şehir günlüğü kombini dolabına eklensin.',price:150,type:'collection',preset:2,icon:'music'},
 {id:'collection-garden',name:'Papatya koleksiyonu',description:'Doğanın renklerini dolabına taşı.',price:150,type:'collection',preset:0,icon:'flower'},
 {id:'wall-night',name:'Gece odası',description:'Oda tasarımcısında yıldızlı gece duvarı.',price:200,type:'wall',icon:'moon'},
 {id:'frame-gold',name:'Altın fotoğraf çerçevesi',description:'Fotoğraf stüdyosunda altın çerçeve.',price:120,type:'frame',icon:'image'},
 {id:'badge-dreamer',name:'Hayalperest rozeti',description:'Profilinde parlayacak özel bir rozet.',price:100,type:'badge',icon:'sparkles'}
];
