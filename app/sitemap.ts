// app/sitemap.ts
import type { MetadataRoute } from "next";
// use relative path (no "@/")
import { calculators } from "../data/calculators";

const SITE = "https://freequickcalculator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const calcRoutes: MetadataRoute.Sitemap = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${SITE}/calculator/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...calcRoutes];
}
