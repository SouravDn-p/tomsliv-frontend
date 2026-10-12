import { useAppSelector } from "@/redux/hooks/redux-hook";
import { Navigate } from "react-router-dom";

export default function FarmOwnerRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const user = useAppSelector((state) => state.auth.user);

  // console.log("PrivateRoute -> User:", user);

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  // If requiredRole is provided, check against it.
  // Otherwise, default to "FARM_OWNER" to maintain existing behavior for owner-dashboard.
  const roleToCheck = requiredRole || "FARM_OWNER";

  if (user.role !== roleToCheck) {
    // Logged in but NOT authorized
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
