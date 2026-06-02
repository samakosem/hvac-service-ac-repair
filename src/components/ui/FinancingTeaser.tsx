import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";

type Props = {
  variant?: "full" | "inline";
};

export default function FinancingTeaser({ variant = "inline" }: Props) {
  if (variant === "full") {
    return (
      <section
        aria-label="Financing options"
        className="py-12 lg:py-16 bg-warm-tint"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 lg:p-10 flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-hvac-blue-50 flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <span className="section-label section-label-blue mb-2 inline-block">Financing Available</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2">
                Don&rsquo;t Let Budget Hold Back Your Comfort
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Ask about available financing options including <strong>0% interest promotions</strong> for qualified buyers.
                New system installations, major repairs, and replacements can qualify — call us to find out what applies to your situation.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start text-sm text-slate-700">
                {["0% interest options", "Low monthly payments", "Fast approval", "No prepayment penalties"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-hvac-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
              <PhoneLink
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-sm"
                showIcon
                label="Ask About Financing"
              />
              <Link
                href="/financing"
                className="text-center text-sm text-hvac-blue-600 hover:text-hvac-blue-700 font-medium underline underline-offset-2 transition-colors"
              >
                View financing options →
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // inline strip variant
  return (
    <div className="rounded-xl bg-hvac-blue-50 border border-hvac-blue-100 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-hvac-blue-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm">Financing Available</p>
          <p className="text-slate-600 text-xs leading-relaxed">
            Ask about available financing options — including 0% interest for qualified buyers.
          </p>
        </div>
      </div>
      <Link
        href="/financing"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-hvac-blue-200 text-hvac-blue-700 font-semibold text-xs rounded-lg hover:border-hvac-blue-400 hover:bg-hvac-blue-50 transition-colors whitespace-nowrap shrink-0"
      >
        Learn More
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </div>
  );
}
