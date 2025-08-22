"use client";
import { useState } from "react";

const skinBases: Record<string, number> = {
  I: 90, II: 120, III: 160, IV: 220, V: 320, VI: 420 // base burn mins at UV=1 (conservative)
};

export default function UVExposure() {
  const [uv, setUv] = useState(8);
  const [skin, setSkin] = useState<keyof typeof skinBases>("III");
  const [spf, setSpf] = useState(30);

  const spfFactor = Math.max(1, Math.min(spf, 50)) * 0.8; // conservative
  const safeMins = Math.max(5, Math.round((skinBases[skin] * spfFactor) / Math.max(1, uv)));

  return (
    <div className="card space-y-4">
      <p className="text-sm text-gray-600">
        Approximate safe time before sunburn. Always prefer shade 10am–4pm. Values are conservative and not medical advice.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col">UV Index
          <input type="number" min={1} max={12} value={uv}
            onChange={e=>setUv(+e.target.value||1)} className="input" />
        </label>
        <label className="flex flex-col">Skin Type (I–VI)
          <select value={skin} onChange={e=>setSkin(e.target.value as any)} className="input">
            {Object.keys(skinBases).map(k=> <option key={k}>{k}</option>)}
          </select>
        </label>
        <label className="flex flex-col">SPF
          <input type="number" min={0} max={100} value={spf}
            onChange={e=>setSpf(+e.target.value||0)} className="input" />
        </label>
      </div>

      <div className="rounded-md bg-emerald-50 p-4">
        <div className="text-lg font-semibold">Safe outdoor time: {safeMins} min</div>
        <div className="text-sm text-gray-600">Reapply SPF every ~2 hours. Wear hat & sleeves.</div>
      </div>
    </div>
  );
}
