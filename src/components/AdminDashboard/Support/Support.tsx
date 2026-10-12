import SectionTitles from "@/common/SectionTitles";
import SupportCard from "./SupportCard";
import SupportTicketsTable from "./SupportTicketsTable";

const Support = () => {
  return (
    <div className=" space-y-6">
      <div>
        <SectionTitles
          title="Support"
          description="Review, moderate, and manage all job postings."
        />
      </div>
      <div>
        <SupportCard />
      </div>
      <div>
        <SupportTicketsTable />
      </div>
    </div>
  );
};

export default Support;
