# SEO Audit Report: HVAC Service & AC Repair

Site: https://www.hvacserviceacrepair.com/
Codebase: Next.js 16.2.6 App Router, fully static (SSG) except `/api/contact`
Audit date: 2026-10-17

## How this audit was performed (read first)

| Data source | Status |
|---|---|
| Source code review (all routes, configs, templates, generators) | Done |
| Local production build (`next build`) + `next start`, crawl of all 458 sitemap URLs | Done |
| Local HTTP tests of redirects, host rules, trailing slashes, 404s | Done (via `Host` header for apex domain) |
| Lab performance (Playwright, Pixel 5 emulation, 4x CPU throttle, localhost, third parties blocked) | Done, **lab only** |
| **Live production HTTP behaviour** | **NOT VERIFIED.** The audit container's network policy blocks `www.hvacserviceacrepair.com`. Hosting-level behaviour (HTTP to HTTPS, CDN, Vercel domain settings) must be re-checked live. |
| **Google Search Console (indexing, queries, clicks)** | **NOT AVAILABLE.** Every indexing status in this report is "technically indexable", never "confirmed indexed". |
| **CrUX / field Core Web Vitals** | **NOT AVAILABLE.** |

Because GSC data is unavailable, no page has been noindexed, merged or removed. Those items are listed as recommendations that need your approval.

---

## 1. Executive summary

The site is technically healthy at the rendering level: every page is statically prerendered HTML, there's one H1 per page, every page has a unique title and description, GTM and phone links are present on every page, and lab Core Web Vitals are good.

The main problems are **signal consistency** and **programmatic scale**:

1. **364 of 457 indexable pages declared a canonical URL that 308-redirects** (trailing slash), so the canonical disagreed with the sitemap and the live URL. *Fixed.*
2. **451 of 457 titles repeated the brand twice** ("... | HVAC Service & AC Repair | HVAC Service & AC Repair"). *Fixed.*
3. **robots.txt blocked `/_next/`** (all JS and CSS) and blocked the old URLs that hold 308 redirects, so Google couldn't fully render pages or follow legacy redirects. *Fixed.*
4. **Structured data pointed at 370+ redirecting or 404 URLs.** All 175 generated `/ac-repair/[city]` pages declared their Service/Breadcrumb URL as a different URL (`/{city}-ac-repair`). *Fixed.*
5. **Sitemap listed a 404 (`/ductless`) and a noindex page (`/services`).** *Fixed.*
6. **Keyword cannibalization.** "AC Repair Yorba Linda" is targeted by at least 5 URLs, including the homepage title. *Recommendation, needs approval.*
7. **Doorway-pattern risk.** 175 `/ac-repair/[city]` PPC pages (75% template-identical, zero internal links, sitemap-listed, indexable) plus 185 city × service pages (61 to 76% template-identical). *Recommendation, needs approval.*
8. **Templated testimonials.** Generators attach the same review text, with stock first names, to every city ("Jennifer M., Brea", "Jennifer M., Irvine"...). This misrepresents customer reviews and creates legal (FTC 16 CFR Part 465) and trust risk. *Recommendation, needs approval. High priority.*

---

## 2. Confirmed technical issues

Severity: Critical / High / Medium / Low. "Status" says whether this change set fixes it.

