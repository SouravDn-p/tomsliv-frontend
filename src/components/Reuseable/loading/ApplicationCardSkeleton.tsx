export function ApplicationCardSkeleton() {
  return (
    <div className="bg-background-lightgray px-10 py-8 rounded-2xl animate-pulse">
      {/* Title + status */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-7 w-64 bg-gray-200 rounded-lg" />
        <div className="h-6 w-24 bg-gray-200 rounded-xl" />
      </div>

      {/* Location */}
      <div className="h-4 w-40 bg-gray-200 rounded mb-6" />

      {/* Middle row */}
      <div className="py-8 flex justify-between items-center gap-6 border-b border-[#BACCE3]">
        <div className="flex gap-6">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>

        {/* Score */}
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <div className="h-10 w-36 bg-gray-200 rounded-lg" />
        <div className="h-10 w-44 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
