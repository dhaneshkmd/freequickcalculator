
'use client';

import React, { useMemo, useState } from 'react';
import './globals.css';

function currencyFmt(n: number, currency = 'USD') {
  if (!isFinite(n)) return '—';
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(n); } catch { return n.toFixed(2); }
}
function numberFmt(n: number) { return isFinite(n) ? new Intl.NumberFormat().format(n) : '—'; }

// -------- SIP --------
function computeSIP({ monthly = 10000, rate = 12, years = 10 }: { monthly: number; rate: number; years: number; }) {
  const i = rate / 12 / 100;
  const n = years * 12;
  const future = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = monthly * n;
  const gain = future - invested;
  return { future, invested, gain };
}
function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [ccy, setCcy] = useState('INR');
  const res = useMemo(() => computeSIP({ monthly, rate, years }), [monthly, rate, years]);
  return (
    <CalculatorCard title="SIP Calculator" subtitle="Monthly investing growth projection">
      <FormGrid>
        <NumberField label="Monthly Investment" value={monthly} onChange={setMonthly} suffix={ccy} />
        <NumberField label="Expected Annual Return" value={rate} onChange={setRate} suffix="%" />
        <NumberField label="Duration" value={years} onChange={setYears} suffix="years" />
        <SelectField label="Currency" value={ccy} onChange={setCcy} options={['INR','AED','USD','EUR']} />
      </FormGrid>
      <ResultRow label="Total Invested" value={currencyFmt(res.invested, ccy)} />
      <ResultRow label="Estimated Returns (Gain)" value={currencyFmt(res.gain, ccy)} />
      <ResultRow label="Future Value" value={currencyFmt(res.future, ccy)} highlight />
      <MiniTable rows={[
        ['Monthly', currencyFmt(monthly, ccy)],
        ['Years', numberFmt(years)],
        ['Annual Return', `${rate}%`],
        ['Months', numberFmt(years*12)],
      ]} />
      <Disclaimer text="Educational estimates; not financial advice. Actual returns vary." />
    </CalculatorCard>
  );
}

// -------- EMI --------
function computeEMI({ principal = 500000, annualRate = 9, years = 5 }: { principal: number; annualRate: number; years: number; }) {
  const r = annualRate / 12 / 100; const n = years * 12;
  const emi = r === 0 ? principal / n : principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const total = emi * n; const interest = total - principal;
  return { emi, total, interest };
}
function EMICalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(5);
  const [ccy, setCcy] = useState('INR');
  const res = useMemo(() => computeEMI({ principal, annualRate: rate, years }), [principal, rate, years]);
  return (
    <CalculatorCard title="Loan EMI Calculator" subtitle="Monthly equated installment & totals">
      <FormGrid>
        <NumberField label="Loan Amount" value={principal} onChange={setPrincipal} suffix={ccy} />
        <NumberField label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" />
        <NumberField label="Tenure" value={years} onChange={setYears} suffix="years" />
        <SelectField label="Currency" value={ccy} onChange={setCcy} options={['INR','AED','USD','EUR']} />
      </FormGrid>
      <ResultRow label="Monthly EMI" value={currencyFmt(res.emi, ccy)} highlight />
      <ResultRow label="Total Interest" value={currencyFmt(res.interest, ccy)} />
      <ResultRow label="Total Payment" value={currencyFmt(res.total, ccy)} />
      <Disclaimer text="For illustration only; lender policies and rates may differ." />
    </CalculatorCard>
  );
}

// -------- BMI --------
function computeBMI({ heightCm = 170, weightKg = 70 }: { heightCm: number; weightKg: number; }) {
  const h = heightCm / 100; const bmi = weightKg / (h * h);
  let category = 'Normal';
  if (bmi < 18.5) category = 'Underweight'; else if (bmi < 25) category = 'Normal'; else if (bmi < 30) category = 'Overweight'; else category = 'Obese';
  return { bmi, category };
}
function BMICalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const res = useMemo(() => computeBMI({ heightCm: height, weightKg: weight }), [height, weight]);
  return (
    <CalculatorCard title="BMI Calculator" subtitle="Body Mass Index (WHO ranges)">
      <FormGrid>
        <NumberField label="Height" value={height} onChange={setHeight} suffix="cm" />
        <NumberField label="Weight" value={weight} onChange={setWeight} suffix="kg" />
      </FormGrid>
      <ResultRow label="BMI" value={res.bmi.toFixed(1)} highlight />
      <ResultRow label="Category" value={res.category} />
      <Disclaimer text="Health info only; consult a professional for medical advice." />
    </CalculatorCard>
  );
}

