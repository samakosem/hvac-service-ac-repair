#!/usr/bin/env node
/**
 * Live SEO verification for PR #1 (seo/technical-audit-fixes).
 *
 * Runs the 10 post-audit checks against a deployed site (Vercel preview,
 * production, or a local `next start`) and, when given both, compares them.
 *
 * Usage:
 *   node scripts/verify-preview.mjs --preview <url> [--production <url>]
 *   node scripts/verify-preview.mjs --preview http://localhost:3000
 *
 * Options:
 *   --preview <url>      Deployment that carries the PR changes (required)
 *   --production <url>   Live site, for check 10 and the apex-host redirect
 *   --sample <n>         Sitemap URLs to deep-check per run (default: all)
 *   --concurrency <n>    Parallel requests (default 8)
 *   --json <file>        Also write the full results as JSON
 *
 * If the preview uses Vercel Deployment Protection, set
 * VERCEL_AUTOMATION_BYPASS_SECRET and the bypass header is sent.
 *
 * Read-only apart from one POST to /api/contact with an empty body, which the
 * route rejects with 422 before any email is sent.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const CANONICAL_ORIGIN = "https://www.hvacserviceacrepair.com";
const GTM_ID = "GTM-TRVN8GDR";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// ── CLI ─────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]?.startsWith("--") ? true : all[i + 1] ?? true]);
    return acc;
  }, []),
);
if (!args.preview) {
  console.error("Usage: node scripts/verify-preview.mjs --preview <url> [--production <url>]");
  process.exit(2);
}
const strip = (u) => String(u).replace(/\/+$/, "");
const PREVIEW = strip(args.preview);
const PRODUCTION = args.production ? strip(args.production) : null;
const SAMPLE = args.sample ? Number(args.sample) : Infinity;
const CONCURRENCY = Number(args.concurrency ?? 8);

const extraHeaders = { "user-agent": "hvac-seo-verify/1.0 (+PR1)" };
if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
  extraHeaders["x-vercel-protection-bypass"] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  extraHeaders["x-vercel-set-bypass-cookie"] = "true";
}

// ── HTTP helpers ────────────────────────────────────────────────────────────
const cache = new Map();
async function get(url, { follow = false, method = "GET", body, headers = {} } = {}) {
  const key = `${method} ${url} ${follow}`;
  if (method === "GET" && cache.has(key)) return cache.get(key);
  const p = (async () => {
    try {
      const res = await fetch(url, {
        method,
        body,
        redirect: follow ? "follow" : "manual",
        headers: { ...extraHeaders, ...headers },
        signal: AbortSignal.timeout(30_000),
      });
      const text = method === "HEAD" ? "" : await res.text();
      return { status: res.status, headers: res.headers, text, url: res.url, location: res.headers.get("location") };
    } catch (e) {
      return { status: 0, error: e.cause?.code ?? e.message, headers: new Headers(), text: "" };
    }
  })();
  if (method === "GET") cache.set(key, p);
  return p;
}

// Follow redirects manually so hops and the final status are visible.
async function trace(url, max = 10) {
  const hops = [];
  let current = url;
  for (let i = 0; i < max; i++) {
    const r = await get(current);
    hops.push({ url: current, status: r.status, error: r.error });
    if (r.status >= 300 && r.status < 400 && r.location) {
      current = new URL(r.location, current).toString();
      continue;
    }
    return { hops, final: current, status: r.status };
  }
  return { hops, final: current, status: -1 };
}

async function pool(items, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx], idx);
      }
    }),
  );
  return out;
}

// ── HTML helpers (regex is enough for Next's predictable output) ───────────
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1];
const decode = (s) => s?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
function parsePage(html) {
  const canonTag = html.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0];
  const robotsTag = html.match(/<meta[^>]+name="robots"[^>]*>/i)?.[0];
  const ld = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => {
      try {
        return { ok: true, data: JSON.parse(m[1]) };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    },
  );
  return {
    canonical: decode(canonTag && attr(canonTag, "href")),
    robots: robotsTag ? attr(robotsTag, "content") : null,
    title: decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]),
    ld,
    hasGtm: html.includes(GTM_ID),
    hasTel: /href="tel:/i.test(html),
    hasForm: /<form[\s>]/i.test(html),
  };
}

// Every absolute URL on our own host inside a JSON-LD tree.
function ldUrls(node, acc = new Set()) {
  if (typeof node === "string") {
    if (node.startsWith(CANONICAL_ORIGIN)) acc.add(node.split("#")[0]);
  } else if (Array.isArray(node)) node.forEach((n) => ldUrls(n, acc));
  else if (node && typeof node === "object") Object.values(node).forEach((n) => ldUrls(n, acc));
  return acc;
}

const toBase = (base, absUrl) => base + new URL(absUrl).pathname + new URL(absUrl).search;
const pathOf = (u) => new URL(u).pathname;
const expectedCanonical = (p) => CANONICAL_ORIGIN + (p === "/" ? "" : p.replace(/\/+$/, ""));
const sameCanonical = (a, b) => a && strip(a) === strip(b);

function loadRedirectMap() {
  const src = readFileSync(path.join(ROOT, "src/lib/config/redirects.ts"), "utf8");
  return [...src.matchAll(/source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"/g)].map(([, source, destination]) => ({
    source,
    destination,
  }));
}

// ── The 10 checks ───────────────────────────────────────────────────────────
async function runChecks(base, label) {
  const results = [];
  const record = (id, name, failures, info = []) => {
    results.push({ id, name, pass: failures.length === 0, failures, info });
  };
  const isLocal = /localhost|127\.0\.0\.1/.test(base);

  // Reachability gate
  const home = await get(base + "/");
  if (home.status === 0) {
    return { base, label, unreachable: `${home.error}`, results };
  }
  if (home.status === 401 || home.status === 403) {
    return {
      base,
      label,
      unreachable: `HTTP ${home.status}: Vercel Deployment Protection. Set VERCEL_AUTOMATION_BYPASS_SECRET.`,
      results,
    };
  }

  // Sitemap first: most checks run over its URLs.
  const sm = await get(base + "/sitemap.xml");
  const smUrls = [...sm.text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => decode(m[1]));
  const paths = smUrls.map(pathOf).slice(0, SAMPLE);
  const pages = await pool(paths, async (p) => {
    const r = await get(base + p);
    return { path: p, status: r.status, location: r.location, xRobots: r.headers.get("x-robots-tag"), ...parsePage(r.text) };
  });
  const ok = pages.filter((p) => p.status === 200);

  // 1. Canonicals
  {
    const f = [];
    for (const p of ok) {
      if (!p.canonical) f.push(`${p.path}: no canonical`);
      else if (p.canonical !== expectedCanonical(p.path))
        f.push(`${p.path}: canonical ${p.canonical} (expected ${expectedCanonical(p.path)})`);
    }
    record(1, "Canonicals are correct", f, [`${ok.length} pages checked`]);
  }

  // 2. Trailing slashes
  {
    const f = [];
    const slashCanon = ok.filter((p) => p.canonical && p.path !== "/" && p.canonical.endsWith("/"));
    slashCanon.forEach((p) => f.push(`${p.path}: canonical has trailing slash`));
    smUrls.filter((u) => pathOf(u) !== "/" && u.endsWith("/")).forEach((u) => f.push(`sitemap: ${u} has trailing slash`));
    const probes = paths.filter((p) => p !== "/").slice(0, 25);
    await pool(probes, async (p) => {
      const t = await trace(base + p + "/");
      const last = pathOf(t.final);
      if (t.hops[0].status !== 308 && t.hops[0].status !== 301) f.push(`${p}/: first response ${t.hops[0].status}, expected 308`);
      else if (last !== p || t.status !== 200) f.push(`${p}/: ended at ${last} (${t.status})`);
      else if (t.hops.length > 2) f.push(`${p}/: ${t.hops.length - 1} hops`);
    });
    record(2, "No incorrect trailing slashes", f, [`${probes.length} slash variants probed`]);
  }

  // 3. robots.txt
  {
    const f = [];
    const info = [];
    const r = await get(base + "/robots.txt");
    if (r.status !== 200) f.push(`robots.txt HTTP ${r.status}`);
    const ct = r.headers.get("content-type") ?? "";
    if (!ct.startsWith("text/plain")) f.push(`content-type ${ct}`);
    if (!/^user-agent:\s*\*/im.test(r.text)) f.push("no User-Agent: * group");
    if (!r.text.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`)) f.push("Sitemap line missing or wrong host");
    const disallows = [...r.text.matchAll(/^disallow:\s*(\S*)/gim)].map((m) => m[1]).filter(Boolean);
    info.push(`Disallow: ${disallows.join(", ") || "(none)"}`);
    if (disallows.some((d) => "/_next/static/x.js".startsWith(d))) f.push("/_next/ is disallowed (blocks JS/CSS)");
    const blocked = paths.filter((p) => disallows.some((d) => p.startsWith(d)));
    blocked.forEach((p) => f.push(`sitemap URL ${p} is disallowed`));
    const legacyBlocked = loadRedirectMap().filter(({ source }) => disallows.some((d) => source.startsWith(d)));
    legacyBlocked.forEach(({ source }) => f.push(`legacy redirect ${source} is disallowed`));
    record(3, "robots.txt is valid", f, info);
  }

  // 4. Sitemap
  {
    const f = [];
    if (sm.status !== 200) f.push(`sitemap.xml HTTP ${sm.status}`);
    if (!/<urlset[^>]+sitemaps\.org/.test(sm.text)) f.push("not a <urlset> sitemap");
    const dupes = smUrls.filter((u, i) => smUrls.indexOf(u) !== i);
    dupes.forEach((u) => f.push(`duplicate ${u}`));
    smUrls.filter((u) => !u.startsWith(CANONICAL_ORIGIN + "/")).forEach((u) => f.push(`wrong host ${u}`));
    for (const bad of ["/ductless", "/services", "/thank-you"])
      if (smUrls.some((u) => pathOf(u) === bad)) f.push(`lists ${bad} (should be excluded)`);
    pages.filter((p) => p.status !== 200).forEach((p) => f.push(`${p.path}: HTTP ${p.status}${p.location ? ` → ${p.location}` : ""}`));
    record(4, "Sitemap is correct", f, [`${smUrls.length} URLs, ${pages.length} fetched, ${ok.length} returned 200`]);
  }

  // 5. Structured data URLs
  {
    const f = [];
    const urls = new Set();
    let blocks = 0;
    for (const p of ok) {
      for (const b of p.ld) {
        blocks++;
        if (!b.ok) f.push(`${p.path}: JSON-LD parse error ${b.error}`);
        else ldUrls(b.data, urls);
      }
      // PPC/service pages must describe themselves, not another URL.
      for (const b of p.ld.filter((x) => x.ok)) {
        const items = [b.data].flat().flatMap((d) => d["@graph"] ?? [d]);
        for (const it of items) {
          if (it["@type"] === "BreadcrumbList") {
            const last = it.itemListElement?.at(-1)?.item;
            const lastUrl = typeof last === "string" ? last : last?.["@id"];
            if (lastUrl && !sameCanonical(lastUrl, expectedCanonical(p.path)))
              f.push(`${p.path}: breadcrumb ends at ${lastUrl}`);
          }
        }
      }
    }
    const list = [...urls];
    const statuses = await pool(list, async (u) => ({ u, r: await get(toBase(base, u)) }));
    statuses.filter(({ r }) => r.status !== 200).forEach(({ u, r }) => f.push(`${u}: HTTP ${r.status}${r.location ? ` → ${r.location}` : ""}`));
    record(5, "Structured data URLs are valid", f, [`${blocks} JSON-LD blocks, ${list.length} distinct URLs checked`]);
  }

  // 6. Google Ads (PPC) pages
  {
    const f = [];
    const ppcPaths = [
      ...paths.filter((p) => p.startsWith("/ac-repair/")).slice(0, 10),
      "/laguna-niguel-ac-repair",
      "/los-angeles-ac-repair",
      "/orange-county-ac-repair",
      "/pasadena-ac-repair",
      "/malibu-ac-repair",
      "/santa-clarita-ac-repair",
    ];
    await pool(ppcPaths, async (p) => {
      const r = await get(base + p);
      if (r.status !== 200) return f.push(`${p}: HTTP ${r.status}`);
      const pg = parsePage(r.text);
      if (/noindex/i.test(pg.robots ?? "")) f.push(`${p}: unexpectedly noindex`);
      if (!pg.hasGtm) f.push(`${p}: GTM missing`);
      if (!pg.hasTel) f.push(`${p}: tel: link missing`);
      if (!pg.hasForm) f.push(`${p}: lead form missing`);
      if (!sameCanonical(pg.canonical, expectedCanonical(p))) f.push(`${p}: canonical ${pg.canonical}`);
    });
    record(6, "Google Ads pages are unaffected", f, [`${ppcPaths.length} landing pages checked (200, GTM, tel:, form, canonical)`]);
  }

  // 7. Forms and tracking
  {
    const f = [];
    ok.filter((p) => !p.hasGtm).forEach((p) => f.push(`${p.path}: GTM ${GTM_ID} missing`));
    ok.filter((p) => !p.hasTel).forEach((p) => f.push(`${p.path}: tel: link missing`));
    for (const p of ["/", "/contact"]) {
      const pg = parsePage((await get(base + p)).text);
      if (!pg.hasForm) f.push(`${p}: lead form missing`);
    }
    const ty = await get(base + "/thank-you");
    if (ty.status !== 200) f.push(`/thank-you HTTP ${ty.status}`);
    // Empty body is rejected by validation before Resend is called: no email sent.
    const api = await get(base + "/api/contact", {
      method: "POST",
      body: "{}",
      headers: { "content-type": "application/json" },
    });
    if (api.status !== 422) f.push(`/api/contact empty POST returned ${api.status}, expected 422`);
    record(7, "Forms and tracking remain intact", f, [
      `GTM on ${ok.filter((p) => p.hasGtm).length}/${ok.length}, tel: on ${ok.filter((p) => p.hasTel).length}/${ok.length}`,
      `/api/contact validation → ${api.status}`,
    ]);
  }

  // 8. No accidental noindex
  {
    const f = [];
    const info = [];
    ok.filter((p) => /noindex/i.test(p.robots ?? "")).forEach((p) => f.push(`${p.path}: meta robots ${p.robots}`));
    const headerNoindex = ok.filter((p) => /noindex/i.test(p.xRobots ?? ""));
    if (headerNoindex.length) {
      const msg = `X-Robots-Tag noindex on ${headerNoindex.length} pages (${headerNoindex[0].xRobots})`;
      // Vercel adds this to every non-production deployment by design.
      if (label === "preview" && !isLocal) info.push(`${msg}: expected on a Vercel preview`);
      else f.push(msg);
    }
    const expectNoindex = { "/thank-you": /noindex/, "/services": /noindex,\s*follow/ };
    for (const [p, re] of Object.entries(expectNoindex)) {
      const pg = parsePage((await get(base + p)).text);
      if (!re.test(pg.robots ?? "")) f.push(`${p}: robots "${pg.robots}" (expected ${re.source})`);
      else info.push(`${p}: ${pg.robots}`);
    }
    record(8, "No accidental noindex changes", f, info);
  }

  // 9. Existing redirects
  {
    const f = [];
    const cases = [
      ...loadRedirectMap(),
      { source: "/about", destination: "/about-us" },
      { source: "/ductless", destination: "/ductless/ductless-mini-split" },
      { source: "/faq", destination: "/", status: 307 },
      { source: "/hvac-installation", destination: "/air-conditioning/ac-installation" },
      // /hvac-repair is a page since Phase 11 (no longer redirects to AC repair).
      { source: "/hvac-cleaning", destination: "/air-duct-services/air-duct-cleaning" },
    ];
    await pool(cases, async (c) => {
      const t = await trace(base + c.source);
      const first = t.hops[0].status;
      const wanted = c.status ?? 308;
      if (first !== wanted && !(wanted === 308 && first === 301)) f.push(`${c.source}: first response ${first}, expected ${wanted}`);
      else if (pathOf(t.final) !== c.destination || t.status !== 200)
        f.push(`${c.source}: ended at ${pathOf(t.final)} (${t.status}), expected ${c.destination}`);
    });
    const missing = await pool(["/this-page-does-not-exist-xyz", "/ac-repair/not-a-city"], async (p) => ({ p, r: await get(base + p) }));
    missing.filter(({ r }) => r.status !== 404).forEach(({ p, r }) => f.push(`${p}: HTTP ${r.status}, expected 404`));
    const info = [`${cases.length} redirects traced`];
    if (label === "production" && !isLocal) {
      const apex = await trace("https://hvacserviceacrepair.com/contact");
      const apexOk = apex.status === 200 && apex.final === `${CANONICAL_ORIGIN}/contact`;
      if (!apexOk) f.push(`apex → www: ended at ${apex.final} (${apex.status})`);
      info.push(`apex → www: ${apex.hops.map((h) => h.status).join(" → ")}`);
      const http = await trace("http://hvacserviceacrepair.com/");
      info.push(`http apex: ${http.hops.map((h) => `${h.status}`).join(" → ")} → ${http.final}`);
      if (!http.final.startsWith(CANONICAL_ORIGIN)) f.push(`http apex ended at ${http.final}`);
    }
    record(9, "Existing redirects work", f, info);
  }

  return { base, label, results, pages };
}

// ── 10. Preview vs production ───────────────────────────────────────────────
// Differences the PR is meant to introduce. Anything else is unexpected.
function compare(prev, prod) {
  const f = [];
  const info = [];
  const byPath = new Map(prod.pages.map((p) => [p.path, p]));
  const counts = { canonicalSlash: 0, titleBrand: 0 };
  for (const p of prev.pages.filter((x) => x.status === 200)) {
    const q = byPath.get(p.path);
    if (!q || q.status !== 200) continue;
    if (p.canonical !== q.canonical) {
      if (strip(p.canonical) === strip(q.canonical)) counts.canonicalSlash++;
      else f.push(`${p.path}: canonical ${q.canonical} → ${p.canonical}`);
    }
    if (p.title !== q.title) {
      // T2 only removes brand repeats, so titles must match once the brand and separators are dropped.
      const core = (t) => (t ?? "").replaceAll("HVAC Service & AC Repair", "").replace(/[\s|—–-]+/g, " ").trim();
      if (core(q.title) === core(p.title)) counts.titleBrand++;
      else f.push(`${p.path}: title "${q.title}" → "${p.title}"`);
    }
    if ((p.robots ?? "") !== (q.robots ?? "")) f.push(`${p.path}: robots "${q.robots}" → "${p.robots}"`);
    if (p.hasGtm !== q.hasGtm || p.hasTel !== q.hasTel || p.hasForm !== q.hasForm)
      f.push(`${p.path}: GTM/tel/form presence changed`);
  }
  const prevSet = new Set(prev.pages.map((p) => p.path));
  const prodSet = new Set(prod.pages.map((p) => p.path));
  const removed = [...prodSet].filter((p) => !prevSet.has(p));
  const added = [...prevSet].filter((p) => !prodSet.has(p));
  const expectedRemoved = new Set(["/ductless", "/services"]);
  removed.filter((p) => !expectedRemoved.has(p)).forEach((p) => f.push(`sitemap: ${p} removed unexpectedly`));
  added.forEach((p) => f.push(`sitemap: ${p} added unexpectedly`));
  info.push(`canonical trailing slash removed: ${counts.canonicalSlash} pages (expected, T1)`);
  info.push(`duplicate brand removed from title: ${counts.titleBrand} pages (expected, T2)`);
  info.push(`sitemap removed: ${removed.join(", ") || "none"} (expected: /ductless, /services)`);
  // Checks failing on production but passing on preview are what the PR fixes.
  for (const r of prev.results) {
    const pr = prod.results.find((x) => x.id === r.id);
    if (pr && !pr.pass && r.pass) info.push(`check ${r.id} fails on production, passes on preview (fixed by PR)`);
    if (pr && pr.pass && !r.pass) f.push(`check ${r.id} passes on production but fails on preview (regression)`);
  }
  return { id: 10, name: "Production and preview differences are expected", pass: f.length === 0, failures: f, info };
}

// ── Report ──────────────────────────────────────────────────────────────────
function print(run) {
  console.log(`\n══ ${run.label.toUpperCase()}: ${run.base}`);
  if (run.unreachable) return console.log(`   UNREACHABLE: ${run.unreachable}`);
  for (const r of run.results) {
    console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.id}. ${r.name}`);
    r.info.forEach((i) => console.log(`      · ${i}`));
    r.failures.slice(0, 15).forEach((x) => console.log(`      ✗ ${x}`));
    if (r.failures.length > 15) console.log(`      … ${r.failures.length - 15} more`);
  }
}

