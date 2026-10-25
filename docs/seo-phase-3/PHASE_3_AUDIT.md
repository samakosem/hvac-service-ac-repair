# SEO Phase 3: Indexation, Metadata and Schema Audit

Branch `seo/phase-3-indexation-performance`, based on `main` at `351a119` (PR #6 merged). Audit date 2026-10-25.

## Data used

| Source | Status |
|---|---|
| Local production build, crawl of all 456 sitemap URLs (`scripts/seo-audit/extract.py` + `audit` pass) | Done |
| Live production (GitHub Actions run 40146782731, read-only) | Done: 456/456 sitemap URLs 200; apex 308 to www; 10/10 checks of `scripts/verify-preview.mjs` |
| GSC | **Partial only**: the 22-row sample from Phase 2.3 (`PHASE_2_3_GSC_REVIEW.md`, period 2026-07-18 to 2026-10-15). No full page, query, coverage, links or URL Inspection export. Pages missing from the sample are **unknown, not zero**. |
| Backlinks, Google Ads landing-page and conversion data, GA4 | Not available |

No traffic, ranking or index figure in this report comes from anywhere other than the GSC sample above.

## A. Indexation

| Check | Result |
|---|---|
| robots.txt | `Allow: /`, `Disallow: /api/`, correct Sitemap line. OK |
| Sitemap | 456 URLs, all 200, all `index, follow`, no duplicates. **Issue: every URL had `lastmod` = build time**, so it changes on each deploy without content changes (fixed) |
| Canonicals | 456/456 self-referencing, slashless, www. Query parameters (`?gclid=`, `?utm_`) keep the clean canonical |
| noindex | Only `/thank-you` (noindex, nofollow) and `/services` (noindex, follow). Neither is in the sitemap |
| 404 / soft 404 | Unknown paths, unknown city slugs and uppercase slugs return a real 404 (`dynamicParams = false`); no soft-404 pattern found |
| Redirects | 135 sources traced: every slashless source is one 308 to a 200. Only 2-hop cases are the 7 trailing-slash variants (`/about/`, `/hvac-repair/`...), where Next.js strips the slash before the custom redirect (known T16, harmless) |
| Duplicate URLs | Apex now 308 (was 307). No duplicate titles, descriptions or H1s across 456 pages |
| Orphans | All 175 `/ac-repair/[city]` and 6 `/{city}-ac-repair` Ads pages have 0 internal links (by design). Every other page has contextual links; `/about-us`, `/reviews`, `/careers` only have header/footer links |
| Thin / template content | City x service families remain 61 to 76% template-identical (Phase 1 measurement); not re-litigated here |

### PPC landing pages (175): classification

Full list with reasons: `docs/seo-phase-3/ppc-page-classification.csv`. **No page was noindexed.**

| Class | Count | Basis |
|---|---|---|
| 1. Keep indexable | 4 | Organic impressions in the GSC sample: Bellflower (1 click, 1,832 impr, pos 20.3), Lynwood (853, 16.1), Perris (837, 23.9), Riverside (1 click, 150, 24.7) |
| 2. Improve or consolidate | 32 | The city also has an organic page `/air-conditioning/ac-repair/{city}` with the same intent (20 in Orange County). Consolidate (noindex, or canonical to the organic page) only after the GSC query + page export shows which URL Google prefers |
| 3. Recommend noindex (gated) | 139 | No organic counterpart, no GSC row, 0 internal links, ~75% template overlap. Noindex only after the full GSC pages export shows no clicks or impressions, GSC links shows no backlinks, and Ads data confirms which pages campaigns use |

The 6 hand-written `/{city}-ac-repair` pages stay as they are; same gate.

## B. Search performance (GSC sample only)

- Sample totals (page rows returned, not property totals): 37 clicks / 22,078 impressions / CTR 0.17% / avg pos 30.2, vs 39 / 30,500 / 0.13% / 39.1 the previous period.
- Homepage owns `ac repair yorba linda ca` (pos 1.2, apex URL); title kept unchanged.
- High-impression, zero/low-click pages: the OC city hubs (handled in PR #4/#6), `/service-areas/orange-county` (323 impr, pos 40.2), `/about-us` (687, 40.7), `/air-conditioning/emergency-ac-repair` (509, 36.1), `/maintenance/residential-maintenance-plan` (745, 67.3), `/calculators/ac-size-calculator` (3 clicks, 577, 27.9), `/calculators/seer2-savings-calculator` (317, 55.7), `/heating/furnace-repair` (218, 49.7).
- Not answerable without full exports: keywords in positions 4 to 15, pages with declining clicks, cannibalization beyond two queries, index coverage.

## C. Metadata

| Family | Pages | Median title (with brand) | Titles > 60 | Descriptions > 160 |
|---|---|---|---|---|
| City x service (5 families) | 185 | 80 to 100 | 185 | 0 |
| Ads `/ac-repair/[city]` | 175 | 88 | 175 | 173 |
| Service pages | 22 | 88 | 22 | 9 |
| County hubs | 6 | 94 | 6 | 4 |
| City hubs | 37 | 62 | 27 | 0 |
| Blog / calculators | 14 | 76 to 80 | 13 | 12 |
| Homepage | 1 | 52 | 0 | 0 |

- City x service titles carry the phone number and a slogan (e.g. `Local HVAC Repair in Yorba Linda, CA | Your Neighborhood HVAC Team | (714) 410-2784 | HVAC Service & AC Repair`, 110 chars). Shortening them is a template change across 185 pages with no GSC evidence for those pages yet: **documented, not changed** (R7).
- Several service titles said "Southern California" while their description and page targeted Orange County.
- 5 core pages (`/contact`, `/reviews`, `/financing`, `/maintenance-plans`, `/careers`) had no `og:url`, `og:image` or Twitter card because they bypassed `buildMetadata()` (fixed).
- H1: exactly one per page, no duplicates. Canonicals: correct (above).

## D. Internal linking

- Hub and city structure from Phase 2.2 holds: city x service pages median 9 contextual inlinks, city hubs 10, service pages 7.5, blog 4.
- Opportunities (not implemented, low priority): one contextual link to `/about-us` from a relevant body section (687 impressions, only nav/footer links today); `/reviews` likewise. Avoid adding more sitewide links.
- Ads pages: intentionally unlinked; linking them would strengthen the doorway pattern.

## E. Structured data

- 1,809 JSON-LD blocks parse; all URLs inside resolve to 200 (production run).
- One business entity `HVACBusiness` (`/#hvacbusiness`) on `/`, `/service-areas`, `/about-us`; `Service.provider` references it. `WebSite` on every page. `BreadcrumbList` on every page.
- **Issue: `/promotions` emitted two BreadcrumbLists** (page-level plus `<Breadcrumbs>`) (fixed).
- `FAQPage` on 448 pages, always matching visible FAQs. Google shows FAQ rich results only for authoritative government and health sites, so this markup brings no SERP feature here; it is valid and harmless, so it is left in place.
- No ratings, reviews, licenses or addresses are declared beyond owner-confirmed data.

## Changes implemented

| File | Change |
|---|---|
| `src/app/sitemap.ts` | Removed the build-time `lastModified` from every entry |
| `src/app/{contact,reviews,financing,maintenance-plans,careers}/page.tsx` | Use `buildMetadata()`: adds `og:url`, `og:image`, Twitter card and explicit robots. Rendered titles and descriptions unchanged |
| `src/app/promotions/page.tsx` | Removed the duplicate BreadcrumbList |
| `src/app/air-conditioning/ac-repair/page.tsx`, `src/lib/content/services.ts`, `src/lib/content/locations.ts`, `src/app/about-us/page.tsx`, `src/app/calculators/{ac-size,seer2-savings}-calculator/page.tsx` | Titles (and over-length descriptions) for the 8 GSC-evidenced pages: scope matches page copy (Orange County), phone number and em dashes removed, rendered length 60 to 70 chars. Homepage untouched |

## Validation

| Check | Result |
|---|---|
| `tsc --noEmit` | pass |
| `eslint .` | pass, 0 warnings |
| `next build` | pass, all routes static/SSG |
| Local crawl | 456/456 sitemap URLs 200; 0 canonical mismatches; 456 `index, follow`; 0 missing OG; 0 duplicate schema types; 0 `lastmod` |
| Before/after diff of title, description, H1, word count for all 456 pages | Only the 8 intended pages changed |
| `scripts/verify-preview.mjs` on the local build | 9/9 pass (check 10 needs production) |

## Needs GSC evidence (or owner input)

1. Full GSC **pages** export, both 90-day periods: gates every class 2 and 3 PPC decision and R5 (thin city x service families).
2. GSC **query + page** export: cannibalization (e.g. `/ac-repair/{city}` vs `/air-conditioning/ac-repair/{city}`), positions 4 to 15.
3. GSC **coverage / Pages** report and **links** report.
4. Google Ads final URLs and conversions by landing page.
5. Make `/services` indexable (R6): linked sitewide, currently noindex; low risk but an indexing decision left for approval.

## Recommended next priorities

1. Load the full GSC exports and re-run `phase23_decide.py --evidence` to finalize the PPC classes.
2. After 4 to 6 weeks, compare CTR for the 8 retitled pages.
3. If CTR improves, apply the same pattern to the city x service title template (R7), starting with Orange County.
4. Owner-verified local content for the hubs closest to page 1 (Placentia 25.8, Costa Mesa 24.3, Yorba Linda 24.8).
5. Decide R6 (`/services` indexable).
