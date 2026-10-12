import { Plus } from "lucide-react";
import JobDashboard from "./JobDashboard";
import { LinkButton } from "@/common/LinkButton";
import { useGetFarmOwnerStatsQuery } from "@/redux/features/Farmowner/JobsApi";
import DashboardCardSkeleton from "@/components/Reuseable/loading/DashboardCardSkeleton";
import { ErrorMessage } from "@/common/ErrorMessage";
import PageHeader from "@/components/Reuseable/PageHeader";

const MyJobs = () => {
  const { data, isLoading, isError } = useGetFarmOwnerStatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isError) return <ErrorMessage />;

  const statusData = Object.values(data?.data || {}).map((stat) => ({
    title: stat.label,
    amount: stat.formattedValue,
    change: stat.changeLabel,
    trend: stat.trend,
    unit: "",
  }));

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="My Jobs"
          description="Manage your job postings and track applications"
        />

        <LinkButton to={"create"} className="bg-[#205CA5]" variant={"primary"}>
          <Plus className="w-5 h-5" />
          Create new job
        </LinkButton>
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <DashboardCardSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {statusData.map((single) => {
            // const isNegative = single.trend === "down";
            // const isNeutral = single.trend === "neutral";
            // const changeColor = isNeutral
            //   ? "#6c757d"
            //   : isNegative
            //     ? "#E35A5F"
            //     : "#12CC1E";

            return (
              <div
                key={single.title}
                className="w-full  p-6 border border-divider-lightBlue rounded-2xl flex flex-col justify-between  space-y-4 transition-all hover:shadow"
              >
                {/* Top Section */}
                <div className="space-y-2">
                  <h1
                    className="text-lg leading-[160%] font-medium truncate"
                    style={{ color: "#343A40" }}
                  >
                    {single.title}
                  </h1>
                </div>

                {/* Bottom Section */}
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
                    {single.amount}
                  </h2>

                  {/* <div className="flex items-center gap-1 text-sm">
                    {single.change && (
                      <>
                        {isNeutral ? (
                          <Minus
                            className="transition-transform w-4 h-4"
                            style={{ color: changeColor }}
                          />
                        ) : isNegative ? (
                          <ChevronDown
                            className="transition-transform w-4 h-4"
                            style={{ color: changeColor }}
                          />
                        ) : (
                          <ChevronUp
                            className="transition-transform w-4 h-4"
                            style={{ color: changeColor }}
                          />
                        )}
                        <span style={{ color: changeColor }}>
                          {single.change}
                        </span>
                      </>
                    )}

                    <span className="text-gray-500 ml-1">{single.unit}</span>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Jobs Section */}
      <JobDashboard />
    </div>
  );
};

export default MyJobs;
