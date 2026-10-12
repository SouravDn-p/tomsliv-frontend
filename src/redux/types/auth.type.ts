export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role?: "USER" | "FARM_OWNER" | "ADMIN" | "SUPER_ADMIN";
  status?: string; // e.g., "ACTIVE"
  isVerified?: boolean;
  lastLoginAt?: string; // ISO date string
  lastActiveAt?: string; // ISO date string
  profilePictureId?: string | null;
  profilePictureUrl?: string | null;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
};

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    loginType: string; // e.g., "USER", "SUPER_ADMIN"
    user: User;
    token: {
      accessToken: string;
      refreshToken: string;
      refreshTokenExpiresAt: string;
    };
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: {
      accessToken: string;
      refreshToken: string;
      refreshTokenExpiresAt: string;
    };
  };
}

export type TAuth = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
};

export type RegisterRequest = {
  name: string;
  businessName?: string;
  address_Pickup_Location?: string;
  phone?: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string | null;
//   role?: string; // e.g., "USER"
//   status?: string; // e.g., "ACTIVE"
//   isVerified?: boolean;
//   lastLoginAt?: string; // ISO date string
//   lastActiveAt?: string; // ISO date string
//   profilePictureId?: string | null;
//   profilePictureUrl?: string | null;
//   createdAt?: string; // ISO date string
//   updatedAt?: string; // ISO date string
// };

// export interface LoginResponse {
//   success: boolean;
//   message: string;
//   data: {
//     loginType: string; // e.g., "USER"
//     user: User
//     token: {
//       accessToken: string;
//       refreshToken: string;
//       refreshTokenExpiresAt: string;
//     };
//   };
// }

// export type RegisterResponse = {
//   success: boolean;
//   message: string;
//   data: User;
// };

// export type TAuth = {
//   user: User | null;
//   token: string | null;
// };

// export type RegisterRequest = {
//   name: string;
//   businessName?: string;
//   address_Pickup_Location?: string;
//   phone?: string;
//   email: string;
//   password: string;
// };

// export type LoginRequest = {
//   email: string;
//   password: string;
// };
