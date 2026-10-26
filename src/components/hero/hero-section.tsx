
"use client";

import type { SaleData } from "@/types/sale";
import { useCountdown } from "@/hooks/use-countdown";

interface HeroSectionProps {
  data: SaleData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const countdown = useCountdown(data.endsAt);

  const progress =
    data.targetAmount > 0
      ? Math.min(100, (data.raisedAmount / data.targetAmount) * 100)
      : 0;

  const stats = [
    {
      label: "Total raised",
      value: `${data.currency} ${data.raisedAmount.toLocaleString()}`,
    },
    {
      label: "Target amount",
      value: `${data.currency} ${data.targetAmount.toLocaleString()}`,
    },
    { label: "Sale status", value: data.status.toUpperCase() },
    { label: "Progress", value: `${progress.toFixed(1)}%` },
  ];

  const timer = [
    { label: "DAYS", value: countdown.days },
    { label: "HRS", value: countdown.hours },
    { label: "MIN", value: countdown.minutes },
    { label: "SEC", value: countdown.seconds },
  ];

  return (
    <section className="min-w-0">
      <p className="mb-5 inline-flex border border-orange-900 px-5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-orange-500">
        Token sale overview
      </p>

      <h1 className="max-w-xl text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-[52px]">
        {data.title}
      </h1>

      <p className="mt-4 max-w-lg text-xs leading-6 text-zinc-400 sm:text-sm">
        Explore the sale details, review funding progress, and follow
        the information displayed in this demo interface.
      </p>

      <div className="mt-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-zinc-500">Funding progress</p>
          <p className="mt-1 text-2xl font-medium tabular-nums">
            {progress.toFixed(1)}%
          </p>
        </div>
        <p className="text-right text-[10px] text-zinc-500">
          Raised so far
          <span className="mt-1 block text-sm text-orange-500">
            {data.currency} {data.raisedAmount.toLocaleString()}
          </span>
        </p>
      </div>

      <div className="mt-3 h-1.5 bg-zinc-900">
        <div
          className="h-full bg-orange-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-orange-950/80 bg-black/70 p-3 sm:p-4"
          >
            <p className="text-[10px] text-zinc-500">{stat.label}</p>
            <p className="mt-2 break-words text-sm font-medium sm:text-base">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 border border-orange-950/80 bg-black/80 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs">Sale countdown</p>
            <p className="mt-1 text-[10px] text-zinc-500">
              Time remaining in this demo
            </p>
          </div>

          <div className="flex gap-1.5">
            {timer.map((item) => (
              <div
                key={item.label}
                className="min-w-10 border border-orange-950 px-1.5 py-2 text-center sm:min-w-12"
              >
                <p className="text-sm font-semibold tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[8px] text-zinc-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
