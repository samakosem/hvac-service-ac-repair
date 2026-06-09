import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/ui/JsonLd";
import SingleStepQuoteForm from "@/components/ui/SingleStepQuoteForm";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";
import { schemaBreadcrumb, schemaService, schemaFaqPage } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "AC Installation & Replacement — Free In-Home Estimate | (714) 410-2784",
    description:
      "New AC system installation throughout Southern California. Free in-home estimates, 0% financing, all major brands. Licensed HVAC contractor. Call (714) 410-2784).",
    path: "/air-conditioning/ac-installation/",
  });
}

const BRANDS = [
  { name: "Lennox", notes: "Industry-leading efficiency, Quiet operation, SunSource solar-ready" },
  { name: "Carrier", notes: "Proven reliability, Infinity series top-rated, Wide service network" },
  { name: "Trane", notes: "Extremely durable, XV20i Variable Speed top-rated, Great warranty" },
  { name: "Rheem", notes: "Strong value, Prestige Series efficiency, Easy to service locally" },
  { name: "Goodman", notes: "Best value tier, Solid reliability, Long parts warranty" },
];

const REPAIR_REPLACE_TABLE = [
  { age: "Under 8 years", repair: "Repair", reason: "System has useful life remaining; repair is cost-effective" },
  { age: "8–12 years", repair: "Repair or evaluate", reason: "Compare repair cost vs. age — if repair > 50% of new system, consider replacement" },
  { age: "12–18 years", repair: "Lean toward replace", reason: "System is past midpoint; efficiency gains from replacement often offset cost" },
  { age: "Over 18 years", repair: "Replace", reason: "System is past expected lifespan; replacement is almost always more economical" },
];

