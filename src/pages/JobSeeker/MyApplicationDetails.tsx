import { FaCalendarAlt } from "react-icons/fa";
import { HiMiniMapPin } from "react-icons/hi2";
import FarmInfoCard from "@/components/FindJobs/FarmInfo";
import { JobDescription } from "@/components/MyAccount/MyAppliction/JobDescription";
import { applicantDummyData } from "@/components/MyAccount/MyAppliction/applicantDummyData";
import { FaBriefcase } from "react-icons/fa6";
export default function MyApplicationDetails() {

  return (
    <div>
      {/* name */}
      <h1 className="text-3xl font-medium text-[#205CA5]">John Doe</h1>
      <div>
        <div className="flex flex-col md:flex-row gap-3 space-x-3.5 mt-5 mb-6">
          <span className="capitalize text-paragraph-secondary-gray flex items-center gap-2">
            <FaBriefcase size={18} /> Farm Assistant
          </span>
          <span className="capitalize text-paragraph-secondary-gray flex items-center gap-2">
            <HiMiniMapPin size={18} />
            Madison, Wisconsin
          </span>
          <span className="capitalize text-paragraph-secondary-gray flex items-center gap-2">
            <FaCalendarAlt size={18} />
            12/12/2025
          </span>
        </div>
        <div className="flex text-xs mt-5 flex-wrap gap-3">
          <span className="px-4 rounded-xl border border-primary-blue py-2">
            Permanent - Full time
          </span>
          <span className="px-4 rounded-xl border border-primary-blue py-2">
            Farm Manager
          </span>
        </div>
      </div>
      {/* description */}
      <JobDescription
        title="Experience summary"
        description="We are looking for two people to join our inclusive team. We love our cows."
        bulletPoints={[
          "Good accommodation provided, 30 minutes to Christchurch.",
          "Opportunity to build skills in grazing management focused on growing more grass,reanning young stock.",
          "Split milkings with 6+2 roster.",
          "CV with two verbal referee contact details please",
        ]}
      />
      <FarmInfoCard farmDetails={applicantDummyData} />
    </div>
  );
}
