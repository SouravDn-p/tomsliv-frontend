import React, { useState } from "react";
import { useGetAllJobsForAdminQuery } from "@/redux/features/adminDashboard/adminDashboardApi";
import { Link } from "react-router-dom";

// Interface for API data structure
interface JobData {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  farmName: string;
  logUrl: string | null;
  employerName: string | null;
  employerEmail: string | null;
  totalApplications: number;
  createdAt: string;
  updatedAt: string;
}

// Interface for API response

const JobManagementTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch jobs data from API
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetAllJobsForAdminQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-4 sm:p-6">
        <div className="flex justify-center items-center h-48 sm:h-64">
          <div className="text-gray-500">Loading jobs...</div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-4 sm:p-6">
        <div className="flex justify-center items-center h-48 sm:h-64">
          <div className="text-red-500">
            Error loading jobs. Please try again.
          </div>
        </div>
      </div>
    );
  }

  // Check if data exists
  if (
    !apiResponse ||
    !apiResponse.success ||
    !apiResponse.data ||
    apiResponse.data.length === 0
  ) {
    return (
      <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-4 sm:p-6">
        <div className="flex justify-center items-center h-48 sm:h-64">
          <div className="text-gray-500">No jobs found.</div>
        </div>
      </div>
    );
  }

  const jobs: JobData[] = apiResponse.data;
  const metadata = apiResponse.metadata;
  const totalPages = metadata?.totalPage || 1;

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div>
      <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-4 sm:p-6">
        {/* Table */}
        <div className="grid grid-cols-1 gap-5">
          <div className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Farm Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Job Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Employer
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Applications
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Post Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                      {jobs.map((job) => (
                        <tr
                          key={job.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {/* Farm Name */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                                {job.farmName}
                              </span>
                            </div>
                          </td>

                          {/* Job Title */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {job.title}
                          </td>

                          {/* Employer */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {job.employerName || "N/A"}
                          </td>

                          {/* Contact */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {job.employerEmail || "N/A"}
                          </td>

                          {/* Location */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {job.location}
                          </td>

                          {/* Applications */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900">
                            {job.totalApplications}
                          </td>

                          {/* Post Date */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {formatDate(job.createdAt)}
                          </td>

                          {/* Action */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                            <Link
                              to={`${job.id}`}
                              className="text-blue-500 hover:text-blue-700 font-medium text-xs sm:text-sm"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
            Showing <span className="font-medium">{jobs.length}</span> of{" "}
            <span className="font-medium">{metadata?.total || 0}</span> entries
          </p>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 border rounded-lg text-xs sm:text-sm ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            <div className="min-w-15 sm:min-w-20 text-center border px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium text-gray-700 bg-gray-50">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 border rounded-lg text-xs sm:text-sm ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobManagementTable;
