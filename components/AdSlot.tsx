// components/AdSlot.tsx
"use client";

import { useEffect, useRef } from "react";

type AdSlotProps = {
  slot: string; // your data-ad-slot id
  style?: React.CSSProperties;
  className?: string;
};

export default function AdSlot({ slot, style, className }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    const tryPush = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {}
      }
    };
    // Try now and again after a short delay (script may load slightly later)
    tryPush();
    const t = setTimeout(tryPush, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <ins
      ref={ref as any}
      className={`adsbygoogle ${className || ""}`}
      style={style || { display: "block" }}
      data-ad-client="ca-pub-8441641457342117"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
