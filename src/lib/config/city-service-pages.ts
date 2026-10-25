import { licenseOrHoursPoint } from "@/lib/config/credentials";
// City × Service landing page data
// URL pattern: /air-conditioning/[service]/[city]/
// Also used for /heating/heating-repair/[city]/ and /hvac-repair/[city]/

export type CityServicePage = {
  citySlug: string;
  cityName: string;
  serviceSlug: string;
  serviceName: string;
  urlBase: string; // e.g. "/air-conditioning/ac-repair"
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubheadline: string;
  localContext: string;
  urgencyNote: string; // "X appointments available today" type copy
  nearbyCities: { name: string; slug: string; urlBase: string }[];
  faqs: { question: string; answer: string }[];
  pricingNote: string;
  whyUsHeadline: string;
  whyUsPoints: { heading: string; body: string }[];
  servicesListHeadline: string;
  servicesList: string[];
  ctaBannerText: string;
};

// ─── PROMPT SET A — AC Repair × Cities ──────────────────────────────────────

export const AC_REPAIR_CITIES: CityServicePage[] = [
  // A1 — Yorba Linda (home base, highest priority)
  {
    citySlug: "yorba-linda",
    cityName: "Yorba Linda",
    serviceSlug: "ac-repair",
    serviceName: "AC Repair",
    urlBase: "/air-conditioning/ac-repair",
    metaTitle: "AC Repair in Yorba Linda, CA | Same-Day Service | (714) 410-2784",
    metaDescription:
      "Fast AC repair in Yorba Linda, CA. Same-day appointments, free diagnostic with repair. Call (714) 410-2784.",
    h1: "AC Repair in Yorba Linda, CA — Same-Day Service",
    heroSubheadline:
      "Your AC stopped working? We diagnose, quote, and fix it, with same-day service available. No guesswork, no upsells.",
    localContext:
      "Yorba Linda's hillside tract homes and 1970s–2000s construction mean we frequently work on both older R-22 systems due for replacement and newer R-410A equipment needing maintenance. Summer temperatures regularly push above 95°F in inland neighborhoods near Weir Canyon, making a functioning AC non-negotiable from June through September. Our shop is on Yorba Linda Blvd — we're literally your neighbors.",
    urgencyNote: "Serving Weir Canyon, Fairmont, and all Yorba Linda neighborhoods. Same-day service available.",
    nearbyCities: [
      { name: "Anaheim Hills", slug: "anaheim-hills", urlBase: "/air-conditioning/ac-repair" },
      { name: "Placentia", slug: "placentia", urlBase: "/air-conditioning/ac-repair" },
      { name: "Brea", slug: "brea", urlBase: "/air-conditioning/ac-repair" },
      { name: "Fullerton", slug: "fullerton", urlBase: "/air-conditioning/ac-repair" },
      { name: "Orange", slug: "orange", urlBase: "/air-conditioning/ac-repair" },
    ],
    faqs: [
      {
        question: "How fast can you get to Yorba Linda for an AC repair?",
        answer:
          "Our shop is on Yorba Linda Blvd, and we're open 24/7. Call us and we'll give you an arrival window when you book.",
      },
      {
        question: "Do you charge a diagnostic fee?",
        answer:
          "Free diagnostic — no charge to identify the problem. You only pay if we do the repair.",
      },
      {
        question: "Do you work on older R-22 systems?",
        answer:
          "Yes. Many Yorba Linda homes built in the 1970s–1990s still run R-22 systems, and we can service, recharge, or help you transition to a modern R-410A system.",
      },
      {
        question: "Do you offer financing?",
        answer:
          "Yes — 0% financing options are available on repairs and replacements over $500. Ask when you call.",
      },
      {
        question: "Are you available on weekends?",
        answer:
          "Yes. We offer service 7 days a week, including Saturday and emergency availability on Sunday.",
      },
    ],
    pricingNote: "Free diagnostic · Most common repairs: $150–$450 · Full system replacement: free estimate · 0% financing on repairs over $500",
    whyUsHeadline: "Why Yorba Linda Residents Choose Us",
    whyUsPoints: [
      {
        heading: "We're Based Here",
        body: "Our shop is on Yorba Linda Blvd, close to homes across the city.",
      },
      licenseOrHoursPoint(),
      {
        heading: "Same Technician Start to Finish",
        body: "You deal with one person — not a rotating cast. Your tech diagnoses, quotes, and fixes the problem.",
      },
      {
        heading: "Written Quote Before Any Work",
        body: "You approve the price in writing before we start. No bill surprises.",
      },
    ],
    servicesListHeadline: "What We Repair in Yorba Linda Homes",
    servicesList: [
      "Capacitor & contactor replacement",
      "Refrigerant leak detection & recharge",
      "Compressor diagnosis & replacement",
      "Thermostat & control board repair",
      "Condenser fan motor replacement",
      "Full system diagnostic — FREE",
      "Evaporator coil cleaning & service",
      "Drain line clearing & condensate repair",
    ],
    ctaBannerText: "AC Not Cooling? We're Available Today in Yorba Linda.",
  },

  // A2 — Anaheim
  {
    citySlug: "anaheim",
    cityName: "Anaheim",
    serviceSlug: "ac-repair",
    serviceName: "AC Repair",
    urlBase: "/air-conditioning/ac-repair",
    metaTitle: "AC Repair in Anaheim, CA | Same-Day HVAC Service | (714) 410-2784",
    metaDescription:
      "AC repair in Anaheim, CA — same-day service for homes and businesses. Free diagnostic with repair. Call (714) 410-2784.",
    h1: "AC Repair in Anaheim, CA — Same-Day Service",
    heroSubheadline:
      "Anaheim's heat won't wait. We diagnose, quote, and repair your AC, with same-day service available.",
    localContext:
      "Anaheim spans two very different climates: the coastal-influenced flatlands near the 5 freeway and the significantly hotter Anaheim Hills area, which sees some of the highest summer temperatures in the county. Anaheim Hills homes often have larger systems covering more square footage, while the resort district and surrounding commercial areas have specific commercial cooling demands year-round. Our shop is in nearby Yorba Linda.",
    urgencyNote: "Serving Anaheim Hills, the resort district, and all residential neighborhoods — from the 91 corridor to La Palma Ave.",
    nearbyCities: [
      { name: "Yorba Linda", slug: "yorba-linda", urlBase: "/air-conditioning/ac-repair" },
      { name: "Anaheim Hills", slug: "anaheim-hills", urlBase: "/air-conditioning/ac-repair" },
      { name: "Orange", slug: "orange", urlBase: "/air-conditioning/ac-repair" },
      { name: "Garden Grove", slug: "garden-grove", urlBase: "/air-conditioning/ac-repair" },
      { name: "Fullerton", slug: "fullerton", urlBase: "/air-conditioning/ac-repair" },
    ],
    faqs: [
      {
        question: "How fast can you get to Anaheim for an AC repair?",
        answer:
          "Our shop is in nearby Yorba Linda, and we're open 24/7. Call us and we'll give you an arrival window when you book.",
      },
      {
        question: "Do you service commercial properties in Anaheim?",
        answer:
          "Yes. We handle commercial HVAC for small businesses, retail, restaurants, and offices throughout Anaheim including the resort district and Lincoln Ave corridor.",
      },
      {
        question: "Do you charge extra for Anaheim Hills homes with larger systems?",
        answer:
          "No travel surcharges. Larger system repairs are priced based on parts and labor — we'll give you a written quote before any work begins.",
      },
      {
        question: "Do you charge a diagnostic fee in Anaheim?",
        answer:
          "Free diagnostic — no charge to identify the problem.",
      },
      {
        question: "Are you available on weekends in Anaheim?",
        answer:
          "Yes — 7 days a week. No weekend surcharge.",
      },
    ],
    pricingNote: "Free diagnostic · Most common repairs: $150–$450 · Free estimate on replacement · 0% financing available",
    whyUsHeadline: "Why Anaheim Homeowners & Businesses Choose Us",
    whyUsPoints: [
      {
        heading: "Based in Neighboring Yorba Linda",
        body: "Our shop is on Yorba Linda Blvd, a short drive from Anaheim.",
      },
      {
        heading: "Residential & Commercial",
        body: "We handle homes, apartments, and commercial properties including resort-area businesses and retail.",
      },
      {
        heading: "No Emergency Surcharges",
        body: "Weekend and evening service at standard rates — no inflated emergency pricing.",
      },
      {
        heading: "Written Quote Before Any Work",
        body: "You approve the price in writing before we start. No bill surprises.",
      },
    ],
    servicesListHeadline: "What We Repair in Anaheim Homes & Businesses",
    servicesList: [
      "Capacitor & contactor replacement",
      "Refrigerant leak detection & recharge",
      "Compressor diagnosis & replacement",
      "Thermostat & control board repair",
      "Condenser fan motor replacement",
      "Commercial package unit service",
      "Full system diagnostic — FREE",
      "Drain line clearing & condensate repair",
    ],
    ctaBannerText: "AC Not Cooling in Anaheim? We're Available Today.",
  },

  // A3 — Fullerton
  {
    citySlug: "fullerton",
    cityName: "Fullerton",
    serviceSlug: "ac-repair",
    serviceName: "AC Repair",
    urlBase: "/air-conditioning/ac-repair",
    metaTitle: "AC Repair in Fullerton, CA | Fast Same-Day Service | (714) 410-2784",
    metaDescription:
      "AC repair in Fullerton, CA. Same-day HVAC technicians for homes, rentals, and small businesses. Free diagnostic. (714) 410-2784.",
    h1: "AC Repair in Fullerton, CA — Same-Day Service",
    heroSubheadline:
      "AC down in Fullerton? We respond fast — same-day service for homes, rental properties, and small businesses.",
    localContext:
      "Fullerton's housing stock runs from 1950s–1980s single-family homes near downtown to newer developments and college-area rentals near Cal State Fullerton. Older homes frequently have aging systems — and landlords managing multi-unit buildings need fast, reliable service to keep tenants comfortable. Hot summers plus older ductwork equals frequent refrigerant and duct issues. Our shop is in nearby Yorba Linda.",
    urgencyNote: "Serving downtown Fullerton, CSUF area, and all residential and rental neighborhoods.",
    nearbyCities: [
      { name: "Yorba Linda", slug: "yorba-linda", urlBase: "/air-conditioning/ac-repair" },
      { name: "Placentia", slug: "placentia", urlBase: "/air-conditioning/ac-repair" },
      { name: "Anaheim", slug: "anaheim", urlBase: "/air-conditioning/ac-repair" },
      { name: "Brea", slug: "brea", urlBase: "/air-conditioning/ac-repair" },
    ],
    faqs: [
      {
        question: "How fast can you get to Fullerton for an AC repair?",
        answer:
          "Our shop is in nearby Yorba Linda, and we're open 24/7. Call us and we'll give you an arrival window when you book.",
      },
      {
        question: "Do you work with landlords and property managers in Fullerton?",
        answer:
          "Yes. We work with landlords managing single-unit and multi-unit properties throughout Fullerton. We can coordinate directly with tenants for access and provide repair documentation for your records.",
      },
      {
        question: "My Fullerton home has original 1960s ductwork — is repair still an option?",
        answer:
          "Absolutely. We assess the ductwork as part of every service call and will give you an honest picture of what's salvageable versus what needs replacement.",
      },
      {
        question: "Do you charge a diagnostic fee in Fullerton?",
        answer: "Free — no charge to diagnose the problem.",
      },
      {
        question: "Are you available on weekends?",
        answer: "Yes — 7 days a week, no weekend surcharge.",
      },
    ],
    pricingNote: "Free diagnostic · Most common repairs: $150–$450 · Free estimate on replacement · 0% financing available",
    whyUsHeadline: "Why Fullerton Homeowners & Landlords Choose Us",
    whyUsPoints: [
      {
        heading: "Landlord & Property Manager Friendly",
        body: "We coordinate with tenants directly, provide repair documentation, and understand the urgency of keeping rental units livable.",
      },
      {
        heading: "Older Home Specialists",
        body: "Fullerton's 1950s–1980s housing stock runs older Carrier, Trane, and Lennox systems, and we service them.",
      },
      {
        heading: "Based in Nearby Yorba Linda",
        body: "Our shop on Yorba Linda Blvd is a short drive from Fullerton.",
      },
      {
        heading: "No Surprise Bills",
        body: "Written quote approved before any work starts. Diagnostic fee waived with repair.",
      },
    ],
    servicesListHeadline: "What We Repair in Fullerton Homes & Rentals",
    servicesList: [
      "Capacitor & contactor replacement",
      "Refrigerant leak detection & recharge",
      "Compressor diagnosis & replacement",
      "Thermostat & control board repair",
      "Condenser fan motor replacement",
      "Ductwork inspection & sealing",
      "Full system diagnostic — FREE",
      "Drain line clearing & condensate repair",
    ],
    ctaBannerText: "AC Not Cooling in Fullerton? We're Available Today.",
  },

  // A4 — Irvine
  {
    citySlug: "irvine",
    cityName: "Irvine",
    serviceSlug: "ac-repair",
    serviceName: "AC Repair",
    urlBase: "/air-conditioning/ac-repair",
    metaTitle: "AC Repair in Irvine, CA | Same-Day HVAC Service | (714) 410-2784",
    metaDescription:
      "Fast AC repair in Irvine, CA for homes, condos, and offices. Same-day service, free estimates. Call (714) 410-2784.",
    h1: "AC Repair in Irvine, CA — Same-Day Service",
    heroSubheadline:
      "Premium AC repair for Irvine homes, condos, and office parks, with same-day availability.",
    localContext:
      "Irvine is master-planned with large HOA communities, tech campuses, and high-rise condos — systems tend to be newer but complex (multi-zone, smart thermostats, inverter compressors). Residents expect premium service and brand-certified technicians. Commercial HVAC is a significant opportunity in the Spectrum and John Wayne Airport corridor. We're familiar with Irvine's HOA requirements and permit processes.",
    urgencyNote: "Serving Woodbridge, Northwood, Quail Hill, Turtle Rock, the Spectrum, and all Irvine communities.",
    nearbyCities: [
      { name: "Tustin", slug: "tustin", urlBase: "/air-conditioning/ac-repair" },
      { name: "Lake Forest", slug: "lake-forest", urlBase: "/air-conditioning/ac-repair" },
      { name: "Costa Mesa", slug: "costa-mesa", urlBase: "/air-conditioning/ac-repair" },
      { name: "Laguna Niguel", slug: "laguna-niguel", urlBase: "/air-conditioning/ac-repair" },
      { name: "Mission Viejo", slug: "mission-viejo", urlBase: "/air-conditioning/ac-repair" },
    ],
    faqs: [
      {
        question: "Do you service modern multi-zone and smart thermostat systems in Irvine?",
        answer:
          "Yes. We service variable-speed compressors, inverter-driven systems, Nest/Ecobee/Honeywell smart thermostats, and multi-zone setups common in Irvine's newer HOA communities.",
      },
      {
        question: "Can you service commercial HVAC in Irvine office parks?",
        answer:
          "Yes. We service commercial and light-industrial HVAC in the Irvine Spectrum, John Wayne Airport corridor, and surrounding business parks.",
      },
      {
        question: "How fast can you get to Irvine?",
        answer:
          "Our shop is in nearby Yorba Linda, and we're open 24/7. Call us and we'll give you an arrival window when you book.",
      },
      {
        question: "Do you navigate Irvine HOA requirements for repairs and equipment placement?",
        answer:
          "Yes. We're familiar with Irvine Company and major HOA equipment screening and placement rules. We coordinate as needed.",
      },
      {
        question: "Do you charge a diagnostic fee in Irvine?",
        answer: "Free — no charge to diagnose the problem.",
      },
    ],
    pricingNote: "Free diagnostic · Most common repairs: $150–$500 · Free estimate on replacement · 0% financing available · Written labor warranty on all repairs",
    whyUsHeadline: "Why Irvine Residents & Businesses Choose Us",
    whyUsPoints: [
      {
        heading: "Modern System Expertise",
        body: "Variable-speed, inverter, multi-zone, smart thermostat — we service the complex systems common in Irvine's newer builds.",
      },
      {
        heading: "Commercial & Residential",
        body: "From condo units to office suites in the Spectrum corridor — one call covers both.",
      },
      {
        heading: "HOA-Compliant Work",
        body: "We know Irvine HOA requirements and work within them — no permit or placement surprises.",
      },
      {
        heading: "Written Warranty on All Repairs",
        body: "Every repair comes with a written parts and labor warranty. We stand behind our work.",
      },
    ],
    servicesListHeadline: "What We Repair in Irvine Homes, Condos & Offices",
    servicesList: [
      "Variable-speed & inverter compressor service",
      "Multi-zone damper & control board repair",
      "Smart thermostat diagnosis & replacement",
      "Refrigerant leak detection & recharge",
      "Capacitor, contactor & relay replacement",
      "Condenser fan motor replacement",
      "Full system diagnostic — FREE",
      "Commercial package unit service",
    ],
    ctaBannerText: "AC Not Cooling in Irvine? We're Available Today.",
  },

  // A5 — Orange
  {
    citySlug: "orange",
    cityName: "Orange",
    serviceSlug: "ac-repair",
    serviceName: "AC Repair",
    urlBase: "/air-conditioning/ac-repair",
    metaTitle: "AC Repair in Orange, CA | Same-Day Service | (714) 410-2784",
    metaDescription:
      "AC repair in Orange, CA. Same-day HVAC service for homes and businesses — from Old Towne to Santiago Canyon. Call (714) 410-2784.",
    h1: "AC Repair in Orange, CA — Same-Day Service",
    heroSubheadline:
      "AC out in Orange? We repair it — same day, with a written quote before we start.",
    localContext:
      "Orange has a diverse mix: historic Old Towne with homes pre-dating the 1960s, newer developments near Santiago Canyon, and commercial corridors along Chapman and Katella. Older homes near Old Towne may have original ductwork or window AC setups requiring a full assessment. Summer temps hit 95–100°F inland near Santiago Canyon. Our shop is in nearby Yorba Linda.",
    urgencyNote: "Serving Old Towne Orange, Santiago Canyon, the Metrolink corridor, and all residential neighborhoods.",
    nearbyCities: [
      { name: "Yorba Linda", slug: "yorba-linda", urlBase: "/air-conditioning/ac-repair" },
      { name: "Anaheim", slug: "anaheim", urlBase: "/air-conditioning/ac-repair" },
      { name: "Villa Park", slug: "villa-park", urlBase: "/air-conditioning/ac-repair" },
      { name: "Tustin", slug: "tustin", urlBase: "/air-conditioning/ac-repair" },
      { name: "Santa Ana", slug: "santa-ana", urlBase: "/air-conditioning/ac-repair" },
    ],
    faqs: [
      {
        question: "Do you service older homes in Old Towne Orange?",
        answer:
          "Yes. We regularly work on pre-1960s homes in Old Towne and nearby historic neighborhoods. We're experienced with older ductwork, original wall systems, and the specific challenges of retrofitting modern HVAC into historic structures.",
      },
      {
        question: "How fast can you get to Orange, CA for an AC repair?",
        answer:
          "Our shop is in nearby Yorba Linda, and we're open 24/7. Call us and we'll give you an arrival window when you book.",
      },
      {
        question: "Do you service the Santiago Hills and Canyon area of Orange?",
        answer:
          "Yes — including Santiago Hills, Orange Park Acres, and Canyon communities.",
      },
      {
        question: "Do you charge a diagnostic fee?",
        answer: "Free — no charge to diagnose the problem.",
      },
      {
        question: "Are you available on weekends?",
        answer: "Yes — 7 days a week, no weekend surcharge.",
      },
    ],
    pricingNote: "Free diagnostic · Most common repairs: $150–$450 · Free estimate on replacement · 0% financing available",
    whyUsHeadline: "Why Orange Homeowners Choose Us",
    whyUsPoints: [
      {
        heading: "Old Towne to Santiago Canyon",
        body: "We know Orange's full range — from historic 1940s homes to modern Santiago Hills developments.",
      },
      {
        heading: "Based in Nearby Yorba Linda",
        body: "Based in Yorba Linda, a short drive to any Orange neighborhood for same-day service.",
      },
      {
        heading: "Historic Home Experience",
        body: "We work on Old Towne and pre-war homes. We're careful, thorough, and honest.",
      },
      {
        heading: "Written Quote — Always",
        body: "You see the price before we start. Diagnostic fee waived with completed repair.",
      },
    ],
    servicesListHeadline: "What We Repair in Orange, CA Homes & Businesses",
    servicesList: [
      "Capacitor & contactor replacement",
      "Refrigerant leak detection & recharge",
      "Compressor diagnosis & replacement",
      "Thermostat & control board repair",
      "Condenser fan motor replacement",
      "Ductwork inspection & sealing (older homes)",
      "Full system diagnostic — FREE",
      "Window AC assessment & central AC conversion consultation",
    ],
    ctaBannerText: "AC Not Cooling in Orange? We're Available Today.",
  },
];

