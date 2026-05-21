import { SITE } from "@/lib/config/site";

export type PromoCategory =
  | "tune-up"
  | "inspection"
  | "installation"
  | "maintenance"
  | "financing"
  | "emergency"
  | "ductless"
  | "commercial"
  | "indoor-air"
  | "seasonal"
  | "customer"
  | "bundle";

export type Promotion = {
  slug: string;
  title: string;
  shortTitle: string;
  category: PromoCategory;
  categoryLabel: string;
  description: string;
  disclaimer?: string;
  badge?: string;
  /** shown as "limited availability" chip when true */
  limited?: boolean;
  /** active=false hides from grid but keeps slug for redirects */
  active: boolean;
  /** ISO date string — UI shows "Offer ends [date]" if set and in future */
  expires?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCta?: { text: string; href?: string; tel?: string };
  relatedServiceSlugs: string[];
  /** inline SVG path string for icon */
  icon: string;
  /** accent color variant */
  accent: "blue" | "copper" | "emerald" | "amber" | "violet";
};

// ─── Shared icon paths ────────────────────────────────────────────────────────
const ICONS = {
  checkShield: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  snowflake: "M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364",
  wrench: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z",
  home: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  star: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.499z",
  creditCard: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  wind: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
  cpu: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
  gift: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1019.5 7.125M12 4.875A2.625 2.625 0 104.5 7.125M12 4.875V21M19.5 7.125H4.5m15 0v4.5M4.5 7.125v4.5m15 0H4.5",
  users: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  flame: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z",
  calendar: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
};

const ACCENT_COLORS: Record<Promotion["accent"], { badge: string; icon: string; border: string }> = {
  blue: {
    badge: "bg-hvac-blue-100 text-hvac-blue-700",
    icon: "text-hvac-blue-600",
    border: "border-hvac-blue-200 hover:border-hvac-blue-400",
  },
  copper: {
    badge: "bg-copper-100 text-copper-600",
    icon: "text-copper-500",
    border: "border-copper-200 hover:border-copper-400",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-700",
    icon: "text-emerald-600",
    border: "border-emerald-200 hover:border-emerald-400",
  },
  amber: {
    badge: "bg-amber-100 text-amber-700",
    icon: "text-amber-600",
    border: "border-amber-200 hover:border-amber-400",
  },
  violet: {
    badge: "bg-violet-100 text-violet-700",
    icon: "text-violet-600",
    border: "border-violet-200 hover:border-violet-400",
  },
};

export { ACCENT_COLORS, ICONS };

