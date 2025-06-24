import { baseApi } from '@/src/services/base.service';
import { Card } from '../types/model/Card';
import { Collection } from '../types/model/Collection';

export const collectionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCollections: builder.query<Collection[], void>({
      query: () => '/card-collections',
      providesTags: ["COLLECTION"],
    }),
  }),
});

export const { 
  useGetCollectionsQuery,
} = collectionApi;