// ─── PROMPT SET B — Emergency AC Repair × Cities ─────────────────────────────

export const EMERGENCY_AC_CITIES: CityServicePage[] = [
  // B1 — Yorba Linda
  {
    citySlug: "yorba-linda",
    cityName: "Yorba Linda",
    serviceSlug: "emergency-ac-repair",
    serviceName: "Emergency AC Repair",
    urlBase: "/air-conditioning/emergency-ac-repair",
    metaTitle: "Emergency AC Repair in Yorba Linda, CA | Available Today | (714) 410-2784",
    metaDescription:
      "AC broke down in Yorba Linda? Same-day emergency HVAC service — real people answer, no voicemail. Free diagnostic, no emergency surcharge. Call (714) 410-2784.",
    h1: "AC Broke Down in Yorba Linda? We're Available Today.",
    heroSubheadline:
      "Real people answer — no voicemail. Same-day emergency HVAC service, 7 days a week.",
    localContext:
      "Our shop is on Yorba Linda Blvd — we have the shortest drive time of any HVAC company serving this city. When temperatures hit 95–100°F in inland neighborhoods near Weir Canyon, we treat every AC outage as an emergency and prioritize Yorba Linda calls.",
    urgencyNote: "Open 24/7, including emergency service. We dispatch from Yorba Linda Blvd.",
    nearbyCities: [
      { name: "Anaheim Hills", slug: "anaheim-hills", urlBase: "/air-conditioning/emergency-ac-repair" },
      { name: "Placentia", slug: "placentia", urlBase: "/air-conditioning/emergency-ac-repair" },
      { name: "Brea", slug: "brea", urlBase: "/air-conditioning/emergency-ac-repair" },
      { name: "Orange", slug: "orange", urlBase: "/air-conditioning/emergency-ac-repair" },
      { name: "Fullerton", slug: "fullerton", urlBase: "/air-conditioning/emergency-ac-repair" },
    ],
    faqs: [
      {
        question: "Do you charge extra for emergency or weekend calls in Yorba Linda?",
        answer:
          "No — same pricing as regular service. No emergency surcharges, no weekend premiums.",
      },
      {
        question: "How fast can you get to Yorba Linda for an emergency?",
        answer:
          "Same-day emergency service is available 24/7, and our shop is on Yorba Linda Blvd. Call us and we'll give you the earliest available arrival window.",
      },
      {
        question: "What if you can't fix it today?",
        answer:
          "We explain all options and provide a temporary solution where possible. We never leave you without a clear plan.",
      },
      {
        question: "Do you service all AC brands?",
        answer:
          "Yes — Lennox, Carrier, Trane, Rheem, York, Goodman, and all other major brands.",
      },
    ],
    pricingNote: "Free diagnostic · No emergency surcharges — same pricing as regular service · Financing available if repair cost is unexpected",
    whyUsHeadline: "Why Yorba Linda Homeowners Call Us First",
    whyUsPoints: [
      {
        heading: "Real People Answer",
        body: "Call any time during service hours and a real person picks up. No voicemail trees, no call centers.",
      },
      {
        heading: "No Emergency Surcharge",
        body: "Weekend and same-day emergency calls are priced the same as regular service. No surprises.",
      },
      {
        heading: "Based in Yorba Linda",
        body: "Our shop is on Yorba Linda Blvd, close to homes across the city.",
      },
      {
        heading: "Open 24 Hours, 7 Days a Week",
        body: "Call any time, day or night, including for emergency heating and cooling service.",
      },
    ],
    servicesListHeadline: "Common Emergency AC Situations We Handle",
    servicesList: [
      "AC stopped blowing cold air",
      "AC unit making loud banging or grinding noise",
      "Thermostat not responding",
      "AC running but house not cooling",
      "AC tripping the breaker",
      "Water leaking from AC unit",
      "AC burning smell — immediate safety check",
      "Complete system failure in extreme heat",
    ],
    ctaBannerText: "Don't Suffer Through the Heat. We Answer Live in Yorba Linda.",
  },

  // B2 — Anaheim
  {
    citySlug: "anaheim",
    cityName: "Anaheim",
    serviceSlug: "emergency-ac-repair",
    serviceName: "Emergency AC Repair",
    urlBase: "/air-conditioning/emergency-ac-repair",
    metaTitle: "Emergency AC Repair in Anaheim, CA | Same-Day HVAC | (714) 410-2784",
    metaDescription:
      "Emergency AC repair in Anaheim, CA. Same-day service for homes and businesses — real technicians answer live. No emergency surcharge. Call (714) 410-2784.",
    h1: "AC Broke Down in Anaheim? We're Available Today.",
    heroSubheadline:
      "Anaheim reaches 95–100°F in summer. Real people answer our phones — same-day emergency service for homes and businesses.",
    localContext:
      "Anaheim's summer heat is serious — especially for families with young children, elderly residents, and businesses that can't afford HVAC downtime. We serve both residential and commercial customers and understand the urgency of keeping Anaheim homes and businesses cool.",
    urgencyNote: "Open 24/7 for homes, hospitality and commercial customers.",
    nearbyCities: [
      { name: "Yorba Linda", slug: "yorba-linda", urlBase: "/air-conditioning/emergency-ac-repair" },
      { name: "Anaheim Hills", slug: "anaheim-hills", urlBase: "/air-conditioning/emergency-ac-repair" },
      { name: "Orange", slug: "orange", urlBase: "/air-conditioning/emergency-ac-repair" },
      { name: "Garden Grove", slug: "garden-grove", urlBase: "/air-conditioning/emergency-ac-repair" },
      { name: "Fullerton", slug: "fullerton", urlBase: "/air-conditioning/emergency-ac-repair" },
    ],
    faqs: [
      {
        question: "Do you charge extra for emergency calls in Anaheim?",
        answer:
          "No emergency surcharges. Residential and commercial emergency calls are priced the same as regular service.",
      },
      {
        question: "Do you handle commercial emergencies in Anaheim, including restaurants and retail?",
        answer:
          "Yes. We understand commercial downtime costs money. We prioritize commercial emergency calls and dispatch quickly to minimize disruption.",
      },
      {
        question: "How fast can you reach Anaheim for an emergency?",
        answer:
          "Our shop is in nearby Yorba Linda, and we're open 24/7. Call us and we'll give you an arrival window when you book.",
      },
      {
        question: "Do you work nights and weekends in Anaheim?",
        answer:
          "We offer extended availability on weekends and can handle after-hours calls for genuine emergencies. Call us — a real person answers.",
      },
    ],
    pricingNote: "Free diagnostic · No emergency surcharges · Same pricing 7 days a week · Financing available",
    whyUsHeadline: "Why Anaheim Calls Us for HVAC Emergencies",
    whyUsPoints: [
      {
        heading: "Real People Answer",
        body: "No voicemail, no call centers. A dispatcher picks up your call and confirms availability with you.",
      },
      {
        heading: "Residential & Commercial",
        body: "We handle emergency calls for homes, rental units, restaurants, retail, and hospitality businesses throughout Anaheim.",
      },
      {
        heading: "No Emergency Markup",
        body: "Same pricing whether you call on a Tuesday afternoon or Saturday morning. No surprise charges.",
      },
      {
        heading: "Open 24 Hours, 7 Days a Week",
        body: "Call any time, day or night, including for emergency heating and cooling service.",
      },
    ],
    servicesListHeadline: "Common Emergency AC Situations We Handle in Anaheim",
    servicesList: [
      "AC stopped blowing cold air",
      "AC unit making loud banging or grinding noise",
      "Thermostat not responding",
      "AC running but house not cooling",
      "AC tripping the breaker",
      "Water leaking from AC unit",
      "Commercial HVAC failure — restaurant, retail, office",
      "Complete system failure in extreme heat",
    ],
    ctaBannerText: "Don't Suffer Through the Heat. We Answer Live in Anaheim.",
  },
];

