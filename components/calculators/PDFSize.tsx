"use client";
import { useState } from "react";

// very rough: image-heavy PDFs scale ~ with dpi^2
export default function PDFSize(){
  const [origMB,setOrig]=useState(12);
  const [origDPI,setOD]=useState(300);
  const [targetDPI,setTD]=useState(150);

  const ratio = Math.min(1, Math.max(0.05, (targetDPI*targetDPI)/(origDPI*origDPI)));
  const estMB = +(origMB*ratio).toFixed(2);

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col">Original size (MB)
          <input className="input" type="number" step="0.1" value={origMB} onChange={e=>setOrig(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">Original DPI
          <input className="input" type="number" value={origDPI} onChange={e=>setOD(+e.target.value||300)} />
        </label>
        <label className="flex flex-col">Target DPI
          <input className="input" type="number" value={targetDPI} onChange={e=>setTD(+e.target.value||150)} />
        </label>
      </div>
      <div className="rounded-md bg-emerald-50 p-4">
        <div>Estimated compressed size: <b>{estMB} MB</b></div>
        <div className="text-sm text-gray-600">Text-only PDFs compress differently; this is a visual estimate.</div>
      </div>
    </div>
  );
}
