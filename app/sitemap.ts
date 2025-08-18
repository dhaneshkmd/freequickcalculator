// app/sitemap.ts
import type { MetadataRoute } from "next";
// ⛔ Old (causes Module not found in Vercel build)
// import { calculators } from "@/data/calculators";

// ✅ Use a relative import from app/ → ../data/
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

  const calcRoutes: MetadataRoute.Sitemap = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${base}/calculator/${c.slug}`,
      changefreq: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...calcRoutes];
}
