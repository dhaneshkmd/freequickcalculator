// app/calculators/emi/page.tsx
import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Loan EMI Calculator | Free Quick Calculator",
  description:
    "Free EMI Calculator online. Calculate monthly loan installments for home, car, or personal loans with formula, examples, and amortization basics.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/emi" },
  openGraph: {
    type: "website",
    title: "Loan EMI Calculator",
    description:
      "Estimate your EMI and total interest for home, car, or personal loans in India, UAE, and beyond.",
    url: "https://freequickcalculator.com/calculators/emi",
    siteName: "Free Quick Calculator",
  },
};

export default function EMICalculatorPage() {
  return (
    <CalculatorContent
      title="Loan EMI Calculator"
      intro={
        <>
          The EMI (Equated Monthly Installment) Calculator helps you estimate a
          fixed monthly repayment for a loan by combining principal and
          interest over your chosen tenure. It supports typical use cases like
          home, car, and personal loans across regions (e.g., India and UAE),
          making it easier to compare lenders and plan your budget.
        </>
      }
      ad={<AdSlot slot="1234567890" />} // replace with your slot id
      formula={
        <>
          EMI = (P × r × (1 + r)<sup>n</sup>) ÷ ((1 + r)<sup>n</sup> − 1)
        </>
      }
      variables={[
        { symbol: "P", meaning: "Loan principal" },
        { symbol: "r", meaning: "Monthly interest rate (annual rate ÷ 12)" },
        { symbol: "n", meaning: "Total number of monthly installments" },
      ]}
      example={{
        description: (
          <>
            Loan: ₹10,00,000 · Rate: 10% p.a. (r = 0.10 / 12 ≈ 0.008333) · Tenure: 60 months
          </>
        ),
        steps: (
          <ol>
            <li>
              (1 + r)<sup>n</sup> = (1.008333)<sup>60</sup> ≈ 1.6470
            </li>
            <li>
              Numerator = P × r × (1 + r)<sup>n</sup> = 10,00,000 × 0.008333 × 1.6470 ≈ 13,725.8
            </li>
            <li>
              Denominator = (1 + r)<sup>n</sup> − 1 = 1.6470 − 1 = 0.6470
            </li>
          </ol>
        ),
        result: <>EMI ≈ ₹21,247 per month</>,
      }}
      useCases={[
        "Compare car loan EMIs in India vs UAE",
        "Plan mortgage repayments and total interest outgo",
        "Understand principal vs interest composition over time",
      ]}
      faqs={[
        { q: "What is EMI?", a: "A fixed monthly payment that repays both principal and interest." },
        { q: "How can I reduce EMI?", a: "Prepay part of the loan, negotiate a lower rate, or extend the tenure." },
        { q: "Does EMI change over time?", a: "In fixed-rate loans, EMI is constant; in floating-rate loans, EMI or tenure can vary." },
      ]}
      related={[
        { href: "/calculators/compound-interest", label: "Compound Interest" },
        { href: "/calculators/percentage", label: "Percentage Calculator" },
        { href: "/calculators/sip", label: "SIP Calculator" },
      ]}
    >
      {/* Put your actual interactive calculator UI here (inputs, results, charts) */}
    </CalculatorContent>
  );
}
