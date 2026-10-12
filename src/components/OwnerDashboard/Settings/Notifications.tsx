import { useUpdateFarmOwnerNotificationsMutation } from "@/redux/features/notification/notification.Api";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  notificationSettings: {
    emailNotifications: boolean;
    weeklyDigest: boolean;
    newApplicantAlert: boolean;
    updatesAndTips: boolean;
  };
}

interface NotificationsProps {
  user?: User;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: false,
    weeklyDigest: false,
    newApplicantAlert: false,
    updatesAndTips: false,
  });

  // RTK Query mutation hook
  const [updateFarmOwnerNotifications, { isLoading }] =
    useUpdateFarmOwnerNotificationsMutation();

  // Load user notification settings on component mount
  useEffect(() => {
    if (user?.notificationSettings) {
      setNotificationSettings(user.notificationSettings);
    }
  }, [user]);

  // Handle toggle change
  const handleToggleChange = (
    settingName: keyof typeof notificationSettings
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [settingName]: !prev[settingName],
    }));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      // Call the RTK Query mutation
      const response = await updateFarmOwnerNotifications(
        notificationSettings
      ).unwrap();

      // Handle successful response
      console.log("Notification settings updated successfully:", response);

      // Show success message
      toast.success("Notification settings saved successfully!");
    } catch (error: any) {
      console.error("Error saving notification settings:", error);

      // Show error message
      const errorMessage =
        error?.data?.message ||
        "Failed to save notification settings. Please try again.";
      toast.error(errorMessage);

      // Optionally: Revert to previous settings on error
      if (user?.notificationSettings) {
        setNotificationSettings(user.notificationSettings);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Notification Preferences
      </h3>

      {/* Email Notifications Section */}
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Email Notifications
        </h4>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">
              Receive notifications via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationSettings.emailNotifications}
              onChange={() => handleToggleChange("emailNotifications")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
          </label>
        </div>
      </div>

      {/* Application Alerts Section */}
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Application Alerts
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 text-sm">
                New Applicant Alerts
              </p>
              <p className="text-xs text-gray-600">
                Get notified when someone applies to your jobs
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationSettings.newApplicantAlert}
                onChange={() => handleToggleChange("newApplicantAlert")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 text-sm">Weekly Digest</p>
              <p className="text-xs text-gray-600">
                Weekly summary of all applications
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationSettings.weeklyDigest}
                onChange={() => handleToggleChange("weeklyDigest")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Other Communications Section */}
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Other Communications
        </h4>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <p className="font-medium text-gray-900 text-sm">Updates & Tips</p>
            <p className="text-xs text-gray-600">Tips for better hiring</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationSettings.updatesAndTips}
              onChange={() => handleToggleChange("updatesAndTips")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className={`w-full sm:w-auto px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm ${
            isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleSaveChanges}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default Notifications;
