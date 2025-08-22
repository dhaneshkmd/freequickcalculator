"use client";
import { useState } from "react";

export default function Pomodoro(){
  const [taskMin,setTask]=useState(180);
  const [len,setLen]=useState(25);
  const [breakMin,setBreak]=useState(5);

  const sessions = Math.ceil(taskMin/len);
  const total = sessions*len + (sessions-1)*breakMin;

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col">Task minutes
          <input className="input" type="number" min={1} value={taskMin} onChange={e=>setTask(+e.target.value||1)} />
        </label>
        <label className="flex flex-col">Session length (min)
          <input className="input" type="number" min={10} value={len} onChange={e=>setLen(+e.target.value||10)} />
        </label>
        <label className="flex flex-col">Break (min)
          <input className="input" type="number" min={0} value={breakMin} onChange={e=>setBreak(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-rose-50 p-4">
        <div><b>Sessions needed:</b> {sessions}</div>
        <div className="text-sm text-gray-600">Total time incl. breaks: {total} min</div>
      </div>
    </div>
  );
}
