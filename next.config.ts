import type { NextConfig } from "next";
import path from "path";
import { REDIRECT_MAP } from "@/lib/config/redirects";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  async redirects() {
    return [
      // ── Short-path aliases ────────────────────────────────────────────────
      // /about is used in some nav links — redirect to canonical /about-us
      { source: "/about",   destination: "/about-us", permanent: true },
      { source: "/about/",  destination: "/about-us", permanent: true },
      // /faq has no page — send to homepage FAQ section
      { source: "/faq",     destination: "/#faq",     permanent: false },
      { source: "/faq/",    destination: "/#faq",     permanent: false },

      // ── Trailing-slash normalization ─────────────────────────────────────
      // /contact/ → /contact (WordPress permalink style)
      { source: "/contact/",            destination: "/contact",            permanent: true },
      { source: "/about-us/",           destination: "/about-us",           permanent: true },
      { source: "/reviews/",            destination: "/reviews",            permanent: true },
      { source: "/financing/",          destination: "/financing",          permanent: true },
      { source: "/services/",           destination: "/services",           permanent: true },
      { source: "/service-areas/",      destination: "/service-areas",      permanent: true },
      { source: "/blog/",               destination: "/blog",               permanent: true },
      { source: "/calculators/",        destination: "/calculators",        permanent: true },
      { source: "/maintenance-plans/",  destination: "/maintenance-plans",  permanent: true },

      // ── Legacy WordPress & old marketing URLs → canonical silos ──────────
      // (sourced from lib/config/redirects.ts — single source of truth)
      ...REDIRECT_MAP,

      // ── Additional WordPress-style trailing-slash variants not in REDIRECT_MAP ──
      // These cover /hvac-installation (no trailing slash) in case WP sent both
      { source: "/hvac-installation",   destination: "/air-conditioning/ac-installation",    permanent: true },
      { source: "/hvac-repair",         destination: "/air-conditioning/ac-repair",          permanent: true },
      { source: "/hvac-cleaning",       destination: "/air-duct-services/air-duct-cleaning", permanent: true },
    ];
  },
};

export default nextConfig;
