'use client';
import { useMemo, useState } from 'react';

export default function Mortgage() {
  const [principal, setPrincipal] = useState(4_000_000);
  const [rate, setRate] = useState(8.25);   // % p.a.
  const [years, setYears] = useState(20);

  const r = rate / 12 / 100;
  const n = years * 12;

  const { emi, total, interest } = useMemo(() => {
    if (r === 0) {
      const emi0 = principal / n;
      return { emi: emi0, total: principal, interest: 0 };
    }
    const f = Math.pow(1 + r, n);
    const e = principal * r * f / (f - 1);
    const tot = e * n;
    return { emi: e, total: tot, interest: tot - principal };
  }, [principal, r, n]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Mortgage Payment</h1>
        <p className="text-gray-600 mb-6">Monthly payment (EMI) and totals.</p>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="block"><span className="text-sm">Loan amount</span>
            <input type="number" min={0} value={principal} onChange={e=>setPrincipal(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Rate % p.a.</span>
            <input type="number" step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Tenure (years)</span>
            <input type="number" min={1} max={40} value={years} onChange={e=>setYears(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card label="EMI">{emi.toLocaleString(undefined,{maximumFractionDigits:0})}</Card>
          <Card label="Total Interest">{interest.toLocaleString(undefined,{maximumFractionDigits:0})}</Card>
          <Card label="Total Payment">{total.toLocaleString(undefined,{maximumFractionDigits:0})}</Card>
        </div>
      </div>
    </div>
  );
}
function Card({label, children}:{label:string; children:React.ReactNode}) {
  return <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">{label}</div><div className="text-xl md:text-2xl font-semibold">{children}</div></div>;
}
