import type { SiteImage } from "@/lib/config/images";
import { generatePPCCities } from "@/lib/config/ppc-city-generator";
import { licenseOrHoursPoint } from "@/lib/config/credentials";

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
    metaTitle: "AC Repair & HVAC Service in Pasadena, CA | Open 24/7",
    metaDescription:
      "Expert AC repair, installation & HVAC service in Pasadena, CA. Open 24/7. Free estimates. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Pasadena, CA",
    heroSubheadline:
      "AC repair, system replacement & HVAC maintenance for Pasadena homes. We answer calls 24 hours a day, 7 days a week.",
    climate:
      "Pasadena's inland location in the San Gabriel Valley means intense summer heat — temperatures regularly exceed 100°F and heat waves can push indoor temperatures to dangerous levels within hours of an AC breakdown. The dry, dusty air also accelerates filter clogging and coil fouling, which shortens equipment life and spikes energy bills.",
    commonProblems:
      "In Pasadena, the most frequent HVAC calls involve refrigerant leaks from aging coils stressed by extreme summer heat, capacitor failures on units that run nearly non-stop from May through October, and blower motor issues caused by dust accumulation from the nearby foothills. Older Craftsman and bungalow homes with original ductwork also suffer from poor airflow and hot spots.",
    homeownerConcerns:
      "Pasadena homeowners worry most about system failures during triple-digit heat waves, the high cost of full replacements, and whether their older home can support modern equipment. Many also ask about ductless mini-splits for additions and ADUs that lack existing ductwork.",
    localContext:
      "We serve all of Pasadena — from Bungalow Heaven and the historic districts near Old Town, to newer neighborhoods along the 210 corridor. Our technicians are familiar with the area.",
    repairBody:
      "When your AC stops cooling in Pasadena summer heat, every minute counts. Our technicians diagnose the problem and give you a written quote before any work. Common repairs include capacitor replacement, refrigerant recharge, contactor and relay fixes, and evaporator coil cleaning. We repair all major brands: Lennox, Carrier, Trane, Goodman, Rheem, and more.",
    installBody:
      "Replacing an aging system in Pasadena is an investment that pays off quickly given the region's long cooling season. We install high-efficiency systems sized precisely to your home — avoiding the oversized units that short-cycle and spike humidity. We offer Lennox, Trane, and Goodman equipment with manufacturer warranties, and we handle all permits and inspections.",
    emergencyBody:
      "AC emergencies in Pasadena can become health emergencies fast — especially for children, elderly residents, and pets. We take emergency calls 24 hours a day, 7 days a week. When you call, a real person answers — not a voicemail.",
    whyUsPoints: [
      {
        heading: "Pasadena Locals Know Us",
        body: "We've served homes throughout the San Gabriel Valley for years. Our technicians know local building styles, permit requirements, and common equipment brands used in the area.",
      },
      {
        heading: "Flexible Scheduling",
        body: "We keep our schedule flexible to accommodate emergency calls across Pasadena.",
      },
      {
        heading: "Transparent, Flat-Rate Pricing",
        body: "You get a written quote before any work begins. No surprise charges, no upselling. Free diagnostic — no charge to identify the problem.",
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
          "We're open 24 hours a day, 7 days a week, including emergency service. Call us and we'll give you the earliest available arrival window.",
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
    metaTitle: "AC Repair & HVAC Service in Los Angeles, CA | Open 24/7",
    metaDescription:
      "Professional AC repair, replacement & HVAC service in Los Angeles, CA. Open 24/7. Free estimate. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Los Angeles, CA",
    heroSubheadline:
      "Fast AC repair, new system installation & emergency HVAC service across Los Angeles. Real people answer your call.",
    climate:
      "Los Angeles experiences a Mediterranean climate with hot, dry summers — but inland neighborhoods like the Valley, Silver Lake, and East LA can see temperatures 10–20°F hotter than the coast. Santa Ana wind events push interior temperatures higher still, stressing older equipment and triggering breakdowns at the worst possible time.",
    commonProblems:
      "LA homes face frequent AC issues including refrigerant leaks in systems running on aging R-22 refrigerant (now phased out), dirty evaporator coils from the region's poor air quality, and failing capacitors and contactors in systems that run year-round. High-rise condos and older apartment buildings often have outdated packaged terminal units that need full replacement.",
    homeownerConcerns:
      "Los Angeles homeowners and renters are concerned about cost — both the price of repairs and the long-term cost of running an inefficient system. Many are also interested in going ductless to avoid major renovation work, and want assurance that their contractor is properly licensed and won't disappear after the job.",
    localContext:
      "We serve neighborhoods throughout the LA area including Silver Lake, Los Feliz, Echo Park, Highland Park, Eagle Rock, the Westside, and the San Fernando Valley. Our technicians are dispatched from our Orange County shop.",
    repairBody:
      "A broken AC in Los Angeles can mean hours or days of sweltering indoor heat. We handle refrigerant issues, electrical failures, thermostat replacements, drain line clogs, and fan motor repairs. Repairs are quoted in writing before work begins — no surprises.",
    installBody:
      "Los Angeles has one of the highest rates of ductless mini-split adoption in California — ideal for older homes without existing duct systems, room additions, and ADUs. We install single-zone and multi-zone ductless systems along with traditional central AC, all sized to meet ACCA Manual J standards for LA's specific climate zones.",
    emergencyBody:
      "When your AC fails in Los Angeles, you don't have time to wait. We take emergency calls 24/7 across the greater LA area. Our dispatch team prioritizes households with medical needs, young children, and elderly residents.",
    whyUsPoints: [
      {
        heading: "Serving All of LA",
        body: "From the Valley to the Westside, Silver Lake to Eagle Rock — we dispatch technicians across Los Angeles, 24/7.",
      },
      licenseOrHoursPoint(),
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
      "Your local Orange County HVAC contractor, open 24/7. AC repair, replacement & maintenance. Free estimates. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Orange County, CA",
    heroSubheadline:
      "Orange County's local HVAC team: AC repair 24/7, system installation & free estimates. Based in Yorba Linda, serving all of OC.",
    climate:
      "Orange County's coastal communities enjoy mild summers, but inland cities — Yorba Linda, Anaheim Hills, Brea, Orange, and Tustin — can see sustained heat above 95°F for weeks at a time. The county's high concentration of tract homes built in the 1970s–1990s means much of the housing stock is running aging equipment that's approaching or past its 15–20 year lifespan.",
    commonProblems:
      "The most common HVAC calls across Orange County involve aging equipment that needs replacement, refrigerant leaks from older coils, and evaporator coil freezing caused by dirty filters or restricted airflow. Coastal communities near the ocean also deal with accelerated corrosion of outdoor condenser units from salt air — especially near Huntington Beach, Newport Beach, and Dana Point.",
    homeownerConcerns:
      "Orange County homeowners want fast response from a local company they can trust. Many have been burned by national chains with high markups and technicians who don't know the area. They want fair pricing, licensed professionals, and same-day service during summer heat events.",
    localContext:
      "We're based in Yorba Linda and serve every city in Orange County — Anaheim, Irvine, Santa Ana, Huntington Beach, Costa Mesa, Newport Beach, Fullerton, Orange, Brea, Placentia, Villa Park, Yorba Linda, and more. No long drive times, no out-of-area surcharges.",
    repairBody:
      "As an Orange County-based contractor, our shop in Yorba Linda is central to the county. Common repairs include capacitors, contactors, fan motors, refrigerant, and drain line clearing. We repair every major brand and offer a parts warranty on all work performed.",
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
        body: "No travel surcharges across Orange County. Free diagnostic — no charge to identify the problem.",
      },
      {
        heading: "No Unnecessary Upsells",
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
    metaTitle: "AC Repair & HVAC Service in Malibu, CA | Open 24/7",
    metaDescription:
      "Expert HVAC service & AC repair in Malibu, CA. We handle coastal corrosion, heat pump systems & emergency service. Free estimate. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Malibu, CA",
    heroSubheadline:
      "Premium HVAC service for Malibu homes — coastal corrosion specialists, heat pump systems & 24/7 emergency service.",
    climate:
      "Malibu's ocean-facing location creates a unique HVAC environment. While summer temperatures are mild by inland standards, the combination of marine moisture, salt air, and Santa Ana wind events creates a challenging environment for HVAC equipment. Oceanfront and bluff properties face accelerated corrosion of condenser coils and electrical components — often cutting equipment lifespan in half compared to inland installations.",
    commonProblems:
      "Malibu HVAC calls frequently involve corroded condenser coils and electrical components from salt air exposure, heat pump issues in homes that rely on them as the primary heating source, and post-fire air quality concerns that require enhanced filtration. Canyon properties also face wildfire smoke intrusion and the associated demand for high-MERV filtration or air purification systems.",
    homeownerConcerns:
      "Malibu homeowners are concerned about protecting their investment — both the home and the HVAC equipment inside it. Many want marine-grade protection coatings for condenser units, the best available filtration, and a contractor who can handle premium equipment and respond quickly to remote property locations.",
    localContext:
      "We serve the full Malibu coastline from Las Virgenes to Point Mugu — including Pacific Coast Highway corridor homes, Malibu Canyon properties, and hillside estates. We're experienced working at remote and gated properties and can coordinate with property managers.",
    repairBody:
      "Repairing HVAC in Malibu requires understanding the marine environment. We use marine-grade components where applicable, apply corrosion protection coatings, and always test system performance under real-load conditions before leaving the job.",
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
    metaTitle: "AC Repair & HVAC Service in Santa Clarita, CA | Open 24/7",
    metaDescription:
      "AC repair & HVAC service in Santa Clarita, CA, open 24/7. Free estimates. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Santa Clarita, CA",
    heroSubheadline:
      "24/7 AC repair & HVAC service for Santa Clarita homes, because summer in the SCV is no time to wait.",
    climate:
      "Santa Clarita Valley is one of the hottest residential markets in the greater LA area. The SCV sits in a geographic bowl that traps heat — summer temperatures routinely reach 105–110°F, and inland heat waves can last for weeks. With homes often over 2,000 square feet and multiple stories, undersized or failing AC systems simply cannot keep up, making prompt service critical.",
    commonProblems:
      "Santa Clarita's extreme heat accelerates wear on capacitors, contactors, and refrigerant systems, which fail more frequently than in milder climates. Large multi-story homes commonly have zoning issues with upper floors remaining hot. Newer tract developments built during the 2000s housing boom are reaching end-of-life on their original HVAC equipment simultaneously, creating high demand for replacement.",
    homeownerConcerns:
      "SCV homeowners worry about system failure during peak summer heat when every HVAC company in the valley is swamped. They want assurance of fast response, fair pricing, and a contractor who can handle larger homes with complex zoning requirements.",
    localContext:
      "We serve all of Santa Clarita Valley — Valencia, Saugus, Newhall, Canyon Country, Stevenson Ranch, and the newer communities of Castaic and Bouquet Canyon. Our technicians are familiar with the tract home layouts common throughout the SCV and stock the parts most commonly needed in these homes.",
    repairBody:
      "In Santa Clarita's extreme summer heat, a broken AC is an emergency — not an inconvenience. We repair Carrier, Lennox, Goodman, Rheem and other common brands, and we quote in writing before we start.",
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
        heading: "Common Brands Serviced",
        body: "We repair Carrier, Lennox, Goodman, Rheem, and other common brands.",
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
          "We prioritize emergency calls in Santa Clarita given the extreme summer heat risk. We're open 24 hours a day, 7 days a week, including emergency service. Call us — a real person answers.",
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
      "Expert AC repair, installation & HVAC service in Laguna Niguel, CA. Open 24/7. Free estimate. Call (714) 410-2784.",
    h1: "AC Repair & HVAC Service in Laguna Niguel, CA",
    heroSubheadline:
      "AC repair 24/7, premium system installation & free estimates for Laguna Niguel homeowners. Local and trusted.",
    climate:
      "Laguna Niguel enjoys a pleasant coastal-adjacent climate, but warm summers and occasional inland heat events mean air conditioning is essential — not optional. The city's mix of newer master-planned communities and older hillside homes creates a range of HVAC needs, from routine maintenance on aging systems to full replacements and ductless installations in homes with complex layouts.",
    commonProblems:
      "In Laguna Niguel, common HVAC issues include aging systems in homes built in the 1980s–1990s that are reaching end of life, refrigerant leaks in systems running R-22 refrigerant (no longer manufactured), and drainage issues from condensate lines that clog in humid coastal air. Homes in higher-elevation communities also face occasional heating demand that stretches multi-use systems.",
    homeownerConcerns:
      "Laguna Niguel homeowners expect premium service and value transparency. Many have had negative experiences with large HVAC chains and want a contractor who explains the work, provides written quotes, and stands behind the quality of the installation.",
    localContext:
      "We serve all of Laguna Niguel including Bear Brand Ranch, Monarch Beach, Marina Hills, and surrounding communities. Our South OC service area includes neighboring Aliso Viejo, Laguna Hills, Dana Point, and San Clemente — no travel surcharges.",
    repairBody:
      "We provide professional AC repair throughout Laguna Niguel. Our technicians diagnose the problem and quote in writing before any work starts, and we back repairs with a parts warranty. We service all major brands including Carrier, Lennox, Trane, and Goodman.",
    installBody:
      "Laguna Niguel homeowners upgrading their systems can choose from a range of high-efficiency options. We install central air conditioning, heat pump systems for year-round efficiency, and ductless mini-splits ideal for additions, casitas, and homes with limited duct access. All installations include a Manual J load calculation and full system commissioning.",
    emergencyBody:
      "When your AC fails unexpectedly, call us any time. We're open 24 hours a day, 7 days a week across Laguna Niguel, including emergency service.",
    whyUsPoints: [
      {
        heading: "South OC Specialists",
        body: "We're familiar with Laguna Niguel's housing stock, HOA requirements, and local permit processes. No learning curve — we get to work.",
      },
      {
        heading: "Written Quotes Before Work Starts",
        body: "No surprises on your invoice. You approve a written estimate before any work begins. Free diagnostic — no charge to identify the problem.",
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
  },
];

const HANDWRITTEN_SLUGS = new Set(PPC_CITIES.map((c) => c.slug));

/** All PPC cities: hand-written entries + programmatically generated entries for all new cities. */
export const ALL_PPC_CITIES: PPCCity[] = [
  ...PPC_CITIES,
  ...generatePPCCities(HANDWRITTEN_SLUGS),
];
