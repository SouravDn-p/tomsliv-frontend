import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  Briefcase,
  FileText,
  Bookmark,
  Settings,
  // Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/useRedux";
import { logOut } from "@/redux/features/auth/authSlice";
// import { MdOutlineSupportAgent } from "react-icons/md";

const menu = [
  {
    label: "My CV",
    path: "/my-account/cvs",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    label: "My Applications",
    path: "/my-account/applications",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    label: "Saved Jobs",
    path: "/my-account/saved-jobs",
    icon: <Bookmark className="h-4 w-4" />,
  },
  {
    label: "Settings",
    path: "/my-account/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

interface MyAccountSidebarProps {
  onItemClick?: () => void;
}

export default function MyAccountSidebar({
  onItemClick,
}: MyAccountSidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    handleItemClick();
  };

  const isMobile = !!onItemClick;

  return (
    <aside
      className={cn(
        "flex w-full flex-col bg-background-lightgray",
        isMobile
          ? "h-full px-4"
          : "rounded-2xl border sticky top-20 border-border-primary max-w-[324px] min-h-[calc(100vh-111px)] h-full pt-12 px-6"
      )}
    >
      <div>
        <nav className="space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleItemClick}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-basic transition-colors",
                  isActive
                    ? "bg-[#205CA5] text-white"
                    : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button at bottom */}
      <div className="pt-4">
        <Button
          variant="default"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </aside>
  );
}
