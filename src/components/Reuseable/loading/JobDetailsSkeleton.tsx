export default function JobDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Avatar */}
      <div className="bg-gray-200 md:size-28 size-20 rounded-full" />

      {/* Title + actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-6">
        <div className="space-y-3">
          <div className="h-7 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />

          <div className="flex gap-4 mt-4">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-4 w-36 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="h-10 w-40 bg-gray-200 rounded-xl" />
          <div className="h-9 w-32 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-3 mt-6">
        <div className="h-9 w-28 bg-gray-200 rounded-xl" />
        <div className="h-9 w-36 bg-gray-200 rounded-xl" />
      </div>

      {/* Description */}
      <div className="border border-border-primary p-6 rounded-2xl mt-6 space-y-3">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-4/6 bg-gray-200 rounded" />
      </div>

      {/* Info grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-6 items-start">
            <div className="size-3 rounded-full bg-gray-300 mt-2" />
            <div className="space-y-2 w-full">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
