export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ServiceContent = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroHeadline: string;
  heroSubtext: string;
  whatItIncludes: string[];
  signsYouNeedThis: string[];
  processSteps: ProcessStep[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  ctaHeadline: string;
  ctaSubtext: string;
  category: "cooling" | "heating" | "ductwork" | "commercial" | "maintenance";
};

export const SERVICE_CONTENT: ServiceContent[] = [
  // ─── AIR CONDITIONING (category page) ─────────────────────────────────────
  {
    slug: "air-conditioning",
    seoTitle: "Air Conditioning Services in Orange County, CA",
    metaDescription:
      "Complete air conditioning services in Orange County — repair, installation, maintenance, and ductless systems. Based in Yorba Linda. Call (714) 410-2784 for same-day service.",
    h1: "Air Conditioning Services in Orange County, CA",
    primaryKeyword: "air conditioning services Orange County",
    secondaryKeywords: [
      "AC services Orange County",
      "air conditioner repair Orange County",
      "AC installation Orange County",
    ],
    heroHeadline: "Every AC Service Orange County Homeowners Need",
    heroSubtext:
      "From same-day repairs to full system replacements, ductless mini-splits, and commercial cooling — our Yorba Linda team handles all of it across Orange County.",
    whatItIncludes: [
      "Emergency and same-day AC repair",
      "New air conditioner installation and system replacements",
      "Seasonal AC maintenance and tune-ups",
      "Ductless mini-split installation and repair",
      "Refrigerant recharge and leak repair",
      "Thermostat and controls service",
      "Coil cleaning and airflow diagnostics",
      "Commercial air conditioning service",
    ],
    signsYouNeedThis: [
      "Your home isn't reaching the temperature on the thermostat",
      "Your energy bills are higher than they were last summer",
      "The system hasn't been serviced in more than a year",
      "You hear unusual sounds when the AC runs",
      "Some rooms cool fine but others stay warm",
      "The system is more than 12 years old",
    ],
    processSteps: [
      {
        title: "Call or Request Online",
        description:
          "Reach us by phone or submit a contact form. We'll ask a few questions about your system and schedule an appointment — often same-day.",
      },
      {
        title: "On-Site Diagnosis",
        description:
          "A technician arrives, inspects your AC system, identifies the issue or need, and explains what they found in plain language.",
      },
      {
        title: "Written Estimate",
        description:
          "Before any work begins, you receive a written estimate. No work starts until you approve the price.",
      },
      {
        title: "Service Completed",
        description:
          "We complete the repair, installation, or maintenance — most jobs in a single visit. We clean up before we leave.",
      },
    ],
    faqs: [
      {
        question: "What AC services do you offer in Orange County?",
        answer:
          "We offer the full range: emergency AC repair, planned repairs, new system installation, seasonal maintenance, ductless mini-split service, refrigerant handling, and commercial AC service across Orange County from our Yorba Linda location.",
      },
      {
        question: "How quickly can you respond to an AC problem?",
        answer:
          "For most Orange County cities we offer same-day service. Call us in the morning and we aim to have a technician at your home the same day. Emergency calls are prioritized.",
      },
      {
        question: "Do you service all AC brands?",
        answer:
          "Yes — Carrier, Trane, Lennox, Goodman, Rheem, Bryant, York, Mitsubishi, Daikin, LG, and others. We stock common parts for the most frequently serviced systems.",
      },
      {
        question: "Is AC maintenance really necessary in Southern California?",
        answer:
          "Yes. Orange County summers push systems hard. Annual maintenance catches issues like low refrigerant, dirty coils, and worn electrical contacts before they cause a failure on the hottest day of the year.",
      },
    ],
    relatedSlugs: ["ac-repair", "ac-installation", "ac-maintenance", "ductless-mini-split"],
    ctaHeadline: "Need AC Service in Orange County?",
    ctaSubtext: "Same-day appointments available across Orange County. Call us or submit a request and we'll respond within the hour.",
    category: "cooling",
  },

  // ─── AC SERVICES ──────────────────────────────────────────────────────────
  {
    slug: "ac-services",
    seoTitle: "AC Services Yorba Linda & Orange County | HVAC Service & AC Repair",
    metaDescription:
      "Professional AC services in Yorba Linda and throughout Orange County. Repair, installation, maintenance, and ductless systems. Local team, transparent pricing. Call (714) 410-2784.",
    h1: "AC Services in Yorba Linda & Orange County",
    primaryKeyword: "AC services Yorba Linda",
    secondaryKeywords: [
      "HVAC services Yorba Linda",
      "air conditioning service Yorba Linda",
      "AC repair Yorba Linda CA",
    ],
    heroHeadline: "Your Local Yorba Linda AC Team",
    heroSubtext:
      "We're based at 18340 Yorba Linda Blvd — which means fast response times to Yorba Linda, Placentia, Brea, Anaheim Hills, and every surrounding city. One call covers every AC need.",
    whatItIncludes: [
      "Same-day and emergency AC repair",
      "AC installation and full system replacement",
      "Annual and seasonal maintenance tune-ups",
      "Ductless mini-split installation and service",
      "Refrigerant leak detection and recharge",
      "Airflow and duct system inspection",
      "Smart thermostat installation and programming",
      "Indoor air quality assessment",
    ],
    signsYouNeedThis: [
      "Your AC is blowing warm or barely cool air",
      "The system runs constantly but can't keep up with the heat",
      "You hear rattling, banging, or squealing when it runs",
      "The air handler is dripping water",
      "Your electricity bill spiked without explanation",
      "You haven't had a tune-up in two or more seasons",
    ],
    processSteps: [
      {
        title: "Call Our Local Team",
        description:
          "You speak with someone who knows the area. We schedule around your day and dispatch from Yorba Linda — close to nearly all of our Orange County customers.",
      },
      {
        title: "Arrival and Assessment",
        description:
          "We arrive in the scheduled window, inspect your system, and explain what we find. No jargon — plain answers about what's wrong and what it'll cost.",
      },
      {
        title: "Approval and Work",
        description:
          "You approve the written estimate before we begin. Most jobs are finished in a single visit.",
      },
      {
        title: "Follow-Up",
        description:
          "We walk you through what was done, what to watch for, and when your next service should be.",
      },
    ],
    faqs: [
      {
        question: "Are you based in Yorba Linda?",
        answer:
          "Yes. Our office is at 18340 Yorba Linda Blvd #107, Yorba Linda, CA 92886. We're not a franchise or national dispatch center — we're a local team that lives and works in Orange County.",
      },
      {
        question: "How far do you travel for AC service?",
        answer:
          "Our primary territory is Orange County. We also serve nearby parts of LA County (Diamond Bar, Rowland Heights), Riverside County (Corona, Norco), and San Bernardino County (Chino Hills, Ontario).",
      },
      {
        question: "Can I book a same-day AC service appointment?",
        answer:
          "In most cases, yes. Call us before noon and we'll do our best to have someone at your home the same day. Availability depends on current schedule and location.",
      },
      {
        question: "Do you charge a diagnostic fee?",
        answer:
          "Free — we do not charge a diagnostic fee. Our technician identifies the problem at no cost. You only pay for the repair if you decide to proceed.",
      },
    ],
    relatedSlugs: ["ac-repair", "ac-installation", "ac-maintenance", "air-conditioning"],
    ctaHeadline: "Local Yorba Linda AC Service — Fast Response",
    ctaSubtext: "We're minutes away from most Yorba Linda, Placentia, and Brea neighborhoods. Call now for same-day availability.",
    category: "cooling",
  },

  // ─── AC REPAIR ────────────────────────────────────────────────────────────
  {
    slug: "ac-repair",
    seoTitle: "AC Repair in Orange County, CA | Same-Day Service",
    metaDescription:
      "Same-day AC repair in Orange County, CA. We fix all makes and models — refrigerant leaks, compressor issues, frozen coils, electrical faults. Call (714) 410-2784.",
    h1: "AC Repair in Orange County — Same-Day Service",
    primaryKeyword: "AC repair Orange County",
    secondaryKeywords: [
      "air conditioner repair Orange County CA",
      "AC repair Yorba Linda",
      "same-day AC repair Orange County",
      "emergency AC repair Orange County",
    ],
    heroHeadline: "Fast AC Repair Across Orange County",
    heroSubtext:
      "Your AC stopped working. We diagnose the real problem, give you a written price, and fix it — usually the same visit. No guesswork, no upsells.",
    whatItIncludes: [
      "Full system diagnostic to identify the root cause",
      "Capacitor, contactor, and relay replacement",
      "Refrigerant leak detection and repair",
      "Refrigerant recharge (EPA-certified handling)",
      "Frozen evaporator coil diagnosis and correction",
      "Compressor and fan motor diagnosis",
      "Electrical fault identification and repair",
      "Drain line clearing and condensate pan service",
      "Thermostat diagnosis and calibration",
      "Filter inspection and replacement",
    ],
    signsYouNeedThis: [
      "AC blowing warm or room-temperature air",
      "System turns on but shuts off within minutes (short-cycling)",
      "Ice forming on the indoor unit or refrigerant lines",
      "Water dripping from the air handler or ceiling",
      "System runs continuously without reaching set temperature",
      "Loud grinding, banging, rattling, or clicking noises",
      "Unusual smell — musty, burning, or chemical",
      "Thermostat unresponsive or displaying error codes",
    ],
    processSteps: [
      {
        title: "Describe the Symptom",
        description:
          "Call us or submit a request. Tell us what the system is doing (or not doing) and we'll help determine urgency and schedule appropriately.",
      },
      {
        title: "Technician Arrives and Diagnoses",
        description:
          "We inspect the system — electrical components, refrigerant charge, airflow, drain system, and controls — and identify the actual failure, not just the symptom.",
      },
      {
        title: "Written Estimate Before Work",
        description:
          "We explain what needs to be fixed and why, provide a written price, and wait for your approval before starting any repair.",
      },
      {
        title: "Repair Completed, System Tested",
        description:
          "We complete the repair, verify the system is operating correctly across all modes, and document what was done for your records.",
      },
    ],
    faqs: [
      {
        question: "Why is my AC running but not cooling?",
        answer:
          "The most common causes are low refrigerant from a leak, a failed capacitor that's allowing the compressor to run but not properly, a dirty condenser coil reducing heat exchange, or an airflow restriction from a clogged filter or closed vents. A proper diagnosis tells you exactly which it is.",
      },
      {
        question: "Why does my AC turn off after a few minutes?",
        answer:
          "Short-cycling — where the system starts and stops repeatedly — is usually caused by an oversized system, a frozen evaporator coil, a refrigerant issue, or an electrical problem. Running a short-cycling system continuously causes accelerated wear on the compressor.",
      },
      {
        question: "Is it worth repairing an older AC unit?",
        answer:
          "A general guide: if the repair cost is less than one-third of a replacement's installed cost and the system is under 10–12 years old, repair usually makes financial sense. We'll give you an honest assessment rather than push you toward a replacement you don't need.",
      },
      {
        question: "Can you fix my AC the same day?",
        answer:
          "In most cases, yes. We carry common repair parts on our service vehicles. If a part needs to be ordered, we'll give you a realistic timeline. Same-day completion depends on part availability and job complexity.",
      },
      {
        question: "My AC is freezing up — what causes that?",
        answer:
          "Frozen coils are typically caused by low refrigerant charge, restricted airflow from a dirty filter or closed vents, or a dirty evaporator coil. Running a frozen system can damage the compressor, so we recommend turning the fan to 'on' mode and calling us promptly.",
      },
    ],
    relatedSlugs: ["emergency-ac-repair", "ac-maintenance", "ac-installation", "ac-tune-up"],
    ctaHeadline: "AC Not Cooling? We Can Fix It Today.",
    ctaSubtext: "Same-day AC repair across Orange County. Written estimate before any work starts. Call (714) 410-2784.",
    category: "cooling",
  },

  // ─── EMERGENCY AC REPAIR ──────────────────────────────────────────────────
  {
    slug: "emergency-ac-repair",
    seoTitle: "Emergency AC Repair Orange County | Available 7 Days",
    metaDescription:
      "Emergency AC repair in Orange County. Available 7 days a week including weekends. Fast dispatch from Yorba Linda. Call (714) 410-2784 now.",
    h1: "Emergency AC Repair in Orange County",
    primaryKeyword: "emergency AC repair Orange County",
    secondaryKeywords: [
      "24 hour AC repair Orange County",
      "AC repair emergency Yorba Linda",
      "weekend AC repair Orange County",
      "AC not working Orange County",
    ],
    heroHeadline: "AC Broke Down? We Respond Fast — 7 Days a Week.",
    heroSubtext:
      "An AC failure during an Orange County heat wave isn't something you wait on. We dispatch emergency calls quickly and prioritize getting your home cooled down.",
    whatItIncludes: [
      "Priority same-day scheduling for emergency calls",
      "Full system diagnosis on arrival",
      "On-the-spot repair for most common failures",
      "Refrigerant recharge if needed (EPA-certified)",
      "Capacitor, contactor, and relay replacement",
      "Compressor and motor assessment",
      "Temporary cooling guidance while you wait",
      "Clear communication about arrival time",
    ],
    signsYouNeedThis: [
      "AC completely stopped working in hot weather",
      "System is making loud, sudden new noises",
      "Household member with a medical condition needs cooling",
      "AC was working this morning — now it's not",
      "Breaker keeps tripping when AC runs",
      "Burning smell coming from the unit",
      "Water flooding from air handler",
    ],
    processSteps: [
      {
        title: "Call Us Immediately",
        description:
          "For emergencies, call rather than submitting a form. We triage emergency calls by urgency and dispatch the next available technician from our Yorba Linda location.",
      },
      {
        title: "Fast Dispatch",
        description:
          "We'll give you an estimated arrival time. Our dispatch is based in Yorba Linda — close to most of Orange County — so travel times are short.",
      },
      {
        title: "Diagnose and Repair",
        description:
          "The technician diagnoses the failure, explains the cause and cost, and performs the repair. Most common emergency failures are fixable in a single visit.",
      },
      {
        title: "System Verified and Running",
        description:
          "Before leaving, we confirm the system is cooling properly and the immediate cause of failure has been resolved.",
      },
    ],
    faqs: [
      {
        question: "What counts as an AC emergency?",
        answer:
          "An AC emergency is when your system stops cooling completely during hot weather, especially if children, elderly family members, or anyone with a medical condition is in the home. Burning smells, water flooding, and breakers tripping are also emergency situations.",
      },
      {
        question: "Are you available on weekends for emergency calls?",
        answer:
          "Yes. We take emergency calls 7 days a week. Sunday service is available for genuine emergencies. Call us directly and explain your situation — we'll tell you honestly what we can accommodate.",
      },
      {
        question: "What should I do while waiting for emergency AC repair?",
        answer:
          "Turn off the system completely at the thermostat to prevent further damage. Move to lower floors where it's cooler. Use fans to circulate air. Close blinds on sun-facing windows. If anyone in the home is at risk from heat, consider going to a cooled public space until we arrive.",
      },
      {
        question: "Can you fix my AC on the first emergency visit?",
        answer:
          "Most emergency calls are resolved on the first visit. We carry common repair parts. The only exception is when a major component like a compressor needs to be ordered — in that case, we'll give you a clear timeline and options.",
      },
    ],
    relatedSlugs: ["ac-repair", "ac-services", "air-conditioning"],
    ctaHeadline: "AC Emergency in Orange County? Call Now.",
    ctaSubtext: "We're based in Yorba Linda and dispatch fast. Available 7 days — call (714) 410-2784 right now.",
    category: "cooling",
  },

  // ─── AC INSTALLATION ──────────────────────────────────────────────────────
  {
    slug: "ac-installation",
    seoTitle: "AC Installation Orange County, CA | New System Install",
    metaDescription:
      "AC installation and replacement in Orange County, CA. We size, select, and install central air systems, heat pumps, and ductless units. Call (714) 410-2784 for a free quote.",
    h1: "AC Installation & New System Setup in Orange County",
    primaryKeyword: "AC installation Orange County",
    secondaryKeywords: [
      "air conditioner installation Orange County",
      "AC replacement Orange County",
      "new AC system Orange County CA",
      "HVAC installation Yorba Linda",
    ],
    heroHeadline: "New AC System — Sized Right, Installed Correctly",
    heroSubtext:
      "An AC system is a 15-year investment. Getting the sizing right matters more than the brand name on the box. We do Manual J load calculations on every installation to make sure the equipment matches your home.",
    whatItIncludes: [
      "Manual J load calculation for accurate system sizing",
      "Brand and efficiency tier recommendation based on your home",
      "Removal and disposal of existing equipment",
      "New condenser unit placement and installation",
      "Air handler or furnace coil installation (if applicable)",
      "Refrigerant line set installation or replacement",
      "Electrical disconnect and wiring to code",
      "Thermostat installation and programming",
      "System startup, testing, and commissioning",
      "Walkthrough of controls, filter location, and maintenance schedule",
    ],
    signsYouNeedThis: [
      "Your current system is 12–15+ years old",
      "Repair estimates are approaching 40–50% of a replacement cost",
      "Your system runs R-22 refrigerant (no longer manufactured)",
      "Energy bills have climbed steadily despite regular maintenance",
      "The system can't keep up with summer heat even when it's running",
      "You're adding a room addition or converting unconditioned space",
    ],
    processSteps: [
      {
        title: "Free In-Home Consultation",
        description:
          "A technician visits your home to measure square footage, assess insulation, window exposure, and duct condition. This forms the basis of a proper system recommendation.",
      },
      {
        title: "Equipment Selection and Quote",
        description:
          "We provide a written quote with specific equipment — brand, model, SEER rating, and capacity. We explain why we're recommending it and what alternatives exist.",
      },
      {
        title: "Installation Day",
        description:
          "Our crew arrives on schedule. Old equipment is removed and properly disposed of. New equipment is installed, connected, and wired to code. This typically takes 4–8 hours depending on complexity.",
      },
      {
        title: "Startup and Commissioning",
        description:
          "We start the system, verify refrigerant charge, airflow, and temperature differential across the system, and confirm it's operating to spec before we leave.",
      },
    ],
    faqs: [
      {
        question: "What size AC do I need for my Orange County home?",
        answer:
          "System sizing depends on square footage, ceiling height, insulation levels, window area and orientation, local climate, and duct condition. A Manual J load calculation is the correct way to size a system — rules of thumb like 'one ton per 500 square feet' are often wrong and lead to systems that short-cycle or can't keep up.",
      },
      {
        question: "What SEER rating should I choose?",
        answer:
          "In California, the minimum SEER2 for new installations is already above the national minimum. For most Orange County homes, a 16–18 SEER2 system offers a reasonable balance of upfront cost and long-term energy savings. Higher SEER systems pay off faster if you use your AC heavily from June through September.",
      },
      {
        question: "How long does AC installation take?",
        answer:
          "A standard split-system replacement (condenser plus air handler or coil) takes approximately 4–8 hours. Complex jobs — those with refrigerant line replacement, duct modifications, or electrical panel upgrades — can take longer. We give you a realistic timeframe in the quote.",
      },
      {
        question: "Do you handle the permits for AC installation?",
        answer:
          "Permit requirements vary by city. We handle permit coordination for installations in cities that require it. Ask us when you get your quote and we'll tell you what applies to your location.",
      },
      {
        question: "What brands of AC do you install?",
        answer:
          "We work with all major residential brands including Carrier, Trane, Lennox, Goodman, Rheem, Bryant, and York. We recommend equipment based on your specific needs and budget, not based on which manufacturer is running a promotion.",
      },
    ],
    relatedSlugs: ["ac-replacement", "ac-repair", "ac-maintenance", "heat-pump-installation"],
    ctaHeadline: "Ready for a New AC System? Let's Get It Right.",
    ctaSubtext: "Free in-home consultation and written quote. No pressure, no upsells — just an accurate recommendation for your home.",
    category: "cooling",
  },

  // ─── AC REPLACEMENT ───────────────────────────────────────────────────────
  {
    slug: "ac-replacement",
    seoTitle: "AC Replacement Orange County CA | Old System Replacement",
    metaDescription:
      "AC replacement in Orange County, CA. We remove old systems and install properly sized, energy-efficient replacements. Local team, transparent pricing. Call (714) 410-2784.",
    h1: "AC Replacement in Orange County — When It's Time for a New System",
    primaryKeyword: "AC replacement Orange County",
    secondaryKeywords: [
      "replace AC unit Orange County",
      "HVAC replacement Orange County",
      "old AC replacement Orange County CA",
    ],
    heroHeadline: "Old AC System? Here's How to Replace It Without Overspending.",
    heroSubtext:
      "Not every old system needs the most expensive replacement. We help you understand what your home actually needs, compare options, and make a decision you'll be happy with for the next 15 years.",
    whatItIncludes: [
      "Assessment of existing system and ductwork condition",
      "Manual J load calculation for correct sizing",
      "Removal and disposal of old equipment",
      "New system installation with all associated components",
      "Refrigerant line set evaluation and replacement if needed",
      "Electrical work to support new equipment",
      "New thermostat installation and programming",
      "System commissioning and performance verification",
    ],
    signsYouNeedThis: [
      "System is 15+ years old and experiencing repeated failures",
      "Repair quotes are more than half the cost of a replacement",
      "The system uses R-22 refrigerant (phased out, increasingly expensive)",
      "Your home never reaches the set temperature on hot days",
      "Energy bills keep climbing year over year",
      "Multiple zones of the house are uncomfortable regardless of thermostat settings",
    ],
    processSteps: [
      {
        title: "Assessment and Sizing",
        description:
          "We evaluate your current system, ductwork, and home characteristics. The goal is an accurate replacement recommendation — not upsizing to a higher-margin unit.",
      },
      {
        title: "Quote With Options",
        description:
          "You receive a written quote that includes at least two equipment options at different price and efficiency tiers. We explain the tradeoffs honestly.",
      },
      {
        title: "Replacement Day",
        description:
          "Existing equipment is removed and disposed of properly. New equipment is installed, wired, and connected. Most replacements are completed in a single day.",
      },
      {
        title: "Commissioning and Documentation",
        description:
          "We test the system under load conditions, verify refrigerant charge and airflow, and provide you with documentation for manufacturer warranty registration.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my AC needs replacement or just repair?",
        answer:
          "The repair-vs-replace decision depends on system age, repair cost relative to replacement cost, refrigerant type (R-22 systems are expensive to maintain), and overall energy efficiency. We give you a straight assessment — repair if it makes sense, replace if the economics clearly favor it.",
      },
      {
        question: "What happens to my old AC unit?",
        answer:
          "We remove the old unit and dispose of it properly, including recovering any remaining refrigerant per EPA regulations. You don't need to arrange separate disposal.",
      },
      {
        question: "Can I replace just the outdoor unit without replacing the indoor unit?",
        answer:
          "It depends. Mismatched indoor and outdoor components can reduce system efficiency and may cause reliability issues. If your indoor unit is in good condition and compatible with the new outdoor unit, partial replacement can work. We'll tell you clearly whether it makes sense in your specific case.",
      },
      {
        question: "Is there a warranty on the replacement system?",
        answer:
          "New equipment comes with a manufacturer's warranty — typically 5–10 years on parts depending on the brand and whether you register the equipment. We also provide a warranty on our installation labor. Specific terms will be in your quote.",
      },
    ],
    relatedSlugs: ["ac-installation", "ac-repair", "heat-pump-installation"],
    ctaHeadline: "Time to Replace Your AC? Start with a Free Assessment.",
    ctaSubtext: "We'll evaluate your current system, explain your options, and give you a written quote — no obligation.",
    category: "cooling",
  },

  // ─── AC MAINTENANCE ───────────────────────────────────────────────────────
  {
    slug: "ac-maintenance",
    seoTitle: "AC Maintenance Orange County | Annual Tune-Up Service",
    metaDescription:
      "AC maintenance and tune-up service in Orange County, CA. Prevent breakdowns, extend system life, and lower energy bills. Based in Yorba Linda. Call (714) 410-2784.",
    h1: "AC Maintenance in Orange County — Prevent Breakdowns Before Summer",
    primaryKeyword: "AC maintenance Orange County",
    secondaryKeywords: [
      "AC tune-up Orange County",
      "HVAC maintenance Orange County CA",
      "air conditioner maintenance Yorba Linda",
      "preventive AC service Orange County",
    ],
    heroHeadline: "Most Summer AC Failures Are Preventable",
    heroSubtext:
      "Orange County's heat season arrives fast and stays long. A spring tune-up catches the issues that cause mid-July breakdowns — before the hottest days when every HVAC company has a full schedule.",
    whatItIncludes: [
      "Condenser coil inspection and cleaning",
      "Evaporator coil inspection and cleaning",
      "Refrigerant level check and pressure test",
      "Electrical connections inspection and tightening",
      "Capacitor and contactor condition check",
      "Blower motor and fan belt inspection",
      "Drain line flush and condensate system check",
      "Filter inspection and replacement (filter supplied by customer or purchasable)",
      "Thermostat calibration and operation test",
      "System performance measurement — temperature differential and airflow",
      "Written service report with findings",
    ],
    signsYouNeedThis: [
      "No AC service in the past 12 months",
      "Higher-than-expected energy bills going into summer",
      "The system takes longer than it used to reach the set temperature",
      "Weak airflow from some vents",
      "The outdoor unit looks dirty or has debris around it",
      "You can't remember the last time the filter was replaced",
    ],
    processSteps: [
      {
        title: "Schedule Before the Rush",
        description:
          "Spring (March–May) is the ideal time for AC maintenance. Schedule before summer demand peaks and HVAC companies' calendars fill up.",
      },
      {
        title: "Comprehensive Inspection",
        description:
          "The technician inspects and tests every major component — electrical, mechanical, refrigerant, airflow, and controls.",
      },
      {
        title: "Cleaning and Adjustment",
        description:
          "We clean coils, flush the drain line, tighten electrical connections, and calibrate the thermostat. Any components showing wear are flagged in the report.",
      },
      {
        title: "Written Report and Recommendations",
        description:
          "You receive a written summary of what was done, what was found, and any recommended follow-up. You decide what to prioritize — we don't pressure repairs.",
      },
    ],
    faqs: [
      {
        question: "How often does an AC system need maintenance?",
        answer:
          "Once per year is the minimum for most residential systems. If you have a heat pump that runs year-round, twice per year (spring and fall) is better. Neglected systems are more likely to fail during the hottest periods when they're working hardest.",
      },
      {
        question: "What's actually included in an AC tune-up?",
        answer:
          "A proper tune-up is more than a filter change. It includes coil cleaning, refrigerant level check, electrical component inspection, drain line service, thermostat calibration, and a performance measurement. Our tune-up produces a written report of everything inspected.",
      },
      {
        question: "Can maintenance prevent expensive repairs?",
        answer:
          "In many cases, yes. Common failure points — capacitors, contactors, clogged drain lines, refrigerant undercharge — are detectable during maintenance and much cheaper to address proactively than after a failure. Whether we find something or not, you'll know your system's condition going into summer.",
      },
      {
        question: "Does AC maintenance affect my manufacturer warranty?",
        answer:
          "Most manufacturer warranties require documented annual maintenance to remain valid. A written service record from our maintenance visit supports your warranty claim if needed.",
      },
    ],
    relatedSlugs: ["ac-tune-up", "residential-maintenance-plan", "ac-repair"],
    ctaHeadline: "Book Your AC Tune-Up Before Summer Hits",
    ctaSubtext: "Schedule now while slots are available. A tune-up costs far less than an emergency repair in July.",
    category: "maintenance",
  },

  // ─── AC TUNE-UP ───────────────────────────────────────────────────────────
  {
    slug: "ac-tune-up",
    seoTitle: "AC Tune-Up Orange County CA | Spring & Pre-Summer Service",
    metaDescription:
      "AC tune-up service in Orange County, CA. Pre-season inspection, cleaning, and adjustment to prevent summer breakdowns. Call (714) 410-2784 to schedule.",
    h1: "AC Tune-Up in Orange County — Pre-Season Inspection & Service",
    primaryKeyword: "AC tune-up Orange County",
    secondaryKeywords: [
      "air conditioner tune-up Orange County",
      "spring AC service Orange County",
      "HVAC tune-up Yorba Linda",
    ],
    heroHeadline: "One Tune-Up Can Save You a Summer Breakdown",
    heroSubtext:
      "We check every component that commonly fails when Orange County temperatures spike in June and July — giving you a written report and the peace of mind that your system is ready.",
    whatItIncludes: [
      "Condenser and evaporator coil inspection and cleaning",
      "Refrigerant pressure check",
      "Electrical component inspection — capacitors, contactors, wiring",
      "Blower wheel and fan motor inspection",
      "Drain line flush",
      "Thermostat calibration",
      "Airflow measurement at supply registers",
      "Filter condition check",
      "Temperature split measurement across the system",
      "Detailed written service report",
    ],
    signsYouNeedThis: [
      "Last tune-up was more than 12 months ago",
      "System is 5+ years old and has never had professional maintenance",
      "Spring has arrived and you haven't tested the system yet",
      "You want documentation of maintenance for warranty purposes",
    ],
    processSteps: [
      {
        title: "Schedule in Advance",
        description:
          "Spring tune-ups book quickly. Call early in March, April, or May to secure a slot before the summer rush fills our calendar.",
      },
      {
        title: "Thorough Inspection",
        description:
          "We go through every checkable component systematically — nothing is skipped to save time.",
      },
      {
        title: "Findings Explained",
        description:
          "We tell you what we found. If something needs attention, we explain it and give you a repair estimate. There's no pressure — it's your call.",
      },
      {
        title: "Written Service Record",
        description:
          "You get documentation of the tune-up — what was inspected, what was done, and what was noted. This is useful for warranty purposes and future service.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between a tune-up and a maintenance visit?",
        answer:
          "They're the same thing described differently. A tune-up is a pre-season maintenance inspection that covers cleaning, adjustment, and inspection of all major components. Some companies offer abbreviated 'tune-ups' that don't include coil cleaning or refrigerant checks — ours does.",
      },
      {
        question: "When is the best time to schedule an AC tune-up in Orange County?",
        answer:
          "March through May is ideal. This gives you time to address any issues found before temperatures reach the 90s and 100s. Waiting until June means competing with emergency repair calls for technician availability.",
      },
      {
        question: "How long does a tune-up take?",
        answer:
          "A thorough tune-up takes approximately 60–90 minutes. If the technician finds issues that need repair, the time extends depending on the work involved.",
      },
    ],
    relatedSlugs: ["ac-maintenance", "residential-maintenance-plan", "ac-repair"],
    ctaHeadline: "Schedule Your AC Tune-Up Now",
    ctaSubtext: "Spring slots fill up fast. Call now and secure a pre-summer tune-up before July demand hits.",
    category: "maintenance",
  },

  // ─── DUCTLESS MINI-SPLIT ──────────────────────────────────────────────────
  {
    slug: "ductless-mini-split",
    seoTitle: "Ductless Mini-Split Installation & Repair | Orange County CA",
    metaDescription:
      "Ductless mini-split installation, repair, and maintenance in Orange County, CA. Mitsubishi, Daikin, LG, and all major brands. Call (714) 410-2784.",
    h1: "Ductless Mini-Split Systems in Orange County",
    primaryKeyword: "ductless mini-split Orange County",
    secondaryKeywords: [
      "mini-split installation Orange County",
      "ductless AC Orange County CA",
      "ductless HVAC Yorba Linda",
      "mini split repair Orange County",
    ],
    heroHeadline: "Zone Comfort Without Ductwork — Installed Right",
    heroSubtext:
      "Mini-split systems give you independent temperature control for individual rooms without touching existing ductwork. Ideal for additions, garages, converted spaces, and older homes where running ducts isn't practical.",
    whatItIncludes: [
      "Site assessment and optimal placement planning",
      "Indoor air handler installation and mounting",
      "Outdoor compressor unit installation",
      "Refrigerant line set installation",
      "Electrical connection and disconnect installation",
      "Drain line installation and routing",
      "System startup, charging, and commissioning",
      "Remote control and app setup (where applicable)",
      "Multi-zone system installation and balancing",
      "Repair and maintenance of existing mini-split systems",
    ],
    signsYouNeedThis: [
      "One room or area of your home is consistently too hot or cold",
      "You're adding a room addition, ADU, or garage conversion",
      "Your home has no existing ductwork and you want AC",
      "Your central system can't adequately control the temperature in a specific zone",
      "You want independent temperature control for different family members",
      "You have an older home where duct installation would be disruptive or costly",
    ],
    processSteps: [
      {
        title: "Site Assessment",
        description:
          "We evaluate the space, identify the best placement for indoor and outdoor units, plan the line set routing, and confirm electrical requirements.",
      },
      {
        title: "System Selection",
        description:
          "We recommend equipment sized and rated for your space — Mitsubishi, Daikin, LG, or other major brands. Multi-zone options are presented if you're conditioning multiple areas.",
      },
      {
        title: "Installation Day",
        description:
          "We mount indoor units, install the outdoor compressor, run line sets and drain lines, and make electrical connections. Most single-zone installations are completed in a day.",
      },
      {
        title: "System Startup and Training",
        description:
          "We commission the system, verify refrigerant charge, and walk you through the controls — including app setup for smart-enabled units.",
      },
    ],
    faqs: [
      {
        question: "Are mini-split systems good for Orange County's climate?",
        answer:
          "Yes. Mini-splits are heat pumps by design, meaning they both cool and heat efficiently. In Southern California's mild climate, a mini-split can handle heating duties at much higher efficiency than a gas furnace in most weather. They work well year-round for both cooling and supplemental heating.",
      },
      {
        question: "How many rooms can one mini-split system handle?",
        answer:
          "Single-zone systems serve one room. Multi-zone systems (2–5 indoor units connected to one outdoor unit) can condition multiple rooms. The number of zones depends on the outdoor unit's capacity and the square footage of each zone.",
      },
      {
        question: "How much does mini-split installation cost?",
        answer:
          "Cost depends on the number of zones, equipment brand and efficiency tier, line set length, and installation complexity. We provide a written quote after assessing your specific situation — call for a consultation.",
      },
      {
        question: "Do you repair mini-split systems you didn't install?",
        answer:
          "Yes. We repair and maintain all major mini-split brands regardless of who installed the system. If your Mitsubishi, Daikin, LG, or other brand system has a problem, we can diagnose and repair it.",
      },
    ],
    relatedSlugs: ["mini-split-installation", "ac-installation", "ac-repair"],
    ctaHeadline: "Interested in a Mini-Split? Let's Talk Options.",
    ctaSubtext: "We'll assess your space and give you a clear recommendation on what system fits — and what it'll cost.",
    category: "cooling",
  },

  // ─── MINI-SPLIT INSTALLATION ──────────────────────────────────────────────
  {
    slug: "mini-split-installation",
    seoTitle: "Mini-Split Installation Orange County CA | Ductless AC Install",
    metaDescription:
      "Professional mini-split installation in Orange County, CA. Single and multi-zone systems. Mitsubishi, Daikin, LG, Carrier. Free consultation. Call (714) 410-2784.",
    h1: "Mini-Split Installation in Orange County",
    primaryKeyword: "mini-split installation Orange County",
    secondaryKeywords: [
      "ductless mini-split installation Orange County",
      "mini split install Yorba Linda",
      "mini-split AC installation Orange County CA",
    ],
    heroHeadline: "Mini-Split Installation Done Right — the First Time",
    heroSubtext:
      "A mini-split installed incorrectly — wrong refrigerant charge, poor placement, undersized unit — underperforms and fails early. We follow the manufacturer's installation specifications on every job.",
    whatItIncludes: [
      "Load calculation for the space being conditioned",
      "Indoor unit placement planning for optimal airflow",
      "Outdoor unit placement for proper airflow and accessibility",
      "Line set installation with correct insulation and routing",
      "Proper electrical circuit installation",
      "Drain line installation and slope verification",
      "Vacuum and leak test before refrigerant charge",
      "Commissioning and performance verification",
      "Owner training on controls and maintenance",
    ],
    signsYouNeedThis: [
      "Garage, workshop, or bonus room that needs its own climate control",
      "ADU or guest house without existing HVAC",
      "Room addition that can't be tied into the central system",
      "Server room or home office that needs dedicated cooling",
      "Sunroom or enclosed patio that overheats in summer",
    ],
    processSteps: [
      {
        title: "Consultation and Site Visit",
        description:
          "We measure the space, assess sun exposure and insulation, discuss your usage pattern, and confirm electrical capacity. This determines the right unit capacity and placement.",
      },
      {
        title: "Equipment Selection",
        description:
          "We present equipment options with pricing. We work with Mitsubishi, Daikin, LG, Carrier Infinity, and other major brands — and recommend based on your budget and performance needs.",
      },
      {
        title: "Installation",
        description:
          "Indoor unit mounted, outdoor unit positioned and secured, line set installed with proper insulation and support, electrical connected to dedicated circuit. System vacuumed and charged to spec.",
      },
      {
        title: "Verification and Training",
        description:
          "We run the system through heating and cooling modes, verify temperature output, and confirm proper drainage. We show you how to clean filters and operate all modes.",
      },
    ],
    faqs: [
      {
        question: "Does mini-split installation require permits in Orange County?",
        answer:
          "Permit requirements vary by city. Many Orange County cities require an electrical permit for the dedicated circuit work involved. We coordinate permit requirements for your specific city — ask when you request a quote.",
      },
      {
        question: "How long does mini-split installation take?",
        answer:
          "A single-zone installation typically takes 4–6 hours. Multi-zone systems (multiple indoor units) take longer — generally 1–2 days depending on the number of zones and installation complexity.",
      },
      {
        question: "What's the best mini-split brand for Orange County?",
        answer:
          "Mitsubishi and Daikin consistently rank highest for reliability, efficiency, and parts availability. LG and Carrier's ductless line are also solid options. We don't push a single brand — we recommend what fits your budget and reliability expectations.",
      },
    ],
    relatedSlugs: ["ductless-mini-split", "ac-installation", "heat-pump-installation"],
    ctaHeadline: "Ready to Install a Mini-Split?",
    ctaSubtext: "Free consultation and written quote. We assess your space, recommend the right system, and install it right.",
    category: "cooling",
  },

  // ─── HEAT PUMP SERVICES ───────────────────────────────────────────────────
  {
    slug: "heat-pump-services",
    seoTitle: "Heat Pump Services Orange County CA | Repair & Installation",
    metaDescription:
      "Heat pump repair, installation, and maintenance in Orange County, CA. Year-round comfort from one system. Based in Yorba Linda. Call (714) 410-2784.",
    h1: "Heat Pump Services in Orange County, CA",
    primaryKeyword: "heat pump services Orange County",
    secondaryKeywords: [
      "heat pump Orange County CA",
      "heat pump repair Orange County",
      "heat pump installation Orange County",
    ],
    heroHeadline: "One System, Year-Round Comfort — Heat Pump Service in Orange County",
    heroSubtext:
      "Heat pumps both heat and cool your home using the same refrigerant cycle — at up to 3× the efficiency of electric resistance heating. In Southern California's mild winters, they're often the most efficient option available.",
    whatItIncludes: [
      "Heat pump diagnostic and repair service",
      "Reversing valve inspection and replacement",
      "Defrost cycle diagnosis and repair",
      "Refrigerant service for heat pump systems",
      "New heat pump installation and commissioning",
      "Dual-fuel system configuration and setup",
      "Annual heat pump maintenance and tune-up",
      "Heat pump thermostat installation and programming",
    ],
    signsYouNeedThis: [
      "Your heat pump blows cold air in heating mode",
      "The system doesn't switch between heating and cooling properly",
      "The system runs in defrost mode constantly",
      "Heating bills are higher than they should be for a heat pump",
      "You're considering replacing a gas furnace with an electric alternative",
      "Your current heat pump is 12+ years old",
    ],
    processSteps: [
      {
        title: "Describe the Problem or Need",
        description:
          "Heat pump issues are sometimes different from standard AC problems — particularly in heating mode. Describe what the system is doing and we'll assess whether it's a repair or service situation.",
      },
      {
        title: "Diagnosis",
        description:
          "We test both heating and cooling modes, check the reversing valve, refrigerant charge, defrost cycle, and electrical components specific to heat pump operation.",
      },
      {
        title: "Estimate and Decision",
        description:
          "Written estimate before any work. If the repair doesn't make economic sense given the system's age, we'll tell you and discuss replacement options.",
      },
      {
        title: "Repair or Installation Completed",
        description:
          "Work completed and system tested in both modes — cooling and heating — to confirm full operation.",
      },
    ],
    faqs: [
      {
        question: "Are heat pumps worth it in Orange County?",
        answer:
          "Yes — especially for homes currently using electric resistance heating. Heat pumps deliver 2–3× the heating output per unit of electricity compared to electric strip heaters. In Orange County's mild winters, they operate efficiently even on cold nights. Compared to gas, the economics depend on your current utility rates.",
      },
      {
        question: "Why is my heat pump blowing cold air in heat mode?",
        answer:
          "Several causes: a failed reversing valve that's stuck in cooling mode, low refrigerant charge, a defrost cycle that's activating too frequently, or emergency/aux heat not activating when it should. We diagnose which is causing it before recommending any work.",
      },
      {
        question: "Can a heat pump replace a gas furnace in Orange County?",
        answer:
          "In most Orange County climate zones, a properly sized heat pump can handle 100% of heating demand without a gas backup. For homes in higher elevation areas with colder winter nights, a dual-fuel system (heat pump plus gas backup) may be more practical.",
      },
    ],
    relatedSlugs: ["heat-pump-repair", "heat-pump-installation", "ac-installation"],
    ctaHeadline: "Heat Pump Not Working? We Diagnose Both Modes.",
    ctaSubtext: "Local Orange County heat pump service — same-day availability for most areas. Call (714) 410-2784.",
    category: "heating",
  },

  // ─── HEAT PUMP REPAIR ─────────────────────────────────────────────────────
  {
    slug: "heat-pump-repair",
    seoTitle: "Heat Pump Repair Orange County CA | Same-Day Service",
    metaDescription:
      "Heat pump repair in Orange County, CA. We diagnose and repair reversing valve failures, refrigerant issues, defrost problems, and more. Call (714) 410-2784.",
    h1: "Heat Pump Repair in Orange County",
    primaryKeyword: "heat pump repair Orange County",
    secondaryKeywords: [
      "heat pump not heating Orange County",
      "heat pump repair Yorba Linda",
      "heat pump service Orange County CA",
    ],
    heroHeadline: "Heat Pump Acting Up? We Diagnose Both Modes.",
    heroSubtext:
      "Heat pump problems can look like AC problems or heating problems depending on which mode fails. We test the full system — reversing valve, refrigerant circuit, defrost cycle, and electrical — to find the actual cause.",
    whatItIncludes: [
      "Dual-mode diagnostic — testing both cooling and heating operation",
      "Reversing valve testing and replacement",
      "Refrigerant pressure check and leak test",
      "Defrost control board and sensor diagnosis",
      "Compressor and motor assessment",
      "Electrical component inspection",
      "Auxiliary heat operation check",
      "Thermostat heat pump mode verification",
      "System performance verification after repair",
    ],
    signsYouNeedThis: [
      "Heat pump produces cold air when set to heat",
      "System runs in defrost mode for extended periods",
      "Heating output is noticeably weaker than previous seasons",
      "System works fine in cooling but fails in heating (or vice versa)",
      "Ice building up on the outdoor unit that doesn't clear",
      "Reversing valve noise — loud click or hiss when switching modes",
    ],
    processSteps: [
      {
        title: "Describe the Failure Mode",
        description:
          "Tell us whether the problem occurs in heating mode, cooling mode, or both. This helps us prepare for the right diagnostic approach.",
      },
      {
        title: "Full System Diagnostic",
        description:
          "We test the system through both modes, measure refrigerant pressures under load, check the reversing valve, and inspect the defrost system — heat pump-specific diagnostics that a standard AC diagnostic may miss.",
      },
      {
        title: "Repair Estimate",
        description:
          "We explain the cause, the parts needed, and the cost. For a failed reversing valve, we'll discuss whether it makes sense to repair versus evaluate replacement.",
      },
      {
        title: "Repair and Both-Mode Verification",
        description:
          "Repair completed and system tested in heating and cooling mode to verify the fix addressed the root cause.",
      },
    ],
    faqs: [
      {
        question: "What does a bad reversing valve do to a heat pump?",
        answer:
          "The reversing valve controls which direction refrigerant flows — cooling vs. heating mode. A failed valve can stick in one position (system won't switch modes), leak internally (poor performance in one mode), or fail to seat properly (noise and efficiency loss). Replacement is a specialized repair that requires recovering the refrigerant charge.",
      },
      {
        question: "Why does my heat pump run but not heat the house?",
        answer:
          "Common causes: low refrigerant charge reducing heat output, a reversing valve stuck in cool mode, a faulty defrost cycle keeping the system in auxiliary mode, or an undersized system struggling in cold conditions. We identify which is the actual issue before recommending a repair.",
      },
      {
        question: "Is heat pump repair more expensive than AC repair?",
        answer:
          "For common issues like refrigerant service and electrical components, costs are similar. Reversing valve replacement is a heat pump-specific repair that costs more than typical AC repairs. We price repairs accurately — call and describe the symptoms and we can give you a ballpark.",
      },
    ],
    relatedSlugs: ["heat-pump-services", "heat-pump-installation", "ac-repair"],
    ctaHeadline: "Heat Pump Not Heating or Cooling Correctly?",
    ctaSubtext: "We diagnose both modes and repair all makes. Call for same-day service across Orange County.",
    category: "heating",
  },

  // ─── HEAT PUMP INSTALLATION ───────────────────────────────────────────────
  {
    slug: "heat-pump-installation",
    seoTitle: "Heat Pump Installation Orange County CA | New System Install",
    metaDescription:
      "Heat pump installation in Orange County, CA. Air-source heat pumps for year-round heating and cooling. Free quote. Call (714) 410-2784.",
    h1: "Heat Pump Installation in Orange County",
    primaryKeyword: "heat pump installation Orange County",
    secondaryKeywords: [
      "install heat pump Orange County",
      "air source heat pump installation Orange County CA",
      "heat pump system Orange County",
    ],
    heroHeadline: "Heat and Cool Your Home with One Efficient System",
    heroSubtext:
      "Modern air-source heat pumps in Southern California's mild climate are among the most efficient heating and cooling options available. We size, select, and install them correctly.",
    whatItIncludes: [
      "Manual J load calculation for heating and cooling",
      "Heat pump selection based on climate zone and usage",
      "Removal of existing equipment (if replacing)",
      "Outdoor unit installation and pad/bracket mounting",
      "Air handler or indoor coil installation",
      "Refrigerant line set installation",
      "Electrical work — disconnect and wiring",
      "Dual-fuel configuration if applicable",
      "Commissioning in both heating and cooling modes",
      "Thermostat setup with heat pump-compatible controls",
    ],
    signsYouNeedThis: [
      "You want to replace an older AC system with a unit that also heats",
      "You're moving away from gas heating and want an electric alternative",
      "Current electric heat is strip heating (very inefficient)",
      "You want a single system for both summer cooling and winter heating",
      "You're building new construction or finishing an addition",
    ],
    processSteps: [
      {
        title: "Heating and Cooling Assessment",
        description:
          "We calculate both heating and cooling loads for your home, assess insulation and window efficiency, and determine the right heat pump capacity for your climate zone.",
      },
      {
        title: "System Selection and Quote",
        description:
          "We present options — standard heat pump, high-efficiency, or cold-climate rated — with installed prices and estimated efficiency ratings for your usage pattern.",
      },
      {
        title: "Installation",
        description:
          "Equipment installed, wired, and commissioned. We test both modes before completing the job.",
      },
      {
        title: "Thermostat and Controls Setup",
        description:
          "Heat pump thermostats have specific settings for emergency heat, aux heat, and defrost management. We configure everything correctly and explain the controls.",
      },
    ],
    faqs: [
      {
        question: "What's the right heat pump size for my Orange County home?",
        answer:
          "Heat pump sizing follows the same Manual J calculation used for AC — square footage, insulation, windows, and orientation. In Orange County, heating load is generally lower than cooling load, so cooling requirements typically drive sizing decisions.",
      },
      {
        question: "Do heat pumps work in Orange County winters?",
        answer:
          "Yes. Modern heat pumps maintain full heating capacity down to temperatures well below what Orange County typically sees. Even on cold December and January nights, a properly sized heat pump operates effectively. For homes in the foothills, a dual-fuel option provides gas backup for the rare very cold night.",
      },
      {
        question: "Can I get rebates for a heat pump installation in California?",
        answer:
          "California has active incentive programs for heat pump installation, including the TECH Clean California initiative. Rebate amounts and eligibility change frequently. We'll provide current information when you request a quote.",
      },
    ],
    relatedSlugs: ["heat-pump-services", "heat-pump-repair", "ac-installation", "mini-split-installation"],
    ctaHeadline: "Interested in a Heat Pump? Get a Free Assessment.",
    ctaSubtext: "We'll size the system correctly and explain your options — with real numbers, not estimates.",
    category: "heating",
  },

  // ─── HEATING SERVICES ─────────────────────────────────────────────────────
  {
    slug: "heating-services",
    seoTitle: "Heating Services Orange County CA | Furnace & Heat Pump",
    metaDescription:
      "Heating services in Orange County, CA — furnace repair, furnace installation, heat pump service, and heating maintenance. Call (714) 410-2784 for same-day service.",
    h1: "Heating Services in Orange County, CA",
    primaryKeyword: "heating services Orange County",
    secondaryKeywords: [
      "furnace repair Orange County",
      "heater service Orange County CA",
      "heating system Orange County",
    ],
    heroHeadline: "Heating Stopped Working? We Cover All Systems in Orange County.",
    heroSubtext:
      "Orange County winters are mild compared to most of the country — but when your heater fails on a cold January night, it still needs fixing. We service gas furnaces, heat pumps, and all residential heating systems.",
    whatItIncludes: [
      "Gas and electric furnace diagnosis and repair",
      "Heat pump heating mode diagnosis and repair",
      "Igniter and flame sensor replacement",
      "Heat exchanger inspection",
      "Blower motor and belt service",
      "Thermostat and controls repair",
      "New furnace installation and replacement",
      "Heat pump installation as gas furnace alternative",
      "Annual heating system tune-up",
    ],
    signsYouNeedThis: [
      "Heater blows cold or room-temperature air",
      "System doesn't turn on when set to heat",
      "Pilot light or ignition failure",
      "Heating runs but the house isn't reaching the set temperature",
      "Unusual smell when the heat runs (especially burning or gas smell)",
      "System cycles on and off repeatedly without heating",
    ],
    processSteps: [
      {
        title: "Describe the Problem",
        description:
          "Tell us whether you have a gas furnace, heat pump, or another system — and what it's doing. This helps us dispatch the right technician with the right parts.",
      },
      {
        title: "Diagnosis",
        description:
          "We inspect ignition systems, heat exchangers, blower motors, gas valves, and controls — the full sequence needed to identify why the system isn't heating.",
      },
      {
        title: "Estimate and Repair",
        description:
          "Written estimate, your approval, then repair. We test heating operation before leaving.",
      },
    ],
    faqs: [
      {
        question: "Is it worth repairing an older furnace in Orange County?",
        answer:
          "Gas furnaces last 15–20+ years in mild climates like Orange County's, where they run far fewer hours than in cold regions. If the system is under 15 years old and the repair is a single component, repair usually makes sense. We'll tell you honestly when it doesn't.",
      },
      {
        question: "Why does my heater run but not heat the house?",
        answer:
          "For gas furnaces: failed igniter, clogged heat exchanger, failed gas valve, or a limit switch tripping due to overheating. For heat pumps: stuck reversing valve, refrigerant issue, or defrost cycle problem. The cause depends on your system type.",
      },
      {
        question: "Should I smell gas when my furnace runs?",
        answer:
          "No. If you smell gas when the furnace runs or at any time near your HVAC system, do not attempt to run the system. Leave the building, call your gas utility's emergency line, and then call us after the gas company has cleared the situation.",
      },
    ],
    relatedSlugs: ["furnace-repair", "furnace-installation", "heat-pump-services"],
    ctaHeadline: "Heater Not Working in Orange County?",
    ctaSubtext: "Same-day heating repair available. We service gas furnaces and heat pumps across Orange County.",
    category: "heating",
  },

  // ─── FURNACE REPAIR ───────────────────────────────────────────────────────
  {
    slug: "furnace-repair",
    seoTitle: "Furnace Repair Orange County CA | Same-Day Heating Repair",
    metaDescription:
      "Furnace repair in Orange County, CA. Gas and electric furnace diagnosis and same-day repair. Igniter, heat exchanger, blower motor, and more. Call (714) 410-2784.",
    h1: "Furnace Repair in Orange County — Gas & Electric Furnaces",
    primaryKeyword: "furnace repair Orange County",
    secondaryKeywords: [
      "gas furnace repair Orange County",
      "heater repair Orange County CA",
      "furnace not working Orange County",
      "furnace repair Yorba Linda",
    ],
    heroHeadline: "Furnace Not Heating? We Diagnose the Actual Problem.",
    heroSubtext:
      "Furnace failures have a handful of common causes — and most can be fixed in a single visit. We identify the real issue before recommending any work.",
    whatItIncludes: [
      "Igniter inspection and replacement (hot surface or spark)",
      "Flame sensor cleaning and replacement",
      "Gas valve diagnosis",
      "Heat exchanger inspection for cracks",
      "Limit switch and pressure switch diagnosis",
      "Blower motor and capacitor service",
      "Inducer motor inspection",
      "Control board diagnosis",
      "Thermostat and wiring check",
      "Flue and venting inspection",
    ],
    signsYouNeedThis: [
      "Furnace clicks but doesn't ignite",
      "System runs briefly then shuts off (lockout mode)",
      "Blower runs but no heat is produced",
      "Error codes or fault lights on the furnace",
      "Burning smell from vents when heat runs",
      "Rooms aren't reaching the set temperature",
      "Furnace is making banging, rattling, or squealing sounds",
    ],
    processSteps: [
      {
        title: "Describe the Symptom",
        description:
          "Does the furnace not start at all? Start and shut off quickly? Run but not heat? The symptom pattern helps us narrow the diagnostic approach.",
      },
      {
        title: "Full Furnace Diagnostic",
        description:
          "We inspect the ignition sequence, gas system, heat exchanger, blower, and controls. For gas systems, we also check venting and combustion safety.",
      },
      {
        title: "Written Repair Estimate",
        description:
          "We explain what's wrong, what it takes to fix it, and the cost — before any work begins.",
      },
      {
        title: "Repair and Verification",
        description:
          "Repair completed. We run several heating cycles to confirm the issue is resolved and the system is operating safely.",
      },
    ],
    faqs: [
      {
        question: "Why does my furnace turn on but then shut off quickly?",
        answer:
          "A furnace that starts and then shuts off within 30–60 seconds is usually in lockout mode due to a failed igniter, dirty flame sensor, pressure switch issue, or a heat exchanger safety concern. The control board logs fault codes that help identify which it is.",
      },
      {
        question: "How dangerous is a cracked heat exchanger?",
        answer:
          "A cracked heat exchanger can allow combustion gases — including carbon monoxide — to mix with the air circulated through your home. This is a serious safety concern. If a cracked heat exchanger is found, we'll recommend either repair (if possible) or replacement of the system and explain your options clearly.",
      },
      {
        question: "Can I still use my furnace if only the AC side of my system is broken?",
        answer:
          "In a split system, the furnace air handler runs the fan and heating independently of the AC. A failed AC component generally doesn't prevent furnace operation, but have a technician confirm this before assuming it's safe to run in heat mode.",
      },
    ],
    relatedSlugs: ["furnace-installation", "heating-services", "furnace-maintenance"],
    ctaHeadline: "Furnace Down in Orange County? We Fix It Today.",
    ctaSubtext: "Same-day furnace repair available. Gas and electric systems serviced. Call (714) 410-2784.",
    category: "heating",
  },

  // ─── FURNACE INSTALLATION ─────────────────────────────────────────────────
  {
    slug: "furnace-installation",
    seoTitle: "Furnace Installation Orange County CA | New Furnace Install",
    metaDescription:
      "Furnace installation and replacement in Orange County, CA. Gas and electric furnace installation by trained HVAC technicians. Free quote. Call (714) 410-2784.",
    h1: "Furnace Installation in Orange County",
    primaryKeyword: "furnace installation Orange County",
    secondaryKeywords: [
      "new furnace installation Orange County",
      "furnace replacement Orange County CA",
      "gas furnace installation Yorba Linda",
    ],
    heroHeadline: "New Furnace Installed Correctly — Sized for Your Home",
    heroSubtext:
      "Furnace installations that use the wrong size, wrong efficiency rating, or skip load calculations cost homeowners more in utility bills and comfort problems for the life of the equipment. We do it right.",
    whatItIncludes: [
      "Heating load calculation for correct BTU sizing",
      "Furnace selection based on fuel type, efficiency, and home size",
      "Removal and disposal of existing furnace",
      "Installation of new furnace in existing or new location",
      "Gas line connection (if applicable) and pressure test",
      "Electrical connection and control wiring",
      "Flue and venting installation or modification",
      "Thermostat installation and programming",
      "System commissioning and combustion analysis",
      "Walkthrough of controls and filter maintenance",
    ],
    signsYouNeedThis: [
      "Furnace is 20+ years old and requiring frequent repairs",
      "Repair costs are approaching replacement cost",
      "Heating bills are significantly higher than comparable homes",
      "System can't maintain comfortable temperatures in winter",
      "You're building new construction or a room addition",
      "You're upgrading from a low-efficiency older unit to high-efficiency",
    ],
    processSteps: [
      {
        title: "In-Home Assessment",
        description:
          "We calculate your home's heating load, assess ductwork condition, and confirm fuel type and venting configuration before recommending any equipment.",
      },
      {
        title: "Equipment Selection",
        description:
          "We present options — 80% vs. 96% AFUE, single-stage vs. two-stage vs. variable — with installed pricing and expected efficiency differences for your usage.",
      },
      {
        title: "Installation Day",
        description:
          "Old furnace out, new furnace in. Gas, electrical, venting, and thermostat all connected. Typically completed in 4–6 hours.",
      },
      {
        title: "Commissioning and Safety Checks",
        description:
          "We run a combustion analysis, verify gas pressure, check heat rise across the system, and confirm all safety controls are functioning before signing off on the installation.",
      },
    ],
    faqs: [
      {
        question: "What AFUE rating should I choose for an Orange County furnace?",
        answer:
          "AFUE measures furnace efficiency — 80% means 80 cents of every dollar in gas goes to heat. In mild climates like Orange County's, where the furnace runs far fewer hours than in colder states, the payback on a 96% vs. 80% AFUE unit is longer. We'll run the numbers for your specific usage and tell you which efficiency tier makes financial sense.",
      },
      {
        question: "Do I need to upgrade my ductwork when I replace my furnace?",
        answer:
          "Not always. Existing ductwork that's in good condition and properly sized can work with a new furnace. However, if your ducts are leaking, undersized, or in poor condition, combining duct repairs with a new furnace installation maximizes efficiency and comfort.",
      },
      {
        question: "How long does furnace installation take?",
        answer:
          "A straightforward furnace replacement typically takes 4–6 hours. Projects that include venting modifications, duct repairs, or gas line work take longer. We give you a realistic timeline in the quote.",
      },
    ],
    relatedSlugs: ["furnace-repair", "furnace-maintenance", "heating-services", "heat-pump-installation"],
    ctaHeadline: "Need a New Furnace in Orange County?",
    ctaSubtext: "Free in-home assessment and written quote. We size it correctly and install it right.",
    category: "heating",
  },

  // ─── FURNACE MAINTENANCE ──────────────────────────────────────────────────
  {
    slug: "furnace-maintenance",
    seoTitle: "Furnace Maintenance Orange County CA | Fall Tune-Up",
    metaDescription:
      "Furnace maintenance and fall tune-up in Orange County, CA. Prevent heating failures, verify safety components, and extend system life. Call (714) 410-2784.",
    h1: "Furnace Maintenance in Orange County — Pre-Winter Tune-Up",
    primaryKeyword: "furnace maintenance Orange County",
    secondaryKeywords: [
      "furnace tune-up Orange County",
      "fall furnace service Orange County CA",
      "heating maintenance Yorba Linda",
    ],
    heroHeadline: "Maintain Your Furnace Before the First Cold Night",
    heroSubtext:
      "Orange County winters are short, but cold nights do happen. A furnace that sat idle all summer needs inspection before you rely on it — especially for safety components like igniters and heat exchangers.",
    whatItIncludes: [
      "Burner inspection and cleaning",
      "Igniter test and condition check",
      "Flame sensor cleaning",
      "Heat exchanger inspection",
      "Flue and venting inspection",
      "Gas valve and pressure check",
      "Blower motor and belt inspection",
      "Filter inspection and replacement",
      "Thermostat test in heat mode",
      "Safety control operation verification",
      "Written service report",
    ],
    signsYouNeedThis: [
      "Furnace hasn't run since last winter",
      "No maintenance on the system in over 12 months",
      "System is 10+ years old and has never had professional service",
      "You want safety verification before the heating season",
      "Manufacturer warranty requires documented annual maintenance",
    ],
    processSteps: [
      {
        title: "Schedule in Fall",
        description:
          "September through November is the ideal window for furnace maintenance — before the first cold snap when heating calls spike.",
      },
      {
        title: "Safety and Mechanical Inspection",
        description:
          "We focus first on safety — heat exchanger, gas system, combustion, and venting — then move to efficiency and mechanical components.",
      },
      {
        title: "Cleaning and Adjustment",
        description:
          "Burners cleaned, flame sensor serviced, blower inspected. Any components near end-of-life are flagged.",
      },
      {
        title: "Written Report",
        description:
          "What we inspected, what we found, and any recommendations. You decide what to address.",
      },
    ],
    faqs: [
      {
        question: "Do gas furnaces need annual maintenance?",
        answer:
          "Yes — especially for safety. The heat exchanger, combustion system, and venting need periodic inspection to ensure there's no risk of carbon monoxide entering living spaces. Efficiency components like igniters and flame sensors also have finite service lives.",
      },
      {
        question: "Can I do furnace maintenance myself?",
        answer:
          "Filter replacement is a homeowner task. But heat exchanger inspection, combustion analysis, gas pressure testing, and proper flame sensor service require professional tools and training. DIY attempts on gas components carry safety risks.",
      },
      {
        question: "When should I schedule furnace maintenance in Orange County?",
        answer:
          "Fall — September through November — is ideal. This gets your system inspected and ready before cold nights arrive and before heating service requests spike.",
      },
    ],
    relatedSlugs: ["furnace-repair", "furnace-installation", "residential-maintenance-plan"],
    ctaHeadline: "Schedule Your Pre-Winter Furnace Tune-Up",
    ctaSubtext: "Fall service slots fill up. Book before the first cold night catches you unprepared.",
    category: "maintenance",
  },

  // ─── COMMERCIAL HVAC ──────────────────────────────────────────────────────
  {
    slug: "commercial-hvac",
    seoTitle: "Commercial HVAC Orange County CA | Business HVAC Service",
    metaDescription:
      "Commercial HVAC service in Orange County, CA. Rooftop units, split systems, preventive maintenance contracts, and emergency repair for businesses. Call (714) 410-2784.",
    h1: "Commercial HVAC Service in Orange County",
    primaryKeyword: "commercial HVAC Orange County",
    secondaryKeywords: [
      "commercial HVAC service Orange County CA",
      "commercial AC repair Orange County",
      "business HVAC Orange County",
      "commercial HVAC Yorba Linda",
    ],
    heroHeadline: "Commercial HVAC That Doesn't Disrupt Your Business",
    heroSubtext:
      "A failed HVAC system affects your employees, your customers, and your product. We work around your schedule, respond to commercial emergencies fast, and offer maintenance programs that reduce reactive calls.",
    whatItIncludes: [
      "Rooftop unit (RTU) service, repair, and replacement",
      "Commercial split system installation and repair",
      "Packaged unit service and maintenance",
      "Multi-zone commercial system diagnosis",
      "Preventive maintenance contracts — monthly, quarterly, or semi-annual",
      "Emergency commercial HVAC repair",
      "Restaurant and food service HVAC",
      "Retail and office park service",
      "Written service documentation for compliance",
      "After-hours and weekend commercial service",
    ],
    signsYouNeedThis: [
      "Your commercial space isn't maintaining comfortable temperatures",
      "RTU running constantly without meeting thermostat setpoint",
      "Multiple tenant complaints about comfort in different zones",
      "You don't have an active maintenance contract and the system hasn't been serviced",
      "A scheduled inspection revealed deficiencies that need correction",
      "You're opening a new location and need HVAC evaluation",
    ],
    processSteps: [
      {
        title: "Commercial Site Assessment",
        description:
          "We visit your facility, assess the equipment inventory, review any service history, and identify the most pressing service needs.",
      },
      {
        title: "Service Plan or Repair Scope",
        description:
          "For maintenance contracts, we propose a service schedule and scope. For specific repairs, we provide a detailed written estimate.",
      },
      {
        title: "Scheduled Service",
        description:
          "We work around your business hours. After-hours and early morning scheduling is available for businesses that can't afford HVAC work during operating hours.",
      },
      {
        title: "Documented Service Record",
        description:
          "Every commercial service visit produces written documentation — what was inspected, what was done, and what was found. This is important for lease compliance and insurance requirements.",
      },
    ],
    faqs: [
      {
        question: "Do you offer commercial HVAC maintenance contracts in Orange County?",
        answer:
          "Yes. We offer quarterly, semi-annual, and custom maintenance programs for commercial properties. Contracts include priority scheduling for service calls and documented maintenance records.",
      },
      {
        question: "Can you service our commercial property after hours?",
        answer:
          "Yes. We offer after-hours scheduling for commercial customers who need HVAC work done outside business hours. Emergency commercial calls are handled regardless of time.",
      },
      {
        question: "What types of commercial HVAC equipment do you service?",
        answer:
          "We service rooftop units (RTUs), commercial split systems, packaged units, and commercial ductless systems. We cover brands used in Orange County commercial buildings — Carrier, Trane, Lennox, York, Daikin, and others.",
      },
      {
        question: "How quickly can you respond to a commercial HVAC emergency?",
        answer:
          "Commercial emergency response depends on current workload and location within our service area. We prioritize commercial calls from maintenance contract customers. Call us directly for the most accurate ETA.",
      },
    ],
    relatedSlugs: ["commercial-maintenance-plan", "ac-installation", "heating-services"],
    ctaHeadline: "Need Commercial HVAC Service in Orange County?",
    ctaSubtext: "We work around your business hours and document every service visit. Call for a commercial consultation.",
    category: "commercial",
  },

  // ─── COMMERCIAL MAINTENANCE PLAN ─────────────────────────────────────────
  {
    slug: "commercial-maintenance-plan",
    seoTitle: "Commercial HVAC Maintenance Plan Orange County | Service Contract",
    metaDescription:
      "Commercial HVAC maintenance contracts in Orange County, CA. Scheduled preventive service, priority response, and full documentation. Call (714) 410-2784.",
    h1: "Commercial HVAC Maintenance Plans in Orange County",
    primaryKeyword: "commercial HVAC maintenance contract Orange County",
    secondaryKeywords: [
      "commercial HVAC maintenance plan Orange County",
      "HVAC service contract Orange County",
      "commercial AC maintenance Orange County CA",
    ],
    heroHeadline: "Prevent Commercial HVAC Failures Before They Cost You",
    heroSubtext:
      "A maintenance contract means your equipment gets inspected on a schedule — not just when something breaks. We find the issues that cause expensive failures: refrigerant undercharge, dirty coils, worn contactors, and clogged drain lines.",
    whatItIncludes: [
      "Scheduled preventive maintenance visits (quarterly or semi-annual)",
      "Filter inspection and replacement at each visit",
      "Condenser and evaporator coil inspection and cleaning",
      "Electrical component inspection — contactors, capacitors, wiring",
      "Refrigerant pressure check at each service visit",
      "Drain pan and drain line inspection",
      "Thermostat and controls verification",
      "Blower and fan inspection",
      "Priority scheduling for service calls",
      "Written service documentation for every visit",
      "Year-end summary report of system condition",
    ],
    signsYouNeedThis: [
      "Your commercial HVAC has no current maintenance contract",
      "You've had repeated emergency repair calls in the past 12 months",
      "Your lease or building management requires documented HVAC maintenance",
      "You have tenants who rely on consistent comfort for their business",
      "You want to control HVAC costs with predictable maintenance spend",
    ],
    processSteps: [
      {
        title: "Facility Assessment",
        description:
          "We inventory your HVAC equipment, note current condition and service history, and recommend a maintenance frequency based on equipment age, usage intensity, and criticality.",
      },
      {
        title: "Contract Proposal",
        description:
          "Written proposal specifying what's covered, visit frequency, what's included in each visit, and pricing. No hidden exclusions.",
      },
      {
        title: "Scheduled Visits",
        description:
          "We show up on schedule. If we find something that needs repair, we provide an estimate — maintenance contract customers get priority scheduling and preferred pricing on repair work.",
      },
      {
        title: "Documentation",
        description:
          "Every visit produces a service report. We provide annual summaries that document your maintenance history — useful for lease renewals and insurance.",
      },
    ],
    faqs: [
      {
        question: "What's included in a commercial HVAC maintenance contract?",
        answer:
          "Our contracts include scheduled preventive maintenance visits, filter service, coil inspection and cleaning, electrical component inspection, refrigerant pressure checks, drain service, and priority scheduling for service calls. Specific inclusions are spelled out in the contract.",
      },
      {
        question: "How often should commercial HVAC be serviced?",
        answer:
          "Quarterly is ideal for most commercial facilities — each season. High-use facilities (restaurants, buildings with constant occupancy) often benefit from more frequent service. We recommend a frequency based on your specific equipment and usage.",
      },
      {
        question: "Does a maintenance contract cover repairs?",
        answer:
          "Our maintenance contracts cover the labor for scheduled preventive visits. Repairs discovered during maintenance visits are quoted separately. Contract customers receive priority scheduling and preferred pricing on repair work.",
      },
    ],
    relatedSlugs: ["commercial-hvac", "residential-maintenance-plan"],
    ctaHeadline: "Protect Your Commercial HVAC Investment",
    ctaSubtext: "Scheduled maintenance reduces emergency calls and extends equipment life. Call for a contract proposal.",
    category: "commercial",
  },

  // ─── AIR DUCT SERVICES ────────────────────────────────────────────────────
  {
    slug: "air-duct-services",
    seoTitle: "Air Duct Services Orange County CA | Duct Repair & Cleaning",
    metaDescription:
      "Air duct services in Orange County, CA — duct cleaning, duct repair, duct sealing, and new duct installation. Improve airflow and air quality. Call (714) 410-2784.",
    h1: "Air Duct Services in Orange County",
    primaryKeyword: "air duct services Orange County",
    secondaryKeywords: [
      "duct cleaning Orange County",
      "air duct repair Orange County",
      "ductwork services Orange County CA",
    ],
    heroHeadline: "Ductwork Problems Affect Every Room in Your Home",
    heroSubtext:
      "Leaky ducts, dirty ducts, and improperly designed ductwork reduce comfort, raise energy bills, and degrade indoor air quality. We diagnose duct problems and fix them at the source.",
    whatItIncludes: [
      "Air duct cleaning — removal of dust, debris, and biological growth",
      "Duct leak detection and sealing",
      "Duct repair — damaged, crushed, or disconnected sections",
      "New duct installation for additions and remodels",
      "Duct system flow testing",
      "Static pressure measurement",
      "Register and grille cleaning",
    ],
    signsYouNeedThis: [
      "Rooms in your home vary significantly in temperature",
      "Weak airflow from some vents despite a working AC system",
      "High energy bills despite regular AC maintenance",
      "Visible dust blowing from registers",
      "Musty or stale smell from vents when the system runs",
      "Home renovation or addition that requires new duct runs",
    ],
    processSteps: [
      {
        title: "Duct Assessment",
        description:
          "We inspect accessible ductwork, measure static pressure and airflow where needed, and identify leaks, restrictions, or contamination.",
      },
      {
        title: "Scope and Estimate",
        description:
          "Written estimate specifying what service is needed — cleaning, sealing, repair, or a combination — and what it will cost.",
      },
      {
        title: "Service Completed",
        description:
          "Ducts cleaned, sealed, or repaired as scoped. We verify improved airflow after sealing or repair work.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my ducts are leaking?",
        answer:
          "Signs of duct leakage include rooms that are hard to heat or cool despite the system running, high energy bills, and uneven comfort throughout the home. A duct leakage test with a blower door or duct blaster can quantify the leakage. We can assess this during a service visit.",
      },
      {
        question: "Should I get my ducts cleaned or sealed first?",
        answer:
          "It depends. If ductwork has significant leakage, sealing first makes more sense — cleaning leaky ducts means the system continues to lose conditioned air through gaps. We'll assess your situation and tell you which to prioritize.",
      },
    ],
    relatedSlugs: ["air-duct-cleaning", "ac-maintenance", "ac-repair"],
    ctaHeadline: "Duct Problems in Orange County? We Diagnose and Fix Them.",
    ctaSubtext: "From cleaning to repair and sealing — all duct services available. Call for an assessment.",
    category: "ductwork",
  },

  // ─── AIR DUCT CLEANING ────────────────────────────────────────────────────
  {
    slug: "air-duct-cleaning",
    seoTitle: "Air Duct Cleaning Orange County CA | Professional Duct Service",
    metaDescription:
      "Professional air duct cleaning in Orange County, CA. Remove dust, debris, allergens, and mold from HVAC ductwork. Improve air quality. Call (714) 410-2784.",
    h1: "Air Duct Cleaning in Orange County",
    primaryKeyword: "air duct cleaning Orange County",
    secondaryKeywords: [
      "duct cleaning Orange County CA",
      "air duct cleaning Yorba Linda",
      "HVAC duct cleaning Orange County",
    ],
    heroHeadline: "What's Actually Inside Your Ductwork?",
    heroSubtext:
      "Over years of operation, ductwork accumulates dust, pet dander, pollen, and in some cases mold or pest debris. We remove it with truck-mounted vacuum equipment and proper agitation — not just a brush pass.",
    whatItIncludes: [
      "Truck-mounted negative air pressure duct cleaning",
      "Agitation of duct walls to dislodge adhered debris",
      "Supply and return duct cleaning",
      "Register and grille removal and cleaning",
      "Air handler interior inspection and cleaning",
      "Blower compartment cleaning",
      "Evaporator coil face cleaning (if accessible)",
      "Before-and-after visual inspection",
      "Optional antimicrobial treatment for duct walls",
    ],
    signsYouNeedThis: [
      "Visible dust blowing from registers when the system runs",
      "Home was recently renovated (construction debris in ducts)",
      "Evidence of pest activity in the duct system",
      "Musty smell from vents — possible mold growth",
      "No duct cleaning in 5+ years",
      "Family members with allergies or respiratory conditions have worsened",
      "You moved into a home with unknown duct history",
    ],
    processSteps: [
      {
        title: "Pre-Cleaning Inspection",
        description:
          "We inspect accessible ductwork and the air handler before cleaning. This confirms whether cleaning is warranted and identifies any mold or structural issues.",
      },
      {
        title: "Negative Pressure Setup",
        description:
          "Truck-mounted vacuum creates negative pressure in the duct system. This pulls debris toward the collection point rather than redistributing it through the home.",
      },
      {
        title: "Agitation and Cleaning",
        description:
          "We work through each duct branch with agitation tools that dislodge debris from duct walls. Registers and grilles are removed and cleaned separately.",
      },
      {
        title: "Post-Cleaning Inspection",
        description:
          "We inspect ducts after cleaning and confirm debris has been removed. If mold is found during cleaning, we discuss treatment options.",
      },
    ],
    faqs: [
      {
        question: "Is air duct cleaning worth it?",
        answer:
          "It depends on your situation. After a renovation, after a pest infestation, or after visible mold growth, duct cleaning is clearly warranted. For a well-maintained home with no evidence of contamination, it's less urgent. We'll give you an honest assessment after inspecting your ductwork — we won't sell cleaning you don't need.",
      },
      {
        question: "How often should ducts be cleaned?",
        answer:
          "The EPA recommends cleaning when there is visible mold growth, evidence of pest infestation, or when ducts are clogged with excessive dust and debris causing particles to release into the home. For most homes, this is every 5–7 years at most — more frequently if you have pets, allergies, or the system is heavily used.",
      },
      {
        question: "Can duct cleaning help with allergies?",
        answer:
          "Removing allergen sources from the duct system can reduce the amount of dust, pet dander, and pollen that gets circulated through your home. However, duct cleaning is one piece of indoor air quality — high-quality filtration, humidity control, and regular filter changes are equally important.",
      },
      {
        question: "How long does duct cleaning take?",
        answer:
          "A typical residential duct cleaning takes 3–5 hours depending on system size, duct configuration, and how extensive the cleaning is. Larger homes and systems with many branches take longer.",
      },
    ],
    relatedSlugs: ["air-duct-services", "ac-maintenance", "ac-repair"],
    ctaHeadline: "Schedule Duct Cleaning in Orange County",
    ctaSubtext: "We assess first — cleaning only if it's warranted. Pre-cleaning inspection included. Call to schedule.",
    category: "ductwork",
  },

  // ─── RESIDENTIAL MAINTENANCE PLAN ────────────────────────────────────────
  {
    slug: "residential-maintenance-plan",
    seoTitle: "Residential HVAC Maintenance Plan Orange County | Tune-Up Program",
    metaDescription:
      "Residential HVAC maintenance plans in Orange County, CA. Scheduled seasonal service, priority response, and full system documentation. Call (714) 410-2784.",
    h1: "Residential HVAC Maintenance Plan in Orange County",
    primaryKeyword: "residential HVAC maintenance plan Orange County",
    secondaryKeywords: [
      "HVAC maintenance plan Orange County",
      "AC maintenance program Orange County CA",
      "home HVAC service plan Yorba Linda",
    ],
    heroHeadline: "Protect Your HVAC System All Year — One Plan Covers It",
    heroSubtext:
      "Our residential maintenance plan covers both your spring AC tune-up and your fall heating check in a single program. You get scheduled service, priority response when something goes wrong, and written records for your warranty.",
    whatItIncludes: [
      "Spring AC tune-up — full cooling system inspection and maintenance",
      "Fall heating tune-up — full heating system inspection and maintenance",
      "Priority scheduling for service calls (plan members go first)",
      "Filter reminder service",
      "Written service records for both visits",
      "Documentation for manufacturer warranty compliance",
      "Technician notes on anything to watch in the coming season",
    ],
    signsYouNeedThis: [
      "You've had an unexpected repair in the past and want to prevent the next one",
      "Your system is 5+ years old and has had inconsistent maintenance",
      "You want priority response when something goes wrong",
      "You need documented maintenance records for a home warranty or manufacturer warranty",
      "You want a single-call solution for all your seasonal HVAC service",
    ],
    processSteps: [
      {
        title: "Enrollment",
        description:
          "Call us or request enrollment online. We record your system information and schedule your first service visit.",
      },
      {
        title: "Spring Service Visit",
        description:
          "Full AC tune-up — coils, refrigerant, electrical, drain, thermostat, and airflow. Written report provided.",
      },
      {
        title: "Fall Service Visit",
        description:
          "Full heating tune-up — ignition, heat exchanger, gas system (if applicable), blower, and controls. Written report provided.",
      },
      {
        title: "Year-Round Priority Access",
        description:
          "When you have an issue between scheduled visits, you're scheduled ahead of non-plan customers. We treat plan members as our highest-priority service calls.",
      },
    ],
    faqs: [
      {
        question: "What's included in the residential maintenance plan?",
        answer:
          "Two full-system maintenance visits per year — one spring, one fall — covering both your cooling and heating systems. Plus priority scheduling for service calls, written service records, and filter reminders.",
      },
      {
        question: "Does the plan cover repairs?",
        answer:
          "The plan covers the labor for scheduled maintenance visits. Repairs discovered during maintenance are quoted separately. Plan members receive priority scheduling and preferred pricing on repair work.",
      },
      {
        question: "What if I only have AC and no heating system?",
        answer:
          "We customize the plan to your equipment. If you have a heat pump, we service both modes. If you only have a cooling system, we structure the plan around your actual equipment.",
      },
      {
        question: "How do I sign up?",
        answer:
          "Call us at (714) 410-2784 and ask about the residential maintenance plan. We'll take your system information, explain current pricing, and schedule your first service visit.",
      },
    ],
    relatedSlugs: ["ac-maintenance", "ac-tune-up", "furnace-maintenance", "commercial-maintenance-plan"],
    ctaHeadline: "Join Our Residential Maintenance Plan",
    ctaSubtext: "Two tune-ups per year, priority response, and written records. Call to ask about current pricing.",
    category: "maintenance",
  },
];

export function getServiceContent(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_CONTENT.map((s) => s.slug);
}
