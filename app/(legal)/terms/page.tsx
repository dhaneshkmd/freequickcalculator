import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Disclaimer | Free Quick Calculator",
  description:
    "Terms of use and disclaimer for Free Quick Calculator. Educational purposes only.",
};

export default function TermsPage() {
  return (
    <main className="prose max-w-3xl mx-auto py-8">
      <h1>Terms &amp; Disclaimer</h1>
      <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>

      <h2>Use of the site</h2>
      <p>
        By using this site you agree not to reverse-engineer, scrape, or misuse
        the service. We may update or remove features at any time.
      </p>

      <h2>Educational only</h2>
      <p>
        All calculators are for <strong>educational and informational</strong> purposes.
        They may not reflect your exact situation. For financial, medical, tax or
        legal advice, consult a licensed professional.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We do not guarantee accuracy or fitness for a particular purpose and are
        not liable for any losses arising from use of the site.
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:contact@freequickcalculator.com">contact@freequickcalculator.com</a>
      </p>
    </main>
  );
}
