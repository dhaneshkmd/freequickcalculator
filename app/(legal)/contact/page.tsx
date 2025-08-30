// app/(legal)/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact | Free Quick Calculator",
  description: "Get in touch with Free Quick Calculator for feedback, support, or inquiries.",
  alternates: { canonical: "https://freequickcalculator.com/contact" },
  openGraph: {
    type: "website",
    title: "Contact | Free Quick Calculator",
    description: "Contact Free Quick Calculator for support, feedback, or partnership inquiries.",
    url: "https://freequickcalculator.com/contact",
    siteName: "Free Quick Calculator",
  },
  twitter: {
    card: "summary",
    title: "Contact | Free Quick Calculator",
    description: "Reach Free Quick Calculator for support, privacy questions, or feedback.",
  },
};

export default function ContactPage() {
  return (
    <section className="prose prose-slate dark:prose-invert max-w-3xl mx-auto py-10">
      <h1>Contact Us</h1>
      <p>
        We’d love to hear from you! For feedback, feature requests, support, or privacy questions, please email us at{" "}
        <a href="mailto:dhaneshkmd82@gmail.com">dhaneshkmd82@gmail.com</a>.
      </p>

      <h2>Business Details</h2>
      <address className="not-italic">
        <div><strong>Business name:</strong> Free Quick Calculator</div>
        <div>
          <strong>Website:</strong>{" "}
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            freequickcalculator.com
          </Link>
        </div>
      </address>

      <h2>Response Time</h2>
      <p>
        We typically respond within <strong>2–3 business days</strong>. If your inquiry is urgent, please include “URGENT” in the subject line of your email.
      </p>
    </section>
  );
}
