"""Phase 2.3 P2 post-change check: hvac-service-ac-repair.vercel.app must 308 to the exact www URL. Read-only GETs.

    python3 p2_alias_verify.py

For every www sitemap path: first hop on the alias is 308 with Location == https://www.hvacserviceacrepair.com{path},
the chain ends on that URL with 200, no loops, at most 1 redirect. Query strings must be preserved.
Preview, branch and deployment URLs must still be SSO-protected (302 to vercel.com/sso-api) with X-Robots-Tag noindex.
"""
import collections, concurrent.futures as cf, http.client, re, sys, time, urllib.parse

ALIAS, WWW = "hvac-service-ac-repair.vercel.app", "https://www.hvacserviceacrepair.com"
UA = {"User-Agent": "hvac-seo-verify/1.0 (+phase-2.3-p2)"}

def once(url):
    u = urllib.parse.urlsplit(url)
    for _ in range(3):
        try:
            c = http.client.HTTPSConnection(u.netloc, timeout=30)
            c.request("GET", (u.path or "/") + (f"?{u.query}" if u.query else ""), headers=UA)
            r = c.getresponse()
            r.read()
            return r.status, {k.lower(): v for k, v in r.getheaders()}
        except Exception as e:
            err = e
            time.sleep(2)
    return 0, {"error": str(err)}

def chain(url, limit=6):
    hops, seen = [], set()
    while len(hops) <= limit:
        if url in seen:
            return hops, url, "LOOP"
        seen.add(url)
        s, h = once(url)
        hops.append(s)
        if s in (301, 302, 303, 307, 308) and h.get("location"):
            url = urllib.parse.urljoin(url, h["location"])
            continue
        return hops, url, s
    return hops, url, "TOO_MANY"

s, _ = once(WWW + "/sitemap.xml")
c = http.client.HTTPSConnection("www.hvacserviceacrepair.com", timeout=30); c.request("GET", "/sitemap.xml", headers=UA)
sm = c.getresponse().read().decode()
paths = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sm)]
stats, fails = collections.Counter(), []

def check(p):
    out, f, want = collections.Counter(), [], WWW + p
    s, h = once(f"https://{ALIAS}{p}")
    out[f"alias first hop {s}"] += 1
    if s != 308 or h.get("location") != want:
        f.append(f"alias {p}: {s} -> {h.get('location')} (expected 308 -> {want})")
    hops, final, fs = chain(f"https://{ALIAS}{p}")
    out[f"alias chain {'>'.join(map(str, hops))}"] += 1
    if final != want or fs != 200 or len(hops) != 2:
        f.append(f"alias {p}: chain {hops} ended {final} [{fs}]")
    return out, f

for out, f in cf.ThreadPoolExecutor(8).map(check, paths):
    stats.update(out)
    fails += f
print(f"alias paths checked: {len(paths)}")
for k, v in sorted(stats.items()):
    print(f"  {v:4d}  {k}")

print("== query strings")
for q in ("/?gclid=test123&utm_source=google&utm_medium=cpc", "/ac-repair/anaheim?gclid=test123",
          "/service-areas/orange-county/yorba-linda?utm_campaign=x&utm_term=ac%20repair"):
    s, h = once(f"https://{ALIAS}{q}")
    want = WWW + q
    ok = s == 308 and h.get("location") == want
    print(f"  {q}: {s} -> {h.get('location')} {'OK' if ok else 'FAIL'}")
    if not ok:
        fails.append(f"query {q}: {s} -> {h.get('location')}")

print("== other alias paths")
for p in ("/robots.txt", "/sitemap.xml", "/api/contact", "/thank-you", "/does-not-exist"):
    hops, final, fs = chain(f"https://{ALIAS}{p}")
    print(f"  {p}: {'>'.join(map(str, hops))} -> {final} [{fs}]")
    if not final.startswith(WWW + p) or hops[0] != 308:
        fails.append(f"alias {p}: {hops} {final}")

print("== preview, branch and deployment URLs (must stay SSO-protected, noindex)")
for u in ("https://hvac-service-ac-repair-sams-projects-4743330d.vercel.app/",
          "https://hvac-service-ac-repair-git-main-sams-projects-4743330d.vercel.app/",
          "https://hvac-service-ac-repair-np1fcdh5w-sams-projects-4743330d.vercel.app/"):
    s, h = once(u)
    ok = s == 302 and "vercel.com/sso-api" in h.get("location", "") and "noindex" in h.get("x-robots-tag", "")
    print(f"  {u}: {s} -> {re.sub(r'nonce=[^&]*', 'nonce=...', h.get('location', '-'))} | x-robots {h.get('x-robots-tag', 'none')} {'OK' if ok else 'FAIL'}")
    if not ok:
        fails.append(f"preview {u}: {s}")

print(f"FAILURES: {len(fails)}")
for x in fails[:60]:
    print("  " + x)
sys.exit(1 if fails else 0)
