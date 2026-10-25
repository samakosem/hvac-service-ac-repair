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
  // Owner confirmed (Phase 6): typical emergency arrival in Orange County is 60 to 120 minutes,
  // depending on availability, location, traffic and demand. Not a guaranteed maximum; use for
  // Orange County only, never as a per-city promise.
  emergencyArrivalOC:
    "For emergency calls in Orange County, a technician typically arrives in 60 to 120 minutes, depending on technician availability, your location, traffic and call volume. That window is typical, not guaranteed, and we confirm your arrival time when you call.",
  serviceArea: "Orange County, CA and surrounding counties",
  social: {
    // Google Business Profile (owner-provided link, Phase 6). Resolved to the listing's CID:
    // ftid 0x80dcd300736b62ff:0x8c8d3b313c5c642f, the same place as GOOGLE_PROFILE_URL.
    google: "https://www.google.com/maps?cid=10127816219678237743",
    yelp: "",
    facebook: "",
  },
} as const;

export type Site = typeof SITE;
