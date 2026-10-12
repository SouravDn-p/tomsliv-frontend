import Container from "@/common/Container";
import { Skeleton } from "@/components/ui/skeleton";

const PricingSectionSkeleton = () => {
  return (
    <section id="pricing">
      <Container className="py-16 md:py-24">
        {/* Section Heading Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-6 w-5/6 max-w-xl mx-auto mt-2" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Introductory Offer Skeleton */}
          <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-200 flex flex-col animate-pulse">
            {/* Ribbon Skeleton */}
            <div className="absolute top-0 right-8 -translate-y-1/2">
              <Skeleton className="h-7 w-32 rounded-full" />
            </div>

            {/* Title & Description */}
            <div className="mb-6">
              <Skeleton className="h-8 w-48 mb-3" />
              <Skeleton className="h-5 w-56" />
            </div>

            {/* Price Section */}
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-6 w-16 ml-2" />
              </div>
              <Skeleton className="h-4 w-40 mt-2" />
              <Skeleton className="h-3 w-24 mt-1" />
            </div>

            {/* Feature List */}
            <ul className="space-y-4 mb-8 flex-grow">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-5 flex-1" />
                </li>
              ))}
              {/* Info Box */}
              <li className="p-3 rounded-xl border border-gray-200">
                <Skeleton className="h-16 w-full" />
              </li>
            </ul>

            {/* Button */}
            <Skeleton className="h-12 w-full rounded-xl" />

            {/* Footer Text */}
            <Skeleton className="h-4 w-full max-w-xs mx-auto mt-4" />
          </div>

          {/* Standard Pricing Skeleton */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 flex flex-col animate-pulse">
            {/* Title & Description */}
            <div className="mb-6">
              <Skeleton className="h-8 w-40 mb-3" />
              <Skeleton className="h-5 w-56" />
            </div>

            {/* Price Section */}
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <Skeleton className="h-12 w-20" />
                <Skeleton className="h-6 w-16 ml-2" />
              </div>
              <Skeleton className="h-4 w-48 mt-2" />
            </div>

            {/* Feature List */}
            <ul className="space-y-4 mb-8 flex-grow">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-5 flex-1" />
                </li>
              ))}
            </ul>

            {/* Button */}
            <Skeleton className="h-12 w-full rounded-xl" />

            {/* Footer Text */}
            <Skeleton className="h-4 w-48 mx-auto mt-4" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PricingSectionSkeleton;
