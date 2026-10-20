"""Phase 2.3 P3: fetch the official text of California contractor advertising rules (read-only)."""
import re, urllib.request
from bs4 import BeautifulSoup
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/130 Safari/537.36"}
for code, sec in [("BPC", "7030.5"), ("BPC", "7027.4"), ("BPC", "7027.1"), ("BPC", "7029.6")]:
    url = f"https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode={code}&sectionNum={sec}"
    try:
        h = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read().decode("utf-8", "replace")
        s = BeautifulSoup(h, "lxml"); d = s.find(id="codeLawSectionNoHead") or s.find(id="display_code_many_law_sections") or s
        t = re.sub(r"\s+", " ", d.get_text(" ")).strip()
        i = t.find(sec + "."); print(f"== {code} {sec} ({url})\n{t[i:i+1800] if i >= 0 else t[:1800]}\n")
    except Exception as e:
        print(f"== {code} {sec}: {e}\n")
for url in ["https://www.cslb.ca.gov/Resources/GuidesAndPublications/AdvertisingGuidelines.pdf"]:
    try:
        b = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()
        open("adv.pdf", "wb").write(b); print("== downloaded", url, len(b))
    except Exception as e:
        print("==", url, e)
