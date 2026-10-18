"""Phase 2.3: page-by-page decisions and redirect candidates (proposals only).

    python3 scripts/seo-audit/phase23_decide.py docs/seo-phase-2/phase23-metrics.json docs/seo-phase-2 \
        [--inputs docs/seo-phase-2/gsc-input]

Reads the content metrics from phase23_analyze.py, applies the rules in
PHASE_2_3_CANNIBALIZATION_AUDIT.md section 6 and writes:

  PHASE_2_3_PAGE_DECISIONS.csv       one row per URL
  PHASE_2_3_REDIRECT_CANDIDATES.csv  consolidation and hygiene redirects
  PHASE_2_3_QUERY_OVERLAP.csv        queries answered by 2+ site URLs (only with a query+page export)
  PHASE_2_3_DATA_STATUS.md           which inputs were found, row counts, warnings, status counts

Every MERGE+301 and NOINDEX is a *candidate* only. Owner decision (2026-10-18):
  * candidates stay PAUSED until real Search Console performance data is loaded;
  * the 175 generated Google Ads pages stay PROTECTED until both their campaign
    use (Google Ads landing-page report) and their organic performance (GSC) are known;
  * Ventura County and Santa Barbara County are confirmed service area; geography
    is never a reason to merge or noindex.
With data loaded, a candidate becomes ELIGIBLE FOR REVIEW only when it passes gate G1
(no clicks, under 100 impressions in each 90-day period, no external links, no
conversions); otherwise it is WITHDRAWN and the page is improved instead. Nothing
here changes the site: an ELIGIBLE candidate still needs explicit approval.

Input files and their exact formats: docs/seo-phase-2/gsc-input/README.md.
"""
import argparse, collections, csv, glob, json, os, re, urllib.parse

ap = argparse.ArgumentParser()
ap.add_argument("metrics")
ap.add_argument("out")
ap.add_argument("--inputs", default=None)
A = ap.parse_args()

M = json.load(open(A.metrics))
BY = {m["path"]: m for m in M}
SITEMAP_EXCLUDED = {"/privacy-policy", "/services", "/sms-compliance", "/terms", "/thank-you"}
NOINDEX_NOW = {"/services": "noindex, follow", "/thank-you": "noindex, nofollow"}
NA = "N/A (no export)"

# ---------------------------------------------------------------- inputs
WARN, FOUND = [], {}

def num(v):
    v = (v or "").strip().replace(",", "").replace("%", "").replace("$", "").replace("US", "")
    if v in ("", "--", "-", "—"):
        return 0.0
    try:
        return float(v)
    except ValueError:
        return 0.0

def norm_path(u):
    """Any URL form (www or apex, http or https, query, fragment, trailing slash) -> site path."""
    u = (u or "").strip()
    if not u:
        return None, None
    if "://" not in u:
        u = "https://www.hvacserviceacrepair.com" + ("" if u.startswith("/") else "/") + u
    s = urllib.parse.urlsplit(u)
    host = s.netloc.lower().split(":")[0]
    if "hvacserviceacrepair.com" not in host:
        return None, host
    p = urllib.parse.unquote(s.path).rstrip("/") or "/"
    return p, host

def read_table(path, page_keys, metric_keys):
    """Reads a CSV export, skipping title rows, matching columns by keyword (case-insensitive).
    page_keys / metric_keys: {name: [keywords...]}. Returns list of dicts with those names."""
    rows = list(csv.reader(open(path, encoding="utf-8-sig", newline="")))
    want = {**page_keys, **metric_keys}
    for i, row in enumerate(rows[:15]):
        low = [c.strip().lower() for c in row]
        idx = {}
        for name, keys in want.items():
            for j, c in enumerate(low):
                if any(k == c or (k.endswith("*") and c.startswith(k[:-1])) for k in keys):
                    idx.setdefault(name, j)
        if all(n in idx for n in page_keys) and any(n in idx for n in metric_keys):
            out = []
            for r in rows[i + 1:]:
                if not r or not any(x.strip() for x in r):
                    continue
                if r[0].strip().lower().startswith(("total", "grand total")):
                    continue
                out.append({n: (r[j] if j < len(r) else "") for n, j in idx.items()})
            return out, [rows[i][j] for j in idx.values()]
    raise ValueError(f"{os.path.basename(path)}: header not recognised (first rows: {rows[:2]})")

PAGE = ["top pages", "page", "pages", "url", "landing page", "address"]
PERF = {"clicks": ["clicks"], "impressions": ["impressions", "impr."], "ctr": ["ctr"], "position": ["position", "avg. position"]}

def load_pages(name):
    path = os.path.join(A.inputs, name) if A.inputs else None
    if not path or not os.path.exists(path):
        return None
    rows, cols = read_table(path, {"page": PAGE}, PERF)
    agg, apex, off = {}, collections.Counter(), 0
    for r in rows:
        p, host = norm_path(r["page"])
        if p is None:
            off += 1
            continue
        if host == "hvacserviceacrepair.com":
            apex["clicks"] += num(r.get("clicks"))
            apex["impressions"] += num(r.get("impressions"))
            apex["urls"] += 1
        a = agg.setdefault(p, {"clicks": 0.0, "impressions": 0.0, "pos_x_impr": 0.0, "hosts": set()})
        a["clicks"] += num(r.get("clicks"))
        a["impressions"] += num(r.get("impressions"))
        a["pos_x_impr"] += num(r.get("position")) * num(r.get("impressions"))
        a["hosts"].add(host)
    FOUND[name] = {"rows": len(rows), "columns": cols, "apex_host": dict(apex), "other_sites": off}
    if len(rows) >= 1000:
        WARN.append(f"{name}: {len(rows)} rows. The GSC interface caps exports at 1,000 rows; a missing page may not mean zero impressions. Use the API or Looker Studio export instead.")
    return agg

