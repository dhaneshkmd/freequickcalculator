// app/(legal)/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

// Ensure this page is pre-rendered at build time
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Free Quick Calculator is, our mission, and how to reach us.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About | Free Quick Calculator",
    description:
      "What Free Quick Calculator is, our mission, and how to reach us.",
    url: "https://freequickcalculator.com/about",
    siteName: "Free Quick Calculator",
  },
};

export default function AboutPage() {
  return (
    <section className="prose prose-slate max-w-none">
      <h1>About Free Quick Calculator</h1>
      <p>
        Free Quick Calculator is a fast, mobile-first hub of everyday calculators
        across finance, health, utilities and conversions. Everything runs
        client-side — no sign-ups or downloads.
      </p>

      <h2>What we offer</h2>
      <ul>
        <li>Finance tools (EMI, SIP, Compound Interest, Break-even, etc.)</li>
        <li>Health tools (BMI, BMR, Body Fat %, Daily Calories, etc.)</li>
        <li>Utilities &amp; conversions (discount, percentage, date diff, and more)</li>
        <li>Searchable hub with a clean, ad-light experience</li>
      </ul>

      <h2>Privacy &amp; consent</h2>
      <p>
        We use a Google-certified consent banner (CookieYes) in EEA/UK/CH and
        keep ads/analytics off until you choose. See our{" "}
        <Link href="/privacy">Privacy Policy</Link> for details.
      </p>

      <h2>Contact</h2>
      <p>
        Feedback or ideas? Email us at{" "}
        <a href="mailto:dhaneshkmd82@gmail.com">dhaneshkmd82@gmail.com</a>.
      </p>
    </section>
  );
}
