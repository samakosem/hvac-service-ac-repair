# SEO Phase 6: Verified Business Facts, Local SEO, AI Search

Base `main` at `9790370`. Owner-confirmed facts (2026-10-25): serves all Orange County cities; operational base Yorba Linda; Laguna Niguel and Bear Brand Ranch served; licensed and insured (number not to be published); emergency and same-day service; typical emergency arrival 60 to 120 minutes (conditional); authentic project photos on the site; active Google Business Profile.

## Implemented

| Fact | Where |
|---|---|
| Google Business Profile | `SITE.social.google` → `HVACBusiness.sameAs`. The owner's link resolves to the same listing as the existing review link (`ftid 0x80dcd300736b62ff:0x8c8d3b313c5c642f`), so there is no duplicate profile. Used in its stable `?cid=` form |
| 60 to 120 minute emergency arrival | One constant (`SITE.emergencyArrivalOC`), always worded "typically … not guaranteed … we confirm your arrival time when you call", and used **only for Orange County**. Placed in: `/emergency-hvac-service` FAQ; `/air-conditioning/emergency-ac-repair` (new FAQ); the 21 OC `/air-conditioning/emergency-ac-repair/[city]` pages (arrival FAQ); the 21 OC hubs (emergency section and FAQ); a new emergency FAQ on the Placentia, Costa Mesa and Yorba Linda hubs. Hubs outside OC keep their previous wording |
| 24/7 consistency | `/air-conditioning/emergency-ac-repair` weekend FAQ said Sunday service was limited to "genuine emergencies"; it now matches the confirmed 24/7 hours |
| Laguna Niguel and Bear Brand Ranch | `/air-conditioning/ac-repair/laguna-niguel` notes: "We serve all of Laguna Niguel, including Bear Brand Ranch, from our Yorba Linda base." |
| Licensed and insured | **Not added.** California B&P §7030.5 requires the CSLB number in any contractor advertising, and §7027.4 requires the insurance type for "insured" claims. `credentials.ts` already gates both. Publishing "licensed" without the number would conflict with the law, so this needs the owner's decision |
| Orange County coverage, Yorba Linda base | Already consistent on the homepage ("Serving All of Orange County"), AC repair, contact, footer and schema (`areaServed` includes Orange County; broader counties kept) |

## Phase 5 `localContext` paragraphs, re-reviewed with the owner facts

- **A, fully supported:** none. Every paragraph also makes claims the owner facts don't cover: housing ages, temperatures, equipment brands, "we often find", and named communities other than Bear Brand Ranch. **None published.**
- **B, partially supported** (the coverage or base part is now confirmed, the rest isn't):
  - Yorba Linda, Anaheim, Fullerton, Orange: "shop in or near Yorba Linda" is confirmed.
  - Laguna Niguel: Bear Brand Ranch is confirmed; La Siena, Marina Hills and "we see frequently" aren't.
- **C, requires verification:** the other 16 (see the Phase 5 table).

## Project photos

71 files in `/public/uploads`. None of the 65 JPEGs has GPS or date EXIF, and the filenames are generic ("ac-repair (3)"). **No photo can be tied to a city or job.** Fixes:
- One gallery alt said "in Yorba Linda, CA"; that location is removed.
- The 175 Ads pages labelled shared photos with each page's city ("AC repair service in {City}"); the alt text now describes the photo without a location.

Orange County wording in other alts is unchanged.

## AI search readiness (live, GitHub Actions run 40173702656)

| Check | Result |
|---|---|
| robots.txt | `User-Agent: * / Allow: / / Disallow: /api/`, plus the Sitemap line. Googlebot, Bingbot, OAI-SearchBot, PerplexityBot and GPTBot are all allowed (none named, so none blocked) |
| User-agent requests (`/`, `/air-conditioning/ac-repair`, the Placentia hub, `/sitemap.xml`) | 200 for all five agents, full static HTML with one `<h1>`; no `X-Robots-Tag`; Vercel cache HIT |
| Rendering | All pages are SSG HTML; content is readable without JavaScript |
| Canonicals and sitemap | Unchanged from Phase 3: self-canonical www, 456 URLs |
| Entity data | `HVACBusiness` with address, geo, 24/7 hours, `areaServed` and now `sameAs` |
| **Not verifiable here** | How Vercel's firewall or bot protection treats requests from the bots' real IP ranges. A user-agent string test doesn't prove that. Confirm in Vercel → Firewall logs, Bing Webmaster Tools (URL inspection) and GSC URL Inspection |

No crawler rule was changed.

## Validation

`tsc --noEmit`, `eslint .` and `next build` pass. 456/456 sitemap URLs return 200. A per-page diff against the Phase 5 build (title, description, canonical, robots, H1, OG, GTM, `tel:` links, forms and inputs, schema types) shows 0 differences. Content changed only on:
- 22 emergency AC repair pages
- `/emergency-hvac-service`
- the 21 OC hubs
- the Laguna Niguel AC repair page
- alt text on the 175 Ads pages and 1 gallery image

`verify-preview.mjs`: 9/9 pass.
