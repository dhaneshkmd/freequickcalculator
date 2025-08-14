#!/usr/bin/env bash
set -euo pipefail

# --- Configs (pinned versions) ---
cat > package.json <<'PJSON'
{
  "name": "freequickcalculator",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" },
  "dependencies": {
    "next": "14.2.6",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/node": "20.14.12",
    "@types/react": "18.3.3",
    "autoprefixer": "10.4.20",
    "postcss": "8.4.41",
    "tailwindcss": "3.4.10",
    "typescript": "5.5.4"
  }
}
PJSON

cat > next.config.mjs <<'EOFN'
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
export default nextConfig;
EOFN

cat > tsconfig.json <<'EOFTS'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOFTS

cat > next-env.d.ts <<'EOFNE'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
EOFNE

# Tailwind+PostCSS; using JS config (rock-solid across environments)
cat > postcss.config.js <<'EOFPC'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
EOFPC

cat > tailwind.config.js <<'EOFTC'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: []
};
EOFTC

# --- Folders ---
mkdir -p styles public lib data components components/calculators app/calculator/[slug]

# --- Styles ---
cat > styles/globals.css <<'EOFCSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

input[type="number"], input[type="text"], select {
  @apply w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
label { @apply text-sm font-medium text-gray-700; }
button { @apply rounded-lg px-4 py-2 font-medium; }
.card { @apply rounded-2xl border border-gray-200 p-4 shadow-sm bg-white; }
.badge { @apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold; }
EOFCSS

echo "placeholder" > public/favicon.ico

# --- Lib helpers ---
cat > lib/format.ts <<'EOFF'
export function formatCurrency(n:number, locale="en-IN", currency="INR"){
  if(!isFinite(n)) return "-";
  try { return new Intl.NumberFormat(locale,{style:"currency",currency}).format(n); }
  catch { return n.toFixed(2); }
}
export function formatNumber(n:number, d=2){
  if(!isFinite(n)) return "-";
  return new Intl.NumberFormat("en-US",{maximumFractionDigits:d,minimumFractionDigits:0}).format(n);
}
export const parseSafeNumber=(v:string)=>{ const n=Number((v||"").replace(/[, ]+/g,"")); return isFinite(n)?n:0; };
EOFF

cat > lib/math.ts <<'EOFM'
export const toMonthlyRate=(apr:number)=> (apr/100)/12;
export function emiSchedule(P:number, apr:number, months:number){
  const i=toMonthlyRate(apr); const n=Math.max(1,Math.floor(months));
  let emi:number;
  if(i===0) emi=P/n; else { const pow=Math.pow(1+i,n); emi=P*i*pow/(pow-1); }
  let bal=P; const schedule=[];
  for(let m=1;m<=Math.min(12,n);m++){
    const interest=i===0?0:bal*i; const principal=Math.min(emi-interest, bal); bal=Math.max(0, bal-principal);
    schedule.push({month:m, interest, principal, balance:bal});
  }
  const totalPayment=emi*n, totalInterest=totalPayment-P;
  return { emi, totalPayment, totalInterest, schedule };
}
export const sipFutureValue=(P:number,apr:number,months:number)=>{
  const i=toMonthlyRate(apr); const n=Math.max(1,Math.floor(months));
  return i===0? P*n : P*((Math.pow(1+i,n)-1)/i)*(1+i);
};
export const bmiValue=(kg:number, cm:number)=>{ const m=cm/100; return m>0? kg/(m*m):0; };
export const bmiCategory=(b:number)=> b<=0?"—": b<18.5?"Underweight": b<25?"Normal": b<30?"Overweight":"Obesity";
EOFM

# --- Data registry (33 entries) ---
cat > data/calculators.ts <<'EOFD'
export type Category='Finance'|'Health'|'Utilities'|'Conversions'|'Tax'|'Dates & Time'|'Lifestyle';
export type ComponentId='SIP'|'EMI'|'BMI'|null;
export type Calculator={name:string; slug:string; description:string; category:Category; keywords:string[]; status:'ready'|'planned'; componentId:ComponentId; formulaNote?:string;};
export const calculators:Calculator[]=[
  {name:"SIP Calculator",slug:"sip",description:"Estimate the future value of monthly investments.",category:"Finance",keywords:["mutual fund","investment","sip"],status:"ready",componentId:"SIP",formulaNote:"FV = P * ((1+i)^n - 1)/i * (1+i)"},
  {name:"EMI Calculator",slug:"emi",description:"Monthly loan payment with interest and totals.",category:"Finance",keywords:["loan","emi","amortization","interest"],status:"ready",componentId:"EMI",formulaNote:"EMI = P*i*(1+i)^n / ((1+i)^n - 1)"},
  {name:"BMI Calculator",slug:"bmi",description:"Body Mass Index from height & weight.",category:"Health",keywords:["bmi","health"],status:"ready",componentId:"BMI",formulaNote:"BMI = kg / (m^2)"},
  {name:"Compound Interest",slug:"compound-interest",description:"Growth with compounding interest.",category:"Finance",keywords:["compound","interest"],status:"planned",componentId:null,formulaNote:"A=P(1+r/n)^(nt)"},
  {name:"Simple Interest",slug:"simple-interest",description:"Interest without compounding.",category:"Finance",keywords:["simple","interest"],status:"planned",componentId:null,formulaNote:"I = P*r*t"},
  {name:"Loan Eligibility",slug:"loan-eligibility",description:"Estimate max loan amount from income.",category:"Finance",keywords:["loan","eligibility"],status:"planned",componentId:null},
  {name:"Loan Compare",slug:"loan-compare",description:"Compare EMIs across lenders.",category:"Finance",keywords:["loan","compare"],status:"planned",componentId:null},
  {name:"Mortgage Payment",slug:"mortgage",description:"Home loan monthly payment.",category:"Finance",keywords:["mortgage","home"],status:"planned",componentId:null},
  {name:"Home Affordability",slug:"home-affordability",description:"Estimate home purchase budget.",category:"Finance",keywords:["mortgage","budget"],status:"planned",componentId:null},
  {name:"ROI",slug:"roi",description:"Return on Investment percentage.",category:"Finance",keywords:["return","profit"],status:"planned",componentId:null,formulaNote:"(Gain - Cost)/Cost"},
  {name:"Break-even Point",slug:"break-even",description:"Units or revenue to break even.",category:"Finance",keywords:["fixed cost","margin"],status:"planned",componentId:null},
  {name:"Inflation Adjusted Return",slug:"inflation-adjusted",description:"Real return after inflation.",category:"Finance",keywords:["inflation","real"],status:"planned",componentId:null},
  {name:"Fixed Deposit (FD)",slug:"fd",description:"FD maturity and interest.",category:"Finance",keywords:["fd","bank"],status:"planned",componentId:null},
  {name:"Recurring Deposit (RD)",slug:"rd",description:"RD maturity value.",category:"Finance",keywords:["rd","bank"],status:"planned",componentId:null},
  {name:"Savings Goal",slug:"savings-goal",description:"Monthly saving needed for a goal.",category:"Finance",keywords:["goal","savings"],status:"planned",componentId:null},
  {name:"Currency Converter",slug:"currency-converter",description:"Convert amounts across currencies.",category:"Finance",keywords:["forex","currency"],status:"planned",componentId:null},
  {name:"BMR",slug:"bmr",description:"Basal Metabolic Rate estimate.",category:"Health",keywords:["metabolism","calorie"],status:"planned",componentId:null},
  {name:"Body Fat %",slug:"body-fat",description:"Body fat estimation.",category:"Health",keywords:["fat","composition"],status:"planned",componentId:null},
  {name:"Daily Calorie Needs",slug:"daily-calories",description:"Maintenance calories per day.",category:"Health",keywords:["tdee","calories"],status:"planned",componentId:null},
  {name:"Calories Burned",slug:"calories-burned",description:"Calories burned during activities.",category:"Health",keywords:["exercise","burn"],status:"planned",componentId:null},
  {name:"Pregnancy Due Date",slug:"pregnancy-due-date",description:"Estimate due date from LMP.",category:"Health",keywords:["due date","pregnancy"],status:"planned",componentId:null},
  {name:"Percentage",slug:"percentage",description:"Find X% of Y or reverse.",category:"Utilities",keywords:["percent","increase","decrease"],status:"planned",componentId:null},
  {name:"Discount",slug:"discount",description:"Sale price after discount.",category:"Utilities",keywords:["sale","percent off"],status:"planned",componentId:null},
  {name:"Tip",slug:"tip",description:"Restaurant tip and bill split.",category:"Utilities",keywords:["bill","gratuity"],status:"planned",componentId:null},
  {name:"Unit: Length",slug:"unit-length",description:"Meters, feet, miles and more.",category:"Conversions",keywords:["length","convert"],status:"planned",componentId:null},
  {name:"Unit: Weight",slug:"unit-weight",description:"Kg, lb, oz conversions.",category:"Conversions",keywords:["weight","convert"],status:"planned",componentId:null},
  {name:"Unit: Temperature",slug:"unit-temperature",description:"Celsius, Fahrenheit, Kelvin.",category:"Conversions",keywords:["temperature","convert"],status:"planned",componentId:null},
  {name:"GST / VAT",slug:"gst-vat",description:"Add or remove GST/VAT.",category:"Tax",keywords:["gst","vat","tax"],status:"planned",componentId:null},
  {name:"Income Tax (India)",slug:"income-tax-india",description:"Estimate income tax slabs.",category:"Tax",keywords:["tax","india"],status:"planned",componentId:null},
  {name:"Sales Tax",slug:"sales-tax",description:"Price with sales tax.",category:"Tax",keywords:["sales","tax"],status:"planned",componentId:null},
  {name:"Date Difference",slug:"date-diff",description:"Days between dates.",category:"Dates & Time",keywords:["date","difference"],status:"planned",componentId:null},
  {name:"Time Zone Converter",slug:"time-zone",description:"Convert across time zones.",category:"Dates & Time",keywords:["time","zone","utc"],status:"planned",componentId:null},
  {name:"Age Calculator",slug:"age",description:"Exact age from birthdate.",category:"Lifestyle",keywords:["age","birthday"],status:"planned",componentId:null},
  {name:"Leap Year Checker",slug:"leap-year",description:"Is a year a leap year?",category:"Dates & Time",keywords:["leap","year"],status:"planned",componentId:null}
];
export const getCalculatorBySlug=(slug:string)=> calculators.find(c=>c.slug===slug);
EOFD

# --- Components (UI) ---
cat > components/Container.tsx <<'EOFC'
import React from "react";
export default function Container({children}:{children:React.ReactNode}) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}
EOFC

