import React from "react";

const Security: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Password & Security
      </h3>

      {/* Change Password Section */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-gray-900">
          Change Password
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button className="w-full sm:w-auto px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm cursor-pointer">
            Save & Changes
          </button>
        </div>
      </div>

      {/* Warning */}
      <div className="border border-red-200 rounded-xl p-6 bg-red-50">
        <h4 className="text-base font-semibold text-red-900 mb-2">Warning</h4>
        <p className="text-sm text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm cursor-pointer">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Security;
