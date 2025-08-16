'use client';
import { useEffect } from 'react';

declare global { interface Window { adsbygoogle: unknown[] } }

type Props = {
  slot: string;                 // your AdSense "ad unit" slot id
  className?: string;
  style?: React.CSSProperties;  // override reserved height if needed
  format?: string;
  responsive?: 'true' | 'false';
};

export default function AdUnit({
  slot,
  className = '',
  style,
  format = 'auto',
  responsive = 'true',
}: Props) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [slot]);

  const baseStyle: React.CSSProperties = {
    display: 'block',
    minHeight: '280px',   // reserve space to keep CLS = 0
    ...style,
  };

  return (
    <div className={className} aria-label="advertisement">
      <ins
        className="adsbygoogle"
        style={baseStyle}
        data-ad-client="ca-pub-8441641457342117"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
