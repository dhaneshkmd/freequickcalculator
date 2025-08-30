// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GA4PageView from "../components/GA4PageView";

const FloatingCalculator = dynamic(() => import("../components/FloatingCalculator"), { ssr: false });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://freequickcalculator.com"),
  title: { default: "Free Quick Calculator", template: "%s | Free Quick Calculator" },
  description:
    "A fast, clean hub of finance, health, and utility calculators. Free. No sign-up. Mobile friendly.",
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
  // This produces: <meta name="google-adsense-account" content="ca-pub-...">
  other: { "google-adsense-account": "ca-pub-8441641457342117" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* 1) Consent Mode v2 defaults — MUST run before any Google tag */}
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // Default = denied until user grants via CMP
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

        {/* 2) CookieYes CMP (updates consent after user's choice) */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/8a74e740342c470beb46f456/script.js"
          strategy="beforeInteractive"
        />

        {/* 3) Bridge CookieYes → gtag Consent & conditionally load AdSense */}
        <Script id="cookieyes-gtag-bridge" strategy="beforeInteractive">
          {`
            (function () {
              // Map CookieYes categories to Consent Mode
              function applyConsentFromCookieYes() {
                try {
                  var cy = (window as any).CookieYesConsent || {};
                  var granted = (cat) => cy.accepted && cy.accepted.indexOf(cat) !== -1;

                  // Update Consent Mode v2
                  gtag('consent', 'update', {
                    analytics_storage: granted('analytics') ? 'granted' : 'denied',
                    ad_storage: granted('advertisement') ? 'granted' : 'denied',
                    ad_user_data: granted('advertisement') ? 'granted' : 'denied',
                    ad_personalization: granted('advertisement') ? 'granted' : 'denied',
                  });

                  // Load AdSense only when ad consent is granted
                  var shouldLoadAds = granted('advertisement');
                  var alreadyLoaded = !!document.querySelector('script[data-adsbygoogle-loaded]');
                  if (shouldLoadAds && !alreadyLoaded) {
                    var s = document.createElement('script');
                    s.async = true;
                    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8441641457342117';
                    s.crossOrigin = 'anonymous';
                    s.setAttribute('data-adsbygoogle-loaded', 'true');
                    document.head.appendChild(s);
                  }
                } catch (e) {}
              }

              // Run once CookieYes is ready or when it updates
              window.addEventListener('cookieyes_consent_update', applyConsentFromCookieYes);
              document.addEventListener('cookieyes_initialized', applyConsentFromCookieYes);

              // Fallback: try after page load as well
              if (document.readyState !== 'loading') {
                setTimeout(applyConsentFromCookieYes, 0);
              } else {
                document.addEventListener('DOMContentLoaded', function(){ setTimeout(applyConsentFromCookieYes, 0); });
              }
            })();
          `}
        </Script>

        {/* 4) GA4 base tag (loaded early, but page_view is manual & respects consent) */}
        {GA_ID ? (
          <>
            <Script id="gtag-js" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="beforeInteractive" />
            <Script id="gtag-config" strategy="beforeInteractive">
              {`
                gtag('js', new Date());
                // We'll send page_view in GA4PageView after route changes AND after consent is applied
                gtag('config', '${GA_ID}', { send_page_view: false, anonymize_ip: true, debug_mode: ${process.env.NODE_ENV !== "production"} });
              `}
            </Script>
          </>
        ) : null}

        <Navbar />

        <main className="py-8">
          <Suspense fallback={null}>
            <Container>{children}</Container>
          </Suspense>
        </main>

        <Footer />

        {/* GA4 page_view on route changes (your component) */}
        <Suspense fallback={null}>
          <GA4PageView />
        </Suspense>

        {/* Cookieless measurements */}
        <Analytics />
        <SpeedInsights />

        {/* Floating calculator site-wide */}
        <FloatingCalculator />
      </body>
    </html>
  );
}
