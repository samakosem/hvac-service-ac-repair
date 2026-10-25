# SEO Phase 4: Organic Growth and Local Rankings

Base: `main` at `623ddcb`. Date 2026-10-25. Builds on `docs/seo-phase-3/PHASE_3_AUDIT.md` and `docs/seo-phase-3/ppc-page-classification.csv`; nothing from Phase 3 is repeated.

Method: crawl of the Phase 3 production-equivalent build (456 sitemap URLs). Content overlap = Jaccard similarity of 5-word shingles of the `<main>` text **with the city name removed**, so a page that differs only by the city name scores ~1.00.

## Task 1: GSC data availability

| Dataset | Available? |
|---|---|
| Search Console API or connector in this environment | **No.** No GSC tool or credentials are available to this session. |
| Pages performance, current vs previous 90 days | **Partial:** 22 page rows from the owner (`docs/seo-phase-2/gsc-evidence/2026-10-18_gsc_priority_pages_partial.csv` on branch `seo/phase-2-3-cannibalization-audit`), plus period summaries of the returned rows |
| Query + page performance | **Missing** (only two queries were summarised: `ac repair yorba linda ca`, `emergency ac repair`) |
| Indexed / not indexed (Pages report), Sitemaps report | **Missing** |
| Links report (internal and external, top linked pages) | **Missing** |
| URL Inspection (Google-selected canonical) | **Missing** |
| Google Ads landing pages / conversions, GA4 or call tracking by landing page | **Missing** |

Exact files needed (templates already in `docs/seo-phase-2/gsc-input/templates/`):
`gsc_pages_last_90d.csv`, `gsc_pages_prev_90d.csv`, `gsc_query_page_last_90d.csv`, `gsc_query_page_prev_90d.csv`, `gsc_queries_*`, `gsc_indexing.csv` (or per-reason exports), `gsc_links_top_pages.csv`, `ads_landing_pages_last_90d.csv`, `conversions_by_landing_page_last_90d.csv`. API export preferred, to avoid the 1,000-row UI cap.

Since the apex 307 became a 308 (Phase 2.3 P0), a fresh export would also show whether Google has moved the apex homepage (position 5.6) to www.

## Task 2: PPC landing pages (175 `/ac-repair/[city]`)

| Finding | Evidence |
|---|---|
| Near-duplicate template | Overlap between random pairs of PPC pages, city name removed: **median 0.93** (300 pairs). Orange County PPC pages: 1.00 |
| Thin uniqueness despite length | 1,560 words median, but almost all of it is shared |
| Duplicate intent | 32 PPC cities also have an organic `/air-conditioning/ac-repair/{city}` page (20 in Orange County). Both target "AC repair {city}". The text differs (overlap 0.18) because they're different templates, but the intent is the same |
| Internal links | 0 (by design: Ads landing pages) |
| Organic potential (evidence) | Only 4 pages have GSC rows: Bellflower (pos 20.3), Lynwood (16.1), Perris (23.9), Riverside (24.7). All 4 are cities with **no organic page**, so the PPC page is the only page Google can rank there |
| Regions | Greater LA 48, Orange County 34, Riverside 26, San Fernando Valley 25, San Bernardino 21, Ventura 11, Santa Barbara 10 |

**Recommendations (none implemented; all need approval and data):**

1. **Orange County overlap (20 pages):** the organic city page should own "AC repair {city}". Once the query + page export shows which URL Google ranks, set those 20 PPC pages to `noindex, follow`. They stay live for Ads.
2. **No-counterpart pages with no GSC row (139):** recommend noindex only after the full pages export confirms 0 clicks and the links report confirms no backlinks.
3. **The 4 with impressions:** keep indexable. If the owner confirms these cities are a real service area, a real organic page (not another template) is the growth path. Don't build one before GSC and Ads data show demand.

## Task 3: City x service pages (185)

Orange County (21 cities per family):

| Family | Overlap between OC cities (median) | Words (median) | Title length with brand (median) |
|---|---|---|---|
| `/air-conditioning/ac-repair/[city]` | **0.97** | 999 | 91 |
| `/air-conditioning/emergency-ac-repair/[city]` | **0.98** | 1,028 | 100 |
| `/air-conditioning/ac-tune-up/[city]` | **0.97** | 974 | 91 |
| `/heating/heating-repair/[city]` | **0.98** | 999 | 92 |
| `/hvac-repair/[city]` | **0.98** | 1,012 | 80 |
| `/service-areas/orange-county/[city]` (hubs) | 0.90 | 826 | 63 |

