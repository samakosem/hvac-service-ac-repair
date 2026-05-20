import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PhoneLink from "@/components/ui/PhoneLink";
import { SERVICE_CONTENT } from "@/lib/content/services";
import { serviceHref } from "@/lib/config/routes";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "HVAC Services in Orange County, CA | AC Repair, Heating & More",
  description:
    "Full-service HVAC company in Yorba Linda, CA. AC repair, installation, heating, ductless systems, commercial HVAC, air duct services, and more across Orange County. Call (714) 410-2784.",
  path: "/services",
  noIndex: true,
});

const CATEGORY_LABELS: Record<string, string> = {
  cooling: "Air Conditioning",
  heating: "Heating",
  ductwork: "Air Duct Services",
  commercial: "Commercial HVAC",
  maintenance: "Maintenance Plans",
};

const CATEGORY_ORDER = ["cooling", "heating", "ductwork", "commercial", "maintenance"];

const CATEGORY_ICONS: Record<string, string> = {
  cooling: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  heating: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z",
  ductwork: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z",
  commercial: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  maintenance: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z",
};

function ServiceCard({ slug, h1, heroSubtext, category }: { slug: string; h1: string; heroSubtext: string; category: string }) {
  return (
    <Link
      href={serviceHref(slug)}
      className="group flex flex-col gap-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-hvac-blue-300 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-hvac-blue-700 transition-colors">
          {h1}
        </h3>
        <svg
          className="w-4 h-4 text-slate-300 shrink-0 mt-0.5 group-hover:text-hvac-blue-400 group-hover:translate-x-0.5 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{heroSubtext}</p>
    </Link>
  );
}

export default function ServicesPage() {
  const byCategory = CATEGORY_ORDER.reduce<Record<string, typeof SERVICE_CONTENT>>((acc, cat) => {
    acc[cat] = SERVICE_CONTENT.filter((s) => s.category === cat);
    return acc;
  }, {});

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-14 lg:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Services", href: "/services" }]}
            className="text-slate-400 mb-6"
          />
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              HVAC Services in Orange County, CA
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Air conditioning, heating, ductless systems, air duct services, and commercial HVAC — all from our Yorba Linda team. Same-day appointments across Orange County.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <PhoneLink
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
                showIcon
                label={`Call ${SITE.phoneDisplay}`}
              />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/8 text-white font-semibold rounded-xl border border-white/18 hover:bg-white/14 transition-colors text-base"
              >
                Request a Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services by category */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {CATEGORY_ORDER.map((cat) => {
            const services = byCategory[cat];
            if (!services || services.length === 0) return null;
            const iconPath = CATEGORY_ICONS[cat];
            return (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-hvac-blue-50 border border-hvac-blue-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{CATEGORY_LABELS[cat]}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((s) => (
                    <ServiceCard
                      key={s.slug}
                      slug={s.slug}
                      h1={s.h1}
                      heroSubtext={s.heroSubtext}
                      category={s.category}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-brand-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-bold text-xl mb-2">Not sure which service you need?</p>
          <p className="text-slate-300 text-sm mb-6 max-w-lg mx-auto">
            Call us and describe what&rsquo;s happening — we&rsquo;ll point you in the right direction, no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneLink
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 transition-all text-base"
              showIcon
              label={`Call ${SITE.phoneDisplay}`}
            />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/16 transition-colors text-base"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
