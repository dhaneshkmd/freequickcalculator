"use client";
import { useMemo, useState } from "react";

function daysBetween(a:string,b:string){
  const d1=new Date(a), d2=new Date(b); return Math.ceil((+d2-+d1)/86400000);
}
function isWeekend(d:Date){ const x=d.getDay(); return x===0||x===6; }

export default function LeavePlanner(){
  const today = new Date().toISOString().slice(0,10);
  const [nextHoliday,setHoliday]=useState(today);
  const [balance,setBal]=useState(5);

  const info = useMemo(()=>{
    const days = daysBetween(today, nextHoliday);
    let bridge=0;
    // naive: if holiday on Tue/Thu, suggest 1 day leave to bridge weekend
    const hd=new Date(nextHoliday);
    const dow=hd.getDay();
    if (dow===2) bridge=1; // Tue
    if (dow===4) bridge=1; // Thu
    return {days, bridge};
  },[nextHoliday,today]);

  const ok = balance>=info.bridge;

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col">Next holiday (date)
          <input className="input" type="date" value={nextHoliday} onChange={e=>setHoliday(e.target.value)} />
        </label>
        <label className="flex flex-col">Leave balance (days)
          <input className="input" type="number" min={0} value={balance} onChange={e=>setBal(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-lime-50 p-4">
        <div><b>Days until holiday:</b> {info.days}</div>
        <div><b>Bridge suggestion:</b> {info.bridge>0 ? `${info.bridge} day` : "None"} {ok? "" : "(not enough balance)"}</div>
        <div className="text-sm text-gray-600">Tip: align personal days with long weekends.</div>
      </div>
    </div>
  );
}
