# Phase 2.1: Testimonial Authenticity Fix

Branch: `seo/phase-2-content-audit` (not merged, not deployed)
Date: 2026-10-18
Scope: approved item only. Unverified testimonials removed from the rendered site. No other trust claim, URL, metadata, canonical, redirect, indexing rule, form, phone link or tracking tag was changed.

## Result

| | Before | After |
|---|---|---|
| Testimonial cards in rendered HTML (all 456 sitemap pages) | 1,123 | **0** |
| Pages showing testimonials | 368 | **0** |
| Reviews in the client-side JavaScript bundle | 18 | **0** |
| Testimonial or Review structured data | none | none |
| Sitemap URLs returning 200 | 456 | 456 |

What was removed from display:

| Source | Cards | Pages | Kind |
|---|---|---|---|
| `ppc-city-generator.ts` `reviews()` | 525 | 175 `/ac-repair/[city]` (Google Ads) | Generated: 3 texts, names rotated by slug length, city swapped in |
| `city-service-generator.ts` `reviews()` | 525 | 175 generated city × service pages | Generated: texts reused per service, city swapped in, fixed 2024 to 2025 dates |
| `city-service-pages.ts` (hand-written) | 30 | 10 city × service pages | Unsourced (e.g. "Sarah K., Weir Canyon, June 2025") |
| `ppc-cities.ts` (hand-written) | 18 | 6 `/[city]-ac-repair` pages | Unsourced |
| `/air-conditioning/ac-repair` page | 3 | 1 | Unsourced |
| Homepage "Customer Experience Highlights" | 4 | 1 | Unsourced "customers consistently mention..." quotes with 5 stars |
| Homepage Google reviews carousel | 18 | 1 | Copied from Google on 2026-07-13, not yet matched to source reviews (14 `unconfirmed`, 4 `flagged`) |
| **Total** | **1,123** | **368** | 91 distinct generated or unsourced testimonials + 4 highlight quotes + 18 Google reviews |

The generated and hand-written testimonial **data** was deleted from the code, not just hidden. The 18 Google reviews stay in `src/lib/content/reviews.ts` because they may be genuine; they are hidden until verified.

## Files changed

| File | Change |
|---|---|
| `src/components/ui/QuickChecks.tsx` | **New.** General homeowner checklists (3 cards) per service: AC repair, emergency AC, AC tune-up, heating repair, HVAC repair. Standard safety and troubleshooting advice only; no claims about the business, no names, ratings or cities. |
| `src/components/city-service/CityServicePageTemplate.tsx` | Testimonial cards replaced by the checklist matching the page's service. Same section, background, grid and position. |
| `src/components/ppc/PPCLandingTemplate.tsx` | Same, dark variant, AC repair checklist. Layout unchanged. |
| `src/app/air-conditioning/ac-repair/page.tsx` | Same; removed the 3 hard-coded testimonials. |
| `src/lib/config/city-service-generator.ts` | Deleted `reviews()` and its review pools. |
| `src/lib/config/ppc-city-generator.ts` | Deleted `reviews()`. |
| `src/lib/config/city-service-pages.ts` | Deleted 10 hand-written `reviews` arrays and the field. |
| `src/lib/config/ppc-cities.ts` | Deleted 6 hand-written `reviews` arrays and the field. |
| `src/components/home/ReviewsSection.tsx` | Removed the 4 quote cards and "Based on direct customer feedback" line. Heading now "Reviews From Local Homeowners" with a link to the Google Business Profile. The "5.0 on Google" line and "Leave a Google Review" call to action are unchanged. |
| `src/lib/content/reviews.ts` | Added `isDisplayable()` (status `verified` and a `verifiedOn` date) and `DISPLAYABLE_REVIEWS`. Documented that unverified reviews are not displayed. |
| `src/lib/content/googleReviews.ts` | Carousel data now comes from `DISPLAYABLE_REVIEWS` only. |
| `src/components/home/GoogleReviewsCarousel.tsx`, `src/app/page.tsx` | Reviews are now passed from the server as props, so unverified review text is no longer shipped in the browser JavaScript. With no verified reviews the carousel shows its existing fallback: "Verified Google reviews are being added. Read them on our Google Business Profile." |
| `scripts/seo-audit/compare_testimonial_fix.py` | **New.** Before/after crawl comparison used for validation. |

## Before and after examples

