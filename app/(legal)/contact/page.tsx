import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Free Quick Calculator",
  description: "Get in touch with Free Quick Calculator.",
};

export default function ContactPage() {
  return (
    <main className="prose max-w-3xl mx-auto py-8">
      <h1>Contact</h1>
      <p>
        For feedback, feature requests, or privacy questions, email us at{" "}
        <a href="mailto:dhaneshkmd82@gmail.com">dhaneshkmd82@gmail.com</a>.
      </p>
      <p>
        Business name: Free Quick Calculator<br />
        Website: <a href="https://freequickcalculator.com">freequickcalculator.com</a>
      </p>
    </main>
  );
}
