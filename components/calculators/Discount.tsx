'use client';
import { useMemo, useState } from 'react';

export default function Discount() {
  const [price, setPrice] = useState(1000);
  const [discount, setDiscount] = useState(10); // %
  const [extra, setExtra] = useState<number | ''>('');
  const [tax, setTax] = useState<number | ''>(''); // optional post-discount tax

  const r = useMemo(() => {
    const p = Math.max(0, price);
    const d1 = Math.max(0, discount) / 100;
    const d2 = (extra === '' ? 0 : Math.max(0, Number(extra))) / 100;
    const base = p * (1 - d1) * (1 - d2);
    const t = (tax === '' ? 0 : Math.max(0, Number(tax))) / 100;
    const final = base * (1 + t);
    const saved = p - base;
    return { base, final, saved };
  }, [price, discount, extra, tax]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Discount Calculator</h1>
        <p className="text-gray-600 mb-6">Sale price after one or two discounts. Optional tax after discount.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block"><span className="block text-sm font-medium mb-1">Original price</span>
            <input type="number" min={0} value={price} onChange={e=>setPrice(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Discount %</span>
            <input type="number" min={0} value={discount} onChange={e=>setDiscount(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Extra discount % (optional)</span>
            <input type="number" min={0} value={extra} onChange={e=>setExtra(e.target.value===''?'':Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Tax % after discount (optional)</span>
            <input type="number" min={0} value={tax} onChange={e=>setTax(e.target.value===''?'':Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Discounted (before tax)</div>
            <div className="text-xl md:text-2xl font-semibold">{r.base.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">You save</div>
            <div className="text-xl md:text-2xl font-semibold">{r.saved.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Final price</div>
            <div className="text-xl md:text-2xl font-semibold">{r.final.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
        </div>
      </div>
    </div>
  );
}
