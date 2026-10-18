"""Compare two crawls (before/after the testimonial fix) page by page.

    python3 -I scripts/seo-audit/compare_testimonial_fix.py <before-crawl> <after-crawl> <reviews.ts>

Checks that only testimonial content changed: same URLs, titles, meta
descriptions, canonicals, robots meta, H1s, JSON-LD, GTM, phone links and
forms. Then searches the raw HTML (including the inline React payload) of
every page for every testimonial that was on the site before.
"""
import collections, html, json, os, re, sys
from bs4 import BeautifulSoup

BEFORE, AFTER, REVIEWS_TS = sys.argv[1:4]

def load(crawl, path):
    f = "_index" if path == "/" else path.replace("/", "_")
    return open(os.path.join(crawl, "html", f + ".html"), encoding="utf-8").read()

def facts(raw):
    s = BeautifulSoup(raw, "lxml")
    meta = lambda n: (s.find("meta", attrs={"name": n}) or {}).get("content")
    canon = s.find("link", rel="canonical")
    forms = s.find_all("form")
    return {
        "title": s.title.get_text() if s.title else None,
        "description": meta("description"),
        "robots": meta("robots"),
        "canonical": canon.get("href") if canon else None,
        "h1": [h.get_text(" ", strip=True) for h in s.find_all("h1")],
        "jsonld": sorted(x.string or "" for x in s.find_all("script", type="application/ld+json")),
        "gtm": raw.count("GTM-TRVN8GDR"),
        "tel": sorted(a["href"] for a in s.find_all("a", href=True) if a["href"].startswith("tel:")),
        "forms": [sorted(i.get("name") or i.get("id") or i.name for i in f.find_all(["input", "select", "textarea"])) for f in forms],
        "main_words": len(s.find("main").get_text(" ", strip=True).split()),
    }

paths = [l.strip() for l in open(os.path.join(AFTER, "paths.txt"))]
before_paths = {l.strip() for l in open(os.path.join(BEFORE, "paths.txt"))}
report = {"pages": len(paths), "missing_vs_before": sorted(before_paths - set(paths)), "added_vs_before": sorted(set(paths) - before_paths)}
diffs = collections.defaultdict(list)
words = {}
for p in paths:
    a, b = facts(load(BEFORE, p)), facts(load(AFTER, p))
    for k in a:
        if k == "main_words":
            continue
        if a[k] != b[k]:
            diffs[k].append(p)
    words[p] = (a["main_words"], b["main_words"])
report["field_differences"] = {k: v for k, v in diffs.items()}
report["pages_with_changed_main_text"] = sum(1 for a, b in words.values() if a != b)

# Every testimonial that was on the site before: body text and name+location line.
before_cards = json.load(open(os.path.join(BEFORE, "reviews.json")))["reviews"]
snippets = set()
for c in before_cards:
    body = re.sub(r"\s+", " ", c["body"]).strip()
    snippets.add(body[:60])
    if c["meta"]:
        snippets.add(f'{c["name"]}')
# Google reviews held in reviews.ts (none verified, so none may render).
ts = open(REVIEWS_TS, encoding="utf-8").read()
google_texts = [json.loads(m) for m in re.findall(r'reviewText:\s*\n\s*("(?:[^"\\]|\\.)*")', ts)]
google_names = re.findall(r'reviewerName: "([^"]+)"', ts)
for t in google_texts:
    snippets.add(re.sub(r"\s+", " ", t).strip()[:50])
names = {c["name"] for c in before_cards if re.fullmatch(r"[A-Z][a-z]+ [A-Z]\.", c["name"])} | set(google_names)

hits = collections.defaultdict(list)
for p in paths:
    raw = load(AFTER, p)
    text = html.unescape(raw).replace("\\u0026", "&").replace('\\"', '"')
    text = re.sub(r"\s+", " ", text)
    for sn in snippets:
        if len(sn) >= 25 and sn in text:
            hits[sn].append(p)
    for n in names:
        if re.search(r"(?<![A-Za-z])" + re.escape(n) + r"(?![A-Za-z])", text):
            hits["NAME " + n].append(p)
report["testimonial_snippets_checked"] = sum(1 for s in snippets if len(s) >= 25)
report["reviewer_names_checked"] = len(names)
report["remaining_hits"] = {k: v[:5] + ([f"... {len(v)} pages"] if len(v) > 5 else []) for k, v in hits.items()}
print(json.dumps(report, indent=1))
