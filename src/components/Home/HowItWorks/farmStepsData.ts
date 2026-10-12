import { FaUserPlus } from "react-icons/fa6";
import { Step } from "./Step.type";
import addFileIcon from "../../../assets/cardIcon/file.svg"
import notify from "../../../assets/cardIcon/notification.svg"
import foldFile from "../../../assets/cardIcon/foldFile.svg"
import { MdOutlineRateReview } from "react-icons/md";

export const farmSteps: Step[] = [
    {
        step: 1,
        title: "Create Profile",
        description: "Register your farm or company profile",
        icon: FaUserPlus,
    },
    {
        step: 2,
        title: "Post Requirements",
        description: "List your job openings with details",
        icon: addFileIcon,
    },
    {
        step: 3,
        title: "Receive Applications",
        description: "Get qualified candidates instantly ",
        icon: notify,

    },
    {
        step: 4,
        title: "Review & Shortlist",
        description: "Evaluate profiles and select candidates  ",
        icon: MdOutlineRateReview,
    },
    {
        step: 5,
        title: "Hire & Manage",
        description: "Connect with workers and manage onboarding",
        icon: foldFile,
    },
];
