# Phase 2.3 P1: Local SEO Improvement Plan for Three City Hubs

Site: https://www.hvacserviceacrepair.com/
Pages: `/service-areas/orange-county/placentia`, `/service-areas/orange-county/costa-mesa`, `/service-areas/orange-county/yorba-linda`
Audited: 2026-10-19, production = `main` at `a28afa8`
Status: **audit and recommendations only.** No page, title, redirect, canonical, robots rule, sitemap entry or Ads page has been changed. Nothing is merged or deployed. Every recommendation waits for approval.

---

## 1. Evidence used, and its limits

| Source | What it gives | Limits |
|---|---|---|
| GSC (owner-supplied, 2026-07-18 to 2026-10-15, www rows) | Placentia 1,216 impressions, 0 clicks, position 25.8. Costa Mesa 852, 0, 24.3. Yorba Linda 258, 0, 24.8. | **No query data per page.** Which searches these impressions come from is unknown; see section 9. |
| Live HTML (GitHub Actions run 39219265335) and the source (`CityPageTemplate.tsx`, `locations.ts`, `getCityMeta`) | Titles, descriptions, headings, word counts, schema, links, forms | Live HTML matches the local build of `main` exactly (titles, H1, H2, word counts) |
| Local production build at 390 px (Playwright, analytics blocked) | Mobile layout, call-to-action position, tap targets, forms | One viewport; no real-user data |
| Competitor pages: public search results, then one read-only GET per page from the runner | Structure only: title, headings, word count, FAQ schema count, forms | The search tool is not Google; this shows **who has city pages, not who ranks**. Service Champions URLs returned 404, Aire Serv returned 403, One Hour renders with JavaScript (no data). No rankings, volumes or traffic are claimed. |

---

## 2. What the three pages are today

All three are rendered by one template with per-city data from `src/lib/config/locations.ts`.

| | Placentia | Costa Mesa | Yorba Linda |
|---|---|---|---|
| Title (live) | HVAC Service in Placentia, Orange County, CA \| AC Repair & Installation \| HVAC Service & AC Repair | same pattern | same pattern |
| Title length | 98 characters | 99 | 100 |
| Meta description | "AC repair, installation, and HVAC maintenance in {City}, Orange County. Same-day service available. Local HVAC company based in Yorba Linda. Call (714) 410-2784." | same | same |
| Description length | 164 | 165 | 166 |
| H1 | HVAC Service in Placentia, CA | HVAC Service in Costa Mesa, CA | HVAC Service in Yorba Linda, CA |
| H2s | What {City} Residents Call Us For; {City} HVAC Questions; Ready to Schedule HVAC Service in {City}? | same | same |
| Main-content words | 342 | 346 | 352 |
| Unique sentences (Phase 2.3 measure) | 44% | 41% | 42% |
| FAQs | 3 (FAQPage schema) | 3 | 3 |
| Schema | Service (areaServed City), FAQPage, BreadcrumbList, site-wide HVACBusiness | same | same |
| Lead form | **none** | **none** | **none** |
| Phone links | 10 | 10 | 10 |
| Images in main content | 1 (decorative hero) | 1 | 1 |
| Links to the city's 5 service pages (Phase 2.2) | yes, sidebar | yes | yes |

### 2.1 Issues found (evidence in brackets)

