/** Unique FAQ content per county — supplements city-level FAQs on county pages */
export const COUNTY_FAQS: Record<string, { question: string; answer: string }[]> = {
  "los-angeles-county": [
    {
      question: "Which Los Angeles County cities do you service?",
      answer:
        "We serve the eastern LA County cities closest to our Yorba Linda base: Diamond Bar, Rowland Heights, Walnut, Hacienda Heights, and La Habra Heights. These border Orange County, so we can often reach them quickly for repair, maintenance, and installation.",
    },
    {
      question: "Do you offer same-day service in Los Angeles County?",
      answer:
        "For the eastern LA County cities near our Orange County base, same-day service is often available. Because these are at the edge of our core service area, we recommend calling to confirm availability for your address.",
    },
    {
      question: "What HVAC services do you provide in Los Angeles County?",
      answer:
        "AC repair, AC installation and replacement, heating and furnace service, ductless mini-split systems, and routine maintenance for homes in eastern LA County. Call (714) 410-2784 to schedule.",
    },
    {
      question: "Is there a trip charge for Los Angeles County service?",
      answer:
        "Free diagnostic — no charge to identify the problem, and you only pay if you proceed with the repair. For addresses at the edge of our range we discuss any distance considerations openly before scheduling, so there are no surprises.",
    },
  ],
  "orange-county": [
    {
      question: "Do you offer same-day HVAC service across all of Orange County?",
      answer:
        "We provide same-day service for most of Orange County. Cities close to our Yorba Linda shop — Placentia, Anaheim, Brea, Fullerton, Orange — typically get morning-to-afternoon same-day windows. Farther cities like San Clemente or Laguna Niguel also get same-day service for most calls, though arrival windows may be slightly later.",
    },
    {
      question: "What HVAC brands do you service in Orange County?",
      answer:
        "All major residential and commercial brands — Carrier, Trane, Lennox, Goodman, Rheem, Bryant, York, Daikin, Mitsubishi, LG, and others. We carry common parts for the most frequently serviced brands so repairs often happen on the first visit.",
    },
    {
      question: "How does coastal climate affect AC systems in Orange County?",
      answer:
        "Coastal OC cities like Huntington Beach, Newport Beach, and San Clemente experience salt air that accelerates corrosion on condenser coils and refrigerant lines. These systems benefit from more frequent coil cleaning and inspection. Inland cities like Yorba Linda, Anaheim Hills, and Orange see higher summer temperatures, putting greater demand on cooling capacity.",
    },
    {
      question: "Do you service commercial HVAC in Orange County?",
      answer:
        "Yes. We handle commercial HVAC for offices, retail spaces, restaurants, and multi-tenant buildings across Orange County. Preventive maintenance contracts are available for commercial customers who want scheduled, consistent service.",
    },
    {
      question: "Is financing available for HVAC replacement in Orange County?",
      answer:
        "We work with financing options for qualifying customers. Ask when you call or submit a contact form — we'll walk you through what's available.",
    },
  ],

  "riverside-county": [
    {
      question: "Do you serve Riverside County on a same-day basis?",
      answer:
        "Yes, for Corona, Norco, and Eastvale — the western Riverside County cities closest to our Yorba Linda base. Same-day dispatch is typically available for these areas. Cities farther east in Riverside County are outside our service area.",
    },
    {
      question: "How hot does western Riverside County get in summer?",
      answer:
        "Corona and Norco regularly see temperatures above 100°F from June through September, with occasional heat events exceeding 110°F. Eastvale is similar. This is significantly hotter than most of coastal Orange County and puts high sustained demand on cooling systems.",
    },
    {
      question: "What HVAC services do you provide in Riverside County?",
      answer:
        "The full range — AC repair, installation, replacement, maintenance, heating, ductless mini-splits, air duct services, and commercial HVAC. Same services as our Orange County territory.",
    },
    {
      question: "Is there a trip charge for Riverside County service calls?",
      answer:
        "Free diagnostic — no charge to identify the problem. You only pay if you proceed with the repair. This applies to all service calls, including Riverside County.",
    },
    {
      question: "Do you work on commercial HVAC in the Riverside County cities you serve?",
      answer:
        "Yes. Corona and Eastvale in particular have significant commercial development. We handle commercial HVAC for offices, retail, and light industrial in the western Riverside County cities we serve.",
    },
  ],

  "san-bernardino-county": [
    {
      question: "Which San Bernardino County cities do you serve?",
      answer:
        "We serve Chino Hills, Chino, and Ontario — the westernmost San Bernardino County cities that border our Orange County service area. These are within our standard same-day service zone.",
    },
    {
      question: "How does inland heat affect HVAC systems in the Chino Valley area?",
      answer:
        "The Chino Valley area experiences significantly higher summer temperatures than coastal OC — regularly above 100°F in July and August. Systems work longer and harder each day, which accelerates wear on compressors and capacitors. Annual maintenance is especially important in this climate.",
    },
    {
      question: "Do you install new AC systems in San Bernardino County?",
      answer:
        "Yes. We handle complete AC and HVAC system installations in Chino Hills, Chino, and Ontario. We perform load calculations to properly size systems for the local climate.",
    },
    {
      question: "Can you service commercial and industrial HVAC in Ontario and Chino?",
      answer:
        "Yes. Ontario and Chino have significant industrial and commercial development. We service office buildings, retail centers, warehouses, and light industrial facilities in both cities.",
    },
    {
      question: "Is emergency service available in the San Bernardino County cities you serve?",
      answer:
        "Yes. We offer 7-day service for the Chino Valley cities. Emergency calls during extreme heat events are prioritized. Call us directly — we'll give you an honest arrival estimate.",
    },
  ],

  "ventura-county": [
    {
      question: "Which Ventura County cities do you service?",
      answer:
        "We extend service to Thousand Oaks, Simi Valley, and Moorpark in eastern Ventura County. These are at the edge of our service range, so same-day scheduling is not guaranteed. We serve this area on a scheduled basis — call to confirm availability.",
    },
    {
      question: "Why is your service more limited in Ventura County?",
      answer:
        "Distance from our Yorba Linda base means we can't maintain the same response times as we do in Orange County. We're honest about this — if you need emergency service in Ventura County, there may be local providers better positioned to respond quickly.",
    },
    {
      question: "What services do you offer in Ventura County?",
      answer:
        "Repair, maintenance, and system replacement for residential properties. We do not offer emergency response in this extended territory due to distance.",
    },
    {
      question: "Is there an additional charge for Ventura County service?",
      answer:
        "Free diagnostic — no charge to identify the problem. You only pay if you proceed with repairs. There may be a trip consideration for the extended distance — we discuss everything openly before scheduling so there are no surprises.",
    },
    {
      question: "How hot does it get in eastern Ventura County in summer?",
      answer:
        "Simi Valley is hot — regularly above 100°F in summer due to its enclosed valley location. Thousand Oaks is milder but can see temperatures in the high 90s during heat waves. AC is important for these inland Ventura County communities.",
    },
  ],

  "santa-barbara-county": [
    {
      question: "Do you actually serve Santa Barbara County from Yorba Linda?",
      answer:
        "Yes, but only on a scheduled, non-emergency basis for specific project types — primarily mini-split installations and planned maintenance. Santa Barbara is at the outer limit of our range. We don't take emergency calls at this distance.",
    },
    {
      question: "What HVAC services do you offer in Santa Barbara County?",
      answer:
        "Ductless mini-split installation, system replacement, and scheduled maintenance for residential properties. We evaluate requests case by case given the distance.",
    },
    {
      question: "Is AC really necessary in the Santa Barbara area?",
      answer:
        "Santa Barbara's Mediterranean climate is mild most of the year, but summer heat events — especially in inland neighborhoods — can push temperatures into the 90s. Fall Santa Ana wind events occasionally bring heat to coastal areas as well. Many residents choose mini-splits for occasional use without committing to full central air.",
    },
    {
      question: "Is there a trip charge for Santa Barbara County?",
      answer:
        "Yes. Service at this distance involves a trip consideration that we discuss openly before scheduling. We won't add unexpected charges — everything is disclosed upfront.",
    },
    {
      question: "Why not just use a local Santa Barbara HVAC contractor?",
      answer:
        "That's often the right call for routine service and emergencies. We're a better fit for homeowners who have worked with us in OC and moved to the area, or for specific projects where we've been referred directly.",
    },
  ],
};

