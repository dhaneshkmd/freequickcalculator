// app/robots.ts
import type { MetadataRoute } from "next";

const SITE = "https://freequickcalculator.com";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";

  // Block previews from being indexed
  if (!isProd) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  // Production
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
