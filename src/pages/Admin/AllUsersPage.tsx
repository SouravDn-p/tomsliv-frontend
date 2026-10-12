import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AllUsersPage = () => {
  return (
    <div>
      <div className="flex gap-3 mb-6">
        <NavLink
          className={({ isActive }) =>
            `flex items-center justify-center
             w-[162px] h-[38px] px-2.5
             rounded-lg
             text-sm font-medium
             transition-all duration-200
             ${
               isActive
                 ? "bg-[rgba(32,92,165,0.15)] text-[#205CA5]"
                 : "bg-transparent text-gray-500 hover:bg-gray-100"
             }`
          }
          to="job-seekers"
        >
          Job Seeker
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center justify-center
             w-[162px] h-[38px] px-2.5
             rounded-lg
             text-sm font-medium
             transition-all duration-200
             ${
               isActive
                 ? "bg-[rgba(32,92,165,0.15)] text-[#205CA5]"
                 : "bg-transparent text-gray-500 hover:bg-gray-100"
             }`
          }
          to="employers"
        >
          Employer
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default AllUsersPage;
