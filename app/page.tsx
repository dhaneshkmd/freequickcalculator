
'use client';
import React, { useMemo, useState } from 'react';
import './globals.css';

function currencyFmt(n: number, currency = 'INR') {
  if (!isFinite(n)) return '—';
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(n); } catch { return n.toFixed(2); }
}
function numberFmt(n: number) { return isFinite(n) ? new Intl.NumberFormat().format(n) : '—'; }
const log10 = (x: number) => Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10;

// ----- UI primitives -----
function CalculatorCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode; }) {
  return (
    <div className="rounded-2xl p-5 md:p-6 shadow-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
      <div className="mb-4"><h2 className="text-xl md:text-2xl font-semibold">{title}</h2>{subtitle && <p className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>}</div>
      {children}
    </div>
  );
}
function FormGrid({ children }: { children: React.ReactNode; }) { return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">{children}</div>; }
function NumberField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix?: string; }) {
  return (<label className="flex flex-col gap-1"><span className="text-sm font-medium">{label}</span>
    <div className="flex items-stretch rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden">
      <input type="number" className="w-full bg-white/70 dark:bg-slate-950/50 px-3 py-2 outline-none" value={value}
        onChange={(e)=>onChange(parseFloat((e.target as HTMLInputElement).value)||0)} />
      {suffix && <span className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700">{suffix}</span>}
    </div></label>);
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (s: string) => void; options: string[]; }) {
  return (<label className="flex flex-col gap-1"><span className="text-sm font-medium">{label}</span>
    <select className="w-full bg-white/70 dark:bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700" value={value} onChange={(e)=>onChange((e.target as HTMLSelectElement).value)}>
      {options.map(o=> <option key={o} value={o}>{o}</option>)}
    </select></label>);
}
function ResultRow({ label, value, highlight=false }: { label: string; value: string; highlight?: boolean; }) {
  return (<div className={`flex items-center justify-between px-4 py-2 rounded-xl mb-2 ${highlight?'bg-green-50 dark:bg-green-900/20':'bg-slate-50 dark:bg-slate-800/40'}`}>
    <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span><span className="font-semibold">{value}</span>
  </div>);
}
function MiniTable({ rows }: { rows: [string, string | number][]; }) {
  return (<div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
    <table className="w-full text-sm"><tbody>{rows.map(([k,v],i)=>(<tr key={i} className="odd:bg-white/60 even:bg-slate-50/60 dark:odd:bg-slate-950/40 dark:even:bg-slate-900/40">
      <td className="px-3 py-2 text-slate-600 dark:text-slate-300 w-1/2">{k}</td><td className="px-3 py-2 font-medium">{v as any}</td>
    </tr>))}</tbody></table></div>);
}
function Disclaimer({ text }: { text: string; }) { return <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{text}</p>; }
function useTheme(){ const [dark,setDark]=useState(true); React.useEffect(()=>{document.documentElement.classList.toggle('dark',dark)},[dark]); return {dark,setDark}; }

// ----- Specific calculators (6) -----
// SIP
function computeSIP({ monthly=10000, rate=12, years=10 }:{monthly:number;rate:number;years:number;}){
  const i=rate/12/100; const n=years*12; const future=monthly*((Math.pow(1+i,n)-1)/i)*(1+i); const invested=monthly*n; return {future,invested,gain:future-invested};
}
function SIPCalculator(){ const [m,setM]=useState(10000),[r,setR]=useState(12),[y,setY]=useState(10),[c,setC]=useState('INR'); const res=useMemo(()=>computeSIP({monthly:m,rate:r,years:y}),[m,r,y]);
  return(<CalculatorCard title="SIP Calculator" subtitle="Monthly investing growth projection"><FormGrid>
    <NumberField label="Monthly Investment" value={m} onChange={setM} suffix={c}/><NumberField label="Expected Annual Return" value={r} onChange={setR} suffix="%"/>
    <NumberField label="Duration" value={y} onChange={setY} suffix="years"/><SelectField label="Currency" value={c} onChange={setC} options={['INR','AED','USD','EUR']}/>
  </FormGrid><ResultRow label="Total Invested" value={currencyFmt(m*y*12,c)}/><ResultRow label="Estimated Returns (Gain)" value={currencyFmt(res.gain,c)}/><ResultRow label="Future Value" value={currencyFmt(res.future,c)} highlight/>
  <MiniTable rows={[['Monthly',currencyFmt(m,c)],['Years',numberFmt(y)],['Annual Return',`${r}%`],['Months',numberFmt(y*12)]]}/><Disclaimer text="Educational estimates; not financial advice." /></CalculatorCard>);}

