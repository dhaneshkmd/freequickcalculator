import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";

export const metadata: Metadata = {
  title: "Date Calculator | Free Quick Calculator",
  description:
    "Free Date Calculator. Find days between dates, add/subtract days, and calculate workdays excluding weekends.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/date" },
};

export default function DateCalculatorPage() {
  return (
    <CalculatorContent
      title="Date Calculator"
      intro={
        <>
          The Date Calculator helps you find the number of days between two
          dates, add or subtract days, and compute workdays excluding weekends.
          Ideal for due dates, projects, and travel planning.
        </>
      }
      formula={<>Days = End Date − Start Date</>}
      example={{
        description: <>01-Jan-2025 to 10-Jan-2025</>,
        result: <>9 days</>,
      }}
      useCases={["Due dates", "Workday math", "Travel planning"]}
      faqs={[
        { q: "Can I exclude weekends?", a: "Yes, choose workday mode." },
        { q: "Can I add months?", a: "Yes, select add months/years option." },
        { q: "Is timezone supported?", a: "Dates follow local browser timezone." },
      ]}
      disclaimer="Informational only. Verify dates with official calendars."
    />
  );
}
