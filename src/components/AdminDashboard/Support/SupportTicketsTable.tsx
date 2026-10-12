import React, { useState } from "react";

interface Ticket {
  id: string;
  ticketId: string;
  user: string;
  issue: string;
  status: "Open" | "Solved" | "In Progress";
  time: string;
}

const SupportTicketsTable: React.FC = () => {
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

export default SupportTicketsTable;
