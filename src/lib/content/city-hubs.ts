/**
 * Hand-written content for individual city hub pages (/service-areas/[county]/[city]).
 *
 * A hub listed here gets its own title, description, intro, service cards, content
 * sections, lead form and FAQs; every other hub keeps the template output from
 * `locations.ts`. Copy rules (Phase 2.3 P1): only facts that are on approved business
 * data (src/lib/config/site.ts) or an official public source linked in the copy. No
 * response times, stocked parts, brand claims, local job claims, reviews or statistics.
 *
 * Sources checked 2026-10-19:
 *   EPA HCFC-22 phaseout: https://www.epa.gov/ods-phaseout/residential-air-conditioning-and-phaseout-hcfc-22-what-you-need-know
 *   EPA Technology Transitions: https://www.epa.gov/hfcs/technology-transitions-program
 *   Yorba Linda permits: https://www.yorbalindaca.gov/477/Permit-Process
 *   Placentia Building and Safety: https://placentia.org/58/Building-and-Safety
 *   Costa Mesa Building Safety: https://www.costamesaca.gov/government/departments-and-divisions/economic-and-development-services/building-safety
 */

import { SITE } from "@/lib/config/site";

/** A run of text: plain strings, internal links ("/path") and external source links. */
export type HubText = (string | { href: string; label: string })[];

export type CityHubContent = {
  meta: { title: string; description: string };
  blurb: string;
  localContext: string;
  /** "What {City} residents call us for" cards, pointing at the city's own service pages. */
  serviceCards: { slug: string; href: string; label: string }[];
  sections: {
    heading: string;
    paragraphs: HubText[];
    /** Optional bulleted list shown after the paragraphs. */
    bullets?: HubText[];
    /** Optional paragraphs shown after the bullets. */
    afterBullets?: HubText[];
    /** Show the call and request-service buttons after the section. */
    cta?: boolean;
  }[];
  faqs: { question: string; answer: string }[];
  sidebarNote: string;
  formNote: string;
  ctaNote: string;
  /** Owner-supplied facts (see OWNER_CONTENT). Each block renders only when it has entries. */
  owner?: OwnerContent;
};

/**
 * Facts only the owner can supply. Nothing here may be written from templates or guesses:
 * every entry must come from the owner (job records, photos they took, their own statement).
 */
export type OwnerContent = {
  /** Completed jobs in the city. No customer names without written consent. */
  projects?: { month: string; system: string; problem: string; outcome: string }[];
  /** Photos from jobs in the city, stored under /public/uploads. */
  photos?: { src: string; alt: string; width: number; height: number }[];
  /** Neighbourhoods or tracts the owner confirms they serve. */
  neighborhoods?: string[];
  /** Typical arrival window from the Yorba Linda shop, in the owner's words. */
  arrivalWindow?: string;
};

const EPA_R22 = "https://www.epa.gov/ods-phaseout/residential-air-conditioning-and-phaseout-hcfc-22-what-you-need-know";
const EPA_TT = "https://www.epa.gov/hfcs/technology-transitions-program";

const REFRIGERANT_PARAGRAPH: HubText = [
  "If your system still runs on R-22, you can keep using it. The ",
  { href: EPA_R22, label: "EPA ended U.S. production and import of R-22" },
  " on January 1, 2020, so repairs that need refrigerant depend on reclaimed supply. New central air conditioners and heat pumps made since January 1, 2025 use lower-GWP refrigerants under the EPA's ",
  { href: EPA_TT, label: "Technology Transitions rules" },
  ".",
];

const EPA_TT_SECTOR = "https://www.epa.gov/hfcs/technology-transitions-hfc-restrictions-sector";
const EPA_R22_SCHEDULE = "https://www.epa.gov/ods-phaseout/phaseout-class-ii-ozone-depleting-substances";

/** Placentia and Costa Mesa wording (Phase 11A): does not suggest every R-22 system can be recharged or repaired. */
const REFRIGERANT_PARAGRAPH_PILOT: HubText = [
  "If your system still runs on R-22, you can keep using it. The ",
  { href: EPA_R22_SCHEDULE, label: "EPA ended U.S. production and import of R-22" },
  " on January 1, 2020, so whether a repair that needs refrigerant is practical depends on the condition of the system and the remaining supply of previously produced or reclaimed R-22. EPA rules are changing which refrigerants can be used in new air-conditioning and heat-pump equipment, and the requirements depend on the equipment type and on the applicable manufacturing or installation rules. See the EPA's ",
  { href: EPA_TT_SECTOR, label: "Technology Transitions guidance" },
  " for current details.",
];

const R22_FAQ_PILOT = {
  question: "My air conditioner uses R-22. Do I have to replace it?",
  answer:
    "No. The EPA ended U.S. production and import of R-22 on January 1, 2020, but you can keep using an existing R-22 system. Whether a repair that needs more refrigerant is practical depends on the system's condition and the remaining supply of previously produced or reclaimed R-22, so when a major part such as the compressor fails, it is worth comparing the repair quote with the cost of a new system.",
};

const R22_FAQ = {
  question: "My air conditioner uses R-22. Do I have to replace it?",
  answer:
    "No. The EPA ended U.S. production and import of R-22 on January 1, 2020, but you can keep using an existing R-22 system. Repairs that need more refrigerant depend on reclaimed R-22, so when a major part such as the compressor fails, it is worth comparing the repair quote with the cost of a new system.",
};

const SHARED = {
  sidebarNote:
    "We are open 24 hours a day, 7 days a week, including emergency service. Call us or send a request online.",
  formNote: "Tell us what is going on and where. We will contact you to schedule.",
};

