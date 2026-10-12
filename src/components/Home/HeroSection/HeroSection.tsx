import heroBg from "@/assets/Backgroud/source_DJI_20251031160441_0256_D.jpg";
import shape from "@/assets/shapes/shapes1.svg";
import Container from "@/common/Container";
import { ArrowRight } from "lucide-react";
// import JobSearch from "./JobSearch";
import { motion } from "motion/react";
import { LinkButton } from "@/common/LinkButton";
// import { useCurrentUser } from "@/hooks/auth.hooks";

function HeroSection() {
  // const user = useCurrentUser();
  return (
    <div
      className="min-h-[648px] flex flex-col md:block items-center justify-center bg-cover md:gap-4 bg-center bg-no-repeat relative "
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <motion.div
        className="absolute inset-0 bg-black/25 md:bg-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <Container className="relative z-10 text-white pt-0 md:pt-[120px]">
        {/* Staggered animations for better sequencing */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15, // Stagger children by 0.15s
                delayChildren: 0.1, // Initial delay before starting
              },
            },
          }}
        >
          {/* Title with enhanced animation */}
          <motion.h1
            className="text-white text-2xl md:text-4xl lg:text-6xl font-bold lg:w-[80%] mb-2"
            variants={{
              initial: { y: 60, opacity: 0 },
              animate: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                },
              },
            }}
          >
            Connecting Skilled Workers with Your Farm.
          </motion.h1>

          {/* Shape with smoother movement */}
          <motion.img
            src={shape}
            alt=""
            className="mt-2"
            variants={{
              initial: { opacity: 0, scale: 0.8, x: -30 },
              animate: {
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.3,
                },
              },
            }}
          />

          {/* Description paragraph */}
          <motion.p
            className="md:w-[80%] lg:w-[50%] text-website-lightGray mt-8"
            variants={{
              initial: { y: 30, opacity: 0 },
              animate: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4,
                },
              },
            }}
          >
            {/* Whether you're looking for farm work or hiring skilled workers,
            FarmLink makes it simple, fast, and reliable. */}
            With our AI-driven platform, FarmLink makes your next hire simple,
            fast, and reliable.
          </motion.p>

          {/* Buttons container with simultaneous animation */}
          <motion.div
            className="flex items-center justify-center md:justify-start gap-8 mt-8"
            variants={{
              initial: { y: 20, opacity: 0 },
              animate: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.7,
                  ease: "easeOut",
                  delay: 0.5,
                },
              },
            }}
          >
            <LinkButton
              to={"/create-account"}
              className="px-6 box-border border-primary-blue lg:w-[170px] py-5  lg:px-8"
              variant="primary"
            >
              <span className="flex items-center gap-2">
                Get started <ArrowRight />
              </span>
            </LinkButton>
            {/* <LinkButton
              to={`${
                user?.role === "FARM_OWNER" ? "/owner-dashboard" : "/signup/farm-owner"
              }`}
              className="lg:w-[170px]  py-5 lg:px-10"
              variant="outlineWhite"
            >
              <span className="flex items-center gap-2">
                Post a job <ArrowRight />
              </span>
            </LinkButton> */}
          </motion.div>
        </motion.div>
      </Container>

      {/* Job search with smooth slide-up */}
      {/* <div className="w-[90%] md:w-fit md:mt-8 lg:mt-0">
        <JobSearch />
      </div> */}
    </div>
  );
}

export default HeroSection;
