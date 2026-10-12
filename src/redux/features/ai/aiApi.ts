/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getBaseUrl = import.meta.env?.VITE_AI_API_BASE_URL
export const aiApi = createApi({
    reducerPath: 'aiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getBaseUrl,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createJobByAI: builder.mutation<{
            benefitsAndPerks: {
                description: string;
            };
            fullJobDescription: string;
        }, { body: any; params?: { jobdescription?: string | null; benefitsAndPerks?: string | null } }>({
            query: ({ body, params }) => ({
                url: "/ai/create-job",
                method: "POST",
                body: body,
                params: params,
            }),
        })
    }),
});

export const { useCreateJobByAIMutation } = aiApi;