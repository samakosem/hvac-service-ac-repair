import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { SiteImage } from "@/lib/config/images";

type BreadcrumbItem = { name: string; href: string };

type Cta = {
  label: string;
  href?: string;
  tel?: string;
  variant?: "primary" | "secondary";
};

type Props = {
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  heading: string;
  description?: string;
  ctas?: Cta[];
  note?: string;
  image?: SiteImage;
};

export default function InteriorHero({
  breadcrumbs,
  eyebrow,
  heading,
  description,
  ctas,
  note,
  image,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-14 lg:py-20">
      {/* Background image — partially opaque */}
      {image && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-20"
            priority
          />
          {/* extra dark gradient so text stays crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/50 to-navy-950/20" />
        </div>
      )}

      {/* Decorative orbs */}
      <div aria-hidden="true" className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-hvac-blue-600/8 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-copper-500/6 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="text-slate-400 mb-6" />

        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-copper-300 mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {heading}
          </h1>
          {description && (
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              {ctas.map((cta) =>
                cta.tel ? (
                  <a
                    key={cta.label}
                    href={`tel:${cta.tel}`}
                    className={
                      cta.variant === "secondary"
                        ? "inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/8 text-white font-semibold rounded-xl border border-white/18 hover:bg-white/14 transition-colors text-base"
                        : "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
                    }
                  >
                    {cta.label}
                  </a>
                ) : (
                  <Link
                    key={cta.label}
                    href={cta.href!}
                    className={
                      cta.variant === "secondary"
                        ? "inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/8 text-white font-semibold rounded-xl border border-white/18 hover:bg-white/14 transition-colors text-base"
                        : "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
                    }
                  >
                    {cta.label}
                  </Link>
                )
              )}
            </div>
          )}
          {note && (
            <p className="mt-4 text-slate-500 text-xs">{note}</p>
          )}
        </div>
      </div>
    </section>
  );
}
