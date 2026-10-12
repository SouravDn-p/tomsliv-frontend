import { useGetSavedJobsQuery } from "@/redux/features/Job/userSaveJob";
import JobCard from "../Home/LatestJobs/JobCard";
import JobCardSkeleton from "../Reuseable/loading/JobCardSkeleton";
import { ErrorMessage } from "@/common/ErrorMessage";
import { EmptyState } from "../Reuseable/EmptyState";
import { LinkButton } from "@/common/LinkButton";
import { useState } from "react";
import PageHeader from "../Reuseable/PageHeader";

export default function SaveJobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useGetSavedJobsQuery({
    page: currentPage,
    limit: limit,
  });

  if (error) {
    return <ErrorMessage />;
  }

  const jobs = data?.data || [];
  const metaData = data?.metadata || {
    page: currentPage,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  const totalPages = metaData.totalPage || 1;
  const totalJobs = metaData.total || 0;

  const startIndex = Math.min((currentPage - 1) * limit + 1, totalJobs);
  const endIndex = Math.min(currentPage * limit, totalJobs);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="lg:px-4 px-0 pb-12">
      <PageHeader title="Saved Applications" />`
      <div>
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className="grid lg:grid-cols-1 gap-6">
              {jobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  detailsPath={`/my-account/saved-jobs/${job.id}`}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-full sm:w-auto px-4 py-2 text-sm sm:text-base border rounded-lg ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed border-gray-300"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                    {/* First Page */}
                    {currentPage > 3 && totalPages > 5 && (
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className="px-3 py-2 min-w-[36px] sm:min-w-[40px] text-sm sm:text-base border rounded-lg text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        >
                          1
                        </button>
                        {currentPage > 4 && (
                          <span className="px-1 sm:px-2 text-gray-500">
                            ...
                          </span>
                        )}
                      </>
                    )}

                    {/* Page Numbers */}
                    {(() => {
                      const pageButtons = [];
                      const startPage = Math.max(1, currentPage - 2);
                      const endPage = Math.min(totalPages, startPage + 4);

                      for (
                        let pageNum = startPage;
                        pageNum <= endPage;
                        pageNum++
                      ) {
                        pageButtons.push(
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 min-w-[36px] sm:min-w-[40px] text-sm sm:text-base border rounded-lg ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white border-blue-600"
                                : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      return pageButtons;
                    })()}

                    {/* Last Page */}
                    {currentPage < totalPages - 2 && totalPages > 5 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="px-1 sm:px-2 text-gray-500">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="px-3 py-2 min-w-[36px] sm:min-w-[40px] text-sm sm:text-base border rounded-lg text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-full sm:w-auto px-4 py-2 text-sm sm:text-base border rounded-lg ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed border-gray-300"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <div className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
                  <div className="mb-1">
                    Showing {startIndex} to {endIndex} of {totalJobs} jobs
                  </div>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No Saved Jobs"
            description="You haven’t saved any jobs yet. Start exploring and save your favorite opportunities!"
            action={
              <LinkButton variant={"primary"} to={"/jobs"}>
                Browse Jobs
              </LinkButton>
            }
          />
        )}
      </div>
    </div>
  );
}
