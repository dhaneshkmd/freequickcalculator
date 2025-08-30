import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";

export const metadata: Metadata = {
  title: "GPA & CGPA Calculator | Free Quick Calculator",
  description:
    "Free GPA & CGPA Calculator. Convert percentage to GPA, calculate CGPA, and understand grading scales.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/gpa" },
};

export default function GPACalculatorPage() {
  return (
    <CalculatorContent
      title="GPA & CGPA Calculator"
      intro={
        <>
          The GPA & CGPA Calculator helps students convert percentages to GPA
          scales and estimate cumulative GPAs. Useful for applications abroad
          and resumes. Note that scales vary by university.
        </>
      }
      formula={<>GPA ≈ % ÷ 9.5 (approximate; varies by institution)</>}
      example={{
        description: <>75% ≈ GPA 7.9</>,
        result: <>Result: GPA ≈ 7.9 (approx)</>,
      }}
      useCases={["Student GPA conversion", "University admissions", "Resume preparation"]}
      faqs={[
        { q: "Are conversions exact?", a: "No, they’re approximate and vary by institution." },
        { q: "Do scales differ?", a: "Yes, US, UK, and India use different GPA scales." },
        { q: "Can I convert GPA to %?", a: "Yes, reverse calculation is possible but approximate." },
      ]}
      disclaimer="Informational only. Always confirm with your university’s grading policy."
    />
  );
}
