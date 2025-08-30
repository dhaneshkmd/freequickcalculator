// app/(legal)/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Free Quick Calculator",
  description:
    "Privacy Policy for Free Quick Calculator: how we handle cookies, analytics, and advertising (including Google AdSense).",
  alternates: { canonical: "https://freequickcalculator.com/privacy" },
  openGraph: {
    type: "website",
    title: "Privacy Policy | Free Quick Calculator",
    description:
      "Learn how Free Quick Calculator handles your data, cookies, analytics, and Google AdSense advertising.",
    url: "https://freequickcalculator.com/privacy",
    siteName: "Free Quick Calculator",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Free Quick Calculator",
    description:
      "Our Privacy Policy explains how we use cookies, analytics, and advertising (Google AdSense).",
  },
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  return (
    <main className="prose prose-slate dark:prose-invert max-w-3xl mx-auto py-10">
      <h1>Privacy Policy</h1>
      <p>
        <em>Last updated: {lastUpdated}</em>
      </p>

      <p>
        Free Quick Calculator (“we”, “us”, “our”) operates this website to
        provide calculators for finance, health, utilities, and conversions.
        This page explains what data we collect and how we use it.
      </p>

      <h2>Cookies &amp; Similar Technologies</h2>
      <p>
        We use cookies or local storage to remember preferences (e.g., units),
        improve site performance, and measure usage. In the EEA/UK/CH, a
        Google-certified Consent Management Platform (CookieYes) will request
        your consent before enabling advertising or analytics cookies.
      </p>

      <h2>Advertising (Google AdSense)</h2>
      <p>
        This site uses Google AdSense to display ads. Google and its partners
        may use cookies to serve ads based on prior visits to this and other
        websites. Google’s use of the DART cookie enables it to serve ads based
        on your visits. You can opt out by visiting{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noreferrer"
        >
          Google’s Ads Policy
        </a>
        .
      </p>
      <p>
        Where required, we ask for consent to process{" "}
        <strong>ad_user_data</strong>, <strong>ad_personalization</strong>, and{" "}
        <strong>ad_storage</strong>. Without consent, personalized ads and ad
        measurement are disabled.
      </p>

      <h2>Analytics</h2>
      <p>
        We use privacy-focused analytics to understand feature usage and improve
        the site. Analytics storage is set to “denied” by default and only
        enabled after user consent (in regions where consent is required).
      </p>

      <h2>Data You Enter</h2>
      <p>
        Calculator inputs are processed locally in your browser and are not
        stored on our servers. If you contact us via email, we will only use the
        details you provide to respond to your inquiry.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for users aged 18 and over. We do not knowingly
        collect data from children under 13 (or under the local age of digital
        consent).
      </p>

      <h2>Your Rights</h2>
      <p>
        Depending on your location, you may have rights under GDPR/CCPA or
        similar laws to:
      </p>
      <ul>
        <li>Request access to or deletion of your personal data</li>
        <li>Opt out of personalized advertising</li>
        <li>Withdraw or change your cookie consent</li>
      </ul>

      <h2>Contact</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at:{" "}
        <a href="mailto:dhaneshkmd82@gmail.com">dhaneshkmd82@gmail.com</a>
      </p>
    </main>
  );
}
