/**
 * Hand-written content for individual city hub pages (/service-areas/[county]/[city]).
 *
 * A hub listed here gets its own title, description, intro, service cards, content
 * sections, lead form and FAQs; every other hub keeps the template output from
 * `locations.ts`. Copy rules (Phase 2.3 P1): only facts that are on approved business
 * data (src/lib/config/site.ts) or an official public source linked in the copy. No
 * response times, stocked parts, brand claims, local job claims, reviews or statistics.
 *
 * Sources checked 2026-10-19:
 *   EPA HCFC-22 phaseout: https://www.epa.gov/ods-phaseout/residential-air-conditioning-and-phaseout-hcfc-22-what-you-need-know
 *   EPA Technology Transitions: https://www.epa.gov/hfcs/technology-transitions-program
 *   Yorba Linda permits: https://www.yorbalindaca.gov/477/Permit-Process
 *   Placentia Building and Safety: https://placentia.org/58/Building-and-Safety
 *   Costa Mesa Building Safety: https://www.costamesaca.gov/government/departments-and-divisions/economic-and-development-services/building-safety
 */

/** A run of text: plain strings, internal links ("/path") and external source links. */
export type HubText = (string | { href: string; label: string })[];

export type CityHubContent = {
  meta: { title: string; description: string };
  blurb: string;
  localContext: string;
  /** "What {City} residents call us for" cards, pointing at the city's own service pages. */
  serviceCards: { slug: string; href: string; label: string }[];
  sections: { heading: string; paragraphs: HubText[] }[];
  faqs: { question: string; answer: string }[];
  sidebarNote: string;
  formNote: string;
  ctaNote: string;
};

const EPA_R22 = "https://www.epa.gov/ods-phaseout/residential-air-conditioning-and-phaseout-hcfc-22-what-you-need-know";
const EPA_TT = "https://www.epa.gov/hfcs/technology-transitions-program";

const REFRIGERANT_PARAGRAPH: HubText = [
  "If your system still runs on R-22, you can keep using it. The ",
  { href: EPA_R22, label: "EPA ended U.S. production and import of R-22" },
  " on January 1, 2020, so repairs that need refrigerant depend on reclaimed supply. New central air conditioners and heat pumps made since January 1, 2025 use lower-GWP refrigerants under the EPA's ",
  { href: EPA_TT, label: "Technology Transitions rules" },
  ".",
];

const R22_FAQ = {
  question: "My air conditioner uses R-22. Do I have to replace it?",
  answer:
    "No. The EPA ended U.S. production and import of R-22 on January 1, 2020, but you can keep using an existing R-22 system. Repairs that need more refrigerant depend on reclaimed R-22, so when a major part such as the compressor fails, it is worth comparing the repair quote with the cost of a new system.",
};

const SHARED = {
  sidebarNote:
    "We are open 24 hours a day, 7 days a week, including emergency service. Call us or send a request online.",
  formNote: "Tell us what is going on and where. We will contact you to schedule.",
};

