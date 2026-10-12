/* eslint-disable @typescript-eslint/no-explicit-any */
// import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";
import {
  ClipboardCheck,
  Users,
  TrendingUp,
  Briefcase,
  Star,
} from "lucide-react";
import { useGetFarmOwnerStatsQuery } from "@/redux/features/Farmowner/JobsApi";
import { ErrorMessage } from "@/common/ErrorMessage";
import DashboardCardSkeleton from "@/components/Reuseable/loading/DashboardCardSkeleton";

const DashboardCard = () => {
  const { data: statsData, isLoading, isError } = useGetFarmOwnerStatsQuery();

  if (isLoading) return <DashboardCardSkeleton />;
  if (isError || !statsData) return <ErrorMessage />;

  const { activeJobs, totalApplicants, shortlisted, averageJobFit } =
    statsData.data;

  // Get icon based on label
  const getIcon = (label: string) => {
    switch (label) {
      case "Active Jobs":
        return <Briefcase className="w-6 h-6" />;
      case "Total Applicants":
        return <Users className="w-6 h-6" />;
      case "Shortlisted Applicants":
        return <Star className="w-6 h-6" />;
      case "Average Job Fit Score":
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <ClipboardCheck className="w-6 h-6" />;
    }
  };

  // Get trend icon
  // const getTrendIcon = (trend: string) => {
  //   switch (trend) {
  //     case "up":
  //       return <FaArrowUp />;
  //     case "down":
  //       return <FaArrowDown />;
  //     case "neutral":
  //       return <FaMinus />;
  //     default:
  //       return <FaMinus />;
  //   }
  // };

  // Get color based on trend
  // const getTrendColor = (trend: string) => {
  //   switch (trend) {
  //     case "up":
  //       return "text-green-600";
  //     case "down":
  //       return "text-red-600";
  //     case "neutral":
  //       return "text-gray-500";
  //     default:
  //       return "text-gray-500";
  //   }
  // };

  // Get background color for icon
  const getIconBgColor = (label: string) => {
    switch (label) {
      case "Active Jobs":
        return "bg-[#40B3EA] text-white";
      case "Total Applicants":
        return "bg-[#41BD5D] text-white";
      case "Shortlisted Applicants":
        return "bg-[#40B3EA] text-white";
      case "Average Job Fit Score":
        return "bg-[#41BD5D] text-white";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  // Card component
  const StatCard = ({ stat }: { stat: any }) => {
    // const trendColor = getTrendColor(stat.trend);
    const iconBgColor = getIconBgColor(stat.label);

    return (
      <div className="w-full  xl:p-5 p-3 bg-[#F3F3F3] rounded-2xl flex flex-col justify-between  hover:shadow transition-shadow duration-300">
        {/* Top Row */}
        <div className="space-y-3">
          <div
            className={`${iconBgColor} w-12 h-12 rounded-xl p-3 flex items-center justify-center`}
          >
            {getIcon(stat.label)}
          </div>

          <h1 className="text-sm xl:text-lg leading-[160%] font-medium text-gray-800">
            {stat.label}
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="space-y-2">
          <div className="flex items-center">
            <h2 className="text-lg xl:text-xl font-bold text-gray-900">
              {stat.formattedValue}
            </h2>
          </div>

          {/* Trend Indicator */}
          {/* <div
            className={`flex items-center gap-2 text-sm font-medium ${trendColor}`}
          >
            {stat.change !== undefined && (
              <>
                <span className="flex items-center">
                  {getTrendIcon(stat.trend)}
                </span>
                <span>{stat.changeLabel}</span>
              </>
            )}
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 w-full">
      {/* Active Jobs Card */}
      <StatCard stat={activeJobs} />

      {/* Total Applicants Card */}
      <StatCard stat={totalApplicants} />

      {/* Shortlisted Applicants Card */}
      <StatCard stat={shortlisted} />

      {/* Average Job Fit Score Card */}
      <StatCard stat={averageJobFit} />
    </div>
  );
};

export default DashboardCard;
