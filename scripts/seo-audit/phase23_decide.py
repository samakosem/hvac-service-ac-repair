"""Phase 2.3: page-by-page decisions and redirect candidates (proposals only).

    python3 scripts/seo-audit/phase23_decide.py <metrics.json> <out-dir> [gsc.csv]

Reads the metrics from phase23_analyze.py and applies the rules documented in
PHASE_2_3_CANNIBALIZATION_AUDIT.md section 6. Writes PHASE_2_3_PAGE_DECISIONS.csv
and PHASE_2_3_REDIRECT_CANDIDATES.csv.

Search Console data was not available for this audit, so every GSC column reads
"N/A". When a GSC page export (columns: page, clicks, impressions, position for
the last 90 days, plus prev_clicks, prev_impressions for the 90 days before) is
passed as the third argument, the numbers are filled in and the traffic gate
in rule G1 is applied: a page proposed for MERGE+301 or NOINDEX that has
1+ click or 100+ impressions in either period is downgraded to IMPROVE.
"""
import csv, json, os, sys

METRICS, OUT = sys.argv[1:3]
GSC = {}
if len(sys.argv) > 3:
    for r in csv.DictReader(open(sys.argv[3])):
        GSC[r["page"].replace("https://www.hvacserviceacrepair.com", "").replace("https://hvacserviceacrepair.com", "") or "/"] = r
M = json.load(open(METRICS))
BY = {m["path"]: m for m in M}
SITEMAP_EXCLUDED = {"/privacy-policy", "/services", "/sms-compliance", "/terms", "/thank-you"}
NOINDEX_NOW = {"/services": "noindex, follow", "/thank-you": "noindex, nofollow"}

# Geography tiers (section 4.1). Tier 1: Yorba Linda, the Phase 2.2 priority
# cities and cities with hand-written pages. Tier 3: 80+ miles from Yorba Linda.
TIER1 = {"yorba-linda", "anaheim", "brea", "placentia", "fullerton", "irvine", "orange"}
TIER3_COUNTIES = {"ventura-county", "santa-barbara-county"}

def tier(m):
    if m["city"] in TIER1: return 1
    if m["county"] in TIER3_COUNTIES: return 3
    return 2

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

