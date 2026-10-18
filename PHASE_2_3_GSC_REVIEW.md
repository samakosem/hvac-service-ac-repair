# Phase 2.3: GSC Data Review and SEO Prioritization

Site: https://www.hvacserviceacrepair.com/
Repository: `samakosem/hvac-service-ac-repair`, `main` at `a28afa8` (production). Branch `seo/phase-2-3-cannibalization-audit`.
Review date: 2026-10-18
Status: **audit and planning only.** No redirect, noindex, merge, deletion, code change or deployment. Every action below needs your approval.

---

## 1. The data received, and what it can and cannot support

Source: Search Console domain property `sc-domain:hvacserviceacrepair.com`, Web, final data, supplied by the owner as `HVAC_Phase23_Reports.zip`:

| File | Content |
|---|---|
| `HVAC_GSC_priority_pages_sample.csv` | **22 page rows**: 19 for the current period (2026-07-18 to 2026-10-15), 3 for the previous period (2026-04-19 to 2026-07-17). Kept in the repository as `docs/seo-phase-2/gsc-evidence/2026-10-18_gsc_priority_pages_partial.csv`. |
| `HVAC_Phase23_GSC_Initial_Findings.md` (and identical `.txt`) | Period summaries and two query-level observations |

Period summaries, as reported (sums of the returned page rows, not property totals):

| | Current (Jul 18 to Oct 15) | Previous (Apr 19 to Jul 17) |
|---|---|---|
| Clicks | 37 | 39 |
| Impressions | 22,078 | 30,500 |
| CTR | 0.17% | 0.13% |
| Average position | 30.2 | 39.1 |
| Page URL rows | 315 | 524 |

**How this data is used:**

- It is a **partial** sample. Only the 22 listed rows were loaded, as *protective* evidence: a listed page with 1+ click or 100+ impressions has any MERGE+301 or NOINDEX candidate withdrawn and is flagged IMPROVE. **No page missing from the sample is treated as zero.** Its full-export columns stay `N/A (no export)` and its candidate stays PAUSED or PROTECTED.
- The summaries are context only. The 28% impressions drop and the better average position cannot be explained without full page and query exports: the lower average can come from losing low-ranking impressions (a mix shift), not from ranking better for the same queries.
- The previous period returned 524 page rows, more than the 461 URLs the site has today. Those extra rows are apex-host duplicates and older URLs, which fits section 2. Page rows are not an index count.

---

## 2. Two different problems: host duplication vs keyword cannibalization

### 2.1 Host duplication (www vs non-www): confirmed by the evidence

| Page | Host | Period | Clicks | Impressions | Position |
|---|---|---|---|---|---|
| `/` | **apex** | current | 14 | 4,570 | 5.6 |
| `/` | www | current | 3 | 1,903 | 56.1 |
| `/` | **apex** | previous | 21 | 6,548 | 11.2 |
| `/service-areas/orange-county/villa-park` | **apex** | current | 0 | 1,380 | 56.8 |
| `/service-areas/orange-county/orange` | **apex** | current | 0 | 1,065 | 49.4 |
| `/heating/furnace-repair` | **apex** | current | 0 | 218 | 49.7 |
| `/about-us` | apex (previous) then www (current) | both | 1 then 0 | 927 then 687 | 48.3 then 40.7 |
| `/calculators/ac-size-calculator` | apex (previous) then www (current) | both | 2 then 3 | 776 then 577 | 43 then 27.9 |

What this shows:

- In a Domain property, GSC reports the URL Google actually showed. In the **current** period Google still shows apex (`https://hvacserviceacrepair.com/...`) URLs for the homepage and at least three other pages, even though every apex URL redirects to www. Google has not finished moving those pages to www.
- The homepage's best performance is on the apex URL: 14 of the 17 homepage clicks, position 5.6. The www homepage shows at position 56.1, very likely for different queries; only the query + page export can tell.
- Some pages have already moved: `/about-us` and the AC size calculator were apex in the previous period and www in the current one.
- **This is not keyword cannibalization.** It is one page split across two hosts. The fix is technical (section 5), not merging, redirecting or noindexing pages.
- Most likely contributing cause: the apex host answers with a **307 Temporary Redirect** (re-confirmed live today, section 5). A temporary redirect tells Google the apex URL is still the real one, which matches Google continuing to show apex URLs. Not proven: URL Inspection of `https://www.hvacserviceacrepair.com/` (Google-selected canonical) is needed to confirm.

### 2.2 Keyword cannibalization: limited evidence, no harmful case found yet

