"use client";
import { useMemo, useState } from "react";
const nf0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

function maturityLumpSum(P: number, rYear: number, years: number, m = 12) {
  const r = rYear / 100 / m;
  return P * Math.pow(1 + r, years * m);
}

export default function InvestVsFD() {
  const [principal, setPrincipal] = useState(500000);
  const [years, setYears] = useState(5);
  const [invReturn, setInvReturn] = useState(12);
  const [fdRate, setFdRate] = useState(7);
  const [fdComp, setFdComp] = useState<"M" | "Q">("Q");

  const result = useMemo(() => {
    const invMaturity = maturityLumpSum(principal, invReturn, years, 12);
    const fdM = fdComp === "Q" ? 4 : 12;
    const fdMaturity = maturityLumpSum(principal, fdRate, years, fdM);
    return {
      invMaturity,
      invGain: invMaturity - principal,
      fdMaturity,
      fdGain: fdMaturity - principal,
      diff: invMaturity - fdMaturity,
    };
  }, [principal, years, invReturn, fdRate, fdComp]);

  return (
    <section className="max-w-3xl mx-auto grid gap-6">
      <h1 className="text-2xl font-semibold">Investment vs. FD Comparison</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span>Lump Sum Amount</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={principal} onChange={(e) => setPrincipal(+e.target.value)} min={0}/>
        </label>
        <label className="grid gap-1">
          <span>Tenure (years)</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={years} onChange={(e) => setYears(+e.target.value)} min={1}/>
        </label>
        <label className="grid gap-1">
          <span>Investment Return (p.a. %)</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={invReturn} onChange={(e) => setInvReturn(+e.target.value)} step="0.1"/>
        </label>
        <label className="grid gap-1">
          <span>FD Interest Rate (p.a. %)</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={fdRate} onChange={(e) => setFdRate(+e.target.value)} step="0.1"/>
        </label>
        <label className="grid gap-1">
          <span>FD Compounding</span>
          <select className="border rounded px-3 py-2 bg-white" value={fdComp}
            onChange={(e) => setFdComp(e.target.value as any)}>
            <option value="Q">Quarterly</option>
            <option value="M">Monthly</option>
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 shadow grid gap-1">
          <div className="font-medium">Investment Maturity</div>
          <div className="text-2xl font-bold">₹ {nf0.format(result.invMaturity)}</div>
          <div className="text-sm text-gray-600">Gain: ₹ {nf0.format(result.invGain)}</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow grid gap-1">
          <div className="font-medium">FD Maturity</div>
          <div className="text-2xl font-bold">₹ {nf0.format(result.fdMaturity)}</div>
          <div className="text-sm text-gray-600">Interest: ₹ {nf0.format(result.fdGain)}</div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 text-blue-900">
        Difference after {years}y: <strong>₹ {nf0.format(result.diff)}</strong>
      </div>
    </section>
  );
}
