"use client";
import { useState } from "react";

function per100(price:number, grams:number){ return grams>0 ? (price/(grams/100)).toFixed(2) : "–"; }

export default function GrocerySwap(){
  const [aPrice,setAP]=useState(3.2);
  const [aG,setAG]=useState(500);
  const [bPrice,setBP]=useState(2.4);
  const [bG,setBG]=useState(400);

  const a = aG>0 ? aPrice/(aG/100) : Infinity;
  const b = bG>0 ? bPrice/(bG/100) : Infinity;
  const cheaper = a===b ? "Same" : (a<b ? "Brand A" : "Brand B");

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <label className="flex flex-col">A price
          <input className="input" type="number" step="0.01" value={aPrice} onChange={e=>setAP(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">A grams
          <input className="input" type="number" value={aG} onChange={e=>setAG(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">B price
          <input className="input" type="number" step="0.01" value={bPrice} onChange={e=>setBP(+e.target.value||0)} />
        </label>
        <label className="flex flex-col">B grams
          <input className="input" type="number" value={bG} onChange={e=>setBG(+e.target.value||0)} />
        </label>
      </div>
      <div className="rounded-md bg-slate-50 p-4">
        <div>A: ${per100(aPrice,aG)} / 100g &nbsp; • &nbsp; B: ${per100(bPrice,bG)} / 100g</div>
        <div className="font-semibold">Cheaper: {cheaper}</div>
      </div>
    </div>
  );
}
