import { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import Security from "./Security";
import { Notification } from "./Notification";
import { useGetAdminProfileQuery } from "@/redux/features/adminSettings/adminSettingsApi";

const tabs = [
  { id: "ProfileInfo", label: "Profile Info" },
  { id: "Security", label: "Security" },
  { id: "Notification", label: "Notification" },
];

const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState("ProfileInfo");

  // Fetch admin profile data
  const { data: profileData, isLoading, error } = useGetAdminProfileQuery();

  useEffect(() => {
    if (profileData?.success && profileData.data) {
      // console.log("Admin profile loaded:", profileData.data);
    }
  }, [profileData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Failed to load profile data. Please try again.
      </div>
    );
  }

  return (
    <div className="mt-5 font-sans">
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center cursor-pointer w-[162px] h-[38px] px-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? " text-[#205CA5] border-b-2 border-[#205CA5]"
                    : "bg-transparent text-gray-500 hover:bg-gray-200 border-b-2 border-transparent"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === "ProfileInfo" && (
          <ProfileInfo user={profileData?.data} />
        )}
        {activeTab === "Security" && <Security />}
        {activeTab === "Notification" && (
          <Notification settings={profileData?.data?.notificationSettings} />
        )}
      </div>
    </div>
  );
};

export default SettingsTab;

// import { useState } from "react";
// import ProfileInfo from "./ProfileInfo";
// import Security from "./Security";
// import { Notification } from "./Notification";

// const tabs = [
//   { id: "ProfileInfo", label: "Profile Info" },
//   { id: "Security", label: "Security" },
//   { id: "Notification", label: "Notification" },
// ];

// const SettingsTab = () => {
//   const [activeTab, setActiveTab] = useState("ProfileInfo");

//   return (
//     <div className="mt-5 font-sans">
//       {/* Tabs */}
//       <div className="flex gap-3 mb-6">
//         {tabs.map((tab) => {
//           const isActive = activeTab === tab.id;

//           return (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center justify-center cursor-pointer w-[162px] h-[38px] px-2.5 rounded-lg text-sm font-medium transition-all duration-200
//     ${
//       isActive
//         ? "bg-[rgba(32,92,165,0.15)] text-[#205CA5] border-b-2 border-[#205CA5]"
//         : "bg-transparent text-gray-500 hover:bg-gray-100 border-b-2 border-transparent"
//     }
//   `}
//             >
//               {tab.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* Content */}
//       <div className="mt-4">
//         {activeTab === "ProfileInfo" && <ProfileInfo />}
//         {activeTab === "Security" && <Security />}
//         {activeTab === "Notification" && <Notification />}
//       </div>
//     </div>
//   );
// };

// export default SettingsTab;
