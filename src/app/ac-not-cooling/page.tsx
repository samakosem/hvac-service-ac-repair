import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import SingleStepQuoteForm from "@/components/ui/SingleStepQuoteForm";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";
import { schemaBreadcrumb, schemaFaqPage } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "AC Running But Not Cooling? Causes & Fix | Orange County HVAC",
    description:
      "Find out why your AC is running but not cooling — and get it fixed today. Free diagnostic with repair. Serving Orange County, CA. (714) 410-2784).",
    path: "/ac-not-cooling/",
  });
}

const CAUSES = [
  {
    title: "Low Refrigerant (Leak or Improper Charge)",
    body: "If your AC is running but blowing warm air, low refrigerant is the most common cause. Refrigerant doesn't get \"used up\" — if the level is low, you have a leak. DIY check: feel the supply registers. If the air is barely cool instead of cold, refrigerant is suspect.",
    diy: "Check if your outdoor condenser unit has ice forming on the refrigerant lines — a sign of low charge.",
    callPro: "Refrigerant handling requires EPA certification. If you suspect a leak, call a pro — continuing to run the system can damage the compressor.",
  },
  {
    title: "Dirty or Frozen Evaporator Coil",
    body: "A dirty evaporator coil can't absorb heat effectively, causing the system to run without cooling. In severe cases, the coil freezes solid and completely blocks airflow. DIY check: Replace your air filter. A clogged filter is the #1 cause of frozen coils.",
    diy: "If you see ice on the indoor unit or refrigerant lines, turn the AC off and let it thaw for 2–3 hours, then replace the filter before restarting.",
    callPro: "If the coil refreezes after the filter is replaced, you likely have a refrigerant or airflow issue that needs diagnosis.",
  },
  {
    title: "Failing Capacitor or Compressor",
    body: "The capacitor starts and runs the compressor and fan motors. A failing capacitor causes the compressor to struggle — the system runs but doesn't cool effectively. DIY check: Listen for a clicking or humming from the outdoor unit. A humming compressor that doesn't start often points to a bad capacitor.",
    diy: "You can't test a capacitor yourself safely. But if the outdoor fan is spinning and the compressor isn't, this is a likely cause.",
    callPro: "Capacitor replacement is typically $150–$250. A failed compressor is a much larger repair — often warranting system replacement if the unit is old.",
  },
  {
    title: "Clogged Air Filter Blocking Airflow",
    body: "A severely clogged filter starves the system of airflow, which reduces cooling capacity dramatically. It's the most overlooked cause — and the easiest to fix. DIY check: Pull out your filter. If it's gray and dense, replace it now.",
    diy: "Replace filters every 1–3 months depending on your home's dust load and whether you have pets.",
    callPro: "If replacing the filter doesn't restore cooling within 24 hours, there may be a secondary issue worth diagnosing.",
  },
  {
    title: "Thermostat Miscalibration or Wiring Issue",
    body: "A miscalibrated thermostat may think the room is cooler than it is, causing short cycling. A wiring issue can prevent the thermostat from properly signaling the system to cool. DIY check: Replace thermostat batteries and verify the settings. Try setting the temperature 5°F below current room temp.",
    diy: "If the thermostat screen is blank or unresponsive, start with new batteries. Smart thermostat issues sometimes clear with a reset.",
    callPro: "If the thermostat is functional but the system still doesn't cool, the problem is in the HVAC unit — not the thermostat.",
  },
  {
    title: "Ductwork Leaks Losing Conditioned Air",
    body: "Leaky ducts can bleed 20–30% of conditioned air into unconditioned attic space before it reaches your rooms. The system appears to be running but your rooms never cool properly. DIY check: Check supply registers for weak airflow. Hold tissue near duct seams in accessible areas — fluttering indicates a leak.",
    diy: "Accessible duct joints can be sealed with foil HVAC tape. Avoid standard duct tape — it deteriorates quickly.",
    callPro: "A professional duct test quantifies leakage and identifies hard-to-reach leaks in attic runs.",
  },
];

