"""Phase 10C: read-only check of external sources cited on the pilot pages. Prints status, final URL and supporting phrases."""
import re, subprocess, sys, urllib.request, tempfile, os
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36", "Accept": "text/html,application/pdf,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.9"}
S = [
 ("https://www.usfa.fema.gov/prevention/home-fires/prevent-fires/appliance-and-electrical/", [r"electrician", r"spark|smoke|burning|smell", r"get out|911|fire department", r"water|wet"]),
 ("https://www.esfi.org/water-damaged-electrical-equipment/", [r"water", r"electrician|qualified", r"power|electric", r"fire|shock"]),
 ("https://content.nfpa.org/-/media/project/storefront/catalog/files/home-fire-safety/electrical/electrical_safety_checklist.pdf", [r"burning|rubbery", r"electrician", r"spark", r"breaker|trip"]),
 ("https://www.cdc.gov/natural-disasters/response/what-to-do-protect-yourself-from-electrical-hazards.html", [r"standing water", r"electrician", r"911", r"spark|burning"]),
 ("https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire.html", [r"get out", r"911", r"stay out"]),
 ("https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/carbon-monoxide-poisoning.html", [r"911"]),
 ("https://www.socalgas.com/safety/emergency-information/emergency-response", [r"1-800-427-2200"]),
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
        ctx = t[max(0, ms[0].start() - 90): ms[0].end() + 110] if ms else ""
        print(f"  [{'FOUND' if ms else 'absent'}] /{p}/ x{len(ms)} {('... ' + ctx) if ctx else ''}")
