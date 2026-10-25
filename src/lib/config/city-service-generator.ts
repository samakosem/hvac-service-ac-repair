/**
 * Programmatic generator for city × service landing pages.
 * Produces CityServicePage entries for all 5 service sets × all cities.
 * Hand-written entries in city-service-pages.ts take precedence — this fills the gaps.
 */

import { getAllCities, type City } from "@/lib/config/locations";
import type { CityServicePage } from "@/lib/config/city-service-pages";
import { licenseOrHoursPoint } from "@/lib/config/credentials";
import { SITE } from "@/lib/config/site";

function urgencyNote(city: City): string {
  switch (city.countySlug) {
    case "orange-county":
      return `Serving ${city.name} and surrounding neighborhoods — same-day appointments available.`;
    case "riverside-county":
      return `${city.name} is within our same-day service zone from Yorba Linda.`;
    case "san-bernardino-county":
      return `${city.name} is within our standard service area. Same-day dispatch typically available.`;
    case "ventura-county":
      return `Serving ${city.name}, including 24/7 emergency service. Call to confirm availability for your address.`;
    case "santa-barbara-county":
      return `Serving ${city.name}, including 24/7 emergency service. Call to confirm availability for your address.`;
    default:
      return `Serving ${city.name} — call to confirm same-day availability.`;
  }
}

function pricingNote(serviceSlug: string): string {
  switch (serviceSlug) {
    case "ac-repair":
    case "emergency-ac-repair":
      return "Free diagnostic · Most common repairs: $150–$450 · Free estimate on replacement · 0% financing available";
    case "heating-repair":
      return "Free diagnostic · Most furnace repairs: $150–$400 · Annual tune-up: from $99 · New system: free estimate";
    case "ac-tune-up":
      return "AC Tune-Up: from $99 · Annual maintenance plan: $149/year (spring + fall) · Written inspection report included";
    case "hvac-repair":
      return "Free diagnostic · Full HVAC services: AC, heating, installation, ductwork, maintenance · 0% financing available";
    default:
      return "Free diagnostic · Written estimate before any work · 0% financing available";
  }
}

// ─── FAQs per service ─────────────────────────────────────────────────────────

function faqs(city: City, serviceSlug: string): { question: string; answer: string }[] {
  const isExtended = city.countySlug === "ventura-county" || city.countySlug === "santa-barbara-county";

  const diagFaq = {
    question: `Do you charge a diagnostic fee in ${city.name}?`,
    answer: "Free — no charge to identify the problem. You only pay if you proceed with the repair.",
  };
  const weekendFaq = {
    question: `Are you available on weekends in ${city.name}?`,
    answer: "Yes — 7 days a week, no weekend surcharge.",
  };
  const speedFaq = isExtended
    ? {
        question: `How quickly can you get to ${city.name} for service?`,
        answer: `We serve ${city.name}, including 24/7 emergency service. Call us and we'll give you the earliest available arrival window.`,
      }
    : {
        question: `How quickly can you get to ${city.name} for service?`,
        answer: "Same-day service is available, and we're open 24/7, including emergencies. Call us and we'll give you the earliest available arrival window.",
      };

  switch (serviceSlug) {
    case "ac-repair":
      return [
        speedFaq,
        diagFaq,
        {
          question: "Do you work on all AC brands?",
          answer:
            "Yes — Carrier, Trane, Lennox, Goodman, Rheem, Bryant, York, Mitsubishi, Daikin, LG, and all other major brands.",
        },
        {
          question: "Do you offer financing on AC repairs?",
          answer: "Yes — 0% financing options are available on repairs and replacements over $500. Ask when you call.",
        },
        weekendFaq,
      ];

    case "emergency-ac-repair":
      return [
        {
          question: `Do you charge extra for emergency calls in ${city.name}?`,
          answer:
            "No emergency surcharges. Emergency calls are priced the same as regular service — same pricing 7 days a week.",
        },
        city.countySlug === "orange-county"
          ? { question: `How quickly can you get to ${city.name} in an emergency?`, answer: SITE.emergencyArrivalOC }
          : speedFaq,
        {
          question: "What should I do while waiting for emergency AC repair?",
          answer:
            "Turn off the system at the thermostat to prevent further damage. Move to lower floors. Use fans to circulate air. Close blinds on sun-facing windows. If anyone in the home is at risk from heat, consider going to a cooled public space until we arrive.",
        },
        {
          question: "Can you fix my AC on the first emergency visit?",
          answer:
            "It depends on the problem and the parts it needs. If a component needs ordering, we'll give you a clear timeline and options.",
        },
      ];

    case "heating-repair":
      return [
        {
          question: `Do you repair both AC and heating in ${city.name}?`,
          answer:
            "Yes — we're a full HVAC contractor. We repair and maintain both air conditioning and heating systems including furnaces, heat pumps, and thermostats.",
        },
        speedFaq,
        diagFaq,
        {
          question: `Should I service my heating system before winter in ${city.name}?`,
          answer:
            "Yes — a fall tune-up is a smart investment. It catches igniter, heat exchanger, and filter issues before they cause a mid-winter breakdown.",
        },
      ];

    case "ac-tune-up":
      return [
        {
          question: "What's included in the AC tune-up?",
          answer:
            "20-point inspection: refrigerant level check, coil cleaning (evaporator & condenser), electrical connection inspection, thermostat calibration, capacitor and contactor check, blower motor check, filter inspection, drain line flush, and full system performance test.",
        },
        {
          question: `How often should I get an AC tune-up in ${city.name}?`,
          answer:
            "Once a year minimum — ideally in spring before cooling season. A pre-season tune-up catches problems before they become failures on the hottest day of summer.",
        },
        {
          question: "Can a tune-up extend the life of my AC system?",
          answer:
            "Yes. A maintained system typically lasts 15–20 years; an unmaintained one averages 10–12. Regular tune-ups also keep energy bills lower by maintaining efficiency.",
        },
        {
          question: `Do you offer a maintenance plan for ${city.name} homeowners?`,
          answer:
            "Yes — our annual plan includes one spring AC tune-up + one fall heating inspection for $149/year. Ask when you call.",
        },
      ];

    case "hvac-repair":
      return [
        {
          question: "Are you a local company or a national franchise?",
          answer:
            "Locally owned and operated. Our shop is at 18340 Yorba Linda Blvd #107, Yorba Linda, CA 92886. We're not a franchise or a national chain with a local phone number.",
        },
        speedFaq,
        {
          question: `Do you offer maintenance plans for ${city.name} homeowners?`,
          answer:
            "Yes — annual maintenance plan: spring AC tune-up + fall heating inspection for $149/year. Includes priority scheduling and a 10% repair discount.",
        },
        diagFaq,
      ];

    default:
      return [speedFaq, diagFaq, weekendFaq];
  }
}