export const CITY_HUBS: Record<string, CityHubContent> = {
  "orange-county/placentia": {
    meta: {
      title: "HVAC Repair & Service in Placentia, CA",
      description:
        "HVAC service in Placentia, CA: AC repair, furnace and heating repair, emergency help and replacement guidance. Call (714) 410-2784 or request service online.",
    },
    blurb: "Heating and air conditioning service for Placentia homes and businesses, from our base in neighboring Yorba Linda.",
    localContext:
      "We repair and maintain furnaces, heat pumps and central air conditioners in Placentia, and replace systems that have reached the end of their life. Start with the service you need below, or send a request and we will contact you to schedule.",
    serviceCards: [
      { slug: "ac-repair", href: "/air-conditioning/ac-repair/placentia", label: "AC Repair in Placentia" },
      { slug: "heating-repair", href: "/heating/heating-repair/placentia", label: "Heating Repair in Placentia" },
      { slug: "ac-tune-up", href: "/air-conditioning/ac-tune-up/placentia", label: "AC Tune-Up in Placentia" },
    ],
    sections: [
      {
        heading: "Which Service Do You Need in Placentia?",
        paragraphs: [
          ["Pick the situation that matches what you are seeing. Each link goes to a page with more detail."],
        ],
        bullets: [
          [
            "The AC runs but the house is not cooling: start with ",
            { href: "/air-conditioning/ac-repair/placentia", label: "AC repair in Placentia" },
            " or the ",
            { href: "/ac-not-cooling", label: "AC not cooling guide" },
            ".",
          ],
          [
            "No heat, or a furnace that will not stay lit: see ",
            { href: "/heating/heating-repair/placentia", label: "heating repair in Placentia" },
            ".",
          ],
          [
            "Heating and cooling are both affected, or you are not sure which system is at fault: start with ",
            { href: "/hvac-repair/placentia", label: "HVAC repair in Placentia" },
            ", and see the ",
            { href: "/hvac-repair", label: "HVAC repair overview" },
            " for how to tell which system is the problem.",
          ],
          [
            "The system has stopped completely: ",
            { href: "/air-conditioning/emergency-ac-repair/placentia", label: "emergency AC repair in Placentia" },
            ", or ",
            { href: "/emergency-hvac-service", label: "emergency HVAC service" },
            " for heating problems and safety hazards.",
          ],
          [
            "An older system keeps failing: compare repair and replacement with the ",
            { href: "/calculators/repair-vs-replace-calculator", label: "repair vs. replace calculator" },
            " and the guide to ",
            { href: "/air-conditioning/ac-installation", label: "AC installation and replacement" },
            ".",
          ],
        ],
        cta: true,
      },
      {
        heading: "AC Repair and Tune-Ups in Placentia",
        paragraphs: [
          [
            "These are common AC complaints. The checks below are low-risk for a homeowner; anything involving electrical parts, refrigerant or the inside of the unit is work for a technician.",
          ],
        ],
        bullets: [
          ["Blowing warm air: check that the thermostat is set to Cool and the filter is clean. Other causes include a dirty coil, a failed capacitor or contactor, or low refrigerant from a leak, and those need a technician."],
          ["Weak airflow: a clogged filter and closed or blocked vents are common first suspects. A failing blower motor, an iced coil or duct problems can also be the cause."],
          ["Will not turn on: check the thermostat settings and batteries. A clogged condensate drain can trip a safety switch that shuts the system off. If a breaker keeps tripping, leave it off, do not open the unit or any panel, and call for service."],
          ["Turning on and off every few minutes: restricted airflow, a dirty outdoor coil, a thermostat problem or a refrigerant charge problem can all cause short cycling."],
          ["Water leaking: turn the system off at the thermostat and keep the water away from electrical parts. A clogged condensate drain, or an iced coil that is melting, is a common cause."],
          ["Unusual noises: rattling can come from a loose panel or debris near the outdoor fan. Grinding or squealing can point to a worn motor or another failing part, so turn the system off and call."],
        ],
        afterBullets: [
          [
            "The ",
            { href: "/air-conditioning/ac-repair", label: "AC repair guide" },
            " covers each problem in more detail. A yearly ",
            { href: "/air-conditioning/ac-tune-up/placentia", label: "AC tune-up" },
            " before summer is a good time to catch worn capacitors, dirty coils and restricted airflow before they cause a breakdown.",
          ],
        ],
      },
      {
        heading: "Furnace and Heating Repair in Placentia",
        paragraphs: [
          [
            "We repair gas and electric furnaces and heat pumps. Signs that a heating system needs attention include no heat or weak airflow, a furnace that starts and stops repeatedly, and an ignition that will not stay lit. A burning smell is a reason to stop using the furnace and call for service; if the smell is strong or you see smoke, flames or sparks, leave the house and call 911.",
          ],
          [
            "See ",
            { href: "/heating/heating-repair/placentia", label: "heating repair in Placentia" },
            " for what a repair visit covers, or ",
            { href: "/heating/furnace-repair", label: "furnace repair" },
            " for gas and electric furnaces. Heat pump owners can start with ",
            { href: "/heat-pumps/heat-pump-repair", label: "heat pump repair" },
            ". If you smell gas, leave the house first and call your gas utility or 911 from outside.",
          ],
        ],
      },
      {
        heading: "Emergency or Breakdown? Know the Difference",
        paragraphs: [
          [
            "Most HVAC failures are uncomfortable rather than dangerous, but a few signs are safety hazards. HVAC service does not replace 911 or your gas utility: if there is immediate danger, get out and call them first, then call us.",
          ],
        ],
        bullets: [
          [
            "Gas smell: leave the house right away. From a safe place, call 911 and your gas utility; SoCalGas customers can reach SoCalGas at 1-800-427-2200 (",
            { href: "https://www.socalgas.com/safety/emergency-information/emergency-response", label: "SoCalGas emergency information" },
            ").",
          ],
          [
            "Carbon monoxide alarm sounding, or anyone with symptoms such as dizziness or nausea: leave the home right away and call 911 from outside (",
            { href: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/carbon-monoxide-poisoning.html", label: "American Red Cross carbon monoxide safety" },
            ").",
          ],
          [
            "Flames, heavy smoke or sparks from the equipment or its wiring: get out, stay out and call for help; do not go back inside to check on it (",
            { href: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire.html", label: "American Red Cross fire safety" },
            ").",
          ],
          [
            "A breaker that keeps tripping, or a burning or rubbery smell without smoke: leave the system off and call a qualified professional (",
            { href: "https://content.nfpa.org/-/media/project/storefront/catalog/files/home-fire-safety/electrical/electrical_safety_checklist.pdf", label: "NFPA electrical safety checklist" },
            ").",
          ],
        ],
        afterBullets: [
          [
            "If none of these apply but the system has stopped working, see ",
            { href: "/air-conditioning/emergency-ac-repair/placentia", label: "emergency AC repair in Placentia" },
            " or call us. We are open 24 hours a day, 7 days a week, including emergency service.",
          ],
        ],
        cta: true,
      },
      {
        heading: "Repair or Replace? AC and Furnace Replacement in Placentia",
        paragraphs: [
          [
            "Repair may be a practical option when the system is otherwise in good condition. Compare the repair cost, equipment age, system condition and expected remaining service life before deciding whether replacement makes more sense. A major component failure on an older system, repairs that keep recurring, or an R-22 system are reasons to get a replacement quote to compare, not an automatic answer.",
          ],
          [
            "A replacement system should be sized from a load calculation (ACCA Manual J) for your specific home, not from square footage alone, according to U.S. Department of Energy guidance (",
            { href: "https://www.energy.gov/sites/default/files/2021-08/ES-HomeHeatingandCooling_081221.pdf", label: "DOE heating and cooling guide" },
            "). Our ",
            { href: "/air-conditioning/ac-installation", label: "questions to ask about any replacement quote" },
            " help you compare contractors, and the ",
            { href: "/calculators/ac-size-calculator", label: "AC size calculator" },
            " gives only a rough idea.",
          ],
          [
            "Placentia's ",
            { href: "https://placentia.org/58/Building-and-Safety", label: "Building and Safety Division" },
            " handles mechanical permits, the permit type that covers HVAC equipment, and you can look up permits already issued for a property through the city's online records. For questions about a specific project, the division's number is (714) 993-8124.",
          ],
          REFRIGERANT_PARAGRAPH_PILOT,
          [
            "The ",
            { href: "/heating/furnace-installation", label: "furnace installation" },
            " page explains what a furnace replacement involves.",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "Do you repair furnaces and heating systems in Placentia?",
        answer:
          "Yes. We repair gas and electric furnaces and heat pumps in Placentia. Call (714) 410-2784 or send a request online, and see our Placentia heating repair page for what a repair visit covers.",
      },
      {
        question: "Do you repair air conditioning in Placentia?",
        answer:
          "Yes. We diagnose and repair central air conditioners and heat pumps in Placentia. Our Placentia AC repair page covers common problems, and the emergency AC repair page lists what to do if your system stops completely.",
      },
      {
        question: "Do I need a permit to replace my AC or furnace in Placentia?",
        answer:
          "Placentia's Building and Safety Division handles mechanical permits, which cover HVAC equipment. Ask your contractor whether your replacement needs one, or call the division at (714) 993-8124.",
      },
      R22_FAQ_PILOT,
      {
        question: "Do you work on heat pumps and ductless mini-splits?",
        answer:
          "Yes. We repair and install heat pumps and ductless mini-split systems as well as central air conditioners and furnaces.",
      },
      {
        question: "Do you offer emergency HVAC service in Placentia?",
        answer: `Yes. We are open 24 hours a day, 7 days a week, and same-day service is available in Placentia. ${SITE.emergencyArrivalOC}`,
      },
      {
        question: "Why is my AC blowing warm air?",
        answer:
          "Common causes are a thermostat not set to Cool, a dirty filter or coil, a tripped breaker, a failed capacitor or contactor, or low refrigerant from a leak. Check the thermostat and filter first. If it still blows warm air, call for service, since refrigerant and electrical parts need a technician.",
      },
      {
        question: "How do I know if my HVAC problem is an emergency?",
        answer:
          "If there are flames, smoke, sparks, a gas smell or a carbon monoxide alarm, leave the home and call 911 from a safe place (for gas, also your gas utility). Those are safety hazards, not service calls. If the system has stopped working without any of those signs, call us at (714) 410-2784. We are open 24 hours a day, 7 days a week.",
      },
      {
        question: "Should I repair or replace my air conditioner?",
        answer:
          "Repair may be a practical option when the system is otherwise in good condition. Compare the repair cost, equipment age, system condition and expected remaining service life before deciding whether replacement makes more sense. A major component failure on an older system, repairs that keep recurring, or an R-22 system are reasons to get a replacement quote to compare, not an automatic answer. A technician can explain the options for your system.",
      },
      {
        question: "How do I schedule HVAC service in Placentia?",
        answer:
          "Call (714) 410-2784 or fill in the request form on this page with your name, phone number, the service you need and your address. We will contact you to schedule a visit.",
      },
    ],
    ...SHARED,
    ctaNote: "Call us or send a request online. We're based in neighboring Yorba Linda.",
  },

  "orange-county/costa-mesa": {
    meta: {
      title: "HVAC Repair & Service in Costa Mesa, CA",
      description:
        "HVAC service in Costa Mesa, CA: AC and furnace repair, heat pump and ductless guidance, maintenance and replacement help. Call (714) 410-2784 or request service online.",
    },
    blurb: "Heating and air conditioning service for Costa Mesa homes and businesses: repairs, maintenance and new system installation.",
    localContext:
      "We repair and maintain furnaces, heat pumps and central air conditioners in Costa Mesa, and install replacements. Start with the system or problem that matches yours below, or send a request and we will contact you to schedule.",
    serviceCards: [
      { slug: "heating-repair", href: "/heating/heating-repair/costa-mesa", label: "Heating Repair in Costa Mesa" },
      { slug: "ac-repair", href: "/air-conditioning/ac-repair/costa-mesa", label: "AC Repair in Costa Mesa" },
      { slug: "ac-tune-up", href: "/air-conditioning/ac-tune-up/costa-mesa", label: "AC Tune-Up in Costa Mesa" },
    ],
    sections: [
      {
        heading: "Heating, Cooling or Both? Know Your System",
        paragraphs: [
          ["Knowing which kind of system you have makes it easier to describe a problem and find the right page. Here are three common heating and cooling system configurations."],
        ],
        bullets: [
          [
            "Central AC with a furnace: an outdoor condenser cools, a furnace or air handler heats, and both share the same blower and ducts. Cooling problems start with ",
            { href: "/air-conditioning/ac-repair/costa-mesa", label: "AC repair in Costa Mesa" },
            "; no-heat problems start with ",
            { href: "/heating/heating-repair/costa-mesa", label: "heating repair in Costa Mesa" },
            ".",
          ],
          [
            "Heat pump: one system that heats and cools. The U.S. Department of Energy explains that heat pumps move heat from the outdoors into the home in cold seasons and from the home to the outdoors in warm seasons (",
            { href: "https://www.energy.gov/articles/pump-your-savings-heat-pumps", label: "DOE heat pump overview" },
            "). Problems in either season start with ",
            { href: "/heat-pumps/heat-pump-repair", label: "heat pump repair" },
            ".",
          ],
          [
            "Ductless mini-split: an air-source heat pump that can serve a home or addition without ducts, according to DOE. See the ",
            { href: "/ductless/ductless-mini-split", label: "ductless mini-split overview" },
            " or ",
            { href: "/ductless/mini-split-installation", label: "mini-split installation" },
            ".",
          ],
        ],
        afterBullets: [
          [
            "If heating and cooling are both affected, or you are not sure which applies, ",
            { href: "/hvac-repair/costa-mesa", label: "HVAC repair in Costa Mesa" },
            " is the place to start.",
          ],
        ],
      },
      {
        heading: "Furnace and Heating Repair in Costa Mesa",
        paragraphs: [
          [
            "We repair gas furnaces, electric furnaces and heat pumps in heating mode. Warning signs include little or no heat, weak airflow from the vents, a furnace that shuts off soon after starting, or a burner that will not light. A burning smell is a reason to stop using the furnace and call for service; if the smell is strong or you see smoke, flames or sparks, leave the house and call 911.",
          ],
          [
            "The ",
            { href: "/heating/furnace-repair", label: "furnace repair guide" },
            " explains how gas and electric furnaces fail and what a diagnosis involves. If you smell gas, leave the house first and call your gas utility or 911 from outside.",
          ],
        ],
      },
      {
        heading: "HVAC Maintenance to Help Reduce Breakdowns",
        paragraphs: [
          [
            "Routine care can help catch small problems before they stop the system, although no maintenance schedule can rule out a failure. The U.S. Department of Energy advises cleaning or replacing filters monthly during seasons of peak use, and checking the evaporator coil every year and cleaning it as necessary (",
            { href: "https://www.energy.gov/sites/default/files/2021-08/ES-HomeHeatingandCooling_081221.pdf", label: "DOE heating and cooling guide" },
            "; ",
            { href: "https://www.energy.gov/sites/default/files/2016/11/f34/HomeCooling101.pdf", label: "DOE home cooling guide" },
            ").",
          ],
          [
            "Keep leaves, grass and other debris away from the outdoor unit, and look at it from time to time for visible buildup or damage. A yearly ",
            { href: "/air-conditioning/ac-tune-up/costa-mesa", label: "AC tune-up in Costa Mesa" },
            " includes cleaning and inspecting the outdoor coil, and a ",
            { href: "/maintenance-plans", label: "maintenance plan" },
            " keeps those visits on schedule.",
          ],
          [
            "Equipment makers add a few steps for homes near the coast. Carrier notes that salt and other airborne contaminants can build up on outdoor components, and advises periodically inspecting the outdoor coil and cabinet for buildup or corrosion (",
            { href: "https://www.carrier.com/us/en/residential/hvac-resources/coastal-heating-and-air/", label: "Carrier coastal guidance" },
            "). One Lennox service manual says coils in coastal areas should be cleaned with potable water several times a year (",
            { href: "https://www.lennox.com/dA/59d64ade9d/507167-03.pdf", label: "Lennox service manual" },
            "). How much this matters depends on your equipment and how exposed your home is, so ask your technician what is right for your system.",
          ],
        ],
      },
      {
        heading: "When to Consider Replacing Your System",
        paragraphs: [
          [
            "Repair and replacement are rarely decided by one factor. The U.S. Department of Energy says to consider replacing heating and cooling equipment if any of these are true (",
            { href: "https://www.energy.gov/sites/default/files/2022-08/energy-saver-guide-2022.pdf", label: "DOE Energy Saver guide" },
            "):",
          ],
        ],
        bullets: [
          ["The heat pump or air conditioner is more than 10 years old."],
          ["The furnace or boiler is more than 15 years old."],
          ["The equipment needs frequent repairs and energy bills are going up."],
          ["Some rooms in the home are too hot or too cold."],
        ],
        afterBullets: [
          [
            "These are reasons to compare a replacement quote with the repair quote, not an automatic answer. DOE adds that your contractor should explain the safety and cost-effectiveness of repair versus replacement and the system options available. Our ",
            { href: "/air-conditioning/ac-installation", label: "guide to AC replacement quotes" },
            " covers sizing and the questions worth asking.",
          ],
        ],
      },
      {
        heading: "AC and HVAC Installation in Costa Mesa",
        paragraphs: [
          [
            "We install central air conditioners, furnaces, heat pumps and ductless mini-splits. Start with ",
            { href: "/air-conditioning/ac-installation", label: "AC installation" },
            ", ",
            { href: "/heating/furnace-installation", label: "furnace installation" },
            " or ",
            { href: "/heat-pumps/heat-pump-installation", label: "heat pump installation" },
            ". For a home or room addition without ductwork, a ",
            { href: "/ductless/mini-split-installation", label: "ductless mini-split" },
            " avoids running new ducts.",
          ],
          [
            "In Costa Mesa, HVAC replacements are permitted as mechanical work through the city's ",
            {
              href: "https://www.costamesaca.gov/government/departments-and-divisions/economic-and-development-services/building-safety",
              label: "Building Safety Division",
            },
            ", which takes permit applications online.",
          ],
          REFRIGERANT_PARAGRAPH_PILOT,
        ],
      },
      {
        heading: "What to Have Ready When You Call",
        paragraphs: [
          ["A few details help narrow down the problem on the first call."],
        ],
        bullets: [
          ["What the system is doing, when it started, and whether heating, cooling or both are affected."],
          ["The make, model and age from the data plate on the outdoor unit or furnace, or a photo of it."],
          ["Whether you have a heat pump, a furnace with a separate AC, or a ductless system."],
          ["What you have already checked, such as the thermostat setting and batteries and the air filter."],
          ["Any blinking lights, error codes, unusual noises or smells."],
          ["Access details, such as gate or parking instructions and who will be home."],
        ],
        cta: true,
      },
      {
        heading: "Emergency or Routine Service?",
        paragraphs: [
          [
            "Routine service can be scheduled: weak cooling or heating, a noisy blower, or a maintenance visit. A system that has stopped completely, with no sign of danger, is urgent. Call us, and see ",
            { href: "/air-conditioning/emergency-ac-repair/costa-mesa", label: "emergency AC repair in Costa Mesa" },
            " or ",
            { href: "/emergency-hvac-service", label: "emergency HVAC service" },
            ". We are open 24 hours a day, 7 days a week, including emergency service.",
          ],
          [
            "Some situations are safety hazards, not service calls. If you smell gas, see flames, smoke or sparks, or a carbon monoxide alarm sounds, leave the home and call 911 from a safe place; for gas, also call your gas utility (",
            { href: "https://www.socalgas.com/safety/emergency-information/emergency-response", label: "SoCalGas emergency information" },
            "; ",
            { href: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/carbon-monoxide-poisoning.html", label: "American Red Cross carbon monoxide safety" },
            "). HVAC service does not replace 911 or your gas utility.",
          ],
        ],
        cta: true,
      },
    ],
    faqs: [
      {
        question: "Do you repair furnaces and heating systems in Costa Mesa?",
        answer:
          "Yes. We repair gas and electric furnaces and heat pumps in Costa Mesa. Call (714) 410-2784 or send a request online, and see our Costa Mesa heating repair page for what a repair visit covers.",
      },
      {
        question: "Do you install new AC and HVAC systems in Costa Mesa?",
        answer:
          "Yes. We install central air conditioners, furnaces, heat pumps and ductless mini-split systems. Our AC installation page explains what a replacement involves.",
      },
      {
        question: "Does replacing an AC or furnace in Costa Mesa need a permit?",
        answer:
          "HVAC replacements in Costa Mesa are permitted as mechanical work through the city's Building Safety Division, which takes applications online. Ask your contractor to confirm the permit for your job.",
      },
      {
        question: "Can coastal air affect my AC system?",
        answer:
          "Equipment makers say salt and other airborne contaminants can build up on outdoor components in coastal areas, and they recommend periodically inspecting the outdoor coil and cabinet for buildup or corrosion. How much it matters depends on your equipment and how exposed your home is, so ask your technician what is right for your system.",
      },
      R22_FAQ_PILOT,
      {
        question: "Do you offer emergency HVAC service in Costa Mesa?",
        answer: `Yes. We are open 24 hours a day, 7 days a week, and same-day service is available in Costa Mesa. ${SITE.emergencyArrivalOC}`,
      },
      {
        question: "What is the difference between a heat pump and an AC with a furnace?",
        answer:
          "A heat pump is one system that heats and cools by moving heat: from the outdoors into the home in cold seasons and from the home to the outdoors in warm seasons, according to the U.S. Department of Energy. A central AC cools and a furnace heats, and they usually share the same ducts and blower. Which one you have decides which repair page to start with.",
      },
      {
        question: "How often should I change my air filter?",
        answer:
          "Follow the filter maker's guidance. The U.S. Department of Energy advises cleaning or replacing filters monthly during seasons of peak use, because clean filters help the system run efficiently and last longer.",
      },
      {
        question: "When should I consider replacing my AC or furnace?",
        answer:
          "The U.S. Department of Energy says to consider replacement if a heat pump or air conditioner is more than 10 years old, a furnace or boiler is more than 15 years old, the equipment needs frequent repairs while energy bills rise, or some rooms are too hot or too cold. Treat these as reasons to compare quotes, not an automatic answer.",
      },
      {
        question: "Can a Costa Mesa home without ducts get air conditioning?",
        answer:
          "Yes. Ductless mini-split heat pumps can be installed in homes or additions without ducts, according to the U.S. Department of Energy, and they can heat and cool individual rooms.",
      },
    ],
    ...SHARED,
    ctaNote: "Call us or send a request online for HVAC service anywhere in Costa Mesa.",
  },

  "orange-county/yorba-linda": {
    meta: {
      title: "Yorba Linda HVAC: Furnace & AC Service",
      description:
        "Heating and air conditioning from our shop on Yorba Linda Blvd: furnace and heating repair, AC service, tune-ups and replacements. Call (714) 410-2784.",
    },
    blurb: "Heating and air conditioning service for Yorba Linda homes and businesses, from our shop at 18340 Yorba Linda Blvd.",
    localContext:
      "We repair and maintain furnaces, heat pumps and central air conditioners across Yorba Linda, and replace systems that have reached the end of their life. Choose a service below, or send a request and we will contact you to schedule.",
    serviceCards: [
      { slug: "heating-repair", href: "/heating/heating-repair/yorba-linda", label: "Heating Repair in Yorba Linda" },
      { slug: "ac-repair", href: "/air-conditioning/ac-repair/yorba-linda", label: "AC Repair in Yorba Linda" },
      { slug: "ac-tune-up", href: "/air-conditioning/ac-tune-up/yorba-linda", label: "AC Tune-Up in Yorba Linda" },
    ],
    sections: [
      {
        heading: "Furnace and Heating Repair in Yorba Linda",
        paragraphs: [
          [
            "We repair gas and electric furnaces and heat pumps. Signs that a heating system needs attention include no heat or weak airflow, a furnace that starts and stops repeatedly, a burning smell that lasts beyond the first run of the season, and an ignition that will not stay lit.",
          ],
          [
            "See ",
            { href: "/heating/heating-repair/yorba-linda", label: "heating repair in Yorba Linda" },
            " for what a repair visit covers, or ",
            { href: "/heating/furnace-repair", label: "furnace repair" },
            " for gas and electric furnaces. If you smell gas, leave the house first and call your gas utility or 911 from outside.",
          ],
        ],
      },
      {
        heading: "Air Conditioning Service in Yorba Linda",
        paragraphs: [
          [
            "For an AC that runs but does not cool, cycles on and off, or leaks water indoors, start with ",
            { href: "/air-conditioning/ac-repair/yorba-linda", label: "AC repair in Yorba Linda" },
            ". If it has stopped completely, ",
            { href: "/air-conditioning/emergency-ac-repair/yorba-linda", label: "emergency AC repair in Yorba Linda" },
            " lists what to do while you wait for a technician. A yearly ",
            { href: "/air-conditioning/ac-tune-up/yorba-linda", label: "AC tune-up" },
            " before summer helps catch worn parts before they fail.",
          ],
        ],
      },
      {
        heading: "Replacing an AC or Furnace in Yorba Linda",
        paragraphs: [
          [
            "The City of Yorba Linda ",
            { href: "https://www.yorbalindaca.gov/477/Permit-Process", label: "requires permits" },
            " for heating, ventilating and air-conditioning systems, issued by the Building Department as mechanical permits. If you live in a community with a homeowners association, check its rules on outdoor equipment before a replacement.",
          ],
          REFRIGERANT_PARAGRAPH,
          [
            "Our ",
            { href: "/air-conditioning/ac-installation", label: "AC installation" },
            " and ",
            { href: "/heating/furnace-installation", label: "furnace installation" },
            " pages explain what a replacement involves.",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "Where is your shop in Yorba Linda?",
        answer: "Our shop is at 18340 Yorba Linda Blvd #107, Yorba Linda, CA 92886. Call (714) 410-2784 to schedule service.",
      },
      {
        question: "Do you repair furnaces and heating systems in Yorba Linda?",
        answer:
          "Yes. We repair gas and electric furnaces and heat pumps in Yorba Linda. See our Yorba Linda heating repair page for what a repair visit covers.",
      },
      {
        question: "Do I need a permit to replace my AC or furnace in Yorba Linda?",
        answer:
          "Yes. The City of Yorba Linda requires permits for heating, ventilating and air-conditioning systems, issued by the Building Department as mechanical permits. If you live in an HOA community, check its rules on outdoor equipment as well.",
      },
      R22_FAQ,
      {
        question: "Do you work on heat pumps and ductless mini-splits?",
        answer:
          "Yes. We repair and install heat pumps and ductless mini-split systems as well as central air conditioners and furnaces.",
      },
      {
        question: "Do you offer emergency HVAC service in Yorba Linda?",
        answer: `Yes. We are open 24 hours a day, 7 days a week, and same-day service is available in Yorba Linda. ${SITE.emergencyArrivalOC}`,
      },
      {
        question: "How do I schedule HVAC service in Yorba Linda?",
        answer:
          "Call (714) 410-2784 or fill in the request form on this page with your name, phone number, the service you need and your address. We will contact you to schedule a visit.",
      },
    ],
    ...SHARED,
    ctaNote: "Call us or send a request online. Our shop is on Yorba Linda Blvd.",
  },
};

// ─── Generated hubs (Phase 2.3 P4) ────────────────────────────────────────────
//
// The remaining 34 hubs share one structure built from facts we can verify:
// the city's name, its own service pages, the owner-confirmed 24/7 emergency and
// same-day service, the EPA refrigerant sources above, and the office that issues
// HVAC (mechanical) permits for the address, linked to its official page. A hub
// listed with `permit: null` simply leaves the permit paragraph out.
//
// Permit URLs were checked on 2026-10-20 (HTTP 200, official building/permit page).
// Still null: the site blocked the check (403), the URL redirected to a home page
// or PDF, or the office for the address is unconfirmed (Anaheim Hills follows Anaheim).

export type PermitOffice = { office: string; url: string };

type HubFacts = {
  city: string;
  /** Short title prefix override, e.g. "Orange, CA" where the bare name is ambiguous. */
  titleName?: string;
  permit: PermitOffice | null;
};

const HUB_FACTS: Record<string, HubFacts> = {
  "los-angeles-county/diamond-bar": { city: "Diamond Bar", permit: { office: "City of Diamond Bar Building and Safety", url: "https://www.diamondbarca.gov/1282/Building-and-Safety" } },
  "los-angeles-county/hacienda-heights": { city: "Hacienda Heights", permit: { office: "Los Angeles County Building and Safety", url: "https://pw.lacounty.gov/building-and-safety/about" } },
  "los-angeles-county/la-habra-heights": { city: "La Habra Heights", permit: null },
  "los-angeles-county/rowland-heights": { city: "Rowland Heights", permit: { office: "Los Angeles County Building and Safety", url: "https://pw.lacounty.gov/building-and-safety/about" } },
  "los-angeles-county/walnut": { city: "Walnut", permit: null },
  "orange-county/aliso-viejo": { city: "Aliso Viejo", permit: null },
  "orange-county/anaheim": { city: "Anaheim", permit: null },
  "orange-county/anaheim-hills": { city: "Anaheim Hills", permit: null },
  "orange-county/brea": { city: "Brea", permit: null },
  "orange-county/fullerton": { city: "Fullerton", permit: null },
  "orange-county/garden-grove": { city: "Garden Grove", permit: { office: "City of Garden Grove Building and Safety", url: "https://ggcity.org/building-and-safety" } },
  "orange-county/huntington-beach": { city: "Huntington Beach", permit: { office: "City of Huntington Beach Building and Inspections", url: "https://huntingtonbeachca.gov/departments/community_development/building_inspection/index.php" } },
  "orange-county/irvine": { city: "Irvine", permit: null },
  "orange-county/laguna-niguel": { city: "Laguna Niguel", permit: { office: "City of Laguna Niguel Building and Safety", url: "https://cityoflagunaniguel.org/113/Building-Safety" } },
  "orange-county/lake-forest": { city: "Lake Forest", permit: null },
  "orange-county/mission-viejo": { city: "Mission Viejo", permit: { office: "City of Mission Viejo Building Services", url: "https://www.missionviejo.gov/departments/community-development/building-services" } },
  "orange-county/newport-beach": { city: "Newport Beach", permit: { office: "City of Newport Beach Building Division", url: "https://www.newportbeachca.gov/government/departments/community-development/building-division" } },
  "orange-county/orange": { city: "Orange", titleName: "Orange, CA", permit: null },
  "orange-county/san-clemente": { city: "San Clemente", permit: { office: "City of San Clemente Building Services", url: "https://www.sanclemente.gov/248/Building-Services" } },
  "orange-county/santa-ana": { city: "Santa Ana", permit: { office: "City of Santa Ana Building Safety Division", url: "https://santa-ana.gov/departments/building-division/" } },
  "orange-county/tustin": { city: "Tustin", permit: { office: "City of Tustin Building Division", url: "https://www.tustinca.org/153/Building" } },
  "orange-county/villa-park": { city: "Villa Park", permit: { office: "City of Villa Park Building and Safety", url: "https://villapark.org/Departments/Building-and-Safety" } },
  "orange-county/westminster": { city: "Westminster", permit: null },
  "riverside-county/corona": { city: "Corona", permit: { office: "City of Corona Building Division", url: "https://www.coronaca.gov/departments/building-division" } },
  "riverside-county/eastvale": { city: "Eastvale", permit: null },
  "riverside-county/norco": { city: "Norco", permit: null },
  "san-bernardino-county/chino": { city: "Chino", permit: { office: "City of Chino Building Division", url: "https://www.cityofchino.org/178/Building" } },
  "san-bernardino-county/chino-hills": { city: "Chino Hills", permit: { office: "City of Chino Hills Building and Safety", url: "https://www.chinohills.org/122/Building-Safety" } },
  "san-bernardino-county/ontario": { city: "Ontario", titleName: "Ontario, CA", permit: { office: "City of Ontario Building Department", url: "https://www.ontarioca.gov/government/community-development/building" } },
  "santa-barbara-county/goleta": { city: "Goleta", permit: null },
  "santa-barbara-county/santa-barbara": { city: "Santa Barbara", permit: { office: "City of Santa Barbara Building and Safety", url: "https://santabarbaraca.gov/building-safety" } },
  "ventura-county/moorpark": { city: "Moorpark", permit: { office: "City of Moorpark Building and Safety", url: "https://www.moorparkca.gov/164/Building-Safety" } },
  "ventura-county/simi-valley": { city: "Simi Valley", permit: null },
  "ventura-county/thousand-oaks": { city: "Thousand Oaks", permit: { office: "City of Thousand Oaks Building Division", url: "https://www.toaks.gov/building" } },
};

const BRAND_SUFFIX_LENGTH = " | HVAC Service & AC Repair".length;

/** The longest of these that keeps the rendered title (with the brand suffix) within 65 characters. */
function hubTitle(name: string): string {
  const options = [`${name} HVAC: Furnace & AC Service`, `${name} Heating & AC Service`, `${name} HVAC Service`];
  return options.find((t) => t.length + BRAND_SUFFIX_LENGTH <= 65) ?? options[options.length - 1];
}

/** The longest of these that stays within 160 characters. */
function hubDescription(city: string): string {
  const options = [
    `HVAC service in ${city}, CA: furnace and heating repair, AC repair, tune-ups and replacement. Open 24/7, same-day service available. Call (714) 410-2784.`,
    `HVAC service in ${city}, CA: heating and AC repair, tune-ups and replacement. Open 24/7, same-day service available. Call (714) 410-2784.`,
  ];
  return options.find((d) => d.length <= 160) ?? options[options.length - 1];
}

function buildHub(countySlug: string, slug: string, f: HubFacts): CityHubContent {
  const c = f.city;
  const arrival =
    countySlug === "orange-county"
      ? SITE.emergencyArrivalOC
      : "Arrival times depend on our schedule and your location, and we will give you an estimate when you call.";
  const acRepair = `/air-conditioning/ac-repair/${slug}`;
  const emergency = `/air-conditioning/emergency-ac-repair/${slug}`;
  const tuneUp = `/air-conditioning/ac-tune-up/${slug}`;
  const heating = `/heating/heating-repair/${slug}`;
  const hvacRepair = `/hvac-repair/${slug}`;

  const replacement: HubText[] = [];
  if (f.permit) {
    replacement.push([
      `In ${c}, permits for replacing heating and air conditioning equipment come from the `,
      { href: f.permit.url, label: f.permit.office },
      ". Ask your contractor whether your project needs one; a permitted replacement is inspected after installation.",
    ]);
  }
  replacement.push(REFRIGERANT_PARAGRAPH, [
    "Our ",
    { href: "/air-conditioning/ac-installation", label: "AC installation" },
    " and ",
    { href: "/heating/furnace-installation", label: "furnace installation" },
    " pages explain what a replacement involves.",
  ]);

  const permitFaq = f.permit
    ? {
        question: `Do I need a permit to replace my AC or furnace in ${c}?`,
        answer: `HVAC equipment replacements are permitted through the ${f.permit.office}. Ask your contractor whether your project needs a permit, or contact that office directly.`,
      }
    : {
        question: `Do you replace air conditioners and furnaces in ${c}?`,
        answer: `Yes. We replace central air conditioners, heat pumps and furnaces in ${c}, and we give you a written estimate before any work starts.`,
      };

  return {
    meta: { title: hubTitle(f.titleName ?? c), description: hubDescription(c) },
    blurb: `Heating and air conditioning service for ${c} homes and businesses, open 24/7 with same-day service available.`,
    localContext: `We repair and maintain furnaces, heat pumps and central air conditioners in ${c}, and replace systems that have reached the end of their life. Start with the service you need below, or send a request and we will contact you to schedule.`,
    serviceCards: [
      { slug: "ac-repair", href: acRepair, label: `AC Repair in ${c}` },
      { slug: "heating-repair", href: heating, label: `Heating Repair in ${c}` },
      { slug: "ac-tune-up", href: tuneUp, label: `AC Tune-Up in ${c}` },
    ],
    sections: [
      {
        heading: `Furnace and Heating Repair in ${c}`,
        paragraphs: [
          [
            "We repair gas and electric furnaces and heat pumps. Signs that a heating system needs attention include no heat or weak airflow, a furnace that starts and stops repeatedly, a burning smell that lasts beyond the first run of the season, and an ignition that will not stay lit.",
          ],
          [
            "See ",
            { href: heating, label: `heating repair in ${c}` },
            " for what a repair visit covers.",
            // Phase 10: OC hubs point to the furnace guide (furnace queries in GSC; the guide had few contextual links).
            ...(countySlug === "orange-county"
              ? [" Our ", { href: "/heating/furnace-repair", label: "furnace repair guide" }, " explains common failures and how a diagnosis works."]
              : []),
            " If you smell gas, leave the house first and call your gas utility or 911 from outside.",
          ],
        ],
      },
      {
        heading: `Air Conditioning Repair and Tune-Ups in ${c}`,
        paragraphs: [
          [
            "If your AC runs but does not cool, keeps cycling on and off, or is leaking water indoors, start with ",
            { href: acRepair, label: `air conditioning repair in ${c}` },
            ". A yearly ",
            { href: tuneUp, label: `AC tune-up in ${c}` },
            " before summer is a good time to catch worn capacitors, dirty coils and restricted airflow before they cause a breakdown.",
          ],
        ],
      },
      {
        heading: `24/7 Emergency and Same-Day HVAC Service in ${c}`,
        paragraphs: [
          [
            `We are open 24 hours a day, 7 days a week, and same-day service is available in ${c}. If your system has stopped completely, `,
            { href: emergency, label: `emergency AC repair in ${c}` },
            ` lists what to do while you wait. ${countySlug === "orange-county" ? arrival : "Arrival times depend on our schedule and your location, and we will give you an honest estimate when you call."}`,
          ],
          [
            "For a problem that is not about cooling, such as ductwork, thermostats or a system that heats and cools unevenly, see ",
            { href: hvacRepair, label: `HVAC repair in ${c}` },
            ".",
          ],
        ],
      },
      { heading: `Replacing an AC or Furnace in ${c}`, paragraphs: replacement },
    ],
    faqs: [
      {
        question: `Do you repair furnaces and heating systems in ${c}?`,
        answer: `Yes. We repair gas and electric furnaces and heat pumps in ${c}. Call (714) 410-2784 or send a request online, and see our ${c} heating repair page for what a repair visit covers.`,
      },
      {
        question: `Do you repair air conditioning in ${c}?`,
        answer: `Yes. We diagnose and repair central air conditioners and heat pumps in ${c}. Our ${c} AC repair page covers common problems, and the emergency AC repair page lists what to do if your system stops completely.`,
      },
      {
        question: `Do you offer emergency HVAC service in ${c}?`,
        answer: `Yes. We are open 24 hours a day, 7 days a week, including emergency service, and same-day service is available in ${c}. ${arrival}`,
      },
      permitFaq,
      R22_FAQ,
      {
        question: `How do I schedule HVAC service in ${c}?`,
        answer:
          "Call (714) 410-2784 or fill in the request form on this page with your name, phone number, the service you need and your address. We will contact you to schedule a visit.",
      },
    ],
    ...SHARED,
    ctaNote: `Call us 24/7 or send a request online for HVAC service anywhere in ${c}.`,
  };
}

/** Owner-verified facts per hub, keyed "county/city". Empty until the owner supplies them. */
const OWNER_CONTENT: Record<string, OwnerContent> = {
  "orange-county/placentia": {},
  "orange-county/costa-mesa": {},
  "orange-county/yorba-linda": {},
};

export function getCityHub(countySlug: string, citySlug: string): CityHubContent | undefined {
  const key = `${countySlug}/${citySlug}`;
  const facts = HUB_FACTS[key];
  const hub = CITY_HUBS[key] ?? (facts ? buildHub(countySlug, citySlug, facts) : undefined);
  return hub && OWNER_CONTENT[key] ? { ...hub, owner: OWNER_CONTENT[key] } : hub;
}

/** Permit offices for the hand-written hubs above, from the sources listed at the top of this file. */
const HAND_WRITTEN_PERMIT: Record<string, PermitOffice> = {
  "orange-county/placentia": { office: "City of Placentia Building and Safety Division", url: "https://placentia.org/58/Building-and-Safety" },
  "orange-county/costa-mesa": {
    office: "City of Costa Mesa Building Safety Division",
    url: "https://www.costamesaca.gov/government/departments-and-divisions/economic-and-development-services/building-safety",
  },
  "orange-county/yorba-linda": { office: "City of Yorba Linda Building Department", url: "https://www.yorbalindaca.gov/477/Permit-Process" },
};

/** The verified office that permits HVAC equipment replacement for the city, if one is on file. */
export function getPermitOffice(countySlug: string, citySlug: string): PermitOffice | undefined {
  const key = `${countySlug}/${citySlug}`;
  return HAND_WRITTEN_PERMIT[key] ?? HUB_FACTS[key]?.permit ?? undefined;
}
