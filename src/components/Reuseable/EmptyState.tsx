import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a clsx/tailwind-merge utility

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "minimal" | "illustrated";
  size?: "sm" | "md" | "lg";
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
  align?: "center" | "left";
  showBorder?: boolean;
  shadow?: boolean;
  padded?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing to show",
  description = "There's no data to display at the moment. Check back later or add new content.",
  className = "",
  icon,
  action,
  variant = "default",
  size = "md",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  containerClassName = "",
  align = "center",
  showBorder = false,
  shadow = false,
  padded = true,
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: "py-8",
      icon: "text-4xl mb-3",
      title: "text-lg font-semibold",
      description: "text-sm",
    },
    md: {
      container: "py-12",
      icon: "text-5xl mb-4",
      title: "text-xl font-semibold",
      description: "text-base",
    },
    lg: {
      container: "py-16",
      icon: "text-6xl mb-6",
      title: "text-2xl font-semibold",
      description: "text-lg",
    },
  };

  // Variant configurations
  const variantConfig = {
    default: {
      container: "bg-white",
      icon: "text-gray-400",
      title: "text-gray-700",
      description: "text-gray-500",
    },
    minimal: {
      container: "bg-transparent",
      icon: "text-gray-300",
      title: "text-gray-600",
      description: "text-gray-400",
    },
    illustrated: {
      container: "bg-gradient-to-br from-gray-50 to-gray-100/50",
      icon: "text-blue-500",
      title: "text-gray-800",
      description: "text-gray-600",
    },
  };

  return (
    <div
      className={cn(
        "empty-state w-full rounded-xl",
        variantConfig[variant].container,
        sizeConfig[size].container,
        align === "center" ? "text-center" : "text-left",
        showBorder && "border border-gray-200",
        shadow && "shadow-sm",
        padded && "px-4 sm:px-6",
        containerClassName,
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Empty state"
    >
      <div
        className={cn(
          "empty-state-content max-w-md mx-auto",
          align === "center" ? "mx-auto" : "mr-auto"
        )}
      >
        {icon && (
          <div
            className={cn(
              "empty-state-icon mb-4 flex",
              variantConfig[variant].icon,
              sizeConfig[size].icon,
              iconClassName,
              align === "center" ? "justify-center" : "justify-start"
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        <div className="empty-state-text">
          <h2
            className={cn(
              "empty-state-title mb-2",
              variantConfig[variant].title,
              sizeConfig[size].title,
              titleClassName
            )}
          >
            {title}
          </h2>

          {description && (
            <p
              className={cn(
                "empty-state-description mb-6",
                variantConfig[variant].description,
                sizeConfig[size].description,
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </div>

        {action && <div className="empty-state-action mt-6">{action}</div>}
      </div>
    </div>
  );
};
