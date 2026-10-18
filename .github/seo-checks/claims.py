"""Production content checks for Phase 2.1 (read-only).

Fetches every sitemap URL from the live domain and checks:
- no former testimonial text or reviewer name appears in the HTML
- no rating / review-count / customer-statistic claims in visible text, ARIA or JSON-LD
- /reviews shows the new title, H1, description and eyebrow, plus the GBP link
- QuickChecks present on the Ads pages and city service pages
Usage: python3 claims.py <base-url> <repo-checkout>
"""
import concurrent.futures as cf, csv, html, json, re, sys, urllib.request
from html.parser import HTMLParser

BASE, REPO = sys.argv[1].rstrip("/"), sys.argv[2]
UA = {"User-Agent": "hvac-seo-verify/1.0 (+phase-2.1)"}

def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return r.status, r.read().decode("utf-8", "replace")

class Text(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.parts = []; self.aria = []; self.ld = []; self.in_ld = False
    def handle_starttag(self, t, a):
        a = dict(a)
        if "aria-label" in a: self.aria.append(a["aria-label"])
        if t in ("script", "style"):
            self.skip += 1; self.in_ld = a.get("type") == "application/ld+json"
            if self.in_ld: self.ld.append("")
    def handle_endtag(self, t):
        if t in ("script", "style"): self.skip -= 1; self.in_ld = False
    def handle_data(self, d):
        if self.in_ld: self.ld[-1] += d
        elif not self.skip: self.parts.append(d)

_, sm = get(BASE + "/sitemap.xml")
urls = [html.unescape(u) for u in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sm)]
paths = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in urls]

# Former testimonials: inventory text (city placeholder removed) and names; Google reviewer names.
snips, names = set(), set()
for row in csv.DictReader(open(f"{REPO}/docs/seo-phase-2/testimonial-inventory.csv")):
    t = row["text"].split("{city}")[0].strip()
    if len(t) >= 30: snips.add(t[:60])
    if re.fullmatch(r"[A-Z][a-z]+ [A-Z]\.", row["reviewer_name_shown"]): names.add(row["reviewer_name_shown"])
ts = open(f"{REPO}/src/lib/content/reviews.ts").read()
names |= set(re.findall(r'reviewerName: "([^"]+)"', ts))
for t in re.findall(r'reviewText:\s*\n\s*("(?:[^"\\]|\\.)*")', ts):
    snips.add(json.loads(t)[:50])

CLAIM = re.compile(r"(\d\.\d\s*(?:stars?|rating|on google|·)|\d[\d,]*\+?\s*(?:google\s+)?reviews|5[- ]star|five[- ]star|star rated|google rated|out of 5 stars|\b\d[\d,]*\+\s*(?:local\s+|happy\s+|satisfied\s+)?(?:homeowners|customers|families|clients)|customers?\s+(?:consistently|tell us|keep coming|mention)|keep coming back)", re.I)

def check(path):
    status, body = get(BASE + path)
    p = Text(); p.feed(body)
    text = " ".join(" ".join(p.parts).split())
    flat = re.sub(r"\s+", " ", html.unescape(body).replace('\\"', '"'))
    found = [s for s in snips if s in flat] + [n for n in names if re.search(r"(?<![A-Za-z])" + re.escape(n) + r"(?![A-Za-z])", flat)]
    claims = [m.group(0) for m in CLAIM.finditer(text)] + [a for a in p.aria if re.search(r"star|rating", a, re.I)]
    claims += ["JSON-LD rating"] if any(re.search(r"aggregateRating|ratingValue|\"@type\"\s*:\s*\"Review\"", b) for b in p.ld) else []
    return path, status, found, claims, ('id="quick-checks-heading"' in body), body

results = list(cf.ThreadPoolExecutor(8).map(check, paths))
fail = []
non200 = [(p, s) for p, s, *_ in results if s != 200]
testi = [(p, f[:3]) for p, s, f, *_ in results if f]
claims = [(p, c[:3]) for p, s, f, c, *_ in results if c]
qc_expected = [p for p in paths if p.startswith(("/ac-repair/", "/air-conditioning/ac-repair/", "/air-conditioning/emergency-ac-repair/", "/air-conditioning/ac-tune-up/", "/heating/heating-repair/", "/hvac-repair/"))]
qc_missing = [p for p, s, f, c, qc, b in results if p in qc_expected and not qc]
rev = next(b for p, s, f, c, qc, b in results if p == "/reviews")
rv = {
  "title": "<title>Our Service Standards | HVAC Service &amp; AC Repair</title>" in rev,
  "h1": "Our Commitment to Quality HVAC Service" in rev,
  "description": 'content="How we handle every HVAC call in Yorba Linda and Orange County: pricing explained up front, honest repair advice and respectful work. Read our Google reviews."' in rev,
  "eyebrow": "Service Standards" in rev,
  "gbp_link": "https://maps.app.goo.gl/q3tdaVN6JDbXpVPKA" in rev,
}
home = next(b for p, s, f, c, qc, b in results if p == "/")
print(f"CHECK sitemap URLs fetched: {len(results)}; non-200: {non200 or 'none'}")
print(f"CHECK former testimonial texts/names found ({len(snips)} snippets, {len(names)} names): {testi or 'none'}")
print(f"CHECK rating / review-count / customer-statistic claims: {claims or 'none'}")
print(f"CHECK QuickChecks present on {len(qc_expected) - len(qc_missing)}/{len(qc_expected)} Ads and city service pages; missing: {qc_missing[:5] or 'none'}")
print(f"CHECK /reviews: {rv}")
print(f"CHECK homepage 'Serving Local Homeowners': {'Serving Local Homeowners' in home}; '500+' present: {'500+' in home}")
ok = not non200 and not testi and not claims and not qc_missing and all(rv.values()) and "Serving Local Homeowners" in home and "500+" not in home and len(results) == 456
print("CLAIMS RESULT:", "PASS" if ok else "FAIL")
sys.exit(0 if ok else 1)
