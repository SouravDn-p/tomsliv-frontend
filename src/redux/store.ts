// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./hooks/baseApi";
import authReducer from "@/redux/features/auth/authSlice";
import adminSettingsReducer from "@/redux/features/adminSettings/adminSettingsSlice";

import {
  persistReducer,
  persistStore,
  PERSIST,
  REHYDRATE,
  PAUSE,
  FLUSH,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { aiApi } from "./features/ai/aiApi";

// Persist config for authentication
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
    auth: persistedReducer,
    adminSettings: adminSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, PAUSE, FLUSH, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, aiApi.middleware),
});

export const persistor = persistStore(store);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
