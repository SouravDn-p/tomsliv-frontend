import React from 'react';

const Billing: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Pricing Section */}
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Simple, Transparent Pricing for Farmers</h3>
        <p className="text-xs sm:text-sm text-gray-600">Pay only for what you need. No hidden fees. No long-term commitments.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Pricing Card */}
        <div className="flex-1">
          <div className="border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">$280<span className="text-sm sm:text-base font-normal text-gray-600">/month</span></p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                ℹ️
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Plan Description:</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Perfect for farms looking to hire workers quickly and efficiently. Post your job for 30 days and receive applications directly through FarmLink.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">✓</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-700">30-day job advert visibility</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">✓</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-700">Unlimited applicants</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">✓</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-700">AI-generated job description & advert writing assistance</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">✓</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-700">Applicant tracking dashboard</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">✓</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-700">AI-powered shortlisting & insights</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">✓</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-700">Automatic email notifications to shortlisted candidates</span>
              </div>
            </div>

            <button className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs sm:text-sm cursor-pointer">
              Update your monthly plan
            </button>
          </div>
        </div>

        {/* Billing History Sidebar */}
        <div className="w-full lg:w-64 lg:flex-shrink-0">
          <div className="border border-gray-200 rounded-xl p-3 sm:p-4">
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Plan/Billing History</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">November</span>
                  <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs font-medium rounded">
                    Closed
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2 sm:mb-3">2 Job post</p>
                <button className="w-full px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                  Upgrade again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;