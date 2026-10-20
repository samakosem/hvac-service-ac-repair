"""Phase 2.3 P4: read-only check of official building/permit office pages for the city hubs.

For each URL: HTTP status, final URL, <title>, and whether the page text mentions building,
permits and mechanical/HVAC work. For cities without a known page, scans the official home
page for links whose text mentions building or permits.
"""
import re, urllib.request, urllib.parse, ssl
from bs4 import BeautifulSoup
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36", "Accept-Language": "en-US"}
CANDIDATES = {
 "diamond-bar": ["https://www.diamondbarca.gov/1282/Building-and-Safety", "https://www.diamondbarca.gov/160/Building-Permits"],
 "la-county": ["https://pw.lacounty.gov/building-and-safety/about", "https://dpw.lacounty.gov/bsd/lib/fp/EPICLA/about-epic-la.html"],
 "walnut": ["https://cityofwalnut.org/for-residents/departments/community-development/building-safety-division", "https://www.walnutca.gov/For-Residents/Departments/Community-Development/Building-Safety-Division"],
 "anaheim": ["https://www.anaheim.net/5252", "https://www.anaheim.gov/5252"],
 "brea": ["https://www.cityofbrea.gov/658/Building-Permit-Basics"],
 "fullerton": ["https://www.cityoffullerton.com/government/departments/community-and-economic-development/building-and-safety"],
 "garden-grove": ["https://ggcity.org/building-and-safety"],
 "huntington-beach": ["https://huntingtonbeachca.gov/departments/community_development/building_inspection/index.php"],
 "irvine": ["https://cityofirvine.org/node/2146", "https://www.cityofirvine.org/community-development/building-safety"],
 "laguna-niguel": ["https://cityoflagunaniguel.org/113/Building-Safety"],
 "lake-forest": ["https://www.lakeforestca.gov/node/1271"],
 "mission-viejo": ["https://www.missionviejo.gov/departments/community-development/building-services"],
 "newport-beach": ["https://www.newportbeachca.gov/building", "https://www.newportbeachca.gov/government/departments/community-development/building-division"],
 "orange": ["https://www.cityoforange.org/our-city/departments/community-development/building-and-safety-services"],
 "san-clemente": ["https://www.sanclemente.gov/248/Building-Services"],
 "santa-ana": ["https://santa-ana.org/pb/building-safety-division", "https://www.santa-ana.org/departments/building-division"],
 "tustin": ["https://tustinca.org/153/Building", "https://www.tustinca.org/153/Building"],
 "villa-park": ["https://villapark.org/Departments/Building-and-Safety"],
 "westminster": ["https://westminster-ca.gov/departments/community-development/building-division"],
 "corona": ["https://coronaca.gov/departments/building-division", "https://www.coronaca.gov/government/departments-divisions/building-division"],
 "eastvale": ["https://www.eastvaleca.gov/government/community-development-department/building-safety"],
 "norco": ["https://www.norco.ca.us/departments/building-safety", "https://www.norco.ca.us/departments/building-safety/applications-forms"],
 "chino": ["https://cityofchino.org/178", "https://www.cityofchino.org/178"],
 "chino-hills": ["https://chinohills.org/122/Building-Safety", "https://www.chinohills.org/122/Building-Safety"],
 "ontario": ["https://www.ontarioca.gov/Building", "https://OntarioCA.gov/Building"],
 "goleta": ["https://www.cityofgoleta.org/your-city/planning-and-environmental-review/building-planning"],
 "santa-barbara": ["https://santabarbaraca.gov/node/3130", "https://santabarbaraca.gov/es/node/3130", "https://santabarbaraca.gov/node/5491"],
 "moorpark": ["https://moorparkca.gov/164/Building-Safety", "https://www.moorparkca.gov/164/Building-Safety"],
 "simi-valley": ["https://www.simivalley.org/departments/environmental-services/building-safety-division"],
 "thousand-oaks": ["https://www.toaks.gov/building"],
}
HOMES = {"aliso-viejo": "https://avcity.org/", "la-habra-heights": "https://www.lhhcity.org/"}

def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.geturl(), r.read().decode("utf-8", "replace")

for key, urls in CANDIDATES.items():
    for u in urls:
        try:
            st, final, h = get(u)
            s = BeautifulSoup(h, "lxml"); t = re.sub(r"\s+", " ", s.title.get_text() if s.title else "").strip()
            txt = s.get_text(" ")
            flags = [w for w in ("building", "permit", "mechanical", "hvac", "heating", "contract") if re.search(w, txt, re.I)]
            print(f"OK  {key:16} {st} {u} -> {final} | {t[:90]} | {','.join(flags)}")
        except Exception as e:
            print(f"ERR {key:16} {u} | {str(e)[:100]}")
for key, home in HOMES.items():
    try:
        st, final, h = get(home)
        s = BeautifulSoup(h, "lxml")
        links = sorted({(re.sub(r"\s+", " ", a.get_text(" ")).strip()[:60], urllib.parse.urljoin(final, a["href"])) for a in s.find_all("a", href=True) if re.search(r"build|permit", a.get_text(" ") + a["href"], re.I)})
        print(f"HOME {key} {st} {final} links: {links[:15]}")
        for _, u in links[:6]:
            try:
                st2, f2, h2 = get(u); s2 = BeautifulSoup(h2, "lxml")
                t2 = re.sub(r"\s+", " ", s2.title.get_text() if s2.title else "").strip(); txt2 = s2.get_text(" ")
                flags = [w for w in ("building", "permit", "mechanical", "hvac", "contract") if re.search(w, txt2, re.I)]
                snip = re.search(r"[^.]{0,120}(contract|Willdan|Charles Abbott|CSG|Interwest|Bureau Veritas)[^.]{0,120}", txt2)
                print(f"  -> {st2} {f2} | {t2[:80]} | {','.join(flags)} | {snip.group(0).strip()[:200] if snip else ''}")
            except Exception as e:
                print(f"  -> ERR {u} {str(e)[:80]}")
    except Exception as e:
        print(f"HOME {key} ERR {home} {str(e)[:100]}")