cat > components/Navbar.tsx <<'EOFN'
import Link from "next/link";
import Container from "./Container";
export default function Navbar(){
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">Free <span className="text-blue-600">Quick</span> Calculator</Link>
          <div className="hidden sm:block text-sm text-gray-500">fast • clean • free</div>
        </div>
      </Container>
    </nav>
  );
}
EOFN

cat > components/Footer.tsx <<'EOFFO'
import Container from "./Container";
export default function Footer(){
  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Free Quick Calculator. Built with Next.js + Tailwind.
        </div>
      </Container>
    </footer>
  );
}
EOFFO

cat > components/CalculatorCard.tsx <<'EOFCARD'
import Link from "next/link";
import type { Calculator } from "../data/calculators";
function emoji(cat:Calculator["category"]){return {Finance:"💰",Health:"💪",Utilities:"🧮",Conversions:"🔁",Tax:"🧾","Dates & Time":"🗓️",Lifestyle:"🎯"}[cat]||"🧠";}
export default function CalculatorCard({calc}:{calc:Calculator}){
  return (
    <Link href={`/calculator/${calc.slug}`} className="card block transition hover:shadow-md">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">{emoji(calc.category)}</span>
        <h3 className="text-lg font-semibold">{calc.name}</h3>
      </div>
      <p className="mb-3 text-sm text-gray-600">{calc.description}</p>
      <div className="flex items-center gap-2">
        <span className="badge bg-gray-100 text-gray-700">{calc.category}</span>
        {calc.status==="ready"?<span className="badge bg-green-100 text-green-700">Ready</span>:<span className="badge bg-yellow-100 text-yellow-700">Planned</span>}
      </div>
    </Link>
  );
}
EOFCARD

