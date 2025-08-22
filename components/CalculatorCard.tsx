// components/CalculatorCard.tsx
import Link from "next/link";
import type { Calculator } from "../data/calculators";

function emoji(cat: Calculator["category"]) {
  const map: Partial<Record<Calculator["category"], string>> = {
    Finance: "💰",
    Health: "💪",
    Utilities: "🧮",
    Conversions: "🔁",
    Tax: "🧾",
    "Dates & Time": "🗓️",
    Lifestyle: "🎯",
    // new categories you added
    Travel: "🧭",
    Photography: "📸",
    Work: "💼",
  };
  return map[cat] ?? "🧠";
}

export default function CalculatorCard({ calc }: { calc: Calculator }) {
  // Treat as ready if it has a component OR status is 'ready'
  const isReady = calc.status === "ready" || calc.componentId !== null;

  return (
    <Link
      href={`/calculator/${calc.slug}`}
      className="card block transition hover:shadow-md"
      aria-disabled={!isReady}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">{emoji(calc.category)}</span>
        <h3 className="text-lg font-semibold">{calc.name}</h3>
      </div>

      <p className="mb-3 text-sm text-gray-600">{calc.description}</p>

      <div className="flex items-center gap-2">
        <span className="badge bg-gray-100 text-gray-700">{calc.category}</span>
        {isReady ? (
          <span className="badge bg-green-100 text-green-700">Ready</span>
        ) : (
          <span className="badge bg-yellow-100 text-yellow-700">Planned</span>
        )}
      </div>
    </Link>
  );
}
