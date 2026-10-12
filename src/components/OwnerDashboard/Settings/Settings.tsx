import React, { useState } from "react";
import s1 from "@/assets/dashboard/s1.png";
import s2 from "@/assets/dashboard/s2.png";
import s3 from "@/assets/dashboard/s3.png";
import s5 from "@/assets/dashboard/s5.png";
import Profile from "./Profile";
import Farm from "./Farm";
import Notifications from "./Notifications";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import UserSecurity from "@/components/MyAccount/UserSettings/UserSecurity";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Profile" | "Farm" | "Notifications" | "Security"
  >("Profile");

  const tabs = [
    { id: "Profile", label: "Profile", icon: s1 },
    { id: "Farm", label: "Farm", icon: s2 },
    { id: "Notifications", label: "Notifications", icon: s3 },
    { id: "Security", label: "Security", icon: s5 },
  ];
  const { data: user } = useGetCurrentUserQuery();
  console.log(user);

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200 px-2 sm:px-4 md:px-6 py-3 sm:py-4 overflow-x-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2 min-w-max sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center  gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <img
                  src={tab.icon}
                  alt={tab.label}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0"
                />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-3 sm:p-4 md:p-6">
          {activeTab === "Profile" && <Profile user={user?.data} />}
          {activeTab === "Farm" && <Farm user={user?.data} />}
          {activeTab === "Notifications" && <Notifications user={user?.data} />}
          {/* {activeTab === "Billing" && <Billing />} */}
          {activeTab === "Security" && <UserSecurity />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
