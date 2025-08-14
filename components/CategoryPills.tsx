"use client";
export default function CategoryPills({categories,selected,onToggle}:{categories:string[];selected:Set<string>;onToggle:(c:string)=>void;}){
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat=>{
        const active=selected.has(cat);
        return (
          <button key={cat} type="button" onClick={()=>onToggle(cat)}
            className={`rounded-full px-3 py-1 text-sm border transition ${active?"border-blue-600 bg-blue-50 text-blue-700":"border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`} aria-pressed={active}>
            {cat}
          </button>
        );
      })}
    </div>
  );
}
