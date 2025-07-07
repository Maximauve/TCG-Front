import { baseApi } from '@/src/services/base.service';
import { Card } from '../types/model/Card';
import { Collection } from '../types/model/Collection';

export const collectionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCollections: builder.query<Collection[], void>({
      query: () => '/card-collections',
      providesTags: ["COLLECTION"],
    }),
    getCollectionById: builder.query<Collection, string>({
      query: (id) => `/card-collections/${id}`,
      providesTags: (result, error, id) => [{ type: "COLLECTION", id }],
    }),
    createCollection: builder.mutation<Collection, FormData>({
      query: (body) => ({
        url: '/card-collections',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["COLLECTION"],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionByIdQuery,
  useCreateCollectionMutation,
} = collectionApi;