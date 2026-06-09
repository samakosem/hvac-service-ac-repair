import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import SingleStepQuoteForm from "@/components/ui/SingleStepQuoteForm";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";
import { schemaBreadcrumb, schemaService, schemaFaqPage } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Emergency HVAC Service Orange County | Available Today | (714) 410-2784",
    description:
      "Emergency HVAC service in Orange County, CA. Real people answer — same-day AC and heating repair. No emergency surcharge. Call (714) 410-2784 now.",
    path: "/emergency-hvac-service/",
  });
}

const OC_CITIES = [
  { name: "Yorba Linda", slug: "yorba-linda" },
  { name: "Anaheim", slug: "anaheim" },
  { name: "Fullerton", slug: "fullerton" },
  { name: "Irvine", slug: "irvine" },
  { name: "Orange", slug: "orange" },
  { name: "Anaheim Hills", slug: "anaheim-hills" },
  { name: "Placentia", slug: "placentia" },
  { name: "Brea", slug: "brea" },
  { name: "Tustin", slug: "tustin" },
  { name: "Garden Grove", slug: "garden-grove" },
  { name: "Santa Ana", slug: "santa-ana" },
  { name: "Costa Mesa", slug: "costa-mesa" },
  { name: "Huntington Beach", slug: "huntington-beach" },
  { name: "Newport Beach", slug: "newport-beach" },
  { name: "Mission Viejo", slug: "mission-viejo" },
  { name: "Lake Forest", slug: "lake-forest" },
  { name: "Aliso Viejo", slug: "aliso-viejo" },
  { name: "Laguna Niguel", slug: "laguna-niguel" },
  { name: "San Clemente", slug: "san-clemente" },
  { name: "Westminster", slug: "westminster" },
  { name: "Villa Park", slug: "villa-park" },
];

const EMERGENCY_SITUATIONS = [
  "AC stopped blowing cold air",
  "AC unit making loud banging or grinding noise",
  "Thermostat not responding",
  "AC running but house not cooling",
  "AC tripping the breaker",
  "Water leaking from AC unit",
  "AC burning smell",
  "Heater not working",
  "Complete system failure",
];

