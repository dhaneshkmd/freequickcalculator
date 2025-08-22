"use client";
import { useState } from "react";

export default function RainNowcast(){
  const [p60,setP60]=useState(40);
  const [p120,setP120]=useState(60);
  const [threshold,setT]=useState(40);

  const carry = p60>=threshold || p120>=threshold;
  const msg = carry ? "Yes — take an umbrella." : "Probably fine without it.";

  return (
    <div className="card space-y-4">
      <p className="text-sm text-gray-600">Quick heuristic based on your next 60–120 minute rain probability.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col">Chance next 60 min (%)
          <input className="input" type="number" min={0} max={100} value={p60} onChange={e=>setP60(+e.target.value||0)}/>
        </label>
        <label className="flex flex-col">Chance next 120 min (%)
          <input className="input" type="number" min={0} max={100} value={p120} onChange={e=>setP120(+e.target.value||0)}/>
        </label>
        <label className="flex flex-col">Umbrella threshold (%)
          <input className="input" type="number" min={10} max={90} value={threshold} onChange={e=>setT(+e.target.value||40)}/>
        </label>
      </div>
      <div className={`rounded-md p-4 ${carry?'bg-sky-50':'bg-emerald-50'}`}>
        <div className="font-semibold">{msg}</div>
        <div className="text-sm text-gray-600">Tip: windy + scattered showers? Lean toward carrying.</div>
      </div>
    </div>
  );
}
