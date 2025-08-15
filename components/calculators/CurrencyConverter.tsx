'use client';
import { useMemo, useState } from 'react';

const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, INR: 83, GBP: 0.78, JPY: 157, AUD: 1.49, CAD: 1.36, SGD: 1.35
}; // Base ~USD. Update as needed.

const CODES = Object.keys(RATES);

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');

  const out = useMemo(() => amount * (RATES[to] / RATES[from]), [amount, from, to]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Currency Converter</h1>
        <p className="text-gray-600 mb-6">Approximate rates. For live FX, update the rate table.</p>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Amount</span>
            <input type="number" min={0} step="0.01" value={amount}
              onChange={e=>setAmount(Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2"/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">From</span>
            <select value={from} onChange={e=>setFrom(e.target.value)} className="w-full rounded-xl border px-3 py-2">
              {CODES.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">To</span>
            <select value={to} onChange={e=>setTo(e.target.value)} className="w-full rounded-xl border px-3 py-2">
              {CODES.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-4">
          <button
            onClick={()=>{ setFrom(to); setTo(from); }}
            className="rounded-xl border px-3 py-2 hover:bg-gray-50"
          >Swap</button>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 mt-6">
          <div className="text-sm uppercase text-gray-500 mb-1">Converted</div>
          <div className="text-xl md:text-2xl font-semibold">
            {out.toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}
          </div>
        </div>
      </div>
    </div>
  );
}
