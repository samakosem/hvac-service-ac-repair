"""Phase 11A production checks (python3 p11a_prod.py <crawl-dir> <new-expected.tsv> <previous-baseline.tsv>). Read-only."""
import hashlib, html as H, json, re, sys
D, NEW, OLD = sys.argv[1], sys.argv[2], sys.argv[3]
BASE = "https://www.hvacserviceacrepair.com"
paths = open(f"{D}/paths.txt").read().split()
fn = lambda p: "_index" if p == "/" else p.replace("/", "_")
raw = lambda p: open(f"{D}/html/{fn(p)}.html", encoding="utf-8").read()
def norm(h):
    h = re.sub(r"(?is)<(script|style|noscript).*?</\1>", " ", h)
    return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", h))).strip()
rd = lambda f: dict(l.rstrip("\n").split("\t") for l in open(f))
new, old = rd(NEW), rd(OLD)
hs = {p: hashlib.sha256(norm(raw(p)).encode()).hexdigest() for p in paths}
PILOT = {"/service-areas/orange-county/placentia", "/service-areas/orange-county/costa-mesa", "/air-conditioning/ac-repair/yorba-linda", "/heating/heating-repair/yorba-linda", "/air-conditioning/emergency-ac-repair/yorba-linda"}
fails = []
diff_prev = {p for p in paths if hs[p] != old.get(p)}
print("pages that differ from the previous production baseline (Phase 10D):", sorted(diff_prev))
if diff_prev != PILOT: fails.append(f"changed set != five pilot pages: {sorted(diff_prev ^ PILOT)}")
mism = [p for p in paths if hs[p] != new.get(p)]
print("pages that differ from the expected Phase 11A build:", mism or "none")
if mism: fails.append(f"differs from expected: {mism}")
if set(new) != set(paths) or len(paths) != 457: fails.append(f"path set ({len(paths)})")
tag = lambda h, r: [H.unescape(x) for x in re.findall(r, h)]
em = raw("/air-conditioning/emergency-ac-repair/yorba-linda")
d = tag(em, r'<meta name="description" content="([^"]*)"')
want = "AC broke down in Yorba Linda? Same-day emergency HVAC service is available. Free diagnostic, no emergency surcharge. Call (714) 410-2784."
print("emergency meta description:", d)
if d != [want]: fails.append(f"emergency description {d}")
print("emergency title:", tag(em, r"<title>(.*?)</title>"), "| h1:", [re.sub(r"<[^>]+>", "", x) for x in tag(em, r"<h1[^>]*>(.*?)</h1>")])
for p in PILOT:
    h = raw(p); t = norm(h)
    if len(re.findall(r"<h1[ >]", h)) != 1: fails.append(f"h1 count {p}")
    for bad in ["shortest drive", "We Answer Live", "Real People Answer", "Real people answer", "no voicemail", "Tech Available", "Our shop", "our shop", "dispatch from", "mid-30s", "1970s", "Same Technician", "Saturday and emergency", "since January 1, 2025", "reclaimed supply."]:
        if bad in t: fails.append(f"{p} still contains: {bad}")
for p in ["/service-areas/orange-county/placentia", "/service-areas/orange-county/costa-mesa"]:
    h = raw(p); t = norm(h)
    ok = "EPA rules are changing which refrigerants can be used in new air-conditioning and heat-pump equipment" in t and 'href="https://www.epa.gov/hfcs/technology-transitions-hfc-restrictions-sector"' in h
    print(p, "updated EPA wording and link live:", ok)
    if not ok: fails.append(f"EPA wording missing {p}")
for p, n in [("/air-conditioning/ac-repair/yorba-linda", 5), ("/heating/heating-repair/yorba-linda", 5), ("/air-conditioning/emergency-ac-repair/yorba-linda", 4), ("/service-areas/orange-county/placentia", 7), ("/service-areas/orange-county/costa-mesa", 7)]:
    h = raw(p); faq = None
    for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try: j = json.loads(x)
        except Exception as e: fails.append(f"invalid JSON-LD {p}: {e}"); continue
        for o in (j if isinstance(j, list) else [j]):
            for g in (o.get("@graph", [o]) if isinstance(o, dict) else []):
                if g.get("@type") == "FAQPage": faq = g
    ok = bool(faq) and len(faq["mainEntity"]) == n and all(i.get("acceptedAnswer", {}).get("text") for i in faq["mainEntity"])
    print(p, "FAQPage valid:", ok, len(faq["mainEntity"]) if faq else 0)
    if not ok: fails.append(f"FAQ {p}")
    if p.endswith("heating-repair/yorba-linda") and "leave the home right away and call 911 from a safe place" not in json.dumps(faq): fails.append("heating FAQ safety text")
for p in paths:
    hh = raw(p)
    if tag(hh, r'<link rel="canonical" href="([^"]+)"') != [BASE + ("" if p == "/" else p)]: fails.append(f"canonical {p}")
    if re.search(r'name="robots"[^>]*noindex', hh): fails.append(f"noindex {p}")
    if "GTM-TRVN8GDR" not in hh or 'href="tel:' not in hh: fails.append(f"gtm/tel {p}")
print("FAILS:", len(fails)); [print(" ", f) for f in fails[:30]]
sys.exit(1 if fails else 0)
