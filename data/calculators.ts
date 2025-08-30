// data/calculators.ts
export type Category =
  | "Finance"
  | "Health"
  | "Utilities"
  | "Conversions"
  | "Tax"
  | "Dates & Time"
  | "Lifestyle"
  | "Travel"
  | "Photography"
  | "Work";

export type ComponentId =
  | "SIP"
  | "EMI"
  | "BMI"
  | "AGE"
  | "BMR"
  | "BODY_FAT"
  | "BREAK_EVEN"
  | "COMPOUND_INTEREST"
  | "CURRENCY"
  | "DAILY_CALORIES"
  | "CALORIES_BURNED"
  | "DATE_DIFF"
  | "DISCOUNT"
  | "FD"
  | "GST_VAT"
  | "HOME_AFFORD"
  | "TAX_INDIA"
  | "INFLATION_REAL"
  | "LEAP_YEAR"
  | "LOAN_COMPARE"
  | "LOAN_ELIGIBILITY"
  // previously activated
  | "MORTGAGE"
  | "PERCENTAGE"
  | "DUE_DATE"
  | "RD"
  | "ROI"
  | "SALES_TAX"
  | "SAVINGS_GOAL"
  | "SIMPLE_INTEREST"
  | "TIME_ZONE"
  | "TIP"
  | "UNIT_LENGTH"
  | "UNIT_TEMP"
  | "UNIT_WEIGHT"
  // new finance/tax set
  | "RETIREMENT"
  | "INVEST_VS_FD"
  | "CC_PAYOFF"
  | "TAX_BRACKET"
  // ✅ daily-use tools
  | "UV_EXPOSURE"
  | "AQI_MASK"
  | "RAIN_NOWCAST"
  | "BEST_LEAVE_TIME"
  | "FUEL_REFILL"
  | "DAILY_SPEND"
  | "WATER_INTAKE"
  | "POMODORO"
  | "GOLDEN_HOUR"
  | "LEAVE_PLANNER"
  | "GROCERY_SWAP"
  | "CRYPTO_HEAT"
  | "POSITION_RISK"
  | "ENERGY_COOK_COST"
  | "IMAGE_SIZE"
  | "PDF_SIZE"
  | null;

export type Calculator = {
  name: string;              // Display name
  slug: string;              // URL slug
  description: string;       // Short description (<=160 chars for SEO)
  category: Category;        // Grouping
  keywords: string[];        // SEO keywords
  status: "ready" | "planned";
  componentId: ComponentId;  // Link to React component
  formulaNote?: string;      // Short note (optional)
};

