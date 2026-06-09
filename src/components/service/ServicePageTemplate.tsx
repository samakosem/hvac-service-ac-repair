"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PhoneLink from "@/components/ui/PhoneLink";
import JsonLd from "@/components/ui/JsonLd";
import ConversionTrustBar from "@/components/ui/ConversionTrustBar";
import EmergencyCallout from "@/components/ui/EmergencyCallout";
import FinancingTeaser from "@/components/ui/FinancingTeaser";
import { schemaService, schemaFaqPage } from "@/lib/seo/schema";
import { SITE } from "@/lib/config/site";
import { serviceHref, SILO_PARENTS } from "@/lib/config/routes";
import type { ServiceContent } from "@/lib/content/services";
import type { SiteImage } from "@/lib/config/images";

// ─── FAQ Accordion (client interaction only) ─────────────────────────────────

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
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
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

// ─── Check icon ──────────────────────────────────────────────────────────────

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

// ─── Main Template ────────────────────────────────────────────────────────────

type Props = { service: ServiceContent; image?: SiteImage };

export default function ServicePageTemplate({ service, image }: Props) {
  const canonicalPath = serviceHref(service.slug);

  // Build breadcrumb trail: Home > [Silo Parent?] > Current Page
  // Find if this page lives under a silo by matching its path prefix
  const siloKey = Object.keys(SILO_PARENTS).find(
    (k) => canonicalPath.startsWith(k + "/") && canonicalPath !== k
  );
  const siloParent = siloKey ? SILO_PARENTS[siloKey] : null;

  const breadcrumbItems = siloParent
    ? [
        { name: "Services", href: "/services" },
        { name: siloParent.name, href: siloParent.href },
        { name: service.h1, href: canonicalPath },
      ]
    : [
        { name: "Services", href: "/services" },
        { name: service.h1, href: canonicalPath },
      ];

  const serviceSchema = schemaService({
    name: service.h1,
    description: service.metaDescription,
    url: canonicalPath,
  });
  const faqSchema = schemaFaqPage(service.faqs);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient py-14 lg:py-20">
        {image && (
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <Image
              src={image.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/50 to-navy-950/20" />
          </div>
        )}
        <div aria-hidden="true" className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-hvac-blue-600/8 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-copper-500/6 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={breadcrumbItems}
            className="text-slate-400 mb-6"
          />

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {service.h1}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
              {service.heroSubtext}
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
              Same-day appointments available · Serving Southern California
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <ConversionTrustBar variant="light" />

      {/* ── What's Included ──────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: included list */}
            <div>
              <span className="section-label section-label-blue mb-4">What&rsquo;s Included</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-6 leading-tight">
                {service.heroHeadline}
              </h2>
              <ul className="space-y-3">
                {service.whatItIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-hvac-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: optional photo + signs you need this */}
            <div className="flex flex-col gap-5">
              {image && (
                <div className="relative rounded-2xl overflow-hidden shadow-card" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                <h3 className="font-bold text-slate-900 text-lg mb-5">Signs You May Need This Service</h3>
                <ul className="space-y-3">
                  {service.signsYouNeedThis.map((sign) => (
                    <li key={sign} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <span className="text-slate-600 text-sm leading-relaxed">{sign}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-3">Not sure what you need? We can help.</p>
                  <PhoneLink
                    className="inline-flex items-center gap-1.5 text-hvac-blue-600 font-semibold text-sm hover:underline"
                    showIcon
                    iconSize="sm"
                    label={`Call ${SITE.phoneDisplay}`}
                  />
                </div>
              </div>

              {/* Emergency callout card */}
              <EmergencyCallout variant="card" />

              {/* Financing teaser */}
              <FinancingTeaser variant="inline" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Steps ────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-label section-label-copper mb-4">Our Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              What to Expect
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            {service.processSteps.length <= 5 && (
              <div
                className="hidden lg:block absolute top-9 left-[calc(12.5%+1.25rem)] right-[calc(12.5%+1.25rem)] h-0.5 bg-gradient-to-r from-hvac-blue-200 via-copper-200 to-hvac-blue-200"
                aria-hidden="true"
              />
            )}

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${service.processSteps.length === 4 ? "lg:grid-cols-4" : service.processSteps.length === 3 ? "lg:grid-cols-3" : service.processSteps.length <= 5 ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}>
              {service.processSteps.map((step, i) => (
                <div
                  key={step.title}
                  className={`flex flex-col gap-4 text-center items-center animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                >
                  <div className="relative z-10 w-9 h-9 rounded-full bg-white border-2 border-hvac-blue-400 flex items-center justify-center font-black text-hvac-blue-600 text-sm shadow-sm">
                    {i + 1}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Inline CTA strip ─────────────────────────────────────────────── */}
      <section className="py-10 bg-brand-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-white font-bold text-lg">{service.ctaHeadline}</p>
              <p className="text-slate-300 text-sm mt-1">{service.ctaSubtext}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <PhoneLink
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-copper-gradient text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
                showIcon
                label={`Call ${SITE.phoneDisplay}`}
              />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/16 transition-colors text-sm"
              >
                Get a Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            <div className="lg:col-span-1 flex flex-col gap-4">
              <span className="section-label section-label-blue w-fit">FAQ</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mt-1">
                Common Questions
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Answers to the questions we hear most from Southern California homeowners and business owners.
              </p>
              <div className="mt-2">
                <PhoneLink
                  className="inline-flex items-center gap-1.5 text-hvac-blue-600 font-semibold text-sm hover:underline"
                  showIcon
                  iconSize="sm"
                  label="Still have questions? Call us"
                />
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm px-6">
              {service.faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Services ─────────────────────────────────────────────── */}
      {service.relatedSlugs.length > 0 && (
        <section className="py-14 bg-warm-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              {service.relatedSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={serviceHref(slug)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium hover:border-hvac-blue-300 hover:text-hvac-blue-700 transition-colors shadow-sm"
                >
                  {slug
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA Band ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient py-14 lg:py-18">
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            {service.ctaHeadline}
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            {service.ctaSubtext}
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
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-slate-300 transition-colors">All Services</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/service-areas" className="hover:text-slate-300 transition-colors">Service Areas</Link>
          </div>
        </div>
      </section>
    </>
  );
}
