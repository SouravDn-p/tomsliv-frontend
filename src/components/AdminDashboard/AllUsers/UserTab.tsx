import { useState } from "react";
import JobSeeker from "./JobSeeker";
import Employer from "./Employer";

const tabs = [
  { id: "JobSeeker", label: "Job Seeker" },
  { id: "Employer", label: "Employer" },
];

const UserTab = () => {
  const [activeTab, setActiveTab] = useState("JobSeeker");

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
              className={`
                flex items-center cursor-pointer justify-center
                w-[162px] h-[38px] px-2.5
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[rgba(32,92,165,0.15)] text-[#205CA5]"
                    : "bg-transparent text-gray-500 hover:bg-gray-100"
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
        {activeTab === "JobSeeker" && <JobSeeker />}
        {activeTab === "Employer" && <Employer />}
      </div>
    </div>
  );
};

export default UserTab;

// // components/PatientsTab.tsx
// import { useState } from "react";
// import JobSeeker from "./JobSeeker";
// import Employer from "./Employer";

// const tabs = [
//   { id: "JobSeeker", label: "JobSeeker" },
//   { id: "Employer", label: "Employer" },
// ];

// const UserTab = () => {
//   const [activeTab, setActiveTab] = useState("JobSeeker");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "JobSeeker":
//         return <JobSeeker />;
//       case "Employer":
//         return <Employer />;
//       default:
//         return <JobSeeker />;
//     }
//   };

//   return (
//     <div className="mt-5 font-sans">
//       {/* Tabs */}
//       <div className="mb-3">
//         <div className="grid grid-cols-2 gap-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`pb-2 transition-colors ${
//                 activeTab === "active"
//                   ? "text-blue-600 border-b-2 border-blue-600 font-medium"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="mt-6">{renderContent()}</div>
//     </div>
//   );
// };

// export default UserTab;