// ─── PROMPT SET C — Heating Repair × Cities ──────────────────────────────────

export const HEATING_REPAIR_CITIES: CityServicePage[] = [
  {
    citySlug: "yorba-linda",
    cityName: "Yorba Linda",
    serviceSlug: "heating-repair",
    serviceName: "Heating Repair",
    urlBase: "/heating/heating-repair",
    metaTitle: "Heating Repair in Yorba Linda, CA | AC & Heating | (714) 410-2784",
    metaDescription:
      "AC and heating repair in Yorba Linda, CA. Same-day furnace and HVAC service — free diagnostic with repair. Call (714) 410-2784.",
    h1: "AC & Heating Repair in Yorba Linda — Same-Day Service",
    heroSubheadline:
      "One local team handles your AC and heating — from summer emergencies to winter tune-ups.",
    localContext:
      "Yorba Linda winters drop to 40°F overnight — don't wait until your heater fails in January. Most Yorba Linda homes have split systems that handle both heating and cooling. One service call covers both. We're based on Yorba Linda Blvd and stock furnace parts for the brands most common in local homes.",
    urgencyNote: "Same-day heating service available. Don't wait for winter to discover a failed furnace.",
    nearbyCities: [
      { name: "Anaheim Hills", slug: "anaheim-hills", urlBase: "/heating/heating-repair" },
      { name: "Placentia", slug: "placentia", urlBase: "/heating/heating-repair" },
      { name: "Brea", slug: "brea", urlBase: "/heating/heating-repair" },
      { name: "Fullerton", slug: "fullerton", urlBase: "/heating/heating-repair" },
      { name: "Orange", slug: "orange", urlBase: "/heating/heating-repair" },
    ],
    faqs: [
      {
        question: "Do you repair both AC and heating systems in Yorba Linda?",
        answer:
          "Yes — we're a full HVAC contractor. We repair and maintain both air conditioning and heating systems, including furnaces, heat pumps, and thermostats.",
      },
      {
        question: "What heating services do you offer in Yorba Linda?",
        answer:
          "Furnace repair and tune-up, heat pump service, thermostat replacement, heating system diagnostic, duct inspection and sealing, and new heating system installation.",
      },
      {
        question: "How cold does Yorba Linda get in winter?",
        answer:
          "Yorba Linda winters regularly drop to the mid-30s–40s°F overnight, especially in elevated neighborhoods. A working heater isn't optional — it's essential for comfort and safety.",
      },
      {
        question: "Should I service my heating system before winter?",
        answer:
          "Yes — a fall tune-up is a smart investment that can catch igniter, heat exchanger, and filter issues before they cause a mid-winter breakdown.",
      },
    ],
    pricingNote: "Free diagnostic · Most furnace repairs: $150–$400 · Annual tune-up: from $99 · New system installation: free estimate",
    whyUsHeadline: "Why Yorba Linda Homeowners Trust Us with Heating & AC",
    whyUsPoints: [
      {
        heading: "One Company, Both Systems",
        body: "We service your AC and heating — so you're not managing two contractors or two maintenance schedules.",
      },
      {
        heading: "Based in Yorba Linda",
        body: "We're on Yorba Linda Blvd, not commuting from another county.",
      },
      {
        heading: "Seasonal Tune-Up Specialists",
        body: "Fall heating tune-up + spring AC tune-up = a system that runs reliably year-round.",
      },
      {
        heading: "Transparent Pricing",
        body: "Written quote before any work. Free diagnostic — no charge to identify the problem.",
      },
    ],
    servicesListHeadline: "Heating Services We Offer in Yorba Linda",
    servicesList: [
      "Furnace repair and tune-up",
      "Heat pump service and repair",
      "Thermostat replacement",
      "Heating system diagnostic — FREE",
      "Duct inspection and sealing",
      "Igniter & heat exchanger service",
      "New heating system installation (free estimate)",
      "Annual AC + heating maintenance plan",
    ],
    ctaBannerText: "Heater Not Working in Yorba Linda? We're Available Today.",
  },
];

