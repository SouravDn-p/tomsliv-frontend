import { cn } from "@/lib/utils";

interface SectionTitleProps {
  className?: string;
  children: React.ReactNode;
}

export default function SectionTitle({
  className,
  children,
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-4xl text-center text-main-heading-black font-bold text-foreground",
        className
      )}
    >
      {children || "SectionTitle"}
    </h2>
  );
}
