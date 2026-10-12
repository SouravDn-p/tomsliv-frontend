import { useGetUserAppliedJobsQuery } from "@/redux/features/jobApplication/jobAppliction.Api";
import ApplicationCard from "./ApplicationCard";
import { ErrorMessage } from "@/common/ErrorMessage";
import { ApplicationCardSkeleton } from "@/components/Reuseable/loading/ApplicationCardSkeleton";
import { useState, useEffect } from "react";
import PageHeader from "@/components/Reuseable/PageHeader";

export default function MyApplication() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const [searchTerm, setSearchTerm] = useState("");

  // Add debug logging to see what parameters are being sent
  useEffect(() => {
    console.log("Query parameters:", {
      page: currentPage,
      limit,
      search: searchTerm,
    });
  }, [currentPage, limit, searchTerm]);

  const { data, error, isLoading, isFetching, refetch } =
    useGetUserAppliedJobsQuery(
      {
        page: currentPage,
        limit,
        search: searchTerm,
        sortOption: "mostRecent",
      },
      {
        // Add refetchOnMountOrArgChange to ensure data is refetched when args change
        refetchOnMountOrArgChange: true,
      }
    );

  const handlePageChange = (page: number) => {
    // console.log("Changing page from", currentPage, "to", page);
    setCurrentPage(page);
    // Force refetch when changing page
    refetch();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log("Search term changed to:", value);
    setSearchTerm(value);
    setCurrentPage(1);
  };

  if (error) {
    console.error("Error fetching applications:", error);
    return <ErrorMessage />;
  }

  const applications = data?.data || [];
  const metaData = data?.metadata || {
    page: currentPage,
    limit: 6,
    total: 0,
    totalPage: 1,
  };

  // console.log("Current data:", {
  //   applications: applications.length,
  //   metadata: metaData,
  //   currentPage,
  //   totalPages: metaData.totalPage,
  // });

  const totalApplications = metaData.total || 0;
  const totalPages = metaData.totalPage || 1;

  const currentLimit = metaData.limit || limit;

  const startIndex = Math.min(
    (currentPage - 1) * currentLimit + 1,
    totalApplications
  );
  const endIndex = Math.min(currentPage * currentLimit, totalApplications);

  // Show loading for both initial load and refetch
  const showLoading = isLoading || isFetching;

  return (
    <div className="mb-12 lg:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <PageHeader title="Recent Applications" />
        {/* Search Input Only */}
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-64 px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute right-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {showLoading ? (
        <div className="space-y-4 sm:space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <ApplicationCardSkeleton key={index} />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg border border-gray-200">
          <svg
            className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">
            No applications found
          </h3>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">
            {searchTerm
              ? "No applications match your search criteria."
              : "You haven't applied to any jobs yet."}
          </p>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-4 sm:space-y-6">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>

          {/* Pagination - Only show if we have multiple pages */}
          {totalPages > 1 && (
            <div className="mt-6 sm:mt-8">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2">
                {/* Previous Button */}
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
                  {/* Show first page if not already shown */}
                  {currentPage > 3 && totalPages > 5 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className={`px-3 py-2 min-w-[36px] sm:min-w-[40px] text-sm sm:text-base border rounded-lg ${
                          currentPage === 1
                            ? "bg-blue-600 text-white border-blue-600"
                            : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                      >
                        1
                      </button>
                      {currentPage > 4 && (
                        <span className="px-1 sm:px-2 text-gray-500">...</span>
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

                  {/* Show last page if not already shown */}
                  {currentPage < totalPages - 2 && totalPages > 5 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <span className="px-1 sm:px-2 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-3 py-2 min-w-[36px] sm:min-w-[40px] text-sm sm:text-base border rounded-lg ${
                          currentPage === totalPages
                            ? "bg-blue-600 text-white border-blue-600"
                            : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                {/* Next Button */}
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

              {/* Page Info */}
              <div className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
                <div className="mb-1">
                  Showing {startIndex} to {endIndex} of {totalApplications}{" "}
                  applications
                </div>
              </div>
            </div>
          )}

          {/* Show total count when no pagination needed */}
          {totalPages === 1 && totalApplications > 0 && (
            <div className="text-center text-gray-500 text-sm mt-4">
              Showing {totalApplications} application
              {totalApplications > 1 ? "s" : ""}
            </div>
          )}
        </>
      )}
    </div>
  );
}
