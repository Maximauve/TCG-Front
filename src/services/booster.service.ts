import { baseApi } from '@/src/services/base.service';
import { OpenBoosterResponse } from "@/src/types/responses/OpenBoosterResponse";

export const boosterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    openBooster: builder.mutation<OpenBoosterResponse, string>({
      query: (collectionId: string) => ({
        url: `/boosters/open/${collectionId}`,
        method: 'POST'
      })
    }),
    getBoosterStatus: builder.query<{ can_open_booster: boolean; current_stack: number; next_booster_at: string }, void>({
      query: () => '/boosters/status',
    }),
  }),
});

export const { 
  useOpenBoosterMutation,
  useGetBoosterStatusQuery,
} = boosterApi;