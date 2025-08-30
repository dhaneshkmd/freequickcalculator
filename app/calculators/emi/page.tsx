import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Loan EMI Calculator | Free Quick Calculator",
  description:
    "Free EMI Calculator online. Calculate monthly loan installments for home, car, or personal loans with formula, worked examples, and amortization basics.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/emi" },
};

export default function EMICalculatorPage() {
  return (
    <CalculatorContent
      title="Loan EMI Calculator"
      intro={
        <>
          The EMI (Equated Monthly Installment) Calculator helps you estimate a
          fixed monthly repayment for a loan. It combines principal and interest
          over your chosen tenure, making it easier to compare lenders and plan
          your budget. This tool is useful for home, car, or personal loans in
          India, UAE, and globally.
        </>
      }
      ad={<AdSlot slot="1234567890" />}
      formula={
        <>
          EMI = (P × r × (1 + r)<sup>n</sup>) ÷ ((1 + r)<sup>n</sup> − 1)
        </>
      }
      variables={[
        { symbol: "P", meaning: "Loan principal" },
        { symbol: "r", meaning: "Monthly interest rate (annual ÷ 12)" },
        { symbol: "n", meaning: "Number of monthly installments" },
      ]}
      example={{
        description: <>Loan = ₹10,00,000 · Rate = 10% p.a. · Tenure = 60 months</>,
        result: <>EMI ≈ ₹21,247 per month</>,
      }}
      useCases={[
        "Compare car loan EMIs",
        "Plan mortgage repayments",
        "Understand interest vs principal breakdown",
      ]}
      faqs={[
        { q: "What is EMI?", a: "A fixed monthly payment covering both principal and interest." },
        { q: "How to reduce EMI?", a: "Prepay part of the loan, negotiate lower rates, or extend tenure." },
        { q: "Does EMI change?", a: "Fixed-rate loans stay constant, floating rates may vary." },
      ]}
      disclaimer="This calculator is for educational purposes only. Verify loan terms with your bank."
    />
  );
}
