import { baseApi } from "@/redux/hooks/baseApi";
import {
  AdminStatistics,
  UserAnalyticsData,
  NotificationsResponse,
  ApiResponse,
  GetJobSeekersResponse,
  GetFarmsResponse,
  GetJobSeekerDetailsResponse,
} from "@/redux/types/adminDashboard";

export const adminDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get admin statistics
    getAdminStats: builder.query<ApiResponse<AdminStatistics>, void>({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
      providesTags: ["AdminStats"],
    }),

    // Get user analytics data
    getUserAnalytics: builder.query<ApiResponse<UserAnalyticsData[]>, void>({
      query: () => ({
        url: "/admin/analytics/users",
        method: "GET",
      }),
      providesTags: ["UserAnalytics"],
    }),

    // Get notifications
    getNotifications: builder.query<ApiResponse<NotificationsResponse>, void>({
      query: () => ({
        url: "/auth/notifications",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    // Mark notification as read
    markNotificationAsRead: builder.mutation<
      ApiResponse<void>,
      { notificationId: string }
    >({
      query: ({ notificationId }) => ({
        url: `/auth/notifications/${notificationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    // Mark all notifications as read
    markAllNotificationsAsRead: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/auth/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    getJobSeekers: builder.query<GetJobSeekersResponse, { page?: number; limit: number; search?: string }>({
      query: ({ page = 1, limit = 10, search = '' }) => ({
        url: '/admin/job-seekers',
        params: { page, limit, search },
      }),
    }),
    getAllFarms: builder.query<
      GetFarmsResponse,
      { page?: number; limit?: number; search?: string; status?: string }
    >({
      query: ({ page = 1, limit = 10, search = '', status = '' }) => ({
        url: '/admin/farms',
        params: { page, limit, search, status },
      }),
    }),
    getFarmById: builder.query<any, string>({
      query: (farmId) => `/admin/farms/${farmId}`,
    }),
    getJobSeekerById: builder.query<GetJobSeekerDetailsResponse, string>({
      query: (userId) => `/admin/job-seekers/${userId}`,
      providesTags: ["JobSeekerDetails"],
    }),
    toggleJobSeekerStatus: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (userId) => ({
        url: `/admin/job-seekers/${userId}/status`,
        method: "POST",
      }),
      invalidatesTags: ["JobSeekers", "JobSeekerDetails"],
    }),
    getAllJobsForAdmin: builder.query<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
      }
    >({
      query: ({ page = 1, limit = 10, status, search }) => ({
        url: "/admin/jobs",
        params: {
          page,
          limit,
          status,
          search,
        },
      }),
      providesTags: ["Jobs"],
    }),
    toggleJobStatus: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (jobId) => ({
        url: `/admin/jobs/${jobId}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Jobs", "JobDetails"],
    }),

  }),

});

export const {
  useGetAdminStatsQuery,
  useGetUserAnalyticsQuery,
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useGetJobSeekersQuery,
  useGetAllFarmsQuery,
  useGetFarmByIdQuery,
  useGetJobSeekerByIdQuery,
  useGetAllJobsForAdminQuery,
  useToggleJobSeekerStatusMutation,
  useToggleJobStatusMutation
} = adminDashboardApi;
