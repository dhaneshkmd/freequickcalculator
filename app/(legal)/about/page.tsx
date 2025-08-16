// app/(legal)/about/page.tsx
export const metadata = {
  title: "About",
  description:
    "What Free Quick Calculator is, our mission, and how to reach us.",
};

export default function AboutPage() {
  return (
    <section className="prose max-w-none">
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
        <li>Utilities & conversions (discount, percentage, date diff, and more)</li>
        <li>Searchable hub with clean, ad-light experience</li>
      </ul>

      <h2>Privacy & consent</h2>
      <p>
        We use a Google-certified consent banner (CookieYes) in EEA/UK/CH and
        keep ads/analytics off until you choose. See our{" "}
        <a href="/privacy">Privacy Policy</a> for details.
      </p>

      <h2>Contact</h2>
      <p>
        Feedback or ideas? Email us at <a href="mailto:your@email.com">
        your@email.com</a>.
      </p>
    </section>
  );
}
