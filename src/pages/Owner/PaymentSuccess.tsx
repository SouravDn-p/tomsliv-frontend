import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Your payment has been processed successfully. Your job post is now live
        and visible to potential candidates.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => navigate("/owner-dashboard/my-jobs")}
          className="bg-primary-blue hover:bg-blue-700 text-white"
        >
          Go to My Jobs
        </Button>
        <Button variant="outline" onClick={() => navigate("/owner-dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
