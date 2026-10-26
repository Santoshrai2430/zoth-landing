export interface SaleData {
  id: string;
  title: string;
  status: "upcoming" | "live" | "ended";
  currency: string;
  targetAmount: number;
  raisedAmount: number;
  endsAt: string;
}