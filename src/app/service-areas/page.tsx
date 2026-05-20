import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PhoneLink from "@/components/ui/PhoneLink";
import JsonLd from "@/components/ui/JsonLd";
import { schemaLocalBusiness } from "@/lib/seo/schema";
import { SERVICE_AREA_COUNTIES } from "@/lib/config/locations";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "HVAC Service Areas in Southern California | Orange County & Beyond",
  description:
    "HVAC Service & AC Repair serves Orange County, Riverside County, San Bernardino County, and Ventura County. Based in Yorba Linda — same-day service across most of OC. Call (714) 410-2784.",
  path: "/service-areas",
});

const COUNTY_ICONS: Record<string, string> = {
  "orange-county":
    "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  "riverside-county":
    "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  "san-bernardino-county":
    "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z",
  "ventura-county":
    "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  "santa-barbara-county":
    "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z",
};

const COVERAGE_NOTE: Record<string, string> = {
  "orange-county": "Same-day service · Core territory",
  "riverside-county": "Same-day service · Adjacent to OC",
  "san-bernardino-county": "Same-day service · Chino Valley area",
  "ventura-county": "Scheduled service · Extended area",
  "santa-barbara-county": "Scheduled service · Limited availability",
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={schemaLocalBusiness()} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-14 lg:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
        <div aria-hidden="true" className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-hvac-blue-600/8 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Service Areas", href: "/service-areas" }]}
            className="text-slate-400 mb-6"
          />
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              HVAC Service Areas in Southern California
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Based in Yorba Linda, we provide AC repair, installation, heating, and ductless HVAC
              across Orange County and surrounding areas. Same-day service for most of Orange County.
            </p>
            <address className="not-italic text-sm text-slate-400 mb-7">
              <span className="font-medium text-slate-300">{SITE.name}</span> ·{" "}
              {SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
            </address>
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

      {/* County cards */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-label section-label-blue mb-4">Counties We Serve</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              Service Coverage by County
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREA_COUNTIES.map((county) => (
              <Link
                key={county.slug}
                href={`/service-areas/${county.slug}`}
                className="group flex flex-col gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-hvac-blue-300 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-hvac-blue-50 border border-hvac-blue-100 flex items-center justify-center shrink-0 group-hover:bg-hvac-blue-100 transition-colors">
                    <svg
                      className="w-5 h-5 text-hvac-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={COUNTY_ICONS[county.slug] ?? COUNTY_ICONS["orange-county"]} />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-hvac-blue-700 transition-colors">
                      {county.name}
                    </h3>
                    <p className="text-xs text-copper-600 font-medium mt-0.5">
                      {COVERAGE_NOTE[county.slug]}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{county.blurb}</p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{county.cities.length} cities</span>
                  <span className="text-sm font-semibold text-hvac-blue-600 group-hover:text-hvac-blue-500 flex items-center gap-1">
                    View cities
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OC cities quick-grid */}
      <section className="py-14 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <h2 className="text-xl font-bold text-slate-900">Orange County Cities We Serve</h2>
            <Link href="/service-areas/orange-county" className="text-sm text-hvac-blue-600 font-semibold hover:underline">
              View full Orange County page →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {SERVICE_AREA_COUNTIES[0].cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/orange-county/${city.slug}`}
                className="flex items-center gap-2 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 font-medium hover:border-hvac-blue-400 hover:text-hvac-blue-700 transition-colors shadow-sm group"
              >
                <svg className="w-3 h-3 text-slate-400 group-hover:text-hvac-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-brand-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-bold text-xl mb-2">Not sure if we cover your area?</p>
          <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
            Call us and tell us your city. We&rsquo;ll confirm availability and give you an honest answer about scheduling.
          </p>
          <PhoneLink
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 transition-all text-base"
            showIcon
            label={`Call ${SITE.phoneDisplay}`}
          />
        </div>
      </section>
    </>
  );
}
