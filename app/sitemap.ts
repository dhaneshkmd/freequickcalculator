// app/sitemap.ts
import type { MetadataRoute } from "next";
import { calculators } from "../data/calculators"; // ← relative path (no alias)

const SITE = "https://freequickcalculator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changefreq: "weekly", priority: 1 },
    { url: `${SITE}/about`, changefreq: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, changefreq: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, changefreq: "yearly", priority: 0.4 },
    { url: `${SITE}/terms`, changefreq: "yearly", priority: 0.4 },
  ];

  const calcRoutes = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${SITE}/calculator/${c.slug}`,
      changefreq: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...calcRoutes];
}
