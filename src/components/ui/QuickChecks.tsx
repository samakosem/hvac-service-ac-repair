/**
 * General homeowner guidance shown where generated testimonials used to be.
 * Everything here is standard HVAC safety and troubleshooting advice, not a
 * claim about this business, so it needs no verification.
 */

export type QuickChecksKind = "ac-repair" | "emergency-ac-repair" | "ac-tune-up" | "heating-repair" | "hvac-repair";

/** `alert` marks a safety step (gas, burning smell) and swaps in a warning icon. */
type Check = { heading: string; body: string; alert?: boolean };

const CONTENT: Record<QuickChecksKind, { label: string; heading: string; intro: string; checks: Check[] }> = {
  "ac-repair": {
    label: "Before You Call",
    heading: "Quick Checks Before an AC Repair Visit",
    intro: "A few safe checks can sometimes get your AC running again. If they don't, they help your technician find the problem faster.",
    checks: [
      {
        heading: "Check the thermostat",
        body: "Make sure it is set to Cool, the set temperature is below the room temperature, and the display is on. A blank display often means dead batteries.",
      },
      {
        heading: "Check the breaker and outdoor switch",
        body: "Central AC runs on a breaker in the main panel and usually a disconnect switch next to the outdoor unit. Reset a tripped breaker once. If it trips again, leave it off and call.",
      },
      {
        heading: "Check the air filter",
        body: "A clogged filter restricts airflow and can freeze the indoor coil. Replace a dirty filter. If you see ice on the refrigerant lines, set the system to Off and the fan to On so it thaws before service.",
      },
    ],
  },
  "emergency-ac-repair": {
    label: "While You Wait",
    heading: "What to Do Until Your Technician Arrives",
    intro: "Keep your home and family safe while help is on the way.",
    checks: [
      {
        heading: "Turn it off if something is wrong",
        alert: true,
        body: "If you smell burning, hear grinding or banging, or see water leaking from the indoor unit, set the thermostat to Off and leave it off until the system is checked.",
      },
      {
        heading: "Do not keep resetting the breaker",
        body: "A breaker that trips again right after a reset is protecting the wiring. Leave it off. Repeated resets can damage the compressor or create a fire risk.",
      },
      {
        heading: "Stay cool safely",
        body: "Close blinds on sunny windows, run ceiling or portable fans, and drink water. Move children, older adults and pets to the coolest room, or to a cooled public place if the house gets too hot.",
      },
    ],
  },
  "ac-tune-up": {
    label: "Between Tune-Ups",
    heading: "Simple Steps That Keep Your AC Running Well",
    intro: "Routine care between professional visits helps your system run efficiently and catch problems early.",
    checks: [
      {
        heading: "Change the filter on schedule",
        body: "Most 1-inch filters need replacing every 1 to 3 months. Check yours monthly during summer, and more often with pets or nearby construction.",
      },
      {
        heading: "Keep the outdoor unit clear",
        body: "Leave about 2 feet of open space around the condenser. Trim plants back and clear leaves and debris so the unit can move air freely.",
      },
      {
        heading: "Watch for early warning signs",
        body: "Longer run times, rising energy bills, weak airflow, or water around the indoor unit are reasons to schedule service before a full breakdown.",
      },
    ],
  },
  "heating-repair": {
    label: "Before You Call",
    heading: "Quick Checks Before a Heating Repair Visit",
    intro: "A few safe checks can sometimes get the heat back on. If they don't, they help your technician find the problem faster.",
    checks: [
      {
        heading: "Check the thermostat and filter",
        body: "Make sure the thermostat is set to Heat and above the room temperature. A clogged filter can make a furnace overheat and shut itself off, so replace it if it is dirty.",
      },
      {
        heading: "Check power to the furnace",
        body: "Most furnaces have a switch that looks like a light switch near the unit, plus a breaker in the main panel. Make sure both are on and the furnace access panel is fully closed.",
      },
      {
        heading: "If you smell gas, leave first",
        alert: true,
        body: "Do not use light switches, phones or anything that could spark inside. Leave the home and call your gas utility or 911 from outside.",
      },
    ],
  },
  "hvac-repair": {
    label: "Before You Call",
    heading: "Quick Checks Before an HVAC Repair Visit",
    intro: "Whether the problem is heating or cooling, these safe checks can rule out simple causes before a technician arrives.",
    checks: [
      {
        heading: "Check the thermostat mode",
        body: "Make sure it is set to Cool or Heat as needed, with a set temperature that should make the system run. A blank display often means dead batteries.",
      },
      {
        heading: "Check the breakers and switches",
        body: "Look for a tripped breaker in the main panel, the switch near the furnace, and the disconnect next to the outdoor unit. Reset a tripped breaker once; if it trips again, leave it off.",
      },
      {
        heading: "Check the air filter",
        body: "A clogged filter is one of the most common causes of weak airflow, a frozen AC coil, or a furnace that shuts off early. Replace it if it looks gray and dusty.",
      },
    ],
  },
};

export function quickChecksKind(serviceSlug: string): QuickChecksKind {
  return serviceSlug in CONTENT ? (serviceSlug as QuickChecksKind) : "hvac-repair";
}

export function QuickChecksHeader({ kind, tone = "light" }: { kind: QuickChecksKind; tone?: "light" | "dark" }) {
  const c = CONTENT[kind];
  return (
    <>
      <div className={`section-label ${tone === "dark" ? "section-label-white" : "section-label-blue"} w-fit mx-auto mb-3`}>{c.label}</div>
      <h2 id="quick-checks-heading" className={`text-3xl sm:text-4xl font-bold ${tone === "dark" ? "text-white" : "text-slate-900"}`}>
        {c.heading}
      </h2>
      <p className={`mt-4 max-w-2xl mx-auto leading-relaxed ${tone === "dark" ? "text-slate-400" : "text-slate-600"}`}>{c.intro}</p>
    </>
  );
}

export function QuickChecksGrid({ kind, tone = "light" }: { kind: QuickChecksKind; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CONTENT[kind].checks.map((check) => (
        <div
          key={check.heading}
          className={
            dark
              ? "bg-white/6 rounded-2xl p-6 border border-white/8 flex flex-col gap-3"
              : "bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-3"
          }
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              check.alert ? (dark ? "bg-amber-400/15" : "bg-amber-50") : dark ? "bg-copper-500/20" : "bg-hvac-blue-50"
            }`}
          >
            {check.alert ? (
              <svg className={`w-5 h-5 ${dark ? "text-amber-300" : "text-amber-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            ) : (
              <svg className={`w-5 h-5 ${dark ? "text-copper-400" : "text-hvac-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <h3 className={`font-bold ${dark ? "text-white" : "text-slate-900"}`}>{check.heading}</h3>
          <p className={`text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>{check.body}</p>
        </div>
      ))}
    </div>
  );
}