export const CITY_HUBS: Record<string, CityHubContent> = {
  "orange-county/placentia": {
    meta: {
      title: "Placentia HVAC: Furnace & AC Service",
      description:
        "Heating and air conditioning service in Placentia, CA: furnace and heating repair, AC repair, tune-ups and new system installation. Call (714) 410-2784.",
    },
    blurb: "Heating and air conditioning service for Placentia homes and businesses, from our shop in neighboring Yorba Linda.",
    localContext:
      "We repair and maintain furnaces, heat pumps and central air conditioners in Placentia, and replace systems that have reached the end of their life. Start with the service you need below, or send a request and we will contact you to schedule.",
    serviceCards: [
      { slug: "ac-repair", href: "/air-conditioning/ac-repair/placentia", label: "AC Repair in Placentia" },
      { slug: "heating-repair", href: "/heating/heating-repair/placentia", label: "Heating Repair in Placentia" },
      { slug: "ac-tune-up", href: "/air-conditioning/ac-tune-up/placentia", label: "AC Tune-Up in Placentia" },
    ],
    sections: [
      {
        heading: "Furnace and Heating Repair in Placentia",
        paragraphs: [
          [
            "We repair gas and electric furnaces and heat pumps. Signs that a heating system needs attention include no heat or weak airflow, a furnace that starts and stops repeatedly, a burning smell that lasts beyond the first run of the season, and an ignition that will not stay lit.",
          ],
          [
            "See ",
            { href: "/heating/heating-repair/placentia", label: "heating repair in Placentia" },
            " for what a repair visit covers, or ",
            { href: "/heating/furnace-repair", label: "furnace repair" },
            " for gas and electric furnaces. If you smell gas, leave the house first and call your gas utility or 911 from outside.",
          ],
        ],
      },
      {
        heading: "Air Conditioning Repair and Tune-Ups in Placentia",
        paragraphs: [
          [
            "If your AC runs but does not cool, keeps cycling on and off, or is leaking water indoors, start with ",
            { href: "/air-conditioning/ac-repair/placentia", label: "air conditioning repair in Placentia" },
            ". If it has stopped completely, ",
            { href: "/air-conditioning/emergency-ac-repair/placentia", label: "emergency AC repair in Placentia" },
            " lists what to do while you wait for a technician.",
          ],
          [
            "A yearly ",
            { href: "/air-conditioning/ac-tune-up/placentia", label: "AC tune-up" },
            " before summer is a good time to catch worn capacitors, dirty coils and restricted airflow before they cause a breakdown.",
          ],
        ],
      },
      {
        heading: "Replacing an AC or Furnace in Placentia",
        paragraphs: [
          [
            "Placentia's ",
            { href: "https://placentia.org/58/Building-and-Safety", label: "Building and Safety Division" },
            " handles mechanical permits, the permit type that covers HVAC equipment, and you can look up permits already issued for a property through the city's online records. For questions about a specific project, the division's number is (714) 993-8124.",
          ],
          REFRIGERANT_PARAGRAPH,
          [
            "Our ",
            { href: "/air-conditioning/ac-installation", label: "AC installation" },
            " and ",
            { href: "/heating/furnace-installation", label: "furnace installation" },
            " pages explain what a replacement involves.",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "Do you repair furnaces and heating systems in Placentia?",
        answer:
          "Yes. We repair gas and electric furnaces and heat pumps in Placentia. Call (714) 410-2784 or send a request online, and see our Placentia heating repair page for what a repair visit covers.",
      },
      {
        question: "Do you repair air conditioning in Placentia?",
        answer:
          "Yes. We diagnose and repair central air conditioners and heat pumps in Placentia. Our Placentia AC repair page covers common problems, and the emergency AC repair page lists what to do if your system stops completely.",
      },
      {
        question: "Do I need a permit to replace my AC or furnace in Placentia?",
        answer:
          "Placentia's Building and Safety Division handles mechanical permits, which cover HVAC equipment. Ask your contractor whether your replacement needs one, or call the division at (714) 993-8124.",
      },
      R22_FAQ,
      {
        question: "Do you work on heat pumps and ductless mini-splits?",
        answer:
          "Yes. We repair and install heat pumps and ductless mini-split systems as well as central air conditioners and furnaces.",
      },
      {
        question: "How do I schedule HVAC service in Placentia?",
        answer:
          "Call (714) 410-2784 or fill in the request form on this page with your name, phone number, the service you need and your address. We will contact you to schedule a visit.",
      },
    ],
    ...SHARED,
    ctaNote: "Call us or send a request online. Our shop is in neighboring Yorba Linda.",
  },

  "orange-county/costa-mesa": {
    meta: {
      title: "Costa Mesa HVAC Repair & Installation",
      description:
        "HVAC service in Costa Mesa, CA: furnace and heating repair, AC and HVAC installation, and maintenance for coastal homes. Call (714) 410-2784.",
    },
    blurb: "Heating and air conditioning service for Costa Mesa homes and businesses: repairs, maintenance and new system installation.",
    localContext:
      "Costa Mesa's coastal climate is mild for much of the year, but salt-laden air wears on outdoor condenser coils and copper refrigerant lines over time. Regular coil cleaning and inspection help catch corrosion before it turns into a refrigerant leak.",
    serviceCards: [
      { slug: "heating-repair", href: "/heating/heating-repair/costa-mesa", label: "Heating Repair in Costa Mesa" },
      { slug: "ac-repair", href: "/air-conditioning/ac-repair/costa-mesa", label: "AC Repair in Costa Mesa" },
      { slug: "ac-tune-up", href: "/air-conditioning/ac-tune-up/costa-mesa", label: "AC Tune-Up in Costa Mesa" },
    ],
    sections: [
      {
        heading: "Furnace and Heating Repair in Costa Mesa",
        paragraphs: [
          [
            "We repair gas and electric furnaces and heat pumps. Signs that a heating system needs attention include no heat or weak airflow, a furnace that starts and stops repeatedly, a burning smell that lasts beyond the first run of the season, and an ignition that will not stay lit.",
          ],
          [
            "See ",
            { href: "/heating/heating-repair/costa-mesa", label: "heating repair in Costa Mesa" },
            " for what a repair visit covers, or ",
            { href: "/heating/furnace-repair", label: "furnace repair" },
            " for gas and electric furnaces. If you smell gas, leave the house first and call your gas utility or 911 from outside.",
          ],
        ],
      },
      {
        heading: "AC and HVAC Installation in Costa Mesa",
        paragraphs: [
          [
            "We install central air conditioners, furnaces, heat pumps and ductless mini-splits. Start with ",
            { href: "/air-conditioning/ac-installation", label: "AC installation" },
            ", ",
            { href: "/heating/furnace-installation", label: "furnace installation" },
            " or ",
            { href: "/heat-pumps/heat-pump-installation", label: "heat pump installation" },
            ". For a home or room addition without ductwork, a ",
            { href: "/ductless/mini-split-installation", label: "ductless mini-split" },
            " avoids running new ducts.",
          ],
          [
            "In Costa Mesa, HVAC replacements are permitted as mechanical work through the city's ",
            {
              href: "https://www.costamesaca.gov/government/departments-and-divisions/economic-and-development-services/building-safety",
              label: "Building Safety Division",
            },
            ", which takes permit applications online.",
          ],
          REFRIGERANT_PARAGRAPH,
        ],
      },
      {
        heading: "AC Maintenance Near the Coast",
        paragraphs: [
          [
            "Salt air makes outdoor condensers near the coast corrode faster than inland ones. A yearly ",
            { href: "/air-conditioning/ac-tune-up/costa-mesa", label: "AC tune-up in Costa Mesa" },
            " includes cleaning and inspecting the outdoor coil, and a ",
            { href: "/maintenance-plans", label: "maintenance plan" },
            " keeps those visits on schedule. For repairs, see ",
            { href: "/air-conditioning/ac-repair/costa-mesa", label: "AC repair in Costa Mesa" },
            ".",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "Do you repair furnaces and heating systems in Costa Mesa?",
        answer:
          "Yes. We repair gas and electric furnaces and heat pumps in Costa Mesa. Call (714) 410-2784 or send a request online, and see our Costa Mesa heating repair page for what a repair visit covers.",
      },
      {
        question: "Do you install new AC and HVAC systems in Costa Mesa?",
        answer:
          "Yes. We install central air conditioners, furnaces, heat pumps and ductless mini-split systems. Our AC installation page explains what a replacement involves.",
      },
      {
        question: "Does replacing an AC or furnace in Costa Mesa need a permit?",
        answer:
          "HVAC replacements in Costa Mesa are permitted as mechanical work through the city's Building Safety Division, which takes applications online. Ask your contractor to confirm the permit for your job.",
      },
      {
        question: "Does coastal air affect my AC system in Costa Mesa?",
        answer:
          "Over time, yes. Salt-laden coastal air speeds up corrosion on condenser coils and copper refrigerant lines. Regular coil cleaning and inspection catch this before it becomes a refrigerant leak or a compressor failure.",
      },
      R22_FAQ,
      {
        question: "Can a Costa Mesa home without ducts get air conditioning?",
        answer:
          "Yes. Ductless mini-split systems cool and heat individual rooms without ductwork, which suits older homes and room additions.",
      },
    ],
    ...SHARED,
    ctaNote: "Call us or send a request online for HVAC service anywhere in Costa Mesa.",
  },

  "orange-county/yorba-linda": {
    meta: {
      title: "Yorba Linda HVAC: Furnace & AC Service",
      description:
        "Heating and air conditioning from our shop on Yorba Linda Blvd: furnace and heating repair, AC service, tune-ups and replacements. Call (714) 410-2784.",
    },
    blurb: "Heating and air conditioning service for Yorba Linda homes and businesses, from our shop at 18340 Yorba Linda Blvd.",
    localContext:
      "We repair and maintain furnaces, heat pumps and central air conditioners across Yorba Linda, and replace systems that have reached the end of their life. Choose a service below, or send a request and we will contact you to schedule.",
    serviceCards: [
      { slug: "heating-repair", href: "/heating/heating-repair/yorba-linda", label: "Heating Repair in Yorba Linda" },
      { slug: "ac-repair", href: "/air-conditioning/ac-repair/yorba-linda", label: "AC Repair in Yorba Linda" },
      { slug: "ac-tune-up", href: "/air-conditioning/ac-tune-up/yorba-linda", label: "AC Tune-Up in Yorba Linda" },
    ],
    sections: [
      {
        heading: "Furnace and Heating Repair in Yorba Linda",
        paragraphs: [
          [
            "We repair gas and electric furnaces and heat pumps. Signs that a heating system needs attention include no heat or weak airflow, a furnace that starts and stops repeatedly, a burning smell that lasts beyond the first run of the season, and an ignition that will not stay lit.",
          ],
          [
            "See ",
            { href: "/heating/heating-repair/yorba-linda", label: "heating repair in Yorba Linda" },
            " for what a repair visit covers, or ",
            { href: "/heating/furnace-repair", label: "furnace repair" },
            " for gas and electric furnaces. If you smell gas, leave the house first and call your gas utility or 911 from outside.",
          ],
        ],
      },
      {
        heading: "Air Conditioning Service in Yorba Linda",
        paragraphs: [
          [
            "For an AC that runs but does not cool, cycles on and off, or leaks water indoors, start with ",
            { href: "/air-conditioning/ac-repair/yorba-linda", label: "AC repair in Yorba Linda" },
            ". If it has stopped completely, ",
            { href: "/air-conditioning/emergency-ac-repair/yorba-linda", label: "emergency AC repair in Yorba Linda" },
            " lists what to do while you wait for a technician. A yearly ",
            { href: "/air-conditioning/ac-tune-up/yorba-linda", label: "AC tune-up" },
            " before summer helps catch worn parts before they fail.",
          ],
        ],
      },
      {
        heading: "Replacing an AC or Furnace in Yorba Linda",
        paragraphs: [
          [
            "The City of Yorba Linda ",
            { href: "https://www.yorbalindaca.gov/477/Permit-Process", label: "requires permits" },
            " for heating, ventilating and air-conditioning systems, issued by the Building Department as mechanical permits. If you live in a community with a homeowners association, check its rules on outdoor equipment before a replacement.",
          ],
          REFRIGERANT_PARAGRAPH,
          [
            "Our ",
            { href: "/air-conditioning/ac-installation", label: "AC installation" },
            " and ",
            { href: "/heating/furnace-installation", label: "furnace installation" },
            " pages explain what a replacement involves.",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "Where is your shop in Yorba Linda?",
        answer: "Our shop is at 18340 Yorba Linda Blvd #107, Yorba Linda, CA 92886. Call (714) 410-2784 to schedule service.",
      },
      {
        question: "Do you repair furnaces and heating systems in Yorba Linda?",
        answer:
          "Yes. We repair gas and electric furnaces and heat pumps in Yorba Linda. See our Yorba Linda heating repair page for what a repair visit covers.",
      },
      {
        question: "Do I need a permit to replace my AC or furnace in Yorba Linda?",
        answer:
          "Yes. The City of Yorba Linda requires permits for heating, ventilating and air-conditioning systems, issued by the Building Department as mechanical permits. If you live in an HOA community, check its rules on outdoor equipment as well.",
      },
      R22_FAQ,
      {
        question: "Do you work on heat pumps and ductless mini-splits?",
        answer:
          "Yes. We repair and install heat pumps and ductless mini-split systems as well as central air conditioners and furnaces.",
      },
      {
        question: "How do I schedule HVAC service in Yorba Linda?",
        answer:
          "Call (714) 410-2784 or fill in the request form on this page with your name, phone number, the service you need and your address. We will contact you to schedule a visit.",
      },
    ],
    ...SHARED,
    ctaNote: "Call us or send a request online. Our shop is on Yorba Linda Blvd.",
  },
};

// ─── Generated hubs (Phase 2.3 P4) ────────────────────────────────────────────
//
// The remaining 34 hubs share one structure built from facts we can verify:
// the city's name, its own service pages, the owner-confirmed 24/7 emergency and
// same-day service, the EPA refrigerant sources above, and the office that issues
// HVAC (mechanical) permits for the address, linked to its official page. A hub
// listed with `permit: null` simply leaves the permit paragraph out.

type PermitOffice = { office: string; url: string };

type HubFacts = {
  city: string;
  /** Short title prefix override, e.g. "Orange, CA" where the bare name is ambiguous. */
  titleName?: string;
  permit: PermitOffice | null;
};

const HUB_FACTS: Record<string, HubFacts> = {
  "los-angeles-county/diamond-bar": { city: "Diamond Bar", permit: null },
  "los-angeles-county/hacienda-heights": { city: "Hacienda Heights", permit: null },
  "los-angeles-county/la-habra-heights": { city: "La Habra Heights", permit: null },
  "los-angeles-county/rowland-heights": { city: "Rowland Heights", permit: null },
  "los-angeles-county/walnut": { city: "Walnut", permit: null },
  "orange-county/aliso-viejo": { city: "Aliso Viejo", permit: null },
  "orange-county/anaheim": { city: "Anaheim", permit: null },
  "orange-county/anaheim-hills": { city: "Anaheim Hills", permit: null },
  "orange-county/brea": { city: "Brea", permit: null },
  "orange-county/fullerton": { city: "Fullerton", permit: null },
  "orange-county/garden-grove": { city: "Garden Grove", permit: null },
  "orange-county/huntington-beach": { city: "Huntington Beach", permit: null },
  "orange-county/irvine": { city: "Irvine", permit: null },
  "orange-county/laguna-niguel": { city: "Laguna Niguel", permit: null },
  "orange-county/lake-forest": { city: "Lake Forest", permit: null },
  "orange-county/mission-viejo": { city: "Mission Viejo", permit: null },
  "orange-county/newport-beach": { city: "Newport Beach", permit: null },
  "orange-county/orange": { city: "Orange", titleName: "Orange, CA", permit: null },
  "orange-county/san-clemente": { city: "San Clemente", permit: null },
  "orange-county/santa-ana": { city: "Santa Ana", permit: null },
  "orange-county/tustin": { city: "Tustin", permit: null },
  "orange-county/villa-park": { city: "Villa Park", permit: null },
  "orange-county/westminster": { city: "Westminster", permit: null },
  "riverside-county/corona": { city: "Corona", permit: null },
  "riverside-county/eastvale": { city: "Eastvale", permit: null },
  "riverside-county/norco": { city: "Norco", permit: null },
  "san-bernardino-county/chino": { city: "Chino", permit: null },
  "san-bernardino-county/chino-hills": { city: "Chino Hills", permit: null },
  "san-bernardino-county/ontario": { city: "Ontario", titleName: "Ontario, CA", permit: null },
  "santa-barbara-county/goleta": { city: "Goleta", permit: null },
  "santa-barbara-county/santa-barbara": { city: "Santa Barbara", permit: null },
  "ventura-county/moorpark": { city: "Moorpark", permit: null },
  "ventura-county/simi-valley": { city: "Simi Valley", permit: null },
  "ventura-county/thousand-oaks": { city: "Thousand Oaks", permit: null },
};

const BRAND_SUFFIX_LENGTH = " | HVAC Service & AC Repair".length;

/** The longest of these that keeps the rendered title (with the brand suffix) within 65 characters. */
function hubTitle(name: string): string {
  const options = [`${name} HVAC: Furnace & AC Service`, `${name} Heating & AC Service`, `${name} HVAC Service`];
  return options.find((t) => t.length + BRAND_SUFFIX_LENGTH <= 65) ?? options[options.length - 1];
}

/** The longest of these that stays within 160 characters. */
function hubDescription(city: string): string {
  const options = [
    `HVAC service in ${city}, CA: furnace and heating repair, AC repair, tune-ups and replacement. Open 24/7, same-day service available. Call (714) 410-2784.`,
    `HVAC service in ${city}, CA: heating and AC repair, tune-ups and replacement. Open 24/7, same-day service available. Call (714) 410-2784.`,
  ];
  return options.find((d) => d.length <= 160) ?? options[options.length - 1];
}

function buildHub(slug: string, f: HubFacts): CityHubContent {
  const c = f.city;
  const acRepair = `/air-conditioning/ac-repair/${slug}`;
  const emergency = `/air-conditioning/emergency-ac-repair/${slug}`;
  const tuneUp = `/air-conditioning/ac-tune-up/${slug}`;
  const heating = `/heating/heating-repair/${slug}`;
  const hvacRepair = `/hvac-repair/${slug}`;

  const replacement: HubText[] = [];
  if (f.permit) {
    replacement.push([
      `In ${c}, permits for replacing heating and air conditioning equipment come from the `,
      { href: f.permit.url, label: f.permit.office },
      ". Ask your contractor whether your project needs one; a permitted replacement is inspected after installation.",
    ]);
  }
  replacement.push(REFRIGERANT_PARAGRAPH, [
    "Our ",
    { href: "/air-conditioning/ac-installation", label: "AC installation" },
    " and ",
    { href: "/heating/furnace-installation", label: "furnace installation" },
    " pages explain what a replacement involves.",
  ]);

  const permitFaq = f.permit
    ? {
        question: `Do I need a permit to replace my AC or furnace in ${c}?`,
        answer: `HVAC equipment replacements are permitted through the ${f.permit.office}. Ask your contractor whether your project needs a permit, or contact that office directly.`,
      }
    : {
        question: `Do you replace air conditioners and furnaces in ${c}?`,
        answer: `Yes. We replace central air conditioners, heat pumps and furnaces in ${c}, and we give you a written estimate before any work starts.`,
      };

  return {
    meta: { title: hubTitle(f.titleName ?? c), description: hubDescription(c) },
    blurb: `Heating and air conditioning service for ${c} homes and businesses, open 24/7 with same-day service available.`,
    localContext: `We repair and maintain furnaces, heat pumps and central air conditioners in ${c}, and replace systems that have reached the end of their life. Start with the service you need below, or send a request and we will contact you to schedule.`,
    serviceCards: [
      { slug: "ac-repair", href: acRepair, label: `AC Repair in ${c}` },
      { slug: "heating-repair", href: heating, label: `Heating Repair in ${c}` },
      { slug: "ac-tune-up", href: tuneUp, label: `AC Tune-Up in ${c}` },
    ],
    sections: [
      {
        heading: `Furnace and Heating Repair in ${c}`,
        paragraphs: [
          [
            "We repair gas and electric furnaces and heat pumps. Signs that a heating system needs attention include no heat or weak airflow, a furnace that starts and stops repeatedly, a burning smell that lasts beyond the first run of the season, and an ignition that will not stay lit.",
          ],
          [
            "See ",
            { href: heating, label: `heating repair in ${c}` },
            " for what a repair visit covers. If you smell gas, leave the house first and call your gas utility or 911 from outside.",
          ],
        ],
      },
      {
        heading: `Air Conditioning Repair and Tune-Ups in ${c}`,
        paragraphs: [
          [
            "If your AC runs but does not cool, keeps cycling on and off, or is leaking water indoors, start with ",
            { href: acRepair, label: `air conditioning repair in ${c}` },
            ". A yearly ",
            { href: tuneUp, label: `AC tune-up in ${c}` },
            " before summer is a good time to catch worn capacitors, dirty coils and restricted airflow before they cause a breakdown.",
          ],
        ],
      },
      {
        heading: `24/7 Emergency and Same-Day HVAC Service in ${c}`,
        paragraphs: [
          [
            `We are open 24 hours a day, 7 days a week, and same-day service is available in ${c}. If your system has stopped completely, `,
            { href: emergency, label: `emergency AC repair in ${c}` },
            " lists what to do while you wait. Arrival times depend on our schedule and your location, and we will give you an honest estimate when you call.",
          ],
          [
            "For a problem that is not about cooling, such as ductwork, thermostats or a system that heats and cools unevenly, see ",
            { href: hvacRepair, label: `HVAC repair in ${c}` },
            ".",
          ],
        ],
      },
      { heading: `Replacing an AC or Furnace in ${c}`, paragraphs: replacement },
    ],
    faqs: [
      {
        question: `Do you repair furnaces and heating systems in ${c}?`,
        answer: `Yes. We repair gas and electric furnaces and heat pumps in ${c}. Call (714) 410-2784 or send a request online, and see our ${c} heating repair page for what a repair visit covers.`,
      },
      {
        question: `Do you repair air conditioning in ${c}?`,
        answer: `Yes. We diagnose and repair central air conditioners and heat pumps in ${c}. Our ${c} AC repair page covers common problems, and the emergency AC repair page lists what to do if your system stops completely.`,
      },
      {
        question: `Do you offer emergency HVAC service in ${c}?`,
        answer: `Yes. We are open 24 hours a day, 7 days a week, including emergency service, and same-day service is available in ${c}. Arrival times depend on our schedule and your location, and we will give you an estimate when you call.`,
      },
      permitFaq,
      R22_FAQ,
      {
        question: `How do I schedule HVAC service in ${c}?`,
        answer:
          "Call (714) 410-2784 or fill in the request form on this page with your name, phone number, the service you need and your address. We will contact you to schedule a visit.",
      },
    ],
    ...SHARED,
    ctaNote: `Call us 24/7 or send a request online for HVAC service anywhere in ${c}.`,
  };
}

export function getCityHub(countySlug: string, citySlug: string): CityHubContent | undefined {
  const key = `${countySlug}/${citySlug}`;
  if (CITY_HUBS[key]) return CITY_HUBS[key];
  const facts = HUB_FACTS[key];
  return facts ? buildHub(citySlug, facts) : undefined;
}
