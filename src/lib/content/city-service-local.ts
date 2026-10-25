/**
 * Verified local notes for Orange County AC repair pages (/air-conditioning/ac-repair/[city]),
 * plus guide links on selected heating repair pages (/heating/heating-repair/[city]).
 *
 * Copy rules (Phase 5): only facts from an official source already verified for the city hubs
 * (permit offices, see city-hubs.ts) or general coastal maintenance guidance already approved
 * for the Costa Mesa hub (Phase 2.3 P1), plus areas the owner confirmed by name (Phase 6). No
 * other neighbourhoods, jobs, response times, temperatures, brands or statistics. A city with no
 * verified fact gets no section.
 */
import { getCityBySlug } from "@/lib/config/locations";
import { SITE } from "@/lib/config/site";
import { getPermitOffice, type HubText } from "@/lib/content/city-hubs";

/** Cities on the Pacific shoreline. */
const ON_COAST = new Set(["huntington-beach", "newport-beach", "san-clemente"]);
/** Near the coast but not on it (matches the Costa Mesa hub copy). */
const NEAR_COAST = new Set(["costa-mesa"]);

/** Neighbourhoods the owner confirmed by name (Phase 6). */
const OWNER_CONFIRMED_AREAS: Record<string, string[]> = {
  "laguna-niguel": ["Bear Brand Ranch"],
};

export type CityServiceLocalNotes = { heading: string; paragraphs: HubText[] };

/** Heating repair pages that link to the furnace and heating guides (Phase 7). */
const HEATING_NOTES = new Set(["yorba-linda"]);

function heatingNotes(citySlug: string): CityServiceLocalNotes | undefined {
  const city = getCityBySlug(citySlug, "orange-county");
  if (!city || !HEATING_NOTES.has(citySlug)) return undefined;
  const paragraphs: HubText[] = [
    [
      "If the furnace won't light, lights and then shuts off, or runs without warming the house, our ",
      { href: "/heating/furnace-repair", label: "furnace repair guide" },
      " explains the usual causes and how a diagnosis works. Heat pump owners can start with ",
      { href: "/heat-pumps/heat-pump-repair", label: "heat pump repair" },
      ", and the ",
      { href: "/heating", label: "heating services overview" },
      " covers maintenance and when to call.",
    ],
  ];
  const permit = getPermitOffice("orange-county", citySlug);
  if (permit) {
    paragraphs.push([
      `If a repair visit shows that replacing the furnace makes more sense, replacement equipment in ${city.name} is permitted as mechanical work through the `,
      { href: permit.url, label: permit.office },
      ". Ask your contractor whether your project needs a permit; a permitted replacement is inspected after installation.",
    ]);
  }
  return { heading: `Heating Repair Notes for ${city.name}`, paragraphs };
}

export function getCityServiceLocalNotes(serviceSlug: string, citySlug: string): CityServiceLocalNotes | undefined {
  if (serviceSlug === "heating-repair") return heatingNotes(citySlug);
  if (serviceSlug !== "ac-repair") return undefined;
  const city = getCityBySlug(citySlug, "orange-county");
  if (!city) return undefined;

  const paragraphs: HubText[] = [];

  if (citySlug === "yorba-linda") {
    // Home base (owner-confirmed; address from site data). Phase 8.
    paragraphs.push([
      "Yorba Linda is our home base: our shop is on Yorba Linda Blvd. For heating, tune-ups and replacement in the city, see ",
      { href: "/service-areas/orange-county/yorba-linda", label: "HVAC service in Yorba Linda" },
      ". Our ",
      { href: "/air-conditioning/ac-repair", label: "AC repair guide" },
      " explains common failures, how a diagnosis works and when replacement makes sense. If your system has stopped completely, see ",
      { href: "/air-conditioning/emergency-ac-repair/yorba-linda", label: "emergency AC repair in Yorba Linda" },
      `. ${SITE.emergencyArrivalOC}`,
    ]);
  }

  const areas = OWNER_CONFIRMED_AREAS[citySlug];
  if (areas) {
    paragraphs.push([`We serve all of ${city.name}, including ${areas.join(" and ")}, from our Yorba Linda base.`]);
  }

  if (ON_COAST.has(citySlug) || NEAR_COAST.has(citySlug)) {
    paragraphs.push([
      `${city.name} ${ON_COAST.has(citySlug) ? "sits on the Pacific coast" : "is close to the coast"}, and salt-laden ocean air wears on outdoor condenser coils and copper refrigerant lines over time. If your AC is losing refrigerant or cooling less each summer, corrosion on the outdoor unit is one of the things a repair visit should check. Regular coil cleaning and inspection help catch it before it turns into a leak.`,
    ]);
  }

  const permit = getPermitOffice("orange-county", citySlug);
  if (permit) {
    paragraphs.push([
      `If a repair visit shows that replacing the air conditioner makes more sense, replacement equipment in ${city.name} is permitted as mechanical work through the `,
      { href: permit.url, label: permit.office },
      ". Ask your contractor whether your project needs a permit; a permitted replacement is inspected after installation.",
    ]);
  }

  return paragraphs.length ? { heading: `AC Repair Notes for ${city.name}`, paragraphs } : undefined;
}
