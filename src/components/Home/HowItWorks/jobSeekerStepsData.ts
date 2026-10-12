import { FaUserPlus } from "react-icons/fa6";
import { Step } from "./Step.type";
import { IoMdEye } from "react-icons/io";
import { ClipboardList, Search, Share2 } from "lucide-react";
import { TbTargetArrow } from "react-icons/tb";
export const jobSeekerSteps: Step[] = [
    {
        step: 1,
        title: "Create Profile",
        description: " Set up an account with your details.",
        icon: FaUserPlus,
    },
    {
        step: 2,
        title: "Create Advert",
        description: "Post a job with details of your farm and the role.",
        icon: ClipboardList,
    },
    {
        step: 3,
        title: "Define Ideal Candidate",
        description: "Set your criteria to help AI match the best applicants with your farm.",
        icon: Search,
    },
    {
        step: 4,
        title: "Share Link",
        description: "Share your job link across social media and job boards.",
        icon: Share2,
    },
    {
        step: 5,
        title: "View Applicants",
        description: "Review job applicants based on AI-generated summaries and fit scores.",
        icon: IoMdEye,
    },
    {
        step: 6,
        title: "Short-List for Interview",
        description: "Manage your applicants and progress to interviews.",
        icon: TbTargetArrow,
    },
];
