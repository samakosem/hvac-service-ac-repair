# Phase 10A: Business Claims Inventory (for separate approval)

Inventory only. No claims were changed in Phase 10A. Nothing below is to be implemented until the owner confirms the facts. No prices, licenses, insurance or policies are invented here.

| # | Claim | Where | Issue | Proposed correction (owner must confirm) |
|---|---|---|---|---|
| 1 | "Our shop is at 18340 Yorba Linda Blvd", "Not a Franchise"; "Our shop is on Yorba Linda Blvd" | Homepage; `ServiceAreaSection`; `/air-conditioning/ac-repair/yorba-linda` hero ("based on Yorba Linda Blvd") | Phase 6 says Yorba Linda is an operational base, with no storefront implied | Owner confirms whether customers can visit. If not, use "based in Yorba Linda" |
| 2 | Tune-up "$89" vs "Starting at $99" | Homepage and promotions ($89); tune-up city titles and pages from `city-service-generator.ts` ($99) | Two prices for one service | Owner states the one current price; apply it in one place |
| 3 | Repair price ranges ($150–$450, $150–$400, $300–$800, $5,000–$12,000) | Generated city pages and guides | Unverified figures | Owner confirms, or replace with "diagnosis first, quote before work" |
| 4 | "0% interest options"; "0% financing over $500" | Homepage; generated FAQs (`city-service-generator.ts`, `ppc-city-generator.ts`) | Terms, lender and eligibility unknown | Owner supplies the real offer and terms, or remove |
| 5 | "Parts & Labor Warranty" | About 400 pages | No duration or terms stated | Owner supplies the terms, then state them |
| 6 | "No emergency surcharges" | About 73 emergency pages and FAQs | Absolute pricing promise | Owner confirms after-hours pricing policy |
| 7 | "Open Now", "Tech Available in Your Area", "appointments available today" badges | `CityServicePageTemplate` hero, PPC template (about 369 pages) | Static text shown regardless of real availability | Replace with a neutral badge ("Same-day service available") or drive it from real hours |
| 8 | "Real people, no voicemail", "We Answer Live" | Homepage; city pages | Call-handling policy unconfirmed | Owner confirms hours and answering policy |
| 9 | "All Major Brands Serviced" | Homepage | Brand list unverified | Owner confirms the brand list |
| 10 | Schema `priceRange: "$$"`, `paymentAccepted: "Cash, Credit Card, Financing"` | `src/lib/seo/schema.ts` | Financing tied to #4 | Align with #4 |
| 11 | License and insurance | `src/lib/config/credentials.ts` (CSLB null, `insuranceType` null) | No company license or insurance claims are published. Only generic "hire a licensed technician" text on 14 pages | Owner supplies the license and insurance details to enable gated copy. The CSLB number stays unpublished unless approved |
| 12 | Hidden "shortest drive time of any HVAC company" | `localContext` for YL emergency (hidden, `localContextVerified` unset) | Unsupported superlative, not rendered | Keep hidden, or the owner confirms |

Each owner-confirmed item can go in as its own small PR.
