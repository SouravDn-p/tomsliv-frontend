/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/common/Container";
import JobFilters from "@/components/FindJobs/JobFilters";
import JobCard from "@/components/Home/LatestJobs/JobCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useGetAllJobsQuery } from "@/redux/features/getalljobs/getAllJobsApi";
import { useSearchParams } from "react-router-dom";
import JobCardSkeleton from "@/components/Reuseable/loading/JobCardSkeleton";
import { JobType } from "@/redux/types/getAllJobsType";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import JobSearchBar from "@/components/FindJobs/JobSearchBar";
import { EmptyState } from "@/components/Reuseable/EmptyState";
import { Briefcase, Filter } from "lucide-react";

export interface FilterTypes {
  jobTypes: JobType[];
  roles: string[];
  remunerationRange: string[];
  locations: string[];
}
export default function FindJobs() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [selectedFilters, setSelectedFilters] = useState<FilterTypes>({
    jobTypes: [],
    roles: [],
    remunerationRange: [],
    locations: initialLocation ? [initialLocation] : [],
  });
  const [search, setSearch] = useState({
    query: initialSearch,
    location: initialLocation,
  });
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);

  // Update state if URL params change (e.g. from home page search)
  useEffect(() => {
    const searchVal = searchParams.get("search") || "";
    const locationVal = searchParams.get("location") || "";

    setSearch({
      query: searchVal,
      location: locationVal,
    });

    if (locationVal) {
      setSelectedFilters((prev) => ({
        ...prev,
        locations: [locationVal],
      }));
    }

    setCurrentPage(1);
  }, [searchParams]);

  const { data, isLoading, isFetching } = useGetAllJobsQuery({
    page: currentPage,
    limit: pageSize,
    search: search.query,
    filters: selectedFilters,
    sortOption: sortBy,
  });

  const jobs = data?.data ?? [];
  const totalPages = data?.metadata?.totalPage ?? 1;

  const totalItems = data?.metadata?.total ?? 0;

  const handleSearch = (data: any) => {
    setSearch(data);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedFilters({
      jobTypes: [],
      roles: [],
      remunerationRange: [],
      locations: [],
    });
    setSearch({
      query: "",
      location: "",
    });
    setCurrentPage(1);
  };
  console.log("selectedFilters", selectedFilters);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page if needed
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Add page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => handlePageChange(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Container className="pt-8 flex flex-col gap-8 pb-16" variant={"secondary"}>
      <JobSearchBar
        onSearch={handleSearch}
        initialQuery={search.query}
        initialLocation={search.location}
      />

      {/* Mobile Filter Trigger */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[340px] bg-background-lightgray rounded-2xl border overflow-y-auto"
          >
            <JobFilters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              className="w-full max-w-none border-none shadow-none p-0 bg-transparent mt-6"
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-6 relative">
        <div className="hidden md:block w-auto  md:w-[324px]">
          <JobFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        {/* Jobs List */}
        <div className="w-full flex flex-col gap-6">
          {/* Desktop Sort */}
          <div className="hidden md:flex items-center justify-between w-full">
            <span>
              Showing {totalItems} result{totalItems !== 1 ? "s" : ""}
            </span>
            <div>
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1); // Reset to first page when sorting changes
                }}
              >
                <SelectTrigger className="w-52 border-border-primary focus:border-none">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-border-primary">
                  <SelectItem value=" ">Default</SelectItem>
                  <SelectItem value="mostRecent">Most Recent</SelectItem>
                  <SelectItem value="remunerationHighToLow">
                    Salary: High to Low
                  </SelectItem>
                  <SelectItem value="remunerationLowToHigh">
                    Salary: Low to High
                  </SelectItem>
                  <SelectItem value="deadlineSoon">Deadline Soonest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* All job posts */}
          <div>
            <div className="grid lg:grid-cols-1 gap-6">
              {isLoading || isFetching ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))
              ) : jobs.length > 0 ? (
                <>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {jobs.map((job, index) => (
                      <JobCard key={job.id} index={index} job={job} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={handlePreviousPage}
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>

                          {renderPaginationItems()}

                          <PaginationItem>
                            <PaginationNext
                              onClick={handleNextPage}
                              className={
                                currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-12">
                  <EmptyState
                    icon={
                      <Briefcase className="w-16 h-16 text-muted-foreground/60" />
                    }
                    title="No Jobs Found"
                    description="We couldn't find any jobs matching your search criteria. Try adjusting your filters or clearing your search."
                    variant="minimal"
                    action={
                      <Button
                        onClick={resetFilters}
                        variant="outline"
                        className="mt-4 border-primary text-primary hover:bg-primary/5"
                      >
                        Clear all filters
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
