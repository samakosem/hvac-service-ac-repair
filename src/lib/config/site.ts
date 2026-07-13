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
  hours: {
    weekdays: "7:00 AM – 7:00 PM",
    saturday: "8:00 AM – 5:00 PM",
    sunday: "Emergency Service Available",
  },
  serviceArea: "Orange County, CA and surrounding counties",
  social: {
    google: "",
    yelp: "",
    facebook: "",
  },
} as const;

export type Site = typeof SITE;
