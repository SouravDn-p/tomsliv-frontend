import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
};

export default function Divider({ className }: DividerProps) {
  return <div className={cn(" bg-divider-lightBlue h-px my-8", className)} />;
}
