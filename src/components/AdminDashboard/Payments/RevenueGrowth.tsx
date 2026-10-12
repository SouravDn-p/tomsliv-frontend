"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useGetLast7DaysRevenueQuery } from "@/redux/features/adminPayment/adminPaymentApi";
import { TrendingUp, Calendar } from "lucide-react";

const margin = {
  top: 20,
  right: 20,
  left: 10,
  bottom: 70,
};

export default function RevenueGrowth() {
  const { data: revenueData, isLoading, error } = useGetLast7DaysRevenueQuery();

  // Transform data for Recharts
  const chartData =
    revenueData?.map((item) => ({
      name: item.label,
      revenue: item.value,
      date: item.date,
    })) || [];

  // Calculate stats
  // const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const maxRevenue = Math.max(...chartData.map((item) => item.revenue), 0);
  const growthRate =
    chartData.length > 1
      ? ((chartData[chartData.length - 1].revenue - chartData[0].revenue) /
          chartData[0].revenue) *
        100
      : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = chartData.find((item) => item.name === label);
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-green-600 font-medium">
            ${payload[0].value.toLocaleString()}
          </p>
          {data?.date && (
            <p className="text-sm text-gray-500 mt-1">{data.date}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-2 sm:mb-9 xl:sm:mb-0 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
        <div className="h-[80%] bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[500px] bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-2 sm:mb-9 xl:sm:mb-0">
        <div className="h-full flex items-center justify-center">
          <p className="text-red-500">Failed to load revenue data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-2 sm:mb-9 xl:sm:mb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 w-full">
        <div className="w-full md:flex-1">
          <h1 className="text-[24px] leading-[130%] font-medium text-[#343A40] mb-2">
            Revenue Growth
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {chartData[0]?.date} - {chartData[chartData.length - 1]?.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp
                className={`w-4 h-4 ${
                  growthRate >= 0 ? "text-green-500" : "text-red-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  growthRate >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {growthRate >= 0 ? "+" : ""}
                {growthRate.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500">Growth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={chartData} margin={margin}>
          <CartesianGrid
            stroke="#E5E5E5"
            strokeDasharray="5 5"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#737373"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, maxRevenue > 0 ? maxRevenue * 1.2 : 1000]}
            stroke="#737373"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) => `$${value / 1000}k`}
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="revenue"
            fill="#22C55E"
            barSize={45}
            radius={[8, 8, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// "use client";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Tooltip,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
// } from "recharts";

// // ✅ Sample weekly revenue data
// const data = [
//   { name: "Sunday", uv: 40000 },
//   { name: "Monday", uv: 30000 },
//   { name: "Tuesday", uv: 25000 },
//   { name: "Wednesday", uv: 50000 },
//   { name: "Thursday", uv: 75000 },
//   { name: "Friday", uv: 100000 },
// ];

// const margin = {
//   top: 20,
//   right: 20,
//   left: 10,
//   bottom: 20,
// };

// export default function RevenueGrowth() {
//   return (
//     <div className="w-full h-[500px] bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-2 sm:mb-9 xl:sm:mb-0">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 w-full">
//         <div className="w-full md:flex-1">
//           <h1 className="text-[24px] leading-[130%] font-medium text-[#343A40] mb-2">
//             Revenue Growth
//           </h1>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height="80%">
//         <BarChart data={data} margin={margin}>
//           <CartesianGrid stroke="#E5E5E5" strokeDasharray="5 5" />
//           <XAxis
//             dataKey="name"
//             stroke="#737373"
//             tick={{ fontSize: 12 }}
//             interval={0}
//           />
//           <YAxis
//             domain={[0, 100000]} // ✅ Start from 0
//             ticks={[0, 10000, 25000, 50000, 75000, 100000]}
//             stroke="#737373"
//             tickFormatter={(value: number) => `${value / 1000}k`}
//           />
//           <Tooltip
//             formatter={(value: number) => [`${value / 1000}k`, "Revenue"]}
//             contentStyle={{
//               borderRadius: "10px",
//               borderColor: "#22C55E",
//             }}
//           />
//           <Bar dataKey="uv" fill="#22C55E" barSize={45} radius={[0, 0, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
