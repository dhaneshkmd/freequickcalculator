'use client';
import { useMemo, useState } from 'react';

function emi(P:number, annual:number, years:number){
  const r = annual/12/100, n = years*12, f = Math.pow(1+r,n);
  return P * r * f / (f - 1);
}

export default function LoanCompare() {
  const [p1, setP1] = useState(1000000), [r1, setR1] = useState(9), [y1, setY1] = useState(15);
  const [p2, setP2] = useState(1000000), [r2, setR2] = useState(8.5), [y2, setY2] = useState(15);

  const a = useMemo(()=>({ emi: emi(p1,r1,y1), total: emi(p1,r1,y1)*y1*12, interest: emi(p1,r1,y1)*y1*12 - p1 }),[p1,r1,y1]);
  const b = useMemo(()=>({ emi: emi(p2,r2,y2), total: emi(p2,r2,y2)*y2*12, interest: emi(p2,r2,y2)*y2*12 - p2 }),[p2,r2,y2]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Loan Compare</h1>
        <p className="text-gray-600 mb-6">Compare EMIs and total interest for two loans.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Loan A</h3>
            <div className="grid gap-3">
              <label className="block"><span className="block text-sm">Principal</span>
                <input type="number" min={0} value={p1} onChange={e=>setP1(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
              <label className="block"><span className="block text-sm">Rate % p.a.</span>
                <input type="number" min={0} step="0.01" value={r1} onChange={e=>setR1(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
              <label className="block"><span className="block text-sm">Tenure (years)</span>
                <input type="number" min={1} value={y1} onChange={e=>setY1(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Loan B</h3>
            <div className="grid gap-3">
              <label className="block"><span className="block text-sm">Principal</span>
                <input type="number" min={0} value={p2} onChange={e=>setP2(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
              <label className="block"><span className="block text-sm">Rate % p.a.</span>
                <input type="number" min={0} step="0.01" value={r2} onChange={e=>setR2(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
              <label className="block"><span className="block text-sm">Tenure (years)</span>
                <input type="number" min={1} value={y2} onChange={e=>setY2(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[a,b].map((k,ix)=>(
            <div key={ix} className="rounded-xl bg-gray-50 p-4">
              <div className="text-sm text-gray-500">{ix===0?'Loan A':'Loan B'}</div>
              <div className="font-semibold">EMI: {k.emi.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
              <div className="font-semibold">Total Interest: {k.interest.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
            </div>
          ))}
          <div className="rounded-xl border p-4">
            <div className="text-sm text-gray-500">Difference (B − A)</div>
            <div>EMI: {(b.emi-a.emi).toLocaleString(undefined,{maximumFractionDigits:0})}</div>
            <div>Total Interest: {(b.interest-a.interest).toLocaleString(undefined,{maximumFractionDigits:0})}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
