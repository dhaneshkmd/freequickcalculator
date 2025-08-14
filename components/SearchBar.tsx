"use client";
export default function SearchBar({value,onChange,placeholder="Search calculators..."}:{value:string;onChange:(v:string)=>void;placeholder?:string;}){
  return (
    <div className="relative">
      <input className="w-full rounded-2xl border-gray-300 pl-10 pr-4 py-3" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} aria-label="Search calculators"/>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none">🔎</span>
    </div>
  );
}
