import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/api`,
    prepareHeaders: async headers => {
      const session = await getSession();
      if (session?.token) {
        headers.set('Authorization', `Bearer ${session.token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ["USER", "CARD", "COLLECTION"],
  endpoints: () => ({}),
});
