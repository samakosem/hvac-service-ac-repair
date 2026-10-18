/**
 * General homeowner guidance shown where generated testimonials used to be.
 * Everything here is standard HVAC safety and troubleshooting advice, not a
 * claim about this business, so it needs no verification.
 */

export type QuickChecksKind = "ac-repair" | "emergency-ac-repair" | "ac-tune-up" | "heating-repair" | "hvac-repair";

type Check = { heading: string; body: string };

const CONTENT: Record<QuickChecksKind, { label: string; heading: string; checks: Check[] }> = {
  "ac-repair": {
    label: "Before You Call",
    heading: "Quick Checks Before an AC Repair Visit",
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
    checks: [
      {
        heading: "Turn it off if something is wrong",
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
        body: "Do not use light switches, phones or anything that could spark inside. Leave the home and call your gas utility or 911 from outside.",
      },
    ],
  },
  "hvac-repair": {
    label: "Before You Call",
    heading: "Quick Checks Before an HVAC Repair Visit",
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
          <h3 className={`font-bold ${dark ? "text-white" : "text-slate-900"}`}>{check.heading}</h3>
          <p className={`text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>{check.body}</p>
        </div>
      ))}
    </div>
  );
}
