/* eslint-disable @typescript-eslint/no-explicit-any */
import signupphoto from "@/assets/tomslive/Photo/Signup.svg";
import mainlogo from "@/assets/tomslive/Icon/Logo1.svg";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Container from "@/common/Container";
import { Link, useNavigate } from "react-router-dom";
import { useFarmRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { setUser } from "@/redux/features/auth/authSlice";

const FarmOwnerSignup = () => {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // RTK Query mutation
  const [farmRegister, { isLoading }] = useFarmRegisterMutation();
  const dispatch = useAppDispatch();

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !farmName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!agreeToTerms) {
      toast.error("You must agree to the Terms and Conditions");
      return;
    }

    if (password !== retypePassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.loading("Registering...");
    try {
      const response = await farmRegister({
        email,
        name,
        password,
        farmName,
      }).unwrap();
      toast.dismiss();

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          user: response.data.user,
          token: response.data.token.accessToken,
        })
      );

      toast.success("Farm owner registered successfully!");
      navigate("/owner-dashboard");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <Container variant="secondary">
      {/* Logo */}
      <Link to="/" className="flex justify-end items-center mt-5">
        <img src={mainlogo} alt="FarmLink Logo" />
      </Link>

      <div className="flex items-center justify-center text-black mt-8">
        <div className="w-full flex overflow-hidden">
          {/* Left Image */}
          <div className="hidden lg:flex w-1/2 items-center justify-center">
            <img
              src={signupphoto}
              alt="Signup"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2 lg:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">
              Create your account
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Start managing your farm with FarmLink
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block mb-2">Full Name*</label>
                <input
                  type="text"
                  placeholder="Jason Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] focus:ring-2 focus:ring-[#5583BB] outline-none"
                />
              </div>

              {/* Farm Name */}
              <div>
                <label className="block mb-2">Farm Name*</label>
                <input
                  type="text"
                  placeholder="Green Valley Dairy"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] focus:ring-2 focus:ring-[#5583BB] outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2">Email address*</label>
                <input
                  type="email"
                  placeholder="jason_smith@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] focus:ring-2 focus:ring-[#5583BB] outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2">Password*</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] focus:ring-2 focus:ring-[#5583BB] outline-none"
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={22} />
                      ) : (
                        <AiOutlineEye size={22} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2">Confirm Password*</label>
                <div className="relative">
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] focus:ring-2 focus:ring-[#5583BB] outline-none"
                  />
                  {retypePassword && (
                    <button
                      type="button"
                      onClick={() => setShowRetypePassword(!showRetypePassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showRetypePassword ? (
                        <AiOutlineEyeInvisible size={22} />
                      ) : (
                        <AiOutlineEye size={22} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start mb-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-primary-blue accent-primary-blue"
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  I agree to the{" "}
                  <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                    FarmLink Terms and Conditions
                  </Link>
                  ,{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link
                    to="/cookie-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Cookie Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#205CA5] text-white py-3 rounded-lg hover:bg-[#0c3d79] transition"
              >
                {isLoading ? "Registering..." : "Register Now"}
              </button>
            </form>

            {/* Login Redirect */}
            <p className="text-sm text-gray-400 mt-4 text-center">
              Already have an account?
              <Link
                to="/login"
                className="text-[#205CA5] hover:text-[#052142] ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FarmOwnerSignup;
