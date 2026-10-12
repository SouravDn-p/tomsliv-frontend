const JobCardSkeletonS = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-6 p-6 sm:p-8 rounded-2xl border border-[#98B4D6] bg-white animate-pulse"
        >
          <div className="w-full space-y-4">
            {/* Title + Status */}
            <div className="flex justify-between items-start">
              <div className="h-5 w-2/3 bg-gray-200 rounded" />
              <div className="h-5 w-16 bg-gray-200 rounded-sm" />
            </div>

            {/* Location + Time */}
            <div className="flex items-center justify-between mt-4">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-full bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default JobCardSkeletonS;
