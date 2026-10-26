"use client";

import { useQuery } from "@tanstack/react-query";
import { getSale } from "@/lib/api-client";

export function useSaleData() {
  return useQuery({
    queryKey: ["sale"],
    queryFn: getSale,
    staleTime: 30_000,
    retry: 1,
  });
}