// -------- Currency Converter (sample or manual) --------
const SAMPLE_RATES: Record<string, number> = {
  USD: 1,
  INR: 83,
  AED: 3.67,
  EUR: 0.92,
};
function CurrencyConverter() {
  const [base, setBase] = useState('INR');
  const [quote, setQuote] = useState('AED');
  const [amount, setAmount] = useState(1000);
  const [useSample, setUseSample] = useState(true);
  const [manualRate, setManualRate] = useState(0);

  const rate = useMemo(() => {
    if (useSample) {
      const usdPerBase = 1 / SAMPLE_RATES[base];
      const quotePerUsd = SAMPLE_RATES[quote];
      return usdPerBase * quotePerUsd;
    }
    return manualRate || 0;
  }, [base, quote, manualRate, useSample]);

  const converted = amount * rate;

  return (
    <CalculatorCard title="Currency Converter" subtitle="Convert between INR, AED, USD, EUR">
      <FormGrid>
        <SelectField label="From" value={base} onChange={setBase} options={Object.keys(SAMPLE_RATES)} />
        <SelectField label="To" value={quote} onChange={setQuote} options={Object.keys(SAMPLE_RATES)} />
        <NumberField label="Amount" value={amount} onChange={setAmount} />
        <label className="flex items-center gap-2 mt-6">
          <input type="checkbox" checked={useSample} onChange={(e)=>setUseSample(e.target.checked)} />
          <span className="text-sm">Use sample rates (offline demo)</span>
        </label>
        {!useSample && (
          <NumberField label={`Manual Rate (1 ${base} = ? ${quote})`} value={manualRate} onChange={setManualRate} />
        )}
      </FormGrid>
      <ResultRow label="Rate" value={rate ? `${rate.toFixed(4)} ${quote} / ${base}` : '—'} />
      <ResultRow label="Converted" value={rate ? `${converted.toFixed(2)} ${quote}` : '—'} highlight />
      <Disclaimer text="Sample rates for demo. For production, fetch live FX via a serverless API." />
    </CalculatorCard>
  );
}

