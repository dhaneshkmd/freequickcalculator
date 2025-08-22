"use client";
import { useState } from "react";

export default function CryptoHeat(){
  const [atrPct,setAtr]=useState(4); // average daily swing %
  const [acct,setAcct]=useState(2000);
  const [riskPct,setRisk]=useState(1); // % per trade

  const riskDollar = (acct*riskPct)/100;
  const stopPct = atrPct; // rough
  const positionPct = (riskPct/stopPct)*100; // of account
  const heat = atrPct<2 ? "Cool" : atrPct<4 ? "Warm" : atrPct<8 ? "Hot" : "Very Hot";

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col">ATR / daily vol (%)
          <input className="input" type="number" step="0.1" value={atrPct} onChange={e=>setAtr(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Account ($)
          <input className="input" type="number" value={acct} onChange={e=>setAcct(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Risk per trade (%)
          <input className="input" type="number" step="0.1" value={riskPct} onChange={e=>setRisk(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-purple-50 p-4">
        <div>Risk $/trade: <b>${riskDollar.toFixed(2)}</b></div>
        <div>Indicative position <b>{positionPct.toFixed(1)}%</b> of account (if stop ≈ ATR).</div>
        <div className="text-sm text-gray-600">Heat: {heat}</div>
      </div>
    </div>
  );
}
