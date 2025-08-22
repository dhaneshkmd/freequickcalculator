"use client";
import { useState } from "react";

export default function FuelRefill(){
  const [tankPct,setTankPct]=useState(25);
  const [tankL,setTankL]=useState(45);
  const [kmPerDay,setKmPerDay]=useState(30);
  const [kmPerL,setKmPerL]=useState(14);
  const [trend,setTrend]=useState(0.8); // price change per week (%)

  const litersLeft = (tankPct/100)*tankL;
  const daysLeft = Math.max(0, Math.floor((litersLeft*kmPerL)/kmPerDay));
  const priceChange = (trend/7)*daysLeft; // % until refill day
  const suggest = (daysLeft<=3 && trend>0) ? "Refill now (price rising soon)." :
                  (daysLeft>=7 && trend<0) ? "You can wait; price trending down." :
                  "Either is fine — depends on convenience.";

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-5">
        <label className="flex flex-col">% in tank
          <input className="input" type="number" min={0} max={100} value={tankPct} onChange={e=>setTankPct(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Tank (L)
          <input className="input" type="number" min={10} value={tankL} onChange={e=>setTankL(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Avg km/day
          <input className="input" type="number" min={1} value={kmPerDay} onChange={e=>setKmPerDay(+e.target.value||1)} />
        </label>
        <label className="flex flex-col">Mileage (km/L)
          <input className="input" type="number" min={1} value={kmPerL} onChange={e=>setKmPerL(+e.target.value||1)} />
        </label>
        <label className="flex flex-col">Price trend %/week (+ up)
          <input className="input" type="number" step="0.1" value={trend} onChange={e=>setTrend(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-slate-50 p-4">
        <div><b>Days of fuel left:</b> {daysLeft} days</div>
        <div><b>Expected price change by then:</b> {priceChange.toFixed(2)}%</div>
        <div className="mt-2 font-semibold">{suggest}</div>
      </div>
    </div>
  );
}
