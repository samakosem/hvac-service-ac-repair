"""Phase 2.3 P0: verify the apex-to-www redirect for every sitemap URL (read-only GET requests).

    python3 p0_apex.py <expected-apex-status>      e.g. 307 (baseline) or 308 (after the change)

For every URL in https://www.hvacserviceacrepair.com/sitemap.xml it checks:
  * https://hvacserviceacrepair.com{path}: exactly one hop, status == expected, Location == the exact www URL
  * http://hvacserviceacrepair.com{path}: ends on the exact www URL with 200, no loop, at most 2 hops
  * https://www.hvacserviceacrepair.com{path}: 200 with a self-referencing canonical
  * Google Ads landing pages (/ac-repair/*, /*-ac-repair): GTM container, tel: link and a lead form present
Exits 1 on any failure. Prints a compact summary plus every failure.
"""
import collections, concurrent.futures as cf, http.client, re, sys, time, urllib.parse

EXPECT = int(sys.argv[1])
WWW, APEX = "https://www.hvacserviceacrepair.com", "hvacserviceacrepair.com"
UA = {"User-Agent": "hvac-seo-verify/1.0 (+phase-2.3-p0)"}

def once(url):
    u = urllib.parse.urlsplit(url)
    C = http.client.HTTPSConnection if u.scheme == "https" else http.client.HTTPConnection
    for _ in range(3):
        try:
            c = C(u.netloc, timeout=30)
            c.request("GET", (u.path or "/") + (f"?{u.query}" if u.query else ""), headers=UA)
            r = c.getresponse()
            return r.status, r.getheader("location"), r.read().decode("utf-8", "replace")
        except Exception as e:
            err = e
            time.sleep(2)
    return 0, None, f"ERROR {err}"

def chain(url, limit=6):
    hops, seen = [], set()
    while len(hops) <= limit:
        if url in seen:
            return hops, url, "LOOP", ""
        seen.add(url)
        s, loc, body = once(url)
        hops.append(s)
        if s in (301, 302, 303, 307, 308) and loc:
            url = urllib.parse.urljoin(url, loc)
            continue
        return hops, url, s, body
    return hops, url, "TOO_MANY", ""

_, _, sm = once(WWW + "/sitemap.xml")
paths = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sm)]
fails, stats = [], collections.Counter()

def check(p):
    out, f = collections.Counter(), []
    want = WWW + p
    s, loc, _ = once(f"https://{APEX}{p}")
    out[f"apex https first hop {s}"] += 1
    if s != EXPECT or (loc or "") != want:
        f.append(f"apex https {p}: {s} -> {loc} (expected {EXPECT} -> {want})")
    hops, final, fs, _ = chain(f"https://{APEX}{p}")
    out[f"apex https chain {'>'.join(map(str, hops))}"] += 1
    if final != want or fs != 200:
        f.append(f"apex https {p}: chain {hops} ended {final} [{fs}]")
    hops, final, fs, _ = chain(f"http://{APEX}{p}")
    out[f"apex http chain {'>'.join(map(str, hops))}"] += 1
    if final != want or fs != 200 or len(hops) > 3:
        f.append(f"apex http {p}: chain {hops} ended {final} [{fs}]")
    s, _, body = once(want)
    out[f"www status {s}"] += 1
    canon = re.search(r'<link rel="canonical" href="([^"]+)"', body)
    canon = canon.group(1) if canon else None
    if s != 200:
        f.append(f"www {p}: status {s}")
    if (canon or "").rstrip("/") != want.rstrip("/"):
        f.append(f"www {p}: canonical {canon}")
    else:
        out["www canonical self"] += 1
    if p.startswith("/ac-repair/") or re.fullmatch(r"/[a-z-]+-ac-repair", p):
        gtm, tel, form = "GTM-TRVN8GDR" in body, 'href="tel:' in body, "<form" in body
        out["ads page GTM+tel+form ok" if gtm and tel and form else "ads page MISSING GTM/tel/form"] += 1
        if not (gtm and tel and form):
            f.append(f"ads {p}: GTM={gtm} tel={tel} form={form}")
    return out, f

for out, f in cf.ThreadPoolExecutor(8).map(check, paths):
    stats.update(out)
    fails += f

print(f"sitemap URLs checked: {len(paths)}; expected apex status: {EXPECT}")
for k, v in sorted(stats.items()):
    print(f"  {v:4d}  {k}")
for label, url in (("apex homepage", f"https://{APEX}/"), ("apex sitemap", f"https://{APEX}/sitemap.xml"),
                   ("apex robots", f"https://{APEX}/robots.txt"), ("http apex homepage", f"http://{APEX}/"),
                   ("apex city page", f"https://{APEX}/service-areas/orange-county/villa-park"),
                   ("apex Ads page", f"https://{APEX}/ac-repair/bellflower"),
                   ("vercel.app alias (unchanged on purpose)", "https://hvac-service-ac-repair.vercel.app/")):
    hops, final, fs, _ = chain(url)
    print(f"{label}: {url} -> {'>'.join(map(str, hops))} -> {final} [{fs}]")
    if label == "apex sitemap" and (final != WWW + "/sitemap.xml" or fs != 200 or hops[0] != EXPECT):
        fails.append(f"apex sitemap: {hops} {final} [{fs}]")
print(f"FAILURES: {len(fails)}")
for x in fails[:60]:
    print("  " + x)
sys.exit(1 if fails else 0)
