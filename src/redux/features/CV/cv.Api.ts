import { baseApi } from "@/redux/hooks/baseApi";
import { RecentCVsResponse } from "./Cv.type";
export const cvApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        submitCV: builder.mutation<any, any>({
            query: (body) => ({
                url: "/cv",
                method: "POST",
                body,
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["CVs"],
        }),
        getCV: builder.query<any, void>({
            query: () => ({
                url: `/cv`,
                method: "GET",
            }),
        }),
        getAllCvForFarm: builder.query<RecentCVsResponse, void>({
            query: () => ({
                url: `/cv/farm-owner/recent`,
                method: "GET",
            }),
        }),
        CompareTowCv: builder.mutation<any, any>({
            query: (body) => ({
                url: "/cv/farm-owner/compare",
                method: "POST",
                body,
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["CVs"],
        }),
        createPublicCV: builder.mutation<any, any>({
            query: (body) => ({
                url: "/public-cv",
                method: "POST",
                body,
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["CVs"],
        })
    }),
});

export const { useSubmitCVMutation, useGetCVQuery, useGetAllCvForFarmQuery, useCompareTowCvMutation, useCreatePublicCVMutation } = cvApi;
