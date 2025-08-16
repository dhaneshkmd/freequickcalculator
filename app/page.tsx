import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { calculators } from "../data/calculators";
import SearchGrid from "../components/SearchGrid";

// Load the Ad component only on the client (no SSR)
const AdUnit = dynamic(() => import("../components/ads/AdUnit"), { ssr: false });

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Browse 30+ finance, health, tax, utility and conversion calculators. Search and filter instantly."
};

export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Find the right calculator in seconds
        </h1>
        <p className="text-gray-600">
          Finance, Health, Utilities, Conversions, Tax, Dates &amp; Time and more.
        </p>
      </header>

      <SearchGrid calculators={calculators} />

      {/* AdSense: homepage display unit (reserve height to keep CLS = 0) */}
      <section aria-label="advertisement" className="mt-8">
        <AdUnit slot="YOUR_HOME_SLOT_ID" />
      </section>
    </div>
  );
}
