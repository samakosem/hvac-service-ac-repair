"use client";

import { useState } from "react";
import Link from "next/link";

type Result = {
  tons: number;
  btu: number;
  range: string;
  note: string;
};

export default function AcSizeCalculator() {
  const [sqft, setSqft] = useState("");
  const [ceilings, setCeilings] = useState("8");
  const [insulation, setInsulation] = useState("average");
  const [windows, setWindows] = useState("average");
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const sf = parseInt(sqft, 10);
    if (!sf || sf < 200 || sf > 10000) return;

    // Base BTU: 25 BTU per sq ft for Southern California climate
    let btu = sf * 25;

    // Ceiling height modifier
    if (ceilings === "10") btu *= 1.1;
    if (ceilings === "12") btu *= 1.2;

    // Insulation modifier
    if (insulation === "poor") btu *= 1.2;
    if (insulation === "good") btu *= 0.9;

    // Window/sun exposure modifier
    if (windows === "high") btu *= 1.15;
    if (windows === "low") btu *= 0.95;

    // Round to nearest half ton
    const tonsRaw = btu / 12000;
    const tons = Math.round(tonsRaw * 2) / 2;
    const tonsLow = Math.max(1.5, tons - 0.5);
    const tonsHigh = tons + 0.5;

    setResult({
      tons,
      btu: Math.round(btu / 1000) * 1000,
      range: `${tonsLow}–${tonsHigh} tons`,
      note:
        tonsLow !== tonsHigh
          ? `A Manual J load calculation by a licensed technician will determine the precise size. Most Orange County homes in this range use a ${tons}-ton system.`
          : `This is an estimate based on typical Orange County conditions. A licensed technician should perform a Manual J calculation before equipment selection.`,
    });
    // track-ready: event = 'calculator_result', params: { calculator: 'ac_size', sqft, result_tons: tons }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-900">AC Size Estimator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Enter your home details to get a rough tonnage estimate.
        </p>
      </div>

      <div className="p-6 sm:p-8 flex flex-col gap-5">
        {/* Square footage */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sqft" className="text-sm font-semibold text-slate-700">
            Home Square Footage
          </label>
          <input
            id="sqft"
            type="number"
            inputMode="numeric"
            min={200}
            max={10000}
            placeholder="e.g. 1800"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Ceiling height */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ceilings" className="text-sm font-semibold text-slate-700">
            Ceiling Height
          </label>
          <select
            id="ceilings"
            value={ceilings}
            onChange={(e) => setCeilings(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 focus:border-transparent transition bg-white"
          >
            <option value="8">Standard (8 ft)</option>
            <option value="10">High (10 ft)</option>
            <option value="12">Very High (12+ ft)</option>
          </select>
        </div>

        {/* Insulation */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="insulation" className="text-sm font-semibold text-slate-700">
            Attic Insulation
          </label>
          <select
            id="insulation"
            value={insulation}
            onChange={(e) => setInsulation(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 focus:border-transparent transition bg-white"
          >
            <option value="poor">Poor / Unknown (pre-1990 home)</option>
            <option value="average">Average (R-19 to R-30)</option>
            <option value="good">Good (R-38+ or recently upgraded)</option>
          </select>
        </div>

        {/* Window exposure */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="windows" className="text-sm font-semibold text-slate-700">
            Window/Sun Exposure
          </label>
          <select
            id="windows"
            value={windows}
            onChange={(e) => setWindows(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 focus:border-transparent transition bg-white"
          >
            <option value="low">Low (few windows, mostly shaded)</option>
            <option value="average">Average</option>
            <option value="high">High (large south/west windows, unshaded)</option>
          </select>
        </div>

        <button
          type="button"
          onClick={calculate}
          className="w-full py-4 rounded-xl bg-hvac-blue-700 text-white font-bold text-base hover:bg-hvac-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 focus:ring-offset-2"
        >
          Calculate AC Size
        </button>

        {result && (
          <div className="rounded-xl border border-hvac-blue-200 bg-hvac-blue-50 p-5 flex flex-col gap-3">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-hvac-blue-600 font-semibold mb-1">
                Estimated Tonnage Range
              </p>
              <p className="text-4xl font-bold text-hvac-blue-800">{result.range}</p>
              <p className="text-sm text-slate-600 mt-1">
                Approx. {result.btu.toLocaleString()} BTU/hr cooling load
              </p>
            </div>
            <p className="text-xs text-slate-500 border-t border-hvac-blue-100 pt-3 leading-relaxed">
              {result.note}
            </p>
          </div>
        )}

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This estimate is based on general guidelines for Orange County,
          CA and should not be used as a substitute for a professional Manual J load calculation.
          Actual sizing requirements vary based on your home&rsquo;s construction, orientation, and
          many other factors. Always have a licensed HVAC professional confirm sizing before purchasing
          equipment.
        </div>

        <Link
          href="/contact"
          className="w-full py-4 rounded-xl bg-copper-gradient text-white font-bold text-base text-center hover:opacity-90 transition-opacity"
        >
          Get a Free In-Home Estimate
        </Link>
      </div>
    </div>
  );
}
