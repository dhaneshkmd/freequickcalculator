// app/(legal)/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

// Ensure this page is pre-rendered at build time
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Free Quick Calculator — our mission, values, and how to reach us.",
  alternates: { canonical: "https://freequickcalculator.com/about" },
  openGraph: {
    type: "website",
    title: "About Us | Free Quick Calculator",
    description:
      "Free Quick Calculator provides fast, accurate tools for finance, health, and everyday math. Learn about our mission and contact us.",
    url: "https://freequickcalculator.com/about",
    siteName: "Free Quick Calculator",
  },
  twitter: {
    card: "summary",
    title: "About Us | Free Quick Calculator",
    description:
      "Discover our mission to make everyday calculations simple and accessible to all.",
  },
};

export default function AboutPage() {
  return (
    <section className="prose prose-slate dark:prose-invert max-w-none">
      <h1>About Free Quick Calculator</h1>
      <p>
        Free Quick Calculator is a fast, mobile-friendly hub of everyday
        calculators across <strong>finance</strong>, <strong>health</strong>,
        and <strong>utility conversions</strong>. Our tools run client-side,
        require no sign-ups, and are designed to save you time.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our goal is to make calculations simple, accurate, and accessible to
        everyone — whether you’re a student, professional, or just solving
        everyday problems. We believe in transparency, speed, and privacy.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>
          <strong>Finance tools:</strong> EMI, SIP, Compound Interest,
          Break-even analysis, and more
        </li>
        <li>
          <strong>Health tools:</strong> BMI, BMR, Body Fat %, Daily Calorie
          needs
        </li>
        <li>
          <strong>Utilities &amp; Conversions:</strong> Percentage, discount,
          date difference, and quick unit conversions
        </li>
        <li>
          <strong>Simple experience:</strong> Searchable hub with a clean,
          lightweight design
        </li>
      </ul>

      <h2>Privacy &amp; Consent</h2>
      <p>
        We respect user privacy. Ads and analytics remain disabled until consent
        is given via our Google-certified banner (CookieYes). See our{" "}
        <Link href="/privacy">Privacy Policy</Link> for full details.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Calculators are provided for <strong>informational purposes only</strong>.
        We strive for accuracy, but results should not be treated as financial,
        medical, or legal advice. Please consult professionals for critical
        decisions.
      </p>

      <h2>Contact Us</h2>
      <p>
        Got feedback, feature requests, or partnership ideas? Reach us at{" "}
        <a href="mailto:dhaneshkmd82@gmail.com">dhaneshkmd82@gmail.com</a>.
      </p>
    </section>
  );
}
