"use client";
import { useState } from "react";

export default function PositionRisk(){
  const [acct,setAcct]=useState(5000);
  const [riskPct,setRiskPct]=useState(1);
  const [entry,setEntry]=useState(100);
  const [stop,setStop]=useState(95);

  const risk$ = acct*riskPct/100;
  const perShare = Math.max(0.0001, Math.abs(entry-stop));
  const shares = Math.floor(risk$/perShare);
  const size$ = shares*entry;

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <label className="flex flex-col">Account ($)
          <input className="input" type="number" value={acct} onChange={e=>setAcct(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Risk (%)
          <input className="input" type="number" step="0.1" value={riskPct} onChange={e=>setRiskPct(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Entry
          <input className="input" type="number" step="0.01" value={entry} onChange={e=>setEntry(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Stop
          <input className="input" type="number" step="0.01" value={stop} onChange={e=>setStop(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-slate-50 p-4">
        <div>Risk $: <b>{risk$.toFixed(2)}</b> • Risk/share: <b>{perShare.toFixed(2)}</b></div>
        <div>Position size: <b>{shares}</b> units (~${size$.toFixed(2)})</div>
      </div>
    </div>
  );
}
