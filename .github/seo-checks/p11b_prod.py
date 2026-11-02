"""Phase 11B production checks (python3 p11b_prod.py <crawl-dir> <new.tsv> <previous.tsv>). Read-only."""
import hashlib, html as H, json, re, sys, urllib.request, urllib.error
D, NEW, OLD = sys.argv[1], sys.argv[2], sys.argv[3]
BASE = "https://www.hvacserviceacrepair.com"
P = "/service-areas/orange-county/placentia"
paths = open(f"{D}/paths.txt").read().split()
fn = lambda p: "_index" if p == "/" else p.replace("/", "_")
raw = lambda p: open(f"{D}/html/{fn(p)}.html", encoding="utf-8").read()
def norm(h):
    h = re.sub(r"(?is)<(script|style|noscript).*?</\1>", " ", h)
    return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", h))).strip()
rd = lambda f: dict(l.rstrip("\n").split("\t") for l in open(f))
new, old = rd(NEW), rd(OLD)
hs = {p: hashlib.sha256(norm(raw(p)).encode()).hexdigest() for p in paths}
fails = []
diff_prev = sorted(p for p in paths if hs[p] != old.get(p))
print("pages that differ from the previous production baseline (Phase 11A):", diff_prev)
if diff_prev != [P]: fails.append(f"changed set != [Placentia]: {diff_prev}")
mism = [p for p in paths if hs[p] != new.get(p)]
print("pages that differ from the expected Phase 11B build:", mism or "none")
if mism: fails.append(f"differs from expected: {mism}")
if len(paths) != 457 or set(new) != set(paths): fails.append(f"path set ({len(paths)})")
tag = lambda h, r: [H.unescape(x) for x in re.findall(r, h)]
h = raw(P); t = norm(h)
checks = {
 "title": (tag(h, r"<title>(.*?)</title>"), ["HVAC Repair & Service in Placentia, CA | HVAC Service & AC Repair"]),
 "description": (tag(h, r'<meta name="description" content="([^"]*)"'), ["HVAC service in Placentia, CA: AC repair, furnace and heating repair, emergency help and replacement guidance. Call (714) 410-2784 or request service online."]),
 "og:title": (tag(h, r'<meta property="og:title" content="([^"]*)"'), ["HVAC Repair & Service in Placentia, CA | HVAC Service & AC Repair"]),
 "og:description": (tag(h, r'<meta property="og:description" content="([^"]*)"'), ["HVAC service in Placentia, CA: AC repair, furnace and heating repair, emergency help and replacement guidance. Call (714) 410-2784 or request service online."]),
 "canonical": (tag(h, r'<link rel="canonical" href="([^"]*)"'), [BASE + P]),
}
for k, (got, want) in checks.items():
    print(k, got); 
    if got != want: fails.append(f"{k}: {got}")
h1 = [re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", x)).strip() for x in re.findall(r"<h1[^>]*>(.*?)</h1>", h, re.S)]
print("h1", h1)
if h1 != ["HVAC Service in Placentia , CA"]: fails.append(f"h1 {h1}")
for s in ["Which Service Do You Need in Placentia?", "AC Repair and Tune-Ups in Placentia", "Emergency or Breakdown? Know the Difference", "Repair or Replace? AC and Furnace Replacement in Placentia", "Repair may be a practical option when the system is otherwise in good condition", "EPA rules are changing which refrigerants can be used"]:
    ok = s in t; print(("OK  " if ok else "MISSING "), s)
    if not ok: fails.append(f"missing {s}")
for bad in ["usually worth repairing", "since January 1, 2025", "Our shop", "our shop"]:
    if bad in t: fails.append(f"present: {bad}")
faq = None
for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
    try: j = json.loads(x)
    except Exception as e: fails.append(f"invalid JSON-LD {e}"); continue
    for o in (j if isinstance(j, list) else [j]):
        for g in (o.get("@graph", [o]) if isinstance(o, dict) else []):
            if g.get("@type") == "FAQPage": faq = g
ok = bool(faq) and len(faq["mainEntity"]) == 10 and all(i.get("acceptedAnswer", {}).get("text") for i in faq["mainEntity"]) and "expected remaining service life" in json.dumps(faq)
print("FAQPage valid, 10 entries, updated repair-versus-replace answer:", ok)
if not ok: fails.append("FAQ")
class NoRedir(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
op = urllib.request.build_opener(NoRedir)
def get(u):
    try:
        r = op.open(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 hvac-seo-verify"}), timeout=30); return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e: return e.code, ""
    except Exception as e: return 0, str(e)
main = re.search(r"<main.*?</main>", h, re.S); main = main.group(0) if main else h
internal = sorted({re.sub(r"[#?].*", "", x) for x in re.findall(r'href="(/[^"]*)"', main)} - {""})
for tgt in internal:
    st, body = get(BASE + tgt); c = re.findall(r'<link rel="canonical" href="' + re.escape(BASE) + r'([^"]*)"', body)
    if st != 200 or (c and (c[0] or "/") != tgt): fails.append(f"internal link {tgt} {st} {c}")
print("internal link targets checked:", len(internal))
need = ["/air-conditioning/ac-repair/placentia", "/heating/heating-repair/placentia", "/air-conditioning/emergency-ac-repair/placentia", "/hvac-repair/placentia", "/air-conditioning/ac-installation", "/contact", "/ac-not-cooling", "/emergency-hvac-service"]
miss = [n for n in need if n not in internal]
if miss: fails.append(f"missing links {miss}")
for u in sorted({u for u in re.findall(r'href="(https?://(?!www\.hvacserviceacrepair)[^"]+)"', main)} - {"https://www.bigbrandify.com/"}):
    st, _ = get(H.unescape(u)); print("external", st, u)
    if st != 200 and "cdc.gov" not in u: fails.append(f"external {u} {st}")
print("request-service anchor target present:", 'id="request-service"' in h)
if 'id="request-service"' not in h: fails.append("request-service id")
for p in paths:
    hh = raw(p)
    if tag(hh, r'<link rel="canonical" href="([^"]+)"') != [BASE + ("" if p == "/" else p)]: fails.append(f"canonical {p}")
    if re.search(r'name="robots"[^>]*noindex', hh): fails.append(f"noindex {p}")
    if "GTM-TRVN8GDR" not in hh or 'href="tel:' not in hh: fails.append(f"gtm/tel {p}")
print("FAILS:", len(fails)); [print(" ", f) for f in fails[:30]]
sys.exit(1 if fails else 0)
