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
