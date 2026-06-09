import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import SingleStepQuoteForm from "@/components/ui/SingleStepQuoteForm";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";
import { schemaBreadcrumb, schemaService, schemaFaqPage } from "@/lib/seo/schema";
import type { CityServicePage } from "@/lib/config/city-service-pages";

// ── Icon helpers ──────────────────────────────────────────────────────────────

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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
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

// ── Component ────────────────────────────────────────────────────────────────

type Props = {
  page: CityServicePage;
  isEmergency?: boolean;
};

export default function CityServicePageTemplate({ page, isEmergency = false }: Props) {
  const pageUrl = `${page.urlBase}/${page.citySlug}/`;
  const canonicalUrl = `${SITE.domain}${pageUrl}`;

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: page.serviceName, href: page.urlBase + "/" },
    { name: `${page.cityName}, CA`, href: pageUrl },
  ];

  const breadcrumbSchema = schemaBreadcrumb(breadcrumbItems);
  const serviceSchema = schemaService({
    name: `${page.serviceName} in ${page.cityName}, CA`,
    description: page.metaDescription,
    url: pageUrl,
    areaServed: page.cityName,
  });
  const faqSchema = schemaFaqPage(page.faqs);

  const heroAccent = isEmergency ? "bg-red-500/15 border-red-400/25 text-red-300" : "bg-copper-500/15 border-copper-400/25 text-copper-300";
  const ctaLabel = isEmergency ? "Get Emergency Help Now" : "Get Same-Day Service";
  const defaultService = isEmergency ? "Emergency AC Repair" : page.serviceName === "Heating Repair" ? "Heating / Furnace Repair" : page.serviceName === "AC Tune-Up" ? "AC Maintenance / Tune-Up" : "AC Repair";

  return (
    <>
      {/* Schema */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-start bg-hero-gradient overflow-hidden"
        style={{ minHeight: "calc(100svh - 0px)" }}
        aria-label="Hero"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-hvac-blue-600/8 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-copper-500/7 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* LEFT — Copy */}
            <div className="flex flex-col gap-5">

              {/* Status badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${heroAccent}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  Open Now — Accepting {isEmergency ? "Emergency" : "Same-Day"} Calls
                </span>
                {/* Tech available badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  Tech Available in Your Area
                </span>
                {isEmergency && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-400/25 text-red-300 text-xs font-bold uppercase tracking-wider">
                    <BoltIcon className="w-3 h-3" />
                    Emergency Service
                  </span>
                )}
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.1rem] font-bold text-white leading-[1.1] tracking-tight">
                {page.h1}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                {page.heroSubheadline}
              </p>

              {/* Mobile — phone first */}
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
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-92 active:scale-[0.98] transition-all text-base"
                  showIcon
                  label={`Call Now — ${SITE.phoneDisplay}`}
                />
                <a
                  href="#estimate-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/9 text-white font-semibold rounded-xl border border-white/16 hover:bg-white/15 active:scale-[0.98] transition-all text-base"
                >
                  Request Free Estimate
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Pricing anchor — visible without scrolling */}
              <div className="flex items-center gap-3 bg-white/6 border border-white/10 rounded-xl px-4 py-3 w-fit">
                <ShieldIcon className="w-5 h-5 text-copper-400 shrink-0" />
                <p className="text-slate-200 text-sm">
                  <span className="font-bold text-white">Diagnostic: Free</span> — no charge to identify the problem · Written quote before any work
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {["Licensed & Insured", "EPA Certified", "Same-Day Service", "Free Estimates", "0% Financing"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/7 border border-white/10 text-xs font-medium text-slate-200">
                    <CheckIcon className="w-3 h-3 text-emerald-400" />
                    {b}
                  </span>
                ))}
              </div>

              {/* Urgency note */}
              <p className="text-slate-400 text-sm italic">{page.urgencyNote}</p>
            </div>

            {/* RIGHT — Form */}
            <div id="estimate-form" className="hidden lg:block bg-white rounded-2xl shadow-xl p-7 border border-slate-100">
              <SingleStepQuoteForm
                heading={`Get ${isEmergency ? "Emergency Help" : "Same-Day Service"} in ${page.cityName}`}
                subheading={`We respond within 1 hour · Average arrival: ${page.responseTime}`}
                ctaLabel={ctaLabel}
                defaultService={defaultService}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile form — below hero */}
      <div id="estimate-form-mobile" className="lg:hidden bg-white px-4 py-8 border-b border-slate-100">
        <div className="max-w-xl mx-auto">
          <SingleStepQuoteForm
            heading={`Free Estimate in ${page.cityName}`}
            subheading={`We respond within 1 hour · Average arrival: ${page.responseTime}`}
            ctaLabel={ctaLabel}
            defaultService={defaultService}
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
              { icon: <PhoneIcon className="w-4 h-4 text-copper-400" />, text: "Real People Answer" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="flex flex-col gap-5">
              <div className="section-label section-label-blue w-fit">{page.serviceName}</div>
              <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {page.servicesListHeadline}
              </h2>
              <ul className="flex flex-col gap-3">
                {page.servicesList.map((item) => (
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-800 font-semibold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all text-base"
                >
                  Get Free Estimate
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Pricing card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 flex flex-col gap-5">
              <div className="section-label section-label-blue w-fit">Transparent Pricing</div>
              <h3 className="text-xl font-bold text-slate-900">No Surprise Bills</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We give you a written quote before any work begins. If we diagnose the problem and you decide not to proceed, there is no charge — the diagnostic is free.
              </p>
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
                {page.pricingNote.split(" · ").map((line) => (
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
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-section-dark" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label section-label-white w-fit mx-auto mb-3">How It Works</div>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-white">
              Simple 3-Step Process
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                n: "01",
                heading: "Call or Submit",
                body: "Call or fill the form above. A real person confirms availability — usually within 1 hour.",
              },
              {
                n: "02",
                heading: `Technician Arrives ${isEmergency ? "Same Day" : "Same Day"}`,
                body: `Your tech arrives with a written quote. Average arrival in ${page.cityName}: ${page.responseTime}.`,
              },
              {
                n: "03",
                heading: "Fixed & Invoiced",
                body: "Repair completed, system tested, invoice in hand. No hidden charges. Warranty on parts and labor.",
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-4 text-center items-center">
                <div className="w-14 h-14 rounded-2xl bg-copper-500/20 border border-copper-400/30 flex items-center justify-center">
                  <span className="text-copper-300 font-bold text-lg">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{step.heading}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.body}</p>
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
              What {page.cityName} Homeowners Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Stars rating={5} />
              <span className="font-bold text-slate-800">5.0</span>
              <span className="text-slate-500 text-sm">· 100+ Google reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
                <Stars rating={review.rating} />
                <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{review.body}&rdquo;</p>
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-slate-900 font-semibold text-sm">{review.name}</p>
                  <p className="text-slate-400 text-xs">{review.neighborhood}, {page.cityName} · {review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-section-dark" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label section-label-white w-fit mx-auto mb-3">Why Choose Us</div>
            <h2 id="why-heading" className="text-3xl sm:text-4xl font-bold text-white">
              {page.whyUsHeadline}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.whyUsPoints.map((point, i) => (
              <div key={i} className="bg-white/6 rounded-2xl p-6 border border-white/8 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-copper-500/20 flex items-center justify-center">
                  <CheckIcon className="w-5 h-5 text-copper-400" />
                </div>
                <h3 className="font-bold text-white">{point.heading}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEARBY CITIES ────────────────────────────────────────────────────── */}
      <section className="py-12 bg-warm-gray" aria-labelledby="nearby-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="nearby-heading" className="text-lg font-bold text-slate-800 mb-4">
            We Also Serve Nearby Cities
          </h2>
          <div className="flex flex-wrap gap-3">
            {page.nearbyCities.map((city) => (
              <Link
                key={city.slug}
                href={`${city.urlBase}/${city.slug}/`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm hover:border-hvac-blue-300 hover:text-hvac-blue-700 transition-colors"
              >
                {city.name}
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
              Common Questions — {page.cityName} {page.serviceName}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {page.faqs.map((faq, i) => (
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

      {/* ── FINAL CTA BANNER ─────────────────────────────────────────────────── */}
      <section className="py-12 bg-copper-gradient" aria-label="Call to action">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {page.ctaBannerText}
          </h2>
          <p className="text-white/80 text-lg mb-6">
            Call now or request a free estimate online. We respond within 1 hour.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PhoneLink
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-copper-600 font-bold rounded-xl shadow-lg hover:bg-slate-50 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
              showIcon
              label={`Call ${SITE.phoneDisplay} Now`}
            />
            <a
              href="#estimate-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
            >
              Request a Free Estimate
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
          <p className="text-white/60 text-sm mt-4">
            {SITE.address.full} · CSLB Licensed & Insured · {SITE.hours.weekdays} Mon–Fri · {SITE.hours.saturday} Sat
          </p>
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
