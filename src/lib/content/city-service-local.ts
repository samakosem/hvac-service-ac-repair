/**
 * Verified local notes for Orange County AC repair pages (/air-conditioning/ac-repair/[city]).
 *
 * Copy rules (Phase 5): only facts from an official source already verified for the city hubs
 * (permit offices, see city-hubs.ts) or general coastal maintenance guidance already approved
 * for the Costa Mesa hub (Phase 2.3 P1), plus areas the owner confirmed by name (Phase 6). No
 * other neighbourhoods, jobs, response times, temperatures, brands or statistics. A city with no
 * verified fact gets no section.
 */
import { getCityBySlug } from "@/lib/config/locations";
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

export function getCityServiceLocalNotes(serviceSlug: string, citySlug: string): CityServiceLocalNotes | undefined {
  if (serviceSlug !== "ac-repair") return undefined;
  const city = getCityBySlug(citySlug, "orange-county");
  if (!city) return undefined;

  const paragraphs: HubText[] = [];

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
