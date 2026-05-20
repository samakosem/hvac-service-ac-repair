"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PhoneLink from "@/components/ui/PhoneLink";
import JsonLd from "@/components/ui/JsonLd";
import { schemaService, schemaFaqPage } from "@/lib/seo/schema";
import { serviceHref } from "@/lib/config/routes";
import { SITE } from "@/lib/config/site";
import { getAllCities } from "@/lib/config/locations";
import type { City, County } from "@/lib/config/locations";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = question.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 40);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        aria-expanded={open}
        aria-controls={`faq-${id}`}
      >
        <span className="font-semibold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-hvac-blue-700 transition-colors">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-hvac-blue-600" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div id={`faq-${id}`} className="pb-4 pr-8" role="region">
          <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-hvac-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

type Props = {
  city: City;
  county: County;
};

export default function CityPageTemplate({ city, county }: Props) {
  const canonicalPath = `/service-areas/${county.slug}/${city.slug}`;

  const serviceSchema = schemaService({
    name: `HVAC Service in ${city.name}, ${county.name}`,
    description: city.blurb,
    url: canonicalPath,
    areaServed: `${city.name}, ${county.name}, CA`,
  });
  const faqSchema = schemaFaqPage(city.faqs);

  // Resolve nearby cities for display
  const allCities = getAllCities();
  const nearbyCities = city.nearbySlugs
    .map((slug) => allCities.find((c) => c.slug === slug))
    .filter(Boolean) as City[];

  // Top services with canonical paths
  const topServices = city.topServiceSlugs.map((slug) => ({
    slug,
    href: serviceHref(slug),
    label: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  }));

  const GENERAL_SERVICES = [
    { slug: "ac-repair", label: "AC Repair" },
    { slug: "ac-installation", label: "AC Installation" },
    { slug: "ac-maintenance", label: "AC Maintenance" },
    { slug: "heating-services", label: "Heating Services" },
    { slug: "air-duct-cleaning", label: "Air Duct Cleaning" },
    { slug: "ductless-mini-split", label: "Ductless Mini-Split" },
  ].filter((s) => !city.topServiceSlugs.includes(s.slug));

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient py-14 lg:py-20">
        <div aria-hidden="true" className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-hvac-blue-600/8 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Service Areas", href: "/service-areas" },
              { name: county.name, href: `/service-areas/${county.slug}` },
              { name: city.name, href: canonicalPath },
            ]}
            className="text-slate-400 mb-6"
          />

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              HVAC Service in {city.name}, CA
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-3 max-w-2xl">
              {city.blurb}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">
              {city.localContext}
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

            <p className="mt-4 text-slate-500 text-xs">
              Based in Yorba Linda · Serving {city.name} and surrounding {county.name} cities
            </p>
          </div>
        </div>
      </section>

      {/* ── Services + Context ───────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main: top services + general services */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* Priority services */}
              <div>
                <span className="section-label section-label-blue mb-4">Top Services in {city.name}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-6 leading-tight">
                  What {city.name} Residents Call Us For
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {topServices.map((svc, i) => (
                    <Link
                      key={svc.slug}
                      href={svc.href}
                      className={`group flex flex-col gap-2 p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${i === 0 ? "bg-hvac-blue-600 border-hvac-blue-700 text-white hover:bg-hvac-blue-700" : "bg-white border-slate-200 text-slate-900 hover:border-hvac-blue-300"}`}
                    >
                      <span className={`font-bold text-sm leading-snug ${i === 0 ? "text-white" : "text-slate-900 group-hover:text-hvac-blue-700"}`}>
                        {svc.label}
                      </span>
                      <span className={`text-xs flex items-center gap-1 font-medium ${i === 0 ? "text-hvac-blue-200" : "text-hvac-blue-600"}`}>
                        Learn more
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All available services */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 text-base mb-4">All Services Available in {city.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[...topServices, ...GENERAL_SERVICES.map((s) => ({ ...s, href: serviceHref(s.slug) }))].map((svc) => (
                    <Link
                      key={svc.slug}
                      href={svc.href}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-hvac-blue-600 py-1 transition-colors"
                    >
                      <CheckIcon />
                      {svc.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <Link href="/services" className="text-sm text-copper-600 font-semibold hover:underline">
                    View all 22 services →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <p className="font-bold text-base mb-1">Schedule in {city.name}</p>
                <p className="text-slate-400 text-sm mb-4">
                  Call us or submit online — we respond within 1 hour during business hours.
                </p>
                <PhoneLink
                  className="inline-flex items-center gap-2 text-hvac-blue-400 font-semibold text-sm hover:text-hvac-blue-300 transition-colors mb-3"
                  showIcon
                  iconSize="sm"
                />
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-2.5 bg-copper-gradient text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  Request a Free Estimate
                </Link>
                <address className="not-italic mt-4 text-xs text-slate-500 space-y-0.5">
                  <p>Based at: {SITE.address.street}</p>
                  <p>{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
                  <p className="mt-2">Mon–Fri: {SITE.hours.weekdays}</p>
                  <p>Sat: {SITE.hours.saturday}</p>
                  <p>{SITE.hours.sunday}</p>
                </address>
              </div>

              {/* Nearby cities */}
              {nearbyCities.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Nearby Cities We Serve</h3>
                  <ul className="space-y-1.5">
                    {nearbyCities.map((nearby) => (
                      <li key={nearby.slug}>
                        <Link
                          href={`/service-areas/${nearby.countySlug}/${nearby.slug}`}
                          className="flex items-center gap-2 text-sm text-slate-600 hover:text-hvac-blue-600 transition-colors"
                        >
                          <svg className="w-3 h-3 text-slate-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {nearby.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <Link href={`/service-areas/${county.slug}`} className="text-xs text-copper-600 font-semibold hover:underline">
                      All {county.name} cities →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="flex flex-col gap-3">
              <span className="section-label section-label-blue w-fit">FAQ</span>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight mt-1">
                {city.name} HVAC Questions
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Common questions from {city.name} homeowners about our HVAC services.
              </p>
              <PhoneLink
                className="inline-flex items-center gap-1.5 text-hvac-blue-600 font-semibold text-sm hover:underline mt-2"
                showIcon
                iconSize="sm"
                label="Call with your question"
              />
            </div>
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm px-6">
              {city.faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient py-14">
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Schedule HVAC Service in {city.name}?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm">
            Call us or submit a free estimate request. Based in Yorba Linda — serving {city.name} and all of {county.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneLink
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
              showIcon
              label={`Call ${SITE.phoneDisplay}`}
            />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/8 text-white font-semibold rounded-xl border border-white/18 hover:bg-white/14 transition-colors text-base"
            >
              Request a Free Estimate
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <Link href="/service-areas" className="hover:text-slate-300">Service Areas</Link>
            <Link href={`/service-areas/${county.slug}`} className="hover:text-slate-300">{county.name}</Link>
            <Link href="/services" className="hover:text-slate-300">Services</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
