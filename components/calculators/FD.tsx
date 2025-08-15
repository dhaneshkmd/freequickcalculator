'use client';
import { useMemo, useState } from 'react';

export default function FD() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7); // % p.a.
  const [years, setYears] = useState(3);
  const [freq, setFreq] = useState(4); // compounding per year

  const res = useMemo(() => {
    const r = rate / 100;
    const A = principal * Math.pow(1 + r / freq, freq * years);
    return { maturity: A, interest: A - principal };
  }, [principal, rate, years, freq]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Fixed Deposit (FD)</h1>
        <p className="text-gray-600 mb-6">A = P(1 + r/n)<sup>nt</sup>. Choose compounding.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block"><span className="block text-sm font-medium mb-1">Principal</span>
            <input type="number" min={0} value={principal} onChange={e=>setPrincipal(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Rate % per year</span>
            <input type="number" min={0} step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Years</span>
            <input type="number" min={0} step="0.25" value={years} onChange={e=>setYears(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Compounding</span>
            <select value={freq} onChange={e=>setFreq(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2">
              <option value={1}>Yearly (1)</option>
              <option value={2}>Half-yearly (2)</option>
              <option value={4}>Quarterly (4)</option>
              <option value={12}>Monthly (12)</option>
            </select></label>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Maturity amount</div>
            <div className="text-xl md:text-2xl font-semibold">{res.maturity.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Interest earned</div>
            <div className="text-xl md:text-2xl font-semibold">{res.interest.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
        </div>
      </div>
    </div>
  );
}
