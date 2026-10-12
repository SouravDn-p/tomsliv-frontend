export interface RecentCVsResponse {
    success: boolean;
    message: string;
    data: CVItem[];
}
export interface CVItem {
    id: string;
    isSaved: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    jobTitle: string;
    jobType: 'INTERN' | 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY';
    availability: string; // ISO date
    hasDrivingLicense: boolean;
    eligibleToWorkInNZ: boolean;
    workPermitType: 'WORK_VISA' | 'RESIDENT' | 'CITIZEN' | string;

    customCVId: string;
    createdAt: string;
    updatedAt: string;
    userId: string;

    experiences: Experience[];
    educations: Education[];

    customCV: CustomCV;
    customCoverLetter?: CustomCV;
    appliedJob: AppliedJob;
    applicant: Applicant;

    appliedAt: string;
    applicationId: string;
}
export interface Experience {
    id: string;
    cvId: string;
    jobTitle: string;
    jobType: 'TEMPORARY' | 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
    company: string;
    summary: string;
    startDate: string;
    endDate: string;
    isOngoing: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface Education {
    id: string;
    cvId: string;
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    isOngoing: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface CustomCV {
    id: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType: 'document';
    mimeType: string;
    size: number;
    createdAt: string;
    updatedAt: string;
}
export interface AppliedJob {
    id: string;
    title: string;
}
export interface Applicant {
    email: string;
    name: string;
    profilePicture: ProfilePicture | null;
}
export interface ProfilePicture {
    id: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType: 'image';
    mimeType: string;
    size: number;
    createdAt: string;
    updatedAt: string;
}

export interface AIResult {
    overallComparison: string;
    strengthsA: string[];
    strengthsB: string[];
    uniqueSkillsA: string[];
    uniqueSkillsB: string[];
    fitComparisonScore: number;
}

export interface CVComparisonResult {
    success: boolean;
    message: string;
    data: {
        cv1: CVItem;
        cv2: CVItem;
        aiResult: AIResult;
    };
}
