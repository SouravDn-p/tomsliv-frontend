import Container from "@/common/Container";
import SectionHeading from "@/components/Shared/SectionHeading";
import { Check, Info } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/auth.hooks";
import { useGetIntroductionOfferAvailabilityQuery } from "@/redux/features/Farmowner/JobsApi";
import PricingSectionSkeleton from "./PricingSectionSkeleton";
import { cn } from "@/lib/utils"; // assuming cn is your className utility

interface PricingSectionProps {
  className?: string;
}
const PricingSection = ({ className }: PricingSectionProps) => {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const { data: offerResponse, isLoading } =
    useGetIntroductionOfferAvailabilityQuery();

  const planDetails = [
    "One job advertisement",
    "Personalised dashboard access",
    "Short-list and manage applications",
    "Unlimited AI-reviews of CVs and cover letters",
    "Match scores to find your perfect employee",
    "Less time hiring, more time farming",
  ];

  if (isLoading) {
    return <PricingSectionSkeleton />;
  }

  const handleGetStartedNow = () => {
    if (user && user.role === "FARM_OWNER") {
      navigate("/owner-dashboard/all-applicant");
    } else {
      navigate("/create-account");
    }
  };

  const showIntroOffer =
    offerResponse?.success &&
    offerResponse.data.isAvailable &&
    offerResponse.data.currentCount < offerResponse.data.totalLimit;
  const offerDetails = offerResponse?.data?.offerDetails;

  return (
    <section>
      <Container className={cn("py-16 md:py-24", className)}>
        <SectionHeading detail="Simple and transparent pricing to help you find the right talent for your farm.">
          Pay Once. Hire Fast.
        </SectionHeading>

        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-8 max-w-5xl mx-auto transition-all duration-300",
            showIntroOffer ? "md:grid-cols-2" : "md:grid-cols-1 max-w-xl"
          )}
        >
          {/* Introductory Offer */}
          {showIntroOffer && offerDetails && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white rounded-3xl p-8 border-2 border-primary-blue shadow-xl flex flex-col"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                Early Bird Offer
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-website-black">
                  Introductory Offer
                </h3>
                <p className="text-paragraph-gray mt-2">
                  Perfect for farms getting started with us.
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-website-black">
                    ${offerDetails.introductoryPrice}
                  </span>
                  <span className="text-paragraph-secondary-gray">
                    / advert
                  </span>
                </div>
                <p className="text-sm font-medium text-primary-blue mt-1">
                  Exclusive for first {offerResponse.data.totalLimit} customers
                </p>
                <p className="text-xs text-paragraph-secondary-gray mt-1">
                  (
                  {offerResponse.data.totalLimit -
                    offerResponse.data.currentCount}{" "}
                  spots left)
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {planDetails.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-paragraph-gray"
                  >
                    <Check className="w-5 h-5 text-primary-blue" />
                    <span>{detail}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 text-primary-blue bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <Info className="w-5 h-5 mt-0.5" />
                  <span className="text-sm font-semibold">
                    {offerDetails.description}
                  </span>
                </li>
              </ul>

              <Button
                onClick={handleGetStartedNow}
                variant="primary"
                className="w-full py-4 text-center"
              >
                Get Started Now
              </Button>

              <p className="mt-4 text-xs text-paragraph-secondary-gray text-center">
                This introductory rate helps you find your next worker while
                FarmLink grows.
              </p>
            </motion.div>
          )}

          {/* Standard Pricing */}
          <motion.div
            initial={{ opacity: 0, x: showIntroOffer ? 50 : 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
              "rounded-3xl p-8 flex flex-col",
              showIntroOffer
                ? "bg-[#F8FAFC] border border-border-primary"
                : "border-2 border-primary-blue shadow-lg bg-white"
            )}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-website-black">
                Standard Pricing
              </h3>
              <p className="text-paragraph-gray mt-2">
                Connecting skilled workers with your farm.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-website-black">
                  $250
                </span>
                <span className="text-paragraph-secondary-gray">/ advert</span>
              </div>
              <p className="text-sm text-paragraph-secondary-gray mt-1">
                Regular pricing{" "}
                {showIntroOffer
                  ? "after introductory offer"
                  : "for all job postings"}
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {planDetails.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-paragraph-gray opacity-80"
                >
                  <Check className="w-5 h-5 text-paragraph-secondary-gray" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleGetStartedNow}
              variant={showIntroOffer ? "outline" : "primary"}
              className={cn(
                "w-full py-4 text-center",
                showIntroOffer && "border-2"
              )}
            >
              Get Started Now
            </Button>

            {showIntroOffer && (
              <p className="mt-4 text-xs text-paragraph-secondary-gray text-center">
                Secure the early bird offer while you can!
              </p>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;
