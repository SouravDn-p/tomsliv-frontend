import React from "react";
import Container from "@/common/Container";
import SectionHeading from "@/components/Shared/SectionHeading";
import StepCard from "@/components/Home/HowItWorks/StepCard";
import { FaUserPlus } from "react-icons/fa6";
import { ClipboardList, Search, Share2  } from "lucide-react";
import { IoMdEye } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";

// Define the 6 steps
const howItWorksSteps = [
  {
    step: 1,
    title: "Create Account",
    description: "Get started by creating your FarmLink account.",
    icon: FaUserPlus,
  },
  {
    step: 2,
    title: "Create Advert",
    description: "Create a detailed job advertisement to attract candidates.",
    icon: ClipboardList,
  },
  {
    step: 3,
    title: "Define Candidate",
    description: "Specify your ideal candidate preferences to help our AI.",
    icon: Search,
  },
  {
    step: 4,
    title: "Share Link",
    description: "Share your job link across social media and job boards.",
    icon: Share2,
  },
  {
    step: 5,
    title: "View Applicants",
    description: "See match scores and detailed profiles for every applicant.",
    icon: IoMdEye,
  },
  {
    step: 6,
    title: "Short-List for Interview",
    description: "Select the best candidates and streamline your hiring process.",
    icon: TbTargetArrow,
  },
];

const HowItWorksPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="py-16 px-4">
        {/* Header Section */}
        <div className="text-center mb-14">
          <SectionHeading>How It Works</SectionHeading>
          <p className="mt-6 text-gray-700 max-w-4xl mx-auto text-lg leading-relaxed">
           FarmLink efficiently sort through CVs and cover letters using AI. Define your ideal employee, and FarmLink will instantly generate match scores for your applicants from 0 to 100, saving you time, money and stress.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-12">
          {howItWorksSteps.map((step, index) => (
            <StepCard key={step.step} index={index} step={step} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HowItWorksPage;
