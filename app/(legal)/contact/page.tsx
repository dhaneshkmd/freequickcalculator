// app/(legal)/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Free Quick Calculator.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact | Free Quick Calculator",
    description: "Get in touch with Free Quick Calculator.",
    url: "https://freequickcalculator.com/contact",
    siteName: "Free Quick Calculator",
  },
};

export default function ContactPage() {
  return (
    <section className="prose max-w-3xl mx-auto py-8">
      <h1>Contact</h1>
      <p>
        For feedback, feature requests, or privacy questions, email us at{" "}
        <a href="mailto:dhaneshkmd82@gmail.com">dhaneshkmd82@gmail.com</a>.
      </p>

      <h2>Business details</h2>
      <address className="not-italic">
        <div>Business name: Free Quick Calculator</div>
        <div>
          Website: <Link href="/">freequickcalculator.com</Link>
        </div>
      </address>
    </section>
  );
}
