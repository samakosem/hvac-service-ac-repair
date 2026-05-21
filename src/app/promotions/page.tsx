import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/config/site";
import { ACTIVE_PROMOTIONS } from "@/lib/config/promotions";
import JsonLd from "@/components/ui/JsonLd";
import CtaSection from "@/components/ui/CtaSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PromotionCard from "@/components/promotions/PromotionCard";

export const metadata: Metadata = buildMetadata({
  title: "HVAC Promotions, Specials & Savings — Orange County, CA",
  description:
    "Current HVAC promotions from HVAC Service & AC Repair in Yorba Linda. Free inspections, $89 AC tune-ups, emergency discounts, veterans savings, financing offers, and more for Orange County homeowners.",
  path: "/promotions",
});

const CATEGORIES = [
  { value: "all", label: "All Offers" },
  { value: "inspection", label: "Inspections & Estimates" },
  { value: "tune-up", label: "Tune-Ups & Maintenance" },
  { value: "installation", label: "Installation" },
  { value: "emergency", label: "Emergency" },
  { value: "financing", label: "Financing" },
  { value: "seasonal", label: "Seasonal" },
  { value: "customer", label: "Customer Discounts" },
  { value: "commercial", label: "Commercial" },
] as const;

const FAQS = [
  {
    q: "How do I claim a promotion or special offer?",
    a: "Just mention the offer when you call or submit a request online. We'll confirm current availability and apply it to your service. No coupon codes needed.",
  },
  {
    q: "Do your promotions expire?",
    a: "Some seasonal offers are time-limited while others are ongoing. The best way to confirm what's currently available is to call us at " + SITE.phoneDisplay + ". We'll tell you exactly what applies to your situation.",
  },
  {
    q: "Can I combine multiple promotions?",
    a: "Promotional offers generally cannot be combined with each other unless explicitly stated. Financing offers cannot be combined with installation credits or equipment add-on promotions. Call us and we'll tell you exactly what applies to your situation.",
  },
  {
    q: "Are these promotions available across all Orange County cities?",
    a: "Yes — all promotions apply to our full service area, which covers Orange County, Riverside County, and San Bernardino County. If you're unsure whether we cover your city, call us and we'll confirm.",
  },
  {
    q: "Is the free HVAC inspection really free — no strings attached?",
    a: "Yes. We'll send a licensed technician to inspect your system and give you a written rundown of what we find. If you decide to move forward with repairs, great. If not, there's no charge and no obligation.",
  },
  {
    q: "Do you offer discounts for veterans and seniors?",
    a: "Yes. We offer a discount for U.S. military veterans, active-duty personnel, and homeowners 65 and older. Valid ID or documentation required at time of service.",
  },
];

// JSON-LD schemas
function schemaBreadcrumb() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Promotions", item: `${SITE.domain}/promotions` },
    ],
  };
}

function schemaFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };
}

