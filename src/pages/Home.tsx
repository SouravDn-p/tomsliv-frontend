import Footer from "@/common/Footer/Footer";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import HowItWork from "@/components/Home/HowItWorks/HowItWork";
import LatestJobs from "@/components/Home/LatestJobs/LatestJobs";
import PricingSection from "@/components/Home/PricingSection/PricingSection";
import Reviews from "@/components/Home/ReviewSection/Reviews";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <HeroSection />
      <HowItWork />
      <PricingSection />
      <LatestJobs />
      <Reviews />
      <Footer />
    </>
  );
};

export default Home;
