import { baseApi } from '@/src/services/base.service';
import { Card } from '../types/model/Card';

export const cardApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<Card[], void>({
      query: () => '/cards',
      providesTags: ["CARD"],
    }),
    getLatestCards: builder.query<Card[], void>({
      query: () => ("/cards/latest"),
      providesTags: ["CARD"]
    })
  }),
});

export const { 
  useGetCardsQuery,
  useGetLatestCardsQuery
} = cardApi;