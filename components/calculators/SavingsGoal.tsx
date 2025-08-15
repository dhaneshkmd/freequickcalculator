'use client';
import { useMemo, useState } from 'react';

export default function SavingsGoal() {
  const [goal, setGoal] = useState(1_000_000);
  const [rate, setRate] = useState(8); // % p.a.
  const [months, setMonths] = useState(36);

  const res = useMemo(() => {
    const i = rate/100/12;
    const pmt = goal * i / (Math.pow(1+i, months) - 1); // end-of-month contributions
    const invested = pmt * months;
    return { monthly: pmt, invested, interest: goal - invested };
  }, [goal, rate, months]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Savings Goal</h1>
        <p className="text-gray-600 mb-6">Monthly saving needed to reach a target by compound growth.</p>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="block"><span className="text-sm">Goal amount</span>
            <input type="number" min={0} value={goal} onChange={e=>setGoal(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Rate % p.a.</span>
            <input type="number" step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Months</span>
            <input type="number" min={1} value={months} onChange={e=>setMonths(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card label="Monthly saving">{res.monthly.toLocaleString(undefined,{maximumFractionDigits:0})}</Card>
          <Card label="Total invested">{res.invested.toLocaleString(undefined,{maximumFractionDigits:0})}</Card>
          <Card label="Growth">{res.interest.toLocaleString(undefined,{maximumFractionDigits:0})}</Card>
        </div>
      </div>
    </div>
  );
}
function Card({label, children}:{label:string; children:React.ReactNode}) {
  return <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">{label}</div><div className="text-xl md:text-2xl font-semibold">{children}</div></div>;
}