export default function PromotionsPage() {
  const promos = ACTIVE_PROMOTIONS;

  // group counts for filter display
  const counts: Record<string, number> = { all: promos.length };
  for (const p of promos) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }

  return (
    <>
      <JsonLd data={schemaBreadcrumb()} />
      <JsonLd data={schemaFaq()} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 lg:py-24">
        {/* Decorative orbs */}
        <div aria-hidden="true" className="absolute -right-24 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-hvac-blue-600/8 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute -left-16 bottom-0 w-80 h-80 rounded-full bg-copper-500/8 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Promotions", href: "/promotions" }]}
            className="text-slate-400 mb-8"
          />

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-copper-300 mb-5">
              Current Offers &amp; Specials
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
              Current HVAC Offers{" "}
              <span className="text-gradient-copper">for Orange County Homeowners</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
              Free inspections, tune-up specials, emergency service discounts, and financing options on new systems.
              All offers are subject to availability — call us to confirm what applies to your situation.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "No hidden fees",
                "Written estimates before work begins",
                "Same-day availability",
                "Licensed & insured",
              ].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/18 text-white text-xs font-medium"
                >
                  <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {pill}
                </span>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
              >
                Request a Free Estimate
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/8 text-white font-semibold rounded-xl border border-white/18 hover:bg-white/14 transition-colors text-base"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8">
            {[
              { n: promos.length.toString() + "+", label: "Active Offers" },
              { n: "Free", label: "Estimates & Inspections" },
              { n: "Same-Day", label: "Service Available" },
              { n: "5-County", label: "Service Area" },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-white">{n}</p>
                <p className="text-slate-400 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency callout banner ────────────────────────────────────────── */}
      <div className="bg-emergency-strip py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white text-sm text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75" style={{ animation: "pulse-ring 1.4s cubic-bezier(0.215,0.61,0.355,1) infinite" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <p>
              <strong>Emergency AC repair available today.</strong> Diagnostic fee waived when repair is completed at time of service.
            </p>
          </div>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 font-bold text-white text-sm transition-colors shrink-0"
          >
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      {/* ── Filter + Grid ───────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-slate-50" id="offers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="mb-8">
            <span className="section-label section-label-copper mb-4 inline-block">All Current Offers</span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {promos.length} Promotions Available
              </h2>
              <p className="text-slate-500 text-sm max-w-sm text-right">
                Call to confirm current availability in your area.
              </p>
            </div>
          </div>

          {/* Filter tabs — static; filtering handled by anchor/param in future */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const count = counts[cat.value] ?? 0;
              if (cat.value !== "all" && count === 0) return null;
              return (
                <span
                  key={cat.value}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 text-xs font-semibold cursor-default"
                >
                  {cat.label}
                  {count > 0 && (
                    <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                      {count}
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          {/* Full promotions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {promos.map((promo, i) => (
              <div
                key={promo.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}
              >
                <PromotionCard promo={promo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Financing banner ────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-18 bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="section-label section-label-white w-fit">Financing</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Don&rsquo;t Let the Upfront Cost Delay a Repair or Replacement
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                A broken AC in an Orange County summer isn&rsquo;t something you can wait on.
                We offer financing options on qualified new AC and heat pump installations —
                ask about current terms when you call.
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Financing on new AC and heat pump systems",
                  "Monthly payment plans — OAC",
                  "No-surprise pricing with written estimates",
                  "Ask about current seasonal rate specials",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-300">
                    <svg className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 bg-white/6 border border-white/12 rounded-2xl p-7 flex flex-col gap-4">
              <p className="font-bold text-white text-base">Ask About Financing When You Call</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Financing terms change periodically. The fastest way to know what applies
                to your installation is to call — we&rsquo;ll walk you through the options.
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-bold text-sm shadow-glow-copper hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {SITE.phoneDisplay}
                </a>
                <Link
                  href="/financing"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:border-white/40 transition-colors"
                >
                  Financing Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service area links ──────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Serving Orange County &amp; Surrounding Areas</h2>
            <p className="text-slate-500 text-sm">All promotions available across our full service area.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {[
              { name: "Yorba Linda", href: "/service-areas/orange-county/yorba-linda" },
              { name: "Anaheim", href: "/service-areas/orange-county/anaheim" },
              { name: "Orange", href: "/service-areas/orange-county/orange" },
              { name: "Fullerton", href: "/service-areas/orange-county/fullerton" },
              { name: "Placentia", href: "/service-areas/orange-county/placentia" },
              { name: "Brea", href: "/service-areas/orange-county/brea" },
              { name: "Irvine", href: "/service-areas/orange-county/irvine" },
              { name: "Corona", href: "/service-areas/riverside-county/corona" },
              { name: "Riverside", href: "/service-areas/riverside-county/riverside" },
            ].map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="px-3.5 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-hvac-blue-400 hover:text-hvac-blue-700 transition-colors text-xs font-medium"
              >
                {name}
              </Link>
            ))}
            <Link
              href="/service-areas"
              className="px-3.5 py-1.5 rounded-full border border-copper-200 bg-copper-50 text-copper-600 hover:bg-copper-100 transition-colors text-xs font-semibold"
            >
              View All Service Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-slate-50" aria-labelledby="promo-faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-label section-label-blue mb-4 inline-block">FAQ</span>
            <h2 id="promo-faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900">
              Questions About Our Promotions
            </h2>
          </div>
          <div className="divide-y divide-slate-200">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="py-6">
                <h3 className="font-semibold text-slate-900 text-base mb-2">{q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer ──────────────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            Promotions, pricing, and availability are subject to change without notice. Restrictions may apply.
            Availability may vary by service area. Offers apply to standard residential systems unless otherwise noted.
            Offers cannot be combined with other promotional discounts unless explicitly stated. No guarantee of savings
            is implied — actual pricing depends on system type, condition, and scope of work. Call{" "}
            <a href={`tel:${SITE.phone}`} className="text-hvac-blue-600 hover:underline font-semibold">
              {SITE.phoneDisplay}
            </a>{" "}
            to confirm current availability and applicable terms before scheduling service.
          </p>
        </div>
      </section>

      <CtaSection
        heading="Ready to Book or Have a Question About an Offer?"
        subtext="Call us or submit a request online. We'll confirm what's available and what makes sense for your system — no pressure."
        primaryLabel="Request a Free Estimate"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
