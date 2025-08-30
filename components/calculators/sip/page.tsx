import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";

export const metadata: Metadata = {
  title: "SIP Calculator | Free Quick Calculator",
  description:
    "Free SIP Calculator. Estimate systematic investment plan maturity values with compounding growth examples.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/sip" },
};

export default function SIPCalculatorPage() {
  return (
    <CalculatorContent
      title="SIP (Systematic Investment Plan) Calculator"
      intro={
        <>
          SIP is a disciplined way to invest a fixed amount regularly in mutual
          funds. This calculator helps project maturity values using compounding,
          assisting in retirement or education planning.
        </>
      }
      formula={
        <>
          FV = P × [( (1 + r/n)<sup>n×t</sup> − 1 ) ÷ (r/n)] × (1 + r/n)
        </>
      }
      variables={[
        { symbol: "P", meaning: "Installment amount" },
        { symbol: "r", meaning: "Annual return rate" },
        { symbol: "n", meaning: "Compounding frequency" },
        { symbol: "t", meaning: "Number of years" },
      ]}
      example={{
        description: <>₹5,000/month, r = 12% p.a., t = 10 years</>,
        result: <>Future Value ≈ ₹11.6 lakhs</>,
      }}
      useCases={["Retirement planning", "Child education fund", "Wealth creation"]}
      faqs={[
        { q: "Are SIP returns guaranteed?", a: "No, they depend on market performance." },
        { q: "Can I change SIP amount later?", a: "Yes, most funds allow it." },
        { q: "What if markets fall?", a: "Returns may vary; SIP helps average cost over time." },
      ]}
      disclaimer="Informational only. Investments are subject to market risks."
    />
  );
}
