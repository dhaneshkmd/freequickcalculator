import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "BMI Calculator | Free Quick Calculator",
  description:
    "Free BMI Calculator online. Calculate Body Mass Index from height and weight with instant categories and results.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/bmi" },
};

export default function BMICalculatorPage() {
  return (
    <CalculatorContent
      title="BMI (Body Mass Index) Calculator"
      intro={
        <>
          The BMI Calculator estimates body mass index using height and weight.
          It helps identify underweight, normal, overweight, and obese categories.
          It’s widely used as a quick screening tool but is not a substitute for
          professional medical advice.
        </>
      }
      ad={<AdSlot slot="2345678901" />}
      formula={
        <>
          BMI = weight(kg) ÷ [height(m)]<sup>2</sup> | BMI = 703 × weight(lb) ÷ [height(in)]<sup>2</sup>
        </>
      }
      variables={[
        { symbol: "weight", meaning: "Weight in kilograms or pounds" },
        { symbol: "height", meaning: "Height in meters or inches" },
      ]}
      example={{
        description: <>Weight = 70 kg, Height = 1.75 m</>,
        result: <>BMI ≈ 22.86 (Normal)</>,
      }}
      useCases={["Quick self-check", "Fitness/diet tracking", "Education/schools"]}
      faqs={[
        { q: "Is BMI accurate?", a: "It’s a simple screening tool, not a medical diagnosis." },
        { q: "What are BMI ranges?", a: "Under 18.5: underweight, 18.5–24.9: normal, 25–29.9: overweight, 30+: obese." },
        { q: "Can I use lbs/inch?", a: "Yes, both metric and US units are supported." },
      ]}
      disclaimer="Informational only. Consult a doctor for personal health guidance."
    />
  );
}
