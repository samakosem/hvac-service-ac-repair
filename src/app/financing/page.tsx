import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import JsonLd from "@/components/ui/JsonLd";
import { schemaFaqPage } from "@/lib/seo/schema";
import CtaSection from "@/components/ui/CtaSection";
import InteriorHero from "@/components/layout/InteriorHero";
import { IMG_COMMERCIAL_PRIMARY } from "@/lib/config/images";

export const metadata: Metadata = {
  title: "HVAC Financing Options | AC Repair & Installation — Orange County, CA",
  description:
    "Don't let cost stop you from getting reliable HVAC service. Ask about financing options for AC installation, replacement, and major repairs in Orange County.",
  alternates: { canonical: "/financing" },
};

const FINANCING_OPTIONS = [
  {
    title: "Low Monthly Payments",
    description:
      "Spread the cost of a new AC system or major repair over time with affordable monthly payments. Ask us about current terms when you call.",
    icon: (
      <svg className="w-6 h-6 text-copper-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: "Apply Over the Phone",
    description:
      "No lengthy paperwork. When you call to schedule service, ask our team about the financing application process and we&rsquo;ll walk you through it.",
    icon: (
      <svg className="w-6 h-6 text-copper-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    title: "Flexible Terms",
    description:
      "We work with financing partners to offer options that fit different budgets. Terms and approval depend on the financing provider and your credit profile.",
    icon: (
      <svg className="w-6 h-6 text-copper-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    question: "What can I finance through HVAC Service & AC Repair?",
    answer:
      "Financing is primarily available for larger purchases like new AC system installation, full system replacements, and ductless mini-split systems. It may also be available for significant repairs depending on the total cost.",
  },
  {
    question: "What credit score do I need to qualify?",
    answer:
      "Approval and terms depend on the financing partner. We encourage you to call us to discuss your situation — there may be options available even with less-than-perfect credit.",
  },
  {
    question: "How do I apply?",
    answer:
      "The easiest way is to call us when scheduling service and ask about financing. Our team will walk you through the application process and what to expect.",
  },
  {
    question: "Is financing available for emergency repairs?",
    answer:
      "We understand that emergencies are unplanned. Ask us about financing options when you call — in some cases we can arrange financing alongside emergency service.",
  },
  {
    question: "Are there interest-free options?",
    answer:
      "Promotional interest-free periods may be available depending on the current financing offer. Terms change, so ask us what's available when you contact us.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <JsonLd data={schemaFaqPage(FAQS.map((f) => ({ question: f.question, answer: f.answer })))} />

      <InteriorHero
        breadcrumbs={[{ name: "Financing", href: "/financing" }]}
        eyebrow="Financing Available"
        heading="Don't Wait for a Cool Home"
        description="A new AC system or major repair shouldn't have to wait until you have the full amount saved. Ask us about flexible financing options when you call."
        ctas={[
          { label: "Call to Ask About Financing", tel: SITE.phone },
          { label: "Request an Estimate Online", href: "/contact", variant: "secondary" },
        ]}
        image={IMG_COMMERCIAL_PRIMARY}
      />

      {/* Options */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label section-label-copper mb-4">How It Works</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4 mb-3">
              Financing That Works Around You
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We want to make quality HVAC service accessible. Here&rsquo;s what the financing experience
              looks like when you work with us.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FINANCING_OPTIONS.map((opt) => (
              <div key={opt.title} className="rounded-2xl border border-slate-200 bg-white shadow-card p-7 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-copper-100 flex items-center justify-center">
                  {opt.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1.5">{opt.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{opt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment example placeholder */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-copper-200 bg-copper-50 p-8 md:p-10">
            <h2 className="text-xl font-bold text-slate-900 mb-2">What Could Payments Look Like?</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Exact payment amounts depend on the system cost, your financing term, and current
              promotional rates from our lending partners. The table below shows illustrative examples only —
              contact us for actual current terms.
            </p>
            <div className="overflow-x-auto">
              <table className="compare-table w-full text-sm">
                <thead>
                  <tr>
                    <th>System / Service</th>
                    <th>Approx. Range</th>
                    <th>Example Payment*</th>
                    <th>Example Term</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>New Central AC (2–3 ton)</td>
                    <td>$4,000 – $8,000+</td>
                    <td>~$90–$180/mo</td>
                    <td>48–60 months</td>
                  </tr>
                  <tr>
                    <td>Ductless Mini-Split (1 zone)</td>
                    <td>$3,000 – $6,000</td>
                    <td>~$70–$140/mo</td>
                    <td>48 months</td>
                  </tr>
                  <tr>
                    <td>Furnace Replacement</td>
                    <td>$3,500 – $6,000</td>
                    <td>~$80–$135/mo</td>
                    <td>48 months</td>
                  </tr>
                  <tr>
                    <td>Major Repair</td>
                    <td>$800 – $2,500</td>
                    <td>~$20–$60/mo</td>
                    <td>24 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              *Illustrative only. Actual payments depend on credit approval, interest rate, and financing partner terms.
              Contact us for current offers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
            Financing FAQ
          </h2>
          <dl className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-6">
                <dt className="font-semibold text-slate-900 text-base mb-2">{faq.question}</dt>
                <dd className="text-slate-600 text-sm leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaSection
        heading="Ready to Get Started?"
        subtext="Call us to ask about current financing options or request a free estimate online."
        primaryLabel="Request a Free Estimate"
        primaryHref="/contact"
        variant="copper"
      />
    </>
  );
}
