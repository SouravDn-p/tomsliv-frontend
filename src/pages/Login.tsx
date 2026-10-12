/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
// import loginphoto from "@/assets/tomslive/Photo/Login.svg";
import loginphoto from "@/assets/tomslive/Photo/Login.png";
import mainlogo from "@/assets/tomslive/Icon/Logo1.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { setUser } from "@/redux/features/auth/authSlice";
import Container from "@/common/Container";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
   const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      const { data } = response;

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          user: data.user,
          token: data.token.accessToken,
        })
      );

      toast.success("Login successful!");

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        // Role-based redirect
        switch (data.user.role) {
          case "SUPER_ADMIN":
          case "ADMIN":
            navigate("/admin-dashboard");
            break;
          case "FARM_OWNER":
            navigate("/owner-dashboard");
            break;
          case "USER":
          default:
            navigate("/my-account/applications");
            break;
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed!");
    }
  };

  return (
    <Container variant={"secondary"}>
      <Link to="/" className=" flex justify-end items-center mt-5 ">
        <img src={mainlogo} alt="" />
      </Link>
      <div className="flex items-center justify-center text-black mt-24">
        <div className="max-w-5xl w-full flex overflow-hidden">
          {/* Left Side - Image */}
          <div className="hidden lg:flex w-1/2 items-center justify-center">
            <img
              src={loginphoto}
              alt="Login illustration"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 md:p-10 p-6 flex flex-col justify-center">
            <div className="mb-4">
              <h2 className="text-start text-2xl md:text-3xl lg:text-4xl font-sans mb-4">
                Log in to FarmLink
              </h2>
              <p>Welcome back! Please log in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="text-black font-sans mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jason_smith@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="text-black font-sans mb-2">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
                    required
                  />

                  {password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-black transition-colors duration-200 focus:outline-none cursor-pointer"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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

              <div>
                <Link to="/forgot-password">
                  <p className="text-sm text-[#205CA5] hover:text-[#052142] mt-4 text-end">
                    Forget Password?
                  </p>
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#205CA5] text-white hover:bg-[#0c3d79] font-sans py-3 rounded-lg transition cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-4 text-center">
              Don't have an account?
              <Link
                to="/create-account"
                className="text-[#205CA5] hover:text-[#052142] ml-1"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;