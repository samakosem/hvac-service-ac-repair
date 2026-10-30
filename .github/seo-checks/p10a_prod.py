"""Phase 10A production checks on a crawl dir (python3 p10a_prod.py <crawl-dir>). Read-only."""
import os, re, sys
D = sys.argv[1]
paths = open(f"{D}/paths.txt").read().split()
def html(p): return open(f"{D}/html/" + ("_index" if p == "/" else p.replace("/", "_")) + ".html", encoding="utf-8").read()
def anchors(h): return set(re.findall(r'<a [^>]*href="([^"#?]+)"', h))
fails = []
n_bc = 0
for p in paths:
    h = html(p)
    m = re.search(r'<nav aria-label="Breadcrumb".*?</nav>', h, re.S)
    if not m: continue
    if p == "/" : continue
    vis = re.sub(r"<[^>]+>", "|", m.group(0)); vis = [x.strip() for x in vis.split("|") if x.strip()]
    ld = re.findall(r'"@type":"BreadcrumbList".*?</script>', h, re.S)
    names = re.findall(r'"name":"([^"]+)"', ld[0].replace("\\u0026", "&")) if ld else []
    if len(ld) != 1 or [v for v in vis] != names: fails.append(f"breadcrumb mismatch {p}: {vis} vs {names}")
    else: n_bc += 1
    pl = re.findall(r'<a [^>]*href="([^"]+)"', m.group(0))
    if "/services" in pl[1:]: fails.append(f"/services parent {p}")
city = [p for p in paths if re.match(r"^/(air-conditioning/(ac-repair|ac-tune-up|emergency-ac-repair)|heating/heating-repair|hvac-repair)/[^/]+$", p)]
print(f"city-service pages {len(city)}; with matching visible+JSON-LD breadcrumb (all pages incl. others) {n_bc}")
for p in city:
    if '<nav aria-label="Breadcrumb"' not in html(p): fails.append(f"no visible breadcrumb {p}")
inl = {t: sum(1 for p in paths if t in anchors(html(p))) for t in ["/hvac-repair", "/air-conditioning/ac-repair/yorba-linda", "/heating/heating-repair/yorba-linda"]}
print("inlinks (pages linking):", inl)
if inl["/hvac-repair"] < 400: fails.append("hvac-repair inlinks low")
home = html("/")
for t in ["/air-conditioning/ac-repair/yorba-linda", "/heating/heating-repair/yorba-linda", "/hvac-repair", "/service-areas/orange-county/yorba-linda"]:
    if t not in anchors(home): fails.append(f"home missing {t}")
print("home header/body links count:", len(anchors(home)))
hv = html("/hvac-repair")
kids = [a for a in anchors(hv) if re.match(r"^/hvac-repair/[^/]+$", a)]
print("hvac-repair child links:", len(kids))
if len(kids) < 21: fails.append("hvac-repair child links <21")
y = html("/heating/heating-repair/yorba-linda")
t = re.search(r"<title>(.*?)</title>", y).group(1); print("YL heating title:", t)
if not t.startswith("Furnace &amp; Heating Repair in Yorba Linda, CA") and not t.startswith("Furnace & Heating Repair in Yorba Linda, CA"): fails.append("YL title")
if not re.search(r'<link rel="canonical" href="https://www.hvacserviceacrepair.com/heating/heating-repair/yorba-linda"', y): fails.append("YL canonical")
for p in paths:
    h = html(p)
    c = re.findall(r'<link rel="canonical" href="([^"]+)"', h)
    if c != ["https://www.hvacserviceacrepair.com" + ("" if p == "/" else p)]: fails.append(f"canonical {p} {c}")
    if "GTM-TRVN8GDR" not in h or 'href="tel:' not in h: fails.append(f"gtm/tel {p}")
    if re.search(r'name="robots"[^>]*noindex', h) and p not in ("/services",): fails.append(f"noindex {p}")
print("FAILS:", len(fails)); [print(" ", f) for f in fails[:40]]
sys.exit(1 if fails else 0)
