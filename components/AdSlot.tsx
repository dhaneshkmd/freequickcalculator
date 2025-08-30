// components/AdSlot.tsx
"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

type AdSlotProps = {
  slot: string; // your data-ad-slot id
  style?: React.CSSProperties;
  className?: string;
  format?: "auto" | "fluid" | "rectangle";
  // Optional: reserve height to minimize CLS (e.g., 280–320 for mobile)
  reserveHeight?: number; 
};

export default function AdSlot({
  slot,
  style,
  className,
  format = "auto",
  reserveHeight = 0, // 0 = no reservation
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const [pushed, setPushed] = useState(false);
  const [adsScriptReady, setAdsScriptReady] = useState(false);

  // Detect that the AdSense script is on the page
  useEffect(() => {
    let cancelled = false;

    const check = () => {
      // Script adds window.adsbygoogle and a <script src="...adsbygoogle.js">
      const hasGlobal = typeof window !== "undefined" && Array.isArray(window.adsbygoogle);
      const hasScript = !!document.querySelector('script[src*="adsbygoogle.js"]');
      if (!cancelled && (hasGlobal || hasScript)) {
        setAdsScriptReady(true);
      }
    };

    check();
    const id = setInterval(check, 300);
    setTimeout(() => clearInterval(id), 3000); // stop polling after 3s

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Push the ad request once
  useEffect(() => {
    if (!adsScriptReady || pushed || !ref.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setPushed(true);
    } catch (e) {
      // AdSense can throw if called too early; a small retry is fine
      setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setPushed(true);
        } catch {
          // swallow
        }
      }, 800);
    }
  }, [adsScriptReady, pushed]);

  // Compose style with an optional reserved height to reduce CLS
  const mergedStyle: React.CSSProperties = {
    display: "block",
    textAlign: "center",
    ...(reserveHeight ? { minHeight: reserveHeight } : null),
    ...style,
  };

  return (
    <ins
      ref={ref as any}
      className={`adsbygoogle ${className ?? ""}`}
      style={mergedStyle}
      data-ad-client="ca-pub-8441641457342117"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      {...(process.env.NODE_ENV !== "production" ? { "data-adtest": "on" } : {})}
    />
  );
}
