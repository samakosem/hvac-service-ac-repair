# Phase 2.3: SEO Cannibalization and Content Consolidation Audit

Site: https://www.hvacserviceacrepair.com/
Audited commit: `a28afa8` (main, after Phase 2.2). Production was verified to serve this exact build (456/456 sitemap URLs, 2026-10-18).
Audit date: 2026-10-18
Status: **audit only.** No website code, redirect, canonical, robots rule, sitemap entry or indexing directive was changed. Nothing was merged or deployed. Every recommendation below waits for your approval.
Revised: 2026-10-18, after the owner review below.

> **Owner decisions (2026-10-18), applied throughout this report and the CSVs**
>
> 1. **Ventura County and Santa Barbara County are confirmed service area.** The earlier "Tier 3 / out of area" assumption is removed. No page is noindexed, merged or removed because of geography. The 10 AC repair and emergency AC repair pages in those counties are IMPROVE, like every other Tier 2 city.
> 2. **Every MERGE+301 and NOINDEX is paused** until real Google Search Console performance data is loaded. They appear only as *candidates* (`candidate_action`) with status **PAUSED**; the page's current action is KEEP.
> 3. **The 175 generated Google Ads pages are protected** until their active campaign use (Google Ads landing-page report) and their organic performance (GSC) are verified. Status **PROTECTED**.
> 4. **No production changes and no implementation PR.** The audit files are prepared to take the real exports: format in `docs/seo-phase-2/gsc-input/README.md`.

Deliverables:

| File | Contents |
|---|---|
| `PHASE_2_3_CANNIBALIZATION_AUDIT.md` | This report |
| `docs/seo-phase-2/PHASE_2_3_PAGE_DECISIONS.csv` | All 461 indexable or prerendered URLs: target keyword, intent, similarity group, content metrics, current action, paused candidate action and its status, reasoning, risk, priority. GSC, Ads and conversion columns read `N/A (no export)` until data is loaded. |
| `docs/seo-phase-2/PHASE_2_3_REDIRECT_CANDIDATES.csv` | 100 paused consolidation candidates, 9 host and chain hygiene redirects (awaiting approval), 7 legacy URLs to leave as 404 |
| `docs/seo-phase-2/PHASE_2_3_DATA_STATUS.md` | Which data inputs are loaded, row counts, warnings and status counts. Regenerated on every run. |
| `docs/seo-phase-2/PHASE_2_3_QUERY_OVERLAP.csv` | Generated once the query + page export is loaded: every query that shows 2+ site URLs |
| `docs/seo-phase-2/gsc-input/` | `README.md` with the exact export formats, header-only templates, and a `.gitignore` that keeps the business data out of Git |
| `docs/seo-phase-2/phase23-metrics.json` | Content metrics for the 461 URLs (from the crawl of `a28afa8`), so the decisions can be re-run without a new crawl |
| `PHASE_2_3_IMPLEMENTATION_PLAN.md` | Prioritized, gated rollout plan |
| `scripts/seo-audit/phase23_analyze.py`, `phase23_decide.py` | Reproduce every number here. `phase23_decide.py --inputs docs/seo-phase-2/gsc-input` loads the exports and applies gate G1. |

---

## How this audit was performed (read first)

| Data source | Status |
|---|---|
| Local production build of `a28afa8` (`next build`), all 461 prerendered routes crawled with `next start`; main content only (header and footer excluded) | Done |
| Route inventory from the build's prerender manifest, compared with `sitemap.xml` | Done |
| Live probes from a GitHub Actions runner (read-only GET requests): every sitemap URL on the apex host, over http and with a trailing slash; all 135 configured redirect sources; query-string, case and `index.html` variants; the 5 routes outside the sitemap; vercel.app hostnames | Done (run 39143305028) |
| Historical URLs from the Wayback Machine CDX index for both hosts, each probed live | Done (11 URLs found, all on the apex host) |
| **Google Search Console (clicks, impressions, position, queries, indexing)** | **NOT AVAILABLE.** No GSC connector or credentials exist in this environment. No metric in this report or the CSVs comes from GSC; none was estimated. Section 8 lists the exports needed. |
| Google Ads final URLs | **NOT AVAILABLE.** "Ads page" below means the page is built from the repository's PPC templates (`ppc-cities.ts`, `ppc-city-generator.ts`). Which of them receive paid clicks today needs a Google Ads export. Until then all 181 Ads pages are protected. |
| Service area | **Owner-confirmed:** Orange County, the listed Los Angeles, Riverside and San Bernardino County cities, Ventura County and Santa Barbara County. |
| Backlink data | **NOT AVAILABLE.** No backlink tool was used. GSC "Links" export (section 8) is the free substitute. |
| Third-party index check (web search for the domain) | Returned nothing for this domain; no conclusion drawn from it. |

### Similarity method

