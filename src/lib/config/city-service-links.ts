// Internal links between a city's service-area hub and its city × service pages.
// Server-side only: it reads the full page data, so pass the results to client
// components as props rather than importing this module there.

import { getCityServicePage } from "./city-service-pages";
import { COUNTIES, getCityBySlug } from "./locations";

export type CityServiceLink = { serviceSlug: string; href: string; label: string };

/** Link order and anchor wording, e.g. "AC repair in Yorba Linda". */
const SERVICES: { serviceSlug: string; label: string }[] = [
  { serviceSlug: "ac-repair", label: "AC repair" },
  { serviceSlug: "emergency-ac-repair", label: "Emergency AC repair" },
  { serviceSlug: "ac-tune-up", label: "AC tune-up" },
  { serviceSlug: "heating-repair", label: "Heating repair" },
  { serviceSlug: "hvac-repair", label: "HVAC repair" },
];

/** Cities that get links from the service hub pages (Phase 2.2, M1). */
export const PRIORITY_CITY_SLUGS = ["yorba-linda", "anaheim", "brea", "placentia", "fullerton", "irvine"];

/** The city's service pages that exist, in a fixed order. */
export function cityServiceLinks(citySlug: string): CityServiceLink[] {
  return SERVICES.flatMap(({ serviceSlug, label }) => {
    const page = getCityServicePage(serviceSlug, citySlug);
    return page ? [{ serviceSlug, href: `${page.urlBase}/${page.citySlug}`, label: `${label} in ${page.cityName}` }] : [];
  });
}

/** One service's pages for every city of a county that has one (e.g. /hvac-repair/{city} for Orange County). */
export function countyCityLinks(serviceSlug: string, countySlug: string): CityServiceLink[] {
  const county = COUNTIES.find((c) => c.slug === countySlug);
  if (!county) return [];
  return county.cities.flatMap((city) => cityServiceLinks(city.slug).filter((l) => l.serviceSlug === serviceSlug));
}

/** The city's service-area hub, e.g. /service-areas/orange-county/yorba-linda. */
export function cityHubHref(citySlug: string): string | undefined {
  const city = getCityBySlug(citySlug);
  return city ? `/service-areas/${city.countySlug}/${city.slug}` : undefined;
}

/** One service's pages for the priority cities, for the service hub pages. */
export function priorityCityLinks(serviceSlug: string): CityServiceLink[] {
  return PRIORITY_CITY_SLUGS.flatMap((citySlug) => cityServiceLinks(citySlug).filter((l) => l.serviceSlug === serviceSlug));
}