// ─── Why-us points per service ────────────────────────────────────────────────

function whyUsPoints(city: City, serviceSlug: string): { heading: string; body: string }[] {
  const basePoints = [
    licenseOrHoursPoint(),
    {
      heading: "Written Quote Before Any Work",
      body: "You approve the price in writing before we start. No bill surprises.",
    },
  ];

  switch (serviceSlug) {
    case "ac-repair":
      return [
        {
          heading: "Based in Yorba Linda",
          body: `Our shop is on Yorba Linda Blvd, and we serve ${city.name} and nearby cities.`,
        },
        ...basePoints,
        {
          heading: "All Major Brands",
          body: "We repair Carrier, Trane, Lennox, Goodman, Rheem, and other major brands.",
        },
      ];

    case "emergency-ac-repair":
      return [
        {
          heading: "Real People Answer",
          body: "Call during service hours and a real person picks up. No voicemail trees, no call centers.",
        },
        {
          heading: "No Emergency Surcharge",
          body: "Weekend and same-day emergency calls are priced the same as regular service. No surprises.",
        },
        ...basePoints,
      ];

    case "heating-repair":
      return [
        {
          heading: "One Company, Both Systems",
          body: "We service your AC and heating — no managing two contractors or two maintenance schedules.",
        },
        {
          heading: "Seasonal Tune-Up Specialists",
          body: "Fall heating tune-up + spring AC tune-up = a system that runs reliably year-round.",
        },
        ...basePoints,
      ];

    case "ac-tune-up":
      return [
        {
          heading: "20-Point Inspection",
          body: "We check everything — not just the filter. Refrigerant, coils, electrical, drain, and performance test.",
        },
        {
          heading: "Catch Problems Early",
          body: "Tune-up now: $99. Emergency repair in summer: $300–$800. New system: $5,000–$12,000. The math is clear.",
        },
        {
          heading: "Flexible Scheduling",
          body: "Call to book a tune-up at a time that works for you.",
        },
        {
          heading: "Local, Honest Team",
          body: "We won't upsell unnecessary parts or scare you into a replacement your system doesn't need.",
        },
      ];

    case "hvac-repair":
      return [
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
        ...basePoints,
      ];

    default:
      return basePoints;
  }
}

// ─── Services list per service ────────────────────────────────────────────────

