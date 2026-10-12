/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAllNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/features/notification/notification.Api";
import { useState } from "react";
import { toast } from "sonner";

const typeColors: Record<string, string> = {
  "queue:notification": "text-blue-600",
  cv: "text-blue-600",
  shortlisted: "text-purple-600",
  perfect: "text-yellow-600",
};

// Format the time difference
const formatTimeDifference = (dateString: string) => {
  const notificationDate = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - notificationDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

  // Format date for older notifications
  return notificationDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      notificationDate.getFullYear() !== now.getFullYear()
        ? "numeric"
        : undefined,
  });
};

// Format full date
const formatFullDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<"All" | "Unread">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { data, isLoading, error, refetch } = useGetAllNotificationsQuery({
    page: currentPage,
    limit,
  });
  const [markAllAsRead, { isLoading: isMarkAllAsReadLoading }] =
    useMarkAllNotificationsReadMutation();
  const [markNotificationRead] = useMarkNotificationReadMutation();

  const notificationsData = data?.data?.data || [];
  const metaData = data?.data?.meta || {
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 0,
  };

  // Filter notifications based on active tab
  const filteredNotifications =
    activeTab === "All"
      ? notificationsData
      : notificationsData.filter((n: any) => !n.read);

  const unreadCount = notificationsData.filter((n: any) => !n.read).length;

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All notifications marked as read");
      setCurrentPage(1);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to mark all as read");
      console.error("Failed to mark all as read:", error);
    }
  };

  // Handle mark single notification as read
  const handleMarkNotificationRead = async (notificationId: string) => {
    try {
      await markNotificationRead(notificationId).unwrap();
      toast.success("Notification marked as read");

      // If we're on the "Unread" tab and this was the only unread notification,
      // we might want to refetch to update the list
      if (activeTab === "Unread") {
        refetch();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to mark notification as read"
      );
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Handle notification click - mark as read if unread
  const handleNotificationClick = async (notification: any) => {
    if (!notification.read) {
      handleMarkNotificationRead(notification.id);
    }
    // You can also add navigation or other actions here
    // For example: if (notification.notification.meta?.recordId) {
    //   navigate(`/some-path/${notification.notification.meta.recordId}`);
    // }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Notification</h1>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-gray-100 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Notification</h1>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            Error loading notifications. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-4 text-[#205CA5]">
        Notification
      </h1>
      <p className="text-paragraph-secondary-gray mb-4">
        Overview of all candidates and applications
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
          <button
            className={`flex-1 cursor-pointer sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "All"
                ? "bg-white text-blue-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
          <button
            className={`flex-1 cursor-pointer sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "Unread"
                ? "bg-white text-blue-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("Unread")}
          >
            Unread ({unreadCount})
          </button>
        </div>

        <button
          className="w-full sm:w-auto ml-auto px-4 py-2 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0 || isMarkAllAsReadLoading}
        >
          {isMarkAllAsReadLoading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
              <span>Processing...</span>
            </div>
          ) : (
            "Mark all read"
          )}
        </button>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {activeTab === "Unread"
              ? "No unread notifications"
              : "No notifications found"}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {filteredNotifications.map((notification: any) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl cursor-pointer ${
                  !notification.read
                    ? "bg-blue-50/60 border-blue-100"
                    : "bg-white border-gray-100"
                } border mb-3 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-all duration-200 group`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`${
                        typeColors[notification.notification.type] ||
                        "text-gray-700"
                      } font-semibold text-sm sm:text-base capitalize`}
                    >
                      {notification.notification.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs sm:hidden">
                        • {formatTimeDifference(notification.createdAt)}
                      </span>
                      {!notification.read && (
                        <span className="text-[10px] font-bold tracking-wider text-blue-700 uppercase px-2 py-0.5 bg-blue-100 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {notification.notification.message}
                  </p>
                  <p className="text-gray-400 text-xs mt-2 sm:hidden">
                    {formatFullDate(notification.createdAt)}
                  </p>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-2 min-w-[120px]">
                  <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                    {formatTimeDifference(notification.createdAt)}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {formatFullDate(notification.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {metaData.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>

              {Array.from(
                { length: Math.min(5, metaData.totalPages) },
                (_, i) => {
                  let pageNum;
                  if (metaData.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= metaData.totalPages - 2) {
                    pageNum = metaData.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}

              {metaData.totalPages > 5 &&
                currentPage < metaData.totalPages - 2 && (
                  <span className="px-2">...</span>
                )}

              {metaData.totalPages > 5 &&
                currentPage < metaData.totalPages - 2 && (
                  <button
                    onClick={() => handlePageChange(metaData.totalPages)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === metaData.totalPages
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {metaData.totalPages}
                  </button>
                )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === metaData.totalPages}
                className={`px-3 py-1 border rounded ${
                  currentPage === metaData.totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Page info */}
          <div className="text-center text-gray-500 text-sm mt-2">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, metaData.total)} of {metaData.total}{" "}
            notifications
          </div>
        </>
      )}
    </div>
  );
}
