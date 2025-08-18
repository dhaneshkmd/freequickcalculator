// app/sitemap.ts
import type { MetadataRoute } from "next";
import { calculators } from "../data/calculators"; // keep relative path

const SITE = "https://freequickcalculator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,        changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE}/about`,   changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${SITE}/terms`,   changeFrequency: "yearly",  priority: 0.4 },
  ];

  const calcRoutes: MetadataRoute.Sitemap = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${SITE}/calculator/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...calcRoutes];
}
