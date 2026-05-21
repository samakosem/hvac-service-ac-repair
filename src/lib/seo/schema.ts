import { SITE } from "@/lib/config/site";

type BreadcrumbItem = {
  name: string;
  href: string;
};

const BUSINESS_ID = `${SITE.domain}/#hvacbusiness`;

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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "County", name: "Orange County", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "County", name: "Riverside County", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "County", name: "San Bernardino County", containedInPlace: { "@type": "State", name: "California" } },
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
    url: `${SITE.domain}${url}`,
    provider: { "@type": "HVACBusiness", "@id": BUSINESS_ID },
    areaServed: {
      "@type": "County",
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
      item: `${SITE.domain}${item.href}`,
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

export function schemaLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE.name,
    url: SITE.domain,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
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

export function schemaOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": BUSINESS_ID,
    name: SITE.name,
    url: SITE.domain,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
    areaServed: "Orange County, CA",
    knowsAbout: [
      "Air Conditioning Repair",
      "HVAC Installation",
      "Heating Services",
      "Ductless Mini-Split Systems",
      "Commercial HVAC",
      "Air Duct Cleaning",
    ],
  };
}
