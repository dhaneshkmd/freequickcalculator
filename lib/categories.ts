// src/lib/categories.ts
export type Category = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  formulas: { name: string; brief: string }[];
};

export const categories: Category[] = [
  {
    slug: "personal-finance",
    title: "Personal Finance & Money Management",
    description:
      "Budgeting, savings, interest, EMI and practical money math for everyday use.",
    keywords: [
      "budgeting formula",
      "compound interest",
      "EMI",
      "mortgage",
      "savings growth",
      "currency conversion",
    ],
    formulas: [
      { name: "50/30/20 Rule", brief: "Budget = Needs 50%, Wants 30%, Savings 20%." },
      { name: "Compound Interest", brief: "A = P(1 + r/n)^(n·t)" },
      { name: "Loan EMI", brief: "EMI = P·r·(1+r)^n / ((1+r)^n−1)" },
      { name: "Savings Growth", brief: "Future Value with regular deposits and rate." },
    ],
  },
  {
    slug: "health-fitness",
    title: "Health & Fitness",
    description:
      "BMI, BMR, calorie intake, heart-rate zones and hydration formulas.",
    keywords: ["BMI", "BMR", "calories", "heart rate zones", "water intake"],
    formulas: [
      { name: "BMI", brief: "BMI = weight(kg) / height(m)^2" },
      { name: "BMR", brief: "Mifflin-St Jeor / Harris-Benedict equations" },
      { name: "Daily Calories", brief: "TDEE = BMR × Activity Factor" },
      { name: "Heart Rate Zones", brief: "Zone ranges based on % of HRmax" },
    ],
  },
  {
    slug: "education-learning",
    title: "Education & Learning",
    description:
      "Percentage, averages, speed-time-distance and basic probability formulas.",
    keywords: ["percentage", "average", "mean median", "probability", "GPA"],
    formulas: [
      { name: "Percentage", brief: "Part / Whole × 100" },
      { name: "Average / Mean", brief: "Sum of values / Count" },
      { name: "Speed–Distance–Time", brief: "s = d/t, d = s·t" },
      { name: "Simple Probability", brief: "Favorable / Total outcomes" },
    ],
  },
  {
    slug: "business-entrepreneurship",
    title: "Business & Entrepreneurship",
    description:
      "Profit margin, break-even point, ROI, turnover, discount & markup.",
    keywords: ["profit margin", "break-even", "ROI", "inventory turnover"],
    formulas: [
      { name: "Gross Margin", brief: "(Revenue − COGS) / Revenue" },
      { name: "Break-even", brief: "Fixed Costs / (Price − Variable Cost)" },
      { name: "ROI", brief: "(Gain − Cost) / Cost" },
      { name: "Discount/Markup", brief: "Percent change on price" },
    ],
  },
  {
    slug: "work-productivity",
    title: "Work & Productivity",
    description:
      "Time ratios, project completion %, effort rate and team efficiency.",
    keywords: ["time management", "Pomodoro", "80/20", "throughput", "velocity"],
    formulas: [
      { name: "80/20 Rule", brief: "Focus on top 20% tasks for 80% results." },
      { name: "Project Completion %", brief: "Completed items / Total items" },
      { name: "Cost per Hour", brief: "Budget / Person-hours" },
      { name: "Team Efficiency", brief: "Output / Time" },
    ],
  },
  {
    slug: "science-technology",
    title: "Science & Technology",
    description:
      "Core physics, Ohm’s Law, power and unit conversions for STEM use.",
    keywords: ["force", "ohms law", "power", "conversions"],
    formulas: [
      { name: "Force", brief: "F = m·a" },
      { name: "Ohm’s Law", brief: "V = I·R" },
      { name: "Power", brief: "P = V·I" },
      { name: "Unit Conversions", brief: "Temperature, pressure, volume" },
    ],
  },
  {
    slug: "construction-engineering",
    title: "Construction & Engineering",
    description:
      "Area/volume, concrete mix, loads and work efficiency in projects.",
    keywords: ["area", "volume", "concrete", "load", "efficiency"],
    formulas: [
      { name: "Area & Volume", brief: "Basic geometry for shapes" },
      { name: "Concrete Mix", brief: "Common ratios (e.g., 1:2:4)" },
      { name: "Load Bearing", brief: "Simplified static formulas" },
      { name: "Work Efficiency", brief: "Useful output / Input" },
    ],
  },
  {
    slug: "travel-transportation",
    title: "Travel & Transportation",
    description:
      "Fuel consumption, travel time, distance and time-zone conversions.",
    keywords: ["fuel", "speed", "time zone", "flight duration"],
    formulas: [
      { name: "Fuel Consumption", brief: "Liters / 100km (or mpg)" },
      { name: "Travel Time", brief: "Time = Distance / Speed" },
      { name: "Speed–Distance", brief: "Triangle relation" },
      { name: "Time-zone Offset", brief: "Local time + UTC offset" },
    ],
  },
  {
    slug: "household-lifestyle",
    title: "Household & Lifestyle",
    description:
      "Recipe conversion, utility bills, water usage, paint and flooring.",
    keywords: ["recipe conversion", "electricity bill", "paint", "flooring"],
    formulas: [
      { name: "Recipe Conversion", brief: "Scale ingredients by ratio" },
      { name: "Electricity Bill", brief: "kWh × tariff (+ taxes)" },
      { name: "Water Usage", brief: "Liters/Person/Day approx." },
      { name: "Paint/Flooring", brief: "Coverage area calculations" },
    ],
  },
  {
    slug: "real-estate-property",
    title: "Real Estate & Property",
    description:
      "Rental yield, property EMI, ROI and area conversions for property.",
    keywords: ["rental yield", "EMI", "real estate ROI", "sqft to sqm"],
    formulas: [
      { name: "Rental Yield", brief: "Annual Rent / Property Value" },
      { name: "Property EMI", brief: "Same EMI formula as loans" },
      { name: "Real Estate ROI", brief: "Profit / Investment" },
      { name: "Area Conversions", brief: "sqft, sqm, acre, hectare" },
    ],
  },
  {
    slug: "agriculture-farming",
    title: "Agriculture & Farming",
    description:
      "Crop yield, fertilizer ratio, irrigation water and feed formulas.",
    keywords: ["crop yield", "fertilizer", "irrigation", "animal feed"],
    formulas: [
      { name: "Crop Yield", brief: "Harvest / Area" },
      { name: "Fertilizer Ratio", brief: "N–P–K balances" },
      { name: "Irrigation Water", brief: "Depth × Area" },
      { name: "Animal Feed Ratio", brief: "Feed per weight/day" },
    ],
  },
  {
    slug: "environment-climate",
    title: "Environment & Climate",
    description:
      "Carbon footprint, AQI, UV exposure and rainfall intensity basics.",
    keywords: ["carbon footprint", "AQI", "UV index", "rainfall intensity"],
    formulas: [
      { name: "Carbon Footprint", brief: "CO₂e estimates by activity" },
      { name: "AQI", brief: "Index from pollutant concentrations" },
      { name: "UV Safe Time", brief: "Depends on UV index & skin type" },
      { name: "Rainfall Intensity", brief: "mm/hr over catchment" },
    ],
  },
  {
    slug: "sports-recreation",
    title: "Sports & Recreation",
    description:
      "Batting/bowling averages, field goal %, run pace and golf handicap.",
    keywords: ["batting average", "pace", "field goal", "handicap"],
    formulas: [
      { name: "Batting/Bowling Avg", brief: "Runs or wickets per innings" },
      { name: "Field Goal %", brief: "Goals / Attempts × 100" },
      { name: "Run Pace", brief: "Time / Distance" },
      { name: "Golf Handicap", brief: "Course/handicap index calc" },
    ],
  },
  {
    slug: "relationships-social",
    title: "Human Relationships & Social Life",
    description:
      "Event cost per person, gift budgets and work–life time ratios.",
    keywords: ["event budget", "gift budget", "work-life balance"],
    formulas: [
      { name: "Event Cost/Person", brief: "Total Cost / Guests" },
      { name: "Gift Budget", brief: "Budget % of income or event scale" },
      { name: "Time Allocation", brief: "Work–Family–Personal ratios" },
      { name: "Travel Split", brief: "Group cost sharing" },
    ],
  },
];
