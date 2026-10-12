/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetApplicationByIdQuery,
  useToggleShortlistMutation,
  useToggleRejectMutation,
} from "@/redux/features/jobApplication/jobAppliction.Api";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  FiExternalLink,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiFileText,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { BadgeCheck, CircleCheck, CircleX, Info, Send } from "lucide-react";
import { toast } from "sonner";
import DefaultProfileCard from "@/components/Reuseable/DefaultProfileCard";

const ApplicantDetailsPage = () => {
  const { id } = useParams();
  const {
    data: applicationData,
    isLoading,
    refetch,
  } = useGetApplicationByIdQuery(id ? id : skipToken);
  const [toggleShortlist, { isLoading: isTogglingShortlist }] =
    useToggleShortlistMutation();
  const [toggleReject, { isLoading: isTogglingReject }] =
    useToggleRejectMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F7F9FC]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applicant details...</p>
        </div>
      </div>
    );
  }

  if (!applicationData?.data) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F7F9FC]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">No data found</h2>
          <p className="text-gray-500 mt-2">
            Unable to load applicant details.
          </p>
        </div>
      </div>
    );
  }

  const { data } = applicationData;
  const { cv, user, applicationAIResults } = data;
  // console.log("applicationAIResults", applicationAIResults);

  // Format dates
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const handleToggleShortlist = async () => {
    if (!id) return;
    try {
      const result = await toggleShortlist({ id }).unwrap();
      toast.success(result.message || "Shortlist status updated successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to toggle shortlist status");
      console.error("Error toggling shortlist:", error);
    }
  };

  const handleToggleReject = async () => {
    if (!id) return;
    try {
      const result = await toggleReject({ id }).unwrap();
      toast.success(result.message || "Reject status updated successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to toggle reject status");
      console.error("Error toggling reject:", error);
    }
  };

  // Get current status for display
  const getStatusBadge = () => {
    const status = data.status;
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
    <div className="p-4 sm:p-6 lg:p-0">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        {/* header */}
        <div className="w-full lg:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 mb-4 hover:text-blue-600 transition-colors"
          >
            ← Back to applications
          </button>

          <div className="flex flex-col sm:flex-row items-start gap-4">

            {
              user.profilePicture?.url ? (<img
                src={user.profilePicture?.url}
                className="w-16 h-16 rounded-full border-2 border-white "
                alt={`${cv.firstName} ${cv.lastName}`}
              />
              ) :
                <DefaultProfileCard size="lg" />
            }
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl text-secondary-CobaltBlue font-bold wrap-break-word">
                  {cv.firstName} {cv.lastName}
                </h1>
                <p className="px-4 py-1.5 rounded-lg text-[#101312] mt-1 text-sm bg-[#E9EFF6]">
                  {cv.jobTitle}
                </p>
                {/* Current Status Badge */}
                <div className="mt-1">{getStatusBadge()}</div>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <FiMail className="text-gray-400" /> {cv.email}
                </span>
                <span className="flex items-center gap-2">
                  <FiPhone className="text-gray-400" /> {cv.phone}
                </span>
                <span className="flex items-center gap-2">
                  <FiMapPin className="text-gray-400" /> {cv.location}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400" /> Applied{" "}
                  {formatDate(data.appliedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <a
            href={cv.customCV?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiFileText /> <span>View CV</span>
          </a>
          {cv.customCoverLetter?.url && (
            <a
              href={cv.customCoverLetter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiFileText /> <span>View Cover Letter</span>
            </a>
          )}
          {/* <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
            Export PDF
          </button> */}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <div className="space-y-6 flex-1">
          {/* Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl border  border-border-primary space-y-3 col-span-3">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={handleToggleShortlist}
                  variant={
                    data.status === "SHORTLISTED" ? "outline" : "primary"
                  }
                  disabled={isTogglingShortlist}
                >
                  {isTogglingShortlist ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <BadgeCheck size={20} />
                      {data.status === "SHORTLISTED"
                        ? "Remove from Shortlist"
                        : "Shortlist"}
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleToggleReject}
                  variant={
                    data.status === "REJECTED" ? "outline" : "destructive"
                  }
                  disabled={isTogglingReject}
                >
                  {isTogglingReject ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <CircleX size={20} />
                      {data.status === "REJECTED" ? "Unreject" : "Reject"}
                    </>
                  )}
                </Button>
                <a
                  href={`mailto:${cv.email}`}
                  className="w-full border text-[#205CA5] border-gray-300 text-sm py-1.5 rounded-lg  hover:bg-gray-50 transition-colors  flex items-center justify-center gap-2"
                >
                  <Send size={17} />
                  Send e-mail
                </a>
                <Button
                  onClick={() => navigate(`/jobs/${data.jobId}`)}
                  variant={"outline"}
                >
                  <FiExternalLink /> View job link
                </Button>
              </div>
              {/* Current Status Display */}
              {/* <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Current Status:{" "}
                  <span className="font-medium">{getStatusBadge()}</span>
                </p>
              </div> */}
            </div>
          </div>

          {/* 1. AI Summary */}
          <div className="bg-white p-6 rounded-xl border border-border-primary ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Summary</h3>
            </div>
            <p className="text-paragraph-secondary-gray leading-relaxed">
              {applicationAIResults?.summary || "No summary available."}
            </p>
          </div>

          {/* 2. Cover Letter Insights */}
          <div className="bg-white p-6 rounded-xl border border-border-primary ">
            <h3 className="text-xl font-medium mb-4">Cover Letter Insights</h3>
            <div className="flex flex-col gap-6">
              <div className="">
                <h3 className=" font-medium mb-4">Motivation</h3>
                <p className="text-gray-700 leading-relaxed">
                  {applicationAIResults?.motivation ||
                    "No motivation analysis available."}
                </p>
              </div>
              <div>
                <h3 className=" font-medium mb-4">Key Traits</h3>
                <div className="flex flex-wrap gap-2">
                  {(applicationAIResults?.keyTraits && applicationAIResults.keyTraits.length > 0) ? (
                    applicationAIResults.keyTraits.map((trait: any, index: any) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm rounded-xl bg-[#F2F3F5] text-[#262D2C] "
                      >
                        {trait}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No key traits identified.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 5. Strengths & Development */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border-border-primary border ">
              <h3 className="text-lg  font-medium flex gap-3.5 mb-4">
                <CircleCheck className="text-[#3F7D20] shrink-0" /> Strengths
              </h3>
              <ul className="space-y-3">
                {(applicationAIResults?.strengths && applicationAIResults.strengths.length > 0) ? (
                  applicationAIResults.strengths.map((strength: any, index: any) => (
                    <li key={index} className="flex items-start gap-3">
                      <p className="text-[#515756] pl-3 border-l-2 flex-1 border-[#3F7D20]">
                        {strength}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No strengths identified.
                  </p>
                )}
              </ul>
            </div>

            <div className="bg-white p-6 border-border-primary rounded-xl border ">
              <h3 className="text-lg  font-medium flex gap-3.5 mb-4">
                <Info className="text-[#D08700] shrink-0" /> Areas for Development
              </h3>
              <ul className="space-y-3">
                {(applicationAIResults?.areasOfImprovement && applicationAIResults.areasOfImprovement.length > 0) ? (
                  applicationAIResults.areasOfImprovement.map((area: any, index: any) => (
                    <li key={index} className="flex items-start gap-3">
                      <p className="text-[#515756] pl-3 border-l-2 flex-1 border-[#D08700]">
                        {area}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No areas for development identified.
                  </p>
                )}
              </ul>
            </div>
          </div>

          {/* 6. Interview Questions */}
          <div className="bg-white p-6 rounded-xl border border-border-primary">
            <h3 className="text-lg font-medium mb-4">
              Suggested Interview Questions
            </h3>
            <ol className="space-y-4">
              {applicationAIResults?.suggestedQuestions?.map(
                (question: any, index: any) => (
                  <li
                    key={index}
                    className="flex rounded-lg items-start p-4 gap-4 bg-[#F9FAFB]"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#205CA5] text-white flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 flex-1">{question}</p>
                  </li>
                )
              ) || (
                  <p className="text-gray-500 text-sm">
                    No interview questions generated.
                  </p>
                )}
            </ol>
          </div>
        </div>

        {/* Notes Section */}
        {/* <div className="h-fit w-full lg:w-[20%] space-y-4 sticky top-0">
          <div className="bg-white  p-6 h-fit  rounded-xl border border-border-primary  space-y-4">
            <h3 className="text-lg font-medium text-[#0D2745]">Activity</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="size-2 bg-[#3F7D20] rounded-full"></div>
                <div>
                  <h4 className="text-sm text-[#0A0A0A]">
                    Application Received
                  </h4>
                  <p className="text-xs mt-1.5 text-gray-500">
                    {formatDateMMDDYYYY(data?.appliedAt || "")}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="size-2 bg-[#2B7FFF] rounded-full"></div>
                <div>
                  <h4 className="text-sm text-[#0A0A0A]">
                    AI processing completed
                  </h4>
                  <p className="text-xs mt-1.5 text-gray-500">
                    {formatDateMMDDYYYY(
                      applicationAIResults?.generatedAt || ""
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ApplicantDetailsPage;