cat > components/SearchBar.tsx <<'EOFSEARCH'
"use client";
export default function SearchBar({value,onChange,placeholder="Search calculators..."}:{value:string;onChange:(v:string)=>void;placeholder?:string;}){
  return (
    <div className="relative">
      <input className="w-full rounded-2xl border-gray-300 pl-10 pr-4 py-3" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} aria-label="Search calculators"/>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none">🔎</span>
    </div>
  );
}
EOFSEARCH

cat > components/CategoryPills.tsx <<'EOFPILLS'
"use client";
export default function CategoryPills({categories,selected,onToggle}:{categories:string[];selected:Set<string>;onToggle:(c:string)=>void;}){
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat=>{
        const active=selected.has(cat);
        return (
          <button key={cat} type="button" onClick={()=>onToggle(cat)}
            className={`rounded-full px-3 py-1 text-sm border transition ${active?"border-blue-600 bg-blue-50 text-blue-700":"border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`} aria-pressed={active}>
            {cat}
          </button>
        );
      })}
    </div>
  );
}
EOFPILLS

cat > components/ComingSoon.tsx <<'EOFCOM'
import Link from "next/link";
export default function ComingSoon({title,description}:{title:string;description?:string;}){
  return (
    <div className="card text-center">
      <div className="mb-2 text-4xl">🚧</div>
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <p className="mb-4 text-gray-600">{description ?? "This calculator is on the way. Check back soon!"}</p>
      <Link href="/" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">← Back to all calculators</Link>
    </div>
  );
}
EOFCOM

