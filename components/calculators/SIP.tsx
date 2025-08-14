"use client";
import { useMemo, useState } from "react";
import { sipFutureValue } from "../../lib/math";
import { formatCurrency, parseSafeNumber } from "../../lib/format";

export default function SIP(){
  const [monthly,setMonthly]=useState("5000");
  const [annualRate,setAnnualRate]=useState("12");
  const [duration,setDuration]=useState("10");
  const [unit,setUnit]=useState<"years"|"months">("years");
  const [currency,setCurrency]=useState("INR");
  const [locale,setLocale]=useState("en-IN");

  const months=useMemo(()=>{ const t=parseSafeNumber(duration); return unit==="years"?Math.round(t*12):Math.round(t); },[duration,unit]);
  const fv=useMemo(()=>sipFutureValue(parseSafeNumber(monthly), parseSafeNumber(annualRate), months),[monthly,annualRate,months]);
  const invested=useMemo(()=>parseSafeNumber(monthly)*months,[monthly,months]);
  const gain=fv-invested;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card space-y-3">
          <div><label>Monthly Contribution</label><input type="number" value={monthly} onChange={e=>setMonthly(e.target.value)} /></div>
          <div><label>Expected Annual Return (%)</label><input type="number" step="0.01" value={annualRate} onChange={e=>setAnnualRate(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label>Duration</label><input type="number" value={duration} onChange={e=>setDuration(e.target.value)} /></div>
            <div><label>Unit</label><select value={unit} onChange={e=>setUnit(e.target.value as any)}><option value="years">Years</option><option value="months">Months</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label>Currency</label><select value={currency} onChange={e=>setCurrency(e.target.value)}><option>INR</option><option>USD</option><option>AED</option><option>EUR</option></select></div>
            <div><label>Locale</label><select value={locale} onChange={e=>setLocale(e.target.value)}><option value="en-IN">en-IN</option><option value="en-US">en-US</option><option value="en-AE">en-AE</option><option value="en-GB">en-GB</option></select></div>
          </div>
        </div>
        <div className="card space-y-3">
          <h3 className="text-lg font-semibold">Projection</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Stat label="Invested Amount" value={formatCurrency(invested,locale,currency)} />
            <Stat label="Estimated Returns" value={formatCurrency(gain,locale,currency)} />
            <Stat label="Total Value" value={formatCurrency(fv,locale,currency)} />
            <Stat label="Duration (months)" value={String(months)} />
          </div>
          <p className="text-xs text-gray-500">* Assumes monthly investment and constant rate.</p>
        </div>
      </div>
    </div>
  );
}
function Stat({label,value}:{label:string;value:string}){ return <div className="rounded-lg bg-gray-50 p-3"><div className="text-xs text-gray-500">{label}</div><div className="text-lg font-semibold">{value}</div></div>; }
