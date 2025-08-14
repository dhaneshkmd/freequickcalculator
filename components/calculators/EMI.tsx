"use client";
import { useMemo, useState } from "react";
import { emiSchedule } from "../../lib/math";
import { formatCurrency, parseSafeNumber } from "../../lib/format";

export default function EMI(){
  const [principal,setPrincipal]=useState("500000");
  const [annualRate,setAnnualRate]=useState("9.5");
  const [tenure,setTenure]=useState("20");
  const [unit,setUnit]=useState<"years"|"months">("years");
  const [currency,setCurrency]=useState("INR");
  const [locale,setLocale]=useState("en-IN");

  const months=useMemo(()=>{ const t=parseSafeNumber(tenure); return unit==="years"?Math.round(t*12):Math.round(t); },[tenure,unit]);
  const result=useMemo(()=>emiSchedule(parseSafeNumber(principal), parseSafeNumber(annualRate), months),[principal,annualRate,months]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card space-y-3">
          <div><label>Principal</label><input type="number" value={principal} onChange={e=>setPrincipal(e.target.value)} /></div>
          <div><label>Annual Interest Rate (%)</label><input type="number" step="0.01" value={annualRate} onChange={e=>setAnnualRate(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label>Tenure</label><input type="number" value={tenure} onChange={e=>setTenure(e.target.value)} /></div>
            <div><label>Unit</label><select value={unit} onChange={e=>setUnit(e.target.value as any)}><option value="years">Years</option><option value="months">Months</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label>Currency</label><select value={currency} onChange={e=>setCurrency(e.target.value)}><option>INR</option><option>USD</option><option>AED</option><option>EUR</option></select></div>
            <div><label>Locale</label><select value={locale} onChange={e=>setLocale(e.target.value)}><option value="en-IN">en-IN</option><option value="en-US">en-US</option><option value="en-AE">en-AE</option><option value="en-GB">en-GB</option></select></div>
          </div>
        </div>
        <div className="card space-y-3">
          <h3 className="text-lg font-semibold">Results</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Stat label="Monthly EMI" value={formatCurrency(result.emi,locale,currency)} />
            <Stat label="Tenure (months)" value={String(months)} />
            <Stat label="Total Interest" value={formatCurrency(result.totalInterest,locale,currency)} />
            <Stat label="Total Payment" value={formatCurrency(result.totalPayment,locale,currency)} />
          </div>
          <p className="text-xs text-gray-500">* Approximate values. Actuals may vary by lender.</p>
        </div>
      </div>
      <div className="card">
        <h4 className="mb-3 text-base font-semibold">Amortization (first 12 months)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50"><tr><th className="px-3 py-2">Month</th><th className="px-3 py-2">Interest</th><th className="px-3 py-2">Principal</th><th className="px-3 py-2">Balance</th></tr></thead>
            <tbody>{result.schedule.map(r=><tr key={r.month} className="border-t"><td className="px-3 py-2">{r.month}</td><td className="px-3 py-2">{formatCurrency(r.interest,locale,currency)}</td><td className="px-3 py-2">{formatCurrency(r.principal,locale,currency)}</td><td className="px-3 py-2">{formatCurrency(r.balance,locale,currency)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function Stat({label,value}:{label:string;value:string}){ return <div className="rounded-lg bg-gray-50 p-3"><div className="text-xs text-gray-500">{label}</div><div className="text-lg font-semibold">{value}</div></div>; }
