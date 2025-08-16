// components/GA4PageView.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window { gtag?: (...args: any[]) => void }
}

export default function GA4PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fire page_view on route/params change
  useEffect(() => {
    if (!window.gtag) return;
    const qs = searchParams?.toString();
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: qs ? `${pathname}?${qs}` : pathname,
    });
  }, [pathname, searchParams]);

  // Re-fire after consent accept/update (CookieYes events)
  useEffect(() => {
    const send = () => {
      if (!window.gtag) return;
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.search,
      });
    };
    window.addEventListener("cookieyes_consent_update", send);
    window.addEventListener("cookieyes_consent_accept", send);
    return () => {
      window.removeEventListener("cookieyes_consent_update", send);
      window.removeEventListener("cookieyes_consent_accept", send);
    };
  }, []);

  return null;
}
