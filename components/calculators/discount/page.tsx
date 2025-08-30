import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";

export const metadata: Metadata = {
  title: "Discount Calculator | Free Quick Calculator",
  description:
    "Free Discount Calculator. Find final price, savings, and effective % off with single or stacked discounts.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/discount" },
};

export default function DiscountCalculatorPage() {
  return (
    <CalculatorContent
      title="Discount Calculator"
      intro={
        <>
          The Discount Calculator computes the final price after applying one or
          more discounts. It also shows savings and effective percent off.
          Useful for shopping sales and e-commerce.
        </>
      }
      formula={<>Final Price = Original − (Original × Discount%)</>}
      example={{
        description: <>Original = ₹2000, Discount = 25%</>,
        result: <>Final Price = ₹1500 (Savings ₹500)</>,
      }}
      useCases={["Shopping sales", "E-commerce offers", "Finance deals"]}
      faqs={[
        { q: "How do I calculate stacked discounts?", a: "Apply each discount sequentially, not additively." },
        { q: "What is effective % off?", a: "The total reduction after multiple discounts." },
        { q: "Can I reverse-calc the original price?", a: "Yes, input final price and discount to back-calc." },
      ]}
      disclaimer="Informational only. Confirm prices with store invoices."
    />
  );
}
