import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import { SERVICE_AREA_COUNTIES } from "@/lib/config/locations";
import QuoteForm from "@/components/ui/QuoteForm";
import JsonLd from "@/components/ui/JsonLd";
import { schemaContactPage } from "@/lib/seo/schema";
import InteriorHero from "@/components/layout/InteriorHero";
import { IMG_AC_REPAIR } from "@/lib/config/images";

export const metadata: Metadata = {
  title: "Contact Us | Free HVAC Estimates in Orange County, CA",
  description:
    "Contact HVAC Service & AC Repair for fast, honest service across Orange County. Call (714) 410-2784 or request a free estimate online.",
  alternates: { canonical: "/contact" },
};

const CONTACT_FAQS = [
  {
    q: "How quickly can you respond to a service request?",
    a: "For emergency calls, we aim to respond within hours. For standard service requests submitted online, we follow up within 1 business hour during operating hours (Mon–Fri 7 AM–7 PM, Sat 8 AM–5 PM).",
  },
  {
    q: "Do you charge a diagnostic fee?",
    a: "We charge a standard diagnostic fee to evaluate your system and identify the issue. That fee is applied toward the repair cost if you choose to proceed with us.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve Orange County, including Yorba Linda, Anaheim, Irvine, and surrounding cities. We also serve select cities in Riverside, San Bernardino, Ventura, and Santa Barbara counties.",
  },
  {
    q: "Do you offer after-hours or weekend service?",
    a: "Yes. Saturday hours are 8:00 AM – 5:00 PM. Emergency service is available on Sundays — call us directly for immediate help.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schemaContactPage()} />

      <InteriorHero
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
        eyebrow="Contact Us"
        heading="Let's Talk About Your HVAC System"
        description="Whether it's a repair, replacement, or tune-up, we'll give you straight answers and honest pricing. No upsells, no runaround."
        image={IMG_AC_REPAIR}
      />

      {/* Main content: form + info */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left: contact info */}
            <div className="lg:col-span-1 flex flex-col gap-8">

              {/* Emergency callout */}
              <div className="rounded-2xl bg-red-50 border border-red-200 p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p className="font-bold text-red-700 text-sm uppercase tracking-wide">AC / Heat Emergency?</p>
                </div>
                <p className="text-red-700 text-sm leading-relaxed">
                  If your system is completely out, call us directly. We offer emergency service and will get
                  someone to you as quickly as possible.
                </p>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-bold rounded-xl text-sm hover:bg-red-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Call {SITE.phoneDisplay}
                </a>
              </div>

              {/* NAP card */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-card p-6 flex flex-col gap-5">
                <h2 className="font-bold text-slate-900 text-base">Our Information</h2>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-copper-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Phone</p>
                    <a href={`tel:${SITE.phone}`} className="font-semibold text-hvac-blue-600 hover:underline">
                      {SITE.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-copper-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Email</p>
                    <a href={`mailto:${SITE.email}`} className="font-semibold text-hvac-blue-600 hover:underline text-sm">
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-copper-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Address</p>
                    <address className="not-italic text-sm text-slate-700 leading-relaxed">
                      {SITE.address.street}<br />
                      {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                    </address>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">Hours</p>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    <li className="flex justify-between">
                      <span>Mon – Fri</span>
                      <span className="font-medium">{SITE.hours.weekdays}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">{SITE.hours.saturday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-copper-600">{SITE.hours.sunday}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Counties served */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-card p-6">
                <h2 className="font-bold text-slate-900 text-base mb-3">Counties We Serve</h2>
                <ul className="space-y-1.5">
                  {SERVICE_AREA_COUNTIES.map((county) => (
                    <li key={county.slug}>
                      <Link
                        href={`/service-areas/${county.slug}`}
                        className="text-sm text-hvac-blue-600 hover:underline"
                      >
                        {county.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/service-areas"
                  className="inline-block mt-3 text-xs text-slate-500 hover:text-slate-700 underline transition-colors"
                >
                  View all service areas →
                </Link>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center text-slate-400 text-sm">
                <div className="text-center flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                  <span>Map — Yorba Linda, CA</span>
                </div>
              </div>
            </div>

            {/* Right: quote form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-card p-8">
                <QuoteForm
                  heading="Request a Free Estimate"
                  subheading="Fill out the form and we'll follow up within 1 hour during business hours."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
            Common Questions
          </h2>
          <dl className="space-y-4">
            {CONTACT_FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-slate-200 p-6">
                <dt className="font-semibold text-slate-900 text-base mb-2">{faq.q}</dt>
                <dd className="text-slate-600 text-sm leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
