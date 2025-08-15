export type Category =
  'Finance' | 'Health' | 'Utilities' | 'Conversions' | 'Tax' | 'Dates & Time' | 'Lifestyle';

export type ComponentId =
  'SIP' | 'EMI' | 'BMI' | 'AGE' |
  'BMR' | 'BODY_FAT' | 'BREAK_EVEN' |
  'COMPOUND_INTEREST' | 'CURRENCY' | 'DAILY_CALORIES' | 'CALORIES_BURNED' | 'DATE_DIFF' |
  'DISCOUNT' | 'FD' | 'GST_VAT' | 'HOME_AFFORD' | 'TAX_INDIA' | 'INFLATION_REAL' |
  'LEAP_YEAR' | 'LOAN_COMPARE' | 'LOAN_ELIGIBILITY' |
  // newly activated
  'MORTGAGE' | 'PERCENTAGE' | 'DUE_DATE' | 'RD' | 'ROI' | 'SALES_TAX' | 'SAVINGS_GOAL' |
  'SIMPLE_INTEREST' | 'TIME_ZONE' | 'TIP' | 'UNIT_LENGTH' | 'UNIT_TEMP' | 'UNIT_WEIGHT' |
  null;

export type Calculator = {
  name: string;
  slug: string;
  description: string;
  category: Category;
  keywords: string[];
  status: 'ready' | 'planned';
  componentId: ComponentId;
  formulaNote?: string;
};

