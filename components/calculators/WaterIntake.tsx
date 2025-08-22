"use client";
import { useState } from "react";

export default function WaterIntake(){
  const [kg,setKg]=useState(70);
  const [activity,setAct]=useState(30); // minutes
  const [temp,setTemp]=useState(28); // C
  const base = kg*0.033; // L
  const addAct = (activity/30)*0.35; // L per 30 min
  const addHeat = temp>=30 ? 0.2 : 0;
  const total = Math.round((base+addAct+addHeat)*10)/10;
  const glassesLeft = Math.max(0, Math.ceil((total*1000)/250)); // 250 ml each

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col">Weight (kg)
          <input className="input" type="number" min={30} value={kg} onChange={e=>setKg(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Activity (min)
          <input className="input" type="number" min={0} value={activity} onChange={e=>setAct(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Temperature (°C)
          <input className="input" type="number" value={temp} onChange={e=>setTemp(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-sky-50 p-4">
        <div><b>Target today:</b> {total} L</div>
        <div className="text-sm text-gray-600">Glasses (250 ml): {glassesLeft}</div>
      </div>
    </div>
  );
}