| Query | Pages with impressions (from the findings note) | Reading |
|---|---|---|
| `ac repair yorba linda ca` | apex homepage: 243 impressions, position **1.2**; www `/about-us`: 59 impressions, position 29.2 | The homepage clearly owns this query. `/about-us` appearing far below is normal and harmless. **Resolves cluster K1 for this query: keep the homepage title as it is.** `/air-conditioning/ac-repair/yorba-linda` is not in the evidence: unknown, not zero. |
| `emergency ac repair` | `/air-conditioning/emergency-ac-repair`: 96 of 127 query-page impressions; the other 31 not identified | The generic emergency page is Google's choice. Protect it. Which pages hold the other 31 needs the query + page export. |

There is not enough data to call any other overlap real cannibalization. Every MERGE+301 candidate based on overlap therefore stays **PAUSED** until the query + page export is loaded.

---

## 3. Changes to the Phase 2.3 recommendations

Re-run with the evidence (`phase23_decide.py --evidence ...`). Totals: current actions KEEP 332, IMPROVE 129; candidates: 5 WITHDRAWN, 99 MERGE+301 still PAUSED, 171 Ads NOINDEX still PROTECTED.

| Page | Evidence (current period unless noted) | Before | After |
|---|---|---|---|
| `/maintenance/residential-maintenance-plan` | 745 impressions, 0 clicks, position 67.3 | MERGE+301 candidate (PAUSED) | **Candidate withdrawn. IMPROVE.** It is visible; merging it would discard that visibility. Improve its title, description and content against `/maintenance-plans`. |
| `/ac-repair/bellflower` (Ads) | 1 click, 1,832 impressions, position 20.3 | NOINDEX candidate (PROTECTED) | **Candidate withdrawn.** Stays indexable, unchanged and protected as an Ads page. |
| `/ac-repair/lynwood` (Ads) | 853 impressions, position 16.1 | NOINDEX candidate (PROTECTED) | **Candidate withdrawn.** As above. |
| `/ac-repair/perris` (Ads) | 837 impressions, position 23.9 | NOINDEX candidate (PROTECTED) | **Candidate withdrawn.** As above. |
| `/ac-repair/riverside` (Ads) | 1 click, 150 impressions, position 24.7 | NOINDEX candidate (PROTECTED) | **Candidate withdrawn.** As above. |
| `/service-areas/orange-county/villa-park` | 1,380 impressions (apex), position 56.8 | IMPROVE | IMPROVE, priority raised to 3 |
| `/service-areas/orange-county/placentia` | 1,216 impressions, position 25.8 | IMPROVE | IMPROVE, priority 3 |
| `/service-areas/orange-county/orange` | 1,065 impressions (apex), position 49.4 | IMPROVE | IMPROVE, priority 3 |
| `/service-areas/orange-county/costa-mesa` | 852 impressions, position 24.3 | IMPROVE | IMPROVE, priority 3 |
| `/service-areas/orange-county/yorba-linda` | 258 impressions, position 24.8 | IMPROVE | IMPROVE, priority 3 |
| `/service-areas/orange-county/anaheim-hills` | 177 impressions, position 34.3 | IMPROVE | IMPROVE, priority 2 |
| `/service-areas/orange-county` | 323 impressions, position 40.2 | KEEP | **IMPROVE**, priority 2 |
| `/about-us` | 687 impressions, position 40.7 | KEEP | **IMPROVE**, priority 3 |
| `/calculators/ac-size-calculator` | 3 clicks, 577 impressions, position 27.9 | KEEP | **IMPROVE**, priority 3 |
| `/air-conditioning/emergency-ac-repair` | 509 impressions, position 36.1; leads `emergency ac repair` | KEEP | **IMPROVE**, priority 3; protected |
| `/calculators/seer2-savings-calculator` | 317 impressions, position 55.7 | KEEP | **IMPROVE**, priority 2 |
| `/heating/furnace-repair` | 218 impressions (apex), position 49.7 | KEEP | **IMPROVE**, priority 2 |
| `/` (homepage) | apex 14 clicks / 4,570 / 5.6; www 3 / 1,903 / 56.1 | KEEP | **KEEP, protected.** Title stays (it ranks 1.2 for `ac repair yorba linda ca`). Fix the host split (section 5), not the page. |

Unchanged:

- Ventura County and Santa Barbara County: confirmed service area; no geographic candidate anywhere.
- The other 171 generated Ads pages: PROTECTED. All 175 stay protected until Ads campaign use and conversions are verified; the 4 above are additionally cleared of the noindex idea by organic evidence.
- The other 99 MERGE+301 candidates: PAUSED. None of them appears in the sample, which means "no data", not "no traffic".

---

## 4. Prioritized action plan (for approval)

