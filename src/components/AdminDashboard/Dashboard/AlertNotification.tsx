import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} from "@/redux/features/adminDashboard/adminDashboardApi";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const BG_COLORS = ["#FEF1F1", "#FEFAF4", "#E6F3FF"];

const AlertNotification = () => {
  const { data, isLoading, error, refetch } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead({ notificationId }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading notifications...
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load notifications
      </div>
    );
  }

  const notifications = data.data.data;
  const latestNotifications = notifications.slice(0, 3);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Notification</h1>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {latestNotifications.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border border-dashed rounded-xl">
            <p>No notifications yet</p>
          </div>
        ) : (
          latestNotifications.map((item, index) => (
            <div
              key={item.id}
              style={{ backgroundColor: BG_COLORS[index % 3] }}
              className={`p-4 rounded-xl transition-all hover:shadow-md ${
                item.read ? "opacity-80" : "opacity-100"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-base text-[#1C2A33] font-medium ${
                        item.read ? "text-[#1C2A33]" : "text-gray-900"
                      }`}
                    >
                      {item.notification.title}
                    </h3>

                    {!item.read && (
                      <button
                        onClick={() => handleMarkAsRead(item.id)}
                        className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-100"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {item.notification.message}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>
                      {formatDistanceToNow(
                        new Date(item.notification.createdAt),
                        { addSuffix: true }
                      )}
                    </span>

                    {!item.read && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* View All */}
        {notifications.length > 3 && (
          <div className="pt-4 border-t border-gray-200">
            <Link
              to="/admin-dashboard/notifications"
              className="text-center block w-full py-2 text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              View all {notifications.length} notifications →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertNotification;

// import {
//   FaBell,
//   FaCheck,
//   FaClock,
//   FaBuilding,
//   FaUserPlus,
//   FaBullhorn,
// } from "react-icons/fa";
// import {
//   useGetNotificationsQuery,
//   useMarkNotificationAsReadMutation,
//   useMarkAllNotificationsAsReadMutation,
// } from "@/redux/features/adminDashboard/adminDashboardApi";
// import { formatDistanceToNow } from "date-fns";
// import AlertNotificationSkeleton from "./AlertNotificationSkeleton";

// const AlertNotification = () => {
//   const { data, isLoading, error, refetch } = useGetNotificationsQuery();
//   const [markAsRead] = useMarkNotificationAsReadMutation();
//   const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

//   const handleMarkAsRead = async (notificationId: string) => {
//     try {
//       await markAsRead({ notificationId }).unwrap();
//       refetch();
//     } catch (error) {
//       console.error("Failed to mark notification as read:", error);
//     }
//   };

//   const handleMarkAllAsRead = async () => {
//     try {
//       await markAllAsRead().unwrap();
//       refetch();
//     } catch (error) {
//       console.error("Failed to mark all notifications as read:", error);
//     }
//   };

//   if (isLoading) {
//     return <AlertNotificationSkeleton />;
//   }

//   if (error || !data?.success) {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-semibold">Alert & Notification</h1>
//           <p className="text-red-500 mt-2">Failed to load notifications</p>
//         </div>
//       </div>
//     );
//   }

//   const notifications = data.data.data;
//   const latestNotifications = notifications.slice(0, 3); // Show only latest 3

//   const getNotificationIcon = (type: string, title: string) => {
//     if (title.includes("Farm Registration")) return FaBuilding;
//     if (title.includes("Job completed")) return FaCheck;
//     if (type.includes("user")) return FaUserPlus;
//     if (type.includes("job")) return FaBullhorn;
//     return FaBell;
//   };

//   const getNotificationColor = (type: string, title: string) => {
//     if (title.includes("Farm Registration"))
//       return "bg-blue-50 border-l-4 border-blue-500";
//     if (title.includes("Job completed"))
//       return "bg-green-50 border-l-4 border-green-500";
//     if (title.includes("New User"))
//       return "bg-purple-50 border-l-4 border-purple-500";
//     return "bg-yellow-50 border-l-4 border-yellow-500";
//   };

//   const getUnreadCount = () => {
//     return notifications.filter((notification) => !notification.read).length;
//   };

//   const unreadCount = getUnreadCount();

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Alert & Notification
//             </h1>
//           </div>
//         </div>
//         {unreadCount > 0 && (
//           <button
//             onClick={handleMarkAllAsRead}
//             className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 hover:bg-blue-50 rounded-lg transition-colors"
//           >
//             Mark all as read
//           </button>
//         )}
//       </div>

//       {/* Notifications List */}
//       <div className="space-y-4">
//         {latestNotifications.length === 0 ? (
//           <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-xl">
//             <FaBell className="text-3xl mx-auto mb-3 text-gray-400" />
//             <p>No notifications yet</p>
//             <p className="text-sm mt-1">Notifications will appear here</p>
//           </div>
//         ) : (
//           latestNotifications.map((userNotification) => {
//             const Icon = getNotificationIcon(
//               userNotification.notification.type,
//               userNotification.notification.title
//             );
//             const bgColor = getNotificationColor(
//               userNotification.notification.type,
//               userNotification.notification.title
//             );

//             return (
//               <div
//                 key={userNotification.id}
//                 className={`p-4 rounded-xl ${bgColor} transition-all duration-200 hover:shadow-md ${
//                   !userNotification.read ? "opacity-100" : "opacity-80"
//                 }`}
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex items-start gap-3 flex-1">
//                     <div
//                       className={`p-2 rounded-lg ${
//                         !userNotification.read
//                           ? "bg-white shadow-sm"
//                           : "bg-gray-100"
//                       }`}
//                     >
//                       <Icon
//                         className={
//                           !userNotification.read
//                             ? "text-blue-600"
//                             : "text-gray-400"
//                         }
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between">
//                         <h3
//                           className={`text-base font-medium ${
//                             !userNotification.read
//                               ? "text-gray-900"
//                               : "text-gray-600"
//                           }`}
//                         >
//                           {userNotification.notification.title}
//                         </h3>
//                         {!userNotification.read && (
//                           <button
//                             onClick={() =>
//                               handleMarkAsRead(userNotification.id)
//                             }
//                             className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
//                           >
//                             Mark as read
//                           </button>
//                         )}
//                       </div>
//                       <p className="text-gray-600 mt-1">
//                         {userNotification.notification.message}
//                       </p>
//                       <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
//                         <div className="flex items-center gap-1">
//                           <FaClock className="text-xs" />
//                           <span>
//                             {formatDistanceToNow(
//                               new Date(userNotification.notification.createdAt),
//                               { addSuffix: true }
//                             )}
//                           </span>
//                         </div>
//                         {!userNotification.read && (
//                           <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
//                             New
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}

//         {/* View All Link */}
//         {notifications.length > 3 && (
//           <div className="pt-4 border-t border-gray-200">
//             <a
//               href="/admin/notifications"
//               className="text-center block w-full py-2 text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-colors"
//             >
//               View all {notifications.length} notifications →
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AlertNotification;

// const AlertNotification = () => {
//   return (
//     <div className=" space-y-6">
//       <div>
//         <h1 className=" text-2xl">Alert & Notification</h1>
//       </div>
//       <div className=" space-y-4">
//         <div className="p-4 bg-[#FEF1F1] space-y-2 rounded-xl">
//           <p className=" text-base text-[#1C2A33]">Registar a new user</p>
//           <p className=" text-[#6E7272]">Join a new job seeker</p>
//         </div>
//         <div className="p-4 bg-[#FEFAF4] space-y-2 rounded-xl">
//           <p className=" text-base text-[#1C2A33]">A new job post</p>
//           <p className=" text-[#6E7272]">Cow firm post a new job</p>
//         </div>
//         <div className="p-4 bg-[#E6F3FF] space-y-2 rounded-xl">
//           <p className=" text-base text-[#1C2A33]">New support issue</p>
//           <p className=" text-[#6E7272]">Farm owner face a new problem. </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertNotification;
