# Phase 2.3 P3: Site-Wide Trust and Review Claims Audit

Date: 2026-10-19. Base: `main` at `90d6701` (Phase 2.3 P1 merged).

Owner confirmation used: the company operates 24 hours a day, 7 days a week, including emergency HVAC service. No other business fact was assumed.

## Update 2026-10-20: owner confirmations

The owner confirmed:
- the company is licensed and insured, and the license number and policy details should not be published yet;
- it operates 24/7, including emergency service;
- it offers same-day AC repair and HVAC service;
- emergency service covers Los Angeles, Orange, Riverside, Ventura and Santa Barbara counties.

These supersede the earlier assumptions in this report:

- **Licensing and insurance stay hidden.**
  - The CSLB Advertising Guidelines (cslb.ca.gov, "Put your license number on all advertisements") and B&P Code §7030.5 require licensed contractors to include the license number in all advertising, explicitly including websites.
  - B&P Code §7027.4(a) allows an "insured" claim only when the ad names the type of insurance.
  - Without the number and the coverage type, neither claim can be shown. `credentials.ts` now takes `cslbLicenseNumber` and `insuranceType`.
  - **Needed from the owner:**
    1. The CSLB license number. We check it against the CSLB license lookup before publishing.
    2. The insurance type to name, e.g. "General Liability". No policy number or amount is shown.
    3. Optionally, EPA 608 certification and background-check confirmation.
- **Compliance risk on the current site.** Because the company is licensed, CSLB rules require the license number on the website whether or not it says "licensed". The site has never shown it. This predates this PR and is not caused by it. It needs the owner's number to resolve.
- **Same-day messaging is restored.** The production same-day titles, H1s, badges and Ads copy are back. Unsupported details stay out: "before noon" rules and rates, arrival windows, "We Fix It Today" and "usually same day" completion promises, "We Respond the Same Day", stocked parts, and comparative claims. Copy separates same-day *service availability* from same-day *completion*, for example: "Same-day service is available, but whether the repair is finished the same day depends on the problem and the parts it needs."
- **Ventura and Santa Barbara.** Removed:
  - "scheduled basis" and "non-emergency" wording;
  - "emergency repair is not available at this distance";
  - "local providers may be better positioned";
  - the "Scheduled Service" Santa Barbara County title.
  These areas now state 24/7 emergency service. No offices or new territories were added.
- **`areaServed`** now lists Orange, Riverside, San Bernardino, Los Angeles, Ventura and Santa Barbara counties. San Bernardino was already listed and has city pages.

## Method

1. Built `main` and crawled all 461 routes (456 sitemap URLs plus redirect and utility routes).
2. Scanned each page's visible text, `<title>`, meta description, H1 and JSON-LD for these claim types:
   - ratings and review counts
   - testimonials
   - years in business
   - licensing, insurance, EPA and CSLB
   - awards and certifications
   - response, arrival and dispatch times
   - same-day promises
   - office locations
   - completed-job counts
   - stocked parts and first-visit rates
   - guarantees
3. Traced every hit to its source file and fixed it there.
4. Rebuilt, re-crawled and compared all 461 routes with `main`. Re-ran the scan to confirm what remains.

## Findings on `main`

Pages on `main` containing each claim type (Google Ads pages in parentheses):

| Claim | Title | Description | H1 | JSON-LD | Header/footer | Body |
|---|---|---|---|---|---|---|
| Same-day promise | 221 (179) | 372 (180) | 75 | 353 (180) | 461 (181) | 461 (181) |
| Response/arrival time | 0 | 1 | 0 | 195 (177) | 0 | 436 (181) |
| Licensed/insured/CSLB | 0 | 41 (4) | 0 | 43 (4) | 461 (181) | 461 (181) |
| EPA certified | 0 | 0 | 0 | 1 | 461 (181) | 368 (181) |
| Stocked parts | 0 | 0 | 0 | 35 | 0 | 219 (180) |
| First-visit fix rate | 0 | 0 | 0 | 244 (175) | 0 | 251 (177) |

**Already clean:**

- **Ratings and reviews.** Phase 2.1 removed every numeric rating, review count, AggregateRating and Review markup. Reviews only render once the owner verifies them. There are no testimonials and no customer names.
- **Other categories.** There are no years-in-business claims, awards, completed-job counts or extra office locations. The only address used is 18340 Yorba Linda Blvd #107.

## Claims removed or reworded

1. **Licensing, insurance and EPA.**
   - **What changed:** "Licensed & Insured", "CSLB Certified", "CSLB Licensed & Fully Insured", "EPA Certified", "EPA-certified technicians", "background-checked team", "licensed technicians" and "licensed contractor" are removed from pages and descriptions.
   - **Why:** There is no CSLB license number, insurance record or EPA 608 record on file. "CSLB Certified" is also not a CSLB term, since the board licenses contractors rather than certifying them.
   - **How it comes back:** The new `src/lib/config/credentials.ts` gates every credential badge. Once the owner fills in a value, the badges return automatically, and "licensed" badges show the CSLB number, as California Business and Professions Code section 7030.5 requires for contractor advertising.
   - **Kept:** general advice to "consult a licensed HVAC professional".
