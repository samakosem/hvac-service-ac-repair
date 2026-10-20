import { SITE } from "@/lib/config/site";

type BreadcrumbItem = {
  name: string;
  href: string;
};

const BUSINESS_ID = `${SITE.domain}/#hvacbusiness`;

/** Absolute URL for a site path, without the trailing slash Next.js redirects away. */
function absoluteUrl(path: string): string {
  return path.length > 1 ? `${SITE.domain}${path.replace(/\/+$/, "")}` : `${SITE.domain}/`;
}

export function schemaWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    name: SITE.name,
    url: SITE.domain,
    publisher: { "@type": "HVACBusiness", "@id": BUSINESS_ID },
  };
}

export function schemaHvacBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": BUSINESS_ID,
    name: SITE.name,
    url: SITE.domain,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.domain}/uploads/ac-unit-installation (4).jpeg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    // Open 24/7 (owner confirmed, Phase 2.3 P3); 00:00 to 23:59 every day is schema.org's form for 24 hours.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      { "@type": "County", name: "Orange County", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "County", name: "Riverside County", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "County", name: "San Bernardino County", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "County", name: "Los Angeles County", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "County", name: "Ventura County", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "County", name: "Santa Barbara County", containedInPlace: { "@type": "State", name: "California" } },
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Financing",
    sameAs: ([SITE.social.google, SITE.social.yelp, SITE.social.facebook] as string[]).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Repair", url: `${SITE.domain}/air-conditioning/ac-repair` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Installation", url: `${SITE.domain}/air-conditioning/ac-installation` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Maintenance", url: `${SITE.domain}/air-conditioning/ac-maintenance` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Furnace Repair", url: `${SITE.domain}/heating/furnace-repair` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ductless Mini-Split Installation", url: `${SITE.domain}/ductless/mini-split-installation` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air Duct Cleaning", url: `${SITE.domain}/air-duct-services/air-duct-cleaning` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial HVAC", url: `${SITE.domain}/commercial-hvac` } },
      ],
    },
  };
}

export function schemaService({
  name,
  description,
  url,
  areaServed = "Orange County",
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(url),
    provider: { "@type": "HVACBusiness", "@id": BUSINESS_ID },
    areaServed: {
      "@type": /County$/.test(areaServed) ? "County" : "City",
      name: areaServed,
      containedInPlace: { "@type": "State", name: "California" },
    },
    serviceType: "HVAC",
  };
}

export function schemaBreadcrumb(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function schemaFaqPage(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}


export function schemaContactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE.name}`,
    url: `${SITE.domain}/contact`,
    description: `Contact ${SITE.name} for AC repair, HVAC installation, and heating service in Orange County, CA.`,
    mainEntity: { "@type": "HVACBusiness", "@id": BUSINESS_ID },
  };
}

export function schemaBlogPosting({
  title,
  excerpt,
  slug,
  date,
  author = "HVAC Service & AC Repair Team",
}: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    url: `${SITE.domain}/blog/${slug}`,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Organization",
      name: author,
      url: SITE.domain,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.domain}/blog/${slug}`,
    },
  };
}

export function schemaCalculatorPage({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE.domain}${url}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "HVACBusiness",
      name: SITE.name,
      url: SITE.domain,
      telephone: SITE.phone,
    },
  };
}
