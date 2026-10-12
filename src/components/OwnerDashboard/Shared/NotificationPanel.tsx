import React, { useState } from "react";
import { X } from "lucide-react";


interface Notification {
  id: string;
  iconImage?: string;
  icon?: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  date: string;
  isRead: boolean;
}

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      icon: "📄",
      iconBg: "bg-blue-100",
      title: "New CV's uploaded",
      description: "Philippine # 513 --- I can do all things through Christ who strengthens me...",
      time: "Just now",
      date: "Oct 13, 08:44 pm",
      isRead: false
    },
    {
      id: "2",
      icon: "🎯",
      iconBg: "bg-purple-100",
      title: "It's shortlisted",
      description: "Take a deep breath and restart. I am not alone, for God walks beside me.",
      time: "1 min ago",
      date: "Oct 13, 08:44 pm",
      isRead: false
    },
    {
      id: "3",
      icon: "💡",
      iconBg: "bg-yellow-100",
      title: "Perfect matching",
      description: "A member started a new reflection in 'Healing & Hope'. Join the discussion.",
      time: "4 days ago",
      date: "Oct 13, 08:44 pm",
      isRead: false
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const filteredNotifications = activeTab === "unread" 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-gray-900">Notification</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-sm text-gray-500">Overview of all notification and applications</p>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                activeTab === "unread"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
          <button
            onClick={markAllAsRead}
            className="text-blue-500 hover:text-blue-600 font-semibold text-sm transition-colors cursor-pointer"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {filteredNotifications.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-center">No notifications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                  notification.isRead
                    ? "bg-white border-gray-200"
                    : "bg-blue-50 border-blue-100"
                }`}
              >
                {/* Blue Dot Indicator */}
                {!notification.isRead && (
                  <div className="absolute top-4 right-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${notification.iconBg} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                    {notification.iconImage ? (
                      <img 
                        src={notification.iconImage} 
                        alt={notification.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">{notification.icon}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="font-bold text-gray-900 text-base mb-1.5">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium">{notification.time}</span>
                      <span className="text-gray-400">{notification.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
// // src/components/NotificationPanelStatic.tsx
// import { X, Check, Trash2 } from "lucide-react";

// interface NotificationPanelProps {
//   onClose: () => void;
// }

// const staticNotifications = [
//   {
//     id: "1",
//     title: "Parcel #123 has been delivered",
//     parcelId: "123",
//     isRead: false,
//     createdAt: "2025-11-11T09:30:00",
//   },
//   {
//     id: "2",
//     title: "New parcel assigned to you",
//     parcelId: "124",
//     isRead: true,
//     createdAt: "2025-11-10T15:20:00",
//   },
//   {
//     id: "3",
//     title: "Payment received for parcel #125",
//     parcelId: "125",
//     isRead: false,
//     createdAt: "2025-11-09T11:45:00",
//   },
// ];

// export default function NotificationPanel({ onClose }: NotificationPanelProps) {
//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleString("en-US", {
//         month: "long",
//         day: "numeric",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white  shadow-xl border border-gray-200 overflow-hidden">
//       <div className="border-b border-[#E9EAEB]">
//         <div className="flex items-center justify-between p-4">
//           <h2 className="text-lg font-semibold text-blue-600">Notifications</h2>
//           <button onClick={onClose} className="cursor-pointer">
//             <X className="w-5 h-5 text-gray-400 hover:text-red-500" />
//           </button>
//         </div>
//         <p className="text-sm text-gray-500 px-4 pt-2 pb-3">
//           You have {staticNotifications.filter((n) => !n.isRead).length} unread
//           notifications
//         </p>
//       </div>

//       <div className="divide-y divide-[#B2DDFF] max-h-96 overflow-y-auto">
//         {staticNotifications.length === 0 ? (
//           <div className="p-4 text-center text-gray-500">
//             No notifications available
//           </div>
//         ) : (
//           staticNotifications.map((notif, index) => (
//             <div
//               key={notif.id}
//               className={`px-4 py-3 space-y-1 text-sm cursor-pointer ${
//                 notif.isRead ? "bg-gray-50" : "bg-blue-50"
//               }`}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p
//                     className={`font-medium ${
//                       notif.isRead ? "text-gray-700" : "text-blue-700"
//                     }`}
//                   >
//                     {index + 1}. {notif.title}
//                   </p>
//                   <p className="text-gray-500">
//                     Date & Time: {formatDate(notif.createdAt)}
//                   </p>
//                 </div>
//                 <div className="flex space-x-2">
//                   {!notif.isRead && (
//                     <button
//                       className="text-green-600 hover:text-green-800"
//                       title="Mark as read"
//                     >
//                       <Check className="w-4 h-4" />
//                     </button>
//                   )}
//                   <button
//                     className="text-red-500 hover:text-red-700 cursor-pointer"
//                     title="Delete notification"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
