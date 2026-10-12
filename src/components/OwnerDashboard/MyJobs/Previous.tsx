import { useGetAllFarmJobsQuery } from "@/redux/features/Farmowner/JobsApi";
import { timeAgo } from "@/utils/timeAgo";
import { Skeleton } from "@/components/ui/skeleton";
import { LinkButton } from "@/common/LinkButton";
import { AlertCircle, FileText } from "lucide-react"; // Import icons for states

export default function PreviousJobs() {
  const { data, isLoading, isFetching, isError } = useGetAllFarmJobsQuery({
    search: "",
    page: 1,
    limit: 10,
    status: "CLOSED",
  });

  // Show skeleton when loading
  if (isLoading || isFetching) {
    return (
      <div className="w-full lg:w-80 lg:shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
            Previous jobs
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4"
              >
                <div className="flex justify-between mb-2 sm:mb-3 items-center">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-6 w-16 rounded-lg ml-2" />
                </div>
                <div className="flex justify-between mb-3 sm:mb-4">
                  <Skeleton className="h-3 w-24 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
                <Skeleton className="w-full h-9 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="w-full lg:w-80 lg:shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
            Previous jobs
          </h3>
          <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" />
            </div>
            <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
              Failed to load jobs
            </h4>
            <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-[200px]">
              {"Something went wrong. Please try again."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#EFF4FF] hover:bg-gray-100 border border-gray-300 text-[#0D2745] rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty state (no data or empty array)
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="w-full lg:w-80 lg:shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
            Previous jobs
          </h3>
          <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
            </div>
            <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
              No previous jobs
            </h4>
            <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-[200px]">
              You don't have any closed jobs yet
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Original component content when data exists
  return (
    <div className="w-full lg:w-80 lg:shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
          Previous jobs
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {data.data.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4"
            >
              <div className="flex justify-between mb-2 sm:mb-3 items-center">
                <h4 className="font-medium text-gray-900 text-xs sm:text-sm flex-1">
                  {job.title}
                </h4>
                <span className="px-4 py-[5px] bg-[#E800001A] text-destructive text-xs font-medium rounded-lg ml-2 whitespace-nowrap">
                  Closed
                </span>
              </div>
              <div className="flex justify-between">
                <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  {job.applicants} applicants
                </div>
                <div className="text-xs text-gray-500 mb-3 sm:mb-4">
                  {timeAgo(job.createdAt)}
                </div>
              </div>
              <LinkButton
                to={`/jobs/${job.id}`}
                className="w-full px-3 py-2 bg-[#EFF4FF] hover:bg-gray-100 border border-gray-300 text-[#0D2745] rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
              >
                View Job Details
              </LinkButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
