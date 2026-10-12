import { baseApi } from "@/redux/hooks/baseApi";
import { Job, Metadata } from "@/redux/types/getAllJobsType";

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        toggleSavedJob: builder.mutation<{ success: boolean; message: string }, string>({
            query: (jobId) => ({
                url: `/user-jobs/toggle-saved/${jobId}`,
                method: "PATCH",
            }),
        }),
        getSavedJobs: builder.query<{ success: boolean; message: string, data: Job[], metadata: Metadata }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `/user-jobs/saved-jobs?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),
        updateFarmOwnerNotifications: builder.mutation<
            { success: boolean; message: string },
            {
                emailNotifications?: boolean;
                weeklyDigest?: boolean;
                newApplicantAlert?: boolean;
                updatesAndTips?: boolean;
            }>({
                query: (settings) => ({
                    url: "/auth/notifications/farm-owner",
                    method: "PATCH",
                    body: settings,
                }),
            }),
        getAllNotifications: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/auth/notifications`,
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["Notifications"],
        }),
        markAllNotificationsRead: builder.mutation<
            { success: boolean; message: string },
            void
        >({
            query: () => ({
                url: "/auth/notifications/read-all",
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications"],
        }),

        markNotificationRead: builder.mutation<
            { success: boolean; message: string },
            string
        >({
            query: (id) => ({
                url: `/auth/notifications/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications"],
        }),
        getUnreadNotificationCount: builder.query<{ success: boolean; data: { count: number } }, void>({
            query: () => ({
                url: "/auth/notifications/unread-count",
                method: "GET",
            }),
            providesTags: ["Notifications"],
        }),

    }),
});

export const { useToggleSavedJobMutation, useGetSavedJobsQuery, useUpdateFarmOwnerNotificationsMutation, useGetAllNotificationsQuery
    , useMarkAllNotificationsReadMutation, useMarkNotificationReadMutation,
    useGetUnreadNotificationCountQuery
} = notificationApi;
