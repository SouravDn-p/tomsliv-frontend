import { cn } from "@/lib/utils";
import { motion } from "motion/react";
interface SectionTitleProps {
  className?: string;
  children: React.ReactNode;
  detail?: string;
}

export default function SectionHeading({
  className,
  children,
  detail,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={cn("text-center", className)}
    >
      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-main-heading-blue">
        {children}
      </h2>
      {detail && (
        <p className="text-sm lg:text-xl text-muted-foreground text-[#565B60] mt-4">
          {detail}
        </p>
      )}
    </motion.div>
  );
}
