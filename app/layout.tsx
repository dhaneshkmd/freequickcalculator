// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GA4PageView from "../components/GA4PageView"; // ← add this import

// GA4 ID from env (set in Vercel as NEXT_PUBLIC_GA_ID)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://freequickcalculator.com"),
  title: { default: "Free Quick Calculator", template: "%s | Free Quick Calculator" },
  description:
    "A fast, clean hub of finance, health, and utility calculators. Free. No sign-up. Mobile friendly.",
  icons: { icon: "/favicon.ico" },
  viewport: "width=device-width, initial-scale=1",
  robots: { index: true, follow: true },
  // AdSense site verification meta
  other: { "google-adsense-account": "ca-pub-8441641457342117" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* 1) Consent Mode v2 defaults */}
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

        {/* 2) Google tag (GA4) runtime — only if GA_ID is set */}
        {GA_ID ? (
          <>
            <Script
              id="gtag-js"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="beforeInteractive"
            />
            <Script id="gtag-config" strategy="beforeInteractive">
              {`
                gtag('js', new Date());
                // Don't auto-send page_view; we control it on route change & consent
                gtag('config', '${GA_ID}', {
                  send_page_view: false,
                  anonymize_ip: true,
                  debug_mode: ${process.env.NODE_ENV !== "production"}
                });
              `}
            </Script>
          </>
        ) : null}

        {/* 3) CookieYes CMP */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/8a74e740342c470beb46f456/script.js"
          strategy="beforeInteractive"
        />

        {/* 4) AdSense loader */}
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

        {/* GA4 page_view: initial + route changes + on consent update */}
        <GA4PageView />

        {/* Cookieless measurements */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
