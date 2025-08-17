"use client";
import { useMemo, useState } from "react";
const nf0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

function monthsToPayoff(balance: number, aprPct: number, payment: number) {
  const r = aprPct / 100 / 12;
  if (payment <= balance * r) return Infinity;
  return (Math.log(1 - (r * balance) / payment) / Math.log(1 + r)) * -1;
}
function paymentForMonths(balance: number, aprPct: number, months: number) {
  const r = aprPct / 100 / 12;
  if (r === 0) return balance / months;
  return (balance * r) / (1 - Math.pow(1 + r, -months));
}
function totalInterest(balance: number, payment: number, aprPct: number) {
  const n = monthsToPayoff(balance, aprPct, payment);
  if (!isFinite(n) || n <= 0) return { months: Infinity, totalInterest: Infinity };
  const months = Math.ceil(n);
  const totalPaid = payment * months;
  return { months, totalInterest: Math.max(0, totalPaid - balance) };
}

export default function CreditCardPayoff() {
  const [balance, setBalance] = useState(120000);
  const [apr, setApr] = useState(36);
  const [mode, setMode] = useState<"byPayment" | "byMonths">("byPayment");
  const [payment, setPayment] = useState(8000);
  const [targetMonths, setTargetMonths] = useState(18);

  const calc = useMemo(() => {
    if (mode === "byPayment") {
      const { months, totalInterest } = totalInterest(balance, payment, apr);
      return { months, payment, totalInterest };
    } else {
      const pmt = paymentForMonths(balance, apr, targetMonths);
      const { totalInterest } = totalInterest(balance, pmt, apr);
      return { months: targetMonths, payment: pmt, totalInterest };
    }
  }, [mode, balance, apr, payment, targetMonths]);

  const payoffMsg =
    !isFinite(calc.months) ? "Payment too low to ever pay off." : `${calc.months} months`;

  return (
    <section className="max-w-3xl mx-auto grid gap-6">
      <h1 className="text-2xl font-semibold">Credit Card Payoff Calculator</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span>Current Balance</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={balance} onChange={(e) => setBalance(+e.target.value)} min={0}/>
        </label>
        <label className="grid gap-1">
          <span>APR (p.a. %)</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={apr} onChange={(e) => setApr(+e.target.value)} step="0.1" min={0}/>
        </label>
      </div>

      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2">
          <input type="radio" name="mode" value="byPayment"
            checked={mode === "byPayment"} onChange={() => setMode("byPayment")}/>
          <span>Given a monthly payment</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="mode" value="byMonths"
            checked={mode === "byMonths"} onChange={() => setMode("byMonths")}/>
          <span>Pay off in N months</span>
        </label>
      </div>

      {mode === "byPayment" ? (
        <label className="grid gap-1 max-w-xs">
          <span>Monthly Payment</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={payment} onChange={(e) => setPayment(+e.target.value)} min={0}/>
        </label>
      ) : (
        <label className="grid gap-1 max-w-xs">
          <span>Target Months</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={targetMonths} onChange={(e) => setTargetMonths(+e.target.value)} min={1}/>
        </label>
      )}

      <div className="rounded-lg bg-white p-4 shadow grid gap-1">
        <div className="font-medium">Time to payoff</div>
        <div className="text-2xl font-bold">{payoffMsg}</div>
        <div className="text-sm text-gray-600">Required monthly payment: ₹ {nf0.format(calc.payment)}</div>
        <div className="text-sm text-gray-600">
          Total interest: {isFinite(calc.totalInterest) ? `₹ ${nf0.format(calc.totalInterest)}` : "—"}
        </div>
      </div>

      <p className="text-xs text-gray-600">
        Uses fixed-payment math with monthly compounding. Real card terms may vary (fees, grace, etc.).
      </p>
    </section>
  );
}
