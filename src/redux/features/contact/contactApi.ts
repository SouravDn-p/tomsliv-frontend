import { baseApi } from "@/redux/hooks/baseApi";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (data) => ({
                url: '/contacts',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Contacts'],
        }),
        getContacts: builder.query({
            query: () => ({
                url: '/contacts',
                method: 'GET',
            }),
            providesTags: ['Contacts'],
        }),
    }),
});
export const { useCreateContactMutation, useGetContactsQuery } = contactApi;