// app/calculator/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "../../../data/calculators";
import ComingSoon from "../../../components/ComingSoon";
import type { ComponentType } from "react";

// Existing calculators
import BMI from "../../../components/calculators/BMI";
import EMI from "../../../components/calculators/EMI";
import SIP from "../../../components/calculators/SIP";
import Age from "../../../components/calculators/Age";

// Previously added calculators
import BMR from "../../../components/calculators/BMR";
import BodyFat from "../../../components/calculators/BodyFat";
import BreakEven from "../../../components/calculators/BreakEven";
import CompoundInterest from "../../../components/calculators/CompoundInterest";
import CurrencyConverter from "../../../components/calculators/CurrencyConverter";
import DailyCalories from "../../../components/calculators/DailyCalories";
import CaloriesBurned from "../../../components/calculators/CaloriesBurned";
import DateDiff from "../../../components/calculators/DateDiff";

// Newer batch
import Discount from "../../../components/calculators/Discount";
import FD from "../../../components/calculators/FD";
import GSTVat from "../../../components/calculators/GSTVat";
import HomeAfford from "../../../components/calculators/HomeAfford";
import TaxIndia from "../../../components/calculators/TaxIndia";
import InflationReal from "../../../components/calculators/InflationReal";
import LeapYear from "../../../components/calculators/LeapYear";
import LoanCompare from "../../../components/calculators/LoanCompare";
import LoanEligibility from "../../../components/calculators/LoanEligibility";

// Latest additions
import Mortgage from "../../../components/calculators/Mortgage";
import Percentage from "../../../components/calculators/Percentage";
import DueDate from "../../../components/calculators/DueDate";
import RD from "../../../components/calculators/RD";
import ROI from "../../../components/calculators/ROI";
import SalesTax from "../../../components/calculators/SalesTax";
import SavingsGoal from "../../../components/calculators/SavingsGoal";
import SimpleInterest from "../../../components/calculators/SimpleInterest";
import TimeZone from "../../../components/calculators/TimeZone";
import Tip from "../../../components/calculators/Tip";
import UnitLength from "../../../components/calculators/UnitLength";
import UnitTemp from "../../../components/calculators/UnitTemp";
import UnitWeight from "../../../components/calculators/UnitWeight";

// ✅ New Finance calculators (this release)
import Retirement from "../../../components/calculators/RetirementCalculator";
import InvestVsFD from "../../../components/calculators/InvestVsFD";
import CreditCardPayoff from "../../../components/calculators/CreditCardPayoff";
import TaxBracket from "../../../components/calculators/TaxBracket";

type Props = { params: { slug: string } };

// Only pre-render "ready" calculators
export function generateStaticParams() {
  return calculators
    .filter((c) => c.status === "ready")
    .map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return { title: "Calculator", description: "Calculator not found." };

  return {
    title: calc.name,
    description: calc.description,
    keywords: calc.keywords,
  };
}

// Map every ComponentId → component (keeps TS safe and avoids a giant switch)
const componentMap: Record<
  Exclude<import("../../../data/calculators").ComponentId, null>,
  ComponentType<any>
> = {
  // Core
  BMI,
  EMI,
  SIP,
  AGE: Age,

  // Health
  BMR,
  BODY_FAT: BodyFat,
  DAILY_CALORIES: DailyCalories,
  CALORIES_BURNED: CaloriesBurned,
  DUE_DATE: DueDate,

  // Finance
  BREAK_EVEN: BreakEven,
  COMPOUND_INTEREST: CompoundInterest,
  CURRENCY: CurrencyConverter,
  FD,
  RD, // ← added
  HOME_AFFORD: HomeAfford,
  INFLATION_REAL: InflationReal,
  LOAN_COMPARE: LoanCompare,
  LOAN_ELIGIBILITY: LoanEligibility,
  MORTGAGE: Mortgage,
  ROI,
  SAVINGS_GOAL: SavingsGoal,
  SIMPLE_INTEREST: SimpleInterest,

  // ✅ New Finance (this release)
  RETIREMENT: Retirement,
  INVEST_VS_FD: InvestVsFD,
  CC_PAYOFF: CreditCardPayoff,

  // Tax / Pricing
  GST_VAT: GSTVat,
  SALES_TAX: SalesTax,
  DISCOUNT: Discount,
  TAX_INDIA: TaxIndia,
  TAX_BRACKET: TaxBracket,

  // Utilities & Conversions
  PERCENTAGE: Percentage,
  TIME_ZONE: TimeZone,
  TIP: Tip,
  UNIT_LENGTH: UnitLength,
  UNIT_TEMP: UnitTemp,
  UNIT_WEIGHT: UnitWeight,

  // Dates & Time
  DATE_DIFF: DateDiff,
  LEAP_YEAR: LeapYear,
};

export default function CalculatorPage({ params }: Props) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) notFound();

  const Component = calc.componentId ? componentMap[calc.componentId] : undefined;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{calc.name}</h1>
        {calc.formulaNote && (
          <p className="text-sm text-gray-500">Formula: {calc.formulaNote}</p>
        )}
      </header>

      {Component ? (
        <Component />
      ) : (
        <ComingSoon
          title={`${calc.name} — Coming Soon`}
          description={calc.description}
        />
      )}
    </div>
  );
}
