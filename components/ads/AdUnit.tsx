'use client';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

type Props = {
  /** Your AdSense unit slot id */
  slot: string;
  className?: string;
  style?: React.CSSProperties;
  /** e.g. 'auto', 'rectangle', etc. */
  format?: string;
  /** responsive flag for full-width units */
  responsive?: 'true' | 'false';
};

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-8441641457342117';

export default function AdUnit({
  slot,
  className = '',
  style,
  format = 'auto',
  responsive = 'true',
}: Props) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const el = adRef.current as unknown as HTMLElement | null;
    // Only push if the AdSense script is present and this ins hasn't been initialized yet
    if (typeof window !== 'undefined' && window.adsbygoogle && el && !el.getAttribute('data-adsbygoogle-status')) {
      try {
        window.adsbygoogle.push({});
      } catch {
        // no-op: script might not be ready yet, next render will try again
      }
    }
  }, [slot]); // rerun if slot changes

  const baseStyle: React.CSSProperties = {
    display: 'block',
    minHeight: '280px', // reserve space to keep CLS ≈ 0
    ...style,
  };

  return (
    <div className={className} aria-label="advertisement">
      <ins
        key={slot}
        ref={adRef as any}
        className="adsbygoogle"
        style={baseStyle}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        // Test mode in development only (required to avoid invalid traffic during testing)
        data-adtest={process.env.NODE_ENV !== 'production' ? 'on' : undefined}
      />
    </div>
  );
}
