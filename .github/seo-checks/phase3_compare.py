"""Phase 3 (PR #7): per-page diff of SEO-critical head and conversion elements, production vs PR build.

    python3 phase3_compare.py <prod-crawl-dir> <pr-crawl-dir>

Fails if anything changes outside the expected set.
"""
import json, os, re, sys
from bs4 import BeautifulSoup
A, B = sys.argv[1], sys.argv[2]
TITLE_PAGES = {"/air-conditioning/ac-repair", "/air-conditioning/emergency-ac-repair", "/heating/furnace-repair",
               "/maintenance/residential-maintenance-plan", "/service-areas/orange-county", "/about-us",
               "/calculators/ac-size-calculator", "/calculators/seer2-savings-calculator"}
OG_PAGES = {"/contact", "/reviews", "/financing", "/maintenance-plans", "/careers"}

def facts(d, p):
    f = "_index" if p == "/" else p.replace("/", "_")
    s = BeautifulSoup(open(f"{d}/html/{f}.html", encoding="utf-8").read(), "lxml")
    m = lambda **k: (s.find("meta", attrs=k) or {}).get("content")
    types = []
    for sc in s.find_all("script", type="application/ld+json"):
        j = json.loads(sc.string)
        types += [str(i.get("@type")) for i in (j.get("@graph", [j]) if isinstance(j, dict) else j)]
    html = str(s)
    return {
        "title": s.title.string if s.title else None, "description": m(name="description"),
        "canonical": (s.find("link", rel="canonical") or {}).get("href"), "robots": m(name="robots"),
        "h1": [h.get_text(" ", strip=True) for h in s.find_all("h1")],
        "og:url": m(property="og:url"), "og:image": bool(m(property="og:image")), "twitter:card": m(name="twitter:card"),
        "gtm": html.count("GTM-TRVN8GDR"), "tel": len(s.select('a[href^="tel:"]')), "forms": len(s.find_all("form")),
        "inputs": sorted(i.get("name") or "" for i in s.select("form input, form select, form textarea")),
        "schema": sorted(types),
    }

pa = open(f"{A}/paths.txt").read().split(); pb = open(f"{B}/paths.txt").read().split()
assert pa == pb, f"sitemap differs: {set(pa) ^ set(pb)}"
bad, changed = [], {}
for p in pa:
    a, b = facts(A, p), facts(B, p)
    for k in a:
        if a[k] == b[k]: continue
        ok = (k in ("title", "description") and p in TITLE_PAGES) or \
             (k in ("og:url", "og:image") and p in OG_PAGES and not a[k]) or \
             (k == "twitter:card" and p in OG_PAGES and b[k] == "summary_large_image") or \
             (k == "schema" and p == "/promotions" and sorted(a[k]) == sorted(b[k] + ["BreadcrumbList"]))
        (changed if ok else {}).setdefault(p, []).append(k)
        if not ok: bad.append((p, k, a[k], b[k]))
print(f"{len(pa)} pages compared")
for p, ks in sorted(changed.items()): print(f"EXPECTED {p}: {', '.join(ks)}")
print(f"title/description changed on {sum(1 for p,ks in changed.items() if 'title' in ks or 'description' in ks)} pages (expected 8)")
for x in bad: print("UNEXPECTED", *x)
sys.exit(1 if bad or {p for p, ks in changed.items() if 'title' in ks} != TITLE_PAGES else 0)
