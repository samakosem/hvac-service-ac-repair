// Phase 2.3 P3 browser checks (node p3_browser.cjs <shots-dir> <base-url>). /api/contact is intercepted (no real lead); analytics blocked.
const { chromium } = require("playwright-core");
const OUT = process.argv[2], BASE = process.argv[3] || "http://localhost:3000";
const PAGES = ["/", "/orange-county-ac-repair", "/los-angeles-ac-repair", "/ac-repair/bellflower", "/ac-repair/acton", "/ac-repair/ventura", "/pasadena-ac-repair", "/air-conditioning/ac-repair/fullerton", "/air-conditioning/emergency-ac-repair/irvine", "/air-conditioning/ac-repair", "/emergency-hvac-service", "/contact",
  "/about-us", "/service-areas/ventura-county", "/service-areas/santa-barbara-county/santa-barbara", "/service-areas/orange-county/placentia"];
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium" });
  for (const path of PAGES) {
    for (const [name, vp, mobile] of [["desktop", { width: 1366, height: 900 }, false], ["mobile", { width: 390, height: 844 }, true]]) {
      const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
      const p = await ctx.newPage();
      const errs = [];
      p.on("pageerror", (e) => errs.push(String(e)));
      p.on("console", (m) => { if (m.type() === "error" && !/googletagmanager|google-analytics|doubleclick|googleadservices|ERR_FAILED/.test(m.text())) errs.push(m.text()); });
      const redirects = [];
      const failed = [];
      p.on("response", (r) => {
        const req = r.request();
        if (req.isNavigationRequest() && req.frame() === p.mainFrame() && r.status() >= 300 && r.status() < 400) redirects.push(`${r.status()} ${r.url()}`);
        if (r.status() >= 400) failed.push(`${r.status()} ${req.resourceType()} ${r.url()} (page ${p.url().replace(BASE, "")})`);
      });
      await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/, (r) => r.abort());
      let calls = 0;
      await p.route("**/api/contact", async (r) => { calls++; await r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }); });
      const resp = await p.goto(BASE + path, { waitUntil: "networkidle" });
      const lay = await p.evaluate(() => ({ overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth), forms: document.querySelectorAll("form").length }));
      const tel = await p.locator('a[href^="tel:"]:visible').count();
      const name0 = path === "/" ? "home" : path.replace(/\//g, "_").slice(1);
      await p.screenshot({ path: `${OUT}/${name0}-${name}.png` });
      let form = null;
      if (mobile) {
        const f = p.locator("form:has(input[type=tel]):visible").first();
        if (await f.count()) {
          await f.scrollIntoViewIfNeeded();
          await f.locator('button[type="submit"]').click();
          const errors = await f.locator('[role="alert"], .text-red-600, .text-red-500').count();
          const afterEmpty = calls;
          await p.evaluate(() => { window.__ev = []; const dl = (window.dataLayer = window.dataLayer || []); const push = dl.push.bind(dl); dl.push = (...a) => { window.__ev.push(...a); return push(...a); }; });
          await f.locator('input[autocomplete="name"], input[name="name"]').first().fill("Test Only");
          await f.locator('input[type="tel"]').first().fill("(714) 555-0100");
          if (await f.locator("select").count()) await f.locator("select").first().selectOption({ index: 1 });
          const addr = f.locator('input[autocomplete="street-address"], input[name="address"]');
          if (await addr.count()) await addr.first().fill("123 Test St, Yorba Linda, CA 92886");
          const cb = f.locator('input[type="checkbox"]');
          await f.locator('button[type="submit"]').click();
          await p.waitForURL(/thank-you/, { timeout: 8000 }).catch(() => {});
          const ev = await p.evaluate(() => (window.__ev || []).map((e) => e && e.event).filter(Boolean)).catch(() => ["(navigated)"]);
          form = { errorsOnEmpty: errors, callsAfterEmpty: afterEmpty, calls, url: p.url().replace(BASE, ""), events: ev, submit: await f.locator('button[type="submit"]').textContent().catch(() => "(gone)") };
        }
      }
      console.log(path, name, JSON.stringify({ status: resp.status(), finalUrl: p.url().replace(BASE, ""), redirects, errs, failed, tel, ...lay, form }));
      await ctx.close();
    }
  }
  await b.close();
})();