# ---------- hand-set decisions for non-location pages (section 5) ----------
FIXED = {
    "/": ("HVAC company Yorba Linda / HVAC service Yorba Linda", "Commercial-local (brand + city)", "KEEP", "", 3, "High",
          "Strongest page on the site (89 contextual links). Its title targets 'AC Repair Yorba Linda', the same keyword as /air-conditioning/ac-repair/yorba-linda. Text overlap with that page is 4%, so this is a title-level overlap, not duplicate content. Do not retitle until GSC shows which of the two Google ranks for 'ac repair yorba linda' (section 3.1)."),
    "/contact": ("contact HVAC Service & AC Repair", "Navigational / conversion", "KEEP", "", 0, "High", "Conversion page. Distinct content."),
    "/about-us": ("HVAC company Yorba Linda (about)", "Navigational / trust", "KEEP", "", 0, "Low", "Distinct trust page."),
    "/reviews": ("HVAC Service & AC Repair reviews", "Navigational / trust", "KEEP", "", 0, "Low", "Rebuilt in Phase 2.1. Thin (235 words) by design until verified reviews are supplied."),
    "/financing": ("HVAC financing Orange County", "Commercial", "KEEP", "", 0, "Low", "Distinct intent."),
    "/promotions": ("HVAC specials Orange County", "Commercial", "KEEP", "", 0, "Low", "Distinct intent."),
    "/maintenance-plans": ("HVAC maintenance plan Orange County", "Commercial", "KEEP", "", 2, "Medium",
                           "Strongest page for the maintenance-plan cluster (covers residential and commercial). Receives the residential plan page if merged."),
    "/careers": ("HVAC jobs Yorba Linda", "Navigational (jobs)", "KEEP", "", 0, "Low", "Distinct intent."),
    "/privacy-policy": ("(legal)", "Legal", "KEEP", "", 0, "Low", "Indexable, not in the sitemap. Harmless; no action needed."),
    "/terms": ("(legal)", "Legal", "KEEP", "", 0, "Low", "Indexable, not in the sitemap. Harmless; no action needed."),
    "/sms-compliance": ("(legal / A2P 10DLC)", "Legal", "KEEP", "", 0, "Low", "Must stay publicly reachable for Twilio A2P 10DLC review. Indexable, not in the sitemap; no action needed."),
    "/services": ("HVAC services Orange County", "Navigational hub", "KEEP", "", 0, "Low", "Already noindex, follow and out of the sitemap. Leave as is."),
    "/thank-you": ("(conversion confirmation)", "Conversion", "KEEP", "", 0, "Low", "Already noindex, nofollow and out of the sitemap. Leave as is; conversion tracking depends on it."),
    "/air-conditioning": ("air conditioning services Orange County", "Commercial (service hub)", "KEEP", "", 2, "Low",
                          "Silo hub. Strongest page for 'AC services'; receives /air-conditioning/ac-services if merged."),
    "/air-conditioning/ac-services": ("AC services Yorba Linda", "Commercial (service hub)", "MERGE+301", "/air-conditioning", 2, "Medium",
                                      "Same intent as /air-conditioning (both list repair, installation, maintenance and ductless; 19% shared text, identical page structure). Two hubs split one topic. Keep /air-conditioning, the silo root with more links."),
    "/air-conditioning/ac-repair": ("AC repair Orange County", "Commercial", "KEEP", "", 3, "Medium",
                                    "Strongest page for generic 'AC repair' (1,388 words). Title says 'Southern California'; consider 'Orange County' after GSC review. /orange-county-ac-repair (Ads) targets the same phrase."),
    "/air-conditioning/ac-installation": ("AC installation Orange County", "Commercial", "KEEP", "", 3, "Medium",
                                          "Strongest page for installation and replacement (977 words; its H2s already cover replacement). Receives /air-conditioning/ac-replacement if merged."),
    "/air-conditioning/ac-replacement": ("AC replacement Orange County", "Commercial", "MERGE+301", "/air-conditioning/ac-installation", 2, "Medium",
                                         "Same intent as /air-conditioning/ac-installation, whose title is 'AC Installation & Replacement' and whose H2s include 'When Does Replacement Make Sense?' and 'Common Questions About AC Replacement'. Weaker page (542 words)."),
    "/air-conditioning/ac-maintenance": ("AC maintenance Orange County", "Commercial", "MERGE+301", "/air-conditioning/ac-tune-up", 2, "Medium",
                                         "Same intent as /air-conditioning/ac-tune-up: its own CTA heading is 'Book Your AC Tune-Up Before Summer Hits' and its description says 'maintenance and tune-up'. The tune-up page is the parent of 37 city pages and carries the Phase 2.2 city links. Swap the direction if GSC shows 'ac maintenance' earns more impressions here."),
    "/air-conditioning/ac-tune-up": ("AC tune-up Orange County", "Commercial", "KEEP", "", 3, "Medium", "Strongest page for the tune-up/maintenance cluster. Phase 2.2 city links live here."),
    "/air-conditioning/emergency-ac-repair": ("emergency AC repair Orange County", "Commercial (urgent)", "KEEP", "", 3, "Medium", "Strongest page for generic emergency AC repair. Phase 2.2 city links live here."),
    "/emergency-hvac-service": ("emergency HVAC service", "Commercial (urgent)", "KEEP", "", 2, "Low",
                                "Broader intent (heating and cooling emergencies) than /air-conditioning/emergency-ac-repair; text overlap under 4%. Keep both and cross-link."),
    "/ac-not-cooling": ("AC running but not cooling", "Informational / problem", "KEEP", "", 1, "Low", "Problem-intent page; distinct from repair pages (6% overlap with /air-conditioning/ac-repair)."),
    "/ductless/ductless-mini-split": ("ductless mini split Orange County", "Commercial", "IMPROVE", "", 1, "Low",
                                      "Title 'Ductless Mini-Split Installation & Repair' competes with /ductless/mini-split-installation for 'mini split installation'. Retitle as the ductless hub (repair and service) and leave installation to the sub-page."),
    "/ductless/mini-split-installation": ("mini split installation Orange County", "Commercial", "KEEP", "", 1, "Low", "Strongest page for 'mini split installation'."),
    "/heat-pumps": ("heat pump services Orange County", "Commercial (service hub)", "KEEP", "", 0, "Low", "Silo hub; sub-pages have distinct intents."),
    "/heat-pumps/heat-pump-repair": ("heat pump repair", "Commercial", "KEEP", "", 0, "Low", "Distinct intent."),
    "/heat-pumps/heat-pump-installation": ("heat pump installation", "Commercial", "KEEP", "", 0, "Low", "Distinct intent."),
    "/heating": ("heating repair / heating services Orange County", "Commercial (service hub)", "KEEP", "", 2, "Low",
                 "Strongest page for generic heating repair; /heating/heating-repair already 308s here. Receives the Tier 2 and 3 heating-repair city pages if merged."),
    "/heating/furnace-repair": ("furnace repair Orange County", "Commercial", "KEEP", "", 1, "Low", "Distinct (furnace) intent. Title also says 'Same-Day Heating Repair'; fine while /heating owns heating repair."),
    "/heating/furnace-installation": ("furnace installation", "Commercial", "KEEP", "", 0, "Low", "Distinct intent."),
    "/heating/furnace-maintenance": ("furnace maintenance", "Commercial", "KEEP", "", 0, "Low", "Distinct (seasonal heating) intent."),
    "/commercial-hvac": ("commercial HVAC Orange County", "Commercial (B2B)", "KEEP", "", 0, "Low", "Distinct B2B intent."),
    "/commercial-hvac/commercial-maintenance-plan": ("commercial HVAC maintenance plan", "Commercial (B2B)", "KEEP", "", 0, "Low", "B2B intent differs from residential plans."),
    "/air-duct-services": ("air duct services", "Commercial (service hub)", "KEEP", "", 0, "Low", "Silo hub."),
    "/air-duct-services/air-duct-cleaning": ("air duct cleaning Orange County", "Commercial", "KEEP", "", 0, "Low", "Distinct intent."),
    "/maintenance/residential-maintenance-plan": ("residential HVAC maintenance plan", "Commercial", "MERGE+301", "/maintenance-plans", 1, "Low",
                                                  "/maintenance-plans already covers the residential plan (H2 'Residential Maintenance Plan', a residential vs. commercial comparison and an FAQ). Two pages, one intent."),
    "/service-areas": ("HVAC service areas Southern California", "Navigational hub", "KEEP", "", 0, "Low", "Location index."),
    "/blog": ("HVAC tips", "Informational hub", "KEEP", "", 0, "Low", "Blog index."),
}
for p, m in BY.items():
    if m["family"] == "blog_post":
        FIXED[p] = (m["h1"].lower(), "Informational", "KEEP", "", 0, "Low",
                    f"Unique article ({round(m['unique_share'] * 100)}% unique sentences). No overlapping page competes for the same question; cross-link with the matching calculator or service page.")
    if m["family"] == "calculator":
        FIXED[p] = ((m["h1"] or "HVAC calculators").lower(), "Informational / tool", "KEEP", "", 0, "Low", "Interactive tool; unique content.")