const preview = await runChecks(PREVIEW, "preview");
print(preview);
let production = null;
let cmp = null;
if (PRODUCTION) {
  production = await runChecks(PRODUCTION, "production");
  print(production);
  if (!preview.unreachable && !production.unreachable) {
    cmp = compare(preview, production);
    console.log(`\n══ COMPARISON`);
    console.log(`${cmp.pass ? "PASS" : "FAIL"}  10. ${cmp.name}`);
    cmp.info.forEach((i) => console.log(`      · ${i}`));
    cmp.failures.slice(0, 25).forEach((x) => console.log(`      ✗ ${x}`));
  }
}

const previewResults = [...preview.results, ...(cmp ? [cmp] : [])];
const passed = !preview.unreachable && previewResults.every((r) => r.pass);
console.log(
  `\nRESULT: ${preview.unreachable ? "preview unreachable" : `${previewResults.filter((r) => r.pass).length}/${previewResults.length} checks pass on preview`}` +
    (PRODUCTION ? "" : " (check 10 skipped: pass --production)"),
);
if (args.json) {
  const slim = (r) => r && { ...r, pages: undefined };
  writeFileSync(args.json, JSON.stringify({ preview: slim(preview), production: slim(production), comparison: cmp }, null, 2));
}
process.exit(passed ? 0 : 1);
