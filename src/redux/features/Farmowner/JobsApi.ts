/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/hooks/baseApi";
import { FarmOwnerStatsResponse, JobsResponse, CreateJobResponse, IntroductionOfferAvailabilityResponse } from "./Jobs.type";
export const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createJob: builder.mutation<CreateJobResponse, any>({
            query: (data) => ({
                url: "/jobs",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Job"],
        }),
        getAllFarmJobs: builder.query<JobsResponse, { page?: number; limit?: number; search?: string; status?: string }>({
            query: ({ page = 1, limit = 10, search = "", status }) => ({
                url: "/jobs/my-jobs",
                method: "GET",
                params: {
                    page,
                    limit,
                    search,
                    status,
                },
            }),
            providesTags: ["Job"],
        }),
        updateJobStatus: builder.mutation<any, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `jobs/manage-status/${id}`,
                method: "POST",
                params: {
                    status
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["Job"],
        }),
        postJobIdealCandidate: builder.mutation<any, { jobId: string; data: any }>({
            query: ({ jobId, data }) => ({
                url: `/jobs/${jobId}/ideal-candidate`,
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["Job"],
        }),
        getJobIdealCandidate: builder.query<any, string>({
            query: (jobId) => ({
                url: `/jobs/${jobId}/ideal-candidate`,
                method: "GET",
            }),
            providesTags: ["Job"],
        }),
        getFarmOwnerStats: builder.query<FarmOwnerStatsResponse, void>({
            query: () => ({
                url: "/jobs/stats/farm-owner",
                method: "GET",
            }),
            providesTags: ["Job"],
        }),
        updateJob: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `/jobs/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Job"],
        }),
        getIntroductionOfferAvailability: builder.query<IntroductionOfferAvailabilityResponse, void>({
            query: () => ({
                url: "/jobs/introduction-offer-availability",
                method: "GET",
            }),
        }),


    })
    ,
    overrideExisting: false

})

export const { useCreateJobMutation, useGetAllFarmJobsQuery, useUpdateJobStatusMutation, usePostJobIdealCandidateMutation, useGetJobIdealCandidateQuery, useGetFarmOwnerStatsQuery, useUpdateJobMutation, useGetIntroductionOfferAvailabilityQuery } = jobsApi