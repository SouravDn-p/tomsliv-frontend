
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useCallback } from "react";

export const useLogout = () => {
    const [logoutMutation, { isLoading, isError }] = useLogoutMutation();

    const logout = useCallback(async () => {
        try {
            await logoutMutation().unwrap(); // unwrap to catch errors
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [logoutMutation]);

    return { logout, isLoading, isError };
};
