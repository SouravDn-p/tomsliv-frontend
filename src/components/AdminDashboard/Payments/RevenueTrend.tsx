import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useGetLast6MonthsRevenueQuery } from "@/redux/features/adminPayment/adminPaymentApi";
import { TrendingUp } from "lucide-react";

const RevenueTrend = () => {
  const {
    data: revenueData,
    isLoading,
    error,
  } = useGetLast6MonthsRevenueQuery();

  // Format data for chart
  const chartData = revenueData || [];
  const categories = chartData.map((item) => item.label);
  const seriesData = chartData.map((item) => item.value);

  // Calculate stats
  const totalRevenue = chartData.reduce((sum, item) => sum + item.value, 0);
  const averageRevenue =
    chartData.length > 0 ? totalRevenue / chartData.length : 0;
  const maxRevenue = Math.max(...seriesData);

  // Apex Chart Options
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#4CA7E8"],
    },
    xaxis: {
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      min: 0,
      max: maxRevenue > 0 ? maxRevenue * 1.2 : 1000, // Add 20% padding
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: { colors: "#6B7280" },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      padding: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
        title: {
          formatter: () => "Revenue",
        },
      },
      theme: "light",
    },
    colors: ["#4CA7E8"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: "#4CA7E8", opacity: 0.4 },
          { offset: 90, color: "#4CA7E8", opacity: 0.1 },
          { offset: 100, color: "#4CA7E8", opacity: 0 },
        ],
      },
    },
    markers: {
      size: 5,
      colors: ["#4CA7E8"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[748px] bg-white p-6 rounded-xl shadow animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="h-[350px] bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[748px] bg-white p-6 rounded-xl shadow">
        <div className="mb-6">
          <h1 className="text-[24px] leading-[130%] font-medium text-[#343A40]">
            Revenue Trend (Last 6 Months)
          </h1>
          <p className="text-red-500 mt-2">Failed to load revenue data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  bg-white p-6 rounded-xl shadow">
      {/* Header with Stats */}
      <div className="mb-6">
        <h1 className="text-[24px] leading-[130%] font-medium text-[#343A40]">
          Revenue Trend (Last 6 Months)
        </h1>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-lg font-semibold text-gray-800">
              ${totalRevenue.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">Total Revenue</span>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-800">
              $
              {averageRevenue.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="text-sm text-gray-500">Monthly Average</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ReactApexChart
        options={options}
        series={[{ name: "Revenue", data: seriesData }]}
        type="area"
        height={350}
      />
    </div>
  );
};

export default RevenueTrend;

// import ReactApexChart from "react-apexcharts";
// import type { ApexOptions } from "apexcharts";

// const RevenueTrend = () => {
//   // ✅ Fixed 7-day categories
//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   // ✅ Static revenue data (7 days)
//   const revenueData = [60, 150, 230, 310, 420, 480, 500];

//   // ✅ Apex Chart Options
//   const options: ApexOptions = {
//     chart: {
//       type: "area",
//       toolbar: { show: false },
//     },
//     dataLabels: { enabled: false },
//     stroke: {
//       curve: "smooth",
//       width: 2,
//       colors: ["#4CA7E8"],
//     },
//     xaxis: {
//       categories: days,
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//       labels: {
//         style: { colors: "#6B7280" },
//       },
//     },
//     yaxis: {
//       min: 0,
//       max: 500,
//       tickAmount: 5,
//       labels: {
//         formatter: (val) => `${Math.round(val)}+`,
//         style: { colors: "#6B7280" },
//       },
//     },
//     grid: {
//       borderColor: "#E5E7EB",
//       strokeDashArray: 4,
//     },
//     tooltip: {
//       enabled: true,
//       y: {
//         formatter: (val) => `${val} Bookings`,
//       },
//     },
//     colors: ["#4CA7E8"],
//     fill: {
//       type: "gradient",
//       gradient: {
//         shadeIntensity: 1,
//         opacityFrom: 0.5,
//         opacityTo: 0,
//         stops: [0, 90, 100],
//         colorStops: [
//           { offset: 0, color: "#4CA7E8", opacity: 0.4 },
//           { offset: 90, color: "#4CA7E8", opacity: 0.1 },
//           { offset: 100, color: "#4CA7E8", opacity: 0 },
//         ],
//       },
//     },
//   };

//   return (
//     <div className="w-full max-w-[748px] bg-white p-6 rounded-xl shadow">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-[24px] leading-[130%] font-medium text-[#343A40]">
//           Revenue Trend (Last 6 Months)
//         </h1>
//       </div>

//       {/* Chart */}
//       <ReactApexChart
//         options={options}
//         series={[{ name: "Bookings", data: revenueData }]}
//         type="area"
//         height={350}
//       />
//     </div>
//   );
// };

// export default RevenueTrend;
