import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import { IMG_LENNOX_INSTALL } from "@/lib/config/images";
import JsonLd from "@/components/ui/JsonLd";
import { schemaOrganization } from "@/lib/seo/schema";
import PhoneLink from "@/components/ui/PhoneLink";
import CtaSection from "@/components/ui/CtaSection";
import InteriorHero from "@/components/layout/InteriorHero";

export const metadata: Metadata = {
  title: "About Us | Local HVAC Company in Yorba Linda, CA",
  description:
    "HVAC Service & AC Repair is a locally operated HVAC company based in Yorba Linda, CA. We serve Orange County and surrounding areas with honest, reliable service.",
  alternates: { canonical: "/about-us" },
};

const VALUES = [
  {
    title: "Honest Diagnosis",
    description:
      "We tell you what the problem is and what it will cost to fix — before we do anything. If a repair doesn't make financial sense, we'll tell you that too.",
  },
  {
    title: "Straightforward Pricing",
    description:
      "Our quotes are itemized and upfront. No hidden fees, no \"diagnostic\" charges that disappear into a final bill you weren't expecting.",
  },
  {
    title: "Local Focus",
    description:
      "We're based in Yorba Linda and serve the surrounding Orange County communities. We're not a national franchise — your call goes to a local team that knows this area.",
  },
  {
    title: "Quality Work",
    description:
      "We do the job correctly the first time. We use quality parts, follow manufacturer guidelines, and stand behind our work.",
  },
];

const WHAT_WE_DO = [
  "AC Repair & Diagnostics",
  "AC Installation & Replacement",
  "Heating & Furnace Service",
  "Ductless Mini-Split Systems",
  "Heat Pump Repair & Installation",
  "Commercial HVAC",
  "Air Duct Cleaning",
  "Preventive Maintenance & Tune-Ups",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={schemaOrganization()} />

      <InteriorHero
        breadcrumbs={[{ name: "About Us", href: "/about-us" }]}
        eyebrow="About Us"
        heading="A Local HVAC Team You Can Count On"
        description="HVAC Service & AC Repair is based in Yorba Linda and serves homeowners and businesses across Orange County. We're built on doing honest work at fair prices."
      />

      {/* Story section */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="flex flex-col gap-5">
              <span className="section-label section-label-blue w-fit">Our Approach</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                What Guides the Way We Work
              </h2>
              <div className="prose-hvac">
                <p>
                  HVAC repairs are stressful — especially when your AC goes out in July or your
                  heater stops working in January. Most people don&rsquo;t know enough about HVAC
                  systems to know if they&rsquo;re being told the truth or oversold on something
                  they don&rsquo;t need.
                </p>
                <p>
                  Our job is to change that. We give every customer a clear explanation of
                  what&rsquo;s happening with their system, what it costs to fix, and whether
                  it makes sense to fix it or consider a replacement. We leave the decision to you.
                </p>
                <p>
                  We serve homeowners and businesses across Orange County, and we take that
                  responsibility seriously. Your referral is worth more to us than a single upsell.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-4 bg-white rounded-xl border border-slate-200 shadow-card p-5"
                >
                  <div className="w-9 h-9 rounded-lg bg-copper-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-copper-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">{v.title}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label section-label-copper w-fit mb-4">Services</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                What We Do
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We handle the full range of residential and commercial HVAC needs across Orange County.
                From emergency repairs to planned installations, our trained technicians are equipped
                to handle it.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {WHAT_WE_DO.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-copper-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-hvac-blue-600 hover:underline"
              >
                View all services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Image + contact card */}
            <div className="flex flex-col gap-5">
              <div className="relative rounded-2xl overflow-hidden shadow-card" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={IMG_LENNOX_INSTALL.src}
                  alt={IMG_LENNOX_INSTALL.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 flex flex-col gap-5">
              <h3 className="font-bold text-slate-900 text-base">Based in Yorba Linda, CA</h3>
              <address className="not-italic text-sm text-slate-700 leading-relaxed">
                {SITE.address.street}<br />
                {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </address>
              <div>
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
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
                <PhoneLink
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-hvac-blue-600 text-white font-semibold text-sm hover:bg-hvac-blue-500 transition-colors"
                  showIcon
                  label={`Call ${SITE.phoneDisplay}`}
                />
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-colors"
                >
                  Request a Free Estimate
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-label section-label-blue mb-4">Our Team</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4 mb-3">
              Trained Technicians, Local People
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our team is made up of trained HVAC technicians who take their work seriously.
              When we show up at your home, you&rsquo;re dealing with someone who knows the job
              and respects your property.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                role: "Field Technicians",
                body: "Our field techs hold EPA 608 certification and carry the most common repair parts on every truck — capacitors, contactors, thermostats, and refrigerant — so most repairs complete on the first visit.",
              },
              {
                role: "Senior Technicians",
                body: "Senior techs lead larger installations and complex diagnostics. They perform Manual J load calculations on every new system installation and oversee ductwork modifications.",
              },
              {
                role: "Service Coordinators",
                body: "Our service coordinators manage scheduling, confirm appointment windows, and follow up after every job. If there&rsquo;s a question about your invoice or service, they&rsquo;re your first call.",
              },
            ].map(({ role, body }) => (
              <div key={role} className="rounded-2xl border border-slate-200 bg-white shadow-card p-6 flex flex-col gap-3">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">{role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Ready to Work with a Team You Can Trust?"
        subtext="Request a free estimate today — we'll get back to you within the hour."
        primaryLabel="Get a Free Estimate"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
