export type JobsResponse = {
    success: boolean;
    message: string;
    data: Job[];
    metadata: Metadata;
};
export type JobType =
    | "FIXED_TERM"
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACT"
    | "SEASONAL"
    | "TEMPORARY"
    | "INTERN" | string;

export interface JobTypeCount {
    type: JobType;
    label: string;
    count: number;
}

export interface JobTypesWithCountsResponse {
    success: boolean;
    message: string;
    data: JobTypeCount[];
}
export interface JobDetailsResponse {
    success: boolean;
    message: string;
    data: Job
}

export interface RemunerationBucket {
    range: string;
    count: number;
    label: string;
}

export interface RemunerationBucketsResponse {
    success: boolean;
    message: string;
    data: RemunerationBucket[];
}
export interface JobRoleCount {
    role: string;
    count: number;
    label: string;
}

export interface JobRolesMetadata {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface JobRolesWithCountsResponse {
    success: boolean;
    message: string;
    data: JobRoleCount[];
    metadata: JobRolesMetadata;
}
export interface JobLocationCount {
    region: string;
    count: number;
    label: string;
}

export interface JobLocationsMetadata {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface JobLocationsWithCountsResponse {
    success: boolean;
    message: string;
    data: JobLocationCount[];
    metadata: JobLocationsMetadata;
}
export type Farm = {
    id: string;
    name: string;
    location: string | null;
    description: string | null;
    website: string | null;
    herdSize: number | null;
    farmType: string | null;
    logoId: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    logo: string | null;
};
export type JobCount = {
    jobApplications: number;
};
export type Job = {
    id: string;
    title: string;
    description: string;
    benefits: string;
    farmSize: number;
    herdSize: number;
    onFarmStaff: number;
    location: string;
    locationType: string;
    jobType: string;
    role: string;
    numberOfPositions: number;
    requiredExperience: number;
    applicationDeadline: string;
    positionStartDate: string;
    hourType: string;
    hoursPerWeek: number;
    roster: string;
    remunerationPaidBy: string;
    remunerationType: string;
    remunerationStart: number;
    remunerationEnd: number;
    totalPackageValue: number;
    perKgMSDollarValue: number;
    percentageOfMilkCheque: number;
    farmId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    farm: Farm;
    _count: JobCount;
};
export type Metadata = {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
};
export type JobStatus = "NEW" | "REVIEWED" | "REJECTED" | "ACCEPTED";

export type AppliedJob = {
    id: string;
    userId: string;
    jobId: string;
    cvId: string;
    isAppliedWithSavedCV: boolean;
    status: "NEW" | "REVIEWED" | "REJECTED" | "ACCEPTED";
    appliedAt: string; // ISO
    job: Job;
    applicationAIResults: any;
};
export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
};
export type AppliedJobsResponse = {
    success: boolean;
    message: string;
    data: AppliedJob[];
    metadata: PaginationMeta;
};
