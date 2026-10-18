# Phase 2.3: Prioritized Implementation Plan

Companion to `PHASE_2_3_CANNIBALIZATION_AUDIT.md`. **Nothing here has been executed.** Each wave needs your explicit approval and ships as its own pull request, verified on a Vercel preview and again on production with the existing checks (`scripts/verify-preview.mjs`, the live crawl comparison and the Ads-page checks).

Ordering principle: highest SEO value for the lowest risk first; nothing that removes or hides a page happens before the GSC, Ads and owner inputs are in.

---

## Wave 0: Inputs (no site change)

| Input | Who | Why it gates the rest |
|---|---|---|
| GSC exports 1 to 9 (audit section 8) | Owner (GSC access) | Traffic gate G1; keyword clusters K1 to K16; www vs non-www history |
| Google Ads landing-page report, last 90 days | Owner / Ads manager | Confirms which Ads pages are live destinations |
| Conversions by landing page (GA4 or call tracking) | Owner | Protects converting pages |
| Confirm regular service in Ventura and Santa Barbara counties | Owner | Tier 3 decisions |

Then: `python3 scripts/seo-audit/phase23_decide.py <metrics.json> docs/seo-phase-2 gsc_pages.csv` re-generates both CSVs with real clicks and impressions and applies G1. I will report every decision that changed because of the data.

## Wave 1: Host and redirect hygiene (low risk, high certainty)

No GSC needed: these fix measured technical defects and remove no content.

| # | Change | Where | Verification |
|---|---|---|---|
| 1.1 | Apex host redirect: 307 to **308 Permanent** | Vercel project > Domains > `hvacserviceacrepair.com` (redirect to www, choose 308). Settings only. | Trace all 456 apex URLs: one 308 hop to the www URL. `http://apex`: at most 308 then 308. |
| 1.2 | Redirect `hvac-service-ac-repair.vercel.app` to `https://www.hvacserviceacrepair.com` (or remove the alias) | Vercel project > Domains | Alias returns 308 to www |
| 1.3 | Collapse 7 two-hop chains (`/about/`, `/hvac-repair/`, `/hvac-installation/`, `/hvac-cleaning/`, `/heating/heating-repair/`, `/air-conditioning/ac-repair/la-habra/`, `/faq/`) to one hop | `next.config.ts` / `src/lib/config/redirects.ts` | Probe all 135 redirect sources: one hop each |

Rollback: revert the setting or the PR. Expected effect: faster consolidation of the 2025 non-www history; no ranking risk.

## Wave 2: Google Ads template pages (medium risk, largest duplication cluster)

Scope: up to 175 `/ac-repair/{city}` pages (C01), minus any page that G1 protects.

| Step | Detail |
|---|---|
| 2.1 | Remove the generated `/ac-repair/{city}` URLs from `sitemap.ts` |
| 2.2 | Add `robots: { index: false, follow: true }` to their metadata. **No other change**: content, layout, forms, GTM, phone links, URL and canonical stay as they are. |
| 2.3 | Do not touch `robots.txt` (AdsBot must keep crawling them). Never 301 them. |
| 2.4 | The 6 hand-written `/{city}-ac-repair` pages are out of scope (KEEP). |

Order inside the wave: first the 32 pages that duplicate an organic AC repair page (clearest cannibalization), then the 143 Ads-only cities after one more GSC check 4 weeks later.

Verification: live crawl comparison as in Phase 2.2 (only the robots meta and the sitemap change); Ads pages still 200 with form, GTM and phone; Google Ads shows no landing-page disapprovals after 7 days.
Watch: GSC Pages report "Excluded by noindex" rises by the expected number; organic clicks on the organic city AC repair pages over the following 8 weeks.
Rollback: remove the robots metadata and restore the sitemap entries.

## Wave 3: Service-page consolidation (medium risk, 5 pages)

| Source | Action | Destination | Before redirecting |
|---|---|---|---|
| `/air-conditioning/ac-maintenance` | MERGE+301 | `/air-conditioning/ac-tune-up` | Move any maintenance-only FAQ into the tune-up page; swap direction if GSC favours "ac maintenance" here |
| `/air-conditioning/ac-replacement` | MERGE+301 | `/air-conditioning/ac-installation` | Carry the replacement-specific sections |
| `/air-conditioning/ac-services` | MERGE+301 | `/air-conditioning` | Carry the Yorba Linda team section if useful |
| `/maintenance/residential-maintenance-plan` | MERGE+301 | `/maintenance-plans` | Confirm plan details match |
| `/ductless/ductless-mini-split` | IMPROVE (title only) | | New title around the ductless hub (repair and service), leaving installation to `/ductless/mini-split-installation` |