const FAQS = [
  {
    question: "Do you charge extra for emergency or weekend HVAC service?",
    answer:
      "No — same pricing whether you call on a Tuesday or Sunday. No emergency surcharges, no weekend premiums. Free diagnostic — no charge.",
  },
  {
    question: "How fast can you respond in Orange County?",
    answer:
      "We're based in Yorba Linda and dispatch to all of Orange County. Most emergency calls see a technician arrive within 1–4 hours same day.",
  },
  {
    question: "Who answers when I call — a person or a call center?",
    answer:
      "A real person on our team answers. No voicemail trees, no out-of-state call center. You're talking to someone who can confirm dispatch right now.",
  },
  {
    question: "What if my system can't be fixed same day?",
    answer:
      "We explain all options clearly and provide a temporary solution where possible. We never leave you without a clear plan and written quote.",
  },
  {
    question: "Do you service all HVAC brands?",
    answer:
      "Yes — Lennox, Carrier, Trane, Rheem, York, Goodman, and all other major residential and light-commercial brands.",
  },
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function EmergencyHvacPage() {
  const breadcrumbSchema = schemaBreadcrumb([
    { name: "Home", href: "/" },
    { name: "Emergency HVAC Service", href: "/emergency-hvac-service/" },
  ]);
  const serviceSchema = schemaService({
    name: "Emergency HVAC Service Orange County",
    description: "Same-day emergency AC and heating repair across Orange County. Real people answer — no voicemail. No emergency surcharge.",
    url: "/emergency-hvac-service/",
    areaServed: "Orange County",
  });
  const faqSchema = schemaFaqPage(FAQS);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-start bg-hero-gradient overflow-hidden"
        style={{ minHeight: "calc(100svh - 0px)" }}
        aria-label="Emergency HVAC Hero"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-red-600/10 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-copper-500/7 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* LEFT */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  Open Now — Accepting Emergency Calls
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  Tech Available in Your Area
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.1rem] font-bold text-white leading-[1.1] tracking-tight">
                Emergency HVAC Service in Orange County — We Answer Live
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                AC completely stopped? Heater not working? Call now — a technician can be at your home today. Real people answer, no voicemail.
              </p>

              {/* Mobile phone first */}
              <div className="lg:hidden">
                <PhoneLink
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 active:scale-[0.98] transition-all text-xl"
                  showIcon
                  label={`Call ${SITE.phoneDisplay} — We Answer Live`}
                />
              </div>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-3">
                <PhoneLink
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 active:scale-[0.98] transition-all text-lg"
                  showIcon
                  label={`Call ${SITE.phoneDisplay} Now`}
                />
                <a href="#emergency-form" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/9 text-white font-semibold rounded-xl border border-white/16 hover:bg-white/15 active:scale-[0.98] transition-all text-base">
                  Request Online
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>

              {/* No-surcharge callout */}
              <div className="flex items-start gap-3 bg-white/6 border border-white/10 rounded-xl px-4 py-3">
                <BoltIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-slate-200 text-sm">
                  <span className="font-bold text-white">No emergency surcharges.</span> Same pricing 7 days a week. Free diagnostic — no charge.
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {["Licensed & Insured", "Same-Day Dispatch", "Real Person Answers", "No Emergency Surcharge", "0% Financing"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/7 border border-white/10 text-xs font-medium text-slate-200">
                    <CheckIcon />
                    {b}
                  </span>
                ))}
              </div>

              {/* Currently dispatching */}
              <p className="text-slate-400 text-xs leading-relaxed">
                Currently dispatching in: {OC_CITIES.slice(0, 8).map((c) => c.name).join(" · ")} · and all Orange County cities
              </p>
            </div>

            {/* RIGHT — Form */}
            <div id="emergency-form" className="hidden lg:block bg-white rounded-2xl shadow-xl p-7 border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <BoltIcon className="w-5 h-5 text-red-500" />
                <p className="font-bold text-slate-900">Get Emergency Help Now</p>
              </div>
              <SingleStepQuoteForm
                heading=""
                subheading="We respond within 1 hour · Real person dispatches your call"
                ctaLabel="Get Emergency Help Now"
                defaultService="Emergency AC Repair"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile form */}
      <div id="emergency-form-mobile" className="lg:hidden bg-white px-4 py-8 border-b border-slate-100">
        <div className="max-w-xl mx-auto">
          <SingleStepQuoteForm
            heading="Get Emergency Help Now"
            subheading="We respond within 1 hour — real person picks up your call"
            ctaLabel="Get Emergency Help Now"
            defaultService="Emergency AC Repair"
          />
        </div>
      </div>

      {/* ── PROBLEM LIST ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-warm-white" aria-labelledby="problems-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">Common Emergency Situations</div>
            <h2 id="problems-heading" className="text-3xl font-bold text-slate-900">
              Does Any of This Sound Familiar?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMERGENCY_SITUATIONS.map((s) => (
              <div key={s} className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 px-4 py-3 shadow-sm">
                <BoltIcon className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-slate-800 text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Recognizing one of these? A free diagnostic tells you exactly what&rsquo;s wrong — no charge.</p>
            <PhoneLink
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 active:scale-[0.98] transition-all text-base"
              showIcon
              label={`Call ${SITE.phoneDisplay} Now`}
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-section-dark" aria-labelledby="process-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-white w-fit mx-auto mb-3">How It Works</div>
            <h2 id="process-heading" className="text-3xl font-bold text-white">Emergency Response — 3 Steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "01", h: "Call or Submit", b: "A real person answers and dispatches a technician. We confirm arrival window within 60 minutes." },
              { n: "02", h: "Same-Day Arrival", b: "Your technician arrives with a stocked van and a written quote. No surprise charges, ever." },
              { n: "03", h: "Repaired Today", b: "Most emergency repairs completed in one visit. Warranty on parts and labor." },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-4 text-center items-center">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                  <span className="text-red-300 font-bold text-lg">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{step.h}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES GRID ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-warm-gray" aria-labelledby="cities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 id="cities-heading" className="text-2xl font-bold text-slate-900">Emergency HVAC Service Areas</h2>
            <p className="text-slate-500 mt-2">We dispatch to every city in Orange County — no extra charge.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {OC_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/air-conditioning/emergency-ac-repair/${city.slug}/`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm hover:border-red-300 hover:text-red-700 transition-colors"
              >
                {city.name}
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-4">
            Don&rsquo;t see your city?{" "}
            <PhoneLink className="text-red-600 font-semibold hover:underline" label="Call us" /> — we serve all of Orange County.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-warm-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">FAQ</div>
            <h2 id="faq-heading" className="text-3xl font-bold text-slate-900">Emergency HVAC Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
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
      <section className="py-12 bg-red-600" aria-label="Emergency CTA">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Don&rsquo;t Suffer Through the Heat. Call Now — We Answer Live.</h2>
          <p className="text-red-100 text-lg mb-6">Same-day emergency HVAC service across Orange County. No voicemail. No surcharges.</p>
          <PhoneLink
            className="inline-flex items-center justify-center gap-2.5 px-10 py-5 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:bg-red-50 active:scale-[0.98] transition-all text-xl"
            showIcon
            label={`Call ${SITE.phoneDisplay}`}
          />
          <p className="text-red-200 text-sm mt-4">{SITE.address.full} · CSLB Licensed · 7 Days a Week</p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-red-600 safe-area-bottom">
        <PhoneLink
          className="w-full inline-flex items-center justify-center gap-2 py-5 text-white font-bold text-lg"
          showIcon
          label={`Emergency Call — ${SITE.phoneDisplay}`}
        />
      </div>
    </>
  );
}
