// AdminSidebar.tsx
import logo from "@/assets/tomslive/Icon/Logo1.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { BiSolidUserBadge } from "react-icons/bi";
// import { HiOutlineUserMinus } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import { IconType } from "react-icons";

import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { Bell, DollarSign, Settings } from "lucide-react";
import { LuClipboardList } from "react-icons/lu";

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
  {
    icon: RxDashboard,
    label: "Dashboard",
    href: "/admin-dashboard/dashboard",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/admin-dashboard/notifications",
  },
  {
    icon: FaUsers,
    label: "FarmLink Users",
    href: "/admin-dashboard/all-users",
  },
  {
    icon: LuClipboardList,
    label: "Manage Jobs",
    href: "/admin-dashboard/all-jobs",
  },
  {
    icon: DollarSign,
    label: "Payments",
    href: "/admin-dashboard/payments",
  },
  // {
  //   icon: BiSolidUserBadge,
  //   label: "Support",
  //   href: "/admin-dashboard/support",
  // },

  {
    icon: BiSolidUserBadge,
    label: "Contacts",
    href: "/admin-dashboard/contracts",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin-dashboard/settings",
  },
  {
    icon: TbLogout,
    label: "Log Out",
  },
];

const AdminSidebar: React.FC<SidebarProps> = ({
  items = defaultSidebarItems,
  onItemClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col h-full border-r bg-white border-[#DDDDDD]">
      {/* Logo */}
      <Link to="/">
        <div className="flex  p-6">
          <img src={logo} alt="Logo" className="h-9" />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3">
          {items.map((item) => {
            const isActive = location.pathname === item.href;
            const isLogout = item.label === "Logout";

            const baseClass =
              "group flex items-center cursor-pointer w-full px-4 py-3.5 rounded-xl transition-all duration-300";

            const activeClass = "bg-[#205CA5] text-white shadow-md";
            const inactiveClass =
              "text-black hover:bg-[#205CA5] hover:text-white";

            const logoutClass =
              "text-[#E54656] hover:bg-[#E546561A] hover:text-[#E54656]";

            if (isLogout) {
              return (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className={`${baseClass} ${logoutClass}`}
                >
                  <div className="flex items-center  gap-3">
                    <item.icon className="w-5 h-5 text-[#E54656]" />
                    <span className="text-base font-medium">Log Out</span>
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href!}
                onClick={onItemClick}
                className={`${baseClass} ${
                  isActive ? activeClass : inactiveClass
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 group-hover:text-white" />
                  <span className="text-base font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;

// // AdminSidebar.tsx
// import logo from "@/assets/tomslive/Icon/Logo1.svg";
// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
// import { RxDashboard } from "react-icons/rx";
// import { FaUserPlus, FaUsers } from "react-icons/fa";
// import { BiSolidUserBadge } from "react-icons/bi";
// import { HiOutlineUserMinus } from "react-icons/hi2";
// import { TbLogout } from "react-icons/tb";
// import { IconType } from "react-icons";

// // Types
// export interface SidebarItem {
//   icon: IconType;
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
//   {
//     icon: RxDashboard,
//     label: "Dashboard",
//     href: "/admin-dashboard/dashboard",
//   },
//   {
//     icon: FaUsers,
//     label: "User",
//     href: "/admin-dashboard/all-users",
//   },
//   {
//     icon: HiOutlineUserMinus,
//     label: "Jobs",
//     href: "/admin-dashboard/all-jobs",
//   },
//   {
//     icon: FaUserPlus,
//     label: "Payments",
//     href: "/admin-dashboard/payments",
//   },
//   {
//     icon: BiSolidUserBadge,
//     label: "Support",
//     href: "/admin-dashboard/support",
//   },
//   {
//     icon: BiSolidUserBadge,
//     label: "Settings",
//     href: "/admin-dashboard/settings",
//   },
//   {
//     icon: TbLogout,
//     label: "Logout",
//     href: "",
//   },
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
//       className="flex flex-col h-full bg-white border-[#DDDDDD]"
//       style={{ boxShadow: "3px 4px 42.3px 0px #0000001A" }}
//     >
//       {/* Logo */}
//       <Link to="/admin-dashboard/dashboard">
//         <div className="flex justify-center p-6">
//           <img src={logo} alt="Logo" className="h-9" />
//         </div>
//       </Link>

//       {/* Navigation */}
//       <nav className="flex-1 p-4">
//         <div className="space-y-3">
//           {items.map((item) => {
//             const isActive = location.pathname === item.href;
//             const isLogout = item.label === "Logout";

//             const baseClass =
//               "group flex items-center w-full px-4 py-3.5 rounded-xl transition-all duration-300";

//             const activeClass = "bg-[#205CA5] text-white shadow-md";
//             const inactiveClass =
//               "text-black hover:bg-[#205CA5] hover:text-white";

//             const logoutClass =
//               "text-[#E54656] hover:bg-[#E546561A] hover:text-[#E54656]";

//             return (
//               <div key={item.label}>
//                 {item.href && !item.children ? (
//                   <Link
//                     to={item.href}
//                     onClick={onItemClick}
//                     className={`${baseClass} ${
//                       isLogout
//                         ? logoutClass
//                         : isActive
//                         ? activeClass
//                         : inactiveClass
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon
//                         className={`w-5 h-5 ${
//                           isLogout ? "text-[#E54656]" : "group-hover:text-white"
//                         }`}
//                       />
//                       <span className="text-base font-medium font-sans">
//                         {item.label}
//                       </span>
//                     </div>
//                   </Link>
//                 ) : (
//                   <button
//                     onClick={() => toggleMenu(item.label)}
//                     className={`${baseClass} ${
//                       isActive ? activeClass : inactiveClass
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className="w-5 h-5 group-hover:text-white" />
//                       <span className="text-sm font-medium">{item.label}</span>
//                     </div>
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;

// // AdminSidebar.tsx
// import logo from "@/assets/tomslive/Icon/Logo1.svg";
// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
// import { RxDashboard } from "react-icons/rx";
// import { FaUserPlus, FaUsers } from "react-icons/fa";
// import { BiSolidUserBadge } from "react-icons/bi";
// import { HiOutlineUserMinus } from "react-icons/hi2";
// import { IconType } from "react-icons";
// import { TbLogout } from "react-icons/tb";

// // Types
// export interface SidebarItem {
//   icon: IconType;
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
//   { icon: RxDashboard, label: "Dashboard", href: "/admin-dashboard/dashboard" },
//   {
//     icon: FaUsers,
//     label: "User",
//     href: "/admin-dashboard/all-users",
//   },

//   {
//     icon: HiOutlineUserMinus,
//     label: "Jobs",
//     href: "/admin-dashboard/all-jobs",
//   },
//   {
//     icon: FaUserPlus,
//     label: "Payments",
//     href: "/admin-dashboard/payments",
//   },

//   {
//     icon: BiSolidUserBadge,
//     label: "Support",
//     href: "/admin-dashboard/support",
//   },
//   {
//     icon: BiSolidUserBadge,
//     label: "Settings",
//     href: "/admin-dashboard/settings",
//   },

//   {
//     icon: TbLogout,
//     label: "Logout",
//     href: "",
//   },
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
//       className="flex flex-col h-full bg-white border-[#DDDDDD]"
//       style={{ boxShadow: "3px 4px 42.3px 0px #0000001A" }}
//     >
//       {/* Logo */}
//       <Link to="/admin-dashboard/dashboard">
//         <div className="flex justify-center p-6">
//           <img src={logo} alt="Logo" className="h-9" />
//           {/* <h2>FarmLink</h2> */}
//         </div>
//       </Link>

//       {/* Navigation */}
//       <nav className="flex-1 p-4">
//         <div className="space-y-3">
//           {items.map((item) => {
//             const isActive = location.pathname === item.href;
//             const isOpen = openMenu === item.label;

//             const baseClass =
//               "group flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all duration-300";

//             const activeClass = "bg-[#205CA5] text-white shadow-md";
//             const inactiveClass =
//               "text-black hover:bg-[#205CA5] hover:text-white";

//             return (
//               <div key={item.label}>
//                 {item.href && !item.children ? (
//                   <Link
//                     to={item.href}
//                     onClick={onItemClick}
//                     className={`${baseClass} ${
//                       isActive ? activeClass : inactiveClass
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className="w-5 h-5 group-hover:text-white" />
//                       <span className="text-base font-medium font-sans">
//                         {item.label}
//                       </span>
//                     </div>
//                   </Link>
//                 ) : (
//                   <button
//                     onClick={() => toggleMenu(item.label)}
//                     className={`${baseClass} ${
//                       isActive ? activeClass : inactiveClass
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className="w-5 h-5 group-hover:text-white" />
//                       <span className="text-sm font-medium">{item.label}</span>
//                     </div>
//                   </button>
//                 )}

//                 {/* Children */}
//                 {item.children && isOpen && (
//                   <div className="ml-8 mt-2 space-y-2">
//                     {item.children.map((child) => {
//                       const childActive = location.pathname === child.href;
//                       return (
//                         <Link
//                           key={child.label}
//                           to={child.href}
//                           onClick={onItemClick}
//                           className={`block px-3 py-2 rounded-lg text-sm transition-all ${
//                             childActive
//                               ? "bg-[#205CA5] text-white"
//                               : "text-black hover:bg-[#205CA5] hover:text-white"
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
//     </div>
//   );
// };

// export default AdminSidebar;
