import Container from "@/common/Container";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import { PiFarm } from "react-icons/pi";

const JoinLogin = () => {
  return (
    <div className="bg-white min-h-[calc(100vh-74px)] flex items-center justify-center">
      <Container className="" variant={"secondary"}>
        <div className="  flex flex-col items-center justify-center md:px-4">
          {/* Header */}
          <div className="w-full md:max-w-5xl mb-10">
            <Link to="/">
              <button className="text-sm cursor-pointer text-gray-500 hover:text-gray-700 flex items-center gap-1">
                ← Back to home
              </button>
            </Link>

            <h1 className="text-3xl font-medium text-center mt-6">
              Join FarmLink
            </h1>
            <p className="text-center text-gray-500 mt-2">
              Choose how you want to use the platform
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-5xl w-full">
            {/* Job Seeker */}
            <div className="bg-background-lightgray rounded-xl border border-gray-200 shadow-sm textc p-8 flex flex-col">
              <div className="w-full flex items-center justify-center">
                <div className="size-20 rounded-3xl  bg-[#E9EFF6] flex items-center justify-center mb-4">
                  <span className="text-primary-blue  text-xl">
                    <CircleUser size={40} />
                  </span>
                </div>
              </div>
              <h2 className="text-xl text-center font-medium mb-2">
                I'm a Job Seeker
              </h2>
              <p className="text-paragraph-gray text-center mb-4">
                Looking for opportunities to grow my agricultural career.
              </p>
              <ul className="text-sm text-paragraph-secondary-gray space-y-2 mb-6">
                <li>
                  <span className="text-primary-blue">•</span> Browse job
                  listings
                </li>
                <li>
                  <span className="text-primary-blue">•</span> Create
                  professional profile
                </li>
                <li>
                  <span className="text-primary-blue">•</span> Track application
                  status
                </li>
              </ul>
              <Link to="/signup">
                <button className="mt-auto cursor-pointer w-full bg-[#205CA5] hover:bg-[#032146] text-white py-3 px-6 rounded-md text-sm font-normal tracking-wide transition duration-200 shadow-sm">
                  Continue as a Job Seeker
                </button>
              </Link>
            </div>

            {/* Employer */}
            <div className="bg-background-lightgray rounded-xl border border-border-primary shadow-sm p-8 flex flex-col">
              <div className="flex justify-center">
                <div className="size-20 rounded-3xl  bg-[#006D7733] flex items-center justify-center mb-4">
                  <span className="text-[#006D77]  text-xl">
                    <PiFarm size={40} />
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-medium mb-2 text-center">
                I'm an Employer
              </h2>
              <p className="text-gray-500 mb-4 text-center">
                Looking to build the perfect workforce for my farm
              </p>
              <ul className="text-sm text-paragraph-secondary-gray space-y-2 mb-6">
                <li>
                  <span className="text-[#006D77]">•</span> Post unlimited job
                  listings
                </li>
                <li>
                  <span className="text-[#006D77]">•</span> Access verified
                  candidates
                </li>
                <li>
                  <span className="text-[#006D77]">•</span> Manage applications
                  easily
                </li>
              </ul>
              <Link to="/signup/farm-owner">
                <button className="mt-auto cursor-pointer bg-[#006D77] hover:bg-[#01383d] text-white py-3 px-6 rounded-md text-sm font-normal tracking-wide transition w-full duration-200 shadow-sm">
                  Continue as an Employer
                </button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default JoinLogin;
