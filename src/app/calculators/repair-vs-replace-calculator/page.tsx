import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { schemaCalculatorPage, schemaFaqPage } from "@/lib/seo/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/ui/CtaSection";
import RepairVsReplaceCalculator from "@/components/calculators/RepairVsReplaceCalculator";

export const metadata: Metadata = buildMetadata({
  title: "AC Repair vs. Replace Calculator — Orange County HVAC",
  description:
    "Should you repair or replace your AC? Enter system age, repair cost, and refrigerant type for a data-driven recommendation. Built for Orange County homeowners.",
  path: "/calculators/repair-vs-replace-calculator",
});

const breadcrumbs = [
  { name: "Calculators", href: "/calculators" },
  { name: "Repair vs. Replace Calculator", href: "/calculators/repair-vs-replace-calculator" },
];

const faqs = [
  {
    question: "What is the 50% rule for AC repair vs. replacement?",
    answer:
      "If a repair costs more than 50% of the installed price of a comparable new system, most HVAC professionals recommend replacement. The logic: you're paying a significant fraction of a new system's cost to extend aging equipment that may fail again soon. The rule applies best to systems over 10 years old.",
  },
  {
    question: "Should I repair my AC if it uses R-22 refrigerant?",
    answer:
      "Generally no, for repairs over a few hundred dollars. R-22 (Freon) was phased out of production in 2020 and now comes only from recycled supplies. Prices have risen sharply — $50–$100+ per pound — making any repair that requires refrigerant work expensive. A new system uses modern refrigerant that's widely available and affordable.",
  },
  {
    question: "At what age should I replace my AC instead of repairing it?",
    answer:
      "Most HVAC professionals recommend replacement when a system is 15+ years old and has any major failure. For systems 12–15 years old, repair cost relative to replacement becomes the key variable. Under 10 years old, repair is almost always the right call unless the failure is catastrophic.",
  },
  {
    question: "Is it worth replacing an AC before it completely fails?",
    answer:
      "Sometimes yes — especially if your system is 14+ years old and showing signs of decline (higher energy bills, uneven cooling, frequent small repairs). Replacing proactively in spring means you choose the timing and equipment, rather than making a rushed decision in July when companies are booked out 2 weeks.",
  },
];

const decisionFactors = [
  {
    factor: "System age",
    repair: "Under 8 years",
    replace: "15+ years",
    borderline: "8–15 years",
  },
  {
    factor: "Repair/replacement ratio",
    repair: "Under 25%",
    replace: "Over 50%",
    borderline: "25–50%",
  },
  {
    factor: "Refrigerant type",
    repair: "R-410A / R-454B",
    replace: "R-22 + any leak",
    borderline: "R-22, small repair",
  },
  {
    factor: "Compressor status",
    repair: "Functioning",
    replace: "Failed, system 10+",
    borderline: "Failed, system <10",
  },
];

export default function RepairVsReplaceCalculatorPage() {
  return (
    <>
      <JsonLd
        data={schemaCalculatorPage({
          name: "AC Repair vs. Replace Calculator — Orange County HVAC",
          description:
            "Data-driven repair or replacement recommendation based on system age, repair cost, refrigerant type, and compressor status.",
          url: "/calculators/repair-vs-replace-calculator",
        })}
      />
      <JsonLd data={schemaFaqPage(faqs)} />

      {/* Hero */}
      <section className="bg-brand-mid pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="text-slate-400 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Repair vs. Replace Calculator
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Not sure whether to fix your AC or replace it? Answer a few questions for a
            recommendation based on the same framework HVAC professionals use.
          </p>
        </div>
      </section>

      {/* Calculator + decision matrix */}
      <section className="py-14 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <RepairVsReplaceCalculator />

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Decision Framework
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  The calculator applies these guidelines. Understanding them helps you
                  evaluate any recommendation from a contractor.
                </p>
                <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left p-3 text-slate-600 font-semibold">Factor</th>
                        <th className="text-left p-3 text-green-600 font-semibold">→ Repair</th>
                        <th className="text-left p-3 text-red-600 font-semibold">→ Replace</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {decisionFactors.map((row) => (
                        <tr key={row.factor} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 text-slate-700 font-medium">{row.factor}</td>
                          <td className="p-3 text-green-700">{row.repair}</td>
                          <td className="p-3 text-red-700">{row.replace}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                <h3 className="font-bold text-amber-900 mb-2 text-sm">R-22 Warning</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  If your system uses R-22 (Freon) and has a refrigerant leak, replacement
                  is almost always the right call. R-22 is no longer manufactured in the US,
                  and recycled supply prices have made any meaningful refrigerant recharge
                  expensive. A new system solves the problem permanently.
                </p>
              </div>

              <div className="rounded-xl bg-hvac-blue-50 border border-hvac-blue-100 p-5">
                <h3 className="font-bold text-hvac-blue-900 mb-2 text-sm">Orange County Replacement Cost Range</h3>
                <p className="text-sm text-hvac-blue-800 leading-relaxed">
                  For the repair/replacement ratio calculation, typical installed replacement costs
                  in Orange County run $5,000–$8,500 for a standard 2.5–3.5 ton central AC system.
                  Premium efficiency units or difficult installations can run higher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Repair vs. Replace: Common Questions</h2>
          <div className="flex flex-col divide-y divide-slate-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="py-4 group">
                <summary className="text-slate-900 font-semibold text-base cursor-pointer list-none flex items-center justify-between gap-3">
                  {faq.question}
                  <svg className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold text-slate-700 mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "AC Repair", href: "/air-conditioning/ac-repair" },
              { label: "AC Replacement", href: "/air-conditioning/ac-replacement" },
              { label: "Emergency AC Repair", href: "/air-conditioning/emergency-ac-repair" },
              { label: "All Calculators", href: "/calculators" },
              { label: "Blog: Repair vs. Replace Guide", href: "/blog/ac-repair-vs-replacement" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-hvac-blue-600 hover:border-hvac-blue-300 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Not Sure? Get a Free Second Opinion"
        subtext="We'll assess your system honestly and give you both a repair quote and a replacement quote — in writing. No pressure either way."
        primaryLabel="Schedule a Free Assessment"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
