import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";

export const useCurrentUser = () =>
    useSelector((state: AppRootState) => state.auth.user);

export const useIsAuthenticated = () =>
    useSelector((state: AppRootState) => !!state.auth.token);
