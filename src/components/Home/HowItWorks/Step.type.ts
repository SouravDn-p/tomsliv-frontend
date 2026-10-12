import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface Step {
    step: number;
    title: string;
    description: string;
    icon: LucideIcon | IconType | string;
}
