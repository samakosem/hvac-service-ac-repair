import Link from "next/link";
import { SITE } from "@/lib/config/site";

type Props = {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryTel?: string;
  secondaryHref?: string;
  variant?: "copper" | "blue" | "dark";
  badge?: string;
};

export default function PromoBanner({
  eyebrow,
  heading,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryTel,
  secondaryHref,
  variant = "copper",
  badge,
}: Props) {
  const bg =
    variant === "dark"
      ? "bg-section-dark"
      : variant === "blue"
      ? "bg-gradient-to-br from-hvac-blue-900 to-navy-800"
      : "bg-gradient-to-br from-copper-600 to-copper-400";

  const secondaryEl =
    secondaryTel ? (
      <a
        href={`tel:${secondaryTel}`}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/12 border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
      >
        {secondaryLabel ?? `Call ${SITE.phoneDisplay}`}
      </a>
    ) : secondaryHref ? (
      <Link
        href={secondaryHref}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/12 border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
      >
        {secondaryLabel}
      </Link>
    ) : null;

  return (
    <section className={`relative overflow-hidden py-12 lg:py-16 ${bg}`} aria-label={heading}>
      {/* Decorative orb */}
      <div aria-hidden="true" className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="section-label section-label-white mb-4 inline-block">{eyebrow}</span>
            )}
            {badge && (
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wide border border-white/30">
                {badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">{heading}</h2>
            {subtext && (
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">{subtext}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors shadow-sm"
            >
              {primaryLabel}
            </Link>
            {secondaryEl}
          </div>
        </div>
      </div>
    </section>
  );
}
