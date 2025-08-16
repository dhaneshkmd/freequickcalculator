import type { Metadata } from "next";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://freequickcalculator.com"),
  title: { default: "Free Quick Calculator", template: "%s | Free Quick Calculator" },
  description:
    "A fast, clean hub of finance, health, and utility calculators. Free. No sign-up. Mobile friendly.",
  icons: { icon: "/favicon.ico" },
  // Helps AdSense site verification
  other: { "google-adsense-account": "ca-pub-8441641457342117" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* Consent Mode v2 defaults: deny until user chooses (CMP will update) */}
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              ad_storage: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted'
            });
          `}
        </Script>

        {/* CookieYes CMP */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/8a74e740342c470beb46f456/script.js"
          strategy="beforeInteractive"
        />

        {/* Google AdSense loader (ensure it's in <head> for crawler visibility) */}
        <Script
          id="adsense-loader"
          strategy="beforeInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8441641457342117"
          crossOrigin="anonymous"
        />

        <Navbar />
        <main className="py-8">
          <Container>{children}</Container>
        </main>
        <Footer />

        {/* Vercel Analytics (cookieless) & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
