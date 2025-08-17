// app/calculator/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "../../../data/calculators";
import ComingSoon from "../../../components/ComingSoon";

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

// ✅ New Finance calculators
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

export default function CalculatorPage({ params }: Props) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) notFound();

  function render() {
    switch (calc!.componentId) {
      // Core
      case "BMI": return <BMI />;
      case "EMI": return <EMI />;
      case "SIP": return <SIP />;
      case "AGE": return <Age />;

      // Health
      case "BMR": return <BMR />;
      case "BODY_FAT": return <BodyFat />;
      case "DAILY_CALORIES": return <DailyCalories />;
      case "CALORIES_BURNED": return <CaloriesBurned />;
      case "DUE_DATE": return <DueDate />;

      // Finance
      case "BREAK_EVEN": return <BreakEven />;
      case "COMPOUND_INTEREST": return <CompoundInterest />;
      case "CURRENCY": return <CurrencyConverter />;
      case "FD": return <FD />;
      case "HOME_AFFORD": return <HomeAfford />;
      case "INFLATION_REAL": return <InflationReal />;
      case "LOAN_COMPARE": return <LoanCompare />;
      case "LOAN_ELIGIBILITY": return <LoanEligibility />;
      case "MORTGAGE": return <Mortgage />;
      case "ROI": return <ROI />;
      case "SAVINGS_GOAL": return <SavingsGoal />;
      case "SIMPLE_INTEREST": return <SimpleInterest />;

      // ✅ New Finance (this release)
      case "RETIREMENT": return <Retirement />;
      case "INVEST_VS_FD": return <InvestVsFD />;
      case "CC_PAYOFF": return <CreditCardPayoff />;

      // Tax / Pricing
      case "GST_VAT": return <GSTVat />;
      case "SALES_TAX": return <SalesTax />;
      case "DISCOUNT": return <Discount />;
      case "TAX_INDIA": return <TaxIndia />;
      case "TAX_BRACKET": return <TaxBracket />;

      // Utilities & Conversions
      case "PERCENTAGE": return <Percentage />;
      case "TIME_ZONE": return <TimeZone />;
      case "TIP": return <Tip />;
      case "UNIT_LENGTH": return <UnitLength />;
      case "UNIT_TEMP": return <UnitTemp />;
      case "UNIT_WEIGHT": return <UnitWeight />;

      // Dates & Time
      case "DATE_DIFF": return <DateDiff />;
      case "LEAP_YEAR": return <LeapYear />;

      default:
        return (
          <ComingSoon
            title={`${calc!.name} — Coming Soon`}
            description={calc!.description}
          />
        );
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{calc!.name}</h1>
        {calc?.formulaNote && (
          <p className="text-sm text-gray-500">Formula: {calc.formulaNote}</p>
        )}
      </header>
      {render()}
    </div>
  );
}
