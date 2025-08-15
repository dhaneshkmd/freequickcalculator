'use client';
import { useMemo, useState } from 'react';

export default function SalesTax() {
  const [mode, setMode] = useState<'add'|'remove'>('add');
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(7.5);

  const r = useMemo(() => {
    const t = rate/100;
    if (mode === 'add') {
      const tax = amount * t;
      return { base: amount, tax, total: amount + tax };
    } else {
      const base = amount / (1 + t);
      return { base, tax: amount - base, total: amount };
    }
  }, [mode, amount, rate]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Sales Tax</h1>
        <p className="text-gray-600 mb-6">Add tax to a base price or remove from a tax-inclusive price.</p>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="block"><span className="text-sm">Mode</span>
            <select className="w-full rounded-xl border px-3 py-2" value={mode} onChange={e=>setMode(e.target.value as any)}>
              <option value="add">Add tax to base</option>
              <option value="remove">Remove tax from total</option>
            </select>
          </label>
          <label className="block"><span className="text-sm">{mode==='add'?'Base amount':'Total (tax-incl.)'}</span>
            <input type="number" min={0} value={amount} onChange={e=>setAmount(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="text-sm">Tax rate %</span>
            <input type="number" min={0} step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card label="Base">{r.base.toLocaleString(undefined,{maximumFractionDigits:2})}</Card>
          <Card label="Tax">{r.tax.toLocaleString(undefined,{maximumFractionDigits:2})}</Card>
          <Card label="Total">{r.total.toLocaleString(undefined,{maximumFractionDigits:2})}</Card>
        </div>
      </div>
    </div>
  );
}
function Card({label, children}:{label:string; children:React.ReactNode}) {
  return <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">{label}</div><div className="text-xl md:text-2xl font-semibold">{children}</div></div>;
}
