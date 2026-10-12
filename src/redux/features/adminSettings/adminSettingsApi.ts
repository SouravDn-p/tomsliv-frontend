import { baseApi } from "@/redux/hooks/baseApi";
import {
  AdminUser,
  ChangePasswordRequest,
  UpdateNotificationRequest,
  UpdateProfileRequest,
  ApiResponse,
  AdminNotificationSettings,
} from "@/redux/types/adminSettings";

export const adminSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get admin profile
    getAdminProfile: builder.query<ApiResponse<AdminUser>, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update admin profile
    updateAdminProfile: builder.mutation<
      ApiResponse<AdminUser>,
      UpdateProfileRequest
    >({
      query: (data) => {
        const formData = new FormData();
        if (data.name) formData.append("name", data.name);
        if (data.phone) formData.append("phone", data.phone);
        if (data.image) formData.append("image", data.image);

        return {
          url: "/auth/profile",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),

    // Change password
    changePassword: builder.mutation<ApiResponse<null>, ChangePasswordRequest>({
      query: (data) => ({
        url: "/auth/password/change",
        method: "POST",
        body: data,
      }),
    }),

    // Update notification settings
    updateNotificationSettings: builder.mutation<
      ApiResponse<AdminNotificationSettings>,
      UpdateNotificationRequest
    >({
      query: (data) => ({
        url: "/auth/notifications/admin",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
  useUpdateNotificationSettingsMutation,
} = adminSettingsApi;
