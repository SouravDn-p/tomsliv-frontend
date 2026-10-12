import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function BorderWrapper({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "border border-border-primary flex flex-col p-8 rounded-xl bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