- **Main content only.** Header, footer and navigation are excluded, so the site-wide chrome never counts as duplication.
- **Raw similarity:** 5-word shingle Jaccard on the text as Google sees it.
- **City-normalized similarity:** every city and county name (210 names from the location configs) is replaced with `{city}` first. Two pages that differ only by the city name score close to 100%.
- **Sentence analysis:** every sentence of 6+ words, city-normalized, is counted across the site. *Template share* = share of a page's sentence words found on 6 or more pages. *Unique share* = share found on no other page.
- **Near-duplicate group:** pages of the same type whose city-normalized similarity is 85% or higher, joined into one group (`C01` to `C06`).

**Shared templates alone are not treated as harmful.** Service pages share about 17 to 20% of their text (the "What to Expect" process block, CTAs, the related-services list). That is normal for a service business and is not flagged. A page is flagged only when it has essentially *no* content of its own (unique share under 5%) **and** competes for a search another page already answers, or is one of dozens of city-swapped copies.

---

## 1. Executive summary

1. **The page layer is clean.** All 456 sitemap URLs return 200 on `https://www`. Every `http://www` and trailing-slash variant reaches the canonical URL in one 308. Tracking parameters keep a clean self-canonical. Uppercase and `index.html` variants return 404. No page is served on both hosts.
2. **The apex-to-www redirect is temporary.** For all 456 URLs, `https://hvacserviceacrepair.com/...` answers **307 Temporary Redirect**, and `http://hvacserviceacrepair.com/...` takes two hops (308, then 307). The 308 rule in `next.config.ts` never runs because Vercel's domain-level redirect answers first. A temporary redirect tells Google the apex URL may come back, which can slow consolidation of the old non-www history onto www. Fix: set the Vercel domain redirect to 308 (Wave 1; a settings change, no code).
3. **One host leaks:** `https://hvac-service-ac-repair.vercel.app/` serves the full site with 200 and `index, follow`. Its canonical tags point to www, which limits the harm, but it should redirect to www (Wave 1).
4. **History sits on non-www; today's split is a reporting question.** Every URL the Wayback Machine holds for this domain (11, April to August 2025) is on the **non-www apex host**: the previous WordPress site. The current site is www-only. A GSC URL-prefix property for `https://hvacserviceacrepair.com/` would hold that older history separately from a www property (section 7).
5. **The real duplication is city-swapping, not cross-page overlap.** 350 of 461 pages have under 5% unique sentences. Six near-duplicate groups cover **345 pages**: the 175 Google Ads template pages (97% identical to each other once the city name is removed) and five city × service families (32 to 36 pages each, 94 to 96% identical).
6. **Different page types for the same city are not duplicates of each other.** A city's hub page shares 2 to 3% of its text with that city's service pages; an Ads page shares 15% with the organic AC repair page for the same city. Overlap between them is in **titles and target keywords**, not content.
7. **Keyword overlap that matters:**
   - "AC repair {city}": 4 pages per city carry it in the title for 28 of 37 cities (the Ads page, the city AC repair page, the emergency page and the hub's "AC Repair & Installation"). Yorba Linda has 5, including the homepage title.
   - "HVAC repair/service {city}": `/hvac-repair/{city}` ("Local HVAC Repair in X") and the city hub ("HVAC Service in X") answer the same search; the hub is the page with real local content.
   - Four service-page pairs split one intent: `ac-maintenance` vs `ac-tune-up`, `ac-replacement` vs `ac-installation`, `ac-services` vs `/air-conditioning`, `residential-maintenance-plan` vs `/maintenance-plans`.
8. **Current actions:** KEEP 339, IMPROVE 122. **Paused candidates (not executed):** 100 MERGE+301 (status PAUSED) and 175 NOINDEX, all on the generated Ads pages (status PROTECTED). No other NOINDEX candidate remains. Candidates are re-evaluated only with real data: gate G1 withdraws any candidate whose page has 1+ click or 100+ impressions in either 90-day period, any external link or any conversion, and an Ads page with paid clicks stays protected.

---

## 2. URL inventory

### 2.1 Indexable URLs

| Set | Count | Status |
|---|---|---|
| Sitemap URLs | 456 | All 200, self-canonical, `index, follow` |
| Prerendered routes outside the sitemap | 5 | `/privacy-policy`, `/terms`, `/sms-compliance`: 200, **indexable**, self-canonical. `/services`: `noindex, follow`. `/thank-you`: `noindex, nofollow`, no canonical. |
| **Indexable total on www** | **459** | 456 sitemap + 3 legal pages |
| Other routes | 0 | Every dynamic route uses `dynamicParams = false` except blog posts, whose unknown slugs return 404. The build's prerender manifest has no other HTML routes. |
| vercel.app production alias | full copy | `hvac-service-ac-repair.vercel.app` returns 200, `index, follow`, canonical to www. Deployment URLs (`*-sams-projects-*.vercel.app`) are protected by Vercel SSO and send `X-Robots-Tag: noindex`. |

The three legal pages being indexable but absent from the sitemap is harmless; `/sms-compliance` must stay public for Twilio A2P 10DLC review. No action proposed.

### 2.2 Variants (live, from the GitHub Actions runner)

| Variant (all 456 sitemap URLs) | Hops | Result |
|---|---|---|
| `https://hvacserviceacrepair.com/...` (apex) | 1 | **307 Temporary** to the www URL, then 200 (456 of 456) |
| `http://hvacserviceacrepair.com/...` (apex, http) | 2 | 308 to https apex, then **307** to www, then 200 (456 of 456) |
| `http://www.hvacserviceacrepair.com/...` | 1 | 308 to https www, then 200 (456 of 456) |
| `https://www.../{path}/` (trailing slash) | 1 | 308 to the no-slash URL, then 200 (455 of 455; `/` excluded) |

Every variant ends on the exact canonical URL. The only defect is the status code on the apex host: `next.config.ts` declares a permanent (308) host redirect, but the 307 comes from the Vercel domain configuration, which answers before the application.


| Variant | Result |
|---|---|
| `?gclid=...&utm_source=...`, `?page=2` on 5 key pages | 200, canonical = clean URL |
| Uppercase path (`/AC-REPAIR/ANAHEIM`) | 404 |
| `/index.html`, `/{path}/index.html` | 404 |
| 135 configured redirect sources | All end at 200. 128 in one hop, **7 in two hops** (`/about/`, `/hvac-repair/`, `/hvac-installation/`, `/hvac-cleaning/`, `/heating/heating-repair/`, `/air-conditioning/ac-repair/la-habra/`, `/faq/`): the trailing-slash 308 fires before the map entry. Harmless but worth collapsing (Wave 1). |

### 2.3 Historical URLs (Wayback Machine)

| URL (apex host, 2025) | Today |
|---|---|
| `/about-us/`, `/contact/`, `/services/` | 308 to the www page, 200 |
| `/` | 200 |
| `/author/parves/`, `/author/sammazor1gmail-com/`, `/category/blog/`, `/category/uncategorized/`, `/hello-world/`, `/hello-world-2/` | 404. Default WordPress archive and sample pages. Leave as 404. |
| `/garage-door-repair-los-angeles/` | 404. Unrelated to HVAC (captured August 2025). Leave as 404; check GSC for any impressions on it (it may indicate old spam content). |

No historical HVAC page is lost: every captured service URL resolves.

---

## 3. Overlap analysis

### 3.1 Homepage vs city service pages

| | Homepage `/` | `/air-conditioning/ac-repair/yorba-linda` |
|---|---|---|
| Title | **AC Repair Yorba Linda, CA** \| HVAC Service & AC Repair | **AC Repair in Yorba Linda, CA** \| Same-Day Service \| ... |
| H1 | Fast HVAC Service & AC Repair Near You | AC Repair in Yorba Linda, CA — Same-Day Service |
| Text overlap | 4% raw | |
| Contextual links in | 89 | 18 |

The homepage title and the Yorba Linda AC repair page target the same phrase. The content is different (4% shared), so this is a title-level split. Google usually ranks the homepage for "{service} {home city}" queries because it holds the most authority. **Do not retitle the homepage until GSC shows which URL ranks for "ac repair yorba linda"** (section 5, cluster K1). If the homepage ranks, keep it and point the city page at "AC repair Yorba Linda" variants (same-day, emergency) with links to the homepage; if the city page ranks, move the homepage title to the company intent ("HVAC Company in Yorba Linda").

The homepage overlaps no other city page (4 to 5% shared text with each Yorba Linda page, under 1% with the hub).

### 3.2 City hubs vs city service pages

| Pair (same city) | Raw similarity (median of 37 cities) | Title overlap |
|---|---|---|
| Hub vs `/hvac-repair/{city}` | 2.7% | **Yes:** "HVAC Service in X" vs "Local HVAC Repair in X" |
| Hub vs `/air-conditioning/ac-repair/{city}` | 2.6% | Partial: hub title ends "AC Repair & Installation" |
| Hub vs emergency, tune-up, heating repair | 2.5% | No |
| `/air-conditioning/ac-repair/{city}` vs `/hvac-repair/{city}` | 41% | Partial ("AC repair" vs "HVAC repair") |
| `/air-conditioning/ac-repair/{city}` vs `/heating/heating-repair/{city}` | 41% | Partial: heating H1 is "**AC &** Heating Repair in X" |
| `/air-conditioning/ac-repair/{city}` vs emergency | 35% | Partial (emergency title contains "AC Repair") |

The hub is the only city page type with real per-city content (median 45% unique sentences, its own FAQs, 0% FAQ reuse). `/hvac-repair/{city}` targets the same search with generated copy and no local content: **merge it into the hub** (36 cities; Yorba Linda kept for now because it has some unique copy and is the priority market). Phase 2.2 already links each hub to its service pages and back, so after a merge the hub automatically drops that link (the links are generated from `CITY_SERVICE_MAP`).

### 3.3 Generic service pages vs location pages

Generic service pages (`/air-conditioning/ac-repair`, `/air-conditioning/ac-tune-up`, `/heating`, ...) target the service at Orange County / Southern California level; city pages target "{service} {city}". Text overlap between a generic page and its city pages is under 10%. This is a healthy parent-child structure, and Phase 2.2 linked them. **No conflict**, with one exception: the city pages for secondary services (tune-up, heating repair) outside Tier 1 add nothing the generic page lacks, because their copy is the generic copy with a city name inserted (100% template sentences). Section 6 lists those 60 pages as **paused** merge candidates; the reason is content, not geography, and they are only reconsidered with GSC data.

### 3.4 Google Ads landing pages vs organic SEO pages

| Ads page set | Count | Organic page for the same city | Content overlap with it | Issue |
|---|---|---|---|---|
| `/ac-repair/{city}` (generated) with an organic twin | 32 | `/air-conditioning/ac-repair/{city}` | 15% | Two indexable pages for "AC repair {city}"; the Ads page has 0 internal links |
| `/ac-repair/{city}` (generated), no organic page | 143 | none | n/a | 97% identical city swaps for 143 cities in LA, Riverside, San Bernardino, Ventura and Santa Barbara counties (72 in LA County alone); a pattern search engines can treat as doorway pages |
| `/{city}-ac-repair` (hand-written) | 6 | Only Laguna Niguel has an organic twin | 47% unique sentences | Low; real content |

**Status: PROTECTED.** All 181 Ads pages stay live, unchanged, indexable and in the sitemap. For the 175 generated pages, "noindex + remove from sitemap" remains a *candidate* only, to be reconsidered once both inputs exist: the Google Ads landing-page report (which pages carry paid traffic) and GSC performance (which pages earn organic impressions). Even then, a page with paid clicks stays protected unless the Ads manager signs off, and a page with organic visibility is withdrawn by G1. If a noindex is ever approved, the page stays live for Ads (a `noindex` does not affect ad serving); Ads pages are never redirected and never blocked in `robots.txt` (AdsBot must crawl them). The 6 hand-written pages are KEEP.

Two places where the Ads page may be the stronger organic page: `/laguna-niguel-ac-repair` (hand-written) vs `/air-conditioning/ac-repair/laguna-niguel` (template), and `/orange-county-ac-repair` (hand-written, 0 internal links) vs `/air-conditioning/ac-repair` and `/service-areas/orange-county`. Leave both as they are until GSC shows which URL Google already prefers.

### 3.5 Near-duplicate city pages

| Group | Pages | Family | City-normalized similarity (mean) | Raw similarity (mean) | Unique sentences (median) | Reused FAQs |
|---|---|---|---|---|---|---|
| C01 | 175 | `/ac-repair/{city}` (Ads) | 97% | 79% | 0% | 100% |
| C02 | 36 | `/air-conditioning/ac-tune-up/{city}` | 96% | 77% | 0% | 100% |
| C03 | 36 | `/heating/heating-repair/{city}` | 95% | 73% | 0% | 100% |
| C04 | 36 | `/hvac-repair/{city}` | 95% | 74% | 0% | 100% |
| C05 | 35 | `/air-conditioning/emergency-ac-repair/{city}` | 95% | 76% | 0% | 100% |
| C06 | 32 | `/air-conditioning/ac-repair/{city}` | 94% | 72% | 0% | 100% |

Outside the groups, with real unique content: AC repair for Yorba Linda, Anaheim, Fullerton, Irvine and Orange (20 to 35% unique); emergency AC repair for Yorba Linda and Anaheim (29 to 35%); the Yorba Linda tune-up, heating repair and HVAC repair pages (9 to 19%). Note: the Phase 2 audit described 5 hand-written emergency pages; measured on rendered text, the Fullerton, Irvine and Orange emergency pages fall inside C05 (0% unique sentences).

The 37 city hubs (median 45% unique, nearest page 48% similar after normalization) and the 6 county hubs are **not** near-duplicates. They are thin (about 300 to 350 words), which is a content-depth issue, not a duplication issue.

### 3.6 Service pages with one intent split across two URLs

| Weaker page | Stronger page | Evidence | Shared text |
|---|---|---|---|
| `/air-conditioning/ac-maintenance` | `/air-conditioning/ac-tune-up` | Maintenance page's own CTA: "Book Your AC Tune-Up Before Summer Hits"; description "maintenance and tune-up" | 17% |
| `/air-conditioning/ac-replacement` | `/air-conditioning/ac-installation` | Installation title "AC Installation & Replacement"; its H2s include "When Does Replacement Make Sense?" and "Common Questions About AC Replacement" | under 4% (different copy, same intent) |
| `/air-conditioning/ac-services` | `/air-conditioning` | Both list repair, installation, maintenance and ductless with the same structure | 19% |
| `/maintenance/residential-maintenance-plan` | `/maintenance-plans` | `/maintenance-plans` already has "Residential Maintenance Plan", a residential vs commercial comparison and an FAQ | under 4% |
| `/ductless/ductless-mini-split` (title only) | `/ductless/mini-split-installation` | Hub title "Ductless Mini-Split Installation & Repair" competes for "mini split installation" | 17% |

Checked and **not** cannibalizing: `/emergency-hvac-service` vs `/air-conditioning/emergency-ac-repair` (heating + cooling vs AC only; under 4% shared), `/heating` vs `/heating/furnace-repair`, `/ac-not-cooling` vs `/blog/ac-blowing-warm-air`, each blog post vs its matching calculator (`what-size-ac-unit-do-i-need` vs `ac-size-calculator`, 4%; article vs tool). Cross-link these instead.

### 3.7 www/non-www and trailing-slash variants

See section 2.2 for live results and section 7 for the history. In short: no live duplication; the apex host redirects with 307 instead of 308; one indexable vercel.app alias; seven two-hop redirect chains.

---

## 4. Content similarity: boilerplate vs unique, by page type

| Page type | Pages | Median words | Nearest page, city-normalized | Nearest page, raw | Template sentences | Unique sentences | Contextual links in (median) |
|---|---|---|---|---|---|---|---|
| Ads `/ac-repair/{city}` | 175 | 1,632 | 100% | 84% | 100% | 0% | 0 |
| Ads hand-written `/{city}-ac-repair` | 6 | 1,547 | 44% | 38% | 52% | 47% | 0 |
| City AC repair | 37 | 1,040 | 100% | 77% | 100% | 0% | 9 |
| City emergency AC repair | 37 | 1,055 | 100% | 80% | 100% | 0% | 9 |
| City AC tune-up | 37 | 1,014 | 100% | 80% | 100% | 0% | 9 |
| City heating repair | 37 | 1,021 | 100% | 78% | 100% | 0% | 9 |
| City HVAC repair | 37 | 1,034 | 100% | 79% | 100% | 0% | 9 |
| City hubs | 37 | 335 | 48% | 21% | 41% | 45% | 10 |
| County hubs | 6 | 314 | 27% | 18% | 23% | 44% | 5.5 |
| Service pages | 26 | 512 | 18% | 19% | 19% | 67% | 7 |
| Blog posts | 8 | 1,095 | 7% | 7% | 3% | 93% | 3 |
| Calculators | 5 | 567 | 2% | 2% | 0% | 100% | 3 |
| Homepage | 1 | 2,497 | 5% | 5% | 2% | 85% | 89 |
| Core pages | 10 | 479 | 3% | 3% | 0% | 98% | 0.5 |

What this means:

- **Harmful duplication:** the five generated city × service families and the Ads template. Their "content" is one page with the city name swapped in (100% of their sentences appear on 6+ other pages). Rewording them would not change that; only real local substance does.
- **Not harmful:** service pages share their process and CTA blocks (19% template) but each has 67% unique sentences; hubs share a layout but carry their own facts and FAQs.

### 4.1 Geography tiers used in the decisions

The business is in Yorba Linda. City pages exist for 37 cities in 6 counties; Ads pages cover 181 cities.

| Tier | Cities | Rule |
|---|---|---|
| 1 | Yorba Linda, Anaheim, Brea, Placentia, Fullerton, Irvine, Orange (the Phase 2.2 priority cities plus every city with hand-written pages) | Keep every service page; improve generated ones with owner-verified local substance |
| 2 | Every other city with pages: the other 14 Orange County cities; Diamond Bar, Hacienda Heights, La Habra Heights, Rowland Heights, Walnut; Corona, Eastvale, Norco; Chino, Chino Hills, Ontario; Moorpark, Simi Valley, Thousand Oaks (Ventura County); Goleta, Santa Barbara (Santa Barbara County) | Keep AC repair and emergency pages (core intent) and improve them. Secondary-service pages (tune-up, heating) are paused merge candidates for content reasons, pending GSC. |

There is no out-of-area tier: the owner confirmed service throughout Ventura and Santa Barbara counties. Tiers only set content priority; geography is never a reason to merge, noindex or remove a page.

---

## 5. Keyword clusters and the strongest page for each

"Strongest" is judged on what can be measured without GSC: content depth and uniqueness, internal links, URL fit and title fit. **Every row marked GSC must be confirmed with query data before any change.**

| # | Keyword cluster | Pages competing today | Strongest page (proposed canonical owner) | Why | Gate |
|---|---|---|---|---|---|
| K1 | AC repair Yorba Linda | `/` (title), `/air-conditioning/ac-repair/yorba-linda`, `/ac-repair/yorba-linda` (Ads), `/air-conditioning/emergency-ac-repair/yorba-linda`, `/service-areas/orange-county/yorba-linda` (title) | `/air-conditioning/ac-repair/yorba-linda` for the service query; `/` for the brand + city query | City page is hand-written and the most specific; the homepage has the authority. Which one Google already prefers decides the title change. | GSC |
| K2 | HVAC company / HVAC service Yorba Linda | `/`, `/service-areas/orange-county/yorba-linda`, `/hvac-repair/yorba-linda`, `/about-us` (title) | `/` | Homepage: brand, most links, company intent | GSC |
| K3 | HVAC repair Yorba Linda | `/hvac-repair/yorba-linda`, hub | `/hvac-repair/yorba-linda` (for now) | Only page with "HVAC Repair" in the title; some unique copy | GSC |
| K4 | Emergency AC repair Yorba Linda | `/air-conditioning/emergency-ac-repair/yorba-linda`, `/emergency-hvac-service` | `/air-conditioning/emergency-ac-repair/yorba-linda` | Hand-written; H1 lacks "emergency" (IMPROVE) | none |
| K5 | AC repair {city}, 31 other Tier 1 and 2 cities | city AC page, Ads page (32 cities), emergency page, hub title | `/air-conditioning/ac-repair/{city}` | Has internal links; the Ads twin is protected until Ads and GSC data are in | GSC + Ads |
| K6 | HVAC service / repair {city} | hub, `/hvac-repair/{city}` | `/service-areas/{county}/{city}` | Only page type with local content | GSC |
| K7 | AC tune-up / AC maintenance (Orange County) | `/air-conditioning/ac-tune-up`, `/air-conditioning/ac-maintenance`, 37 city tune-up pages, `/maintenance-plans` (partly) | `/air-conditioning/ac-tune-up` | Parent of city pages; Phase 2.2 city links | GSC (swap if "ac maintenance" earns more here) |
| K8 | AC installation / AC replacement | `/air-conditioning/ac-installation`, `/air-conditioning/ac-replacement` | `/air-conditioning/ac-installation` | 977 vs 542 words; already covers replacement | GSC |
| K9 | AC services / air conditioning services | `/air-conditioning`, `/air-conditioning/ac-services` | `/air-conditioning` | Silo root | GSC |
| K10 | HVAC maintenance plan | `/maintenance-plans`, `/maintenance/residential-maintenance-plan`, `/commercial-hvac/commercial-maintenance-plan` | `/maintenance-plans` (residential); commercial page stays separate (B2B) | Covers both plans | GSC |
| K11 | AC repair Orange County | `/air-conditioning/ac-repair` (title says Southern California), `/orange-county-ac-repair` (Ads, hand-written), `/service-areas/orange-county` | `/air-conditioning/ac-repair` | Most links (58), long hand-written copy; Ads page stays as is | GSC |
| K12 | HVAC service Orange County | `/service-areas/orange-county`, `/services` (noindex) | `/service-areas/orange-county` | County hub, 27 links | none |
| K13 | Heating repair {city} / heating repair | 37 city pages (heading says "AC & Heating"), `/heating`, `/heating/furnace-repair` (title mentions heating repair) | `/heating` (generic); city pages for Tier 1 | `/heating/heating-repair` already redirects to `/heating` | GSC |
| K14 | Emergency HVAC service | `/emergency-hvac-service`, `/air-conditioning/emergency-ac-repair` | both (different scope) | Heating + cooling vs AC | none |
| K15 | Mini split installation | `/ductless/mini-split-installation`, `/ductless/ductless-mini-split` (title) | `/ductless/mini-split-installation` | Retitle the hub | none |
| K16 | AC repair {Ads-only city} (143 cities) | `/ac-repair/{city}` only | `/ac-repair/{city}` (protected) | Template copy; the site's only page for these cities. If GSC shows real organic demand for a city, a real page for it is the better long-term owner. | GSC + Ads |

---

## 6. Decisions

Full table: `docs/seo-phase-2/PHASE_2_3_PAGE_DECISIONS.csv` (one row per URL, with the reasoning written out). Each row has a **current action** (KEEP or IMPROVE: what the page should get now) and, where one exists, a **candidate action** (MERGE+301 or NOINDEX) with its **candidate status**. Candidates are proposals for review after data arrives; none is approved.

### 6.1 Rules

| Rule | Applies to | Current action | Candidate (status) |
|---|---|---|---|
| R1 | Homepage, core, legal, blog, calculators, distinct service pages | KEEP | none |
| R2 | Ads pages (generated, 175) | KEEP, unchanged | NOINDEX + sitemap removal (**PROTECTED** until Ads and GSC data are verified; never 301) |
| R3 | Ads pages (hand-written, 6) | KEEP (protected) | none |
| R4 | City hubs (37), county hubs (5 of 6) | IMPROVE (thin); the one page per city | none |
| R5 | `/hvac-repair/{city}` except Yorba Linda (36) | KEEP | MERGE+301 into the city hub (**PAUSED**) |
| R6 | City AC repair / emergency with hand-written content (7) | KEEP | none |
| R7 | City AC repair / emergency, generated (67), every city including Ventura and Santa Barbara counties | IMPROVE (owner-verified local substance) | none |
| R8 | City tune-up / heating repair, Tier 1 (14) | KEEP (Yorba Linda) or IMPROVE | none |
| R9 | City tune-up / heating repair, Tier 2 (60) | KEEP | MERGE+301 into `/air-conditioning/ac-tune-up` or `/heating` (**PAUSED**; content reason, not geography) |
| R10 | Service pages with a stronger same-intent sibling (4), mini-split hub title (1) | KEEP (4), IMPROVE (1) | MERGE+301 (**PAUSED**) for the 4 |
| **G1** | **Every candidate, once data is loaded** | | **WITHDRAWN** (page is improved instead) if GSC shows 1+ click or 100+ impressions in either 90-day period, any external link, or any conversion. Generated Ads page with paid clicks: stays **PROTECTED**. Otherwise **ELIGIBLE FOR REVIEW**, which still needs explicit approval. |

### 6.2 Summary

| Page type | KEEP | IMPROVE | Candidate MERGE+301 (PAUSED) | Candidate NOINDEX (PROTECTED) |
|---|---|---|---|---|
| Homepage, core, legal | 11 | | | |
| Service pages | 25 | 1 | 4 | |
| Blog, calculators, indexes | 15 | | | |
| County hubs | 1 | 5 | | |
| City hubs | | 37 | | |
| City AC repair | 5 | 32 | | |
| City emergency AC repair | 2 | 35 | | |
| City AC tune-up | 31 | 6 | 30 | |
| City heating repair | 31 | 6 | 30 | |
| City HVAC repair | 37 | | 36 | |
| Ads, hand-written | 6 | | | |
| Ads, generated | 175 | | | 175 |
| **Total (461)** | **339** | **122** | **100** | **175** |

Candidates are counted within KEEP: a paused candidate's page keeps its current state. Ventura and Santa Barbara counties: 5 AC repair and 5 emergency pages are IMPROVE, 5 hubs and 2 county hubs are IMPROVE; their tune-up, heating repair and HVAC repair pages carry the same paused content candidates as every other Tier 2 city.

By risk: High 12 (all KEEP: protected pages), Medium 364, Low 85.

### 6.3 Protected pages

- The homepage, `/contact`, `/thank-you` (conversion tracking) and every page with a lead form keep their forms, GTM and phone links in every option.
- The 6 hand-written Ads pages: KEEP, no candidate.
- The 175 generated Ads pages: PROTECTED. Content, layout, tracking, forms, URL, metadata, indexing and sitemap entry stay unchanged until Ads and GSC data are verified and you approve a change.
- Every page in Ventura and Santa Barbara counties: no geographic candidate of any kind.
- Every candidate is subject to G1, so any page with organic traffic, backlinks or conversions is protected automatically once the data is loaded.

---

## 7. www vs non-www: history vs current state

**Current state (measured live today):**

- Canonical host: `https://www.hvacserviceacrepair.com`. Every canonical tag, sitemap URL, structured-data URL and internal link uses it.
- `http://www.hvacserviceacrepair.com/*` reaches the www URL with one 308.
- `https://hvacserviceacrepair.com/*` reaches it with a **307 Temporary Redirect**; `http://hvacserviceacrepair.com/*` with 308 then 307 (all 456 URLs measured).
- No page is served on both hosts. **There is no duplicate-content split.** There is a signal-strength issue: Google treats a long-standing 307 much like a permanent redirect over time, but a 307 explicitly says "the old URL stays", which can keep apex URLs in Google's index or in the non-www GSC property longer than necessary. Switching the Vercel domain redirect to 308 removes the ambiguity at no risk.
- The one remaining duplicate host is the vercel.app alias (section 2.1).

**History (evidence available without GSC):**

- All 11 URLs the Wayback Machine captured (April to August 2025) are on the **apex host without www**: the earlier WordPress site (`/author/`, `/category/`, `/hello-world/` and the old `/about-us/`, `/contact/`, `/services/`).
- So Google's index and any backlinks from that period point at `hvacserviceacrepair.com`. The apex-to-www redirect forwards them today, but as a temporary (307) redirect.

**Can Google still be splitting visibility?** Only GSC can show it. What to check (exports listed in section 8):

1. Whether the account has a **Domain property** (`hvacserviceacrepair.com`, covers both hosts) or two **URL-prefix properties** (`https://hvacserviceacrepair.com/` and `https://www.hvacserviceacrepair.com/`). With two URL-prefix properties, the 2025 history sits in the non-www property and the www property starts later; looking only at www undercounts history. That is a reporting split, not a ranking split.
2. In the non-www property: impressions in the last 90 days. They should fall toward zero as Google consolidates on www. Steady impressions on non-www URLs would mean Google still shows apex URLs, worth an URL Inspection check.
3. Page indexing report in the www property: "Page with redirect" for apex URLs is expected and correct. "Duplicate, Google chose different canonical than user" on www pages would be the real warning sign.
4. Also check the old `/garage-door-repair-los-angeles/` URL for impressions; it is unrelated to HVAC.

---

## 8. Google Search Console: unavailable; required exports

GSC was **not accessible** from this environment. No clicks, impressions, positions, queries or index states appear anywhere in this audit. **The exact file names, header rows, date ranges and export steps are in `docs/seo-phase-2/gsc-input/README.md`**, with header-only templates in `docs/seo-phase-2/gsc-input/templates/`. Put the exports in `docs/seo-phase-2/gsc-input/` (a `.gitignore` there keeps them out of Git) and run:

```
python3 scripts/seo-audit/phase23_decide.py docs/seo-phase-2/phase23-metrics.json docs/seo-phase-2 --inputs docs/seo-phase-2/gsc-input
```

| # | File | Source | Period | Needed for |
|---|---|---|---|---|
| 1 | `gsc_pages_last_90d.csv` | GSC > Performance > Pages tab > Export (`Pages.csv`) | Last 90 days (custom range) | **Required.** Clicks, impressions, position per URL; G1 |
| 2 | `gsc_pages_prev_90d.csv` | same | The 90 days before | **Required.** G1 on the previous period; trend |
| 3 | `gsc_query_page_last_90d.csv` (`query,page,clicks,impressions,ctr,position`) | Search Console API, Looker Studio or Search Analytics for Sheets (the GSC interface cannot export query + page together) | Last 90 days | **Required for the cannibalization test**: which queries show 2+ site URLs |
| 4 | `gsc_links_top_pages.csv` | GSC > Links > Top linked pages > Export | Current | **Required to clear any candidate** (G1 backlink protection) |
| 5 | `ads_landing_pages_last_90d.csv` | Google Ads > Landing pages report > Download | Last 90 days | **Required to clear any Ads page**; plus the list of final URLs of enabled ads |
| 6 | `gsc_queries_last_90d.csv`, `gsc_queries_prev_90d.csv` | GSC > Performance > Queries tab > Export | Both periods | Keyword clusters K1 to K16 |
| 7 | `gsc_query_page_prev_90d.csv` | as file 3 | The 90 days before | Trend of overlap |
| 8 | `gsc_indexing.csv` or folder `gsc_indexing/` | GSC > Indexing > Pages, one export per reason plus the indexed list | Current | Indexed vs excluded pages; "Duplicate, Google chose different canonical" |
| 9 | `gsc_pages_nonwww_last_90d.csv` | As file 1, from the `https://hvacserviceacrepair.com/` URL-prefix property, only if one exists | Last 90 days | Section 7 www vs non-www history |
| 10 | `conversions_by_landing_page_last_90d.csv` | GA4 > Engagement > Landing page > Download, or call tracking | Last 90 days | G1 conversion protection |

Not file-based, but useful: the GSC property type (Domain vs URL-prefix), the Sitemaps report counts, and URL Inspection results (Google-selected canonical, last crawl) for `/`, `/air-conditioning/ac-repair/yorba-linda`, `/ac-repair/yorba-linda`, `/hvac-repair/yorba-linda`, `/service-areas/orange-county/yorba-linda`, `/air-conditioning/ac-maintenance`, `/air-conditioning/ac-tune-up`, `/orange-county-ac-repair`, `/ac-repair/burbank` and `https://hvacserviceacrepair.com/`.

What a run produces: the `N/A (no export)` columns filled in, each candidate moved from PAUSED or PROTECTED to WITHDRAWN, PROTECTED (active Ads) or ELIGIBLE FOR REVIEW, `PHASE_2_3_QUERY_OVERLAP.csv`, and `PHASE_2_3_DATA_STATUS.md` (inputs loaded, warnings such as a 1,000-row export cap, non-www totals, GSC URLs that are no longer site pages). The script was tested against synthetic files in each export layout (GSC interface exports, Google Ads title rows and totals, GA4 comment lines, mixed hosts and trailing slashes); no synthetic data is in the repository.

---

## 9. Implementation plan

See `PHASE_2_3_IMPLEMENTATION_PLAN.md`. Summary:

| Wave | What | Pages | Status | Risk |
|---|---|---|---|---|
| 0 | Collect the exports (section 8); re-run the decision script with them | | **Next step** (owner) | none |
| 1 | Hygiene: apex redirect 307 to 308 (Vercel setting); redirect the vercel.app alias to www; collapse 7 two-hop chains | | Awaiting approval; not GSC-dependent | Low |
| 2 | Generated Ads pages: noindex + sitemap removal candidates | up to 175 | **PROTECTED** until Ads and GSC data are verified | Medium |
| 3 | Service-page consolidation: 4 merge candidates, 1 retitle | 5 | Merges **PAUSED** for GSC; retitle awaiting approval | Medium |
| 4 | City consolidation candidates: 36 HVAC repair pages into hubs; 60 tune-up and heating pages into generic pages | up to 96 | **PAUSED** for GSC | Medium |
| 5 | Content improvement: hubs, AC repair and emergency pages (owner-verified substance) | 122 | Awaiting owner material and approval | Low |
| 6 | Title alignment for K1, K2, K11 | 3 to 5 | Needs GSC query + page data | Medium |

Each wave is a separate pull request, verified on a Vercel preview and again on production, with a rollback. No implementation PR is open.

---

## 10. What this audit did not change

No page, title, H1, URL, canonical, redirect, robots rule, sitemap entry, noindex, form, tracking tag or Ads page was changed. Nothing was merged or deployed, and no implementation PR is open. The audit branch adds only documents, the CSVs, the data-input folder (README, templates, `.gitignore`), the metrics file and two analysis scripts. Phase 2.3 implementation starts only after the data review and your approval.
