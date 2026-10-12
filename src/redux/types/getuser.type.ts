// types.ts
export const statusConfig = {
  ACTIVE: {
    label: "Active",
    bgColor: "bg-[#D3F8DF]",
    textColor: "text-[#084C2E]",
  },
  INACTIVE: {
    label: "Inactive",
    bgColor: "bg-[#FEE4E2]",
    textColor: "text-[#912018]",
  },
} as const;

export const roleConfig = {
  marchant: {
    label: "Merchant",
    bgColor: "bg-[#E0E7FF]",
    textColor: "text-[#3730A3]",
  },
  admin: {
    label: "Admin",
    bgColor: "bg-[#F0FDF4]",
    textColor: "text-[#166534]",
  },
  customer: {
    label: "Customer",
    bgColor: "bg-[#FEF2F2]",
    textColor: "text-[#991B1B]",
  },
} as const;

export type UserStatus = keyof typeof statusConfig;
export type UserRole = keyof typeof roleConfig;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'FARM_OWNER' | 'ADMIN' | 'EMPLOYEE' | 'USER' | 'SUPER_ADMIN'; // adjust roles as needed
    status: 'ACTIVE' | 'INACTIVE';
    isVerified: boolean;
    lastLoginAt: string; // ISO date string
    lastActiveAt: string; // ISO date string
    profilePictureId: string | null;
    profilePictureUrl: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    farm: {
      id: string;
      name: string;
      location: string | null;
      description: string | null;
      website: string | null;
      herdSize: number | null;
      farmType: string | null;
      logoId: string | null;
      status: 'ACTIVE' | 'INACTIVE';
      createdAt: string;
      updatedAt: string;
      logo: string | null;
    };
    notificationSettings: {
      emailNotifications: boolean;
      weeklyDigest: boolean;
      newApplicantAlert: boolean;
      updatesAndTips: boolean;
    };
  };
}
