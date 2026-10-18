"""Extract per-page SEO data from the crawled HTML into pages.json."""
import json, re, sys, os
from bs4 import BeautifulSoup

CRAWL = sys.argv[1]
ORIGIN = "https://www.hvacserviceacrepair.com"

def family(p):
    s = p.strip("/").split("/")
    if p == "/": return "home"
    if s[0] == "ac-repair" and len(s) == 2: return "ppc_city (/ac-repair/[city])"
    if len(s) == 1 and s[0].endswith("-ac-repair"): return "ppc_legacy (/[city]-ac-repair)"
    if s[0] == "air-conditioning" and len(s) == 3: return f"city_service (/air-conditioning/{s[1]}/[city])"
    if s[0] == "heating" and len(s) == 3: return f"city_service (/heating/{s[1]}/[city])"
    if s[0] == "hvac-repair" and len(s) == 2: return "city_service (/hvac-repair/[city])"
    if s[0] == "service-areas" and len(s) == 3: return "service_area_city (/service-areas/[county]/[city])"
    if s[0] == "service-areas" and len(s) == 2: return "service_area_county"
    if s[0] == "blog": return "blog"
    if s[0] == "calculators": return "calculators"
    if s[0] in ("air-conditioning", "heating", "heat-pumps", "ductless", "commercial-hvac", "air-duct-services", "maintenance"): return "service"
    return "core"

def norm_path(href):
    if not href: return None
    href = href.split("#")[0].split("?")[0]
    if href.startswith(ORIGIN): href = href[len(ORIGIN):] or "/"
    if not href.startswith("/") or href.startswith("//"): return None
    return href.rstrip("/") or "/"

pages = []
for line in open(os.path.join(CRAWL, "paths.txt")):
    path = line.strip()
    f = "_index" if path == "/" else path.replace("/", "_")
    soup = BeautifulSoup(open(os.path.join(CRAWL, "html", f + ".html"), encoding="utf-8").read(), "lxml")
    ld = []
    for s in soup.find_all("script", type="application/ld+json"):
        try: ld.append(json.loads(s.string))
        except Exception: pass
    faqs = []
    def walk(o):
        if isinstance(o, dict):
            if o.get("@type") == "Question": faqs.append({"q": o.get("name", ""), "a": (o.get("acceptedAnswer") or {}).get("text", "")})
            for v in o.values(): walk(v)
        elif isinstance(o, list):
            for v in o: walk(v)
    walk(ld)
    title = soup.title.get_text(" ", strip=True) if soup.title else ""
    md = soup.find("meta", attrs={"name": "description"})
    main = soup.find("main")
    links = []
    for a in soup.find_all("a", href=True):
        t = norm_path(a["href"])
        if t is None: continue
        region = "main" if main and a.find_parent("main") is main else ("header" if a.find_parent("header") else ("footer" if a.find_parent("footer") else "other"))
        links.append({"to": t, "region": region, "anchor": a.get_text(" ", strip=True)[:80]})
    for s in main.find_all(["script", "style", "noscript", "svg"]): s.decompose()
    heads = [(h.name, h.get_text(" ", strip=True)) for h in main.find_all(["h1", "h2", "h3"])]
    blocks = []
    for el in main.find_all(["p", "li", "blockquote", "dd", "td"]):
        if el.find(["p", "li"]): continue
        t = " ".join(el.get_text(" ", strip=True).split())
        if len(t.split()) >= 8: blocks.append(t)
    text = " ".join(main.get_text(" ", strip=True).split())
    pages.append({
        "path": path, "family": family(path), "title": title,
        "description": md["content"] if md else "",
        "h1": [h for n, h in heads if n == "h1"], "h2": [h for n, h in heads if n == "h2"],
        "h3": [h for n, h in heads if n == "h3"],
        "words": len(text.split()), "text": text, "blocks": blocks, "faqs": faqs,
        "links": links, "images": len(main.find_all("img")),
        "schema": sorted({t for o in ld for t in ([o.get("@type")] if isinstance(o, dict) else []) if isinstance(t, str)} | {g.get("@type") for o in ld if isinstance(o, dict) for g in o.get("@graph", []) if isinstance(g.get("@type"), str)}),
    })
json.dump(pages, open(os.path.join(CRAWL, "pages.json"), "w"))
print(len(pages), "pages")
