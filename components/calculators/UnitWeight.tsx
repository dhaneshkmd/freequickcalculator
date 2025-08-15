'use client';
import { useMemo, useState } from 'react';

// base: kilogram
const FACTOR: Record<string, number> = { kg:1, g:0.001, lb:0.45359237, oz:0.028349523125 };
const UNITS = Object.keys(FACTOR);

export default function UnitWeight() {
  const [v, setV] = useState(1);
  const [from, setFrom] = useState('kg');
  const [to, setTo] = useState('lb');

  const out = useMemo(()=> v * (FACTOR[from]/FACTOR[to]), [v, from, to]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Unit: Weight</h1>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="block"><span className="text-sm">Value</span>
            <input type="number" value={v} onChange={e=>setV(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">From</span>
            <select value={from} onChange={e=>setFrom(e.target.value)} className="w-full rounded-xl border px-3 py-2">{UNITS.map(u=><option key={u}>{u}</option>)}</select></label>
          <label className="block"><span className="text-sm">To</span>
            <select value={to} onChange={e=>setTo(e.target.value)} className="w-full rounded-xl border px-3 py-2">{UNITS.map(u=><option key={u}>{u}</option>)}</select></label>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 mt-6">
          <div className="text-sm text-gray-500">Converted</div>
          <div className="text-xl md:text-2xl font-semibold">{out.toLocaleString(undefined,{maximumFractionDigits:6})} {to}</div>
        </div>
      </div>
    </div>
  );
}
