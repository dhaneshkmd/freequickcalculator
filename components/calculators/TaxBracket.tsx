"use client";
import { useMemo, useState } from "react";

type Bracket = { upTo: number | null; rate: number }; // upTo=null => top bracket
const nf0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
const nf2 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

function calcTax(income: number, brackets: Bracket[], allowance = 0) {
  let taxable = Math.max(0, income - allowance);
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    const upper = b.upTo ?? Infinity;
    const slice = Math.max(0, Math.min(taxable, upper - lower));
    tax += slice * (b.rate / 100);
    lower = upper;
    if (taxable <= upper) break;
  }
  return tax;
}

const presets = {
  US_Approx_2024_Single: {
    allowance: 0,
    brackets: [
      { upTo: 11600, rate: 10 },
      { upTo: 47150, rate: 12 },
      { upTo: 100525, rate: 22 },
      { upTo: 191950, rate: 24 },
      { upTo: 243725, rate: 32 },
      { upTo: 609350, rate: 35 },
      { upTo: null, rate: 37 },
    ],
  },
  UK_Approx_2024_25_rUK: {
    allowance: 12570,
    brackets: [
      { upTo: 50270, rate: 20 },
      { upTo: 125140, rate: 40 },
      { upTo: null, rate: 45 },
    ],
  },
  India_NewRegime_2024_25: {
    allowance: 0,
    brackets: [
      { upTo: 300000, rate: 0 },
      { upTo: 700000, rate: 5 },
      { upTo: 1000000, rate: 10 },
      { upTo: 1200000, rate: 15 },
      { upTo: 1500000, rate: 20 },
      { upTo: null, rate: 30 },
    ],
  },
  UAE_Gulf_NoPIT: {
    allowance: 0,
    brackets: [{ upTo: null, rate: 0 }],
  },
};

export default function TaxBracket() {
  const [income, setIncome] = useState(1200000);
  const [preset, setPreset] = useState<keyof typeof presets>("India_NewRegime_2024_25");
  const [rows, setRows] = useState<Bracket[]>(presets[preset].brackets);
  const [allowance, setAllowance] = useState<number>(presets[preset].allowance);

  const tax = useMemo(() => calcTax(income, rows, allowance), [income, rows, allowance]);
  const effective = income > 0 ? (tax / income) * 100 : 0;

  function onPresetChange(p: keyof typeof presets) {
    setPreset(p);
    setRows(presets[p].brackets);
    setAllowance(presets[p].allowance);
  }

  function updateRow(i: number, key: keyof Bracket, val: number | null) {
    setRows(rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)));
  }

  return (
    <section className="max-w-3xl mx-auto grid gap-6">
      <h1 className="text-2xl font-semibold">Tax Bracket Calculator</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span>Preset</span>
          <select className="border rounded px-3 py-2 bg-white"
            value={preset} onChange={(e) => onPresetChange(e.target.value as any)}>
            {Object.keys(presets).map((k) => (
              <option key={k} value={k}>{k.replaceAll("_", " ")}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          <span>Taxable Income</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={income} onChange={(e) => setIncome(+e.target.value)} min={0}/>
        </label>
        <label className="grid gap-1">
          <span>Personal Allowance / Standard Deduction</span>
          <input type="number" className="border rounded px-3 py-2 bg-white"
            value={allowance} onChange={(e) => setAllowance(+e.target.value)} min={0}/>
        </label>
      </div>

      <div className="rounded-lg bg-white p-4 shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2">Up to (₹)</th>
              <th className="p-2">Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">
                  <input
                    className="border rounded px-3 py-2 bg-white w-48"
                    value={r.upTo ?? ""}
                    placeholder="Top bracket = empty"
                    onChange={(e) =>
                      updateRow(i, "upTo", e.target.value === "" ? null : +e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    className="border rounded px-3 py-2 bg-white w-28"
                    type="number"
                    value={r.rate}
                    onChange={(e) => updateRow(i, "rate", +e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-3 inline-flex items-center rounded px-3 py-2 bg-gray-900 text-white"
          onClick={() => setRows([...rows, { upTo: null, rate: 0 }])}>
          Add bracket
        </button>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 text-blue-900 grid gap-1">
        <div><strong>Estimated tax:</strong> ₹ {nf0.format(tax)}</div>
        <div><strong>Effective rate:</strong> {nf2.format(effective)}%</div>
        <p className="text-xs text-gray-600">
          Presets are simplified/approximate and editable. Verify with official sources.
        </p>
      </div>
    </section>
  );
}
