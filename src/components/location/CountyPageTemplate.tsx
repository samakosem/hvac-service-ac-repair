"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { IMG_AC_REPAIR } from "@/lib/config/images";
import PhoneLink from "@/components/ui/PhoneLink";
import JsonLd from "@/components/ui/JsonLd";
import { schemaService, schemaFaqPage, schemaBreadcrumb } from "@/lib/seo/schema";
import { serviceHref } from "@/lib/config/routes";
import { SITE } from "@/lib/config/site";
import type { County } from "@/lib/config/locations";

// Key services to surface on county pages
const COUNTY_SERVICES = [
  { slug: "ac-repair", label: "AC Repair" },
  { slug: "ac-installation", label: "AC Installation" },
  { slug: "ac-maintenance", label: "AC Maintenance" },
  { slug: "heating-services", label: "Heating Services" },
  { slug: "commercial-hvac", label: "Commercial HVAC" },
  { slug: "air-duct-services", label: "Air Duct Services" },
  { slug: "ductless-mini-split", label: "Ductless Mini-Split" },
  { slug: "heat-pump-services", label: "Heat Pump Services" },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        aria-expanded={open}
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
        <div className="pb-4 pr-8">
          <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

type Props = {
  county: County;
  faqs: { question: string; answer: string }[];
};

export default function CountyPageTemplate({ county, faqs }: Props) {
  const canonicalPath = `/service-areas/${county.slug}`;

  const serviceSchema = schemaService({
    name: `HVAC Service in ${county.name}`,
    description: county.blurb,
    url: canonicalPath,
    areaServed: county.name,
  });
  const faqSchema = schemaFaqPage(faqs);
  const breadcrumbSchema = schemaBreadcrumb([
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: county.name, href: canonicalPath },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient py-14 lg:py-20">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src={IMG_AC_REPAIR.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/50 to-navy-950/20" />
        </div>
        <div aria-hidden="true" className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-hvac-blue-600/8 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Service Areas", href: "/service-areas" },
              { name: county.name, href: canonicalPath },
            ]}
            className="text-slate-400 mb-6"
          />

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              HVAC Service in {county.name}, CA
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-4 max-w-2xl">
              {county.serviceNote}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">
              {county.climateNote}
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

      {/* ── Cities grid ──────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Cities list */}
            <div className="lg:col-span-2">
              <span className="section-label section-label-blue mb-4">Cities We Serve</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-6 leading-tight">
                {county.name} Service Locations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {county.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-areas/${county.slug}/${city.slug}`}
                    className="group flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-hvac-blue-300 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-hvac-blue-700 transition-colors">
                        {city.name}
                      </h3>
                      <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-hvac-blue-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{city.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar: services + NAP */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Services Available</h3>
                <ul className="space-y-2">
                  {COUNTY_SERVICES.map((svc) => (
                    <li key={svc.slug}>
                      <Link
                        href={serviceHref(svc.slug)}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-hvac-blue-600 transition-colors group"
                      >
                        <svg className="w-3.5 h-3.5 text-hvac-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {svc.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link href="/services" className="text-xs text-copper-600 font-semibold hover:underline">
                    View all services →
                  </Link>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <p className="font-bold text-base mb-1">Schedule Service</p>
                <p className="text-slate-400 text-sm mb-4">Call or submit a request — we respond within 1 hour during business hours.</p>
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
                  <p>{SITE.address.street}</p>
                  <p>{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
                </address>
              </div>
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
                Common Questions
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Answers specific to HVAC service in {county.name}.
              </p>
              <PhoneLink
                className="inline-flex items-center gap-1.5 text-hvac-blue-600 font-semibold text-sm hover:underline mt-2"
                showIcon
                iconSize="sm"
                label="Still have questions? Call us"
              />
            </div>
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm px-6">
              {faqs.map((faq) => (
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
            Need HVAC Service in {county.name}?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm">
            Call us or request a free estimate online. Based in Yorba Linda — serving {county.name} and surrounding areas.
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
            <Link href="/service-areas" className="hover:text-slate-300">All Service Areas</Link>
            <Link href="/services" className="hover:text-slate-300">Services</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
