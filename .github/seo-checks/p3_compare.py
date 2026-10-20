"""Phase 2.3 P3: compare the live site after the PR #5 merge (read-only).

    python3 p3_compare.py <baseline-dir> <live-dir> <merged-build-dir>

baseline: crawl of a local build of the pre-merge commit (what production served).
live: crawl of production after the deploy.
merged: crawl of a local build of the merged commit.
"""
import json, re, sys
from bs4 import BeautifulSoup

B, L, M = sys.argv[1:4]
ADS = lambda p: p.startswith("/ac-repair/") or bool(re.fullmatch(r"/[a-z-]+-ac-repair", p))
P1 = {"/service-areas/orange-county/placentia", "/service-areas/orange-county/costa-mesa", "/service-areas/orange-county/yorba-linda"}
FORBIDDEN = [r"respond within 1 hour", r"Average arrival", r"(Call|calls placed|calling|call us) before noon", r"within the hour", r"fully stocked", r"Parts on the Truck",
             r"on the first visit", r"CSLB Certified", r"Licensed &(amp;)? Insured", r"EPA Certified", r"background-checked",
             r"non-emergency basis", r"Emergency repair is not available", r"\| Scheduled Service", r"We Fix It Today", r"usually same day",
             r"aggregateRating", r'"@type":"Review"', r"100\+ Google reviews", r"5\.0 on Google"]

def load(d, p):
    return open(f"{d}/html/{'_index' if p == '/' else p.replace('/', '_')}.html", encoding="utf-8").read()

def norm(x):
    return re.sub(r'/_next/static/[^"\s)]+|[?&]dpl=[^"&\s]+', "", x)

def facts(h):
    s = BeautifulSoup(h, "lxml")
    meta = lambda n: (s.find("meta", attrs={"name": n}) or {}).get("content")
    can = s.find("link", rel="canonical")
    ld = [x.string or "" for x in s.find_all("script", type="application/ld+json")]
    parsed = [json.loads(x) for x in ld]
    return {"title": s.title.get_text() if s.title else None, "desc": meta("description"), "robots": meta("robots"),
            "canonical": can.get("href") if can else None, "h1": [h.get_text(" ", strip=True) for h in s.find_all("h1")],
            "jsonld": sorted(ld), "ldtypes": sorted({t for x in ld for t in re.findall(r'"@type":"(\w+)"', x)}),
            "main": norm(str(s.find("main"))), "footer": norm(str(s.find("footer"))),
            "gtm": h.count("GTM-TRVN8GDR"), "tel": h.count('href="tel:'), "forms": len(s.find_all("form")),
            "links": sorted(a["href"] for a in s.find_all("a", href=True) if a["href"].startswith("/")), "_parsed": parsed}

paths = [l.strip() for l in open(f"{L}/paths.txt") if l.strip()]
base_paths = [l.strip() for l in open(f"{B}/paths.txt") if l.strip()]
fails = []
if sorted(paths) != sorted(base_paths):
    fails.append("sitemap URL set differs from the baseline")
ads = [p for p in paths if ADS(p)]
changed_titles, changed_h1, live_vs_build = [], [], []
for p in paths:
    b, l, m = facts(load(B, p)), facts(load(L, p)), facts(load(M, p))
    for k in ("robots", "canonical", "gtm", "tel", "forms", "links", "ldtypes"):
        if b[k] != l[k]:
            fails.append(f"{p}: {k} changed")
    for k in ("title", "desc", "h1", "jsonld", "main", "footer"):
        if l[k] != m[k]:
            live_vs_build.append(f"{p}:{k}")
    if b["title"] != l["title"]: changed_titles.append(p)
    if b["h1"] != l["h1"]: changed_h1.append(p)
    raw = load(L, p)
    for pat in FORBIDDEN:
        if re.search(pat, raw):
            fails.append(f"{p}: contains /{pat}/")
print(f"pages: {len(paths)}; Ads pages: {len(ads)}")
print(f"titles changed vs baseline: {changed_titles}")
print(f"H1 changed vs baseline: {changed_h1}")
print(f"Ads pages with changed title/H1: {[p for p in ads if p in changed_titles or p in changed_h1]}")
print(f"live differs from the merged build on: {live_vs_build[:20]} ({len(live_vs_build)})")
if live_vs_build: fails.append("live HTML differs from a build of the merged commit")
if changed_titles != ["/service-areas/santa-barbara-county"]: fails.append(f"unexpected title changes: {changed_titles}")
if changed_h1: fails.append(f"unexpected H1 changes: {changed_h1}")
for p in P1:
    b, l = facts(load(B, p)), facts(load(L, p))
    d = [k for k in ("title", "desc", "h1", "jsonld", "main") if b[k] != l[k]]
    print(f"P1 hub {p}: changed {d or 'nothing outside the footer'}")
    if d: fails.append(f"P1 hub {p} changed: {d}")
home = facts(load(L, "/"))
biz = [o for d in home["_parsed"] for o in (d.get("@graph", [d]) if isinstance(d, dict) else d) if o.get("@type") == "HVACBusiness" and "openingHoursSpecification" in o]
if not biz:
    fails.append("homepage HVACBusiness missing")
else:
    o = biz[0]
    hours = o["openingHoursSpecification"]; areas = [a["name"] for a in o["areaServed"]]
    print("HVACBusiness hours:", hours); print("HVACBusiness areaServed:", areas)
    if not (len(hours) == 1 and len(hours[0]["dayOfWeek"]) == 7 and hours[0]["opens"] == "00:00" and hours[0]["closes"] == "23:59"): fails.append("hours are not 24/7")
    for c in ("Orange County", "Riverside County", "Los Angeles County", "Ventura County", "Santa Barbara County"):
        if c not in areas: fails.append(f"areaServed missing {c}")
    if "aggregateRating" in o: fails.append("aggregateRating present")
print("FAILURES:" if fails else "ALL P3 PRODUCTION CHECKS PASS", *fails[:40], sep="\n  ")
sys.exit(1 if fails else 0)
