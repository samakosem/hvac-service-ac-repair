"use client";

import { useState } from "react";
import Link from "next/link";

type Result = {
  withoutPlanCost: number;
  withPlanCost: number;
  netSavings: number;
  breakEven: string;
};

const PLAN_ANNUAL_COST = 199;
const TUNE_UP_RETAIL = 129;
const EMERGENCY_PREMIUM = 95;
const PRIORITY_VALUE = 80;
const MINOR_REPAIR_RISK_SAVINGS = 120;

export default function MaintenancePlanCalculator() {
  const [units, setUnits] = useState("1");
  const [systemAge, setSystemAge] = useState("mid");
  const [hasPets, setHasPets] = useState("no");
  const [callsPerYear, setCallsPerYear] = useState("0");
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const numUnits = parseInt(units, 10);
    const calls = parseInt(callsPerYear, 10);
    const isOld = systemAge === "old";
    const isMid = systemAge === "mid";
    const pets = hasPets === "yes";

    // Without plan
    const tuneUpCost = numUnits * TUNE_UP_RETAIL;
    const emergencyCallPremium = calls > 0 ? calls * EMERGENCY_PREMIUM : 0;
    const withoutPlanCost = tuneUpCost + emergencyCallPremium;

    // With plan — annual cost
    let planCost = numUnits * PLAN_ANNUAL_COST;

    // Value adds
    let valueAdds = 0;
    valueAdds += numUnits * PRIORITY_VALUE; // priority dispatch value
    if (isOld || pets) valueAdds += numUnits * MINOR_REPAIR_RISK_SAVINGS; // early issue catch
    if (isMid) valueAdds += numUnits * (MINOR_REPAIR_RISK_SAVINGS / 2);

    const effectivePlanCost = planCost - valueAdds;
    const netSavings = withoutPlanCost - Math.max(effectivePlanCost, planCost * 0.5);

    const breakEven =
      netSavings > 0
        ? "Plan saves money based on your inputs"
        : "Plan breaks even with 1 emergency call avoided per year";

    setResult({
      withoutPlanCost: Math.round(withoutPlanCost),
      withPlanCost: Math.round(Math.max(planCost * 0.5, planCost - valueAdds)),
      netSavings: Math.round(Math.abs(netSavings)),
      breakEven,
    });
    // track-ready: event = 'calculator_result', params: { calculator: 'maintenance_plan', units, system_age, net_savings }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-900">Maintenance Plan Value Calculator</h2>
        <p className="text-sm text-slate-500 mt-1">
          See whether a maintenance plan pencils out for your home.
        </p>
      </div>

      <div className="p-6 sm:p-8 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="units" className="text-sm font-semibold text-slate-700">
              Number of HVAC Units
            </label>
            <select
              id="units"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              <option value="1">1 system</option>
              <option value="2">2 systems</option>
              <option value="3">3 systems</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="age" className="text-sm font-semibold text-slate-700">
              System Age
            </label>
            <select
              id="age"
              value={systemAge}
              onChange={(e) => setSystemAge(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              <option value="new">Under 5 years</option>
              <option value="mid">5–12 years</option>
              <option value="old">12+ years</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="pets" className="text-sm font-semibold text-slate-700">
              Pets in Home?
            </label>
            <select
              id="pets"
              value={hasPets}
              onChange={(e) => setHasPets(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              <option value="no">No pets</option>
              <option value="yes">Yes (dogs, cats)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="calls" className="text-sm font-semibold text-slate-700">
              Service Calls Last Year
            </label>
            <select
              id="calls"
              value={callsPerYear}
              onChange={(e) => setCallsPerYear(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 transition bg-white"
            >
              <option value="0">0 calls</option>
              <option value="1">1 call</option>
              <option value="2">2+ calls</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={calculate}
          className="w-full py-4 rounded-xl bg-hvac-blue-700 text-white font-bold text-base hover:bg-hvac-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-hvac-blue-500 focus:ring-offset-2"
        >
          Calculate Plan Value
        </button>

        {result && (
          <div className="rounded-xl border border-hvac-blue-200 bg-hvac-blue-50 p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 border border-slate-100">
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                  Without Plan
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  ${result.withoutPlanCost.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">per year</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-slate-100">
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                  With Plan
                </p>
                <p className="text-2xl font-bold text-hvac-blue-700">
                  ${result.withPlanCost.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">effective annual cost</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-hvac-blue-200 text-center">
              <p className="text-xs text-hvac-blue-700 uppercase tracking-wide font-semibold mb-1">
                Estimated Annual Benefit
              </p>
              <p className="text-3xl font-bold text-hvac-blue-800">
                ${result.netSavings.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">{result.breakEven}</p>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed border-t border-hvac-blue-100 pt-3">
              <strong>What&rsquo;s included in our plan:</strong> Annual tune-up + coil cleaning,
              priority scheduling, 15% discount on repairs, no overtime charges on covered visits.
              Plan pricing: $199/year per system.
            </div>
          </div>
        )}

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This calculator uses general industry benchmarks and our plan
          pricing as a reference point. Actual value depends on your system&rsquo;s condition, repair
          history, and how often you would otherwise schedule maintenance. Results are estimates only.
        </div>

        <Link
          href="/maintenance-plans"
          className="w-full py-4 rounded-xl bg-copper-gradient text-white font-bold text-base text-center hover:opacity-90 transition-opacity"
        >
          View Maintenance Plan Details
        </Link>
      </div>
    </div>
  );
}
