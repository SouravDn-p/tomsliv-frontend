/* eslint-disable @typescript-eslint/no-explicit-any */
import mainlogo from "@/assets/tomslive/Icon/Logo1.svg";
import signupphoto from "@/assets/tomslive/Photo/Signup.svg";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Container from "@/common/Container";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { setUser } from "@/redux/features/auth/authSlice";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [handelUserRegister, { isLoading }] = useRegisterMutation();
   const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !retypePassword) {
      toast.error("Please fill in all fields");
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
    try {
      const response = await handelUserRegister({
        name: fullName,
        email,
        password,
      }).unwrap();

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          user: response.data.user,
          token: response.data.token.accessToken,
        })
      );

      toast.success("Account created successfully!");
      navigate(redirectPath || "/my-account/applications");
      
      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setRetypePassword("");
    } catch (error: any) {
      toast.error(error?.data?.message || error.message || "Registration failed");
    }
  };
  return (
    <Container className="flex-col" variant="secondary">
      <Link to="/" className="flex justify-end items-center mt-5">
        <img src={mainlogo} alt="Logo" />
      </Link>

      <div className="px-4 text-black mt-8 w-full">
        <div className="w-full flex gap-9 lg:gap-20 items-stretch">
          {/* Left Side - Image */}
          <div className="hidden md:flex w-1/2">
            <img
              src={signupphoto}
              className="h-full w-full object-cover rounded-xl"
              alt="Signup illustration"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2">
              Create your account
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Find your next career in the dairy industry
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="text-black font-sans mb-2">
                  Full Name*
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jason Smith"
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="text-black font-sans mb-2">
                  Email address*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jason_smith@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
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
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
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

              {/* Retype Password */}
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="retypePassword"
                  className="text-black font-sans mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <input
                    id="retypePassword"
                    type={showRetypePassword ? "text" : "password"}
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
                  />
                  {retypePassword && (
                    <button
                      type="button"
                      onClick={() => setShowRetypePassword(!showRetypePassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-black transition-colors duration-200 focus:outline-none cursor-pointer"
                      aria-label={
                        showRetypePassword
                          ? "Hide retype password"
                          : "Show retype password"
                      }
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
                    className="w-4 h-4 border accent-primary-blue border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-primary-blue"
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms-of-service"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    FarmLink Terms and Conditions
                  </Link>
                  ,{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link
                    to="/cookie-policy"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Cookie Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-[#205CA5] text-white hover:bg-[#0c3d79] font-sans py-3 rounded-lg transition cursor-pointer"
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

export default Signup;

// import signupphoto from "@/assets/tomslive/Photo/Signup.svg";
// import mainlogo from "@/assets/tomslive/Icon/Logo1.svg";
// import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Signup = () => {
//   const [password, setPassword] = useState("");
//   const [retypePassword, setRetypePassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRetypePassword, setShowRetypePassword] = useState(false);

//   return (
//     <div className="min-h-screen">
//       <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-end md:py-4 py-4 lg:py-4">
//         <div className=" flex justify-end items-center mt-5 ">
//           <img src={mainlogo} alt="" />
//         </div>
//       </div>

//       <div className=" flex items-center justify-center  text-black mt-8">
//         <div className="max-w-5xl w-full   flex overflow-hidden">
//           {/* Left Side - Image */}
//           <div className="hidden md:flex w-1/2  items-center justify-center">
//             <img
//               src={signupphoto}
//               className="h-full w-full object-cover  rounded-xl"
//             />
//           </div>

//           {/* Right Side - Form */}
//           <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2">
//               Create your account
//             </h2>
//             <p className="text-gray-400 mb-6 text-sm">
//               Find peace through faith and technology.
//             </p>

//             <form className="space-y-4">
//               {/* Full Name */}

//               <div className="flex flex-col mb-4">
//                 <label htmlFor="name" className="text-black font-sans mb-2">
//                   Full Name*
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Jason Smith"
//                   className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
//                 />
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="name" className="text-black font-sans mb-2">
//                   Farm Name*
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Green Valley Dairy"
//                   className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
//                 />
//               </div>

//               {/* Email */}
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="email" className="text-black font-sans mb-2">
//                   Email address*
//                 </label>

//                 <input
//                   type="email"
//                   placeholder="jason_smith@gmail.com"
//                   className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
//                 />
//               </div>
//               {/* Password */}

//               <div className="flex flex-col mb-4">
//                 <label htmlFor="password" className="text-black font-sans mb-2">
//                   Password
//                 </label>

//                 <div className="relative w-full">
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
//                   />

//                   {/* Show eye only if password is not empty */}
//                   {password && (
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-3 flex items-center text-gray-400
//                          hover:text-black transition-colors duration-200 focus:outline-none cursor-pointer"
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showPassword ? (
//                         <AiOutlineEyeInvisible size={22} />
//                       ) : (
//                         <AiOutlineEye size={22} />
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Re-type Password */}
//               <div className="flex flex-col mb-4">
//                 <label
//                   htmlFor="retypePassword"
//                   className="text-black font-sans mb-2"
//                 >
//                   Confirm Password
//                 </label>
//                 <div className="relative w-full">
//                   <input
//                     id="retypePassword"
//                     type={showRetypePassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={retypePassword}
//                     onChange={(e) => setRetypePassword(e.target.value)}
//                     className="w-full px-4 py-3 rounded-xl bg-[#F4F9FF] text-black focus:ring-2 focus:ring-[#5583BB] outline-none"
//                   />

//                   {/* Show eye only if retype password is not empty */}
//                   {retypePassword && (
//                     <button
//                       type="button"
//                       onClick={() => setShowRetypePassword(!showRetypePassword)}
//                       className="absolute inset-y-0 right-3 flex items-center text-gray-400
//                          hover:text-black transition-colors duration-200 focus:outline-none cursor-pointer"
//                       aria-label={
//                         showRetypePassword
//                           ? "Hide retype password"
//                           : "Show retype password"
//                       }
//                     >
//                       {showRetypePassword ? (
//                         <AiOutlineEyeInvisible size={22} />
//                       ) : (
//                         <AiOutlineEye size={22} />
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//               {/* Register Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-[#205CA5] text-white hover:bg-[#0c3d79] font-sans py-3 rounded-lg transition cursor-pointer"
//               >
//                 Register Now
//               </button>
//             </form>

//             {/* Login Redirect */}
//             <p className="text-sm text-gray-400 mt-4 text-center">
//               Already have an account?
//               <a
//                 href="/login"
//                 className="text-[#205CA5] hover:text-[#052142] ml-1"
//               >
//                 Log In
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
