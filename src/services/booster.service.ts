import { baseApi } from '@/src/services/base.service';
import { OpenBoosterResponse } from "@/src/types/responses/OpenBoosterResponse";

export const boosterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    openBooster: builder.mutation<OpenBoosterResponse, string>({
      query: (collectionId: string) => ({
        url: `/boosters/open/${collectionId}`,
        method: 'POST'
      })
    })
  }),
});

export const { 
  useOpenBoosterMutation
} = boosterApi;