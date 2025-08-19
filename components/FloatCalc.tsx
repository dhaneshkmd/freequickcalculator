'use client';
import { useMemo, useState } from 'react';

type Mode = 'basic' | 'sci';

function formatNumber(n: number) {
  // Compact but stable formatting (no scientific unless needed)
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 10,
  }).format(n);
}

/**
 * Very strict sanitizer:
 * - Only allows numbers, (), + - * / % ^ . and the whitelisted functions: sin cos tan sqrt log10 ln abs
 * - Constants: π, pi, e (Euler). 'e' in scientific notation (e.g. 1e5) is left intact because it's part of a number token.
 * - Replaces ^ → ** and % → /100 (simple percent operator)
 */
function sanitize(expr: string) {
  const original = expr;

  // remove whitespace for validation
  const compact = original.replace(/\s+/g, '');

  // allowlisted token matcher
  const token = /sin|cos|tan|sqrt|log10|ln|abs|pi|π|e|[0-9]*\.?[0-9]+(?:e[+\-]?[0-9]+)?|[()+\-*/^%]/gi;
  let rebuilt = '';
  let m: RegExpExecArray | null;
  const re = new RegExp(token);

  // rebuild from allowed tokens only
  const global = new RegExp(token, 'gi');
  while ((m = global.exec(compact)) !== null) {
    rebuilt += m[0];
  }

  // if anything changed (i.e., illegal chars existed), reject
  if (rebuilt.length !== compact.length) {
    throw new Error('Invalid input');
  }

  // ---- Replacements (order matters) ----
  let s = original;

  // constants (keep \b so we don't touch '1e5' scientific notation)
  s = s.replace(/\bpi\b/gi, 'Math.PI').replace(/π/g, 'Math.PI');
  s = s.replace(/\be\b/g, 'Math.E'); // does not touch the 'e' in 1e5

  // operators
  s = s.replace(/\^/g, '**');         // exponent
  s = s.replace(/%/g, '/100');        // percent (simple operator)

  // functions
  s = s
    .replace(/\bsin\(/gi, 'Math.sin(')
    .replace(/\bcos\(/gi, 'Math.cos(')
    .replace(/\btan\(/gi, 'Math.tan(')
    .replace(/\bsqrt\(/gi, 'Math.sqrt(')
    .replace(/\blog10\(/gi, 'Math.log10(')
    .replace(/\bln\(/gi, 'Math.log(')
    .replace(/\babs\(/gi, 'Math.abs(');

  return s;
}

export default function FloatingCalculator() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('basic');
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const result = useMemo(() => {
    if (!input.trim()) return '';
    try {
      const s = sanitize(input);
      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${s})`)();
      setError(null);
      return Number.isFinite(val) ? formatNumber(val) : '';
    } catch {
      // don't show error while typing; only on "="
      setError(null);
      return '';
    }
  }, [input]);

  const press = (t: string) => setInput((v) => v + t);
  const back = () => setInput((v) => v.slice(0, -1));
  const clear = () => { setInput(''); setError(null); };
  const equals = () => {
    try {
      const s = sanitize(input || '0');
      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${s})`)();
      if (!Number.isFinite(val)) throw new Error('NaN');
      setInput(String(val));
      setError(null);
    } catch {
      setError('Invalid expression');
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        aria-label={open ? 'Close calculator' : 'Open calculator'}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg px-4 py-3 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {open ? '×' : 'Calc'}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Floating calculator"
          aria-modal="false"
          className="fixed bottom-20 right-5 z-50 w-[320px] max-w-[92vw] rounded-2xl border bg-white shadow-xl"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex gap-2">
              <button
                onClick={() => setMode('basic')}
                className={`text-sm px-2 py-1 rounded ${mode==='basic' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
              >
                Basic
              </button>
              <button
                onClick={() => setMode('sci')}
                className={`text-sm px-2 py-1 rounded ${mode==='sci' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
              >
                Scientific
              </button>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="p-4">
            <input
              className="w-full text-right text-xl px-3 py-2 rounded border bg-gray-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or use keys…"
              inputMode="decimal"
              autoComplete="off"
            />
            {result && !error && (
              <div className="text-right text-sm text-gray-500 mt-1">= {result}</div>
            )}
            {error && <div className="text-right text-sm text-red-600 mt-1">{error}</div>}

            {/* Scientific keys */}
            {mode === 'sci' && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {[
                  ['sin(', 'cos(', 'tan(', 'sqrt(', 'abs('],
                  ['log10(', 'ln(', '(', ')', '^'],
                  ['π', 'e', '%', '00', '.'],
                ].flat().map((b) => (
                  <button
                    key={b}
                    onClick={() => press(b)}
                    className="rounded bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm"
                  >
                    {b === 'log10(' ? 'log₁₀(' : b}
                  </button>
                ))}
              </div>
            )}

            {/* Basic keys */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','%','+'].map((b)=>(
                <button key={b} onClick={()=>press(b)}
                  className="rounded bg-gray-100 hover:bg-gray-200 px-3 py-3">
                  {b}
                </button>
              ))}
              <button onClick={back} className="col-span-2 rounded bg-yellow-100 hover:bg-yellow-200 px-3 py-3">⌫</button>
              <button onClick={clear} className="rounded bg-gray-200 hover:bg-gray-300 px-3 py-3">C</button>
              <button onClick={equals} className="rounded bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-3">=</button>
            </div>

            <p className="mt-3 text-[11px] text-gray-500">
              Tip: angles use radians (e.g., <code>sin(3.14159)</code> ≈ 0).
            </p>
          </div>
        </div>
      )}
    </>
  );
}
