import SectionTitles from "@/common/SectionTitles";
import PaymentsCard from "./PaymentsCard";
import RevenueTrend from "./RevenueTrend";
import RevenueGrowth from "./RevenueGrowth";
import PaymentHistory from "./PaymentHistory";

const Payments = () => {
  return (
    <div className=" space-y-6">
      <div>
        <SectionTitles
          title="Payment Management"
          description="Review, moderate, and manage payment settings."
        />
      </div>
      <div>
        <PaymentsCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-2 w-full">
          <RevenueTrend />
        </div>
        <div className="w-full xl:col-span-2">
          <RevenueGrowth />
        </div>
      </div>
      <div>
        <PaymentHistory />
      </div>
    </div>
  );
};

export default Payments;
