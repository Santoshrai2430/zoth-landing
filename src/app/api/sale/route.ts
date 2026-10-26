import { NextResponse } from "next/server";
import { mockSale } from "@/data/mock-sale";

export async function GET() {
  return NextResponse.json(mockSale);
}