Each merge also: removes the source from `sitemap.ts`, updates nav, footer and "Related Services" links to the destination, and keeps the structured data valid.
Verification: one-hop 301/308 for each source; destination 200; no internal link points at a redirect; standard checks.

## Wave 4: City page consolidation (medium risk, up to 106 pages)

Run only after Wave 2 has settled (4 weeks) and with G1 applied.

| Step | Pages | Action |
|---|---|---|
| 4.1 | 36 `/hvac-repair/{city}` (all but Yorba Linda) | MERGE+301 into `/service-areas/{county}/{city}`; add "HVAC Repair" to the hub title and H1 |
| 4.2 | 30 `/air-conditioning/ac-tune-up/{city}` (Tier 2 and 3) | MERGE+301 into `/air-conditioning/ac-tune-up` |
| 4.3 | 30 `/heating/heating-repair/{city}` (Tier 2 and 3) | MERGE+301 into `/heating` |
| 4.4 | Tier 3 (10 AC repair and emergency pages, 5 hubs, 2 county hubs) | NOINDEX, merge or keep, per the owner's answer |

Mechanics: removing an entry from `CITY_SERVICE_MAP` removes the page from the build, the sitemap and the Phase 2.2 link sections in one place; the redirect goes in `next.config.ts`. Fix the heating city H1 ("AC & Heating Repair") on the Tier 1 pages that stay.
Verification: every source 301s in one hop; every hub and generic page still 200; Phase 2.2 link counts drop by exactly the merged pages; no internal link points at a redirect.
Watch: impressions for "{service} {city}" queries move to the destination within 4 to 8 weeks.

## Wave 5: Content improvement (low risk, ongoing, needs owner material)

| Pages | Priority | What "improve" means |
|---|---|---|
| Yorba Linda hub and the 6 other Tier 1 hubs | 1 | Owner-verified local detail: neighbourhoods served, typical housing stock and systems seen on real jobs, response times from the shop, permit notes, real job photos |
| Tier 1 generated AC repair and emergency pages (Brea, Placentia; emergency Fullerton, Irvine, Orange) | 1 | Same, plus the emergency H1 should contain "Emergency AC Repair" |
| 25 Tier 2 hubs and their AC repair and emergency pages | 2 | Same; if real substance cannot be supplied in the next content cycle, NOINDEX the generated AC repair and emergency pages for that city instead |
| 5 county hubs | 3 | County-level detail |

Do not "uniquify" templates by rewording; only real, verifiable local information changes how these pages are judged. No new coverage, rating or customer claims.

## Wave 6: Title alignment (medium risk, needs GSC query + page data)

| Cluster | Decision rule |
|---|---|
| K1 / K2: homepage vs `/air-conditioning/ac-repair/yorba-linda` | If Google ranks the homepage for "ac repair yorba linda", keep the homepage title. If it ranks the city page, move the homepage title to the company intent ("HVAC Company in Yorba Linda, CA: AC Repair, Heating and Installation"). |
| K11: "AC repair Orange County" | Choose between `/air-conditioning/ac-repair` and `/orange-county-ac-repair` (Ads page, unchanged) by which already earns impressions; then give `/air-conditioning/ac-repair` an "Orange County" title if it is the owner. |
| Laguna Niguel | Same test for `/laguna-niguel-ac-repair` (Ads, hand-written) vs `/air-conditioning/ac-repair/laguna-niguel` |

---

## Success measures (from GSC, compared with the Wave 0 baseline)

- Fewer queries where 2+ site URLs receive impressions (export 4), especially "ac repair {city}" and "hvac repair {city}".
- Higher average position and clicks for the strongest page in each cluster (K1 to K16).
- Indexed pages fall roughly in line with the noindexed and merged count, with no rise in "Crawled, currently not indexed" for the pages that stay.
- Non-www property impressions trend to zero after Wave 1.
- No drop in Ads landing-page approvals or in form and call conversions.
