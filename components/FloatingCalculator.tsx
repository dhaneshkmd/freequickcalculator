'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Op = '+' | '−' | '×' | '÷' | '^' | null;

function compute(a: number, b: number, op: Op) {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    case '^': return Math.pow(a, b);
    default: return b;
  }
}

function format(n: number) {
  if (!isFinite(n)) return 'Error';
  // avoid exponential noise
  const s = Math.abs(n) >= 1e12 || (Math.abs(n) !== 0 && Math.abs(n) < 1e-9)
    ? n.toExponential(6)
    : n.toLocaleString(undefined, { maximumFractionDigits: 12 });
  return s.replace(/\.0+($|e)/, '$1').replace(/(\.\d*?[1-9])0+($|e)/, '$1$2');
}

export default function FloatingCalculator() {
  // UI state
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'basic' | 'sci'>('basic');
  const [rad, setRad] = useState<boolean>(true);

  // calc state
  const [display, setDisplay] = useState('0');
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<Op>(null);
  const [overwrite, setOverwrite] = useState(true);

  // position (draggable)
  const [pos, setPos] = useState<{x:number;y:number}>(() => {
    if (typeof window === 'undefined') return { x: 24, y: 24 };
    try {
      const p = JSON.parse(localStorage.getItem('fc_pos') || 'null');
      return p ?? { x: 24, y: 24 };
    } catch { return { x: 24, y: 24 }; }
  });
  const dragging = useRef<{dx:number;dy:number}|null>(null);

  useEffect(() => {
    try { localStorage.setItem('fc_pos', JSON.stringify(pos)); } catch {}
  }, [pos]);

  useEffect(() => {
    try { localStorage.setItem('fc_rad', JSON.stringify(rad)); } catch {}
  }, [rad]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('fc_rad') || 'null');
      if (typeof saved === 'boolean') setRad(saved);
    } catch {}
  }, []);

  // number & operator handlers
  const setNumber = useCallback((n: string) => {
    setDisplay((d) => {
      if (overwrite || d === '0') {
        setOverwrite(false);
        return n;
      }
      return d + n;
    });
  }, [overwrite]);

  const dot = () => setDisplay((d) => (overwrite ? '0.' : (d.includes('.') ? d : d + '.'))) || setOverwrite(false);

  const clear = () => {
    setDisplay('0');
    setAcc(null);
    setOp(null);
    setOverwrite(true);
  };

  const backspace = () => setDisplay((d) => (overwrite ? d : (d.length <= 1 || (d.length === 2 && d.startsWith('-'))) ? '0' : d.slice(0, -1)));

  const pressOp = (next: Op) => {
    const cur = parseFloat(display.replace(/,/g, ''));
    if (acc === null) {
      setAcc(cur);
    } else if (!overwrite) {
      setAcc(compute(acc, cur, op));
      setDisplay(format(compute(acc, cur, op)));
    }
    setOp(next);
    setOverwrite(true);
  };

  const equals = () => {
    const cur = parseFloat(display.replace(/,/g, ''));
    if (op && acc !== null) {
      const res = compute(acc, cur, op);
      setDisplay(format(res));
      setAcc(null);
      setOp(null);
      setOverwrite(true);
    }
  };

  // unary scientific ops acting on current display
  const applyUnary = (fn: (x:number)=>number) => {
    const cur = parseFloat(display.replace(/,/g, ''));
    const res = fn(cur);
    setDisplay(format(res));
    setOverwrite(true);
  };

  const toRad = (x:number) => rad ? x : (x * Math.PI / 180);

  // keyboard
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (/\d/.test(k)) { setNumber(k); return; }
      if (k === '.') { dot(); return; }
      if (k === 'Enter' || k === '=') { e.preventDefault(); equals(); return; }
      if (k === 'Backspace') { backspace(); return; }
      if (k === 'Escape') { setOpen(false); return; }
      if (k === '+') pressOp('+');
      if (k === '-') pressOp('−');
      if (k === '*') pressOp('×');
      if (k === '/') pressOp('÷');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setNumber]);

  // dragging handlers
  const onMouseDown = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    dragging.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    setPos({ x: Math.max(8, window.innerWidth - (e.clientX - dragging.current.dx) - 320),
             y: Math.max(8, window.innerHeight - (e.clientY - dragging.current.dy) - 420) });
  };
  const onMouseUp = () => {
    dragging.current = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  // computed
  const shown = useMemo(() => display, [display]);

  return (
    <>
      {/* Floating button */}
      <button
        aria-label="Open Calculator"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[60] h-14 w-14 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring"
      >
        {/* calculator icon */}
        <svg viewBox="0 0 24 24" className="mx-auto h-7 w-7" fill="currentColor">
          <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 4v2h12V6H6zm0 4v8h12v-8H6zm2 2h2v2H8v-2zm0 3h2v2H8v-2zm3-3h2v2h-2v-2zm0 3h2v2h-2v-2zm3-3h2v5h-2v-5z"/>
        </svg>
      </button>

      {/* Pop-up panel */}
      {open && (
        <div className="fixed inset-0 z-[59]" aria-modal="true" role="dialog">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          {/* panel */}
          <div
            className="fixed bottom-20 right-4 w-[320px] rounded-2xl border bg-white shadow-2xl select-none"
            style={{ transform: `translate(-${pos.x}px, -${pos.y}px)` }}
          >
            {/* header / drag handle */}
            <div
              onMouseDown={onMouseDown}
              className="cursor-move rounded-t-2xl bg-gray-100 px-4 py-2 flex items-center justify-between"
            >
              <div className="text-sm font-medium">Calculator</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setTab('basic')} className={`text-xs px-2 py-1 rounded ${tab==='basic'?'bg-white border':''}`}>Basic</button>
                <button onClick={() => setTab('sci')} className={`text-xs px-2 py-1 rounded ${tab==='sci'?'bg-white border':''}`}>Scientific</button>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="ml-2 rounded p-1 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* display */}
            <div className="px-4 pt-4">
              <div className="w-full rounded-xl bg-gray-900 text-white text-right px-3 py-3 text-2xl font-semibold tabular-nums">
                {shown}
              </div>
            </div>

            {/* buttons */}
            <div className="p-4 grid grid-cols-4 gap-2">
              {/* Basic pad */}
              {tab === 'basic' && (
                <>
                  <Btn onClick={() => clear()} className="col-span-1 bg-gray-200">AC</Btn>
                  <Btn onClick={() => applyUnary((x)=>-x)} className="bg-gray-200">±</Btn>
                  <Btn onClick={() => applyUnary((x)=>x/100)} className="bg-gray-200">%</Btn>
                  <Btn onClick={() => pressOp('÷')} kind="op">÷</Btn>

                  <DigitRow nums={['7','8','9']} setNumber={setNumber} />
                  <Btn onClick={() => pressOp('×')} kind="op">×</Btn>

                  <DigitRow nums={['4','5','6']} setNumber={setNumber} />
                  <Btn onClick={() => pressOp('−')} kind="op">−</Btn>

                  <DigitRow nums={['1','2','3']} setNumber={setNumber} />
                  <Btn onClick={() => pressOp('+')} kind="op">+</Btn>

                  <Btn onClick={() => setNumber('0')} className="col-span-2">0</Btn>
                  <Btn onClick={dot}>.</Btn>
                  <Btn onClick={equals} kind="eq">=</Btn>

                  <Btn onClick={backspace} className="col-span-4 bg-gray-100">⌫</Btn>
                </>
              )}

              {/* Scientific pad */}
              {tab === 'sci' && (
                <>
                  <Btn onClick={() => applyUnary((x)=>Math.sqrt(x))}>√</Btn>
                  <Btn onClick={() => applyUnary((x)=>x*x)}>x²</Btn>
                  <Btn onClick={() => { pressOp('^'); }} title="xʸ (press then enter second value)">xʸ</Btn>
                  <Btn onClick={() => applyUnary((x)=>1/x)}>1/x</Btn>

                  <Btn onClick={() => applyUnary((x)=>Math.sin(toRad(x)))}>sin</Btn>
                  <Btn onClick={() => applyUnary((x)=>Math.cos(toRad(x)))}>cos</Btn>
                  <Btn onClick={() => applyUnary((x)=>Math.tan(toRad(x)))}>tan</Btn>
                  <Btn onClick={() => setRad(r => !r)} className="bg-gray-200">{rad ? 'rad' : 'deg'}</Btn>

                  <Btn onClick={() => applyUnary((x)=>Math.log10(x))}>log</Btn>
                  <Btn onClick={() => applyUnary((x)=>Math.log(x))}>ln</Btn>
                  <Btn onClick={() => setDisplay(format(Math.PI))}>π</Btn>
                  <Btn onClick={() => setDisplay(format(Math.E))}>e</Btn>

                  {/* basic ops and digits also here */}
                  <DigitRow nums={['7','8','9']} setNumber={setNumber} />
                  <Btn onClick={() => pressOp('÷')} kind="op">÷</Btn>

                  <DigitRow nums={['4','5','6']} setNumber={setNumber} />
                  <Btn onClick={() => pressOp('×')} kind="op">×</Btn>

                  <DigitRow nums={['1','2','3']} setNumber={setNumber} />
                  <Btn onClick={() => pressOp('−')} kind="op">−</Btn>

                  <Btn onClick={() => setNumber('0')} className="col-span-2">0</Btn>
                  <Btn onClick={dot}>.</Btn>
                  <Btn onClick={() => pressOp('+')} kind="op">+</Btn>

                  <Btn onClick={equals} kind="eq" className="col-span-4">=</Btn>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* --- small helpers --- */
function Btn({
  children, onClick, kind, className = '', title,
}: { children: React.ReactNode; onClick: () => void; kind?: 'op'|'eq'; className?: string; title?: string }) {
  const base =
    'rounded-xl px-3 py-2 text-lg font-medium text-center bg-gray-50 hover:bg-gray-100 active:scale-[0.98] focus:outline-none';
  const style = kind === 'op'
    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
    : kind === 'eq'
      ? 'bg-blue-600 text-white hover:bg-blue-500'
      : '';
  return (
    <button title={title} onClick={onClick} className={`${base} ${style} ${className}`}>{children}</button>
  );
}

function DigitRow({ nums, setNumber }: { nums: string[]; setNumber: (n:string)=>void }) {
  return (
    <>
      {nums.map(n => (
        <Btn key={n} onClick={() => setNumber(n)}>{n}</Btn>
      ))}
    </>
  );
}
