import * as React from "react";
import { Link, type LinkProps } from "react-router-dom";
import { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

const HoverEffect = () => (
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent" />
);

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    { to, className, variant, size, children, ...props },
    ref
  ) {
    return (
      <Link
        ref={ref}
        to={to}
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size }),
          "relative overflow-hidden group",
          className
        )}
        {...props}
      >
        {children}

        {[
          "primary",
          "outline",
          "outlineWhite",
          "default",
          "destructive",
        ].includes(variant || "default") && <HoverEffect />}
      </Link>
    );
  }
);
