"""Phase 2.3 P1: compare a crawl of the merged site with the pre-merge baseline (read-only).

    python3 p1_compare.py <before-dir> <after-dir>

Every page except the three approved hubs must match the baseline on title, description,
robots, canonical, Open Graph, JSON-LD, <main>/<header>/<footer> HTML, GTM and tel: links.
The three hubs get their own checks: title, description, self-canonical, index, JSON-LD,
FAQPage, 24/7 hours and city service links.
"""
import json, re, sys
from bs4 import BeautifulSoup

BEFORE, AFTER = sys.argv[1], sys.argv[2]
SITE = "https://www.hvacserviceacrepair.com"
HUBS = {
    "/service-areas/orange-county/placentia": ("Placentia", "Placentia HVAC: Furnace & AC Service | HVAC Service & AC Repair"),
    "/service-areas/orange-county/costa-mesa": ("Costa Mesa", "Costa Mesa HVAC Repair & Installation | HVAC Service & AC Repair"),
    "/service-areas/orange-county/yorba-linda": ("Yorba Linda", "Yorba Linda HVAC: Furnace & AC Service | HVAC Service & AC Repair"),
}

def load(d, p):
    return open(f"{d}/html/{'_index' if p == '/' else p.replace('/', '_')}.html", encoding="utf-8").read()

def norm(x):
    # build-specific asset hashes and deployment ids are not content
    return re.sub(r'/_next/static/[^"\s)]+|[?&]dpl=[^"&\s]+', "", x)

def facts(h):
    s = BeautifulSoup(h, "lxml")
    meta = lambda n: (s.find("meta", attrs={"name": n}) or {}).get("content")
    can = s.find("link", rel="canonical")
    return {"title": s.title.get_text() if s.title else None, "desc": meta("description"), "robots": meta("robots"),
            "canonical": can.get("href") if can else None,
            "jsonld": sorted(x.string or "" for x in s.find_all("script", type="application/ld+json")),
            "og": [(m.get("property"), m.get("content")) for m in s.find_all("meta", property=True)],
            "main": norm(str(s.find("main"))), "header": norm(str(s.find("header"))), "footer": norm(str(s.find("footer"))),
            "gtm": h.count("GTM-TRVN8GDR"), "tel": h.count('href="tel:')}

paths = [l.strip() for l in open(f"{AFTER}/paths.txt") if l.strip()]
base_paths = [l.strip() for l in open(f"{BEFORE}/paths.txt") if l.strip()]
fails = []
if sorted(paths) != sorted(base_paths):
    fails.append(f"sitemap differs: +{sorted(set(paths) - set(base_paths))} -{sorted(set(base_paths) - set(paths))}")

changed = {}
for p in paths:
    a, b = facts(load(BEFORE, p)), facts(load(AFTER, p))
    d = [k for k in a if a[k] != b[k]]
    if d:
        changed[p] = d
unexpected = {p: d for p, d in changed.items() if p not in HUBS}
ads = [p for p in paths if p.startswith("/ac-repair/") or re.fullmatch(r"/[a-z-]+-ac-repair", p)]
hubs = [p for p in paths if p.startswith("/service-areas/") and p.count("/") == 3]
print(f"pages compared: {len(paths)}; changed: {sorted(changed)}")
print(f"Google Ads pages: {len(ads)}, changed: {[p for p in ads if p in changed]}")
print(f"city hubs: {len(hubs)}, changed: {sorted(p for p in hubs if p in changed)}")
if unexpected:
    fails.append(f"unexpected changes: {unexpected}")
if len(ads) != 181:
    fails.append(f"expected 181 Ads pages, found {len(ads)}")
if len(hubs) != 37:
    fails.append(f"expected 37 city hubs, found {len(hubs)}")

links = set()
for p, (city, title) in HUBS.items():
    s = BeautifulSoup(load(AFTER, p), "lxml")
    main = s.find("main")
    text = main.get_text(" ")
    desc = s.find("meta", attrs={"name": "description"})["content"]
    can = s.find("link", rel="canonical")["href"]
    robots = (s.find("meta", attrs={"name": "robots"}) or {}).get("content")
    blocks = [json.loads(x.string) for x in s.find_all("script", type="application/ld+json")]
    flat = []
    for blk in blocks:
        flat += blk.get("@graph", [blk]) if isinstance(blk, dict) else blk
    types = sorted({str(x.get("@type")) for x in flat})
    faq = next((x for x in flat if x.get("@type") == "FAQPage"), None)
    city_links = sorted({a["href"] for a in main.find_all("a", href=True) if re.fullmatch(r"/(air-conditioning|heating)/[a-z-]+/" + re.escape(city.lower().replace(" ", "-")), a["href"])})
    links |= {a["href"].split("#")[0] for a in s.find_all("a", href=True) if a["href"].startswith("/")}
    checks = {
        "title": s.title.get_text() == title,
        "title 50-65 chars": 50 <= len(s.title.get_text()) <= 65,
        "description 120-160 chars": 120 <= len(desc) <= 160,
        "self-canonical": can == SITE + p,
        "indexable": robots in (None, "index, follow"),
        "one H1 naming the city": [h.get_text(" ", strip=True).replace(" ,", ",") for h in s.find_all("h1")] == [f"HVAC Service in {city}, CA"],
        "JSON-LD parses, Service present": "Service" in types,
        "FAQPage with 6 questions": bool(faq) and len(faq.get("mainEntity", [])) == 6,
        "24/7 hours shown": "Open 24 hours, 7 days a week, including emergency service" in text,
        "no weekday/Saturday hours on page": not re.search(r"Mon[–-]Fri|Sat:|7:00 AM|within 1 hour", text),
        "one lead form": len(main.find_all("form")) == 1,
        "tel: link present": 'href="tel:' in str(s),
        "city service links": len(city_links) >= 3,
    }
    print(f"{p}: title={s.title.get_text()!r} ({len(s.title.get_text())}) desc={len(desc)} schema={types} city_links={city_links}")
    for k, v in checks.items():
        print(("  PASS " if v else "  FAIL ") + k)
        if not v:
            fails.append(f"{p}: {k}")
open("hub_links.txt", "w").write("\n".join(sorted(l for l in links if l)) + "\n")
print("FAILURES:" if fails else "ALL COMPARISON CHECKS PASS", *fails, sep="\n  ")
sys.exit(1 if fails else 0)
