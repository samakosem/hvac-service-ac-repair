"""Phase 10C: read-only check of external sources cited on the pilot pages. Prints status, final URL and supporting phrases."""
import re, subprocess, sys, urllib.request, tempfile, os
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36", "Accept": "text/html,application/pdf,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.9"}
S = [
 ("https://www.costamesaca.gov/community/about", [r"one mile.{0,120}", r"Pacific.{0,120}"]),
 ("https://www.costamesaca.gov/government/departments-and-divisions/economic-and-development-services/building-safety/submittal-requirements", [r"Insta-Permit.{0,160}", r"HVAC.{0,200}", r"Mechanical.{0,160}", r"TESSA.{0,120}"]),
 ("https://www.costamesaca.gov/trending/insta-permit", [r"HVAC.{0,300}", r"visible.{0,120}", r"standard plans.{0,120}"]),
 ("https://www.costamesaca.gov/government/departments-and-divisions/economic-and-development-services/building-safety", [r"754-5273", r"Building Safety.{0,100}", r"permit.{0,120}"]),
 ("https://www.carrier.com/us/en/residential/hvac-resources/coastal-heating-and-air/", [r"salt.{0,200}", r"corros.{0,200}", r"coil.{0,200}", r"inspect.{0,160}|clean.{0,160}"]),
 ("https://www.lennox.com/dA/59d64ade9d/507167-03.pdf", [r"coastal.{0,260}", r"rinse.{0,200}|rinsed.{0,200}", r"potable.{0,160}"]),
 ("https://www.energy.gov/sites/default/files/2016/11/f34/HomeCooling101.pdf", [r"filter.{0,200}", r"evaporator coil.{0,200}", r"fin comb.{0,100}", r"outdoor.{0,160}", r"professional.{0,160}|technician.{0,160}"]),
 ("https://www.energy.gov/articles/pump-your-savings-heat-pumps", [r"heat pump.{0,240}", r"cool.{0,200}", r"move.{0,160}|transfer.{0,160}", r"ductless.{0,200}|mini-split.{0,200}"]),
 ("https://www.energy.gov/sites/default/files/2022-08/energy-saver-guide-2022.pdf", [r"heat pump.{0,200}", r"ductless.{0,200}|mini-split.{0,200}", r"maintenance.{0,200}"]),
]
def text_of(data, ctype, url):
    if "pdf" in ctype or url.lower().endswith(".pdf"):
        f = tempfile.NamedTemporaryFile(suffix=".pdf", delete=False); f.write(data); f.close()
        try: return subprocess.run(["pdftotext", "-layout", f.name, "-"], capture_output=True, text=True, timeout=60).stdout
        except Exception as e: return ""
    h = data.decode("utf-8", "replace")
    h = re.sub(r"(?is)<(script|style).*?</\1>", " ", h)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h))
for url, pats in S:
    print("=" * 100); print(url)
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=40) as r:
            data = r.read(6_000_000); ctype = r.headers.get("content-type", ""); final = r.geturl(); code = r.status
    except Exception as e:
        print("  ERROR:", getattr(e, "code", ""), e); continue
    t = text_of(data, ctype, url)
    t = re.sub(r"\s+", " ", t)
    print(f"  status={code} final={final} type={ctype.split(';')[0]} chars={len(t)}")
    m = re.search(r"(?i)<title>(.*?)</title>", data.decode("utf-8", "replace")) if "html" in ctype else None
    if m: print("  title:", re.sub(r"\s+", " ", m.group(1)).strip()[:150])
    for p in pats:
        ms = list(re.finditer(p, t, re.I))
        ctx = " ## ".join(t[max(0, m.start() - 40): m.end() + 60] for m in ms[:3]) if ms else ""
        print(f"  [{'FOUND' if ms else 'absent'}] /{p}/ x{len(ms)} {('... ' + ctx) if ctx else ''}")
