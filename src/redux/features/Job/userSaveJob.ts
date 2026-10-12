import { baseApi } from "@/redux/hooks/baseApi";
import { Job, Metadata } from "@/redux/types/getAllJobsType";

export const jobApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        toggleSavedJob: builder.mutation<{ success: boolean; message: string }, string>({
            query: (jobId) => ({
                url: `/user-jobs/toggle-saved/${jobId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["SavedJobs"],
        }),
        getSavedJobs: builder.query<{ success: boolean; message: string, data: Job[], metadata: Metadata }, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: `/user-jobs/saved-jobs?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["SavedJobs"],
        }),

    }),
});

export const { useToggleSavedJobMutation, useGetSavedJobsQuery } = jobApi;
