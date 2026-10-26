
"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero/hero-section";
import { SalePanel } from "@/components/sale/sale-panel";
import { DetailsSection } from "@/components/sections/details-section";
import { useSaleData } from "@/hooks/use-sale-data";

const partners = [
  "Borderless",
  "TAISU",
  "BLOCKCHAIN",
  "Chainlink",
  "coinbase",
  "MINDFULNESS",
];

export default function Home() {
  const { data, isLoading, isError } = useSaleData();

  if (isLoading || isError || !data) {
    return (
      <main className="site-grid min-h-screen bg-black text-white">
        <Navbar />
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="text-sm text-zinc-400">
            {isLoading
              ? "Loading demo sale data..."
              : "Unable to load sale data. Please refresh."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="site-grid min-h-screen overflow-hidden bg-black text-white">
      <Navbar />

      <section
        id="about"
        className="relative mx-auto grid max-w-7xl items-start gap-8 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:py-14"
      >
        <HeroSection data={data} />
        <SalePanel data={data} />
      </section>

      <div className="border-y border-orange-950/80 bg-black/90">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:grid-cols-3 sm:px-8 md:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex min-h-14 items-center justify-center border-r border-orange-950/60 px-2 text-center text-[10px] font-semibold tracking-wide text-zinc-500 last:border-r-0"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>

      <DetailsSection />

      <Footer />
    </main>
  );
}
