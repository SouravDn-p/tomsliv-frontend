import { baseApi } from "@/redux/hooks/baseApi";
import { JobDetailsResponse } from "@/redux/types/getAllJobsType";

export const jobApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobDetailById: builder.query<JobDetailsResponse, string>({
            query: (id: string) => ({
                url: `/jobs/details/${id}`,
                method: "GET"
            })
            ,
            providesTags: ["JobDetails"]
        })
    }),
});

export const { useGetJobDetailByIdQuery } = jobApi;
