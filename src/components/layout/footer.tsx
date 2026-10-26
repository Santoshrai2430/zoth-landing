
"use client";

import { useState } from "react";
import Link from "next/link";

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <footer className="border-t border-orange-950/70 bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 md:grid-cols-[1fr_0.5fr_0.5fr]">
        <div>
          <Link
            href="/"
            className="text-xl font-bold tracking-[0.18em]"
          >
            ZOTH<span className="text-orange-600">.</span>
          </Link>

          <p className="mt-4 max-w-sm text-xs leading-5 text-zinc-500">
            Demonstration landing page with mock sale data and an
            interactive countdown.
          </p>

          <div className="mt-5 flex gap-4 text-xs text-zinc-500">
            <a href="#about" aria-label="About" className="hover:text-orange-400">X</a>
            <a href="#sale" aria-label="Sale" className="hover:text-orange-400">S</a>
            <a href="#details" aria-label="Details" className="hover:text-orange-400">D</a>
          </div>

          <form
            className="mt-6 flex max-w-sm border border-orange-950"
            onSubmit={(event) => {
              event.preventDefault();

              setMessage(
                email.includes("@")
                  ? "Demo only: no email has been submitted."
                  : "Please enter a valid email address.",
              );
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              placeholder="Your email address"
              aria-label="Your email address"
              className="min-w-0 flex-1 bg-[#0b0705] px-3 py-3 text-xs outline-none placeholder:text-zinc-700"
              required
            />

            <button
              type="submit"
              className="bg-orange-600 px-4 text-[10px] font-semibold text-black hover:bg-orange-500"
            >
              DEMO
            </button>
          </form>

          {message && (
            <p role="status" className="mt-2 text-[10px] text-orange-300">
              {message}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white">Explore</h3>
          <div className="mt-5 space-y-3 text-xs text-zinc-500">
            <a href="#about" className="block hover:text-orange-400">Overview</a>
            <a href="#sale" className="block hover:text-orange-400">Sale dashboard</a>
            <a href="#details" className="block hover:text-orange-400">Details</a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white">Information</h3>
          <div className="mt-5 space-y-3 text-xs text-zinc-500">
            <a href="#details" className="block hover:text-orange-400">Platform overview</a>
            <a href="#sale" className="block hover:text-orange-400">Mock sale data</a>
            <a href="#about" className="block hover:text-orange-400">Back to top ↑</a>
          </div>
        </div>
      </div>

      {/* Large DEMO wordmark */}
      <div className="overflow-hidden border-t border-orange-950/40 px-3 pt-4">
        <p className="select-none whitespace-nowrap text-center font-sans text-[20vw] font-black leading-[0.8] tracking-[-0.065em] sm:text-[19vw]">
          <span className="text-[#FF4D0A]">D</span>
          <span className="text-[#190600]">EMO</span>
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-5 text-[10px] text-zinc-600 sm:flex-row sm:px-8">
        <span>Demo interface · Mock data only</span>
        <span>© 2026 ZOTH · Demonstration project</span>
      </div>
    </footer>
  );
}