| # | Issue | Affected URLs | Severity | Evidence | Recommended fix | Expected impact | Status |
|---|---|---|---|---|---|---|---|
| T1 | Canonical tag has trailing slash; URL 308-redirects to the slashless version | 364 URLs: all `/ac-repair/*` (175), `/air-conditioning/{ac-repair,emergency-ac-repair,ac-tune-up}/*` (111), `/heating/heating-repair/*` (37), `/hvac-repair/*` (37), `/air-conditioning/ac-repair`, `/air-conditioning/ac-installation`, `/ac-not-cooling`, `/emergency-hvac-service` | Critical | `<link rel="canonical" href=".../yorba-linda/">`; `curl` on that URL returns 308 to `/yorba-linda`. Sitemap lists the slashless URL. | Normalise canonical paths centrally in `buildMetadata()` and fix source literals | Removes contradictory canonical signals on 80% of the site; Google stops choosing between two URLs | **Fixed** |
| T2 | Brand appended twice in `<title>` | 451 URLs (all except root-level special cases) | High | `buildMetadata()` appends `| SITE.name` and the root layout `title.template` appends it again | Return `title: { absolute }` from `buildMetadata()` | Shorter titles, less truncation, cleaner SERP snippet | **Fixed** |
| T3 | `robots.txt` disallows `/_next/` | Every page | High | `/_next/static/*` holds all JS and CSS chunks. Google's documentation says blocking rendering resources can hurt indexing. | Remove `/_next/` disallow | Google can render pages as users see them | **Fixed** |
| T4 | `robots.txt` disallows URLs that are 308 redirects (`/services/ac-repair`, `/hvac-installation/` and 22 more) | 24 legacy URLs | Medium | Googlebot can't fetch a blocked URL, so it never sees the redirect and can't consolidate those URLs' links into the new page | Remove those disallows (the redirects stay) | Legacy link equity flows to current pages | **Fixed** |
| T5 | Generated PPC pages declare the wrong URL in structured data | 175 `/ac-repair/[city]` | High | `PPCLandingTemplate` hardcodes `/${slug}-ac-repair`. For example `/ac-repair/burbank` declares `/burbank-ac-repair`, which redirects to the LA County page. | Pass the real page path into the template | Valid Service/Breadcrumb entities | **Fixed** |
| T6 | Breadcrumb schema items point at redirects | 74 city × service pages | Medium | `/heating/heating-repair` redirects to `/heating`. `/hvac-repair` redirects to `/air-conditioning/ac-repair`, a different service. | Map the breadcrumb parent to a real hub page | Valid BreadcrumbList | **Fixed** |
| T7 | Sitemap contains a 404 | `/ductless` | High | 404 locally; no `app/ductless/page.tsx` exists | Remove from sitemap, add a 308 to `/ductless/ductless-mini-split`, remove the broken breadcrumb parent | Clean sitemap; fixes a broken breadcrumb link on 2 pages | **Fixed** |
| T8 | Sitemap contains a noindex page | `/services` | Medium | `noIndex: true` in `app/services/page.tsx` | Remove from sitemap. See R6 on whether it should be indexable. | Clean sitemap | **Fixed** |
| T9 | noindex pages also use `nofollow` | `/services` (linked from every page in the header and footer) | Medium | `buildMetadata({noIndex})` emits `index:false, follow:false`, so links on the main services hub pass no signals | Use `noindex, follow` | Internal link signals flow from the services hub | **Fixed** |
| T10 | Internal links to redirecting URLs | `/promotions` links to `/service-areas/riverside-county/riverside` (308); `/air-conditioning/ac-repair/fullerton` links to `/air-conditioning/ac-repair/la-habra` (308 to the hub, labelled "La Habra") | Low | Link crawl | Link straight to the final URL; drop the La Habra link (no La Habra page exists) | Fewer redirect hops; honest anchor | **Fixed** |
| T11 | Duplicate BreadcrumbList on county pages | 6 `/service-areas/[county]` | Low | Template emits its own breadcrumb schema and also renders `<Breadcrumbs>`, which emits a second | Remove the duplicate | Cleaner schema | **Fixed** |
| T12 | One business `@id` declared with 3 different types | `/` (HVACBusiness), `/service-areas` (LocalBusiness), `/about-us` (Organization) | Medium | Same `@id` `/#hvacbusiness` | Use `HVACBusiness` everywhere (a subtype of both) | One consistent entity | **Fixed** |
| T13 | `Service.areaServed` always typed as `County`, even for cities | 433 pages | Low | `{"@type":"County","name":"Yorba Linda"}` | Use `City` when the area isn't a county | Accurate schema | **Fixed** |
| T14 | OG image declared as 1200×630 when it isn't | All pages | Low | Default OG image is 1152×1536 portrait | Stop declaring incorrect dimensions | Correct social previews | **Fixed** |
| T15 | Orphan pages (zero internal HTML links) | `/emergency-hvac-service`, `/ac-not-cooling`, `/careers`, all 175 `/ac-repair/*`, 6 `/{city}-ac-repair` | Medium | Link crawl of all 457 pages | Link the 3 organic pages contextually. For PPC pages, see R2. | Discovery and authority for emergency and troubleshooting pages | **Fixed** for the 3 organic pages |
| T16 | Legacy trailing-slash redirects take 2 hops | e.g. `/services/ac-repair/` → `/services/ac-repair` → `/air-conditioning/ac-repair` | Low | Next.js strips the trailing slash before custom redirects run, so the `"/x/"` sources in `next.config.ts` never match | Optional cleanup; harmless | Minor | Not changed (working, low value) |
| T17 | ESLint error (`prefer-const`) and 10 unused-import warnings | Build hygiene | Low | `npm run lint` | Fix | Clean CI | **Fixed** |

