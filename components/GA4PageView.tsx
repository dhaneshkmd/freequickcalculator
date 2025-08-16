"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Safe sender
function sendPageview() {
  if (!GA_ID || typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
}

export default function GA4PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrlRef = useRef<string>("");
  const lastSentAt = useRef<number>(0);

  // Send once on mount (best-effort). Consent Mode will drop it if denied.
  useEffect(() => {
    // slight delay to ensure gtag is present
    const t = setTimeout(() => {
      sendPageview();
      lastUrlRef.current = window.location.pathname + window.location.search;
      lastSentAt.current = Date.now();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Send on route changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    if (!url) return;

    // Avoid duplicate if nothing actually changed
    if (url === lastUrlRef.current) return;

    sendPageview();
    lastUrlRef.current = url;
    lastSentAt.current = Date.now();
  }, [pathname, searchParams]);

  // Re-send once if consent is updated/accepted (to recover a dropped hit).
  useEffect(() => {
    const handler = () => {
      const now = Date.now();
      const url = window.location.pathname + window.location.search;

      // De-dupe: if we already sent for this URL very recently, skip
      if (url === lastUrlRef.current && now - lastSentAt.current < 800) return;

      sendPageview();
      lastUrlRef.current = url;
      lastSentAt.current = now;
    };

    window.addEventListener("cookieyes_consent_update", handler, { once: true } as any);
    window.addEventListener("cookieyes_consent_accept", handler, { once: true } as any);

    return () => {
      window.removeEventListener("cookieyes_consent_update", handler as any);
      window.removeEventListener("cookieyes_consent_accept", handler as any);
    };
  }, []);

  return null;
}
