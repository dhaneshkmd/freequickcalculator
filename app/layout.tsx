// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GA4PageView from "../components/GA4PageView";

// ⬇️ Floating calculator (client component)
import FloatingCalculator from "../components/FloatingCalculator";

// GA4 ID from env (set in Vercel as NEXT_PUBLIC_GA_ID)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://freequickcalculator.com"),
  title: { default: "Free Quick Calculator", template: "%s | Free Quick Calculator" },
  description:
    "A fast, clean hub of finance, health, and utility calculators. Free. No sign-up. Mobile friendly.",
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
  other: { "google-adsense-account": "ca-pub-8441641457342117" },
};

// ✅ viewport must be a separate export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
          {/* ⬇️ This Suspense fixes the CSR bailout on every page using useSearchParams */}
          <Suspense fallback={null}>
            <Container>{children}</Container>
          </Suspense>
        </main>
        <Footer />

        {/* GA4 page_view (also uses router hooks) */}
        <Suspense fallback={null}>
          <GA4PageView />
        </Suspense>

        {/* Cookieless measurements */}
        <Analytics />
        <SpeedInsights />

        {/* Floating calculator available site-wide */}
        <FloatingCalculator />
      </body>
    </html>
  );
}
