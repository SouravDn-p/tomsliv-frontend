import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn’t load the data. Please try again.",
  action,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-rose-200 bg-rose-50 text-center">
      <AlertTriangle className="text-rose-600" size={28} />

      <h3 className="text-lg font-semibold text-rose-700">{title}</h3>

      <p className="text-sm text-rose-600 max-w-md">{message}</p>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
