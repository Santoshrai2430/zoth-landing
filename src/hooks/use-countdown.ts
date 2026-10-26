
"use client";

import { useEffect, useState } from "react";

export function useCountdown(endDate: string) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const endTime = endDate ? new Date(endDate).getTime() : Number.NaN;

  const remaining =
    now === null || !Number.isFinite(endTime)
      ? 0
      : Math.max(0, endTime - now);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return { days, hours, minutes, seconds };
}
