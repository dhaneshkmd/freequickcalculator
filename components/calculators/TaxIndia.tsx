'use client';
import { useMemo, useState } from 'react';

// New Tax Regime (approx FY 2024-25). Educational estimate only.
const SLABS = [
  { upTo: 300000, rate: 0 },
  { upTo: 600000, rate: 5 },
  { upTo: 900000, rate: 10 },
  { upTo: 1200000, rate: 15 },
  { upTo: 1500000, rate: 20 },
  { upTo: Infinity, rate: 30 },
];

function computeTaxNewRegime(taxable: number) {
  let tax = 0, last = 0;
  for (const s of SLABS) {
    const band = Math.min(taxable, s.upTo) - last;
    if (band > 0) tax += band * s.rate / 100;
    if (taxable <= s.upTo) break;
    last = s.upTo;
  }
  // 87A rebate up to ₹7,00,000 taxable → tax = 0
  if (taxable <= 700000) tax = 0;
  return tax;
}

export default function TaxIndia() {
  const [income, setIncome] = useState(1200000);
  const [stdDed, setStdDed] = useState(true); // ₹50,000 for salaried
  const { taxable, baseTax, cess, total } = useMemo(() => {
    const sd = stdDed ? 50000 : 0;
    const tx = Math.max(0, income - sd);
    const t = computeTaxNewRegime(tx);
    const cess = t * 0.04;
    return { taxable: tx, baseTax: t, cess, total: t + cess };
  }, [income, stdDed]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Income Tax (India)</h1>
        <p className="text-gray-600 mb-6">New Regime estimate (FY 2024–25). 4% cess applied. Educational use only.</p>

        <div className="grid md:grid-cols-2 gap-4 items-end">
          <label className="block"><span className="block text-sm font-medium mb-1">Annual income (₹)</span>
            <input type="number" min={0} value={income} onChange={e=>setIncome(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={stdDed} onChange={e=>setStdDed(e.target.checked)} />
            <span className="text-sm">Apply standard deduction ₹50,000 (salaried)</span>
          </label>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Taxable</div>
            <div className="text-xl md:text-2xl font-semibold">{taxable.toLocaleString()}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Tax</div>
            <div className="text-xl md:text-2xl font-semibold">{baseTax.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Cess (4%)</div>
            <div className="text-xl md:text-2xl font-semibold">{cess.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Total</div>
            <div className="text-xl md:text-2xl font-semibold">{total.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
        </div>

        <p className="text-xs text-gray-500 mt-4">Rules change—verify with the latest government guidance.</p>
      </div>
    </div>
  );
}