| Priority | Action | Evidence | Needs before doing it | Risk |
|---|---|---|---|---|
| **P0** | Change the apex domain redirect from 307 to **308** in Vercel (section 5). Settings only: no code, no DNS, no deploy. | Live 307 on every apex URL (re-checked today); Google still shows apex URLs for the homepage and 3 other pages in the current period | Your approval | Low. Brief fluctuation possible while Google moves apex signals to www. |
| **P1** | Titles and meta descriptions for the high-impression, zero-click pages: the 6 Orange County hubs, `/service-areas/orange-county`, `/about-us`, `/air-conditioning/emergency-ac-repair`, `/maintenance/residential-maintenance-plan`, the two calculators, `/heating/furnace-repair` | 0.17% CTR; these 13 pages have 177 to 1,380 impressions and 0 to 3 clicks | Your approval of the copy; no claims beyond verified facts; no em dashes | Low |
| **P1** | Content depth for the visible hubs: Placentia (25.8), Costa Mesa (24.3), Yorba Linda (24.8) sit on pages 2 to 3, the closest to page 1; Villa Park (56.8) and Orange (49.4) also need the host fix | Positions above | Owner-verified local detail (jobs, neighbourhoods, response times) | Low |
| **P2** | Redirect the public `hvac-service-ac-repair.vercel.app` alias to www (section 5.3) | Serves 200 `index, follow`; canonical, robots.txt and sitemap all point to www | Approval; a small code PR | Low |
| **P2** | Collapse the 7 two-hop redirect chains | Live probe | Approval | Low |
| **P3** | Ads pages with organic visibility (Bellflower, Lynwood, Perris, Riverside): no change. Later option: genuine organic pages for those cities, if the owner confirms service there and the data supports it. | 150 to 1,832 impressions at positions 16 to 25 | Google Ads landing-page and conversion data; full GSC; owner decision | n/a |
| **Hold** | All other MERGE+301 (99) and NOINDEX (171) candidates | No data yet | Full exports (section 6) | n/a |

Pages that still need full GSC data before any decision: 443 of the 461 URLs have no row in the sample, including all 37 `/hvac-repair/{city}`, 37 city tune-up, 37 city heating repair, 37 city AC repair and 37 emergency pages, and 171 of the 175 generated Ads pages.

---

## 5. Apex 307 redirect and public Vercel subdomain

### 5.1 What was measured (live, GitHub Actions run 39167049248, 2026-10-18)

| Request | Response |
|---|---|
| `https://hvacserviceacrepair.com/` | **`HTTP/2 307`**, `location: https://www.hvacserviceacrepair.com/`, `server: Vercel` |
| `https://hvacserviceacrepair.com/service-areas/orange-county/villa-park` | **307** to the same path on www |
| `https://hvacserviceacrepair.com/sitemap.xml` | **307** to www |
| `http://hvacserviceacrepair.com/` | 308 to `https://hvacserviceacrepair.com/`, then **307** to www (2 hops) |
| `http://www.hvacserviceacrepair.com/` | 308 to https www (1 hop) |
| `https://www.hvacserviceacrepair.com/` | 200 |
| `https://hvac-service-ac-repair.vercel.app/` | **200**, no `X-Robots-Tag` |
| vercel.app alias page `/service-areas/orange-county/villa-park` | canonical `https://www.hvacserviceacrepair.com/service-areas/orange-county/villa-park`, `index, follow` |
| vercel.app `robots.txt` / `sitemap.xml` | Sitemap line and every `<loc>` point to `https://www.hvacserviceacrepair.com` |
| DNS | `www` is a CNAME to Vercel DNS; both hosts are served by Vercel |

The earlier full probe (all 456 sitemap URLs, run 39143305028) gave the same result for every URL.

**Why it is a 307:** the redirect is answered by Vercel's domain configuration (the apex domain is set to "redirect to www" in the project's Domains settings), before the request reaches Next.js. The permanent host rule in `next.config.ts` never runs for the apex. Vercel's domain redirect status is a setting, and it is currently 307 (temporary).

### 5.2 Safest fix for the apex (recommended, not implemented)

1. Vercel dashboard > project `hvac-service-ac-repair` > **Settings > Domains**.
2. Find the row `hvacserviceacrepair.com` ("Redirects to www.hvacserviceacrepair.com", 307). Click **Edit**.
3. Keep the redirect target `www.hvacserviceacrepair.com`; change the status code to **308 Permanent Redirect**. Save.

Why this is the safest option:

- It changes only the redirect status code. The target, DNS records, SSL certificates, the www production domain and the code all stay as they are. Nothing is deployed.
- It takes effect at Vercel's edge in minutes and is reversible in seconds (set it back to 307).
- Not recommended: detaching the apex redirect and relying on the `next.config.ts` rule. That changes how the apex domain is attached to the project, needs a deployment and adds a window for errors, for the same result.

