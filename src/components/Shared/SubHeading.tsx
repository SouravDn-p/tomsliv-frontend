import { cn } from "@/lib/utils";

interface SubHeadingProps {
  className?: string;
  children: React.ReactNode;
}

export default function SubHeading({ className, children }: SubHeadingProps) {
  return (
    <h3
      className={cn(
        "md:text-2xl font-semibold text-foreground text-left text-subheading-gray",
        className
      )}
    >
      {children}
    </h3>
  );
}
