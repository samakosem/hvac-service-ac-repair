# SEO Phase 10: Internal Linking and Content Architecture

Base `main` at `39eab3a`. Reuses Phase 4 (overlap metrics) and Phase 9 (diagnosis).

## Implemented

The furnace and heating section of the 18 generated Orange County hubs now links to `/heating/furnace-repair`, with the anchor "furnace repair guide". Evidence:
- furnace queries in GSC ("furnace repair yorba linda ca" 94 impressions, "furnace repair" 32);
- the guide had few contextual inlinks;
- the hubs already linked `/air-conditioning/ac-repair` and `/heating`.

The three hand-written hubs (Placentia, Costa Mesa, Yorba Linda) already linked all three pages and are unchanged. No link was added outside Orange County or outside the section about furnaces.

## HVAC repair: hub vs `/services`

| | A. Dedicated `/hvac-repair` hub | B. Make `/services` indexable |
|---|---|---|
| Intent | Matches "HVAC repair" (diagnose and repair heating, cooling, ducts) | `/services` is a catalogue of every service, including installation and commercial, so it matches "HVAC services" more than repair |
| Existing content | None. Today `/hvac-repair` 308s to the AC-only repair page | Exists: title "HVAC Services in Orange County, CA \| AC Repair, Heating & More", service cards, `noindex, follow`, linked from every page |
| Internal links | New page; would need links from the AC, furnace, heating and city pages | Already linked sitewide (header and footer) |
| Risks | New URL with no history; removing the redirect needs care (it consolidates old links); must not repeat the AC and furnace guides | Changing noindex is an indexing change; the page competes with the homepage for "HVAC services Orange County" |
| Duplication | Low if it routes to the AC, furnace and heat pump guides | Low |

**Recommendation:** A, a short `/hvac-repair` hub. It explains how to tell an AC, furnace, heat pump or duct problem apart and routes to each guide. Keep the redirect until the page exists, then remove it in the same change. Treat B (making `/services` indexable) as a separate, low-risk decision. Both need owner approval.

## City-service pages (63 Orange County URLs)

Full table: `oc-city-service-decisions.csv` (URL, intent, overlapping URL, unique value, action, risk).

| Family (21 each) | Action | Why |
|---|---|---|
| `/air-conditioning/ac-tune-up/{city}` | Requires GSC evidence, then consolidate into `/air-conditioning/ac-tune-up` | 97% identical; tune-ups aren't location-sensitive |
| `/heating/heating-repair/{city}` | Yorba Linda: **Keep**. Others: requires GSC evidence (improve if they earn heating impressions, else consolidate into the hub) | 98% identical; only Yorba Linda has unique content |
| `/hvac-repair/{city}` | Consolidate into the city hub after a GSC query-to-page check. Yorba Linda: requires GSC evidence | Same intent as the hub; 98% identical |

Nothing is deleted, redirected or noindexed until there is GSC data (pages and query-to-page, 90 days) and owner approval.

## AI search: local evidence

- **Photos:** 65 project JPEGs with no GPS or date data (Phase 6). The best gain is the owner tagging photos with the city and job type, which feeds the empty `OWNER_CONTENT` photo slots on the hubs (Phase 5).
- **Expertise:** the furnace, heating and AC repair guides (Phases 7–8) are the citable technical content; the links added here route hub visitors and crawlers to them.
- **Verified facts already structured:** Yorba Linda base, Orange County coverage, 24/7, the conditional emergency window, and the profile in `sameAs`.
