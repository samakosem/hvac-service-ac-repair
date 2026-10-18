"""Phase 2.3: cannibalization and duplication metrics for every crawled route.

    python3 scripts/seo-audit/phase23_analyze.py <crawl-dir> <out-dir>

<crawl-dir> needs pages.json (from extract.py) for every prerendered route.
Writes <out-dir>/metrics.json (one record per page), pairs.json (same-city and
same-topic page pairs) and clusters.json (near-duplicate groups).

Similarity is measured on main content only (header and footer excluded):
  raw_sim     5-word shingle Jaccard on the text as Google sees it
  norm_sim    the same after every city and county name becomes "{city}",
              so pages that differ only by the city name score near 1.0
Sentence analysis (sentences of 6+ words, city names normalized):
  template_share  share of words in sentences found on 5+ other pages
  unique_share    share of words in sentences found on no other page
"""
import collections, itertools, json, os, re, sys

CRAWL, OUT = sys.argv[1:3]
os.makedirs(OUT, exist_ok=True)
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = json.load(open(os.path.join(CRAWL, "pages.json")))
BY = {p["path"]: p for p in P}

src = "".join(open(os.path.join(ROOT, "src/lib/config", f)).read() for f in ("locations.ts", "ppc-city-generator.ts", "ppc-cities.ts"))
NAMES = {n for _, n in re.findall(r'slug:\s*"([^"]+)",\s*name:\s*"([^"]+)"', src)}
NAMES |= {"Orange County", "Los Angeles County", "Riverside County", "San Bernardino County", "Ventura County", "Santa Barbara County",
          "Los Angeles", "Southern California", "OC", "SoCal", "Inland Empire", "San Fernando Valley", "San Gabriel Valley"}
PPC_META = {s: {"region": r, "county": c} for s, _, r, c in re.findall(r'\{ slug: "([^"]+)", name: "([^"]+)", region: "([^"]+)", county: "([^"]+)"', src)}
CITY_RE = re.compile(r"\b(" + "|".join(sorted(map(re.escape, NAMES), key=len, reverse=True)) + r")\b")

def norm(t):
    return CITY_RE.sub("{city}", t)

def toks(t):
    return re.findall(r"[a-z0-9{}']+", t.lower())

def shingles(t, k=5):
    w = toks(t)
    return {" ".join(w[i:i + k]) for i in range(max(len(w) - k + 1, 1))}

def jac(a, b):
    return len(a & b) / len(a | b) if a and b else 0.0

def sentences(p):
    out = []
    for b in p["blocks"]:
        for s in re.split(r"(?<=[.!?])\s+", b):
            if len(s.split()) >= 6:
                out.append(" ".join(toks(norm(s))))
    return out

# ---------- page identity: family, city, service ----------
HUB_CITY = {}
for p in P:
    s = p["path"].strip("/").split("/")
    if s[0] == "service-areas" and len(s) == 3:
        HUB_CITY[s[2]] = s[1]

def ident(path):
    s = path.strip("/").split("/")
    if path == "/": return ("home", "yorba-linda", "hvac-company")
    if s[0] == "ac-repair" and len(s) == 2: return ("ads_generated", s[1], "ac-repair")
    if len(s) == 1 and s[0].endswith("-ac-repair"): return ("ads_handwritten", s[0][:-10], "ac-repair")
    if s[0] == "air-conditioning" and len(s) == 3: return ("city_service", s[2], s[1])
    if s[0] == "heating" and len(s) == 3: return ("city_service", s[2], s[1])
    if s[0] == "hvac-repair" and len(s) == 2: return ("city_service", s[1], "hvac-repair")
    if s[0] == "service-areas" and len(s) == 3: return ("city_hub", s[2], "hvac-service")
    if s[0] == "service-areas" and len(s) == 2: return ("county_hub", s[1], "hvac-service")
    if s[0] == "service-areas": return ("areas_index", None, "hvac-service")
    if s[0] == "blog" and len(s) == 2: return ("blog_post", None, s[1])
    if s[0] == "blog": return ("blog_index", None, "blog")
    if s[0] == "calculators": return ("calculator", None, s[-1])
    if s[0] in ("air-conditioning", "heating", "heat-pumps", "ductless", "commercial-hvac", "air-duct-services", "maintenance") or path in ("/ac-not-cooling", "/emergency-hvac-service", "/services", "/maintenance-plans"):
        return ("service", None, s[-1])
    return ("core", None, s[0])

# ---------- per-page metrics ----------
sh_raw = {p["path"]: shingles(p["text"]) for p in P}
sh_norm = {p["path"]: shingles(norm(p["text"])) for p in P}
sents = {p["path"]: sentences(p) for p in P}
sent_pages = collections.defaultdict(set)
for path, ss in sents.items():
    for s in set(ss):
        sent_pages[s].add(path)

inl_ctx, inl_any = collections.Counter(), collections.Counter()
for p in P:
    for t in {l["to"] for l in p["links"] if l["region"] == "main"} - {p["path"]}:
        inl_ctx[t] += 1
    for t in {l["to"] for l in p["links"]} - {p["path"]}:
        inl_any[t] += 1

