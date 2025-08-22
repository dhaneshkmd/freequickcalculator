"use client";
import { useState } from "react";

// rough predictor: bytes ≈ width*height * bpp / 8 ; JPEG at q≈75 → ~0.5 bpp; PNG ≈ 2–4 bpp (content-dependent)
export default function ImageSize(){
  const [targetMB,setMB]=useState(1);
  const [bpp,setBpp]=useState(0.5);

  // max pixels that fit
  const bytes = targetMB*1024*1024;
  const maxPixels = Math.floor((bytes*8)/Math.max(0.1,bpp));
  const side = Math.floor(Math.sqrt(maxPixels)); // square image approx

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col">Target size (MB)
          <input className="input" type="number" step="0.1" min={0.2} value={targetMB} onChange={e=>setMB(+e.target.value||1)} />
        </label>
        <label className="flex flex-col">Bits per pixel (JPEG ~0.4–0.8, PNG ~2–4)
          <input className="input" type="number" step="0.1" min={0.1} value={bpp} onChange={e=>setBpp(+e.target.value||0.5)} />
        </label>
      </div>
      <div className="rounded-md bg-slate-50 p-4">
        <div>Max total pixels: <b>{maxPixels.toLocaleString()}</b></div>
        <div>Square guideline: <b>{side} × {side}px</b></div>
        <div className="text-sm text-gray-600">Lower quality or more compression → lower bpp.</div>
      </div>
    </div>
  );
}
