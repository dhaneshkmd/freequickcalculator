// components/CalculatorContent.tsx
import React from "react";

export type FAQItem = { q: string; a: string };
export type Variable = { symbol: string; meaning: string };

export type CalculatorContentProps = {
  /** H1 at the top of the page */
  title: string;
  /** 150–200 words: what the calculator does and why it matters */
  intro: React.ReactNode;
  /** Display math formula (plain text or JSX with <sup>/<sub>) */
  formula?: React.ReactNode;
  /** Brief list of variables used in the formula */
  variables?: Variable[];
  /** A real worked example (numbers + result) */
  example?: {
    heading?: string;
    description?: React.ReactNode; // e.g., “Loan ₹10L, 10% p.a., 5 years”
    steps?: React.ReactNode;       // optional breakdown
    result?: React.ReactNode;      // final numeric result
  };
  /** Practical use cases (3–6 bullets) */
  useCases?: string[];
  /** 3–5 FAQs (auto-JSON-LD for rich results) */
  faqs?: FAQItem[];
  /** Related internal links */
  related?: { href: string; label: string }[];
  /** Custom disclaimer (falls back to default) */
  disclaimer?: React.ReactNode;
  /** Optional ad block area (pass <AdSlot /> or any JSX) */
  ad?: React.ReactNode;
  /** Optional: extra child blocks (charts, tables, etc.) */
  children?: React.ReactNode;
};

export default function CalculatorContent({
  title,
  intro,
  formula,
  variables = [],
  example,
  useCases = [],
  faqs = [],
  related = [],
  disclaimer,
  ad,
  children,
}: CalculatorContentProps) {
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <main className="prose prose-slate dark:prose-invert max-w-3xl mx-auto py-10">
      {/* FAQ JSON-LD for rich results */}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <h1>{title}</h1>

      {/* Intro */}
      <section aria-labelledby="intro">
        <p id="intro">{intro}</p>
      </section>

      {/* Optional ad slot near top (non-intrusive) */}
      {ad ? <div className="my-6">{ad}</div> : null}

      {/* Formula */}
      {formula ? (
        <section aria-labelledby="formula">
          <h2 id="formula">Formula</h2>
          <p className="leading-relaxed">{formula}</p>

          {variables.length > 0 ? (
            <ul>
              {variables.map((v, i) => (
                <li key={i}>
                  <strong>{v.symbol}</strong> — {v.meaning}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {/* Worked example */}
      {example ? (
        <section aria-labelledby="example">
          <h2 id="example">{example.heading || "Example Calculation"}</h2>
          {example.description ? <p>{example.description}</p> : null}
          {example.steps ? <div>{example.steps}</div> : null}
          {example.result ? (
            <p>
              <strong>Result: </strong>
              {example.result}
            </p>
          ) : null}
        </section>
      ) : null}

      {/* Practical uses */}
      {useCases.length > 0 ? (
        <section aria-labelledby="use-cases">
          <h2 id="use-cases">Practical Uses</h2>
          <ul>
            {useCases.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Extra custom content (tables, charts, etc.) */}
      {children}

      {/* FAQs */}
      {faqs.length > 0 ? (
        <section aria-labelledby="faqs">
          <h2 id="faqs">FAQs</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border p-4 hover:border-gray-400 focus-within:border-gray-500 transition"
              >
                <summary className="cursor-pointer list-none select-none font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {f.q}
                </summary>
                <div className="mt-2 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related links */}
      {related.length > 0 ? (
        <section aria-labelledby="related">
          <h2 id="related">Related Tools</h2>
          <ul>
            {related.map((r, i) => (
              <li key={i}>
                <a className="underline" href={r.href}>
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Disclaimer */}
      <section aria-labelledby="disclaimer">
        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          {disclaimer || (
            <>
              This calculator is for <strong>educational purposes only</strong>.
              For financial, tax, medical, or legal decisions, consult a
              qualified professional. We strive for accuracy but cannot guarantee
              error-free results for every scenario.
            </>
          )}
        </p>
      </section>
    </main>
  );
}
