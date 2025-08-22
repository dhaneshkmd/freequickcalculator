"use client";
import { useState } from "react";

export default function EnergyCookCost(){
  const [lpgP,setLpgP]=useState(2.2); // $/kg
  const [lpgEff,setLpgEff]=useState(0.55);
  const [elec,setElec]=useState(0.22); // $/kWh
  const [elecEff,setElecEff]=useState(0.9);

  const kWhPerKg=13.6;
  const lpgCostPerUseful = (lpgP/(kWhPerKg*lpgEff));
  const elecCostPerUseful = elec/elecEff;
  const cheaper = lpgCostPerUseful<elecCostPerUseful ? "LPG" : (lpgCostPerUseful>elecCostPerUseful ? "Electricity" : "Same");

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <label className="flex flex-col">LPG price ($/kg)
          <input className="input" type="number" step="0.01" value={lpgP} onChange={e=>setLpgP(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">LPG stove eff. (0.3–0.7)
          <input className="input" type="number" step="0.01" min={0.3} max={0.8} value={lpgEff} onChange={e=>setLpgEff(+e.target.value||0.5)} />
        </label>
        <label className="flex flex-col">Electricity ($/kWh)
          <input className="input" type="number" step="0.01" value={elec} onChange={e=>setElec(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Electric eff. (0.8–1.0)
          <input className="input" type="number" step="0.01" min={0.7} max={1} value={elecEff} onChange={e=>setElecEff(+e.target.value||1)} />
        </label>
      </div>
      <div className="rounded-md bg-teal-50 p-4">
        <div>Useful energy cost: LPG ${lpgCostPerUseful.toFixed(3)}/kWh • Elec ${elecCostPerUseful.toFixed(3)}/kWh</div>
        <div className="font-semibold">Cheaper today: {cheaper}</div>
      </div>
    </div>
  );
}
