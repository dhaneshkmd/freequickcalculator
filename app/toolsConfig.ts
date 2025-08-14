
// app/toolsConfig.ts
// 24 generic calculators for <GenericCalculator/>

export type FieldDef = { key: string; label: string; suffix?: string };
export type ToolDef = {
  id: string; name: string; tags: string[];
  fields: FieldDef[];
  compute: (v: Record<string, number>) => { results: [string,string][], table?: [string,string|number][], subtitle?: string };
};

const currencyFmt = (n: number, currency = 'INR') => {
  if (!isFinite(n)) return '—';
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(n); } catch { return n.toFixed(2); }
};
const numberFmt = (n: number) => isFinite(n) ? new Intl.NumberFormat().format(n) : '—';
const log10 = (x: number) => (Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10);

const toolsConfig: ToolDef[] = [
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
    compute(v){ const s=String(v.lmp||''); if(s.length<8) return {results:[['Estimated Due Date','—']]}; const y=parseInt(s.slice(0,4)), m=parseInt(s.slice(4,6))-1, d=parseInt(s.slice(6,8)); const dt=new Date(y,m,d); if(isNaN(dt.getTime())) return {results:[['Estimated Due Date','—']]} ;
      dt.setDate(dt.getDate()+280); return {results:[['Estimated Due Date',dt.toISOString().slice(0,10)]]}; } },

  // Utilities / helpers
  { id:'agecalc', name:'Age Calculator', tags:['utility','date'],
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
    compute(v){ const i=(v.r||0)/12/100; const n = i===0? Math.ceil((v.target||0)/Math.max(1,(v.m||1))) : Math.ceil(Math.log(((v.target||0)*(i)/(v.m||1) ) + 1)/Math.log(1+i)); const years = (n||0)/12; return {results:[['Months Needed (approx)',String(n)],['Years (approx)',years.toFixed(1)]]}; } },
];

export default toolsConfig;
