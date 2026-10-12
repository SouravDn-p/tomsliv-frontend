import Container from "@/common/Container";
import SectionHeading from "@/components/Shared/SectionHeading";

import JobCard from "./JobCard";

import { useGetAllJobsQuery } from "@/redux/features/getalljobs/getAllJobsApi";
import { LinkButton } from "@/common/LinkButton";
import JobCardSkeleton from "@/components/Reuseable/loading/JobCardSkeleton";

export default function LatestJobs() {
  const { data, isLoading } = useGetAllJobsQuery({
    page: 1,
    limit: 6,
    sortOption: "mostRecent",
  });

  const jobs = data?.data ?? [];

  return (
    <div className="bg-[#fafafa]">
      {" "}
      <Container className=" flex flex-col gap-10  lg:gap-[60px]">
        {/* header */}
        <div className="flex justify-between gap-4 flex-col md:flex-row md:items-center">
          <SectionHeading
            className="text-left"
            detail="Most recent job postings from FarmLink Farmers."
          >
            Latest Jobs
          </SectionHeading>
          <LinkButton
            to={"/jobs"}
            className=" w-fit hidden lg:block"
            variant={"outline"}
          >
            View All Jobs
          </LinkButton>
        </div>
        {isLoading ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Jobs Available
              </h3>
              <p className="text-gray-600">
                There are currently no job postings available. Please check back later for new opportunities.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={job.id} index={index} job={job} />
            ))}
          </div>
        )}
        <div className="text-center  flex items-center  justify-center lg:hidden">
          <LinkButton to={"/jobs"} className=" w-fit" variant={"outline"}>
            View All Jobs
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
