// data/calculatorContent.ts
import type { CalculatorContentProps } from "@/components/CalculatorContent";

/**
 * Long-form content for calculators (intro, formula, example, FAQs, etc.)
 * Keyed by slug (matching calculators[].slug). Kept as *strings* so .ts compiles.
 */
export const calculatorContent: Record<string, CalculatorContentProps> = {
  // ---- CORE (existing 10 and more) ----

  emi: {
    title: "Loan EMI Calculator",
    intro:
      "The Loan EMI (Equated Monthly Installment) Calculator helps you estimate a fixed monthly repayment amount for loans. It combines principal and interest over your chosen tenure, making it easier to compare lenders and plan your finances. Useful for home, car, or personal loans in India, UAE, and globally.",
    formula: "EMI = (P × r × (1 + r)^n) ÷ ((1 + r)^n − 1)",
    variables: [
      { symbol: "P", meaning: "Loan principal" },
      { symbol: "r", meaning: "Monthly interest rate (annual ÷ 12)" },
      { symbol: "n", meaning: "Number of monthly installments" },
    ],
    example: {
      description: "Loan = ₹10,00,000 · Rate = 10% p.a. · Tenure = 60 months",
      result: "EMI ≈ ₹21,247 per month",
    },
    useCases: [
      "Compare car loan EMIs",
      "Plan mortgage repayments",
      "Understand principal vs interest split",
    ],
    faqs: [
      { q: "What is EMI?", a: "A fixed monthly payment covering both principal and interest." },
      { q: "How to reduce EMI?", a: "Prepay part of the loan, negotiate a lower rate, or extend the tenure." },
      { q: "Does EMI change?", a: "Fixed-rate loans stay constant; floating-rate loans may vary." },
    ],
    disclaimer: "This calculator is for educational purposes only. Verify loan terms with your bank.",
  },

  bmi: {
    title: "BMI (Body Mass Index) Calculator",
    intro:
      "The BMI Calculator estimates body mass index using height and weight. It helps identify underweight, normal, overweight, and obese categories. Widely used as a quick screening tool but not a substitute for professional medical advice.",
    formula:
      "BMI = weight(kg) ÷ [height(m)]^2  |  BMI (US) = 703 × weight(lb) ÷ [height(in)]^2",
    variables: [
      { symbol: "weight", meaning: "Body weight in kilograms or pounds" },
      { symbol: "height", meaning: "Body height in meters or inches" },
    ],
    example: { description: "Weight = 70 kg, Height = 1.75 m", result: "BMI ≈ 22.86 (Normal)" },
    useCases: ["Quick self-check", "Fitness/diet tracking", "Education/schools"],
    faqs: [
      { q: "Is BMI a diagnosis?", a: "No. It’s a screening tool only." },
      { q: "What are BMI ranges?", a: "Under 18.5, 18.5–24.9, 25–29.9, 30+." },
      { q: "Metric & US units?", a: "Yes, kg/cm and lb/in are supported." },
    ],
    disclaimer: "Informational only. Consult a doctor for personal health guidance.",
  },

  sip: {
    title: "SIP (Systematic Investment Plan) Calculator",
    intro:
      "SIP is a disciplined way to invest a fixed amount regularly in mutual funds. This calculator projects maturity values using compounding, helping plan long-term goals like retirement or education.",
    formula: "FV = P × [((1 + r/n)^(n×t) − 1) ÷ (r/n)] × (1 + r/n)",
    variables: [
      { symbol: "P", meaning: "Installment amount" },
      { symbol: "r", meaning: "Annual return rate" },
      { symbol: "n", meaning: "Compounding frequency" },
      { symbol: "t", meaning: "Number of years" },
    ],
    example: { description: "₹5,000/month, r = 12% p.a., t = 10 years", result: "Future Value ≈ ₹11.6 lakhs" },
    useCases: ["Retirement planning", "Child education fund", "Wealth creation"],
    faqs: [
      { q: "Are SIP returns guaranteed?", a: "No. Returns depend on market performance." },
      { q: "Change SIP amount later?", a: "Usually yes; check with your fund." },
      { q: "What if markets fall?", a: "SIPs average cost over time; returns may vary." },
    ],
    disclaimer: "Informational only. Investments are subject to market risks.",
  },

  percentage: {
    title: "Percentage Calculator",
    intro:
      "Quickly compute X% of Y, percent increase/decrease, and reverse percentage problems. Handy for discounts, markups, and homework.",
    formula:
      "Percent of a value: X% of Y = (X ÷ 100) × Y. Increase: New = Old × (1 + X/100). Decrease: New = Old × (1 − X/100).",
    variables: [
      { symbol: "X", meaning: "Percentage rate" },
      { symbol: "Y", meaning: "Base value" },
    ],
    example: { description: "What is 18% of 2,500?", result: "2,500 × 0.18 = 450" },
    useCases: ["Sale discounts", "Profit/markup", "Exam scores"],
    faqs: [
      { q: "Percent to decimal?", a: "Divide by 100 (18% = 0.18)." },
      { q: "Stacked discounts?", a: "Apply sequentially (not additive)." },
    ],
    disclaimer: "For education only.",
  },

  age: {
    title: "Age Calculator",
    intro:
      "Find exact age from date of birth in years, months, and days. Useful for forms, KYC, and events.",
    formula:
      "Age is the difference between today’s date and your date of birth, adjusted for month/day boundaries.",
    variables: [
      { symbol: "DOB", meaning: "Date of birth" },
      { symbol: "Today", meaning: "Current date (your device time)" },
    ],
    example: {
      description: "DOB: 2000-04-20; Today: 2025-08-30",
      result: "Age ≈ 25 years, 4 months, 10 days",
    },
    useCases: ["Forms/KYC", "Anniversaries", "Event planning"],
    faqs: [
      { q: "Timezone differences?", a: "We use your browser date; results can vary by timezone near midnight." },
      { q: "Leap years?", a: "Handled by date math internally." },
    ],
    disclaimer: "Informational only.",
  },

  "gst-vat": {
    title: "GST/VAT Calculator",
    intro:
      "Add or remove GST/VAT from prices. Works for India GST and UAE VAT presets or custom rates.",
    formula:
      "Add tax: Total = Base × (1 + r). Remove tax: Base = Total ÷ (1 + r). Tax amount = Total − Base.",
    variables: [
      { symbol: "Base", meaning: "Price before tax" },
      { symbol: "r", meaning: "Tax rate (e.g., 0.18 for 18%)" },
    ],
    example: { description: "Base ₹1,000 with 18% GST", result: "Total = 1,000 × 1.18 = ₹1,180; GST = ₹180" },
    useCases: ["Invoices", "Retail pricing", "Reverse tax from receipt"],
    faqs: [
      { q: "Inclusive vs exclusive?", a: "Choose add (exclusive) or remove (inclusive) in the tool." },
      { q: "Round-off?", a: "We show exact math; merchants may round to the nearest paise/fil." },
    ],
    disclaimer: "Tax rules vary. Verify with your accountant.",
  },

  discount: {
    title: "Discount & Sale Price Calculator",
    intro: "Compute final price after one or multiple discounts and optional tax.",
    formula: "Final = Price × (1 − d1) × (1 − d2) … × (1 + tax). Savings = Price − Final.",
    variables: [
      { symbol: "Price", meaning: "Original price" },
      { symbol: "d1, d2", meaning: "Discount rates as decimals" },
    ],
    example: { description: "₹2,000 with 20% then 10% discount", result: "Final = 2000 × 0.8 × 0.9 = ₹1,440; Savings = ₹560" },
    useCases: ["Sales events", "Coupon stacking", "Cart totals"],
    faqs: [{ q: "Are discounts additive?", a: "No, they’re multiplicative sequentially." }],
    disclaimer: "For education only.",
  },

  "date-diff": {
    title: "Date Difference Calculator",
    intro:
      "Find days between two dates, add/subtract days, and optionally exclude weekends.",
    formula:
      "Days between = absolute difference in calendar days; business days exclude Saturdays and Sundays.",
    variables: [
      { symbol: "Start", meaning: "Start date" },
      { symbol: "End", meaning: "End date" },
    ],
    example: { description: "Start: 2025-01-10, End: 2025-02-02", result: "Difference = 23 days (business days ≈ 17)" },
    useCases: ["Project timelines", "Due dates", "SLA windows"],
    faqs: [{ q: "Include end date?", a: "Toggle include/exclude end date in the tool." }],
    disclaimer: "Informational only.",
  },

  "compound-interest": {
    title: "Compound Interest Calculator",
    intro: "Estimate growth from compounding (annual, quarterly, monthly, daily).",
    formula: "A = P × (1 + r/n)^(n×t), Interest = A − P.",
    variables: [
      { symbol: "P", meaning: "Principal" },
      { symbol: "r", meaning: "Annual rate (decimal)" },
      { symbol: "n", meaning: "Compounds per year" },
      { symbol: "t", meaning: "Years" },
    ],
    example: {
      description: "₹50,000 at 8% compounded monthly for 5 years",
      result: "A ≈ ₹73,466; Interest ≈ ₹23,466",
    },
    useCases: ["FD comparisons", "Goal planning", "What-if analysis"],
    faqs: [{ q: "n for monthly?", a: "Use n = 12." }],
    disclaimer: "Informational only.",
  },

  roi: {
    title: "ROI (Return on Investment) Calculator",
    intro: "Compute ROI % to compare profitability across projects or assets.",
    formula: "ROI% = [(Gain − Cost) ÷ Cost] × 100",
    variables: [
      { symbol: "Gain", meaning: "Final value / proceeds" },
      { symbol: "Cost", meaning: "Initial investment" },
    ],
    example: { description: "Buy at ₹1,00,000; sell at ₹1,20,000", result: "ROI = (20,000 ÷ 1,00,000) × 100 = 20%" },
    useCases: ["Marketing campaigns", "Projects", "Investments"],
    faqs: [{ q: "Include fees/taxes?", a: "For true ROI, include all costs." }],
    disclaimer: "Informational only.",
  },

  // ---- NEW 10 (added now) ----

  "simple-interest": {
    title: "Simple Interest Calculator",
    intro: "Calculate basic interest without compounding. Common in short-term loans, education loans, and informal lending.",
    formula: "I = P × r × t",
    variables: [
      { symbol: "P", meaning: "Principal amount" },
      { symbol: "r", meaning: "Annual interest rate (decimal)" },
      { symbol: "t", meaning: "Time in years" },
    ],
    example: {
      description: "₹20,000 at 10% for 2 years",
      result: "Interest = 20,000 × 0.10 × 2 = ₹4,000",
    },
    useCases: ["Education loans", "Short-term borrowings", "Quick finance math"],
    faqs: [
      { q: "When is simple interest used?", a: "Usually for short-term or informal loans." },
      { q: "Is it cheaper?", a: "Yes, compared to compounding, it grows slower." },
    ],
    disclaimer: "For quick estimates only.",
  },

  fd: {
    title: "Fixed Deposit (FD) Calculator",
    intro: "Estimate maturity amount of bank fixed deposits with compounding. Helps compare different bank FD options.",
    formula: "A = P × (1 + r/n)^(n×t)",
    variables: [
      { symbol: "P", meaning: "Deposit amount" },
      { symbol: "r", meaning: "Annual interest rate (decimal)" },
      { symbol: "n", meaning: "Compounds per year" },
      { symbol: "t", meaning: "Tenure in years" },
    ],
    example: {
      description: "₹1,00,000 at 6% p.a. for 5 years (quarterly compounding)",
      result: "Maturity ≈ ₹1,34,866",
    },
    useCases: ["Bank FD planning", "Safe investments", "Retirement savings"],
    faqs: [
      { q: "Is FD interest taxable?", a: "Yes, as per income tax rules." },
      { q: "Do all banks compound quarterly?", a: "Mostly yes, but check terms." },
    ],
    disclaimer: "Confirm with your bank.",
  },

  rd: {
    title: "Recurring Deposit (RD) Calculator",
    intro: "Estimate maturity value of recurring monthly deposits. Useful for systematic savers.",
    formula: "Maturity = P × [ (1 + r/n)^(nt) − 1 ] ÷ (1 − (1 + r/n)^(-1/n))",
    variables: [
      { symbol: "P", meaning: "Monthly installment" },
      { symbol: "r", meaning: "Annual interest rate (decimal)" },
      { symbol: "n", meaning: "Compounds per year" },
      { symbol: "t", meaning: "Years" },
    ],
    example: {
      description: "₹5,000 per month at 7% for 5 years",
      result: "Maturity ≈ ₹3.6 lakhs",
    },
    useCases: ["Small savings", "Goal-based deposits", "Children’s education fund"],
    faqs: [{ q: "Is RD interest same as FD?", a: "Usually yes, same bank rates apply." }],
    disclaimer: "Figures are estimates.",
  },

  "loan-eligibility": {
    title: "Loan Eligibility Calculator",
    intro: "Estimate maximum loan amount you may qualify for based on income, obligations, and bank FOIR (Fixed Obligation to Income Ratio).",
    formula: "Eligible EMI = (Net income × FOIR) − existing EMIs",
    variables: [
      { symbol: "Income", meaning: "Monthly net income" },
      { symbol: "FOIR", meaning: "Bank’s fixed ratio (e.g., 50%)" },
      { symbol: "EMI", meaning: "Existing obligations" },
    ],
    example: {
      description: "Income ₹60,000, FOIR 50%, EMIs ₹10,000",
      result: "Max EMI = ₹20,000 → Loan amount depends on tenure & rate",
    },
    useCases: ["Home loan planning", "Car loan limits"],
    faqs: [{ q: "What is FOIR?", a: "Fixed Obligation to Income Ratio used by banks." }],
    disclaimer: "Exact eligibility depends on lender policy.",
  },

  "loan-compare": {
    title: "Loan Comparison Calculator",
    intro: "Compare EMIs across lenders for the same loan. Useful to pick the lowest total cost.",
    formula: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)",
    variables: [
      { symbol: "P", meaning: "Principal" },
      { symbol: "r", meaning: "Monthly rate" },
      { symbol: "n", meaning: "Number of EMIs" },
    ],
    example: {
      description: "Loan ₹5 lakhs, 60 months, compare 9% vs 11%",
      result: "EMI ~₹10,378 vs ₹10,869 → ~₹29,000 saved overall",
    },
    useCases: ["Choosing best bank", "Refinancing decision"],
    faqs: [{ q: "Does tenure affect savings?", a: "Yes, longer tenures magnify rate differences." }],
    disclaimer: "Check official bank quotes.",
  },

  mortgage: {
    title: "Mortgage Calculator",
    intro: "Estimate monthly payments for home loans. Includes principal, interest, and amortization schedule.",
    formula: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)",
    variables: [
      { symbol: "P", meaning: "Loan amount" },
      { symbol: "r", meaning: "Monthly rate" },
      { symbol: "n", meaning: "Number of months" },
    ],
    example: {
      description: "Loan $200,000, 30 years, 6% annual",
      result: "EMI ≈ $1,199/month",
    },
    useCases: ["Home purchase planning", "Refinance analysis"],
    faqs: [{ q: "Property taxes/insurance included?", a: "This covers principal + interest only." }],
    disclaimer: "Educational only. Consult your lender.",
  },

  "savings-goal": {
    title: "Savings Goal Calculator",
    intro: "Find how much you must save monthly to reach a target future amount.",
    formula: "PMT = FV × i ÷ ((1 + i)^n − 1)",
    variables: [
      { symbol: "FV", meaning: "Future value (goal)" },
      { symbol: "i", meaning: "Monthly rate (annual ÷ 12)" },
      { symbol: "n", meaning: "Months to goal" },
    ],
    example: {
      description: "Goal ₹10 lakhs in 10 years at 8%",
      result: "Save ~₹5,168/month",
    },
    useCases: ["Retirement planning", "College fund", "Wealth goals"],
    faqs: [{ q: "What if I increase deposits yearly?", a: "This calculator assumes fixed monthly savings." }],
    disclaimer: "Approximate only.",
  },

  bmr: {
    title: "BMR (Basal Metabolic Rate) Calculator",
    intro: "Estimate calories burned at rest, based on age, gender, height, and weight. Basis for fitness & diet planning.",
    formula: "Mifflin–St Jeor: Men: 10W + 6.25H − 5A + 5; Women: 10W + 6.25H − 5A − 161",
    variables: [
      { symbol: "W", meaning: "Weight (kg)" },
      { symbol: "H", meaning: "Height (cm)" },
      { symbol: "A", meaning: "Age (years)" },
    ],
    example: {
      description: "Male, 70kg, 175cm, 30y",
      result: "BMR ≈ 1,655 kcal/day",
    },
    useCases: ["Diet planning", "Weight management", "Fitness tracking"],
    faqs: [{ q: "Is BMR = TDEE?", a: "No, TDEE = BMR × activity factor." }],
    disclaimer: "Informational only. Not medical advice.",
  },
};
