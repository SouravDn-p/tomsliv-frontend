// types/job.ts
export interface Job {
    id: string;
    title: string;
    description: string;
    benefits: string;
    farmSize: number;
    herdSize: number;
    onFarmStaff: number;
    location: string;
    locationType: string;
    jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "SEASONAL" | "TEMPORARY" | "INTERN" | "FIXED_TERM" | "CASUAL";
    role: string;
    numberOfPositions: number;
    requiredExperience: number;
    applicationDeadline: string;
    positionStartDate: string;
    hourType: "week" | "season" | "negotiable";
    hoursPerWeek: number;
    roster: string;
    remunerationPaidBy: string;
    remunerationType: "YEARLY" | "MONTHLY" | "WEEKLY" | "HOURLY";
    remunerationStart: number;
    remunerationEnd: number;
    totalPackageValue?: number;
    perKgMSDollarValue?: number;
    percentageOfMilkCheque?: number;
    farmId: string;
    status: "ACTIVE" | "INACTIVE" | "DRAFT" | "PAUSED" | "CLOSED";
    createdAt: string;
    updatedAt: string;
    applicants: number;
    shortlisted: number;
    averageScore: number;
    views: number;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface JobsResponse {
    success: boolean;
    message: string;
    data: Job[];
    metadata: PaginationMeta;
}
export interface FarmOwnerStat {
    label: string;
    value: number;
    formattedValue: string;
    change: number;
    changeLabel: string;
    trend: "up" | "down" | "neutral";
}

export interface FarmOwnerStatsData {
    activeJobs: FarmOwnerStat;
    totalApplicants: FarmOwnerStat;
    shortlisted: FarmOwnerStat;
    averageJobFit: FarmOwnerStat;
}

export interface FarmOwnerStatsResponse {
    success: boolean;
    message: string;
    data: FarmOwnerStatsData; // ✅ Correct: not an array
}

export interface CreateJobResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        title: string;
        clientSecret?: string;
        pricing?: {
            pricePaid: number;
            currency: string;
            isEarlyAdopter: boolean;
        };
        [key: string]: any;
    };
}

export interface OfferDetails {
    introductoryPrice: number;
    normalPrice: number;
    discountPercentage: number;
    discountUsageLimit: number;
    description: string;
}

export interface IntroductionOfferData {
    isAvailable: boolean;
    totalLimit: number;
    currentCount: number;
    offerDetails: OfferDetails;
}

export interface IntroductionOfferAvailabilityResponse {
    success: boolean;
    message: string;
    data: IntroductionOfferData;
}