### What is already correct (verified locally)
- Apex `hvacserviceacrepair.com` returns 308 to `https://www.` with the path preserved (one hop).
- Trailing-slash URLs return 308 to the slashless URL (one hop). Uppercase or unknown slugs return a real 404 (`dynamicParams = false`).
- 92 legacy redirects in `REDIRECT_MAP` resolve to 200 pages. No loops were found.
- Every sitemap URL returns 200 except `/ductless` (T7). No duplicates.
- `robots.txt` references the correct sitemap.
- All pages have unique titles and descriptions, exactly one H1, GTM (`GTM-TRVN8GDR`), and a `tel:` link. No `<img>` is missing `alt`; all images use `next/image`.
- `/thank-you` is `noindex` and excluded from the sitemap (correct for a conversion page).

---

## 3. Potential issues requiring verification

| # | Item | Why it needs verification | How to verify |
|---|---|---|---|
| V1 | HTTP to HTTPS on production | The code relies on the platform for this; it couldn't be tested from the audit container | `curl -I http://hvacserviceacrepair.com/` should return a single 301/308 to `https://www.` (ideally one hop, not http → https → www) |
| V2 | Index status of every URL family | No GSC access | GSC → Pages report, filtered by sitemap. Export "Crawled - currently not indexed" and "Duplicate, Google chose different canonical". |
| V3 | Which URL Google ranks for "ac repair yorba linda" | Cannibalization decisions depend on it | GSC → Performance → Query contains "yorba linda" → Pages tab |
| V4 | "100+ Google reviews" and "5.0" claims (city templates, homepage reviews section) | 18 reviews are in `googleReviews.ts`; the Google Business Profile count couldn't be checked | Compare to the live GBP; update or remove the number |
| V5 | "24/7" (header, home lead form) vs hours of Mon to Fri 7 to 7, Sat 8 to 5, "Sunday: emergency" | Contradictory availability claims; Google may treat them as inconsistent business info | Owner to confirm real hours. Make the site, schema and GBP identical. |
| V6 | "Free diagnostic" vs "free diagnostic with repair" vs "no charge to identify the problem" | Wording differs across templates | Owner to confirm the policy, then standardise |
| V7 | Service area truth | Schema `areaServed` lists 3 counties. The site has pages for 6 counties plus 175 PPC cities (LA, San Fernando Valley, Antelope Valley, Coachella Valley, Santa Barbara). Generator copy says Ventura and Santa Barbara are "scheduled basis only". | Owner to confirm which cities are truly served. Only those should get indexable location pages. |
| V8 | Hand-written city testimonials (e.g. "Sarah K., Weir Canyon, June 2025") | They may be real, but there's no source in the repo | Match each one to a real review (GBP, Yelp, CRM). Remove any that can't be matched. |
| V9 | License claims ("CSLB Licensed"), "EPA-certified technicians", "background-checked", "workers' compensation on every job", "30+ years" (one PPC page), "15+ years" | No license number appears anywhere on the site | Owner to supply the CSLB license number (California law requires it in advertising, B&P Code §7030.5) and confirm each claim |
| V10 | Production CWV | Lab only | PageSpeed Insights / CrUX for `/`, `/air-conditioning/ac-repair`, `/air-conditioning/ac-repair/yorba-linda` |

---

## 4. Priority recommendations (need approval)

