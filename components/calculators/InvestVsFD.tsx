'use client';
import { useMemo, useState } from 'react';

function fvLumpSum(p: number, rPct: number, years: number, n: number) {
  const r = rPct / 100;
  return p * Math.pow(1 + r / n, n * years);
}

export default function InvestVsFD() {
  const [principal, setPrincipal] = useState(100000);
  const [years, setYears] = useState(5);
  const [investRate, setInvestRate] = useState(11); // p.a. %
  const [fdRate, setFdRate] = useState(7);          // p.a. %
  const [comp, setComp] = useState<'annual' | 'quarterly' | 'monthly'>('annual');

  const n = comp === 'monthly' ? 12 : comp === 'quarterly' ? 4 : 1;

  const { fvInvest, fvFd, delta } = useMemo(() => {
    const fvI = fvLumpSum(principal, investRate, years, n);
    const fvF = fvLumpSum(principal, fdRate, years, n);
    return { fvInvest: fvI, fvFd: fvF, delta: fvI - fvF };
  }, [principal, years, investRate, fdRate, n]);

  const fmt = (v: number) =>
    v.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-gray-600">Principal (₹ / $)</span>
          <input
            type="number" className="mt-1 w-full rounded border px-3 py-2"
            value={principal} min={0}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">Years</span>
          <input
            type="number" className="mt-1 w-full rounded border px-3 py-2"
            value={years} min={0} step={0.5}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">Investment return (p.a. %)</span>
          <input
            type="number" className="mt-1 w-full rounded border px-3 py-2"
            value={investRate} step={0.1}
            onChange={(e) => setInvestRate(Number(e.target.value))}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">FD interest (p.a. %)</span>
          <input
            type="number" className="mt-1 w-full rounded border px-3 py-2"
            value={fdRate} step={0.1}
            onChange={(e) => setFdRate(Number(e.target.value))}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm text-gray-600">Compounding</span>
          <select
            className="mt-1 w-full rounded border px-3 py-2"
            value={comp}
            onChange={(e) => setComp(e.target.value as any)}
          >
            <option value="annual">Annual (n=1)</option>
            <option value="quarterly">Quarterly (n=4)</option>
            <option value="monthly">Monthly (n=12)</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-2">Results</h3>
        <ul className="space-y-1 text-sm">
          <li>Future value — Investment: <b>{fmt(fvInvest)}</b></li>
          <li>Future value — FD: <b>{fmt(fvFd)}</b></li>
          <li>Difference: <b>{fmt(delta)}</b> {delta >= 0 ? '(Investment ahead)' : '(FD ahead)'}</li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">
          Formula (both options): <code>FV = P × (1 + r/n)^(n×t)</code>
        </p>
      </div>
    </section>
  );
}
