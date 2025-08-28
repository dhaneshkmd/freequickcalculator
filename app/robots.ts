// app/robots.ts
import type { MetadataRoute } from "next";

const SITE = "https://www.freequickcalculator.com";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";

  // Prevent non-production (preview, dev) builds from being indexed
  if (!isProd) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/", // block everything
        },
      ],
    };
  }

  // ✅ Production rules
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // block internal API routes
          "/_next/", // block Next.js internals
          "/private/", // in case you add private routes
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
