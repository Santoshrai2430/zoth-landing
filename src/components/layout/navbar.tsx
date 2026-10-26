
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
    setAccountAction(option);
    setOpenMenu(null);

    setNotice(
      option === "Connect wallet (demo)"
        ? "Demo mode: wallet connection is not implemented."
        : `${option} is a demonstration menu option.`,
    );
  }

  return (
    <header
      ref={menuRef}
      className="relative z-30 border-b border-orange-950/80 bg-black"
    >
      <div className="border-b border-orange-950/50 px-5 py-1.5 text-center text-[9px] text-zinc-500">
        DEMO INTERFACE <span className="mx-2 text-orange-700">•</span>
        MOCK DATA ONLY
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="shrink-0 text-xl font-bold tracking-[0.15em]"
        >
          <span className="mr-1 text-orange-500">◉</span>
          ZOTH<span className="text-orange-600">.</span>
        </Link>

        <div className="hidden items-center border border-orange-950 bg-[#100805] md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-[11px] text-zinc-400 transition hover:text-orange-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="relative">
            <button
              type="button"
              aria-expanded={openMenu === "network"}
              onClick={() =>
                setOpenMenu(openMenu === "network" ? null : "network")
              }
              className="border border-orange-900 px-3 py-2.5 text-[10px] text-white hover:bg-orange-950/50"
            >
              {network}⌄
            </button>

            {openMenu === "network" && (
              <div className="absolute right-0 top-full mt-2 w-44 border border-orange-900 bg-[#0a0604] p-1 shadow-xl">
                {menuOptions.network.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setNetwork(option);
                      setOpenMenu(null);
                    }}
                    className="block w-full px-3 py-3 text-left text-xs text-zinc-300 hover:bg-orange-950/60 hover:text-orange-400"
                  >
                    {network === option ? "✓ " : ""}
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-expanded={openMenu === "account"}
              onClick={() =>
                setOpenMenu(openMenu === "account" ? null : "account")
              }
              className="bg-orange-600 px-3 py-2.5 text-[10px] font-semibold text-black hover:bg-orange-500"
            >
              {accountAction}⌄
            </button>

            {openMenu === "account" && (
              <div className="absolute right-0 top-full mt-2 w-52 border border-orange-900 bg-[#0a0604] p-1 shadow-xl">
                {menuOptions.account.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAccountAction(option)}
                    className="block w-full px-3 py-3 text-left text-xs text-zinc-300 hover:bg-orange-950/60 hover:text-orange-400"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center border border-orange-950 text-white sm:hidden"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? "×" : "☰"}
        </button>
      </nav>

      {notice && (
        <div className="border-t border-orange-950 px-5 py-2 text-center text-[10px] text-orange-300">
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

      {mobileOpen && (
        <div className="border-t border-orange-950 bg-black px-5 py-3 sm:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-zinc-900 py-3 text-sm text-zinc-300 last:border-0"
            >
              {link.label}
            </a>
          ))}

          <p className="py-3 text-xs text-zinc-500">
            Network: {network}
          </p>

          <button
            type="button"
            onClick={() => selectAccountAction("Connect wallet (demo)")}
            className="w-full bg-orange-600 px-4 py-3 text-xs font-semibold text-black"
          >
            Connect wallet (demo)
          </button>
        </div>
      )}
    </header>
  );
}
