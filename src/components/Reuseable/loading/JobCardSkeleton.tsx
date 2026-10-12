import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const JobCardSkeleton = ({ className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "w-full relative border border-border-primary rounded-xl bg-white px-4 sm:px-6 py-6 sm:py-8 gap-4 animate-pulse",
        className
      )}
    >
      {/* Header */}
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="h-3 w-1/3 bg-gray-200 rounded" />
            </div>
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
          </div>

          {/* Meta */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="h-3 w-2/3 bg-gray-200 rounded" />
            <div className="flex gap-4">
              <div className="h-3 w-1/4 bg-gray-200 rounded" />
              <div className="h-3 w-1/4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center gap-4">
        <div className="h-6 w-full bg-gray-200 rounded-full" />
        <div className="flex gap-3">
          <div className="h-9 w-full bg-gray-200 rounded-xl" />
          <div className="h-9 w-full bg-gray-200 rounded-xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default JobCardSkeleton;