2. **Response and arrival times.** Removed:
   - "We respond within 1 hour", "follow up within 1 business hour", "call you back within the hour";
   - per-county "Average arrival: typically 1–3 / 2–4 hours same day", "within 90 minutes", "within the hour", drive-time figures and "Response time: 25–35 minutes";
   - "15–20 Minute Response", "fastest response in the city", "faster than any competitor".
   - Forms now say "We'll contact you to schedule." Arrival FAQs say the company is open 24/7 and will give an arrival window when you book.
3. **Same-day promises.**
   - **Removed:** "Same-Day Service", "Same-Day Availability / Call before noon", "Available Today", "We Fix It Today", "Get Same-Day Service", "most calls before noon get same-day service", "within 48 hours".
   - **Replaced with:** the confirmed "Open 24/7" in titles, descriptions, H1s, badges, banners and FAQ answers.
   - **Kept as is:** honest limits such as "same-day scheduling isn't guaranteed" for Ventura and Santa Barbara.
4. **Stocked parts and first-visit rates.** Removed "fully stocked van", "parts on the truck", "we stock parts for…", "most repairs completed on the first visit / same visit / single visit" and "parts-ready trucks".
5. **Guarantee.** Removed "we back every job with a satisfaction guarantee" (Orange County Ads page).
6. **Star icons.** The decorative five-star row in the homepage "leave a review" panel now only shows alongside a verified rating.

## Structured data

| Item | Before | After |
|---|---|---|
| HVACBusiness `openingHoursSpecification` | Mon–Fri 07:00–19:00, Sat 08:00–17:00, no Sunday | Mon–Sun 00:00–23:59 (24/7, owner confirmed) |
| AggregateRating / Review | none | none |
| FAQPage answers | arrival times, same-day, stocked parts, EPA | reworded as above; question count unchanged |
| Service / BreadcrumbList / WebSite | unchanged | unchanged; all JSON-LD parses on all 461 routes |
| Business name, address, phone, geo, URLs, areaServed | unchanged | unchanged |

## Google Business Profile

- **Link checked:** `https://maps.app.goo.gl/q3tdaVN6JDbXpVPKA`, resolved read-only from a GitHub Actions runner (run 39331190032).
  - It redirects to the Google Maps place **"HVAC Service & AC Repair"** (feature id `0x80dcd300736b62ff:0x8c8d3b313c5c642f`). The place was found by searching "HVAC Service 18340 Yorba Linda Blvd #107".
  - The pin is at 33.88889, -117.81384, about 50 m from the site's coordinates.
  - **It points to the intended business.**
- **Fix:** the homepage "leave a review" button pointed to a Google Maps *search* ("HVAC Service AC Repair Yorba Linda"). It now uses the profile link.
- **Ratings:** none are displayed. A third-party directory (servicemag.org) lists this phone number and address as "5.0 from 9 reviews, open 24 hours". That is not an authoritative source and was not used. It does contradict the "100+ Google reviews" claim that Phase 2.1 removed.

## Owner confirmation needed

1. **CSLB license number** (C-20), current insurance, EPA 608 certification and background checks. Fill in `src/lib/config/credentials.ts` and the badges return with the license number.
2. **Same-day service:** if the company can commit to same-day appointments in specific areas, wording can be reintroduced there.
3. **Google Business Profile:**
   - Confirm the profile hours are set to "Open 24 hours".
   - The primary category appears to be "air conditioning store"; consider "HVAC contractor".
   - Read the current rating and review count into `REVIEW_PROFILE` (`src/lib/content/reviews.ts`) if they should be shown.
4. **Business policies still on the site, not changed in this phase:**
   - free diagnostic with repair;
   - no emergency or weekend surcharge;
   - 0% financing;
   - warranty on parts and labor, and "full manufacturer warranties";
   - same technician start to finish;
   - real people answer, no voicemail;
   - not a franchise, locally owned;
   - Manual J on every installation, and "we pull permits";
   - $99 tune-up, and repair price ranges ($150–$450);
   - maintenance-plan "priority scheduling";
   - "Tech available in your area" Ads badge;
   - "under-maintained system works 30% harder" statistic.
5. **Santa Barbara County:** it is described as "scheduled, non-emergency basis". Confirm whether 24/7 emergency service extends there.
6. **Schema `areaServed`:** lists Orange, Riverside and San Bernardino counties only. Los Angeles, Ventura and Santa Barbara are served but not listed. This was left unchanged and needs approval.
7. **Shared form option** "Not Sure — Need Diagnosis" contains an em dash. It is the submitted value on every form, so it was not changed (carried over from P1).

## Not changed

- URLs, canonicals, robots meta, `robots.txt`, sitemap, redirects and internal links.
- Lead forms (fields, validation, honeypots, SMS consent, `/api/contact`), phone links, GTM and the `form filled` event.
- The three Phase 2.3 P1 hubs differ only in the site-wide footer.
- The other 34 hub pages: only the trust claims listed above changed. There was no content optimization.
