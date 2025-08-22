"use client";
import { useState } from "react";

function toMinutes(t:string){ const [h,m]=t.split(":").map(Number); return h*60+(m||0); }
function toHM(m:number){ const h=Math.floor(m/60)%24, mm=m%60; return `${String(h).padStart(2,'0')}:${String(mm).padStart(2,'0')}`; }

export default function GoldenHour(){
  const [sunrise,setSunrise]=useState("06:10");
  const [sunset,setSunset]=useState("18:15");
  const [gh,setGh]=useState(60); // mins after/before

  const morning = `${sunrise}–${toHM(toMinutes(sunrise)+gh)}`;
  const evening = `${toHM(toMinutes(sunset)-gh)}–${sunset}`;

  return (
    <div className="card space-y-4">
      <p className="text-sm text-gray-600">Enter local sunrise & sunset for the date/location. Golden hour is approximated.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col">Sunrise (local)
          <input className="input" type="time" value={sunrise} onChange={e=>setSunrise(e.target.value)} />
        </label>
        <label className="flex flex-col">Sunset (local)
          <input className="input" type="time" value={sunset} onChange={e=>setSunset(e.target.value)} />
        </label>
        <label className="flex flex-col">Golden hour length (min)
          <input className="input" type="number" min={30} max={90} value={gh} onChange={e=>setGh(+e.target.value||60)} />
        </label>
      </div>
      <div className="rounded-md bg-amber-50 p-4">
        <div><b>Morning:</b> {morning}</div>
        <div><b>Evening:</b> {evening}</div>
      </div>
    </div>
  );
}
