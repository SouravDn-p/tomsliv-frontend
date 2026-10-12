export interface AdminStats {
  label: string;
  value: number;
  formattedValue: string;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
}

export interface AdminStatistics {
  totalUsers: AdminStats;
  totalFarms: AdminStats;
  totalJobs: AdminStats;
  revenue: AdminStats;
}

export interface UserAnalyticsData {
  date: string;
  count: number;
}

export interface NotificationMeta {
  recordId: string;
  recordType: string;
  performedBy: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  meta: NotificationMeta;
  createdAt: string;
  updatedAt: string;
}

export interface UserNotification {
  id: string;
  userId: string;
  notificationId: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  notification: Notification;
}

export interface NotificationsResponse {
  data: UserNotification[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface JobSeeker {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE"; // based on your example
  totalJobsApplied: number;
  experience: string;
  highestEducation: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
interface Metadata {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
export interface GetJobSeekersResponse {
  success: boolean;
  message: string;
  data: JobSeeker[];
  metadata: Metadata;
}

export interface GetFarmsResponse {
  success: boolean;
  message: string;
  data: FarmOwner[];
  metadata: Metadata;
}
export interface FarmOwner {
  id: string;
  farmName: string;
  farmLogo: string | null;
  location: string | null;
  employeeName: string | null;
  employeeEmail: string | null;

  totalJobs: number;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  totalActiveJobs: number;

  recentActiveJobs: FarmJob[];
  recentPreviousJobs: FarmJob[];

  createdAt: string;
  updatedAt: string;
}
export interface FarmJob {
  id: string;
  title: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export interface FarmOwner {
  id: string;
  farmName: string;
  farmLogo: string | null;
  location: string | null;
  employeeName: string | null;
  employeeEmail: string | null;
  // status: string;
  totalJobsPosted: number;
  totalActiveJobs: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetFarmResponse {
  success: boolean;
  message: string;
  data: FarmOwner;
}
export type JobApplicationStatus =
  | "NEW"
  | "REVIEWED"
  | "REJECTED"
  | "SHORTLISTED";

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "FIXED_TERM";
export interface CustomCV {
  id: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  jobType: EmploymentType;
  company: string;
  summary: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
}

export interface SavedCV {
  id: string;
  isSaved: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  jobTitle: string;
  jobType: EmploymentType;
  availability: string;
  hasDrivingLicense: boolean;
  eligibleToWorkInNZ: boolean;
  workPermitType: string;
  customCV: CustomCV;
  experiences: Experience[];
  educations: Education[];
  createdAt: string;
  updatedAt: string;
}
export interface ApplicationJob {
  id: string;
  title: string;
  employmentType: EmploymentType;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFarm {
  id: string;
  name: string;
  location: string | null;
}

export interface ApplicationHistory {
  id: string;
  status: JobApplicationStatus;
  appliedAt: string;
  job: ApplicationJob;
  farm: ApplicationFarm;
}
export interface JobSeekerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileUrl: string;
  createdAt: string;
  totalApplications: number;
  savedCV: SavedCV;
  applicationHistory: ApplicationHistory[];
}

export interface GetJobSeekerDetailsResponse {
  success: boolean;
  message: string;
  data: JobSeekerDetails;
}
