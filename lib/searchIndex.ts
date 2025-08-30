// lib/searchIndex.ts
import { calculators } from "@/data/calculators";

export type SearchDoc = { path: string; title: string; text: string; };

export const searchIndex: SearchDoc[] = calculators.map((c) => ({
  path: c.path,
  title: c.title,
  text: [
    c.intro,
    c.formula ?? "",
    c.variables?.map(v => `${v.symbol}:${v.meaning}`).join(" ") ?? "",
    c.example?.description ?? "",
    c.useCases?.join(" ") ?? "",
    c.faqs?.map(f => `${f.q} ${f.a}`).join(" ") ?? "",
  ].join(" "),
}));
