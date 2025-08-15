'use client';
import { useMemo, useState } from 'react';

export default function InflationReal() {
  const [nominal, setNominal] = useState(12);
  const [inflation, setInflation] = useState(6);

  const real = useMemo(() => {
    return ((1 + nominal/100) / (1 + inflation/100) - 1) * 100;
  }, [nominal, inflation]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Inflation Adjusted Return</h1>
        <p className="text-gray-600 mb-6">Real return ≈ (1+nominal)/(1+inflation) − 1.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block"><span className="block text-sm font-medium mb-1">Nominal return %</span>
            <input type="number" step="0.01" value={nominal} onChange={e=>setNominal(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Inflation %</span>
            <input type="number" step="0.01" value={inflation} onChange={e=>setInflation(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 mt-6">
          <div className="text-sm text-gray-500">Real return</div>
          <div className="text-xl md:text-2xl font-semibold">{real.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}
