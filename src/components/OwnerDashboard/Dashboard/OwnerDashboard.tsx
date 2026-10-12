import DashboardCard from "./DashboardCard";
import JobsSection from "./JobsSection";

const OwnerDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <DashboardCard />
      </div>

      {/* <div className="w-full rounded-2xl p-5 bg-[#FEF7ED] space-y-4">
        <h1 className="text-[#F3AA4B] font-lora text-[20px] font-semibold leading-7 flex justify-start gap-2 items-center">
          <span>
            <GrCircleAlert />
          </span>{" "}
          HIPAA Compliance Reminder
        </h1>

  
      </div> */}

      {/* Jobs Section Added */}
      <div>
        <JobsSection />
      </div>
    </div>
  );
};

export default OwnerDashboard;
