import { useGetAllFarmsQuery } from "@/redux/features/adminDashboard/adminDashboardApi";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Employer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 6;

  // Fetch farms from RTK Query
  const { data, isLoading, isError } = useGetAllFarmsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search,
    status: "ACTIVE",
  });

  const farms = data?.data || [];
  const totalPages = data?.metadata?.totalPage || 1;
  const navigate = useNavigate();

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (isLoading) return <p>Loading farms...</p>;
  if (isError) return <p>Error fetching farms.</p>;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="hidden md:block relative w-full min-w-lg lg:max-w-3xl">
        <input
          type="text"
          placeholder="Search farms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 pl-3 pr-10 py-3 text-sm md:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Table */}
      <div className="p-5 border border-[#E4E4E4] rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
          <div className="xl:col-span-4 w-full">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-[800px] w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-gray-700 whitespace-nowrap">
                      Farm Name
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Owner
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700 whitespace-nowrap">
                      Jobs Posted
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {farms.map((farm) => (
                    <tr
                      key={farm.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {farm.farmName}
                      </td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                        {farm.employeeName || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {farm.employeeEmail || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            farm.status === "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {farm.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {farm.totalJobsPosted}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`${farm.id}`)}
                          className="px-3 cursor-pointer whitespace-nowrap py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>{" "}
        </div>
        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{farms.length}</span> of{" "}
            <span className="font-medium">{data?.metadata?.total}</span> entries
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
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 border rounded-lg text-sm ${
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

export default Employer;
