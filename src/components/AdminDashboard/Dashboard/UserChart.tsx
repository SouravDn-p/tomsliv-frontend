import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetUserAnalyticsQuery } from "@/redux/features/adminDashboard/adminDashboardApi";
import { UserAnalyticsData } from "@/redux/types/adminDashboard";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-gray-600 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            New Users: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const UserChart = () => {
  const { data, isLoading, error } = useGetUserAnalyticsQuery();

  /* ---------- Loading State ---------- */
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="h-[320px] flex items-center justify-center text-gray-400 text-sm">
          Loading user analytics...
        </div>
      </div>
    );
  }

  /* ---------- Error State ---------- */
  if (error || !data?.success) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="h-[320px] flex items-center justify-center text-red-500 text-sm">
          Failed to load user analytics
        </div>
      </div>
    );
  }

  const chartData: UserAnalyticsData[] = data.data;

  const formattedData = chartData.map((item) => ({
    date: item.date,
    users: item.count,
  }));

  const maxUsers = Math.max(...chartData.map((item) => item.count));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Users</h2>
      </div>

      {/* Chart */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval={Math.floor(chartData.length / 7)}
            />

            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, maxUsers + 1]}
              allowDecimals={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
            />

            <Line
              type="monotone"
              dataKey="users"
              name="New Users"
              stroke="#4F7BFF"
              strokeWidth={2}
              dot={{ r: 3, fill: "#4F7BFF" }}
              activeDot={{ r: 5 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 justify-between text-sm text-gray-600">
        <div>
          <span className="font-medium">Total Period: </span>
          {chartData.length} days
        </div>
        <div>
          <span className="font-medium">Total New Users: </span>
          {chartData.reduce((sum, item) => sum + item.count, 0)}
        </div>
        <div>
          <span className="font-medium">Peak Day: </span>
          {maxUsers} users
        </div>
      </div>
    </div>
  );
};

export default UserChart;

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { useGetUserAnalyticsQuery } from "@/redux/features/adminDashboard/adminDashboardApi";
// import UserChartSkeleton from "./UserChartSkeleton";
// import { UserAnalyticsData } from "@/redux/types/adminDashboard";

// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: any[];
//   label?: string;
// }

// const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
//         <p className="text-gray-600 font-medium mb-2">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="text-sm" style={{ color: entry.color }}>
//             {entry.dataKey === "count" ? "New Users" : "Users"}:{" "}
//             <span className="font-semibold">{entry.value}</span>
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// const UserChart = () => {
//   const { data, isLoading, error } = useGetUserAnalyticsQuery();

//   if (isLoading) {
//     return <UserChartSkeleton />;
//   }

//   if (error || !data?.success) {
//     return (
//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <div className="h-[320px] flex items-center justify-center text-red-500">
//           Failed to load user analytics
//         </div>
//       </div>
//     );
//   }

//   const chartData: UserAnalyticsData[] = data.data;

//   // Format the data for the chart
//   const formattedData = chartData.map((item) => ({
//     date: item.date,
//     users: item.count,
//   }));

//   // Find the maximum value for better Y-axis scaling
//   const maxUsers = Math.max(...chartData.map((item) => item.count));

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-gray-900">
//           User Registration Trend
//         </h2>
//         <p className="text-gray-500 text-sm mt-1">
//           Daily new user registrations over the last 30 days
//         </p>
//       </div>

//       {/* Chart */}
//       <div className="w-full h-[320px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={formattedData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//               stroke="#E5E7EB"
//             />

//             <XAxis
//               dataKey="date"
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//               interval={Math.floor(chartData.length / 7)} // Show ~7 labels
//             />

//             <YAxis
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//               domain={[0, maxUsers + 1]}
//               allowDecimals={false}
//             />

//             <Tooltip content={<CustomTooltip />} />

//             <Legend
//               verticalAlign="top"
//               height={36}
//               iconType="circle"
//               iconSize={8}
//             />

//             {/* User Registration Line */}
//             <Line
//               type="monotone"
//               dataKey="users"
//               name="New Users"
//               stroke="#4F7BFF"
//               strokeWidth={2}
//               dot={{ r: 3, fill: "#4F7BFF" }}
//               activeDot={{ r: 5, fill: "#4F7BFF", strokeWidth: 2 }}
//               connectNulls={true}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Summary Stats */}
//       <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
//         <div>
//           <span className="font-medium">Total Period: </span>
//           {chartData.length} days
//         </div>
//         <div>
//           <span className="font-medium">Total New Users: </span>
//           {chartData.reduce((sum, item) => sum + item.count, 0)}
//         </div>
//         <div>
//           <span className="font-medium">Peak Day: </span>
//           {Math.max(...chartData.map((item) => item.count))} users
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserChart;

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { day: "Sat", users: 11000, revenue: 5000 },
//   { day: "Sun", users: 4500, revenue: 11000 },
//   { day: "Mon", users: 8000, revenue: 18000 },
//   { day: "Tue", users: 3000, revenue: 23000 },
//   { day: "Wed", users: 4000, revenue: 26000 },
//   { day: "Thu", users: 35000, revenue: 18000 },
//   { day: "Fri", users: 11000, revenue: 28000 },
// ];

// const UserChart = () => {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//       {/* Header */}
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold text-gray-900">User</h2>
//       </div>

//       {/* Chart */}
//       <div className="w-full h-[320px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//               stroke="#E5E7EB"
//             />

//             <XAxis
//               dataKey="day"
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//             />

//             <YAxis
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//             />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#fff",
//                 borderRadius: "8px",
//                 border: "1px solid #E5E7EB",
//               }}
//             />

//             {/* Blue Line */}
//             <Line
//               type="monotone"
//               dataKey="users"
//               stroke="#4F7BFF"
//               strokeWidth={2}
//               dot={{ r: 5, fill: "#4F7BFF" }}
//               activeDot={{ r: 7 }}
//             />

//             {/* Green Line */}
//             <Line
//               type="monotone"
//               dataKey="revenue"
//               stroke="#16A34A"
//               strokeWidth={2}
//               dot={{ r: 5, fill: "#16A34A" }}
//               activeDot={{ r: 7 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default UserChart;
