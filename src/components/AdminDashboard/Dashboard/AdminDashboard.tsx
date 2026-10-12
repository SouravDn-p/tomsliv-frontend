import DashboardCard from "./DashboardCard";
import SectionTitles from "@/common/SectionTitles";
// import SupportTickets from "./SupportTickets";
import UserChart from "./UserChart";
import AlertNotification from "./AlertNotification";

const AdminDashboard = () => {
  return (
    <div className=" space-y-5">
      <SectionTitles
        title="Dashboard"
        description="Overview of all candidates and applications"
      />

      <div>
        <DashboardCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 2/3 part */}
        <div className="lg:col-span-2 w-full">
          <UserChart />
        </div>

        {/* 1/3 part */}
        <div className="lg:col-span-1 w-full">
          <AlertNotification />
        </div>
      </div>

      {/* <div>
        <SupportTickets />
      </div> */}
    </div>
  );
};

export default AdminDashboard;

//  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
//         <div className="xl:col-span-2 w-full">
//           <AppointmentStatistics />
//         </div>
//         <div className="w-full xl:col-span-2">
//           <RevenueOverview />
//         </div>
//       </div>
