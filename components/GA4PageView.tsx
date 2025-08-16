"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GA4PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window === "undefined") return;
    const gtag = (window as any).gtag;
    if (!gtag) return;

    const query = searchParams?.toString();
    const url = pathname + (query ? `?${query}` : "");

    gtag("event", "page_view", {
      send_to: GA_ID,
      page_location: window.location.origin + url,
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
