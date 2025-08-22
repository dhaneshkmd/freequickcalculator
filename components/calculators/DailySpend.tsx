"use client";
import { useState } from "react";

export default function DailySpend(){
  const [cap,setCap]=useState(1200);
  const [spent,setSpent]=useState(480);
  const [daysLeft,setDays]=useState(10);

  const remain = Math.max(0, cap - spent);
  const limit = daysLeft>0 ? remain/daysLeft : 0;

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col">Monthly cap
          <input className="input" type="number" min={0} value={cap} onChange={e=>setCap(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Spent so far
          <input className="input" type="number" min={0} value={spent} onChange={e=>setSpent(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Days remaining
          <input className="input" type="number" min={0} value={daysLeft} onChange={e=>setDays(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-emerald-50 p-4">
        <div><b>Today’s max spend:</b> {limit.toFixed(2)}</div>
        <div className="text-sm text-gray-600">Remaining budget: {remain.toFixed(2)}</div>
      </div>
    </div>
  );
}
