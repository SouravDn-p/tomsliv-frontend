import { Search, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type Props = {
  onSearch: (data: { query: string; location: string }) => void;
  initialQuery?: string;
  initialLocation?: string;
};

export default function JobSearchBar({
  onSearch,
  initialQuery = "",
  initialLocation = "",
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleSearch = () => {
    onSearch({
      query: query,
      location: location,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full mx-auto border-[#BACCE3] bg-white border rounded-2xl p-3 md:p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Job input */}
        <div className="w-full sm:flex-1 flex items-center gap-2 border border-border-primary rounded-xl px-4 py-3">
          <Search className="h-4 w-4 md:h-5 md:w-5 text-paragraph-secondary-gray shrink-0" />
          <input
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              if (value === "") {
                onSearch({ query: "", location });
              }
            }}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Job title, keywords, or company"
            className="w-full outline-none text-sm md:text-base bg-transparent"
          />
        </div>

        {/* Location input */}
        <div className="w-full sm:flex-1 flex items-center gap-2 border border-border-primary rounded-xl px-4 py-3">
          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-paragraph-secondary-gray shrink-0" />
          <input
            value={location}
            onChange={(e) => {
              const value = e.target.value;
              setLocation(value);
              if (value === "") {
                onSearch({ query, location: "" });
              }
            }}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Location"
            className="w-full outline-none text-sm md:text-base bg-transparent"
          />
        </div>

        {/* Search button */}
        <Button
          variant="primary"
          onClick={handleSearch}
          className="w-full sm:w-auto px-6 py-3 text-sm md:text-base"
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="hidden xs:inline">Search</span>
          <span className="xs:hidden">Find Jobs</span>
        </Button>
      </div>
    </div>
  );
}
