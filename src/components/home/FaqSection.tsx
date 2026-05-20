"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "Do you offer same-day AC repair in Orange County?",
    a: "Yes. We schedule same-day appointments for most areas of Orange County, including Yorba Linda, Anaheim Hills, Brea, Fullerton, Placentia, and surrounding cities. Call us in the morning and we aim to be there the same day.",
  },
  {
    q: "What brands of HVAC equipment do you service?",
    a: "We work on all major residential and commercial brands — Carrier, Trane, Lennox, Goodman, Rheem, Bryant, York, Mitsubishi, Daikin, LG, and others. We stock common parts for the most frequently serviced systems.",
  },
  {
    q: "How much does AC repair typically cost in Orange County?",
    a: "AC repair costs vary widely depending on the problem. A simple fix like a capacitor or contactor replacement is much less than a compressor or refrigerant leak repair. We diagnose the issue and give you a written quote before any work starts — so you know exactly what you're paying.",
  },
  {
    q: "Should I repair my old AC or replace it?",
    a: "A general rule: if the repair costs more than half the price of a new system, and the unit is 10–12+ years old, replacement is usually the better investment. We'll give you an honest assessment either way — we don't push replacements when a repair is the right call.",
  },
  {
    q: "Do you provide service to businesses and commercial properties?",
    a: "Yes. We service offices, retail spaces, restaurants, multi-tenant buildings, and light industrial facilities throughout Orange County. We offer maintenance contracts for commercial customers who want regular scheduled service.",
  },
  {
    q: "What areas do you serve?",
    a: "Our primary service area is Orange County, with coverage in nearby parts of LA County (Diamond Bar, Rowland Heights), Riverside County (Corona, Norco), and San Bernardino County (Chino Hills, Chino, Ontario). Our Yorba Linda location gives us quick access to the majority of these areas.",
  },
  {
    q: "How do I know when to schedule a maintenance tune-up?",
    a: "We recommend a spring tune-up before the cooling season starts — typically March through May. This catches issues like low refrigerant, dirty coils, and worn contacts before they cause a failure during the hottest months.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 40);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        aria-expanded={open}
        aria-controls={`faq-${id}`}
      >
        <span className="font-semibold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-hvac-blue-700 transition-colors">
          {q}
        </span>
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-hvac-blue-600" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div id={`faq-${id}`} className="pb-4 pr-8" role="region">
          <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  return (
    <section className="py-16 lg:py-24 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left: header */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <span className="section-label section-label-blue w-fit">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Common questions from Orange County homeowners and business owners about our HVAC services.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-hvac-blue-600 font-semibold text-sm hover:underline mt-1"
            >
              Still have a question? Contact us →
            </Link>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm px-6">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
