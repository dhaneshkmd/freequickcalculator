"use client";
import { useMemo, useState } from "react";
import type { Calculator } from "../data/calculators";
import CalculatorCard from "./CalculatorCard";
import SearchBar from "./SearchBar";
import CategoryPills from "./CategoryPills";

export default function SearchGrid({calculators}:{calculators:Calculator[]}){
  const categories=useMemo(()=>Array.from(new Set(calculators.map(c=>c.category))).sort(),[calculators]);
  const [query,setQuery]=useState(""); const [selected,setSelected]=useState<Set<string>>(new Set());
  function toggle(c:string){ setSelected(p=>{const n=new Set(p); n.has(c)?n.delete(c):n.add(c); return n;});}
  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    const byQ=(c:Calculator)=>!q||c.name.toLowerCase().includes(q)||c.description.toLowerCase().includes(q)||c.category.toLowerCase().includes(q)||c.keywords.some(k=>k.toLowerCase().includes(q));
    const byCat=(c:Calculator)=>selected.size===0||selected.has(c.category);
    return calculators.filter(c=>byQ(c)&&byCat(c)).sort((a,b)=>a.status===b.status? a.name.localeCompare(b.name) : a.status==="ready"?-1:1);
  },[calculators,query,selected]);

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery}/>
      <CategoryPills categories={categories} selected={selected} onToggle={toggle}/>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c=><CalculatorCard key={c.slug} calc={c}/>)}
      </div>
      {filtered.length===0 && <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">No calculators match your search.</div>}
    </div>
  );
}
