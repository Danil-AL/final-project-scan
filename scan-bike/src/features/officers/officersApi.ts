import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const officersApi = createApi({
  reducerPath: 'officersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://your-backend-url.com/api' 
  }),
  tagTypes: ['Officers'],
  endpoints: (builder) => ({
    getOfficers: builder.query<any[], void>({
      query: () => 'officers',
      providesTags: ['Officers'],
    }),

    getOfficer: builder.query<any, string>({
      query: (id) => `officers/${id}`,
    }),

    createOfficer: builder.mutation({
      query: (body) => ({
        url: 'officers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Officers'],
    }),

    updateOfficer: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `officers/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Officers'],
    }),

    deleteOfficer: builder.mutation({
      query: (id) => ({
        url: `officers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Officers'],
    }),
  }),
});

export const {
  useGetOfficersQuery,
  useGetOfficerQuery,
  useCreateOfficerMutation,
  useUpdateOfficerMutation,
  useDeleteOfficerMutation,
} = officersApi;