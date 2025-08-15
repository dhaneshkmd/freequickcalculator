import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "../../../data/calculators";
import ComingSoon from "../../../components/ComingSoon";

// Existing calculators
import BMI from "../../../components/calculators/BMI";
import EMI from "../../../components/calculators/EMI";
import SIP from "../../../components/calculators/SIP";
import Age from "../../../components/calculators/Age";

// NEW calculators
import BMR from "../../../components/calculators/BMR";
import BodyFat from "../../../components/calculators/BodyFat";
import BreakEven from "../../../components/calculators/BreakEven";

type Props = { params: { slug: string } };

// (Optional) Only pre-render "ready" calculators
export function generateStaticParams() {
  return calculators
    .filter(c => c.status === "ready")
    .map(c => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return { title: "Calculator", description: "Calculator not found." };
  return {
    title: calc.name,
    description: calc.description,
    keywords: calc.keywords
  };
}

export default function CalculatorPage({ params }: Props) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) notFound();

  function render() {
    switch (calc!.componentId) {
      case "BMI":         return <BMI />;
      case "EMI":         return <EMI />;
      case "SIP":         return <SIP />;
      case "AGE":         return <Age />;
      case "BMR":         return <BMR />;           // NEW
      case "BODY_FAT":    return <BodyFat />;       // NEW
      case "BREAK_EVEN":  return <BreakEven />;     // NEW
      default:
        return (
          <ComingSoon
            title={`${calc!.name} — Coming Soon`}
            description={calc!.description}
          />
        );
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{calc!.name}</h1>
        {calc?.formulaNote && (
          <p className="text-sm text-gray-500">Formula: {calc.formulaNote}</p>
        )}
      </header>
      {render()}
    </div>
  );
}
