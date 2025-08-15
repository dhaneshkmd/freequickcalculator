'use client';
import { useMemo, useState } from 'react';

function loanFromEMI(emi: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const factor = Math.pow(1 + r, n);
  return (emi * (factor - 1)) / (r * factor);
}

export default function HomeAfford() {
  const [income, setIncome] = useState(100000); // monthly
  const [oblig, setOblig] = useState(10000);    // existing EMIs
  const [foir, setFoir] = useState(40);         // % of income allowed
  const [rate, setRate] = useState(8.5);        // % p.a.
  const [years, setYears] = useState(20);
  const [down, setDown] = useState(1000000);

  const r = useMemo(() => {
    const maxEmi = Math.max(0, income * foir / 100 - oblig);
    if (maxEmi <= 0) return { maxEmi: 0, loan: 0, price: down };
    const loan = loanFromEMI(maxEmi, rate, years);
    return { maxEmi, loan, price: loan + down };
  }, [income, oblig, foir, rate, years, down]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Home Affordability</h1>
        <p className="text-gray-600 mb-6">Estimate home budget using FOIR (DTI) and your down payment.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block"><span className="block text-sm font-medium mb-1">Monthly income</span>
            <input type="number" min={0} value={income} onChange={e=>setIncome(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Existing EMIs</span>
            <input type="number" min={0} value={oblig} onChange={e=>setOblig(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">FOIR / DTI %</span>
            <input type="number" min={10} max={70} value={foir} onChange={e=>setFoir(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Interest rate % p.a.</span>
            <input type="number" min={0} step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Tenure (years)</span>
            <input type="number" min={1} max={40} value={years} onChange={e=>setYears(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Down payment</span>
            <input type="number" min={0} value={down} onChange={e=>setDown(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Max EMI</div>
            <div className="text-xl md:text-2xl font-semibold">{r.maxEmi.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Max loan</div>
            <div className="text-xl md:text-2xl font-semibold">{r.loan.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Target home price</div>
            <div className="text-xl md:text-2xl font-semibold">{r.price.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
        </div>
      </div>
    </div>
  );
}