cat > components/SearchGrid.tsx <<'EOFG'
"use client";
import { useMemo, useState } from "react";
import type { Calculator } from "../data/calculators";
import CalculatorCard from "./CalculatorCard";
import SearchBar from "./SearchBar";
import CategoryPills from "./CategoryPills";

export default function SearchGrid({calculators}:{calculators:Calculator[]}){
  const categories=useMemo(()=>Array.from(new Set(calculators.map(c=>c.category))).sort(),[calculators]);
  const [query,setQuery]=useState(""); const [selected,setSelected]=useState<Set<string>>(new Set());
  function toggle(c:string){ setSelected(p=>{const n=new Set(p); n.has(c)?n.delete(c):n.add(c); return n;});}
  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    const byQ=(c:Calculator)=>!q||c.name.toLowerCase().includes(q)||c.description.toLowerCase().includes(q)||c.category.toLowerCase().includes(q)||c.keywords.some(k=>k.toLowerCase().includes(q));
    const byCat=(c:Calculator)=>selected.size===0||selected.has(c.category);
    return calculators.filter(c=>byQ(c)&&byCat(c)).sort((a,b)=>a.status===b.status? a.name.localeCompare(b.name) : a.status==="ready"?-1:1);
  },[calculators,query,selected]);

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery}/>
      <CategoryPills categories={categories} selected={selected} onToggle={toggle}/>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c=><CalculatorCard key={c.slug} calc={c}/>)}
      </div>
      {filtered.length===0 && <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">No calculators match your search.</div>}
    </div>
  );
}
EOFG

# --- Calculators ---
cat > components/calculators/EMI.tsx <<'EOFEMI'
"use client";
import { useMemo, useState } from "react";
import { emiSchedule } from "../../lib/math";
import { formatCurrency, parseSafeNumber } from "../../lib/format";

