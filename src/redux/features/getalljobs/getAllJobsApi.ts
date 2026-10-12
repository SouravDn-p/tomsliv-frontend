import { baseApi } from "@/redux/hooks/baseApi";
import { JobLocationsWithCountsResponse, JobRolesWithCountsResponse, JobsResponse, JobTypesWithCountsResponse, RemunerationBucketsResponse } from "@/redux/types/getAllJobsType";


interface GetJobsParams {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sortOption?: string;
    filters?: {
        jobTypes: string[];
        roles: string[];
        locations: string[];
        remunerationRange?: string[];
    };
}


export const getAllJobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobs: builder.query<JobsResponse, GetJobsParams>({
            query: ({ page = 1, limit = 10, status, sortOption, filters, search }) => {
                const searchParams = new URLSearchParams();

                // Basic params
                searchParams.append("page", page.toString());
                searchParams.append("limit", limit.toString());

                if (status) searchParams.append("status", status);
                if (sortOption) searchParams.append("sortOption", sortOption);
                if (search) searchParams.append("search", search);

                // Filters 
                if (filters) {
                    filters.jobTypes.forEach((jt) =>
                        searchParams.append("jobTypes", jt)
                    );

                    filters.roles.forEach((role) =>
                        searchParams.append("roles", role)
                    );

                    filters.locations.forEach((loc) =>
                        searchParams.append("locations", loc)
                    );

                    filters.remunerationRange?.forEach((rangeStr) => {
                        const [min, max] = rangeStr.split("-").map(Number);

                        searchParams.append(
                            "remunerationRange",
                            JSON.stringify({ min, max })
                        );
                    });
                }

                return {
                    url: `/jobs-stats/all-jobs?${searchParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["Jobs"],
        }),


        getJobTypeWithCounts: builder.query<JobTypesWithCountsResponse, void>({
            query: () => ({
                url: "/jobs-stats/job-types-with-counts",
                method: "GET",
            }),
            providesTags: ["Jobs"],
        }),
        getRemunerationBuckets: builder.query<RemunerationBucketsResponse, void>({
            query: () => ({
                url: "/jobs-stats/remuneration-buckets",
                method: "GET",
            }),
            providesTags: ["Jobs"],
        }), getJobRolesWithCounts: builder.query<JobRolesWithCountsResponse, { page?: number, limit?: number }>({
            query: ({ page = 1, limit = 10 }) => ({
                url: "/jobs-stats/job-roles-with-counts",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["Jobs"],
        }),
        getJobLocationsWithCounts: builder.query<JobLocationsWithCountsResponse, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => ({
                url: "/jobs-stats/locations-with-counts",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["Jobs"],
        }),

    }),
    overrideExisting: false,
});

export const { useGetAllJobsQuery, useGetJobTypeWithCountsQuery, useGetRemunerationBucketsQuery, useGetJobRolesWithCountsQuery, useGetJobLocationsWithCountsQuery } = getAllJobsApi;
