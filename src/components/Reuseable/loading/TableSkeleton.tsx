const TableSkeleton = ({ columns = 7, rows = 5 }) => {
  return (
    <div className="space-y-4">
      {/* Card View Skeleton for Mobile/Tablet */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:hidden">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="p-5 border border-[#E4E4E4] bg-white rounded-xl shadow-sm animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
        ))}
      </div>

      {/* Desktop Table View Skeleton */}
      <div className="hidden xl:block p-4 border bg-white border-[#E4E4E4] rounded-lg">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-[#F8FAFC]">
              <tr className="border-b border-[#E2E8F0]">
                {Array.from({ length: columns }).map((_, idx) => (
                  <th key={idx} className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: rows }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {Array.from({ length: columns }).map((_, colIdx) => (
                    <td key={colIdx} className="px-4 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
