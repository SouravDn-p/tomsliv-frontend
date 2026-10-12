import { cn } from "@/lib/utils";
import { Bell, Shield, User } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import PageHeader from "../Reuseable/PageHeader";

export default function UserAccountSettings() {
  return (
    <div className="flex flex-col  md:gap-8 gap-6">
      {/* Heading */}
      <div>
        <PageHeader title="Settings" description="Manage your account" />
      </div>
      {/* Navigation */}
      <nav className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible no-scrollbar justify-between">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            cn(
              "flex flex-none sm:flex-1 min-w-fit justify-center items-center gap-2 px-4 sm:px-3 py-2 sm:py-1.5 rounded-2xl text-sm lg:text-base transition-colors whitespace-nowrap",
              isActive
                ? "font-medium text-[#205CA5] bg-[#E9F4FB]"
                : "text-gray-500 hover:text-gray-700 hover:bg-[#F0F9FF]"
            )
          }
        >
          <User size={18} /> <span className="hidden lg:block">Profile</span>
        </NavLink>

        <NavLink
          to="notifications"
          className={({ isActive }) =>
            cn(
              "flex flex-none sm:flex-1 min-w-fit justify-center items-center gap-2 px-4 sm:px-3 py-2 sm:py-1.5 rounded-2xl text-sm lg:text-base transition-colors whitespace-nowrap",
              isActive
                ? "font-medium text-[#205CA5] bg-[#E9F4FB]"
                : "text-gray-500 hover:text-gray-700 hover:bg-[#F0F9FF]"
            )
          }
        >
          <Bell size={18} />{" "}
          <span className="hidden lg:block">Notifications</span>
        </NavLink>

        <NavLink
          to="security"
          className={({ isActive }) =>
            cn(
              "flex flex-none sm:flex-1 min-w-fit justify-center items-center gap-2 px-4 sm:px-3 py-2 sm:py-1.5 rounded-2xl text-sm transition-colors whitespace-nowrap",
              isActive
                ? "font-medium text-[#205CA5] bg-[#E9F4FB]"
                : "text-gray-500 hover:text-gray-700 hover:bg-[#F0F9FF]"
            )
          }
        >
          <Shield size={18} /> <span className="hidden lg:block">Security</span>
        </NavLink>
      </nav>

      {/* Nested content */}
      <Outlet />
    </div>
  );
}
