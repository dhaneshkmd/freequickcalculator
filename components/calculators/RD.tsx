'use client';

import { useMemo, useState, type ChangeEvent, type ReactNode } from 'react';

function fmt(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function RD() {
  const [monthly, setMonthly] = useState<number>(5000); // monthly deposit
  const [rate, setRate] = useState<number>(7);          // % p.a.
  const [months, setMonths] = useState<number>(24);     // total months

  const res = useMemo(() => {
    const P = Math.max(0, Number.isFinite(monthly) ? monthly : 0);
    const n = Math.max(1, Math.trunc(months));
    const i = Math.max(0, Number(rate)) / 100 / 12; // monthly rate

    // Ordinary annuity (deposit at end of month). Handle 0% gracefully.
    const fvOrdinary = i > 0 ? P * ((1 + i) ** n - 1) / i : P * n;

    const invested = P * n;
    const maturity = fvOrdinary;
    const interest = maturity - invested;

    return { invested, interest, maturity };
  }, [monthly, rate, months]);

  const onNum =
    (setter: (v: number) => void) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(Number(e.target.value));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border p-4 md:p-6 bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Recurring Deposit (RD)</h1>
        <p className="text-gray-600 mb-6">
          Monthly deposits with monthly compounding (ordinary annuity, end-of-month deposit).
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm">Monthly deposit</span>
            <input
              type="number"
              min={0}
              value={monthly}
              onChange={onNum(setMonthly)}
              className="w-full rounded-xl border px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Rate % p.a.</span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={rate}
              onChange={onNum(setRate)}
              className="w-full rounded-xl border px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Months</span>
            <input
              type="number"
              min={1}
              value={months}
              onChange={onNum(setMonths)}
              className="w-full rounded-xl border px-3 py-2"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card label="Invested">{fmt(res.invested)}</Card>
          <Card label="Interest">{fmt(res.interest)}</Card>
          <Card label="Maturity">{fmt(res.maturity)}</Card>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Formula: FV = P × ((1 + i)<sup>n</sup> − 1) / i where i = annual%/12/100. If rate is 0%, FV = P × n.
        </p>
      </div>
    </div>
  );
}

function Card({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl md:text-2xl font-semibold">{children}</div>
    </div>
  );
}
