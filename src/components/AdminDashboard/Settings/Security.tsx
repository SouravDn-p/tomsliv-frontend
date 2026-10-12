import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useChangePasswordMutation } from "@/redux/features/adminSettings/adminSettingsApi";
import { toast } from "sonner";

const Security = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.retypeNewPassword.trim()) {
      newErrors.retypeNewPassword = "Please re-type your new password";
    } else if (formData.newPassword !== formData.retypeNewPassword) {
      newErrors.retypeNewPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Show error toast for first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      toast.error(validationErrors[firstErrorKey]);

      return;
    }

    try {
      const result = await changePassword({
        password: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      if (result.success) {
        // Show success toast
        toast.success("Password updated successfully!");

        // Reset form
        setFormData({
          currentPassword: "",
          newPassword: "",
          retypeNewPassword: "",
        });
        setErrors({});
      }
    } catch (err: any) {
      console.error("Password change failed:", err);

      // Show error toast
      toast.error(
        err?.data?.message || "Failed to update password. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-black">
          Security Settings
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label
                htmlFor="currentPassword"
                className="text-sm text-gray-600"
              >
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  placeholder="Enter current password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) =>
                    handleInputChange("currentPassword", e.target.value)
                  }
                  className={`border-none rounded-xl px-6 py-6 w-full ${
                    errors.currentPassword ? "bg-red-50" : "bg-[#E8EAEB]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-2 top-4 text-sm text-[#205CA5] cursor-pointer"
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash className="h-4 w-8" />
                  ) : (
                    <FaEye className="h-4 w-8" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-sm">{errors.currentPassword}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm text-gray-600">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    placeholder="Enter new password"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) =>
                      handleInputChange("newPassword", e.target.value)
                    }
                    className={`border-none rounded-xl px-6 py-6 w-full ${
                      errors.newPassword ? "bg-red-50" : "bg-[#E8EAEB]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-4 text-sm text-[#205CA5] cursor-pointer"
                  >
                    {showNewPassword ? (
                      <FaEyeSlash className="h-4 w-8" />
                    ) : (
                      <FaEye className="h-4 w-8" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
              </div>

              {/* Re-type New Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="retypeNewPassword"
                  className="text-sm text-gray-600"
                >
                  Re-type New Password
                </Label>
                <div className="relative">
                  <Input
                    id="retypeNewPassword"
                    placeholder="Re-type new password"
                    type={showRetypeNewPassword ? "text" : "password"}
                    value={formData.retypeNewPassword}
                    onChange={(e) =>
                      handleInputChange("retypeNewPassword", e.target.value)
                    }
                    className={`border-none rounded-xl px-6 py-6 w-full ${
                      errors.retypeNewPassword ? "bg-red-50" : "bg-[#E8EAEB]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRetypeNewPassword(!showRetypeNewPassword)
                    }
                    className="absolute right-2 top-4 text-sm text-[#205CA5] cursor-pointer"
                  >
                    {showRetypeNewPassword ? (
                      <FaEyeSlash className="h-4 w-8" />
                    ) : (
                      <FaEye className="h-4 w-8" />
                    )}
                  </button>
                </div>
                {errors.retypeNewPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.retypeNewPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`text-lg flex justify-center items-center gap-2.5 w-full sm:w-[206px] h-[52px] px-4 py-2.5 rounded-lg text-white cursor-pointer ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#205CA5] hover:bg-[#0a458d]"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Security;
