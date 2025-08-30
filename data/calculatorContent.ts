// data/calculatorContent.ts
import type { CalculatorContentProps } from "@/components/CalculatorContent";

/**
 * Long-form content for calculators (intro, formula, example, FAQs, etc.)
 * Keyed by slug. Keep it empty for now; pages will gracefully fall back.
 */
export const calculatorContent: Record<string, CalculatorContentProps> = {
  // Example you can keep or delete:
  // emi: {
  //   title: "Loan EMI Calculator",
  //   intro: "Estimate your monthly EMI…",
  //   formula: <>EMI = (P × r × (1 + r)<sup>n</sup>) ÷ ((1 + r)<sup>n</sup> − 1)</>,
  //   example: { description: <>₹10,00,000 @ 10% for 60 months</>, result: <>₹21,247 / month</> },
  //   faqs: [{ q: "What is EMI?", a: "…" }],
  // },
};
