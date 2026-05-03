import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const casesApi = createApi({
  reducerPath: 'casesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-domain.com' }),
  tagTypes: ['Cases'],
  endpoints: (builder) => ({
    getCases: builder.query<any[], void>({
      query: () => 'cases',
      providesTags: ['Cases'],
    }),
    getCase: builder.query<any, string>({
      query: (id) => `cases/${id}`,
    }),
    createCase: builder.mutation({
      query: (body) => ({
        url: 'cases',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cases'],
    }),
    updateCase: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `cases/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Cases'],
    }),
    deleteCase: builder.mutation({
      query: (id) => ({
        url: `cases/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cases'],
    }),
  }),
})

export const {
  useGetCasesQuery,
  useGetCaseQuery,
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
} = casesApi