// EMI
function computeEMI({principal=500000,annualRate=9,years=5}:{principal:number;annualRate:number;years:number;}){
  const r=annualRate/12/100; const n=years*12; const emi=r===0?principal/n:principal*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); const total=emi*n, interest=total-principal; return {emi,total,interest};
}
function EMICalculator(){ const [p,setP]=useState(500000),[r,setR]=useState(9),[y,setY]=useState(5),[c,setC]=useState('INR'); const res=useMemo(()=>computeEMI({principal:p,annualRate:r,years:y}),[p,r,y]);
  return(<CalculatorCard title="Loan EMI Calculator" subtitle="Monthly equated installment & totals"><FormGrid>
    <NumberField label="Loan Amount" value={p} onChange={setP} suffix={c}/><NumberField label="Annual Interest Rate" value={r} onChange={setR} suffix="%"/>
    <NumberField label="Tenure" value={y} onChange={setY} suffix="years"/><SelectField label="Currency" value={c} onChange={setC} options={['INR','AED','USD','EUR']}/>
  </FormGrid><ResultRow label="Monthly EMI" value={currencyFmt(res.emi,c)} highlight/><ResultRow label="Total Interest" value={currencyFmt(res.interest,c)}/><ResultRow label="Total Payment" value={currencyFmt(res.total,c)}/>
  <Disclaimer text="For illustration only; lender policies and rates may differ." /></CalculatorCard>);}

// BMI
function computeBMI({heightCm=170,weightKg=70}:{heightCm:number;weightKg:number;}){const h=heightCm/100; const bmi=weightKg/(h*h); let cat='Normal'; if(bmi<18.5)cat='Underweight'; else if(bmi<25)cat='Normal'; else if(bmi<30)cat='Overweight'; else cat='Obese'; return {bmi,category:cat};}
function BMICalculator(){ const [h,setH]=useState(170),[w,setW]=useState(70); const res=useMemo(()=>computeBMI({heightCm:h,weightKg:w}),[h,w]);
  return(<CalculatorCard title="BMI Calculator" subtitle="Body Mass Index (WHO ranges)"><FormGrid><NumberField label="Height" value={h} onChange={setH} suffix="cm"/><NumberField label="Weight" value={w} onChange={setW} suffix="kg"/></FormGrid>
  <ResultRow label="BMI" value={res.bmi.toFixed(1)} highlight/><ResultRow label="Category" value={res.category}/><Disclaimer text="Health info only; consult a professional." /></CalculatorCard>);}

