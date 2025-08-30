import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";

export const metadata: Metadata = {
  title: "Percentage Calculator | Free Quick Calculator",
  description:
    "Free Percentage Calculator online. Solve percent increase/decrease, find what % of a number, and reverse percentages instantly.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/percentage" },
};

export default function PercentageCalculatorPage() {
  return (
    <CalculatorContent
      title="Percentage Calculator"
      intro={
        <>
          The Percentage Calculator helps with quick math like percent
          increase/decrease, what is X% of Y, and reverse percentage problems.
          Useful in shopping discounts, academic results, and quick financial
          checks.
        </>
      }
      formula={<>% = (part ÷ whole) × 100</>}
      example={{
        description: <>50 is what % of 200?</>,
        result: <>Answer: 25%</>,
      }}
      useCases={[
        "Find discounts quickly",
        "Check exam scores",
        "Finance and budgeting math",
      ]}
      faqs={[
        { q: "How do I calculate % increase?", a: "Subtract the old value from the new, divide by old value, ×100." },
        { q: "What is reverse percentage?", a: "It’s finding the base when a % and result are known." },
        { q: "Is 100% always the whole?", a: "Yes, by definition 100% equals the full amount." },
      ]}
      disclaimer="For quick math only. Verify results in formal financial or academic use."
    />
  );
}
