import { LinkButton } from "@/common/LinkButton";
import DefaultProfileCard from "@/components/Reuseable/DefaultProfileCard";
import TableSkeleton from "@/components/Reuseable/loading/TableSkeleton";

interface ApplicationData {
  id: string;
  userId: string;
  jobId: string;
  cvId: string;
  isAppliedWithSavedCV: boolean;
  status: "NEW" | "SHORTLISTED" | "REVIEWED" | "REJECTED";
  appliedAt: string;
  job: {
    id: string;
    title: string;
    role: string;
  };
  cv: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    summary: string;
    jobTitle: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
    profilePicture?: {
      url: string;
    };
  };
  applicationAIResults?: {
    jobFitScore: number;
    summary: string;
  };
}

interface AllApplicantsManagementTableProps {
  data: ApplicationData[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isFetching: boolean;
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onPageChange: (page: number) => void;
}

const AllApplicantsManagementTable: React.FC<
  AllApplicantsManagementTableProps
> = ({
  data,
  isLoading,
  currentPage,
  totalPages,
  isFetching,
  totalItems,
  selectedIds,
  onToggleSelection,
  onSelectAll,
  onPageChange,
}) => {
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

    const handlePrev = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const getStatusDisplay = (status: string) => {
      switch (status) {
        case "NEW":
          return "New";
        case "SHORTLISTED":
          return "Shortlisted";
        case "REVIEWED":
          return "Reviewed";
        case "REJECTED":
          return "Rejected";
        default:
          return status;
      }
    };

    const getStatusClass = (status: string) => {
      switch (status) {
        case "SHORTLISTED":
          return "bg-[#00A4261A] text-[#00A426]";
        case "REVIEWED":
          return "bg-[#EAA4221A] text-[#EAA422]";
        case "NEW":
          return "bg-[#009DE81A] text-[#009DE8]";
        case "REJECTED":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    };

    return (
      <div>
        {/* Table & Card View */}
        {isLoading || isFetching ? (
          <TableSkeleton columns={7} rows={10} />
        ) : (
          <div className=" md:p-4 md:border md:bg-white min-h-[500px] border-[#E4E4E4] rounded-lg overflow-hidden">
            {/* Card View for Mobile/Tablet/Laptop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:hidden">
              {data.length === 0 ? (
                <div className="col-span-full py-10 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                  No applications found
                </div>
              ) : (
                data.map((application) => (
                  <div
                    key={application.id}
                    className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative ${selectedIds.includes(application.id)
                      ? "border-blue-500 bg-blue-50/10"
                      : "border-[#E4E4E4]"
                      }`}
                  >
                    <div className=" mb-1.5 flex justify-end">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(application.id)}
                        onChange={() => onToggleSelection(application.id)}
                        className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {application.user.profilePicture?.url ? (
                          <img
                            src={application.user.profilePicture.url}
                            alt={application.user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg border-2 border-blue-100">
                            {application.user.name[0]}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-900 leading-tight">
                            {application.user.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {application.cv.email}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {getStatusDisplay(application.status)}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Position:</span>
                        <span className="font-medium text-gray-900">
                          {application.job.title}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Fit Score:</span>
                        <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {application.applicationAIResults?.jobFitScore || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Applied On:</span>
                        <span className="text-gray-700">
                          {formatDate(application.appliedAt)}
                        </span>
                      </div>
                    </div>

                    <LinkButton
                      to={`/owner-dashboard/all-applicant/${application.id}`}
                      className="w-full justify-center bg-[#205CA5] hover:bg-[#1a4b86] text-white py-2.5 rounded-lg font-semibold transition-colors"
                    >
                      View Details
                    </LinkButton>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden xl:block overflow-x-auto rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC]">
                  <tr className="text-[#64748B] font-semibold border-b border-[#E2E8F0]">
                    <th className="px-4 py-4 text-left w-10">
                      <input
                        type="checkbox"
                        checked={
                          data.length > 0 && selectedIds.length === data.length
                        }
                        onChange={() => onSelectAll(data.map((app) => app.id))}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-4 text-left min-w-[200px]">
                      Applicant
                    </th>
                    <th className="px-4 py-4 text-left min-w-[150px]">
                      Position
                    </th>
                    <th className="px-4 py-4 text-left">Fit Score</th>
                    <th className="px-4 py-4 text-left max-w-[200px]">
                      Experience
                    </th>
                    <th className="px-4 py-4 text-left">Status</th>
                    <th className="px-4 py-4 text-left">Applied On</th>
                    <th className="px-4 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    data.map((application) => (
                      <tr
                        key={application.id}
                        className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(application.id)
                          ? "bg-blue-50/30"
                          : ""
                          }`}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(application.id)}
                            onChange={() => onToggleSelection(application.id)}
                            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {application.user.profilePicture?.url ? (
                              <img
                                src={application.user.profilePicture.url}
                                alt={application.user.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <DefaultProfileCard />
                            )}
                            <div className="max-w-[150px]">
                              <div
                                className="font-semibold text-gray-900 truncate"
                                title={application.user.name}
                              >
                                {application.user.name}
                              </div>
                              <div
                                className="text-xs text-gray-500 truncate"
                                title={application.cv.email}
                              >
                                {application.cv.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                          <div className="max-w-[150px]">
                            <div
                              className="font-medium truncate"
                              title={application.job.title}
                            >
                              {application.job.title}
                            </div>
                            <div
                              className="text-xs text-gray-500 truncate"
                              title={application.job.role}
                            >
                              {application.job.role}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="font-bold text-gray-900">
                            {application.applicationAIResults?.jobFitScore ||
                              "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700 max-w-[200px]">
                          <div
                            className="truncate"
                            title={application.cv.jobTitle || "Not specified"}
                          >
                            {application.cv.jobTitle || "Not specified"}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                              application.status
                            )}`}
                          >
                            {getStatusDisplay(application.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                          {formatDate(application.appliedAt)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <LinkButton
                            to={`/owner-dashboard/all-applicant/${application.id}`}
                            className="text-[#205CA5] hover:underline font-bold text-sm"
                          >
                            View
                          </LinkButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalItems > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              Showing <span className="font-medium">{startIndex}</span> to{" "}
              <span className="font-medium">{endIndex}</span> of{" "}
              <span className="font-medium">{totalItems}</span> entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 border rounded-lg text-sm ${currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
                  }`}
              >
                Prev
              </button>
              <div className="min-w-[50px] text-center border px-3 py-1.5 rounded-md text-sm  bg-gray-50">
                {currentPage} / {totalPages}
              </div>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 border rounded-lg text-sm ${currentPage === totalPages
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
    );
  };

export default AllApplicantsManagementTable;