def load_query_page(name):
    path = os.path.join(A.inputs, name) if A.inputs else None
    if not path or not os.path.exists(path):
        return None
    rows, cols = read_table(path, {"query": ["query", "top queries", "queries"], "page": PAGE}, PERF)
    out = []
    for r in rows:
        p, _ = norm_path(r["page"])
        if p:
            out.append((r["query"].strip().lower(), p, num(r.get("clicks")), num(r.get("impressions")), num(r.get("position"))))
    FOUND[name] = {"rows": len(rows), "columns": cols}
    return out

def load_simple(name, page_keys, metric_keys):
    path = os.path.join(A.inputs, name) if A.inputs else None
    if not path or not os.path.exists(path):
        return None
    rows, cols = read_table(path, page_keys, metric_keys)
    FOUND[name] = {"rows": len(rows), "columns": cols}
    return rows

if A.inputs and not os.path.isdir(A.inputs):
    raise SystemExit(f"--inputs {A.inputs} is not a directory")

P_NOW = load_pages("gsc_pages_last_90d.csv")
P_PREV = load_pages("gsc_pages_prev_90d.csv")
P_NONWWW = load_pages("gsc_pages_nonwww_last_90d.csv")
QP_NOW = load_query_page("gsc_query_page_last_90d.csv")
QP_PREV = load_query_page("gsc_query_page_prev_90d.csv")
for q in ("gsc_queries_last_90d.csv", "gsc_queries_prev_90d.csv"):
    load_simple(q, {"query": ["query", "top queries", "queries"]}, PERF)

INDEX = None
idx_rows = load_simple("gsc_indexing.csv", {"url": ["url"], "status": ["status"]}, {"reason": ["reason"], "last_crawled": ["last crawled", "last_crawled"]})
if idx_rows is not None:
    INDEX = {}
    for r in idx_rows:
        p, _ = norm_path(r["url"])
        if p:
            INDEX[p] = (r["status"].strip(), r.get("reason", "").strip())
idx_dir = os.path.join(A.inputs, "gsc_indexing") if A.inputs else None
if idx_dir and os.path.isdir(idx_dir):
    INDEX = INDEX or {}
    for f in sorted(glob.glob(os.path.join(idx_dir, "*.csv"))):
        reason = os.path.splitext(os.path.basename(f))[0].replace("_", " ")
        rows, _ = read_table(f, {"url": ["url"]}, {"last_crawled": ["last crawled"]})
        for r in rows:
            p, _ = norm_path(r["url"])
            if p:
                INDEX[p] = ("Indexed" if reason.lower() == "indexed" else "Not indexed", "" if reason.lower() == "indexed" else reason)
        FOUND[f"gsc_indexing/{os.path.basename(f)}"] = {"rows": len(rows)}

LINKS = None
lk = load_simple("gsc_links_top_pages.csv", {"page": ["top target pages", "target page", "top linked pages", "page", "url"]},
                 {"links": ["incoming links", "links", "external links"], "sites": ["linking sites", "sites"]})
if lk is not None:
    LINKS = collections.Counter()
    for r in lk:
        p, _ = norm_path(r["page"])
        if p:
            LINKS[p] += num(r.get("links")) or num(r.get("sites"))

ADS = None
ad = load_simple("ads_landing_pages_last_90d.csv", {"page": ["landing page", "expanded landing page", "final url", "final url*", "url"]},
                 {"clicks": ["clicks"], "impressions": ["impr.", "impressions"], "conversions": ["conversions", "conv."]})
if ad is not None:
    ADS = collections.Counter()
    for r in ad:
        p, _ = norm_path(r["page"])
        if p:
            ADS[p] += num(r.get("clicks"))

CONV = None
cv = load_simple("conversions_by_landing_page_last_90d.csv", {"page": ["landing page", "landing page + query string", "page", "url"]},
                 {"conversions": ["conversions", "key events", "leads", "calls"]})
if cv is not None:
    CONV = collections.Counter()
    for r in cv:
        p, _ = norm_path(r["page"])
        if p:
            CONV[p] += num(r.get("conversions"))

HAVE_GSC = P_NOW is not None and P_PREV is not None
HAVE_ADS = ADS is not None
for name, d in FOUND.items():
    if d.get("other_sites"):
        WARN.append(f"{name}: {d['other_sites']} rows for other sites were ignored.")
unknown = set()
for agg in (P_NOW or {}, P_PREV or {}):
    unknown |= set(agg) - set(BY)
if unknown:
    WARN.append(f"{len(unknown)} GSC page paths are not current site URLs (old or redirected URLs), e.g. {sorted(unknown)[:8]}. They are listed in PHASE_2_3_DATA_STATUS.md.")

