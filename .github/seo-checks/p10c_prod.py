"""Phase 10C production checks on a crawl dir (python3 p10c_prod.py <crawl-dir> <expected-hashes.tsv>). Read-only."""
import hashlib, html as H, json, re, sys, urllib.request, urllib.error
D, EXP = sys.argv[1], sys.argv[2]
BASE = "https://www.hvacserviceacrepair.com"
paths = open(f"{D}/paths.txt").read().split()
fn = lambda p: "_index" if p == "/" else p.replace("/", "_")
raw = lambda p: open(f"{D}/html/{fn(p)}.html", encoding="utf-8").read()
def norm(h):
    h = re.sub(r"(?is)<(script|style|noscript).*?</\1>", " ", h)
    return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", h))).strip()
exp = dict(l.rstrip("\n").split("\t") for l in open(EXP))
PILOT = ["/air-conditioning/ac-repair", "/heating/furnace-repair", "/emergency-hvac-service", "/air-conditioning/ac-installation", "/hvac-repair"]
fails = []
changed = [p for p in paths if hashlib.sha256(norm(raw(p)).encode()).hexdigest() != exp.get(p)]
print("pages whose visible text differs from the expected Phase 10C build:", changed or "none")
if changed: fails.append("text differs: %s" % changed)
if set(exp) != set(paths): fails.append("path set differs from expected")
def tag(h, r): return [H.unescape(x) for x in re.findall(r, h)]
E1 = {
 "/air-conditioning/ac-repair": dict(title="Same-Day AC Repair in Orange County, CA | HVAC Service & AC Repair", h1="AC Repair in Orange County — Same-Day Service", desc="Same-day AC repair in Orange County, CA. Based in Yorba Linda, serving local homeowners with AC diagnostics and repairs. Call (714) 410-2784.", h2="Fast & Reliable AC Repair Across Orange County"),
 "/air-conditioning/ac-installation": dict(title="AC Installation & Replacement in Orange County, CA | HVAC Service & AC Repair", h1="AC Installation & Replacement in Orange County", desc="AC installation and replacement in Orange County, CA. Professional system sizing, free in-home estimates and installation services. Call (714) 410-2784."),
}
for p, e in E1.items():
    h = raw(p)
    t = tag(h, r"<title>(.*?)</title>"); d = tag(h, r'<meta name="description" content="([^"]*)"'); h1 = [re.sub(r"<[^>]+>", "", x).strip() for x in tag(h, r"<h1[^>]*>(.*?)</h1>")]
    print(p, "title:", t, "| h1:", h1, "| desc:", d)
    if t != [e["title"]]: fails.append(f"{p} title {t}")
    if h1 != [e["h1"]]: fails.append(f"{p} h1 {h1}")
    if d != [e["desc"]]: fails.append(f"{p} desc {d}")
    if "h2" in e and e["h2"] not in norm(h): fails.append(f"{p} missing section headline")
    if 'content="' + e["desc"].replace("&", "&amp;") not in h and e["desc"] not in H.unescape(h): fails.append(f"{p} og description")
NEW = {
 "/air-conditioning/ac-repair": ["Match the Symptom to the Likely Cause", "Emergency, or Can It Wait?", "What to Have Ready When You Call"],
 "/heating/furnace-repair": ["Match the Symptom to the Likely Cause", "When Is a Heating Problem an Emergency?", "What to Have Ready When You Call", "Furnace Down in Orange County?"],
 "/emergency-hvac-service": ["Which HVAC Problems Can’t Wait", "While you wait", "Heating, Cooling or Both?", "not a substitute for 911"],
 "/air-conditioning/ac-installation": ["Why Sizing Matters for a Replacement AC", "Questions to Ask About Any AC Replacement Quote", "not a substitute for a professional load calculation"],
 "/hvac-repair": ["Which System Matches Your Symptom?", "Quick Checks Before You Call"],
}
for p, items in NEW.items():
    t = norm(raw(p))
    miss = [i for i in items if i not in t]
    print(p, "new content present" if not miss else f"MISSING {miss}")
    if miss: fails.append(f"{p} missing {miss}")
    if len(re.findall(r"<h1[ >]", raw(p))) != 1: fails.append(f"{p} h1 count")
for p in paths:
    h = raw(p)
    if tag(h, r'<link rel="canonical" href="([^"]+)"') != [BASE + ("" if p == "/" else p)]: fails.append(f"canonical {p}")
    if re.search(r'name="robots"[^>]*noindex', h): fails.append(f"noindex {p}")
    if "GTM-TRVN8GDR" not in h or 'href="tel:' not in h: fails.append(f"gtm/tel {p}")
class NoRedir(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
op = urllib.request.build_opener(NoRedir)
def get(u):
    try:
        r = op.open(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 hvac-seo-verify"}), timeout=30); return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e: return e.code, ""
    except Exception as e: return 0, str(e)
seen = {}
for p in PILOT:
    h = raw(p)
    main = re.search(r"<main.*?</main>", h, re.S); main = main.group(0) if main else h
    internal = sorted({re.sub(r"[#?].*", "", x) for x in re.findall(r'href="(/[^"]*)"', main)} - {""})
    for t in internal:
        if t not in seen:
            st, body = get(BASE + t); c = re.findall(r'<link rel="canonical" href="' + re.escape(BASE) + r'([^"]*)"', body)
            seen[t] = (st, (c[0] or "/") if c else None)
        st, c = seen[t]
        if t.endswith((".xml", ".txt")): continue
        if st != 200 or (c is not None and c != t): fails.append(f"internal link {p} -> {t} {st} {c}")
    print(p, "internal links checked:", len(internal))
ext = sorted({u for p in PILOT for u in re.findall(r'href="(https?://(?!www\.hvacserviceacrepair\.com)[^"]+)"', raw(p)) if "bigbrandify" not in u and "googletagmanager" not in u})
for u in ext:
    st, _ = get(H.unescape(u)); print("external", st, u)
    if st != 200: fails.append(f"external {u} {st}")
print("FAILS:", len(fails)); [print(" ", f) for f in fails[:40]]
sys.exit(1 if fails else 0)
