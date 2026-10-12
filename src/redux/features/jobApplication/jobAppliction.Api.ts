import { baseApi } from "@/redux/hooks/baseApi";
import { AppliedJobsResponse } from "@/redux/types/getAllJobsType";
// import { ApplicationDetailsResponse } from "./JobAppliction.Type";

// Types for New CV Application
export interface CoreInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    jobTitle: string;
    jobType: string;
    availability?: string;
    hasDrivingLicense?: boolean;
    eligibleToWorkInNZ?: boolean;
    workPermitType?: string;
}

export interface Experience {
    jobTitle: string;
    jobType: string;
    company: string;
    summary: string;
    startDate: string;
    endDate?: string;
    isOngoing: boolean;
}

export interface Education {
    degree: string;
    institution: string;
    startDate: string;
    endDate?: string;
    isOngoing: boolean;
}

export interface NewCVApplicationData {
    fileId?: string;
    coverLetterFileId?: string;
    coreInfo: CoreInfo;
    experiences: Experience[];
    educations: Education[];
}

interface GetApplicationsParams {
    page?: number;
    limit?: number;
    search?: string;
    sortOption?: string;
    status?: string;
    jobId?: string;
}

export const jobApplication = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        applyWithSavedCV: builder.mutation<{ success: boolean; message: string }, string>({
            query: (jobId) => ({
                url: `/job-applications/apply-saved/${jobId}`,
                method: "POST",
            }),
            invalidatesTags: ["Application"],
        }),
        applyWithNewCV: builder.mutation<{ success: boolean; message: string }, { jobId: string; data: NewCVApplicationData }>({
            query: ({ jobId, data }) => ({
                url: `/job-applications/apply-new/${jobId}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Application"],
        }),
        getUserAppliedJobs: builder.query<AppliedJobsResponse, { page?: number; limit?: number; search?: string; sortOption?: string; }>({
            query: ({ page, limit, search, sortOption }) => ({
                url: `/job-applications/applied-jobs?page=${page}&limit=${limit}&search=${encodeURIComponent(search!)}&sortOption=${sortOption}`,
                method: "GET",
            }),
            providesTags: ["Application"],
        }),
        getAllApplicationsForFarm: builder.query({
            query: (params: GetApplicationsParams = {}) => {
                const queryParams: Record<string, any> = {};

                if (params.page !== undefined) queryParams.page = params.page;
                if (params.limit !== undefined) queryParams.limit = params.limit;
                if (params.search) queryParams.search = params.search;
                if (params.sortOption) queryParams.sortOption = params.sortOption;
                if (params.status) queryParams.status = params.status;
                if (params.jobId) queryParams.jobId = params.jobId;

                return {
                    url: `/job-applications/farm-owner/`,
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: ["Application"],
        }),
        getApplicationById: builder.query<any, string>({
            query: (id: string) => ({
                url: `/job-applications/farm-owner/${id}`,
                method: "GET",
            }),
            providesTags: ["Application"],
        }),
        UpdateApplicationStatus: builder.mutation<{ success: boolean; message: string }, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/job-applications/farm-owner/${id}/status`,
                method: "PATCH",
                params: {
                    status
                },

            }),
            invalidatesTags: ["Application"],
        }),
        toggleShortlist: builder.mutation<{ success: boolean; message: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/job-applications/farm-owner/${id}/toggle-shortlist`,
                method: "POST",
            }),
            invalidatesTags: ["Application"],
        }),
        toggleReject: builder.mutation<{ success: boolean; message: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/job-applications/farm-owner/${id}/toggle-reject`,
                method: "POST",
            }),
            invalidatesTags: ["Application"],
        }),

    }),
});

export const { useApplyWithSavedCVMutation, useGetUserAppliedJobsQuery, useGetAllApplicationsForFarmQuery, useGetApplicationByIdQuery, useUpdateApplicationStatusMutation, useToggleShortlistMutation, useToggleRejectMutation, useApplyWithNewCVMutation } = jobApplication;
