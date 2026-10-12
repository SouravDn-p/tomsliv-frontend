import { AdminUser, NotificationSettings } from "@/redux/types/adminSettings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminSettingsState {
  user: AdminUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminSettingsState = {
  user: null,
  isLoading: false,
  error: null,
};

const adminSettingsSlice = createSlice({
  name: "adminSettings",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AdminUser>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<AdminUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateNotificationSettings: (
      state,
      action: PayloadAction<NotificationSettings>
    ) => {
      if (state.user) {
        state.user.notificationSettings = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  updateUser,
  updateNotificationSettings,
  setLoading,
  setError,
  clearError,
} = adminSettingsSlice.actions;

export default adminSettingsSlice.reducer;
