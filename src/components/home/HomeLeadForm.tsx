import SingleStepQuoteForm from "@/components/ui/SingleStepQuoteForm";
import { SITE } from "@/lib/config/site";

type Props = {
  variant?: "hero" | "estimate" | "mid" | "prefooter";
};

const CONFIG = {
  hero: {
    heading: "Get a Free Same-Day Estimate",
    subheading: "Tell us your name, number, and what's going on — we'll take it from there.",
    bg: "bg-white",
    label: "Free estimate form",
  },
  estimate: {
    heading: "Get a Free HVAC Estimate Today",
    subheading: "Tell us your name, number, and what's going on — we'll call back quickly to confirm service availability in your area.",
    bg: "bg-slate-50",
    label: "Free HVAC estimate form",
  },
  mid: {
    heading: "Ready to Fix Your HVAC System?",
    subheading: "Same-day service available. No obligation. Just honest answers.",
    bg: "bg-slate-50",
    label: "Mid-page estimate form",
  },
  prefooter: {
    heading: "Don't Sweat It — Get Help Today",
    subheading: "Submit your info and we'll call you back within the hour.",
    bg: "bg-hvac-blue-700",
    label: "Pre-footer estimate form",
  },
} as const;

const ESTIMATE_POINTS = [
  { title: "Fast Callback", desc: "We call back quickly — real people, no voicemail maze." },
  { title: "Upfront Pricing", desc: "Clear quotes before any work begins. No hidden fees." },
  { title: "Licensed & Insured", desc: "Local, background-checked HVAC technicians near you." },
  { title: "Same-Day Service", desc: "Emergency AC & heating help available 24/7." },
];

export default function HomeLeadForm({ variant = "hero" }: Props) {
  const c = CONFIG[variant];
  const isDark = variant === "prefooter";

  // ── Dedicated premium estimate section (below hero) ──
  if (variant === "estimate") {
    return (
      <section
        id="estimate-form"
        className="relative scroll-mt-24 lg:scroll-mt-28 overflow-hidden py-16 lg:py-20 bg-gradient-to-br from-navy-800 via-hvac-blue-900 to-navy-700"
        aria-label={c.label}
      >
        {/* Brand ambience — brighter blue glow so the section reads light & open */}
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
        <div aria-hidden="true" className="absolute -top-40 right-0 w-[620px] h-[620px] rounded-full bg-hvac-blue-500/25 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute top-1/3 -left-32 w-[480px] h-[480px] rounded-full bg-hvac-blue-600/20 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute -bottom-24 right-1/4 w-[420px] h-[420px] rounded-full bg-copper-500/12 blur-3xl pointer-events-none" />
        {/* Top light seam to connect with the hero above */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hvac-blue-400/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-14 items-center">

            {/* Left: section pitch */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-copper-500/15 border border-copper-400/30 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="text-copper-300 text-xs font-bold uppercase tracking-widest">Free Estimate · No Obligation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white leading-tight mb-4">
                {c.heading}
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
                {c.subheading}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 max-w-lg">
                {ESTIMATE_POINTS.map((p) => (
                  <div key={p.title} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-copper-500/20 border border-copper-400/30 shrink-0">
                      <svg className="w-4 h-4 text-copper-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm leading-snug">{p.title}</p>
                      <p className="text-blue-200/80 text-[13px] leading-relaxed mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <p className="text-xs text-blue-200/80 mb-1">Prefer to call? We answer 24/7.</p>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 text-2xl font-extrabold text-white hover:text-copper-300 transition-colors"
                >
                  <svg className="w-5 h-5 text-copper-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Right: premium quote card */}
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-copper-500/15 blur-2xl opacity-80" />
              <div aria-hidden="true" className="absolute -inset-[3px] rounded-[1.15rem] bg-gradient-to-br from-copper-400/50 via-white/5 to-hvac-blue-500/40" />

              <div className="relative rounded-2xl bg-white shadow-2xl overflow-hidden">
                {/* Navy header band */}
                <div className="relative bg-brand-mid px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-copper-gradient shadow-glow-copper ring-1 ring-white/20 shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-white text-base leading-snug">Request Your Free Estimate</p>
                      <p className="text-xs text-slate-300 mt-0.5">Takes under a minute.</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 text-xs font-semibold text-emerald-300 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                      Open Now
                    </span>
                  </div>
                  <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-1 bg-copper-gradient" />
                </div>

                <div className="px-6 py-5">
                  <SingleStepQuoteForm heading="" subheading="" />
                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    No spam. No obligation. We&rsquo;ll confirm your service area before scheduling.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-12 lg:py-16 ${c.bg}`}
      aria-label={c.label}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            {isDark ? (
              <>
                <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">
                  Your Local Trusted HVAC Team
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  {c.heading}
                </h2>
                <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                  {c.subheading}
                </p>
              </>
            ) : (
              <>
                <p className="text-copper-600 text-sm font-semibold uppercase tracking-widest mb-3">
                  Free Estimates · Same-Day Available
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                  {c.heading}
                </h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  {c.subheading}
                </p>
              </>
            )}

            <ul className={`space-y-2.5 text-sm ${isDark ? "text-blue-100" : "text-slate-600"}`}>
              {[
                "Licensed & insured HVAC technicians",
                "Upfront pricing — no hidden fees",
                "Serving homeowners and businesses in your local area",
                "Emergency service available",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <svg
                    className={`w-4 h-4 shrink-0 ${isDark ? "text-blue-300" : "text-emerald-500"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className={`mt-7 pt-6 border-t ${isDark ? "border-blue-600" : "border-slate-200"}`}>
              <p className={`text-xs mb-1 ${isDark ? "text-blue-300" : "text-slate-400"}`}>
                Prefer to call?
              </p>
              <a
                href={`tel:${SITE.phone}`}
                className={`text-xl font-bold hover:underline transition-colors ${isDark ? "text-white" : "text-hvac-blue-600"}`}
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right: form card */}
          <div className={`rounded-2xl border p-7 shadow-card ${isDark ? "bg-white border-transparent" : "bg-white border-slate-200"}`}>
            <SingleStepQuoteForm
              heading=""
              subheading=""
            />
          </div>

        </div>
      </div>
    </section>
  );
}