| # | Issue | Pages | Evidence |
|---|---|---|---|
| I1 | **Titles are 98 to 100 characters.** Google usually shows about 55 to 60, so the visible part ends around "Orange County, CA \| AC Re…" and repeats "Orange County, CA". | all 3 | live titles |
| I2 | **Meta descriptions are generic** (only the city name changes) and run to 164 to 166 characters, so they get truncated. They also say "Same-day service available", a claim that needs owner confirmation. | all 3 | `getCityMeta()` |
| I3 | **Thin content:** about 345 words. The one public competitor city page measured for Placentia (Dial One Sonshine) has 1,643 words, 6 FAQs in schema, a weather section, a service-area list and a quote form. | all 3 | runner fetch |
| I4 | **No lead form.** Every one of the city's own service pages has 2 forms; the hub has only links to `/contact` and phone links. | all 3 | crawl: forms 0 vs 2 |
| I5 | **"Top services" cards link to the generic Orange County pages**, not to the city's own service pages, and the labels are generated from slugs: "Ac Repair", "Ac Tune Up", "Commercial Hvac". | all 3 | `CityPageTemplate.tsx` label code |
| I6 | **Unverified operational claims on the live pages** (see section 8): response times ("30 to 60 minutes", "dispatch within 1 to 2 hours", "we respond within 1 hour"), parts stocking, brands most common in the city, "one of our most frequently served cities", South Coast Plaza commercial experience, priority scheduling. | all 3 | `locations.ts`, template sidebar |
| I7 | **Em dashes in website copy** (house rule: none). | Placentia (2), Costa Mesa (3), template (2) | `locations.ts` |
| I8 | **Low-contrast hero text on mobile:** the local-context paragraph is small grey text over a busy photo. | all 3 | 390 px screenshot |
| I9 | 25 links in main content are under 44 px tall on mobile (breadcrumbs and the service list). Within guidance for inline text links, but the service list would be easier to tap as larger rows. | all 3 | Playwright measure |

What already works: canonical self-references, a breadcrumb trail, a call button visible without scrolling at 390 px, a sticky call bar, no horizontal overflow, Service and FAQPage schema, and the Phase 2.2 links to the 5 city service pages.

---

## 3. Search intent and overlap with the city's other pages

Each city has 6 to 7 URLs (audit section 3.2). The hub is the only one with real local content; the city service pages are 94 to 96% template copy, except the hand-written Yorba Linda ones.

| Intent | Page that should own it | Hub's role |
|---|---|---|
| "HVAC service / HVAC company / heating and air conditioning {city}" | **Hub** | Primary target |
| "AC repair {city}" | `/air-conditioning/ac-repair/{city}` (for Yorba Linda the **homepage** ranks 1.2 for "ac repair yorba linda ca") | Link to it; do **not** lead the hub title with "AC Repair" |
| "Emergency AC repair {city}", "AC tune-up {city}", "heating repair {city}" | The city service pages | Link to them |
| "HVAC repair {city}" | Undecided: `/hvac-repair/{city}` is a paused merge candidate (Placentia, Costa Mesa); kept for Yorba Linda | Leave "HVAC Repair" out of the hub title until that decision is made with GSC data |
| `/ac-repair/{city}` (Google Ads) | Protected | No change |

The current hub titles end in "AC Repair & Installation", which competes with the city AC repair page and, for Yorba Linda, with the homepage. The proposals below move the hub to the HVAC / heating and air conditioning intent.

---

## 4. Competitor structure (public pages, facts only)

| Page | Words | H1 / main sections | FAQ schema | Form | Notes |
|---|---|---|---|---|---|
| Dial One Sonshine, Placentia city page (`dialonesonshine.com/service-areas/orange-county-ca/placentia/`) | 1,643 | "HVAC Placentia" H1; sections on Orange County weather and HVAC, services, customer reviews, why choose us, communities served, FAQs, quote | 6 | 1 | 79 images |
| Dial One Sonshine, Yorba Linda URL | 1,712 | Now a **plumbing** page ("Plumber Yorba Linda") | 6 | 1 | Gap: no HVAC-focused Yorba Linda page from this competitor |
| Absolute Comfort, Costa Mesa AC page (`comfortyoucanfeel.com/services/air-conditioning-service/`) | 858 | "Air Conditioning Services in Costa Mesa, CA"; repair, replacement, maintenance, why choose us, areas served | 0 | 1 | LocalBusiness schema with AggregateRating |
| Our hubs | 342 to 352 | Services list, 3 FAQs, nearby cities | 3 | 0 | |

What they have that we lack: a quote form on the page, a local climate section, a list of communities or neighbourhoods served, more FAQs, and real reviews. **Reviews and ratings will not be added** unless they are real and verified (Phase 2.1 rules); everything else can be matched with genuine information. Nothing from these pages should be copied.

---

## 5. Recommendations by priority

