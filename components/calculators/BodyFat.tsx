'use client';
import { useMemo, useState } from 'react';

type Sex = 'male'|'female';

function log10(n: number) { return Math.log(n) / Math.log(10); }

export default function BodyFat() {
  const [sex, setSex] = useState<Sex>('male');
  const [height, setHeight] = useState(175);  // cm
  const [neck, setNeck] = useState(38);       // cm
  const [waist, setWaist] = useState(85);     // cm (navel)
  const [hips, setHips] = useState(95);       // cm (women only)

  const result = useMemo(() => {
    if (height <= 0 || neck <= 0 || waist <= 0) return null;
    if (sex === 'male' && waist - neck <= 0) return null;
    if (sex === 'female' && (waist + hips - neck) <= 0) return null;

    // U.S. Navy method (cm)
    const bf =
      sex === 'male'
        ? 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
        : 495 / (1.29579 - 0.35004 * log10(waist + hips - neck) + 0.22100 * log10(height)) - 450;

    const pct = Math.max(0, Math.min(60, bf));
    const cat = sex === 'male'
      ? (pct < 6 ? 'Essential' : pct<=13 ? 'Athletes' : pct<=17 ? 'Fitness' : pct<=24 ? 'Average' : 'Obese')
      : (pct < 14 ? 'Essential' : pct<=20 ? 'Athletes' : pct<=24 ? 'Fitness' : pct<=31 ? 'Average' : 'Obese');

    return { pct, cat };
  }, [sex, height, neck, waist, hips]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Body Fat % (U.S. Navy)</h1>
        <p className="text-gray-600 mb-6">Estimate body fat using simple measurements (cm).</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Sex</span>
            <select value={sex} onChange={e=>setSex(e.target.value as Sex)} className="w-full rounded-xl border px-3 py-2">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Height (cm)</span>
            <input type="number" min={100} max={250} value={height} onChange={e=>setHeight(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Neck (cm)</span>
            <input type="number" min={20} max={70} step="0.1" value={neck} onChange={e=>setNeck(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Waist at navel (cm)</span>
            <input type="number" min={40} max={200} step="0.1" value={waist} onChange={e=>setWaist(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
          </label>
          {sex === 'female' && (
            <label className="block md:col-span-2">
              <span className="block text-sm font-medium mb-1">Hips (cm)</span>
              <input type="number" min={50} max={200} step="0.1" value={hips} onChange={e=>setHips(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/>
            </label>
          )}
        </div>

        {result && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">Estimated Body Fat</div>
              <div className="text-xl md:text-2xl font-semibold">{result.pct.toFixed(1)}%</div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm uppercase text-gray-500 mb-1">Category</div>
              <div className="text-xl md:text-2xl font-semibold">{result.cat}</div>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4">
          *For adults. Estimation method; tape placement affects results.
        </p>
      </div>
    </div>
  );
}
