import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/ui/CtaSection";

export const metadata: Metadata = buildMetadata({
  title: "Free HVAC Calculators for Orange County Homeowners",
  description:
    "Use our free HVAC calculators to estimate AC size, compare SEER2 savings, decide between repair and replacement, and evaluate maintenance plans. Built for Southern California homes.",
  path: "/calculators",
});

const calculators = [
  {
    href: "/calculators/ac-size-calculator",
    title: "AC Size Calculator",
    description:
      "Estimate the right tonnage for your home based on square footage, ceiling height, insulation, and sun exposure. Orange County climate data built in.",
    icon: "📐",
    time: "2 min",
  },
  {
    href: "/calculators/seer2-savings-calculator",
    title: "SEER2 Savings Calculator",
    description:
      "Compare operating costs between your current system and a new higher-efficiency unit. See annual savings, payback period, and 10-year ROI.",
    icon: "💡",
    time: "3 min",
  },
  {
    href: "/calculators/repair-vs-replace-calculator",
    title: "Repair vs. Replace Calculator",
    description:
      "Get a data-driven recommendation based on system age, repair cost, refrigerant type, and whether your compressor has failed.",
    icon: "🔧",
    time: "2 min",
  },
  {
    href: "/calculators/maintenance-plan-calculator",
    title: "Maintenance Plan Calculator",
    description:
      "See whether an annual maintenance agreement pencils out for your home based on system age, number of units, and your current service habits.",
    icon: "📋",
    time: "2 min",
  },
];

const breadcrumbs = [{ name: "Calculators", href: "/calculators" }];

export default function CalculatorsIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-mid pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="text-slate-400 mb-6" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Free HVAC Calculators
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Practical tools for Orange County homeowners. Estimate AC sizing, compare efficiency tiers,
            and decide whether to repair or replace — before calling anyone.
          </p>
          <p className="mt-3 text-slate-400 text-sm">
            All results are estimates. A licensed technician should confirm any major purchasing decision.
          </p>
        </div>
      </section>

      {/* Calculator grid */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 hover:border-hvac-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl" aria-hidden="true">{calc.icon}</span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-hvac-blue-700 transition-colors leading-snug">
                      {calc.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">~{calc.time} to complete</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{calc.description}</p>
                <div className="mt-auto flex items-center gap-1.5 text-hvac-blue-600 font-semibold text-sm">
                  Open Calculator
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-10 rounded-xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> All calculator results are estimates based on general industry
            guidelines and typical Orange County conditions. They do not constitute a quote, a
            professional assessment, or a guarantee of any kind. Always consult a licensed HVAC
            professional before making purchasing or repair decisions.
          </div>
        </div>
      </section>

      {/* Related resources */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/air-conditioning/ac-installation" className="text-sm text-hvac-blue-600 hover:text-hvac-blue-500 font-medium transition-colors">
              → AC Installation in Orange County
            </Link>
            <Link href="/air-conditioning/ac-replacement" className="text-sm text-hvac-blue-600 hover:text-hvac-blue-500 font-medium transition-colors">
              → AC Replacement Guide
            </Link>
            <Link href="/air-conditioning/ac-tune-up" className="text-sm text-hvac-blue-600 hover:text-hvac-blue-500 font-medium transition-colors">
              → AC Tune-Up Service
            </Link>
            <Link href="/maintenance-plans" className="text-sm text-hvac-blue-600 hover:text-hvac-blue-500 font-medium transition-colors">
              → Maintenance Plan Options
            </Link>
            <Link href="/blog" className="text-sm text-hvac-blue-600 hover:text-hvac-blue-500 font-medium transition-colors">
              → HVAC Tips & Articles
            </Link>
            <Link href="/contact" className="text-sm text-hvac-blue-600 hover:text-hvac-blue-500 font-medium transition-colors">
              → Get a Free In-Home Estimate
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Want a Real Number, Not an Estimate?"
        subtext="Our technicians perform free in-home load calculations and provide written quotes on every AC installation and replacement job in Orange County."
        primaryLabel="Request a Free In-Home Estimate"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
