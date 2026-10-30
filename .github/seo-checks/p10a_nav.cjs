// Phase 10A production nav/breadcrumb browser checks (node p10a_nav.cjs <base>). Read-only; analytics blocked.
const { chromium } = require("playwright-core");
const BASE = process.argv[2];
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH });
  let bad = 0;
  const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) bad++; };
  for (const [w, h, mobile] of [[320, 640, true], [390, 844, true], [1366, 768, false]]) {
    for (const u of ["/air-conditioning/ac-repair/yorba-linda", "/hvac-repair/yorba-linda", "/air-conditioning/emergency-ac-repair/newport-beach"]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
      const p = await ctx.newPage();
      await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/, (r) => r.abort());
      await p.goto(BASE + u, { waitUntil: "networkidle" });
      const r = await p.evaluate(() => { const n = document.querySelector('nav[aria-label=Breadcrumb]'); const ls = [...n.querySelectorAll("a")].map((a) => a.getBoundingClientRect()); return { overflow: document.documentElement.scrollWidth - innerWidth, h: ls.map((x) => Math.round(x.height)), navH: Math.round(n.getBoundingClientRect().height), text: n.innerText.replace(/\s+/g, " ") }; });
      ok(r.overflow <= 0, `${w}px ${u} no overflow; breadcrumb "${r.text}" navH=${r.navH} linkH=${r.h}`);
      if (mobile) ok(r.h.every((x) => x >= 44), `${w}px ${u} link tap height >=44`);
      const links = await p.$$('nav[aria-label=Breadcrumb] a'); const bb = await links[1].boundingBox();
      await Promise.all([p.waitForURL((x) => x.pathname !== u, { timeout: 8000 }).catch(() => {}), p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2)]);
      ok(new URL(p.url()).pathname !== u, `${w}px ${u} parent click -> ${new URL(p.url()).pathname}`);
      await ctx.close();
    }
  }
  for (const [w, mobile] of [[390, true], [1366, false]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 844 }, isMobile: mobile, hasTouch: mobile });
    const p = await ctx.newPage(); await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/, (r) => r.abort());
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    if (mobile) {
      const m = p.locator("#mobile-menu"); ok(await m.count() === 1 && !(await m.isVisible()), "mobile menu in DOM, hidden when closed");
      await p.locator("header button[aria-expanded]:visible").first().click();
      ok(await m.isVisible() && await m.locator('a[href="/hvac-repair"]').first().isVisible(), "mobile menu opens; HVAC Repair link visible");
    } else {
      await p.locator("header >> text=Services").first().hover();
      ok(await p.locator('header a[href="/hvac-repair"]:visible').count() > 0, "desktop Services dropdown shows HVAC Repair");
    }
    await ctx.close();
  }
  await b.close(); process.exit(bad ? 1 : 0);
})();
