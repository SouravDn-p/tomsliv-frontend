import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { User, TAuth, LoginResponse, RegisterResponse } from "@/redux/types/auth.type";
import { authApi } from "./authApi";
import { AppRootState } from "@/redux/store";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: "USER" | "FARM_OWNER" | "ADMIN" | "SUPER_ADMIN";
  exp: number;
  iat: number;
}

const initialState: TAuth = {
  user: null,
  token: null,
  refreshToken: null,
};

const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 1 });
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
      localStorage.removeItem("user");
    },
    loadUserFromToken: (state) => {
      const token = Cookies.get("token");
      if (token) {
        const user = decodeToken(token);
        if (user) {
          state.user = user;
          state.token = token;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<LoginResponse>) => {
        const user = decodeToken(payload.data.token.accessToken);
        if (user) {
          state.user = user;
          state.token = payload.data.token.accessToken;
          Cookies.set("token", payload.data.token.accessToken, { expires: 1 });
          localStorage.setItem("user", JSON.stringify(user));
          Cookies.set("refreshToken", payload.data.token.refreshToken, { expires: 1 });
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }: PayloadAction<RegisterResponse>) => {
        const user = decodeToken(payload.data.token.accessToken);
        if (user) {
          state.user = user;
          state.token = payload.data.token.accessToken;
          Cookies.set("token", payload.data.token.accessToken, { expires: 1 });
          localStorage.setItem("user", JSON.stringify(user));
          Cookies.set("refreshToken", payload.data.token.refreshToken, { expires: 1 });
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.farmRegister.matchFulfilled,
      (state, { payload }: PayloadAction<RegisterResponse>) => {
        const user = decodeToken(payload.data.token.accessToken);
        if (user) {
          state.user = user;
          state.token = payload.data.token.accessToken;
          Cookies.set("token", payload.data.token.accessToken, { expires: 1 });
          localStorage.setItem("user", JSON.stringify(user));
          Cookies.set("refreshToken", payload.data.token.refreshToken, { expires: 1 });
        }
      }
    );
  },
});

export const { setUser, logOut, loadUserFromToken } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: AppRootState) => state.auth.token;
export const useCurrentUser = (state: AppRootState) => state.auth.user;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";
// import { User, TAuth, LoginResponse } from "@/redux/types/auth.type";
// import { authApi } from "./authApi";
// import { AppRootState } from "@/redux/store";

// interface DecodedToken {
//   id: string;
//   name: string;
//   email: string;
//   role: "user" | "FARM_OWNER" | "admin";
//   exp: number;
//   iat: number;
// }

// const initialState: TAuth = {
//   user: null,
//   token: null,
// };

// const decodeToken = (token: string): User | null => {
//   try {
//     const decoded = jwtDecode<DecodedToken>(token);
//     return {
//       id: decoded.id,
//       name: decoded.name,
//       email: decoded.email,
//       role: decoded.role,
//     };
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       Cookies.set("token", action.payload.token, { expires: 1 });
//     },
//     logOut: (state) => {
//       state.user = null;
//       state.token = null;
//       Cookies.remove("token");
//       localStorage.removeItem("user");
//     },
//     loadUserFromToken: (state) => {
//       const token = Cookies.get("token");
//       if (token) {
//         const user = decodeToken(token);
//         if (user) {
//           state.user = user;
//           state.token = token;
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       authApi.endpoints.login.matchFulfilled,
//       (state, { payload }: PayloadAction<LoginResponse>) => {
//         const user = decodeToken(payload.data.token.accessToken);
//         if (user) {
//           state.user = user;
//           state.token = payload.data.token.accessToken;
//           Cookies.set("token", payload.data.token.accessToken, { expires: 1 });
//           localStorage.setItem("user", JSON.stringify(user));
//         }
//       }
//     );
//     builder.addMatcher(
//       authApi.endpoints.register.matchFulfilled,
//       (state, { payload }) => {
//         state.user = payload.data;
//       }
//     );
//   },
// });

// export const { setUser, logOut, loadUserFromToken } = authSlice.actions;
// export default authSlice.reducer;

// export const useCurrentToken = (state: AppRootState) => state.auth.token;
// export const useCurrentUser = (state: AppRootState) => state.auth.user;