# ---------------------------------------------------------------- query overlap
def overlap(qp):
    byq = collections.defaultdict(list)
    for q, p, c, i, pos in qp:
        if i > 0:
            byq[q].append((p, c, i, pos))
    return byq

OV_NOW = overlap(QP_NOW) if QP_NOW is not None else None
page_q = collections.defaultdict(lambda: [0, 0, None, 0.0])  # queries, shared, top query, top impressions
if OV_NOW is not None:
    for q, lst in OV_NOW.items():
        for p, c, i, pos in lst:
            s = page_q[p]
            s[0] += 1
            s[1] += len(lst) > 1
            if i > s[3]:
                s[2], s[3] = q, i

# ---------------------------------------------------------------- rules
# Tier 1: Yorba Linda, the Phase 2.2 priority cities and cities with hand-written pages.
# Tier 2: every other city with pages. The owner confirmed Ventura County and Santa Barbara
# County are served (2026-10-18), so there is no out-of-area tier.
TIER1 = {"yorba-linda", "anaheim", "brea", "placentia", "fullerton", "irvine", "orange"}
COUNTY_NAME = {"orange-county": "Orange County", "los-angeles-county": "Los Angeles County", "riverside-county": "Riverside County",
               "san-bernardino-county": "San Bernardino County", "ventura-county": "Ventura County", "santa-barbara-county": "Santa Barbara County"}

def tier(m):
    return 1 if m["city"] in TIER1 else 2

SERVICE_LABEL = {"ac-repair": "AC repair", "emergency-ac-repair": "emergency AC repair", "ac-tune-up": "AC tune-up",
                 "heating-repair": "heating repair", "hvac-repair": "HVAC repair", "hvac-service": "HVAC service"}

def city_name(m):
    t = m["h1"] or m["title"]
    for pre in ("AC Repair & HVAC Service in ", "HVAC Service in ", "AC Repair in ", "AC Tune-Up in ", "Local HVAC Repair in ",
                "AC & Heating Repair in ", "AC Broke Down in "):
        if t.startswith(pre):
            return t[len(pre):].split(",")[0].split(" — ")[0].split("?")[0].strip()
    return m["city"].replace("-", " ").title()

def hub_of(city):
    return next((p for p, m in BY.items() if m["family"] == "city_hub" and m["city"] == city), None)

