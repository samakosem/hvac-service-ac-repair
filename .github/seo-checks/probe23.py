"""Phase 2.3 audit probes against the live site (read-only, GET/HEAD only).

    python3 probe23.py <redirect-sources.txt>

Prints tab-separated result lines, one per probe, each starting with a tag:
  HOST   every sitemap URL on the apex host, over http, and with a trailing slash
  EXTRA  indexable routes outside the sitemap: status, robots meta, X-Robots-Tag, canonical
  REDIR  every configured redirect source: hops, status chain, final URL and status
  PARAM  query-string and case variants of key pages: status and canonical
  WAYBK  every URL the Wayback Machine has seen on either host, probed live today
  VERCL  vercel.app hostnames: status and X-Robots-Tag
"""
import concurrent.futures as cf, http.client, json, re, sys, time, urllib.parse, urllib.request

WWW = "https://www.hvacserviceacrepair.com"
UA = "hvac-seo-audit/1.0 (+phase-2.3)"

def once(url, method="GET"):
    u = urllib.parse.urlsplit(url)
    C = http.client.HTTPSConnection if u.scheme == "https" else http.client.HTTPConnection
    for attempt in range(3):
        try:
            c = C(u.netloc, timeout=30)
            c.request(method, (u.path or "/") + (("?" + u.query) if u.query else ""), headers={"User-Agent": UA})
            r = c.getresponse()
            body = r.read().decode("utf-8", "replace") if method == "GET" else ""
            return r.status, dict((k.lower(), v) for k, v in r.getheaders()), body
        except Exception as e:
            err = e
            time.sleep(2)
    return 0, {"error": str(err)}, ""

def chain(url, max_hops=8):
    """Follow redirects by hand; returns (statuses, final_url, final_status, headers, body)."""
    statuses = []
    for _ in range(max_hops):
        s, h, b = once(url)
        statuses.append(s)
        if s in (301, 302, 303, 307, 308) and "location" in h:
            url = urllib.parse.urljoin(url, h["location"])
            continue
        return statuses, url, s, h, b
    return statuses, url, -1, {}, ""

def head_facts(body):
    robots = re.search(r'<meta[^>]+name="robots"[^>]+content="([^"]*)"', body)
    canon = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]*)"', body)
    return (robots.group(1) if robots else "-"), (canon.group(1) if canon else "-")

def pool(fn, items, n=8):
    return list(cf.ThreadPoolExecutor(n).map(fn, items))

_, _, sm = once(WWW + "/sitemap.xml")
paths = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sm)]
print(f"INFO\tsitemap_urls\t{len(paths)}")

# HOST: apex https, http www, http apex, trailing slash; expect one hop to the canonical URL.
def host(p):
    out = []
    for label, url in (("apex_https", "https://hvacserviceacrepair.com" + p), ("www_http", "http://www.hvacserviceacrepair.com" + p),
                       ("apex_http", "http://hvacserviceacrepair.com" + p), ("slash", WWW + p + "/" if p != "/" else None)):
        if url is None:
            continue
        st, final, fs, _, _ = chain(url)
        out.append(f"HOST\t{label}\t{p}\t{'>'.join(map(str, st))}\t{final}\t{fs}")
    return out
for lines in pool(host, paths):
    print("\n".join(lines))

# EXTRA: prerendered routes that are not in the sitemap.
for p in ["/privacy-policy", "/services", "/sms-compliance", "/terms", "/thank-you"]:
    st, final, fs, h, b = chain(WWW + p)
    r, c = head_facts(b)
    print(f"EXTRA\t{p}\t{'>'.join(map(str, st))}\t{fs}\trobots={r}\tx-robots={h.get('x-robots-tag', '-')}\tcanonical={c}\tlinked_from_footer_or_nav=see-crawl")

# REDIR: configured redirect sources.
sources = [l.strip() for l in open(sys.argv[1]) if l.strip()]
def redir(p):
    st, final, fs, _, _ = chain(WWW + p)
    return f"REDIR\t{p}\t{len(st) - 1}\t{'>'.join(map(str, st))}\t{final}\t{fs}"
print("\n".join(pool(redir, sources)))

# PARAM: tracking parameters and case variants should keep the clean canonical.
for p in ["/", "/ac-repair/anaheim", "/orange-county-ac-repair", "/air-conditioning/ac-repair/yorba-linda", "/service-areas/orange-county/yorba-linda"]:
    for v in (p + "?gclid=test123&utm_source=google", p + "?page=2", p.upper() if p != "/" else "/INDEX", p + "/index.html" if p != "/" else "/index.html"):
        st, final, fs, h, b = chain(WWW + v)
        r, c = head_facts(b) if fs == 200 else ("-", "-")
        print(f"PARAM\t{v}\t{'>'.join(map(str, st))}\t{final}\t{fs}\trobots={r}\tcanonical={c}")

# WAYBK: historical URLs from the Wayback Machine CDX index (both hosts), probed live.
seen = {}
for host_ in ("hvacserviceacrepair.com", "www.hvacserviceacrepair.com"):
    q = f"https://web.archive.org/cdx/search/cdx?url={host_}/*&output=json&fl=original,timestamp,statuscode,mimetype&collapse=urlkey&limit=20000"
    rows = []
    for attempt in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(q, headers={"User-Agent": UA}), timeout=120) as r:
                rows = json.loads(r.read() or b"[]")
            break
        except Exception as e:
            print(f"INFO\twayback_error\t{host_}\t{e}")
            time.sleep(10)
    print(f"INFO\twayback_rows\t{host_}\t{max(len(rows) - 1, 0)}")
    for orig, ts, sc, mt in rows[1:]:
        u = urllib.parse.urlsplit(orig if "://" in orig else "http://" + orig)
        path = urllib.parse.unquote(u.path) or "/"
        if mt not in ("text/html", "warc/revisit", "-") or re.search(r"\.(css|js|png|jpe?g|gif|svg|webp|ico|woff2?|xml|txt|json|pdf)$", path, re.I) or path.startswith(("/_next/", "/wp-content/", "/wp-includes/", "/wp-json")):
            continue
        key = path + (("?" + u.query) if u.query and not re.search(r"(utm_|gclid|fbclid)", u.query) else "")
        prev = seen.get(key)
        if not prev or ts > prev[1]:
            seen[key] = (u.netloc, ts, sc, prev[3] if prev else set())
        seen[key][3].add(u.netloc.lower().replace(":80", ""))
def wb(item):
    key, (netloc, ts, sc, hosts) = item
    st, final, fs, _, _ = chain(WWW + urllib.parse.quote(key, safe="/?=&%"))
    return f"WAYBK\t{key}\t{','.join(sorted(hosts))}\tlast_capture={ts}\tarchived_status={sc}\tlive={'>'.join(map(str, st))}\t{final}\t{fs}"
print("\n".join(pool(wb, sorted(seen.items()), 6)))

# VERCL: Vercel hostnames that could serve duplicate copies.
for v in ("https://hvac-service-ac-repair.vercel.app/", "https://hvac-service-ac-repair-sams-projects-4743330d.vercel.app/",
          "https://hvac-service-ac-repair-np1fcdh5w-sams-projects-4743330d.vercel.app/"):
    s, h, b = once(v)
    r, c = head_facts(b)
    print(f"VERCL\t{v}\t{s}\tlocation={h.get('location', '-')}\tx-robots={h.get('x-robots-tag', '-')}\trobots={r}\tcanonical={c}")
print("INFO\tdone")
