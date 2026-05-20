import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { schemaCalculatorPage, schemaFaqPage } from "@/lib/seo/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/ui/CtaSection";
import MaintenancePlanCalculator from "@/components/calculators/MaintenancePlanCalculator";

export const metadata: Metadata = buildMetadata({
  title: "HVAC Maintenance Plan Calculator — Is It Worth It?",
  description:
    "Calculate whether an annual HVAC maintenance plan makes financial sense for your Orange County home. Compare plan cost against tune-up pricing, emergency call savings, and early repair detection value.",
  path: "/calculators/maintenance-plan-calculator",
});

const breadcrumbs = [
  { name: "Calculators", href: "/calculators" },
  { name: "Maintenance Plan Calculator", href: "/calculators/maintenance-plan-calculator" },
];

const faqs = [
  {
    question: "What does an HVAC maintenance plan typically include?",
    answer:
      "Our plan includes one annual tune-up per system (including coil cleaning, electrical inspection, refrigerant check, and drain flush), priority scheduling for service calls, 15% off all repairs, and no overtime charges on covered visits. Many plans also include filter reminders and a dedicated service line.",
  },
  {
    question: "Is an HVAC maintenance plan worth it for a newer system?",
    answer:
      "For a system under 5 years old, the financial case is thinner — newer systems fail less often and tune-up retail prices may only slightly exceed the plan cost. The primary value for newer systems is priority scheduling, which matters in summer when companies can be booked out weeks, and keeping the warranty valid (many manufacturers require documented annual maintenance).",
  },
  {
    question: "How much does a single AC tune-up cost in Orange County without a plan?",
    answer:
      "A thorough AC tune-up in Orange County typically runs $109–$149 for a standard visit. Comprehensive service including coil cleaning can run $150–$200. Emergency or after-hours service calls add a premium of $75–$150 on top of diagnostic and repair costs.",
  },
  {
    question: "Can a maintenance plan void my AC warranty?",
    answer:
      "The opposite is often true. Many manufacturers require documented annual maintenance to keep the warranty valid. A plan with a licensed contractor provides the documentation record you'd need for a warranty claim. Always keep your service receipts.",
  },
];

const planIncludes = [
  "Annual tune-up + coil cleaning (1 per system)",
  "Electrical component inspection (capacitor, contactor)",
  "Refrigerant pressure check",
  "Drain line flush and pan inspection",
  "Thermostat calibration check",
  "Priority scheduling — no waiting weeks",
  "15% discount on all repairs",
  "No overtime charges on covered visits",
];

export default function MaintenancePlanCalculatorPage() {
  return (
    <>
      <JsonLd
        data={schemaCalculatorPage({
          name: "HVAC Maintenance Plan Calculator",
          description:
            "Calculate whether an annual HVAC maintenance plan makes financial sense for your Orange County home.",
          url: "/calculators/maintenance-plan-calculator",
        })}
      />
      <JsonLd data={schemaFaqPage(faqs)} />

      {/* Hero */}
      <section className="bg-brand-mid pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="text-slate-400 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Maintenance Plan Value Calculator
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Is an annual HVAC maintenance agreement worth it for your home? Enter a few details
            to see how the numbers compare.
          </p>
        </div>
      </section>

      {/* Calculator + plan details */}
      <section className="py-14 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <MaintenancePlanCalculator />

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  What&rsquo;s Included in Our Plan
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {planIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-bold text-slate-800">$199/year per system</p>
              </div>

              <div className="rounded-xl bg-hvac-blue-50 border border-hvac-blue-100 p-5">
                <h3 className="font-bold text-hvac-blue-900 mb-2 text-sm">The Hidden Value: Priority Scheduling</h3>
                <p className="text-sm text-hvac-blue-800 leading-relaxed">
                  In July and August, HVAC companies in Orange County can be booked 10–14 days out
                  for non-emergency calls. Plan members get priority slots. When your AC stops
                  cooling on a 100°F weekend, priority scheduling isn&rsquo;t a nice-to-have —
                  it&rsquo;s the whole point.
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                <h3 className="font-bold text-amber-900 mb-2 text-sm">Warranty Preservation</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Most equipment manufacturers require documented annual maintenance to keep the
                  extended warranty valid. A plan ensures you have the service records if you ever
                  need to make a warranty claim on a compressor or heat exchanger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Maintenance Plan Questions</h2>
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
              { label: "Maintenance Plans", href: "/maintenance-plans" },
              { label: "AC Tune-Up", href: "/air-conditioning/ac-tune-up" },
              { label: "AC Maintenance", href: "/air-conditioning/ac-maintenance" },
              { label: "Commercial Maintenance", href: "/commercial-hvac/commercial-maintenance-plan" },
              { label: "All Calculators", href: "/calculators" },
              { label: "Blog: How Often to Service AC", href: "/blog/how-often-service-ac-orange-county" },
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
        heading="Ready to Sign Up for a Maintenance Plan?"
        subtext="Get priority scheduling, annual tune-ups, and 15% off all repairs. Enroll online or call us to add your system today."
        primaryLabel="View Plan Details"
        primaryHref="/maintenance-plans"
        variant="blue"
      />
    </>
  );
}
