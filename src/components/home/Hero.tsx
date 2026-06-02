"use client";

import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";
import QuoteForm from "@/components/ui/QuoteForm";
import { SITE } from "@/lib/config/site";

const URGENCY_ITEMS = [
  { icon: "⚡", text: "Same-Day Appointments Available" },
  { icon: "🔥", text: "AC Down? We Answer 7 Days a Week" },
  { icon: "✅", text: "Licensed & Insured — Upfront Pricing" },
];

export default function Hero() {
  return (
    <section
      className="relative flex items-center bg-hero-gradient overflow-hidden"
      style={{ minHeight: "calc(100svh - 0px)" }}
      aria-label="Hero"
    >
      {/* Background texture */}
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      {/* Gradient orbs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-hvac-blue-600/8 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-copper-500/7 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* ── Left: Content ── */}
          <div className="flex flex-col gap-4 animate-fade-in-up">

            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-400/30">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shrink-0" aria-hidden="true" />
              <span className="text-red-200 text-xs font-bold uppercase tracking-widest">
                Accepting Same-Day Calls Now
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.1rem] xl:text-[3.4rem] font-bold text-white leading-[1.1] tracking-tight">
              HVAC Service &amp; AC Repair{" "}
              <span className="block mt-1 text-gradient-blue">
                in Yorba Linda,{" "}
                <span className="text-white">Orange County</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-lg stagger-1 animate-fade-in-up">
              AC out? Don&rsquo;t sweat it. Same-day repair, system installation, and
              HVAC maintenance across Orange County — we answer when you call.
            </p>

            {/* Urgency bullets */}
            <ul className="flex flex-col gap-2 stagger-2 animate-fade-in-up">
              {URGENCY_ITEMS.map((item) => (
                <li key={item.text} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <span aria-hidden="true" className="text-base">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>

            {/* Primary CTA row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 stagger-3 animate-fade-in-up">
              <PhoneLink
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-92 active:scale-[0.98] transition-all duration-150 text-base"
                showIcon
                label={`Call Now — ${SITE.phoneDisplay}`}
              />
              <Link
                href="#estimate-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/9 text-white font-semibold rounded-xl border border-white/16 hover:bg-white/15 active:scale-[0.98] transition-all duration-150 text-base lg:hidden"
              >
                Free Estimate ↓
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-3 pt-1 stagger-3 animate-fade-in-up">
              <div className="flex -space-x-1.5" aria-hidden="true">
                {["bg-copper-400", "bg-hvac-blue-500", "bg-emerald-500", "bg-amber-400", "bg-slate-400"].map((c, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-navy-950 flex items-center justify-center text-white text-xs font-bold`}>
                    {["J", "M", "R", "S", "A"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-0.5">
                  Trusted by <span className="text-slate-200 font-semibold">500+ OC homeowners</span>
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Form card (desktop) / below headline (mobile) ── */}
          <div id="estimate-form" className="stagger-2 animate-fade-in-up">
            <div className="rounded-2xl bg-white shadow-2xl border border-white/10 p-6 lg:p-7">
              {/* Urgency header on form card */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-tight">Get a Free Estimate Today</p>
                  <p className="text-xs text-slate-400 mt-0.5">We call back within 1 hour</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  Open Now
                </span>
              </div>

              <QuoteForm
                variant="compact"
                heading=""
                subheading=""
              />
            </div>

            {/* Under-form trust note */}
            <p className="text-center text-xs text-slate-400 mt-3">
              🔒 No spam. No obligation. Cancel any time.
            </p>
          </div>

        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/6 to-transparent pointer-events-none" />
    </section>
  );
}
