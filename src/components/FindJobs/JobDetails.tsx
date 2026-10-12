/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/common/Container";
import farmIcon from "../../assets/cardIcon/framicn.svg";
import { HiMiniMapPin } from "react-icons/hi2";
import { FaCalendarAlt } from "react-icons/fa";
import { ApplyModal } from "./ApplyModal";
import { useGetJobDetailByIdQuery } from "@/redux/features/Job/JobApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import BorderWrapper from "../Reuseable/BorderWrapper";
import TimelineDot from "./TimelineDot";
import JobDetailsSkeleton from "../Reuseable/loading/JobDetailsSkeleton";
import JobDetailsError from "./JobDetailsError";
import { useCurrentUser } from "@/hooks/auth.hooks";
import { Button } from "../ui/button";
import { MdDoNotDisturb } from "react-icons/md";
import { FaSpinner } from "react-icons/fa6";
import { useToggleJobStatusMutation } from "@/redux/features/adminDashboard/adminDashboardApi";
import { toast } from "sonner";

export default function JobDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const { data, isLoading, error } = useGetJobDetailByIdQuery(
    id ? id : skipToken
  );

  useEffect(() => {
    if (!user && !isLoading) {
      navigate(`/signup?redirect=${location.pathname}`);
    }
  }, [user, isLoading, navigate, location.pathname]);

  const [toggleStatus, { isLoading: isUpdating }] =
    useToggleJobStatusMutation();

  if (isLoading) {
    return (
      <Container className="pb-16" variant={"secondary"}>
        <JobDetailsSkeleton />
      </Container>
    );
  }

  if (error) {
    return <JobDetailsError />;
  }

  const jobData = data?.data;

  const farmInitials = jobData?.farm?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  const currentPath = location.pathname;

  const handleSuspendUser = async (id: string) => {
    try {
      await toggleStatus(id);
      toast.success("User suspended successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to suspend user");
      console.error("Failed to suspend user:", error);
    }
  };

  return (
    <Container className="pb-16" variant={"secondary"}>
      {/* <img
        className="md:size-28 size-20 rounded-full"
        src={comIon}
        alt="company image"
      /> */}
      <div className="bg-[#faf5fa] md:size-28 size-20 rounded-full flex text-4xl font-medium items-center justify-center text-[#205CA5]">
        {farmInitials}
      </div>

      {/* Status display */}

      {/* details heading */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className=" flex gap-2.5 items-center mt-6">
            <h2 className="text-[#205CA5] text-2xl md:text-3xl font-semibold pb-2 ">
              {jobData?.title} <span>({jobData?.numberOfPositions})</span>
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                jobData?.status === "ACTIVE"
                  ? "bg-green-100 text-green-800"
                  : jobData?.status === "SUSPENDED"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {jobData?.status}
            </span>
          </div>
          <span className="text-paragraph-secondary-gray ">
            ${jobData?.remunerationStart} - ${jobData?.remunerationEnd} -{" "}
            <span className="lowercase">{jobData?.remunerationType}</span>
          </span>
          <div className="flex flex-col md:flex-row gap-3 space-x-3.5 mt-5 mb-6">
            <span className="capitalize text-paragraph-secondary-gray flex items-center gap-2">
              <img src={farmIcon} alt="" />
              <span>{jobData?.farm.name}</span>
            </span>
            <span className="capitalize text-paragraph-secondary-gray flex items-center gap-2">
              <HiMiniMapPin size={22} className="text-[#205CA5]" />
              {jobData?.location}
            </span>
            <span className="capitalize text-paragraph-secondary-gray flex items-center gap-2">
              <FaCalendarAlt size={22} className="text-[#205CA5]" />
              {jobData?.applicationDeadline &&
                format(parseISO(jobData.applicationDeadline), "dd/MM/yyyy")}
            </span>
          </div>
        </div>
        <div>
          {user?.role === "SUPER_ADMIN" ? (
            <div className="flex flex-col gap-1.5 items-end">
              <Button
                type="button"
                onClick={() => handleSuspendUser(jobData?.id || "")}
                className="bg-destructive text-white rounded-xl"
              >
                {!isUpdating && <MdDoNotDisturb size={20} />}
                Suspend
                {isUpdating && (
                  <FaSpinner size={20} className="ml-2 animate-spin" />
                )}
              </Button>
              <div>
                {" "}
                <span className="text-[#6E7272]">Total Appointments:</span>{" "}
                {jobData?._count?.jobApplications}
              </div>
            </div>
          ) : !currentPath.startsWith("/my-account/applications") ? (
            <div className="md:text-right flex flex-col gap-3 md:items-end">
              <ApplyModal jobId={id} from="top" showCloseButton={true} />
              {/* <ShareJob
                jobTitle={jobData?.title}
                jobUrl={window.location.href}
              /> */}
            </div>
          ) : null}
        </div>
      </div>
      {/* tags */}
      <div className="flex mt-5 flex-wrap gap-3">
        <span className="px-4 rounded-xl border border-primary-blue py-2 capitalize">
          {jobData?.jobType.split("_").join(" ")}
        </span>
        <span className="px-4 rounded-xl border border-primary-blue py-2">
          {jobData?.title}
        </span>
      </div>
      {/* description */}
      <div className="border border-border-primary p-6 rounded-2xl mt-6">
        <h4 className="text-xl font-medium mb-4">Job Description</h4>
        {/* <p className="text-paragraph-secondary-gray my-6">
          We are looking for two people to join our inclusive team. We love our
          cows.
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 text-paragraph-secondary-gray">
          <li>
            Good accommodation provided, 30 minutes to Christchurch. Opportunity
            to build skills in grazing management focused on growing more grass,
            rearing young stock. Split milkings with 6+2 roster.
          </li>
          <li>
            High production farm with a low cell count. 50 bale rotary with ACRs
            and in-shed feeding.
          </li>
          <li>Remuneration in line with experience.</li>
          <li>New Zealand citizen or permanent residence only to apply.</li>
          <li>CV with two verbal referee contact details please.</li>
        </ul>
        <div>
          <p className="text-paragraph-secondary-gray  mt-6">
            Key attitudes and skills our farm manager will need:
          </p>
          <ul className="  list-disc list-outside ml-5 space-y-2 text-paragraph-secondary-gray">
            <li>
              Good accommodation provided, 30 minutes to Christchurch.
              Opportunity to build skills in grazing management focused on
              growing more grass, rearing young stock. Split milkings with 6+2
              roster.
            </li>
            <li>
              High production farm with a low cell count. 50 bale rotary with
              ACRs and in-shed feeding.
            </li>
            <li>Remuneration in line with experience.</li>
            <li>New Zealand citizen or permanent residence only to apply.</li>
            <li>CV with two verbal referee contact details please.</li>
          </ul>
        </div> */}
        <p className="text-paragraph-secondary-gray">{jobData?.description}</p>
      </div>
      {/* Requirements */}
      <BorderWrapper className="grid mt-6 md:grid-cols-2 gap-6">
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Farm Size</h5>
            <p className="text-[#515756]">{jobData?.farmSize}</p>
          </div>
        </div>
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Benefits</h5>
            <p className="text-[#515756]">{jobData?.benefits}</p>
          </div>
        </div>
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Peak Herd Size (cows)</h5>
            <p className="text-[#515756]">{jobData?.herdSize}</p>
          </div>
        </div>
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Hours Type </h5>
            <p className="text-[#515756]">{jobData?.hourType}</p>
          </div>
        </div>
        {/* staff */}
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Typical On-farm Staff</h5>
            <p className="text-[#515756]">{jobData?.onFarmStaff}</p>
          </div>
        </div>
        {/* hours per week */}
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Average Hours Per week</h5>
            <p className="text-[#515756]">{jobData?.hoursPerWeek}</p>
          </div>
        </div>
        {/* position start */}
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Position Start Date</h5>
            <p className="text-[#515756]">
              {" "}
              {jobData?.positionStartDate &&
                format(parseISO(jobData.positionStartDate), "dd/MM/yyyy")}
            </p>
          </div>
        </div>
        {/* roster */}
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Roster</h5>
            <p className="text-[#515756]">{jobData?.roster} </p>
          </div>
        </div>
        {/* paid by  */}
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>Roster</h5>
            <p className="text-[#515756]">{jobData?.remunerationPaidBy} </p>
          </div>
        </div>
        <div className="flex h-fit gap-8">
          <TimelineDot />
          <div className="flex flex-col gap-3">
            <h5>
              Remuneration if Total Package Value (e.g. Salary and/or benefits)
            </h5>
            <p className="text-[#515756]">{jobData?.remunerationPaidBy} </p>
          </div>
        </div>
      </BorderWrapper>
    </Container>
  );
}
