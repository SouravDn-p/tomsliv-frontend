import { HiOutlineExclamationTriangle } from "react-icons/hi2";

type JobDetailsErrorProps = {
  onRetry?: () => void;
};

export default function JobDetailsError({ onRetry }: JobDetailsErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
      <HiOutlineExclamationTriangle size={56} className="text-red-500" />

      <h3 className="text-xl font-semibold text-[#205CA5]">
        Something went wrong
      </h3>

      <p className="text-paragraph-secondary-gray max-w-md">
        We couldn’t load the job details right now. Please check your internet
        connection or try again.
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2 rounded-xl bg-primary-blue text-white hover:opacity-90 transition"
        >
          Try again
        </button>
      )}
    </div>
  );
}
