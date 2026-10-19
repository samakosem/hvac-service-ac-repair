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
  sidebarNote: "Call us or send a request online, and we will contact you to schedule.",
  formNote: "Tell us what is going on and where. We will contact you to schedule.",
};

export const CITY_HUBS: Record<string, CityHubContent> = {
  "orange-county/placentia": {
    meta: {
      title: "HVAC Service in Placentia, CA: Heating and Air Conditioning",
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
      title: "HVAC Service in Costa Mesa, CA: Heating and Air Conditioning",
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
      title: "HVAC Service in Yorba Linda, CA: Heating and Air Conditioning",
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

export function getCityHub(countySlug: string, citySlug: string): CityHubContent | undefined {
  return CITY_HUBS[`${countySlug}/${citySlug}`];
}
