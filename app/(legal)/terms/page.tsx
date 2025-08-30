// app/(legal)/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Disclaimer | Free Quick Calculator",
  description:
    "Terms of use and disclaimer for Free Quick Calculator. Educational purposes only.",
  alternates: { canonical: "https://freequickcalculator.com/terms" },
  openGraph: {
    type: "website",
    title: "Terms & Disclaimer | Free Quick Calculator",
    description:
      "Understand the terms of use, disclaimers, and limitations of Free Quick Calculator.",
    url: "https://freequickcalculator.com/terms",
    siteName: "Free Quick Calculator",
  },
  twitter: {
    card: "summary",
    title: "Terms & Disclaimer | Free Quick Calculator",
    description:
      "Terms of use and disclaimer for Free Quick Calculator. Educational purposes only.",
  },
};

export default function TermsPage() {
  const lastUpdated = new Date().toISOString().split("T")[0];

  return (
    <main className="prose prose-slate dark:prose-invert max-w-3xl mx-auto py-10">
      <h1>Terms &amp; Disclaimer</h1>
      <p>
        <em>Last updated: {lastUpdated}</em>
      </p>

      <h2>1. Use of the Site</h2>
      <p>
        By accessing or using Free Quick Calculator, you agree not to
        reverse-engineer, scrape, or misuse the service. We may update, modify,
        or remove features at any time without notice.
      </p>

      <h2>2. Educational Purpose Only</h2>
      <p>
        All calculators and tools are provided for{" "}
        <strong>educational and informational purposes only</strong>. Results
        may not reflect your specific situation. For financial, medical, tax, or
        legal decisions, always consult a licensed professional.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All original text, design, and code on this site are the property of
        Free Quick Calculator. Unauthorized reproduction or redistribution is
        prohibited.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        We make no guarantees of accuracy or fitness for any purpose. By using
        this site, you agree that we are not liable for any direct or indirect
        damages, losses, or consequences arising from its use.
      </p>

      <h2>5. Advertising & External Links</h2>
      <p>
        We display third-party advertising (Google AdSense). We are not
        responsible for the content, products, or services offered by third-party
        advertisers or linked websites.
      </p>

      <h2>6. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the site
        after changes are posted constitutes acceptance of the new terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        For questions regarding these terms, contact us at{" "}
        <a href="mailto:dhaneshkmd82@gmail.com">dhaneshkmd82@gmail.com</a>.
      </p>
    </main>
  );
}