# (target keyword, intent, current action, candidate action, candidate destination, priority, risk, reasoning)
FIXED = {
    "/": ("HVAC company Yorba Linda / HVAC service Yorba Linda", "Commercial-local (brand + city)", "KEEP", "", "", 3, "High",
          "Strongest page on the site (89 contextual links). Its title targets 'AC Repair Yorba Linda', the same keyword as /air-conditioning/ac-repair/yorba-linda. Text overlap with that page is 4%, so this is a title-level overlap, not duplicate content. Do not retitle until GSC query + page data shows which of the two Google ranks for 'ac repair yorba linda' (section 3.1)."),
    "/contact": ("contact HVAC Service & AC Repair", "Navigational / conversion", "KEEP", "", "", 0, "High", "Conversion page. Distinct content."),
    "/about-us": ("HVAC company Yorba Linda (about)", "Navigational / trust", "KEEP", "", "", 0, "Low", "Distinct trust page."),
    "/reviews": ("HVAC Service & AC Repair reviews", "Navigational / trust", "KEEP", "", "", 0, "Low", "Rebuilt in Phase 2.1. Thin (235 words) by design until verified reviews are supplied."),
    "/financing": ("HVAC financing Orange County", "Commercial", "KEEP", "", "", 0, "Low", "Distinct intent."),
    "/promotions": ("HVAC specials Orange County", "Commercial", "KEEP", "", "", 0, "Low", "Distinct intent."),
    "/maintenance-plans": ("HVAC maintenance plan Orange County", "Commercial", "KEEP", "", "", 2, "Medium",
                           "Strongest page for the maintenance-plan cluster (covers residential and commercial). Would receive the residential plan page if that merge is ever approved."),
    "/careers": ("HVAC jobs Yorba Linda", "Navigational (jobs)", "KEEP", "", "", 0, "Low", "Distinct intent."),
    "/privacy-policy": ("(legal)", "Legal", "KEEP", "", "", 0, "Low", "Indexable, not in the sitemap. Harmless; no action needed."),
    "/terms": ("(legal)", "Legal", "KEEP", "", "", 0, "Low", "Indexable, not in the sitemap. Harmless; no action needed."),
    "/sms-compliance": ("(legal / A2P 10DLC)", "Legal", "KEEP", "", "", 0, "Low", "Must stay publicly reachable for Twilio A2P 10DLC review. Indexable, not in the sitemap; no action needed."),
    "/services": ("HVAC services Orange County", "Navigational hub", "KEEP", "", "", 0, "Low", "Already noindex, follow and out of the sitemap. Leave as is."),
    "/thank-you": ("(conversion confirmation)", "Conversion", "KEEP", "", "", 0, "Low", "Already noindex, nofollow and out of the sitemap. Leave as is; conversion tracking depends on it."),
    "/air-conditioning": ("air conditioning services Orange County", "Commercial (service hub)", "KEEP", "", "", 2, "Low",
                          "Silo hub. Strongest page for 'AC services'."),
    "/air-conditioning/ac-services": ("AC services Yorba Linda", "Commercial (service hub)", "KEEP", "MERGE+301", "/air-conditioning", 2, "Medium",
                                      "Same intent as /air-conditioning (both list repair, installation, maintenance and ductless; 19% shared text, identical page structure). Two hubs split one topic; /air-conditioning is the silo root with more links."),
    "/air-conditioning/ac-repair": ("AC repair Orange County", "Commercial", "KEEP", "", "", 3, "Medium",
                                    "Strongest page for generic 'AC repair' (1,388 words). Title says 'Southern California'; consider 'Orange County' after GSC review. /orange-county-ac-repair (Ads) targets the same phrase."),
    "/air-conditioning/ac-installation": ("AC installation Orange County", "Commercial", "KEEP", "", "", 3, "Medium",
                                          "Strongest page for installation and replacement (977 words; its H2s already cover replacement)."),
    "/air-conditioning/ac-replacement": ("AC replacement Orange County", "Commercial", "KEEP", "MERGE+301", "/air-conditioning/ac-installation", 2, "Medium",
                                         "Same intent as /air-conditioning/ac-installation, whose title is 'AC Installation & Replacement' and whose H2s include 'When Does Replacement Make Sense?' and 'Common Questions About AC Replacement'. Weaker page (542 words)."),
    "/air-conditioning/ac-maintenance": ("AC maintenance Orange County", "Commercial", "KEEP", "MERGE+301", "/air-conditioning/ac-tune-up", 2, "Medium",
                                         "Same intent as /air-conditioning/ac-tune-up: its own CTA heading is 'Book Your AC Tune-Up Before Summer Hits' and its description says 'maintenance and tune-up'. The tune-up page is the parent of 37 city pages and carries the Phase 2.2 city links. Swap the direction if GSC shows 'ac maintenance' earns more impressions here."),
    "/air-conditioning/ac-tune-up": ("AC tune-up Orange County", "Commercial", "KEEP", "", "", 3, "Medium", "Strongest page for the tune-up/maintenance cluster. Phase 2.2 city links live here."),
    "/air-conditioning/emergency-ac-repair": ("emergency AC repair Orange County", "Commercial (urgent)", "KEEP", "", "", 3, "Medium", "Strongest page for generic emergency AC repair. Phase 2.2 city links live here."),
    "/emergency-hvac-service": ("emergency HVAC service", "Commercial (urgent)", "KEEP", "", "", 2, "Low",
                                "Broader intent (heating and cooling emergencies) than /air-conditioning/emergency-ac-repair; text overlap under 4%. Keep both and cross-link."),
    "/ac-not-cooling": ("AC running but not cooling", "Informational / problem", "KEEP", "", "", 1, "Low", "Problem-intent page; distinct from repair pages (6% overlap with /air-conditioning/ac-repair)."),
    "/ductless/ductless-mini-split": ("ductless mini split Orange County", "Commercial", "IMPROVE", "", "", 1, "Low",
                                      "Title 'Ductless Mini-Split Installation & Repair' competes with /ductless/mini-split-installation for 'mini split installation'. Retitle as the ductless hub (repair and service) and leave installation to the sub-page."),
    "/ductless/mini-split-installation": ("mini split installation Orange County", "Commercial", "KEEP", "", "", 1, "Low", "Strongest page for 'mini split installation'."),
    "/heat-pumps": ("heat pump services Orange County", "Commercial (service hub)", "KEEP", "", "", 0, "Low", "Silo hub; sub-pages have distinct intents."),
    "/heat-pumps/heat-pump-repair": ("heat pump repair", "Commercial", "KEEP", "", "", 0, "Low", "Distinct intent."),
    "/heat-pumps/heat-pump-installation": ("heat pump installation", "Commercial", "KEEP", "", "", 0, "Low", "Distinct intent."),
    "/heating": ("heating repair / heating services Orange County", "Commercial (service hub)", "KEEP", "", "", 2, "Low",
                 "Strongest page for generic heating repair; /heating/heating-repair already 308s here."),
    "/heating/furnace-repair": ("furnace repair Orange County", "Commercial", "KEEP", "", "", 1, "Low", "Distinct (furnace) intent. Title also says 'Same-Day Heating Repair'; fine while /heating owns heating repair."),
    "/heating/furnace-installation": ("furnace installation", "Commercial", "KEEP", "", "", 0, "Low", "Distinct intent."),
    "/heating/furnace-maintenance": ("furnace maintenance", "Commercial", "KEEP", "", "", 0, "Low", "Distinct (seasonal heating) intent."),
    "/commercial-hvac": ("commercial HVAC Orange County", "Commercial (B2B)", "KEEP", "", "", 0, "Low", "Distinct B2B intent."),
    "/commercial-hvac/commercial-maintenance-plan": ("commercial HVAC maintenance plan", "Commercial (B2B)", "KEEP", "", "", 0, "Low", "B2B intent differs from residential plans."),
    "/air-duct-services": ("air duct services", "Commercial (service hub)", "KEEP", "", "", 0, "Low", "Silo hub."),
    "/air-duct-services/air-duct-cleaning": ("air duct cleaning Orange County", "Commercial", "KEEP", "", "", 0, "Low", "Distinct intent."),
    "/maintenance/residential-maintenance-plan": ("residential HVAC maintenance plan", "Commercial", "KEEP", "MERGE+301", "/maintenance-plans", 1, "Low",
                                                  "/maintenance-plans already covers the residential plan (H2 'Residential Maintenance Plan', a residential vs. commercial comparison and an FAQ). Two pages, one intent."),
    "/service-areas": ("HVAC service areas Southern California", "Navigational hub", "KEEP", "", "", 0, "Low", "Location index."),
    "/blog": ("HVAC tips", "Informational hub", "KEEP", "", "", 0, "Low", "Blog index."),
}
for p, m in BY.items():
    if m["family"] == "blog_post":
        FIXED[p] = (m["h1"].lower(), "Informational", "KEEP", "", "", 0, "Low",
                    f"Unique article ({round(m['unique_share'] * 100)}% unique sentences). No overlapping page competes for the same question; cross-link with the matching calculator or service page.")
    if m["family"] == "calculator":
        FIXED[p] = ((m["h1"] or "HVAC calculators").lower(), "Informational / tool", "KEEP", "", "", 0, "Low", "Interactive tool; unique content.")

