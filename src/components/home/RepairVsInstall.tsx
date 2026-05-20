import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";

const REPAIR_POINTS = [
  "AC not cooling or weak airflow",
  "Strange noises — grinding, rattling, banging",
  "Refrigerant leak or ice buildup on unit",
  "System short-cycling (turning off and on rapidly)",
  "Thermostat not responding to settings",
  "Water leaking from air handler or drain pan",
];

const INSTALL_POINTS = [
  "Your system is 12–15+ years old",
  "Repair costs exceed 50% of a new system",
  "Energy bills have climbed steadily year over year",
  "Your home has rooms that stay hot or cold no matter what",
  "The system runs R-22 refrigerant (no longer manufactured)",
  "You're adding square footage or converting a space",
];

function CheckIcon({ color = "blue" }: { color?: "blue" | "copper" }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 mt-0.5 ${color === "copper" ? "text-copper-500" : "text-hvac-blue-600"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function RepairVsInstall() {
  return (
    <section className="py-16 lg:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label section-label-blue mb-4">Repair or Replace?</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-4">
            Know What Your Situation Actually Calls For
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Not every AC problem needs a new system — and not every old system is worth saving.
            Here&rsquo;s how to tell the difference, and what we recommend in each scenario.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* Repair block */}
          <div className="rounded-2xl border-2 border-hvac-blue-100 bg-white p-8 flex flex-col gap-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-hvac-blue-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-hvac-blue-600 uppercase tracking-wider">Scenario A</p>
                <h3 className="text-xl font-bold text-slate-900">AC Repair Makes Sense</h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              If your system is under 10–12 years old and you&rsquo;re seeing one of these issues,
              repair is usually the right call. We diagnose the root cause and fix it — not just the symptom.
            </p>

            <ul className="space-y-2.5">
              {REPAIR_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckIcon color="blue" />
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href="/air-conditioning/ac-repair"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-hvac-blue-600 text-white font-semibold text-sm hover:bg-hvac-blue-500 transition-colors mt-auto"
            >
              Schedule AC Repair
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Installation block */}
          <div className="rounded-2xl border-2 border-copper-100 bg-white p-8 flex flex-col gap-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-copper-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-copper-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-copper-600 uppercase tracking-wider">Scenario B</p>
                <h3 className="text-xl font-bold text-slate-900">Replacement Is the Better Investment</h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Sometimes the honest answer is a new system. Modern units are significantly more efficient —
              the energy savings often offset the cost within a few years.
            </p>

            <ul className="space-y-2.5">
              {INSTALL_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckIcon color="copper" />
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href="/air-conditioning/ac-installation"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity mt-auto"
            >
              Get an Installation Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom nudge */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            Not sure which situation applies to you?{" "}
            <PhoneLink className="text-hvac-blue-600 font-semibold hover:underline" label="Call us" /> —
            we&rsquo;ll walk you through it over the phone, no commitment needed.
          </p>
        </div>
      </div>
    </section>
  );
}
