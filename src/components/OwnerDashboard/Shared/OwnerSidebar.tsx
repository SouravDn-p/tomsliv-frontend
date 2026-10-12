// OwnerSidebar.tsx
import logo from "@/assets/tomslive/Icon/Logo1.svg";
import {
  ChevronDown,
  ClipboardList,
  ExternalLink,
  Settings,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { RxDashboard } from "react-icons/rx";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { IconType } from "react-icons";
import { useAppDispatch } from "@/hooks/useRedux";
import { useLogout } from "@/hooks/useLogout";
import { logOut } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

// Types
export interface SidebarItem {
  icon: IconType;
  label: string;
  href?: string;
  badge?: string;
  children?: { label: string; href: string }[];
}

export interface SidebarProps {
  items?: SidebarItem[];
  onItemClick?: () => void;
}

// Sidebar Items
const defaultSidebarItems: SidebarItem[] = [
  { icon: RxDashboard, label: "Dashboard", href: "/owner-dashboard/dashboard" },
  {
    icon: ClipboardList,
    label: "My Jobs",
    href: "/owner-dashboard/my-jobs",
  },

  {
    icon: FaUsers,
    label: "All Applicants",
    href: "/owner-dashboard/all-applicant",
  },
  {
    icon: FaUserPlus,
    label: "Ideal Candidate",
    href: "/owner-dashboard/ideal-candidate",
  },

  {
    icon: Settings,
    label: "Settings",
    href: "/owner-dashboard/settings",
  },
];

const OwnerSidebar: React.FC<SidebarProps> = ({
  items = defaultSidebarItems,
  onItemClick,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { logout } = useLogout();
  const navigator = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };
  const handelLogout = async () => {
    try {
      await logout();
      dispatch(logOut());
      navigator("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col h-full border-r bg-white border-[#DDDDDD]">
      {/* Logo */}
      <Link className="cursor-pointer" to="/">
        <div className="flex px-6 py-5 ">
          <img src={logo} alt="Logo" className="" />
          {/* <h2>FarmLink</h2> */}
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-3">
          {items.map((item) => {
            const isActive = location.pathname === item.href;
            const isOpen = openMenu === item.label;

            const baseClass =
              "group flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all duration-300";

            const activeClass = "bg-[#205CA5] text-white shadow-md";
            const inactiveClass =
              "text-black hover:bg-[#205CA5] hover:text-white";

            return (
              <div key={item.label}>
                {item.href && !item.children ? (
                  <Link
                    to={item.href}
                    onClick={onItemClick}
                    className={`${baseClass} ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 group-hover:text-white" />
                      <span className="text-base font-medium font-sans">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`${baseClass} ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 group-hover:text-white" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}

                {/* Children */}
                {item.children && isOpen && (
                  <div className="ml-8 mt-2 space-y-2">
                    {item.children.map((child) => {
                      const childActive = location.pathname === child.href;
                      return (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={onItemClick}
                          className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                            childActive
                              ? "bg-[#205CA5] text-white"
                              : "text-black hover:bg-[#205CA5] hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <button
            onClick={handelLogout}
            className="
    w-full px-4 py-3 mb-1
    flex justify-start gap-2
    rounded-lg
    text-base font-medium
    text-destructive cursor-pointer
    transition-colors
    hover:bg-[#FCECEE]
    border-none shadow-none
  "
          >
            <ExternalLink className="w-5 h-5" /> Log Out
          </button>
        </div>
      </nav>

      {/* Help & Support */}
      {/* <div className="p-4 border-t border-[#C9C6C3]">
        <Link
          to="/client-dashboard/help-support"
          className="flex items-center justify-center gap-2 text-black hover:text-[#205CA5] transition"
        >
          <span className="text-sm font-medium">Help & Support</span>
          <RiShareBoxLine className="w-5 h-5" />
        </Link>
      </div> */}
    </div>
  );
};

export default OwnerSidebar;

// // AdminSidebar.tsx
// import logo from "@/assets/Logo/LogoMain.svg";
// import { Badge } from "@/components/ui/badge";

// import { RiShareBoxLine } from "react-icons/ri";
// import { ChevronDown } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";

// import Dashboard from "@/assets/icon/dashboard.svg";
// import UserManagement from "@/assets/icon/UserManagement.svg";
// import Patients from "@/assets/icon/Patients.svg";
// import PatientAssignment from "@/assets/icon/PatientAssignment.svg";
// import ProtocolManagement from "@/assets/icon/ProtocolManagement.svg";
// import AuditLog from "@/assets/icon/AuditLog.svg";
// import Settings from "@/assets/icon/Settings.svg";

// // Types
// export interface SidebarItem {
//   icon: string; // now icon is a string (image src)
//   label: string;
//   href?: string;
//   badge?: string;
//   children?: { label: string; href: string }[];
// }

// export interface SidebarProps {
//   items?: SidebarItem[];
//   onItemClick?: () => void;
// }

// // Sidebar Items
// const defaultSidebarItems: SidebarItem[] = [
//   { icon: Dashboard, label: "Dashboard", href: "/admin-dashboard/dashboard" },
//   {
//     icon: UserManagement,
//     label: "User Management",
//     href: "/admin-dashboard/user-management",
//   },
//   { icon: Patients, label: "Patients", href: "/admin-dashboard/patients" },
//   {
//     icon: PatientAssignment,
//     label: "Patient Assignment",
//     href: "/admin-dashboard/patient-assignment",
//   },
//   {
//     icon: ProtocolManagement,
//     label: "Protocol Management",
//     href: "/admin-dashboard/protocol-management",
//   },
//   { icon: AuditLog, label: "Audit Log", href: "/admin-dashboard/audit-log" },
//   { icon: Settings, label: "Settings", href: "/admin-dashboard/settings" },
// ];

// const AdminSidebar: React.FC<SidebarProps> = ({
//   items = defaultSidebarItems,
//   onItemClick,
// }) => {
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   const toggleMenu = (label: string) => {
//     setOpenMenu(openMenu === label ? null : label);
//   };

//   return (
//     <div
//       className="flex flex-col h-full bg-[#29424C]"
//       style={{ boxShadow: "3px 4px 42.3px 0px #0000001A" }}
//     >
//       {/* Logo */}
//       <Link to="/admin-dashboard/dashboard">
//         <div className="flex items-center justify-center p-2 sm:p-3 border-b border-[#C9C6C3] mt-1">
//           <div className="flex justify-center mb-1">
//             <img src={logo} alt="Logo" className="h-8 w-35 " />
//           </div>
//         </div>
//       </Link>

//       {/* Navigation */}
//       <nav className="flex-1 p-2 md:p-4">
//         <div className="space-y-4 md:space-y-6">
//           {items.map((item) => {
//             const isActive =
//               location.pathname === item.href ||
//               item.children?.some((child) => location.pathname === child.href);
//             const isOpen = openMenu === item.label;

//             return (
//               <div key={item.label}>
//                 {item.href && !item.children ? (
//                   <Link
//                     to={item.href}
//                     onClick={onItemClick}
//                     className={`flex items-center justify-between w-full px-3 py-2 text-sm font-normal transition-all duration-300 ease-in-out ${
//                       isActive
//                         ? "text-[#F3AA4B] bg-[#FEF7ED] rounded-xl shadow-md"
//                         : "text-white hover:text-[#F3AA4B] hover:bg-[#FEF7ED] hover:rounded-xl hover:shadow-md"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-2 md:text-lg">
//                       <img
//                         src={item.icon}
//                         alt={item.label}
//                         className={`w-5 h-5 transition-colors duration-300 ${
//                           isActive
//                             ? "filter brightness-0 invert sepia saturate-500 hue-rotate-[30deg] text-[#F3AA4B]"
//                             : "filter brightness-0 invert"
//                         } hover:filter hover:brightness-0 hover:invert hover:sepia hover:saturate-500 hover:hue-rotate-[30deg]`}
//                       />
//                       <span>{item.label}</span>
//                     </div>
//                   </Link>
//                 ) : (
//                   <button
//                     onClick={() => toggleMenu(item.label)}
//                     className={`flex items-center justify-between w-full px-3 py-2 text-sm font-normal transition-all duration-300 ease-in-out cursor-pointer ${
//                       isActive
//                         ? "text-[#3A5CFF] bg-[#1C1D28] rounded-xl shadow-md"
//                         : "text-white hover:text-[#3A5CFF] hover:bg-[#1C1D28]/80 hover:rounded-xl hover:shadow-md"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-2 md:text-lg">
//                       <img
//                         src={item.icon}
//                         alt={item.label}
//                         className={`w-5 h-5 transition-all duration-300 ${
//                           isActive ? "filter brightness-125" : ""
//                         }`}
//                       />
//                       <span>{item.label}</span>
//                     </div>

//                     {item.children && (
//                       <ChevronDown
//                         className={`w-4 h-4 transform transition-transform duration-300 ${
//                           isOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     )}

//                     {item.badge && (
//                       <Badge
//                         variant="secondary"
//                         className="text-xs bg-[#3A5CFF]/10 text-[#3A5CFF] border border-[#3A5CFF]/30"
//                       >
//                         {item.badge}
//                       </Badge>
//                     )}
//                   </button>
//                 )}

//                 {item.children && isOpen && (
//                   <div className="ml-6 mt-2 space-y-2">
//                     {item.children.map((child) => {
//                       const childActive = location.pathname === child.href;
//                       return (
//                         <Link
//                           key={child.label}
//                           to={child.href}
//                           onClick={onItemClick}
//                           className={`block px-3 py-2 text-sm rounded-lg transition-all ${
//                             childActive
//                               ? "text-[#3A5CFF] bg-[#1C1D28]"
//                               : "text-gray-300 hover:text-[#3A5CFF] hover:bg-[#1C1D28]/70"
//                           }`}
//                         >
//                           {child.label}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Help & Support */}
//       <div className="p-2 md:p-4 border-t border-[#C9C6C3]">
//         <div className="flex justify-center mb-1">
//           <img src={logo} alt="Logo" className="h-5 w-auto" />
//         </div>
//         <Link
//           to="/client-dashboard/help-support"
//           className="flex items-center justify-center space-x-3 text-white hover:text-[#3A5BF8] transition-colors"
//         >
//           <span className="text-sm font-medium">Help & Support</span>
//           <RiShareBoxLine className="w-5 h-5 text-gray-300" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
