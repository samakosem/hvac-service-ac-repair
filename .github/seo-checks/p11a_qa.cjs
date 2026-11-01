// Phase 11A production QA: five pilot pages x 6 viewports, call tracking, request-service links. Read-only.
const {chromium}=require('playwright-core');const BASE=process.argv[2];
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROME_PATH});let bad=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
const P=['/service-areas/orange-county/placentia','/service-areas/orange-county/costa-mesa','/air-conditioning/ac-repair/yorba-linda','/heating/heating-repair/yorba-linda','/air-conditioning/emergency-ac-repair/yorba-linda'];
const VP=[[320,640,1],[390,844,1],[430,932,1],[1024,768,0],[1366,768,0],[1920,1080,0]];
for(const [w,h,mob] of VP){for(const u of P){
 const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:!!mob,hasTouch:!!mob});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(String(e)));
 await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/,r=>r.abort());
 await p.goto(BASE+u,{waitUntil:'networkidle'});
 const r=await p.evaluate(()=>{
  const vis=e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'};
  const off=[...document.querySelectorAll('main p, main li, main h1, main h2, main h3, main a, main button, main input, main summary, main table, main img')].filter(e=>{if(!vis(e))return false;const r=e.getBoundingClientRect();return r.width>0&&r.left>-5000&&(r.right>innerWidth+1||r.left<-1)}).length;
  const small=[...document.querySelectorAll('main a[href^="tel:"], main a[href="/contact"], main button[type=submit]')].filter(e=>vis(e)&&/flex/.test(getComputedStyle(e).display)).map(e=>e.getBoundingClientRect()).filter(r=>r.width>0&&r.height>0&&r.height<40).length;
  const hs=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]);const skip=hs.some((v,i)=>i&&v>hs[i-1]+1);
  const unl=[...document.querySelectorAll('main a')].filter(a=>vis(a)&&!a.textContent.trim()&&!a.getAttribute('aria-label')).length;
  return {sw:document.documentElement.scrollWidth-innerWidth,off,small,skip,h1:hs.filter(x=>x===1).length,unl,ld:[...document.querySelectorAll('script[type="application/ld+json"]')].every(s=>{try{JSON.parse(s.textContent);return true}catch{return false}})}});
 ok(r.sw<=0&&r.off===0&&r.h1===1&&!r.skip&&r.unl===0&&r.ld&&errs.length===0,`${w}px ${u} scroll=${r.sw} offscreen=${r.off} h1=${r.h1} headingSkip=${r.skip} unnamedLinks=${r.unl} jsonld=${r.ld} jsErrors=${errs.length} smallCTAs=${r.small}`);
 await ctx.close();}}
// phone tracking + request-service links
for(const u of P){for(const [w,mob] of [[390,1],[1366,0]]){
 const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:!!mob,hasTouch:!!mob});const p=await ctx.newPage();
 await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/,r=>r.abort());
 await p.goto(BASE+u,{waitUntil:'networkidle'});
 await p.evaluate(()=>{window.dataLayer=window.dataLayer||[];window.__ev=[];const push=window.dataLayer.push.bind(window.dataLayer);window.dataLayer.push=(...a)=>{window.__ev.push(...a);return push(...a)};document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="tel:"]');if(a)e.preventDefault()},true)});
 const hs=await p.$$('main a[href^="tel:"]');let t=null;for(const h of hs){const bb=await h.boundingBox();if(bb&&bb.height>=40)t=h}await t.scrollIntoViewIfNeeded();await t.click();
 const ev=await p.evaluate(()=>window.__ev.map(e=>e&&e.event).filter(Boolean));
 ok(ev.includes('Call Button'),`${w}px ${u} in-page call CTA -> dataLayer ${ev}`);
 const req=p.locator('main a[href="/contact"]:visible, main a[href^="#estimate-form"]:visible, main a[href^="#emergency-form"]:visible').first();
 ok(await req.count()>0,`${w}px ${u} request-service link present (${await req.getAttribute('href').catch(()=>null)})`);
 await ctx.close();}}
await b.close();process.exit(bad?1:0)})();
