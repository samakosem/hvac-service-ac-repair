"""Fetch every sitemap URL of a live site into <out>/html (read-only).

    python3 crawl.py <base-url> <out-dir>

Writes paths.txt and status.txt in the layout scripts/seo-audit/extract.py expects.
"""
import concurrent.futures as cf, os, re, sys, time, urllib.request

BASE, OUT = sys.argv[1].rstrip("/"), sys.argv[2]
os.makedirs(os.path.join(OUT, "html"), exist_ok=True)
UA = {"User-Agent": "hvac-seo-verify/1.0 (+phase-2.2)"}

def get(url):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                return r.status, r.read().decode("utf-8", "replace")
        except Exception as e:
            err = e
            time.sleep(2)
    return getattr(err, "code", 0), ""

_, sm = get(BASE + "/sitemap.xml")
paths = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sm)]
open(os.path.join(OUT, "paths.txt"), "w").write("\n".join(paths) + "\n")

def fetch(p):
    status, body = get(BASE + p)
    f = "_index" if p == "/" else p.replace("/", "_")
    open(os.path.join(OUT, "html", f + ".html"), "w", encoding="utf-8").write(body)
    return p, status

results = list(cf.ThreadPoolExecutor(6).map(fetch, paths))
open(os.path.join(OUT, "status.txt"), "w").write("".join(f"{s} {p}\n" for p, s in results))
bad = [(p, s) for p, s in results if s != 200]
print(f"crawled {len(results)} sitemap URLs from {BASE}; non-200: {bad or 'none'}")
sys.exit(1 if bad or not results else 0)
