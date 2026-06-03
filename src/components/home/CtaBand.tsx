import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";

const POINTS = [
  "Same-day appointments available in your area",
  "Written estimate before any work begins",
  "All major HVAC brands serviced",
  "Local HVAC technicians — 7 days a week",
];

export default function CtaBand() {
  return (
    <section
      className="relative overflow-hidden bg-hero-gradient py-16 lg:py-20"
      aria-labelledby="cta-heading"
    >
      {/* Orbs */}
      <div aria-hidden="true" className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-hvac-blue-600/8 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -left-12 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-copper-500/7 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 text-center lg:text-left">

          {/* Copy */}
          <div className="max-w-xl">
            <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              AC Not Cooling? Heater Acting Up?<br />
              <span className="text-gradient-blue">Let&rsquo;s Get It Fixed Today.</span>
            </h2>
            <p className="text-slate-300 leading-relaxed mb-5">
              {SITE.name} — your local HVAC team, nearby and ready. Call now or submit a
              request online and we&rsquo;ll be in touch within the hour during business hours.
            </p>
            <ul className="space-y-1.5">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-300">
                  <svg className="w-4 h-4 text-hvac-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            <PhoneLink
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base min-w-[220px]"
              showIcon
              label={`Call ${SITE.phoneDisplay}`}
            />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/8 text-white font-semibold rounded-xl border border-white/18 hover:bg-white/14 transition-colors text-base min-w-[220px]"
            >
              Request a Free Estimate
            </Link>
            <p className="text-slate-500 text-xs text-center">
              We respond within 1 hour during business hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
