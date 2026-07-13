"use client";

import Image from "next/image";
import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";
import { IMG_HERO } from "@/lib/config/images";

const TRUST_BULLETS = [
  "Same-Day Appointments",
  "Licensed & Insured",
  "Upfront Pricing",
];

export default function Hero() {
  return (
    <section
      className="relative flex items-end lg:items-center bg-navy-950 overflow-hidden min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-6.75rem)]"
      aria-label="Hero"
    >
      {/* ── Full-bleed background photo ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <Image
          src={IMG_HERO.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[72%_center] lg:object-[78%_center]"
          preload
        />

        {/* Readability gradients — lighter navy so the brighter image shows through;
            left stays dark enough for white text, right breathes fully */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/55 to-navy-900/10 lg:from-navy-950/85 lg:via-navy-900/35 lg:to-transparent" />
        {/* Light vertical anchor so bullets/CTA stay legible on mobile */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/85 via-navy-900/35 to-transparent lg:h-2/5 lg:via-transparent" />
        {/* Top scrim for header seam */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/55 to-transparent" />
        {/* Brand color wash — subtle blue left */}
        <div className="absolute -left-40 top-0 w-[45%] h-full bg-hvac-blue-600/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:py-16">
        <div className="max-w-xl lg:max-w-2xl flex flex-col gap-7 lg:gap-8 animate-fade-in-up">

          {/* Status badge — split chip */}
          <div className="inline-flex items-center w-fit rounded-full overflow-hidden border border-red-400/40 bg-navy-900/70 backdrop-blur-sm shadow-[0_0_24px_-6px_rgba(239,68,68,0.55)]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider whitespace-nowrap">
              <span className="relative flex w-1.5 h-1.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex w-full h-full rounded-full bg-white opacity-70 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white" />
              </span>
              Open Now
            </span>
            <span className="px-3 sm:px-3.5 py-1.5 text-red-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
              Same-Day HVAC Calls
            </span>
          </div>

          {/* H1 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[2.6rem] sm:text-6xl lg:text-[4rem] xl:text-[4.4rem] font-bold text-white leading-[1.05] tracking-tight [text-shadow:0_2px_30px_rgba(10,15,30,0.6)]">
              Fast HVAC Service &amp; AC Repair{" "}
              <span className="block mt-1.5 text-gradient-warm">
                Near You
              </span>
            </h1>
            <div aria-hidden="true" className="w-24 h-1.5 rounded-full bg-copper-gradient shadow-glow-copper" />
          </div>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-slate-200 leading-relaxed max-w-lg pl-4 border-l-2 border-copper-500/60 stagger-1 animate-fade-in-up">
            AC not cooling? Get fast local HVAC repair, installation, and maintenance
            from licensed technicians near you.
          </p>

          {/* Trust bullets — 3 core signals, inline */}
          <ul className="flex flex-wrap gap-x-6 gap-y-3 stagger-2 animate-fade-in-up">
            {TRUST_BULLETS.map((text) => (
              <li key={text} className="flex items-center gap-2.5 text-base font-medium text-slate-100">
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/30 shrink-0"
                >
                  <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                {text}
              </li>
            ))}
          </ul>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 stagger-3 animate-fade-in-up">
            <PhoneLink
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper ring-1 ring-copper-300/40 hover:opacity-92 active:scale-[0.98] transition-all duration-150 text-[17px]"
              showIcon
              label={`Call Now — ${SITE.phoneDisplay}`}
            />
            <Link
              href="#estimate-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/25 backdrop-blur-sm hover:bg-white/16 hover:border-white/40 active:scale-[0.98] transition-all duration-150 text-[17px]"
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Link>
          </div>

          {/* Trust strip — 3 compact signals, subtle */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 mt-1 border-t border-white/10 text-slate-300 stagger-3 animate-fade-in-up">
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <svg className="w-3.5 h-3.5 text-copper-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Licensed &amp; Insured
            </span>
            <span aria-hidden="true" className="hidden sm:block w-px h-3.5 bg-white/15" />
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <span className="flex items-center gap-0.5 shrink-0" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              500+ Local Homeowners
            </span>
            <span aria-hidden="true" className="hidden sm:block w-px h-3.5 bg-white/15" />
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              24/7 Emergency Service
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
