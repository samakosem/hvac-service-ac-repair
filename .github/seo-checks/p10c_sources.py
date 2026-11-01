"""Phase 10C: read-only check of external sources cited on the pilot pages. Prints status, final URL and supporting phrases."""
import re, subprocess, sys, urllib.request, tempfile, os
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36", "Accept": "text/html,application/pdf,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.9"}
S = [
 ("https://www.socalgas.com/safety/emergency-information/emergency-response", [r"24[- ]hour|24 hours|24/7", r"1-800-427-2200", r"\b911\b", r"evacuat", r"light a match|flame|spark", r"turn|switch", r"repair|fix|control"]),
 ("https://www.socalgas.com/sites/default/files/2023-09/Safety_Bill_Onsert_April%202023_Final_English_Remediated.pdf", [r"turn|switch|appliance", r"repair|fix|control", r"match|flame|spark", r"1-800-427-2200"]),
 ("https://www.socalgas.com/residential-natural-gas-detector", [r"24[- ]hour|24 hours|24/7", r"evacuate immediately", r"911"]),
 ("https://www.cpsc.gov/safety-education/safety-guides/carbon-monoxide/carbon-monoxide-fact-sheet", [r"911", r"outside|fresh air", r"alarm", r"do not|don.t", r"symptom|dizz|nause"]),
 ("https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center/Carbon-Monoxide-Questions-and-Answers", [r"911", r"outside|fresh air", r"alarm"]),
 ("https://www.cdc.gov/carbon-monoxide/index.html", [r"911", r"leave|outside|fresh air", r"alarm|detector"]),
 ("https://www.cdc.gov/carbon-monoxide/about/index.html", [r"911", r"leave|outside|fresh air", r"alarm|detector"]),
 ("https://blogs.cdc.gov/yourhealthyourenvironment/2016/10/31/carbon-monoxide-co-poisoning-prevention-5/", [r"911", r"leave", r"detector|alarm"]),
 ("https://www.epa.gov/hfcs/technology-transitions-hfc-restrictions-sector", [r"residential", r"air.conditioning", r"heat pump", r"installation date|date"]),
 ("https://www.epa.gov/hfcs/regulatory-actions-technology-transitions", [r"residential and light commercial", r"extension|extend|delay|interim final|reconsider", r"Technology Transitions"]),
 ("https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/strategy_guide_hvac_sizing.pdf", [r"Manual J", r"Manual S", r"insulation", r"window", r"infiltration|air leakage|air tightness", r"duct", r"occupant", r"oversiz"]),
 ("https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/hvac_load_calc.pdf", [r"rules? of thumb", r"Manual J", r"square f", r"insulation", r"window", r"oversiz"]),
 ("https://www.energy.gov/sites/default/files/2021-08/ES-HomeHeatingandCooling_081221.pdf", [r"Manual J", r"Manual S", r"oversiz|properly sized|sizing", r"rules? of thumb|square f"]),
 ("https://www.energy.gov/sites/default/files/2022-08/energy-saver-guide-2022.pdf", [r"oversized", r"less efficiently", r"sizing"]),
 ("https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/measure_guide_air_cond_diagnostics.pdf", [r"rules? of thumb|square f", r"Manual J", r"improvement"]),
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
