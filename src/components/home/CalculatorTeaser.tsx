import Link from "next/link";

const tools = [
  {
    href: "/calculators/ac-size-calculator",
    label: "AC Size Calculator",
    desc: "What tonnage do I need?",
  },
  {
    href: "/calculators/seer2-savings-calculator",
    label: "SEER2 Savings",
    desc: "Is high-efficiency worth it?",
  },
  {
    href: "/calculators/repair-vs-replace-calculator",
    label: "Repair vs. Replace",
    desc: "Should I fix or replace my AC?",
  },
  {
    href: "/calculators/maintenance-plan-calculator",
    label: "Maintenance Plan",
    desc: "Does a plan make financial sense?",
  },
];

export default function CalculatorTeaser() {
  return (
    <section className="py-16 lg:py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-brand-mid border border-white/8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left: copy */}
            <div className="p-8 lg:p-12 flex flex-col gap-5 justify-center">
              <span className="section-label section-label-white w-fit">Free Tools</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                HVAC Calculators for Orange County Homeowners
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Estimate your AC size, compare efficiency savings, and decide whether to repair
                or replace — before calling anyone. All estimates are starting points;
                a free in-home assessment gives you the exact answer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <Link
                  href="/calculators"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Open Free Calculators
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:border-white/50 transition-colors"
                >
                  Get a Real Quote Instead
                </Link>
              </div>
            </div>

            {/* Right: tool links */}
            <div className="p-8 lg:p-10 flex items-center justify-center bg-white/3 border-t lg:border-t-0 lg:border-l border-white/8">
              <div className="w-full max-w-sm flex flex-col gap-3">
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">
                  Available Tools
                </p>
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <div>
                      <p className="text-white font-semibold text-sm">{tool.label}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{tool.desc}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