/** Unique meta description per county for SEO */
export const COUNTY_META: Record<string, { title: string; description: string; h1: string }> = {
  "los-angeles-county": {
    title: "HVAC Service in Los Angeles County, CA | Diamond Bar, Walnut & Hacienda Heights",
    description:
      "HVAC service for eastern Los Angeles County — Diamond Bar, Rowland Heights, Walnut, Hacienda Heights, and La Habra Heights. AC repair, installation, and maintenance from our Yorba Linda base. Call (714) 410-2784.",
    h1: "HVAC Service in Los Angeles County, CA",
  },
  "orange-county": {
    title: "HVAC Service in Orange County, CA | AC Repair, Installation & More",
    description:
      "Local HVAC company serving all of Orange County from Yorba Linda. Same-day AC repair, installation, maintenance, ductless systems, and commercial HVAC. Call (714) 410-2784.",
    h1: "HVAC Service Across Orange County, CA",
  },
  "riverside-county": {
    title: "HVAC Service in Riverside County, CA | Corona, Norco & Eastvale",
    description:
      "AC repair, installation, and HVAC maintenance for Corona, Norco, and Eastvale in western Riverside County. Same-day service available. Based in Yorba Linda. Call (714) 410-2784.",
    h1: "HVAC Service in Riverside County, CA",
  },
  "san-bernardino-county": {
    title: "HVAC Service in San Bernardino County | Chino Hills, Chino & Ontario",
    description:
      "AC repair, installation, and HVAC service for Chino Hills, Chino, and Ontario in western San Bernardino County. Same-day service available. Based in Yorba Linda. Call (714) 410-2784.",
    h1: "HVAC Service in San Bernardino County, CA",
  },
  "ventura-county": {
    title: "HVAC Service in Ventura County, CA | Thousand Oaks, Simi Valley & Moorpark",
    description:
      "Extended HVAC service to Thousand Oaks, Simi Valley, and Moorpark in Ventura County. Scheduled repair, maintenance, and installation. Based in Yorba Linda. Call (714) 410-2784.",
    h1: "HVAC Service in Ventura County, CA",
  },
  "santa-barbara-county": {
    title: "HVAC Service in Santa Barbara County, CA | Scheduled Service",
    description:
      "Extended HVAC service to Santa Barbara and Goleta for scheduled installations and maintenance. Based in Yorba Linda. Limited availability — call to confirm. (714) 410-2784.",
    h1: "HVAC Service in Santa Barbara County, CA",
  },
};

/** City-level SEO meta */
export function getCityMeta(cityName: string, countyName: string): { title: string; description: string } {
  return {
    title: `HVAC Service in ${cityName}, ${countyName}, CA | AC Repair & Installation`,
    description: `AC repair, installation, and HVAC maintenance in ${cityName}, ${countyName}. Same-day service available. Local HVAC company based in Yorba Linda. Call (714) 410-2784.`,
  };
}
