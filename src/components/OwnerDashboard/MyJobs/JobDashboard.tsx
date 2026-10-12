/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from "@/common/ErrorMessage";
import { LinkButton } from "@/common/LinkButton";
import Divider from "@/components/Reuseable/Divider";
import { EmptyState } from "@/components/Reuseable/EmptyState";
import JobCardSkeleton from "@/components/Reuseable/loading/JobCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  useGetAllFarmJobsQuery,
  useUpdateJobStatusMutation,
} from "@/redux/features/Farmowner/JobsApi";
import { getStatusBadge } from "@/utils/getStatusBadge";
import { format } from "date-fns";
import {
  Calendar,
  CircleX,
  ExternalLink,
  Eye,
  Pencil,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { BsFillPauseFill } from "react-icons/bs";
import { toast } from "sonner";
import PreviousJobs from "./Previous";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

const JobDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "PAUSED" | "CLOSED">(
    "ACTIVE",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, error, isFetching } = useGetAllFarmJobsQuery({
    search: "",
    page: currentPage,
    limit: 8,
    status: activeTab,
  });
  // update job status
  const [updateJobStatus] = useUpdateJobStatusMutation();

  if (error) {
    return <ErrorMessage />;
  }
  // Get status badge color and text

  // Get tab label
  const getTabLabel = () => {
    switch (activeTab) {
      case "ACTIVE":
        return "Active jobs";
      case "PAUSED":
        return "Paused jobs";
      case "CLOSED":
        return "Closed jobs";
      default:
        return "Jobs";
    }
  };

  const handleUpdateJobStatus = async (jobId: string, status: string) => {
    console.log(jobId, status);
    toast.loading("Updating job status...");
    try {
      await updateJobStatus({ id: jobId, status }).unwrap();
      toast.dismiss();
      toast.success("Job status updated successfully");
    } catch (error: any) {
      console.error("Error updating job status:", error);
      toast.dismiss();
      toast.error(error.message || "Failed to update job status");
    }
  };

  // Function to share job link
  const handleShareLink = async (jobId: string, jobTitle: string) => {
    const jobUrl = `${window.location.origin}/jobs/${jobId}`;

    try {
      // Try using the Clipboard API first
      await navigator.clipboard.writeText(jobUrl);
      toast.success("Job link copied to clipboard!");

      // Optional: You can also try to use the Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: jobTitle,
          text: `Check out this job: ${jobTitle}`,
          url: jobUrl,
        });
      }
    } catch (err) {
      // Fallback for older browsers or if clipboard API fails
      console.error("Failed to copy: ", err);

      // Fallback method using a temporary textarea
      const textArea = document.createElement("textarea");
      textArea.value = jobUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("Job link copied to clipboard!");
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr);
        toast.error("Failed to copy link. Please copy manually:");
        // Show the link to the user so they can copy manually
        alert(`Job Link: ${jobUrl}`);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Active Jobs Section */}
      <div className="flex-1  rounded-lg  overflow-hidden">
        {/* Tabs */}
        <div className="bg-[#FFFFFF] p-1 rounded-lg">
          <div className="flex flex-wrap sm:grid sm:grid-cols-3 gap-1">
            <button
              onClick={() => {
                setActiveTab("ACTIVE");
                setCurrentPage(1);
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 rounded-xl cursor-pointer text-center ${activeTab === "ACTIVE"
                ? "bg-[#E9F4FB] text-black  border-none"
                : "bg-transparent text-paragraph-secondary-gray border-2 border-transparent"
                }`}
            >
              Active jobs
            </button>
            <button
              onClick={() => {
                setActiveTab("PAUSED");
                setCurrentPage(1);
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 rounded-xl cursor-pointer text-center ${activeTab === "PAUSED"
                ? "bg-[#E9F4FB] text-black  border-none"
                : "bg-transparent text-paragraph-secondary-gray border-2 border-transparent"
                }`}
            >
              Paused jobs
            </button>
            <button
              onClick={() => {
                setActiveTab("CLOSED");
                setCurrentPage(1);
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 rounded-xl cursor-pointer text-center ${activeTab === "CLOSED"
                ? "bg-[#E9F4FB] text-black  border-none"
                : "bg-transparent text-paragraph-secondary-gray border-2 border-transparent"
                }`}
            >
              Closed jobs
            </button>
          </div>
        </div>

        {/* Job List Header */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
            {getTabLabel()} ({data?.metadata?.total || 0})
          </h3>
        </div>

        {/* Job Cards */}
        {isLoading || isFetching ? (
          <div className=" space-y-3 sm:space-y-4 mt-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : data?.data?.length ? (
          <div className=" space-y-3 sm:space-y-4 ">
            {data?.data.map((job) => {
              const statusBadge = getStatusBadge(job.status);
              return (
                <div key={job.id} className=" rounded-2xl p-3 sm:p-5 bg-white">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                          {job.title}
                        </h4>
                        <span
                          className={`px-2.5 py-0.5 ${statusBadge.bg} ${statusBadge.text} text-xs font-medium rounded w-fit`}
                        >
                          {statusBadge.label}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {job.location}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer ml-2 focus:outline-none">
                          <span className="text-lg sm:text-xl font-bold">
                            ⋮
                          </span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/owner-dashboard/my-jobs/edit/${job.id}`)
                          }
                          className="cursor-pointer"
                        >
                          <Pencil size={14} className="mr-2" />
                          Edit Job
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600    border-gray-100">
                      <span className="flex items-center gap-1.5">
                        <span>
                          <Users size={16} className="text-primary-blue" />
                        </span>
                        <span>{job.applicants || 0} applicants</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span>
                          <Eye size={16} className="text-primary-blue" />
                        </span>
                        <span>{job.views || 0} views</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span>
                          <Calendar size={16} className="text-primary-blue" />
                        </span>
                        <span className="hidden sm:inline">
                          Posted{" "}
                          {format(new Date(job.createdAt), "MMM dd, yyyy")}
                        </span>
                        <span className="sm:hidden">
                          {job.createdAt.replace("Posted ", "")}
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                      <span className="text-gray-600">
                        Shortlisted:{" "}
                        <span className="font-semibold text-green-600">
                          {job.shortlisted}
                        </span>
                      </span>
                      <span className="text-gray-600">
                        Avg. Score:{" "}
                        <span className="font-semibold text-green-600">
                          {job.averageScore}
                        </span>
                      </span>
                    </div>
                  </div>
                  <Divider />
                  <div className="pt-2">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div className="flex flex-wrap gap-2">
                        <LinkButton
                          to={`/owner-dashboard/my-jobs/applicants/${job.id}`}
                          variant={"outline"}
                          className="flex-1 sm:flex-none justify-center items-center text-background-darkBlue border-[#E9EFF6]"
                        >
                          <span>
                            <Eye size={16} />
                          </span>
                          <span className="hidden sm:inline">
                            View Applicants
                          </span>
                          <span className="sm:hidden">View</span>
                        </LinkButton>
                        <Button
                          variant={"outline"}
                          onClick={() => handleShareLink(job.id, job.title)}
                          className="flex-1 sm:flex-none justify-center text-background-darkBlue border-[#E9EFF6]"
                        >
                          <span>
                            <ExternalLink size={16} />
                          </span>
                          <span className="hidden sm:inline">Share Link</span>
                          <span className="sm:hidden">Share</span>
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        {job.status === "ACTIVE" && (
                          <Button
                            onClick={() => {
                              handleUpdateJobStatus(job.id, "PAUSED");
                            }}
                            className="flex-1 sm:flex-none justify-center px-2 sm:px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 border border-gray-300 rounded flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>
                              <BsFillPauseFill size={16} />
                            </span>
                            <span className="hidden sm:inline">Pause job</span>
                            <span className="sm:hidden">Pause</span>
                          </Button>
                        )}
                        {job.status === "PAUSED" && (
                          <Button
                            onClick={() => {
                              handleUpdateJobStatus(job.id, "ACTIVE");
                            }}
                            variant={"outlineWhite"}
                            className="flex-1 sm:flex-none justify-center px-2 sm:px-3 py-1.5 text-xs text-green-600 hover:bg-green-50 border border-green-300 rounded flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>▶</span>
                            <span className="hidden sm:inline">Resume job</span>
                            <span className="sm:hidden">Resume</span>
                          </Button>
                        )}
                        {(job.status === "ACTIVE" ||
                          job.status === "PAUSED") && (
                            <Button
                              onClick={() => {
                                handleUpdateJobStatus(job.id, "CLOSED");
                              }}
                              variant={"destructive"}
                              className="flex-1 sm:flex-none justify-center px-2 sm:px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 border border-red-300 rounded flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>
                                <CircleX size={16} />
                              </span>
                              <span className="hidden sm:inline">Close job</span>
                              <span className="sm:hidden">Close</span>
                            </Button>
                          )}
                        {job.status === "CLOSED" && (
                          <Button
                            onClick={() => {
                              handleUpdateJobStatus(job.id, "ACTIVE");
                            }}
                            className="flex-1 sm:flex-none justify-center px-2 sm:px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 border border-blue-300 rounded flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>🔄</span>
                            <span className="hidden sm:inline">Reopen job</span>
                            <span className="sm:hidden">Reopen</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState />
        )}

        {/* Pagination */}
        {data?.metadata && data.metadata.totalPage > 1 && (
          <div className="mt-8 mb-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
                {Array.from({ length: data.metadata.totalPage }).map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    className={
                      currentPage === data.metadata.totalPage
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, data.metadata.totalPage),
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Previous Jobs Sidebar */}
      <PreviousJobs />
    </div>
  );
};

export default JobDashboard;
