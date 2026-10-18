# Phase 2.3: Prioritized Implementation Plan

Companion to `PHASE_2_3_CANNIBALIZATION_AUDIT.md`. **Nothing here has been executed, and no implementation PR is open.** Each wave needs your explicit approval and ships as its own pull request, verified on a Vercel preview and again on production with the existing checks (`scripts/verify-preview.mjs`, the live crawl comparison and the Ads-page checks).

Owner decisions (2026-10-18) that govern this plan:

- Ventura County and Santa Barbara County are confirmed service area. No page is merged, noindexed or removed for geographic reasons.
- Every MERGE+301 and NOINDEX candidate is **paused** until real Google Search Console performance data is loaded.
- The 175 generated Google Ads pages are **protected** until their campaign use and organic performance are verified.
- No production changes for now.

---

## Wave 0: Load the data (next step; no site change)

| Input | Who | Gates |
|---|---|---|
| GSC exports, files 1 to 4 (pages both periods, query + page, top linked pages) | Owner (GSC access) | Every MERGE+301 candidate; keyword clusters K1 to K16 |
| Google Ads landing-page report and final URLs of enabled ads (file 5) | Owner / Ads manager | Every candidate on a generated Ads page |
| Recommended: queries, indexing, non-www property, conversions (files 6 to 10) | Owner | Index status, www history, conversion protection |

Exact formats: `docs/seo-phase-2/gsc-input/README.md`. Then:

```
python3 scripts/seo-audit/phase23_decide.py docs/seo-phase-2/phase23-metrics.json docs/seo-phase-2 --inputs docs/seo-phase-2/gsc-input
```

The run fills the data columns, moves each candidate to WITHDRAWN, PROTECTED or ELIGIBLE FOR REVIEW (gate G1), writes the query-overlap table and the data-status report. I will then send you a short review: which candidates survived, which were withdrawn and why, what the query + page data says about each keyword cluster, and the www vs non-www picture. Nothing moves to implementation from that review without your approval.

## Wave 1: Host and redirect hygiene (low risk; not GSC-dependent; awaiting approval)

These fix measured technical defects and remove no content. They can go ahead independently of the GSC data whenever you approve them.

| # | Change | Where | Verification |
|---|---|---|---|
| 1.1 | Apex host redirect: 307 to **308 Permanent** | Vercel project > Domains > `hvacserviceacrepair.com` (redirect to www, choose 308). Settings only. | Trace all 456 apex URLs: one 308 hop to the www URL. `http://apex`: at most 308 then 308. |
| 1.2 | Redirect `hvac-service-ac-repair.vercel.app` to `https://www.hvacserviceacrepair.com` (or remove the alias) | Vercel project > Domains | Alias returns 308 to www |
| 1.3 | Collapse 7 two-hop chains (`/about/`, `/hvac-repair/`, `/hvac-installation/`, `/hvac-cleaning/`, `/heating/heating-repair/`, `/air-conditioning/ac-repair/la-habra/`, `/faq/`) to one hop | `next.config.ts` / `src/lib/config/redirects.ts` | Probe all 135 redirect sources: one hop each |

Rollback: revert the setting or the PR.

## Wave 2: Generated Google Ads pages (PROTECTED)

Scope: candidates on up to 175 `/ac-repair/{city}` pages. **No action** until both the Ads report and GSC data are loaded and reviewed. After that, only pages marked ELIGIBLE FOR REVIEW are considered, and only with your approval:

| Step | Detail |
|---|---|
| 2.1 | Confirm the page is not the final URL of any enabled ad, and that the Ads manager agrees |
| 2.2 | Remove the URL from `sitemap.ts` and add `robots: { index: false, follow: true }` to its metadata. **No other change**: content, layout, forms, GTM, phone links, URL and canonical stay as they are |
| 2.3 | Never touch `robots.txt` for these pages (AdsBot must crawl them) and never redirect them |

