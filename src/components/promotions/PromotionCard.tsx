import Link from "next/link";
import { SITE } from "@/lib/config/site";
import type { Promotion } from "@/lib/config/promotions";
import { ACCENT_COLORS } from "@/lib/config/promotions";

type Props = {
  promo: Promotion;
  /** compact = smaller padding, used in grid with many cards */
  size?: "default" | "compact" | "featured";
};

export default function PromotionCard({ promo, size = "default" }: Props) {
  const colors = ACCENT_COLORS[promo.accent];
  const isFeatured = size === "featured";
  const isCompact = size === "compact";

  const padding = isFeatured ? "p-8" : isCompact ? "p-5" : "p-6";

  return (
    <article
      className={`relative flex flex-col bg-white rounded-2xl border border-slate-200 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${colors.border} ${padding}`}
      aria-label={promo.title}
    >
      {/* Top row: category badge + limited badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${colors.badge}`}>
            {promo.categoryLabel}
          </span>
          {promo.badge && (
            <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white">
              {promo.badge}
            </span>
          )}
        </div>
        {promo.limited && (
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold shrink-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" aria-hidden="true" style={{ animationDuration: "1.8s" }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Limited
          </span>
        )}
      </div>

      {/* Icon + Title */}
      <div className={`flex items-start gap-3.5 mb-3 ${isFeatured ? "mb-4" : ""}`}>
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${colors.badge}`} aria-hidden="true">
          <svg className={`w-5 h-5 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d={promo.icon} />
          </svg>
        </div>
        <h3 className={`font-bold text-slate-900 leading-snug ${isFeatured ? "text-xl" : isCompact ? "text-base" : "text-lg"}`}>
          {promo.title}
        </h3>
      </div>

      {/* Description */}
      <p className={`text-slate-600 leading-relaxed flex-1 ${isCompact ? "text-xs" : "text-sm"}`}>
        {promo.description}
      </p>

      {/* Disclaimer */}
      {promo.disclaimer && !isCompact && (
        <p className="text-xs text-slate-400 leading-relaxed mt-3 pt-3 border-t border-slate-100">
          * {promo.disclaimer}
        </p>
      )}

      {/* CTAs */}
      <div className={`flex flex-col sm:flex-row gap-2 ${isCompact ? "mt-4" : "mt-5"}`}>
        <Link
          href={promo.ctaHref}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {promo.ctaText}
        </Link>
        {promo.secondaryCta && !isCompact && (
          promo.secondaryCta.tel ? (
            <a
              href={`tel:${promo.secondaryCta.tel}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-colors"
            >
              {promo.secondaryCta.text}
            </a>
          ) : (
            <Link
              href={promo.secondaryCta.href!}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-colors"
            >
              {promo.secondaryCta.text}
            </Link>
          )
        )}
        {isCompact && (
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call
          </a>
        )}
      </div>
    </article>
  );
}
