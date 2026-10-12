import React, { useState } from "react";
import { Eye, Share2, Pause, X, Users, MapPin, Calendar } from "lucide-react";

interface JobData {
  id: string;
  title: string;
  location: string;
  status: "Active" | "Paused" | "Closed";
  applicants: number;
  views: number;
  postedDate: string;
  shortlisted: number;
  avgScore: string;
}

const ActiveJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"active" | "paused" | "closed">(
    "active",
  );

  const jobsData: JobData[] = [
    {
      id: "1",
      title: "Milking Technician",
      location: "Green Valley, Wisconsin",
      status: "Active",
      applicants: 12,
      views: 156,
      postedDate: "Nov 12, 2025",
      shortlisted: 8,
      avgScore: "84%",
    },
    {
      id: "2",
      title: "Dairy Farm Manager",
      location: "Green Valley, Wisconsin",
      status: "Active",
      applicants: 12,
      views: 156,
      postedDate: "Nov 12, 2025",
      shortlisted: 8,
      avgScore: "84%",
    },
    {
      id: "3",
      title: "Herdsperson",
      location: "Green Valley, Wisconsin",
      status: "Active",
      applicants: 28,
      views: 238,
      postedDate: "Oct 20, 2025",
      shortlisted: 12,
      avgScore: "86%",
    },
  ];

  const filteredJobs = jobsData.filter(
    (job) => job.status.toLowerCase() === activeTab,
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Active jobs ({filteredJobs.length})
        </h2>

        <div className="flex gap-4 text-sm">
          <button
            onClick={() => setActiveTab("active")}
            className={`pb-2 transition-colors ${
              activeTab === "active"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Active jobs
          </button>
          <button
            onClick={() => setActiveTab("paused")}
            className={`pb-2 transition-colors ${
              activeTab === "paused"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Paused jobs
          </button>
          <button
            onClick={() => setActiveTab("closed")}
            className={`pb-2 transition-colors ${
              activeTab === "closed"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Closed jobs
          </button>
        </div>

        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          Manage
        </button>
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {job.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {job.location}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {job.applicants} applicants
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{job.views} views</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Posted {job.postedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">
                  Shortlisted: {job.shortlisted}
                </span>
                <span className="ml-2 text-green-600 font-medium">
                  Avg. Score: {job.avgScore}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
                View Applicants
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                Share Link
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                <Pause className="w-4 h-4" />
                Pause job
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors">
                <X className="w-4 h-4" />
                Close job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveJobs;