def decide(m):
    p, fam, svc = m["path"], m["family"], m["service"]
    if p in FIXED:
        return FIXED[p]
    t = tier(m)
    city = city_name(m)
    hub = hub_of(m["city"])
    if fam == "ads_generated":
        twin = f"/air-conditioning/ac-repair/{m['city']}" in BY
        why = (f"Generated Google Ads landing page ({round(m['norm_sim'] * 100)}% identical to its nearest sibling once the city name is removed; 0 unique sentences; 0 internal links). "
               + (f"Competes for 'AC repair {city}' with the organic page /air-conditioning/ac-repair/{m['city']}. " if twin else
                  f"No organic page exists for {city}; this page is the site's only page for the city. ")
               + "PROTECTED until its active campaign use (Google Ads landing-page report) and its organic performance (GSC) are verified. "
                 "If a noindex is ever approved, the page stays live and unchanged for Ads; it is never redirected.")
        return (f"AC repair {city}", "Commercial-local (paid)", "KEEP", "NOINDEX", "", 2 if twin else 1, "Medium", why)
    if fam == "ads_handwritten":
        if p == "/orange-county-ac-repair":
            why = ("Hand-written Google Ads landing page (46% unique sentences). Protected: keep live, unchanged and indexable. Shares the 'AC repair Orange County' target with /air-conditioning/ac-repair and /service-areas/orange-county; "
                   "text overlap with both is under 4%, so this is a title-level overlap only. Decide the owner of the phrase with GSC.")
        elif hub is not None:
            why = (f"Hand-written Google Ads landing page ({round(m['unique_share'] * 100)}% unique sentences). Protected: keep live, unchanged and indexable. "
                   "Overlaps /air-conditioning/ac-repair/laguna-niguel (template) for 'AC repair Laguna Niguel'; this page has the stronger content, so let GSC decide which one Google should rank before changing either.")
        else:
            why = (f"Hand-written Google Ads landing page ({round(m['unique_share'] * 100)}% unique sentences). Protected: keep live, unchanged and indexable. "
                   "No organic page targets this city, so there is no overlap to resolve.")
        return (f"AC repair {city}", "Commercial-local (paid)", "KEEP", "", "", 1, "High", why)
    if fam == "county_hub":
        oc = m["city"] == "orange-county"
        return (f"HVAC service {city}", "Commercial-local", "KEEP" if oc else "IMPROVE", "", "", 2 if oc else 1, "Low",
                f"County hub, distinct from other pages (nearest page {round(m['raw_sim'] * 100)}% similar)."
                + (" Strongest page for 'HVAC service Orange County'." if oc else " Thin (about 310 words); add owner-verified county detail."))
    if fam == "city_hub":
        return (f"HVAC service {city} / HVAC repair {city}", "Commercial-local", "IMPROVE", "", "", 3 if t == 1 else 2, "Low",
                f"The one page per city with its own facts and FAQs ({round(m['unique_share'] * 100)}% unique sentences, 0% reused FAQs). Text overlap with the city's service pages is 2 to 3%. "
                f"Strongest page for 'HVAC service {city}'. Thin ({m['words']} words): add owner-verified local detail.")
    if fam == "city_service":
        kw = f"{SERVICE_LABEL[svc]} {city}"
        intent = "Commercial-local (urgent)" if svc == "emergency-ac-repair" else "Commercial-local"
        base = (f"{round(m['norm_sim'] * 100)}% identical to {m['norm_nearest']} once the city name is removed; "
                f"{round(m['unique_share'] * 100)}% unique sentences, {round(m['template_share'] * 100)}% template sentences.")
        if svc == "hvac-repair":
            if m["city"] == "yorba-linda":
                return (kw, intent, "KEEP", "", "", 2, "Medium",
                        f"Only page targeting 'HVAC repair Yorba Linda' and it carries some unique copy ({base}) Title-level overlap with the Yorba Linda hub ('HVAC Service in Yorba Linda'); revisit with GSC.")
            return (kw, intent, "KEEP", "MERGE+301", hub, 2, "Medium",
                    f"Title-level overlap with the city hub: 'Local HVAC Repair in {city}' and 'HVAC Service in {city}' answer the same search, and the hub is the page with real local content. {base} "
                    "Candidate: merge into the hub and add 'HVAC Repair' to the hub title.")
        if not m["cluster"]:
            return (kw, intent, "KEEP", "", "", 3 if m["city"] == "yorba-linda" else 2, "High" if m["city"] == "yorba-linda" else "Medium",
                    f"Hand-written or partly unique page. {base} Strongest page for '{kw}'.")
        if t == 1 or svc in ("ac-repair", "emergency-ac-repair"):
            return (kw, intent, "IMPROVE", "", "", 2 if t == 1 else 1, "Medium",
                    f"{'Tier 1 city' if t == 1 else 'Core commercial intent in the confirmed service area'}, generated copy. {base} "
                    "Keep indexed and add owner-verified local substance (real jobs, housing stock, response times); do not just reword the template.")
        dest = "/air-conditioning/ac-tune-up" if svc == "ac-tune-up" else "/heating"
        return (kw, intent, "KEEP", "MERGE+301", dest, 1, "Medium",
                f"Generated city-swap page for a secondary service. {base} The city copy adds nothing the generic page lacks. "
                f"Candidate: merge into {dest}. This is a content reason, not a geographic one.")
    return ("", "", "KEEP", "", "", 0, "Low", "No rule matched; review manually.")