// ─── PROMPT SET D — AC Tune-Up × Cities ──────────────────────────────────────

export const AC_TUNEUP_CITIES: CityServicePage[] = [
  {
    citySlug: "yorba-linda",
    cityName: "Yorba Linda",
    serviceSlug: "ac-tune-up",
    serviceName: "AC Tune-Up",
    urlBase: "/air-conditioning/ac-tune-up",
    metaTitle: "AC Tune-Up in Yorba Linda, CA | Starting at $99 | (714) 410-2784",
    metaDescription:
      "AC tune-up and maintenance in Yorba Linda, CA. 20-point inspection starting at $99. Same-week appointments. Call (714) 410-2784.",
    h1: "AC Tune-Up in Yorba Linda — Starting at $99",
    heroSubheadline:
      "A 20-point maintenance visit keeps your system running efficiently all summer.",
    localContext:
      "Inland temps in Yorba Linda hit 95–100°F — an under-maintained system works 30% harder and fails more often during peak heat. Yorba Linda's mix of 1970s–2000s housing means many systems are approaching or past their ideal service interval. A spring tune-up is the most cost-effective investment you can make before cooling season.",
    urgencyNote: "Book your tune-up before the summer rush.",
    nearbyCities: [
      { name: "Anaheim Hills", slug: "anaheim-hills", urlBase: "/air-conditioning/ac-tune-up" },
      { name: "Placentia", slug: "placentia", urlBase: "/air-conditioning/ac-tune-up" },
      { name: "Brea", slug: "brea", urlBase: "/air-conditioning/ac-tune-up" },
      { name: "Fullerton", slug: "fullerton", urlBase: "/air-conditioning/ac-tune-up" },
      { name: "Orange", slug: "orange", urlBase: "/air-conditioning/ac-tune-up" },
    ],
    faqs: [
      {
        question: "What's included in the $99 AC tune-up?",
        answer:
          "20-point inspection: refrigerant level check, coil cleaning (evaporator & condenser), electrical connection inspection, thermostat calibration, capacitor and contactor check, blower motor check, filter replacement (if needed), duct inspection, drain line flush, and full system performance test.",
      },
      {
        question: "How often should I get an AC tune-up in Yorba Linda?",
        answer:
          "Once a year is the minimum — ideally in spring before cooling season. Given Yorba Linda's long, hot summers, some homeowners opt for a second fall inspection as well.",
      },
      {
        question: "Can a tune-up extend the life of my AC system?",
        answer:
          "Yes. A maintained system typically lasts 15–20 years; an unmaintained one averages 10–12. Regular tune-ups also keep energy bills lower by maintaining efficiency.",
      },
      {
        question: "Do you offer a maintenance plan for Yorba Linda homes?",
        answer:
          "Yes — our annual plan includes one spring tune-up + one fall inspection for $149/year. Ask when you call.",
      },
    ],
    pricingNote: "AC Tune-Up: from $99 · Annual maintenance plan: $149/year (spring + fall) · Covers: refrigerant check, coil cleaning, electrical inspection, filter, drain flush, and full performance test",
    whyUsHeadline: "Why Yorba Linda Homeowners Tune Up with Us",
    whyUsPoints: [
      {
        heading: "20-Point Inspection",
        body: "We check everything — not just the filter. Refrigerant, coils, electrical, drain line, and full performance test.",
      },
      {
        heading: "Catch Problems Early",
        body: "Tune-up now: $99. Emergency repair in July: $300–$800. New system: $5,000–$12,000. The math is clear.",
      },
      {
        heading: "Flexible Scheduling",
        body: "Call to book a tune-up at a time that works for you.",
      },
      {
        heading: "Local, Honest Team",
        body: "We're based in Yorba Linda. We won't upsell unnecessary parts or scare you into a replacement your system doesn't need.",
      },
    ],
    servicesListHeadline: "What's Included in Your Yorba Linda AC Tune-Up",
    servicesList: [
      "Refrigerant level check",
      "Coil cleaning (evaporator & condenser)",
      "Electrical connection inspection",
      "Thermostat calibration",
      "Capacitor and contactor check",
      "Blower motor check",
      "Filter replacement (if needed)",
      "Drain line flush",
      "Full system performance test",
      "Written inspection report",
    ],
    ctaBannerText: "Ready for a Tune-Up? Book Your Yorba Linda AC Service Today.",
  },
];

