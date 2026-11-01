"""Phase 10D production checks (python3 p10d_prod.py <crawl-dir> <expected-hashes.tsv>). Read-only."""
import hashlib, html as H, json, re, sys
D, EXP = sys.argv[1], sys.argv[2]
BASE = "https://www.hvacserviceacrepair.com"
paths = open(f"{D}/paths.txt").read().split()
fn = lambda p: "_index" if p == "/" else p.replace("/", "_")
raw = lambda p: open(f"{D}/html/{fn(p)}.html", encoding="utf-8").read()
def norm(h):
    h = re.sub(r"(?is)<(script|style|noscript).*?</\1>", " ", h)
    return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", h))).strip()
exp = dict(l.rstrip("\n").split("\t") for l in open(EXP))
fails = []
changed = [p for p in paths if hashlib.sha256(norm(raw(p)).encode()).hexdigest() != exp.get(p)]
print("pages whose visible text differs from the expected Phase 10D build:", changed or "none")
if changed: fails.append(f"text differs: {changed}")
if set(exp) != set(paths): fails.append("path set differs")
P = "/air-conditioning/emergency-ac-repair"
h = raw(P); t = norm(h)
for s in ["Safety First: When to Leave and Call 911", "get out, stay out and call for help", "HVAC service doesn’t replace 911"]:
    s2 = s.replace("’", "'")
    ok = s in t or s2 in t or s2 in t.replace("’", "'")
    print(("OK  " if ok else "MISSING "), s)
    if not ok: fails.append(f"missing: {s}")
for bad in ["shut the system off at the breaker", "Burning smells, water flooding, and breakers tripping"]:
    if bad in t: fails.append(f"old unsafe text present: {bad}")
lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S)
faq = None
for x in lds:
    try: j = json.loads(x)
    except Exception as e: fails.append(f"invalid JSON-LD {e}"); continue
    objs = j if isinstance(j, list) else [j]
    for o in objs:
        for g in (o.get("@graph", [o]) if isinstance(o, dict) else []):
            if g.get("@type") == "FAQPage": faq = g
if not faq: fails.append("FAQPage missing")
else:
    q = faq["mainEntity"]; print("FAQPage questions:", len(q))
    if len(q) != 5 or not all(i.get("acceptedAnswer", {}).get("text") for i in q): fails.append("FAQ structure")
    fj = json.dumps(q)
    for s3 in ["safety hazards first", "leave the home and call 911 before calling us", "Don't open the unit or electrical panels"]:
        ok3 = s3 in fj; print(("OK  " if ok3 else "MISSING "), "FAQ JSON-LD:", s3)
        if not ok3: fails.append(f"FAQ JSON-LD missing: {s3}")
if len(re.findall(r"<h1[ >]", h)) != 1: fails.append("h1 count")
for p in paths:
    hh = raw(p)
    if re.findall(r'<link rel="canonical" href="([^"]+)"', hh) != [BASE + ("" if p == "/" else p)]: fails.append(f"canonical {p}")
    if re.search(r'name="robots"[^>]*noindex', hh): fails.append(f"noindex {p}")
    if "GTM-TRVN8GDR" not in hh or 'href="tel:' not in hh: fails.append(f"gtm/tel {p}")
print("FAILS:", len(fails)); [print(" ", f) for f in fails[:30]]
sys.exit(1 if fails else 0)
