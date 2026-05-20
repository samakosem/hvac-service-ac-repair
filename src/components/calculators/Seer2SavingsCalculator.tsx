"use client";

import { useState } from "react";
import Link from "next/link";

type Result = {
  currentAnnual: number;
  newAnnual: number;
  annualSavings: number;
  paybackYears: number;
  tenYearSavings: number;
};

export default function Seer2SavingsCalculator() {
  const [tons, setTons] = useState("3");
  const [currentSeer, setCurrentSeer] = useState("10");
  const [newSeer, setNewSeer] = useState("16");
  const [hoursPerYear, setHoursPerYear] = useState("2000");
  const [kwRate, setKwRate] = useState("0.30");
  const [systemCostPremium, setSystemCostPremium] = useState("1500");
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const tonsNum = parseFloat(tons);
    const currentSeerNum = parseFloat(currentSeer);
    const newSeerNum = parseFloat(newSeer);
    const hours = parseFloat(hoursPerYear);
    const rate = parseFloat(kwRate);
    const premium = parseFloat(systemCostPremium);

    if (!tonsNum || !currentSeerNum || !newSeerNum || !hours || !rate) return;
    if (newSeerNum <= currentSeerNum) {
      setResult(null);
      return;
    }

    const btu = tonsNum * 12000;
    // kWh = BTU / SEER / 1000 * hours
    const currentKwh = (btu / currentSeerNum / 1000) * hours;
    const newKwh = (btu / newSeerNum / 1000) * hours;
    const currentAnnual = currentKwh * rate;
    const newAnnual = newKwh * rate;
    const annualSavings = currentAnnual - newAnnual;
    const paybackYears = premium > 0 && annualSavings > 0 ? premium / annualSavings : 0;
    const tenYearSavings = annualSavings * 10 - premium;

    setResult({
      currentAnnual: Math.round(currentAnnual),
      newAnnual: Math.round(newAnnual),
      annualSavings: Math.round(annualSavings),
      paybackYears: Math.round(paybackYears * 10) / 10,
      tenYearSavings: Math.round(tenYearSavings),
    });
    // track-ready: event = 'calculator_result', params: { calculator: 'seer2_savings', current_seer, new_seer, annual_savings }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-900">SEER2 Savings Estimator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Compare operating costs between your current and a potential new system.
        </p>
      </div>

      <div className="p-6 sm:p-8 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tons */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="tons" className="text-sm font-semibold text-slate-700">
              System Size (tons)
            </label>
            <select
              id="tons"
              value={tons}
              onChange={(e) => setTons(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              {["1.5", "2", "2.5", "3", "3.5", "4", "5"].map((t) => (
                <option key={t} value={t}>{t} tons</option>
              ))}
            </select>
          </div>

          {/* Hours per year */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="hours" className="text-sm font-semibold text-slate-700">
              Cooling Hours/Year
            </label>
            <select
              id="hours"
              value={hoursPerYear}
              onChange={(e) => setHoursPerYear(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              <option value="1200">1,200 (mild use)</option>
              <option value="1600">1,600 (moderate)</option>
              <option value="2000">2,000 (typical OC)</option>
              <option value="2500">2,500 (heavy use)</option>
              <option value="3000">3,000 (very heavy)</option>
            </select>
          </div>

          {/* Current SEER */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="currentSeer" className="text-sm font-semibold text-slate-700">
              Current System SEER
            </label>
            <select
              id="currentSeer"
              value={currentSeer}
              onChange={(e) => setCurrentSeer(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              {["8", "10", "12", "13", "14"].map((s) => (
                <option key={s} value={s}>SEER {s} (older system)</option>
              ))}
            </select>
          </div>

          {/* New SEER2 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="newSeer" className="text-sm font-semibold text-slate-700">
              New System SEER2
            </label>
            <select
              id="newSeer"
              value={newSeer}
              onChange={(e) => setNewSeer(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              <option value="13.4">13.4 SEER2 (CA minimum)</option>
              <option value="15">15 SEER2</option>
              <option value="16">16 SEER2</option>
              <option value="17">17 SEER2</option>
              <option value="18">18 SEER2</option>
              <option value="20">20 SEER2</option>
              <option value="21">21+ SEER2 (premium)</option>
            </select>
          </div>

          {/* Rate */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="kwRate" className="text-sm font-semibold text-slate-700">
              Electricity Rate ($/kWh)
            </label>
            <input
              id="kwRate"
              type="number"
              step="0.01"
              min="0.10"
              max="0.60"
              value={kwRate}
              onChange={(e) => setKwRate(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition"
            />
            <p className="text-xs text-slate-400">SCE average ~$0.28–$0.35/kWh</p>
          </div>

          {/* Premium cost */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="premium" className="text-sm font-semibold text-slate-700">
              Higher-Efficiency Premium ($)
            </label>
            <input
              id="premium"
              type="number"
              step="100"
              min="0"
              max="5000"
              value={systemCostPremium}
              onChange={(e) => setSystemCostPremium(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition"
            />
            <p className="text-xs text-slate-400">Extra cost vs. base model</p>
          </div>
        </div>

        <button
          type="button"
          onClick={calculate}
          className="w-full py-4 rounded-xl bg-hvac-blue-700 text-white font-bold text-base hover:bg-hvac-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 focus:ring-offset-2"
        >
          Calculate Savings
        </button>

        {result && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                  Current Cost/Year
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  ${result.currentAnnual.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                  New System/Year
                </p>
                <p className="text-2xl font-bold text-green-700">
                  ${result.newAnnual.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200 text-center">
              <p className="text-xs text-green-700 uppercase tracking-wide font-semibold mb-1">
                Annual Savings
              </p>
              <p className="text-4xl font-bold text-green-700">
                ${result.annualSavings.toLocaleString()}
              </p>
              {result.paybackYears > 0 && (
                <p className="text-sm text-slate-600 mt-1">
                  Payback period: ~{result.paybackYears} years
                  {result.tenYearSavings > 0 && (
                    <span className="ml-2 text-green-600 font-semibold">
                      · 10-yr net: +${result.tenYearSavings.toLocaleString()}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> Savings estimates are illustrative only and based on simplified
          calculations. Actual savings depend on system sizing, duct condition, thermostat habits, local
          weather, and utility rate structure. This is not a quote or guarantee. Consult a licensed HVAC
          professional and your utility provider for accurate projections.
        </div>

        <Link
          href="/contact"
          className="w-full py-4 rounded-xl bg-copper-gradient text-white font-bold text-base text-center hover:opacity-90 transition-opacity"
        >
          Get a Free Replacement Quote
        </Link>
      </div>
    </div>
  );
}