def decide(m):
    p, fam, svc = m["path"], m["family"], m["service"]
    if p in FIXED:
        kw, intent, action, dest, pri, risk, why = FIXED[p]
        return kw, intent, action, dest, pri, risk, why, ("Yes" if action in ("MERGE+301", "NOINDEX") else "Recommended")
    t = tier(m)
    city = city_name(m)
    hub = hub_of(m["city"])
    if fam == "ads_generated":
        overlap = f"/air-conditioning/ac-repair/{m['city']}" in BY
        why = (f"Google Ads template page ({round(m['norm_sim'] * 100)}% identical to its nearest sibling once the city name is removed; 0 unique sentences; 0 internal links). "
               + (f"Competes for 'AC repair {city}' with the organic page /air-conditioning/ac-repair/{m['city']}, which has internal links. " if overlap else
                  f"No organic page exists for {city}; the template copy is the only content. ")
               + "Keep the page live and unchanged for Ads (a noindex does not affect Ads serving); remove it from the sitemap and noindex it. Never 301: that would break the ad's final URL.")
        return (f"AC repair {city}", "Commercial-local (paid)", "NOINDEX", "", 2 if overlap else 1, "Medium" if overlap else "Medium",
                why, "Yes; plus Google Ads final-URL export")
    if fam == "ads_handwritten":
        hub_overlap = hub is not None
        why = (f"Hand-written Google Ads landing page ({round(m['unique_share'] * 100)}% unique sentences). Protected: keep live, unchanged and indexable. "
               + ("Overlaps /air-conditioning/ac-repair/laguna-niguel (template) for 'AC repair Laguna Niguel'; this page has the stronger content, so let GSC decide which one Google should rank before changing either." if hub_overlap else
                  "No organic page targets this city, so there is no overlap to resolve."))
        if p == "/orange-county-ac-repair":
            why = ("Hand-written Google Ads landing page (46% unique sentences). Protected: keep live, unchanged and indexable. Shares the 'AC repair Orange County' target with /air-conditioning/ac-repair and /service-areas/orange-county; "
                   "text overlap with both is under 4%, so this is a title-level overlap only. Decide the owner of the phrase with GSC.")
        return (f"AC repair {city}", "Commercial-local (paid)", "KEEP", "", 1, "High", why, "Recommended")
    if fam == "county_hub":
        if m["city"] in TIER3_COUNTIES:
            return (f"HVAC service {city}", "Commercial-local", "IMPROVE", "", 1, "Medium",
                    "County hub 80+ miles from Yorba Linda. Keep only if the owner confirms regular service there; otherwise noindex it together with its city pages (section 4.1).", "Owner confirmation")
        return (f"HVAC service {city}", "Commercial-local", "KEEP" if m["city"] == "orange-county" else "IMPROVE", "", 2 if m["city"] == "orange-county" else 1, "Low",
                "County hub, distinct from other pages (nearest page " + str(round(m['raw_sim'] * 100)) + "% similar)." + (" Strongest page for 'HVAC service Orange County'." if m["city"] == "orange-county" else " Thin (about 310 words); add owner-verified county detail."), "Recommended")
    if fam == "city_hub":
        kw = f"HVAC service {city} / HVAC repair {city}"
        why = (f"The one page per city with its own facts and FAQs ({round(m['unique_share'] * 100)}% unique sentences, 0% reused FAQs). Text overlap with the city's service pages is 2 to 3%. "
               f"Strongest page for 'HVAC service {city}'; receives /hvac-repair/{m['city']} if merged. Thin ({m['words']} words): add owner-verified local detail.")
        if t == 3:
            why += " Tier 3 (80+ miles): keep only if the owner confirms regular service there; otherwise NOINDEX."
            return (kw, "Commercial-local", "IMPROVE", "", 1, "Medium", why, "Owner confirmation")
        return (kw, "Commercial-local", "IMPROVE", "", 3 if t == 1 else 2, "Low", why, "Recommended")
    if fam == "city_service":
        label = SERVICE_LABEL[svc]
        kw = f"{label} {city}"
        intent = "Commercial-local (urgent)" if svc == "emergency-ac-repair" else "Commercial-local"
        hand = not m["cluster"]
        base = (f"{round(m['norm_sim'] * 100)}% identical to {m['norm_nearest']} once the city name is removed; "
                f"{round(m['unique_share'] * 100)}% unique sentences, {round(m['template_share'] * 100)}% template sentences.")
        if svc == "hvac-repair":
            if m["city"] == "yorba-linda":
                return (kw, intent, "KEEP", "", 2, "Medium",
                        f"Only page targeting 'HVAC repair Yorba Linda' and it carries some unique copy ({base}) Title-level overlap with the Yorba Linda hub ('HVAC Service in Yorba Linda'); revisit with GSC before merging.", "Recommended")
            return (kw, intent, "MERGE+301", hub, 2 if t < 3 else 1, "Medium",
                    f"Cannibalizes the city hub: 'Local HVAC Repair in {city}' and 'HVAC Service in {city}' answer the same search, and the hub is the page with real local content. {base} "
                    "Merge into the hub and add 'HVAC Repair' to the hub title.", "Yes")
        if hand or t == 1:
            if hand:
                return (kw, intent, "KEEP", "", 3 if m["city"] == "yorba-linda" else 2, "High" if m["city"] == "yorba-linda" else "Medium",
                        f"Hand-written or partly unique page for a Tier 1 city. {base} Strongest page for '{kw}'.", "Recommended")
            return (kw, intent, "IMPROVE", "", 2, "Medium",
                    f"Tier 1 city but generated copy. {base} Keep indexed and add owner-verified local substance (real jobs, housing stock, response times); do not just reword the template.", "Recommended")
        if svc in ("ac-repair", "emergency-ac-repair"):
            if t == 3:
                return (kw, intent, "NOINDEX", "", 1, "Medium",
                        f"Tier 3 city (80+ miles from Yorba Linda) with template copy. {base} Keep the page live for internal navigation if the owner confirms service; otherwise merge into the city hub.", "Yes; plus owner confirmation")
            return (kw, intent, "IMPROVE", "", 1, "Medium",
                    f"Core commercial intent in the service area, generated copy. {base} Keep indexed while adding owner-verified local substance; if that is not possible within the next content cycle, NOINDEX.", "Recommended")
        # tune-up and heating repair in Tier 2 and 3
        dest = "/air-conditioning/ac-tune-up" if svc == "ac-tune-up" else "/heating"
        return (kw, intent, "MERGE+301", dest, 1, "Low" if t == 3 else "Medium",
                f"Generated city-swap page for a secondary service. {base} The city copy adds nothing the generic page lacks. Merge into {dest}, which serves the same service across Orange County.", "Yes")
    return ("", "", "KEEP", "", 0, "Low", "No rule matched; review manually.", "Recommended")

