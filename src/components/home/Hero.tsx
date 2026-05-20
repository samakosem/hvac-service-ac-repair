import Image from "next/image";
import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";
import { IMG_HERO } from "@/lib/config/images";

const TRUST_PILLS = [
  { label: "Same-Day Availability", icon: "⚡" },
  { label: "Local Yorba Linda HVAC Team", icon: "📍" },
  { label: "Transparent Estimates", icon: "💬" },
  { label: "Residential & Commercial", icon: "🏠" },
];

export default function Hero() {
  return (
    <section
      className="relative flex items-center bg-hero-gradient overflow-hidden"
      style={{ minHeight: "calc(100svh - 0px)" }}
      aria-label="Hero"
    >
      {/* Subtle background texture */}
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      {/* Gradient orbs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-hvac-blue-600/8 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-copper-500/7 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="flex flex-col gap-5 animate-fade-in-up">

            {/* Location pill */}
            <div className="section-label section-label-white w-fit">
              <svg className="w-3.5 h-3.5 text-copper-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Yorba Linda, Orange County, CA
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-white leading-[1.12] tracking-tight">
              HVAC Service &amp; AC Repair{" "}
              <span className="block mt-1 text-gradient-blue">
                in Yorba Linda,{" "}
                <span className="text-white">Orange County</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-lg stagger-1 animate-fade-in-up">
              Same-day AC repair, system installation, and HVAC maintenance
              for homes and businesses across Orange County. Call us — we answer.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1 stagger-2 animate-fade-in-up">
              <PhoneLink
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-92 active:scale-[0.98] transition-all duration-150 text-base"
                showIcon
                label={`Call ${SITE.phoneDisplay}`}
              />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/9 text-white font-semibold rounded-xl border border-white/16 hover:bg-white/15 active:scale-[0.98] transition-all duration-150 text-base"
              >
                Free Estimate
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Trust pills — verified-safe only */}
            <div className="flex flex-wrap gap-2 pt-2 stagger-3 animate-fade-in-up">
              {TRUST_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/7 border border-white/10 text-xs font-medium text-slate-200"
                >
                  <span aria-hidden="true">{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Media area ── */}
          <div className="hidden lg:flex flex-col gap-4 stagger-2 animate-fade-in-up">

            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-glass" style={{ aspectRatio: "3/4" }}>
              <Image
                src={IMG_HERO.src}
                alt={IMG_HERO.alt}
                fill
                sizes="(max-width: 1024px) 0px, 45vw"
                className="object-cover object-center"
                priority
              />
              {/* subtle dark vignette so info cards sit legibly on top */}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Info row below media */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card-navy p-4 rounded-xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-copper-500/15 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-copper-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-snug">Based in Yorba Linda</p>
                  <p className="text-slate-400 text-xs mt-0.5">{SITE.address.street}</p>
                </div>
              </div>

              <div className="card-navy p-4 rounded-xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-hvac-blue-600/15 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-hvac-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-snug">Mon–Sat Service</p>
                  <p className="text-slate-400 text-xs mt-0.5">Sun emergency available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/6 to-transparent pointer-events-none"
      />
    </section>
  );
}
