import { useGetJobSeekersQuery } from "@/redux/features/adminDashboard/adminDashboardApi";
import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

interface JobSeeker {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  totalJobsApplied: number;
  experience: string;
  highestEducation: string;
  createdAt: string;
  updatedAt: string;
}

const JobSeeker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError } = useGetJobSeekersQuery({
    page: currentPage,
    limit: limit,
    search: debouncedSearch,
  });

  const jobSeekers = data?.data || [];
  const metadata = data?.metadata || {
    total: 0,
    totalPage: 1,
    page: 1,
    limit: 10,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < metadata.totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading job seekers data
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative w-full min-w-lg lg:max-w-3xl">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-100 pl-3 pr-10 py-3 text-sm md:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-6">
          {/* Table */}
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
              <div className="xl:col-span-4 w-full">
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-[800px] w-full text-sm">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left font-medium text-gray-700">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left font-medium text-gray-700">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left font-medium text-gray-700">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left font-medium text-gray-700 whitespace-nowrap">
                          Jobs Applied
                        </th>
                        <th className="px-6 py-4 text-left font-medium text-gray-700 whitespace-nowrap">
                          Last Updated
                        </th>
                        <th className="px-6 py-4 text-left font-medium text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {jobSeekers.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-8 text-center text-gray-500"
                          >
                            No job seekers found
                          </td>
                        </tr>
                      ) : (
                        jobSeekers.map((jobSeeker: JobSeeker) => (
                          <tr
                            key={jobSeeker.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                              {jobSeeker.name}
                            </td>

                            <td className="px-6 py-4 text-gray-700">
                              {jobSeeker.email}
                            </td>

                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 text-xs font-medium rounded-full ${
                                  jobSeeker.status === "ACTIVE"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {jobSeeker.status}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-gray-700">
                              <span className="font-medium">
                                {jobSeeker.totalJobsApplied}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                              {formatDate(jobSeeker.updatedAt)}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              <Link
                                to={`${jobSeeker.id}`}
                                className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-100"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {metadata.total > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * limit + 1} to{" "}
                  {Math.min(currentPage * limit, metadata.total)}
                </span>{" "}
                of <span className="font-medium">{metadata.total}</span> entries
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 border rounded-lg text-sm ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Prev
                </button>

                <div className="min-w-[50px] text-center border px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-gray-50">
                  {metadata.page} / {metadata.totalPage}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === metadata.totalPage}
                  className={`px-3 py-1.5 border rounded-lg text-sm ${
                    currentPage === metadata.totalPage
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeeker;
