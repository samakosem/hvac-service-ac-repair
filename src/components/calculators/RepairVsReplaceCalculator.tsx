"use client";

import { useState } from "react";
import Link from "next/link";

type Verdict = "repair" | "replace" | "borderline";

type Result = {
  verdict: Verdict;
  heading: string;
  explanation: string;
  repairRatio: number;
};

export default function RepairVsReplaceCalculator() {
  const [systemAge, setSystemAge] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [replacementCost, setReplacementCost] = useState("6500");
  const [usesR22, setUsesR22] = useState("no");
  const [compressorFailed, setCompressorFailed] = useState("no");
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const age = parseInt(systemAge, 10);
    const repair = parseFloat(repairCost);
    const replacement = parseFloat(replacementCost);

    if (!age || !repair || !replacement) return;

    const repairRatio = repair / replacement;
    const isR22 = usesR22 === "yes";
    const compressorGone = compressorFailed === "yes";

    let verdict: Verdict;
    let heading: string;
    let explanation: string;

    // Hard replace conditions
    if (isR22 && repair > 500) {
      verdict = "replace";
      heading = "Replace — R-22 system with costly repair";
      explanation =
        "R-22 refrigerant was phased out in 2020 and is now scarce and expensive. Any significant repair on an R-22 system is money spent extending the life of equipment you'll need to replace soon anyway. A new system uses R-410A or R-454B — modern, widely available refrigerant.";
    } else if (compressorGone && age > 10) {
      verdict = "replace";
      heading = "Replace — compressor failure on aging system";
      explanation =
        "A failed compressor on a system over 10 years old is almost always a replacement scenario. You'd spend $1,200–$2,500 on a compressor for a system with 3–5 years of useful life remaining at best. A new system gives you 15+ years, a manufacturer warranty, and substantially better efficiency.";
    } else if (age > 15 && repairRatio > 0.35) {
      verdict = "replace";
      heading = "Replace — aging system with significant repair cost";
      explanation = `At ${age} years old, the system is past its typical lifespan for Orange County. A repair costing ${Math.round(repairRatio * 100)}% of replacement value doesn't make financial sense — you're paying to extend equipment that will likely need another major repair within 2–4 years.`;
    } else if (repairRatio > 0.5) {
      verdict = "replace";
      heading = "Replace — repair cost exceeds 50% rule";
      explanation = `The repair costs ${Math.round(repairRatio * 100)}% of what a new system would cost installed. The industry standard guidance is to replace when a repair exceeds 50% of replacement cost — you're at or above that threshold. A new system also comes with improved efficiency and a manufacturer warranty.`;
    } else if (repairRatio < 0.25 && age < 10) {
      verdict = "repair";
      heading = "Repair — cost-effective on a younger system";
      explanation = `At ${age} years old, the system has substantial remaining life. The repair costs only ${Math.round(repairRatio * 100)}% of replacement value — well within the range where repair is the sensible choice. Keep up with annual maintenance to maximize the remaining lifespan.`;
    } else if (repairRatio < 0.3 && age < 12) {
      verdict = "repair";
      heading = "Repair — reasonable cost on a mid-age system";
      explanation = `At ${age} years old with a repair cost of ${Math.round(repairRatio * 100)}% of replacement value, repair is still the practical choice. Monitor the system closely and get a replacement quote in the next 2–3 years as it approaches end of life.`;
    } else {
      verdict = "borderline";
      heading = "Borderline — get a professional assessment";
      explanation = `With a ${age}-year-old system and a repair costing ${Math.round(repairRatio * 100)}% of replacement, you're in a gray zone where a licensed technician's assessment of the system's overall condition should guide your decision. Key questions: how is the refrigerant charge, what's the condition of the evaporator and condenser coils, and has it had major repairs before?`;
    }

    setResult({ verdict, heading, explanation, repairRatio });
    // track-ready: event = 'calculator_result', params: { calculator: 'repair_vs_replace', age, repair_ratio: repairRatio, verdict }
  }

  const verdictColors: Record<Verdict, string> = {
    repair: "border-green-200 bg-green-50",
    replace: "border-red-200 bg-red-50",
    borderline: "border-amber-200 bg-amber-50",
  };
  const verdictTextColors: Record<Verdict, string> = {
    repair: "text-green-800",
    replace: "text-red-800",
    borderline: "text-amber-800",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-900">Repair vs. Replace Decision Tool</h2>
        <p className="text-sm text-slate-500 mt-1">
          Answer a few questions to get a data-driven recommendation.
        </p>
      </div>

      <div className="p-6 sm:p-8 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="age" className="text-sm font-semibold text-slate-700">
              System Age (years)
            </label>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              min={1}
              max={40}
              placeholder="e.g. 12"
              value={systemAge}
              onChange={(e) => setSystemAge(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="repairCost" className="text-sm font-semibold text-slate-700">
              Quoted Repair Cost ($)
            </label>
            <input
              id="repairCost"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="e.g. 1800"
              value={repairCost}
              onChange={(e) => setRepairCost(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="replacementCost" className="text-sm font-semibold text-slate-700">
              Estimated Replacement Cost ($)
            </label>
            <input
              id="replacementCost"
              type="number"
              inputMode="numeric"
              min={3000}
              placeholder="e.g. 6500"
              value={replacementCost}
              onChange={(e) => setReplacementCost(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition"
            />
            <p className="text-xs text-slate-400">Typical OC range: $5,000–$8,500 installed</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="r22" className="text-sm font-semibold text-slate-700">
              Does system use R-22 (Freon)?
            </label>
            <select
              id="r22"
              value={usesR22}
              onChange={(e) => setUsesR22(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              <option value="no">No / Not sure</option>
              <option value="yes">Yes (labeled R-22 on unit)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="compressor" className="text-sm font-semibold text-slate-700">
            Did the compressor fail?
          </label>
          <select
            id="compressor"
            value={compressorFailed}
            onChange={(e) => setCompressorFailed(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
          >
            <option value="no">No / Don&apos;t know</option>
            <option value="yes">Yes — compressor needs replacement</option>
          </select>
        </div>

        <button
          type="button"
          onClick={calculate}
          className="w-full py-4 rounded-xl bg-hvac-blue-700 text-white font-bold text-base hover:bg-hvac-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 focus:ring-offset-2"
        >
          Get Recommendation
        </button>

        {result && (
          <div className={`rounded-xl border p-5 flex flex-col gap-3 ${verdictColors[result.verdict]}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5" aria-hidden="true">
                {result.verdict === "repair" ? "✓" : result.verdict === "replace" ? "↑" : "?"}
              </span>
              <div>
                <p className={`font-bold text-base ${verdictTextColors[result.verdict]}`}>
                  {result.heading}
                </p>
                <p className={`text-sm mt-1.5 leading-relaxed ${verdictTextColors[result.verdict]} opacity-90`}>
                  {result.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This tool applies common industry guidelines and should not replace
          an in-person inspection by a licensed HVAC professional. System condition, brand, repair history,
          and local pricing all affect the right decision for your specific situation.
        </div>

        <Link
          href="/contact"
          className="w-full py-4 rounded-xl bg-copper-gradient text-white font-bold text-base text-center hover:opacity-90 transition-opacity"
        >
          Get a Free Second Opinion
        </Link>
      </div>
    </div>
  );
}
