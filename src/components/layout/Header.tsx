"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SITE } from "@/lib/config/site";
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-dark shadow-glass py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
            aria-label={`${SITE.name} — Home`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-copper-gradient shadow-glow-copper">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm tracking-wide">
                HVAC Service
              </span>
              <span className="text-hvac-blue-400 text-xs font-medium tracking-wider">
                &amp; AC Repair
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/8 transition-colors"
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
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
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/8 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <PhoneLink
              className="flex items-center gap-2 text-sm font-semibold text-hvac-blue-400 hover:text-hvac-blue-300 transition-colors"
              showIcon
            />
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-copper-gradient text-white text-sm font-semibold shadow-glow-copper hover:opacity-90 transition-opacity"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <PhoneLink
              className="flex items-center gap-1.5 text-xs font-semibold text-hvac-blue-400"
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
        <div className="lg:hidden glass-dark border-t border-white/10 mt-3 px-4 pb-6 pt-4 space-y-1 max-h-[80vh] overflow-y-auto">
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
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-copper-gradient text-white font-semibold shadow-glow-copper"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
