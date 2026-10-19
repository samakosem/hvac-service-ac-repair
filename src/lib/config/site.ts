export const SITE = {
  name: "HVAC Service & AC Repair",
  shortName: "HVAC Service",
  domain: "https://www.hvacserviceacrepair.com",
  phone: "+17144102784",
  phoneDisplay: "(714) 410-2784",
  email: "info@hvacserviceacrepair.com",
  address: {
    street: "18340 Yorba Linda Blvd #107",
    city: "Yorba Linda",
    state: "CA",
    zip: "92886",
    full: "18340 Yorba Linda Blvd #107, Yorba Linda, CA 92886",
  },
  geo: {
    lat: 33.8886,
    lng: -117.8131,
  },
  // Owner confirmed (Phase 2.3 P3): open 24 hours a day, 7 days a week, including emergency service.
  hours: {
    summary: "Open 24 hours, 7 days a week",
    everyDay: "Open 24 hours",
    emergency: "Available 24/7",
  },
  serviceArea: "Orange County, CA and surrounding counties",
  social: {
    google: "",
    yelp: "",
    facebook: "",
  },
} as const;

export type Site = typeof SITE;