# Inverted index on normalized shingles to find each page's nearest neighbour quickly.
df = collections.Counter(s for v in sh_norm.values() for s in v)
paths = [p["path"] for p in P]
metrics = []
for p in P:
    path = p["path"]
    fam, city, svc = ident(path)
    ss = sents[path]
    words = [len(s.split()) for s in ss]
    tot = sum(words) or 1
    tmpl = sum(w for s, w in zip(ss, words) if len(sent_pages[s]) >= 6) / tot
    uniq = sum(w for s, w in zip(ss, words) if len(sent_pages[s]) == 1) / tot
    best = max(((jac(sh_norm[path], sh_norm[q]), q) for q in paths if q != path), default=(0, None))
    best_raw = max(((jac(sh_raw[path], sh_raw[q]), q) for q in paths if q != path), default=(0, None))
    faq_q = [norm(f["q"]) for f in p["faqs"]]
    metrics.append({
        "path": path, "family": fam, "city": city, "service": svc,
        "county": HUB_CITY.get(city) or (PPC_META.get(city) or {}).get("county"),
        "ppc_region": (PPC_META.get(city) or {}).get("region") if fam.startswith("ads") else None,
        "title": p["title"], "h1": (p["h1"] or [""])[0], "description": p["description"], "words": p["words"],
        "norm_sim": round(best[0], 3), "norm_nearest": best[1],
        "raw_sim": round(best_raw[0], 3), "raw_nearest": best_raw[1],
        "template_share": round(tmpl, 3), "unique_share": round(uniq, 3), "sentences": len(ss),
        "faqs": len(faq_q), "inlinks_contextual": inl_ctx[path], "inlinks_any": inl_any[path],
    })
M = {m["path"]: m for m in metrics}

# FAQ reuse: share of a page's FAQ questions that appear on 5+ pages.
faq_pages = collections.defaultdict(set)
for p in P:
    for f in p["faqs"]:
        faq_pages[" ".join(toks(norm(f["q"])))].add(p["path"])
for p in P:
    qs = [" ".join(toks(norm(f["q"]))) for f in p["faqs"]]
    M[p["path"]]["faq_reused_share"] = round(sum(len(faq_pages[q]) >= 5 for q in qs) / len(qs), 3) if qs else None

# ---------- near-duplicate clusters (normalized Jaccard >= 0.85) ----------
parent = {p: p for p in paths}
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x
fams = collections.defaultdict(list)
for m in metrics:
    fams[(m["family"], m["service"]) if m["family"] in ("city_service",) else m["family"]].append(m["path"])
for group in fams.values():
    for a, b in itertools.combinations(group, 2):
        if jac(sh_norm[a], sh_norm[b]) >= 0.85:
            parent[find(a)] = find(b)
clusters = collections.defaultdict(list)
for p in paths:
    clusters[find(p)].append(p)
cl = sorted((v for v in clusters.values() if len(v) > 1), key=len, reverse=True)
for i, members in enumerate(cl, 1):
    for m in members:
        M[m]["cluster"] = f"C{i:02d}"
cluster_summary = []
for i, members in enumerate(cl, 1):
    fam = collections.Counter(M[m]["family"] + ("/" + M[m]["service"] if M[m]["family"] == "city_service" else "") for m in members)
    sample = members[:40]
    sims = [jac(sh_norm[a], sh_norm[b]) for a, b in itertools.combinations(sample, 2)]
    raws = [jac(sh_raw[a], sh_raw[b]) for a, b in itertools.combinations(sample, 2)]
    cluster_summary.append({"id": f"C{i:02d}", "size": len(members), "families": dict(fam),
                            "mean_norm_sim": round(sum(sims) / len(sims), 3), "mean_raw_sim": round(sum(raws) / len(raws), 3),
                            "members": sorted(members)})
for m in metrics:
    m.setdefault("cluster", "")

# ---------- pairs: every URL that targets the same city ----------
by_city = collections.defaultdict(list)
for m in metrics:
    if m["city"] and m["family"] not in ("county_hub",):
        by_city[m["city"]].append(m["path"])
pairs = []
for city, ps in by_city.items():
    for a, b in itertools.combinations(sorted(set(ps)), 2):
        pairs.append({"city": city, "a": a, "b": b, "raw_sim": round(jac(sh_raw[a], sh_raw[b]), 3),
                      "norm_sim": round(jac(sh_norm[a], sh_norm[b]), 3)})

# Topic pairs among non-location pages (services, blog, calculators, core).
topical = [m["path"] for m in metrics if m["family"] in ("service", "blog_post", "calculator", "core", "home", "areas_index", "blog_index")]
topic_pairs = []
for a, b in itertools.combinations(topical, 2):
    r = jac(sh_raw[a], sh_raw[b])
    if r >= 0.04:
        topic_pairs.append({"a": a, "b": b, "raw_sim": round(r, 3)})

json.dump(metrics, open(os.path.join(OUT, "metrics.json"), "w"), indent=0)
json.dump({"city_pairs": pairs, "topic_pairs": sorted(topic_pairs, key=lambda x: -x["raw_sim"])}, open(os.path.join(OUT, "pairs.json"), "w"), indent=0)
json.dump(cluster_summary, open(os.path.join(OUT, "clusters.json"), "w"), indent=0)
print(len(metrics), "pages;", len(cluster_summary), "clusters;", len(pairs), "city pairs;", len(topic_pairs), "topic pairs")
