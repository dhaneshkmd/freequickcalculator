import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";

export const metadata: Metadata = {
  metadataBase: new URL("https://freequickcalculator.com"),
  title: { default: "Free Quick Calculator", template: "%s | Free Quick Calculator" },
  description: "A fast, clean hub of finance, health, and utility calculators. Free. No sign-up. Mobile friendly.",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="py-8"><Container>{children}</Container></main>
        <Footer />
      </body>
    </html>
  );
}
