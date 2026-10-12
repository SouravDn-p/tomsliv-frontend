import { useGetPaymentStatsQuery } from "@/redux/features/adminPayment/adminPaymentApi";
import TotalRevinue from "@/assets/tomslive/Icon/TotalRevinue.svg";
import totalThisWeek from "@/assets/tomslive/Icon/totalThisWeek.svg";
import Transection from "@/assets/tomslive/Icon/ThumbsUp.svg";
import RunningSubscription from "@/assets/tomslive/Icon/RunningSubscription.svg";
import { DollarSign, TrendingUp, CreditCard, Users } from "lucide-react";

const PaymentsCard = () => {
  const { data: stats, isLoading, error } = useGetPaymentStatsQuery();

  const statusData = [
    {
      title: "Total Revenue",
      amount: stats ? `$${stats.totalRevenue.toLocaleString()}` : "$0",
      icon: TotalRevinue,
      iconComponent: <DollarSign className="w-6 h-6" />,
      color: "#12335B",
    },
    {
      title: "Total this week",
      amount: stats ? `$${stats.weeklyRevenue.toLocaleString()}` : "$0",
      icon: totalThisWeek,
      iconComponent: <TrendingUp className="w-6 h-6" />,
      color: "#12335B",
    },
    {
      title: "Transactions",
      amount: stats ? stats.totalTransactions.toLocaleString() : "0",
      icon: Transection,
      iconComponent: <CreditCard className="w-6 h-6" />,
      color: "#12335B",
    },
    {
      title: "Running Subscriptions",
      amount: stats ? stats.runningSubscriptions.toLocaleString() : "0",
      icon: RunningSubscription,
      iconComponent: <Users className="w-6 h-6" />,
      color: "#12335B",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="w-full h-[100px] p-5 sm:p-6 bg-white rounded-2xl flex items-center shadow-sm animate-pulse"
          >
            <div className="bg-gray-200 w-12 h-12 rounded-xl p-3 flex items-center justify-center mr-4"></div>
            <div className="flex flex-col justify-center space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 border border-red-200 rounded-2xl">
        <p className="text-red-600">Error loading payment statistics</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
      {statusData.map((single) => {
        return (
          <div
            key={single.title}
            className="w-full h-[100px] p-5 sm:p-6 bg-white rounded-2xl flex items-center shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Icon */}
            <div className=" rounded-xl p-3 flex items-center justify-center mr-3">
              {/* <div style={{ color: single.color }}>{single.iconComponent}</div> */}
              <img src={single.icon} alt={single.title} className="" />
            </div>

            {/* Title and Amount */}
            <div className="flex flex-col justify-center">
              <h1
                className="text-[18px] leading-[160%] font-sans font-medium"
                style={{ color: single.color }}
              >
                {single.title}
              </h1>
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-semibold font-Robot tracking-[-0.68px]"
                style={{ color: single.color }}
              >
                {single.amount}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentsCard;

// import TotalRevinue from "@/assets/dashboard/a.png";
// import totalThisWeek from "@/assets/dashboard/b.png";
// import Transection from "@/assets/dashboard/c.png";
// import RunningSubscription from "@/assets/dashboard/d.png";

// const PaymentsCard = () => {
//   const statusData = [
//     {
//       title: "Total Amount",
//       amount: "$27,850",
//       icon: TotalRevinue,
//     },
//     {
//       title: "Weekly Revenue",
//       amount: "247",
//       icon: totalThisWeek,
//     },
//     {
//       title: "All Transactions",
//       amount: "2,942",
//       icon: Transection,
//     },
//     {
//       title: "Running Subscriptions",
//       amount: "656",
//       icon: RunningSubscription,
//     },
//   ];

//   const colors = ["#12335B", "#12335B", "#12335B", "#12335B"];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
//       {statusData.map((single, index) => {
//         let amountColor = "#000000";
//         if (single.amount === "RunningSubscriptionful") amountColor = "#4CAF50";
//         if (single.amount === "7") amountColor = "#F3AA4B";

//         return (
//           <div
//             key={single.title}
//             className="w-full h-[100px] p-5 sm:p-6 bg-white rounded-2xl flex items-center shadow-sm"
//           >
//             {/* Icon */}
//             <div className="bg-[#F9F8F6] border-[#F6F4F2] w-12 h-12 rounded-xl p-3 flex items-center justify-center mr-4">
//               <img
//                 src={single.icon}
//                 alt={single.title}
//                 className="w-6 h-6 object-contain"
//               />
//             </div>

//             {/* Title and Amount */}
//             <div className="flex flex-col justify-center">
//               <h1
//                 className="text-[18px] leading-[160%] font-sans font-medium"
//                 style={{ color: colors[index] }}
//               >
//                 {single.title}
//               </h1>
//               <h2
//                 className="text-xl sm:text-2xl md:text-3xl font-semibold font-Robot tracking-[-0.68px]"
//                 style={{ color: amountColor }}
//               >
//                 {single.amount}
//               </h2>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default PaymentsCard;