def status(m, cand):
    """Gate G1 and the owner's protections. Returns (status, current_action override or None, note)."""
    p = m["path"]
    if not cand:
        return "No consolidation proposed", None, ""
    ads_page = m["family"] == "ads_generated"
    missing = []
    if not HAVE_GSC:
        missing.append("GSC page performance (both 90-day periods)")
    if LINKS is None:
        missing.append("GSC external links")
    if ads_page and not HAVE_ADS:
        missing.append("Google Ads landing-page report")
    if missing:
        label = "PROTECTED" if ads_page else "PAUSED"
        return f"{label}: awaiting " + "; ".join(missing), None, ""
    now, prev = P_NOW.get(p, {}), P_PREV.get(p, {})
    reasons = []
    if now.get("clicks", 0) >= 1 or prev.get("clicks", 0) >= 1:
        reasons.append(f"clicks {int(now.get('clicks', 0))}/{int(prev.get('clicks', 0))}")
    if now.get("impressions", 0) >= 100 or prev.get("impressions", 0) >= 100:
        reasons.append(f"impressions {int(now.get('impressions', 0))}/{int(prev.get('impressions', 0))}")
    if LINKS.get(p, 0) > 0:
        reasons.append(f"{int(LINKS[p])} external links")
    if CONV is not None and CONV.get(p, 0) > 0:
        reasons.append(f"{int(CONV[p])} conversions")
    if reasons:
        return "WITHDRAWN: " + ", ".join(reasons), "IMPROVE", " Candidate withdrawn by gate G1 (" + ", ".join(reasons) + ")."
    if ads_page and ADS.get(p, 0) > 0:
        return f"PROTECTED: active Ads landing page ({int(ADS[p])} paid clicks); organic noindex only with Ads manager sign-off", None, ""
    if ads_page:
        return "ELIGIBLE FOR REVIEW (needs explicit approval; first confirm it is not the final URL of any enabled ad, since the landing-page report omits ads without impressions)", None, ""
    return "ELIGIBLE FOR REVIEW (needs explicit approval)", None, ""

def fmt(v, digits=0):
    return NA if v is None else (round(v, digits) if digits else int(round(v)))

rows = []
for m in sorted(M, key=lambda m: m["path"]):
    kw, intent, action, cand, dest, pri, risk, why = decide(m)
    st, override, note = status(m, cand)
    if override:
        action = override
    now = P_NOW.get(m["path"], {}) if P_NOW is not None else None
    prev = P_PREV.get(m["path"], {}) if P_PREV is not None else None
    q = page_q.get(m["path"]) if OV_NOW is not None else None
    ads = ("Yes (generated Ads template)" if m["family"] == "ads_generated" else "Yes (hand-written Ads page)" if m["family"] == "ads_handwritten"
           else "No (per repository)")
    rows.append({
        "url": "https://www.hvacserviceacrepair.com" + m["path"],
        "path": m["path"], "in_sitemap": "No" if m["path"] in SITEMAP_EXCLUDED else "Yes",
        "robots_now": NOINDEX_NOW.get(m["path"], "index, follow"), "page_type": m["family"] + (f"/{m['service']}" if m["family"] == "city_service" else ""),
        "city": m["city"] if m["family"] != "county_hub" else "",
        "county": COUNTY_NAME.get(m["county"], m["county"]) or (COUNTY_NAME.get(m["city"], "") if m["family"] == "county_hub" else ""),
        "geo_tier": tier(m) if m["family"] in ("city_service", "city_hub", "ads_generated") and m["city"] else "",
        "target_keyword": kw, "search_intent": intent, "title": m["title"], "h1": m["h1"], "words": m["words"],
        "clicks_90d": NA if now is None else fmt(now.get("clicks", 0.0)),
        "impressions_90d": NA if now is None else fmt(now.get("impressions", 0.0)),
        "avg_position_90d": NA if now is None else (round(now["pos_x_impr"] / now["impressions"], 1) if now.get("impressions") else ""),
        "clicks_prev_90d": NA if prev is None else fmt(prev.get("clicks", 0.0)),
        "impressions_prev_90d": NA if prev is None else fmt(prev.get("impressions", 0.0)),
        "avg_position_prev_90d": NA if prev is None else (round(prev["pos_x_impr"] / prev["impressions"], 1) if prev.get("impressions") else ""),
        "queries_90d": NA if OV_NOW is None else (q[0] if q else 0),
        "queries_shared_with_other_pages_90d": NA if OV_NOW is None else (q[1] if q else 0),
        "top_query_90d": NA if OV_NOW is None else ((q[2] or "") if q else ""),
        "gsc_index_status": NA if INDEX is None else INDEX.get(m["path"], ("Not in export", ""))[0],
        "gsc_index_reason": NA if INDEX is None else INDEX.get(m["path"], ("", ""))[1],
        "external_links": NA if LINKS is None else int(LINKS.get(m["path"], 0)),
        "ads_clicks_90d": NA if ADS is None else int(ADS.get(m["path"], 0)),
        "conversions_90d": NA if CONV is None else fmt(CONV.get(m["path"], 0.0)),
        "similarity_group": m["cluster"] or "unique", "nearest_page": m["norm_nearest"], "nearest_similarity_city_normalized": m["norm_sim"],
        "nearest_similarity_raw": m["raw_sim"], "unique_sentence_share": m["unique_share"], "template_sentence_share": m["template_share"],
        "contextual_inlinks": m["inlinks_contextual"], "paid_ads_use": ads,
        "current_action": action, "candidate_action": cand, "candidate_destination": dest, "candidate_status": st,
        "risk": risk, "priority_score": pri, "reasoning": why + note,
    })