export const calculators: Calculator[] = [
  { name:"SIP Calculator", slug:"sip", description:"Estimate future value of monthly investments.", category:"Finance", keywords:["mutual fund","investment","sip"], status:"ready", componentId:"SIP", formulaNote:"FV = P × ((1+i)^n − 1)/i × (1+i)" },
  { name:"EMI Calculator", slug:"emi", description:"Monthly loan payment with interest and totals.", category:"Finance", keywords:["loan","emi","amortization","interest"], status:"ready", componentId:"EMI", formulaNote:"EMI = P×i×(1+i)^n / ((1+i)^n − 1)" },
  { name:"BMI Calculator", slug:"bmi", description:"Body Mass Index from height & weight.", category:"Health", keywords:["bmi","health"], status:"ready", componentId:"BMI", formulaNote:"BMI = kg / (m^2)" },
  { name:"Compound Interest", slug:"compound-interest", description:"Growth with compounding interest.", category:"Finance", keywords:["compound","interest"], status:"ready", componentId:"COMPOUND_INTEREST", formulaNote:"A = P(1+r/n)^(nt)" },
  { name:"Simple Interest", slug:"simple-interest", description:"Interest without compounding.", category:"Finance", keywords:["simple","interest"], status:"ready", componentId:"SIMPLE_INTEREST", formulaNote:"I = P×r×t" },
  { name:"Loan Eligibility", slug:"loan-eligibility", description:"Estimate max loan amount from income.", category:"Finance", keywords:["loan","eligibility"], status:"ready", componentId:"LOAN_ELIGIBILITY" },
  { name:"Loan Compare", slug:"loan-compare", description:"Compare EMIs across lenders.", category:"Finance", keywords:["loan","compare"], status:"ready", componentId:"LOAN_COMPARE" },
  { name:"Mortgage Payment", slug:"mortgage", description:"Home loan monthly payment.", category:"Finance", keywords:["mortgage","home"], status:"ready", componentId:"MORTGAGE" },
  { name:"Home Affordability", slug:"home-affordability", description:"Estimate home purchase budget.", category:"Finance", keywords:["mortgage","budget"], status:"ready", componentId:"HOME_AFFORD" },
  { name:"ROI", slug:"roi", description:"Return on Investment percentage.", category:"Finance", keywords:["return","profit"], status:"ready", componentId:"ROI" },
  { name:"Break-even Point", slug:"break-even", description:"Units or revenue to break even.", category:"Finance", keywords:["fixed cost","margin"], status:"ready", componentId:"BREAK_EVEN" },
  { name:"Inflation Adjusted Return", slug:"inflation-adjusted", description:"Real return after inflation.", category:"Finance", keywords:["inflation","real"], status:"ready", componentId:"INFLATION_REAL" },
  { name:"Fixed Deposit (FD)", slug:"fd", description:"FD maturity and interest.", category:"Finance", keywords:["fd","bank"], status:"ready", componentId:"FD" },
  { name:"Recurring Deposit (RD)", slug:"rd", description:"RD maturity value.", category:"Finance", keywords:["rd","bank"], status:"ready", componentId:"RD" },
  { name:"Savings Goal", slug:"savings-goal", description:"Monthly saving needed for a goal.", category:"Finance", keywords:["goal","savings"], status:"ready", componentId:"SAVINGS_GOAL" },
  { name:"Currency Converter", slug:"currency-converter", description:"Convert amounts across currencies.", category:"Finance", keywords:["forex","currency"], status:"ready", componentId:"CURRENCY" },

  // New Finance
  { name:"Retirement Calculator", slug:"retirement", description:"Plan corpus and sustainable retirement income.", category:"Finance", keywords:["retirement","pension"], status:"ready", componentId:"RETIREMENT" },
  { name:"Investment vs FD", slug:"invest-vs-fd", description:"Compare market vs fixed deposit returns.", category:"Finance", keywords:["fd","lumpsum"], status:"ready", componentId:"INVEST_VS_FD" },
  { name:"Credit Card Payoff", slug:"cc-payoff", description:"Time & interest to clear credit card dues.", category:"Finance", keywords:["credit card","debt"], status:"ready", componentId:"CC_PAYOFF" },

  // Health
  { name:"BMR", slug:"bmr", description:"Basal Metabolic Rate estimate.", category:"Health", keywords:["metabolism","calorie"], status:"ready", componentId:"BMR" },
  { name:"Body Fat %", slug:"body-fat", description:"Body fat estimation.", category:"Health", keywords:["fat","composition"], status:"ready", componentId:"BODY_FAT" },
  { name:"Daily Calorie Needs", slug:"daily-calories", description:"Maintenance calories per day.", category:"Health", keywords:["tdee","calories"], status:"ready", componentId:"DAILY_CALORIES" },
  { name:"Calories Burned", slug:"calories-burned", description:"Calories burned during activities.", category:"Health", keywords:["exercise","burn"], status:"ready", componentId:"CALORIES_BURNED" },
  { name:"Pregnancy Due Date", slug:"pregnancy-due-date", description:"Estimate due date from LMP.", category:"Health", keywords:["due date","pregnancy"], status:"ready", componentId:"DUE_DATE" },

  // Utilities & Conversions
  { name:"Percentage", slug:"percentage", description:"Find X% of Y or reverse.", category:"Utilities", keywords:["percent","increase"], status:"ready", componentId:"PERCENTAGE" },
  { name:"Discount", slug:"discount", description:"Sale price after discount.", category:"Utilities", keywords:["sale","discount"], status:"ready", componentId:"DISCOUNT" },
  { name:"Tip", slug:"tip", description:"Restaurant tip and bill split.", category:"Utilities", keywords:["bill","gratuity"], status:"ready", componentId:"TIP" },
  { name:"Unit: Length", slug:"unit-length", description:"Meters, feet, miles and more.", category:"Conversions", keywords:["length","convert"], status:"ready", componentId:"UNIT_LENGTH" },
  { name:"Unit: Weight", slug:"unit-weight", description:"Kg, lb, oz conversions.", category:"Conversions", keywords:["weight","convert"], status:"ready", componentId:"UNIT_WEIGHT" },
  { name:"Unit: Temperature", slug:"unit-temperature", description:"Celsius, Fahrenheit, Kelvin.", category:"Conversions", keywords:["temperature","convert"], status:"ready", componentId:"UNIT_TEMP" },

  // Tax
  { name:"GST / VAT", slug:"gst-vat", description:"Add or remove GST/VAT.", category:"Tax", keywords:["gst","vat"], status:"ready", componentId:"GST_VAT" },
  { name:"Income Tax (India)", slug:"income-tax-india", description:"Estimate India income tax slabs.", category:"Tax", keywords:["tax","india"], status:"ready", componentId:"TAX_INDIA" },
  { name:"Sales Tax", slug:"sales-tax", description:"Price with sales tax.", category:"Tax", keywords:["sales","tax"], status:"ready", componentId:"SALES_TAX" },
  { name:"Tax Bracket (Global)", slug:"tax-bracket", description:"Progressive tax estimator (US/UK/India/Gulf).", category:"Tax", keywords:["tax","bracket"], status:"ready", componentId:"TAX_BRACKET" },

  // Dates & Time
  { name:"Date Difference", slug:"date-diff", description:"Days between dates.", category:"Dates & Time", keywords:["date","difference"], status:"ready", componentId:"DATE_DIFF" },
  { name:"Time Zone Converter", slug:"time-zone", description:"Convert across time zones.", category:"Dates & Time", keywords:["time","zone"], status:"ready", componentId:"TIME_ZONE" },

  // Lifestyle
  { name:"Age Calculator", slug:"age", description:"Exact age from birthdate.", category:"Lifestyle", keywords:["age","birthday"], status:"ready", componentId:"AGE" },
  { name:"Leap Year Checker", slug:"leap-year", description:"Is a year leap?", category:"Dates & Time", keywords:["leap","year"], status:"ready", componentId:"LEAP_YEAR" },

  // Daily-use tools
  { name:"UV Exposure Calculator", slug:"uv-exposure", description:"Safe outdoor minutes before sunburn with SPF guidance.", category:"Health", keywords:["uv","sun","spf"], status:"ready", componentId:"UV_EXPOSURE" },
  { name:"Air Quality & Mask", slug:"aqi-mask", description:"Mask recommendation based on AQI.", category:"Health", keywords:["aqi","mask"], status:"ready", componentId:"AQI_MASK" },
  { name:"Rain Nowcast", slug:"rain-nowcast", description:"Umbrella check for next 1–2 hours.", category:"Utilities", keywords:["rain","weather"], status:"ready", componentId:"RAIN_NOWCAST" },
  { name:"Best Time to Leave", slug:"best-leave-time", description:"Leave by time to meet arrival window.", category:"Travel", keywords:["commute","leave"], status:"ready", componentId:"BEST_LEAVE_TIME" },
  { name:"Fuel Refill Decision", slug:"fuel-refill", description:"Refill today or wait based on price trend.", category:"Utilities", keywords:["fuel","petrol"], status:"ready", componentId:"FUEL_REFILL" },
  { name:"Daily Spend Limit", slug:"daily-spend", description:"Max spend today to stay on budget.", category:"Finance", keywords:["budget","spend"], status:"ready", componentId:"DAILY_SPEND" },
  { name:"Water Intake", slug:"water-intake", description:"Hydration target (glasses remaining).", category:"Health", keywords:["water","hydration"], status:"ready", componentId:"WATER_INTAKE" },
  { name:"Pomodoro Planner", slug:"pomodoro", description:"Sessions to finish today’s tasks.", category:"Work", keywords:["pomodoro","productivity"], status:"ready", componentId:"POMODORO" },
  { name:"Golden Hour Planner", slug:"golden-hour", description:"Sunrise/sunset golden hour timings.", category:"Photography", keywords:["golden hour","photo"], status:"ready", componentId:"GOLDEN_HOUR" },
  { name:"Holiday & Leave Planner", slug:"leave-planner", description:"Next holiday + leave bridge days.", category:"Work", keywords:["holiday","leave"], status:"ready", componentId:"LEAVE_PLANNER" },
  { name:"Grocery Swap Saver", slug:"grocery-swap", description:"Cheapest brand per staple (per unit).", category:"Utilities", keywords:["grocery","comparison"], status:"ready", componentId:"GROCERY_SWAP" },
  { name:"Crypto Volatility Heat", slug:"crypto-heat", description:"Daily risk score from volatility.", category:"Finance", keywords:["crypto","risk"], status:"ready", componentId:"CRYPTO_HEAT" },
  { name:"Position Size (Risk %)", slug:"position-risk", description:"Position size from risk %.", category:"Finance", keywords:["position","risk"], status:"ready", componentId:"POSITION_RISK" },
  { name:"Cooking Energy Cost", slug:"energy-cook-cost", description:"Compare LPG vs electricity cost.", category:"Utilities", keywords:["energy","gas"], status:"ready", componentId:"ENERGY_COOK_COST" },
  { name:"Image Size Planner", slug:"image-size", description:"Target image dimensions under 1 MB.", category:"Utilities", keywords:["image","compression"], status:"ready", componentId:"IMAGE_SIZE" },
  { name:"PDF Compress Estimator", slug:"pdf-size", description:"Expected PDF size after downsampling.", category:"Utilities", keywords:["pdf","compress"], status:"ready", componentId:"PDF_SIZE" },
];

export const getCalculatorBySlug = (slug: string) =>
  calculators.find((c) => c.slug === slug);

export const listByCategory = (cat: Category) =>
  calculators.filter((c) => c.category === cat);
