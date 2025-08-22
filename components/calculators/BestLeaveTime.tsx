"use client";
import { useMemo, useState } from "react";

function parseTime(s:string){ // "08:30" → minutes since midnight
  const [h,m]=s.split(":").map(Number); return h*60+(m||0);
}
function toHM(min:number){
  const h=Math.floor(min/60)%24, m=min%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

export default function BestLeaveTime(){
  const [arrStart,setArrStart]=useState("09:00");
  const [arrEnd,setArrEnd]=useState("09:30");
  const [drive,setDrive]=useState(35);
  const [buffer,setBuffer]=useState(10);

  const res = useMemo(()=>{
    const s=parseTime(arrStart), e=parseTime(arrEnd);
    const latest = e - drive - buffer;
    const earliest = s - drive - buffer;
    return {earliest: toHM(earliest), latest: toHM(latest)};
  },[arrStart,arrEnd,drive,buffer]);

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <label className="flex flex-col">Arrival window start
          <input className="input" type="time" value={arrStart} onChange={e=>setArrStart(e.target.value)} />
        </label>
        <label className="flex flex-col">Arrival window end
          <input className="input" type="time" value={arrEnd} onChange={e=>setArrEnd(e.target.value)} />
        </label>
        <label className="flex flex-col">Drive time (min)
          <input className="input" type="number" min={1} value={drive} onChange={e=>setDrive(+e.target.value||1)} />
        </label>
        <label className="flex flex-col">Buffer (min)
          <input className="input" type="number" min={0} value={buffer} onChange={e=>setBuffer(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-indigo-50 p-4">
        <div>Leave between <b>{res.earliest}</b> and <b>{res.latest}</b>.</div>
        <div className="text-sm text-gray-600">Pick the latest time for minimum wait, earlier for slack.</div>
      </div>
    </div>
  );
}
