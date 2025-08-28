// app/sitemap.ts
import type { MetadataRoute } from "next";
import { calculators } from "../data/calculators"; // keep relative path

// Use your canonical domain. If you prefer non-www, change it back.
const SITE = "https://www.freequickcalculator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,       changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE}/faq`,    changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/about`,  changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`,changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`,changeFrequency: "yearly",  priority: 0.4 },
    { url: `${SITE}/terms`,  changeFrequency: "yearly",  priority: 0.4 },
  ];

  const calcRoutes: MetadataRoute.Sitemap = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${SITE}/calculator/${c.slug}`, // matches your current route structure
      changeFrequency: "weekly",
      priority: 0.8,
      // If your calculator items have an updatedAt field (ISO string or Date), include it:
      ...(c.updatedAt
        ? { lastModified: new Date(c.updatedAt) as unknown as Date }
        : {}), // otherwise omit
    }));

  return [...staticRoutes, ...calcRoutes];
}
