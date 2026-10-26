
"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { SaleData } from "@/types/sale";

interface SalePanelProps {
  data: SaleData;
}

type PanelView =
  | "overview"
  | "options"
  | "tables"
  | "purchase"
  | "summary"
  | "stacked";

const views: { value: PanelView; label: string }[] = [
  { value: "overview", label: "Sale overview" },
  { value: "options", label: "Options and checklist" },
  { value: "tables", label: "Dual data tables" },
  { value: "purchase", label: "Transaction form" },
  { value: "summary", label: "Detailed summary" },
  { value: "stacked", label: "Stacked sale panels" },
];

const sampleRows = [
  ["Sale status", "Demo"],
  ["Target amount", "Configured target"],
  ["Funding progress", "Current progress"],
  ["Countdown", "Active timer"],
];

function PanelHeading({ children }: { children: string }) {
  return (
    <h2 className="border-b border-orange-950 px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-zinc-300">
      {children}
    </h2>
  );
}

function DataRows({ data }: { data: SaleData }) {
  const rows = [
    ["Sale status", data.status.toUpperCase()],
    ["Total raised", `${data.currency} ${data.raisedAmount.toLocaleString()}`],
    ["Target", `${data.currency} ${data.targetAmount.toLocaleString()}`],
    ["Data source", "Mock API"],
  ];

  return (
    <div>
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3 text-xs last:border-b-0"
        >
          <span className="text-zinc-400">{label}</span>
          <span className="text-right text-zinc-200">{value}</span>
        </div>
      ))}
    </div>
  );
}

function SampleTable({
  title,
  data,
}: {
  title: string;
  data: SaleData;
}) {
  const rows = [
    ["Status", data.status.toUpperCase()],
    ["Raised", data.raisedAmount.toLocaleString()],
    ["Target", data.targetAmount.toLocaleString()],
    ["Source", "Mock API"],
  ];

  return (
    <div className="min-w-0 border border-orange-950/80">
      <PanelHeading>{title}</PanelHeading>
      <div className="grid grid-cols-[1fr_auto]">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="contents"
          >
            <span className="border-b border-zinc-800 px-3 py-3 text-[10px] text-zinc-400">
              {label}
            </span>
            <span className="border-b border-zinc-800 px-3 py-3 text-right text-[10px] text-zinc-300">
              {value}
            </span>
          </div>
        ))}
      </div>
      <a
        href="#details"
        className="block bg-orange-600 px-3 py-3 text-center text-[10px] font-semibold text-black hover:bg-orange-500"
      >
        View details
      </a>
    </div>
  );
}

export function SalePanel({ data }: SalePanelProps) {
  const [view, setView] = useState<PanelView>("overview");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

  const progress =
    data.targetAmount > 0
      ? Math.min(100, (data.raisedAmount / data.targetAmount) * 100)
      : 0;

  function handlePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(amount);

    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      setMessage("Enter a valid positive amount.");
      setConfirmed(false);
      return;
    }

    setMessage(
      `Demo preview: ${value.toLocaleString()} ${currency}. No transaction was submitted.`,
    );
    setConfirmed(true);
  }

  return (
    <section id="sale" className="min-w-0 border border-orange-900/80 bg-[#080504]/95">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-950 px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
            Sale portal
          </p>
          <p className="mt-1 text-xs font-medium text-white">
            Interactive demo
          </p>
        </div>

        <span className="border border-orange-900 px-2 py-1 text-[9px] font-semibold text-orange-500">
          {data.status.toUpperCase()}
        </span>
      </div>

      <div className="border-b border-orange-950 p-3 sm:p-4">
        <label className="block text-[10px] text-zinc-500" htmlFor="panel-view">
          Preview a reference panel state
        </label>
       <div
  ref={dropdownRef}
  className="relative mt-2"
  onMouseEnter={() => setDropdownOpen(true)}
  onMouseLeave={() => setDropdownOpen(false)}
>
  <button
    type="button"
    aria-expanded={dropdownOpen}
    onClick={() => setDropdownOpen((open) => !open)}
    onKeyDown={(event) => {
      if (event.key === "Escape") setDropdownOpen(false);
    }}
    className="flex w-full items-center justify-between border border-orange-900 bg-black px-3 py-3 text-xs text-white hover:border-orange-500"
  >
    <span>{views.find((item) => item.value === view)?.label}</span>
    <span
      className={`mr-1 inline-block h-2 w-2 rotate-45 border-b-2 border-r-2 border-current transition-transform duration-200 ${
        dropdownOpen ? "rotate-[225deg]" : ""
      }`}
    />
  </button>

  {dropdownOpen && (
    <div className="absolute left-0 right-0 top-full z-20 border border-orange-900 bg-[#0a0604]">
      {views.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => {
            setView(item.value);
            setMessage("");
            setConfirmed(false);
            setDropdownOpen(false);
          }}
          className={`block w-full px-3 py-3 text-left text-xs transition-colors hover:bg-orange-950/60 hover:text-orange-400 ${
            view === item.value
              ? "bg-orange-950/40 text-orange-400"
              : "text-zinc-300"
          }`}
        >
          {view === item.value ? "✓ " : ""}
          {item.label}
        </button>
      ))}
    </div>
  )}
