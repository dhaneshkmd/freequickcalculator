// app/calculators/bmi/page.tsx
import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "BMI Calculator | Free Quick Calculator",
  description:
    "Free BMI Calculator online. Check body mass index from height and weight with categories and examples.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/bmi" },
};

export default function BMICalculatorPage() {
  return (
    <CalculatorContent
      title="BMI (Body Mass Index) Calculator"
      intro={
        <>
          The BMI Calculator estimates body mass index using height and weight,
          a simple screening metric for underweight, normal, overweight, and obese ranges.
          It’s widely used for quick checks but isn’t a full health diagnosis.
        </>
      }
      ad={<AdSlot slot="2345678901" />} // replace with your slot id
      formula={
        <>
          BMI = weight(kg) ÷ [height(m)]<sup>2</sup> &nbsp;|&nbsp; BMI (US) = 703 × weight(lb) ÷ [height(in)]<sup>2</sup>
        </>
      }
      variables={[
        { symbol: "weight", meaning: "Body weight in kilograms (or pounds)" },
        { symbol: "height", meaning: "Body height in meters (or inches)" },
      ]}
      example={{
        description: <>Weight = 70 kg, Height = 1.75 m</>,
        result: <>BMI = 70 ÷ (1.75²) ≈ 22.86 (Normal)</>,
      }}
      useCases={[
        "Quick self-check against standard BMI categories",
        "Basic tracking for fitness or diet programs",
        "Educational demonstrations (schools, colleges)",
      ]}
      faqs={[
        { q: "Is BMI a medical diagnosis?", a: "No. It’s a screening tool. Body composition and health vary by individual." },
        { q: "Which units can I use?", a: "Metric (kg/cm) and US (lb/in) are supported." },
        { q: "What are common BMI ranges?", a: "Under 18.5: underweight · 18.5–24.9: normal · 25–29.9: overweight · 30+: obese" },
      ]}
      related={[
        { href: "/calculators/bmr", label: "BMR Calculator" },
        { href: "/calculators/body-fat", label: "Body Fat %" },
        { href: "/calculators/percentage", label: "Percentage Calculator" },
      ]}
      disclaimer={
        <>
          This tool is for <strong>educational purposes only</strong> and does not
          account for muscle mass, age, sex, or ethnicity. Consult a healthcare professional
          for personal guidance.
        </>
      }
    >
      {/* Your interactive BMI UI here */}
    </CalculatorContent>
  );
}
