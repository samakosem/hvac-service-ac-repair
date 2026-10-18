"""Phase 2.2: compare two crawls (production baseline vs. branch) for the internal linking change.

    python3 -I scripts/seo-audit/compare_internal_links.py <baseline-crawl> <new-crawl>

Both crawls need html/ and pages.json (from extract.py). Checks that metadata,
canonicals, robots, H1s, Open Graph, JSON-LD, GTM, phone links and forms are
unchanged; that Google Ads pages are untouched; that no link was removed; and
reports every link added, by page family.
"""
import collections, json, os, re, sys
from bs4 import BeautifulSoup

BASE, NEW = sys.argv[1:3]
B = {p["path"]: p for p in json.load(open(os.path.join(BASE, "pages.json")))}
A = {p["path"]: p for p in json.load(open(os.path.join(NEW, "pages.json")))}

def raw(crawl, path):
    f = "_index" if path == "/" else path.replace("/", "_")
    return open(os.path.join(crawl, "html", f + ".html"), encoding="utf-8").read()

def facts(html):
    s = BeautifulSoup(html, "lxml")
    meta = lambda n: (s.find("meta", attrs={"name": n}) or {}).get("content")
    canon = s.find("link", rel="canonical")
    return {
        "title": s.title.get_text() if s.title else None, "description": meta("description"), "robots": meta("robots"),
        "canonical": canon.get("href") if canon else None,
        "h1": [h.get_text(" ", strip=True) for h in s.find_all("h1")],
        "open_graph": [(m.get("property"), m.get("content")) for m in s.find_all("meta", property=True)],
        "jsonld": sorted(x.string or "" for x in s.find_all("script", type="application/ld+json")),
        "gtm": html.count("GTM-TRVN8GDR"),
        "tel": sorted(a["href"] for a in s.find_all("a", href=True) if a["href"].startswith("tel:")),
        "forms": [sorted(i.get("name") or i.get("id") or i.name for i in f.find_all(["input", "select", "textarea"])) for f in s.find_all("form")],
    }

report = {"pages": len(A), "missing": sorted(set(B) - set(A)), "added_pages": sorted(set(A) - set(B))}
diffs = collections.defaultdict(list)
for p in A:
    a, b = facts(raw(BASE, p)), facts(raw(NEW, p))
    for k in a:
        if a[k] != b[k]:
            diffs[k].append(p)
report["field_differences"] = dict(diffs)

ads = [p for p in A if p.startswith("/ac-repair/") or re.fullmatch(r"/[a-z-]+-ac-repair", p)]
links = lambda pg: sorted((l["to"], l["anchor"], l["region"]) for l in pg["links"])
report["ads_pages_checked"] = len(ads)
report["ads_pages_changed"] = [p for p in ads if B[p]["text"] != A[p]["text"] or links(B[p]) != links(A[p])]

per_family = collections.defaultdict(lambda: [0, 0])
removed, duplicates, destinations, total = [], [], set(), 0
for p in A:
    before = collections.Counter((l["to"], l["anchor"]) for l in B[p]["links"] if l["region"] == "main")
    after = collections.Counter((l["to"], l["anchor"]) for l in A[p]["links"] if l["region"] == "main")
    new, gone = after - before, before - after
    if gone:
        removed.append(p)
    n = sum(new.values())
    if n:
        per_family[A[p]["family"]][0] += 1
        per_family[A[p]["family"]][1] += n
        total += n
        for (to, _), _c in new.items():
            destinations.add(to)
            if any(t == to for t, _a in before):
                duplicates.append((p, to))
report["pages_with_removed_links"] = removed
report["new_links_total"] = total
report["new_links_by_family"] = {f: {"pages": v[0], "links": v[1]} for f, v in sorted(per_family.items())}
report["new_links_duplicating_existing"] = duplicates
report["new_destinations"] = len(destinations)
report["new_destinations_not_in_sitemap"] = sorted(d for d in destinations if d not in A)
print(json.dumps(report, indent=1))
