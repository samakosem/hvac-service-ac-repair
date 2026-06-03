import QuoteForm from "@/components/ui/QuoteForm";
import { SITE } from "@/lib/config/site";

type Props = {
  variant?: "hero" | "mid" | "prefooter";
};

const CONFIG = {
  hero: {
    heading: "Get a Free Same-Day Estimate",
    subheading: "Tell us your name, number, and what's going on — we'll take it from there.",
    bg: "bg-white",
    label: "Free estimate form",
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

export default function HomeLeadForm({ variant = "hero" }: Props) {
  const c = CONFIG[variant];
  const isDark = variant === "prefooter";

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
            <QuoteForm
              variant="compact"
              heading=""
              subheading=""
            />
          </div>

        </div>
      </div>
    </section>
  );
}
