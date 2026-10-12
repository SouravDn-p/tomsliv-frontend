export type JobsType = {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    postedTime: string;
    deadline: string;
    description: string;
    tags: string[];
    logo: string;
    isSaved: boolean;
    jobType: string | undefined;
    [key: string]: any
};
