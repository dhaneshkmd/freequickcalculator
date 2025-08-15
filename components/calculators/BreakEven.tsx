'use client';
import { useMemo, useState } from 'react';

export default function BreakEven() {
  const [fixed, setFixed] = useState(100000);        // currency
  const [variable, setVariable] = useState(200);     // per unit
  const [price, setPrice] = useState(500);           // per unit
  const [expectedUnits, setExpectedUnits] = useState<number | ''>('');

  const r = useMemo(() => {
    const cm = price - variable;                  // contribution margin per unit
    if (cm <= 0) return { invalid: true } as any;

    const units = fixed / cm;
    const unitsCeil = Math.ceil(units);
    const revenue = units * price;
    const cmRatio = cm / price;

    let mosPct: number | null = null;
    if (expectedUnits && expectedUnits > 0) {
      mosPct = ((Number(expectedUnits) - units) / Number(expectedUnits)) * 100;
    }
    return { invalid: false, units, unitsCeil, revenue, cm, cmRatio, mosPct };
  }, [fixed, variable, price, expectedUnits]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Break-Even Point</h1>
        <p className="text-gray-600 mb-6">Units or revenue needed to cover all costs.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Fixed Costs (₹/$)</span>
            <input type="number" min={0} value={fixed} onChange={e=>setFixed(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Variable Cost / Unit</span>
            <input type="number" min={0} value={variable} onChange={e=>setVariable(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Selling Price / Unit</span>
            <input type="number" min={0} value={price} onChange={e=>setPrice(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Expected Units (optional)</span>
            <input type="number" min={0} value={expectedUnits} onChange={e=>setExpectedUnits(e.target.value===''?'':Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
        </div>

        {r.invalid ? (
          <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
            Selling price must be greater than variable cost to break even.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">Break-Even Units</div>
              <div className="text-xl md:text-2xl font-semibold">
                {r.units.toFixed(2)} <span className="text-gray-500">({r.unitsCeil} units to cover)</span>
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">Break-Even Revenue</div>
              <div className="text-xl md:text-2xl font-semibold">
                {(r.revenue).toLocaleString(undefined,{maximumFractionDigits:2})}
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">CM / Unit (Ratio)</div>
              <div className="text-xl md:text-2xl font-semibold">
                {(r.cm).toLocaleString(undefined,{maximumFractionDigits:2})} ({(r.cmRatio*100).toFixed(1)}%)
              </div>
            </div>
          </div>
        )}

        {r.mosPct != null && !r.invalid && (
          <div className="mt-4 rounded-xl border p-4">
            <div className="text-sm text-gray-600">Margin of Safety</div>
            <div className="font-semibold">{r.mosPct.toFixed(1)}%</div>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4">
          *Formulas: Units = Fixed / (Price − Variable). Revenue = Units × Price.
        </p>
      </div>
    </div>
  );
}
