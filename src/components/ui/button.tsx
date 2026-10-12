import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group",
  {
    variants: {
      variant: {
        // LIGHTER hover for #1868C9 base color
        primary:
          "bg-primary-blue text-white font-normal hover:bg-[#2a7ce0] hover:shadow-lg hover:shadow-primary-blue/20 disabled:bg-[#6A92C3]",
        // #2a7ce0 is lighter than #1868C9

        default: "bg-primary text-primary-foreground ",
        destructive:
          "text-[#E33A4B] shadow-xs border-[#E33A4B] border hover:bg-transparent hover:shadow-lg hover:shadow-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 ",
        outline:
          "border border-primary-blue rounded-lg text-primary-blue bg-background shadow-xs hover:bg-primary-blue/10 hover:border-primary-blue/90 hover:shadow-sm dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        outlineWhite:
          "border border-white rounded-lg text-white bg-transparent shadow-xs hover:bg-white/10 hover:border-white/90 hover:shadow-sm dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const HoverEffect = () => (
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent " />
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {/* Optional: Add subtle shine effect on hover for primary and outline variants */}
      {[
        "primary",
        "outline",
        "outlineWhite",
        "default",
        "destructive",
      ].includes(variant || "default") && <HoverEffect />}
    </Comp>
  );
}

export { Button, buttonVariants };
