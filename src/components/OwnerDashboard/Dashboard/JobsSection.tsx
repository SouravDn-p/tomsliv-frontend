import { FiExternalLink, FiFileText, FiPhone, FiX } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useGetAllFarmJobsQuery } from "@/redux/features/Farmowner/JobsApi";
import { getStatusBadge } from "@/utils/getStatusBadge";
import { timeAgo } from "@/utils/timeAgo";
import { Button } from "@/components/ui/button";
import JobCardSkeletonS from "@/components/Reuseable/loading/JobCardSkeletonS";
import { ErrorMessage } from "@/common/ErrorMessage";
import {
  useCompareTowCvMutation,
  useGetAllCvForFarmQuery,
} from "@/redux/features/CV/cv.Api";
import { LinkButton } from "@/common/LinkButton";
import { Eye } from "lucide-react";
import { useState } from "react";
import { CVItem, CVComparisonResult } from "@/redux/features/CV/Cv.type";
import CVComparisonModal from "./CVComparisonModal";

const JobsSection = () => {
  const [selectedCvs, setSelectedCvs] = useState<Record<string, CVItem>>({});
  const [compareCvs, { isLoading: isComparing }] = useCompareTowCvMutation();
  const [comparisonResult, setComparisonResult] = useState<
    CVComparisonResult["data"] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCvClick = (cv: CVItem) => {
    setSelectedCvs((prev) => {
      const newSelected = { ...prev };

      // If already selected, remove it
      if (newSelected[cv.id]) {
        delete newSelected[cv.id];
        return newSelected;
      }

      // If not selected and we have less than 2, add it
      if (Object.keys(newSelected).length < 2) {
        newSelected[cv.id] = cv;
        return newSelected;
      }

      return prev;
    });
  };

  const handleRemoveCv = (applicationId: string) => {
    setSelectedCvs((prev) => {
      const newSelected = { ...prev };
      delete newSelected[applicationId];
      return newSelected;
    });
  };
  const handleCompare = async () => {
    try {
      const cvIds = Object.keys(selectedCvs);
      const requestData = {
        cvId1: cvIds[0],
        cvId2: cvIds[1],
      };

      // console.log("Sending compare request:", requestData);
      const result = await compareCvs(requestData).unwrap();
      // console.log("Compare result:", result);

      if (result.success && result.data) {
        setComparisonResult(result.data);
        setIsModalOpen(true);
      }

      setSelectedCvs({});
    } catch (error) {
      console.error("Failed to compare CVs:", error);
    }
  };

  const selectedCount = Object.keys(selectedCvs).length;
  const isCompareDisabled = selectedCount !== 2 || isComparing;

  const { data, isLoading, error, isFetching } = useGetAllFarmJobsQuery({
    search: "",
    page: 1,
    limit: 3,
    status: "ACTIVE",
  });

  const {
    data: recentCVData,
    isLoading: recentCVLoading,
    error: recentCVError,
  } = useGetAllCvForFarmQuery();

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="flex flex-col gap-8 bg-gray-50 min-h-screen">
      {/* Active Jobs Section */}
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Active Jobs ({data?.data?.length || 0})
          </h2>
          <LinkButton
            to={"/owner-dashboard/my-jobs"}
            className="text-primary-blue hover:text-blue-700 font-medium text-sm sm:text-base flex items-center gap-1 cursor-pointer transition-all hover:gap-2 w-fit"
          >
            Manage
            <FiExternalLink className="w-4 h-4" />
          </LinkButton>
        </div>

        {/* Active Jobs Grid */}
        {isLoading || isFetching ? (
          <JobCardSkeletonS count={3} />
        ) : data?.data?.length === 0 ? (
          // No active jobs message
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-gray-300 rounded-2xl bg-white">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FiExternalLink className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No active jobs found
            </h3>
            <p className="text-gray-500 max-w-md mb-6">
              You don't have any active job postings. Create new job postings to
              attract applicants.
            </p>
            <LinkButton
              to="/owner-dashboard/my-jobs"
              variant="primary"
              className="min-w-35"
            >
              <FiExternalLink className="w-4 h-4 mr-2" />
              Create New Job
            </LinkButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {data?.data?.map((job, index) => {
              const statusBadge = getStatusBadge(job.status);
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl border border-[#98B4D6] bg-white hover:shadow-lg hover:border-[#6A92C3] transition-all cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="w-full space-y-3 sm:space-y-4">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                          {job.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-sm text-[10px] sm:text-xs font-medium w-fit ${statusBadge.bg} ${statusBadge.text}`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3 sm:mt-4 text-xs sm:text-sm text-paragraph-secondary-gray">
                        <span className="truncate mr-2">{job.location}</span>
                        <span className="shrink-0">
                          {timeAgo(job.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <LinkButton
                    to={`/jobs/${job.id}`}
                    className="bg-[#F2F3F5] text-primary-blue w-full rounded-lg text-sm sm:text-base mt-auto"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    View job description
                  </LinkButton>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Uploaded CVs Section */}
      <div className="w-full">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
              Recently Uploaded CVs
            </h2>
            <Button
              onClick={handleCompare}
              disabled={isCompareDisabled}
              variant="primary"
              className="w-full sm:w-auto min-w-30 hidden sm:block font-bold py-2.5 sm:py-2"
            >
              {isComparing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Comparing...
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <FiFileText className="w-4 h-4" />
                  Compare {selectedCount > 0 ? `(${selectedCount})` : ""}
                </div>
              )}
            </Button>
          </div>

          {/* Selection info - mobile optimized floating selection indicator could be better, but for now refining this bar */}
          {selectedCount > 0 && (
            <div className="bg-blue-50/50 border border-blue-100 p-2 rounded-xl">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <span className="text-xs font-bold text-blue-800 whitespace-nowrap px-1">
                  Selected:
                </span>
                <div className="flex items-center gap-2">
                  {Object.values(selectedCvs).map((cv) => (
                    <div
                      key={cv.id}
                      className="flex items-center gap-1.5 bg-white text-[#205CA5] px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-blue-100 whitespace-nowrap"
                    >
                      <span>
                        {cv.firstName} {cv.lastName}
                      </span>
                      <button
                        onClick={() => handleRemoveCv(cv.id)}
                        className="hover:bg-blue-50 rounded-full p-0.5 ml-0.5 transition-colors text-blue-400 hover:text-blue-600"
                        disabled={isComparing}
                      >
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Show error for CVs */}
        {recentCVError && <ErrorMessage />}

        {/* CVs Grid with Loading State */}
        {recentCVLoading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {/* Skeleton for CV Cards */}
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-8 p-6 sm:p-8 lg:p-10 rounded-2xl border bg-white border-gray-200"
              >
                {/* Header Skeleton omitted for brevity, keeping existing skeleton logic */}
                <div className="h-40 bg-gray-50 animate-pulse rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : recentCVData?.data?.length === 0 ? (
          // No CVs message
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-gray-300 rounded-2xl bg-white">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FiFileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No CVs uploaded yet
            </h3>
            <p className="text-gray-500 max-w-md mb-6">
              CVs from applicants will appear here once they start applying to
              your job postings.
            </p>
            <LinkButton
              to="/owner-dashboard/my-jobs"
              variant="primary"
              className="min-w-35"
            >
              <FiExternalLink className="w-4 h-4 mr-2" />
              View Active Jobs
            </LinkButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {recentCVData?.data?.map((cv, index) => {
              const isSelected = !!selectedCvs[cv.id];
              const isDisabled = !isSelected && selectedCount >= 2;

              return (
                <div
                  key={index}
                  className={`flex flex-col gap-5 sm:gap-7 p-5 sm:p-8 lg:p-10 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500 ring-opacity-10"
                      : isDisabled
                        ? "border-gray-200 opacity-60 grayscale-[0.5] cursor-not-allowed"
                        : "border-[#E4E4E4] hover:border-blue-300"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                          {cv.firstName} {cv.lastName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          {/* <span
                            className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-blue-50 text-[#205CA5]"
                            }`}
                          >
                            {cv.jobType}
                          </span> */}

                          {isSelected && (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                              <span className="size-1 bg-green-600 rounded-full animate-pulse"></span>
                              Selected
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-gray-800 mb-4 truncate font-semibold opacity-80">
                        {cv.jobTitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs truncate sm:text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <HiOutlineLocationMarker className="w-4 h-4 text-blue-500" />
                          <span>{cv.location}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <BiCalendar className="w-4 h-4 text-blue-500" />
                          <span>
                            {new Date(cv.appliedAt).toLocaleDateString("en-GB")}
                          </span>
                        </div>

                        {cv.phone && (
                          <div className="flex items-center gap-1.5">
                            <FiPhone className="w-4 h-4 text-blue-500" />
                            <span>{cv.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 bg-gray-50 p-2 rounded-lg border border-gray-100 min-w-[80px]">
                      {cv.experiences?.[0] ? (
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-700">
                            {Math.max(
                              0,
                              new Date(
                                cv.experiences[0].endDate
                              ).getFullYear() -
                                new Date(
                                  cv.experiences[0].startDate
                                ).getFullYear()
                            )}
                          </div>
                          <div className="text-[10px] font-bold text-gray-500 uppercase">
                            years exp
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-700">
                            0
                          </div>
                          <div className="text-[10px] font-bold text-gray-500 uppercase">
                            years exp
                          </div>
                        </div>
                      )}
                    </div> */}
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 italic">
                    "{cv.summary}"
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-2 sm:mt-0">
                    <LinkButton
                      to={`/owner-dashboard/all-applicant/${cv.applicationId}`}
                      className="flex-1 justify-center bg-[#205CA5] hover:bg-[#1a4b86] text-white py-2.5 font-bold"
                    >
                      <Eye className="w-4 h-4" />
                      View Profile
                    </LinkButton>
                    <Button
                      onClick={() => !isDisabled && handleCvClick(cv)}
                      variant={isSelected ? "default" : "outline"}
                      disabled={isDisabled}
                      className={`flex-1 py-2.5 font-bold ${
                        isSelected
                          ? "bg-rose-500 hover:bg-rose-600 border-none text-white shadow-sm"
                          : "border-[#205CA5] text-[#205CA5] hover:bg-blue-50"
                      }`}
                    >
                      <FiFileText className="w-4 h-4" />
                      {isSelected ? "Remove Compare" : "Select to Compare"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Button
          onClick={handleCompare}
          disabled={isCompareDisabled}
          variant="primary"
          className="w-full md:hidden mt-1.5   sm:w-auto min-w-30 font-bold py-2.5 sm:py-2"
        >
          {isComparing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Comparing...
            </span>
          ) : (
            <>
              <FiFileText className="w-4 h-4" />
              Compare {selectedCount > 0 ? `(${selectedCount})` : ""}
            </>
          )}
        </Button>
      </div>

      <CVComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        result={comparisonResult}
      />
    </div>
  );
};

export default JobsSection;
