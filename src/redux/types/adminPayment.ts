export interface PaymentStats {
  totalRevenue: number;
  weeklyRevenue: number;
  totalTransactions: number;
  runningSubscriptions: number;
}

export interface RevenueDataPoint {
  label: string;
  value: number;
  date?: string;
  month?: string;
}

export interface PaymentHistoryItem {
  id: string;
  user: {
    name: string;
    email: string;
  };
  subscription: {
    plan: {
      title: string;
    };
  };
  amount: number;
  currency: string;
  status: "PAID" | "PENDING" | "FAILED" | string;
  issuedAt: string;
  paidAt: string | null;
}

export interface PaymentHistoryResponse {
  success: boolean;
  message: string;
  data: PaymentHistoryItem[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface RevenueResponse {
  success: boolean;
  message: string;
  data: RevenueDataPoint[];
}

export interface StatsResponse {
  success: boolean;
  message: string;
  data: PaymentStats;
}
