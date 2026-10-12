const DashboardCardSkeleton = () => {
  // Let's render 4 skeleton cards as placeholders
  const skeletonArray = Array.from({ length: 4 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 w-full">
      {skeletonArray.map((_, idx) => (
        <div
          key={idx}
          className="w-full xl:p-5 p-4 bg-white rounded-2xl flex flex-col justify-between space-y-6 shadow-sm animate-pulse min-h-[160px]"
        >
          {/* Top Row */}
          <div className="space-y-3">
            <div className="bg-gray-200 w-full h-12 rounded-xl"></div>
            <div className="h-5 w-full bg-gray-200 rounded"></div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-3">
            <div className="h-8 w-full bg-gray-200 rounded"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>   
      ))}
    </div>
  );
};

export default DashboardCardSkeleton;
