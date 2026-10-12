import { useState } from "react";

export function Privacy() {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termsOfService, setTermsOfService] = useState("");

  return (
    <div className="p-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-white">Privacy Policy</h2>

      {/* Privacy Policy */}
      <div className="space-y-2">
        <label className="block text-sm font-medium ">Platform/Site Name</label>
        <textarea
          value={privacyPolicy}
          onChange={(e) => setPrivacyPolicy(e.target.value)}
          placeholder="Type your privacy policy....."
          className="w-full h-24 px-3 py-2 border border-[#DDE2EA] bg-[#F9FBFB]  rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Terms of Service */}
      <div className="space-y-2">
        <label className="block text-sm font-medium ">Terms & Conditions</label>
        <textarea
          value={termsOfService}
          onChange={(e) => setTermsOfService(e.target.value)}
          placeholder="Type your Terms & Conditions....."
          className="w-full h-24 px-3 py-2 border border-[#DDE2EA] bg-[#F9FBFB] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}