// -------- GST / VAT Calculator --------
function GSTVATCalculator() {
  const [region, setRegion] = useState<'India' | 'UAE'>('India');
  const [base, setBase] = useState(1000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<'Exclusive'|'Inclusive'>('Exclusive');
  const uaeRate = 5;

  const effectiveRate = region === 'India' ? rate : uaeRate;

  let tax = 0, total = 0, cgst = 0, sgst = 0, taxable = base;
  if (mode === 'Exclusive') {
    tax = base * (effectiveRate/100);
    total = base + tax;
  } else {
    const divisor = 1 + (effectiveRate/100);
    taxable = base / divisor;
    tax = base - taxable;
    total = base;
  }
  if (region === 'India') {
    cgst = tax/2; sgst = tax/2;
  }

  return (
    <CalculatorCard title="GST / VAT Calculator" subtitle="India GST (split CGST/SGST) or UAE VAT">
      <FormGrid>
        <SelectField label="Region" value={region} onChange={(v)=>setRegion(v as any)} options={['India','UAE']} />
        {region === 'India' ? (
          <SelectField label="GST Rate" value={String(rate)} onChange={(v)=>setRate(parseFloat(v)||0)} options={['0','5','12','18','28']} />
        ) : (
          <NumberField label="VAT Rate" value={uaeRate} onChange={()=>{}} suffix="%" />
        )}
        <NumberField label={mode==='Exclusive' ? 'Base Amount' : 'Amount (Tax Inclusive)'} value={base} onChange={setBase} />
        <SelectField label="Mode" value={mode} onChange={(v)=>setMode(v as any)} options={['Exclusive','Inclusive']} />
      </FormGrid>
      <MiniTable rows={[
        ['Taxable Value', currencyFmt(taxable, 'INR')],
        ['Tax Amount', currencyFmt(tax, 'INR')],
        ...(region === 'India' ? [['CGST', currencyFmt(cgst, 'INR')], ['SGST', currencyFmt(sgst, 'INR')]] as any : []),
        ['Total Payable', currencyFmt(total, 'INR')],
      ]} />
      <Disclaimer text="Rates simplified for quick estimation. Check your state rules for special cases." />
    </CalculatorCard>
  );
}

// -------------- UI primitives --------------
function CalculatorCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode; }) {
  return (
    <div className="rounded-2xl p-5 md:p-6 shadow-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
function FormGrid({ children }: { children: React.ReactNode; }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">{children}</div>;
}
function NumberField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix?: string; }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <div className="flex items-stretch rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden">
        <input type="number" className="w-full bg-white/70 dark:bg-slate-950/50 px-3 py-2 outline-none"
          value={value} onChange={(e) => onChange(parseFloat((e.target as HTMLInputElement).value) || 0)} />
        {suffix && <span className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700">{suffix}</span>}
      </div>
    </label>
  );
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (s: string) => void; options: string[]; }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <select className="w-full bg-white/70 dark:bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
        value={value} onChange={(e) => onChange((e.target as HTMLSelectElement).value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function ResultRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean; }) {
  return (
    <div className={`flex items-center justify-between px-4 py-2 rounded-xl mb-2 ${highlight ? 'bg-green-50 dark:bg-green-900/20' : 'bg-slate-50 dark:bg-slate-800/40'}`}>
      <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
function MiniTable({ rows }: { rows: [string, string | number][]; }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={i} className="odd:bg-white/60 even:bg-slate-50/60 dark:odd:bg-slate-950/40 dark:even:bg-slate-900/40">
              <td className="px-3 py-2 text-slate-600 dark:text-slate-300 w-1/2">{k}</td>
              <td className="px-3 py-2 font-medium">{v as any}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Disclaimer({ text }: { text: string; }) {
  return <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{text}</p>;
}

function useTheme() {
  const [dark, setDark] = useState(true);
  React.useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  return { dark, setDark };
}

const TOOL_REGISTRY = [
  { id: 'sip', name: 'SIP Calculator', component: SIPCalculator, tags: ['finance','investing','mutual funds']},
  { id: 'emi', name: 'Loan EMI Calculator', component: EMICalculator, tags: ['finance','loan','emi']},
  { id: 'bmi', name: 'BMI Calculator', component: BMICalculator, tags: ['health','fitness','bmi']},
  { id: 'fx', name: 'Currency Converter', component: CurrencyConverter, tags: ['finance','currency','forex']},
  { id: 'gst', name: 'GST / VAT Calculator', component: GSTVATCalculator, tags: ['finance','tax','gst','vat']},
];

export default function Page() {
  const { dark, setDark } = useTheme();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string | null>(null);
  const tools = useMemo(() => TOOL_REGISTRY.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.tags.some(tag => tag.includes(query.toLowerCase()))), [query]);
  const Active = useMemo(() => TOOL_REGISTRY.find(t => t.id === active)?.component ?? null, [active]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="text-lg font-bold tracking-tight">Free Quick Calculator</div>
          <div className="flex-1" />
          <div className="hidden md:block mr-3 text-xs text-slate-500">Search (press /)</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark(!dark)} className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm">{dark ? 'Light' : 'Dark'} Mode</button>
            <a href="#" onClick={(e)=>{e.preventDefault(); setActive(null);}} className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm">Home</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {!Active && (
          <>
            <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] items-center">
              <label className="relative w-full">
                <input id="site-search" placeholder="Search tools (e.g., EMI, BMI, SIP, GST, Currency)" value={query} onChange={(e)=>setQuery((e.target as HTMLInputElement).value)}
                  className="w-full px-4 py-3 pr-10 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/40 outline-none" />
                <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">/</kbd>
              </label>
              <div className="text-sm text-slate-600 dark:text-slate-300">{tools.length} tool(s) found</div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map(t => (
                <button key={t.id} onClick={()=>setActive(t.id)} className="text-left group">
                  <div className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/40 hover:shadow-md transition">
                    <div className="text-base font-semibold mb-1">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.tags.join(', ')}</div>
                  </div>
                </button>
              ))}
            </div>

            <section className="mt-8">
              <h3 className="text-lg font-semibold mb-2">How to add more tools</h3>
              <ol className="list-decimal pl-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
                <li>Duplicate an entry in <code>TOOL_REGISTRY</code> and give it a unique <code>id</code> and <code>name</code>.</li>
                <li>Create a React component for the calculator UI + logic.</li>
                <li>Add discoverability tags for search.</li>
              </ol>
            </section>
          </>
        )}

        {Active && (
          <div className="max-w-3xl mx-auto">
            <button onClick={()=>setActive(null)} className="mb-4 text-sm underline">← Back to all tools</button>
            {Active && <Active />}
          </div>
        )}
      </main>
    </div>
  );
}

// Focus search with '/' key
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    const target = e.target as HTMLElement | null;
    if (e.key === '/' && !(target && (target.closest('input') || target.closest('textarea')))) {
      e.preventDefault();
      const el = document.getElementById('site-search') as HTMLInputElement | null;
      el?.focus();
    }
  });
}
