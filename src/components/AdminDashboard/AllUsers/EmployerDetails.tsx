import { useGetFarmByIdQuery } from "@/redux/features/adminDashboard/adminDashboardApi";
import { useNavigate, useParams } from "react-router-dom";
import { FiMail, FiPhone, FiCalendar, FiMapPin } from "react-icons/fi";
import { format } from "date-fns";
import { formatDateMMDDYYYY } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { MdDoNotDisturb } from "react-icons/md";
import {
  Building,
  Calendar,
  Eye,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { LinkButton } from "@/common/LinkButton";

export default function EmployerDetails() {
  const { id } = useParams();
  const { data: farmResponse, isLoading, isError } = useGetFarmByIdQuery(id!);
  const navigate = useNavigate();

  // Note: You'll need to create this mutation hook in your API slice
  // const [updateFarmStatus, { isLoading: isUpdating }] = useToggleFarmStatusMutation();

  // const handleSuspendFarm = async (id: string) => {
  //   try {
  //     await updateFarmStatus(id);
  //     toast.success("Farm suspended successfully!");
  //   } catch (error: any) {
  //     toast.error(error?.data?.message || "Failed to suspend farm");
  //     console.error("Failed to suspend farm:", error);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F7F9FC]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading farm details...</p>
        </div>
      </div>
    );
  }

  if (isError || !farmResponse?.data) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F7F9FC]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">No data found</h2>
          <p className="text-gray-500 mt-2">Unable to load farm details.</p>
        </div>
      </div>
    );
  }

  const { data: farm } = farmResponse;

  // Format dates
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ACTIVE: { color: "bg-green-100 text-green-800", label: "Active" },
      INACTIVE: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
      SUSPENDED: { color: "bg-red-100 text-red-800", label: "Suspended" },
      PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "bg-gray-100 text-gray-800",
      label: status,
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 mb-4 hover:text-blue-600 transition-colors"
          >
            ← Back to employers
          </button>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-white bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              {farm.farmLogo ? (
                <img
                  src={farm.farmLogo}
                  className="w-full h-full rounded-full object-cover"
                  alt={farm.farmName}
                />
              ) : (
                <Building className="w-8 h-8 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl capitalize text-secondary-CobaltBlue font-bold">
                  {farm.farmName}
                </h1>
                {getStatusBadge(farm.status)}
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <FiMail className="text-gray-400" /> {farm.employeeEmail}
                </span>
                <span className="flex items-center gap-2">
                  <FiPhone className="text-gray-400" /> Contact:{" "}
                  {farm.employeeName}
                </span>
                {farm.location && (
                  <span className="flex items-center gap-2">
                    <FiMapPin className="text-gray-400" /> {farm.location}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400" /> Joined{" "}
                  {formatDate(farm.createdAt)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  {farm.lastLogin ? formatDate(farm.lastLogin) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            // onClick={() => handleSuspendFarm(farm.id)}
            className="bg-destructive text-white rounded-xl"
          >
            {/* {!isUpdating && <MdDoNotDisturb size={20} />} */}
            <MdDoNotDisturb size={20} />
            Suspend
            {/* {isUpdating && (
              <FaSpinner size={20} className="ml-2 animate-spin" />
            )} */}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <div className="space-y-6 flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col p-6 border-[#E2E8F0] border bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),_0_1px_2px_-1px_rgba(0,0,0,0.10)]">
              <h4 className="text-subheading-gray font-medium text-xl">
                Total Jobs
              </h4>
              <span className="text-[#515756] mt-2">{farm.totalJobs}</span>
            </div>
            <div className="flex flex-col p-6 border-[#E2E8F0] border bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),_0_1px_2px_-1px_rgba(0,0,0,0.10)]">
              <span className="text-subheading-gray font-medium text-xl">
                Active Jobs
              </span>
              <span className="text-[#515756] mt-2">
                {farm.totalActiveJobs}
              </span>
            </div>
            <div className="flex flex-col p-6 border-[#E2E8F0] border bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),_0_1px_2px_-1px_rgba(0,0,0,0.10)]">
              <span className="text-subheading-gray font-medium text-xl">
                Registered
              </span>
              <span className="text-[#515756] mt-2">
                {formatDateMMDDYYYY(farm.createdAt)}
              </span>
            </div>
            <div className="flex flex-col p-6 border-[#E2E8F0] border bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),_0_1px_2px_-1px_rgba(0,0,0,0.10)]">
              <span className="text-subheading-gray font-medium text-xl">
                Status
              </span>
              <span
                className={`mt-2 ${
                  farm.status === "ACTIVE"
                    ? "text-green-600"
                    : farm.status === "SUSPENDED"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {farm.status}
              </span>
            </div>
          </div>

          {/* Farm Information */}

          {/* Active Jobs Section */}
          {farm.recentActiveJobs && farm.recentActiveJobs.length > 0 && (
            <div className="">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  <h3>Active Jobs ({farm.totalActiveJobs || 0})</h3>
                </h3>
              </div>
              <div className="space-y-4">
                {farm.recentActiveJobs.map((job: any) => (
                  <div
                    key={job.id}
                    className="border-b bg-white rounded-xl border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between px-10 py-8   items-start">
                      <div className="flex-1 flex gap-8">
                        <div className="flex-1">
                          <div className="flex justify-between  items-center">
                            <div>
                              <div className="flex gap-2.5">
                                <h4 className="font-medium text-gray-800">
                                  {job.title}
                                </h4>
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Active
                                </span>
                              </div>
                              <div className="flex flex-col  gap-2 mt-1">
                                <span className="text-sm text-gray-500">
                                  {job.location || "N/A"}
                                </span>
                                {/* <span className="text-sm text-gray-500">
                                  Posted {formatDate(job.createdAt)}
                                </span> */}
                              </div>
                              <div className="mt-8 flex flex-row gap-3">
                                <span className="flex items-center gap-2 text-[#262D2C] ">
                                  <Users className="text-[#205CA5]" size={16} />{" "}
                                  {job.applications} applicants
                                </span>
                                <span className="flex items-center gap-2 text-[#262D2C] ">
                                  <Eye className="text-[#205CA5]" size={16} />{" "}
                                  {job.views} views
                                </span>
                                <span className="flex items-center gap-2 text-[#262D2C] ">
                                  <Calendar
                                    className="text-[#205CA5]"
                                    size={16}
                                  />{" "}
                                  {formatDateMMDDYYYY(job.createdAt)}
                                </span>
                              </div>
                            </div>
                            <LinkButton
                              to={`/admin-dashboard/all-jobs/${job.id}`}
                              variant="outline"
                              size="sm"
                            >
                              <Eye size={16} className="mr-2" />
                              View Details
                            </LinkButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous Jobs Section */}
          {farm.recentPreviousJobs && farm.recentPreviousJobs.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Previous Job Listings</h3>
                <span className="text-sm text-gray-500">
                  Recently closed jobs
                </span>
              </div>
              <div className="space-y-4">
                {farm.recentPreviousJobs.map((job: any) => (
                  <div
                    key={job.id}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 flex gap-8">
                        <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {job.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    job.status === "CLOSED"
                                      ? "bg-gray-100 text-gray-800"
                                      : job.status === "FILLED"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {job.status}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Posted {formatDate(job.createdAt)}
                                </span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Eye size={16} className="mr-2" />
                              View Archive
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="h-fit w-full lg:w-[25%] space-y-4">
          {/* Quick Actions */}

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl border border-border-primary space-y-4">
            <h3 className="text-lg font-medium text-[#0D2745]">
              Recent Activity
            </h3>
            <div className="flex flex-col gap-4">
              {farm.recentActiveJobs && farm.recentActiveJobs.length > 0 ? (
                farm.recentActiveJobs.map((job: any) => (
                  <div key={job.id} className="flex gap-4 items-center">
                    <div className="size-2 bg-[#3F7D20] rounded-full"></div>
                    <div>
                      <h4 className="text-sm text-[#0A0A0A]">
                        Posted "{job.title}"
                      </h4>
                      <p className="text-xs mt-1.5 text-gray-500">
                        {formatDateMMDDYYYY(job.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex gap-4 items-center">
                  <div className="size-2 bg-gray-300 rounded-full"></div>
                  <div>
                    <h4 className="text-sm text-[#0A0A0A]">
                      No recent activity
                    </h4>
                    <p className="text-xs mt-1.5 text-gray-500">
                      No jobs posted yet
                    </p>
                  </div>
                </div>
              )}

              {farm.recentPreviousJobs &&
                farm.recentPreviousJobs.length > 0 &&
                farm.recentPreviousJobs.slice(0, 2).map((job: any) => (
                  <div key={job.id} className="flex gap-4 items-center">
                    <div className="size-2 bg-gray-400 rounded-full"></div>
                    <div>
                      <h4 className="text-sm text-[#0A0A0A]">
                        {job.status === "CLOSED" ? "Closed" : "Filled"} "
                        {job.title}"
                      </h4>
                      <p className="text-xs mt-1.5 text-gray-500">
                        {formatDateMMDDYYYY(job.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Farm Status Info */}
          <div className="bg-white p-6 rounded-xl border border-border-primary space-y-4">
            <h3 className="text-lg font-medium text-[#0D2745]">Farm Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Job Posting Rate</p>
                    <p
                      className={`text-sm font-medium ${
                        farm.totalActiveJobs > 0
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {farm.totalActiveJobs > 0 ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Active:</span>
                <span className="font-medium">
                  {farm.recentActiveJobs && farm.recentActiveJobs.length > 0
                    ? formatDate(farm.recentActiveJobs[0].createdAt)
                    : "Never"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Profile Updated:</span>
                <span className="font-medium">
                  {formatDate(farm.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
