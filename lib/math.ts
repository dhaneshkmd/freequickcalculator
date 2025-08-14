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
