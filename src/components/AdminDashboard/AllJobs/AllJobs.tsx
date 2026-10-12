import SectionTitles from "@/common/SectionTitles";
import JobManagementTable from "./JobManagementTable";

const AllJobs = () => {
  return (
    <div className=" space-y-5">
      <SectionTitles
        title="Manage Job Postings"
        description="Review, moderate, and manage all job postings."
      />

      <JobManagementTable />
    </div>
  );
};

export default AllJobs;