function servicesList(serviceSlug: string): string[] {
  switch (serviceSlug) {
    case "ac-repair":
      return [
        "Capacitor & contactor replacement",
        "Refrigerant leak detection & recharge",
        "Compressor diagnosis & replacement",
        "Thermostat & control board repair",
        "Condenser fan motor replacement",
        "Full system diagnostic — FREE",
        "Evaporator coil cleaning & service",
        "Drain line clearing & condensate repair",
      ];
    case "emergency-ac-repair":
      return [
        "AC stopped blowing cold air",
        "AC unit making loud banging or grinding noise",
        "Thermostat not responding",
        "AC running but house not cooling",
        "AC tripping the breaker",
        "Water leaking from AC unit",
        "AC burning smell — immediate safety check",
        "Complete system failure in extreme heat",
      ];
    case "heating-repair":
      return [
        "Furnace repair and tune-up",
        "Heat pump service and repair",
        "Thermostat replacement",
        "Heating system diagnostic — FREE",
        "Duct inspection and sealing",
        "Igniter & heat exchanger service",
        "New heating system installation (free estimate)",
        "Annual AC + heating maintenance plan",
      ];
    case "ac-tune-up":
      return [
        "Refrigerant level check",
        "Coil cleaning (evaporator & condenser)",
        "Electrical connection inspection",
        "Thermostat calibration",
        "Capacitor and contactor check",
        "Blower motor check",
        "Filter inspection (replacement if needed)",
        "Drain line flush",
        "Full system performance test",
        "Written inspection report",
      ];
    case "hvac-repair":
      return [
        "AC repair — all brands",
        "Heating & furnace repair",
        "AC installation & replacement",
        "Ductless mini-split service",
        "Ductwork inspection & sealing",
        "AC maintenance & tune-up",
        "Thermostat installation",
        "Commercial HVAC service",
      ];
    default:
      return ["Full system diagnostic — FREE", "All major brands serviced", "Written estimate before any work"];
  }
}

// ─── Service-specific copy ────────────────────────────────────────────────────

type ServiceMeta = {
  serviceName: string;
  urlBase: string;
  h1: (cityName: string) => string;
  heroSubheadline: (cityName: string) => string;
  servicesListHeadline: (cityName: string) => string;
  whyUsHeadline: (cityName: string) => string;
  ctaBannerText: (cityName: string) => string;
};

const SERVICE_META: Record<string, ServiceMeta> = {
  "ac-repair": {
    serviceName: "AC Repair",
    urlBase: "/air-conditioning/ac-repair",
    h1: (c) => `AC Repair in ${c}, CA — Same-Day Service`,
    heroSubheadline: (c) =>
      `AC stopped working in ${c}? We diagnose, quote, and fix it, with same-day service available. No guesswork, no upsells.`,
    servicesListHeadline: (c) => `What We Repair in ${c} Homes`,
    whyUsHeadline: (c) => `Why ${c} Residents Choose Us`,
    ctaBannerText: (c) => `AC Not Cooling in ${c}? We're Available Today.`,
  },
  "emergency-ac-repair": {
    serviceName: "Emergency AC Repair",
    urlBase: "/air-conditioning/emergency-ac-repair",
    h1: (c) => `AC Broke Down in ${c}? We're Available Today.`,
    heroSubheadline: (c) =>
      `${c} heat won't wait. Real people answer our phones — same-day emergency HVAC service, 7 days a week.`,
    servicesListHeadline: (c) => `Common Emergency AC Situations We Handle in ${c}`,
    whyUsHeadline: (c) => `Why ${c} Calls Us for HVAC Emergencies`,
    ctaBannerText: (c) => `Don't Suffer Through the Heat. We Answer Live in ${c}.`,
  },
  "heating-repair": {
    serviceName: "Heating Repair",
    urlBase: "/heating/heating-repair",
    h1: (c) => `AC & Heating Repair in ${c} — Same-Day Service`,
    heroSubheadline: (c) =>
      `One local team handles your AC and heating in ${c} — from summer emergencies to winter tune-ups.`,
    servicesListHeadline: (c) => `Heating Services We Offer in ${c}`,
    whyUsHeadline: (c) => `Why ${c} Homeowners Trust Us with Heating & AC`,
    ctaBannerText: (c) => `Heater Not Working in ${c}? We're Available Today.`,
  },
  "ac-tune-up": {
    serviceName: "AC Tune-Up",
    urlBase: "/air-conditioning/ac-tune-up",
    h1: (c) => `AC Tune-Up in ${c} — Starting at $99`,
    heroSubheadline: (c) =>
      `A 20-point maintenance visit keeps your ${c} AC running efficiently all summer.`,
    servicesListHeadline: (c) => `What's Included in Your ${c} AC Tune-Up`,
    whyUsHeadline: (c) => `Why ${c} Homeowners Tune Up with Us`,
    ctaBannerText: (c) => `Ready for a Tune-Up? Book Your ${c} AC Service Today.`,
  },
  "hvac-repair": {
    serviceName: "Local HVAC Repair",
    urlBase: "/hvac-repair",
    h1: (c) => `Local HVAC Repair in ${c} — Your Neighbors`,
    heroSubheadline: (c) =>
      `Not a franchise. Not a call center. We're based in Yorba Linda and serve ${c} with the same local care.`,
    servicesListHeadline: (c) => `Full HVAC Services for ${c} Homes & Businesses`,
    whyUsHeadline: (c) => `Why Local Beats National Chains for HVAC in ${c}`,
    ctaBannerText: (c) => `Your Local HVAC Team for ${c} — Available Today.`,
  },
};

