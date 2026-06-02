import type { SiteImage } from "@/lib/config/images";

export type PPCCity = {
  slug: string;
  name: string;
  state: string;
  heroImage: SiteImage;
  repairImage: SiteImage;
  installImage: SiteImage;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubheadline: string;
  climate: string;
  commonProblems: string;
  homeownerConcerns: string;
  localContext: string;
  repairBody: string;
  installBody: string;
  emergencyBody: string;
  whyUsPoints: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  reviews: { name: string; location: string; body: string; rating: number }[];
};

export const PPC_CITIES: PPCCity[] = [
  {
    slug: "pasadena",
    name: "Pasadena",
    state: "CA",
    heroImage: {
      src: "/uploads/ac repair service in California  (16).jpeg",
      alt: "HVAC technician servicing an AC unit in Pasadena, CA",
      width: 900,
      height: 1200,
    },
    repairImage: {
      src: "/uploads/ac-repair (2).jpeg",
      alt: "AC repair service in Pasadena, CA",
      width: 1200,
      height: 900,
    },
    installImage: {
      src: "/uploads/ac-unit-installation (6).jpeg",
      alt: "New AC installation in Pasadena, CA",
      width: 1152,
      height: 1536,
    },
    metaTitle: "AC Repair & HVAC Service in Pasadena, CA — Same-Day Service",
    metaDescription:
      "Expert AC repair, installation & HVAC service in Pasadena, CA. Same-day availability. Free estimates. Call (714) 410-2784 — we answer 7 days a week.",
    h1: "AC Repair & HVAC Service in Pasadena, CA",
    heroSubheadline:
      "Same-day AC repair, system replacement & HVAC maintenance for Pasadena homes. We answer calls 7 days a week — including weekends.",
    climate:
      "Pasadena's inland location in the San Gabriel Valley means intense summer heat — temperatures regularly exceed 100°F and heat waves can push indoor temperatures to dangerous levels within hours of an AC breakdown. The dry, dusty air also accelerates filter clogging and coil fouling, which shortens equipment life and spikes energy bills.",
    commonProblems:
      "In Pasadena, the most frequent HVAC calls involve refrigerant leaks from aging coils stressed by extreme summer heat, capacitor failures on units that run nearly non-stop from May through October, and blower motor issues caused by dust accumulation from the nearby foothills. Older Craftsman and bungalow homes with original ductwork also suffer from poor airflow and hot spots.",
    homeownerConcerns:
      "Pasadena homeowners worry most about system failures during triple-digit heat waves, the high cost of full replacements, and whether their older home can support modern equipment. Many also ask about ductless mini-splits for additions and ADUs that lack existing ductwork.",
    localContext:
      "We serve all of Pasadena — from Bungalow Heaven and the historic districts near Old Town, to newer neighborhoods along the 210 corridor. Our trucks are familiar with the area and can often arrive the same day you call.",
    repairBody:
      "When your AC stops cooling in Pasadena summer heat, every minute counts. Our technicians diagnose the problem on the first visit — we carry a full parts inventory so most repairs are completed the same day. Common repairs include capacitor replacement, refrigerant recharge, contactor and relay fixes, and evaporator coil cleaning. We repair all major brands: Lennox, Carrier, Trane, Goodman, Rheem, and more.",
    installBody:
      "Replacing an aging system in Pasadena is an investment that pays off quickly given the region's long cooling season. We install high-efficiency systems sized precisely to your home — avoiding the oversized units that short-cycle and spike humidity. We offer Lennox, Trane, and Goodman equipment with manufacturer warranties, and we handle all permits and inspections.",
    emergencyBody:
      "AC emergencies in Pasadena can become health emergencies fast — especially for children, elderly residents, and pets. We prioritize same-day emergency calls and offer extended weekend availability. When you call, a real person answers — not a voicemail.",
    whyUsPoints: [
      {
        heading: "Pasadena Locals Know Us",
        body: "We've served homes throughout the San Gabriel Valley for years. Our technicians know local building styles, permit requirements, and common equipment brands used in the area.",
      },
      {
        heading: "Same-Day Service Guarantee",
        body: "We keep our schedule flexible to accommodate emergency calls. Most Pasadena customers get a same-day appointment when they call before noon.",
      },
      {
        heading: "Transparent, Flat-Rate Pricing",
        body: "You get a written quote before any work begins. No surprise charges, no upselling. Our diagnostic fee is waived when you proceed with the repair.",
      },
      {
        heading: "All Brands, All Ages",
        body: "From 1970s equipment in historic homes to modern variable-speed systems, we service and install every major brand with equal expertise.",
      },
    ],
    faqs: [
      {
        question: "How quickly can you respond to an AC emergency in Pasadena?",
        answer:
          "For emergency calls, we aim for same-day service — often within 2–4 hours during regular business hours. Weekend and evening availability is offered for urgent situations where the home is unsafe due to heat.",
      },
      {
        question: "My Pasadena home is older — can my ductwork handle a new system?",
        answer:
          "Many older Pasadena homes have undersized or deteriorating ductwork. Before any installation, we perform a duct assessment to identify leaks, restrictions, and sizing issues. We can repair, replace, or seal existing ducts as part of the installation project.",
      },
      {
        question: "What size AC system does my Pasadena home need?",
        answer:
          "System sizing depends on your home's square footage, insulation, window placement, ceiling height, and local climate load. We perform a proper Manual J load calculation — not a rough guess — to ensure your new system is sized correctly for Pasadena's extreme summer conditions.",
      },
      {
        question: "Do you offer financing for AC replacement in Pasadena?",
        answer:
          "Yes. We offer flexible financing options including 0% interest promotions for qualified buyers. Ask us about current offers when you request your free estimate.",
      },
    ],
    reviews: [
      {
        name: "Maria T.",
        location: "Pasadena, CA",
        body: "Called at 8am on a Saturday during a heat wave. Technician arrived by noon, diagnosed a bad capacitor, and had it fixed within the hour. Absolutely saved us.",
        rating: 5,
      },
      {
        name: "David K.",
        location: "Bungalow Heaven, Pasadena",
        body: "Replaced our 20-year-old unit in our 1920s Craftsman. They handled the permit, worked carefully around our original hardwood floors, and cleaned up perfectly. Great price too.",
        rating: 5,
      },
      {
        name: "Jennifer L.",
        location: "Pasadena, CA",
        body: "Very professional from start to finish. The technician explained everything clearly and didn't pressure me into an expensive replacement when a repair was the right call.",
        rating: 5,
      },
    ],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "CA",
    heroImage: {
      src: "/uploads/AC REPAIR SERVICE (8).jpeg",
      alt: "AC installation and repair in Los Angeles, CA",
      width: 900,
      height: 1200,
    },
    repairImage: {
      src: "/uploads/hvac repair service ac  (6).jpeg",
      alt: "HVAC repair service in Los Angeles, CA",
      width: 1200,
      height: 900,
    },
    installImage: {
      src: "/uploads/ac-unit-installation (9).jpeg",
      alt: "New AC system installation in Los Angeles, CA",
      width: 1200,
      height: 900,
    },
    metaTitle: "AC Repair & HVAC Service in Los Angeles, CA — Same-Day Available",
    metaDescription:
      "Professional AC repair, replacement & HVAC service in Los Angeles, CA. Same-day service. Free estimate. Licensed & insured. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Los Angeles, CA",
    heroSubheadline:
      "Fast AC repair, new system installation & emergency HVAC service across Los Angeles. Licensed technicians — real people answer your call.",
    climate:
      "Los Angeles experiences a Mediterranean climate with hot, dry summers — but inland neighborhoods like the Valley, Silver Lake, and East LA can see temperatures 10–20°F hotter than the coast. Santa Ana wind events push interior temperatures higher still, stressing older equipment and triggering breakdowns at the worst possible time.",
    commonProblems:
      "LA homes face frequent AC issues including refrigerant leaks in systems running on aging R-22 refrigerant (now phased out), dirty evaporator coils from the region's poor air quality, and failing capacitors and contactors in systems that run year-round. High-rise condos and older apartment buildings often have outdated packaged terminal units that need full replacement.",
    homeownerConcerns:
      "Los Angeles homeowners and renters are concerned about cost — both the price of repairs and the long-term cost of running an inefficient system. Many are also interested in going ductless to avoid major renovation work, and want assurance that their contractor is properly licensed and won't disappear after the job.",
    localContext:
      "We serve neighborhoods throughout the LA area including Silver Lake, Los Feliz, Echo Park, Highland Park, Eagle Rock, the Westside, and the San Fernando Valley. Our vans are dispatched from Orange County and can reach most LA neighborhoods within the hour.",
    repairBody:
      "A broken AC in Los Angeles can mean hours or days of sweltering indoor heat. Our repair technicians arrive with a stocked service van and diagnose problems fast. We handle refrigerant issues, electrical failures, thermostat replacements, drain line clogs, and fan motor repairs. Repairs are quoted in writing before work begins — no surprises.",
    installBody:
      "Los Angeles has one of the highest rates of ductless mini-split adoption in California — ideal for older homes without existing duct systems, room additions, and ADUs. We install single-zone and multi-zone ductless systems along with traditional central AC, all sized to meet ACCA Manual J standards for LA's specific climate zones.",
    emergencyBody:
      "When your AC fails in Los Angeles, you don't have time to wait. We offer same-day emergency appointments across the greater LA area. Our dispatch team prioritizes households with medical needs, young children, and elderly residents.",
    whyUsPoints: [
      {
        heading: "Serving All of LA",
        body: "From the Valley to the Westside, Silver Lake to Eagle Rock — we dispatch technicians across Los Angeles with same-day availability.",
      },
      {
        heading: "CSLB Licensed & Insured",
        body: "We're a fully licensed California contractor. Our technicians are background-checked, EPA-certified, and professionally trained.",
      },
      {
        heading: "Free Estimates on Replacements",
        body: "New system quotes are always free. We provide written estimates so you can compare with confidence — no pressure, no obligation.",
      },
      {
        heading: "Ductless Specialists",
        body: "We install and service ductless mini-splits from Mitsubishi, Daikin, Fujitsu, and LG — ideal for LA's older housing stock and ADU conversions.",
      },
    ],
    faqs: [
      {
        question: "Do you service both central AC and ductless mini-splits in Los Angeles?",
        answer:
          "Yes — we install, repair, and maintain both central air conditioning systems and ductless mini-split systems throughout the Los Angeles area. Ductless systems are especially popular in older LA homes without existing ductwork.",
      },
      {
        question: "My LA home uses R-22 refrigerant — what are my options?",
        answer:
          "R-22 (Freon) has been phased out and is no longer manufactured. Systems using R-22 can be repaired using reclaimed refrigerant, but replacement is typically more cost-effective long-term. We can assess your system and provide honest recommendations.",
      },
      {
        question: "How long does an AC installation take in Los Angeles?",
        answer:
          "Most residential central AC replacements take one full day. Ductless installations can be faster — a single-zone system typically takes 4–6 hours. We pull the required permits and schedule inspections with the City of Los Angeles.",
      },
      {
        question: "Can you help with an AC unit in a condo or apartment in LA?",
        answer:
          "Yes. We work with condo units, apartment buildings, and multi-family properties. We coordinate with building management as needed and are familiar with LA's permitting requirements for multi-unit buildings.",
      },
    ],
    reviews: [
      {
        name: "Carlos R.",
        location: "Silver Lake, Los Angeles",
        body: "Had my AC go out on a Friday afternoon in August. They sent someone Saturday morning, found a bad contactor, and had it running in 45 minutes. Highly recommend.",
        rating: 5,
      },
      {
        name: "Stephanie M.",
        location: "Eagle Rock, Los Angeles",
        body: "Installed a new Lennox system in our older home. They did a full duct inspection, sealed several leaks, and the house cools evenly for the first time in years.",
        rating: 5,
      },
      {
        name: "James W.",
        location: "Valley Village, Los Angeles",
        body: "Very honest technician. Told me my repair would hold another season rather than pushing for replacement. I'll definitely be calling them back when it's time.",
        rating: 5,
      },
    ],
  },
  {
    slug: "orange-county",
    name: "Orange County",
    state: "CA",
    heroImage: {
      src: "/uploads/ac-unit-installation (4).jpeg",
      alt: "AC installation in Orange County, CA",
      width: 1200,
      height: 1600,
    },
    repairImage: {
      src: "/uploads/hvac repair service ac  (5).jpeg",
      alt: "HVAC maintenance in Orange County, CA",
      width: 1200,
      height: 900,
    },
    installImage: {
      src: "/uploads/ac-unit-installation (1).jpeg",
      alt: "New AC unit installed in Orange County, CA",
      width: 900,
      height: 1200,
    },
    metaTitle: "AC Repair & HVAC Service in Orange County, CA — (714) 410-2784",
    metaDescription:
      "Your local Orange County HVAC contractor. Same-day AC repair, replacement & maintenance. Free estimates. Licensed & insured. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Orange County, CA",
    heroSubheadline:
      "Orange County's trusted HVAC team — same-day AC repair, system installation & free estimates. Based in Yorba Linda, serving all of OC.",
    climate:
      "Orange County's coastal communities enjoy mild summers, but inland cities — Yorba Linda, Anaheim Hills, Brea, Orange, and Tustin — can see sustained heat above 95°F for weeks at a time. The county's high concentration of tract homes built in the 1970s–1990s means much of the housing stock is running aging equipment that's approaching or past its 15–20 year lifespan.",
    commonProblems:
      "The most common HVAC calls across Orange County involve aging equipment that needs replacement, refrigerant leaks from older coils, and evaporator coil freezing caused by dirty filters or restricted airflow. Coastal communities near the ocean also deal with accelerated corrosion of outdoor condenser units from salt air — especially near Huntington Beach, Newport Beach, and Dana Point.",
    homeownerConcerns:
      "Orange County homeowners want fast response from a local company they can trust. Many have been burned by national chains with high markups and technicians who don't know the area. They want fair pricing, licensed professionals, and same-day service during summer heat events.",
    localContext:
      "We're based in Yorba Linda and serve every city in Orange County — Anaheim, Irvine, Santa Ana, Huntington Beach, Costa Mesa, Newport Beach, Fullerton, Orange, Brea, Placentia, Villa Park, Yorba Linda, and more. No long drive times, no out-of-area surcharges.",
    repairBody:
      "As an Orange County-based contractor, we're positioned to offer genuinely fast response times throughout the county. Our service vans are stocked for the most common repairs — capacitors, contactors, fan motors, refrigerant, and drain line clearing — and we complete most repairs in a single visit. We repair every major brand and offer a parts warranty on all work performed.",
    installBody:
      "Orange County homeowners replacing an aging system can take advantage of current utility rebates from SCE and SoCalGas, which can offset thousands of dollars on high-efficiency equipment. We are familiar with the rebate process and can help you qualify. We install Lennox, Trane, Goodman, and Carrier systems with full manufacturer warranties.",
    emergencyBody:
      "Being locally based means we can genuinely respond faster than out-of-area competitors. When temperatures spike inland, we prioritize emergency calls from elderly residents, families with infants, and households with medical equipment that requires a cooled environment.",
    whyUsPoints: [
      {
        heading: "Based in Orange County",
        body: "Our shop is in Yorba Linda. We're not a national chain with a local phone number — we're your neighbors, and we'll be here tomorrow.",
      },
      {
        heading: "SCE & SoCalGas Rebate Help",
        body: "We'll walk you through available utility rebates on qualifying new systems — often $500–$2,000 back in your pocket.",
      },
      {
        heading: "No Trip Fees in OC",
        body: "No travel surcharges across Orange County. Our diagnostic fee is waived with completed repair.",
      },
      {
        heading: "5-Star Google Rated",
        body: "Our reputation is built on honest work. We don't upsell unnecessary repairs and we back every job with a satisfaction guarantee.",
      },
    ],
    faqs: [
      {
        question: "Which cities in Orange County do you serve?",
        answer:
          "We serve all of Orange County including Anaheim, Irvine, Santa Ana, Huntington Beach, Costa Mesa, Newport Beach, Fullerton, Orange, Brea, Placentia, Yorba Linda, Villa Park, La Habra, Buena Park, Garden Grove, Westminster, Fountain Valley, Tustin, Mission Viejo, Lake Forest, Aliso Viejo, Laguna Hills, Laguna Niguel, Dana Point, San Clemente, and surrounding communities.",
      },
      {
        question: "Are you eligible for SCE utility rebates on new systems?",
        answer:
          "Yes. We install qualifying equipment eligible for Southern California Edison and SoCalGas rebates. Rebate amounts vary by equipment efficiency rating and type. We'll include eligible rebate information in your estimate.",
      },
      {
        question: "How often should I service my AC in Orange County?",
        answer:
          "Annual maintenance is recommended — ideally in spring before cooling season begins. Given Orange County's long cooling season, some homeowners opt for a fall tune-up as well to catch any issues caused by summer operation.",
      },
      {
        question: "What brands do you install in Orange County homes?",
        answer:
          "We install Lennox, Trane, Carrier, and Goodman systems, along with ductless equipment from Mitsubishi, Daikin, and Fujitsu. We'll recommend the best fit for your home's needs and budget.",
      },
    ],
    reviews: [
      {
        name: "Lisa H.",
        location: "Yorba Linda, OC",
        body: "Honest, fast, and fairly priced. Diagnosed a refrigerant leak in our 12-year-old Lennox unit, gave us options for repair vs. replace, and let us decide without any pressure. Will use again.",
        rating: 5,
      },
      {
        name: "Robert N.",
        location: "Anaheim Hills, OC",
        body: "Replaced our 2002 Carrier system with a new Trane. They handled the SCE rebate paperwork, pulled the permit, and were done in one day. House cools perfectly now.",
        rating: 5,
      },
      {
        name: "Angela S.",
        location: "Newport Beach, OC",
        body: "Salt air had corroded our condenser coils beyond repair. They replaced the outdoor unit and also installed a corrosion protection coating on the new one. Great pro-active thinking.",
        rating: 5,
      },
    ],
  },
  {
    slug: "malibu",
    name: "Malibu",
    state: "CA",
    heroImage: {
      src: "/uploads/hvac repair service ac  (2).jpeg",
      alt: "HVAC service in Malibu, CA",
      width: 1200,
      height: 900,
    },
    repairImage: {
      src: "/uploads/ac repair service in California  (3).jpeg",
      alt: "AC repair technician in Malibu, CA",
      width: 900,
      height: 1200,
    },
    installImage: {
      src: "/uploads/ac-unit-installation (10).jpeg",
      alt: "New HVAC system installed in Malibu, CA",
      width: 900,
      height: 1200,
    },
    metaTitle: "AC Repair & HVAC Service in Malibu, CA — Same-Day Technicians",
    metaDescription:
      "Expert HVAC service & AC repair in Malibu, CA. We handle coastal corrosion, heat pump systems & emergency service. Free estimate. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Malibu, CA",
    heroSubheadline:
      "Premium HVAC service for Malibu homes — coastal corrosion specialists, heat pump systems & same-day emergency response.",
    climate:
      "Malibu's ocean-facing location creates a unique HVAC environment. While summer temperatures are mild by inland standards, the combination of marine moisture, salt air, and Santa Ana wind events creates a challenging environment for HVAC equipment. Oceanfront and bluff properties face accelerated corrosion of condenser coils and electrical components — often cutting equipment lifespan in half compared to inland installations.",
    commonProblems:
      "Malibu HVAC calls frequently involve corroded condenser coils and electrical components from salt air exposure, heat pump issues in homes that rely on them as the primary heating source, and post-fire air quality concerns that require enhanced filtration. Canyon properties also face wildfire smoke intrusion and the associated demand for high-MERV filtration or air purification systems.",
    homeownerConcerns:
      "Malibu homeowners are concerned about protecting their investment — both the home and the HVAC equipment inside it. Many want marine-grade protection coatings for condenser units, the best available filtration, and a contractor who can handle premium equipment and respond quickly to remote property locations.",
    localContext:
      "We serve the full Malibu coastline from Las Virgenes to Point Mugu — including Pacific Coast Highway corridor homes, Malibu Canyon properties, and hillside estates. We're experienced working at remote and gated properties and can coordinate with property managers.",
    repairBody:
      "Repairing HVAC in Malibu requires understanding the marine environment. We use marine-grade components where applicable, apply corrosion protection coatings, and always test system performance under real-load conditions before leaving the job. We carry stocked vans for same-day repairs and can reach most Malibu locations within 90 minutes.",
    installBody:
      "New HVAC installations in Malibu require careful equipment selection. We recommend systems with marine-grade coil coatings for ocean-proximate properties, properly sized heat pumps for year-round efficiency, and whole-home filtration to address wildfire smoke and canyon dust. We handle all LA County permitting and final inspections.",
    emergencyBody:
      "Remote location is no barrier to emergency service. We dispatch to all Malibu areas — including Canyon properties, PCH coastal homes, and gated estates. When Santa Ana winds bring extreme inland heat to Malibu, we prioritize emergency calls to ensure every household has a functioning cooling system.",
    whyUsPoints: [
      {
        heading: "Coastal HVAC Specialists",
        body: "We understand the salt-air corrosion challenge unique to Malibu. We apply corrosion inhibitor coatings and use marine-grade components on oceanfront installs.",
      },
      {
        heading: "Heat Pump Expertise",
        body: "Heat pumps are ideal for Malibu's mild climate. We install, service, and optimize heat pump systems for year-round efficiency in coastal conditions.",
      },
      {
        heading: "Wildfire Air Quality Solutions",
        body: "We install high-MERV filtration and air purification systems to protect Malibu homes from wildfire smoke and canyon particulates.",
      },
      {
        heading: "Remote Property Service",
        body: "We service gated estates, canyon properties, and oceanfront homes. We coordinate with property managers and work around access requirements.",
      },
    ],
    faqs: [
      {
        question: "How does salt air affect my HVAC system in Malibu?",
        answer:
          "Salt air accelerates corrosion of condenser coil fins, copper lines, and electrical components — sometimes halving the expected equipment lifespan. We recommend marine-grade corrosion coatings applied at installation, annual inspections, and prompt repair of any fin damage to protect your investment.",
      },
      {
        question: "Is a heat pump a good choice for a Malibu home?",
        answer:
          "Yes — Malibu's mild climate is ideal for heat pumps. They provide both heating and cooling efficiently, and the moderate coastal temperatures fall well within the optimal operating range for modern heat pump systems. We install and service all major heat pump brands.",
      },
      {
        question: "Can you help with air quality after a wildfire in Malibu?",
        answer:
          "Absolutely. We install and service high-MERV filtration systems, whole-home air purifiers, and UV treatment systems that can dramatically reduce smoke particulate and ash in your indoor air. We can assess your current system's filtration and recommend upgrades.",
      },
      {
        question: "Do you service gated or remote properties in Malibu?",
        answer:
          "Yes. We regularly service gated estates and canyon properties throughout Malibu. Please provide gate codes or contact information for property managers when scheduling and we'll coordinate accordingly.",
      },
    ],
    reviews: [
      {
        name: "Thomas B.",
        location: "Malibu, CA",
        body: "Our condenser was completely corroded after five years on the bluff. They replaced it with a marine-coated unit and applied corrosion protection — very knowledgeable about coastal conditions.",
        rating: 5,
      },
      {
        name: "Sandra G.",
        location: "Malibu Canyon, CA",
        body: "Installed a new heat pump system at our canyon property. The technician had to navigate a steep driveway and worked efficiently despite the access challenges. Top quality work.",
        rating: 5,
      },
      {
        name: "Michael P.",
        location: "Pacific Coast Highway, Malibu",
        body: "Added a whole-home air purifier after the last fire season. Air quality inside has improved dramatically. Quick installation, clean work, professional crew.",
        rating: 5,
      },
    ],
  },
  {
    slug: "santa-clarita",
    name: "Santa Clarita",
    state: "CA",
    heroImage: {
      src: "/uploads/ac-repair (1).jpeg",
      alt: "HVAC repair service in Santa Clarita, CA",
      width: 900,
      height: 1200,
    },
    repairImage: {
      src: "/uploads/hvac repair service ac  (7).jpeg",
      alt: "AC repair technician in Santa Clarita, CA",
      width: 1200,
      height: 900,
    },
    installImage: {
      src: "/uploads/AC REPAIR SERVICE (1).jpeg",
      alt: "New AC unit installed in Santa Clarita, CA",
      width: 900,
      height: 1200,
    },
    metaTitle: "AC Repair & HVAC Service in Santa Clarita, CA — Same-Day Service",
    metaDescription:
      "Fast AC repair & HVAC service in Santa Clarita, CA. Same-day availability during heat waves. Free estimates. Licensed & insured. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Santa Clarita, CA",
    heroSubheadline:
      "Same-day AC repair & HVAC service for Santa Clarita homes — because summer in the SCV is no time to wait.",
    climate:
      "Santa Clarita Valley is one of the hottest residential markets in the greater LA area. The SCV sits in a geographic bowl that traps heat — summer temperatures routinely reach 105–110°F, and inland heat waves can last for weeks. With homes often over 2,000 square feet and multiple stories, undersized or failing AC systems simply cannot keep up, making prompt service critical.",
    commonProblems:
      "Santa Clarita's extreme heat accelerates wear on capacitors, contactors, and refrigerant systems, which fail more frequently than in milder climates. Large multi-story homes commonly have zoning issues with upper floors remaining hot. Newer tract developments built during the 2000s housing boom are reaching end-of-life on their original HVAC equipment simultaneously, creating high demand for replacement.",
    homeownerConcerns:
      "SCV homeowners worry about system failure during peak summer heat when every HVAC company in the valley is swamped. They want assurance of fast response, fair pricing, and a contractor who can handle larger homes with complex zoning requirements.",
    localContext:
      "We serve all of Santa Clarita Valley — Valencia, Saugus, Newhall, Canyon Country, Stevenson Ranch, and the newer communities of Castaic and Bouquet Canyon. Our technicians are familiar with the tract home layouts common throughout the SCV and stock the parts most commonly needed in these homes.",
    repairBody:
      "In Santa Clarita's extreme summer heat, a broken AC is an emergency — not an inconvenience. Our repair team carries a comprehensive parts inventory that covers the brands most commonly installed in SCV tract homes (Carrier, Lennox, Goodman, Rheem). We diagnose fast, quote before we start, and repair the same day in most cases.",
    installBody:
      "Replacing a system in Santa Clarita means choosing equipment rated for sustained extreme heat. We install only systems with high SEER2 ratings that perform reliably in 105°F+ ambient conditions. For larger two-story homes, we evaluate zoning options to solve the chronic upper-floor heat problem — often achievable with a smart thermostat and damper system rather than a full dual-zone installation.",
    emergencyBody:
      "Santa Clarita heat waves can push indoor temperatures to 90°F within hours of a system failure. We treat every summer AC outage in the SCV as an emergency. We answer calls 7 days a week and dispatch technicians on Saturdays and Sundays for urgent situations.",
    whyUsPoints: [
      {
        heading: "Rated for Extreme Heat",
        body: "We install and service systems that perform reliably in Santa Clarita's 105°F+ summer temperatures — not just mild coastal climates.",
      },
      {
        heading: "Large Home Specialists",
        body: "We understand the zoning and airflow challenges in the SCV's large two-story tract homes and can solve hot-room problems efficiently.",
      },
      {
        heading: "Weekend Emergency Service",
        body: "Heat doesn't take weekends off. We dispatch technicians Saturday and Sunday for emergency AC outages throughout Santa Clarita Valley.",
      },
      {
        heading: "Fast Parts Turnaround",
        body: "Our vans are stocked with the most common parts for Carrier, Lennox, Goodman, and Rheem — the brands installed in most SCV homes. Fewer return trips, faster repairs.",
      },
    ],
    faqs: [
      {
        question: "My Santa Clarita home gets to 95°F upstairs even when AC is running — what's wrong?",
        answer:
          "Upper-floor heat in Santa Clarita homes is typically caused by undersized supply registers, duct leaks in the attic, poor attic insulation, or an incorrectly balanced system. We can perform a full system evaluation including duct testing to identify the root cause and recommend a cost-effective fix — which is often not a full system replacement.",
      },
      {
        question: "How fast can you respond to an emergency in Santa Clarita?",
        answer:
          "We prioritize emergency calls in Santa Clarita given the extreme summer heat risk. During business hours, we typically arrive same day. Saturday and Sunday emergency service is available. Call us — a real person answers.",
      },
      {
        question: "What HVAC brands are best for Santa Clarita's extreme heat?",
        answer:
          "For SCV's extreme temperatures, we recommend high-efficiency systems from Lennox, Trane, or Carrier rated for high-ambient conditions. Standard equipment is rated to 115°F ambient — which is sufficient for most SCV days, but we'll specify the right equipment for your home.",
      },
      {
        question: "How long do AC systems typically last in Santa Clarita?",
        answer:
          "In Santa Clarita's extreme summer climate, systems typically last 12–16 years with annual maintenance — shorter than the 15–20 year average in milder climates. Heavy seasonal use and sustained high temperatures accelerate wear on compressors and electrical components.",
      },
    ],
    reviews: [
      {
        name: "Kevin M.",
        location: "Valencia, Santa Clarita",
        body: "108 degrees outside and our AC died on a Sunday. Called at 7am, tech arrived by 11am, replaced a capacitor and a contactor, and had us cooling by noon. Absolute lifesavers.",
        rating: 5,
      },
      {
        name: "Patricia J.",
        location: "Saugus, Santa Clarita",
        body: "Replaced our 16-year-old Carrier system. They identified that our upstairs zone had severely undersized ducts and fixed them during the installation. No more hot bedrooms.",
        rating: 5,
      },
      {
        name: "Brian T.",
        location: "Canyon Country, Santa Clarita",
        body: "Honest diagnosis — told me my compressor was still good and that a capacitor and refrigerant recharge would solve the problem for another few seasons. Saved me thousands.",
        rating: 5,
      },
    ],
  },
  {
    slug: "laguna-niguel",
    name: "Laguna Niguel",
    state: "CA",
    heroImage: {
      src: "/uploads/ac-unit-installation (6).jpeg",
      alt: "AC installation in Laguna Niguel, CA",
      width: 1152,
      height: 1536,
    },
    repairImage: {
      src: "/uploads/ac repair service in California  (16).jpeg",
      alt: "AC repair technician in Laguna Niguel, CA",
      width: 900,
      height: 1200,
    },
    installImage: {
      src: "/uploads/hvac repair service ac  (2).jpeg",
      alt: "New HVAC system installed in Laguna Niguel, CA",
      width: 1200,
      height: 900,
    },
    metaTitle: "AC Repair & HVAC Service in Laguna Niguel, CA — Free Estimates",
    metaDescription:
      "Expert AC repair, installation & HVAC service in Laguna Niguel, CA. Same-day service available. Licensed & insured. Free estimate. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Laguna Niguel, CA",
    heroSubheadline:
      "Same-day AC repair, premium system installation & free estimates for Laguna Niguel homeowners. Licensed. Local. Trusted.",
    climate:
      "Laguna Niguel enjoys a pleasant coastal-adjacent climate, but warm summers and occasional inland heat events mean air conditioning is essential — not optional. The city's mix of newer master-planned communities and older hillside homes creates a range of HVAC needs, from routine maintenance on aging systems to full replacements and ductless installations in homes with complex layouts.",
    commonProblems:
      "In Laguna Niguel, common HVAC issues include aging systems in homes built in the 1980s–1990s that are reaching end of life, refrigerant leaks in systems running R-22 refrigerant (no longer manufactured), and drainage issues from condensate lines that clog in humid coastal air. Homes in higher-elevation communities also face occasional heating demand that stretches multi-use systems.",
    homeownerConcerns:
      "Laguna Niguel homeowners expect premium service and value transparency. Many have had negative experiences with large HVAC chains and want a contractor who explains the work, provides written quotes, and stands behind the quality of the installation.",
    localContext:
      "We serve all of Laguna Niguel including Bear Brand Ranch, Monarch Beach, Marina Hills, and surrounding communities. Our South OC service area includes neighboring Aliso Viejo, Laguna Hills, Dana Point, and San Clemente — no travel surcharges.",
    repairBody:
      "We provide prompt, professional AC repair throughout Laguna Niguel. Our technicians arrive in stocked service vans, diagnose the problem accurately on the first visit, and complete most repairs the same day. We quote in writing before any work starts and back repairs with a parts warranty. We service all major brands including Carrier, Lennox, Trane, and Goodman.",
    installBody:
      "Laguna Niguel homeowners upgrading their systems can choose from a range of high-efficiency options. We install central air conditioning, heat pump systems for year-round efficiency, and ductless mini-splits ideal for additions, casitas, and homes with limited duct access. All installations include a Manual J load calculation and full system commissioning.",
    emergencyBody:
      "When your AC fails unexpectedly, we offer same-day response across Laguna Niguel. We answer calls 7 days a week during service hours and offer weekend availability for urgent situations. Our goal is to restore your comfort the same day you call — not schedule you for next week.",
    whyUsPoints: [
      {
        heading: "South OC Specialists",
        body: "We're familiar with Laguna Niguel's housing stock, HOA requirements, and local permit processes. No learning curve — we get to work.",
      },
      {
        heading: "Written Quotes Before Work Starts",
        body: "No surprises on your invoice. You approve a written estimate before any work begins. Our diagnostic fee is credited toward the repair.",
      },
      {
        heading: "High-Efficiency System Experts",
        body: "We install top-rated Lennox, Trane, and Carrier systems with SEER2 ratings that qualify for rebates and deliver long-term energy savings.",
      },
      {
        heading: "HOA-Friendly Installations",
        body: "We understand HOA rules around equipment placement and aesthetics in Laguna Niguel's master-planned communities and work within those requirements.",
      },
    ],
    faqs: [
      {
        question: "Do you service homes in Bear Brand Ranch and Monarch Beach in Laguna Niguel?",
        answer:
          "Yes — we service all neighborhoods in Laguna Niguel including Bear Brand Ranch, Monarch Beach, Marina Hills, Crown Valley, and surrounding areas. No travel fees within South Orange County.",
      },
      {
        question: "My Laguna Niguel home has a 1990s system — repair or replace?",
        answer:
          "Systems from the 1990s are typically 25–30+ years old and are well past their expected service life. If you're facing a major repair (compressor, coil), replacement is almost always more cost-effective given the age. We'll give you an honest assessment of both options.",
      },
      {
        question: "Can you install AC in a room addition or casita in Laguna Niguel?",
        answer:
          "Yes. Ductless mini-split systems are ideal for room additions, casitas, and spaces that can't easily connect to existing ductwork. We install single-zone and multi-zone ductless systems and handle all permits.",
      },
      {
        question: "How do I know if my AC system qualifies for a rebate in Laguna Niguel?",
        answer:
          "Most high-efficiency systems we install qualify for SCE (Southern California Edison) rebates. Rebate eligibility depends on SEER2 rating, system type, and current program availability. We'll include applicable rebate information in your installation estimate.",
      },
    ],
    reviews: [
      {
        name: "Michelle D.",
        location: "Laguna Niguel, CA",
        body: "Very impressed. Gave me a written quote, explained my options clearly, and didn't push me toward the most expensive solution. The installation was clean and done in one day.",
        rating: 5,
      },
      {
        name: "Richard F.",
        location: "Bear Brand Ranch, Laguna Niguel",
        body: "Replaced our 28-year-old Carrier system. They navigated our HOA requirements without any issues and the new Lennox unit is whisper quiet compared to the old one.",
        rating: 5,
      },
      {
        name: "Laura K.",
        location: "Marina Hills, Laguna Niguel",
        body: "Quick response on a same-day repair call. Refrigerant leak fixed, system recharged, and running perfectly. Very professional technician who explained everything.",
        rating: 5,
      },
    ],
  },
];
