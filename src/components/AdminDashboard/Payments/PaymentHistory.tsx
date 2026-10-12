import React, { useState } from "react";
import { useGetPaymentHistoryQuery } from "@/redux/features/adminPayment/adminPaymentApi";
import { CheckCircle, Clock, XCircle, Filter } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentHistoryItem {
  id: string;
  user: {
    name: string;
    email: string;
  };
  subscription: {
    plan: {
      title: string;
    };
  };
  amount: number;
  currency: string;
  status: "PAID" | "PENDING" | "FAILED" | string;
  issuedAt: string;
  paidAt: string | null;
}

const PaymentHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const limit = 8;

  const {
    data: paymentHistory,
    isLoading,
    error,
  } = useGetPaymentHistoryQuery({ page: currentPage, limit });

  // Handle mock data when API returns dummy data
  const paymentData = paymentHistory?.data || [];
  const metadata = paymentHistory?.metadata || {
    page: 1,
    limit: limit,
    total: 0,
    totalPage: 0,
  };

  // Filter data based on status
  const filteredData =
    statusFilter === "ALL"
      ? paymentData
      : paymentData.filter((item) => item.status === statusFilter);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: <CheckCircle className="w-4 h-4" />,
          label: "Paid",
        };
      case "PENDING":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: <Clock className="w-4 h-4" />,
          label: "Pending",
        };
      default:
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: <XCircle className="w-4 h-4" />,
          label: "Failed",
        };
    }
  };

  // Handle download receipt
  // const handleDownload = (paymentId: string) => {
  //   console.log("Downloading receipt for:", paymentId);
  //   // Implement download logic here
  // };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Payment History</h1>
        </div>
        <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-6 animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Payment History</h1>
        </div>
        <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-6">
          <p className="text-red-500">Failed to load payment history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <h1 className="text-2xl font-semibold text-gray-800">
          Payment History
        </h1>

        {/* Filter */}
        <div className="flex w-full sm:w-auto items-center gap-3">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-full cursor-pointer border border-[#C6CAD1] py-2.5 rounded-xl bg-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>

            <SelectContent className="border-none cursor-pointer hover:bg-gray-100">
              <SelectGroup className="bg-white shadow-2xl rounded-sm">
                <SelectItem
                  className="cursor-pointer hover:bg-gray-100"
                  value="ALL"
                >
                  All Status
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-gray-100"
                  value="PAID"
                >
                  Paid
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-gray-100"
                  value="PENDING"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-gray-100"
                  value="FAILED"
                >
                  Failed
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-4 w-full">
          <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-6">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-gray-700 whitespace-nowrap">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      User
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Date
                    </th>
                    {/* <th className="px-6 py-4 text-left font-medium text-gray-700">
                      Actions
                    </th> */}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredData.length > 0 ? (
                    filteredData.map((payment: PaymentHistoryItem) => {
                      const status = getStatusBadge(payment.status);
                      return (
                        <tr
                          key={payment.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {payment.id === "dummy1" ||
                            payment.id === "dummy2" ? (
                              <span className="text-gray-400">
                                {payment.id}
                              </span>
                            ) : (
                              payment.id.substring(0, 8) + "..."
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {payment.user.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {payment.user.email}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                            {payment.subscription.plan.title}
                          </td>

                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900 whitespace-nowrap">
                              {payment.currency}{" "}
                              {payment.amount.toLocaleString()}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bg} ${status.text}`}
                              >
                                {status.icon}
                                <span className="text-xs font-medium">
                                  {status.label}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                            {formatDate(payment.issuedAt)}
                          </td>

                          {/* <td className="px-6 py-4">
                            <button
                              onClick={() => handleDownload(payment.id)}
                              className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              disabled={
                                payment.id === "dummy1" ||
                                payment.id === "dummy2"
                              }
                            >
                              <Download className="w-4 h-4" />
                              Receipt
                            </button>
                          </td> */}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          No payment history found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {metadata.total > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * limit + 1} -{" "}
              {Math.min(currentPage * limit, metadata.total)}
            </span>{" "}
            of <span className="font-medium">{metadata.total}</span> entries
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 border rounded-lg text-sm flex items-center gap-2 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: Math.min(5, metadata.totalPage) },
                (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1.5 border rounded-lg text-sm ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, metadata.totalPage))
              }
              disabled={currentPage === metadata.totalPage}
              className={`px-3 py-1.5 border rounded-lg text-sm flex items-center gap-2 ${
                currentPage === metadata.totalPage
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

// import React, { useState } from "react";

// interface Ticket {
//   id: string;
//   ticketId: string;
//   user: string;
//   issue: string;
//   status: "Open" | "Solved" | "In Progress";
//   time: string;
// }

// const PaymentHistory: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const [tickets] = useState<Ticket[]>([
//     {
//       id: "1",
//       ticketId: "T-1001",
//       user: "John Farmer",
//       issue: "Payment not processed",
//       status: "Open",
//       time: "6 min ago",
//     },
//     {
//       id: "2",
//       ticketId: "T-1002",
//       user: "Sarah Wilson",
//       issue: "Unable to login",
//       status: "In Progress",
//       time: "12 min ago",
//     },
//     {
//       id: "3",
//       ticketId: "T-1003",
//       user: "Michael Brown",
//       issue: "Refund request",
//       status: "Solved",
//       time: "1 hour ago",
//     },
//     {
//       id: "4",
//       ticketId: "T-1004",
//       user: "Emily Davis",
//       issue: "Account verification issue",
//       status: "Open",
//       time: "2 hours ago",
//     },
//   ]);

//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(tickets.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentTickets = tickets.slice(startIndex, startIndex + itemsPerPage);

//   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNext = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   return (
//     <div className=" space-y-4">
//       <div>
//         <h1 className=" text-2xl">Payment History</h1>
//       </div>
//       <div className="space-y-4">
//         <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-6">
//           {/* Table */}
//           <div className="">
{
  /* <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
  <div className="xl:col-span-4 w-full">
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-[800px] w-full text-sm">
                    <thead className="bg-gray-100 border-b border-gray-200"> */
}
//                       <tr>
//                         <th className="px-6 py-4 text-left font-medium text-gray-700">
//                           Ticket ID
//                         </th>
//                         <th className="px-6 py-4 text-left font-medium text-gray-700">
//                           User
//                         </th>
//                         <th className="px-6 py-4 text-left font-medium text-gray-700">
//                           Issue
//                         </th>
//                         <th className="px-6 py-4 text-left font-medium text-gray-700">
//                           Status
//                         </th>
//                         <th className="px-6 py-4 text-left font-medium text-gray-700">
//                           Time
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-gray-100">
//                       {currentTickets.map((ticket) => (
//                         <tr
//                           key={ticket.id}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-6 py-4 font-medium text-gray-900">
//                             {ticket.ticketId}
//                           </td>

//                           <td className="px-6 py-4 text-gray-700">
//                             {ticket.user}
//                           </td>

//                           <td className="px-6 py-4 text-gray-700">
//                             {ticket.issue}
//                           </td>

//                           <td className="px-6 py-4">
//                             <span
//                               className={`px-3 py-1 text-xs font-medium rounded-full ${
//                                 ticket.status === "Solved"
//                                   ? "bg-green-100 text-green-700"
//                                   : ticket.status === "In Progress"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-blue-100 text-blue-700"
//                               }`}
//                             >
//                               {ticket.status}
//                             </span>
//                           </td>

//                           <td className="px-6 py-4 text-gray-600">
//                             {ticket.time}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="mt-6 flex items-center justify-between">
//             <p className="text-sm text-gray-600">
//               Showing{" "}
//               <span className="font-medium">{currentTickets.length}</span> of{" "}
//               <span className="font-medium">{tickets.length}</span> entries
//             </p>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1.5 border rounded-lg text-sm ${
//                   currentPage === 1
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 Prev
//               </button>

//               <div className="min-w-[50px] text-center border px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-gray-50">
//                 {currentPage} / {totalPages}
//               </div>

//               <button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1.5 border rounded-lg text-sm ${
//                   currentPage === totalPages
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;
