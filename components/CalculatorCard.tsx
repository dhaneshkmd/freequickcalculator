import Link from "next/link";
import type { Calculator } from "../data/calculators";
function emoji(cat:Calculator["category"]){return {Finance:"💰",Health:"💪",Utilities:"🧮",Conversions:"🔁",Tax:"🧾","Dates & Time":"🗓️",Lifestyle:"🎯"}[cat]||"🧠";}
export default function CalculatorCard({calc}:{calc:Calculator}){
  return (
    <Link href={`/calculator/${calc.slug}`} className="card block transition hover:shadow-md">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">{emoji(calc.category)}</span>
        <h3 className="text-lg font-semibold">{calc.name}</h3>
      </div>
      <p className="mb-3 text-sm text-gray-600">{calc.description}</p>
      <div className="flex items-center gap-2">
        <span className="badge bg-gray-100 text-gray-700">{calc.category}</span>
        {calc.status==="ready"?<span className="badge bg-green-100 text-green-700">Ready</span>:<span className="badge bg-yellow-100 text-yellow-700">Planned</span>}
      </div>
    </Link>
  );
}
