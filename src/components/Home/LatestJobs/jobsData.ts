import { JobsType } from "./job.type";
import farmLogo1 from "../../../assets/jobCard/farm1.jpg"
import farmLogo2 from "../../../assets/jobCard/farm2.jpg"
import farmLogo3 from "../../../assets/jobCard/farm3.jpg"

export const jobsData: JobsType[] = [
    {
        id: 1,
        title: "Farm Assistant",
        company: "Evergreen Farm",
        location: "Northern Coast",
        salary: "$65,000 - $75,000/year",
        jobType: "Full-time",
        postedTime: "2 days ago",
        deadline: "09/12/2025",
        description: "Looking for an experienced greenhouse manager to oversee daily operations and staff.",
        tags: ["Full-time", "Management", "Dairy"],
        logo: farmLogo1,
        isSaved: false
    },
    {
        id: 2,
        title: "Crop Production Manager",
        jobType: "part-time",
        company: "GreenFields Agriculture",
        location: "Central Valley",
        salary: "$70,000 - $85,000/year",
        postedTime: "1 day ago",
        deadline: "18/12/2025",
        description: "Responsible for planning, managing, and optimizing large-scale crop production.",
        tags: ["Full-time", "Management", "Crops"],
        logo: farmLogo2,
        isSaved: true
    },
    {
        id: 3,
        title: "Dairy Farm Supervisor",
        company: "Mountain Ridge Dairy",
        location: "Highlands",
        salary: "$55,000 - $68,000/year",
        jobType: "part_time",
        postedTime: "5 hours ago",
        deadline: "22/12/2025",
        description: "Supervise daily dairy farm activities including feeding, milking, and team coordination.",
        tags: ["Part-time", "Dairy", "Supervisor"],
        logo: farmLogo3,
        isSaved: false
    },
    {
        id: 4,
        title: "Greenhouse Technician",
        company: "Urban Growers Co.",
        location: "Metro City",
        salary: "$40,000 - $50,000/year",
        jobType: "full_time",
        postedTime: "3 days ago",
        deadline: "30/12/2025",
        description: "Maintain greenhouse systems, monitor plant health, and assist with harvesting.",
        tags: ["Full-time", "Technician", "Greenhouse"],
        logo: farmLogo2,
        isSaved: false
    },
    {
        id: 5,
        title: "Part-Time Farm Helper",
        company: "Sunrise Organic Farms",
        location: "Coastal Plains",
        salary: "$18/hour",
        postedTime: "1 week ago",
        deadline: "05/01/2026",
        jobType: "part_time",
        description: "Assist with planting, harvesting, and basic farm maintenance on a part-time basis.",
        tags: ["Part-time", "Entry Level", "Organic"],
        logo: farmLogo1,
        isSaved: true
    },
    {
        id: 6,
        title: "Dairy Farm Supervisor",
        company: "Mountain Ridge Dairy",
        location: "Highlands",
        salary: "$55,000 - $68,000/year",
        jobType: "full_time",
        postedTime: "5 hours ago",
        deadline: "22/12/2025",
        description: "Supervise daily dairy farm activities including feeding, milking, and team coordination.",
        tags: ["full_time", "Dairy", "Supervisor"],
        logo: farmLogo3,
        isSaved: false
    },
];
