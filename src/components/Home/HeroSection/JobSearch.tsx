import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetAllJobsQuery } from "@/redux/features/getalljobs/getAllJobsApi";

export default function JobSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Using the query as requested, even if only used for background fetching or potential future features
  // Note: We use default values for parameters that aren't defined here
  useGetAllJobsQuery({
    page: 1,
    limit: 10,
    search: searchQuery,
    filters: {
      jobTypes: [],
      roles: [],
      locations: locationQuery ? [locationQuery] : [],
      remunerationRange: [],
    },
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (locationQuery) params.append("location", locationQuery);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8, // Delayed to appear after other content
      }}
      className="
    bg-white w-full 
       md:w-[90%] lg:w-fit
    relative lg:absolute md:bottom-0 lg:-bottom-12
    left-1/2 -translate-x-1/2
    flex flex-col md:flex-row
    gap-6 md:gap-12
    border border-primary-border
    text-black
    py-6 md:py-8 
    px-6 md:px-16
    rounded-2xl
    shadow-[0_79px_128px_0_rgba(192,192,192,0.09),0_28.836px_46.722px_0_rgba(192,192,192,0.06),0_13.999px_22.683px_0_rgba(192,192,192,0.05),0_6.863px_11.119px_0_rgba(192,192,192,0.04),0_2.714px_4.397px_0_rgba(192,192,192,0.03)]
  "
    >
      {/* Title input */}
      <div className="flex  gap-4 items-center w-full md:w-auto">
        <Search />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="
        w-full
        border-b  border-[#BCBEBE] 
        placeholder:text-[#51575683] 
        focus:outline-none 
        py-2
      "
          type="text"
          placeholder="Job title or keyword"
        />
      </div>

      {/* Location input */}
      <div className="flex gap-4 items-center w-full md:w-auto">
        <MapPin />
        <input
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="
        w-full
        border-b border-[#BCBEBE] 
        placeholder:text-[#51575683] 
        focus:outline-none 
        py-2
      "
          type="text"
          placeholder="Location"
        />
      </div>

      {/* Button */}
      <div className=" flex-1 md:w-auto flex justify-end">
        <Button
          onClick={handleSearch}
          className="
        w-full md:w-auto
        px-6 lg:w-[170px] 
        py-4 md:py-5 
        border border-primary-blue 
        lg:px-8
      "
          variant="primary"
        >
          Find a job <ArrowRight />
        </Button>
      </div>
    </motion.div>
  );
}
