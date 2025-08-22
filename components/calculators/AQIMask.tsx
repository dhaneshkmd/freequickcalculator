"use client";
import { useState } from "react";

function advice(aqi: number, sensitive: boolean){
  if (aqi <= 50) return {note:"Good air. No mask needed.", limit:"Unlimited"};
  if (aqi <=100) return {
    note: sensitive ? "Moderate. Consider a mask if sensitive." : "Moderate. Mask optional.",
    limit: sensitive ? "≤3 h outside" : "No strict limit"
  };
  if (aqi <=150) return {note:"Unhealthy for sensitive groups. Wear a good mask (KF94/N95).", limit: sensitive ? "≤1 h" : "≤2 h"};
  if (aqi <=200) return {note:"Unhealthy. N95 recommended.", limit: sensitive ? "≤30 min" : "≤1 h"};
  if (aqi <=300) return {note:"Very unhealthy. Avoid outdoor exertion. N95.", limit:"≤15–30 min"};
  return {note:"Hazardous. Stay indoors. Purifier if possible.", limit:"Avoid going out"};
}

export default function AQIMask(){
  const [aqi,setAqi]=useState(120);
  const [sens,setSens]=useState(true);
  const a = advice(aqi, sens);

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col">AQI (US EPA scale)
          <input type="number" min={0} max={500} value={aqi} onChange={e=>setAqi(+e.target.value||0)} className="input"/>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={sens} onChange={e=>setSens(e.target.checked)} />
          <span>Respiratory/cardiac sensitive</span>
        </label>
      </div>
      <div className="rounded-md bg-amber-50 p-4">
        <div className="font-semibold">{a.note}</div>
        <div className="text-sm text-gray-600">Suggested outdoor time: {a.limit}</div>
      </div>
    </div>
  );
}
