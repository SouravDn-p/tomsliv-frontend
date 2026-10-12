import { useState } from "react";
import {
  useGetJobLocationsWithCountsQuery,
  useGetJobRolesWithCountsQuery,
  useGetJobTypeWithCountsQuery,
  useGetRemunerationBucketsQuery,
} from "@/redux/features/getalljobs/getAllJobsApi";
import JobCheckbox from "./CheckList";
import Divider from "../Reuseable/Divider";
import { FilterSkeleton } from "../Reuseable/loading/FilterSkeleton";

import { JobType } from "@/redux/types/getAllJobsType";
type FilterTypes = {
  jobTypes: JobType[];
  roles: string[];
  remunerationRange: string[];
  locations: string[];
};
type JobFiltersProps = {
  selectedFilters: FilterTypes;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterTypes>>;
  className?: string;
};
export default function JobFilters({
  selectedFilters,
  setSelectedFilters,
  className,
}: JobFiltersProps) {
  // Job Type
  const {
    data: typeData,
    isLoading: typeLoading,
    error: typeError,
    isFetching: typeFetching,
  } = useGetJobTypeWithCountsQuery();

  // Job Roles
  const {
    data: roleData,
    isLoading: roleLoading,
    error: roleError,
    isFetching: roleFetching,
  } = useGetJobRolesWithCountsQuery({
    page: 1,
    limit: 20,
  });

  // Remuneration
  const {
    data: remunerationData,
    isLoading: remunerationLoading,
    error: remunerationError,
    isFetching: remunerationFetching,
  } = useGetRemunerationBucketsQuery();

  // Locations
  const {
    data: locationData,
    isLoading: locationLoading,
    error: locationError,
    isFetching: locationFetching,
  } = useGetJobLocationsWithCountsQuery({
    page: 1,
    limit: 20,
  });

  if (typeError || roleError || remunerationError || locationError) {
    return (
      <aside className="w-full h-fit max-w-[324px] bg-background-lightgray rounded-2xl border p-6 border-border-primary">
        <div className="text-red-500 text-center p-4">
          Failed to load filters. Please try again.
        </div>
      </aside>
    );
  }

  const types = typeData?.data ?? [];
  const roles = roleData?.data ?? [];
  const remunerationBuckets = remunerationData?.data ?? [];
  const locations = locationData?.data ?? [];

  const [showAllRoles, setShowAllRoles] = useState(false);
  const displayedRoles = showAllRoles ? roles : roles.slice(0, 6);

  const [showAllLocations, setShowAllLocations] = useState(false);
  const displayedLocations = showAllLocations
    ? locations
    : locations.slice(0, 6);

  const [showAllRemuneration, setShowAllRemuneration] = useState(false);
  const displayedRemuneration = showAllRemuneration
    ? remunerationBuckets
    : remunerationBuckets.slice(0, 6);

  const isLoading =
    typeLoading || roleLoading || remunerationLoading || locationLoading;
  const isFetching =
    typeFetching || roleFetching || remunerationFetching || locationFetching;
  const handleCheckboxChange = (
    group: keyof FilterTypes,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev: any) => {
      const updatedGroup = checked
        ? [...prev[group], value]
        : prev[group].filter((v: any) => v !== value);

      return { ...prev, [group]: updatedGroup };
    });
  };
  const handelClearAll = () => {
    setSelectedFilters({
      jobTypes: [],
      roles: [],
      remunerationRange: [],
      locations: [],
    });
  };

  return (
    <aside
      className={`w-full h-fit max-w-[324px] bg-background-lightgray rounded-2xl border p-6 border-border-primary space-y-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        {!isLoading && (
          <button
            onClick={handelClearAll}
            className="text-sm text-red-500 cursor-pointer hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Job Type Filter */}
      <div>
        <h5 className="text-[#515756] mb-6"> • Job Type</h5>
        {typeLoading || typeFetching ? (
          <FilterSkeleton />
        ) : typeError ? (
          <div className="text-red-500 text-sm">Failed to load job types</div>
        ) : (
          <div>
            {types.map((item) => (
              <JobCheckbox
                key={item.type}
                label={item.label}
                count={item.count}
                value={item.type}
                checked={selectedFilters.jobTypes.includes(item.type)}
                onChange={(value, checked) =>
                  handleCheckboxChange("jobTypes", value, checked)
                }
              />
            ))}
          </div>
        )}
      </div>

      <Divider className="border-[#BCBEBE]" />

      {/* Role Filter */}
      <div>
        <h5 className="text-[#515756] mb-6">• Role</h5>
        {roleLoading || roleFetching ? (
          <FilterSkeleton />
        ) : roleError ? (
          <div className="text-red-500 text-sm">Failed to load roles</div>
        ) : (
          <div>
            {displayedRoles.map((item) => (
              <JobCheckbox
                key={item.role}
                label={item.label}
                count={item.count}
                value={item.role}
                onChange={(value, checked) =>
                  handleCheckboxChange("roles", value, checked)
                }
                checked={selectedFilters.roles.includes(item.role)}
              />
            ))}
            {roles.length > 6 && (
              <button
                onClick={() => setShowAllRoles(!showAllRoles)}
                className="text-primary-blue text-sm font-medium cursor-pointer hover:underline mt-2 ml-1"
              >
                {showAllRoles ? "See less" : "See more"}
              </button>
            )}
          </div>
        )}
      </div>

      <Divider className="border-[#BCBEBE]" />

      {/* Salary Filter */}
      <div>
        <h5 className="text-[#515756] mb-6">• Salary (yearly)</h5>
        {remunerationLoading || remunerationFetching ? (
          <FilterSkeleton />
        ) : remunerationError ? (
          <div className="text-red-500 text-sm">
            Failed to load salary ranges
          </div>
        ) : (
          <div>
            {displayedRemuneration.map((item) => (
              <JobCheckbox
                key={item.range}
                label={item.label}
                count={item.count}
                value={item.range}
                onChange={(value, checked) =>
                  handleCheckboxChange("remunerationRange", value, checked)
                }
                checked={selectedFilters.remunerationRange.includes(item.range)}
              />
            ))}
            {remunerationBuckets.length > 6 && (
              <button
                onClick={() => setShowAllRemuneration(!showAllRemuneration)}
                className="text-primary-blue text-sm font-medium cursor-pointer hover:underline mt-2 ml-1"
              >
                {showAllRemuneration ? "See less" : "See more"}
              </button>
            )}
          </div>
        )}
      </div>

      <Divider className="border-[#BCBEBE]" />

      {/* Location Filter */}
      <div>
        <h5 className="text-[#515756] mb-6">• City/Town</h5>
        {locationLoading || locationFetching ? (
          <FilterSkeleton />
        ) : locationError ? (
          <div className="text-red-500 text-sm">Failed to load locations</div>
        ) : (
          <div>
            {displayedLocations.map((item) => (
              <JobCheckbox
                key={item.region}
                label={item.label}
                count={item.count}
                value={item.region}
                onChange={(value, checked) =>
                  handleCheckboxChange("locations", value, checked)
                }
                checked={selectedFilters.locations.includes(item.region)}
              />
            ))}
            {locations.length > 6 && (
              <button
                onClick={() => setShowAllLocations(!showAllLocations)}
                className="text-primary-blue text-sm font-medium cursor-pointer hover:underline mt-2 ml-1"
              >
                {showAllLocations ? "See less" : "See more"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Overall loading overlay */}
      {isFetching && !isLoading && (
        <div className="absolute inset-0 bg-white/50 rounded-2xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Updating filters...</span>
          </div>
        </div>
      )}
    </aside>
  );
}
