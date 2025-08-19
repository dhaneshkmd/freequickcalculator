'use client';
import { useMemo, useState } from 'react';

type Mode = 'basic' | 'sci';

function sanitize(expr: string) {
  // allow digits, ops, parentheses, decimal, spaces and scientific tokens
  if (/[^0-9+\-*/().%^ πeA-Za-z]/.test(expr)) throw new Error('Invalid input');
  // scientific replacements
  let s = expr
    .replace(/π/g, 'Math.PI')
    .replace(/\be\b/g, 'Math.E')
    .replace(/\^/g, '**')
    .replace(/(?<!\.)%/g, '/100') // 10% => /100
    .replace(/\bsin\(/g, 'Math.sin(')
    .replace(/\bcos\(/g, 'Math.cos(')
    .replace(/\btan\(/g, 'Math.tan(')
    .replace(/\bsqrt\(/g, 'Math.sqrt(')
    .replace(/\blog10\(/g, 'Math.log10(')
    .replace(/\bln\(/g, 'Math.log(')
    .replace(/\babs\(/g, 'Math.abs(');
  return s;
}

export default function FloatCalc() {
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
      return Number.isFinite(val) ? String(val) : '';
    } catch {
      setError(null); // don’t show error while typing
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
        aria-label="Open calculator"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg px-4 py-3 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {open ? '×' : 'Calc'}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[320px] max-w-[92vw] rounded-2xl border bg-white shadow-xl">
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
            />
            {result && !error && (
              <div className="text-right text-sm text-gray-500 mt-1">= {result}</div>
            )}
            {error && <div className="text-right text-sm text-red-600 mt-1">{error}</div>}

            {/* Keypads */}
            {mode === 'sci' && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {[
                  ['sin(', 'cos(', 'tan(', 'sqrt(', 'abs('],
                  ['log10(', 'ln(', '(', ')', '^'],
                  ['π', 'e', '%', '00', '.'],
                ].flat().map((b) => (
                  <button key={b} onClick={() => press(b)}
                    className="rounded bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm">
                    {b.replace('log10', 'log₁₀')}
                  </button>
                ))}
              </div>
            )}

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
          </div>
        </div>
      )}
    </>
  );
}
