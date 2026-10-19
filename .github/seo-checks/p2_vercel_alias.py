"""Phase 2.3 P2 audit: what does https://hvac-service-ac-repair.vercel.app serve? Read-only GET requests.

For every www sitemap path, fetches the same path on the vercel.app alias and records status,
X-Robots-Tag, robots meta, canonical, and whether the body matches the www page's title.
"""
import collections, concurrent.futures as cf, http.client, re, sys, time, urllib.parse

ALIAS, WWW = "hvac-service-ac-repair.vercel.app", "www.hvacserviceacrepair.com"
UA = {"User-Agent": "hvac-seo-verify/1.0 (+phase-2.3-p2-audit)"}

def get(host, path):
    for _ in range(3):
        try:
            c = http.client.HTTPSConnection(host, timeout=30)
            c.request("GET", path, headers=UA)
            r = c.getresponse()
            return r.status, {k.lower(): v for k, v in r.getheaders()}, r.read().decode("utf-8", "replace")
        except Exception as e:
            err = e
            time.sleep(2)
    return 0, {}, str(err)

def facts(body):
    t = re.search(r"<title>(.*?)</title>", body, re.S)
    rb = re.search(r'<meta name="robots" content="([^"]*)"', body)
    cn = re.search(r'<link rel="canonical" href="([^"]+)"', body)
    return (t.group(1) if t else None), (rb.group(1) if rb else None), (cn.group(1) if cn else None)

_, _, sm = get(WWW, "/sitemap.xml")
paths = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sm)]
stats, bad = collections.Counter(), []

def check(p):
    s, h, b = get(ALIAS, p)
    ws, _, wb = get(WWW, p)
    t, rb, cn = facts(b)
    wt, _, _ = facts(wb)
    out = [f"alias status {s}", f"alias x-robots-tag {h.get('x-robots-tag', 'none')}", f"alias robots meta {rb}",
           "alias canonical -> exact www URL" if (cn or "").rstrip("/") == f"https://{WWW}{p}".rstrip("/") else f"alias canonical OTHER",
           "alias title == www title" if t == wt else "alias title differs from www"]
    return p, out, (s, cn)

for p, out, (s, cn) in cf.ThreadPoolExecutor(8).map(check, paths):
    stats.update(out)
    if "alias canonical OTHER" in out:
        bad.append(f"{p}: canonical {cn}")
print(f"sitemap paths fetched on {ALIAS}: {len(paths)}")
for k, v in sorted(stats.items()):
    print(f"  {v:4d}  {k}")
for x in bad[:20]:
    print("  " + x)

# Links, tracking, forms and structured data on the alias homepage
s, h, b = get(ALIAS, "/")
hrefs = re.findall(r'href="([^"]+)"', b)
print("homepage links: relative", sum(1 for x in hrefs if x.startswith("/") and not x.startswith("//")),
      "| absolute www", sum(1 for x in hrefs if "www.hvacserviceacrepair.com" in x),
      "| absolute vercel.app", sum(1 for x in hrefs if "vercel.app" in x))
print("homepage GTM container present:", "GTM-TRVN8GDR" in b, "| tel links:", len(re.findall(r'href="tel:', b)))
ld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', b, re.S)
print("JSON-LD blocks:", len(ld), "| URLs on www:", sum(x.count("https://www.hvacserviceacrepair.com") for x in ld),
      "| URLs on vercel.app:", sum(x.count("vercel.app") for x in ld))
for path in ("/?gclid=test123&utm_source=google", "/ac-repair/anaheim?gclid=test123", "/robots.txt", "/sitemap.xml", "/api/contact", "/thank-you", "/does-not-exist"):
    s, h, b = get(ALIAS, path)
    t, rb, cn = facts(b)
    print(f"alias {path}: {s} | x-robots {h.get('x-robots-tag', 'none')} | robots {rb} | canonical {cn} | location {h.get('location', '-')}")
