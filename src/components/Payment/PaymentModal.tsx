import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSecret: string;
  amount: number;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  clientSecret,
  amount,
  onSuccess,
}) => {
  if (!clientSecret) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full sm:max-w-[500px] max-h-[70vh] overflow-y-auto p-4 sm:p-8 bg-white border border-gray-200">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Complete Your Payment
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Your job has been created. Please complete the payment to publish it
            and make it visible to applicants.
          </DialogDescription>
        </DialogHeader>

        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#1e3a8a", // Match your primary blue
              },
            },
          }}
        >
          <CheckoutForm
            amount={amount}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
