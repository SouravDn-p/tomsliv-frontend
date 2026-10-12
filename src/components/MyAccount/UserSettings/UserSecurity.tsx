import { useForm } from "react-hook-form";
import BorderWrapper from "@/components/Reuseable/BorderWrapper";
import Divider from "@/components/Reuseable/Divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AlertModal } from "@/components/Reuseable/AlertModal";

type SecurityFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function UserSecurity() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SecurityFormData>();
  const [changePassword] = useChangePasswordMutation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: SecurityFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword({
        password: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  const onError = () => {
    toast.error("Please fix the errors in the form");
  };
  return (
    <BorderWrapper className="mb-10 md:p-6 p-4">
      <h2 className="text-xl font-medium mb-8">Password & Security</h2>

      <h3 className="mb-6 text-[18px]">Change Password</h3>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-6"
      >
        {/* Current Password */}
        <div className="relative">
          <Label>Current Password</Label>
          <div className="relative">
            <Input
              placeholder="*********"
              type={showCurrentPassword ? "text" : "password"}
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-destructive mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <Label>New Password</Label>
          <div className="relative">
            <Input
              placeholder="*********"
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-destructive mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Label>Confirm New Password</Label>
          <div className="relative">
            <Input
              placeholder="*********"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-fit px-6"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      <Divider />

      {/* Warning */}
      <BorderWrapper className="bg-[#E33A4B1A] border-[#E33A4B40]">
        <h2 className="text-destructive font-medium">Warning</h2>
        <p className="text-paragraph-secondary-gray text-sm">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <AlertModal />
      </BorderWrapper>
    </BorderWrapper>
  );
}
