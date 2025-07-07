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
    }),
    createCard: builder.mutation<any, FormData>({
      query: (body) => ({
        url: '/manage/cards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["CARD"],
    }),
  }),
});

export const { 
  useGetCardsQuery,
  useGetLatestCardsQuery,
  useCreateCardMutation,
} = cardApi;