| # | Recommendation | Reason | Risk if done | Risk if not |
|---|---|---|---|---|
| **R1** | **Stop showing generated testimonials.** Remove `reviews()` output from `city-service-generator.ts` (185 pages) and `ppc-city-generator.ts` (175 pages). Replace that block with the real Google reviews carousel already used on the homepage (`GoogleReviewsCarousel`), which shows real names without city attribution. | The same review text appears under stock names on every city page with that city's name injected as the location. These are not real reviews of a customer in that city. | Low. Real reviews replace them. | FTC fake-review rule exposure; Google quality-rater "deceptive" signal; user trust |
| **R2** | **Noindex the 175 generated `/ac-repair/[city]` PPC pages and remove them from the sitemap** (keep them live for Google Ads). | 75% shingle overlap between pages; zero internal links; region-level boilerplate; many cities are outside the core service area (V7). They match Google's doorway-page pattern and compete with the organic city pages (`/ac-repair/yorba-linda` vs `/air-conditioning/ac-repair/yorba-linda`). Ads quality is unaffected by noindex. | Loses any organic traffic these pages get now. **Check GSC (V2/V3) first.** | Site-wide quality signal dilution; cannibalization |
| R3 | Do the same for the 6 hand-written `/{city}-ac-repair` pages unless GSC shows they earn organic clicks | Same PPC purpose; orphaned | As R2 | As R2 |
| **R4** | **Re-target the homepage** from "AC Repair Yorba Linda, CA" to the HVAC company intent. Proposed title: `HVAC Company in Yorba Linda, CA | AC Repair, Heating & Installation`. Proposed H1: `HVAC Service & AC Repair in Yorba Linda, CA` (keeps the brand phrase and adds the location the H1 currently lacks; it now says "Near You"). | The homepage and `/air-conditioning/ac-repair/yorba-linda` both target "AC Repair Yorba Linda". The homepage should own the broader branded and local cluster; the city service page should own the AC repair intent. | Short-term ranking movement if the homepage currently ranks for "ac repair yorba linda". **Check V3 first.** If the homepage is the current ranker, keep the title and instead strengthen the internal-link signals to the city page. | Ongoing cannibalization |
| R5 | Consolidate the thin city × service families. Keep **ac-repair** and **emergency-ac-repair** for Orange County cities (the core market). For **ac-tune-up**, **heating-repair** and **hvac-repair** city pages (111 pages, 71 to 76% identical), noindex them outside Yorba Linda and the closest cities, or merge their unique content into `/service-areas/orange-county/[city]`. | Low unique value: city name swapped into the same copy. The `/hvac-repair/[city]` H1 "Local HVAC Repair in X" competes directly with `/service-areas/.../[city]` "HVAC Service in X". | Loss of long-tail impressions; check GSC | Thin-content signal across 111 pages |
| R6 | Make `/services` indexable | It's the main services hub, linked from every page and useful to users. Its noindex looks unintentional. | Very low | Hub page can't rank or be used as a breadcrumb target |
| R7 | Shorten city × service titles. Drop the phone number and the brand suffix where the title is over 60 characters (e.g. `AC Repair in Yorba Linda, CA | Same-Day Service`). | Current titles are 90 to 137 characters; Google truncates around 60. The phone number in the title is low-value. | Low | Truncated SERP titles |
| R8 | Add the CSLB license number to the footer and to the `HVACBusiness` schema (`hasCredential`) once supplied | Trust signal and California legal requirement | None | Compliance and trust |
| R9 | Set `SITE.social.google` (the GBP URL already in `googleReviews.ts`: `https://maps.app.goo.gl/q3tdaVN6JDbXpVPKA`) once confirmed, so `sameAs` links the business entity to its GBP | Entity reconciliation for local pack | None | Weaker entity association |

---

## 5. Keyword cannibalization analysis

### 5.1 The Yorba Linda cluster: who targets what today

