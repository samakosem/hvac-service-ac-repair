/**
 * Central image registry — maps semantic keys to /uploads/ paths.
 * All paths are relative to /public (Next.js static serving root).
 * Original filenames are preserved; do not delete files from /public/uploads/.
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// ─── Hero ──────────────────────────────────────────────────────────────────────
// Bright daytime HVAC technician servicing a condenser under blue sky — natural
// blue-fade left side leaves room for hero text; technician sits right of center
export const IMG_HERO: SiteImage = {
  src: "/images/hvac-hero-technician-bright.webp",
  alt: "HVAC technician servicing an air conditioning condenser unit at an Orange County home on a bright day — HVAC Service & AC Repair",
  width: 1672,
  height: 941,
};

// ─── OG / social share image ───────────────────────────────────────────────────
// Same clean install shot — readable at small size
export const IMG_OG: SiteImage = {
  src: "/uploads/ac-unit-installation (4).jpeg",
  alt: "HVAC Service & AC Repair — AC installation and repair in Orange County, CA",
  width: 1200,
  height: 1600,
};

// ─── AC Repair page ────────────────────────────────────────────────────────────
// Technician actively diagnosing unit on residential job — only action photo
export const IMG_AC_REPAIR: SiteImage = {
  src: "/uploads/ac repair service in California  (16).jpeg",
  alt: "HVAC technician servicing an air conditioning condenser unit at an Orange County home",
  width: 900,
  height: 1200,
};

// ─── AC Installation page ──────────────────────────────────────────────────────
// Trane dual-condenser installation with R410a equipment — professional job
export const IMG_AC_INSTALLATION: SiteImage = {
  src: "/uploads/ac-unit-installation (6).jpeg",
  alt: "Dual Trane air conditioning condensers installed at a residential property in Orange County, CA",
  width: 1152,
  height: 1536,
};

// ─── AC Installation page — secondary ─────────────────────────────────────────
// New Goodman condenser fresh install, clean residential
export const IMG_AC_INSTALLATION_2: SiteImage = {
  src: "/uploads/AC REPAIR SERVICE (8).jpeg",
  alt: "New Goodman air conditioning unit installed next to a residential property in Orange County",
  width: 900,
  height: 1200,
};

// ─── Ductless / mini-split page ────────────────────────────────────────────────
export const IMG_DUCTLESS: SiteImage = {
  src: "/uploads/mini-split-installation.jpeg",
  alt: "Ductless mini-split air handler installed on a wall — ductless HVAC service in Orange County",
  width: 960,
  height: 1280,
};

// ─── Heating / furnace page ────────────────────────────────────────────────────
// Goodman furnace installed in residential closet
export const IMG_FURNACE: SiteImage = {
  src: "/uploads/ac repair service in California  (3).jpeg",
  alt: "Goodman high-efficiency gas furnace installed in a residential utility closet in Orange County",
  width: 900,
  height: 1200,
};

// ─── Heating page — secondary (air handler + water heater) ────────────────────
export const IMG_AIR_HANDLER: SiteImage = {
  src: "/uploads/ac-repair (1).jpeg",
  alt: "Goodman air handler and water heater installed in a residential utility space in Orange County",
  width: 900,
  height: 1200,
};

// ─── Commercial HVAC page — primary ───────────────────────────────────────────
// Rooftop RTU service with SoCal palm trees — clearly commercial
export const IMG_COMMERCIAL_PRIMARY: SiteImage = {
  src: "/uploads/hvac repair service ac  (6).jpeg",
  alt: "Commercial rooftop HVAC unit being serviced in Southern California",
  width: 1200,
  height: 900,
};

// ─── Commercial HVAC page — secondary ─────────────────────────────────────────
// Row of Carrier condensers on commercial rooftop
export const IMG_COMMERCIAL_SECONDARY: SiteImage = {
  src: "/uploads/ac-unit-installation (9).jpeg",
  alt: "Row of commercial Carrier air conditioning units installed on a rooftop in Orange County",
  width: 1200,
  height: 900,
};

// ─── Maintenance page ──────────────────────────────────────────────────────────
// Dirty condensers about to be cleaned — shows why maintenance matters
export const IMG_MAINTENANCE: SiteImage = {
  src: "/uploads/hvac repair service ac  (5).jpeg",
  alt: "HVAC technician preparing to clean heavily fouled air conditioning condensers during a maintenance service call",
  width: 1200,
  height: 900,
};

// ─── Lennox install — clean residential ───────────────────────────────────────
// Used on about page / service area pages as a trust visual
export const IMG_LENNOX_INSTALL: SiteImage = {
  src: "/uploads/hvac unit.jpeg",
  alt: "Lennox air conditioning condenser unit installed at an Orange County residence",
  width: 900,
  height: 1200,
};

// ─── Gallery images (8 total for GalleryPreview grid) ─────────────────────────
export const GALLERY_IMAGES: Array<SiteImage & { size: "large" | "small" }> = [
  {
    src: "/uploads/AC REPAIR SERVICE (8).jpeg",
    alt: "New Goodman AC condenser installed at a residential property in Yorba Linda, CA",
    width: 900,
    height: 1200,
    size: "large",
  },
  {
    src: "/uploads/ac-unit-installation (1).jpeg",
    alt: "Commercial package unit installation on a commercial rooftop in Orange County",
    width: 900,
    height: 1200,
    size: "small",
  },
  {
    src: "/uploads/ac-repair (2).jpeg",
    alt: "Commercial HVAC rooftop unit being serviced in Southern California",
    width: 1200,
    height: 900,
    size: "small",
  },
  {
    src: "/uploads/hvac repair service ac  (2).jpeg",
    alt: "New Goodman air conditioning unit installed at an Orange County property",
    width: 1200,
    height: 900,
    size: "small",
  },
  {
    src: "/uploads/ac-unit-installation (10).jpeg",
    alt: "Multiple ductless mini-split outdoor units installed on a commercial rooftop in Orange County",
    width: 900,
    height: 1200,
    size: "small",
  },
  {
    src: "/uploads/ac-repair (1).jpg",
    alt: "HVAC technician performing AC repair on a rooftop condenser unit in Orange County",
    width: 900,
    height: 1200,
    size: "small",
  },
];
