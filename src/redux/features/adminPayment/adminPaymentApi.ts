import { baseApi } from "@/redux/hooks/baseApi";
import {
  PaymentStats,
  RevenueDataPoint,
  PaymentHistoryResponse,
  RevenueResponse,
  StatsResponse,
} from "@/redux/types/adminPayment";

export const adminPaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get payment statistics
    getPaymentStats: builder.query<PaymentStats, void>({
      query: () => "/admin/subscriptions/stats",
      transformResponse: (response: StatsResponse) => response.data,
      providesTags: ["PaymentStats"],
    }),

    // Get last 6 months revenue
    getLast6MonthsRevenue: builder.query<RevenueDataPoint[], void>({
      query: () => "/admin/subscriptions/revenue/last-6-months",
      transformResponse: (response: RevenueResponse) => response.data,
      providesTags: ["Revenue"],
    }),

    // Get last 7 days revenue
    getLast7DaysRevenue: builder.query<RevenueDataPoint[], void>({
      query: () => "/admin/subscriptions/revenue",
      transformResponse: (response: RevenueResponse) => response.data,
      providesTags: ["Revenue"],
    }),

    // Get payment history
    getPaymentHistory: builder.query<
      PaymentHistoryResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/admin/subscriptions/payment-history",
        params: { page, limit },
      }),
      providesTags: ["PaymentHistory"],
    }),
  }),
});

export const {
  useGetPaymentStatsQuery,
  useGetLast6MonthsRevenueQuery,
  useGetLast7DaysRevenueQuery,
  useGetPaymentHistoryQuery,
} = adminPaymentApi;
