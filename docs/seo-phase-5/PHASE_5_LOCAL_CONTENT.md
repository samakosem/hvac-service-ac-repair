# SEO Phase 5: Local Content

Base: `main` at `1840398`. Builds on `docs/seo-phase-4/PHASE_4_ORGANIC_GROWTH.md`.

## 1. Hidden `localContext`

**Cause:** `CityServicePageTemplate` never referenced `page.localContext`. No version in git history rendered it. The field was filled in config (`city-service-pages.ts` for hand-written entries, `locations.ts` for generated ones) but never wired into the template.

**Fix:** the template now renders `localContext` only when the entry sets `localContextVerified: true`. That flag must be set only after the owner confirms every claim in the paragraph. **No entry sets it**, so none of the paragraphs below is published.

### Review of the 21 Orange County AC repair paragraphs

Legend: **V** requires owner verification, **G** generic or low-value, **M** potentially misleading. No paragraph is entirely safe and supported. The verifiable parts (e.g. Aliso Viejo incorporated in 2001; San Clemente is the southernmost OC city) are mixed with first-person experience claims, so every paragraph needs the owner.

| City | Class | Claims that need the owner or should go |
|---|---|---|
| Yorba Linda | V | Equipment mix "we frequently work on"; "regularly push above 95°F near Weir Canyon"; shop on Yorba Linda Blvd (matches site data, keep if confirmed) |
| Anaheim | V | "Some of the highest summer temperatures in the county"; resort-district commercial demand |
| Anaheim Hills | V, M | "5 to 10°F hotter than coastal OC"; "we find attic air handlers are a common source of efficiency loss" (experience claim) |
| Brea | V | Attic clearance and duct condition claims |
| Fullerton | V | Housing-age mix; landlord and Cal State Fullerton rental claims |
| Placentia | M | "Tracts run Carrier, Trane, and Bryant systems predominantly" (unsupported brand statistic); "May through October" season |
| Villa Park | V, M | "Many homes exceed 3,000 sq ft"; "we often find systems undersized" (experience claim) |
| Orange | V | Old Towne home ages (1910s to 1940s, plausible); "95 to 100°F near Santiago Canyon" |
| Tustin | V | Tustin Legacy "high-efficiency systems with advanced thermostats" |
| Santa Ana | M | "We have experience navigating multi-tenant access and building manager coordination" (experience claim) |
| Irvine | M | "Brand-certified technicians"; "familiar with Irvine's HOA requirements and permit processes"; names communities as if served |
| Costa Mesa | M | "South Coast Plaza is a major commercial HVAC service area for us" (unverified business claim). Coastal corrosion part is fine and is now published from the approved hub copy |
| Huntington Beach | V | "Among the most demanding environments in Southern California"; coil recommendation is fine |
| Newport Beach | V | Names Balboa Island, Newport Coast, Pelican Hill as if served |
| Mission Viejo | V | Housing years and "original ductwork never replaced" |
| Lake Forest | V | "Regularly exceed 95°F"; systems "approaching end of life" |
| Aliso Viejo | V | Incorporated 2001 is verifiable; equipment age claim is not |
| Laguna Niguel | V | Names Bear Brand Ranch, La Siena, Marina Hills as "we see frequently" |
| San Clemente | V, G | Beach homes with "swamp coolers, wall units" generalisation |
| Garden Grove | V | "Retrofitting central AC is a significant part of our work here" (experience claim) |
| Westminster | G | Nothing city-specific beyond "warm summers" |

## 2. City-specific content published

New section **"AC Repair Notes for {City}"** on `/air-conditioning/ac-repair/{city}` (`src/lib/content/city-service-local.ts`). It renders only when a city has a verified fact:

- **Permit office** (12 cities), linked to the official page verified in Phase 2.3 P1/P4: Placentia, Costa Mesa, Yorba Linda, Garden Grove, Huntington Beach, Laguna Niguel, Mission Viejo, Newport Beach, San Clemente, Santa Ana, Tustin, Villa Park. Wording matches the production hub copy.
- **Coastal maintenance** (4 cities): Huntington Beach, Newport Beach and San Clemente ("sits on the Pacific coast"), and Costa Mesa ("close to the coast"). Same guidance as the approved Costa Mesa hub; no statistics.

**12 pages improved**, adding 51 to 117 words each. The other 9 OC AC repair pages (Anaheim, Anaheim Hills, Brea, Fullerton, Orange, Irvine, Lake Forest, Aliso Viejo, Westminster) get nothing, because no verified fact is on file: their permit pages couldn't be confirmed (403, 404 or redirect in the P4 check).

## 3. Owner content slots on the priority hubs

`CityHubContent.owner` (`src/lib/content/city-hubs.ts`, `OWNER_CONTENT`) takes, for Placentia, Costa Mesa and Yorba Linda:

| Slot | Renders as | Rule |
|---|---|---|
| `projects[]` (month, system, problem, outcome) | "Recent Work in {City}" | From job records; no customer names without consent |
| `photos[]` (src, alt, size) | "Job Photos from {City}" | Owner's own job photos |
| `neighborhoods[]` | "Where We Work in {City}" | Only areas the owner confirms |
| `arrivalWindow` | Same block | The owner's own words |

All slots are empty, so nothing renders in production (verified: the hubs' content is unchanged).

## 4. Costa Mesa internal links

Costa Mesa is already in the nearby-city lists of every served city that borders it (Santa Ana, Irvine, Huntington Beach, Newport Beach). Through those lists it is linked from those cities' hubs and from all five city service families. Tustin, the other nearby city, doesn't border it. **No link added:** the only remaining option is the sitewide footer, which Phase 4 left as an owner decision.

## 5. Validation

| Check | Result |
|---|---|
| `tsc --noEmit`, `eslint .`, `next build` | Pass |
| Sitemap URLs | 456/456 return 200 |
| Per-page diff vs the Phase 3 build: title, description (excluding the 6 fixed in Phase 4), canonical, robots, H1, OG, GTM, `tel:` links, forms and inputs, schema types | **0 differences** |
| Pages whose content changed | Exactly the 12 OC AC repair pages above (new H2 plus paragraphs) |
| `scripts/verify-preview.mjs` | 9/9 pass |

## Next step

The owner reviews the table in section 1. They correct or confirm each paragraph and supply the hub facts in section 3. Each confirmed paragraph then gets `localContextVerified: true`, and each fact goes into `OWNER_CONTENT`, one PR per city.