// ─── PROMPT SET E — Local HVAC Repair × Cities ───────────────────────────────

export const LOCAL_HVAC_CITIES: CityServicePage[] = [
  {
    citySlug: "yorba-linda",
    cityName: "Yorba Linda",
    serviceSlug: "hvac-repair",
    serviceName: "Local HVAC Repair",
    urlBase: "/hvac-repair",
    metaTitle: "Local HVAC Repair in Yorba Linda, CA | Your Neighborhood HVAC Team | (714) 410-2784",
    metaDescription:
      "Local HVAC repair in Yorba Linda, CA. Based on Yorba Linda Blvd — not a franchise, not a call center. Same-day service, honest pricing. (714) 410-2784.",
    h1: "Local HVAC Repair in Yorba Linda — Your Neighbors",
    heroSubheadline:
      "Not a franchise. Not a call center. We're based on Yorba Linda Blvd and we know your neighborhood.",
    localContext:
      "We've been serving Yorba Linda homes from our shop on Yorba Linda Blvd. We know the neighborhoods — Weir Canyon, Fairmont, Vista Del Verde, the hillside tracts — and the systems that run in them. When you call, you reach our actual team, not a national dispatch center.",
    urgencyNote: "Same-day service from your local Yorba Linda HVAC team.",
    nearbyCities: [
      { name: "Anaheim Hills", slug: "anaheim-hills", urlBase: "/hvac-repair" },
      { name: "Placentia", slug: "placentia", urlBase: "/hvac-repair" },
      { name: "Brea", slug: "brea", urlBase: "/hvac-repair" },
      { name: "Fullerton", slug: "fullerton", urlBase: "/hvac-repair" },
      { name: "Orange", slug: "orange", urlBase: "/hvac-repair" },
    ],
    faqs: [
      {
        question: "Are you a local company or a national franchise?",
        answer:
          "Locally owned and operated. Our shop is at 18340 Yorba Linda Blvd #107, Yorba Linda, CA 92886. We're not a franchise or a national chain with a local phone number.",
      },
      {
        question: "What areas around Yorba Linda do you serve?",
        answer:
          "We service all of Yorba Linda including Weir Canyon, Fairmont, Vista Del Verde, the hillside tracts, and the Yorba Linda Blvd corridor, plus all of Orange County.",
      },
      {
        question: "Do you offer any maintenance plans for Yorba Linda homeowners?",
        answer:
          "Yes — annual maintenance plan: spring AC tune-up + fall heating inspection for $149/year. Includes priority scheduling and a 10% repair discount.",
      },
      {
        question: "Can I get the same technician each visit?",
        answer:
          "We do our best to assign the same technician to returning customers. You're not dealing with a rotating cast from a dispatch pool.",
      },
    ],
    pricingNote: "Free diagnostic · Full HVAC services: AC repair, heating, installation, ductwork, maintenance · 0% financing available",
    whyUsHeadline: "Why Local Beats National Chains for HVAC",
    whyUsPoints: [
      {
        heading: "We Answer Our Own Phones",
        body: "No call center, no national dispatch. You reach our actual team when you call.",
      },
      {
        heading: "Same Technician Every Visit",
        body: "We assign consistent technicians to returning customers. No reintroducing yourself each time.",
      },
      {
        heading: "No Upsell Scripts",
        body: "We're not incentivized to push unnecessary repairs or replacements. Just honest diagnosis.",
      },
      {
        heading: "Based in Yorba Linda",
        body: "Our shop is on Yorba Linda Blvd, close to homes across the city.",
      },
    ],
    servicesListHeadline: "Full HVAC Services for Yorba Linda Homes & Businesses",
    servicesList: [
      "AC repair — all brands",
      "Heating & furnace repair",
      "AC installation & replacement",
      "Ductless mini-split service",
      "Ductwork inspection & sealing",
      "AC maintenance & tune-up",
      "Thermostat installation",
      "Commercial HVAC service",
    ],
    ctaBannerText: "Your Local Yorba Linda HVAC Team — Available Today.",
  },
];