export const PROMOTIONS: Promotion[] = [
  // ── Inspection / Estimates ────────────────────────────────────────────────
  {
    slug: "free-hvac-inspection",
    title: "Free HVAC System Inspection",
    shortTitle: "Free Inspection",
    category: "inspection",
    categoryLabel: "Inspection",
    description:
      "Not sure if your system needs repair or replacement? Schedule a visit and we'll send a licensed tech to inspect your entire HVAC system at no charge. You'll get a plain-English rundown of what we find — no obligation to proceed.",
    disclaimer: "Available for scheduled service visits in our service area. One inspection per household. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Schedule Free Inspection",
    ctaHref: "/contact",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-repair", "ac-maintenance"],
    icon: ICONS.checkShield,
    accent: "blue",
    active: true,
    limited: true,
    badge: "No Charge",
  },
  {
    slug: "free-second-opinion",
    title: "Free Second Opinion on Any HVAC Diagnosis",
    shortTitle: "Free Second Opinion",
    category: "inspection",
    categoryLabel: "Inspection",
    description:
      "Got a quote from another company that doesn't feel right? Schedule a visit and we'll review the diagnosis and give you an honest second opinion at no cost. No sales pressure — just straight answers.",
    disclaimer: "Requires existing written diagnosis from another licensed HVAC contractor. Available for scheduled visits in our service area. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Request Second Opinion",
    ctaHref: "/contact",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-repair"],
    icon: ICONS.checkShield,
    accent: "emerald",
    active: true,
    badge: "Free",
  },
  {
    slug: "free-same-day-estimate",
    title: "Free Written Estimate",
    shortTitle: "Free Estimate",
    category: "inspection",
    categoryLabel: "Estimate",
    description:
      "We provide free written estimates on AC repair, replacement, and new installations. Know exactly what you're paying before any work begins. Same-day availability subject to scheduling.",
    disclaimer: "Same-day availability varies by schedule and service area. Estimates provided for standard residential and light commercial systems. Restrictions may apply.",
    ctaText: "Get a Free Estimate",
    ctaHref: "/contact",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-installation", "ac-repair"],
    icon: ICONS.calendar,
    accent: "blue",
    active: true,
  },

  // ── Tune-Up ───────────────────────────────────────────────────────────────
  {
    slug: "ac-tune-up-special",
    title: "$89 AC Tune-Up & Safety Check",
    shortTitle: "$89 AC Tune-Up",
    category: "tune-up",
    categoryLabel: "Tune-Up",
    description:
      "Our standard AC tune-up includes system inspection, coil cleaning, refrigerant level check, drain line flush, thermostat calibration, and a written service report. Book before summer to avoid the rush.",
    disclaimer: "Starting price for standard single-zone residential systems. Pricing may vary by system type, size, accessibility, and service area. Additional charges may apply for refrigerant recharge or repairs identified during service. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Book AC Tune-Up",
    ctaHref: "/maintenance/residential-maintenance-plan",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-maintenance", "ac-tune-up"],
    icon: ICONS.wrench,
    accent: "copper",
    active: true,
    badge: "$89",
    limited: true,
  },
  {
    slug: "free-air-filter-with-service",
    title: "Free Air Filter With Any Service Call",
    shortTitle: "Free Air Filter",
    category: "tune-up",
    categoryLabel: "Service Add-On",
    description:
      "Every paid service call includes a free 1-inch air filter swap. A clean filter improves air quality and helps your system run more efficiently — we bring it, we swap it.",
    disclaimer: "Standard 1-inch air filter included with paid service call. Thicker or specialty filters (HEPA, 4-inch media) available at additional cost. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Schedule Service",
    ctaHref: "/contact",
    relatedServiceSlugs: ["ac-maintenance", "ac-repair"],
    icon: ICONS.wind,
    accent: "blue",
    active: true,
  },

  // ── Maintenance ───────────────────────────────────────────────────────────
  {
    slug: "maintenance-plan-first-month-free",
    title: "First Month Free — Residential Maintenance Plan",
    shortTitle: "First Month Free",
    category: "maintenance",
    categoryLabel: "Maintenance Plan",
    description:
      "Sign up for our annual residential maintenance plan and get the first month free. Includes two seasonal tune-ups, priority scheduling, and repair discounts for plan members.",
    disclaimer: "Offer applies to new annual maintenance plan enrollments only. Month-to-month plans not eligible. Cannot be combined with other promotional offers. Restrictions may apply. Call for current plan pricing.",
    ctaText: "View Maintenance Plans",
    ctaHref: "/maintenance-plans",
    secondaryCta: { text: `Call to Enroll`, tel: SITE.phone },
    relatedServiceSlugs: ["maintenance-plan"],
    icon: ICONS.calendar,
    accent: "emerald",
    active: true,
    badge: "New Enrollment",
  },
  {
    slug: "maintenance-bundle",
    title: "HVAC Maintenance Bundle — Spring & Fall",
    shortTitle: "Maintenance Bundle",
    category: "bundle",
    categoryLabel: "Bundle",
    description:
      "Schedule both your spring AC tune-up and fall heating inspection together and ask about bundle pricing. One call, two visits, full-year coverage — we'll remind you when the second visit is due.",
    disclaimer: "Bundle pricing applies when both visits are scheduled together. Applies to standard residential systems. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Ask About Bundle Pricing",
    ctaHref: "/maintenance-plans",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-maintenance", "furnace-maintenance"],
    icon: ICONS.wrench,
    accent: "blue",
    active: true,
    limited: true,
  },

  // ── Customer Discounts ────────────────────────────────────────────────────
  {
    slug: "new-customer-discount",
    title: "New Customer Welcome Discount",
    shortTitle: "New Customer Offer",
    category: "customer",
    categoryLabel: "New Customer",
    description:
      "First time using our services? Ask about a discount on your first service call or maintenance visit. We'd rather earn your long-term trust than charge you full price on day one.",
    disclaimer: "Available to first-time customers only. Applies to service calls and maintenance visits. Cannot be combined with other promotional offers or financing promotions. Restrictions may apply.",
    ctaText: "Claim New Customer Offer",
    ctaHref: "/contact",
    secondaryCta: { text: `Call to Ask`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-repair", "ac-maintenance"],
    icon: ICONS.star,
    accent: "amber",
    active: true,
    badge: "First Visit",
  },
  {
    slug: "veterans-seniors-discount",
    title: "Veterans & Seniors Discount",
    shortTitle: "Veterans & Seniors",
    category: "customer",
    categoryLabel: "Community Discount",
    description:
      "We offer a discount on all services for U.S. military veterans and active-duty personnel, as well as senior homeowners 65+. Because good service should be accessible to everyone who's earned it.",
    disclaimer: "Valid military ID, DD-214, or proof of age 65+ required at time of service. Cannot be combined with other promotional offers. Availability may vary by service area. Restrictions may apply.",
    ctaText: "Schedule Service",
    ctaHref: "/contact",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-repair", "ac-maintenance"],
    icon: ICONS.users,
    accent: "blue",
    active: true,
    badge: "Always Available",
  },
  {
    slug: "multi-system-discount",
    title: "Multi-System Home Discount",
    shortTitle: "Multi-System Savings",
    category: "bundle",
    categoryLabel: "Bundle",
    description:
      "Have two or more HVAC systems in your home? Ask about discounted pricing when you service or replace multiple units in a single visit — common in larger homes and properties with zoned systems.",
    disclaimer: "Applies when two or more systems are serviced or replaced in a single visit. Cannot be combined with other promotional offers. Restrictions may apply. Call for current pricing.",
    ctaText: "Get Multi-System Quote",
    ctaHref: "/contact",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-maintenance", "ac-installation"],
    icon: ICONS.home,
    accent: "violet",
    active: true,
  },

  // ── Emergency ─────────────────────────────────────────────────────────────
  {
    slug: "emergency-ac-repair-discount",
    title: "Emergency AC Repair — Waived Diagnostic Fee",
    shortTitle: "Emergency Discount",
    category: "emergency",
    categoryLabel: "Emergency",
    description:
      "When your AC goes out in an Orange County summer, we'll waive the diagnostic fee when a repair is completed at the time of service. No double-charging — just fast, fairly priced emergency work.",
    disclaimer: "Diagnostic fee waived only when repair is completed at time of service by our technician. Does not apply to equipment-only visits, deferred repairs, or second visits. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Call for Emergency Service",
    ctaHref: "/air-conditioning/emergency-ac-repair",
    secondaryCta: { text: `Call Now — ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["emergency-ac-repair"],
    icon: ICONS.bolt,
    accent: "copper",
    active: true,
    badge: "Same-Day Available",
    limited: true,
  },

  // ── Installation ──────────────────────────────────────────────────────────
  {
    slug: "new-system-credit",
    title: "System Replacement Credit",
    shortTitle: "Replacement Credit",
    category: "installation",
    categoryLabel: "Installation",
    description:
      "When you replace an aging HVAC system with us, we credit your diagnostic fee toward the new installation. We also haul away the old equipment at no extra charge.",
    disclaimer: "Diagnostic fee credit applies only when full system replacement is performed by our team at time of service. Valid for complete system replacements only. Cannot be combined with other promotional offers or financing promotions. Restrictions may apply.",
    ctaText: "Get Replacement Quote",
    ctaHref: "/air-conditioning/ac-replacement",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-replacement", "ac-installation"],
    icon: ICONS.home,
    accent: "emerald",
    active: true,
    badge: "Includes Haul-Away",
  },
  {
    slug: "smart-thermostat-included",
    title: "Smart Thermostat Included With New System",
    shortTitle: "Free Smart Thermostat",
    category: "installation",
    categoryLabel: "Installation",
    description:
      "Install a new central AC or heat pump system and we'll include a compatible smart thermostat — installed and programmed. Control your home's comfort from anywhere.",
    disclaimer: "Smart thermostat included on qualified new system installations only. Thermostat model and compatibility varies by system type. Cannot be combined with financing promotions or other offers. Ask for details. Restrictions may apply.",
    ctaText: "Ask About This Offer",
    ctaHref: "/contact",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-installation"],
    icon: ICONS.cpu,
    accent: "blue",
    active: true,
    badge: "Included",
    limited: true,
  },

  // ── Financing ─────────────────────────────────────────────────────────────
  {
    slug: "financing-monthly-payments",
    title: "Flexible Monthly Financing on New Systems",
    shortTitle: "Financing Available",
    category: "financing",
    categoryLabel: "Financing",
    description:
      "Don't let the upfront cost delay a repair or new installation. We offer financing options on qualified new AC systems and heat pumps — ask about current terms when you call.",
    disclaimer: "Financing subject to credit approval. Terms and rates vary. Cannot be combined with installation promotional credits or equipment add-on offers. Contact us for current available plans. Restrictions may apply.",
    ctaText: "Learn About Financing",
    ctaHref: "/financing",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-installation", "heat-pump"],
    icon: ICONS.creditCard,
    accent: "amber",
    active: true,
    badge: "OAC",
  },

  // ── Ductless ──────────────────────────────────────────────────────────────
  {
    slug: "ductless-mini-split-savings",
    title: "Ductless Mini-Split Installation Savings",
    shortTitle: "Mini-Split Savings",
    category: "ductless",
    categoryLabel: "Ductless",
    description:
      "Add comfort to a garage, addition, or room without ductwork. Ask about current savings on single and multi-zone ductless mini-split installations — efficient, quiet, and no ducting required.",
    disclaimer: "Savings vary by zone count, system BTU requirements, and installation complexity. Free in-home assessment required before pricing is provided. Cannot be combined with other promotional offers. Availability may vary by service area. Restrictions may apply.",
    ctaText: "Get Mini-Split Quote",
    ctaHref: "/ductless/ductless-mini-split",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ductless-mini-split"],
    icon: ICONS.snowflake,
    accent: "blue",
    active: true,
    limited: true,
  },

  // ── Commercial ────────────────────────────────────────────────────────────
  {
    slug: "commercial-hvac-inspection",
    title: "Free Commercial HVAC Inspection",
    shortTitle: "Commercial Inspection",
    category: "commercial",
    categoryLabel: "Commercial",
    description:
      "Business owners: we'll inspect your commercial HVAC system at no charge. Rooftop units, split systems, and multi-zone setups. Identify issues before they affect your operations or tenants.",
    disclaimer: "Applies to commercial properties in our service area. Limited to a single-visit inspection of one rooftop or split system. Larger multi-unit or campus properties may require a paid site assessment. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Request Commercial Inspection",
    ctaHref: "/commercial-hvac",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["commercial-hvac"],
    icon: ICONS.building,
    accent: "violet",
    active: true,
    badge: "Business Owners",
  },

  // ── Indoor Air Quality ────────────────────────────────────────────────────
  {
    slug: "indoor-air-quality-check",
    title: "Indoor Air Quality Assessment",
    shortTitle: "Air Quality Check",
    category: "indoor-air",
    categoryLabel: "Indoor Air Quality",
    description:
      "Poor indoor air quality affects health, comfort, and HVAC efficiency. We assess your system's filtration, ventilation, and humidity levels and recommend practical improvements. Ask about current assessment pricing when you call.",
    disclaimer: "Assessment pricing and inclusions vary. Recommendations are advisory — no obligation to purchase additional services. Availability may vary by service area. Restrictions may apply.",
    ctaText: "Schedule IAQ Assessment",
    ctaHref: "/air-duct-services",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["air-duct-cleaning"],
    icon: ICONS.wind,
    accent: "emerald",
    active: true,
  },

  // ── Seasonal ──────────────────────────────────────────────────────────────
  {
    slug: "spring-ac-prep",
    title: "Spring AC Preparation Special",
    shortTitle: "Spring AC Prep",
    category: "seasonal",
    categoryLabel: "Spring Special",
    description:
      "Get your AC ready before temperatures climb. Our spring prep visit covers a full tune-up, coil cleaning, and refrigerant check — identify small issues before they become summer problems.",
    disclaimer: "Applies to standard residential AC systems. Additional charges may apply for refrigerant recharge or repairs found during service. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Book Spring Service",
    ctaHref: "/maintenance/residential-maintenance-plan",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-maintenance", "ac-tune-up"],
    icon: ICONS.snowflake,
    accent: "blue",
    active: true,
    badge: "Spring",
  },
  {
    slug: "summer-cooling-efficiency",
    title: "Summer Cooling Performance Check",
    shortTitle: "Summer Check",
    category: "seasonal",
    categoryLabel: "Summer Special",
    description:
      "AC running but energy bills climbing? Our performance check looks for common causes — dirty coils, refrigerant issues, airflow restrictions. We tell you what we find; repairs quoted separately.",
    disclaimer: "Performance check findings are advisory. Repairs and refrigerant recharge quoted separately if needed. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Schedule Performance Check",
    ctaHref: "/contact",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["ac-maintenance", "ac-repair"],
    icon: ICONS.flame,
    accent: "copper",
    active: true,
    badge: "Summer",
  },
  {
    slug: "fall-heating-inspection",
    title: "Fall Heating Inspection",
    shortTitle: "Fall Heating Check",
    category: "seasonal",
    categoryLabel: "Fall Special",
    description:
      "Don't wait for the first cold night to find out your furnace needs work. Our fall heating inspection covers your furnace or heat pump before the season starts — safety and operation checks included.",
    disclaimer: "Applies to standard residential furnaces and heat pumps. Repairs quoted separately if issues are found. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Book Fall Heating Check",
    ctaHref: "/heating/furnace-maintenance",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["furnace-maintenance", "furnace-repair"],
    icon: ICONS.flame,
    accent: "amber",
    active: true,
    badge: "Fall",
  },
  {
    slug: "heat-pump-service-offer",
    title: "Heat Pump Service Special",
    shortTitle: "Heat Pump Service",
    category: "tune-up",
    categoryLabel: "Heat Pump",
    description:
      "Heat pumps benefit from service twice a year. We inspect both the heating and cooling modes in one visit — refrigerant levels, coils, defrost cycle, and electrical connections. Ask about current pricing when you call.",
    disclaimer: "Pricing varies by system type and model. Additional charges may apply for refrigerant recharge or repairs found during service. Cannot be combined with other promotional offers. Restrictions may apply.",
    ctaText: "Schedule Heat Pump Service",
    ctaHref: "/heat-pumps/heat-pump-repair",
    secondaryCta: { text: `Call ${SITE.phoneDisplay}`, tel: SITE.phone },
    relatedServiceSlugs: ["heat-pump-service"],
    icon: ICONS.cpu,
    accent: "violet",
    active: true,
  },
];

/** active promotions only */
export const ACTIVE_PROMOTIONS = PROMOTIONS.filter((p) => p.active);

/** featured 4 for homepage strip — hand-picked slugs */
export const FEATURED_PROMO_SLUGS = [
  "free-hvac-inspection",
  "ac-tune-up-special",
  "emergency-ac-repair-discount",
  "financing-monthly-payments",
];

export const FEATURED_PROMOTIONS = FEATURED_PROMO_SLUGS
  .map((slug) => PROMOTIONS.find((p) => p.slug === slug))
  .filter(Boolean) as Promotion[];
