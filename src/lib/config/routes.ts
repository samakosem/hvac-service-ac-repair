/**
 * Canonical URL map for all service pages.
 * This is the single source of truth — update here and all internal links follow.
 *
 * Structure:
 *   slug (matches ServiceContent.slug) → canonical path
 *
 * Silo roots (no parent segment):
 *   /air-conditioning, /heat-pumps, /heating, /commercial-hvac, /air-duct-services
 *
 * Silo children:
 *   /air-conditioning/[slug], /ductless/[slug], /heat-pumps/[slug],
 *   /heating/[slug], /commercial-hvac/[slug], /air-duct-services/[slug],
 *   /maintenance/[slug]
 */
export const SERVICE_ROUTES: Record<string, string> = {
  // Air Conditioning silo
  "air-conditioning":         "/air-conditioning",
  "ac-services":              "/air-conditioning/ac-services",
  "ac-repair":                "/air-conditioning/ac-repair",
  "emergency-ac-repair":      "/air-conditioning/emergency-ac-repair",
  "ac-installation":          "/air-conditioning/ac-installation",
  "ac-replacement":           "/air-conditioning/ac-replacement",
  "ac-maintenance":           "/air-conditioning/ac-maintenance",
  "ac-tune-up":               "/air-conditioning/ac-tune-up",

  // Ductless silo
  "ductless-mini-split":      "/ductless/ductless-mini-split",
  "mini-split-installation":  "/ductless/mini-split-installation",

  // Heat Pumps silo
  "heat-pump-services":       "/heat-pumps",
  "heat-pump-repair":         "/heat-pumps/heat-pump-repair",
  "heat-pump-installation":   "/heat-pumps/heat-pump-installation",

  // Heating silo
  "heating-services":         "/heating",
  "furnace-repair":           "/heating/furnace-repair",
  "furnace-installation":     "/heating/furnace-installation",
  "furnace-maintenance":      "/heating/furnace-maintenance",

  // Commercial HVAC silo
  "commercial-hvac":              "/commercial-hvac",
  "commercial-maintenance-plan":  "/commercial-hvac/commercial-maintenance-plan",

  // Air Duct Services silo
  "air-duct-services":   "/air-duct-services",
  "air-duct-cleaning":   "/air-duct-services/air-duct-cleaning",

  // Maintenance silo
  "residential-maintenance-plan": "/maintenance/residential-maintenance-plan",
};

/** Returns the canonical path for a service slug, or /services as fallback. */
export function serviceHref(slug: string): string {
  return SERVICE_ROUTES[slug] ?? "/services";
}

/**
 * Breadcrumb parent for a given path segment.
 * Returns [{ name, href }] items between Home and the current page.
 */
export const SILO_PARENTS: Record<string, { name: string; href: string }> = {
  "/air-conditioning":   { name: "Air Conditioning", href: "/air-conditioning" },
  "/ductless":           { name: "Ductless Mini-Split", href: "/ductless" },
  "/heat-pumps":         { name: "Heat Pumps", href: "/heat-pumps" },
  "/heating":            { name: "Heating", href: "/heating" },
  "/commercial-hvac":    { name: "Commercial HVAC", href: "/commercial-hvac" },
  "/air-duct-services":  { name: "Air Duct Services", href: "/air-duct-services" },
  "/maintenance":        { name: "Maintenance Plans", href: "/maintenance-plans" },
};
