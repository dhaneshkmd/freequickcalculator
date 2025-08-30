import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";

export const metadata: Metadata = {
  title: "Age Calculator | Free Quick Calculator",
  description:
    "Free Age Calculator. Calculate exact age in years, months, and days from DOB with upcoming birthday info.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/age" },
};

export default function AgeCalculatorPage() {
  return (
    <CalculatorContent
      title="Age Calculator"
      intro={
        <>
          The Age Calculator computes exact age from your date of birth in
          years, months, and days. It also shows upcoming birthdays. Commonly
          used for forms, KYC, and official purposes.
        </>
      }
      formula={<>Age = Current Date − Date of Birth</>}
      example={{
        description: <>DOB = 01-Jan-2000, Today = 01-Mar-2025</>,
        result: <>Age = 25 years, 2 months</>,
      }}
      useCases={[
        "KYC forms",
        "Passport or ID verification",
        "School or college registration",
      ]}
      faqs={[
        { q: "Can I calculate exact age to the day?", a: "Yes, in years, months, and days." },
        { q: "Does it show next birthday?", a: "Yes, it highlights upcoming birthdays." },
        { q: "Do you store my DOB?", a: "No, all calculations run locally in your browser." },
      ]}
      disclaimer="Informational only. For legal/official purposes, always confirm with government-issued records."
    />
  );
}
