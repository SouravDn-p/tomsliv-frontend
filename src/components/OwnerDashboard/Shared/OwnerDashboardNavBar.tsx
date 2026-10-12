import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { useLogout } from "@/hooks/useLogout";
import { logOut } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useGetUnreadNotificationCountQuery } from "@/redux/features/notification/notification.Api";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import DefaultProfileCard from "@/components/Reuseable/DefaultProfileCard";

export interface NavbarProps {
  onMobileMenuToggle: () => void;
  notificationCount?: number;
  userName?: string;
  isSidebarOpen: boolean;
}

const OwnerDashboardNavBar: React.FC<NavbarProps> = ({
  onMobileMenuToggle,
  isSidebarOpen,
}) => {
  const { data: user } = useGetCurrentUserQuery();
  // console.log(user);
  const dispatch = useAppDispatch();
  const { logout } = useLogout();
  const navigator = useNavigate();
  const { data: notificationCount } = useGetUnreadNotificationCountQuery();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handelLogout = async () => {
    try {
      await logout();
      dispatch(logOut());
      navigator("/");
      toast.success("Logout successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="bg-white border-b border-gray-200">
      <header
        className={`flex items-center justify-between h-17 px-4 md:px-8 mb-2 ${isSidebarOpen ? "max-w-[1400px] mx-auto" : ""
          }`}
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-black cursor-pointer"
            onClick={onMobileMenuToggle}
          >
            <Menu className="w-6 h-6" />
          </Button>

          {/* Search Box */}
          {/* <div className="flex items-center pl-0 md:pl-2 lg:pl-70">
            <div className="relative w-full flex justify-end md:justify-start">
              <div className="block md:hidden">
                {isSearchOpen ? (
                  <div className="relative w-[220px] sm:w-[260px]">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search anything here..."
                      className="w-full bg-gray-100 pl-3 pr-10 py-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <IoIosSearch
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  </div>
                ) : (
                  <IoIosSearch
                    onClick={() => setIsSearchOpen(true)}
                    className="text-2xl text-gray-500 cursor-pointer"
                  />
                )}
              </div>

              <div className="hidden md:block relative w-full min-w-lg lg:max-w-3xl">
                <input
                  type="text"
                  placeholder="Search anything here..."
                  className="w-full bg-gray-100 pl-3 pr-10 py-3 text-sm md:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Section */}
        <div className="flex items-center ml-2  ">
          {/* Notification Button */}
          {/* <div
            className="relative p-2 border border-gray-300 rounded-xl w-fit cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsNotifOpen(true)}
          >
            <IoMdNotificationsOutline className="w-8 h-8" />
            <span className="absolute top-0.5 right-2 bg-green-600 text-white text-xs font-semibold rounded-2xl w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div> */}
          <Link to={"nonfiction"}>
            <div className="relative p-2 border border-gray-300 rounded-xl w-fit cursor-pointer hover:bg-gray-50 transition-colors">
              <IoMdNotificationsOutline className="md:size-8  size-6" />
              <span className="absolute top-0.5 right-2 bg-green-600 text-white text-xs font-semibold rounded-2xl w-5 h-5 flex items-center justify-center">
                {notificationCount?.data?.count || 0}
              </span>
            </div>
          </Link>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="md:p-2 flex justify-between items-center md:gap-5 gap-2 m-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {user?.data?.profilePictureUrl ? (
                    <img
                      src={user?.data?.profilePictureUrl}
                      alt="user"
                      className="object-cover size-9 lg:size-12 rounded-full"
                    />
                  ) : (
                    <DefaultProfileCard size="md" />
                  )}
                  <div>
                    <h2 className="lg:text-xl text-lg font-medium whitespace-nowrap capitalize text-[#101312]">
                      {user?.data?.name}
                    </h2>
                    {/* <p className=" text-paragraph-secondary-gray">Recruiter </p> */}
                  </div>
                </div>
                {/* <IoMdArrowDropdownCircle className="text-sky-500 h-9 w-6" /> */}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-white w-60 shadow-lg rounded-xl border border-gray-200 p-2"
            >
              <Link to="/">
                <DropdownMenuItem
                  className={`px-4 py-3 mb-1 cursor-pointer rounded-lg text-base font-medium transition-colors ${activeItem === "settings"
                    ? "bg-blue-400 text-white"
                    : "text-gray-700 hover:bg-blue-400 hover:text-white"
                    }`}
                  onClick={() => setActiveItem("home")}
                >
                  Home
                </DropdownMenuItem>
              </Link>
              <Link to="/owner-dashboard/settings">
                <DropdownMenuItem
                  className={`px-4 py-3 mb-1 cursor-pointer rounded-lg text-base font-medium transition-colors ${activeItem === "settings"
                    ? "bg-blue-400 text-white"
                    : "text-gray-700 hover:bg-blue-400 hover:text-white"
                    }`}
                  onClick={() => setActiveItem("")}
                >
                  Settings
                </DropdownMenuItem>
              </Link>
              <button
                onClick={handelLogout}
                className="
    w-full px-4 py-3 mb-1
    flex justify-start
    rounded-lg
    text-base font-medium
    text-destructive
    transition-colors
    hover:hover:bg-[#FCECEE] 
    border-none shadow-none cursor-pointer
  "
              >
                Sign Out
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Notification Drawer */}
      {isNotifOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsNotifOpen(false)}
          ></div>

          {/* Panel */}
          <div className="relative w-96 bg-white h-full shadow-xl overflow-y-auto">
            <NotificationPanel onClose={() => setIsNotifOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboardNavBar;

// import { Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import user from "@/assets/icons/user.svg";
// import { Link } from "react-router-dom";

// export interface NavbarProps {
//   onMobileMenuToggle: () => void;
//   notificationCount?: number;
//   userName?: string;
//   isSidebarOpen: boolean;
// }

// const AdminDashboardNavBar: React.FC<NavbarProps> = ({
//   onMobileMenuToggle,

//   userName = "Gemini Chachi",
//   isSidebarOpen,
// }) => {
//   return (
//     <div className="bg-[#EBE8E3] border-b border-[#C9C6C3]">
//       <header
//         className={`flex items-center justify-between h-16 px-4 md:px-8 mb-2 ${
//           isSidebarOpen ? "max-w-[1400px] mx-auto" : ""
//         }`}
//       >
//         {/* Left Section */}
//         <div className="flex items-center space-x-4">
//           {/* Mobile Menu */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden text-black cursor-pointer"
//             onClick={onMobileMenuToggle}
//           >
//             <Menu className="w-6 h-6" />
//           </Button>

//           {/* Logo + Dashboard text */}
//           <div className="flex items-center space-x-2 pl-0 md:pl-2 lg:pl-70">
//             <div className="flex flex-col leading-tight">
//               <span className="text-xs text-black">Dashboard</span>
//               <span className="text-sm md:text-base font-medium text-black">
//                 HELLO, {userName}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-4">
//           {/* Dashboard Icon */}

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white cursor-pointer"
//               >
//                 <img src={user} alt="User" className="w-6 h-6 rounded-full" />
//               </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent
//               align="end"
//               className="bg-[#346778] text-white w-60 shadow-2xl rounded-3xl border border-[#3A5CFF]/40 backdrop-blur-md overflow-hidden animate-fadeIn"
//             >
//               <Link to="/admin-dashboard/settings">
//                 <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 rounded-3xl hover:bg-[#FEF7ED] hover:text-black transition-colors cursor-pointer">
//                   {/* <IoMdSettings className="text-white hover:text-black transition-colors duration-300 cursor-pointer" /> */}
//                   <span className="font-medium">Settings</span>
//                 </DropdownMenuItem>
//               </Link>

//               <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 rounded-3xl hover:bg-[#FEF7ED] hover:text-black transition-colors cursor-pointer">
//                 {/* <RiFileList3Fill className="text-white hover:text-black" /> */}
//                 <span className="font-medium">Terms & Conditions</span>
//               </DropdownMenuItem>

//               <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 rounded-3xl hover:bg-[#FEF7ED] hover:text-black transition-colors cursor-pointer">
//                 {/* <MdPrivacyTip className="text-white hover:text-black" /> */}
//                 <span className="font-medium">Privacy Policy</span>
//               </DropdownMenuItem>

//               <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 rounded-3xl hover:bg-red-600 hover:text-black transition-colors cursor-pointer">
//                 {/* <RiLogoutBoxRLine className="text-red-500" /> */}
//                 <span className="font-medium">Sign Out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default AdminDashboardNavBar;
