import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import QuoteForm from "@/components/ui/QuoteForm";
import PhoneLink from "@/components/ui/PhoneLink";
import ConversionTrustBar from "@/components/ui/ConversionTrustBar";
import FinancingTeaser from "@/components/ui/FinancingTeaser";
import { SITE } from "@/lib/config/site";
import { schemaBreadcrumb, schemaService, schemaFaqPage } from "@/lib/seo/schema";
import type { PPCCity } from "@/lib/config/ppc-cities";

// ── Static trust data ────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { label: "Licensed & Insured", icon: "shield" },
  { label: "EPA Certified", icon: "leaf" },
  { label: "Same-Day Service", icon: "bolt" },
  { label: "Free Estimates", icon: "tag" },
  { label: "5-Star Rated", icon: "star" },
];

const PROCESS_STEPS = [
  {
    number: "01",
    heading: "Call or Request Online",
    body: "Reach us by phone or submit the form. A real person responds — not a chatbot or voicemail.",
  },
  {
    number: "02",
    heading: "Same-Day Dispatch",
    body: "We confirm a technician and arrival window. Most customers get same-day service when they call before noon.",
  },
  {
    number: "03",
    heading: "Honest Diagnosis & Quote",
    body: "Your technician diagnoses the issue and provides a written quote before any work begins. No surprises.",
  },
  {
    number: "04",
    heading: "Repair or Install — Done Right",
    body: "Work is completed to manufacturer specs. We test thoroughly before leaving and walk you through what was done.",
  },
];

// ── Icon SVGs ────────────────────────────────────────────────────────────────

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function StarIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return filled ? (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ) : (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.885a.563.563 0 00-.652 0L4.73 19.64a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557L.734 9.345a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
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

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
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


// ── Rating stars ─────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= rating} className="w-4 h-4 text-amber-400" />
      ))}
    </div>
  );
}

// ── Trust badge icon resolver ─────────────────────────────────────────────────

function TrustIcon({ icon }: { icon: string }) {
  const cls = "w-4 h-4 text-copper-400";
  switch (icon) {
    case "shield":
      return <ShieldIcon className={cls} />;
    case "bolt":
      return <BoltIcon className={cls} />;
    case "star":
      return <StarIcon filled className="w-4 h-4 text-amber-400" />;
    case "leaf":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" />
        </svg>
      );
    case "tag":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      );
    default:
      return <ShieldIcon className={cls} />;
  }
}

// ── Main component ────────────────────────────────────────────────────────────

type Props = { city: PPCCity };

