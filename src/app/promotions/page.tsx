import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import JsonLd from "@/components/ui/JsonLd";
import CtaSection from "@/components/ui/CtaSection";
import InteriorHero from "@/components/layout/InteriorHero";

export const metadata: Metadata = {
  title: "HVAC Promotions & Seasonal Specials | Orange County, CA",
  description:
    "Check current HVAC promotions from HVAC Service & AC Repair in Yorba Linda. AC tune-ups, maintenance plan deals, and seasonal specials for Orange County homeowners.",
  alternates: { canonical: "/promotions" },
};

const PROMOTIONS = [
  {
    badge: "Spring Special",
    title: "AC Tune-Up & Inspection",
    description:
      "Get your AC system inspected and serviced before summer hits. Includes full system check, coil cleaning, drain line flush, thermostat test, and a written service report.",
    cta: "Book a Tune-Up",
    href: "/maintenance/residential-maintenance-plan",
    badgeColor: "bg-hvac-blue-100 text-hvac-blue-700",
    available: true,
  },
  {
    badge: "Maintenance Plan",
    title: "Seasonal HVAC Maintenance Program",
    description:
      "Sign up for our residential maintenance program and get your system inspected twice a year — spring and fall. Priority scheduling included.",
    cta: "Learn About Maintenance Plans",
    href: "/maintenance-plans",
    badgeColor: "bg-copper-100 text-copper-700",
    available: true,
  },
  {
    badge: "Installation Offer",
    title: "Free Quote on New AC Systems",
    description:
      "Thinking about replacing your aging AC? We&rsquo;ll come out, assess your home, and give you a detailed quote at no cost. No pressure, just honest numbers.",
    cta: "Get a Free Installation Quote",
    href: "/air-conditioning/ac-installation",
    badgeColor: "bg-emerald-100 text-emerald-700",
    available: true,
  },
  {
    badge: "Financing",
    title: "Flexible Financing for New Systems",
    description:
      "Don&rsquo;t let the upfront cost hold you back. Ask us about financing options on new AC installations and replacements — monthly payment plans available.",
    cta: "Learn About Financing",
    href: "/financing",
    badgeColor: "bg-amber-100 text-amber-700",
    available: true,
  },
];

export default function PromotionsPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={[{ name: "Promotions", href: "/promotions" }]}
        eyebrow="Current Offers"
        heading="Seasonal Specials &amp; HVAC Deals"
        description="Whether you're prepping for summer or thinking about a new system, check what's available now. Call us to confirm current pricing and availability."
      />

      {/* Promotions grid */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMOTIONS.map((promo) => (
              <div
                key={promo.title}
                className="rounded-2xl border border-slate-200 bg-white shadow-card p-7 flex flex-col gap-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${promo.badgeColor}`}>
                    {promo.badge}
                  </span>
                  {promo.available && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                      Available Now
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900 mb-2">{promo.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{promo.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={promo.href}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    {promo.cta}
                  </Link>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-colors"
                  >
                    Call to Confirm
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            Promotions and pricing are subject to change. Call us at{" "}
            <a href={`tel:${SITE.phone}`} className="text-hvac-blue-600 hover:underline">
              {SITE.phoneDisplay}
            </a>{" "}
            to confirm current availability and pricing for your area.
          </p>
        </div>
      </section>

      <CtaSection
        heading="Have a Question About a Current Offer?"
        subtext="Call us or request an estimate — we'll explain what's available and what makes sense for your system."
        primaryLabel="Request a Free Estimate"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
