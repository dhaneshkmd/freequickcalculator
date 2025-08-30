// data/calculatorContent.ts
import type { CalculatorContentProps } from "@/components/CalculatorContent";

/**
 * Long-form content for calculators (intro, formula, example, FAQs, etc.)
 * Keyed by slug (matching calculators[].slug). Kept as *strings* so .ts compiles.
 */
export const calculatorContent: Record<string, CalculatorContentProps> = {
  // ---- EXISTING ----
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

  // ---- NEW ADDITIONS ----

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
};