</div>
      </div>

      {view === "overview" && (
        <div>
          <PanelHeading>Sale overview</PanelHeading>

          <div className="p-4 sm:p-5">
            <p className="text-xs text-zinc-400">Total amount raised</p>
            <p className="mt-2 break-words text-2xl font-semibold sm:text-3xl">
              {data.currency} {data.raisedAmount.toLocaleString()}
            </p>

            <div className="mt-6 flex justify-between gap-3 text-xs">
              <span className="text-zinc-400">Funding progress</span>
              <span className="text-orange-500">{progress.toFixed(1)}%</span>
            </div>

            <div
              className="mt-2 h-1.5 bg-zinc-800"
              role="progressbar"
              aria-label="Funding progress"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-orange-600"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex justify-between gap-3 text-xs">
              <span className="text-zinc-500">Target</span>
              <span>
                {data.currency} {data.targetAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="border-t border-orange-950">
            <DataRows data={data} />
          </div>
        </div>
      )}

      {view === "options" && (
        <div>
          <PanelHeading>Choose demo options</PanelHeading>
          <div className="space-y-4 p-4 sm:p-5">
            {["Review sale information", "Show funding details", "Confirm demo selection"].map(
              (option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-start gap-3 text-xs text-zinc-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={(event) => {
                      setSelectedOptions((current) =>
                        event.target.checked
                          ? [...current, option]
                          : current.filter((item) => item !== option),
                      );
                    }}
                    className="mt-0.5 accent-orange-600"
                  />
                  {option}
                </label>
              ),
            )}

            <button
              type="button"
              onClick={() =>
                setMessage(
                  `${selectedOptions.length} demo option(s) selected.`,
                )
              }
              className="w-full bg-orange-600 px-4 py-3 text-xs font-semibold text-black hover:bg-orange-500"
            >
              Apply options
            </button>

            {message && (
              <p role="status" className="text-xs text-orange-300">
                {message}
              </p>
            )}
          </div>
        </div>
      )}

      {view === "tables" && (
        <div className="grid gap-3 p-3 sm:grid-cols-2">
          <SampleTable title="Sale data" data={data} />
          <SampleTable title="Funding data" data={data} />
        </div>
      )}

      {view === "purchase" && (
        <div>
          <PanelHeading>Transaction form · Demo only</PanelHeading>

          <form onSubmit={handlePreview} className="space-y-4 p-4 sm:p-5">
            <label className="block">
              <span className="mb-2 block text-[10px] text-zinc-400">
                Enter amount
              </span>
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setMessage("");
                  setConfirmed(false);
                }}
                placeholder="0.00"
                className="w-full border border-orange-950 bg-black px-3 py-3 text-sm outline-none focus:border-orange-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] text-zinc-400">
                Currency
              </span>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className="w-full border border-orange-950 bg-black px-3 py-3 text-xs outline-none focus:border-orange-500"
              >
                <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
              </select>
            </label>

            <div className="flex items-center justify-between border-y border-zinc-800 py-3 text-xs">
              <span className="text-zinc-500">Sale status</span>
              <span className="text-orange-500">{data.status}</span>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 px-4 py-3 text-xs font-semibold text-black hover:bg-orange-500"
            >
              Preview transaction
            </button>

            <button
              type="button"
              onClick={() => {
                setAmount("");
                setCurrency("USDT");
                setMessage("");
                setConfirmed(false);
              }}
              className="w-full border border-orange-900 px-4 py-3 text-xs text-white hover:bg-orange-950/50"
            >
              Reset form
            </button>

            {message && (
              <p
                role="status"
                className={`border p-3 text-xs leading-5 ${
                  confirmed
                    ? "border-orange-900 text-orange-300"
                    : "border-red-900 text-red-300"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      )}

      {view === "summary" && (
        <div>
          <PanelHeading>Sale summary</PanelHeading>
          <DataRows data={data} />
          <div className="border-t border-orange-950 p-4">
            <p className="text-xs leading-6 text-zinc-400">
              The values above are loaded from the local mock API.
              This summary does not represent a verified live token sale.
            </p>
            <a
              href="#details"
              className="mt-4 block border border-orange-900 px-4 py-3 text-center text-xs text-white hover:bg-orange-950/50"
            >
              More details
            </a>
          </div>
        </div>
      )}

      {view === "stacked" && (
        <div className="space-y-3 p-3 sm:p-4">
          <div className="border border-orange-950">
            <PanelHeading>Panel one · Overview</PanelHeading>
            <DataRows data={data} />
          </div>

          <div className="border border-orange-950">
            <PanelHeading>Panel two · Progress</PanelHeading>
            <div className="p-4">
              <div className="flex justify-between gap-3 text-xs">
                <span className="text-zinc-400">Funding progress</span>
                <span className="text-orange-500">
                  {progress.toFixed(1)}%
                </span>
              </div>
              <div className="mt-3 h-2 bg-zinc-800">
                <div
                  className="h-full bg-orange-600"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <a
                href="#details"
                className="mt-4 block bg-orange-600 px-4 py-3 text-center text-xs font-semibold text-black hover:bg-orange-500"
              >
                View details
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-orange-950 px-4 py-3">
        <p className="text-[10px] leading-5 text-zinc-600">
          Demonstration interface. No wallet connection, funds transfer,
          or purchase transaction is performed.
        </p>
      </div>
    </section>
  );
}