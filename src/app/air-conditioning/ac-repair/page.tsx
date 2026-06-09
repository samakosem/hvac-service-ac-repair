import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import SingleStepQuoteForm from "@/components/ui/SingleStepQuoteForm";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { schemaBreadcrumb, schemaService, schemaFaqPage } from "@/lib/seo/schema";
import { resolveService } from "@/lib/seo/buildServicePage";
import { IMG_AC_REPAIR } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "AC Repair — Same-Day Service | Southern California | (714) 410-2784",
    description:
      "Same-day AC repair throughout Southern California. Licensed technicians, free diagnostic with repair, written quote before any work. Call (714) 410-2784.",
    path: "/air-conditioning/ac-repair/",
  });
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function StarIcon({ filled }: { filled?: boolean }) {
  return filled ? (
    <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.885a.563.563 0 00-.652 0L4.73 19.64a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557L.734 9.345a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} filled={i <= rating} />)}
    </div>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// ── Static content ────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    name: "Lisa H.",
    location: "Yorba Linda",
    body: "Honest, fast, and fairly priced. Diagnosed a refrigerant leak in our 12-year-old Lennox unit, gave us options for repair vs. replace, and let us decide without any pressure.",
    rating: 5,
    date: "June 2025",
  },
  {
    name: "Robert N.",
    location: "Anaheim Hills",
    body: "AC died on a 100-degree Saturday. Called in the morning, tech arrived by early afternoon, replaced a bad capacitor, and had us cooling in under an hour. No weekend charge.",
    rating: 5,
    date: "July 2025",
  },
  {
    name: "Angela S.",
    location: "Irvine",
    body: "Very professional. The technician explained everything clearly and didn't pressure me into an expensive replacement when a repair was the right call.",
    rating: 5,
    date: "August 2025",
  },
];

const OC_CITIES = [
  { name: "Yorba Linda", slug: "yorba-linda" },
  { name: "Anaheim", slug: "anaheim" },
  { name: "Fullerton", slug: "fullerton" },
  { name: "Irvine", slug: "irvine" },
  { name: "Orange", slug: "orange" },
  { name: "Placentia", slug: "placentia" },
  { name: "Brea", slug: "brea" },
  { name: "Anaheim Hills", slug: "anaheim-hills" },
  { name: "Tustin", slug: "tustin" },
  { name: "Mission Viejo", slug: "mission-viejo" },
];

