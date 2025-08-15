'use client';
import { useMemo, useState } from 'react';

export default function Tip() {
  const [bill, setBill] = useState(1000);
  const [tip, setTip] = useState(10);
  const [people, setPeople] = useState(2);

  const r = useMemo(() => {
    const t = bill * tip/100;
    const total = bill + t;
    return { t, total, per: total / Math.max(1, people) };
  }, [bill, tip, people]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Tip Calculator</h1>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="block"><span className="text-sm">Bill</span>
            <input type="number" min={0} value={bill} onChange={e=>setBill(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Tip %</span>
            <input type="number" min={0} value={tip} onChange={e=>setTip(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">People</span>
            <input type="number" min={1} value={people} onChange={e=>setPeople(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card label="Tip">{r.t.toLocaleString(undefined,{maximumFractionDigits:2})}</Card>
          <Card label="Total">{r.total.toLocaleString(undefined,{maximumFractionDigits:2})}</Card>
          <Card label="Per person">{r.per.toLocaleString(undefined,{maximumFractionDigits:2})}</Card>
        </div>
      </div>
    </div>
  );
}
function Card({label, children}:{label:string; children:React.ReactNode}) {
  return <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">{label}</div><div className="text-xl md:text-2xl font-semibold">{children}</div></div>;
}
