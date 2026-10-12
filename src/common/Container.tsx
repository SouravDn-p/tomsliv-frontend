import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("w-full max-w-[1440px] mx-auto", {
  variants: {
    variant: {
      default: "md:px-6 px-4 py-14 md:py-20 lg:py-[120px]",
      secondary: "md:px-6 px-4 py-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
}

export default function Container({
  children,
  className,
  variant,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}
