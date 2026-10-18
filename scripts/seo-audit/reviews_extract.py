"""Find every testimonial card rendered on every page."""
import json, os, re, sys
from bs4 import BeautifulSoup

CRAWL = sys.argv[1]
out = []
for line in open(os.path.join(CRAWL, "paths.txt")):
    path = line.strip()
    f = "_index" if path == "/" else path.replace("/", "_")
    soup = BeautifulSoup(open(os.path.join(CRAWL, "html", f + ".html"), encoding="utf-8").read(), "lxml")
    main = soup.find("main")
    for p in main.find_all(["p", "blockquote"]):
        t = " ".join(p.get_text(" ", strip=True).split())
        if not (t.startswith("“") and t.endswith("”") and len(t) > 30):
            continue
        card = p.parent
        ps = [" ".join(x.get_text(" ", strip=True).split()) for x in card.find_all("p") if x is not p]
        out.append({"path": path, "body": t.strip("“”"), "name": ps[0] if ps else "", "meta": ps[1] if len(ps) > 1 else ""})
    # Section-level rating claims near reviews
claims = {}
for line in open(os.path.join(CRAWL, "paths.txt")):
    path = line.strip()
    f = "_index" if path == "/" else path.replace("/", "_")
    txt = BeautifulSoup(open(os.path.join(CRAWL, "html", f + ".html"), encoding="utf-8").read(), "lxml").find("main").get_text(" ", strip=True)
    for pat in [r"\d+\+?\s*(?:Google\s+)?(?:five-star\s+|5-star\s+)?reviews", r"\d\.\d\s*(?:stars?|rating|average|★)", r"\d+\+?\s*years", r"\d[\d,]*\+?\s*(?:happy\s+|satisfied\s+)?(?:customers|homeowners|families|homes|jobs|systems)", r"CSLB[^.]{0,60}", r"licen[sc]ed[^.]{0,40}", r"insured", r"background[- ]checked", r"EPA[- ]certified", r"NATE"]:
        for m in re.findall(pat, txt, flags=re.I):
            k = " ".join(m.split())[:70]
            claims.setdefault(k, set()).add(path)
json.dump({"reviews": out, "claims": {k: sorted(v) for k, v in claims.items()}}, open(os.path.join(CRAWL, "reviews.json"), "w"))
print(len(out), "review cards;", len(claims), "distinct claim strings")
