'use client';
import { useMemo, useState } from 'react';

export default function SimpleInterest() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8); // % p.a.
  const [years, setYears] = useState(2);

  const res = useMemo(() => {
    const I = principal * rate/100 * years;
    return { interest: I, total: principal + I };
  }, [principal, rate, years]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Simple Interest</h1>
        <p className="text-gray-600 mb-6">I = P × r × t</p>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="block"><span className="text-sm">Principal</span>
            <input type="number" min={0} value={principal} onChange={e=>setPrincipal(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Rate % p.a.</span>
            <input type="number" step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Years</span>
            <input type="number" min={0} step="0.25" value={years} onChange={e=>setYears(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Card label="Interest">{res.interest.toLocaleString(undefined,{maximumFractionDigits:2})}</Card>
          <Card label="Total">{res.total.toLocaleString(undefined,{maximumFractionDigits:2})}</Card>
        </div>
      </div>
    </div>
  );
}
function Card({label, children}:{label:string; children:React.ReactNode}) {
  return <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">{label}</div><div className="text-xl md:text-2xl font-semibold">{children}</div></div>;
}