| URL | Title (after T2 fix) | H1 | Words | Internal inlinks | Overlap with the city AC repair page |
|---|---|---|---|---|---|
| `/` | AC Repair Yorba Linda, CA | Fast HVAC Service & AC Repair Near You | 3,041 | sitewide | 4% |
| `/air-conditioning/ac-repair` | AC Repair, Same-Day Service, Southern California | AC Repair: Same-Day Service, Southern California | 1,334 | sitewide | 12% |
| `/air-conditioning/ac-repair/yorba-linda` | AC Repair in Yorba Linda, CA, Same-Day Service | AC Repair in Yorba Linda, CA | 1,036 | 13 | n/a |
| `/ac-repair/yorba-linda` (PPC) | AC Repair & HVAC Service in Yorba Linda, CA | AC Repair & HVAC Service in Yorba Linda, CA | 1,621 | **0** | 8% |
| `/hvac-repair/yorba-linda` | Local HVAC Repair in Yorba Linda, CA | Local HVAC Repair in Yorba Linda | 996 | 10 | **29%** |
| `/service-areas/orange-county/yorba-linda` | HVAC Service in Yorba Linda, Orange County, CA | HVAC Service in Yorba Linda, CA | **322** | sitewide (footer) | 1% |
| `/air-conditioning/emergency-ac-repair/yorba-linda` | Emergency AC Repair in Yorba Linda, CA | AC Broke Down in Yorba Linda? | 985 | 11 | (distinct intent) |
| `/heating/heating-repair/yorba-linda` | Heating Repair in Yorba Linda, CA | **AC & Heating Repair** in Yorba Linda | 991 | 4 | H1 leads with "AC" |

**Conclusions**
- `/air-conditioning/ac-repair/yorba-linda`, `/ac-repair/yorba-linda` and the homepage title target the same intent ("AC repair Yorba Linda"). That's true cannibalization.
- `/service-areas/orange-county/yorba-linda` and `/hvac-repair/yorba-linda` target the same intent ("HVAC service/repair Yorba Linda"). The service-area page has the only genuinely unique local text but just 322 words; the `/hvac-repair` page has more words but they're template words.
- `/heating/heating-repair/[city]` H1s say "AC & Heating Repair", which pulls the page toward AC intent. Recommend the H1 "Heating & Furnace Repair in {City}" (template-only change, needs approval as part of R5).

### 5.2 Proposed keyword-to-page map

