import React, { useState } from "react";

interface Ticket {
  id: string;
  ticketId: string;
  user: string;
  issue: string;
  status: "Open" | "Solved" | "In Progress";
  time: string;
}

const SupportTickets: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [tickets] = useState<Ticket[]>([
    {
      id: "1",
      ticketId: "T-1001",
      user: "John Farmer",
      issue: "Payment not processed",
      status: "Open",
      time: "6 min ago",
    },
    {
      id: "2",
      ticketId: "T-1002",
      user: "Sarah Wilson",
      issue: "Unable to login",
      status: "In Progress",
      time: "12 min ago",
    },
    {
      id: "3",
      ticketId: "T-1003",
      user: "Michael Brown",
      issue: "Refund request",
      status: "Solved",
      time: "1 hour ago",
    },
    {
      id: "4",
      ticketId: "T-1004",
      user: "Emily Davis",
      issue: "Account verification issue",
      status: "Open",
      time: "2 hours ago",
    },
  ]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = tickets.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-4">Support Tickets</h2>

      <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-6">
        {/* Table */}
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
            <div className="xl:col-span-4 w-full">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-[800px] w-full text-sm">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">
                        Ticket ID
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">
                        User
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">
                        Issue
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-gray-700">
                        Time
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {currentTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {ticket.ticketId}
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          {ticket.user}
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          {ticket.issue}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              ticket.status === "Solved"
                                ? "bg-green-100 text-green-700"
                                : ticket.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {ticket.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{currentTickets.length}</span>{" "}
            of <span className="font-medium">{tickets.length}</span> entries
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 border rounded-lg text-sm ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            <div className="min-w-[50px] text-center border px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-gray-50">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 border rounded-lg text-sm ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;

// import React, { useState } from "react";
// import rImage from "../../../assets/dashboard/r.png";

// interface Applicant {
//   id: string;
//   name: string;
//   position: string;
//   fitScore: number;
//   experience: string;
//   status: "Reviewed" | "Shortlisted" | "New";
//   joinOn: string;
//   avatar: string;
// }

// const SupportTickets: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [bookings] = useState<Applicant[]>([
//     {
//       id: "1",
//       name: "Cody Fisher",
//       position: "john.doe@email.com",
//       fitScore: 84,
//       experience: "3 years",
//       status: "New",
//       joinOn: "20/10/2021",
//       avatar: "CF",
//     },
//     {
//       id: "2",
//       name: "Jerome Bell",
//       position: "sarah.wilson@email.com",
//       fitScore: 88,
//       experience: "5 years",
//       status: "Shortlisted",
//       joinOn: "20/10/2021",
//       avatar: "JB",
//     },
//     {
//       id: "3",
//       name: "Jacob Jones",
//       position: "admin@store.com",
//       fitScore: 74,
//       experience: "2 years",
//       status: "New",
//       joinOn: "20/10/2021",
//       avatar: "JJ",
//     },
//     {
//       id: "4",
//       name: "Albert Flores",
//       position: "contact@company.com",
//       fitScore: 65,
//       experience: "7 years",
//       status: "Shortlisted",
//       joinOn: "20/10/2021",
//       avatar: "AF",
//     },
//   ]);

//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(bookings.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentUsers = bookings.slice(startIndex, startIndex + itemsPerPage);

//   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNext = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   return (
//     <div className=" space-y-4">
//       <h2 className="text-lg font-medium mb-4">Support Tickets</h2>
//       <div className="">
//         <div className="rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-6">
//           {/* Table */}
//           <div className="p-5 border border-[#E4E4E4] rounded-lg">
//             <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
//               <div className="xl:col-span-4 w-full">
//                 <div className="overflow-x-auto rounded-lg border border-gray-200">
//                   <table className="min-w-[800px] w-full text-sm">
//                     <thead className="bg-gray-100 border-b border-gray-200">
//                       <tr>
//                         <th className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-700">
//                           Ticket ID
//                         </th>
//                         <th className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-700">
//                           User
//                         </th>
//                         <th className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-700">
//                           Issue
//                         </th>
//                         <th className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-700">
//                           Status
//                         </th>
//                         <th className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-700">
//                           Time
//                         </th>
//                         <th className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-700">
//                           Join On
//                         </th>
//                         <th className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-700">
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {currentUsers.map((booking) => (
//                         <tr
//                           key={booking.id}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-3">
//                               <img
//                                 src={rImage}
//                                 alt={booking.avatar}
//                                 className="w-10 h-10 rounded-full object-cover"
//                               />
//                               <div>
//                                 <div className="font-semibold text-gray-900">
//                                   {booking.name}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                             {booking.position}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
//                             {booking.fitScore}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                             {booking.experience}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span
//                               className={`px-3 py-1 text-xs font-medium rounded-full ${
//                                 booking.status === "Shortlisted"
//                                   ? "bg-green-100 text-green-700"
//                                   : booking.status === "Reviewed"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-blue-100 text-blue-700"
//                               }`}
//                             >
//                               {booking.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                             {booking.joinOn}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-center">
//                             <button className="text-blue-500 hover:text-blue-700 font-medium text-sm cursor-pointer">
//                               View
//                             </button>
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
//               Showing <span className="font-medium">{currentUsers.length}</span>{" "}
//               of <span className="font-medium">{bookings.length}</span> entries
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

// export default SupportTickets;
