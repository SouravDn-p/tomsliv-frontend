import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StackProps = {
  children: ReactNode;
  gap?: string;
  direction?: "col" | "row";
  className?: string;
};

export default function Stack({
  children,
  gap = "gap-2",
  direction = "col",
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row justify-between",
        gap,
        className
      )}
    >
      {children}
    </div>
  );
}
