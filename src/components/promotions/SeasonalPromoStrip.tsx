import Link from "next/link";
import { SITE } from "@/lib/config/site";
import type { Promotion } from "@/lib/config/promotions";

type Props = {
  promotions: Promotion[];
  label?: string;
};

export default function SeasonalPromoStrip({ promotions, label = "Current Offers" }: Props) {
  if (promotions.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-warm-tint" aria-labelledby="promo-strip-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="section-label section-label-copper mb-3 inline-block">{label}</span>
            <h2 id="promo-strip-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Savings & Specials for Orange County Homeowners
            </h2>
          </div>
          <Link
            href="/promotions"
            className="inline-flex items-center gap-1.5 text-copper-500 font-semibold text-sm hover:text-copper-600 transition-colors shrink-0"
          >
            View All Offers
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promotions.slice(0, 4).map((promo) => (
            <Link
              key={promo.slug}
              href={promo.ctaHref}
              className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-5 hover:border-copper-300 hover:shadow-md transition-all duration-200"
              aria-label={promo.title}
            >
              {/* Badge */}
              {promo.badge && (
                <span className="inline-block self-start text-xs font-bold px-2.5 py-1 rounded-full bg-copper-100 text-copper-600 mb-3">
                  {promo.badge}
                </span>
              )}
              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-hvac-blue-50 flex items-center justify-center mb-3" aria-hidden="true">
                <svg className="w-4.5 h-4.5 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={promo.icon} />
                </svg>
              </div>
              {/* Title */}
              <p className="font-bold text-slate-900 text-sm leading-snug mb-1.5 group-hover:text-copper-600 transition-colors">
                {promo.shortTitle}
              </p>
              {/* Teaser */}
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1">
                {promo.description}
              </p>
              {/* Arrow */}
              <div className="mt-3 flex items-center gap-1 text-copper-500 text-xs font-semibold">
                {promo.ctaText}
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Promotions subject to change. Call{" "}
          <a href={`tel:${SITE.phone}`} className="text-hvac-blue-600 hover:underline font-semibold">
            {SITE.phoneDisplay}
          </a>{" "}
          to confirm current availability.
        </p>
      </div>
    </section>
  );
}
