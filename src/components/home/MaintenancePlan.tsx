import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";

const PLAN_ITEMS = [
  "Full system inspection — filters, coils, electrical, refrigerant",
  "Condenser and evaporator coil cleaning",
  "Blower motor and fan belt check",
  "Thermostat calibration and testing",
  "Drain line flush and condensate check",
  "Priority scheduling when you call for a repair",
];

export default function MaintenancePlan() {
  return (
    <section className="py-16 lg:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy */}
          <div className="flex flex-col gap-5">
            <span className="section-label section-label-copper w-fit">Preventive Maintenance</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Most AC Breakdowns Are Preventable
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Orange County summers push HVAC systems hard. A tune-up in spring catches the issues
              — low refrigerant, dirty coils, worn contacts — before they become failures on the hottest
              day of the year.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We offer one-time tune-ups and seasonal maintenance for homeowners who want to stay ahead
              of repairs rather than react to them.
            </p>

            <ul className="space-y-2.5 mt-2">
              {PLAN_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <svg
                    className="w-4 h-4 text-copper-500 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link
                href="/maintenance/residential-maintenance-plan"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Book a Tune-Up
              </Link>
              <PhoneLink
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-colors"
                showIcon
                label="Ask About Maintenance"
              />
            </div>
          </div>

          {/* Right: visual card */}
          <div className="relative">
            {/* Decorative offset block */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-copper-100 -z-10" aria-hidden="true" />
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-copper-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-copper-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">HVAC Seasonal Tune-Up</p>
                  <p className="text-slate-500 text-xs">Recommended spring or fall</p>
                </div>
              </div>

              <div className="space-y-3">
                {["Cooling system check", "Heating system check", "Air quality assessment", "Filter replacement", "Written service report"].map((item) => (
                  <div key={item} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-600">{item}</span>
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                <strong className="text-slate-900">Honest advice included:</strong> If we find something during the tune-up,
                we tell you what it is, what it costs, and whether it needs fixing now or can wait.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