rows = []
for m in sorted(M, key=lambda m: m["path"]):
    kw, intent, action, dest, pri, risk, why, gate = decide(m)
    g = GSC.get(m["path"])
    clicks = g["clicks"] if g else "N/A"
    impr = g["impressions"] if g else "N/A"
    if g and action in ("MERGE+301", "NOINDEX") and (float(g.get("clicks") or 0) >= 1 or float(g.get("impressions") or 0) >= 100
                                                     or float(g.get("prev_clicks") or 0) >= 1 or float(g.get("prev_impressions") or 0) >= 100):
        action, dest, why = "IMPROVE", "", why + " Downgraded to IMPROVE by the traffic gate (G1)."
    ads = "Yes (Google Ads template)" if m["family"] == "ads_generated" else "Yes (hand-written Ads page)" if m["family"] == "ads_handwritten" else "No (per repository; confirm with Ads final-URL export)"
    rows.append({
        "url": "https://www.hvacserviceacrepair.com" + (m["path"] if m["path"] != "/" else "/"),
        "path": m["path"], "in_sitemap": "No" if m["path"] in SITEMAP_EXCLUDED else "Yes",
        "robots_now": NOINDEX_NOW.get(m["path"], "index, follow"), "page_type": m["family"] + (f"/{m['service']}" if m["family"] == "city_service" else ""),
        "city": m["city"] if m["family"] not in ("county_hub",) else "", "county": m["county"] or (m["city"] if m["family"] == "county_hub" else ""),
        "geo_tier": tier(m) if m["family"] in ("city_service", "city_hub", "ads_generated") and m["city"] else "",
        "target_keyword": kw, "search_intent": intent, "title": m["title"], "h1": m["h1"], "words": m["words"],
        "clicks_90d": clicks, "impressions_90d": impr, "avg_position_90d": g["position"] if g else "N/A",
        "clicks_prev_90d": g.get("prev_clicks", "N/A") if g else "N/A", "impressions_prev_90d": g.get("prev_impressions", "N/A") if g else "N/A",
        "similarity_group": m["cluster"] or "unique", "nearest_page": m["norm_nearest"], "nearest_similarity_city_normalized": m["norm_sim"],
        "nearest_similarity_raw": m["raw_sim"], "unique_sentence_share": m["unique_share"], "template_sentence_share": m["template_share"],
        "contextual_inlinks": m["inlinks_contextual"], "paid_ads_use": ads,
        "recommended_action": action, "proposed_destination": dest, "gsc_gate": gate, "risk": risk, "priority_score": pri, "reasoning": why,
    })

