import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import { IMG_MAINTENANCE } from "@/lib/config/images";
import JsonLd from "@/components/ui/JsonLd";
import { schemaFaqPage, schemaService } from "@/lib/seo/schema";
import CtaSection from "@/components/ui/CtaSection";
import PhoneLink from "@/components/ui/PhoneLink";
import InteriorHero from "@/components/layout/InteriorHero";

export const metadata: Metadata = {
  title: "HVAC Maintenance Plans | Residential & Commercial — Orange County, CA",
  description:
    "Protect your HVAC investment with a seasonal maintenance plan from HVAC Service & AC Repair. Residential and commercial plans available across Orange County.",
  alternates: { canonical: "/maintenance-plans" },
};

const RESIDENTIAL_INCLUDES = [
  "Full system inspection — filters, coils, electrical, refrigerant check",
  "Condenser and evaporator coil cleaning",
  "Blower motor and fan belt inspection",
  "Thermostat calibration and functional test",
  "Drain line flush and condensate pan check",
  "Air filter check (filter replacement available at add-on cost)",
  "Written service report with findings",
  "Priority scheduling for repair calls",
];

const COMMERCIAL_INCLUDES = [
  "Rooftop unit (RTU) inspection and cleaning",
  "Electrical component check and tightening",
  "Refrigerant level inspection",
  "Belt and pulley inspection",
  "Drain pan and condensate line cleaning",
  "Filter check (replacement at additional cost)",
  "Written maintenance log for compliance records",
  "Priority scheduling and dedicated account management",
];

const COMPARISON = [
  { feature: "System Inspection", residential: true, commercial: true },
  { feature: "Coil Cleaning", residential: true, commercial: true },
  { feature: "Thermostat Calibration", residential: true, commercial: false },
  { feature: "Drain Line Flush", residential: true, commercial: true },
  { feature: "Written Service Report", residential: true, commercial: true },
  { feature: "Priority Scheduling", residential: true, commercial: true },
  { feature: "Rooftop Unit Service", residential: false, commercial: true },
  { feature: "Compliance Maintenance Log", residential: false, commercial: true },
];

const FAQS = [
  {
    question: "How often should I have my HVAC system serviced?",
    answer:
      "Most systems benefit from service twice a year — once in spring before cooling season and once in fall before heating season. At minimum, an annual inspection helps catch developing issues early.",
  },
  {
    question: "What's included in a tune-up visit?",
    answer:
      "A standard tune-up covers a full system inspection, coil cleaning, drain line flush, thermostat test, and electrical component check. You receive a written report of findings after each visit.",
  },
  {
    question: "Do I need a maintenance plan or can I just schedule a one-time tune-up?",
    answer:
      "Both options are available. A one-time tune-up is great if you just want to get your system checked out. A maintenance plan makes more sense if you want scheduled service twice a year and prefer not to think about it.",
  },
  {
    question: "Will maintenance catch refrigerant leaks?",
    answer:
      "During a maintenance visit, we check refrigerant levels and can identify signs of a low charge. However, leak detection is a separate diagnostic service if a leak is suspected.",
  },
  {
    question: "Can I get a maintenance plan for a commercial property?",
    answer:
      "Yes. We offer commercial maintenance plans for small offices, retail, and light commercial spaces. Contact us to discuss your system type and we'll build a plan that fits your needs.",
  },
];

function CheckIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg className="w-4 h-4 text-emerald-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
  }
  return <span className="block text-center text-slate-300 text-sm">—</span>;
}

export default function MaintenancePlansPage() {
  return (
    <>
      <JsonLd
        data={schemaService({
          name: "HVAC Maintenance Plans",
          description:
            "Residential and commercial HVAC maintenance plans including seasonal inspections, coil cleaning, and priority scheduling across Orange County, CA.",
          url: "/maintenance-plans",
        })}
      />
      <JsonLd data={schemaFaqPage(FAQS.map((f) => ({ question: f.question, answer: f.answer })))} />

      <InteriorHero
        breadcrumbs={[{ name: "Maintenance Plans", href: "/maintenance-plans" }]}
        eyebrow="Preventive Maintenance"
        heading="Keep Your System Running — Before It Breaks Down"
        description="Most HVAC failures are preventable. A seasonal inspection catches low refrigerant, dirty coils, and worn components before they become emergencies."
        image={IMG_MAINTENANCE}
      />

      {/* Residential plan */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="section-label section-label-blue w-fit mb-4">Residential</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Residential Maintenance Plan
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Designed for homeowners who want to stay ahead of repairs. We schedule your seasonal
                visits so you don&rsquo;t have to think about it — your system gets inspected before
                the hottest and coldest months of the year.
              </p>
              <ul className="space-y-2.5 mb-6">
                {RESIDENTIAL_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-hvac-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/maintenance/residential-maintenance-plan"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-hvac-blue-600 text-white font-semibold text-sm hover:bg-hvac-blue-500 transition-colors"
                >
                  Learn More
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Enroll Today
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative rounded-2xl overflow-hidden shadow-card" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={IMG_MAINTENANCE.src}
                  alt={IMG_MAINTENANCE.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white shadow-card p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-hvac-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <p className="font-bold text-slate-900">What to Expect at Each Visit</p>
              </div>
              {["Technician arrives during your scheduled window", "Full inspection of all accessible HVAC components", "Cleaning and minor adjustments performed", "Any issues noted and explained — you decide next steps", "Written summary left with you before we leave"].map((step, i) => (
                <div key={step} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-copper-100 flex items-center justify-center text-copper-600 text-xs font-bold">{i + 1}</span>
                  <p className="text-sm text-slate-700">{step}</p>
                </div>
              ))}
              <div className="rounded-xl bg-slate-50 p-4 mt-2">
                <p className="text-sm text-slate-600">
                  <strong className="text-slate-900">Honest assessment included:</strong> If we find
                  something during the visit, we tell you what it costs and whether it needs fixing now
                  or can wait. The decision is always yours.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial plan */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="order-2 lg:order-1 rounded-2xl border border-copper-200 bg-copper-50 p-7 flex flex-col gap-3">
              <p className="font-bold text-slate-900 mb-2">Commercial Plan Highlights</p>
              {COMMERCIAL_INCLUDES.map((item) => (
                <div key={item} className="flex items-start gap-2.5 py-2 border-b border-copper-100 last:border-0">
                  <svg className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <span className="section-label section-label-copper w-fit mb-4">Commercial</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Commercial HVAC Maintenance
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Downtime in a commercial space is expensive. A scheduled maintenance program keeps
                your system in spec, supports equipment warranties, and gives you documentation
                for compliance purposes.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                We work with small offices, retail spaces, restaurants, and light commercial
                buildings across Orange County. Contact us to discuss your building&rsquo;s
                specific needs.
              </p>
              <PhoneLink
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                showIcon
                label="Call to Discuss Your Property"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Residential vs. Commercial — What&rsquo;s Included
          </h2>
          <div className="overflow-x-auto">
            <table className="compare-table w-full">
              <thead>
                <tr>
                  <th className="text-left">Service Item</th>
                  <th>Residential</th>
                  <th>Commercial</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td><CheckIcon checked={row.residential} /></td>
                    <td><CheckIcon checked={row.commercial} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
            Maintenance Plan FAQ
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
        heading="Start Protecting Your System Today"
        subtext="Ask about enrollment in our residential or commercial maintenance program when you call."
        primaryLabel="Request a Free Estimate"
        primaryHref="/contact"
        variant="dark"
      />
    </>
  );
}
