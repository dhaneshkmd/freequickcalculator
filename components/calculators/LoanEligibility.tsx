'use client';
import { useMemo, useState } from 'react';

function principalFromEMI(emi:number, annual:number, years:number){
  const r = annual/12/100, n = years*12, f = Math.pow(1+r,n);
  return (emi * (f - 1)) / (r * f);
}

export default function LoanEligibility() {
  const [income, setIncome] = useState(80000);  // monthly
  const [oblig, setOblig] = useState(10000);    // existing EMIs
  const [foir, setFoir] = useState(40);         // %
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const res = useMemo(()=>{
    const maxEmi = Math.max(0, income * foir/100 - oblig);
    const maxLoan = maxEmi > 0 ? principalFromEMI(maxEmi, rate, years) : 0;
    return { maxEmi, maxLoan };
  }, [income, oblig, foir, rate, years]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Loan Eligibility</h1>
        <p className="text-gray-600 mb-6">Estimate maximum loan using FOIR (DTI).</p>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block"><span className="block text-sm font-medium mb-1">Monthly income</span>
            <input type="number" min={0} value={income} onChange={e=>setIncome(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Existing EMIs</span>
            <input type="number" min={0} value={oblig} onChange={e=>setOblig(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">FOIR / DTI %</span>
            <input type="number" min={10} max={70} value={foir} onChange={e=>setFoir(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Rate % p.a.</span>
            <input type="number" min={0} step="0.01" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
          <label className="block"><span className="block text-sm font-medium mb-1">Tenure (years)</span>
            <input type="number" min={1} max={30} value={years} onChange={e=>setYears(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2"/></label>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Max EMI</div>
            <div className="text-xl md:text-2xl font-semibold">{res.maxEmi.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
          <div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500">Max Loan</div>
            <div className="text-xl md:text-2xl font-semibold">{res.maxLoan.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
        </div>
      </div>
    </div>
  );
}
