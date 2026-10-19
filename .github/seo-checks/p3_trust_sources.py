"""Phase 2.3 P3: read-only lookups of trust-claim sources (no forms submitted to the site).

1. Resolves the Google Business Profile short link used by the site and prints every hop,
   the final URL and the place name/coordinates in it.
2. Searches the CSLB public license lookup by business name and prints the result rows.
"""
import re, sys, urllib.parse, http.cookiejar, urllib.request
from bs4 import BeautifulSoup

UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36", "Accept-Language": "en-US"}

print("== Google Business Profile link")
import http.client
url = "https://maps.app.goo.gl/q3tdaVN6JDbXpVPKA"
for hop in range(8):
    u = urllib.parse.urlsplit(url)
    c = http.client.HTTPSConnection(u.netloc, timeout=20)
    c.request("GET", u.path + ("?" + u.query if u.query else ""), headers=UA)
    r = c.getresponse(); body = r.read()
    print(f"hop {hop}: {r.status} {url[:400]}")
    loc = r.getheader("Location")
    if r.status in (301, 302, 303, 307, 308) and loc:
        url = urllib.parse.urljoin(url, loc); continue
    break
dec = urllib.parse.unquote_plus(url)
print("final (decoded):", dec[:600])
m = re.search(r"/place/([^/]+)/", dec); print("place name:", m.group(1) if m else None)
m = re.search(r"@(-?\d+\.\d+),(-?\d+\.\d+)", dec); print("coords:", m.groups() if m else None)
m = re.search(r"!1s(0x[0-9a-f]+:0x[0-9a-f]+)", dec); print("feature id:", m.group(1) if m else None)
txt = body.decode("utf-8", "replace")
for pat in [r"HVAC Service[^\"<\\]{0,80}", r"18340 Yorba Linda[^\"<\\]{0,60}", r"\(714\) 410-2784", r"\d\.\d\s*\(\d+\)", r"(\d+) reviews?"]:
    found = sorted(set(re.findall(pat, txt)))[:5]
    print(f"page contains {pat!r}: {found}")

print("\n== CSLB license lookup by business name")
jar = http.cookiejar.CookieJar()
op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
for name in ["HVAC SERVICE & AC REPAIR", "HVAC SERVICE AND AC REPAIR", "HVAC SERVICE AC REPAIR"]:
    q = "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/NameSearch.aspx?" + urllib.parse.urlencode({"NextName": name, "NextLicNum": ""})
    try:
        h = op.open(urllib.request.Request(q, headers=UA), timeout=30).read().decode("utf-8", "replace")
    except Exception as e:
        print(name, "->", e); continue
    s = BeautifulSoup(h, "lxml")
    rows = [re.sub(r"\s+", " ", t.get_text(" ")).strip() for t in s.select("table tr")]
    rows = [r for r in rows if r and ("Lic" in r or "Name" in r or re.search(r"\b\d{6,7}\b", r))]
    msg = re.sub(r"\s+", " ", (s.find(id=re.compile("lblMessage|Error", re.I)) or s.new_tag("x")).get_text(" ")).strip()
    print(f"{name!r}: {len(rows)} rows {msg}")
    for r in rows[:25]: print("   ", r[:220])
