'use client';
import { useMemo, useState } from 'react';

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8); // % per year
  const [times, setTimes] = useState(12); // compounding / year
  const [years, setYears] = useState(10);

  const res = useMemo(() => {
    const i = rate / 100;
    const A = principal * Math.pow(1 + i / times, times * years);
    const interest = A - principal;
    return { A, interest };
  }, [principal, rate, times, years]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Compound Interest</h1>
        <p className="text-gray-600 mb-6">A = P(1 + r/n)<sup>nt</sup></p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Principal (P)</span>
            <input type="number" min={0} value={principal} onChange={e=>setPrincipal(Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Rate (r) % / year</span>
            <input type="number" min={0} step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Compounds per year (n)</span>
            <select value={times} onChange={e=>setTimes(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2">
              <option value={1}>Annually (1)</option>
              <option value={2}>Semiannually (2)</option>
              <option value={4}>Quarterly (4)</option>
              <option value={12}>Monthly (12)</option>
              <option value={365}>Daily (365)</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Years (t)</span>
            <input type="number" min={0} step="0.1" value={years} onChange={e=>setYears(Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm uppercase text-gray-500 mb-1">Future Value (A)</div>
            <div className="text-xl md:text-2xl font-semibold">
              {res.A.toLocaleString(undefined,{maximumFractionDigits:2})}
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm uppercase text-gray-500 mb-1">Total Interest</div>
            <div className="text-xl md:text-2xl font-semibold">
              {res.interest.toLocaleString(undefined,{maximumFractionDigits:2})}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
