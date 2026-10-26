import type { SaleData } from "@/types/sale";

export async function getSale(): Promise<SaleData> {
  const response = await fetch("/api/sale");

  if (!response.ok) {
    throw new Error("Failed to fetch sale data");
  }

  return response.json() as Promise<SaleData>;
}