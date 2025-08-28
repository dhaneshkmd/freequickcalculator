// app/faq/page.tsx
import type { Metadata } from "next";

type QA = { q: string; a: string; };
const faqs: QA[] = [
  {
    q: "Is FreeQuickCalculator a free online calculator website?",
    a: "Yes — FreeQuickCalculator is a 100% free online calculator hub with no login or sign-up. You can use popular tools like the BMI Calculator, Loan EMI Calculator, Percentage Calculator, Age Calculator, Unit Converter, GST/VAT Calculator, SIP Calculator, and more from any device."
  },
  {
    q: "Are your results accurate and suitable for India, UAE, and global users?",
    a: "We implement standard, widely accepted formulas and test edge cases. Many tools include region-friendly options (e.g., INR/AED, GST/VAT). For mission-critical decisions (loans, taxes, healthcare), verify with a qualified professional."
  },
  {
    q: "BMI Calculator — how do I calculate Body Mass Index online?",
    a: "Open our BMI Calculator (/calculators/bmi) and enter height and weight (cm/in, kg/lb). It instantly shows BMI category (underweight/normal/overweight/obese) with tips. Works on mobile and desktop."
  },
  {
    q: "Loan EMI Calculator — how can I compute monthly EMI for home, car, or personal loans?",
    a: "Use the EMI Calculator (/calculators/emi). Enter principal, interest rate, and tenure to see EMI, total interest, and amortization. Helpful for mortgages in India and car loans in the UAE."
  },
  {
    q: "SIP & Compound Interest — how do I estimate SIP returns or compounding growth?",
    a: "Try the SIP Calculator (/calculators/sip) to project mutual fund SIP maturity amounts. For general compounding, use Compound Interest (/calculators/compound-interest) to compare annual, monthly, or daily compounding."
  },
  {
    q: "Percentage Calculator — increase, decrease, and difference online",
    a: "Our Percentage Calculator (/calculators/percentage) handles percent increase/decrease, what is X% of Y, and reverse percentage problems, ideal for discount math and quick finance homework."
  },
  {
    q: "Age Calculator by date of birth (DOB) — how to find exact age in years, months, days?",
    a: "Use the Age Calculator (/calculators/age). Enter your DOB to get age in years, months, days, plus upcoming birthdays — perfect for forms and KYC."
  },
  {
    q: "Unit Converter — cm to inches, kg to lbs, Celsius to Fahrenheit, and more",
    a: "Our Unit Converter (/calculators/unit-converter) converts length, weight, temperature, area, volume, and speed. Popular queries include cm→in, kg→lb, km→mile, and °C→°F."
  },
  {
    q: "GST/VAT Tax Calculator — India GST and UAE VAT",
    a: "Open GST/VAT Calculator (/calculators/gst-vat) to add or remove GST (India) or VAT (UAE) from prices. See tax amount, net price, and gross price instantly."
  },
  {
    q: "Discount & Sale Price Calculator — how to find final price after discount?",
    a: "Use Discount Calculator (/calculators/discount) to compute sale price, savings amount, stacked discounts, and effective percentage off."
  },
  {
    q: "Date Calculator — days between dates, due date, workday math",
    a: "The Date Calculator (/calculators/date) finds days between dates, adds/subtracts days, and can exclude weekends for workday counts."
  },
  {
    q: "GPA/CGPA Calculator — convert percentage to GPA and vice versa",
    a: "See GPA tools (/calculators/gpa) for GPA/CGPA calculations and rough percentage conversions (note: scales vary by institution; confirm with your university)."
  },
  {
    q: "Currency & Mortgage—do you offer currency conversion or mortgage schedules?",
    a: "For mortgages, our EMI Calculator shows an amortization schedule. If you need currency conversion, we’ll link to reliable FX sources and display inputs in INR/AED/USD where helpful."
  },
  {
    q: "Mobile-friendly calculators — can I use them on phones and tablets?",
    a: "Yes. Pages are responsive and fast, so you can run any free online calculator on iOS/Android without installing apps."
  },
  {
    q: "SEO keywords I might search: online EMI calculator, free BMI calculator, percentage calculator, unit converter, age calculator, GST calculator, VAT calculator — do you support all?",
    a: "Yes. FreeQuickCalculator is optimized for popular searches like “online EMI calculator India”, “BMI calculator kg cm”, “percentage increase calculator”, “age calculator DOB”, “GST calculator 18%”, “UAE VAT 5% calculator”, and more."
  },
  {
    q: "Can I request a new calculator or improvement?",
    a: "Absolutely. Send your idea via the Contact page (/contact). We prioritize high-demand calculators (finance, math, health, date/time, conversion)."
  },
  {
    q: "Do you store my inputs or personal data?",
    a: "No personal inputs are stored. Anonymous analytics may measure usage to improve speed and reliability. See Privacy (/privacy) for details."
  },
  {
    q: "How fast are calculations and do pages load quickly?",
    a: "We optimize for speed: lightweight UI, minimal scripts, and edge caching where possible — so calculations feel instant even on mobile data."
  },
];

export const metadata: Metadata = {
  title: "FAQ — FreeQuickCalculator (Free Online Calculators: EMI, BMI, Percentage, Age, GST/VAT, Unit Converter)",
  description:
    "FreeQuickCalculator FAQ: free online EMI calculator, BMI calculator, percentage increase/decrease, age by DOB, GST/VAT, SIP, compound interest, discount, date difference, unit converter, GPA & more.",
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">
        FAQ — Free Online Calculators (EMI, BMI, Percentage, Age, GST/VAT)
      </h1>
      <p className="text-gray-600 mb-8">
        Quick answers about our free online calculators for finance, math, health, dates, and conversions.
      </p>

      {/* JSON-LD for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="space-y-3">
        {faqs.map(({ q, a }, i) => (
          <details key={i} className="group rounded-2xl border p-4 hover:border-gray-400">
            <summary className="cursor-pointer list-none select-none font-semibold">{q}</summary>
            <div className="mt-2 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: linkify(a) }} />
          </details>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-10">
        Didn’t find what you need? <a href="/contact" className="underline">Request a calculator</a>.
      </p>
    </main>
  );
}

// Simple linkifier for internal paths used above
function linkify(text: string) {
  return text.replace(/\/calculators\/[a-z0-9-]+|\/(contact|privacy)/gi, (m) => `<a class="underline" href="${m}">${m}</a>`);
}
