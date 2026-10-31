import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from 'playwright';
import {projectCatalog} from '../src/data/projectCatalog.js';
const BASE='http://127.0.0.1:5250',project=projectCatalog.find(p=>p.id==='pcec-connect');
const output=resolve(process.env.PCEC_CAPTURE_DIR||'.local-test/pcec');await mkdir(output,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','5250','--strictPort'],{stdio:'pipe'});
await new Promise((yes,no)=>{server.stdout.once('data',yes);server.once('error',no);server.once('exit',c=>no(Error('Preview exited '+c)));});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||undefined});
try{
 assert.equal(project.features.length,54);assert.equal(project.featureGroups.flatMap(g=>g.features).length,54);assert.equal(project.futureFeatures.length,6);
 assert.equal(project.repository.url,undefined,'Private source stays unlinked');
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});await context.route('**/*',route=>new URL(route.request().url()).origin===BASE?route.continue():route.abort());
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(BASE);await page.getByRole('link',{name:'Read about PCEC Connect',exact:true}).click();const modal=page.getByRole('dialog');await modal.getByRole('heading',{name:'PCEC Connect',exact:true}).waitFor();
  assert.equal(await modal.getByRole('link',{name:'Live demo',exact:false}).getAttribute('href'),project.liveUrl);assert.equal(await modal.getByRole('link',{name:'Documentation',exact:false}).getAttribute('href'),project.documentationUrl);
  for(const group of project.galleries){await modal.getByRole('button',{name:new RegExp('^'+group.label)}).click();for(let i=0;i<group.images.length;i++){const image=modal.locator('.gallery-frame img');assert.equal(await image.getAttribute('src'),group.images[i].src);await image.evaluate(img=>img.decode());assert.ok(await image.evaluate(img=>img.naturalWidth)>0);await modal.getByRole('button',{name:'Next screenshot',exact:true}).click();}assert.equal(await modal.locator('.gallery-frame img').getAttribute('src'),group.images[0].src,'Gallery wraps');}
  await modal.getByRole('button',{name:/^Member app/}).click();await modal.locator('summary',{hasText:'Features'}).click();await modal.locator('.pcec-feature-groups details').evaluateAll(els=>els.forEach(el=>el.open=true));assert.equal(await modal.locator('.pcec-feature-groups li').count(),54);assert.match(await modal.innerText(),/bank reference alone does not confirm payment/);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.equal(await modal.evaluate(el=>el.scrollWidth>el.clientWidth+1),false,JSON.stringify(await modal.evaluate(el=>[...el.querySelectorAll('*')].filter(n=>n.getBoundingClientRect().right>el.getBoundingClientRect().right+1).slice(0,7).map(n=>({tag:n.tagName,class:n.className,text:n.textContent.slice(0,90)})))));
  await modal.locator('.case-head').scrollIntoViewIfNeeded();await page.screenshot({path:resolve(output,`pcec-entry-after-${width}.png`)});
  await modal.locator('.pcec-feature-groups').first().scrollIntoViewIfNeeded();await page.screenshot({path:resolve(output,`pcec-features-after-${width}.png`)});
  await page.getByRole('button',{name:'Close dialog',exact:true}).click();await page.getByLabel('Search the complete project index',{exact:true}).fill('donation');assert.ok(await page.getByRole('link',{name:'Read about PCEC Connect',exact:true}).count()>=1,'Feature names are searchable');await page.getByRole('link',{name:'Read about PCEC Connect',exact:true}).last().click();await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);assert.deepEqual(errors,[]);await context.close();
  console.log(`PASS ${width}px: PCEC modal, 54 features/6 future items, links, all 13 actual screenshots, gallery switching/wrapping, feature search, close/Escape and responsive layout.`);
 }
}finally{await browser.close();server.kill();}