**`/air-conditioning/ac-repair/yorba-linda`**
- Before: "Customer Reviews / What Yorba Linda Homeowners Say / 5.0 · 100+ Google reviews / “Called at 9am on a Monday after our AC stopped blowing cold. Tech arrived by noon...” Sarah K., Weir Canyon, Yorba Linda · June 2025" (plus 2 more)
- After: "Before You Call / Quick Checks Before an AC Repair Visit / 5.0 · 100+ Google reviews / Check the thermostat: Make sure it is set to Cool... / Check the breaker and outdoor switch... / Check the air filter..."

**`/ac-repair/yorba-linda` (Google Ads page)**
- Before: "What Yorba Linda Homeowners Say / “Called on a Saturday morning when our AC stopped working. Technician arrived within 3 hours, diagnosed a failed capacitor...” Robert M., Yorba Linda, CA" (the same text was on all 175 Ads pages under rotating names)
- After: the same AC repair checklist, dark layout unchanged.

**`/heating/heating-repair/brea`**
- Before: "“Furnace stopped working in December... diagnosed a failed igniter...” Christine B., Brea · December 2024" (Christine B. appeared on 36 pages, one per city)
- After: "Quick Checks Before a Heating Repair Visit / Check the thermostat and filter / Check power to the furnace / If you smell gas, leave first..."

**`/air-conditioning/emergency-ac-repair/anaheim`**
- Before: "“105-degree Saturday, called at noon, tech arrived by 2:30pm...” Rachel M., Anaheim Hills, Anaheim · July 2025"
- After: "While You Wait / What to Do Until Your Technician Arrives / Turn it off if something is wrong / Do not keep resetting the breaker / Stay cool safely"

**Homepage**
- Before: carousel of 18 Google reviews ("Barel Ben avi", "Eric Smith", ... "CHUN YIU CHIU"); "Why Local Homeowners Call Us Back / Based on direct customer feedback" with 4 quoted cards.
- After: carousel fallback linking to the Google Business Profile; "Reviews From Local Homeowners / 5.0 on Google / Read what customers say in their own words on our Google Business Profile" followed by the unchanged "Had service with us?" call to action.

## Remaining unverified items (not changed, by instruction)

1. **18 Google reviews** in `src/lib/content/reviews.ts`: 14 `unconfirmed`, 4 `flagged` (business voice). None display. To show one, the owner matches it to its original Google review, sets `status: "verified"`, `verifiedOn: "YYYY-MM-DD"` and ideally `googleReviewUrl`.
2. **Review count and rating claims** were left as instructed: "5.0 · 100+ Google reviews" still appears in the header of the replaced section on 367 pages (unchanged count), and "5.0 on Google" on the homepage. With the testimonials gone, the badge now sits above a checklist, which reads oddly. It is still unsupported (audit section 4.2) and should be fixed in the trust-claims task.
3. **`/reviews` page** (hero and "Common Themes in Customer Feedback") describes what "customers consistently mention" without names or quotes. It is not a testimonial block and was left unchanged; it is still an unverified summary for the owner to confirm or reword.
4. The Google Business Profile link (`https://maps.app.goo.gl/q3tdaVN6JDbXpVPKA`) was already on the site and is reused; the owner should confirm it opens the right profile.

## Validation

| Check | Result |
|---|---|
| `tsc --noEmit` | Pass |
| `eslint .` | Pass (0 errors, 0 warnings) |
| `next build` | Pass, all routes static as before |
| All 456 sitemap URLs | 456 × HTTP 200; URL set identical to before; no page removed or added |
| Title, meta description, canonical, meta robots, H1 | Identical on all 456 pages |
| JSON-LD | Byte-identical on all 456 pages (no Review or rating schema before or after) |
| GTM container, `tel:` links, form fields | Identical on all 456 pages |
| `scripts/verify-preview.mjs` against the new build (9 checks: canonicals, trailing slashes, robots.txt, sitemap, structured data URLs, Ads pages, forms and tracking incl. `/api/contact` → 422, noindex, 124 redirects) | 9/9 pass |
| Testimonial cards detected in rendered HTML | 0 (was 1,105 by the same detector, plus 18 carousel reviews) |
| Exact-text search of every page's raw HTML, including the inline React payload, for 120 testimonial and review snippets and 100 reviewer names | 0 matches. Positive control on the old build finds every testimonial on the sampled pages |
| Review text in `.next/static` client JavaScript | 0 (was present before the props change) |
| Main content changed | 368 pages (the 367 testimonial pages and the homepage) |

Note: the Google Ads landing pages now show a checklist instead of testimonials. Their URLs, headings, forms, phone links and tracking are unchanged, but Google Ads may re-review the landing page content after deployment.
