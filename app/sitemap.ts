// app/sitemap.ts
import type { MetadataRoute } from "next";
import { calculators } from "../data/calculators"; // ← change from '@/data/calculators'

const BASE_URL = "https://freequickcalculator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    { url: `${BASE_URL}/privacy`, lastModified: new Date() },
    { url: `${BASE_URL}/terms`, lastModified: new Date() },
  ];

  const calcRoutes: MetadataRoute.Sitemap = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${BASE_URL}/calculator/${c.slug}`,
      lastModified: new Date(),
    }));

  return [...staticRoutes, ...calcRoutes];
}