os.makedirs(OUT, exist_ok=True)
with open(os.path.join(OUT, "PHASE_2_3_PAGE_DECISIONS.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0]))
    w.writeheader()
    w.writerows(rows)

red = [r for r in rows if r["recommended_action"] == "MERGE+301"]
with open(os.path.join(OUT, "PHASE_2_3_REDIRECT_CANDIDATES.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["source_path", "destination_path", "status_code", "wave", "reason", "risk", "condition_before_implementing",
                "source_contextual_inlinks", "source_in_sitemap", "paid_ads_use", "follow_up"])
    for r in red:
        wave = "Wave 2 (service pages)" if r["page_type"] in ("service",) else "Wave 3 (city pages)"
        follow = ("Remove from CITY_SERVICE_MAP so the sitemap and the Phase 2.2 links drop it automatically; add the redirect in next.config.ts; "
                  "move any unique copy into the destination first" if r["page_type"].startswith("city_service") else
                  "Remove from sitemap.ts and from nav/footer/related-service links; carry any unique sections into the destination first")
        w.writerow([r["path"], r["proposed_destination"], 301, wave, r["reasoning"].split(". ")[0] + ".", r["risk"],
                    "GSC: 0 clicks and under 100 impressions in each of the last two 90-day periods; no external backlinks to the source; owner approval",
                    r["contextual_inlinks"], r["in_sitemap"], r["paid_ads_use"], follow])
print(len(rows), "decisions;", len(red), "redirect candidates")
import collections
print(collections.Counter(r["recommended_action"] for r in rows))
