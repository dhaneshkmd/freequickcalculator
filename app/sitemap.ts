// app/sitemap.ts
import type { MetadataRoute } from "next";
import { calculators } from "../data/calculators";

const SITE = "https://www.freequickcalculator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static routes (legal + core pages)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,        changeFrequency: "weekly",  priority: 1,   lastModified: now },
    { url: `${SITE}/faq`,     changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${SITE}/about`,   changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${SITE}/privacy`, changeFrequency: "yearly",  priority: 0.4, lastModified: now },
    { url: `${SITE}/terms`,   changeFrequency: "yearly",  priority: 0.4, lastModified: now },
  ];

  // Calculator routes (only "ready" ones)
  const calcRoutes: MetadataRoute.Sitemap = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${SITE}/calculator/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: now,
    }));

  return [...staticRoutes, ...calcRoutes];
}
