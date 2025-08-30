import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";

export const metadata: Metadata = {
  title: "GST & VAT Calculator | Free Quick Calculator",
  description:
    "Free GST and VAT Calculator. Add/remove tax for India GST or UAE VAT with instant results.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/gst-vat" },
};

export default function GSTVATCalculatorPage() {
  return (
    <CalculatorContent
      title="GST & VAT Calculator"
      intro={
        <>
          The GST/VAT Calculator helps you quickly add or remove tax from prices.
          Supports India’s Goods and Services Tax (GST) and UAE’s Value Added Tax
          (VAT). Useful for invoices, shopping, and business.
        </>
      }
      formula={<>Price with GST = Base Price + (Base × GST%)</>}
      example={{
        description: <>Base = ₹1000, GST = 18%</>,
        result: <>Gross Price = ₹1180 (Tax = ₹180)</>,
      }}
      useCases={[
        "Quickly check invoice taxes",
        "Verify e-commerce price breakdown",
        "Business calculations",
      ]}
      faqs={[
        { q: "How do I remove GST?", a: "Divide gross price by (1 + GST%)." },
        { q: "Do you support UAE VAT?", a: "Yes, the calculator works for 5% VAT." },
        { q: "Can I change tax %?", a: "Yes, input custom GST/VAT rates." },
      ]}
      disclaimer="Informational only. Verify calculations with official tax rules."
    />
  );
}
