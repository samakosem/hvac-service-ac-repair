# Phase 2.2: Internal Linking Plan (Orange County city hubs)

Baseline: production commit `02d78a722d6fb82c8f5036ebc7d11ae64c580ca9` (PR #2 merge)
Date: 2026-10-18
Status: **audit and plan only.** Nothing has been implemented, committed or deployed.

## How this was measured

- Local production build of the exact baseline tree (identical to the deployed commit), crawl of all 456 sitemap URLs, every `<a href>` classified by page region: header, footer or main content. "Contextual links" means links inside `<main>`, excluding the site-wide header and footer menus.
- Every proposed destination is a sitemap URL. All 456 returned HTTP 200 locally and on the live domain in the Phase 2.1 production verification (GitHub Actions run 39123256751, 2026-10-18 11:27 UTC).
- No titles, H1s, canonicals, URLs, sitemap, robots, structured data or page copy are changed by this plan. It adds links using existing page names as anchors.

## 1. Findings

### 1.1 Orange County city hubs and service pages

All 21 Orange County hubs exist, and every one has all 5 city service pages (105 pages). The same holds for the other 16 service-area cities in 5 more counties (37 hubs, 185 service pages in total).

**No hub links to any of its own service pages, and no service page links back to its hub or to its sibling services in the same city.**

| Link type | Exists today |
|---|---|
| Hub to its 5 city service pages | 0 of 105 (OC), 0 of 185 (all) |
| City service page to its hub | 0 of 105 (OC), 0 of 185 (all) |
| City service page to the other services in the same city | 0 of 420 (OC) |

What the templates link to today:
- **City hub** (`src/components/location/CityPageTemplate.tsx`): its "What {City} Residents Call Us For" and "All Services Available in {City}" lists point to the *generic* service pages (`/air-conditioning/ac-repair`, `/heating`, ...), and "Nearby Cities We Serve" points to 4 to 5 neighbouring hubs. The hubs are also in the site-wide footer, so each hub has hundreds of footer links but only 2 to 14 contextual ones.
- **City service page** (`src/components/city-service/CityServicePageTemplate.tsx`): its only contextual links are "We Also Serve Nearby Cities" (4 to 5 links to the same service in other cities, anchor = bare city name) plus privacy and terms links in the form. There is **no visible breadcrumb**; the breadcrumb exists only in JSON-LD.

### 1.2 Contextual links per page (Orange County)

Columns: contextual links pointing at the hub / AC repair / emergency AC repair / AC tune-up / heating repair / HVAC repair page for that city.

| City | Hub | Hub links to its service pages | Service pages linking back to hub | Contextual links in: hub / AC repair / Emergency / Tune-up / Heating / HVAC repair | After plan (high priority) |
|---|---|---|---|---|---|
| Aliso Viejo | `/service-areas/orange-county/aliso-viejo` | 0 of 5 | 0 of 5 | 6 / 4 / 5 / 4 / 4 / 4 | 11 / 9 / 10 / 9 / 9 / 9 |
| Anaheim | `/service-areas/orange-county/anaheim` | 0 of 5 | 0 of 5 | 13 / 9 / 9 / 8 / 8 / 8 | 18 / 14 / 14 / 13 / 13 / 13 |
| Anaheim Hills | `/service-areas/orange-county/anaheim-hills` | 0 of 5 | 0 of 5 | 8 / 5 / 6 / 5 / 5 / 5 | 13 / 10 / 11 / 10 / 10 / 10 |
| Brea | `/service-areas/orange-county/brea` | 0 of 5 | 0 of 5 | 11 / 8 / 8 / 7 / 7 / 7 | 16 / 13 / 13 / 12 / 12 / 12 |
| Costa Mesa | `/service-areas/orange-county/costa-mesa` | 0 of 5 | 0 of 5 | 7 / 4 / 5 / 4 / 4 / 4 | 12 / 9 / 10 / 9 / 9 / 9 |
| Fullerton | `/service-areas/orange-county/fullerton` | 0 of 5 | 0 of 5 | 7 / 5 / 5 / 4 / 4 / 4 | 12 / 10 / 10 / 9 / 9 / 9 |
| Garden Grove | `/service-areas/orange-county/garden-grove` | 0 of 5 | 0 of 5 | 4 / 3 / 4 / 2 / 2 / 2 | 9 / 8 / 9 / 7 / 7 / 7 |
| Huntington Beach | `/service-areas/orange-county/huntington-beach` | 0 of 5 | 0 of 5 | 5 / 3 / 4 / 3 / 3 / 3 | 10 / 8 / 9 / 8 / 8 / 8 |
| Irvine | `/service-areas/orange-county/irvine` | 0 of 5 | 0 of 5 | 9 / 6 / 6 / 5 / 5 / 5 | 14 / 11 / 11 / 10 / 10 / 10 |
| Laguna Niguel | `/service-areas/orange-county/laguna-niguel` | 0 of 5 | 0 of 5 | 5 / 4 / 4 / 3 / 3 / 3 | 10 / 9 / 9 / 8 / 8 / 8 |
| Lake Forest | `/service-areas/orange-county/lake-forest` | 0 of 5 | 0 of 5 | 5 / 3 / 4 / 3 / 3 / 3 | 10 / 8 / 9 / 8 / 8 / 8 |
| Mission Viejo | `/service-areas/orange-county/mission-viejo` | 0 of 5 | 0 of 5 | 7 / 6 / 6 / 5 / 5 / 5 | 12 / 11 / 11 / 10 / 10 / 10 |
| Newport Beach | `/service-areas/orange-county/newport-beach` | 0 of 5 | 0 of 5 | 5 / 2 / 4 / 3 / 3 / 3 | 10 / 7 / 9 / 8 / 8 / 8 |
| Orange | `/service-areas/orange-county/orange` | 0 of 5 | 0 of 5 | 10 / 8 / 8 / 7 / 7 / 7 | 15 / 13 / 13 / 12 / 12 / 12 |
| Placentia | `/service-areas/orange-county/placentia` | 0 of 5 | 0 of 5 | 8 / 4 / 4 / 4 / 4 / 4 | 13 / 9 / 9 / 9 / 9 / 9 |
| San Clemente | `/service-areas/orange-county/san-clemente` | 0 of 5 | 0 of 5 | 2 / 0 / 1 / 0 / 0 / 0 | 7 / 5 / 6 / 5 / 5 / 5 |
| Santa Ana | `/service-areas/orange-county/santa-ana` | 0 of 5 | 0 of 5 | 8 / 5 / 6 / 5 / 5 / 5 | 13 / 10 / 11 / 10 / 10 / 10 |
| Tustin | `/service-areas/orange-county/tustin` | 0 of 5 | 0 of 5 | 8 / 6 / 6 / 5 / 5 / 5 | 13 / 11 / 11 / 10 / 10 / 10 |
| Villa Park | `/service-areas/orange-county/villa-park` | 0 of 5 | 0 of 5 | 7 / 3 / 4 / 3 / 3 / 3 | 12 / 8 / 9 / 8 / 8 / 8 |
| Westminster | `/service-areas/orange-county/westminster` | 0 of 5 | 0 of 5 | 4 / 2 / 3 / 2 / 2 / 2 | 9 / 7 / 8 / 7 / 7 / 7 |
| Yorba Linda | `/service-areas/orange-county/yorba-linda` | 0 of 5 | 0 of 5 | 14 / 13 / 11 / 10 / 10 / 10 | 19 / 18 / 16 / 15 / 15 / 15 |

"After plan" assumes only the two high-priority template changes (H1 and H2): each hub gains 5 links (one from each of its service pages) and each service page gains 5 (hub plus 4 siblings).

### 1.3 Orphans and weak pages

| Page(s) | Problem | Fixed by |
|---|---|---|
| `/air-conditioning/ac-repair/san-clemente`, `/air-conditioning/ac-tune-up/san-clemente`, `/heating/heating-repair/san-clemente`, `/hvac-repair/san-clemente` | **Orphans**: no links from any page (no city lists San Clemente as "nearby" in its service pages) | H1 (the San Clemente hub is already linked from the county page and footer) |
| `/air-conditioning/emergency-ac-repair/san-clemente` | 1 contextual link | H1, H2 |
| Garden Grove, Westminster, Newport Beach, Huntington Beach, Lake Forest, Villa Park service pages | 2 to 3 contextual links each | H1, H2 |
| `/air-conditioning/emergency-ac-repair`, `/air-conditioning/ac-tune-up`, `/heating` (service hubs) | Link to **no** city pages, so city emergency, tune-up and heating pages are reachable only from sibling cities | M1 |
| `/about-us`, `/reviews`, `/careers` | 0 contextual links (header/footer only) | O4 (optional) |
| `/laguna-niguel-ac-repair`, `/los-angeles-ac-repair`, `/malibu-ac-repair`, `/orange-county-ac-repair`, `/pasadena-ac-repair`, `/santa-clarita-ac-repair` | Orphans | **Not linked by this plan.** Likely Google Ads destinations; owner to confirm (rule 8) |
| 175 `/ac-repair/[city]` | Orphans by design (Google Ads) | **Not linked** (rule 8) |

### 1.4 Other observations

- Anchors to city service pages are almost all the bare city name ("Yorba Linda": 12 of 13 links to `/air-conditioning/ac-repair/yorba-linda`), which tells search engines little about the destination.
- Hub pages render generic service anchors as "Ac Repair", "Ac Maintenance" (slug title-casing) in their service lists.
- `/emergency-hvac-service` already links all 21 OC emergency pages and `/air-conditioning/ac-repair` links 10 OC AC repair pages; those are working patterns to reuse.

## 2. Proposed structure

One hub per city connects the city's service pages; each service page connects back to its hub and across to the city's other services. Service hubs point to the most important cities rather than repeating every city. Every block is generated by a template from data that already exists, so no page gets hand-written links, and blocks only render links whose destination page exists.

### HIGH PRIORITY

#### H1. City hub to its city service pages

- **Template:** `src/components/location/CityPageTemplate.tsx` (sidebar, as a new card directly above "Nearby Cities We Serve", same card style)
- **Card heading:** "{City} Service Pages" (existing wording style; no new copy beyond the link labels)
- **Links (5 per hub):**

| Anchor text | Destination pattern |
|---|---|
| AC repair in {City} | `/air-conditioning/ac-repair/{city}` |
| Emergency AC repair in {City} | `/air-conditioning/emergency-ac-repair/{city}` |
| AC tune-up in {City} | `/air-conditioning/ac-tune-up/{city}` |
| Heating repair in {City} | `/heating/heating-repair/{city}` |
| HVAC repair in {City} | `/hvac-repair/{city}` |

- **Source pages:** the 21 Orange County hubs (`/service-areas/orange-county/{city}`). The template is shared, so the same card would appear on the 16 other hubs; recommended, because all their destinations exist too. **Pages impacted: 21 (OC only) or 37 (all hubs). New links: 105 or 185.**
- **Data source:** `getCityServicePage(service, citySlug)` from `src/lib/config/city-service-pages.ts`, so a link only renders when the page exists.

#### H2. City service page back to its hub and to sibling services

- **Template:** `src/components/city-service/CityServicePageTemplate.tsx`, inside the existing "We Also Serve Nearby Cities" section (`aria-labelledby="nearby-heading"`), as a second row headed "More HVAC Services in {City}". No new section.
- **Links (5 per page):** 1 to the hub, anchor "All HVAC services in {City}" to `/service-areas/{county}/{city}`; plus the 4 sibling services from the H1 table (current page excluded), same anchors.
- **Source pages:** the 105 Orange County city service pages; template is shared with all 185. **Pages impacted: 105 or 185. New links: 525 or 925.**
- **Effect on page weight:** contextual links on a city service page go from about 9 to about 14.

#### Exact links for the six priority cities

#### Yorba Linda

| Source | Destination | Anchor text |
|---|---|---|
| `/service-areas/orange-county/yorba-linda` | `/air-conditioning/ac-repair/yorba-linda` | AC repair in Yorba Linda |
| `/service-areas/orange-county/yorba-linda` | `/air-conditioning/emergency-ac-repair/yorba-linda` | Emergency AC repair in Yorba Linda |
| `/service-areas/orange-county/yorba-linda` | `/air-conditioning/ac-tune-up/yorba-linda` | AC tune-up in Yorba Linda |
| `/service-areas/orange-county/yorba-linda` | `/heating/heating-repair/yorba-linda` | Heating repair in Yorba Linda |
| `/service-areas/orange-county/yorba-linda` | `/hvac-repair/yorba-linda` | HVAC repair in Yorba Linda |
| `/air-conditioning/ac-repair/yorba-linda` | `/service-areas/orange-county/yorba-linda` | All HVAC services in Yorba Linda |
| `/air-conditioning/emergency-ac-repair/yorba-linda` | `/service-areas/orange-county/yorba-linda` | All HVAC services in Yorba Linda |
| `/air-conditioning/ac-tune-up/yorba-linda` | `/service-areas/orange-county/yorba-linda` | All HVAC services in Yorba Linda |
| `/heating/heating-repair/yorba-linda` | `/service-areas/orange-county/yorba-linda` | All HVAC services in Yorba Linda |
| `/hvac-repair/yorba-linda` | `/service-areas/orange-county/yorba-linda` | All HVAC services in Yorba Linda |

Plus, on each of the 5 service pages, links to the other 4 (same anchors as above). Current nearby-city links on the Yorba Linda hub: Anaheim, Anaheim Hills, Brea, Placentia, Villa Park

#### Anaheim

| Source | Destination | Anchor text |
|---|---|---|
| `/service-areas/orange-county/anaheim` | `/air-conditioning/ac-repair/anaheim` | AC repair in Anaheim |
| `/service-areas/orange-county/anaheim` | `/air-conditioning/emergency-ac-repair/anaheim` | Emergency AC repair in Anaheim |
| `/service-areas/orange-county/anaheim` | `/air-conditioning/ac-tune-up/anaheim` | AC tune-up in Anaheim |
| `/service-areas/orange-county/anaheim` | `/heating/heating-repair/anaheim` | Heating repair in Anaheim |
| `/service-areas/orange-county/anaheim` | `/hvac-repair/anaheim` | HVAC repair in Anaheim |
| `/air-conditioning/ac-repair/anaheim` | `/service-areas/orange-county/anaheim` | All HVAC services in Anaheim |
| `/air-conditioning/emergency-ac-repair/anaheim` | `/service-areas/orange-county/anaheim` | All HVAC services in Anaheim |
| `/air-conditioning/ac-tune-up/anaheim` | `/service-areas/orange-county/anaheim` | All HVAC services in Anaheim |
| `/heating/heating-repair/anaheim` | `/service-areas/orange-county/anaheim` | All HVAC services in Anaheim |
| `/hvac-repair/anaheim` | `/service-areas/orange-county/anaheim` | All HVAC services in Anaheim |

Plus, on each of the 5 service pages, links to the other 4 (same anchors as above). Current nearby-city links on the Anaheim hub: Anaheim Hills, Fullerton, Orange, Placentia, Yorba Linda

#### Brea

| Source | Destination | Anchor text |
|---|---|---|
| `/service-areas/orange-county/brea` | `/air-conditioning/ac-repair/brea` | AC repair in Brea |
| `/service-areas/orange-county/brea` | `/air-conditioning/emergency-ac-repair/brea` | Emergency AC repair in Brea |
| `/service-areas/orange-county/brea` | `/air-conditioning/ac-tune-up/brea` | AC tune-up in Brea |
| `/service-areas/orange-county/brea` | `/heating/heating-repair/brea` | Heating repair in Brea |
| `/service-areas/orange-county/brea` | `/hvac-repair/brea` | HVAC repair in Brea |
| `/air-conditioning/ac-repair/brea` | `/service-areas/orange-county/brea` | All HVAC services in Brea |
| `/air-conditioning/emergency-ac-repair/brea` | `/service-areas/orange-county/brea` | All HVAC services in Brea |
| `/air-conditioning/ac-tune-up/brea` | `/service-areas/orange-county/brea` | All HVAC services in Brea |
| `/heating/heating-repair/brea` | `/service-areas/orange-county/brea` | All HVAC services in Brea |
| `/hvac-repair/brea` | `/service-areas/orange-county/brea` | All HVAC services in Brea |

Plus, on each of the 5 service pages, links to the other 4 (same anchors as above). Current nearby-city links on the Brea hub: Fullerton, Placentia, Yorba Linda

#### Placentia

| Source | Destination | Anchor text |
|---|---|---|
| `/service-areas/orange-county/placentia` | `/air-conditioning/ac-repair/placentia` | AC repair in Placentia |
| `/service-areas/orange-county/placentia` | `/air-conditioning/emergency-ac-repair/placentia` | Emergency AC repair in Placentia |
| `/service-areas/orange-county/placentia` | `/air-conditioning/ac-tune-up/placentia` | AC tune-up in Placentia |
| `/service-areas/orange-county/placentia` | `/heating/heating-repair/placentia` | Heating repair in Placentia |
| `/service-areas/orange-county/placentia` | `/hvac-repair/placentia` | HVAC repair in Placentia |
| `/air-conditioning/ac-repair/placentia` | `/service-areas/orange-county/placentia` | All HVAC services in Placentia |
| `/air-conditioning/emergency-ac-repair/placentia` | `/service-areas/orange-county/placentia` | All HVAC services in Placentia |
| `/air-conditioning/ac-tune-up/placentia` | `/service-areas/orange-county/placentia` | All HVAC services in Placentia |
| `/heating/heating-repair/placentia` | `/service-areas/orange-county/placentia` | All HVAC services in Placentia |
| `/hvac-repair/placentia` | `/service-areas/orange-county/placentia` | All HVAC services in Placentia |

Plus, on each of the 5 service pages, links to the other 4 (same anchors as above). Current nearby-city links on the Placentia hub: Anaheim, Brea, Fullerton, Orange, Yorba Linda

#### Fullerton

| Source | Destination | Anchor text |
|---|---|---|
| `/service-areas/orange-county/fullerton` | `/air-conditioning/ac-repair/fullerton` | AC repair in Fullerton |
| `/service-areas/orange-county/fullerton` | `/air-conditioning/emergency-ac-repair/fullerton` | Emergency AC repair in Fullerton |
| `/service-areas/orange-county/fullerton` | `/air-conditioning/ac-tune-up/fullerton` | AC tune-up in Fullerton |
| `/service-areas/orange-county/fullerton` | `/heating/heating-repair/fullerton` | Heating repair in Fullerton |
| `/service-areas/orange-county/fullerton` | `/hvac-repair/fullerton` | HVAC repair in Fullerton |
| `/air-conditioning/ac-repair/fullerton` | `/service-areas/orange-county/fullerton` | All HVAC services in Fullerton |
| `/air-conditioning/emergency-ac-repair/fullerton` | `/service-areas/orange-county/fullerton` | All HVAC services in Fullerton |
| `/air-conditioning/ac-tune-up/fullerton` | `/service-areas/orange-county/fullerton` | All HVAC services in Fullerton |
| `/heating/heating-repair/fullerton` | `/service-areas/orange-county/fullerton` | All HVAC services in Fullerton |
| `/hvac-repair/fullerton` | `/service-areas/orange-county/fullerton` | All HVAC services in Fullerton |

Plus, on each of the 5 service pages, links to the other 4 (same anchors as above). Current nearby-city links on the Fullerton hub: Anaheim, Brea, Placentia

#### Irvine

| Source | Destination | Anchor text |
|---|---|---|
| `/service-areas/orange-county/irvine` | `/air-conditioning/ac-repair/irvine` | AC repair in Irvine |
| `/service-areas/orange-county/irvine` | `/air-conditioning/emergency-ac-repair/irvine` | Emergency AC repair in Irvine |
| `/service-areas/orange-county/irvine` | `/air-conditioning/ac-tune-up/irvine` | AC tune-up in Irvine |
| `/service-areas/orange-county/irvine` | `/heating/heating-repair/irvine` | Heating repair in Irvine |
| `/service-areas/orange-county/irvine` | `/hvac-repair/irvine` | HVAC repair in Irvine |
| `/air-conditioning/ac-repair/irvine` | `/service-areas/orange-county/irvine` | All HVAC services in Irvine |
| `/air-conditioning/emergency-ac-repair/irvine` | `/service-areas/orange-county/irvine` | All HVAC services in Irvine |
| `/air-conditioning/ac-tune-up/irvine` | `/service-areas/orange-county/irvine` | All HVAC services in Irvine |
| `/heating/heating-repair/irvine` | `/service-areas/orange-county/irvine` | All HVAC services in Irvine |
| `/hvac-repair/irvine` | `/service-areas/orange-county/irvine` | All HVAC services in Irvine |

Plus, on each of the 5 service pages, links to the other 4 (same anchors as above). Current nearby-city links on the Irvine hub: Costa Mesa, Lake Forest, Mission Viejo, Newport Beach, Tustin

The other 15 Orange County cities follow the same pattern; every source and destination URL is listed in the appendix.

### MEDIUM PRIORITY

#### M1. Service hubs to priority city pages

These service hub pages link to no city pages today. Add a short "{Service} in Orange County cities" row, matching the existing city list on `/air-conditioning/ac-repair`, limited to the six priority cities plus one link to the county hub (7 links per page, not 21):

| Source page | Destinations (anchor = city name, as on `/air-conditioning/ac-repair`) |
|---|---|
| `/air-conditioning/emergency-ac-repair` | `/air-conditioning/emergency-ac-repair/{yorba-linda, anaheim, brea, placentia, fullerton, irvine}` + `/service-areas/orange-county` ("All Orange County cities") |
| `/air-conditioning/ac-tune-up` | `/air-conditioning/ac-tune-up/{same six}` + `/service-areas/orange-county` |
| `/heating` | `/heating/heating-repair/{same six}` + `/service-areas/orange-county` |

- **Files:** `src/app/air-conditioning/emergency-ac-repair/page.tsx`, `src/app/air-conditioning/ac-tune-up/page.tsx`, `src/app/heating/page.tsx`.
- **Pages impacted: 3. New links: 21.**
- `/air-conditioning/ac-repair` already lists 10 OC cities (including all six priority cities); no change needed.

### OPTIONAL IMPROVEMENTS

| ID | Change | Template | Pages | Links | Note |
|---|---|---|---|---|---|
| O1 | Visible breadcrumb on city service pages (Home > service hub > {City}), rendered with the existing `Breadcrumbs` component from the same items as the JSON-LD breadcrumb | `CityServicePageTemplate.tsx` | 185 | 370 | Visual addition; JSON-LD unchanged |
| O2 | Descriptive anchors in "We Also Serve Nearby Cities": "AC repair in Placentia" instead of "Placentia" (service name taken from the page) | `CityServicePageTemplate.tsx` | 185 | 0 new (anchor change on ~800 existing links) | Improves relevance; slight risk of looking repetitive next to H2, so do after H2 and review |
| O3 | Fix "Ac Repair" / "Ac Maintenance" casing in hub service lists | `CityPageTemplate.tsx` | 37 | 0 new | Uses existing service names from `src/lib/config/services.ts` |
| O4 | Contextual links to trust pages: homepage "Reviews From Local Homeowners" section to `/reviews` ("Our service standards"); homepage "A Local HVAC Company That Acts Like One" to `/about-us` ("About our team") | `ReviewsSection.tsx`, homepage section | 1 | 2 | Small link labels only |
| O5 | Extend `/air-conditioning/ac-repair` city list from 10 to all 21 OC cities | that page | 1 | 11 | Helps weaker South County pages; longer list |

### Not recommended

- **Links to Google Ads pages** (`/ac-repair/[city]`, `/[city]-ac-repair`): no compelling navigation need; they would compete with the organic city pages. Leave as is unless the owner confirms the six `/[city]-ac-repair` pages are organic pages.
- **Adding San Clemente to neighbours' "nearby" data:** unnecessary once H1 links its service pages from its hub.
- **Every-city lists on every page:** avoided. H1 and H2 add 5 links per page; M1 adds 7 per service hub.

## 3. Impact summary

| Item | Priority | Templates | Pages impacted | New links |
|---|---|---|---|---|
| H1 hub to service pages | High | `CityPageTemplate.tsx` | 21 (OC) / 37 (all) | 105 / 185 |
| H2 service page to hub and siblings | High | `CityServicePageTemplate.tsx` | 105 (OC) / 185 (all) | 525 / 925 |
| M1 service hubs to priority cities | Medium | 3 page files | 3 | 21 |
| O1 to O5 | Optional | as listed | up to 185 | up to 383 |

High priority alone: 2 templates, 206 pages (all hubs and city service pages), 1,110 links; or 126 pages and 630 links if limited to Orange County. Expected result: every Orange County hub and service page gets 5 more contextual links; the 4 San Clemente orphans get 5 each; the weakest pages (2 to 3 links) roughly triple.

## 4. Validation plan for implementation

- TypeScript, ESLint, production build.
- Crawl all 456 sitemap URLs: 456 × 200; titles, H1s, canonicals, robots, JSON-LD, GTM, forms and `tel:` links identical to baseline.
- Link checks: every new link resolves to a sitemap URL returning 200 with no redirect; H1 and H2 counts match section 3; no new links to `/ac-repair/*` or `/[city]-ac-repair`.
- Mobile layout: no horizontal overflow at 320 to 430 px on hub and city service pages.
- Production verification after deploy with the existing workflow.

## Appendix: all Orange County hub to service links (H1)

Anchor text: "AC repair in {City}", "Emergency AC repair in {City}", "AC tune-up in {City}", "Heating repair in {City}", "HVAC repair in {City}". H2 uses the same pairs in reverse (anchor "All HVAC services in {City}") plus sibling links between the five service pages in each row.

| City (source hub) | AC repair | Emergency AC repair | AC tune-up | Heating repair | HVAC repair |
|---|---|---|---|---|---|
| Aliso Viejo<br>`/service-areas/orange-county/aliso-viejo` | `/air-conditioning/ac-repair/aliso-viejo` | `/air-conditioning/emergency-ac-repair/aliso-viejo` | `/air-conditioning/ac-tune-up/aliso-viejo` | `/heating/heating-repair/aliso-viejo` | `/hvac-repair/aliso-viejo` |
| Anaheim<br>`/service-areas/orange-county/anaheim` | `/air-conditioning/ac-repair/anaheim` | `/air-conditioning/emergency-ac-repair/anaheim` | `/air-conditioning/ac-tune-up/anaheim` | `/heating/heating-repair/anaheim` | `/hvac-repair/anaheim` |
| Anaheim Hills<br>`/service-areas/orange-county/anaheim-hills` | `/air-conditioning/ac-repair/anaheim-hills` | `/air-conditioning/emergency-ac-repair/anaheim-hills` | `/air-conditioning/ac-tune-up/anaheim-hills` | `/heating/heating-repair/anaheim-hills` | `/hvac-repair/anaheim-hills` |
| Brea<br>`/service-areas/orange-county/brea` | `/air-conditioning/ac-repair/brea` | `/air-conditioning/emergency-ac-repair/brea` | `/air-conditioning/ac-tune-up/brea` | `/heating/heating-repair/brea` | `/hvac-repair/brea` |
| Costa Mesa<br>`/service-areas/orange-county/costa-mesa` | `/air-conditioning/ac-repair/costa-mesa` | `/air-conditioning/emergency-ac-repair/costa-mesa` | `/air-conditioning/ac-tune-up/costa-mesa` | `/heating/heating-repair/costa-mesa` | `/hvac-repair/costa-mesa` |
| Fullerton<br>`/service-areas/orange-county/fullerton` | `/air-conditioning/ac-repair/fullerton` | `/air-conditioning/emergency-ac-repair/fullerton` | `/air-conditioning/ac-tune-up/fullerton` | `/heating/heating-repair/fullerton` | `/hvac-repair/fullerton` |
| Garden Grove<br>`/service-areas/orange-county/garden-grove` | `/air-conditioning/ac-repair/garden-grove` | `/air-conditioning/emergency-ac-repair/garden-grove` | `/air-conditioning/ac-tune-up/garden-grove` | `/heating/heating-repair/garden-grove` | `/hvac-repair/garden-grove` |
| Huntington Beach<br>`/service-areas/orange-county/huntington-beach` | `/air-conditioning/ac-repair/huntington-beach` | `/air-conditioning/emergency-ac-repair/huntington-beach` | `/air-conditioning/ac-tune-up/huntington-beach` | `/heating/heating-repair/huntington-beach` | `/hvac-repair/huntington-beach` |
| Irvine<br>`/service-areas/orange-county/irvine` | `/air-conditioning/ac-repair/irvine` | `/air-conditioning/emergency-ac-repair/irvine` | `/air-conditioning/ac-tune-up/irvine` | `/heating/heating-repair/irvine` | `/hvac-repair/irvine` |
| Laguna Niguel<br>`/service-areas/orange-county/laguna-niguel` | `/air-conditioning/ac-repair/laguna-niguel` | `/air-conditioning/emergency-ac-repair/laguna-niguel` | `/air-conditioning/ac-tune-up/laguna-niguel` | `/heating/heating-repair/laguna-niguel` | `/hvac-repair/laguna-niguel` |
| Lake Forest<br>`/service-areas/orange-county/lake-forest` | `/air-conditioning/ac-repair/lake-forest` | `/air-conditioning/emergency-ac-repair/lake-forest` | `/air-conditioning/ac-tune-up/lake-forest` | `/heating/heating-repair/lake-forest` | `/hvac-repair/lake-forest` |
| Mission Viejo<br>`/service-areas/orange-county/mission-viejo` | `/air-conditioning/ac-repair/mission-viejo` | `/air-conditioning/emergency-ac-repair/mission-viejo` | `/air-conditioning/ac-tune-up/mission-viejo` | `/heating/heating-repair/mission-viejo` | `/hvac-repair/mission-viejo` |
| Newport Beach<br>`/service-areas/orange-county/newport-beach` | `/air-conditioning/ac-repair/newport-beach` | `/air-conditioning/emergency-ac-repair/newport-beach` | `/air-conditioning/ac-tune-up/newport-beach` | `/heating/heating-repair/newport-beach` | `/hvac-repair/newport-beach` |
| Orange<br>`/service-areas/orange-county/orange` | `/air-conditioning/ac-repair/orange` | `/air-conditioning/emergency-ac-repair/orange` | `/air-conditioning/ac-tune-up/orange` | `/heating/heating-repair/orange` | `/hvac-repair/orange` |
| Placentia<br>`/service-areas/orange-county/placentia` | `/air-conditioning/ac-repair/placentia` | `/air-conditioning/emergency-ac-repair/placentia` | `/air-conditioning/ac-tune-up/placentia` | `/heating/heating-repair/placentia` | `/hvac-repair/placentia` |
| San Clemente<br>`/service-areas/orange-county/san-clemente` | `/air-conditioning/ac-repair/san-clemente` | `/air-conditioning/emergency-ac-repair/san-clemente` | `/air-conditioning/ac-tune-up/san-clemente` | `/heating/heating-repair/san-clemente` | `/hvac-repair/san-clemente` |
| Santa Ana<br>`/service-areas/orange-county/santa-ana` | `/air-conditioning/ac-repair/santa-ana` | `/air-conditioning/emergency-ac-repair/santa-ana` | `/air-conditioning/ac-tune-up/santa-ana` | `/heating/heating-repair/santa-ana` | `/hvac-repair/santa-ana` |
| Tustin<br>`/service-areas/orange-county/tustin` | `/air-conditioning/ac-repair/tustin` | `/air-conditioning/emergency-ac-repair/tustin` | `/air-conditioning/ac-tune-up/tustin` | `/heating/heating-repair/tustin` | `/hvac-repair/tustin` |
| Villa Park<br>`/service-areas/orange-county/villa-park` | `/air-conditioning/ac-repair/villa-park` | `/air-conditioning/emergency-ac-repair/villa-park` | `/air-conditioning/ac-tune-up/villa-park` | `/heating/heating-repair/villa-park` | `/hvac-repair/villa-park` |
| Westminster<br>`/service-areas/orange-county/westminster` | `/air-conditioning/ac-repair/westminster` | `/air-conditioning/emergency-ac-repair/westminster` | `/air-conditioning/ac-tune-up/westminster` | `/heating/heating-repair/westminster` | `/hvac-repair/westminster` |
| Yorba Linda<br>`/service-areas/orange-county/yorba-linda` | `/air-conditioning/ac-repair/yorba-linda` | `/air-conditioning/emergency-ac-repair/yorba-linda` | `/air-conditioning/ac-tune-up/yorba-linda` | `/heating/heating-repair/yorba-linda` | `/hvac-repair/yorba-linda` |

---

## Implementation record (branch `seo/phase-2-2-internal-linking`)

Approved scope: H1 and H2 for all 37 cities, M1. Optional items O1 to O5 not implemented.

| Item | Where | Pages | Links added |
|---|---|---|---|
| H1 | `CityPageTemplate.tsx`: sidebar card "{City} Service Pages" above "Nearby Cities We Serve" | 37 hubs | 185 |
| H2 | `CityServicePageTemplate.tsx`: "Related Pages for {City}" row at the top of the existing nearby-cities section (hub link "{City} service area overview" highlighted, then the 4 sibling services). Wording kept navigational so it makes no coverage claim for cities whose service area is unconfirmed | 185 city service pages | 925 |
| M1 | `ServicePageTemplate.tsx` optional `cityLinks` prop, passed only by `/air-conditioning/emergency-ac-repair`, `/air-conditioning/ac-tune-up` and `/heating`: "… by City" row with the six priority cities plus "All Orange County service areas" | 3 | 21 |
| **Total** | | **225** | **1,131** |

Links are built from existing page data in `src/lib/config/city-service-links.ts` (server-side), so a link only renders when its destination page exists. Every new link is a 44 px tall tap target; the existing nearby-city pills on city service pages were given the same 44 px height so both rows match.

Verification: see the Phase 2.2 report; reproducible with `scripts/seo-audit/compare_internal_links.py <baseline-crawl> <new-crawl>`. Screenshots in `docs/seo-phase-2/screenshots/phase-2-2/`.
