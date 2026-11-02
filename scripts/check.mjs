import {readdir,readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const files=(await readdir('public/assets')).filter(f=>f.endsWith('.js'));
for(const f of files){const r=spawnSync(process.execPath,['--check','public/assets/'+f],{encoding:'utf8'});if(r.status!==0){process.stderr.write(r.stderr);process.exit(r.status);}}
const html=await readFile('studio/index.html','utf8');for(const match of html.matchAll(/(?:src|href)="(assets\/[^\"]+)"/g))await readFile('public/'+match[1]);
const hosting=JSON.parse(await readFile('.openai/hosting.json','utf8'));if(hosting.static||hosting.d1!=='DB')throw Error('The Worker must have its D1 binding.');
console.log(`Validated ${files.length} JavaScript modules, HTML assets and hosting configuration.`);