- **City-swapped templates.** Within each family the OC pages are 97 to 98% identical once the city name is removed. The hand-written entries (e.g. Yorba Linda, Anaheim, Fullerton, Irvine, Orange for AC repair) add only a short `localContext` paragraph. The hubs (P1 and P4 work) are the most differentiated pages per city.
- **Overlapping intent on the same city:**
  - `/hvac-repair/{city}` vs `/air-conditioning/ac-repair/{city}`: overlap 0.41, and "HVAC repair {city}" is the same intent as the hub "HVAC service {city}"
  - `/heating/heating-repair/{city}` vs `/hvac-repair/{city}`: overlap 0.38. Heating titles also say "AC & Heating", which pulls them toward AC intent
  - These are the strongest cannibalization candidates (Phase 1 R5). Confirm with the query + page export before merging.
- **Titles:** 80 to 110 chars, carrying a phone number plus a slogan. The decision from Phase 3 stands: wait for the CTR result on the 8 retitled pages before changing the template.
- **Internal links:** healthy (median 9 contextual inlinks per page, Phase 3).
- **Defect fixed:** 6 meta descriptions ended in `(714) 410-2784).`, with a stray parenthesis that shows in snippets (see Safe changes).

Recommendation: don't add more city text by template; another generated paragraph raises nothing. Consolidate instead. Make the hub plus `/air-conditioning/ac-repair/{city}` the two strong pages per OC city, and treat tune-up, heating and hvac-repair city pages as noindex/merge candidates, gated on GSC data.

## Task 4: Priority hubs (Placentia, Costa Mesa, Yorba Linda)

GSC (sample): Placentia 1,216 impr, pos 25.8; Costa Mesa 852, pos 24.3; Yorba Linda 258, pos 24.8. All three are on page 3, the closest of any hubs to page 1.

| | Placentia | Costa Mesa | Yorba Linda |
|---|---|---|---|
| Words | 773 | 780 | 785 |
| Internal inlinks (all / contextual) | 455 / 13 (footer) | **12 / 12 (not in footer)** | 455 / 19 (footer) |
| Links out to own city service pages | all 5 | all 5 | all 5 |
| FAQ | 6, page-specific (permit, R-22, heat pumps) | 6, page-specific (coastal air, ductless) | 6, incl. shop location |
| Lead form + tel links | yes, 9 tel | yes | yes |

What's already good: unique section structure per city, official permit sources, no fabricated claims, links to every city service page, form and call buttons.

What limits them (needs owner input, can't be generated):

| Owner information needed | Used for |
|---|---|
| Real recent jobs per city (month, system type, problem, outcome; no customer names without consent) | A "Recent work in {city}" section; the strongest local relevance signal |
| Photos from jobs in each city (EXIF or job record) | Image content and trust |
| Neighbourhoods and housing tracts **actually served** in each city | Local context paragraphs (currently generic) |
| Typical arrival window from the Yorba Linda shop to each city, as the owner states it | Replace generic "same-day available" with an honest stated window |
| Equipment brands installed and any dealer status | Installation sections |
| CSLB license number | Footer and `HVACBusiness` schema (California B&P §7030.5) |
| Google Business Profile URL confirmation and a link to real reviews | `sameAs`; a review link per hub |
| Costa Mesa: whether it should be prioritised commercially | If yes, add it to the footer city list (now the first 10 OC cities; Costa Mesa is 12th) |

## Task 5: Roadmap

| # | Item | Impact | Confidence | Effort | Risk | Needs data |
|---|---|---|---|---|---|---|
| 1 | Full GSC exports (Task 1 list) | Unlocks 2 to 5 | High | Low (owner, 30 min) | None | It **is** the data |
| 2 | Owner-verified local content for Placentia, Costa Mesa, Yorba Linda (Task 4 table) | High: page-3 pages with impressions | Medium-high | Medium | Low | Owner facts |
| 3 | Consolidate OC city x service families: keep hub + AC repair per city; noindex/merge tune-up, heating, hvac-repair city pages | High: removes 63 near-duplicate OC pages (21 cities x 3 families) from competition | Medium | Low (flag per family) | Medium (lose long-tail if any ranks) | Query + page export |
| 4 | Noindex the 20 OC PPC pages that duplicate organic city pages | Medium | Medium | Very low | Low (Ads unaffected) | Query + page export, Ads URLs |
| 5 | City x service title template (R7) | Medium | Medium | Low | Low | CTR result on the 8 Phase 3 titles (4 to 6 weeks) |
| 6 | Noindex the 139 PPC pages with no organic counterpart | Medium (site quality) | Low-medium | Very low | Low-medium | Full pages export, links, Ads |
| 7 | Costa Mesa in the footer city list | Low-medium | Low | Very low | Low | Owner priority |
| 8 | `/services` indexable (R6) | Low | Medium | Very low | Very low | Approval |

## Safe changes implemented

| File | Change |
|---|---|
| `src/lib/config/city-service-pages.ts` (5), `src/app/ac-not-cooling/page.tsx` (1) | Removed the stray `)` after the phone number in 6 meta descriptions |

No title, canonical, robots, noindex, redirect, URL, form or tracking change.