Expected result: `https://apex/...` gives one 308 to www. `http://apex/...` gives 308 to https apex, then 308 to www. Vercel always upgrades http first; two permanent hops are fine.

**How to verify:**

1. Immediately: `curl -sI https://hvacserviceacrepair.com/` shows `HTTP/2 308` and `location: https://www.hvacserviceacrepair.com/`. Repeat for a deep URL, e.g. `/service-areas/orange-county/villa-park`.
2. Same day: re-run the existing read-only probe workflow (`seo-phase23-audit-probe.yml`). Expect `apex_https 308>200` for all 456 sitemap URLs and `apex_http 308>308>200`.
3. GSC URL Inspection: inspect `https://hvacserviceacrepair.com/`, run **Test live URL** (expect "Page with redirect" to www), then **Request indexing** for `https://www.hvacserviceacrepair.com/`. Inspect the www homepage and note the "Google-selected canonical" before and after.
4. Over 2 to 8 weeks in GSC Performance (Domain property), filter Page by "contains `://hvacserviceacrepair.com`": apex rows should fall and the matching www rows rise. Watch the query `ac repair yorba linda ca` (currently 1.2 on the apex URL) to confirm the position carries over to www.

### 5.3 Public vercel.app alias (lower priority)

The alias serves a full copy of the site, but every page's canonical, the robots.txt Sitemap line and every sitemap URL point to www, so Google should treat it as a duplicate of the www site. It is not covered by the Domain property, so GSC cannot show it. It is a clean-up, not an emergency.

Options, safest first:

1. **Host redirect in code (recommended, separate small PR when approved):** add a rule to `next.config.ts` matching only the exact host `hvac-service-ac-repair.vercel.app` and 308-redirecting `/:path*` to `https://www.hvacserviceacrepair.com/:path*`, the same pattern as the existing apex rule. The exact-host match leaves per-deployment preview URLs (`hvac-service-ac-repair-<hash>-...vercel.app`) untouched, so Vercel previews and the verification workflows keep working.
2. **Vercel Domains setting:** if `hvac-service-ac-repair.vercel.app` appears in Settings > Domains with a redirect option, it can be redirected to www with 308 there instead. Check this in the dashboard first; availability for `*.vercel.app` domains is not confirmed here.
3. Not recommended: turning on Deployment Protection for production. It can block crawlers and integrations and does not target only this alias.

Verify: `curl -sI https://hvac-service-ac-repair.vercel.app/` shows 308 to www; a preview deployment URL still loads; the www site is unaffected.

---

## 6. Datasets still missing

Formats and steps: `docs/seo-phase-2/gsc-input/README.md`.

| Dataset | Status | Blocks |
|---|---|---|
| GSC **pages, full export**, both periods (`gsc_pages_last_90d.csv`, `gsc_pages_prev_90d.csv`); API export preferred to avoid the 1,000-row interface cap | **Missing** (only 22 rows received) | Every remaining MERGE+301 candidate; complete picture of the impressions drop |
| GSC **query + page**, both periods (`gsc_query_page_*.csv`) | **Missing** (two queries summarised) | Real cannibalization test; K1 to K16 beyond the two queries above |
| GSC **queries**, both periods | **Missing** | Query-level trend; why impressions fell 28% |
| GSC **index coverage** (per-reason exports or `gsc_indexing.csv`) and the **Sitemaps** report | **Missing** | Indexed vs excluded pages; "Duplicate, Google chose different canonical" |
| GSC **URL Inspection**: `https://hvacserviceacrepair.com/`, `https://www.hvacserviceacrepair.com/`, `/service-areas/orange-county/villa-park` and `/service-areas/orange-county/orange` on both hosts, plus the 10 URLs in the audit section 8 | **Missing** | Confirms which host Google selects as canonical |
| GSC **links** (`gsc_links_top_pages.csv`) | **Missing** | G1 backlink protection; no candidate can be cleared without it |
| **Backlinks** beyond GSC (optional: a third-party tool's referring domains, especially links pointing at apex URLs) | **Missing** | Fuller backlink protection and the apex history |
| **Google Ads**: landing-page report for 90 days, list of final URLs of enabled ads, conversions by landing page | **Missing** | Any change to the 175 generated Ads pages |
| **Organic conversions** by landing page (GA4 key events or call tracking) | **Missing** | G1 conversion protection; prioritising IMPROVE work |

---

## 7. What was not changed

No redirect, noindex, merge, deletion, page content, title, canonical, robots rule, sitemap entry, Vercel setting, DNS record or code was changed; nothing was merged or deployed. This review adds documents and a protective evidence mode to the decision script on the audit branch. The live checks were read-only requests from a GitHub Actions runner.
