"""Phase 2 content audit: similarity, FAQ reuse, internal links, keyword targeting.

Input: a crawl directory holding pages.json (from extract.py) built from a
local `next start`. Output: CSV/JSON reports in the given output directory.

    python3 -I scripts/seo-audit/analyze.py <crawl-dir> <out-dir>
"""
import collections, csv, itertools, json, os, re, sys

CRAWL, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
pages = json.load(open(os.path.join(CRAWL, "pages.json")))
by_path = {p["path"]: p for p in pages}

# ── City / county per page ──────────────────────────────────────────────────
city_county = {}
for p in pages:
    s = p["path"].strip("/").split("/")
    if s[0] == "service-areas" and len(s) == 3:
        city_county[s[2]] = s[1]
COUNTY_NAMES = ["Orange County", "Los Angeles County", "Riverside County", "San Bernardino County", "San Diego County", "Ventura County"]

def city_slug(path):
    s = path.strip("/").split("/")
    if p_family(path).startswith(("ppc_city", "city_service", "service_area_city")):
        return s[-1]
    if len(s) == 1 and s[0].endswith("-ac-repair"):
        return s[0][: -len("-ac-repair")]
    return None

def p_family(path):
    return by_path[path]["family"]

def title_case(slug):
    return " ".join(w.capitalize() for w in slug.split("-"))

def normalise(text, path):
    c = city_slug(path)
    if c:
        text = re.sub(re.escape(title_case(c)), " CITY ", text, flags=re.I)
    for n in COUNTY_NAMES:
        text = text.replace(n, " COUNTY ")
    return text

def shingles(text, k=5):
    w = re.findall(r"[a-z0-9$%']+", text.lower())
    return {" ".join(w[i:i + k]) for i in range(max(0, len(w) - k + 1))}

SH = {p["path"]: shingles(normalise(p["text"], p["path"])) for p in pages}
RAW = {p["path"]: shingles(p["text"]) for p in pages}

def jac(a, b):
    return len(a & b) / len(a | b) if a and b else 0.0

# Nearest neighbour across the whole site (normalised for city names).
paths = [p["path"] for p in pages]
nearest = {x: (0.0, None) for x in paths}
fam_scores = collections.defaultdict(list)
for a, b in itertools.combinations(paths, 2):
    if not (SH[a] and SH[b]):
        continue
    # Cheap bound: Jaccard <= min/max size ratio.
    la, lb = len(SH[a]), len(SH[b])
    if min(la, lb) / max(la, lb) < 0.25:
        continue
    j = jac(SH[a], SH[b])
    if j > nearest[a][0]: nearest[a] = (j, b)
    if j > nearest[b][0]: nearest[b] = (j, a)
    if by_path[a]["family"] == by_path[b]["family"]:
        fam_scores[a].append(j); fam_scores[b].append(j)

# Share of a page's shingles found on no other page in its family = unique text.
fam_members = collections.defaultdict(list)
for p in pages: fam_members[p["family"]].append(p["path"])
unique_share = {}
for fam, members in fam_members.items():
    count = collections.Counter(s for m in members for s in SH[m])
    for m in members:
        unique_share[m] = sum(1 for s in SH[m] if count[s] == 1) / len(SH[m]) if SH[m] else 0

# Paragraph-level duplication (normalised for city names).
def pnorm(t, path):
    return re.sub(r"\s+", " ", normalise(t, path).lower()).strip()
para_pages = collections.defaultdict(set)
for p in pages:
    for b in p["blocks"]:
        para_pages[pnorm(b, p["path"])].add(p["path"])
dup_para_share = {}
for p in pages:
    bl = [pnorm(b, p["path"]) for b in p["blocks"]]
    dup_para_share[p["path"]] = sum(1 for b in bl if len(para_pages[b]) >= 5) / len(bl) if bl else 0

# FAQ reuse (normalised question text).
faq_pages = collections.defaultdict(set)
for p in pages:
    for f in p["faqs"]:
        faq_pages[pnorm(f["q"], p["path"])].add(p["path"])
faq_reuse = {p["path"]: (sum(1 for f in p["faqs"] if len(faq_pages[pnorm(f["q"], p["path"])]) >= 5) / len(p["faqs"]) if p["faqs"] else None) for p in pages}

# ── Internal links ──────────────────────────────────────────────────────────
inlinks = collections.defaultdict(lambda: {"any": set(), "main": set(), "anchors": collections.Counter()})
outmain = {}
for p in pages:
    seen_main = set()
    for l in p["links"]:
        t = l["to"]
        if t == p["path"] or t not in by_path: continue
        inlinks[t]["any"].add(p["path"])
        if l["region"] == "main":
            inlinks[t]["main"].add(p["path"]); seen_main.add(t)
            if l["anchor"]: inlinks[t]["anchors"][l["anchor"]] += 1
    outmain[p["path"]] = seen_main
