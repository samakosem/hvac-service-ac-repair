"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SITE } from "@/lib/config/site";
import { pushEvent } from "@/lib/gtm";
import PhoneLink from "@/components/ui/PhoneLink";

const NAV_LINKS = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AC Repair", href: "/air-conditioning/ac-repair" },
      { label: "AC Installation", href: "/air-conditioning/ac-installation" },
      { label: "Ductless Mini-Split", href: "/ductless/ductless-mini-split" },
      { label: "Air Duct Cleaning", href: "/air-duct-services/air-duct-cleaning" },
      { label: "Heating Services", href: "/heating" },
      { label: "Commercial HVAC", href: "/commercial-hvac" },
      { label: "All Services →", href: "/services" },
    ],
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    children: [
      { label: "Orange County", href: "/service-areas/orange-county" },
      { label: "Riverside County", href: "/service-areas/riverside-county" },
      { label: "San Bernardino County", href: "/service-areas/san-bernardino-county" },
      { label: "Ventura County", href: "/service-areas/ventura-county" },
      { label: "All Service Areas →", href: "/service-areas" },
    ],
  },
  { label: "About", href: "/about-us" },
  { label: "Financing", href: "/financing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Top trust bar — red/orange contractor energy, desktop only ── */}
      <div className="hidden xl:block relative bg-header-topbar">
        {/* subtle sheen + inner shadow for depth */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs font-medium text-white">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <svg className="w-3.5 h-3.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Licensed &amp; Insured
            </span>
            <span aria-hidden="true" className="w-px h-3.5 bg-white/25" />
            <span className="flex items-center gap-1.5 whitespace-nowrap font-semibold">
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-300 opacity-70 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-300" />
              </span>
              Open Now — Same-Day Appointments
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 whitespace-nowrap font-bold uppercase tracking-wide">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              24/7 Emergency Service
            </span>
          </div>
        </div>
      </div>

      {/* ── Main header — sticky, blue/purple contractor gradient ── */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-header-nav transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_40px_-8px_rgba(10,15,30,0.95)]" : ""
        }`}
      >
        {/* Angled polygon texture (own layer so it doesn't clobber the base gradient) */}
        <div aria-hidden="true" className="absolute inset-0 header-polygons pointer-events-none" />
        {/* Ambient blue/purple/red glow behind the bar */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-12 left-1/4 w-1/2 h-28 bg-hvac-blue-600/15 blur-3xl" />
          <div className="absolute -top-12 right-0 w-1/3 h-28 bg-[#8b5cf6]/12 blur-3xl" />
          <div className="absolute -top-12 left-0 w-1/4 h-24 bg-red-600/10 blur-3xl" />
        </div>
        {/* Glowing red→copper→blue seam along the bottom edge */}
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-red-500 via-copper-400 to-hvac-blue-500 opacity-80" />
        <div aria-hidden="true" className="absolute -bottom-1.5 inset-x-0 h-2 bg-gradient-to-r from-red-500/40 via-copper-400/20 to-hvac-blue-500/40 blur-md" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 xl:gap-5 h-16 xl:h-[4.75rem]">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group"
              aria-label={`${SITE.name} — Home`}
            >
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-cta-red shadow-[0_0_24px_-4px_rgba(234,88,12,0.7)] ring-1 ring-white/30 group-hover:ring-white/50 group-hover:scale-105 transition-all duration-200">
                <svg
                  className="w-7 h-7 text-white drop-shadow"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.9}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none gap-1">
                <span className="text-white font-extrabold text-lg lg:text-xl tracking-wide">
                  HVAC Service
                </span>
                <span className="text-copper-300 text-[11px] font-bold tracking-[0.18em] uppercase">
                  &amp; AC Repair
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-0.5 min-w-0" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 whitespace-nowrap px-3 py-2.5 text-[15px] font-semibold rounded-lg transition-colors ${activeDropdown === link.label ? "text-copper-300 bg-white/8" : "text-slate-100 hover:text-copper-300 hover:bg-white/8"}`}
                      aria-expanded={activeDropdown === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <svg className={`w-3.5 h-3.5 text-copper-400 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 w-56 z-50 pt-1">
                        <div className="glass-dark rounded-xl shadow-glass border border-white/10 py-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="whitespace-nowrap px-3 py-2.5 text-[15px] font-semibold text-slate-100 hover:text-copper-300 rounded-lg hover:bg-white/8 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop: phone block + CTA */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 shrink-0 group/phone"
                aria-label={`Call ${SITE.name} at ${SITE.phoneDisplay}`}
                onClick={() => pushEvent("Call Button")}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-cta-red shadow-[0_0_18px_-4px_rgba(234,88,12,0.8)] ring-1 ring-white/25 group-hover/phone:scale-105 transition-transform shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <span className="flex flex-col leading-none gap-0.5 whitespace-nowrap">
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-copper-300">Call Us 24/7</span>
                  <span className="text-white font-extrabold text-[15px] tracking-wide group-hover/phone:text-copper-200 transition-colors">{SITE.phoneDisplay}</span>
                </span>
              </a>
              <Link
                href="/contact"
                className="group/cta relative inline-flex items-center shrink-0 bg-cta-red clip-cta-slant px-6 py-3 text-white text-[13px] font-extrabold uppercase tracking-wide whitespace-nowrap shadow-[0_0_28px_-6px_rgba(220,38,38,0.75)] hover:shadow-[0_0_36px_-4px_rgba(220,38,38,0.95)] transition-shadow"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity" />
                <span className="relative">Get Free Quote</span>
              </Link>
            </div>

            {/* Mobile: phone + hamburger */}
            <div className="flex items-center gap-2 xl:hidden">
              <PhoneLink
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cta-red shadow-[0_0_16px_-4px_rgba(220,38,38,0.7)] text-xs font-bold text-white whitespace-nowrap [&>svg]:text-white"
                iconSize="sm"
                showIcon
              />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/8 transition-colors"
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Menu</span>
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden relative bg-header-nav border-t border-white/10 px-4 pb-6 pt-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-3 py-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl bg-cta-red text-white font-extrabold uppercase tracking-wide shadow-[0_0_28px_-6px_rgba(220,38,38,0.75)]"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
