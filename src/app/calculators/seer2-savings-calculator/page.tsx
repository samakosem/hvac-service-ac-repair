import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { schemaCalculatorPage, schemaFaqPage } from "@/lib/seo/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/ui/CtaSection";
import Seer2SavingsCalculator from "@/components/calculators/Seer2SavingsCalculator";

export const metadata: Metadata = buildMetadata({
  title: "SEER2 Savings Calculator — Is a High-Efficiency AC Worth It?",
  description:
    "Compare annual AC operating costs between your current system and a new higher-efficiency unit. Calculate savings, payback period, and 10-year ROI for Southern California homes.",
  path: "/calculators/seer2-savings-calculator",
});

const breadcrumbs = [
  { name: "Calculators", href: "/calculators" },
  { name: "SEER2 Savings Calculator", href: "/calculators/seer2-savings-calculator" },
];

const faqs = [
  {
    question: "What SEER2 rating should I get for my Orange County home?",
    answer:
      "For most Orange County homeowners, 15–17 SEER2 hits the best value sweet spot. The efficiency gain over California's 13.4 SEER2 minimum is meaningful given our 6–7 month cooling season, and payback periods are typically 4–7 years. High-efficiency 18–21+ SEER2 systems make sense for larger homes or homeowners planning 10+ years in the house.",
  },
  {
    question: "How much can I save by upgrading from a 10-SEER to a 16-SEER2 system?",
    answer:
      "Upgrading from a 10-SEER system to a 16-SEER2 unit can reduce cooling electricity costs by roughly 35–45%. On a 3-ton system running 2,000 hours per year at $0.30/kWh, that's approximately $130–$180 in annual savings. At that rate, a $1,000 efficiency premium pays back in 6–7 years.",
  },
  {
    question: "Is SEER2 the same as SEER?",
    answer:
      "No. SEER2 uses a more rigorous test procedure that better reflects real-world installed conditions. A 16 SEER2 system is roughly equivalent to an 18 SEER system under the old test standard. Don't directly compare old SEER ratings with new SEER2 ratings — they're measured differently.",
  },
  {
    question: "Do high-efficiency AC systems qualify for rebates in California?",
    answer:
      "Yes. SoCal Edison and SoCalGas offer rebates for qualifying high-efficiency HVAC equipment. Heat pumps that meet ENERGY STAR efficiency thresholds also qualify for federal Inflation Reduction Act tax credits of up to 30%, capped at $2,000 per year. Ask your HVAC contractor to confirm eligibility before purchase.",
  },
];

export default function Seer2SavingsCalculatorPage() {
  return (
    <>
      <JsonLd
        data={schemaCalculatorPage({
          name: "SEER2 Savings Calculator — Orange County HVAC",
          description:
            "Compare AC operating costs between current and new systems. Calculate annual savings and payback period for Southern California homes.",
          url: "/calculators/seer2-savings-calculator",
        })}
      />
      <JsonLd data={schemaFaqPage(faqs)} />

      {/* Hero */}
      <section className="bg-brand-mid pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="text-slate-400 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            SEER2 Savings Calculator
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Is upgrading to a higher-efficiency AC actually worth it for your home? Enter your
            system details and electricity rate to see annual savings and payback period.
          </p>
        </div>
      </section>

      {/* Calculator + explainer */}
      <section className="py-14 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <Seer2SavingsCalculator />

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  SEER2 Efficiency Tiers Explained
                </h2>
                <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left p-3 text-slate-600 font-semibold">SEER2 Rating</th>
                        <th className="text-left p-3 text-slate-600 font-semibold">Tier</th>
                        <th className="text-left p-3 text-slate-600 font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["13.4", "Baseline", "CA minimum — single stage"],
                        ["15–16", "Mid", "Good value, often 2-stage"],
                        ["17–18", "High", "Variable-speed options"],
                        ["19–21+", "Premium", "Inverter-drive, best comfort"],
                      ].map(([rating, tier, notes]) => (
                        <tr key={rating} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 text-slate-900 font-bold">{rating}</td>
                          <td className="p-3 text-slate-700">{tier}</td>
                          <td className="p-3 text-slate-500">{notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl bg-green-50 border border-green-200 p-5">
                <h3 className="font-bold text-green-900 mb-2 text-sm">IRA Tax Credit Reminder</h3>
                <p className="text-sm text-green-800 leading-relaxed">
                  Qualifying heat pump installations receive a 30% federal tax credit, capped at
                  $2,000/year under the Inflation Reduction Act. A $7,000 heat pump installation
                  could mean $2,000 back at tax time. Ask us which models qualify.
                </p>
              </div>

              <div className="rounded-xl bg-hvac-blue-50 border border-hvac-blue-100 p-5">
                <h3 className="font-bold text-hvac-blue-900 mb-2 text-sm">SCE Rate Note</h3>
                <p className="text-sm text-hvac-blue-800 leading-relaxed">
                  Southern California Edison TOU rates average $0.28–$0.35/kWh for most households.
                  Peak hours (typically 4–9 PM) cost more. Pre-cooling during off-peak hours
                  amplifies the efficiency savings from a higher SEER2 system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">SEER2 Questions Answered</h2>
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
              { label: "Heat Pumps", href: "/heat-pumps" },
              { label: "All Calculators", href: "/calculators" },
              { label: "Blog: SEER2 Explained", href: "/blog/seer2-ratings-explained-california" },
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
        heading="Ready to Upgrade? Get a Free Replacement Quote"
        subtext="We'll quote multiple efficiency tiers side by side — so you can see the real-world payback for your home before you decide."
        primaryLabel="Request a Free Quote"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