// FX
const SAMPLE_RATES:Record<string,number>={USD:1,INR:83,AED:3.67,EUR:0.92};
function CurrencyConverter(){ const [b,setB]=useState('INR'),[q,setQ]=useState('AED'),[a,setA]=useState(1000),[sample,setS]=useState(true),[manual,setM]=useState(0);
  const rate=useMemo(()=>sample?(1/SAMPLE_RATES[b])*SAMPLE_RATES[q]:manual||0,[b,q,manual,sample]); const conv=a*rate;
  return(<CalculatorCard title="Currency Converter" subtitle="Convert between INR, AED, USD, EUR"><FormGrid>
    <SelectField label="From" value={b} onChange={setB} options={Object.keys(SAMPLE_RATES)}/><SelectField label="To" value={q} onChange={setQ} options={Object.keys(SAMPLE_RATES)}/>
    <NumberField label="Amount" value={a} onChange={setA}/><label className="flex items-center gap-2 mt-6"><input type="checkbox" checked={sample} onChange={e=>setS(e.target.checked)}/><span className="text-sm">Use sample rates</span></label>
    {!sample && <NumberField label={`Manual Rate (1 ${b} = ? ${q})`} value={manual} onChange={setM}/>}
  </FormGrid><ResultRow label="Rate" value={rate?`${rate.toFixed(4)} ${q}/${b}`:'—'}/><ResultRow label="Converted" value={rate?`${conv.toFixed(2)} ${q}`:'—'} highlight/>
  <Disclaimer text="Sample rates for demo. For production, fetch live FX via a serverless API." /></CalculatorCard>);}

// GST / VAT
function GSTVATCalculator(){ const [region,setRegion]=useState<'India'|'UAE'>('India'); const [base,setBase]=useState(1000); const [rate,setRate]=useState(18); const [mode,setMode]=useState<'Exclusive'|'Inclusive'>('Exclusive'); const uaeRate=5;
  const eff=region==='India'?rate:uaeRate; let tax=0,total=0,cgst=0,sgst=0,taxable=base; if(mode==='Exclusive'){tax=base*(eff/100); total=base+tax;} else {const d=1+(eff/100); taxable=base/d; tax=base-taxable; total=base;} if(region==='India'){cgst=tax/2; sgst=tax/2;}
  return(<CalculatorCard title="GST / VAT Calculator" subtitle="India GST or UAE VAT"><FormGrid>
    <SelectField label="Region" value={region} onChange={(v)=>setRegion(v as any)} options={['India','UAE']}/>
    {region==='India'?<SelectField label="GST Rate" value={String(rate)} onChange={(v)=>setRate(parseFloat(v)||0)} options={['0','5','12','18','28']}/>:<NumberField label="VAT Rate" value={uaeRate} onChange={()=>{}} suffix="%"/>}
    <NumberField label={mode==='Exclusive'?'Base Amount':'Amount (Tax Inclusive)'} value={base} onChange={setBase}/><SelectField label="Mode" value={mode} onChange={(v)=>setMode(v as any)} options={['Exclusive','Inclusive']}/>
  </FormGrid><MiniTable rows={[['Taxable Value',currencyFmt(taxable,'INR')],['Tax Amount',currencyFmt(tax,'INR')],...(region==='India'?[['CGST',currencyFmt(cgst,'INR')],['SGST',currencyFmt(sgst,'INR')]]:[]),['Total Payable',currencyFmt(total,'INR')]]}/>
  <Disclaimer text="Rates simplified for estimation." /></CalculatorCard>);}

