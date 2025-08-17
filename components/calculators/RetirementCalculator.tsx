"use client";
import { useMemo, useState } from "react";

const nf0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

function fvLumpSum(P: number, rMonthly: number, n: number) {
  return P * Math.pow(1 + rMonthly, n);
}
function fvSeries(contribMonthly: number, rMonthly: number, n: number) {
  if (rMonthly === 0) return contribMonthly * n;
  return contribMonthly * ((Math.pow(1 + rMonthly, n) - 1) / rMonthly);
}
function annuityPmt(pv: number, rMonthly: number, n: number) {
  if (rMonthly === 0) return pv / n;
  return (pv * rMonthly) / (1 - Math.pow(1 + rMonthly, -n));
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(200000);
  const [monthlyContrib, setMonthlyContrib] = useState(20000);
  const [expReturn, setExpReturn] = useState(10);
  const [inflation, setInflation] = useState(5);
  const [yearsInRetirement, setYearsInRetirement] = useState(25);
  const [postRetReturn, setPostRetReturn] = useState(6);

  const result = useMemo(() => {
    const months = Math.max(0, (retireAge - currentAge) * 12);
    const rMonthly = expReturn / 100 / 12;

    const fv =
      fvLumpSum(currentSavings, rMonthly, months) +
      fvSeries(monthlyContrib, rMonthly, months);

    // “Today’s money”
    const realMonthly = ((1 + expReturn / 100) / (1 + inflation / 100) - 1) / 12;
    const fvReal =
      fvLumpSum(currentSavings, realMonthly, months) +
      fvSeries(monthlyContrib, realMonthly, months);

    const postMonths = Math.max(1, yearsInRetirement * 12);
    const postRMonthly = postRetReturn / 100 / 12;
    const sustainableMonthly = annuityPmt(fv, postRMonthly, postMonths);

    return { fv, fvReal, sustainableMonthly };
  }, [
    currentAge,
    retireAge,
    currentSavings,
    monthlyContrib,
    expReturn,
    inflation,
    yearsInRetirement,
    postRetReturn,
  ]);

  return (
    <section className="max-w-3xl mx-auto grid gap-6">
      <h1 className="text-2xl font-semibold">Retirement Calculator</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span>Current Age</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={currentAge} onChange={(e) => setCurrentAge(+e.target.value)} min={0} max={100}/>
        </label>
        <label className="grid gap-1">
          <span>Retirement Age</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={retireAge} onChange={(e) => setRetireAge(+e.target.value)} min={currentAge} max={100}/>
        </label>
        <label className="grid gap-1">
          <span>Current Savings</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={currentSavings} onChange={(e) => setCurrentSavings(+e.target.value)} min={0}/>
        </label>
        <label className="grid gap-1">
          <span>Monthly Contribution</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={monthlyContrib} onChange={(e) => setMonthlyContrib(+e.target.value)} min={0}/>
        </label>
        <label className="grid gap-1">
          <span>Expected Return (p.a. %)</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={expReturn} onChange={(e) => setExpReturn(+e.target.value)} step="0.1"/>
        </label>
        <label className="grid gap-1">
          <span>Inflation (p.a. %)</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={inflation} onChange={(e) => setInflation(+e.target.value)} step="0.1"/>
        </label>
        <label className="grid gap-1">
          <span>Years in Retirement</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={yearsInRetirement} onChange={(e) => setYearsInRetirement(+e.target.value)} min={1}/>
        </label>
        <label className="grid gap-1">
          <span>Post-Retirement Return (p.a. %)</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={postRetReturn} onChange={(e) => setPostRetReturn(+e.target.value)} step="0.1"/>
        </label>
      </div>

      <div className="rounded-lg bg-white p-4 shadow grid gap-2">
        <div className="text-lg">Projected corpus at retirement</div>
        <div className="text-3xl font-bold">₹ {nf0.format(result.fv)}</div>
        <div className="text-sm text-gray-600">
          ≈ ₹ {nf0.format(result.fvReal)} in today’s money (inflation-adjusted)
        </div>
        <hr className="my-2"/>
        <div className="text-lg">Sustainable monthly income</div>
        <div className="text-2xl font-semibold">₹ {nf0.format(result.sustainableMonthly)}</div>
        <p className="text-xs text-gray-600">Based on annuity-style drawdown.</p>
      </div>
    </section>
  );
}
