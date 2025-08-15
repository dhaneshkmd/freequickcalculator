'use client';
import { useMemo, useState } from 'react';

export default function RD() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7); // % p.a.
  const [months, setMonths] = useState(24);

  const res = useMemo(() => {
    const i = rate / 100 / 12; // monthly
    const fv = monthly * ((Math.pow(1 + i, months) - 1) / i); // end-of-month deposit
    const invested = monthly * months;
    return { maturity: fv, interest: fv - invested, invested };
  }, [monthly, rate, months]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Recurring Deposit (RD)</h1>
        <p className="text-gray-600 mb-6">Monthly deposits with monthly compounding (approx.).</p>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="block"><span className="text-sm">Monthly deposit</span>
            <input type="number" min={0} value={monthly} onChange={e=>setMonthly(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Rate % p.a.</span>
            <input type="number" step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Months</span>
            <input type="number" min={1} value={months} onChange={e=>setMonths(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card label="Invested">{res.invested.toLocaleString()}</Card>
          <Card label="Interest">{res.interest.toLocaleString(undefined,{maximumFractionDigits:0})}</Card>
          <Card label="Maturity">{res.maturity.toLocaleString(undefined,{maximumFractionDigits:0})}</Card>
        </div>
      </div>
    </div>
  );
}
function Card({label, children}:{label:string; children:React.ReactNode}) {
  return <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">{label}</div><div className="text-xl md:text-2xl font-semibold">{children}</div></div>;
}
