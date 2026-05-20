export type City = {
  slug: string;
  name: string;
  county: string;
  countySlug: string;
  blurb: string;
  /** 2-3 sentences unique to this city's HVAC context — housing stock, climate, local notes */
  localContext: string;
  /** Top 3 services most relevant to this city's needs */
  topServiceSlugs: string[];
  /** Slugs of 3-5 nearby cities in same or adjacent county */
  nearbySlugs: string[];
  /** 3 city-specific FAQ items */
  faqs: { question: string; answer: string }[];
};

export type County = {
  slug: string;
  name: string;
  blurb: string;
  /** 2-3 sentences on why this county and why from Yorba Linda */
  serviceNote: string;
  /** Key HVAC characteristics of the county */
  climateNote: string;
  cities: City[];
};

export const COUNTIES: County[] = [
  // ─── ORANGE COUNTY ────────────────────────────────────────────────────────
  {
    slug: "orange-county",
    name: "Orange County",
    blurb:
      "Our home territory. We provide fast, same-day HVAC service across all of Orange County, from Yorba Linda to San Clemente.",
    serviceNote:
      "Our shop on Yorba Linda Blvd puts us within a short drive of virtually every Orange County city. Same-day appointments are available for most locations, and emergency dispatch is available 7 days a week.",
    climateNote:
      "Orange County's climate varies significantly from coastal cities like Huntington Beach — where marine layer and salt air affect equipment — to inland areas like Anaheim Hills and Yorba Linda, which see summer heat regularly exceeding 95°F. We understand the difference and recommend accordingly.",
    cities: [
      {
        slug: "yorba-linda",
        name: "Yorba Linda",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "As our home base, Yorba Linda gets priority scheduling and faster response times than outlying areas. Serving single-family homes, tract communities, and commercial properties throughout the city.",
        localContext:
          "Yorba Linda's hillside topography and mix of 1970s–2000s tract homes means we frequently work on both older R-22 systems due for replacement and newer R-410A equipment needing maintenance. Summer temperatures regularly push above 95°F in the inland neighborhoods near Weir Canyon, making a functioning AC non-negotiable from June through September.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "ac-replacement"],
        nearbySlugs: ["placentia", "brea", "anaheim", "villa-park", "anaheim-hills"],
        faqs: [
          {
            question: "How quickly can you get to Yorba Linda for an AC repair?",
            answer:
              "Because our shop is on Yorba Linda Blvd, we can often reach most parts of the city within 30–60 minutes for same-day calls. Morning calls placed before 10 AM typically get a same-day appointment.",
          },
          {
            question: "What HVAC brands are most common in Yorba Linda homes?",
            answer:
              "Yorba Linda's 1970s–1990s housing stock runs a lot of older Carrier, Trane, and Lennox systems. We stock parts for all three brands and can usually complete repairs on the first visit.",
          },
          {
            question: "Do you service commercial properties in Yorba Linda?",
            answer:
              "Yes. We service offices, retail spaces, and light industrial properties along Yorba Linda Blvd and the surrounding business parks. Commercial maintenance contracts are available.",
          },
        ],
      },
      {
        slug: "anaheim",
        name: "Anaheim",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "From Anaheim Hills estates to downtown Anaheim apartments and commercial corridors near the resort district, we handle residential and commercial HVAC across the city.",
        localContext:
          "Anaheim spans two very different climates: the coastal-influenced flatlands near the 5 freeway and the significantly hotter Anaheim Hills area, which sees some of the highest summer temperatures in the county. Anaheim Hills homes often have larger systems covering more square footage, while the resort district and surrounding commercial areas have specific commercial cooling demands year-round.",
        topServiceSlugs: ["ac-repair", "commercial-hvac", "ac-installation"],
        nearbySlugs: ["anaheim-hills", "orange", "placentia", "fullerton", "yorba-linda"],
        faqs: [
          {
            question: "Do you serve both Anaheim and Anaheim Hills?",
            answer:
              "Yes, both. Anaheim Hills is part of the city of Anaheim and one of our most common service areas — the hillside homes often run larger systems and the heat exposure is significant.",
          },
          {
            question: "Can you service commercial HVAC near the Anaheim resort area?",
            answer:
              "Yes. We work with hotels, restaurants, and retail near the resort district. We understand the uptime demands of commercial properties and offer scheduled maintenance and emergency response.",
          },
          {
            question: "My Anaheim home has an older AC unit — should I repair or replace it?",
            answer:
              "It depends on the age, refrigerant type, and repair cost. If it's 12+ years old or uses R-22 refrigerant, replacement is often the better value. We'll give you an honest assessment when we come out.",
          },
        ],
      },
      {
        slug: "anaheim-hills",
        name: "Anaheim Hills",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Anaheim Hills' hillside estates and newer developments face high summer temperatures and often run large, multi-zone systems. We service all of it.",
        localContext:
          "Anaheim Hills sits in the foothills east of the 91 freeway and regularly sees temperatures 5–10°F hotter than coastal OC during summer. The area's larger homes — many built in the 1980s and 1990s — often have multi-zone systems, older ductwork, and equipment that hasn't been serviced consistently. We find that attic-mounted air handlers in these homes are a common source of efficiency loss.",
        topServiceSlugs: ["ac-repair", "ac-replacement", "ac-maintenance"],
        nearbySlugs: ["yorba-linda", "orange", "anaheim", "villa-park", "brea"],
        faqs: [
          {
            question: "Why do Anaheim Hills homes get so much hotter than coastal areas?",
            answer:
              "Anaheim Hills is an inland foothill community shielded from the marine layer that cools coastal cities. South-facing and hilltop properties can see temperatures well above 100°F during heat events, which puts high demand on cooling systems.",
          },
          {
            question: "My Anaheim Hills home has two separate AC systems — can you service both?",
            answer:
              "Yes. Multi-zone and multi-system homes are common in Anaheim Hills. We service all units on a single visit and can coordinate the systems for better overall efficiency.",
          },
          {
            question: "How often should I get a tune-up for my Anaheim Hills AC?",
            answer:
              "Annually at minimum — ideally in March or April before summer heat hits. Given the longer and hotter cooling season in foothill areas, a pre-season tune-up catches problems before they become failures.",
          },
        ],
      },
      {
        slug: "brea",
        name: "Brea",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Serving Brea homeowners and businesses with AC repair, installation, and maintenance. Brea's hillside properties often require specialized duct design.",
        localContext:
          "Brea sits on the northern edge of Orange County where the Santa Ana mountains begin to rise. Many of its hillside properties have attic spaces with limited clearance and older duct runs that need resealing or replacement. The city's mix of 1960s ranch homes and newer developments means we work across a wide range of equipment generations here.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "air-duct-services"],
        nearbySlugs: ["yorba-linda", "fullerton", "placentia", "la-habra", "diamond-bar"],
        faqs: [
          {
            question: "Can you handle HVAC in Brea's older hillside homes?",
            answer:
              "Yes. We regularly work in attics and crawlspaces in Brea's older hillside properties. We're experienced with tight spaces, older ductwork, and systems that were originally sized for a different era of building practices.",
          },
          {
            question: "Is air duct cleaning worth it for a Brea home?",
            answer:
              "If the home is more than 10 years old and ducts have never been cleaned, or if you've noticed increased dust or reduced airflow, yes. Brea's hillside properties sometimes have ductwork that runs through unconditioned spaces, accumulating debris faster.",
          },
          {
            question: "Do you offer maintenance plans for Brea homeowners?",
            answer:
              "Yes. Our residential maintenance plan includes spring and fall visits, priority scheduling, and discounts on repairs. It's a good fit for Brea homeowners who want consistent service without having to remember to schedule each year.",
          },
        ],
      },
      {
        slug: "fullerton",
        name: "Fullerton",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "HVAC service for Fullerton's mix of mid-century homes, newer developments, and commercial buildings near Fullerton College and downtown corridors.",
        localContext:
          "Fullerton has one of Orange County's most varied housing stocks, from 1940s bungalows near the historic downtown to 1980s tract homes and newer condominiums near the 57 freeway. Mid-century homes often have original ductwork, single-zone systems, and equipment that predates modern efficiency standards. We handle all of it and advise honestly on when upgrade makes more sense than repair.",
        topServiceSlugs: ["ac-repair", "ac-installation", "air-duct-cleaning"],
        nearbySlugs: ["brea", "placentia", "anaheim", "buena-park", "la-habra"],
        faqs: [
          {
            question: "My Fullerton home is from the 1950s — can you work with the existing ductwork?",
            answer:
              "We can inspect and assess the existing ductwork. In many mid-century Fullerton homes, the original ducts are undersized or have significant leakage. We'll tell you honestly whether sealing, partial replacement, or full replacement is the right call.",
          },
          {
            question: "Do you service rentals and multi-family properties in Fullerton?",
            answer:
              "Yes. We work with landlords and property managers in Fullerton for both scheduled maintenance and emergency repair. We can accommodate tenant-occupied units and work efficiently to minimize disruption.",
          },
          {
            question: "How much does AC installation cost in Fullerton?",
            answer:
              "It depends on the size of your home, the system type, and any ductwork modifications needed. We provide written estimates before any work begins — there's no cost to have us come out and assess.",
          },
        ],
      },
      {
        slug: "placentia",
        name: "Placentia",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Providing fast AC and heating service to Placentia residents and businesses. Our Yorba Linda shop puts us just minutes from most Placentia neighborhoods.",
        localContext:
          "Placentia is one of our most frequently served cities outside Yorba Linda — it borders our home base directly. The city's 1970s and 1980s residential tracts run Carrier, Trane, and Bryant systems predominantly, and we stock parts for all three. Placentia has hot summers with limited coastal breeze relief, making reliable AC essential from May through October.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "ac-tune-up"],
        nearbySlugs: ["yorba-linda", "anaheim", "fullerton", "brea", "orange"],
        faqs: [
          {
            question: "How fast can you get to Placentia for an AC emergency?",
            answer:
              "Placentia is directly adjacent to our Yorba Linda shop. For urgent calls during business hours, we typically dispatch within 1–2 hours. We're available 7 days a week.",
          },
          {
            question: "What is the typical cost of AC repair in Placentia?",
            answer:
              "Repair costs vary by what failed. A capacitor replacement is a straightforward low-cost fix. A refrigerant leak or compressor issue costs more. We diagnose first and give you a written quote before any work begins.",
          },
          {
            question: "My Placentia home has a heat pump — do you service those?",
            answer:
              "Yes. Heat pumps are increasingly common in OC homes. We service, repair, and install all major heat pump brands and can evaluate whether your system is operating at its rated efficiency.",
          },
        ],
      },
      {
        slug: "villa-park",
        name: "Villa Park",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Villa Park's larger estate homes benefit from our duct design expertise and whole-home comfort assessments.",
        localContext:
          "Villa Park is one of Orange County's smallest cities by population but has some of its largest residential properties. Many homes exceed 3,000 sq ft and run multi-zone or multi-system setups. We often find that systems were undersized at original installation or that ductwork has never been inspected since the home was built. A whole-home comfort assessment is frequently our first recommendation here.",
        topServiceSlugs: ["ac-installation", "ac-maintenance", "air-duct-services"],
        nearbySlugs: ["orange", "anaheim-hills", "yorba-linda", "anaheim", "tustin"],
        faqs: [
          {
            question: "My Villa Park home is large — how do I know if my AC is the right size?",
            answer:
              "Oversized and undersized systems are both common in larger homes. We use Manual J load calculations to determine the correct tonnage. A properly sized system is more efficient and more comfortable than one that short-cycles or runs constantly.",
          },
          {
            question: "Do you service high-end HVAC brands like Daikin or Mitsubishi in Villa Park?",
            answer:
              "Yes. We service and install Daikin, Mitsubishi, Carrier, Trane, Lennox, and other premium brands. Villa Park's larger homes are a good fit for high-efficiency and zoned systems from these manufacturers.",
          },
          {
            question: "Can you do a whole-home comfort assessment in Villa Park?",
            answer:
              "Yes. We inspect the system, ductwork, insulation interface, and airflow at each register. We give you a written summary of findings and prioritized recommendations — no high-pressure sales.",
          },
        ],
      },
      {
        slug: "orange",
        name: "Orange",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "From historic Old Towne to newer neighborhoods near Santiago Canyon, we keep Orange residents comfortable year-round.",
        localContext:
          "The city of Orange has an exceptionally diverse housing stock — Old Towne Orange contains some of OC's oldest homes (1910s–1940s), while areas near Santiago Canyon Rd and Chapman Ave include large 1980s–2000s estates. Older homes in Old Towne are often adding central AC for the first time, which requires careful duct planning. We handle both ends of that spectrum.",
        topServiceSlugs: ["ac-installation", "ac-repair", "air-duct-services"],
        nearbySlugs: ["villa-park", "anaheim", "tustin", "santa-ana", "anaheim-hills"],
        faqs: [
          {
            question: "Can you add central AC to an older Orange home that doesn't have it?",
            answer:
              "Yes. Adding central air to a home without existing ductwork is a significant project, but we do it regularly in older OC homes. We'll assess the layout, design a duct system, and provide a written estimate.",
          },
          {
            question: "Do you service mini-splits in the Orange area?",
            answer:
              "Yes. Ductless mini-splits are popular in older homes in Orange where running full ductwork isn't practical. We install and service Mitsubishi, Daikin, and LG mini-split systems.",
          },
          {
            question: "How much does it cost to replace an AC system in Orange, CA?",
            answer:
              "Cost depends on tonnage, efficiency rating, brand, and whether any ductwork changes are needed. We provide written estimates that break out equipment and labor before work begins.",
          },
        ],
      },
      {
        slug: "tustin",
        name: "Tustin",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Serving Tustin Legacy developments, old-town Tustin neighborhoods, and light commercial properties with comprehensive HVAC services.",
        localContext:
          "Tustin's redeveloped legacy base area and the older neighborhoods around Old Town Tustin represent two very different service contexts. The newer Tustin Legacy construction often uses high-efficiency systems with advanced thermostats, while the older city core has mid-century homes with aging equipment. Tustin's inland location gives it warmer summers than coastal cities.",
        topServiceSlugs: ["ac-repair", "ac-installation", "ac-maintenance"],
        nearbySlugs: ["orange", "irvine", "santa-ana", "villa-park", "anaheim"],
        faqs: [
          {
            question: "Do you service new construction HVAC in the Tustin Legacy area?",
            answer:
              "Yes. We work on newer high-efficiency systems common in Tustin Legacy, including communicating thermostats, variable-speed equipment, and smart home integrations.",
          },
          {
            question: "How quickly can you come to Tustin for AC repair?",
            answer:
              "Tustin is well within our same-day service zone. Morning calls typically get same-day scheduling, and urgent calls receive priority dispatch.",
          },
          {
            question: "Do you offer commercial HVAC service in Tustin?",
            answer:
              "Yes. We service offices, retail, and light industrial properties in Tustin. Preventive maintenance contracts are available for business owners who want scheduled service.",
          },
        ],
      },
      {
        slug: "santa-ana",
        name: "Santa Ana",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Residential and commercial HVAC for Santa Ana's dense urban neighborhoods, multi-family buildings, and commercial districts.",
        localContext:
          "Santa Ana is OC's most densely populated city and has a high concentration of multi-family housing and older commercial buildings. Many residential systems here are wall units, window units, or aging central systems in buildings from the 1960s–1980s. We work on all of these and have experience navigating multi-tenant access and building manager coordination.",
        topServiceSlugs: ["ac-repair", "commercial-hvac", "ductless-mini-split"],
        nearbySlugs: ["orange", "tustin", "costa-mesa", "garden-grove", "anaheim"],
        faqs: [
          {
            question: "Can you service older central AC systems in Santa Ana apartments?",
            answer:
              "Yes. We work in multi-family buildings regularly — coordinating with property managers, working in occupied units, and handling older equipment. We'll assess what needs immediate repair versus what can be scheduled.",
          },
          {
            question: "Are mini-splits a good option for Santa Ana homes without ductwork?",
            answer:
              "Often yes. For homes or units without central duct systems, mini-splits provide efficient zone cooling without the cost and disruption of adding full ductwork. We install Mitsubishi, Daikin, and LG systems.",
          },
          {
            question: "Do you do commercial HVAC service in Santa Ana's business districts?",
            answer:
              "Yes. We service retail, restaurant, and office HVAC throughout Santa Ana. We offer emergency response and scheduled maintenance contracts for commercial customers.",
          },
        ],
      },
      {
        slug: "irvine",
        name: "Irvine",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Premium HVAC service for Irvine's master-planned communities, tech campuses, and high-rise office parks.",
        localContext:
          "Irvine's master-planned communities — Great Park, Woodbury, Portola Springs, Stonegate — typically have newer, higher-efficiency systems installed within the last decade. Tech campuses and business parks along the Irvine Spectrum and Jamboree corridors have complex commercial cooling needs. We handle both markets and understand Irvine's energy efficiency standards and HOA considerations.",
        topServiceSlugs: ["ac-maintenance", "commercial-hvac", "ac-installation"],
        nearbySlugs: ["tustin", "lake-forest", "newport-beach", "costa-mesa", "mission-viejo"],
        faqs: [
          {
            question: "My Irvine home's AC system is only 5 years old — should I still get a tune-up?",
            answer:
              "Yes. Newer systems benefit from annual maintenance just like older ones — it maintains warranty compliance, checks refrigerant levels, and catches minor issues before they become expensive failures.",
          },
          {
            question: "Do you service commercial HVAC in the Irvine Spectrum and business parks?",
            answer:
              "Yes. We work with office buildings, tech campuses, and retail along the Jamboree and Irvine Center corridors. We offer commercial maintenance contracts with priority response.",
          },
          {
            question: "Are HOA restrictions an issue when replacing an AC system in Irvine?",
            answer:
              "Some Irvine HOAs have rules about equipment placement, pad location, and screening. We're familiar with these requirements and can help navigate approvals as part of the installation process.",
          },
        ],
      },
      {
        slug: "costa-mesa",
        name: "Costa Mesa",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Serving Costa Mesa residential neighborhoods, commercial retail centers, and industrial areas with fast-response HVAC repair and professional installation.",
        localContext:
          "Costa Mesa's coastal proximity keeps temperatures moderate compared to inland OC, but humidity and marine layer create different challenges — particularly salt air corrosion on outdoor condenser coils and refrigerant lines. South Coast Plaza and the surrounding retail district is a major commercial HVAC service area for us.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "commercial-hvac"],
        nearbySlugs: ["newport-beach", "irvine", "santa-ana", "huntington-beach", "tustin"],
        faqs: [
          {
            question: "Does coastal air affect my AC system in Costa Mesa?",
            answer:
              "Over time, yes. Salt-laden coastal air accelerates corrosion on condenser coils and copper refrigerant lines. Regular coil cleaning and inspection catches this before it becomes a refrigerant leak or compressor failure.",
          },
          {
            question: "Do you service commercial HVAC near South Coast Plaza and the business corridors?",
            answer:
              "Yes. We have experience with the retail and commercial properties in the South Coast Plaza area and along Harbor Blvd and Newport Blvd. Commercial maintenance contracts are available.",
          },
          {
            question: "Is AC really necessary in Costa Mesa given the beach weather?",
            answer:
              "September and October heat waves — sometimes the hottest weeks of the year due to Santa Ana wind conditions — are common in Costa Mesa. An AC that isn't maintained year-round can fail during those critical weeks.",
          },
        ],
      },
      {
        slug: "huntington-beach",
        name: "Huntington Beach",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Coastal properties near Huntington Beach face unique challenges — salt air corrosion, humidity, and mild temperatures that make the right equipment selection critical.",
        localContext:
          "Huntington Beach's ocean-facing properties are among the most demanding environments for HVAC equipment in Southern California. Salt air degrades condenser coils, refrigerant connections, and electrical components faster than inland locations. We recommend stainless steel or coated coil options and inspect all outdoor components thoroughly at each service visit.",
        topServiceSlugs: ["ac-maintenance", "ac-repair", "ac-installation"],
        nearbySlugs: ["costa-mesa", "fountain-valley", "westminster", "seal-beach", "newport-beach"],
        faqs: [
          {
            question: "How does the ocean air affect AC equipment in Huntington Beach?",
            answer:
              "Saltwater in the air accelerates oxidation on aluminum fins, copper lines, and electrical contacts. Homes within half a mile of the water often see equipment degrade noticeably faster. We use coil coatings and more frequent inspections to address this.",
          },
          {
            question: "Do I need AC in Huntington Beach if I live near the coast?",
            answer:
              "Ocean-close properties stay cool much of the year, but during fall heat waves and Santa Ana wind events, temperatures can spike significantly and rapidly. A functioning system for those weeks is worth having.",
          },
          {
            question: "What AC brands hold up best near the Huntington Beach coast?",
            answer:
              "Brands that offer marine coating on condenser coils — Carrier, Lennox, and Daikin among them — hold up better in coastal environments. We can advise on the right option for your property when doing a replacement.",
          },
        ],
      },
      {
        slug: "newport-beach",
        name: "Newport Beach",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Premium HVAC service for Newport Beach luxury residences, waterfront properties, and commercial establishments.",
        localContext:
          "Newport Beach spans an unusual range of property types — compact bay-front cottages on Balboa Island, large estates in Newport Coast and Pelican Hill, and dense commercial activity along Pacific Coast Hwy and Fashion Island. Waterfront properties face accelerated equipment corrosion, while Newport Coast's hillside estates often have large multi-zone systems. We work across all of it.",
        topServiceSlugs: ["ac-maintenance", "ac-installation", "commercial-hvac"],
        nearbySlugs: ["costa-mesa", "irvine", "laguna-beach", "huntington-beach", "mission-viejo"],
        faqs: [
          {
            question: "Do you service waterfront and Balboa Island properties in Newport Beach?",
            answer:
              "Yes. Balboa Island and bay-front properties are part of our regular service territory. Tight spaces and salt air exposure are standard working conditions for us in these areas.",
          },
          {
            question: "Can you handle large Newport Coast estate HVAC systems?",
            answer:
              "Yes. Large estates with multiple systems, variable-speed equipment, and zoning controls are common in Newport Coast. We service all of these and can coordinate service across multiple units on a single visit.",
          },
          {
            question: "Do you offer discreet scheduling for Newport Beach clients?",
            answer:
              "Yes. We operate professionally and efficiently. Technicians arrive in a clean vehicle and uniform, work to minimize disruption, and will work within any scheduling preferences you provide.",
          },
        ],
      },
      {
        slug: "mission-viejo",
        name: "Mission Viejo",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Reliable HVAC service for Mission Viejo's established neighborhoods and planned communities.",
        localContext:
          "Mission Viejo was master-planned in the 1960s and 1970s and has a relatively consistent housing stock — single-family homes built primarily between 1970 and 1990, many with original ductwork that has never been replaced. Equipment from this era used R-22 refrigerant, which is no longer manufactured. If your Mission Viejo system still runs on R-22, we can advise you on your options honestly.",
        topServiceSlugs: ["ac-replacement", "ac-repair", "air-duct-services"],
        nearbySlugs: ["lake-forest", "laguna-niguel", "aliso-viejo", "irvine", "laguna-hills"],
        faqs: [
          {
            question: "My Mission Viejo home still has an R-22 AC system — what should I do?",
            answer:
              "R-22 is no longer manufactured, making refrigerant very expensive if you have a leak. If the system is over 15 years old and using R-22, replacement with a modern R-410A or R-32 system is usually the better financial decision.",
          },
          {
            question: "Do you replace original ductwork in Mission Viejo's 1970s homes?",
            answer:
              "Yes. We assess the existing ducts, identify leaks or undersized sections, and can replace partial or full duct systems. New ductwork typically improves both comfort and energy efficiency noticeably.",
          },
          {
            question: "Do you offer emergency AC service in Mission Viejo?",
            answer:
              "Yes. We serve Mission Viejo 7 days a week. Emergency calls are dispatched as quickly as possible — call us directly for urgent issues and we'll give you an honest arrival estimate.",
          },
        ],
      },
      {
        slug: "lake-forest",
        name: "Lake Forest",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Serving Lake Forest residential and commercial customers with comprehensive HVAC solutions, from tune-ups to complete system replacements.",
        localContext:
          "Lake Forest (incorporating the former Foothill Ranch area) has a mix of planned community homes from the 1980s–2000s and newer construction in the Portola Hills area. Inland location means summer temperatures regularly exceed 95°F, and many of the older planned community homes have systems approaching the end of their useful life.",
        topServiceSlugs: ["ac-repair", "ac-replacement", "ac-maintenance"],
        nearbySlugs: ["mission-viejo", "irvine", "aliso-viejo", "laguna-hills", "rancho-santa-margarita"],
        faqs: [
          {
            question: "How hot does it get in Lake Forest in summer?",
            answer:
              "Lake Forest is inland enough to see summer temperatures regularly in the 90s°F, sometimes exceeding 100°F during heat waves. A functioning AC is essential from June through September.",
          },
          {
            question: "My Lake Forest system is about 14 years old — repair or replace?",
            answer:
              "At 14 years, we're approaching the end of average system life (15–20 years). If the repair cost exceeds about 50% of replacement cost, replacement typically makes more financial sense. We'll give you both quotes.",
          },
          {
            question: "Do you service the Portola Hills area of Lake Forest?",
            answer:
              "Yes. Portola Hills is part of our standard Lake Forest service area. Newer homes there often have higher-efficiency systems that benefit from professional annual maintenance.",
          },
        ],
      },
      {
        slug: "aliso-viejo",
        name: "Aliso Viejo",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "HVAC service for Aliso Viejo's townhomes, single-family neighborhoods, and growing commercial sector.",
        localContext:
          "Aliso Viejo was incorporated in 2001 and is one of OC's newer planned communities. Its housing stock is largely 1990s–2000s townhomes and single-family homes, with systems that are now approaching 20–25 years old. Many of these homes are due for equipment evaluation and in some cases replacement before systems fail unexpectedly.",
        topServiceSlugs: ["ac-maintenance", "ac-replacement", "ac-repair"],
        nearbySlugs: ["laguna-niguel", "laguna-hills", "mission-viejo", "lake-forest", "laguna-beach"],
        faqs: [
          {
            question: "My Aliso Viejo townhome has the original HVAC — is it time to replace it?",
            answer:
              "If it's 20+ years old and you haven't had it serviced in a few years, it's worth a professional assessment. We'll check refrigerant levels, heat exchanger condition, and overall efficiency before making a recommendation.",
          },
          {
            question: "Do you service townhome and condo HVAC in Aliso Viejo?",
            answer:
              "Yes. Townhomes and condos have their own set of access and coordination considerations. We're experienced with HOA requirements and working in attached-unit properties.",
          },
          {
            question: "Can you come out on weekends for Aliso Viejo service calls?",
            answer:
              "Yes. We work 7 days a week. Weekend appointments are available — emergency calls on weekends get priority dispatch.",
          },
        ],
      },
      {
        slug: "laguna-niguel",
        name: "Laguna Niguel",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Expert HVAC installation and repair for Laguna Niguel's hillside homes and planned communities.",
        localContext:
          "Laguna Niguel's hillside communities offer ocean views but also face the same salt air challenges as coastal cities — equipment along the western slopes near Laguna Beach degrades faster than inland areas. The city's 1980s planned communities (Bear Brand Ranch, La Siena, Marina Hills) run a consistent range of mid-efficiency equipment that we see frequently.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "ac-installation"],
        nearbySlugs: ["aliso-viejo", "laguna-hills", "mission-viejo", "dana-point", "laguna-beach"],
        faqs: [
          {
            question: "Does Laguna Niguel's coastal proximity affect HVAC equipment?",
            answer:
              "For properties on the western slopes near Laguna Beach, yes. Salt air accelerates condenser coil corrosion and shortens component life. More frequent inspections and coil cleaning are warranted for these locations.",
          },
          {
            question: "What brands do you install in Laguna Niguel?",
            answer:
              "We install Carrier, Trane, Lennox, Goodman, Rheem, and Daikin depending on your needs and budget. We don't push a single brand — we recommend based on your home's requirements.",
          },
          {
            question: "Do you handle AC emergencies in Laguna Niguel on weekends?",
            answer:
              "Yes. We serve Laguna Niguel 7 days a week. Call us directly for urgent issues.",
          },
        ],
      },
      {
        slug: "san-clemente",
        name: "San Clemente",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Southern Orange County service extending to San Clemente. Coastal climate expertise for the city by the sea.",
        localContext:
          "San Clemente is the southernmost city in Orange County, with a strongly Mediterranean climate — mild temperatures most of the year but significant salt air from the Pacific. Many beach-area homes have minimal HVAC: swamp coolers, wall units, or systems that were added after original construction. We assess these situations and recommend the right solution, whether repair, upgrade, or mini-split installation.",
        topServiceSlugs: ["ac-installation", "ductless-mini-split", "ac-maintenance"],
        nearbySlugs: ["laguna-niguel", "dana-point", "aliso-viejo", "laguna-hills", "laguna-beach"],
        faqs: [
          {
            question: "Is central AC worth installing in a San Clemente beach home?",
            answer:
              "In many San Clemente homes, a ductless mini-split system is a more practical and cost-effective choice than full central air, especially for older beach cottages or homes without existing ductwork.",
          },
          {
            question: "My San Clemente home doesn't have AC at all — what are my options?",
            answer:
              "We can install ductless mini-splits (fastest and least invasive), or central air if you have or want to add ductwork. We'll assess your home and give you options with honest cost comparisons.",
          },
          {
            question: "How far south do you travel for service calls?",
            answer:
              "San Clemente is at the edge of our Orange County service territory. We make regular runs there — same-day scheduling is typically available, though arrival windows may be wider than closer cities.",
          },
        ],
      },
      {
        slug: "garden-grove",
        name: "Garden Grove",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Comprehensive HVAC services for Garden Grove's residential areas, commercial corridors, and multi-family housing.",
        localContext:
          "Garden Grove has a high concentration of 1950s–1970s single-family homes and multi-family housing, much of it originally built without central air. Retrofitting central AC or installing ductless systems in these homes is a significant part of our work here. Garden Grove's inland-coastal position means summers are warm but not as extreme as further inland areas.",
        topServiceSlugs: ["ac-installation", "ductless-mini-split", "ac-repair"],
        nearbySlugs: ["westminster", "anaheim", "santa-ana", "fountain-valley", "buena-park"],
        faqs: [
          {
            question: "Can you add central AC to a Garden Grove home that only has window units?",
            answer:
              "Yes. We evaluate whether existing ductwork can be used or new ducts are needed, then provide a complete cost estimate. Ductless mini-splits are an alternative if full ductwork isn't practical.",
          },
          {
            question: "Do you handle multi-family HVAC in Garden Grove?",
            answer:
              "Yes. We work with property managers and landlords on multi-unit buildings, handling both emergency repairs and scheduled maintenance across multiple units.",
          },
          {
            question: "What is the typical AC replacement cost for a Garden Grove home?",
            answer:
              "Replacement cost depends on the size of the home, the system type, and ductwork requirements. We provide itemized written estimates before any work begins.",
          },
        ],
      },
      {
        slug: "westminster",
        name: "Westminster",
        county: "Orange County",
        countySlug: "orange-county",
        blurb:
          "Serving Westminster homeowners and businesses with dependable AC repair, system installation, and preventive maintenance.",
        localContext:
          "Westminster's housing stock includes a mix of 1950s–1980s homes with varying levels of original HVAC infrastructure. The city's location — inland enough for warm summers but close enough to the coast to feel occasional marine influence — means most homes benefit from functional central air or ductless cooling.",
        topServiceSlugs: ["ac-repair", "ac-installation", "ac-maintenance"],
        nearbySlugs: ["garden-grove", "huntington-beach", "fountain-valley", "santa-ana", "buena-park"],
        faqs: [
          {
            question: "Do you offer same-day AC repair in Westminster?",
            answer:
              "Yes. Westminster is within our Orange County same-day service zone. Morning calls typically receive same-day appointments.",
          },
          {
            question: "My Westminster home has an older R-22 system — what are my options?",
            answer:
              "R-22 refrigerant is no longer manufactured and is expensive if your system has a leak. We can advise on repairing, converting, or replacing depending on the system's age and condition.",
          },
          {
            question: "Can you install a ductless mini-split in a Westminster home?",
            answer:
              "Yes. Mini-splits are a popular solution for older Westminster homes that weren't built with central ductwork, or for room additions where extending existing ducts isn't practical.",
          },
        ],
      },
    ],
  },

  // ─── RIVERSIDE COUNTY ─────────────────────────────────────────────────────
  {
    slug: "riverside-county",
    name: "Riverside County",
    blurb:
      "Serving the western Riverside County communities closest to our Yorba Linda base.",
    serviceNote:
      "We serve western Riverside County cities — Corona, Norco, and Eastvale — that sit just across the county line from our Yorba Linda location. Same-day service is typically available for these areas.",
    climateNote:
      "Western Riverside County cities experience significantly hotter summers than coastal OC — temperatures regularly exceed 100°F in Corona and Norco from June through September. High-performance cooling systems and consistent maintenance are especially important in this climate.",
    cities: [
      {
        slug: "corona",
        name: "Corona",
        county: "Riverside County",
        countySlug: "riverside-county",
        blurb:
          "Corona is a growing part of our service territory. We serve residential neighborhoods, commercial centers, and industrial areas throughout the city.",
        localContext:
          "Corona's rapid growth has produced a wide range of housing stock, from 1970s–1980s established neighborhoods near downtown to large 2000s master-planned communities in the north and south portions of the city. The city regularly exceeds 100°F in summer, making reliable AC critical. We stock parts for the Carrier, Trane, and Goodman systems most common in Corona's newer developments.",
        topServiceSlugs: ["ac-repair", "ac-installation", "ac-maintenance"],
        nearbySlugs: ["norco", "eastvale", "chino-hills", "yorba-linda", "anaheim-hills"],
        faqs: [
          {
            question: "How hot does it get in Corona in summer?",
            answer:
              "Corona regularly exceeds 100°F during summer heat events, with July and August averaging high temperatures in the mid-to-upper 90s. A functioning AC system is essential, not optional.",
          },
          {
            question: "Do you service Corona's newer master-planned communities?",
            answer:
              "Yes. We're familiar with the equipment in newer Corona developments, including the systems installed in Terramor, Sycamore Creek, and South Corona communities.",
          },
          {
            question: "Can you come to Corona on the same day for an AC emergency?",
            answer:
              "In most cases, yes. Corona is within our standard same-day service zone. Emergency calls are dispatched as a priority.",
          },
        ],
      },
      {
        slug: "norco",
        name: "Norco",
        county: "Riverside County",
        countySlug: "riverside-county",
        blurb:
          "HVAC service for Norco's horse-property estates and residential communities. Norco's rural character and hot summers demand reliable, high-capacity cooling systems.",
        localContext:
          "Norco's large-lot horse properties and rural residential character create unique HVAC considerations — many properties have detached garages, barns, or accessory structures that need separate cooling solutions, and the heat here is significant. Norco sees some of the highest summer temperatures in the region, with days above 105°F not uncommon in July and August.",
        topServiceSlugs: ["ac-repair", "ac-installation", "ductless-mini-split"],
        nearbySlugs: ["corona", "eastvale", "chino", "chino-hills", "ontario"],
        faqs: [
          {
            question: "Can you install AC in a detached garage or barn on a Norco property?",
            answer:
              "Yes. Ductless mini-splits are ideal for detached structures — no ductwork required, efficient, and can be sized for the specific space. We install them in garages, workshops, and covered outdoor areas.",
          },
          {
            question: "How hot does it get in Norco in summer?",
            answer:
              "Norco is one of the hottest cities in western Riverside County. July and August regularly bring temperatures above 100°F, with occasional spikes to 108–110°F during heat events.",
          },
          {
            question: "Do you service large homes and estates in Norco?",
            answer:
              "Yes. Norco's larger properties often run multiple HVAC systems. We service all of them on a single visit and can assess whether each system is properly sized and maintained.",
          },
        ],
      },
      {
        slug: "eastvale",
        name: "Eastvale",
        county: "Riverside County",
        countySlug: "riverside-county",
        blurb:
          "Serving Eastvale's newer master-planned communities with modern HVAC installation and repair.",
        localContext:
          "Eastvale is one of California's newest cities (incorporated 2010) and consists almost entirely of 2000s–2010s master-planned residential communities. Systems here are newer but are now old enough to need their first major maintenance cycle or encounter early repairs. Eastvale's inland position and hot summers mean these systems work hard from May through October.",
        topServiceSlugs: ["ac-maintenance", "ac-repair", "ac-installation"],
        nearbySlugs: ["corona", "chino", "ontario", "norco", "chino-hills"],
        faqs: [
          {
            question: "My Eastvale home was built in 2008 — is the original HVAC still good?",
            answer:
              "A 2008 system is now around 17 years old — past the midpoint of its expected life. If it hasn't been regularly serviced, it's worth having us inspect it. You may have years left, or we may find it needs attention.",
          },
          {
            question: "Why is my Eastvale home hard to cool even with a newer system?",
            answer:
              "Common causes in newer construction: improper original duct sealing, an undersized system relative to actual heat load, or attic insulation issues. We diagnose and fix the root cause rather than just adjusting the thermostat.",
          },
          {
            question: "Do you offer preventive maintenance plans in Eastvale?",
            answer:
              "Yes. Our residential maintenance plan covers annual tune-ups, priority scheduling, and repair discounts — a good fit for Eastvale homeowners who want to stay ahead of the heat season.",
          },
        ],
      },
    ],
  },

  // ─── SAN BERNARDINO COUNTY ────────────────────────────────────────────────
  {
    slug: "san-bernardino-county",
    name: "San Bernardino County",
    blurb:
      "Serving the western edge of San Bernardino County, including the Chino Valley area adjacent to our Orange County service territory.",
    serviceNote:
      "The Chino Valley cities — Chino Hills, Chino, and Ontario — are within our standard service area. These communities sit just northeast of our Yorba Linda location and receive the same same-day service as most of Orange County.",
    climateNote:
      "Western San Bernardino County cities are inland and experience very hot summers — Ontario and Chino regularly exceed 100°F in July and August. High-efficiency, high-capacity cooling systems are essential here, and equipment works considerably harder than in coastal OC.",
    cities: [
      {
        slug: "chino-hills",
        name: "Chino Hills",
        county: "San Bernardino County",
        countySlug: "san-bernardino-county",
        blurb:
          "Chino Hills is one of our core expansion markets. We serve the city's hillside subdivisions and newer developments with AC repair, installation, and seasonal tune-ups.",
        localContext:
          "Chino Hills is a planned hillside community developed primarily in the 1980s–2000s. Its rolling terrain and southern California inland heat (regularly above 95°F in summer) put consistent demands on cooling systems. Many of the 1980s–1990s homes are on their second or third HVAC system, while newer developments have equipment approaching their first major service milestone.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "ac-replacement"],
        nearbySlugs: ["chino", "corona", "yorba-linda", "diamond-bar", "ontario"],
        faqs: [
          {
            question: "How quickly can you reach Chino Hills for an AC repair?",
            answer:
              "Chino Hills is adjacent to our Orange County service territory. We can typically dispatch same-day for urgent calls, with arrival within a few hours.",
          },
          {
            question: "My Chino Hills home is from the 1990s — should I replace the HVAC?",
            answer:
              "A 1990s system is 25–35 years old, well past average lifespan. If it's still running, we can inspect and advise honestly. Replacement likely makes sense unless the system has been exceptionally well maintained.",
          },
          {
            question: "Do you offer free estimates for HVAC replacement in Chino Hills?",
            answer:
              "Yes. We come out, assess your home, and provide a written estimate at no cost. There's no obligation.",
          },
        ],
      },
      {
        slug: "chino",
        name: "Chino",
        county: "San Bernardino County",
        countySlug: "san-bernardino-county",
        blurb:
          "HVAC service for Chino residential neighborhoods and commercial and industrial facilities throughout the city.",
        localContext:
          "Chino has a mix of established residential neighborhoods and significant commercial and industrial development. Its inland location means summer temperatures regularly exceed 100°F. The city's older residential areas have a range of equipment ages and types, while the industrial corridors have commercial cooling demands that require careful load assessment.",
        topServiceSlugs: ["ac-repair", "commercial-hvac", "ac-installation"],
        nearbySlugs: ["chino-hills", "ontario", "eastvale", "norco", "diamond-bar"],
        faqs: [
          {
            question: "Do you service commercial HVAC in Chino's industrial areas?",
            answer:
              "Yes. We work with warehouses, manufacturing facilities, and commercial properties in Chino's industrial corridor. We understand the different cooling requirements for these environments.",
          },
          {
            question: "How hot does Chino get in summer?",
            answer:
              "Chino is fully inland and regularly sees temperatures above 100°F from June through September. Heat events can push temperatures to 108–110°F, putting significant stress on cooling systems.",
          },
          {
            question: "Do you offer same-day AC repair in Chino?",
            answer:
              "Yes. Chino is within our same-day service territory. We dispatch urgently for AC failures during hot weather.",
          },
        ],
      },
      {
        slug: "ontario",
        name: "Ontario",
        county: "San Bernardino County",
        countySlug: "san-bernardino-county",
        blurb:
          "Serving Ontario's residential communities and commercial centers with comprehensive HVAC solutions.",
        localContext:
          "Ontario is one of the larger cities in the Inland Empire and has substantial commercial, industrial, and residential sectors. Its location away from any coastal influence means some of the most extreme summer heat in our service area — Ontario regularly sees temperatures above 105°F. Both residential and commercial systems here are under significant cooling load for an extended season.",
        topServiceSlugs: ["ac-repair", "commercial-hvac", "ac-installation"],
        nearbySlugs: ["chino", "chino-hills", "eastvale", "norco", "corona"],
        faqs: [
          {
            question: "How extreme is the heat in Ontario in summer?",
            answer:
              "Ontario is one of the hotter cities in Southern California. July and August regularly see daily highs above 100°F, with heat events occasionally exceeding 110°F. AC failure during these periods is a health risk, not just a discomfort.",
          },
          {
            question: "Do you service commercial HVAC in Ontario Airport area businesses?",
            answer:
              "Yes. We work with commercial and industrial properties in the Ontario Airport area, including warehouse, logistics, and office facilities. Commercial maintenance contracts are available.",
          },
          {
            question: "Can you do same-day AC repair in Ontario?",
            answer:
              "Ontario is at the edge of our same-day service zone. We can often dispatch same-day, but call early — morning calls are more likely to get same-day service than afternoon calls.",
          },
        ],
      },
    ],
  },

  // ─── VENTURA COUNTY ───────────────────────────────────────────────────────
  {
    slug: "ventura-county",
    name: "Ventura County",
    blurb:
      "Extended service area covering the eastern Ventura County communities within reasonable distance of our Yorba Linda base.",
    serviceNote:
      "We serve eastern Ventura County cities — Thousand Oaks, Simi Valley, and Moorpark — on a scheduled basis. Same-day service availability is more limited than in Orange County. Call to confirm current scheduling availability.",
    climateNote:
      "Eastern Ventura County cities like Thousand Oaks and Simi Valley experience inland heat in summer, with temperatures often 10–15°F higher than coastal Ventura. Thousand Oaks has a relatively mild climate but Simi Valley can exceed 100°F during heat events. The mix of newer and older housing stock creates diverse HVAC service needs.",
    cities: [
      {
        slug: "thousand-oaks",
        name: "Thousand Oaks",
        county: "Ventura County",
        countySlug: "ventura-county",
        blurb:
          "Extended service to Thousand Oaks for HVAC repair, installation, and maintenance.",
        localContext:
          "Thousand Oaks is one of the Conejo Valley's primary cities — a master-planned community with a mix of 1970s–2000s residential development. Its climate is transitional: cooler than the inland Ventura County cities but warmer than coastal areas. Many homes have older systems that have been serviced less consistently than those in core OC markets.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "ac-installation"],
        nearbySlugs: ["simi-valley", "moorpark"],
        faqs: [
          {
            question: "Do you service Thousand Oaks regularly?",
            answer:
              "Thousand Oaks is in our extended service area. We schedule service here on a regular basis, though same-day scheduling is less guaranteed than for Orange County cities. Call us to confirm current availability.",
          },
          {
            question: "What HVAC brands are common in Thousand Oaks homes?",
            answer:
              "The Conejo Valley has a lot of Carrier and Lennox equipment from 1980s–1990s installations, along with newer Trane and Goodman systems in more recent developments. We service all major brands.",
          },
          {
            question: "Is AC essential in Thousand Oaks?",
            answer:
              "Thousand Oaks has a relatively mild climate much of the year, but summer heat events — particularly in August and September — can push temperatures above 95–100°F, especially in inland neighborhoods away from the coast.",
          },
        ],
      },
      {
        slug: "simi-valley",
        name: "Simi Valley",
        county: "Ventura County",
        countySlug: "ventura-county",
        blurb:
          "HVAC service for Simi Valley homeowners with an emphasis on summer performance in a hot inland climate.",
        localContext:
          "Simi Valley sits in the Santa Susana Mountains and experiences some of the hottest temperatures in Ventura County during summer — regularly above 100°F in July and August. The city's 1970s–1990s planned communities have aging HVAC equipment, and the extreme heat means failures are both more frequent and more impactful.",
        topServiceSlugs: ["ac-repair", "ac-replacement", "ac-maintenance"],
        nearbySlugs: ["thousand-oaks", "moorpark"],
        faqs: [
          {
            question: "How hot does Simi Valley get in summer?",
            answer:
              "Simi Valley's enclosed valley location makes it significantly hotter than coastal Ventura County. July and August regularly see highs above 100°F, making AC reliability critical.",
          },
          {
            question: "Do you come to Simi Valley for emergency AC repair?",
            answer:
              "We extend service to Simi Valley. Call us directly for emergency situations — we'll give you an honest availability assessment and dispatch as soon as we can.",
          },
          {
            question: "My Simi Valley home has an original 1980s HVAC system — what should I expect?",
            answer:
              "A system that old has exceeded its expected lifespan. It may still run, but efficiency is likely very low and the risk of failure is high. We'd recommend a full assessment before the next summer season.",
          },
        ],
      },
      {
        slug: "moorpark",
        name: "Moorpark",
        county: "Ventura County",
        countySlug: "ventura-county",
        blurb:
          "HVAC service extended to Moorpark for residential repair, maintenance, and system replacement.",
        localContext:
          "Moorpark is a small agricultural-transitional community in the Conejo Valley with a mix of rural residential and newer planned development. Its climate is warm in summer but generally milder than Simi Valley. Extended service from our Yorba Linda base means call scheduling depends on route availability.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "ac-installation"],
        nearbySlugs: ["thousand-oaks", "simi-valley"],
        faqs: [
          {
            question: "Do you service Moorpark homes?",
            answer:
              "Yes, on an extended-service basis. Moorpark is farther from our Yorba Linda base than our core service area, so same-day scheduling isn't guaranteed. Call us and we'll confirm current availability.",
          },
          {
            question: "What types of HVAC work do you do in Moorpark?",
            answer:
              "Repair, maintenance, and system replacement for residential properties. We service all major brands and can provide estimates for new installations.",
          },
          {
            question: "Is there a trip charge for coming to Moorpark?",
            answer:
              "Our diagnostic fee applies to all calls, including those in our extended service territory. We'll discuss this honestly before scheduling so there are no surprises.",
          },
        ],
      },
    ],
  },

  // ─── SANTA BARBARA COUNTY ─────────────────────────────────────────────────
  {
    slug: "santa-barbara-county",
    name: "Santa Barbara County",
    blurb:
      "Limited extended service to southern Santa Barbara County communities for HVAC repair and installation.",
    serviceNote:
      "Santa Barbara County is at the outer edge of our service range. We serve this area on a scheduled, non-emergency basis. Same-day service is not available. Please call to confirm scheduling and discuss any applicable trip considerations.",
    climateNote:
      "The Santa Barbara area has a mild Mediterranean climate — warm, dry summers and cool winters. Cooling demand is lower than inland areas, but many older homes lack central air and rely on mini-splits or window units. Heating can be a greater priority in mountain-adjacent neighborhoods.",
    cities: [
      {
        slug: "santa-barbara",
        name: "Santa Barbara",
        county: "Santa Barbara County",
        countySlug: "santa-barbara-county",
        blurb:
          "Limited HVAC service extended to Santa Barbara for installations and scheduled maintenance.",
        localContext:
          "Santa Barbara's Mediterranean climate means AC demand is relatively low, but the city's older adobe and craftsman homes — many without any central air — benefit from ductless mini-split installation. We extend service here for specific projects on a scheduled basis.",
        topServiceSlugs: ["ductless-mini-split", "ac-installation", "ac-maintenance"],
        nearbySlugs: ["goleta"],
        faqs: [
          {
            question: "Do you really service Santa Barbara from Yorba Linda?",
            answer:
              "Yes, but only on a scheduled, non-emergency basis. We take on specific projects in Santa Barbara — typically system installations or larger maintenance jobs — when scheduling allows. Call us to discuss your situation.",
          },
          {
            question: "Is AC necessary in Santa Barbara?",
            answer:
              "Santa Barbara's ocean breeze keeps it mild most of the year, but summer temperatures in inland neighborhoods can reach the 90s. Many residents choose mini-splits for the occasional hot spell without committing to full central air.",
          },
          {
            question: "What HVAC services do you offer in Santa Barbara?",
            answer:
              "Primarily ductless mini-split installation, AC maintenance, and system replacement. Emergency repair is not available at this distance.",
          },
        ],
      },
      {
        slug: "goleta",
        name: "Goleta",
        county: "Santa Barbara County",
        countySlug: "santa-barbara-county",
        blurb:
          "Extended service to Goleta for scheduled HVAC installation and maintenance projects.",
        localContext:
          "Goleta is adjacent to Santa Barbara and home to UC Santa Barbara. It shares the same mild coastal climate and has a mix of university-area housing and newer residential development. We take on projects here on a scheduled basis.",
        topServiceSlugs: ["ac-installation", "ductless-mini-split", "ac-maintenance"],
        nearbySlugs: ["santa-barbara"],
        faqs: [
          {
            question: "Do you service Goleta on a regular schedule?",
            answer:
              "Goleta is at the outer limit of our service range. We accept projects here on a scheduled basis — call us to discuss your specific needs and confirm availability.",
          },
          {
            question: "Can you install a mini-split in a Goleta home?",
            answer:
              "Yes. Mini-split installation is the most common service request we fulfill in this area. We can provide a quote and schedule installation when our route allows.",
          },
          {
            question: "Is there a trip fee for Goleta service?",
            answer:
              "Yes. Service at this distance from our Yorba Linda base involves a trip consideration that we'll discuss openly before scheduling. We won't surprise you with fees.",
          },
        ],
      },
    ],
  },

  // ─── LOS ANGELES COUNTY (legacy — no pages built for this county) ──────
  {
    slug: "los-angeles-county",
    name: "Los Angeles County",
    blurb:
      "Expanding our reach into Los Angeles County, serving communities in the eastern and southern portions closest to our Yorba Linda base.",
    serviceNote:
      "We serve eastern LA County cities — Diamond Bar, Rowland Heights, Walnut, Hacienda Heights, and La Habra Heights — that sit just across the county line from Orange County.",
    climateNote:
      "Eastern LA County communities share OC's inland heat pattern, with summer temperatures regularly in the 90s and occasional triple-digit heat events. Housing stock varies from mid-century to newer planned development.",
    cities: [
      {
        slug: "diamond-bar",
        name: "Diamond Bar",
        county: "Los Angeles County",
        countySlug: "los-angeles-county",
        blurb:
          "Just across the county line from Yorba Linda, Diamond Bar is part of our core service area.",
        localContext:
          "Diamond Bar borders Chino Hills and Brea directly and sits just a few miles from our Yorba Linda shop. Its 1970s–1990s planned communities and newer hillside developments are served on the same basis as our Orange County cities.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "ac-installation"],
        nearbySlugs: ["chino-hills", "brea", "yorba-linda", "rowland-heights", "walnut"],
        faqs: [
          {
            question: "Is Diamond Bar in your service area?",
            answer:
              "Yes. Diamond Bar borders our home city of Yorba Linda and is within our core service area. Same-day scheduling is typically available.",
          },
          {
            question: "What neighborhoods in Diamond Bar do you serve?",
            answer:
              "All neighborhoods — from the communities near Diamond Bar Blvd to the hillside homes near the Country Hills and Summitridge areas.",
          },
          {
            question: "Do you service commercial HVAC in Diamond Bar?",
            answer:
              "Yes. Office parks and retail along Diamond Bar Blvd are within our commercial service area.",
          },
        ],
      },
      {
        slug: "rowland-heights",
        name: "Rowland Heights",
        county: "Los Angeles County",
        countySlug: "los-angeles-county",
        blurb:
          "HVAC service for Rowland Heights communities, serving both residential neighborhoods and commercial areas.",
        localContext:
          "Rowland Heights is an unincorporated community in eastern LA County with a mix of 1970s–1990s residential tracts and commercial corridors. It's within a short drive of our Yorba Linda base.",
        topServiceSlugs: ["ac-repair", "ac-installation", "ac-maintenance"],
        nearbySlugs: ["diamond-bar", "walnut", "hacienda-heights", "brea", "yorba-linda"],
        faqs: [
          {
            question: "Do you offer same-day service in Rowland Heights?",
            answer: "Yes. Rowland Heights is within our standard same-day service zone.",
          },
          {
            question: "What brands do you service in Rowland Heights?",
            answer: "All major brands — Carrier, Trane, Lennox, Goodman, Rheem, Bryant, and others.",
          },
          {
            question: "Can you install a new AC in a Rowland Heights home?",
            answer:
              "Yes. We handle full system replacements and new installations, including load calculations and ductwork modifications if needed.",
          },
        ],
      },
      {
        slug: "walnut",
        name: "Walnut",
        county: "Los Angeles County",
        countySlug: "los-angeles-county",
        blurb:
          "Serving Walnut's established residential neighborhoods and business parks with professional HVAC service.",
        localContext:
          "Walnut is a small, affluent residential city in eastern LA County adjacent to Diamond Bar and Chino Hills. Its well-maintained 1970s–1990s housing stock is a common service area for us.",
        topServiceSlugs: ["ac-repair", "ac-maintenance", "ac-installation"],
        nearbySlugs: ["diamond-bar", "rowland-heights", "chino-hills", "hacienda-heights"],
        faqs: [
          {
            question: "Do you service Walnut homes?",
            answer: "Yes. Walnut is within our standard service area, same schedule as Orange County.",
          },
          {
            question: "Do you service the business parks in Walnut?",
            answer: "Yes. Commercial HVAC in Walnut's business corridors is part of our service scope.",
          },
          {
            question: "Is same-day AC repair available in Walnut?",
            answer: "Typically yes — call us in the morning for the best chance of same-day service.",
          },
        ],
      },
      {
        slug: "hacienda-heights",
        name: "Hacienda Heights",
        county: "Los Angeles County",
        countySlug: "los-angeles-county",
        blurb:
          "Hacienda Heights HVAC service for mid-century and newer homes.",
        localContext:
          "Hacienda Heights is an unincorporated community in the Puente Hills area with a mix of 1960s–1980s homes. It's within standard service distance from Yorba Linda.",
        topServiceSlugs: ["ac-repair", "ac-installation", "ac-maintenance"],
        nearbySlugs: ["rowland-heights", "diamond-bar", "walnut", "la-habra-heights"],
        faqs: [
          {
            question: "Do you service Hacienda Heights?",
            answer: "Yes. Hacienda Heights is in our eastern LA County service territory.",
          },
          {
            question: "My Hacienda Heights home has an older system — can you repair it?",
            answer: "We service systems of all ages. We'll diagnose, advise honestly, and repair if it makes financial sense.",
          },
          {
            question: "Do you offer HVAC replacement quotes in Hacienda Heights?",
            answer: "Yes. We provide written estimates at no cost or obligation.",
          },
        ],
      },
      {
        slug: "la-habra-heights",
        name: "La Habra Heights",
        county: "Los Angeles County",
        countySlug: "los-angeles-county",
        blurb:
          "Serving La Habra Heights rural residential properties with HVAC systems suited for hillside construction.",
        localContext:
          "La Habra Heights is a semi-rural hillside community on the LA/OC border near Brea. Its large-lot residential properties and varied terrain create unique installation and service considerations.",
        topServiceSlugs: ["ac-repair", "ac-installation", "ductless-mini-split"],
        nearbySlugs: ["brea", "yorba-linda", "hacienda-heights", "rowland-heights"],
        faqs: [
          {
            question: "Do you service the hillside homes in La Habra Heights?",
            answer: "Yes. We're experienced with hillside properties and the access and equipment considerations they involve.",
          },
          {
            question: "Is La Habra Heights in your same-day service area?",
            answer: "It borders our core service area. Same-day is usually available — call to confirm.",
          },
          {
            question: "Can you install mini-splits in a La Habra Heights property?",
            answer: "Yes. Mini-splits are a good fit for the detached structures and room additions common on larger La Habra Heights lots.",
          },
        ],
      },
    ],
  },
];

export function getAllCities(): City[] {
  return COUNTIES.flatMap((c) => c.cities);
}

export function getCityBySlug(slug: string, countySlug?: string): City | undefined {
  if (countySlug) {
    const county = COUNTIES.find((c) => c.slug === countySlug);
    return county?.cities.find((c) => c.slug === slug);
  }
  return getAllCities().find((c) => c.slug === slug);
}

export function getCountyBySlug(slug: string): County | undefined {
  return COUNTIES.find((c) => c.slug === slug);
}

/** Counties that have dedicated service-area pages (excludes LA County which is legacy data only) */
export const SERVICE_AREA_COUNTIES = COUNTIES.filter(
  (c) => c.slug !== "los-angeles-county"
);
