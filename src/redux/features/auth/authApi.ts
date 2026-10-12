import { baseApi } from "@/redux/hooks/baseApi";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/redux/types/auth.type";
import { UserResponse } from "@/redux/types/getuser.type";
import Cookies from "js-cookie";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation<
      { success: boolean; message: string },
      { name?: string; phone?: string; image?: File }
    >({
      query: ({ name, phone, image }) => {
        const formData = new FormData();
        if (name) formData.append("name", name);
        if (phone) formData.append("phone", phone);
        if (image) formData.append("image", image);

        return {
          url: "/auth/profile",
          method: "PATCH",
          body: formData,
        };
      },
    }),

    changePassword: builder.mutation<
      { message: string },
      { password: string; newPassword: string }
    >({
      query: ({ password, newPassword }) => ({
        url: "/auth/password/change",
        method: "POST",
        body: { password, newPassword },
      }),
    }),

    farmRegister: builder.mutation<
      RegisterResponse,
      { email: string; name: string; password: string; farmName: string }
    >({
      query: (data) => ({
        url: "/auth/register-farm",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => {
        const refreshToken = Cookies.get("refreshToken");
        return {
          url: "/auth/logout",
          method: "POST",
          body: { refreshToken },
        };
      },
      invalidatesTags: ["User"],
    }),

    updateFarmProfile: builder.mutation<
      { success: boolean; message: string },
      {
        name?: string;
        location?: string;
        herdSize?: number;
        farmType?: string;
        description?: string;
        website?: string;
        image?: File;
      }
    >({
      query: ({
        name,
        location,
        herdSize,
        farmType,
        description,
        website,
        image,
      }) => {
        const formData = new FormData();
        if (name) formData.append("name", name);
        if (location) formData.append("location", location);
        if (herdSize !== undefined) formData.append("herdSize", herdSize.toString());
        if (farmType) formData.append("farmType", farmType);
        if (description) formData.append("description", description);
        if (website) formData.append("website", website);
        if (image) formData.append("image", image);

        return {
          url: "/auth/farm",
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteSelf: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/auth/self/delete",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/password/forgot',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useFarmRegisterMutation,
  useUpdateFarmProfileMutation,
  useDeleteSelfMutation,
  useLogoutMutation,
  useForgotPasswordMutation
} = authApi;