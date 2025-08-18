// app/sitemap.ts
import type { MetadataRoute } from "next";

// ❌ remove this
// import { calculators } from "@/data/calculators";

// ✅ use a relative path (works reliably in metadata routes)
import { calculators } from "../data/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://freequickcalculator.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changefreq: "weekly", priority: 1 },
    { url: `${base}/about`, changefreq: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changefreq: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, changefreq: "yearly", priority: 0.4 },
    { url: `${base}/terms`, changefreq: "yearly", priority: 0.4 },
  ];

  const calcRoutes = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${base}/calculator/${c.slug}`,
      changefreq: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...calcRoutes];
}
