// Mobile header check on the live domain: no horizontal overflow, 44px menu target, menu opens/closes/navigates.
const { chromium } = require("playwright-core");
const base = process.argv[2];
const paths = ["/", "/reviews", "/contact", "/air-conditioning/ac-repair/yorba-linda", "/heating/heating-repair/brea", "/ac-repair/yorba-linda", "/service-areas/orange-county/yorba-linda", "/blog"];
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] });
  let ok = true;
  for (const w of [320, 375, 390, 430]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 800 }, hasTouch: true });
    const p = await ctx.newPage();
    // Block analytics so tests never record hits or conversions.
    await p.route(/googletagmanager|google-analytics|googleadservices|doubleclick|googlesyndication|maps\.google/, (r) => r.abort());
    const over = [];
    for (const path of paths) { await p.goto(base + path, { waitUntil: "load" }); over.push(await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)); }
    await p.goto(base + "/", { waitUntil: "load" });
    const btn = p.locator('header button[aria-label="Toggle navigation menu"]');
    const box = await btn.boundingBox();
    const state = () => p.evaluate(() => document.querySelector('header button[aria-label="Toggle navigation menu"]').getAttribute("aria-expanded"));
    await p.touchscreen.tap(box.x + 1, box.y + box.height / 2); await p.waitForTimeout(300);
    const opened = await state(); const links = await p.locator("header .max-h-\\[80vh\\] a").count();
    const overOpen = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await p.touchscreen.tap(box.x + box.width / 2, box.y + box.height - 1); await p.waitForTimeout(300);
    const closed = await state();
    await btn.tap(); await p.waitForTimeout(200);
    await p.locator("header .max-h-\\[80vh\\] a", { hasText: "Financing" }).first().tap(); await p.waitForURL("**/financing");
    const r = { width: w, maxOverflowPx: Math.max(...over), menuButton: [Math.round(box.width), Math.round(box.height)], opened, menuLinks: links, overflowWithMenuOpen: overOpen, closed, navigated: new URL(p.url()).pathname };
    const pass = r.maxOverflowPx === 0 && box.width >= 44 && box.height >= 44 && opened === "true" && links > 0 && overOpen === 0 && closed === "false" && r.navigated === "/financing";
    ok = ok && pass;
    console.log("MOBILE", pass ? "PASS" : "FAIL", JSON.stringify(r));
    await ctx.close();
  }
  await b.close();
  console.log("MOBILE RESULT:", ok ? "PASS" : "FAIL");
  process.exit(ok ? 0 : 1);
})();
