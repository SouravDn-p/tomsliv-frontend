export interface CVFormData {
    firstName: string
    lastName: string
    phone: string
    email: string
    location: string
    cvFileId?: string;
    fileId?: string
    coverLetterFileId?: string
    jobTitle: string
    role: string
    workType: string
    availableFrom: string
    careerSummary: string

    workExperience: {
        company: string
        jobTitle: string
        role?: string
        jobType: string
        startDate: string
        endDate: string
        isOngoing: boolean
        summary: string
    }[]

    education: {
        degree: string
        institution: string
        startDate: string
        endDate?: string
        isOngoing: boolean
    }[]

    hasDriverLicense: string
    eligibleToWork: string
    workPermitType?: string

    cvFile?: File
    isPublic: boolean
}
