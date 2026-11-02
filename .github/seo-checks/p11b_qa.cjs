// Phase 11B production QA: Placentia hub, six viewports, call tracking, request-service anchor. Read-only.
const {chromium}=require('playwright-core');const BASE=process.argv[2];
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROME_PATH});let bad=0,n=0;const ok=(c,m)=>{n++;console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
const U='/service-areas/orange-county/placentia';
for(const [w,h,mob] of [[320,640,1],[390,844,1],[430,932,1],[1024,768,0],[1366,768,0],[1920,1080,0]]){
 const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:!!mob,hasTouch:!!mob});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/,r=>r.abort());
 await p.goto(BASE+U,{waitUntil:'networkidle'});
 const r=await p.evaluate(()=>{const vis=e=>{const s=getComputedStyle(e);if(s.display==='none'||s.visibility==='hidden')return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&r.left>-5000};
  const hs=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]);
  const off=[...document.querySelectorAll('main p, main li, main h1, main h2, main a, main button, main summary')].filter(e=>vis(e)&&(e.getBoundingClientRect().right>innerWidth+1||e.getBoundingClientRect().left<-1)).length;
  const ctas=[...document.querySelectorAll('main a[href="#request-service"]')].filter(vis).map(e=>Math.round(e.getBoundingClientRect().height));
  const tels=[...document.querySelectorAll('main section[aria-label^="HVAC information"] a[href^="tel:"]')].filter(vis).filter(e=>/flex/.test(getComputedStyle(e).display)).map(e=>Math.round(e.getBoundingClientRect().height));
  return {sw:document.documentElement.scrollWidth-innerWidth,off,h1:hs.filter(x=>x===1).length,skip:hs.some((v,i)=>i&&v>hs[i-1]+1),ld:[...document.querySelectorAll('script[type="application/ld+json"]')].every(s=>{try{JSON.parse(s.textContent);return true}catch{return false}}),ctas,minTel:Math.min(...tels),bullets:document.querySelectorAll('main ul.list-disc li').length}});
 ok(r.sw<=0&&r.off===0&&r.h1===1&&!r.skip&&r.ld&&errs.length===0&&r.ctas.every(x=>x>=44)&&r.minTel>=44,`${w}px ${JSON.stringify(r)} errs=${errs.length}`);
 if(w===390||w===1366)await p.screenshot({path:`/tmp/pl_${w}.png`,fullPage:true});
 await ctx.close();}
for(const [w,mob] of [[390,1],[1366,0]]){const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:!!mob,hasTouch:!!mob});const p=await ctx.newPage();
 await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/,r=>r.abort());await p.goto(BASE+U,{waitUntil:'networkidle'});
 await p.evaluate(()=>{window.dataLayer=window.dataLayer||[];window.__ev=[];const push=window.dataLayer.push.bind(window.dataLayer);window.dataLayer.push=(...a)=>{window.__ev.push(...a);return push(...a)};document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="tel:"]');if(a)e.preventDefault()},true)});
 const tel=p.locator('main section:has(h2:has-text("Which Service Do You Need")) a[href^="tel:"]').first();await tel.scrollIntoViewIfNeeded();await tel.click();
 const ev=await p.evaluate(()=>window.__ev.map(e=>e&&e.event).filter(Boolean));ok(ev.includes('Call Button'),`${w}px new section call CTA fires Call Button (${ev})`);
 const req=p.locator('main a[href="#request-service"]').first();await req.scrollIntoViewIfNeeded();await req.click();await p.waitForTimeout(1500);
 const top=await p.evaluate(()=>Math.round(document.querySelector('#request-service').getBoundingClientRect().top));ok(top<400&&top>=-5,`${w}px request-service anchor scrolls to the form (top=${top})`);await ctx.close()}
console.log(`checks=${n} failed=${bad}`);await b.close();process.exit(bad?1:0)})();
