import { baseApi } from '@/src/services/base.service';
import { User } from '@/src/types/model/User';

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => '/user',
      providesTags: ["USER"],
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => `/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: "USER", id: userId }],
    }),
    updateUser: builder.mutation<User, { userId: string; formData: FormData }>({
      query: ({ userId, formData }) => ({
        url: `/user/${userId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: "USER", id: userId }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE'
      })
    })
  }),
});

export const { 
  useGetCurrentUserQuery, 
  useGetUserByIdQuery, 
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;