const FAQS = [
  {
    question: "My AC is running but not cooling — is this an emergency?",
    answer:
      "In Orange County summer heat, yes — especially for households with children, elderly residents, or medical needs. We treat same-day calls for non-cooling AC as urgent and dispatch quickly. Call (714) 410-2784.",
  },
  {
    question: "How much does it cost to diagnose why my AC isn't cooling?",
    answer:
      "Free diagnostic — no charge to identify the problem. A technician will identify the exact cause and provide a written quote before any work begins.",
  },
  {
    question: "Can I diagnose a non-cooling AC myself?",
    answer:
      "You can rule out easy causes: check and replace the air filter, verify thermostat settings and batteries, and look for ice on the indoor unit. But refrigerant, compressor, and coil issues require professional diagnosis and equipment.",
  },
  {
    question: "Why is my AC running constantly but the house won't cool down?",
    answer:
      "Constant running without adequate cooling usually means the system is undersized, has a refrigerant shortage, has a dirty/blocked coil, or is fighting duct leaks. A free diagnostic pinpoints the exact cause.",
  },
  {
    question: "How quickly can you get to my home in Orange County?",
    answer:
      "Same-day service for most Orange County cities. We're based in Yorba Linda and dispatch across the county — typically 1–4 hours for same-day calls.",
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

export default function AcNotCoolingPage() {
  const breadcrumbSchema = schemaBreadcrumb([
    { name: "Home", href: "/" },
    { name: "AC Not Cooling", href: "/ac-not-cooling/" },
  ]);
  const faqSchema = schemaFaqPage(FAQS);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* ── HERO — content-first for trust/SEO ──────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-warm-white" aria-label="Page intro">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label section-label-blue w-fit mx-auto mb-4">Diagnostic Guide</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5">
            AC Running But Not Cooling? Here&rsquo;s What&rsquo;s Wrong (and How to Fix It)
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            If your air conditioner is running but your home isn&rsquo;t cooling down, one of six issues is almost always the culprit. We&rsquo;ll walk you through each one — and tell you which you can check yourself, and which need a pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneLink
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
              showIcon
              label={`Call ${SITE.phoneDisplay} — Same-Day Diagnosis`}
            />
            <a href="#schedule-diagnostic" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all text-base">
              Schedule Free Diagnostic
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 6 CAUSES ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-labelledby="causes-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="causes-heading" className="text-3xl font-bold text-slate-900 mb-10">
            6 Reasons Your AC Is Running But Not Cooling
          </h2>
          <div className="flex flex-col gap-10">
            {CAUSES.map((cause, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl p-7 bg-white shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-hvac-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{cause.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">{cause.body}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">DIY Check</p>
                    <p className="text-sm text-emerald-800 leading-relaxed">{cause.diy}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">When to Call a Pro</p>
                    <p className="text-sm text-amber-800 leading-relaxed">{cause.callPro}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CONVERSION ──────────────────────────────────────────────── */}
      <section id="schedule-diagnostic" className="py-16 bg-hero-gradient" aria-label="Schedule diagnostic">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-5">
              <div className="section-label section-label-white w-fit">Not Sure What&rsquo;s Wrong?</div>
              <h2 className="text-3xl font-bold text-white">
                A Free Diagnostic Tells You Exactly What&rsquo;s Wrong
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Our licensed technician will diagnose the exact cause — and give you a written quote before any work starts. No charge for the diagnostic.
              </p>
              <div className="flex flex-col gap-3">
                {["Same-day appointments available", "Written quote — no surprises", "Free diagnostic — no charge", "All brands serviced", "Orange County-wide coverage"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <PhoneLink
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
                showIcon
                label={`Call ${SITE.phoneDisplay} Now`}
              />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-7">
              <SingleStepQuoteForm
                heading="Schedule My Free Diagnostic"
                subheading="We respond within 1 hour · Same-day availability"
                ctaLabel="Schedule My Diagnostic"
                defaultService="Not Sure — Need Diagnosis"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-warm-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label section-label-blue w-fit mx-auto mb-3">FAQ</div>
            <h2 id="faq-heading" className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
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

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy-950/95 backdrop-blur border-t border-white/10 safe-area-bottom">
        <div className="flex items-stretch">
          <PhoneLink
            className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-copper-gradient text-white font-bold text-base"
            showIcon
            label={`Call ${SITE.phoneDisplay}`}
          />
          <a href="#schedule-diagnostic" className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-navy-800 text-white font-semibold text-base border-l border-white/10">
            Free Diagnostic
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
