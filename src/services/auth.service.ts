import { baseApi } from './base.service';

interface RegisterData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (data: RegisterData) => ({
        url: '/register',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLogoutMutation,
} = authApi; 
