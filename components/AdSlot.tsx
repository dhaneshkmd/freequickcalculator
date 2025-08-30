// components/AdSlot.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/* Match existing global type: any[] | undefined */
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

type AdSlotProps = {
  slot: string; // your data-ad-slot id
  style?: React.CSSProperties;
  className?: string;
  format?: "auto" | "fluid" | "rectangle";
  /** Reserve height to reduce CLS (e.g., 280–320 for mobile). */
  reserveHeight?: number;
};

export default function AdSlot({
  slot,
  style,
  className,
  format = "auto",
  reserveHeight = 0,
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const [pushed, setPushed] = useState(false);
  const [adsScriptReady, setAdsScriptReady] = useState(false);

  // Detect AdSense script
  useEffect(() => {
    let cancelled = false;
    const check = () => {
      const hasGlobal = typeof window !== "undefined" && Array.isArray(window.adsbygoogle);
      const hasScript = !!document.querySelector('script[src*="adsbygoogle.js"]');
      if (!cancelled && (hasGlobal || hasScript)) setAdsScriptReady(true);
    };
    check();
    const id = setInterval(check, 300);
    setTimeout(() => clearInterval(id), 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Push once
  useEffect(() => {
    if (!adsScriptReady || pushed || !ref.current) return;
    const push = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setPushed(true);
      } catch {
        // try once more shortly after
        setTimeout(() => {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setPushed(true);
          } catch {
            /* swallow */
          }
        }, 800);
      }
    };
    push();
  }, [adsScriptReady, pushed]);

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
