import { useState, useEffect } from "react";
import { useUpdateNotificationSettingsMutation } from "@/redux/features/adminSettings/adminSettingsApi";
import { NotificationSettings } from "@/redux/types/adminSettings";
import { toast } from "sonner";

interface NotificationProps {
  settings?: NotificationSettings;
}

export function Notification({ settings }: NotificationProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [newEmployerJoin, setNewEmployerJoin] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  const [updateSettings, { isLoading }] =
    useUpdateNotificationSettingsMutation();

  // Initialize with API data
  useEffect(() => {
    if (settings) {
      setEmailNotifications(settings.emailNotifications ?? true);
      setWeeklyDigest(settings.weeklyDigest ?? true);
      setNewEmployerJoin(settings.newEmployerJoin ?? true);
    }
  }, [settings]);

  const checkForChanges = () => {
    if (!settings) return false;
    return (
      emailNotifications !== settings.emailNotifications ||
      weeklyDigest !== settings.weeklyDigest ||
      newEmployerJoin !== settings.newEmployerJoin
    );
  };

  useEffect(() => {
    setHasChanges(checkForChanges());
  }, [emailNotifications, weeklyDigest, newEmployerJoin, settings]);

  const handleSave = async () => {
    try {
      const result = await updateSettings({
        emailNotifications,
        weeklyDigest,
        newEmployerJoin,
      }).unwrap();

      if (result.success) {
        toast.success("Notification settings updated successfully!");
        setHasChanges(false);
      }
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update notification settings. Please try again.");
    }
  };

  const ToggleSwitch = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <button
      type="button"
      onClick={onChange}
      disabled={isLoading}
      className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? "bg-[#205CA5]" : "bg-gray-300"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="p-8 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-[#205CA5] text-white rounded-lg cursor-pointer hover:bg-[#073977] disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-gray-400 text-sm">
                Receive email notifications for important updates
              </p>
            </div>
            <ToggleSwitch
              enabled={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div>
        </div>

        <hr className="border border-[#BACCE3]" />

        <div className="space-y-6">
          <h2 className="text-base font-semibold">Application Alerts</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Weekly Digest</h3>
              <p className="text-gray-400 text-sm">
                Weekly summary of all applications and activities
              </p>
            </div>
            <ToggleSwitch
              enabled={weeklyDigest}
              onChange={() => setWeeklyDigest(!weeklyDigest)}
            />
          </div>
        </div>

        <hr className="border border-[#BACCE3]" />

        <div className="space-y-6">
          <h2 className="text-base font-semibold">Other Communications</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">New employer join</h3>
              <p className="text-gray-400 text-sm">
                Get notified when new employers join the platform
              </p>
            </div>
            <ToggleSwitch
              enabled={newEmployerJoin}
              onChange={() => setNewEmployerJoin(!newEmployerJoin)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useUpdateNotificationSettingsMutation } from "@/redux/features/adminSettings/adminSettingsApi";
// import { NotificationSettings } from "@/redux/types/adminSettings";

// interface NotificationProps {
//   settings?: NotificationSettings;
// }

// export function Notification({ settings }: NotificationProps) {
//   const [emailNotifications, setEmailNotifications] = useState(true);
//   const [weeklyDigest, setWeeklyDigest] = useState(true);
//   const [newEmployerJoin, setNewEmployerJoin] = useState(true);
//   const [hasChanges, setHasChanges] = useState(false);

//   const [updateSettings, { isLoading }] =
//     useUpdateNotificationSettingsMutation();

//   // Initialize with API data
//   useEffect(() => {
//     if (settings) {
//       setEmailNotifications(settings.emailNotifications ?? true);
//       setWeeklyDigest(settings.weeklyDigest ?? true);
//       setNewEmployerJoin(settings.newEmployerJoin ?? true);
//     }
//   }, [settings]);

//   const checkForChanges = () => {
//     if (!settings) return false;
//     return (
//       emailNotifications !== settings.emailNotifications ||
//       weeklyDigest !== settings.weeklyDigest ||
//       newEmployerJoin !== settings.newEmployerJoin
//     );
//   };

//   useEffect(() => {
//     setHasChanges(checkForChanges());
//   }, [emailNotifications, weeklyDigest, newEmployerJoin, settings]);

//   const handleSave = async () => {
//     try {
//       const result = await updateSettings({
//         emailNotifications,
//         weeklyDigest,
//         newEmployerJoin,
//       }).unwrap();

//       if (result.success) {
//         alert("Notification settings updated successfully!");
//         setHasChanges(false);
//       }
//     } catch (error) {
//       console.error("Failed to update settings:", error);
//       alert("Failed to update notification settings. Please try again.");
//     }
//   };

//   const ToggleSwitch = ({
//     enabled,
//     onChange,
//   }: {
//     enabled: boolean;
//     onChange: () => void;
//   }) => (
//     <button
//       type="button"
//       onClick={onChange}
//       disabled={isLoading}
//       className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
//         enabled ? "bg-[#205CA5]" : "bg-gray-300"
//       } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//           enabled ? "translate-x-6" : "translate-x-1"
//         }`}
//       />
//     </button>
//   );

//   return (
//     <div className="p-8 bg-white rounded-xl shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Notification Preferences</h2>
//         {hasChanges && (
//           <button
//             onClick={handleSave}
//             disabled={isLoading}
//             className="px-4 py-2 bg-[#205CA5] text-white rounded-lg cursor-pointer hover:bg-[#073977] disabled:opacity-50"
//           >
//             {isLoading ? "Saving..." : "Save Changes"}
//           </button>
//         )}
//       </div>

//       <div className="space-y-6">
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-medium">Email Notifications</h3>
//               <p className="text-gray-400 text-sm">
//                 Receive email notifications for important updates
//               </p>
//             </div>
//             <ToggleSwitch
//               enabled={emailNotifications}
//               onChange={() => setEmailNotifications(!emailNotifications)}
//             />
//           </div>
//         </div>

//         <hr className="border border-[#BACCE3]" />

//         <div className="space-y-6">
//           <h2 className="text-base font-semibold">Application Alerts</h2>
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-medium">Weekly Digest</h3>
//               <p className="text-gray-400 text-sm">
//                 Weekly summary of all applications and activities
//               </p>
//             </div>
//             <ToggleSwitch
//               enabled={weeklyDigest}
//               onChange={() => setWeeklyDigest(!weeklyDigest)}
//             />
//           </div>
//         </div>

//         <hr className="border border-[#BACCE3]" />

//         <div className="space-y-6">
//           <h2 className="text-base font-semibold">Other Communications</h2>
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-medium">New employer join</h3>
//               <p className="text-gray-400 text-sm">
//                 Get notified when new employers join the platform
//               </p>
//             </div>
//             <ToggleSwitch
//               enabled={newEmployerJoin}
//               onChange={() => setNewEmployerJoin(!newEmployerJoin)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
