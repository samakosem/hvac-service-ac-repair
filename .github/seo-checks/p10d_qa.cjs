// Phase 10D production QA: 21 shared-template pages x 6 viewports, tap targets, overlaps, call tracking. Read-only.
const {chromium}=require('playwright-core');const BASE=process.argv[2];
const T=['/air-conditioning','/heat-pumps','/heating','/commercial-hvac','/air-duct-services','/air-conditioning/ac-replacement','/air-conditioning/ac-maintenance','/air-conditioning/ac-tune-up','/air-conditioning/ac-services','/air-conditioning/emergency-ac-repair','/ductless/ductless-mini-split','/ductless/mini-split-installation','/heat-pumps/heat-pump-repair','/heat-pumps/heat-pump-installation','/heating/furnace-repair','/heating/furnace-installation','/heating/furnace-maintenance','/commercial-hvac/commercial-maintenance-plan','/air-duct-services/air-duct-cleaning','/maintenance/residential-maintenance-plan','/hvac-repair'];
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROME_PATH});let bad=0,n=0;const ok=(c,m)=>{n++;if(!c){bad++;console.log('FAIL '+m)}};
for(const [w,h,mob] of [[320,640,1],[390,844,1],[430,932,1],[1024,768,0],[1366,768,0],[1920,1080,0]]){for(const u of T){
 const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:!!mob,hasTouch:!!mob});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/,r=>r.abort());
 await p.goto(BASE+u,{waitUntil:'networkidle'});
 const r=await p.evaluate(()=>{const vis=e=>{const s=getComputedStyle(e);if(s.display==='none'||s.visibility==='hidden')return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&r.left>-5000};
  const els=[...document.querySelectorAll('main a, main button, main summary')].filter(vis);
  const blockish=els.filter(e=>!(getComputedStyle(e).display==='inline'&&e.tagName==='A'&&e.closest('p,li')));
  const rects=blockish.map(e=>({e,r:e.getBoundingClientRect()}));let overlap=0;
  for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],c=rects[j];if(a.e.contains(c.e)||c.e.contains(a.e))continue;
   const ix=Math.min(a.r.right,c.r.right)-Math.max(a.r.left,c.r.left),iy=Math.min(a.r.bottom,c.r.bottom)-Math.max(a.r.top,c.r.top);if(ix>2&&iy>2)overlap++}
  const small=els.filter(e=>!(getComputedStyle(e).display==='inline'&&e.tagName==='A'&&e.closest('p,li'))&&!e.closest('nav[aria-label=Breadcrumb]')).map(e=>e.getBoundingClientRect()).filter(r=>r.height<43.5).length;
  const hs=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]);
  return {sw:document.documentElement.scrollWidth-innerWidth,overlap,small,skip:hs.some((v,i)=>i&&v>hs[i-1]+1),h1:hs.filter(x=>x===1).length,ld:[...document.querySelectorAll('script[type="application/ld+json"]')].every(s=>{try{JSON.parse(s.textContent);return true}catch{return false}})}});
 ok(r.sw<=0&&r.overlap===0&&r.h1===1&&!r.skip&&r.ld&&errs.length===0&&(!mob||r.small===0),`${w}px ${u} ${JSON.stringify(r)} errs=${errs.length}`);
 await ctx.close();}}
// emergency-ac-repair new section + tracking
for(const [w,mob] of [[390,1],[1366,0]]){const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:!!mob,hasTouch:!!mob});const p=await ctx.newPage();
 await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/,r=>r.abort());await p.goto(BASE+'/air-conditioning/emergency-ac-repair',{waitUntil:'networkidle'});
 ok(await p.locator('h2:has-text("Safety First: When to Leave and Call 911")').count()===1,`${w} safety section present`);
 await p.evaluate(()=>{window.dataLayer=window.dataLayer||[];window.__ev=[];const push=window.dataLayer.push.bind(window.dataLayer);window.dataLayer.push=(...a)=>{window.__ev.push(...a);return push(...a)};document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="tel:"]');if(a)e.preventDefault()},true)});
 const hs=await p.$$('main a[href^="tel:"]');let t=null;for(const h of hs){const bb=await h.boundingBox();if(bb&&bb.height>=40)t=h}await t.scrollIntoViewIfNeeded();await t.click();
 const ev=await p.evaluate(()=>window.__ev.map(e=>e&&e.event).filter(Boolean));ok(ev.includes('Call Button'),`${w} call CTA fires Call Button`);await ctx.close()}
console.log(`checks=${n} failed=${bad}`);await b.close();process.exit(bad?1:0)})();
