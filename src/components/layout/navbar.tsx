
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Sale", href: "#sale" },
  { label: "Details", href: "#details" },
];

const menuOptions = {
  network: ["Ethereum", "Polygon", "Arbitrum"],
  account: ["Connect wallet (demo)", "Account details", "Help"],
};

function DropdownArrow({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-1 inline-block h-2 w-2 shrink-0 rotate-45 border-b-2 border-r-2 border-current transition-transform duration-200 ${
        open ? "translate-y-0.5 rotate-[225deg]" : "-translate-y-0.5"
      }`}
    />
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M13 5h6v6" />
      <path d="M19 5 10 14" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"network" | "account" | null>(null);
  const [network, setNetwork] = useState("Ethereum");
  const [accountAction, setAccountAction] = useState("Connect wallet (demo)");
  const [notice, setNotice] = useState("");
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function selectAccountAction(option: string) {
    setOpenMenu(null);
    setMobileOpen(false);

    if (option === "Help") {
      window.location.href =
        "mailto:support@example.com?subject=ZOTH%20Support";
      return;
    }

    setAccountAction(option);

    setNotice(
      option === "Connect wallet (demo)"
        ? "Demo mode: wallet connection is not implemented."
        : `${option} is a demonstration menu option.`,
    );
  }

  function toggleMenu(menu: "network" | "account") {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  function renderNetworkOptions() {
    return menuOptions.network.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => {
          setNetwork(option);
          setOpenMenu(null);
        }}
        className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-orange-950/60 hover:text-orange-400 ${
          network === option ? "text-orange-400" : "text-zinc-300"
        }`}
      >
        {network === option ? "✓ " : ""}
        {option}
      </button>
    ));
  }

  function renderAccountOptions() {
    return menuOptions.account.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => selectAccountAction(option)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-300 transition-colors hover:bg-orange-950/60 hover:text-orange-400"
      >
        {option === "Help" && <ExternalLinkIcon />}
        <span>{option}</span>
      </button>
    ));
  }

  return (
    <header
      ref={menuRef}
      className="relative z-30 border-b border-orange-950/80 bg-black"
    >
      {/* Top demo strip */}
      <div className="border-b border-orange-950/50 px-3 py-1 text-center text-[9px] text-zinc-500 sm:px-5">
        DEMO INTERFACE <span className="mx-2 text-orange-700">•</span>
        MOCK DATA ONLY
      </div>

      {/* Main navbar */}
      <nav className="relative mx-auto flex min-h-[56px] max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:min-h-[60px] sm:gap-3 sm:px-8 sm:py-3">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="shrink-0 text-lg font-bold tracking-[0.15em] sm:text-xl"
        >
          <span className="mr-1 text-orange-500">◉</span>
          ZOTH<span className="text-orange-600">.</span>
        </Link>

        {/* Center navigation: large screens */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center border border-orange-950 bg-[#100805] lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2.5 text-xs text-zinc-400 transition hover:text-orange-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop dropdown buttons */}
        <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
          <div className="relative">
            <button
              type="button"
              aria-expanded={openMenu === "network"}
              onClick={() => toggleMenu("network")}
              className="flex min-w-[120px] items-center justify-center gap-2 whitespace-nowrap border border-orange-900 px-3 py-2 text-sm text-white transition-colors hover:bg-orange-950/50"
            >
              {network}
              <DropdownArrow open={openMenu === "network"} />
            </button>

            {openMenu === "network" && (
              <div className="absolute right-0 top-full z-50 mt-2 w-44 border border-orange-900 bg-[#0a0604] p-1 shadow-xl">
                {renderNetworkOptions()}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-expanded={openMenu === "account"}
              onClick={() => toggleMenu("account")}
              className="flex min-w-[190px] items-center justify-center gap-2 whitespace-nowrap bg-orange-600 px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-orange-500"
            >
              {accountAction}
              <DropdownArrow open={openMenu === "account"} />
            </button>

            {openMenu === "account" && (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 border border-orange-900 bg-[#0a0604] p-1 shadow-xl">
                {renderAccountOptions()}
              </div>
            )}
          </div>
        </div>

        {/* Hamburger: mobile and tablet */}
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-orange-950 text-lg text-white lg:hidden"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen((value) => !value);
            setOpenMenu(null);
          }}
        >
          {mobileOpen ? "×" : "☰"}
        </button>
      </nav>

      {/* Demo notice */}
      {notice && (
        <div className="border-t border-orange-950 px-3 py-1.5 text-center text-[11px] leading-5 text-orange-300 sm:px-5 sm:py-2 sm:text-xs">
          {notice}
          <button
            type="button"
            className="ml-3 underline"
            onClick={() => setNotice("")}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Mobile and tablet navigation */}
      {mobileOpen && (
        <div className="border-t border-orange-950 bg-black px-4 py-3 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setMobileOpen(false);
                setOpenMenu(null);
              }}
              className="block border-b border-zinc-900 py-2.5 text-sm text-zinc-300 transition-colors hover:text-orange-400 last:border-0"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile network dropdown */}
          <div className="relative mt-3">
            <button
              type="button"
              aria-expanded={openMenu === "network"}
              onClick={() => toggleMenu("network")}
              className="flex w-full items-center justify-between border border-orange-900 px-4 py-3 text-sm text-white"
            >
              <span>{network}</span>
              <DropdownArrow open={openMenu === "network"} />
            </button>

            {openMenu === "network" && (
              <div className="border border-t-0 border-orange-900 bg-[#0a0604]">
                {renderNetworkOptions()}
              </div>
            )}
          </div>

          {/* Mobile account dropdown */}
          <div className="relative mt-2">
            <button
              type="button"
              aria-expanded={openMenu === "account"}
              onClick={() => toggleMenu("account")}
              className="flex w-full items-center justify-between gap-3 bg-orange-600 px-4 py-3 text-sm font-semibold text-black"
            >
              <span>{accountAction}</span>
              <DropdownArrow open={openMenu === "account"} />
            </button>

            {openMenu === "account" && (
              <div className="border border-orange-900 bg-[#0a0604]">
                {renderAccountOptions()}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
