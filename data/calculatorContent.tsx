// data/calculatorContent.ts
import type { CalculatorContentProps } from "@/components/CalculatorContent";

/**
 * Long-form content for calculators (intro, formula, example, FAQs, etc.)
 * Keyed by slug (matching calculators[].slug).
 */
export const calculatorContent: Record<string, CalculatorContentProps> = {
  emi: {
    title: "Loan EMI Calculator",
    intro:
      "The Loan EMI (Equated Monthly Installment) Calculator helps you estimate a fixed monthly repayment amount for loans. It combines principal and interest over your chosen tenure, making it easier to compare lenders and plan your finances. Useful for home, car, or personal loans in India, UAE, and globally.",
    formula: (
      <>
        EMI = (P × r × (1 + r)<sup>n</sup>) ÷ ((1 + r)<sup>n</sup> − 1)
      </>
    ),
    variables: [
      { symbol: "P", meaning: "Loan principal" },
      { symbol: "r", meaning: "Monthly interest rate (annual ÷ 12)" },
      { symbol: "n", meaning: "Number of monthly installments" },
    ],
    example: {
      description: "Loan = ₹10,00,000 · Rate = 10% p.a. · Tenure = 60 months",
      result: "EMI ≈ ₹21,247 per month",
    },
    useCases: [
      "Compare car loan EMIs",
      "Plan mortgage repayments",
      "Understand principal vs interest split",
    ],
    faqs: [
      { q: "What is EMI?", a: "A fixed monthly payment covering both principal and interest." },
      { q: "How to reduce EMI?", a: "Prepay part of the loan, negotiate a lower rate, or extend the tenure." },
      { q: "Does EMI change?", a: "Fixed-rate loans stay constant; floating-rate loans may vary." },
    ],
    disclaimer:
      "This calculator is for educational purposes only. Verify loan terms with your bank.",
  },

  bmi: {
    title: "BMI (Body Mass Index) Calculator",
    intro:
      "The BMI Calculator estimates body mass index using height and weight. It helps identify underweight, normal, overweight, and obese categories. Widely used as a quick screening tool but not a substitute for professional medical advice.",
    formula: (
      <>
        BMI = weight(kg) ÷ [height(m)]<sup>2</sup> | BMI = 703 × weight(lb) ÷ [height(in)]<sup>2</sup>
      </>
    ),
    variables: [
      { symbol: "weight", meaning: "Body weight in kilograms or pounds" },
      { symbol: "height", meaning: "Body height in meters or inches" },
    ],
    example: {
      description: "Weight = 70 kg, Height = 1.75 m",
      result: "BMI ≈ 22.86 (Normal)",
    },
    useCases: [
      "Quick self-check",
      "Fitness/diet tracking",
      "Education/schools",
    ],
    faqs: [
      { q: "Is BMI a diagnosis?", a: "No. It’s a screening tool only." },
      { q: "What are BMI ranges?", a: "Under 18.5, 18.5–24.9, 25–29.9, 30+." },
      { q: "Metric & US units?", a: "Yes, kg/cm and lb/in are supported." },
    ],
    disclaimer:
      "Informational only. Consult a doctor for personal health guidance.",
  },

  sip: {
    title: "SIP (Systematic Investment Plan) Calculator",
    intro:
      "SIP is a disciplined way to invest a fixed amount regularly in mutual funds. This calculator projects maturity values using compounding, helping plan long-term goals like retirement or education.",
    formula: (
      <>
        FV = P × [( (1 + r/n)<sup>n×t</sup> − 1 ) ÷ (r/n)] × (1 + r/n)
      </>
    ),
    variables: [
      { symbol: "P", meaning: "Installment amount" },
      { symbol: "r", meaning: "Annual return rate" },
      { symbol: "n", meaning: "Compounding frequency" },
      { symbol: "t", meaning: "Number of years" },
    ],
    example: {
      description: "₹5,000/month, r = 12% p.a., t = 10 years",
      result: "Future Value ≈ ₹11.6 lakhs",
    },
    useCases: [
      "Retirement planning",
      "Child education fund",
      "Wealth creation",
    ],
    faqs: [
      { q: "Are SIP returns guaranteed?", a: "No. Returns depend on market performance." },
      { q: "Change SIP amount later?", a: "Usually yes; check with your fund." },
      { q: "What if markets fall?", a: "SIPs average cost over time; returns may vary." },
    ],
    disclaimer: "Informational only. Investments are subject to market risks.",
  },
};
