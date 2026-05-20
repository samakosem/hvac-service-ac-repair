import PhoneLink from "@/components/ui/PhoneLink";
import Link from "next/link";

const STEPS = [
  {
    step: "1",
    title: "Call or Request Online",
    description:
      "Call us directly or submit a contact form. We pick up during business hours — no hold queues, no automated menus. For emergencies, we're available 7 days.",
    action: <PhoneLink className="inline-flex items-center gap-1.5 text-hvac-blue-600 font-semibold text-sm hover:underline" showIcon label="Call now" />,
  },
  {
    step: "2",
    title: "We Arrive, Diagnose, Quote",
    description:
      "A technician comes to your home or business, inspects the system, and gives you a written estimate. No work starts until you approve the price.",
    action: null,
  },
  {
    step: "3",
    title: "We Fix It — Often Same Visit",
    description:
      "We stock common parts on our vehicles. Most repairs are completed on the first visit. If a part needs to be ordered, we'll tell you the timeline upfront.",
    action: null,
  },
  {
    step: "4",
    title: "You Pay What Was Quoted",
    description:
      "The price in the estimate is the price on the invoice. No additions, no surprises. We'll also walk you through what we did and what to watch for.",
    action: <Link href="/contact" className="inline-flex items-center gap-1.5 text-copper-600 font-semibold text-sm hover:underline">Get a free estimate →</Link>,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="section-label section-label-blue mb-4">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-4">
            Simple Process, No Surprises
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Here&rsquo;s what happens from the moment you contact us to the moment your HVAC is working again.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-gradient-to-r from-hvac-blue-200 via-copper-200 to-hvac-blue-200"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div
                key={step.step}
                className={`flex flex-col gap-4 text-center items-center animate-fade-in-up stagger-${i + 1}`}
              >
                {/* Step number circle */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-hvac-blue-400 flex items-center justify-center font-black text-hvac-blue-600 text-sm shadow-sm">
                  {step.step}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  {step.action && <div className="mt-1">{step.action}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
