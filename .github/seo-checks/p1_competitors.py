"""Phase 2.3 P1: structural facts about public competitor city pages (read-only GET, one request per URL).

Records only measurable structure (status, final URL, title, meta description length, H1, H2s,
word count, FAQ schema questions, schema types, forms, tel links, images, links mentioning the city).
No content is stored beyond headings.
"""
import json, re, sys, urllib.request
from bs4 import BeautifulSoup

URLS = {
    "placentia": ["https://www.dialonesonshine.com/placentia-hvac-services", "https://servicechampions.com/?p=18696",
                  "https://www.hvacserviceacrepair.com/service-areas/orange-county/placentia"],
    "costa-mesa": ["https://servicechampions.com/?p=18792", "https://www.aireserv.com/locations/california/costa-mesa/emergency-hvac/",
                   "https://comfortyoucanfeel.com/?p=38", "https://www.dialonesonshine.com/costa-mesa-hvac-services",
                   "https://www.hvacserviceacrepair.com/service-areas/orange-county/costa-mesa"],
    "yorba-linda": ["https://www.dialonesonshine.com/yorba-linda-hvac-services", "https://servicechampions.com/?p=18624",
                    "https://www.onehourheatandair.com/areas-we-service/yorba-linda-ca/",
                    "https://www.hvacserviceacrepair.com/service-areas/orange-county/yorba-linda"],
}
UA = {"User-Agent": "Mozilla/5.0 (compatible; hvac-seo-research/1.0)"}

for city, urls in URLS.items():
    name = city.replace("-", " ")
    for u in urls:
        try:
            r = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30)
            final, status, html = r.geturl(), r.status, r.read().decode("utf-8", "replace")
        except Exception as e:
            print(json.dumps({"city": city, "url": u, "error": str(e)[:120]}))
            continue
        s = BeautifulSoup(html, "lxml")
        types, faqs = set(), 0
        for x in s.find_all("script", type="application/ld+json"):
            try:
                d = json.loads(x.string or "")
            except Exception:
                continue
            stack = [d]
            while stack:
                o = stack.pop()
                if isinstance(o, dict):
                    t = o.get("@type")
                    if isinstance(t, str): types.add(t)
                    if isinstance(t, list): types.update(t)
                    if t == "Question": faqs += 1
                    stack.extend(o.values())
                elif isinstance(o, list):
                    stack.extend(o)
        for t in s(["script", "style", "noscript", "svg"]):
            t.decompose()
        body = s.find("main") or s.body or s
        text = " ".join(body.get_text(" ", strip=True).split())
        md = s.find("meta", attrs={"name": "description"})
        print(json.dumps({
            "city": city, "url": u, "final": final, "status": status,
            "title": (s.title.get_text(strip=True) if s.title else "")[:120],
            "meta_desc_len": len(md["content"]) if md and md.get("content") else 0,
            "h1": [h.get_text(" ", strip=True)[:90] for h in s.find_all("h1")][:2],
            "h2": [h.get_text(" ", strip=True)[:70] for h in s.find_all("h2")][:14],
            "words": len(text.split()), "city_mentions": text.lower().count(name),
            "faq_schema_questions": faqs, "schema_types": sorted(types)[:12],
            "forms": len(s.find_all("form")), "tel_links": len(s.select('a[href^="tel:"]')),
            "images": len(body.find_all("img")),
        }))