export default function AcRepairPage() {
  const service = resolveService("ac-repair");

  const breadcrumbSchema = schemaBreadcrumb([
    { name: "Home", href: "/" },
    { name: "Air Conditioning", href: "/air-conditioning/" },
    { name: "AC Repair", href: "/air-conditioning/ac-repair/" },
  ]);
  const serviceSchema = schemaService({
    name: "AC Repair — Same-Day Service",
    description: service.metaDescription,
    url: "/air-conditioning/ac-repair/",
    areaServed: "Orange County",
  });
  const faqSchema = schemaFaqPage(service.faqs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-start bg-hero-gradient overflow-hidden"
        style={{ minHeight: "calc(100svh - 0px)" }}
        aria-label="Hero"
      >
        {/* Background photo */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src={IMG_AC_REPAIR.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/60 to-navy-950/30" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
        <div aria-hidden="true" className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-hvac-blue-600/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* LEFT */}
            <div className="flex flex-col gap-5">

              {/* Open Now badge */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  Open Now — Accepting Same-Day Calls
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-400/25 text-red-300 text-xs font-bold uppercase tracking-wider">
                  <BoltIcon className="w-3 h-3" />
                  Emergency Service Available
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  Tech Available in Your Area
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.1rem] font-bold text-white leading-[1.1] tracking-tight">
                AC Repair — Same-Day Service, Southern California
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                {service.heroSubtext}
              </p>

              {/* Mobile: phone button first */}
              <div className="lg:hidden">
                <PhoneLink
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 active:scale-[0.98] transition-all text-lg"
                  showIcon
                  label={`Call Now — ${SITE.phoneDisplay}`}
                />
              </div>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-3 pt-1">
                <PhoneLink
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-92 active:scale-[0.98] transition-all text-base"
                  showIcon
                  label={`Call Now — ${SITE.phoneDisplay}`}
                />
                <a
                  href="#estimate-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/9 text-white font-semibold rounded-xl border border-white/16 hover:bg-white/15 active:scale-[0.98] transition-all text-base"
                >
                  Get Same-Day Service
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Pricing anchor — above fold */}
              <div className="flex items-center gap-3 bg-white/6 border border-white/10 rounded-xl px-4 py-3 w-fit">
                <ShieldIcon className="w-5 h-5 text-copper-400 shrink-0" />
                <p className="text-slate-200 text-sm">
                  <span className="font-bold text-white">Diagnostic: Free</span> — no charge to identify the problem · Written quote before any work
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {["Licensed & Insured", "CSLB Certified", "EPA Certified", "Same-Day Service", "Free Estimates", "0% Financing"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/7 border border-white/10 text-xs font-medium text-slate-200">
                    <CheckIcon className="w-3 h-3 text-emerald-400" />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Form (desktop) */}
            <div id="estimate-form" className="hidden lg:block bg-white rounded-2xl shadow-xl p-7 border border-white/10">
              <SingleStepQuoteForm
                heading="Get Same-Day AC Repair Service"
                subheading="We respond within 1 hour · Real people answer your call"
                ctaLabel="Get Same-Day Service"
                defaultService="AC Repair"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile form */}
      <div id="estimate-form-mobile" className="lg:hidden bg-white px-4 py-8 border-b border-slate-100">
        <div className="max-w-xl mx-auto">
          <SingleStepQuoteForm
            heading="Get Same-Day Service"
            subheading="We respond within 1 hour · Real people answer"
            ctaLabel="Get Same-Day Service"
            defaultService="AC Repair"
          />
        </div>
      </div>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy-950 border-y border-white/6 py-4" aria-label="Trust signals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-300">
            {[
              { icon: <ShieldIcon className="w-4 h-4 text-copper-400" />, text: "CSLB Licensed & Insured" },
              { icon: <CheckIcon className="w-4 h-4 text-emerald-400" />, text: "EPA Certified" },
              { icon: <BoltIcon className="w-4 h-4 text-copper-400" />, text: "Same-Day Availability" },
              { icon: <CheckIcon className="w-4 h-4 text-emerald-400" />, text: "Free Estimates" },
              { icon: <CheckIcon className="w-4 h-4 text-emerald-400" />, text: "0% Financing Available" },
              { icon: <CheckIcon className="w-4 h-4 text-emerald-400" />, text: "Based in Yorba Linda" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED + PRICING ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-white" aria-labelledby="included-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — what's included */}
            <div className="flex flex-col gap-5">
              <div className="section-label section-label-blue w-fit">What&rsquo;s Included</div>
              <h2 id="included-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {service.heroHeadline}
              </h2>
              <ul className="flex flex-col gap-3">
                {service.whatItIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-hvac-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-hvac-blue-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <PhoneLink
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
                  showIcon
                  label={`Call ${SITE.phoneDisplay}`}
                />
                <a
                  href="#estimate-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-800 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all text-base"
                >
                  Request Free Estimate
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right — pricing card + signs */}
            <div className="flex flex-col gap-5">
              {/* Pricing */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 flex flex-col gap-4">
                <div className="section-label section-label-blue w-fit">Transparent Pricing</div>
                <h3 className="text-xl font-bold text-slate-900">No Surprise Bills</h3>
                <div className="flex flex-col gap-3">
                  {[
                    "Diagnostic: Free",
                    "Most common repairs: $150–$450",
                    "Full system replacement: free estimate",
                    "0% financing on repairs over $500",
                    "Written quote approved before any work starts",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {line}
                    </div>
                  ))}
                </div>
                <div className="bg-hvac-blue-50 rounded-xl px-4 py-3 border border-hvac-blue-100">
                  <p className="text-hvac-blue-800 font-semibold text-sm">
                    Diagnostic: Free — no charge to identify the problem.
                  </p>
                </div>
              </div>

              {/* Signs you need it */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Signs You Need AC Repair</h3>
                <ul className="flex flex-col gap-2">
                  {service.signsYouNeedThis.map((sign) => (
                    <li key={sign} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <span className="text-slate-600 text-sm leading-relaxed">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-section-dark" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label section-label-white w-fit mx-auto mb-3">How It Works</div>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-white">
              Simple 4-Step Process
            </h2>
            <p className="text-slate-500 text-lg mt-3 max-w-2xl mx-auto">
              From your first call to a running system — no confusion, no runaround.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, i) => (
              <div key={i} className="relative flex flex-col gap-4">
                {i < service.processSteps.length - 1 && (
                  <div aria-hidden="true" className="hidden lg:block absolute top-6 left-[calc(50%+1.75rem)] w-full h-0.5 bg-white/8" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-hvac-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-white" aria-labelledby="reviews-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">Customer Reviews</div>
            <h2 id="reviews-heading" className="text-3xl sm:text-4xl font-bold text-slate-900">
              What Orange County Homeowners Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Stars rating={5} />
              <span className="font-bold text-slate-800">5.0</span>
              <span className="text-slate-500 text-sm">· 100+ Google reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
                <Stars rating={review.rating} />
                <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{review.body}&rdquo;</p>
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-slate-900 font-semibold text-sm">{review.name}</p>
                  <p className="text-slate-400 text-xs">{review.location} · {review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE CITIES ───────────────────────────────────────────────────── */}
      <section className="py-12 bg-warm-gray" aria-labelledby="cities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="cities-heading" className="text-lg font-bold text-slate-800 mb-4">
            AC Repair — Orange County Service Areas
          </h2>
          <div className="flex flex-wrap gap-3">
            {OC_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/air-conditioning/ac-repair/${city.slug}/`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm hover:border-hvac-blue-300 hover:text-hvac-blue-700 transition-colors"
              >
                AC Repair in {city.name}
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">FAQ</div>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-slate-900">
              Common Questions — AC Repair Orange County
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {service.faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-100 shadow-sm">
                <summary className="flex items-start justify-between gap-4 cursor-pointer p-6 font-semibold text-slate-900 list-none">
                  <span>{faq.question}</span>
                  <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-open:rotate-45 transition-transform">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-hero-gradient" aria-label="Final CTA">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="flex flex-col gap-5">
              <div className="section-label section-label-white w-fit">Ready to Get Fixed?</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                AC Not Cooling? We&rsquo;re Available Today — Southern California.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Free estimates. Same-day availability. Real people answer your call. Based in Yorba Linda — serving all of Orange County.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-slate-400 text-sm">Mon–Fri {SITE.hours.weekdays} · Sat {SITE.hours.saturday}</p>
                <p className="text-slate-400 text-sm">{SITE.address.full}</p>
                <p className="text-slate-400 text-sm">CSLB Licensed · EPA Certified · Fully Insured</p>
              </div>
              <PhoneLink
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
                showIcon
                label={`Call Now — ${SITE.phoneDisplay}`}
              />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-7">
              <SingleStepQuoteForm
                heading="Request Same-Day AC Service"
                subheading="We'll respond within 1 hour during business hours."
                ctaLabel="Get Same-Day Service"
                defaultService="AC Repair"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy-950/95 backdrop-blur border-t border-white/10 safe-area-bottom">
        <div className="flex items-stretch">
          <PhoneLink
            className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-red-500 text-white font-bold text-base"
            showIcon
            label={`Call ${SITE.phoneDisplay}`}
          />
          <a
            href="#estimate-form-mobile"
            className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-navy-800 text-white font-semibold text-base border-l border-white/10"
          >
            Free Estimate
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
