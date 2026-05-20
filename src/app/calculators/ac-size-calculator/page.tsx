import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { schemaCalculatorPage, schemaFaqPage } from "@/lib/seo/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/ui/CtaSection";
import AcSizeCalculator from "@/components/calculators/AcSizeCalculator";

export const metadata: Metadata = buildMetadata({
  title: "AC Size Calculator — What Tonnage Do I Need? | Orange County",
  description:
    "Free AC size calculator for Orange County homeowners. Enter your square footage, ceiling height, insulation, and sun exposure to estimate the right tonnage. Manual J always required for final sizing.",
  path: "/calculators/ac-size-calculator",
});

const breadcrumbs = [
  { name: "Calculators", href: "/calculators" },
  { name: "AC Size Calculator", href: "/calculators/ac-size-calculator" },
];

const faqs = [
  {
    question: "What size AC do I need for a 1,500 sq ft home in Orange County?",
    answer:
      "A 1,500 sq ft home in Orange County typically needs a 2–2.5 ton AC system, depending on ceiling height, insulation quality, and window exposure. A home with high ceilings, poor attic insulation, or large west-facing windows may need 2.5–3 tons. A licensed technician should confirm sizing with a Manual J calculation.",
  },
  {
    question: "What size AC do I need for a 2,000 sq ft home?",
    answer:
      "Most 2,000 sq ft Orange County homes need a 2.5–3.5 ton system. The range is wide because ceiling height, insulation, and sun exposure all affect cooling load significantly. This calculator estimates tonnage based on those factors, but a Manual J load calculation provides the definitive answer.",
  },
  {
    question: "Is bigger always better when sizing an AC unit?",
    answer:
      "No. An oversized AC short-cycles — it cools quickly but shuts off before removing humidity. This leaves the home cold and clammy, causes frequent on/off cycling that wears out the compressor prematurely, and wastes energy. Proper sizing is critical for both comfort and equipment longevity.",
  },
  {
    question: "How accurate is this AC size calculator?",
    answer:
      "This calculator provides a rough estimate based on common guidelines for Southern California's climate. It accounts for square footage, ceiling height, insulation quality, and window exposure. It does not account for duct condition, home orientation, roof color, local shade, or precise construction details. A Manual J calculation by a licensed HVAC technician is required for accurate final sizing.",
  },
  {
    question: "What is the difference between BTU and tons for AC?",
    answer:
      "Tons and BTUs are both measures of cooling capacity. One ton equals 12,000 BTU/hr. A 3-ton AC provides 36,000 BTU/hr of cooling. HVAC professionals use tons for whole-system sizing; BTUs appear on window units and smaller equipment.",
  },
];

export default function AcSizeCalculatorPage() {
  return (
    <>
      <JsonLd
        data={schemaCalculatorPage({
          name: "AC Size Calculator — Orange County HVAC",
          description:
            "Free tool to estimate the right AC tonnage for your Orange County home based on square footage, ceiling height, insulation, and sun exposure.",
          url: "/calculators/ac-size-calculator",
        })}
      />
      <JsonLd data={schemaFaqPage(faqs)} />

      {/* Hero */}
      <section className="bg-brand-mid pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="text-slate-400 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            AC Size Calculator
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Estimate the right AC tonnage for your Orange County home. Enter a few details and
            get a rough range — then get a free in-home load calculation for the exact number.
          </p>
        </div>
      </section>

      {/* Calculator + explainer */}
      <section className="py-14 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <AcSizeCalculator />

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  How AC Sizing Works
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  AC capacity is measured in tons (1 ton = 12,000 BTU/hr). For Southern California,
                  a common starting point is 25 BTU per square foot — but ceiling height, insulation,
                  and window exposure can shift the number meaningfully.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-2 text-base">Typical Orange County Ranges</h3>
                <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left p-3 text-slate-600 font-semibold">Home Size</th>
                        <th className="text-left p-3 text-slate-600 font-semibold">Typical Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Under 1,200 sq ft", "1.5–2 tons"],
                        ["1,200–1,600 sq ft", "2–2.5 tons"],
                        ["1,600–2,200 sq ft", "2.5–3.5 tons"],
                        ["2,200–3,000 sq ft", "3.5–4 tons"],
                        ["3,000+ sq ft", "4–5 tons"],
                      ].map(([size, range]) => (
                        <tr key={size} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 text-slate-700">{size}</td>
                          <td className="p-3 text-slate-900 font-semibold">{range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Assumes average insulation, 8-ft ceilings, and typical SoCal construction.
                </p>
              </div>

              <div className="rounded-xl bg-hvac-blue-50 border border-hvac-blue-100 p-5">
                <h3 className="font-bold text-hvac-blue-900 mb-2 text-sm">Why Manual J Matters</h3>
                <p className="text-sm text-hvac-blue-800 leading-relaxed">
                  A proper Manual J load calculation accounts for your exact floor plan,
                  construction details, window SHGC, duct condition, and local weather data.
                  It&rsquo;s the only defensible way to size equipment. We perform Manual J on
                  every installation — free with an in-home estimate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Common AC Sizing Questions</h2>
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
              { label: "AC Installation", href: "/air-conditioning/ac-installation" },
              { label: "AC Replacement", href: "/air-conditioning/ac-replacement" },
              { label: "Ductless Mini Split", href: "/ductless/ductless-mini-split" },
              { label: "All Calculators", href: "/calculators" },
              { label: "Blog: What Size AC Do I Need?", href: "/blog/what-size-ac-unit-do-i-need" },
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
        heading="Get a Free In-Home Load Calculation"
        subtext="Our licensed technicians perform Manual J load calculations on every installation — at no charge. Get an accurate size and a written quote."
        primaryLabel="Request a Free Estimate"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