Value is the expected SEO or lead benefit; risk is the chance of harm. "Owner" means it cannot be published without owner confirmation.

| P | Change | Pages | Value | Risk | Needs |
|---|---|---|---|---|---|
| 1 | **Correct or remove unverified claims** (section 8). Trust, policy and legal exposure, independent of SEO. | 3 (and the same template sidebar line on all 37 hubs) | High | Low | **Owner** answers |
| 2 | **New titles and meta descriptions** (section 6), aimed at the HVAC / heating and air conditioning intent; per-city overrides so other hubs are unchanged. | 3 | Medium. These pages sit around position 25 (page 3), where CTR is low whatever the snippet says, so expect titles to help mainly once rankings improve. | Low | Approval |
| 3 | **Add the existing quote form** (`QuoteForm`, already used on the city service pages) to the hubs. Same API (`/api/contact`), same GTM events; no new tracking. | 3 (or all 37, if approved as a template change) | High (leads) | Medium (form placement; test on a preview) | Approval |
| 4 | **Point the "top services" cards at the city's own service pages** and fix the label casing (AC Repair, AC Tune-Up, Commercial HVAC). | 3 (template fix benefits all 37) | Medium (stronger hub-to-city-page relevance) | Low | Approval |
| 5 | **Add verifiable local content** (sections 7 and 7.1), about 500 to 800 words per page, built on public sources and owner facts. | 3 | High (the main lever for moving from page 3) | Low to medium | Sources, **owner** facts |
| 6 | **Expand FAQs from 3 to 6** with the proposals in section 7; keep FAQPage schema. | 3 | Medium | Low | Some **owner** answers |
| 7 | Remove em dashes from the hub copy; raise hero-text contrast on mobile. | 3 | Low | Low | Approval |
| 8 | Real local proof: job photos with location (city level), real project notes, verified reviews. | 3 | High | Low | **Owner** material only |

Not recommended: adding AggregateRating or review schema (no verified reviews on file), adding a fake address or local office per city, or rewording template text to make pages "look unique" without new information.

Implementation shape (for the later approved PR): optional per-city fields in `locations.ts` (meta override, extra sections, extra FAQs) rendered only where present, so these three pages change and the other 34 hubs stay identical unless template-wide changes (P3, P4, P7) are approved.

---

## 6. Proposed titles and meta descriptions

The site appends " | HVAC Service & AC Repair" to every title (`buildMetadata`). Lengths below are for the part before that suffix, which is what shows in results. Each description is 155 to 158 characters, contains no em dashes, and makes no claim that needs confirmation unless marked.

| Page | Proposed title | Chars | Proposed meta description |
|---|---|---|---|
| Placentia | `HVAC Service in Placentia, CA: Heating and Air Conditioning` | 59 | `Heating and air conditioning service for Placentia homes: AC repair, tune-ups, heating repair and new systems from a Yorba Linda team. Call (714) 410-2784.` |
| Costa Mesa | `HVAC Service in Costa Mesa, CA: Heating and Air Conditioning` | 60 | `HVAC service for Costa Mesa homes and businesses: AC repair, coastal coil care, heating repair and maintenance. Request an estimate or call (714) 410-2784.` |
| Yorba Linda | `HVAC Service in Yorba Linda, CA: Heating and Air Conditioning` | 61 | `Yorba Linda heating and air conditioning service from our shop on Yorba Linda Blvd: AC repair, furnace repair, tune-ups and replacements. Call (714) 410-2784.` |

Notes:

