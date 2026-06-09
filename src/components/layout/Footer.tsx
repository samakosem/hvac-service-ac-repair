import Link from "next/link";
import { SITE } from "@/lib/config/site";
import PhoneLink from "@/components/ui/PhoneLink";
import { SERVICE_AREA_COUNTIES } from "@/lib/config/locations";

const FOOTER_SERVICE_LINKS = [
  { label: "Air Conditioning",     href: "/air-conditioning" },
  { label: "AC Repair",            href: "/air-conditioning/ac-repair" },
  { label: "AC Installation",      href: "/air-conditioning/ac-installation" },
  { label: "Ductless Mini-Split",  href: "/ductless/ductless-mini-split" },
  { label: "Heating Services",     href: "/heating" },
  { label: "Furnace Repair",       href: "/heating/furnace-repair" },
  { label: "Commercial HVAC",      href: "/commercial-hvac" },
  { label: "Air Duct Services",    href: "/air-duct-services" },
  { label: "Air Duct Cleaning",    href: "/air-duct-services/air-duct-cleaning" },
  { label: "Heat Pump Services",   href: "/heat-pumps" },
];

const FOOTER_CITY_LINKS = SERVICE_AREA_COUNTIES[0].cities.slice(0, 10).map((c) => ({
  label: c.name,
  href: `/service-areas/orange-county/${c.slug}`,
}));

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-section-dark text-slate-300">
      {/* CTA band */}
      <div className="bg-copper-gradient py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-white font-bold text-xl">
              Need AC Repair or HVAC Service Today?
            </p>
            <p className="text-orange-100 text-sm mt-1">
              Same-day appointments available. Call now or request a free quote online.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <PhoneLink
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-copper-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm"
              showIcon
            />
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-3 bg-navy-900/80 text-white font-semibold rounded-xl border border-white/20 hover:bg-navy-900 transition-colors text-sm"
            >
              Free Quote Online
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-copper-gradient">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-sm">{SITE.shortName}</span>
                <span className="text-hvac-blue-400 text-xs">&amp; AC Repair</span>
              </div>
            </Link>
            <address className="not-italic text-sm text-slate-400 space-y-1.5 mb-4">
              <p>{SITE.address.street}</p>
              <p>{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
              <p className="text-slate-500 text-xs mt-3">Mon–Fri: {SITE.hours.weekdays}</p>
              <p className="text-slate-500 text-xs">Sat: {SITE.hours.saturday}</p>
              <p className="text-slate-500 text-xs">{SITE.hours.sunday}</p>
            </address>
            <PhoneLink
              className="inline-flex items-center gap-2 text-hvac-blue-400 hover:text-hvac-blue-300 font-semibold text-sm transition-colors"
              showIcon
            />
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-hvac-blue-400 transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm text-copper-400 hover:text-copper-300 font-medium transition-colors"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {FOOTER_CITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-hvac-blue-400 transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="text-sm text-copper-400 hover:text-copper-300 font-medium transition-colors"
                >
                  All Service Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about-us" },
                { label: "Reviews", href: "/reviews" },
                { label: "Financing Options", href: "/financing" },
                { label: "Blog", href: "/blog" },
                { label: "Calculators", href: "/calculators" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-hvac-blue-400 transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="mt-6 pt-5 border-t border-white/8">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
                Trusted &amp; Verified
              </p>
              <div className="flex flex-wrap gap-2">
                {["Licensed", "Insured", "EPA Certified"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/6 border border-white/10 text-xs text-slate-300 font-medium"
                  >
                    <svg className="w-3 h-3 text-hvac-blue-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>
            Website design and marketing by{" "}
            <a
              href="https://www.bigbrandify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              BigBrandify
            </a>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
