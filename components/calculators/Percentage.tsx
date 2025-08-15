'use client';
import { useMemo, useState } from 'react';

export default function Percentage() {
  const [mode, setMode] = useState<'of'|'what'|'change'>('of');
  const [a, setA] = useState(20);     // percent or part
  const [b, setB] = useState(150);    // base or whole

  const res = useMemo(() => {
    if (mode === 'of') return (a/100) * b;           // X% of Y
    if (mode === 'what') return (a / b) * 100;       // X of Y is ?%
    return ((b - a) / a) * 100;                      // % change from A to B
  }, [mode, a, b]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Percentage</h1>
        <p className="text-gray-600 mb-6">Find X% of Y, what percent, or percent change.</p>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="block"><span className="text-sm">Mode</span>
            <select className="w-full rounded-xl border px-3 py-2" value={mode} onChange={e=>setMode(e.target.value as any)}>
              <option value="of">X% of Y</option>
              <option value="what">X of Y is ?%</option>
              <option value="change">% change A → B</option>
            </select>
          </label>
          <label className="block"><span className="text-sm">{mode==='of'?'X (percent)':'X (part or A)'}</span>
            <input type="number" value={a} onChange={e=>setA(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">{mode==='change'?'B (new value)':'Y (whole)'}</span>
            <input type="number" value={b} onChange={e=>setB(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 mt-6">
          <div className="text-sm text-gray-500">Result</div>
          <div className="text-xl md:text-2xl font-semibold">
            {mode==='what' || mode==='change' ? res.toFixed(2)+' %' : res.toLocaleString(undefined,{maximumFractionDigits:2})}
          </div>
        </div>
      </div>
    </div>
  );
}
