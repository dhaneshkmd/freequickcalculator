// data/calculators.ts
export type Category =
  'Finance' | 'Health' | 'Utilities' | 'Conversions' | 'Tax' | 'Dates & Time' | 'Lifestyle'
  | 'Travel' | 'Photography' | 'Work';

export type ComponentId =
  'SIP' | 'EMI' | 'BMI' | 'AGE' |
  'BMR' | 'BODY_FAT' | 'BREAK_EVEN' |
  'COMPOUND_INTEREST' | 'CURRENCY' | 'DAILY_CALORIES' | 'CALORIES_BURNED' | 'DATE_DIFF' |
  'DISCOUNT' | 'FD' | 'GST_VAT' | 'HOME_AFFORD' | 'TAX_INDIA' | 'INFLATION_REAL' |
  'LEAP_YEAR' | 'LOAN_COMPARE' | 'LOAN_ELIGIBILITY' |
  // previously activated
  'MORTGAGE' | 'PERCENTAGE' | 'DUE_DATE' | 'RD' | 'ROI' | 'SALES_TAX' | 'SAVINGS_GOAL' |
  'SIMPLE_INTEREST' | 'TIME_ZONE' | 'TIP' | 'UNIT_LENGTH' | 'UNIT_TEMP' | 'UNIT_WEIGHT' |
  // new finance/tax set you added
  'RETIREMENT' | 'INVEST_VS_FD' | 'CC_PAYOFF' | 'TAX_BRACKET' |
  // ✅ newly added “daily-use” tools
  'UV_EXPOSURE' | 'AQI_MASK' | 'RAIN_NOWCAST' | 'BEST_LEAVE_TIME' | 'FUEL_REFILL'
  | 'DAILY_SPEND' | 'WATER_INTAKE' | 'POMODORO' | 'GOLDEN_HOUR' | 'LEAVE_PLANNER'
  | 'GROCERY_SWAP' | 'CRYPTO_HEAT' | 'POSITION_RISK' | 'ENERGY_COOK_COST' | 'IMAGE_SIZE' | 'PDF_SIZE'
  | null;

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

  // NEW — Finance
  { name:"Retirement Calculator", slug:"retirement", description:"Plan future corpus and sustainable monthly income.", category:"Finance", keywords:["retirement","corpus","pension","goal"], status:"ready", componentId:"RETIREMENT", formulaNote:"FV of current savings + FV of series; income via annuity PMT." },
  { name:"Investment vs. FD", slug:"invest-vs-fd", description:"Compare expected returns vs bank fixed deposits.", category:"Finance", keywords:["fd","lumpsum","comparison"], status:"ready", componentId:"INVEST_VS_FD", formulaNote:"A = P(1+r/m)^(m·t) for both options; difference = A₁ − A₂." },
  { name:"Credit Card Payoff", slug:"cc-payoff", description:"Time & total interest to clear credit card dues.", category:"Finance", keywords:["credit card","debt","payoff"], status:"ready", componentId:"CC_PAYOFF", formulaNote:"n = −ln(1 − rB/P)/ln(1+r); or PMT for target months." },

  // Health
  { name:"BMR", slug:"bmr", description:"Basal Metabolic Rate estimate.", category:"Health", keywords:["metabolism","calorie"], status:"ready", componentId:"BMR", formulaNote:"Mifflin–St Jeor" },
  { name:"Body Fat %", slug:"body-fat", description:"Body fat estimation.", category:"Health", keywords:["fat","composition"], status:"ready", componentId:"BODY_FAT", formulaNote:"U.S. Navy method" },
  { name:"Daily Calorie Needs", slug:"daily-calories", description:"Maintenance calories per day.", category:"Health", keywords:["tdee","calories"], status:"ready", componentId:"DAILY_CALORIES", formulaNote:"TDEE = BMR × activity" },
  { name:"Calories Burned", slug:"calories-burned", description:"Calories burned during activities.", category:"Health", keywords:["exercise","burn"], status:"ready", componentId:"CALORIES_BURNED", formulaNote:"kcal = MET × kg × hours" },
  { name:"Pregnancy Due Date", slug:"pregnancy-due-date", description:"Estimate due date from LMP.", category:"Health", keywords:["due date","pregnancy"], status:"ready", componentId:"DUE_DATE", formulaNote:"Naegele’s rule (280 days, cycle-adjusted)" },

  // Utilities & Conversions
  { name:"Percentage", slug:"percentage", description:"Find X% of Y or reverse.", category:"Utilities", keywords:["percent","increase","decrease"], status:"ready", componentId:"PERCENTAGE" },
  { name:"Discount", slug:"discount", description:"Sale price after discount.", category:"Utilities", keywords:["sale","percent off"], status:"ready", componentId:"DISCOUNT", formulaNote:"Final = Price × (1 − d1) × (1 − d2) × (1 + tax)" },
  { name:"Tip", slug:"tip", description:"Restaurant tip and bill split.", category:"Utilities", keywords:["bill","gratuity"], status:"ready", componentId:"TIP" },

  { name:"Unit: Length", slug:"unit-length", description:"Meters, feet, miles and more.", category:"Conversions", keywords:["length","convert"], status:"ready", componentId:"UNIT_LENGTH" },
  { name:"Unit: Weight", slug:"unit-weight", description:"Kg, lb, oz conversions.", category:"Conversions", keywords:["weight","convert"], status:"ready", componentId:"UNIT_WEIGHT" },
  { name:"Unit: Temperature", slug:"unit-temperature", description:"Celsius, Fahrenheit, Kelvin.", category:"Conversions", keywords:["temperature","convert"], status:"ready", componentId:"UNIT_TEMP" },

  // Tax
  { name:"GST / VAT", slug:"gst-vat", description:"Add or remove GST/VAT.", category:"Tax", keywords:["gst","vat","tax"], status:"ready", componentId:"GST_VAT", formulaNote:"Add: total = base×(1+r). Remove: base = total/(1+r)" },
  { name:"Income Tax (India)", slug:"income-tax-india", description:"Estimate income tax slabs.", category:"Tax", keywords:["tax","india"], status:"ready", componentId:"TAX_INDIA", formulaNote:"New Regime slabs + 4% cess (FY 2024–25 approx.)" },
  { name:"Sales Tax", slug:"sales-tax", description:"Price with sales tax.", category:"Tax", keywords:["sales","tax"], status:"ready", componentId:"SALES_TAX" },
  { name:"Tax Bracket (Global)", slug:"tax-bracket", description:"Progressive tax estimator with US/UK/India/Gulf presets.", category:"Tax", keywords:["tax","bracket","us","uk","india","gulf"], status:"ready", componentId:"TAX_BRACKET", formulaNote:"Tax = Σ slice×rate on taxable (income − allowance)." },

  // Dates & Time
  { name:"Date Difference", slug:"date-diff", description:"Days between dates.", category:"Dates & Time", keywords:["date","difference"], status:"ready", componentId:"DATE_DIFF" },
  { name:"Time Zone Converter", slug:"time-zone", description:"Convert across time zones.", category:"Dates & Time", keywords:["time","zone","utc"], status:"ready", componentId:"TIME_ZONE" },

  // Lifestyle
  { name:"Age Calculator", slug:"age", description:"Exact age from birthdate.", category:"Lifestyle", keywords:["age","birthday"], status:"ready", componentId:"AGE" },
  { name:"Leap Year Checker", slug:"leap-year", description:"Is a year a leap year?", category:"Dates & Time", keywords:["leap","year"], status:"ready", componentId:"LEAP_YEAR" },

  // ✅ NEW — Daily-use, high-utility tools
  { name:"UV Exposure Calculator", slug:"uv-exposure", description:"Safe outdoor minutes before sunburn with SPF guidance.", category:"Health", keywords:["uv","sun","spf","burn time","exposure"], status:"ready", componentId:"UV_EXPOSURE", formulaNote:"Safe minutes ≈ (base[skin] × SPF factor) / UV index (conservative)." },
  { name:"Air Quality & Mask", slug:"aqi-mask", description:"Mask recommendation and outdoor time suggestion from AQI.", category:"Health", keywords:["aqi","mask","air quality","pm2.5"], status:"ready", componentId:"AQI_MASK", formulaNote:"Uses US EPA AQI bands for limits." },
  { name:"Rain Nowcast", slug:"rain-nowcast", description:"Carry the umbrella? Next 60–120 min rain risk.", category:"Utilities", keywords:["rain","nowcast","umbrella","weather"], status:"ready", componentId:"RAIN_NOWCAST" },
  { name:"Best Time to Leave", slug:"best-leave-time", description:"Leave-by time to hit your arrival window.", category:"Travel", keywords:["commute","eta","arrival","leave time"], status:"ready", componentId:"BEST_LEAVE_TIME" },
  { name:"Fuel Refill Decision", slug:"fuel-refill", description:"Refill today or wait based on price trend and days left.", category:"Utilities", keywords:["fuel","petrol","gas","price","refill"], status:"ready", componentId:"FUEL_REFILL" },
  { name:"Daily Spend Limit", slug:"daily-spend", description:"Max you can spend today to stay on budget.", category:"Finance", keywords:["budget","spend limit","money"], status:"ready", componentId:"DAILY_SPEND" },
  { name:"Water Intake", slug:"water-intake", description:"Hydration target — glasses remaining today.", category:"Health", keywords:["water","hydration","intake"], status:"ready", componentId:"WATER_INTAKE" },
  { name:"Pomodoro Planner", slug:"pomodoro", description:"Sessions needed to finish tasks today.", category:"Work", keywords:["pomodoro","productivity","timeboxing"], status:"ready", componentId:"POMODORO" },
  { name:"Golden Hour Planner", slug:"golden-hour", description:"Golden hour start & end for a date and place (manual sunrise/sunset).", category:"Photography", keywords:["golden hour","sunrise","sunset","photo"], status:"ready", componentId:"GOLDEN_HOUR" },
  { name:"Holiday & Leave Planner", slug:"leave-planner", description:"Next holiday + leave days to bridge with weekends.", category:"Work", keywords:["holiday","leave","planner"], status:"ready", componentId:"LEAVE_PLANNER" },
  { name:"Grocery Swap Saver", slug:"grocery-swap", description:"Cheapest brand per staple using price per 100g.", category:"Utilities", keywords:["grocery","price per unit","comparison"], status:"ready", componentId:"GROCERY_SWAP" },
  { name:"Crypto Volatility Heat", slug:"crypto-heat", description:"Daily risk score & position sizing from volatility.", category:"Finance", keywords:["crypto","atr","volatility","risk"], status:"ready", componentId:"CRYPTO_HEAT" },
  { name:"Position Size (Risk %)", slug:"position-risk", description:"Position size from entry, stop and account risk.", category:"Finance", keywords:["position size","risk","stop loss"], status:"ready", componentId:"POSITION_RISK" },
  { name:"Cooking Energy Cost", slug:"energy-cook-cost", description:"Refill gas vs electricity — cheaper cooking energy.", category:"Utilities", keywords:["energy","gas","electricity","cost"], status:"ready", componentId:"ENERGY_COOK_COST", formulaNote:"LPG ≈ 13.6 kWh/kg. Cost = price/efficiency per useful kWh." },
  { name:"Image Size Planner", slug:"image-size", description:"Target image dimensions under 1 MB.", category:"Utilities", keywords:["image","size","compression","kb","mb"], status:"ready", componentId:"IMAGE_SIZE" },
  { name:"PDF Compress Estimator", slug:"pdf-size", description:"Expected PDF file size after downsampling.", category:"Utilities", keywords:["pdf","compress","dpi","size"], status:"ready", componentId:"PDF_SIZE" }
];

export const getCalculatorBySlug = (slug: string) =>
  calculators.find(c => c.slug === slug);
