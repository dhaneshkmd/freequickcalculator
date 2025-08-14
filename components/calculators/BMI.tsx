"use client";
import { useMemo, useState } from "react";
import { bmiCategory, bmiValue } from "../../lib/math";
import { formatNumber, parseSafeNumber } from "../../lib/format";

export default function BMI(){
  const [heightCm,setHeightCm]=useState("170");
  const [weightKg,setWeightKg]=useState("65");
  const {bmi,category}=useMemo(()=>{ const v=bmiValue(parseSafeNumber(weightKg), parseSafeNumber(heightCm)); return {bmi:v, category:bmiCategory(v)}; },[heightCm,weightKg]);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="card space-y-3">
        <div><label>Height (cm)</label><input type="number" value={heightCm} onChange={e=>setHeightCm(e.target.value)} /></div>
        <div><label>Weight (kg)</label><input type="number" value={weightKg} onChange={e=>setWeightKg(e.target.value)} /></div>
      </div>
      <div className="card flex flex-col items-center justify-center gap-2">
        <div className="text-sm text-gray-500">Your BMI</div>
        <div className="text-4xl font-bold">{formatNumber(bmi,1)}</div>
        <Badge category={category}/>
        <p className="mt-2 text-xs text-gray-500">BMI: &lt;18.5 Underweight • 18.5–24.9 Normal • 25–29.9 Overweight • ≥30 Obesity</p>
      </div>
    </div>
  );
}
function Badge({category}:{category:string}){
  const c=(bg:string,t:string)=>`badge ${bg} ${t}`;
  return category==="Underweight"?<span className={c("bg-yellow-100","text-yellow-700")}>Underweight</span>:
         category==="Normal"?     <span className={c("bg-green-100","text-green-700")}>Normal</span>:
         category==="Overweight"? <span className={c("bg-orange-100","text-orange-700")}>Overweight</span>:
         category==="Obesity"?    <span className={c("bg-red-100","text-red-700")}>Obesity</span>:
                                   <span className="badge bg-gray-100 text-gray-700">—</span>;
}
