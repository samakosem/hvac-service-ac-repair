/**
 * Redirect map for future implementation in next.config.ts.
 *
 * These are legacy/external URLs that should 301 → canonical destinations.
 * Do NOT activate these as Next.js redirects until the old routes are confirmed gone.
 *
 * Format: { source: string; destination: string; permanent: true }[]
 *
 * To activate: add to next.config.ts under `redirects()` export.
 */
export const REDIRECT_MAP = [
  // Legacy flat /services/[slug] paths → new silo paths
  { source: "/services/air-conditioning",            destination: "/air-conditioning",                          permanent: true },
  { source: "/services/ac-services",                 destination: "/air-conditioning/ac-services",              permanent: true },
  { source: "/services/ac-repair",                   destination: "/air-conditioning/ac-repair",                permanent: true },
  { source: "/services/emergency-ac-repair",         destination: "/air-conditioning/emergency-ac-repair",      permanent: true },
  { source: "/services/ac-installation",             destination: "/air-conditioning/ac-installation",          permanent: true },
  { source: "/services/ac-replacement",              destination: "/air-conditioning/ac-replacement",           permanent: true },
  { source: "/services/ac-maintenance",              destination: "/air-conditioning/ac-maintenance",           permanent: true },
  { source: "/services/ac-tune-up",                  destination: "/air-conditioning/ac-tune-up",               permanent: true },
  { source: "/services/ductless-mini-split",         destination: "/ductless/ductless-mini-split",              permanent: true },
  { source: "/services/mini-split-installation",     destination: "/ductless/mini-split-installation",          permanent: true },
  { source: "/services/heat-pump-services",          destination: "/heat-pumps",                                permanent: true },
  { source: "/services/heat-pump-repair",            destination: "/heat-pumps/heat-pump-repair",               permanent: true },
  { source: "/services/heat-pump-installation",      destination: "/heat-pumps/heat-pump-installation",         permanent: true },
  { source: "/services/heating-services",            destination: "/heating",                                   permanent: true },
  { source: "/services/furnace-repair",              destination: "/heating/furnace-repair",                    permanent: true },
  { source: "/services/furnace-installation",        destination: "/heating/furnace-installation",              permanent: true },
  { source: "/services/furnace-maintenance",         destination: "/heating/furnace-maintenance",               permanent: true },
  { source: "/services/commercial-hvac",             destination: "/commercial-hvac",                           permanent: true },
  { source: "/services/commercial-maintenance-plan", destination: "/commercial-hvac/commercial-maintenance-plan", permanent: true },
  { source: "/services/air-duct-services",           destination: "/air-duct-services",                         permanent: true },
  { source: "/services/air-duct-cleaning",           destination: "/air-duct-services/air-duct-cleaning",       permanent: true },
  { source: "/services/residential-maintenance-plan", destination: "/maintenance/residential-maintenance-plan", permanent: true },

  // Legacy marketing URLs
  { source: "/hvac-installation/", destination: "/air-conditioning/ac-installation",    permanent: true },
  { source: "/hvac-repair/",       destination: "/air-conditioning/ac-repair",          permanent: true },
  { source: "/hvac-cleaning/",     destination: "/air-duct-services/air-duct-cleaning", permanent: true },

  // ── Legacy /{city}-ac-repair PPC pages (from GSC 404 report) → canonical ──────
  // Exact city service-area page wins; else county page; else main AC repair page.

  // → exact city service-area page
  { source: "/orange-ac-repair",        destination: "/service-areas/orange-county/orange",              permanent: true },
  { source: "/tustin-ac-repair",        destination: "/service-areas/orange-county/tustin",              permanent: true },
  { source: "/costa-mesa-ac-repair",    destination: "/service-areas/orange-county/costa-mesa",          permanent: true },
  { source: "/garden-grove-ac-repair",  destination: "/service-areas/orange-county/garden-grove",        permanent: true },
  { source: "/westminster-ac-repair",   destination: "/service-areas/orange-county/westminster",         permanent: true },
  { source: "/irvine-ac-repair",        destination: "/service-areas/orange-county/irvine",              permanent: true },
  { source: "/fullerton-ac-repair",     destination: "/service-areas/orange-county/fullerton",           permanent: true },
  { source: "/brea-ac-repair",          destination: "/service-areas/orange-county/brea",                permanent: true },
  { source: "/santa-ana-ac-repair",     destination: "/service-areas/orange-county/santa-ana",           permanent: true },
  { source: "/aliso-viejo-ac-repair",   destination: "/service-areas/orange-county/aliso-viejo",         permanent: true },
  { source: "/simi-valley-ac-repair",   destination: "/service-areas/ventura-county/simi-valley",        permanent: true },
  { source: "/thousand-oaks-ac-repair", destination: "/service-areas/ventura-county/thousand-oaks",      permanent: true },
  { source: "/ontario-ac-repair",       destination: "/service-areas/san-bernardino-county/ontario",     permanent: true },
  { source: "/chino-ac-repair",         destination: "/service-areas/san-bernardino-county/chino",       permanent: true },
  { source: "/chino-hills-ac-repair",   destination: "/service-areas/san-bernardino-county/chino-hills", permanent: true },
  { source: "/corona-ac-repair",        destination: "/service-areas/riverside-county/corona",           permanent: true },
  { source: "/santa-barbara-ac-repair", destination: "/service-areas/santa-barbara-county/santa-barbara", permanent: true },
  { source: "/walnut-ac-repair",        destination: "/service-areas/los-angeles-county/walnut",         permanent: true },

  // → Orange County page (city in OC, no dedicated city page)
  { source: "/san-juan-capistrano-ac-repair",     destination: "/service-areas/orange-county", permanent: true },
  { source: "/buena-park-ac-repair",              destination: "/service-areas/orange-county", permanent: true },
  { source: "/stanton-ac-repair",                 destination: "/service-areas/orange-county", permanent: true },
  { source: "/ladera-ranch-ac-repair",            destination: "/service-areas/orange-county", permanent: true },
  { source: "/rancho-santa-margarita-ac-repair",  destination: "/service-areas/orange-county", permanent: true },
  { source: "/foothill-ranch-ac-repair",          destination: "/service-areas/orange-county", permanent: true },
  { source: "/coto-de-caza-ac-repair",            destination: "/service-areas/orange-county", permanent: true },
  { source: "/dana-point-ac-repair",              destination: "/service-areas/orange-county", permanent: true },

  // → Riverside County page
  { source: "/canyon-lake-ac-repair",       destination: "/service-areas/riverside-county", permanent: true },
  { source: "/desert-hot-springs-ac-repair", destination: "/service-areas/riverside-county", permanent: true },
  { source: "/murrieta-ac-repair",          destination: "/service-areas/riverside-county", permanent: true },
  { source: "/rancho-mirage-ac-repair",     destination: "/service-areas/riverside-county", permanent: true },
  { source: "/banning-ac-repair",           destination: "/service-areas/riverside-county", permanent: true },
  { source: "/lake-elsinore-ac-repair",     destination: "/service-areas/riverside-county", permanent: true },
  { source: "/temecula-ac-repair",          destination: "/service-areas/riverside-county", permanent: true },
  { source: "/perris-ac-repair",            destination: "/service-areas/riverside-county", permanent: true },
  { source: "/menifee-ac-repair",           destination: "/service-areas/riverside-county", permanent: true },
  { source: "/palm-springs-ac-repair",      destination: "/service-areas/riverside-county", permanent: true },
  { source: "/moreno-valley-ac-repair",     destination: "/service-areas/riverside-county", permanent: true },

  // → San Bernardino County page
  { source: "/fontana-ac-repair",       destination: "/service-areas/san-bernardino-county", permanent: true },
  { source: "/upland-ac-repair",        destination: "/service-areas/san-bernardino-county", permanent: true },
  { source: "/hesperia-ac-repair",      destination: "/service-areas/san-bernardino-county", permanent: true },
  { source: "/yucca-valley-ac-repair",  destination: "/service-areas/san-bernardino-county", permanent: true },
  { source: "/redlands-ac-repair",      destination: "/service-areas/san-bernardino-county", permanent: true },
  { source: "/loma-linda-ac-repair",    destination: "/service-areas/san-bernardino-county", permanent: true },
  { source: "/colton-ac-repair",        destination: "/service-areas/san-bernardino-county", permanent: true },
  { source: "/grand-terrace-ac-repair", destination: "/service-areas/san-bernardino-county", permanent: true },

  // → Ventura County page
  { source: "/port-hueneme-ac-repair", destination: "/service-areas/ventura-county", permanent: true },
  { source: "/fillmore-ac-repair",     destination: "/service-areas/ventura-county", permanent: true },
  { source: "/ojai-ac-repair",         destination: "/service-areas/ventura-county", permanent: true },
  { source: "/ventura-ac-repair",      destination: "/service-areas/ventura-county", permanent: true },
  { source: "/camarillo-ac-repair",    destination: "/service-areas/ventura-county", permanent: true },

  // → Santa Barbara County page
  { source: "/santa-ynez-ac-repair",   destination: "/service-areas/santa-barbara-county", permanent: true },
  { source: "/carpinteria-ac-repair",  destination: "/service-areas/santa-barbara-county", permanent: true },

  // → Los Angeles County page (eastern LA cities, no dedicated city page)
  { source: "/san-gabriel-ac-repair",         destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/acton-ac-repair",               destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/santa-fe-springs-ac-repair",    destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/burbank-ac-repair",             destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/lancaster-ac-repair",           destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/tarzana-ac-repair",             destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/encino-ac-repair",              destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/north-hollywood-ac-repair",     destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/west-covina-ac-repair",         destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/rancho-palos-verdes-ac-repair", destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/whittier-ac-repair",            destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/agoura-hills-ac-repair",        destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/valley-village-ac-repair",      destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/stevenson-ranch-ac-repair",     destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/long-beach-ac-repair",          destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/westlake-village-ac-repair",    destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/calabasas-ac-repair",           destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/beverly-hills-ac-repair",       destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/granada-hills-ac-repair",       destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/temple-city-ac-repair",         destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/porter-ranch-ac-repair",        destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/gardena-ac-repair",             destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/monterey-park-ac-repair",       destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/huntington-park-ac-repair",     destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/palmdale-ac-repair",            destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/studio-city-ac-repair",         destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/lynwood-ac-repair",             destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/torrance-ac-repair",            destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/santa-monica-ac-repair",        destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/winnetka-ac-repair",            destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/compton-ac-repair",             destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/san-fernando-ac-repair",        destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/reseda-ac-repair",              destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/carson-ac-repair",              destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/sherman-oaks-ac-repair",        destination: "/service-areas/los-angeles-county", permanent: true },
  { source: "/san-marino-ac-repair",          destination: "/service-areas/los-angeles-county", permanent: true },

  // → path-format legacy 404s (already on www)
  { source: "/air-conditioning/ac-repair/la-habra",  destination: "/air-conditioning/ac-repair", permanent: true },
  { source: "/air-conditioning/ac-repair/la-habra/", destination: "/air-conditioning/ac-repair", permanent: true },
  { source: "/service-areas/riverside-county/riverside", destination: "/service-areas/riverside-county", permanent: true },
  { source: "/heating/heating-repair",  destination: "/heating", permanent: true },
  { source: "/heating/heating-repair/", destination: "/heating", permanent: true },
] as const;
