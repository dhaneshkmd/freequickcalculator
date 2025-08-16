"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function sendPageView() {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") return;

  const page_path = window.location.pathname + window.location.search;

  window.gtag("event", "page_view", {
    send_to: GA_ID,
    page_location: window.location.href,
    page_path,
    page_title: document.title,
  });
}

export default function GA4PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial + every route change
  useEffect(() => {
    sendPageView();
  }, [pathname, searchParams]);

  // Re-fire when the user accepts/updates consent in CookieYes
  useEffect(() => {
    const handler = () => sendPageView();
    window.addEventListener("cookieyes_consent_update", handler);
    window.addEventListener("cookieyes_consent_accept", handler);
    return () => {
      window.removeEventListener("cookieyes_consent_update", handler);
      window.removeEventListener("cookieyes_consent_accept", handler);
    };
  }, []);

  return null;
}