// ─── Nearby cities builder ────────────────────────────────────────────────────

function nearbyCities(
  city: City,
  serviceSlug: string,
): { name: string; slug: string; urlBase: string }[] {
  const meta = SERVICE_META[serviceSlug];
  if (!meta) return [];
  const allCities = getAllCities();
  return city.nearbySlugs
    .slice(0, 5)
    .map((slug) => allCities.find((c) => c.slug === slug))
    .filter((c): c is City => c !== undefined)
    .map((c) => ({ name: c.name, slug: c.slug, urlBase: meta.urlBase }));
}

// ─── Meta title / description ─────────────────────────────────────────────────

function metaTitle(city: City, serviceSlug: string): string {
  switch (serviceSlug) {
    case "ac-repair":
      return `AC Repair in ${city.name}, CA | Same-Day Service | (714) 410-2784`;
    case "emergency-ac-repair":
      return `Emergency AC Repair in ${city.name}, CA | Available Today | (714) 410-2784`;
    case "heating-repair":
      return `Heating Repair in ${city.name}, CA | AC & Heating | (714) 410-2784`;
    case "ac-tune-up":
      return `AC Tune-Up in ${city.name}, CA | Starting at $99 | (714) 410-2784`;
    case "hvac-repair":
      return `Local HVAC Repair in ${city.name}, CA | (714) 410-2784`;
    default:
      return `HVAC Service in ${city.name}, CA | (714) 410-2784`;
  }
}

function metaDescription(city: City, serviceSlug: string): string {
  switch (serviceSlug) {
    case "ac-repair":
      return `Fast AC repair in ${city.name}, CA. Same-day appointments, free diagnostic with repair. Call (714) 410-2784.`;
    case "emergency-ac-repair":
      return `Emergency AC repair in ${city.name}, CA. Same-day service — real people answer, no voicemail. Free diagnostic, no emergency surcharge. Call (714) 410-2784.`;
    case "heating-repair":
      return `AC and heating repair in ${city.name}, CA. Same-day furnace and HVAC service — free diagnostic with repair. Call (714) 410-2784.`;
    case "ac-tune-up":
      return `AC tune-up and maintenance in ${city.name}, CA. 20-point inspection starting at $99. Same-week appointments. Call (714) 410-2784.`;
    case "hvac-repair":
      return `Local HVAC repair in ${city.name}, CA. Same-day service, honest pricing, free diagnostic. Not a franchise. (714) 410-2784.`;
    default:
      return `HVAC service in ${city.name}, CA. Same-day appointments available. Call (714) 410-2784.`;
  }
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generateCityServicePages(
  serviceSlug: string,
  existingSlugs: Set<string>,
): CityServicePage[] {
  const meta = SERVICE_META[serviceSlug];
  if (!meta) return [];

  const cities = getAllCities();
  const pages: CityServicePage[] = [];

  for (const city of cities) {
    // Skip cities that already have hand-written entries
    if (existingSlugs.has(city.slug)) continue;

    const page: CityServicePage = {
      citySlug: city.slug,
      cityName: city.name,
      serviceSlug,
      serviceName: meta.serviceName,
      urlBase: meta.urlBase,
      metaTitle: metaTitle(city, serviceSlug),
      metaDescription: metaDescription(city, serviceSlug),
      h1: meta.h1(city.name),
      heroSubheadline: meta.heroSubheadline(city.name),
      localContext: city.localContext,
      urgencyNote: urgencyNote(city),
      nearbyCities: nearbyCities(city, serviceSlug),
      faqs: faqs(city, serviceSlug),
      pricingNote: pricingNote(serviceSlug),
      whyUsHeadline: meta.whyUsHeadline(city.name),
      whyUsPoints: whyUsPoints(city, serviceSlug),
      servicesListHeadline: meta.servicesListHeadline(city.name),
      servicesList: servicesList(serviceSlug),
      ctaBannerText: meta.ctaBannerText(city.name),
    };

    pages.push(page);
  }

  return pages;
}
