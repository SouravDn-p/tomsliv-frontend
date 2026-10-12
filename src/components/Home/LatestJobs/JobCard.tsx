/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaRegBookmark } from "react-icons/fa";
import placeIcon from "../../../assets/jobCard/palce.svg";
import { Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ApplyModal } from "@/components/FindJobs/ApplyModal";
import { LinkButton } from "@/common/LinkButton";
import { Job } from "@/redux/types/getAllJobsType";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { useToggleSavedJobMutation } from "@/redux/features/Job/userSaveJob";
import { toast } from "sonner";
import Divider from "@/components/Reuseable/Divider";
type Props = {
  job: Job;
  onApply?: (id: number) => void;
  index: number;
  className?: string;
  detailsPath?: string;
};

const JobCard = ({
  job,
  index,
  className,
  detailsPath = `/jobs/${job.id}`,
}: Props) => {
  const [toggleSavedJob] = useToggleSavedJobMutation();
  const handleToggleSavedJob = async () => {
    toast.loading("Saving job...");
    try {
      const res = await toggleSavedJob(job.id).unwrap();
      toast.dismiss();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index || 0) * 0.1, ease: "easeOut" }}
      className={cn(
        "w-full relative border border-border-primary rounded-xl bg-white px-4 sm:px-6 py-6 sm:py-8 gap-4",
        className
      )}
    >
      {/* Logo */}
      <div className="flex gap-4">
        {/* <motion.img
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: (index || 0) * 0.1,
            ease: "easeOut",
          }}
          src={job.}
          alt={job.company}
          className="size-12 sm:size-16 md:size-20 rounded-full object-cover"
        /> */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <h2 className="text-base sm:text-lg font-semibold truncate">
                {job.title}
              </h2>
              <p className="text-xs text-gray-500">
                Deadline:{" "}
                {format(parseISO(job.applicationDeadline), "dd/MM/yyyy")}
              </p>
            </div>
            <motion.button
              onClick={handleToggleSavedJob}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.5,
                delay: (index || 0) * 0.1,
                ease: "easeOut",
              }}
              className="text-medium-blue self-end sm:self-center absolute sm:relative top-6 right-4 sm:top-auto sm:right-auto cursor-pointer"
            >
              <FaRegBookmark size={18} />
              {/* { ? (
                <FaBookmark size={18} />
              ) : (
                
              )} */}
            </motion.button>
          </div>
          <div className="text-sm text-gray-500 mt-3 gap-3 flex flex-col">
            <span className="flex gap-3 items-center">
              <img src={placeIcon} alt="" className="w-4 h-4" />
              <span className="truncate">{job.farm.name}</span>
            </span>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3.5">
              <span className="flex gap-3 items-center">
                <MapPin size={17} className="shrink-0" />
                <span className="truncate">{job.location}</span>
                <span className="hidden sm:inline">
                  ${job.remunerationStart} - ${job.remunerationEnd}/
                  <span className="lowercase"> {job.remunerationType}</span>
                </span>
              </span>
              <span className="flex gap-3 items-center">
                <Clock size={17} className="shrink-0" />
                <span className="sm:hidden">
                  Posted:{" "}
                  {formatDistanceToNow(parseISO(job.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <span className="hidden sm:inline">
                  {formatDistanceToNow(parseISO(job.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </span>
              <span className="sm:hidden flex gap-3 items-center">
                <span className="font-medium">
                  Salary: ${job.remunerationStart} - {job.remunerationEnd || ""}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-sm  border-divider-lightBlue   text-gray-700 line-clamp-1   ">
          {job.description}
        </p>
        <Divider className="mt-6 mb-4" />

        {/* Tags */}
        <div className="flex mt-6 flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-1.5 bg-[#E9EFF6] text-[#205CA5] rounded-full">
              {/* {tag} */}
              {job.jobType.split("_").join(" ")}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <LinkButton
              to={detailsPath}
              className="rounded-xl w-full sm:w-auto"
              variant={"outline"}
            >
              View details
            </LinkButton>
            <ApplyModal jobId={job.id} showCloseButton={true} from="top" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