const FAQS = [
  {
    question: "How do I know if I need repair or replacement?",
    answer:
      "A useful rule: if your system is more than 12 years old and the repair would cost more than half the price of a new unit, replacement is typically the smarter investment. We'll give you an honest comparison with no pressure.",
  },
  {
    question: "What brands do you install in Orange County?",
    answer:
      "We install Lennox, Carrier, Trane, Rheem, and Goodman systems. We'll recommend the brand and model that best fits your home's needs and budget.",
  },
  {
    question: "Are there rebates available for new AC systems in Orange County?",
    answer:
      "Yes. Southern California Edison (SCE) offers rebates for qualifying high-efficiency systems — often $300–$1,500 depending on SEER2 rating and system type. We'll include eligible rebates in your estimate.",
  },
  {
    question: "Do you offer financing for AC installation?",
    answer:
      "Yes — 0% interest financing options are available for qualified buyers. Ask about current promotions when you request your free estimate.",
  },
  {
    question: "How long does AC installation take?",
    answer:
      "Most residential central AC replacements take one full day. We pull required permits and schedule final inspections. Ductless mini-split single-zone systems are typically 4–6 hours.",
  },
  {
    question: "Is a free estimate really free?",
    answer:
      "Yes — completely free, no obligation. A licensed technician visits your home, evaluates your existing system and ductwork, and provides a written quote for the recommended replacement.",
  },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

export default function AcInstallationPage() {
  const breadcrumbSchema = schemaBreadcrumb([
    { name: "Home", href: "/" },
    { name: "Air Conditioning", href: "/air-conditioning/" },
    { name: "AC Installation & Replacement", href: "/air-conditioning/ac-installation/" },
  ]);
  const serviceSchema = schemaService({
    name: "AC Installation & Replacement — Free In-Home Estimate",
    description: "Free in-home estimates for new AC system installation and replacement across Orange County. 0% financing, all major brands, licensed contractor.",
    url: "/air-conditioning/ac-installation/",
    areaServed: "Orange County",
  });
  const faqSchema = schemaFaqPage(FAQS);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ── HERO — consultative tone ─────────────────────────────────────────── */}
      <section className="relative bg-hero-gradient overflow-hidden" aria-label="Hero">
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            <div className="flex flex-col gap-5">
              <div className="section-label section-label-white w-fit">New System Installation</div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                New AC System Installation — Free In-Home Estimate
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                Not sure if you need repair or replacement? We&rsquo;ll give you an honest recommendation — not a sales pitch. Free estimate, no obligation.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 text-sm">Free in-home estimate — no obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 text-sm">0% financing for qualified buyers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 text-sm">SCE rebates on qualifying high-efficiency systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 text-sm">Lennox · Carrier · Trane · Rheem · Goodman</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 text-sm">We pull permits & schedule inspections</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <PhoneLink
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
                  showIcon
                  label={`Call ${SITE.phoneDisplay}`}
                />
                <a href="#estimate-form" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/9 text-white font-semibold rounded-xl border border-white/16 hover:bg-white/15 active:scale-[0.98] transition-all text-base">
                  Schedule Free Estimate
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Form — system age dropdown CTA */}
            <div id="estimate-form" className="hidden lg:block bg-white rounded-2xl shadow-xl p-7">
              <SingleStepQuoteForm
                heading="Schedule Your Free In-Home Estimate"
                subheading="No pressure. A licensed technician evaluates your home and gives you a written quote — completely free."
                ctaLabel="Schedule My Free Estimate"
                defaultService="AC Installation / Replacement"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile form */}
      <div id="estimate-form-mobile" className="lg:hidden bg-white px-4 py-8 border-b border-slate-100">
        <div className="max-w-xl mx-auto">
          <SingleStepQuoteForm
            heading="Schedule Your Free Estimate"
            subheading="No pressure — a written quote, completely free."
            ctaLabel="Schedule My Free Estimate"
            defaultService="AC Installation / Replacement"
          />
        </div>
      </div>

      {/* ── REPAIR VS REPLACE TABLE ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-white" aria-labelledby="compare-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">Repair vs. Replace</div>
            <h2 id="compare-heading" className="text-3xl font-bold text-slate-900">
              When Does Replacement Make Sense?
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Use this as a starting guide. Your technician will give you a specific recommendation based on your actual system&rsquo;s condition.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-950 text-white">
                  <th className="text-left px-6 py-4 font-semibold">System Age</th>
                  <th className="text-left px-6 py-4 font-semibold">Recommendation</th>
                  <th className="text-left px-6 py-4 font-semibold hidden sm:table-cell">Reasoning</th>
                </tr>
              </thead>
              <tbody>
                {REPAIR_REPLACE_TABLE.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4 font-medium text-slate-800">{row.age}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        row.repair === "Repair" ? "bg-emerald-100 text-emerald-700" :
                        row.repair === "Replace" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>{row.repair}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 hidden sm:table-cell">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm text-center mt-4">
            Not sure which applies to you?{" "}
            <a href="#estimate-form" className="text-hvac-blue-600 font-semibold hover:underline">Schedule a free estimate</a>{" "}
            and we&rsquo;ll give you a straight answer.
          </p>
        </div>
      </section>

      {/* ── BRANDS ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-section-dark" aria-labelledby="brands-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-white w-fit mx-auto mb-3">Brands We Install</div>
            <h2 id="brands-heading" className="text-3xl font-bold text-white">All Major Brands, Honest Recommendations</h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto">
              We&rsquo;re not locked to one brand. We recommend based on your home&rsquo;s needs and budget.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="bg-white/6 rounded-2xl p-5 border border-white/8 flex flex-col gap-2">
                <h3 className="font-bold text-white text-lg">{brand.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{brand.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINANCING & REBATES ──────────────────────────────────────────────── */}
      <section className="py-16 bg-warm-white" aria-labelledby="financing-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-hvac-blue-50 flex items-center justify-center">
                <ShieldIcon className="w-5 h-5 text-hvac-blue-600" />
              </div>
              <h2 id="financing-heading" className="text-2xl font-bold text-slate-900">0% Financing Available</h2>
              <p className="text-slate-600 leading-relaxed">
                Don&rsquo;t let upfront cost delay a necessary replacement. We offer 0% interest financing for qualified buyers — spreading the investment over manageable monthly payments.
              </p>
              <ul className="flex flex-col gap-2">
                {["No prepayment penalties", "Quick approval process", "Available on systems from $3,000+", "Ask about current promotions"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">SCE & SoCalGas Rebates</h2>
              <p className="text-slate-600 leading-relaxed">
                Southern California Edison offers rebates of $300–$1,500+ on qualifying high-efficiency HVAC systems. We&rsquo;ll include applicable rebates in your estimate and help you navigate the paperwork.
              </p>
              <ul className="flex flex-col gap-2">
                {["$300–$1,500+ rebates on qualifying systems", "SEER2-rated equipment required", "We prepare all rebate documentation", "Rebates applied at purchase"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTALLATION PROCESS ─────────────────────────────────────────────── */}
      <section className="py-16 bg-section-dark" aria-labelledby="process-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-white w-fit mx-auto mb-3">Installation Process</div>
            <h2 id="process-heading" className="text-3xl font-bold text-white">What to Expect</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { n: "01", h: "Free Estimate", b: "Licensed tech visits, evaluates your system and ductwork, provides written quote." },
              { n: "02", h: "Equipment Selection", b: "Choose from our recommended systems with full brand comparisons and rebate info." },
              { n: "03", h: "Installation Day", b: "Crew arrives, removes old equipment, installs new system. Most jobs done in one day." },
              { n: "04", h: "Commission & Test", b: "Full system commissioning — we verify airflow, refrigerant charge, and thermostat operation." },
              { n: "05", h: "1-Year Warranty", b: "1-year labor warranty on top of manufacturer equipment warranty." },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-3 text-center items-center">
                <div className="w-12 h-12 rounded-2xl bg-copper-500/20 border border-copper-400/30 flex items-center justify-center">
                  <span className="text-copper-300 font-bold text-sm">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{step.h}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-warm-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">FAQ</div>
            <h2 id="faq-heading" className="text-3xl font-bold text-slate-900">Common Questions About AC Replacement</h2>
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
      <section className="py-12 bg-copper-gradient" aria-label="Final CTA">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Ready for a Free In-Home Estimate?
          </h2>
          <p className="text-white/80 text-lg mb-6">
            No obligation, no pressure. A licensed technician comes to your Orange County home — completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneLink
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-copper-600 font-bold rounded-xl shadow-lg hover:bg-slate-50 active:scale-[0.98] transition-all text-base"
              showIcon
              label={`Call ${SITE.phoneDisplay}`}
            />
            <a href="#estimate-form" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 active:scale-[0.98] transition-all text-base">
              Schedule Online
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
          <p className="text-white/60 text-sm mt-4">{SITE.address.full} · CSLB Licensed · 0% Financing Available</p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy-950/95 backdrop-blur border-t border-white/10 safe-area-bottom">
        <div className="flex items-stretch">
          <PhoneLink
            className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-copper-gradient text-white font-bold text-base"
            showIcon
            label={`Call ${SITE.phoneDisplay}`}
          />
          <a href="#estimate-form-mobile" className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-navy-800 text-white font-semibold text-base border-l border-white/10">
            Free Estimate
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
