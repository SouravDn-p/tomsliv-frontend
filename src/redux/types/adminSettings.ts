export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  isVerified: boolean;
  lastLoginAt: string;
  lastActiveAt: string;
  profilePictureId: string | null;
  profilePictureUrl: string | null;
  createdAt: string;
  updatedAt: string;
  notificationSettings?: NotificationSettings;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  weeklyDigest: boolean;
  newEmployerJoin: boolean;
}

export interface AdminNotificationSettings {
  id: string;
  userId: string;
  emailNotifications: boolean;
  weeklyDigest: boolean;
  newEmployerJoin: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  image?: File;
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface UpdateNotificationRequest {
  emailNotifications: boolean;
  weeklyDigest: boolean;
  newEmployerJoin: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
