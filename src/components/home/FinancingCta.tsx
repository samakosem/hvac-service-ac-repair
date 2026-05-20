import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";

export default function FinancingCta() {
  return (
    <section className="py-14 lg:py-18 bg-warm-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div className="flex flex-col gap-4">
            <span className="section-label section-label-copper w-fit">Financing &amp; Promotions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Don&rsquo;t Let Budget Delay a Repair or Replacement
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              A broken AC in an Orange County summer isn&rsquo;t something you can wait on. We work with
              financing options to help make same-day repairs and new system installations accessible —
              ask us about current promotions when you call.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              {[
                "Financing available on new system installations",
                "Ask about seasonal promotions on tune-ups",
                "No-surprise pricing — written estimate before we start",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-7 flex flex-col gap-4">
              <p className="font-bold text-slate-900 text-base">Ask About Options When You Call</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Promotions and financing terms change seasonally. The quickest way to know what&rsquo;s
                currently available is to call — we&rsquo;ll tell you exactly what applies to your situation.
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                <PhoneLink
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-bold text-sm shadow-glow-copper hover:opacity-90 transition-opacity"
                  showIcon
                />
                <Link
                  href="/financing"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-colors"
                >
                  Financing Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
