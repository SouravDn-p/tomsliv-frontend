import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSmallProps = {
  children: ReactNode;
  className?: string;
};

export default function TextSmall({ children, className }: TextSmallProps) {
  return (
    <p className={cn("text-paragraph-secondary-gray text-sm", className)}>
      {children}
    </p>
  );
}