city_link_block = {p["path"]: sum(1 for t in outmain[p["path"]] if city_slug(t)) for p in pages}

# ── Classification ──────────────────────────────────────────────────────────
OC = {c for c, k in city_county.items() if k == "orange-county"}
def classify(p):
    path, fam, w = p["path"], p["family"], p["words"]
    near, nb = nearest[path]
    c = city_slug(path)
    if fam.startswith("ppc_legacy"):
        return "KEEP", f"Hand-written ({unique_share[path]:.0%} unique text) but zero internal links. Confirm whether it is an Ads destination; if organic, link it from its county hub."
    if fam.startswith("ppc_city"):
        return "NOINDEX CANDIDATE", "Google Ads landing page: keep live and unchanged for Ads; template copy competes with the organic city pages. Needs GSC check before any noindex."
    if fam.startswith("city_service"):
        svc = path.strip("/").split("/")
        svc = svc[1] if svc[0] == "air-conditioning" else svc[0]
        if c == "yorba-linda":
            return "IMPROVE", "Home-base city: primary page for this service intent. Add real local proof (jobs, photos, owner facts)."
        if unique_share[path] >= 0.3:
            return "IMPROVE", f"Hand-written page ({unique_share[path]:.0%} unique text). Keep as the city's primary page for this service; add verified local proof."
        if svc in ("ac-repair", "emergency-ac-repair") and c in OC:
            return "IMPROVE", f"Generated core-market page; {near:.0%} identical to {nb} once city names are removed. Needs city-specific substance, not reworded copy."
        if svc in ("ac-repair", "emergency-ac-repair"):
            return "MERGE CANDIDATE", f"Outside Orange County; {near:.0%} identical to {nb}. Fold into the county or service-area page unless GSC shows clicks."
        return "MERGE CANDIDATE", f"{near:.0%} identical to {nb}; thin variant of the city's service-area page. Merge into /service-areas/.../{c} unless GSC shows clicks."
    if fam.startswith("service_area_city"):
        return "IMPROVE", f"Only family with real per-city context, but {w} words. Expand with owner-verified local information; make this the city hub."
    if fam == "service_area_county":
        return "IMPROVE", f"{w} words; county hub should link to and summarise its cities."
    if w < 350:
        return "IMPROVE", f"Thin ({w} words)."
    if near >= 0.6:
        return "MERGE CANDIDATE", f"{near:.0%} identical to {nb}."
    return "KEEP", "Distinct content."

rows = []
for p in pages:
    cls, why = classify(p)
    near, nb = nearest[p["path"]]
    fs = fam_scores[p["path"]]
    rows.append({
        "path": p["path"], "family": p["family"], "words": p["words"],
        "nearest_similarity": round(near, 3), "nearest_page": nb or "",
        "family_mean_similarity": round(sum(fs) / len(fs), 3) if fs else "",
        "unique_text_share": round(unique_share[p["path"]], 3),
        "duplicated_paragraph_share": round(dup_para_share[p["path"]], 3),
        "faq_count": len(p["faqs"]),
        "faq_reused_share": "" if faq_reuse[p["path"]] is None else round(faq_reuse[p["path"]], 3),
        "inlinks_any": len(inlinks[p["path"]]["any"]), "inlinks_contextual": len(inlinks[p["path"]]["main"]),
        "city_links_in_body": city_link_block[p["path"]],
        "title": p["title"], "h1": " | ".join(p["h1"]),
        "classification": cls, "reason": why,
    })
