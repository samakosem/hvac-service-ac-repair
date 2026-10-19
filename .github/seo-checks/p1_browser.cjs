// Phase 2.3 P1 browser checks (node p1_browser.cjs <screenshot-dir> <base-url>). No real lead is sent:
// POST /api/contact is intercepted and answered locally; analytics requests are blocked.
const { chromium } = require("playwright-core");
const OUT = process.argv[2];
const BASE = process.argv[3] || "http://localhost:3000";
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium" });
  for (const city of ["placentia", "costa-mesa", "yorba-linda"]) {
    const url = `${BASE}/service-areas/orange-county/${city}`;
    for (const [name, vp, mobile] of [["desktop", { width: 1366, height: 900 }, false], ["mobile", { width: 390, height: 844 }, true]]) {
      const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
      const p = await ctx.newPage();
      const jsErrors = [];
      p.on("pageerror", (e) => jsErrors.push(String(e)));
      p.on("console", (m) => { if (m.type() === "error" && !/googletagmanager|google-analytics|doubleclick|googleadservices|ERR_FAILED/.test(m.text())) jsErrors.push(m.text()); });
      const navs = [];
      p.on("response", (r) => { if (r.request().isNavigationRequest() && r.status() >= 300 && r.status() < 400) navs.push(`${r.status()} ${r.url()}`); });
      await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/, (r) => r.abort());
      let apiCalls = 0, apiBody = null;
      await p.route("**/api/contact", async (r) => { apiCalls++; apiBody = r.request().postDataJSON(); await r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }); });
      const resp = await p.goto(url, { waitUntil: "networkidle" });
      const status = resp.status(), finalUrl = p.url();
      const layout = await p.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const form = document.querySelector("main form");
        const intro = [...document.querySelectorAll("h1 ~ p")].map((x) => { const s = getComputedStyle(x); return { color: s.color, size: s.fontSize }; });
        const submit = form && form.querySelector('button[type="submit"]');
        return { overflow: Math.max(0, document.documentElement.scrollWidth - vw), forms: document.querySelectorAll("main form").length,
                 submitLabel: submit && submit.textContent.trim(), submitHeight: submit && Math.round(submit.getBoundingClientRect().height),
                 introText: intro, cards: [...document.querySelectorAll("main section a")].filter((a) => /in (Placentia|Costa Mesa|Yorba Linda)$/.test(a.textContent.trim().split("\n")[0]) && a.querySelector("span")).map((a) => a.getAttribute("href")) };
      });
      await p.screenshot({ path: `${OUT}/p1-${city}-${name}-top.png` });
      await p.screenshot({ path: `${OUT}/p1-${city}-${name}-full.png`, fullPage: true });
      let formCheck = null;
      if (mobile) {
        // 1) empty submit: client-side validation, no request
        const form = p.locator("main form");
        await form.scrollIntoViewIfNeeded();
        await form.locator('button[type="submit"]').click();
        const errors = await form.locator('[role="alert"], .text-red-600, .text-red-500').count();
        const callsAfterEmpty = apiCalls;
        // 2) valid test submit against the mocked API: existing conversion event + redirect
        await p.evaluate(() => { window.__events = []; const dl = (window.dataLayer = window.dataLayer || []); const push = dl.push.bind(dl); dl.push = (...a) => { window.__events.push(...a); return push(...a); }; });
        await form.locator('input[autocomplete="name"], input[name="name"]').first().fill("Test Only");
        await form.locator('input[type="tel"]').first().fill("(714) 555-0100");
        await form.locator("select").first().selectOption({ index: 1 });
        await form.locator('input[autocomplete="street-address"], input[name="address"]').first().fill("123 Test St, Placentia, CA 92870");
        await form.locator('button[type="submit"]').click();
        await p.waitForURL(/thank-you/, { timeout: 10000 }).catch(() => {});
        const events = await p.evaluate(() => (window.__events || []).map((e) => e && e.event).filter(Boolean)).catch(() => ["(navigated)"]);
        formCheck = { errorsShownOnEmptySubmit: errors, apiCallsAfterEmptySubmit: callsAfterEmpty, apiCallsAfterValidSubmit: apiCalls, finalUrl: p.url().replace(BASE, ""), payloadKeys: apiBody && Object.keys(apiBody).sort(), events };
      }
      const telVisible = await p.locator('a[href^="tel:"]:visible').count();
      console.log(city, name, JSON.stringify({ status, finalUrl, redirects: navs, jsErrors, telVisible, ...layout, formCheck }));
      await ctx.close();
    }
  }
  await b.close();
})();
