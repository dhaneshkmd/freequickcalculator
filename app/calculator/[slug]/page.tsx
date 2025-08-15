import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "../../../data/calculators";
import ComingSoon from "../../../components/ComingSoon";
import BMI from "../../../components/calculators/BMI";
import EMI from "../../../components/calculators/EMI";
import SIP from "../../../components/calculators/SIP";
import Age from "../../../components/calculators/Age";
type Props = { params: { slug: string } };

export function generateStaticParams() {
  return calculators.map(c => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return { title: "Calculator", description: "Calculator not found." };
  return { title: calc.name, description: calc.description, keywords: calc.keywords };
}

export default function CalculatorPage({ params }: Props) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) notFound();

  function render() {
    switch (calc!.componentId) {
      case "BMI": return <BMI />;
      case "EMI": return <EMI />;
      case "SIP": return <SIP />;
      case 'AGE': return <Age />;
      default: return <ComingSoon title={`${calc!.name} — Coming Soon`} description={calc!.description} />;
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{calc!.name}</h1>
        {calc?.formulaNote && <p className="text-sm text-gray-500">Formula: {calc.formulaNote}</p>}
      </header>
      {render()}
    </div>
  );
}
