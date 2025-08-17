// components/calculators/CreditCardPayoff.tsx
"use client";

import { useMemo, useState } from "react";

type Mode = "byPayment" | "byMonths";
type PayoffResult = { months: number; totalInterest: number };

function payoffByFixedPayment(balance: number, payment: number, apr: number): PayoffResult {
  if (balance <= 0 || payment <= 0 || apr < 0) return { months: 0, totalInterest: 0 };

  const r = apr / 1200; // monthly rate
  if (r === 0) {
    return { months: Math.max(0, Math.ceil(balance / payment)), totalInterest: 0 };
  }

  // If payment cannot even cover first month's interest → never pays off
  const minPayment = balance * r;
  if (payment <= minPayment) {
    return { months: Number.POSITIVE_INFINITY, totalInterest: Number.NaN };
  }

  let months = 0;
  let totalInt = 0;
  let principal = balance;

  // Cap to avoid runaway loops (e.g., 100 years)
  const MAX_MONTHS = 1200;

  while (principal > 0 && months < MAX_MONTHS) {
    const interest = principal * r;
    const principalPay = Math.min(principal, payment - interest);
    principal -= principalPay;
    totalInt += interest;
    months++;
  }

  if (months >= MAX_MONTHS) {
    return { months: Number.POSITIVE_INFINITY, totalInterest: Number.NaN };
  }

  return { months, totalInterest: totalInt };
}

function paymentForMonths(balance: number, apr: number, months: number): number {
  if (balance <= 0 || months <= 0 || apr < 0) return 0;
  const r = apr / 1200;
  if (r === 0) return balance / months;
  return (balance * r) / (1 - Math.pow(1 + r, -months));
}

export default function CreditCardPayoff() {
  const [mode, setMode] = useState<Mode>("byPayment");
  const [balance, setBalance] = useState<number>(50000);
  const [apr, setApr] = useState<number>(24);
  const [payment, setPayment] = useState<number>(3000);
  const [targetMonths, setTargetMonths] = useState<number>(24);

  const calc = useMemo(() => {
    if (mode === "byPayment") {
      const res = payoffByFixedPayment(balance, payment, apr);
      return { months: res.months, payment, totalInterest: res.totalInterest };
    } else {
      const pmt = paymentForMonths(balance, apr, targetMonths);
      const res = payoffByFixedPayment(balance, pmt, apr);
      return { months: res.months, payment: pmt, totalInterest: res.totalInterest };
    }
  }, [mode, balance, apr, payment, targetMonths]);

  const fmtMoney = (n: number) =>
    Number.isFinite(n) ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n) : "—";

  const fmtInt = (n: number) => (Number.isFinite(n) ? Math.round(n) : "—");

  const tooLow =
    apr > 0 && mode === "byPayment" && payment <= (balance * (apr / 1200));

  return (
    <section className="space-y-6">
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded ${mode === "byPayment" ? "bg-black text-white" : "bg-gray-200"}`}
          onClick={() => setMode("byPayment")}
        >
          Payoff by Payment
        </button>
        <button
          className={`px-3 py-1 rounded ${mode === "byMonths" ? "bg-black text-white" : "bg-gray-200"}`}
          onClick={() => setMode("byMonths")}
        >
          Payoff by Months
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-gray-600">Current Balance</span>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="mt-1 w-full rounded border px-3 py-2"
            min={0}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">APR %</span>
          <input
            type="number"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="mt-1 w-full rounded border px-3 py-2"
            min={0}
            step="0.01"
          />
        </label>

        {mode === "byPayment" ? (
          <label className="block">
            <span className="text-sm text-gray-600">Monthly Payment</span>
            <input
              type="number"
              value={payment}
              onChange={(e) => setPayment(Number(e.target.value))}
              className="mt-1 w-full rounded border px-3 py-2"
              min={0}
            />
          </label>
        ) : (
          <label className="block">
            <span className="text-sm text-gray-600">Target Months</span>
            <input
              type="number"
              value={targetMonths}
              onChange={(e) => setTargetMonths(Number(e.target.value))}
              className="mt-1 w-full rounded border px-3 py-2"
              min={1}
            />
          </label>
        )}
      </div>

      {tooLow && (
        <p className="text-sm text-red-600">
          Payment is too low to cover monthly interest. Increase the payment.
        </p>
      )}

      <div className="rounded border p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500">Months to Payoff</div>
            <div className="text-xl font-semibold">{fmtInt(calc.months)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Suggested Payment</div>
            <div className="text-xl font-semibold">{fmtMoney(calc.payment)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Interest</div>
            <div className="text-xl font-semibold">{fmtMoney(calc.totalInterest)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