// Balance (Budget) with CSV export
type Expense = { label:string; amount:number }; const LC_KEY='freequickcalc.balance.v1';
function BalanceCalculator(){ const initial=useMemo(()=>{ if(typeof window==='undefined') return null; try{return JSON.parse(localStorage.getItem(LC_KEY)||'null')}catch{return null}},[]);
  const [income,setIncome]=useState<number>(initial?.income??75000);
  const [items,setItems]=useState<Expense[]>(initial?.items??[{label:'Rent / EMI',amount:20000},{label:'Groceries',amount:7000},{label:'Utilities',amount:3000},{label:'Transport',amount:4000},{label:'Insurance / SIP',amount:5000},{label:'Other',amount:3000}]);
  const [ccy,setCcy]=useState<string>(initial?.ccy??'INR'); const [savePct,setSavePct]=useState<number>(initial?.savePct??10);
  React.useEffect(()=>{ if(typeof window==='undefined')return; try{localStorage.setItem(LC_KEY,JSON.stringify({income,items,ccy,savePct}))}catch{} },[income,items,ccy,savePct]);
  const total=useMemo(()=>items.reduce((s,x)=>s+(isFinite(x.amount)?x.amount:0),0),[items]); const bal=income-total; const target=(income*savePct)/100;
  const status= bal>=target?`✅ On track: ≥ ${savePct}% savings`:`⚠️ Short by ${currencyFmt(target-bal,ccy)} to hit ${savePct}%`;
  const update=(i:number,p:Partial<Expense>)=>setItems(a=>a.map((x,ix)=>ix===i?{...x,...p}:x)); const add=()=>setItems(a=>[...a,{label:'New item',amount:0}]); const rem=(i:number)=>setItems(a=>a.filter((_,ix)=>ix!==i));
  const exportCSV=()=>{ const lines:string[]=[]; lines.push('Balance (Budget) Calculator'); lines.push(`Currency,${ccy}`); lines.push(`Monthly Income,${income}`); lines.push(`Savings Target %,${savePct}`); lines.push(''); lines.push('Expense,Amount');
    for(const it of items){ lines.push(`${JSON.stringify(it.label)},${it.amount}`); } lines.push(''); lines.push(`Total,${total}`); lines.push(`Balance,${bal}`);
    const blob=new Blob([lines.join('\\n')],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='budget.csv'; a.click(); URL.revokeObjectURL(url); };
  return(<CalculatorCard title="Balance (Budget) Calculator" subtitle="Income – Expenses = Monthly balance"><FormGrid>
    <NumberField label="Monthly Income" value={income} onChange={setIncome} suffix={ccy}/><SelectField label="Currency" value={ccy} onChange={setCcy} options={['INR','AED','USD','EUR']}/><NumberField label="Savings Target" value={savePct} onChange={setSavePct} suffix="%"/>
  </FormGrid><div className="mt-2 space-y-2">{items.map((row,i)=>(<div key={i} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-2 items-center">
    <input className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/50" value={row.label} onChange={(e)=>update(i,{label:(e.target as HTMLInputElement).value})}/>
    <input type="number" className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/50" value={row.amount} onChange={(e)=>update(i,{amount:parseFloat((e.target as HTMLInputElement).value)||0})}/>
    <button onClick={()=>rem(i)} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm">Remove</button></div>))}
    <div className="flex gap-2"><button onClick={add} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm">+ Add Expense</button><button onClick={exportCSV} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm">⬇︎ Export CSV</button></div>
  </div><div className="mt-4"><ResultRow label="Total Expenses" value={currencyFmt(total,ccy)}/><ResultRow label="Balance (Income – Expenses)" value={currencyFmt(bal,ccy)} highlight/>
  <MiniTable rows={[['Income',currencyFmt(income,ccy)],['Savings Target',`${savePct}% (${currencyFmt(target,ccy)})`],['Status',status]]}/></div><Disclaimer text="Simple monthly budget tool." /></CalculatorCard>);}

// ----- Generic config-driven calculators (24) -----
type FieldDef = { key: string; label: string; suffix?: string; };
type ToolDef = { id: string; name: string; tags: string[]; fields: FieldDef[]; compute: (v: Record<string, number>) => { results: [string,string][], table?: [string,string|number][], subtitle?: string; }; };

function GenericCalculator({ def }: { def: ToolDef }) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(def.fields.map(f => [f.key, 0]))
  );
  const out = useMemo(() => def.compute(values), [values]);
  return (
    <CalculatorCard title={def.name} subtitle={out.subtitle}>
      <FormGrid>
        {def.fields.map(f =>
          <NumberField key={f.key} label={f.label} value={values[f.key] ?? 0}
            onChange={(n)=>setValues(prev=>({...prev,[f.key]:n}))} suffix={f.suffix}/>
        )}
      </FormGrid>
      {out.results.map(([k,v],i)=>(<ResultRow key={i} label={k} value={v} highlight={i===0}/>))}
      {out.table && <MiniTable rows={out.table}/>}
      <Disclaimer text="Quick estimate — formulas simplified for speed." />
    </CalculatorCard>
  );
}

const toolsConfig: ToolDef[] = [
  // Finance core
  { id:'si', name:'Simple Interest', tags:['finance','interest'],
    fields:[{key:'p',label:'Principal',suffix:'INR'},{key:'r',label:'Rate (annual %)',suffix:'%'},{key:'t',label:'Time (years)'}],
    compute(v){ const i=v.p*v.r*v.t/100; const a=v.p+i; return {results:[['Interest',currencyFmt(i,'INR')],['Maturity Amount',currencyFmt(a,'INR')]]}; } },
  { id:'ci', name:'Compound Interest', tags:['finance','interest'],
    fields:[{key:'p',label:'Principal',suffix:'INR'},{key:'r',label:'Rate %',suffix:'%'},{key:'t',label:'Years'},{key:'n',label:'Compounds / year'}],
    compute(v){ const n=v.n||1; const a=v.p*Math.pow(1+v.r/100/n,n*v.t); const i=a-v.p; return {results:[['Maturity Amount',currencyFmt(a,'INR')],['Total Interest',currencyFmt(i,'INR')]]}; } },
  { id:'lump', name:'Lumpsum Future Value', tags:['finance','investing'],
    fields:[{key:'p',label:'Initial Amount',suffix:'INR'},{key:'r',label:'Annual Return %',suffix:'%'},{key:'t',label:'Years'}],
    compute(v){ const a=v.p*Math.pow(1+v.r/100,v.t); return {results:[['Future Value',currencyFmt(a,'INR')]]}; } },
  { id:'stepsip', name:'Step-up SIP', tags:['finance','sip'],
    fields:[{key:'m',label:'Starting Monthly',suffix:'INR'},{key:'u',label:'Annual Step-up %',suffix:'%'},{key:'r',label:'Return %',suffix:'%'},{key:'t',label:'Years'}],
    compute(v){ const n=v.t*12, i=v.r/12/100, g=v.u/100; let fv=0, m=v.m; for(let k=0;k<n;k++){ fv += m*Math.pow(1+i,n-k); if((k+1)%12===0) m*=1+g; } return {results:[['Future Value',currencyFmt(fv,'INR')]]}; } },
  { id:'rd', name:'RD Calculator', tags:['finance','deposit'],
    fields:[{key:'m',label:'Monthly Deposit',suffix:'INR'},{key:'r',label:'Annual Rate %',suffix:'%'},{key:'t',label:'Years'}],
    compute(v){ const n=v.t*12; const i=v.r/12/100; const a=v.m*((Math.pow(1+i,n)-1)/i); return {results:[['Maturity Amount',currencyFmt(a,'INR')],['Total Deposited',currencyFmt(v.m*n,'INR')]]}; } },
  { id:'fd', name:'FD Calculator', tags:['finance','deposit'],
    fields:[{key:'p',label:'Deposit',suffix:'INR'},{key:'r',label:'Annual Rate %',suffix:'%'},{key:'t',label:'Years'}],
    compute(v){ const a=v.p*Math.pow(1+v.r/100,v.t); return {results:[['Maturity Amount',currencyFmt(a,'INR')],['Interest',currencyFmt(a-v.p,'INR')]]}; } },
  { id:'infl', name:'Inflation Adjuster', tags:['finance','inflation'],
    fields:[{key:'val',label:'Amount Today',suffix:'INR'},{key:'inf',label:'Inflation %',suffix:'%'},{key:'t',label:'Years'}],
    compute(v){ const future=v.val*Math.pow(1+v.inf/100,v.t); return {results:[['Future Value Needed',currencyFmt(future,'INR')]]}; } },
  { id:'elig', name:'Loan Eligibility', tags:['finance','loan'],
    fields:[{key:'income',label:'Monthly Income',suffix:'INR'},{key:'foir',label:'FOIR % (default 40)',suffix:'%'},{key:'r',label:'Rate %',suffix:'%'},{key:'y',label:'Tenure (years)'}],
    compute(v){ const foir=(v.foir||40)/100; const emiLimit=v.income*foir; const r=v.r/12/100; const n=v.y*12; const p = r===0? emiLimit*n : emiLimit*(Math.pow(1+r,n)-1)/(r*Math.pow(1+r,n)); return {results:[['Eligible Loan Amount',currencyFmt(p,'INR')],['EMI Limit',currencyFmt(emiLimit,'INR')]]}; } },
  { id:'prepay', name:'EMI Prepayment Impact', tags:['finance','loan'],
    fields:[{key:'p',label:'Principal',suffix:'INR'},{key:'r',label:'Rate %',suffix:'%'},{key:'y',label:'Years'},{key:'pre',label:'Prepayment (once)',suffix:'INR'}],
    compute(v){ const r=v.r/12/100; const n=v.y*12; const emi=r===0? v.p/n : v.p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); const p2=Math.max(0,v.p-(v.pre||0)); const emi2=r===0? p2/n : p2*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); return {results:[['EMI Before',currencyFmt(emi,'INR')],['EMI After Prepay',currencyFmt(emi2,'INR')]]}; } },
  { id:'ccpay', name:'Credit Card Payoff (approx)', tags:['finance','debt'],
    fields:[{key:'bal',label:'Balance',suffix:'INR'},{key:'apr',label:'APR %',suffix:'%'},{key:'pay',label:'Monthly Payment',suffix:'INR'}],
    compute(v){ const r=v.apr/12/100; let bal=v.bal; let m=0; for(m=0;m<600 && bal>0;m++){ bal=bal*(1+r)-v.pay; if(bal<0) bal=0; } return {results:[['Months to Payoff (approx)',String(m)],['Total Paid (approx)',currencyFmt((v.pay||0)*m,'INR')]]}; } },
  { id:'tax', name:'Income Tax (India, Simplified)', tags:['finance','tax'],
    fields:[{key:'inc',label:'Annual Income',suffix:'INR'}],
    compute(v){ const slabs=[[0,300000,0],[300000,700000,0.05],[700000,1000000,0.10],[1000000,1200000,0.15],[1200000,1500000,0.20],[1500000,1e12,0.30]]; let tax=0; let income=v.inc||0; for(const s of slabs){const lo=s[0],hi=s[1],rate=s[2]; if(income>lo){tax+=Math.max(0,Math.min(income,hi)-lo)*rate;} } return {results:[['Estimated Tax',currencyFmt(tax,'INR')]]}; } },
  { id:'amort', name:'Loan Totals (Amortization)', tags:['finance','loan'],
    fields:[{key:'p',label:'Principal',suffix:'INR'},{key:'r',label:'Rate %',suffix:'%'},{key:'y',label:'Years'}],
    compute(v){ const r=v.r/12/100; const n=v.y*12; const emi=r===0?v.p/n:v.p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); const total=emi*n; return {results:[['Monthly EMI',currencyFmt(emi,'INR')],['Total Paid',currencyFmt(total,'INR')],['Total Interest',currencyFmt(total-(v.p||0),'INR')]]}; } },
  { id:'loancomp', name:'Loan Comparison', tags:['finance','loan'],
    fields:[{key:'p1',label:'Loan A Principal',suffix:'INR'},{key:'r1',label:'A Rate %',suffix:'%'},{key:'y1',label:'A Years'},
            {key:'p2',label:'Loan B Principal',suffix:'INR'},{key:'r2',label:'B Rate %',suffix:'%'},{key:'y2',label:'B Years'}],
    compute(v){ const f=(p:number,r:number,y:number)=>{r/=12*100; const n=y*12; return r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)}; const e1=f(v.p1||0,v.r1||0,v.y1||0),e2=f(v.p2||0,v.r2||0,v.y2||0);
      return {results:[['EMI A',currencyFmt(e1,'INR')],['EMI B',currencyFmt(e2,'INR')]]}; } },

  // Health
  { id:'bmr', name:'BMR (Mifflin-St Jeor)', tags:['health','bmr'],
    fields:[{key:'w',label:'Weight (kg)'},{key:'h',label:'Height (cm)'},{key:'a',label:'Age (years)'},{key:'sex',label:'Sex (0=female,1=male)'}],
    compute(v){ const male=(v.sex||0)>=0.5; const bmr= male? 10*(v.w||0)+6.25*(v.h||0)-5*(v.a||0)+5 : 10*(v.w||0)+6.25*(v.h||0)-5*(v.a||0)-161; return {results:[['BMR (kcal/day)',numberFmt(bmr)]]}; } },
  { id:'tdee', name:'Daily Calorie (TDEE)', tags:['health','calories'],
    fields:[{key:'bmr',label:'BMR (kcal/day)'},{key:'mult',label:'Activity Multiplier (e.g., 1.55)'}],
    compute(v){ const c=(v.bmr||0)*((v.mult||1)); return {results:[['Estimated Calories/day',numberFmt(c)]]}; } },
  { id:'bfat', name:'Body Fat % (US Navy, m/f)', tags:['health','body fat'],
    fields:[{key:'sex',label:'Sex (0=female,1=male)'},{key:'waist',label:'Waist (cm)'},{key:'neck',label:'Neck (cm)'},{key:'height',label:'Height (cm)'},{key:'hip',label:'Hip (cm for female)'}],
    compute(v){ const male=(v.sex||0)>=0.5; let bf=0; if(male){ bf=495/(1.0324-0.19077*log10((v.waist||0)-(v.neck||0))+0.15456*log10(v.height||0))-450; } else { bf=495/(1.29579-0.35004*log10((v.waist||0)+(v.hip||0)-(v.neck||0))+0.22100*log10(v.height||0))-450; } return {results:[['Body Fat % (approx)',`${bf.toFixed(1)}%`]]}; } },
  { id:'water', name:'Daily Water Intake', tags:['health','hydration'],
    fields:[{key:'w',label:'Weight (kg)'}],
    compute(v){ const ml=(v.w||0)*30; return {results:[['Suggested Intake',`${(ml/1000).toFixed(2)} L/day`]]}; } },
  { id:'ideal', name:'Ideal Weight (Devine)', tags:['health','weight'],
    fields:[{key:'sex',label:'Sex (0=female,1=male)'},{key:'h',label:'Height (cm)'}],
    compute(v){ const base= (v.sex||0)>=0.5?50:45.5; const hg=(v.h||0)/2.54; const kg= base + 2.3*((hg - 60)); return {results:[['Ideal Weight (approx)',`${kg.toFixed(1)} kg`]]}; } },
  { id:'edd', name:'Pregnancy Due Date', tags:['health','pregnancy'],
    fields:[{key:'lmp',label:'LMP Day (YYYYMMDD)'}],
    compute(v){ const s=String(v.lmp||''); if(s.length<8) return {results:[['Estimated Due Date','—']]}; const y=parseInt(s.slice(0,4)), m=parseInt(s.slice(4,6))-1, d=parseInt(s.slice(6,8)); const dt=new Date(y,m,d); if(isNaN(dt.getTime())) return {results:[['Estimated Due Date','—']]};
      dt.setDate(dt.getDate()+280); return {results:[['Estimated Due Date',dt.toISOString().slice(0,10)]]}; } },

  // NEW Utilities / Finance helpers
  { id:'age', name:'Age Calculator', tags:['utility','date'],
    fields:[{key:'dob',label:'DOB (YYYYMMDD)'}],
    compute(v){ const s=String(v.dob||''); if(s.length<8) return {results:[['Age','—']]}; const y=parseInt(s.slice(0,4)), m=parseInt(s.slice(4,6))-1, d=parseInt(s.slice(6,8)); const dob=new Date(y,m,d); if(isNaN(dob.getTime())) return {results:[['Age','—']]}; const now=new Date(); let years=now.getFullYear()-dob.getFullYear(); const hasnt = (now.getMonth()<m)||(now.getMonth()===m && now.getDate()<d); if(hasnt) years--; return {results:[['Age (years)',String(years)]]}; } },
  { id:'disc', name:'Discount Calculator', tags:['utility','percent'],
    fields:[{key:'price',label:'Original Price',suffix:'INR'},{key:'off',label:'Discount %',suffix:'%'}],
    compute(v){ const save=(v.price||0)*(v.off||0)/100; const final=(v.price||0)-save; return {results:[['Final Price',currencyFmt(final,'INR')],['You Save',currencyFmt(save,'INR')]]}; } },
  { id:'tip', name:'Tip Calculator', tags:['utility','percent'],
    fields:[{key:'bill',label:'Bill Amount',suffix:'INR'},{key:'tip',label:'Tip %',suffix:'%'},{key:'ppl',label:'People'}],
    compute(v){ const tip=((v.bill||0)*(v.tip||0)/100); const total=(v.bill||0)+tip; const per= (v.ppl||1)>0? total/(v.ppl||1): total; return {results:[['Tip Amount',currencyFmt(tip,'INR')],['Total',currencyFmt(total,'INR')],['Per Person',currencyFmt(per,'INR')]]}; } },
  { id:'roi', name:'ROI Calculator', tags:['finance','profit'],
    fields:[{key:'gain',label:'Total Gain',suffix:'INR'},{key:'cost',label:'Total Cost',suffix:'INR'}],
    compute(v){ const roi = ((v.gain||0)-(v.cost||0))/Math.max(1,(v.cost||1))*100; return {results:[['ROI %',`${roi.toFixed(2)}%`]]}; } },
  { id:'savetime', name:'Savings Goal Time', tags:['finance','goal'],
    fields:[{key:'target',label:'Target Amount',suffix:'INR'},{key:'m',label:'Monthly Save',suffix:'INR'},{key:'r',label:'Annual Return %',suffix:'%'}],
    compute(v){ const i=(v.r||0)/12/100; const n = i===0? Math.ceil((v.target||0)/Math.max(1,(v.m||1))) : Math.ceil(Math.log(( (v.target||0)*(i) / (v.m||1) ) + 1)/Math.log(1+i)); const years = (n||0)/12; return {results:[['Months Needed (approx)',String(n)],['Years (approx)',years.toFixed(1)]]}; } },
];

// ---- TOOL REGISTRY (30 total = 6 specific + 24 generic) ----
const TOOL_REGISTRY = [
  { id:'sip',  name:'SIP Calculator', component:SIPCalculator, tags:['finance','investing','mutual funds']},
  { id:'emi',  name:'Loan EMI Calculator', component:EMICalculator, tags:['finance','loan','emi']},
  { id:'bmi',  name:'BMI Calculator', component:BMICalculator, tags:['health','fitness','bmi']},
  { id:'fx',   name:'Currency Converter', component:CurrencyConverter, tags:['finance','currency','forex']},
  { id:'gst',  name:'GST / VAT Calculator', component:GSTVATCalculator, tags:['finance','tax','gst','vat']},
  { id:'bal',  name:'Balance (Budget) Calculator', component:BalanceCalculator, tags:['finance','budget','income','expenses']},
  ...toolsConfig.map(def => ({ id: def.id, name: def.name, component: () => <GenericCalculator def={def} />, tags: def.tags })),
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
          <div className="text-lg font-bold tracking-tight">Free Quick Calculator — 30 Tools</div>
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
                <input id="site-search" placeholder="Search any tool" value={query} onChange={(e)=>setQuery((e.target as HTMLInputElement).value)}
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
