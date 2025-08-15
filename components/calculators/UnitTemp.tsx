'use client';
import { useMemo, useState } from 'react';

type TUnit = 'C'|'F'|'K';

function convert(v:number, from:TUnit, to:TUnit) {
  if (from===to) return v;
  let c = v;
  if (from==='F') c = (v - 32) * 5/9;
  if (from==='K') c = v - 273.15;
  if (to==='C') return c;
  if (to==='F') return c * 9/5 + 32;
  return c + 273.15; // to K
}

export default function UnitTemp() {
  const [v, setV] = useState(0);
  const [from, setFrom] = useState<TUnit>('C');
  const [to, setTo] = useState<TUnit>('F');

  const out = useMemo(()=> convert(v, from, to), [v, from, to]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Unit: Temperature</h1>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="block"><span className="text-sm">Value</span>
            <input type="number" value={v} onChange={e=>setV(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">From</span>
            <select value={from} onChange={e=>setFrom(e.target.value as TUnit)} className="w-full rounded-xl border px-3 py-2">
              <option value="C">Celsius (°C)</option><option value="F">Fahrenheit (°F)</option><option value="K">Kelvin (K)</option>
            </select></label>
          <label className="block"><span className="text-sm">To</span>
            <select value={to} onChange={e=>setTo(e.target.value as TUnit)} className="w-full rounded-xl border px-3 py-2">
              <option value="C">Celsius (°C)</option><option value="F">Fahrenheit (°F)</option><option value="K">Kelvin (K)</option>
            </select></label>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 mt-6">
          <div className="text-sm text-gray-500">Converted</div>
          <div className="text-xl md:text-2xl font-semibold">{out.toLocaleString(undefined,{maximumFractionDigits:4})} {to}</div>
        </div>
      </div>
    </div>
  );
}
