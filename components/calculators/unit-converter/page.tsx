import type { Metadata } from "next";
import CalculatorContent from "@/components/CalculatorContent";

export const metadata: Metadata = {
  title: "Unit Converter | Free Quick Calculator",
  description:
    "Free Unit Converter. Convert length, weight, temperature, speed, and more instantly online.",
  alternates: { canonical: "https://freequickcalculator.com/calculators/unit-converter" },
};

export default function UnitConverterPage() {
  return (
    <CalculatorContent
      title="Unit Converter"
      intro={
        <>
          The Unit Converter converts common measures like length, weight,
          temperature, area, and speed. Ideal for students, engineers, and
          everyday users.
        </>
      }
      formula={<>Conversion depends on factor (e.g., 1 in = 2.54 cm)</>}
      example={{
        description: <>10 cm → ? inches</>,
        result: <>Answer: 3.94 in</>,
      }}
      useCases={["Students and academics", "Engineering and science", "Daily life conversions"]}
      faqs={[
        { q: "How accurate are results?", a: "We use standard conversion constants." },
        { q: "Do you cover all units?", a: "We focus on the most used everyday units." },
        { q: "Do you support currency?", a: "No, for currency use dedicated FX tools." },
      ]}
      disclaimer="For educational use. Verify conversions for official/scientific purposes."
    />
  );
}
