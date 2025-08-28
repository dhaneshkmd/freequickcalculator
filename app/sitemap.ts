// app/sitemap.ts
import type { MetadataRoute } from "next";
import { calculators } from "../data/calculators"; // keep relative path

const SITE = "https://www.freequickcalculator.com";

// Safely read optional updatedAt (string | Date), if it exists
function getLastModified(item: unknown): Date | undefined {
  if (item && typeof item === "object" && "updatedAt" in item) {
    const v = (item as { updatedAt?: string | Date }).updatedAt;
    if (!v) return undefined;
    return typeof v === "string" ? new Date(v) : v;
  }
  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,        changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE}/faq`,     changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/about`,   changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${SITE}/terms`,   changeFrequency: "yearly",  priority: 0.4 },
  ];

  const calcRoutes: MetadataRoute.Sitemap = (calculators as any[])
    .filter((c) => c.status === "ready")
    .map((c) => {
      const lastModified = getLastModified(c);
      return {
        url: `${SITE}/calculator/${c.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
        ...(lastModified ? { lastModified } : {}),
      };
    });

  return [...staticRoutes, ...calcRoutes];
}
