import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";
import { useGetAdminStatsQuery } from "@/redux/features/adminDashboard/adminDashboardApi";

// import userIcon from "@/assets/dashboard/a.png";
// import farmIcon from "@/assets/dashboard/a.png";
// import jobIcon from "@/assets/dashboard/a.png";
// import revenueIcon from "@/assets/dashboard/a.png";

const DashboardCard = () => {
  const { data, isLoading, error } = useGetAdminStatsQuery();

  /* Loading State */
  if (isLoading) {
    return (
      <div className="w-full text-center py-10 text-gray-500 text-sm">
        Loading dashboard statistics...
      </div>
    );
  }

  /* Error State */
  if (error || !data?.success) {
    return (
      <div className="w-full text-center py-10 text-red-500 text-sm">
        Failed to load dashboard statistics
      </div>
    );
  }

  const statsData = data.data;

  const cardData = [
    {
      title: statsData.totalUsers.label,
      amount: statsData.totalUsers.formattedValue,
      change: statsData.totalUsers.change,
      // icon: userIcon,
      color: "#12335B",
      trend: statsData.totalUsers.trend,
    },
    {
      title: statsData.totalFarms.label,
      amount: statsData.totalFarms.formattedValue,
      change: statsData.totalFarms.change,
      // icon: farmIcon,
      color: "#2E5BFF",
      trend: statsData.totalFarms.trend,
    },
    {
      title: statsData.totalJobs.label,
      amount: statsData.totalJobs.formattedValue,
      change: statsData.totalJobs.change,
      // icon: jobIcon,
      color: "#00C853",
      trend: statsData.totalJobs.trend,
    },
    {
      title: statsData.revenue.label,
      amount: statsData.revenue.formattedValue,
      change: statsData.revenue.change,
      // icon: revenueIcon,
      color: "#FF6B6B",
      trend: statsData.revenue.trend,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
      {cardData.map((single) => {
        const isPositive = single.change > 0;
        const isNegative = single.change < 0;

        const changeColor = isPositive
          ? "#12CC1E"
          : isNegative
          ? "#E35A5F"
          : "#6B7280";

        const TrendIcon = isPositive
          ? FaArrowUp
          : isNegative
          ? FaArrowDown
          : FaMinus;

        return (
          <div
            key={single.title}
            className="w-full h-[165px] p-5 sm:p-6 bg-white rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Content */}
            <div className="space-y-3">
              <h1 className="text-[16px] leading-[160%] font-medium text-gray-600">
                {single.title}
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.68px] text-gray-900">
                {single.amount}
              </h2>

              {/* Change Indicator */}
              <div className="flex items-center gap-1 text-sm">
                <TrendIcon style={{ color: changeColor }} />
                <span style={{ color: changeColor }} className="font-medium">
                  {Math.abs(single.change)}%
                </span>
                <span className="text-gray-500 ml-1">from last period</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCard;
