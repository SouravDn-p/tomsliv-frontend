/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetJobSeekerByIdQuery,
  useToggleJobSeekerStatusMutation,
} from "@/redux/features/adminDashboard/adminDashboardApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";
import { format } from "date-fns";
import { CircleCheck, FileText } from "lucide-react";
import { formatDateMMDDYYYY } from "@/utils/formatDate";
import TimelineDot from "@/components/FindJobs/TimelineDot";
import { Button } from "@/components/ui/button";
import { MdDoNotDisturb } from "react-icons/md";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa6";

export default function UserDetails() {
  const { id } = useParams();
  const {
    data: jobSeekerResponse,
    isLoading,
    isError,
  } = useGetJobSeekerByIdQuery(id!);
  const [updateJobSeekerStatus, { isLoading: isUpdating }] =
    useToggleJobSeekerStatusMutation();
  const navigate = useNavigate();
  const handleSuspendUser = async (id: string) => {
    try {
      await updateJobSeekerStatus(id);
      toast.success("User suspended successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to suspend user");
      console.error("Failed to suspend user:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F7F9FC]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job seeker details...</p>
        </div>
      </div>
    );
  }

  if (isError || !jobSeekerResponse?.data) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F7F9FC]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">No data found</h2>
          <p className="text-gray-500 mt-2">
            Unable to load job seeker details.
          </p>
        </div>
      </div>
    );
  }

  const { data: jobSeeker } = jobSeekerResponse;
  const { savedCV, applicationHistory } = jobSeeker;

  // Format dates
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      NEW: { color: "bg-blue-100 text-blue-800", label: "New" },
      REVIEWED: { color: "bg-yellow-100 text-yellow-800", label: "Reviewed" },
      SHORTLISTED: {
        color: "bg-green-100 text-green-800",
        label: "Shortlisted",
      },
      REJECTED: { color: "bg-red-100 text-red-800", label: "Rejected" },
      INTERVIEW: { color: "bg-purple-100 text-purple-800", label: "Interview" },
      HIRED: { color: "bg-emerald-100 text-emerald-800", label: "Hired" },
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
            ← Back to job seekers
          </button>

          <div className="flex items-start gap-4">
            <img
              src={jobSeeker.profileUrl || "https://i.pravatar.cc/100"}
              className="w-16 h-16 rounded-full border-2 border-white "
              alt={jobSeeker.name}
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl text-secondary-CobaltBlue font-bold">
                  {jobSeeker.name}
                </h1>
                {savedCV?.jobTitle && (
                  <p className="px-4 py-1.5 rounded-lg text-[#101312] mt-1 text-sm bg-[#E9EFF6]">
                    {savedCV.jobTitle}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <FiMail className="text-gray-400" /> {jobSeeker.email}
                </span>
                <span className="flex items-center gap-2">
                  <FiPhone className="text-gray-400" /> {jobSeeker.phone}
                </span>
                {savedCV?.location && (
                  <span className="flex items-center gap-2">
                    <FiMapPin className="text-gray-400" /> {savedCV.location}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400" /> Joined{" "}
                  {formatDate(jobSeeker.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={() => handleSuspendUser(jobSeeker.id)}
            className="bg-destructive text-white rounded-xl"
          >
            {!isUpdating && <MdDoNotDisturb size={20} />}
            Suspend
            {isUpdating && (
              <FaSpinner size={20} className="ml-2 animate-spin" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <div className="space-y-6 flex-1">
          {/* Top Grid */}

          {/* CV Summary */}
          {savedCV?.summary && (
            <div className="bg-white p-6 rounded-xl border border-border-primary">
              <h3 className="text-lg font-medium mb-4">Professional Summary</h3>
              <p className="text-paragraph-secondary-gray leading-relaxed">
                {savedCV.summary}
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col p-6 border-[#E2E8F0] border bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
              <h4 className="text-subheading-gray font-medium text-xl">
                {" "}
                Applications
              </h4>
              <span className="text-[#515756] mt-2">
                {jobSeeker.totalApplications}
              </span>
            </div>
            <div className="flex flex-col p-6 border-[#E2E8F0] border bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
              <span className="text-subheading-gray font-medium text-xl">
                Registered
              </span>
              <span className="text-[#515756] mt-2">
                {formatDateMMDDYYYY(jobSeeker.createdAt)}
              </span>
            </div>

            <div className="flex flex-col p-6 border-[#E2E8F0] border bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
              <span className="text-subheading-gray font-medium text-xl">
                CV Status
              </span>
              <span
                className={`mt-2 ${
                  savedCV?.isSaved ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {savedCV?.isSaved ? "Saved" : "Not Saved"}
              </span>
            </div>
            {savedCV?.customCV && (
              <div className="flex flex-col p-6 border-[#E2E8F0] border bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
                <span className="text-subheading-gray font-medium text-xl">
                  CV Updated
                </span>
                <span className="text-[#515756] mt-2">
                  {formatDate(savedCV.updatedAt)}
                </span>
              </div>
            )}
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border-border-primary border">
              <h3 className="text-lg font-medium flex gap-3.5 mb-4">
                <CircleCheck className="text-[#3F7D20]" /> Personal Details
              </h3>
              <div className="space-y-3">
                {savedCV?.jobType && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 w-32">Job Type:</span>
                    <span className="font-medium">{savedCV.jobType}</span>
                  </div>
                )}
                {savedCV?.availability && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 w-32">Availability:</span>
                    <span className="font-medium">
                      {formatDate(savedCV.availability)}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 w-32">Driving License:</span>
                  <span className="font-medium">
                    {savedCV?.hasDrivingLicense ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 w-32">Eligible in NZ:</span>
                  <span className="font-medium">
                    {savedCV?.eligibleToWorkInNZ ? "Yes" : "No"}
                  </span>
                </div>
                {savedCV?.workPermitType && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 w-32">Work Permit:</span>
                    <span className="font-medium">
                      {savedCV.workPermitType}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Application Stats Breakdown */}
            <div className="bg-white p-6 border-border-primary rounded-xl border">
              <h3 className="text-lg font-medium flex gap-3.5 mb-4">
                <FiBriefcase className="text-[#D08700]" /> Application Status
              </h3>
              <div className="space-y-3">
                {applicationHistory.reduce((acc, app) => {
                  acc[app.status] = (acc[app.status] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>) && (
                  <>
                    {Object.entries(
                      applicationHistory.reduce((acc, app) => {
                        acc[app.status] = (acc[app.status] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([status, count]) => (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <span>{status}:</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Education Section */}
          {savedCV?.educations && savedCV.educations.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-border-primary">
              <h3 className="text-lg font-medium mb-4">Education</h3>
              <div className="space-y-4">
                {savedCV.educations.map((education, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {education.degree}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {education.institution}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 text-right">
                        <p>
                          {formatDate(education.startDate)} -{" "}
                          {education.isOngoing
                            ? "Present"
                            : formatDate(education.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Section */}
          {savedCV?.experiences && savedCV.experiences.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-border-primary">
              <h3 className="text-lg font-medium mb-4">Work Experience</h3>
              <div className="space-y-4">
                {savedCV.experiences.map((experience, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 flex gap-8">
                        <TimelineDot />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {experience.jobTitle}
                          </h4>
                          <p className="text-sm text-primary-blue mt-1">
                            {experience.company}
                          </p>
                          <div className="text-sm text-gray-500 mt-1">
                            <p>
                              {formatDate(experience.startDate)} -{" "}
                              {experience.isOngoing
                                ? "Present"
                                : formatDate(experience.endDate)}
                            </p>
                          </div>
                          {experience.summary && (
                            <p className="text-sm text-gray-700 mt-2">
                              {experience.summary}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application History */}
          <div className="bg-white p-6 rounded-xl border border-border-primary">
            <h3 className="text-lg font-medium mb-4">Application History</h3>
            <div className="space-y-4">
              {applicationHistory.map((application) => (
                <div
                  key={application.id}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 flex gap-8">
                      <TimelineDot />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {application.job.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm text-primary-blue">
                                {application.farm.name}
                              </p>
                              <span className="text-gray-400">•</span>
                              <p className="text-sm text-gray-600">
                                {application.job.location}
                              </p>
                              <span className="text-gray-400">•</span>
                              <p className="text-sm text-gray-600">
                                {application.job.employmentType}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(application.status)}
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDateMMDDYYYY(application.appliedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Activity & Info */}
        <div className="h-fit w-full lg:w-[25%] space-y-4">
          {/* Account Info */}
          <div>
            {savedCV?.customCV?.fileUrl && (
              <div className="border border-border-primary p-6 bg-white rounded-xl">
                <div>
                  <h3 className="text-lg font-medium text-background-darkBlue">
                    Resume/CV
                  </h3>
                  <div className="py-8 w-full  flex items-center flex-col justify-center">
                    <FileText
                      strokeWidth={1}
                      className="size-20 text-[#205CA5]"
                    />
                    <p className="text-sm text-[#205CA5] mt-2">
                      {savedCV.customCV.fileName}
                    </p>
                  </div>
                </div>
                <a
                  href={savedCV.customCV.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#205CA533] text-black hover:text-website-lightGray px-4 py-2 rounded-lg hover:bg-[#205ca5f8] transition-all flex items-center justify-center gap-2"
                >
                  View CV
                </a>
              </div>
            )}
          </div>
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl border border-border-primary space-y-4">
            <h3 className="text-lg font-medium text-background-darkBlue">
              Recent Activity
            </h3>
            <div className="flex flex-col gap-4">
              {applicationHistory.slice(0, 3).map((application) => (
                <div key={application.id} className="flex gap-4 items-center">
                  <div
                    className={`size-2 rounded-full ${
                      application.status === "SHORTLISTED"
                        ? "bg-[#3F7D20]"
                        : application.status === "REJECTED"
                        ? "bg-red-500"
                        : application.status === "REVIEWED"
                        ? "bg-[#2B7FFF]"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <div>
                    <h4 className="text-sm text-[#0A0A0A]">
                      Applied for {application.job.title}
                    </h4>
                    <p className="text-xs mt-1.5 text-gray-500">
                      {formatDateMMDDYYYY(application.appliedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
