import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";

type Props = {
  city?: string;
};

export default function SummerBanner({ city }: Props) {
  const location = city ? `in ${city}` : "in Southern California";

  return (
    <section
      aria-label="Summer cooling service"
      className="relative overflow-hidden bg-gradient-to-br from-hvac-blue-900 via-hvac-blue-800 to-navy-900 py-12 lg:py-16"
    >
      {/* Subtle texture */}
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
      <div aria-hidden="true" className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-hvac-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hvac-blue-500/20 border border-hvac-blue-400/25 text-hvac-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          Summer Cooling Season
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
          Stay Comfortable This Summer{city ? ` in ${city}` : ""}
        </h2>
        <p className="text-hvac-blue-100 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          AC not cooling like it should? Don&rsquo;t wait until it fails completely. Same-day service
          is available {location} — schedule your free estimate now and beat the summer heat.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <PhoneLink
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
            showIcon
            label={`Call Now — ${SITE.phoneDisplay}`}
          />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/18 active:scale-[0.98] transition-all text-base w-full sm:w-auto"
          >
            Schedule Free Estimate
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-hvac-blue-200">
          {[
            "AC Repair",
            "Cooling System Replacement",
            "AC Tune-Up",
            "Free Diagnosis",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-copper-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
