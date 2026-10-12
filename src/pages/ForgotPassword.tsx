import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import your RTK mutation
import loginphoto from "@/assets/tomslive/Photo/Forgotpassword.svg";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email.");

    try {
      await forgotPassword(email).unwrap();
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to send reset link:", error);
      toast.error(
        "Something went wrong. Please check your email and try again."
      );
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-white">
      <div className="max-w-5xl w-full flex overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src={loginphoto}
            alt="artist"
            className="h-full w-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2">
              Forgot Password
            </h2>
            <p className="text-start">
              Enter your email and we’ll send you a password reset link.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-black font-sans mb-2">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-[#F5F7FB] text-black focus:ring-2 focus:ring-sky-300 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2E6FF3] text-white hover:bg-[#0c4dcf] font-sans py-3 rounded-xl transition cursor-pointer"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
            {isError && (
              <p className="text-red-500 mt-2">Failed to send email</p>
            )}
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[0.2px] flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center relative">
            <div
              className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl pb-4"
              onClick={closeModal}
            >
              <RxCross2 />
            </div>
            <div className="flex justify-center mb-4">
              <img src={loginphoto} alt="Logo" className="w-20 h-20" />
            </div>
            <p className="text-gray-700">
              We have sent a password reset link successfully to{" "}
              <span className="font-medium">{email}</span>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
