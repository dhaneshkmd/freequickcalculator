// lib/searchIndex.ts
import { calculators } from "@/data/calculators";

type Longform = {
  intro?: string;
  formula?: string;
  example?: { description?: string; result?: string };
  faqs?: { q: string; a: string }[];
};

// Try to merge long-form content if present (safe if file missing)
let longformBySlug: Record<string, Longform> = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  longformBySlug = require("@/data/calculatorContent").calculatorContent || {};
} catch {
  longformBySlug = {};
}

export type SearchDoc = {
  path: string;
  title: string;
  text: string;
  keywords: string[];
};

export const searchIndex: SearchDoc[] = calculators
  .filter((c) => c.status === "ready")
  .map((c) => {
    const lf = longformBySlug[c.slug] || {};
    const text = [
      c.description,
      lf.intro ?? "",
      lf.formula ?? "",
      lf.example?.description ?? "",
      lf.example?.result ?? "",
      lf.faqs?.map((f) => `${f.q} ${f.a}`).join(" ") ?? "",
    ]
      .join(" ")
      .trim();

    return {
      path: `/calculator/${c.slug}`,
      title: c.name,
      text,
      keywords: c.keywords,
    };
  });
