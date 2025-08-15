'use client';
import { useMemo, useState } from 'react';

export default function ROI() {
  const [cost, setCost] = useState(10000);
  const [gain, setGain] = useState(12500);
  const roi = useMemo(() => ((gain - cost) / cost) * 100, [cost, gain]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">ROI</h1>
        <p className="text-gray-600 mb-6">Return on Investment percentage.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block"><span className="text-sm">Cost</span>
            <input type="number" min={0} value={cost} onChange={e=>setCost(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Gain</span>
            <input type="number" min={0} value={gain} onChange={e=>setGain(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 mt-6">
          <div className="text-sm text-gray-500">ROI</div>
          <div className="text-xl md:text-2xl font-semibold">{roi.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}
