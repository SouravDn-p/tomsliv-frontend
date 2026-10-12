import { Calendar, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/common/LinkButton";
import { AppliedJob, JobStatus } from "@/redux/types/getAllJobsType";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { Check } from "lucide-react";

interface ApplicationCardProps {
  application: AppliedJob;
}

const jobStatusStyles: Record<JobStatus, string> = {
  NEW: "bg-slate-100 text-slate-700",
  REVIEWED: "bg-blue-100 text-blue-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShareLink = () => {
    const jobUrl = `${window.location.origin}/jobs/${application.job.id}`;
    navigator.clipboard
      .writeText(jobUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = jobUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
  };

  return (
    <div className="bg-background-lightgray px-6 py-6 sm:px-10 sm:py-8 rounded-2xl">
      <div className="flex flex-wrap items-center gap-2.5">
        <h3 className="text-xl sm:text-2xl font-medium">
          {application.job.title}
        </h3>
        <span
          className={`${
            jobStatusStyles[application.status]
          } text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-xl capitalize`}
        >
          {application.status}
        </span>
      </div>
      <p className="text-sm sm:text-base text-paragraph-secondary-gray mt-1">
        {application.job.location}
      </p>
      <div className="py-6 sm:py-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 border-b border-divider-lightBlue text-[#262D2C]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex space-x-2 items-center text-sm sm:text-base">
            <Calendar size={16} className="text-[#205CA5]" />{" "}
            <span>
              Applied on{" "}
              {format(parseISO(application.job.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-6 sm:mt-8">
        <Button
          onClick={handleShareLink}
          className="bg-white text-background-darkBlue border-border-primary hover:bg-gray-50 transition-colors w-full sm:w-auto"
        >
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              Share Link
            </>
          )}
        </Button>
        <LinkButton
          variant={"primary"}
          to={`/my-account/applications/${application.job.id}`}
          className="w-full sm:w-auto justify-center"
        >
          <Eye className="mr-2 h-4 w-4" />
          View Job Details
        </LinkButton>
      </div>
    </div>
  );
}
