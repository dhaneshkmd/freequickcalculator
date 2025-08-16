import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Free Quick Calculator",
  description:
    "Privacy Policy for Free Quick Calculator: how we handle cookies, analytics, and advertising (including Google AdSense).",
};

export default function PrivacyPage() {
  return (
    <main className="prose max-w-3xl mx-auto py-8">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>

      <p>
        Free Quick Calculator (“we”, “us”, “our”) operates this website to
        provide calculators for finance, health, utilities and conversions.
        This page explains what data we collect and how we use it.
      </p>

      <h2>Cookies &amp; similar technologies</h2>
      <p>
        We may use cookies and local storage to keep preferences (e.g., units),
        improve the site, and measure usage via analytics. If you are in the EEA/UK/CH,
        you will see a consent banner from a Google-certified Consent Management
        Platform (CMP). Your choices control whether advertising or analytics
        cookies are used.
      </p>

      <h2>Advertising (Google AdSense)</h2>
      <p>
        We show ads via Google AdSense. Google may use cookies to personalize ads
        and measure performance. You can manage consent in the banner and visit{" "}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
          Google’s Ads Policy
        </a>{" "}
        to learn more. Where required, we request consent for
        <strong> ad_user_data</strong>, <strong>ad_personalization</strong>, and
        <strong> ad_storage</strong>.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use privacy-respecting analytics to understand feature usage and
        improve the site. Analytics cookies are disabled until you consent (in regions
        where consent is required).
      </p>

      <h2>Data you enter</h2>
      <p>
        Calculator inputs are processed in your browser and are not stored on our servers.
        If you contact us, we’ll receive the information you send (e.g., email).
      </p>

      <h2>Children</h2>
      <p>This site is intended for users aged 18+.</p>

      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:dhaneshkmd82@gmail.com">dhaneshkmd82@gmail.com</a>
      </p>
    </main>
  );
}