Pages with paid clicks stay protected; pages with organic visibility are withdrawn by G1 and stay indexable. A city whose Ads page shows real organic demand is a candidate for a proper organic page instead.

## Wave 3: Service pages (merges PAUSED)

| Page | Candidate | Destination | Status |
|---|---|---|---|
| `/air-conditioning/ac-maintenance` | MERGE+301 | `/air-conditioning/ac-tune-up` | PAUSED (direction swaps if GSC favours "ac maintenance" here) |
| `/air-conditioning/ac-replacement` | MERGE+301 | `/air-conditioning/ac-installation` | PAUSED |
| `/air-conditioning/ac-services` | MERGE+301 | `/air-conditioning` | PAUSED |
| `/maintenance/residential-maintenance-plan` | MERGE+301 | `/maintenance-plans` | PAUSED |
| `/ductless/ductless-mini-split` | IMPROVE (title only) | | Awaiting approval; not a merge |

If a merge is later approved: move unique sections into the destination first, remove the source from `sitemap.ts`, update nav, footer and "Related Services" links, add a one-hop redirect, and verify no internal link points at a redirect.

## Wave 4: City pages (PAUSED)

| Candidates | Pages | Destination |
|---|---|---|
| `/hvac-repair/{city}` (all but Yorba Linda) | 36 | The city hub, whose title would gain "HVAC Repair" |
| `/air-conditioning/ac-tune-up/{city}` (Tier 2) | 30 | `/air-conditioning/ac-tune-up` |
| `/heating/heating-repair/{city}` (Tier 2) | 30 | `/heating` |

The reason for these candidates is content (100% template sentences, city name swapped in), not geography. Ventura and Santa Barbara county pages are treated exactly like every other Tier 2 city. Only candidates that pass G1 on real data come back for review. If any are approved later: removing an entry from `CITY_SERVICE_MAP` removes the page from the build, the sitemap and the Phase 2.2 link sections in one place; the redirect goes in `next.config.ts`.

## Wave 5: Content improvement (low risk; needs owner material)

| Pages | Priority | What "improve" means |
|---|---|---|
| Yorba Linda hub and the 6 other Tier 1 hubs | 1 | Owner-verified local detail: neighbourhoods served, typical housing stock and systems seen on real jobs, response times, permit notes, real job photos |
| Tier 1 generated AC repair and emergency pages (Brea, Placentia; emergency Fullerton, Irvine, Orange) | 1 | Same, plus the emergency H1 should contain "Emergency AC Repair" |
| 30 Tier 2 hubs and their AC repair and emergency pages, Ventura and Santa Barbara counties included | 2 | Same |
| 5 county hubs | 3 | County-level detail |

Do not "uniquify" templates by rewording; only real, verifiable local information changes how these pages are judged. No new coverage, rating or customer claims.

## Wave 6: Title alignment (needs GSC query + page data)

| Cluster | Decision rule |
|---|---|
| K1 / K2: homepage vs `/air-conditioning/ac-repair/yorba-linda` | If Google ranks the homepage for "ac repair yorba linda", keep the homepage title. If it ranks the city page, move the homepage title to the company intent ("HVAC Company in Yorba Linda, CA: AC Repair, Heating and Installation"). |
| K11: "AC repair Orange County" | Choose between `/air-conditioning/ac-repair` and `/orange-county-ac-repair` (Ads page, unchanged) by which already earns impressions. |
| Laguna Niguel | Same test for `/laguna-niguel-ac-repair` (Ads, hand-written) vs `/air-conditioning/ac-repair/laguna-niguel`. |

---

## Success measures (from GSC, against the Wave 0 baseline)

- Fewer queries where 2+ site URLs receive impressions (`PHASE_2_3_QUERY_OVERLAP.csv`), especially "ac repair {city}" and "hvac repair {city}".
- Higher average position and clicks for the strongest page in each cluster (K1 to K16).
- Non-www impressions trend to zero after Wave 1.
- No drop in Ads landing-page approvals or in form and call conversions.
