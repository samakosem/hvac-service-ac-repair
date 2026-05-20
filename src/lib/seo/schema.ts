import { SITE } from "@/lib/config/site";

type BreadcrumbItem = {
  name: string;
  href: string;
};

export function schemaHvacBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
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
    areaServed: {
      "@type": "State",
      name: "California",
    },
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Financing",
  };
}

export function schemaService({
  name,
  description,
  url,
  areaServed = "Orange County, CA",
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
    provider: {
      "@type": "HVACBusiness",
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
    },
    areaServed,
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
    mainEntity: {
      "@type": "HVACBusiness",
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
    },
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