// ─── Combined lookup helpers ─────────────────────────────────────────────────

import { generateCityServicePages } from "@/lib/config/city-service-generator";

export type ServiceSetKey =
  | "ac-repair"
  | "emergency-ac-repair"
  | "heating-repair"
  | "ac-tune-up"
  | "hvac-repair";

function mergeWithGenerated(
  serviceSlug: string,
  handwritten: CityServicePage[],
): CityServicePage[] {
  const existingSlugs = new Set(handwritten.map((p) => p.citySlug));
  return [...handwritten, ...generateCityServicePages(serviceSlug, existingSlugs)];
}

export const CITY_SERVICE_MAP: Record<ServiceSetKey, CityServicePage[]> = {
  "ac-repair": mergeWithGenerated("ac-repair", AC_REPAIR_CITIES),
  "emergency-ac-repair": mergeWithGenerated("emergency-ac-repair", EMERGENCY_AC_CITIES),
  "heating-repair": mergeWithGenerated("heating-repair", HEATING_REPAIR_CITIES),
  "ac-tune-up": mergeWithGenerated("ac-tune-up", AC_TUNEUP_CITIES),
  "hvac-repair": mergeWithGenerated("hvac-repair", LOCAL_HVAC_CITIES),
};

export function getCityServicePage(serviceSlug: string, citySlug: string): CityServicePage | undefined {
  const set = CITY_SERVICE_MAP[serviceSlug as ServiceSetKey];
  if (!set) return undefined;
  return set.find((p) => p.citySlug === citySlug);
}

/** Params for the /air-conditioning/[service]/[city] dynamic route only.
 *  heating-repair has /heating/heating-repair/[city]; hvac-repair has /hvac-repair/[city]. */
export function getAllCityServiceParams(): { service: string; city: string }[] {
  const routedKeys: ServiceSetKey[] = ["ac-repair", "emergency-ac-repair", "ac-tune-up"];
  return routedKeys.flatMap((service) =>
    CITY_SERVICE_MAP[service].map((p) => ({ service, city: p.citySlug }))
  );
}

export function getLocalHvacPage(citySlug: string): CityServicePage | undefined {
  return CITY_SERVICE_MAP["hvac-repair"].find((p) => p.citySlug === citySlug);
}

export function getAllLocalHvacParams(): { city: string }[] {
  return CITY_SERVICE_MAP["hvac-repair"].map((p) => ({ city: p.citySlug }));
}
