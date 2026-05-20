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
] as const;