with open(os.path.join(OUT, "page-classification.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)

# ── Summaries for the report ────────────────────────────────────────────────
def med(v):
    v = sorted(v); return v[len(v) // 2] if v else None
fam_summary = {}
for fam, members in sorted(fam_members.items(), key=lambda kv: -len(kv[1])):
    rs = [r for r in rows if r["family"] == fam]
    fam_summary[fam] = {
        "pages": len(rs), "words_median": med([r["words"] for r in rs]),
        "family_mean_similarity_median": med([r["family_mean_similarity"] for r in rs if r["family_mean_similarity"] != ""]),
        "nearest_similarity_median": med([r["nearest_similarity"] for r in rs]),
        "unique_text_share_median": med([r["unique_text_share"] for r in rs]),
        "duplicated_paragraph_share_median": med([r["duplicated_paragraph_share"] for r in rs]),
        "faq_reused_share_median": med([r["faq_reused_share"] for r in rs if r["faq_reused_share"] != ""]),
        "contextual_inlinks_median": med([r["inlinks_contextual"] for r in rs]),
        "classification": dict(collections.Counter(r["classification"] for r in rs)),
    }
top_paras = sorted(((len(v), k) for k, v in para_pages.items() if len(v) >= 20), reverse=True)[:25]
top_faqs = sorted(((len(v), k) for k, v in faq_pages.items() if len(v) >= 10), reverse=True)[:25]

# Cross-family: same city, overlapping intent.
cities = sorted({city_slug(p["path"]) for p in pages if city_slug(p["path"])})
city_groups = {}
for c in cities:
    g = [p["path"] for p in pages if city_slug(p["path"]) == c]
    pair = [(round(jac(SH[a], SH[b]), 3), a, b) for a, b in itertools.combinations(g, 2)]
    city_groups[c] = {"urls": g, "max_pair_similarity": max(pair)[0] if pair else None}

# Keyword targeting for the priority Yorba Linda terms.
KW = {
    "AC Repair Yorba Linda": r"\bac repair\b",
    "HVAC Company Yorba Linda": r"\bhvac (company|contractor|service)\b",
    "HVAC Repair Yorba Linda": r"\bhvac repair\b",
    "AC Installation Yorba Linda": r"\b(ac|air conditioning|air conditioner) (installation|install|replacement)\b",
    "Emergency AC Repair Yorba Linda": r"\bemergency\b",
}
kw_map = {}
for k, rx in KW.items():
    hits = []
    for p in pages:
        # Drop the brand name, which itself contains "HVAC Service" and "AC Repair".
        t, h = (x.lower().replace("hvac service & ac repair", " ") for x in (p["title"], " ".join(p["h1"])))
        if "yorba linda" in t + " " + h and (re.search(rx, t) or re.search(rx, h)):
            hits.append({"path": p["path"], "title": p["title"], "h1": " | ".join(p["h1"]),
                         "inlinks_contextual": len(inlinks[p["path"]]["main"]), "in_title": bool(re.search(rx, t)), "in_h1": bool(re.search(rx, h))})
    kw_map[k] = hits

important = ["/", "/air-conditioning/ac-repair/yorba-linda", "/air-conditioning/emergency-ac-repair/yorba-linda",
             "/air-conditioning/ac-installation", "/air-conditioning/ac-repair", "/hvac-repair/yorba-linda",
             "/service-areas/orange-county/yorba-linda", "/service-areas/orange-county", "/emergency-hvac-service",
             "/contact", "/reviews", "/maintenance-plans", "/air-conditioning/ac-tune-up/yorba-linda",
             "/heating/heating-repair/yorba-linda", "/ac-repair/yorba-linda"]
link_report = {
    "important": {u: {"any": len(inlinks[u]["any"]), "contextual": len(inlinks[u]["main"]),
                      "top_anchors": inlinks[u]["anchors"].most_common(6)} for u in important if u in by_path},
    "orphans_any": sorted(u for u in paths if not inlinks[u]["any"]),
    "orphans_contextual": sorted(u for u in paths if not inlinks[u]["main"]),
    "contextual_inlinks_by_family": {fam: med([len(inlinks[m]["main"]) for m in ms]) for fam, ms in fam_members.items()},
    "city_links_in_body_by_family": {fam: med([city_link_block[m] for m in ms]) for fam, ms in fam_members.items()},
    "header_footer_link_targets": collections.Counter(l["to"] for l in by_path["/contact"]["links"] if l["region"] in ("header", "footer")).most_common(),
}
# Service-to-location: does each OC city hub link to its own service pages, and back?
svc_loc = []
for c in sorted(OC):
    hub = f"/service-areas/orange-county/{c}"
    if hub not in by_path: continue
    svc_pages = [u for u in paths if city_slug(u) == c and by_path[u]["family"].startswith("city_service")]
    svc_loc.append({"city": c, "hub_links_to_service_pages": sum(1 for u in svc_pages if u in outmain[hub]),
                    "service_pages": len(svc_pages),
                    "service_pages_linking_to_hub": sum(1 for u in svc_pages if hub in outmain[u])})
link_report["service_location"] = svc_loc

json.dump({"families": fam_summary, "top_paragraphs": top_paras, "top_faqs": top_faqs,
           "city_groups": city_groups, "keyword_map": kw_map, "links": link_report},
          open(os.path.join(OUT, "summary.json"), "w"), indent=1, default=list)
print("classification:", collections.Counter(r["classification"] for r in rows))
