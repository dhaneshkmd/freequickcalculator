'use client';
import { useMemo, useState } from 'react';

export default function GSTVat() {
  const [rate, setRate] = useState(18); // %
  const [amount, setAmount] = useState(1000);
  const [mode, setMode] = useState<'add'|'remove'>('add');

  const r = useMemo(() => {
    const t = rate/100;
    if (mode === 'add') {
      const tax = amount * t;
      return { base: amount, tax, total: amount + tax };
    } else {
      const base = amount / (1 + t);
      return { base, tax: amount - base, total: amount };
    }
  }, [rate, amount, mode]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">GST / VAT</h1>
        <p className="text-gray-600 mb-6">Add GST to a base price or remove GST from an inclusive price.</p>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="block"><span className="block text-sm font-medium mb-1">Mode</span>
            <select value={mode} onChange={e=>setMode(e.target.value as any)} className="w-full rounded-xl border px-3 py-2">
              <option value="add">Add tax to base</option>
              <option value="remove">Remove tax from total</option>
            </select></label>
          <label className="block"><span className="block text-sm font-medium mb-1">{mode==='add'?'Base amount':'Total (tax-inclusive)'}</span>
            <input type="number" min={0} value={amount} onChange={e=>setAmount(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Tax rate %</span>
            <input type="number" min={0} value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Base</div>
            <div className="text-xl md:text-2xl font-semibold">{r.base.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Tax</div>
            <div className="text-xl md:text-2xl font-semibold">{r.tax.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Total</div>
            <div className="text-xl md:text-2xl font-semibold">{r.total.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
        </div>
      </div>
    </div>
  );
}
