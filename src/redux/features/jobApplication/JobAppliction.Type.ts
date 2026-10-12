export interface ApplicationDetails {
    id: string;
    userId: string;
    jobId: string;
    cvId: string;
    isAppliedWithSavedCV: boolean;
    status: "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED";
    appliedAt: string;

    job: Job;
    cv: CV;
    user: User;
    applicationAIResults: ApplicationAIResults;
}

export interface ApplicationDetailsResponse {
    success: boolean;
    message: string;
    data: ApplicationDetails;
}
export interface Job {
    id: string;
    title: string;
    description: string;
    benefits: string;
    farmSize: number;
    herdSize: number;
    onFarmStaff: number;
    location: string;

    jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT";
    role: string;
    numberOfPositions: number;
    requiredExperience: number;

    applicationDeadline: string;
    positionStartDate: string;

    hourType: string;
    hoursPerWeek: number;
    roster: string;

    remunerationPaidBy: string;
    remunerationType: "HOURLY" | "YEARLY";
    remunerationStart: number;
    remunerationEnd: number;

    totalPackageValue: number;
    perKgMSDollarValue: number;
    percentageOfMilkCheque: number;

    farmId: string;
    status: "ACTIVE" | "INACTIVE";
    viewCount: number;

    createdAt: string;
    updatedAt: string;
}
export interface CV {
    id: string;
    isSaved: boolean;

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;

    summary: string;
    jobTitle: string;
    jobType: "FULL_TIME" | "PART_TIME" | "INTERN";

    availability: string;
    hasDrivingLicense: boolean;
    eligibleToWorkInNZ: boolean;
    workPermitType: string;

    customCVId: string;
    createdAt: string;
    updatedAt: string;

    userId: string;
    customCV: CustomCV;
}
export interface CustomCV {
    id: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;

    fileType: "document";
    mimeType: string;
    size: number;

    createdAt: string;
    updatedAt: string;
}
export interface User {
    id: string;
    email: string;
    name: string;
    profilePictureId: string;
    profilePicture: MediaFile;
}
export interface MediaFile {
    id: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;

    fileType: "image";
    mimeType: string;
    size: number;

    createdAt: string;
    updatedAt: string;
}
export interface ApplicationAIResults {
    id: string;
    applicationId: string;

    summary: string;
    motivation: string;
    jobFitScore: number;

    suggestedQuestions: string[];
    strengths: string[];
    areasOfImprovement: string[];
    keyTraits: string[];

    generatedAt: string;
    updatedAt: string;
}
