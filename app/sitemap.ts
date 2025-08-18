import type { MetadataRoute } from "next";
import { calculators } from "@/data/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://freequickcalculator.com";
  const staticRoutes = ["", "/about", "/contact", "/privacy", "/terms"].map((p) => ({
    url: `${base}${p || "/"}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.6,
  }));

  const calcRoutes = calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({
      url: `${base}/calculator/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...calcRoutes];
}