export default function EMI(){
  const [principal,setPrincipal]=useState("500000");
  const [annualRate,setAnnualRate]=useState("9.5");
  const [tenure,setTenure]=useState("20");
  const [unit,setUnit]=useState<"years"|"months">("years");
  const [currency,setCurrency]=useState("INR");
  const [locale,setLocale]=useState("en-IN");

  const months=useMemo(()=>{ const t=parseSafeNumber(tenure); return unit==="years"?Math.round(t*12):Math.round(t); },[tenure,unit]);
  const result=useMemo(()=>emiSchedule(parseSafeNumber(principal), parseSafeNumber(annualRate), months),[principal,annualRate,months]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card space-y-3">
          <div><label>Principal</label><input type="number" value={principal} onChange={e=>setPrincipal(e.target.value)} /></div>
          <div><label>Annual Interest Rate (%)</label><input type="number" step="0.01" value={annualRate} onChange={e=>setAnnualRate(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label>Tenure</label><input type="number" value={tenure} onChange={e=>setTenure(e.target.value)} /></div>
            <div><label>Unit</label><select value={unit} onChange={e=>setUnit(e.target.value as any)}><option value="years">Years</option><option value="months">Months</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label>Currency</label><select value={currency} onChange={e=>setCurrency(e.target.value)}><option>INR</option><option>USD</option><option>AED</option><option>EUR</option></select></div>
            <div><label>Locale</label><select value={locale} onChange={e=>setLocale(e.target.value)}><option value="en-IN">en-IN</option><option value="en-US">en-US</option><option value="en-AE">en-AE</option><option value="en-GB">en-GB</option></select></div>
          </div>
        </div>
        <div className="card space-y-3">
          <h3 className="text-lg font-semibold">Results</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Stat label="Monthly EMI" value={formatCurrency(result.emi,locale,currency)} />
            <Stat label="Tenure (months)" value={String(months)} />
            <Stat label="Total Interest" value={formatCurrency(result.totalInterest,locale,currency)} />
            <Stat label="Total Payment" value={formatCurrency(result.totalPayment,locale,currency)} />
          </div>
          <p className="text-xs text-gray-500">* Approximate values. Actuals may vary by lender.</p>
        </div>
      </div>
      <div className="card">
        <h4 className="mb-3 text-base font-semibold">Amortization (first 12 months)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50"><tr><th className="px-3 py-2">Month</th><th className="px-3 py-2">Interest</th><th className="px-3 py-2">Principal</th><th className="px-3 py-2">Balance</th></tr></thead>
            <tbody>{result.schedule.map(r=><tr key={r.month} className="border-t"><td className="px-3 py-2">{r.month}</td><td className="px-3 py-2">{formatCurrency(r.interest,locale,currency)}</td><td className="px-3 py-2">{formatCurrency(r.principal,locale,currency)}</td><td className="px-3 py-2">{formatCurrency(r.balance,locale,currency)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function Stat({label,value}:{label:string;value:string}){ return <div className="rounded-lg bg-gray-50 p-3"><div className="text-xs text-gray-500">{label}</div><div className="text-lg font-semibold">{value}</div></div>; }
EOFEMI

cat > components/calculators/SIP.tsx <<'EOFSIP'
"use client";
import { useMemo, useState } from "react";
import { sipFutureValue } from "../../lib/math";
import { formatCurrency, parseSafeNumber } from "../../lib/format";

export default function SIP(){
  const [monthly,setMonthly]=useState("5000");
  const [annualRate,setAnnualRate]=useState("12");
  const [duration,setDuration]=useState("10");
  const [unit,setUnit]=useState<"years"|"months">("years");
  const [currency,setCurrency]=useState("INR");
  const [locale,setLocale]=useState("en-IN");

  const months=useMemo(()=>{ const t=parseSafeNumber(duration); return unit==="years"?Math.round(t*12):Math.round(t); },[duration,unit]);
  const fv=useMemo(()=>sipFutureValue(parseSafeNumber(monthly), parseSafeNumber(annualRate), months),[monthly,annualRate,months]);
  const invested=useMemo(()=>parseSafeNumber(monthly)*months,[monthly,months]);
  const gain=fv-invested;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card space-y-3">
          <div><label>Monthly Contribution</label><input type="number" value={monthly} onChange={e=>setMonthly(e.target.value)} /></div>
          <div><label>Expected Annual Return (%)</label><input type="number" step="0.01" value={annualRate} onChange={e=>setAnnualRate(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label>Duration</label><input type="number" value={duration} onChange={e=>setDuration(e.target.value)} /></div>
            <div><label>Unit</label><select value={unit} onChange={e=>setUnit(e.target.value as any)}><option value="years">Years</option><option value="months">Months</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label>Currency</label><select value={currency} onChange={e=>setCurrency(e.target.value)}><option>INR</option><option>USD</option><option>AED</option><option>EUR</option></select></div>
            <div><label>Locale</label><select value={locale} onChange={e=>setLocale(e.target.value)}><option value="en-IN">en-IN</option><option value="en-US">en-US</option><option value="en-AE">en-AE</option><option value="en-GB">en-GB</option></select></div>
          </div>
        </div>
        <div className="card space-y-3">
          <h3 className="text-lg font-semibold">Projection</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Stat label="Invested Amount" value={formatCurrency(invested,locale,currency)} />
            <Stat label="Estimated Returns" value={formatCurrency(gain,locale,currency)} />
            <Stat label="Total Value" value={formatCurrency(fv,locale,currency)} />
            <Stat label="Duration (months)" value={String(months)} />
          </div>
          <p className="text-xs text-gray-500">* Assumes monthly investment and constant rate.</p>
        </div>
      </div>
    </div>
  );
}
function Stat({label,value}:{label:string;value:string}){ return <div className="rounded-lg bg-gray-50 p-3"><div className="text-xs text-gray-500">{label}</div><div className="text-lg font-semibold">{value}</div></div>; }
EOFSIP

cat > components/calculators/BMI.tsx <<'EOFBMI'
"use client";
import { useMemo, useState } from "react";
import { bmiCategory, bmiValue } from "../../lib/math";
import { formatNumber, parseSafeNumber } from "../../lib/format";

export default function BMI(){
  const [heightCm,setHeightCm]=useState("170");
  const [weightKg,setWeightKg]=useState("65");
  const {bmi,category}=useMemo(()=>{ const v=bmiValue(parseSafeNumber(weightKg), parseSafeNumber(heightCm)); return {bmi:v, category:bmiCategory(v)}; },[heightCm,weightKg]);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="card space-y-3">
        <div><label>Height (cm)</label><input type="number" value={heightCm} onChange={e=>setHeightCm(e.target.value)} /></div>
        <div><label>Weight (kg)</label><input type="number" value={weightKg} onChange={e=>setWeightKg(e.target.value)} /></div>
      </div>
      <div className="card flex flex-col items-center justify-center gap-2">
        <div className="text-sm text-gray-500">Your BMI</div>
        <div className="text-4xl font-bold">{formatNumber(bmi,1)}</div>
        <Badge category={category}/>
        <p className="mt-2 text-xs text-gray-500">BMI: &lt;18.5 Underweight • 18.5–24.9 Normal • 25–29.9 Overweight • ≥30 Obesity</p>
      </div>
    </div>
  );
}
function Badge({category}:{category:string}){
  const c=(bg:string,t:string)=>`badge ${bg} ${t}`;
  return category==="Underweight"?<span className={c("bg-yellow-100","text-yellow-700")}>Underweight</span>:
         category==="Normal"?     <span className={c("bg-green-100","text-green-700")}>Normal</span>:
         category==="Overweight"? <span className={c("bg-orange-100","text-orange-700")}>Overweight</span>:
         category==="Obesity"?    <span className={c("bg-red-100","text-red-700")}>Obesity</span>:
                                   <span className="badge bg-gray-100 text-gray-700">—</span>;
}
EOFBMI

# --- App Router pages ---
cat > app/layout.tsx <<'EOFL'
import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";

export const metadata: Metadata = {
  metadataBase: new URL("https://freequickcalculator.com"),
  title: { default: "Free Quick Calculator", template: "%s | Free Quick Calculator" },
  description: "A fast, clean hub of finance, health, and utility calculators. Free. No sign-up. Mobile friendly.",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="py-8"><Container>{children}</Container></main>
        <Footer />
      </body>
    </html>
  );
}
EOFL

cat > app/page.tsx <<'EOFP'
import type { Metadata } from "next";
import { calculators } from "../data/calculators";
import SearchGrid from "../components/SearchGrid";

export const metadata: Metadata = {
  title: "All Calculators",
  description: "Browse 30+ finance, health, tax, utility and conversion calculators. Search and filter instantly."
};

export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Find the right calculator in seconds</h1>
        <p className="text-gray-600">Finance, Health, Utilities, Conversions, Tax, Dates &amp; Time and more.</p>
      </header>
      <SearchGrid calculators={calculators} />
    </div>
  );
}
EOFP

cat > app/calculator/[slug]/page.tsx <<'EOFCALC'
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "../../../data/calculators";
import ComingSoon from "../../../components/ComingSoon";
import BMI from "../../../components/calculators/BMI";
import EMI from "../../../components/calculators/EMI";
import SIP from "../../../components/calculators/SIP";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return calculators.map(c => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return { title: "Calculator", description: "Calculator not found." };
  return { title: calc.name, description: calc.description, keywords: calc.keywords };
}

export default function CalculatorPage({ params }: Props) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) notFound();

  function render() {
    switch (calc!.componentId) {
      case "BMI": return <BMI />;
      case "EMI": return <EMI />;
      case "SIP": return <SIP />;
      default: return <ComingSoon title={`${calc!.name} — Coming Soon`} description={calc!.description} />;
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{calc!.name}</h1>
        {calc?.formulaNote && <p className="text-sm text-gray-500">Formula: {calc.formulaNote}</p>}
      </header>
      {render()}
    </div>
  );
}
EOFCALC

# --- Install & build ---
npm install
npm run build