- "From a Yorba Linda team" and "our shop on Yorba Linda Blvd" rest on the business address in `src/lib/config/site.ts` (18340 Yorba Linda Blvd #107). **Owner: confirm it is the public, current address** (it should match the Google Business Profile).
- "Same-day service available" has been dropped: put it back only if the owner confirms it.
- Keep the H1s as they are ("HVAC Service in {City}, CA"): they already match the proposed title intent.

---

## 7. Proposed H2 outlines and FAQs

Common outline (new sections in **bold**). Each new section is short and specific; target total 900 to 1,200 words per page.

1. H1 HVAC Service in {City}, CA (unchanged), intro (revised blurb and local context; claims per section 8)
2. H2 HVAC Services for {City} Homes (cards to the city's own service pages, fixed labels)
3. **H2 {City} Weather and Your HVAC System** (verifiable climate facts, with sources)
4. **H2 Replacing an AC or Furnace in {City}: Permits, Refrigerant and Rebates** (public, citable facts)
5. **H2 Areas We Serve in {City}** (neighbourhoods or ZIP codes: owner confirms)
6. **H2 Request Service in {City}** (the existing quote form)
7. H2 {City} HVAC Questions (6 FAQs)
8. Nearby cities and links to the city's service pages (existing)

### Placentia

| Section | Proposed content | Basis |
|---|---|---|
| Weather | Inland North Orange County: hot, dry summers with less coastal cooling than beach cities; AC load from late spring into October. Cite NOAA/NWS climate normals for the nearest station if any number is used. | Public data; verify the numbers before publishing |
| Replacement | California requires a building permit for an HVAC change-out (link the City of Placentia Building Division page); 2025 refrigerant transition (new split systems use lower-GWP refrigerants such as R-454B; cite EPA); current SCE and SoCalGas rebate pages (link, don't quote amounts) | Public sources; verify links before publishing |
| Areas served | Placentia neighbourhoods or ZIP codes actually served | **Owner** |
| Local context | Housing age (1970s and 1980s tracts) and common brands: keep only if the owner confirms from real jobs | **Owner** |

FAQs (6):

1. Do you serve all of Placentia? (**owner**: neighbourhoods or ZIP codes)
2. How soon can a technician get to Placentia? (**owner**: a true, typical time; otherwise answer without a number)
3. Do I need a permit to replace my AC in Placentia? (public: yes, a building permit; link the city)
4. Should I repair or replace my AC? (general guidance; link the repair-vs-replace calculator and the Placentia AC repair page)
5. Do you service heat pumps? (existing answer; general)
6. What does an AC tune-up include? (existing service content; link the Placentia tune-up page)

### Costa Mesa

| Section | Proposed content | Basis |
|---|---|---|
| Weather | Coastal climate: milder summers than inland Orange County, marine layer, salt air; late-season heat during offshore (Santa Ana) wind events. Cite NWS for any figures. | Public data; verify |
| Coastal care | Salt air and condenser coil corrosion; coil cleaning and inspection intervals as general guidance | General HVAC knowledge (already on the page) |
| Replacement | City of Costa Mesa building permit for HVAC change-outs (link); refrigerant transition (EPA); rebates (SCE, SoCalGas links) | Public sources; verify |
| Commercial | Keep only what the owner confirms (types of commercial work actually done). Remove the South Coast Plaza experience claim unless confirmed. | **Owner** |

FAQs (6):

1. Does coastal air affect my AC in Costa Mesa? (existing, general)
2. How often should a coastal outdoor unit be cleaned? (general guidance; avoid absolute numbers unless sourced)
3. Is air conditioning worth it in Costa Mesa? (existing answer about late-season heat; cite NWS if dates or temperatures are given)
4. Do you work on commercial HVAC in Costa Mesa? (**owner**)
5. Can older Costa Mesa homes without ducts get AC? (general: ductless mini-splits; link the mini-split pages)
6. Do I need a permit to replace my HVAC system in Costa Mesa? (public; link the city)

### Yorba Linda

Yorba Linda is the home base. The homepage owns "ac repair yorba linda", so this hub should be the complete local HVAC guide (heating and cooling, all services), linking to the homepage and the five Yorba Linda service pages.

| Section | Proposed content | Basis |
|---|---|---|
| Weather | Inland, foothill city; hotter inland neighbourhoods; Santa Ana wind and wildfire-smoke days (filtration and indoor air quality). Cite NWS and the AQMD for any figures. | Public data; verify |
| Replacement | City of Yorba Linda building permit (link); HOA rules on outdoor units and noise in some communities (general advice to check the HOA); refrigerant transition (EPA); rebates (links) | Public sources; verify |
| Local shop | Address on Yorba Linda Blvd, opening hours (from `site.ts`) | **Owner** confirms it matches the Google Business Profile |
| Local context | Housing age and system types seen in Yorba Linda | **Owner** (keep only if from real jobs) |

FAQs (6):

1. Where are you located in Yorba Linda? (address; **owner** confirms)
2. How quickly can you get to my home in Yorba Linda? (**owner**; the current "30 to 60 minutes" needs confirmation)
3. Do you service both heating and air conditioning? (general; links)
4. Do I need a permit or HOA approval to replace my AC in Yorba Linda? (public permit link; general HOA advice)
5. What brands do you work on? (**owner**; the current Carrier/Trane/Lennox answer needs confirmation)
6. Do you service commercial properties in Yorba Linda? (**owner**)

### 7.1 Source list to verify before publishing

- NOAA / National Weather Service climate normals and Santa Ana wind information for the area (for any temperatures or dates).
- City building and permit pages: Placentia, Costa Mesa, Yorba Linda (for HVAC change-out permits).
- EPA Technology Transitions (AIM Act) page on residential AC refrigerants (2025 transition).
- SCE and SoCalGas current HVAC rebate pages; TECH Clean California (programs change; link, don't quote amounts).
- South Coast AQMD (smoke and air quality days, for the indoor air quality angle).

Each fact is linked or reworded from its source at implementation time; nothing is stated from memory.

---

## 8. Claims needing owner confirmation (now live on these pages)

| Claim (where) | Pages | Action until confirmed |
|---|---|---|
| "we respond within 1 hour during business hours" (template sidebar) | all 37 hubs | Confirm or replace with "Call or request an estimate online" |
| "Same-day service available" (meta description) | all 37 hubs | Confirm or remove |
| "we can often reach most parts of the city within 30–60 minutes"; "Morning calls placed before 10 AM typically get a same-day appointment" | Yorba Linda | Confirm or remove the numbers |
| "As our home base, Yorba Linda gets priority scheduling and faster response times" | Yorba Linda | Confirm |
| Brands common in Yorba Linda; "We stock parts for all three brands and can usually complete repairs on the first visit" | Yorba Linda | Confirm |
| Commercial work "along Yorba Linda Blvd and the surrounding business parks"; maintenance contracts | Yorba Linda | Confirm |
| "Placentia is one of our most frequently served cities"; "We stock parts for" Carrier, Trane and Bryant | Placentia | Confirm |
| "we typically dispatch within 1–2 hours. We're available 7 days a week." | Placentia | Confirm. Site hours list Sunday as "Emergency Service Available", which needs to agree. |
| "South Coast Plaza ... is a major commercial HVAC service area for us"; "experience with the retail and commercial properties in the South Coast Plaza area" | Costa Mesa | Confirm or remove |
| Business address 18340 Yorba Linda Blvd #107 | all | Confirm it matches the Google Business Profile |

---

## 9. Data still needed

| Data | Why |
|---|---|
| **GSC queries for each of the three pages** (Performance, filter Page = exact URL, Queries tab, 2026-07-18 to 2026-10-15; or the query + page export) | Shows which searches produce the 1,216 / 852 / 258 impressions, so titles and sections target real queries rather than assumptions |
| Owner answers to section 8 | Required before any copy that states response times, stock, brands or commercial experience |
| Neighbourhoods or ZIP codes served in each city | "Areas we serve" sections |
| Real job photos and notes (city level, with permission) | Local proof, the strongest differentiator against templated competitors |
| Conversion data by landing page (GA4 or call tracking) | To measure the form addition (P3) |

---

## 10. Measurement after implementation

Baseline: the GSC figures in section 1. After launch, compare 28-day and 90-day windows for each URL: impressions, average position, clicks and CTR, plus form submissions and calls from the hubs. Expect any ranking change to take 4 to 12 weeks after Google recrawls; titles alone will not move a page from position 25 to page 1.

## 11. What was not changed

No page, title, description, content, form, redirect, canonical, robots rule, sitemap entry or Google Ads page was changed. Nothing was merged or deployed. The live checks were read-only. Competitor pages were read once each, for structure only; nothing was copied.
