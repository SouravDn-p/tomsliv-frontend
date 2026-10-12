export const FilterSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="h-4 flex-1 bg-gray-200 rounded"></div>
        <div className="h-4 w-8 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);