os.makedirs(A.out, exist_ok=True)
with open(os.path.join(A.out, "PHASE_2_3_PAGE_DECISIONS.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0]))
    w.writeheader()
    w.writerows(rows)

with open(os.path.join(A.out, "PHASE_2_3_REDIRECT_CANDIDATES.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["source_path", "destination_path", "status_code", "group", "candidate_status", "reason", "risk", "condition_before_implementing",
                "source_contextual_inlinks", "source_in_sitemap", "source_clicks_90d", "source_impressions_90d", "source_external_links", "follow_up"])
    for r in rows:
        if r["candidate_action"] != "MERGE+301":
            continue
        group = "Service-page consolidation" if r["page_type"] == "service" else "City-page consolidation"
        follow = ("Remove from CITY_SERVICE_MAP so the sitemap and the Phase 2.2 links drop it automatically; add the redirect in next.config.ts; "
                  "move any unique copy into the destination first" if r["page_type"].startswith("city_service") else
                  "Remove from sitemap.ts and from nav/footer/related-service links; carry any unique sections into the destination first")
        w.writerow([r["path"], r["candidate_destination"], 301, group, r["candidate_status"], r["reasoning"].split(". ")[0] + ".", r["risk"],
                    "Gate G1 passed on real GSC data (0 clicks and under 100 impressions in each 90-day period, no external links, no conversions); owner approval",
                    r["contextual_inlinks"], r["in_sitemap"], r["clicks_90d"], r["impressions_90d"], r["external_links"], follow])
    # Hygiene rows from the live probes (audit section 2). Not GSC-dependent, but still proposals: nothing changes without approval.
    for src, dst, group, reason, cond in [
        ("https://hvacserviceacrepair.com/* (apex host)", "https://www.hvacserviceacrepair.com/*", "Host hygiene",
         "The apex host answers with 307 Temporary Redirect (Vercel domain setting, which runs before the 308 rule in next.config.ts); http://apex takes two hops (308 then 307). Switch the Vercel domain redirect to 308 Permanent so Google consolidates the 2025 non-www history on www.",
         "Owner approval; change made in Vercel project settings (Domains), not in code"),
        ("https://hvac-service-ac-repair.vercel.app/*", "https://www.hvacserviceacrepair.com/*", "Host hygiene",
         "The production vercel.app alias serves the full site with 200 and 'index, follow' (canonical tags point to www, which limits the damage). Redirect it to the www domain in Vercel's domain settings.",
         "Owner approval; change made in Vercel project settings, not in code"),
        ("/about/", "/about-us", "Redirect chain", "Two hops today (/about/ 308 /about 308 /about-us). Point straight at the destination.", "Owner approval"),
        ("/hvac-repair/", "/air-conditioning/ac-repair", "Redirect chain", "Two hops today (trailing-slash 308 first). Collapse to one.", "Owner approval"),
        ("/hvac-installation/", "/air-conditioning/ac-installation", "Redirect chain", "Two hops today. Collapse to one.", "Owner approval"),
        ("/hvac-cleaning/", "/air-duct-services/air-duct-cleaning", "Redirect chain", "Two hops today. Collapse to one.", "Owner approval"),
        ("/heating/heating-repair/", "/heating", "Redirect chain", "Two hops today. Collapse to one.", "Owner approval"),
        ("/air-conditioning/ac-repair/la-habra/", "/air-conditioning/ac-repair", "Redirect chain", "Two hops today. Collapse to one.", "Owner approval"),
        ("/faq/", "/#faq", "Redirect chain", "Two hops today (308 then 307). Collapse to one.", "Owner approval"),
    ]:
        w.writerow([src, dst, 308 if group == "Host hygiene" else 301, group, "Awaiting approval (not GSC-dependent)", reason, "Low", cond, "", "No", "", "", "", "Verify with a live trace after deploy"])
    for src in ("/author/parves/", "/author/sammazor1gmail-com/", "/category/blog/", "/category/uncategorized/", "/hello-world/", "/hello-world-2/", "/garage-door-repair-los-angeles/"):
        w.writerow([src, "(none: leave 404)", 404, "Legacy URL", "No action", "Old WordPress URL seen by the Wayback Machine on the apex host (2025); 404 today. Default WordPress author, category or sample pages, plus one unrelated garage-door page. Nothing to consolidate; redirecting them would create soft 404s.",
                    "None", "Revisit only if GSC or a backlink tool shows external links to it", "", "No", "", "", "", ""])

if OV_NOW is not None:
    with open(os.path.join(A.out, "PHASE_2_3_QUERY_OVERLAP.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["query", "pages_with_impressions", "total_impressions", "total_clicks", "top_page", "top_page_impression_share", "pages (path | clicks | impressions | position)"])
        for q, lst in sorted(OV_NOW.items(), key=lambda kv: -sum(x[2] for x in kv[1])):
            if len(lst) < 2:
                continue
            lst.sort(key=lambda x: -x[2])
            tot = sum(x[2] for x in lst)
            w.writerow([q, len(lst), int(tot), int(sum(x[1] for x in lst)), lst[0][0], round(lst[0][2] / tot, 3) if tot else "",
                        " ; ".join(f"{p} | {int(c)} | {int(i)} | {round(pos, 1)}" for p, c, i, pos in lst)])

# Data status report.
cnt = collections.Counter(r["candidate_status"].split(":")[0].split(" (")[0] for r in rows)
act = collections.Counter(r["current_action"] for r in rows)
cand = collections.Counter(r["candidate_action"] for r in rows if r["candidate_action"])
EXPECTED = ["gsc_pages_last_90d.csv", "gsc_pages_prev_90d.csv", "gsc_queries_last_90d.csv", "gsc_queries_prev_90d.csv",
            "gsc_query_page_last_90d.csv", "gsc_query_page_prev_90d.csv", "gsc_indexing.csv or gsc_indexing/", "gsc_links_top_pages.csv",
            "gsc_pages_nonwww_last_90d.csv", "ads_landing_pages_last_90d.csv", "conversions_by_landing_page_last_90d.csv"]
with open(os.path.join(A.out, "PHASE_2_3_DATA_STATUS.md"), "w") as f:
    f.write("# Phase 2.3 data status\n\nGenerated by `scripts/seo-audit/phase23_decide.py`. Input folder: "
            + (f"`{A.inputs}`" if A.inputs else "none") + ".\n\n## Inputs\n\n| File | Status | Rows | Columns matched |\n|---|---|---|---|\n")
    for e in EXPECTED:
        keys = [k for k in FOUND if k == e or (e.startswith("gsc_indexing") and k.startswith("gsc_indexing"))]
        if keys:
            for k in keys:
                f.write(f"| `{k}` | loaded | {FOUND[k]['rows']} | {', '.join(FOUND[k].get('columns', [])) or '-'} |\n")
        else:
            f.write(f"| `{e}` | **missing** | | |\n")
    f.write("\n## Results\n\n| Measure | Count |\n|---|---|\n")
    for k, v in sorted(act.items()):
        f.write(f"| Current action {k} | {v} |\n")
    for k, v in sorted(cand.items()):
        f.write(f"| Candidate {k} (not executed) | {v} |\n")
    for k, v in sorted(cnt.items()):
        f.write(f"| Status: {k} | {v} |\n")
    if P_NOW is not None:
        tot_c = sum(a["clicks"] for a in P_NOW.values())
        tot_i = sum(a["impressions"] for a in P_NOW.values())
        vis = sum(1 for p in BY if P_NOW.get(p, {}).get("impressions", 0) > 0)
        f.write(f"| Site URLs with impressions, last 90 days | {vis} of {len(BY)} |\n| Clicks / impressions, last 90 days | {int(tot_c)} / {int(tot_i)} |\n")
        ap_ = FOUND["gsc_pages_last_90d.csv"]["apex_host"]
        f.write(f"| Rows on the non-www host in the main export | {int(ap_.get('urls', 0))} URLs, {int(ap_.get('clicks', 0))} clicks, {int(ap_.get('impressions', 0))} impressions |\n")
    if P_NONWWW is not None:
        f.write(f"| Non-www property, last 90 days | {sum(1 for a in P_NONWWW.values() if a['impressions'] > 0)} URLs, "
                f"{int(sum(a['clicks'] for a in P_NONWWW.values()))} clicks, {int(sum(a['impressions'] for a in P_NONWWW.values()))} impressions |\n")
    if OV_NOW is not None:
        f.write(f"| Queries with impressions on 2+ site URLs | {sum(1 for l in OV_NOW.values() if len(l) > 1)} |\n")
    f.write("\n## Warnings\n\n" + ("\n".join(f"- {x}" for x in WARN) if WARN else "- none") + "\n")
    if unknown:
        f.write("\n## GSC paths that are not current site URLs\n\n" + "\n".join(f"- `{p}`" for p in sorted(unknown)) + "\n")

print(f"{len(rows)} decisions; current {dict(act)}; candidates {dict(cand)}; status {dict(cnt)}")
for x in WARN:
    print("WARNING:", x)
