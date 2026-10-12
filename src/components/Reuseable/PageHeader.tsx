import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  titleClassName,
  descriptionClassName,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      <h1
        className={cn(" lg:text-3xl text-2xl font-semibold text-gray-900", titleClassName)}
      >
        {title}
      </h1>

      {description && (
        <p className={cn("text-gray-600 mt-1", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
