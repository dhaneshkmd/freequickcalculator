// app/sitemap.ts
import type { MetadataRoute } from "next";
import { calculators } from "../data/calculators";

const SITE = "https://www.freequickcalculator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,        changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE}/faq`,     changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/about`,   changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${SITE}/terms`,   changeFrequency: "yearly",  priority: 0.4 },
  ];

  const calcRoutes: MetadataRoute.Sitemap = (calculators as Array<{ slug: string; status: string }>)
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${SITE}/calculator/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...calcRoutes];
}