export default function PPCLandingTemplate({ city }: Props) {
  const pageUrl = `/${city.slug}-ac-repair`;
  const canonicalUrl = `${SITE.domain}${pageUrl}`;

  const breadcrumbSchema = schemaBreadcrumb([
    { name: "Home", href: "/" },
    { name: `${city.name} AC Repair`, href: pageUrl },
  ]);

  const serviceSchema = schemaService({
    name: `AC Repair & HVAC Service in ${city.name}, CA`,
    description: city.metaDescription,
    url: pageUrl,
    areaServed: city.name,
  });

  const faqSchema = schemaFaqPage(city.faqs);

  return (
    <>
      {/* Schema */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center bg-hero-gradient overflow-hidden"
        style={{ minHeight: "calc(100svh - 0px)" }}
        aria-label="Hero"
      >
        {/* Background texture */}
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

        {/* Gradient orbs */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-hvac-blue-600/8 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-copper-500/7 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* ── LEFT: Content ── */}
            <div className="flex flex-col gap-5">

              {/* Badges row */}
              <div className="flex items-center gap-2 w-fit flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-400/25 text-red-300 text-xs font-bold uppercase tracking-wider">
                  <BoltIcon className="w-3 h-3" />
                  Emergency Service Available
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-hvac-blue-500/15 border border-hvac-blue-400/25 text-hvac-blue-200 text-xs font-bold uppercase tracking-wider">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  Summer Cooling Season
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  Tech Available in Your Area
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3rem] xl:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight">
                {city.h1}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                {city.heroSubheadline}
              </p>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <PhoneLink
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-92 active:scale-[0.98] transition-all text-base"
                  showIcon
                  label={`Call Now — ${SITE.phoneDisplay}`}
                />
                <a
                  href="#estimate-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/9 text-white font-semibold rounded-xl border border-white/16 hover:bg-white/15 active:scale-[0.98] transition-all text-base"
                >
                  Get Free Estimate
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/7 border border-white/10 text-xs font-medium text-slate-200"
                  >
                    <TrustIcon icon={badge.icon} />
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* Mobile form anchor */}
              <p className="text-slate-400 text-sm lg:hidden">
                Or{" "}
                <a href="#estimate-form" className="text-hvac-blue-400 underline underline-offset-2 font-medium">
                  request a free estimate below ↓
                </a>
              </p>
            </div>

            {/* ── RIGHT: Image + Form ── */}
            <div className="flex flex-col gap-5">

              {/* Hero image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-glass" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={city.heroImage.src}
                  alt={city.heroImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                  priority
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent pointer-events-none" />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-950/80 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    Serving {city.name}, {city.state}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-copper-500/90 backdrop-blur-sm text-white text-xs font-bold">
                    Free Estimate
                  </span>
                </div>
              </div>

              {/* Desktop inline form */}
              <div id="estimate-form" className="hidden lg:block bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <QuoteForm
                  variant="compact"
                  heading={`Get Your Free Estimate in ${city.name}`}
                  subheading="We respond within 1 hour during business hours."
                />
              </div>

              {/* Financing teaser — desktop only */}
              <div className="hidden lg:block">
                <FinancingTeaser variant="inline" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/6 to-transparent pointer-events-none" />
      </section>

      {/* Mobile form (below hero) */}
      <div id="estimate-form-mobile" className="lg:hidden bg-white px-4 py-8 border-b border-slate-100">
        <div className="max-w-xl mx-auto">
          <QuoteForm
            variant="compact"
            heading={`Free Estimate in ${city.name}`}
            subheading="We respond within 1 hour during business hours."
          />
        </div>
      </div>

      {/* ── 2. TRUST BAR ─────────────────────────────────────────────────────── */}
      <ConversionTrustBar variant="dark" />

      {/* ── 3. FREE ESTIMATE PROMO ────────────────────────────────────────────── */}
      <section className="bg-copper-gradient py-10 px-4" aria-label="Free estimate promotion">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">Limited Time Offer</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Free In-Home Estimate on Any New System
          </h2>
          <p className="text-white/85 text-lg max-w-2xl mx-auto mb-6">
            No obligations, no pressure. A licensed technician comes to your {city.name} home, evaluates your system, and gives you a written quote — completely free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PhoneLink
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-copper-600 font-bold rounded-xl shadow-lg hover:bg-slate-50 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
              showIcon
              label={`Call ${SITE.phoneDisplay}`}
            />
            <a
              href="#estimate-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
            >
              Request Online
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. AC REPAIR ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-white" aria-labelledby="repair-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div className="flex flex-col gap-5">
              <div className="section-label section-label-blue w-fit">AC Repair</div>
              <h2 id="repair-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Fast AC Repair in {city.name}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">{city.repairBody}</p>

              <ul className="flex flex-col gap-3">
                {[
                  "Capacitor & contactor replacement",
                  "Refrigerant leak repair & recharge",
                  "Evaporator & condenser coil service",
                  "Blower motor & fan repair",
                  "Thermostat diagnosis & replacement",
                  "Drain line clearing",
                ].map((item) => (
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

            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
              <Image
                src={city.repairImage.src}
                alt={city.repairImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. AC INSTALLATION ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-section-dark" aria-labelledby="install-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image first on mobile */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl order-first lg:order-none" style={{ aspectRatio: "4/3" }}>
              <Image
                src={city.installImage.src}
                alt={city.installImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="section-label section-label-white w-fit">AC Installation & Replacement</div>
              <h2 id="install-heading" className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                New AC Installation in {city.name}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">{city.installBody}</p>

              <ul className="flex flex-col gap-3">
                {[
                  "Free in-home estimate & system sizing",
                  "High-efficiency Lennox, Trane & Carrier systems",
                  "Ductless mini-split installation",
                  "Permit pulling & city inspection",
                  "Manufacturer warranty on all equipment",
                  "Financing available — 0% interest options",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-copper-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-copper-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <PhoneLink
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
                showIcon
                label={`Schedule Free Estimate — ${SITE.phoneDisplay}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-gray" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">Why Choose Us</div>
            <h2 id="why-heading" className="text-3xl sm:text-4xl font-bold text-slate-900">
              Why {city.name} Homeowners Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.whyUsPoints.map((point, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-hvac-blue-50 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-hvac-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{point.heading}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. EMERGENCY HVAC ────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-18 bg-navy-950 border-y border-red-500/15" aria-labelledby="emergency-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-400/25 text-red-300 text-xs font-bold uppercase tracking-widest mb-5">
            <BoltIcon className="w-3.5 h-3.5" />
            Emergency HVAC Service
          </div>
          <h2 id="emergency-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">
            AC Out in {city.name}? We Respond the Same Day.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            {city.emergencyBody}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { label: "Same-Day Response", icon: <BoltIcon className="w-5 h-5 text-red-400" /> },
              { label: "7-Day Availability", icon: <PhoneIcon className="w-5 h-5 text-red-400" /> },
              { label: "Real Person Answers", icon: <CheckIcon className="w-5 h-5 text-red-400" /> },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/8 justify-center">
                {item.icon}
                <span className="text-white font-semibold text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          <PhoneLink
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 active:scale-[0.98] transition-all text-lg"
            showIcon
            label={`Emergency Call — ${SITE.phoneDisplay}`}
          />
        </div>
      </section>

      {/* ── 8. SERVICE PROCESS ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">How It Works</div>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-slate-900">
              Simple 4-Step Service Process
            </h2>
            <p className="text-slate-500 text-lg mt-3 max-w-2xl mx-auto">
              From your first call to a running system — no confusion, no runaround.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col gap-4">
                {/* Connector line (desktop) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div aria-hidden="true" className="hidden lg:block absolute top-6 left-[calc(50%+1.75rem)] w-full h-0.5 bg-slate-100" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-hvac-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{step.number}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{step.heading}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. REVIEWS ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-section-dark" aria-labelledby="reviews-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label section-label-white w-fit mx-auto mb-3">Customer Reviews</div>
            <h2 id="reviews-heading" className="text-3xl sm:text-4xl font-bold text-white">
              What {city.name} Homeowners Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Stars rating={5} />
              <span className="text-white font-bold">5.0</span>
              <span className="text-slate-400 text-sm">· 100+ Google reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {city.reviews.map((review, i) => (
              <div key={i} className="bg-white/6 rounded-2xl p-6 border border-white/8 flex flex-col gap-4">
                <Stars rating={review.rating} />
                <p className="text-slate-200 text-sm leading-relaxed flex-1">&ldquo;{review.body}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-slate-400 text-xs">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINANCING ────────────────────────────────────────────────────── */}
      <FinancingTeaser variant="full" />

      {/* ── 11. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">FAQ</div>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-slate-900">
              Common Questions — {city.name} HVAC Service
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {city.faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-100 shadow-sm">
                <summary className="flex items-start justify-between gap-4 cursor-pointer p-6 font-semibold text-slate-900 list-none">
                  <span>{faq.question}</span>
                  <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-open:rotate-45 transition-transform">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-hero-gradient" aria-label="Final call to action">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            <div className="flex flex-col gap-5">
              <div className="section-label section-label-white w-fit">Ready to Get Started?</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Schedule Your {city.name} HVAC Service Today
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Free estimates. Same-day availability. Real people answer your call. Serving {city.name} and all surrounding communities.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-copper-400 shrink-0" />
                  <div>
                    <p className="text-white font-bold text-lg">{SITE.phoneDisplay}</p>
                    <p className="text-slate-400 text-xs">Mon–Fri {SITE.hours.weekdays} · Sat {SITE.hours.saturday}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <WrenchIcon className="w-5 h-5 text-copper-400 shrink-0" />
                  <p className="text-slate-300 text-sm">Emergency service available 7 days a week</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <PhoneLink
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
                  showIcon
                  label={`Call Now — ${SITE.phoneDisplay}`}
                />
              </div>

              {/* Local context */}
              <p className="text-slate-400 text-sm leading-relaxed border-t border-white/8 pt-4">
                {city.localContext}
              </p>
            </div>

            {/* Bottom form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-white/10">
              <QuoteForm
                variant="compact"
                heading={`Request Service in ${city.name}`}
                subheading="We'll respond within 1 hour during business hours."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy-950/95 backdrop-blur border-t border-white/10 safe-area-bottom">
        <div className="flex items-stretch">
          <PhoneLink
            className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-copper-gradient text-white font-bold text-base"
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