export const calculators: Calculator[] = [
  { name:"SIP Calculator", slug:"sip", description:"Estimate the future value of monthly investments.", category:"Finance", keywords:["mutual fund","investment","sip"], status:"ready", componentId:"SIP", formulaNote:"FV = P * ((1+i)^n - 1)/i * (1+i)" },
  { name:"EMI Calculator", slug:"emi", description:"Monthly loan payment with interest and totals.", category:"Finance", keywords:["loan","emi","amortization","interest"], status:"ready", componentId:"EMI", formulaNote:"EMI = P*i*(1+i)^n / ((1+i)^n - 1)" },
  { name:"BMI Calculator", slug:"bmi", description:"Body Mass Index from height & weight.", category:"Health", keywords:["bmi","health"], status:"ready", componentId:"BMI", formulaNote:"BMI = kg / (m^2)" },

  { name:"Compound Interest", slug:"compound-interest", description:"Growth with compounding interest.", category:"Finance", keywords:["compound","interest"], status:"ready", componentId:"COMPOUND_INTEREST", formulaNote:"A = P(1+r/n)^(nt)" },
  { name:"Simple Interest", slug:"simple-interest", description:"Interest without compounding.", category:"Finance", keywords:["simple","interest"], status:"ready", componentId:"SIMPLE_INTEREST", formulaNote:"I = P*r*t" },

  { name:"Loan Eligibility", slug:"loan-eligibility", description:"Estimate max loan amount from income.", category:"Finance", keywords:["loan","eligibility"], status:"ready", componentId:"LOAN_ELIGIBILITY", formulaNote:"Max EMI = income×FOIR − obligations → Loan from EMI" },
  { name:"Loan Compare", slug:"loan-compare", description:"Compare EMIs across lenders.", category:"Finance", keywords:["loan","compare"], status:"ready", componentId:"LOAN_COMPARE" },

  { name:"Mortgage Payment", slug:"mortgage", description:"Home loan monthly payment.", category:"Finance", keywords:["mortgage","home"], status:"ready", componentId:"MORTGAGE", formulaNote:"EMI formula with given tenure" },
  { name:"Home Affordability", slug:"home-affordability", description:"Estimate home purchase budget.", category:"Finance", keywords:["mortgage","budget"], status:"ready", componentId:"HOME_AFFORD", formulaNote:"EMI capacity via FOIR → Loan from EMI + Down payment" },
  { name:"ROI", slug:"roi", description:"Return on Investment percentage.", category:"Finance", keywords:["return","profit"], status:"ready", componentId:"ROI", formulaNote:"(Gain − Cost)/Cost × 100" },
  { name:"Break-even Point", slug:"break-even", description:"Units or revenue to break even.", category:"Finance", keywords:["fixed cost","margin"], status:"ready", componentId:"BREAK_EVEN", formulaNote:"Q = Fixed / (Price − Variable); Revenue = Q × Price" },
  { name:"Inflation Adjusted Return", slug:"inflation-adjusted", description:"Real return after inflation.", category:"Finance", keywords:["inflation","real"], status:"ready", componentId:"INFLATION_REAL", formulaNote:"Real % = ((1+nominal)/(1+inflation) − 1)×100" },
  { name:"Fixed Deposit (FD)", slug:"fd", description:"FD maturity and interest.", category:"Finance", keywords:["fd","bank"], status:"ready", componentId:"FD", formulaNote:"A = P(1+r/n)^(nt)" },
  { name:"Recurring Deposit (RD)", slug:"rd", description:"RD maturity value.", category:"Finance", keywords:["rd","bank"], status:"ready", componentId:"RD", formulaNote:"FV of monthly deposits at monthly rate" },
  { name:"Savings Goal", slug:"savings-goal", description:"Monthly saving needed for a goal.", category:"Finance", keywords:["goal","savings"], status:"ready", componentId:"SAVINGS_GOAL", formulaNote:"PMT = FV*i / ((1+i)^n − 1)" },
  { name:"Currency Converter", slug:"currency-converter", description:"Convert amounts across currencies.", category:"Finance", keywords:["forex","currency"], status:"ready", componentId:"CURRENCY" },

  { name:"BMR", slug:"bmr", description:"Basal Metabolic Rate estimate.", category:"Health", keywords:["metabolism","calorie"], status:"ready", componentId:"BMR", formulaNote:"Mifflin–St Jeor" },
  { name:"Body Fat %", slug:"body-fat", description:"Body fat estimation.", category:"Health", keywords:["fat","composition"], status:"ready", componentId:"BODY_FAT", formulaNote:"U.S. Navy method" },
  { name:"Daily Calorie Needs", slug:"daily-calories", description:"Maintenance calories per day.", category:"Health", keywords:["tdee","calories"], status:"ready", componentId:"DAILY_CALORIES", formulaNote:"TDEE = BMR × activity" },
  { name:"Calories Burned", slug:"calories-burned", description:"Calories burned during activities.", category:"Health", keywords:["exercise","burn"], status:"ready", componentId:"CALORIES_BURNED", formulaNote:"kcal = MET × kg × hours" },
  { name:"Pregnancy Due Date", slug:"pregnancy-due-date", description:"Estimate due date from LMP.", category:"Health", keywords:["due date","pregnancy"], status:"ready", componentId:"DUE_DATE", formulaNote:"Naegele’s rule (280 days, cycle-adjusted)" },

  { name:"Percentage", slug:"percentage", description:"Find X% of Y or reverse.", category:"Utilities", keywords:["percent","increase","decrease"], status:"ready", componentId:"PERCENTAGE" },
  { name:"Discount", slug:"discount", description:"Sale price after discount.", category:"Utilities", keywords:["sale","percent off"], status:"ready", componentId:"DISCOUNT", formulaNote:"Final = Price × (1 − d1) × (1 − d2) × (1 + tax)" },
  { name:"Tip", slug:"tip", description:"Restaurant tip and bill split.", category:"Utilities", keywords:["bill","gratuity"], status:"ready", componentId:"TIP" },

  { name:"Unit: Length", slug:"unit-length", description:"Meters, feet, miles and more.", category:"Conversions", keywords:["length","convert"], status:"ready", componentId:"UNIT_LENGTH" },
  { name:"Unit: Weight", slug:"unit-weight", description:"Kg, lb, oz conversions.", category:"Conversions", keywords:["weight","convert"], status:"ready", componentId:"UNIT_WEIGHT" },
  { name:"Unit: Temperature", slug:"unit-temperature", description:"Celsius, Fahrenheit, Kelvin.", category:"Conversions", keywords:["temperature","convert"], status:"ready", componentId:"UNIT_TEMP" },

  { name:"GST / VAT", slug:"gst-vat", description:"Add or remove GST/VAT.", category:"Tax", keywords:["gst","vat","tax"], status:"ready", componentId:"GST_VAT", formulaNote:"Add: total = base×(1+r). Remove: base = total/(1+r)" },
  { name:"Income Tax (India)", slug:"income-tax-india", description:"Estimate income tax slabs.", category:"Tax", keywords:["tax","india"], status:"ready", componentId:"TAX_INDIA", formulaNote:"New Regime slabs + 4% cess (FY 2024–25 approx.)" },
  { name:"Sales Tax", slug:"sales-tax", description:"Price with sales tax.", category:"Tax", keywords:["sales","tax"], status:"ready", componentId:"SALES_TAX" },

  { name:"Date Difference", slug:"date-diff", description:"Days between dates.", category:"Dates & Time", keywords:["date","difference"], status:"ready", componentId:"DATE_DIFF" },
  { name:"Time Zone Converter", slug:"time-zone", description:"Convert across time zones.", category:"Dates & Time", keywords:["time","zone","utc"], status:"ready", componentId:"TIME_ZONE" },

  { name:"Age Calculator", slug:"age", description:"Exact age from birthdate.", category:"Lifestyle", keywords:["age","birthday"], status:"ready", componentId:"AGE" },
  { name:"Leap Year Checker", slug:"leap-year", description:"Is a year a leap year?", category:"Dates & Time", keywords:["leap","year"], status:"ready", componentId:"LEAP_YEAR" }
];

export const getCalculatorBySlug = (slug: string) =>
  calculators.find(c => c.slug === slug);
