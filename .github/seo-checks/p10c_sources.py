"""Phase 10C: read-only check of external sources cited on the pilot pages. Prints status, final URL and supporting phrases."""
import re, subprocess, sys, urllib.request, tempfile, os
UA = {"User-Agent": "Mozilla/5.0 (compatible; hvac-seo-verify/1.0)"}
S = [
 ("https://www.socalgas.com/safety/emergency-information/emergency-response", [r"1-800-427-2200", r"\b911\b", r"evacuat", r"leak", r"24"]),
 ("https://www.socalgas.com/sustainability/benefits-of-natural-gas/safe", [r"1-800-427-2200", r"\b911\b", r"evacuat", r"leak"]),
 ("https://www.socalgas.com/residential-natural-gas-detector", [r"1-800-427-2200", r"\b911\b", r"evacuat"]),
 ("https://www.socalgas.com/sites/default/files/2023-09/Safety_Bill_Onsert_April%202023_Final_English_Remediated.pdf", [r"1-800-427-2200", r"\b911\b", r"evacuat|leave", r"spark|light"]),
 ("https://www.socalgas.com/1443740978582/HomeEnergy_SafetyGuide_English.pdf", [r"1-800-427-2200", r"\b911\b", r"evacuat|leave"]),
 ("https://blogs.cdc.gov/yourhealthyourenvironment/2016/10/31/carbon-monoxide-co-poisoning-prevention-5/", [r"\b911\b", r"leave", r"detector|alarm"]),
 ("https://blogs.cdc.gov/yourhealthyourenvironment/2023/01/30/carbon-monoxide-poisoning-can-be-deadly/", [r"\b911\b", r"leave", r"detector|alarm"]),
 ("https://www.cdc.gov/carbon-monoxide/about/index.html", [r"\b911\b", r"leave", r"alarm|detector"]),
 ("https://www.cdc.gov/carbon-monoxide/prevention/index.html", [r"\b911\b", r"leave", r"alarm|detector"]),
 ("https://www.epa.gov/hfcs/technology-transitions-hfc-restrictions-sector", [r"residential", r"air.conditioning", r"heat pump", r"Technology Transitions"]),
 ("https://www.epa.gov/hfcs/regulatory-actions-technology-transitions", [r"residential", r"air.conditioning", r"Technology Transitions"]),
 ("https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/strategy_guide_hvac_sizing.pdf", [r"Manual J", r"rules? of thumb", r"square f", r"oversiz", r"load"]),
 ("https://www.energy.gov/sites/default/files/2022-08/energy-saver-guide-2022.pdf", [r"oversiz", r"properly sized|right size|sizing", r"Manual J"]),
 ("https://www.energy.gov/energysaver/central-air-conditioners", [r"Manual J", r"size|sizing", r"oversiz"]),
 ("https://www.energy.gov/energysaver/central-air-conditioning", [r"Manual J", r"size|sizing", r"oversiz"]),
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