| Keyword cluster | Primary landing page | Supporting pages (link to primary, don't compete) |
|---|---|---|
| hvac company yorba linda, hvac services yorba linda, hvac contractor yorba linda, brand | `/` | `/about-us`, `/service-areas/orange-county/yorba-linda` |
| ac repair yorba linda, air conditioning repair yorba linda, ac repair near me (Yorba Linda) | `/air-conditioning/ac-repair/yorba-linda` | `/`, `/air-conditioning/ac-repair`, `/ac-not-cooling`, blog |
| hvac repair yorba linda | `/service-areas/orange-county/yorba-linda` (expanded) | `/hvac-repair/yorba-linda` → MERGE CANDIDATE into it |
| emergency ac repair yorba linda | `/air-conditioning/emergency-ac-repair/yorba-linda` | `/emergency-hvac-service`, `/air-conditioning/emergency-ac-repair` |
| ac installation yorba linda, ac replacement yorba linda | `/air-conditioning/ac-installation` (add a Yorba Linda section; there's no city page, and none should be generated) | `/air-conditioning/ac-replacement`, `/calculators/ac-size-calculator` |
| heating / furnace repair yorba linda | `/heating/heating-repair/yorba-linda` | `/heating/furnace-repair` |
| ac tune-up / maintenance yorba linda | `/air-conditioning/ac-tune-up/yorba-linda` | `/maintenance-plans` |
| ac repair orange county | `/air-conditioning/ac-repair` (retitle to "AC Repair in Orange County, CA"; "Southern California" is too broad for the real market) | `/service-areas/orange-county` |
| hvac service orange county | `/service-areas/orange-county` | `/orange-county-ac-repair` (PPC → noindex) |
| ac not cooling / ac blowing warm air | `/ac-not-cooling` | `/blog/ac-blowing-warm-air` (overlapping; link both ways) |

### 5.3 Page classification

| URL family | Count | Classification | Reason |
|---|---|---|---|
| Core pages (`/`, `/contact`, `/about-us`, `/reviews`, `/financing`, `/promotions`, `/maintenance-plans`) | 7 | KEEP | Unique, conversion-critical |
| Service silo hubs and sub-pages (`/air-conditioning/*`, `/heating/*`, `/heat-pumps/*`, `/ductless/*`, `/commercial-hvac/*`, `/air-duct-services/*`, `/maintenance/*`) | 24 | KEEP / IMPROVE | Unique content (6% overlap). Improve: `/air-conditioning/ac-repair` title scope; `/air-conditioning/ac-services` overlaps `/air-conditioning` (MERGE CANDIDATE) |
| `/services` | 1 | IMPROVE (make indexable, R6) | |
| `/emergency-hvac-service` | 1 | KEEP | Now internally linked |
| `/ac-not-cooling` | 1 | KEEP | Best informational page; now internally linked |
| `/calculators/*` | 5 | KEEP | Unique tools |
| `/blog/*` | 9 | KEEP | Unique (6% overlap) |
| `/service-areas` and the 6 county pages | 7 | KEEP / IMPROVE | County pages run 301 to 656 words |
| `/service-areas/orange-county/*` | 21 | IMPROVE | Only pages with real per-city local context, but 294 to 339 words. Expand with owner-verified local information. |
| `/service-areas/{la,riverside,san-bernardino,ventura,santa-barbara}-county/*` | 16 | IMPROVE or NOINDEX CANDIDATE | Depends on V7 (is the city really served?) |
| `/air-conditioning/ac-repair/*` (OC cities) | 21 | KEEP / IMPROVE | Primary city AC repair pages; remove templated reviews (R1) |
| `/air-conditioning/ac-repair/*` (non-OC) | 16 | IMPROVE or NOINDEX CANDIDATE | V7 |
| `/air-conditioning/emergency-ac-repair/*` | 37 | KEEP (OC) / NOINDEX CANDIDATE (outer counties) | 74% identical. Emergency claims for "scheduled basis only" areas conflict with their own copy. |
| `/air-conditioning/ac-tune-up/*` | 37 | NOINDEX CANDIDATE (except Yorba Linda) | 76% identical; tune-ups aren't location-sensitive |
| `/heating/heating-repair/*` | 37 | NOINDEX CANDIDATE (except Yorba Linda and adjacent) | 72% identical |
| `/hvac-repair/*` | 37 | MERGE CANDIDATE into `/service-areas/.../[city]` | 71% identical; same intent as the service-area page |
| `/ac-repair/*` (generated PPC) | 175 | NOINDEX CANDIDATE (R2) | Doorway pattern; keep live for Ads |
| `/{city}-ac-repair` (hand-written PPC) | 6 | NOINDEX CANDIDATE (R3) | Orphaned PPC |
| `/careers`, `/terms`, `/privacy-policy`, `/sms-compliance` | 4 | KEEP | Utility pages |
| `/thank-you` | 1 | KEEP (noindex) | Correct |

No page is classified REMOVE CANDIDATE. Every page either serves Ads or can be improved; removing them gains nothing over noindex.

---

## 6. URL inventory

Totals from the local build: **457 indexable 200 URLs in the sitemap** (458 listed before the fixes), plus `/thank-you` (noindex), `/terms`, `/privacy-policy`, `/sms-compliance` (indexable, not in the sitemap) and 92+ redirect sources.

| Route pattern | Source | Count | Rendering | Canonical (before → after) | In sitemap | Template overlap | Median internal inlinks |
|---|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | 1 | SSG | OK | yes | n/a | sitewide |
| Core and utility pages | `app/*/page.tsx` | 12 | SSG | OK | 8 of 12 | n/a | sitewide |
| Service silos | `app/{air-conditioning,heating,heat-pumps,ductless,commercial-hvac,air-duct-services,maintenance}/**` | 24 | SSG | 2 had a trailing slash → fixed | yes | 6% | 16 |
| `/ac-not-cooling`, `/emergency-hvac-service` | `app/*/page.tsx` | 2 | SSG | trailing slash → fixed | yes | n/a | 0 → linked |
| `/calculators/*` | `app/calculators/**` | 5 | SSG | OK | yes | 0% | 3 |
| `/blog/[slug]` | `lib/content/blog.ts` | 8 (+index) | SSG | OK | yes | 6% | 4 |
| `/service-areas/[county]` | `lib/config/locations.ts` | 6 (+index) | SSG | OK | yes | 14% | 5 |
| `/service-areas/[county]/[city]` | `lib/config/locations.ts` | 37 | SSG | OK | yes | 21 to 28% | 9 (OC) |
| `/air-conditioning/[service]/[city]` | `city-service-pages.ts` + `city-service-generator.ts` | 111 (3 services × 37) | SSG | trailing slash → fixed | yes | 61 to 76% | 4 |
| `/heating/heating-repair/[city]` | same | 37 | SSG | trailing slash → fixed | yes | 72% | 4 |
| `/hvac-repair/[city]` | same | 37 | SSG | trailing slash → fixed | yes | 71% | 4 |
| `/ac-repair/[city]` | `ppc-cities.ts` + `ppc-city-generator.ts` | 175 | SSG | trailing slash → fixed | yes | 75% | **0** |
| `/{city}-ac-repair` | `app/*-ac-repair/page.tsx` | 6 | SSG | OK | yes | n/a | **0** |

Indexing status for every family: **technically indexable, Google index status unverified** (no GSC).

Generated PPC cities by region: Greater LA 48, Orange County 34, Riverside 26, San Fernando Valley 25, San Bernardino 21, Ventura 11, Santa Barbara 10.

---

## 7. Proposed implementation plan

**Phase A: done in this change set (non-destructive, evidence-backed)**
T1 to T15 and T17 above. See section 10 for files.

**Phase B: needs your approval (in priority order)**
1. R1: replace generated testimonials with the real Google reviews component.
2. Pull GSC data (V2, V3) for 28 to 90 days.
3. R2 and R3: noindex the PPC families based on GSC data. One-line change: `noIndex: true` in `app/ac-repair/[city]/page.tsx` plus the sitemap filter.
4. R4: homepage retarget, if GSC shows the city AC repair page or no page ranks for "ac repair yorba linda".
5. R6 and R7: `/services` indexable; shorten titles.
6. V7: owner confirms the real service area, then noindex out-of-area location pages.

**Phase C: content (needs owner input; don't generate)**
1. Expand `/service-areas/orange-county/yorba-linda` and the Yorba Linda service pages with owner-supplied facts: real job examples, technicians, equipment brands actually installed, permit experience with the City of Yorba Linda, real photos from local jobs.
2. Add a Yorba Linda section to `/air-conditioning/ac-installation` (installation is a high-value intent with no local page; don't generate a new city page).
3. Pages flagged for editorial review (no genuine local information is available in the repo): all generated city × service pages outside Orange County, and all 175 generated PPC pages.

---

## 8. Risks

| Risk | Mitigation |
|---|---|
| Canonical change (T1) causes temporary re-processing in GSC | The new canonical equals the URL that already returns 200 and is in the sitemap, so this removes a conflict rather than adding one |
| robots.txt change (T3/T4) lets Google crawl `/_next/static` | Those are static, hashed assets; this is Google's recommended setup |
| `/ductless` redirect (T7) | Single 308 from a 404 to the obvious hub; no existing behaviour lost |
| Title change (T2) | Text before the brand suffix is unchanged |
| Noindexing PPC pages (R2) without GSC data | Not done. Gated on V2/V3. |
| Production platform rules (Vercel domain redirects) may differ from local | V1 checklist |

## 9. Expected SEO impact

- **High confidence:** consistent canonicals on 364 URLs, cleaner rendering (unblocked JS/CSS), legacy redirects become crawlable, valid structured data on 400+ pages, clean sitemap. These remove indexing friction; on their own they don't create rankings.
- **Medium confidence (Phase B):** removing doorway-pattern and templated-review pages from the index typically improves how Google assesses the remaining pages, and resolves Yorba Linda cannibalization so one page per intent accumulates signals.
- **Long-term (Phase C):** genuine local content on fewer, stronger Orange County pages is the main growth lever for the "Yorba Linda" keyword set and the local pack (alongside the GBP).

---

## 10. Implementation log (this change set)

Files changed:

| File | Change | Issue |
|---|---|---|
| `src/lib/seo/metadata.ts` | Canonical path normalisation; `title.absolute`; `noindex, follow`; drop wrong OG dimensions | T1, T2, T9, T14 |
| `src/lib/seo/schema.ts` | URL normalisation in Service/Breadcrumb; `City` vs `County` areaServed; single `HVACBusiness` type for the business `@id` | T6, T12, T13 |
| `src/app/robots.ts` | Removed `/_next/` and legacy-redirect disallows | T3, T4 |
| `src/app/sitemap.ts` | Removed `/ductless` and `/services` | T7, T8 |
| `next.config.ts` | `/ductless` → `/ductless/ductless-mini-split` (308) | T7 |
| `src/lib/config/routes.ts` | Removed `/ductless` breadcrumb parent | T7 |
| `src/app/{ac-repair,hvac-repair,heating/heating-repair,air-conditioning/[service]}/[city]/page.tsx`, `src/app/{ac-not-cooling,emergency-hvac-service,air-conditioning/ac-repair,air-conditioning/ac-installation}/page.tsx` | Slashless canonical, breadcrumb and schema paths | T1 |
| `src/components/ppc/PPCLandingTemplate.tsx`, `src/app/ac-repair/[city]/page.tsx` | Real page path for schema | T5 |
| `src/components/city-service/CityServicePageTemplate.tsx` | Breadcrumb parents resolve to real hubs; slashless paths | T1, T6 |
| `src/components/location/CountyPageTemplate.tsx` | Removed duplicate BreadcrumbList | T11 |
| `src/app/promotions/page.tsx`, `src/lib/config/city-service-pages.ts` | Fixed redirecting internal links | T10 |
| `src/components/layout/Footer.tsx`, `src/app/air-conditioning/ac-repair/page.tsx`, `src/lib/content/blog.ts` | Contextual links to `/emergency-hvac-service`, `/ac-not-cooling`, `/careers` | T15 |
| `src/app/reviews/page.tsx`, `src/lib/content/services.ts` | Removed the brand name typed literally into two page titles (it doubled with the suffix) | T2 |
| `src/app/about-us/page.tsx`, `src/app/service-areas/page.tsx` | Use the single `schemaHvacBusiness()` entity | T12 |
| Lint fixes (`MaintenancePlanCalculator.tsx`, `ac-not-cooling`, `blog`, `calculators`, `financing`, `maintenance-plans`, `reviews`, `services` pages, `PPCLandingTemplate.tsx`) | Unused imports; `prefer-const` | T17 |

Not touched: forms (`QuoteForm`, `SingleStepQuoteForm`, `HomeLeadForm`), `/api/contact`, GTM in `layout.tsx`, `PhoneLink`, `StickyMobileCta`, `FloatingCallButton`, `lib/gtm.ts`, existing redirects in `REDIRECT_MAP`.

Additional finding during validation: the San Clemente city × service pages (4) have no inbound links because no city lists `san-clemente` in `nearbySlugs`. Its `/service-areas` page is linked. Adding it to neighbouring cities' `nearbySlugs` is an owner decision about which cities count as "nearby".

## 11. Validation results (local production build)

| Check | Before | After |
|---|---|---|
| `tsc --noEmit` | pass | pass |
| `eslint` | 1 error, 10 warnings | 0 errors, 0 warnings |
| `next build` | pass | pass (all routes SSG) |
| Sitemap URLs returning 200 | 457 / 458 | 456 / 456 |
| Sitemap URLs with noindex | 1 | 0 |
| Canonical == sitemap URL | 93 / 457 | 456 / 456 |
| Titles with duplicated brand | 451 | 0 |
| Internal links to non-200 URLs | 3 targets | 0 |
| JSON-LD blocks that fail to parse | 0 | 0 |
| JSON-LD URLs returning non-200 | 370+ | 0 (458 distinct URLs checked) |
| Business `@id` types | 3 conflicting | 1 (`HVACBusiness`) |
| BreadcrumbList: positions sequential, last item = page URL | not checked | 456 / 456 pass |
| FAQPage: every question has name + answer | pass | pass |
| Redirect regression (32 cases incl. apex host, trailing slash, legacy, 404s) | baseline | identical except `/ductless` 404 → 308 |
| Every page has GTM container + `tel:` link | 457 / 457 | 456 / 456 |
| Lead form end-to-end (Playwright, API intercepted so no email sent): city page desktop, homepage mobile, PPC page | n/a | POST to `/api/contact` fires, `form filled` dataLayer event fires, redirect to `/thank-you` |
| `/api/contact` validation (empty body → 422; honeypot → silent 200) | n/a | pass |
| Lab perf (mobile emulation, 4x CPU, localhost, third parties blocked) | LCP 0.76 to 1.57 s, CLS 0 | unchanged (no perf-affecting changes) |

**Not validated (environment limits):** Google Rich Results Test and the Schema.org validator (external network blocked); live production HTTP behaviour; GSC; CrUX field data. Run these after deploying to a preview URL.

Remaining title-length issue: 454 titles are over 60 characters (median 89). See R7.

