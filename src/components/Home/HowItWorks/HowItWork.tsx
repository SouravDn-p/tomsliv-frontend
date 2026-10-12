import Container from "@/common/Container";
import SectionHeading from "@/components/Shared/SectionHeading";
import StepCard from "./StepCard";
import { jobSeekerSteps } from "./jobSeekerStepsData";
// import { farmSteps } from "./farmStepsData";

export default function HowItWork() {
  return (
    <div className="bg-background-lightBlue ">
      <Container>
        <SectionHeading>How It Works</SectionHeading>

        <div>
          {/* for jobseeker */}
          <div>
            {/* <SubHeading className="underline mt-8 md:mt-14">
              For Jobseeker
            </SubHeading> */}
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-x-2 gap-y-6 mt-7 md:mt-12">
              {jobSeekerSteps.map((step, index) => (
                <StepCard index={index} key={step.step} step={step} />
              ))}
            </div>
          </div>
          {/*  For Farm Owner / Employer */}
          {/* <div>
            <SubHeading className="underline mt-8 md:mt-14">
              For Farm Owner / Employer
            </SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 gap-x-2 gap-y-6 mt-7 md:mt-12">
              {farmSteps.map((step, index) => (
                <StepCard
                  index={index}
                  itChange={false}
                  key={step.step}
                  step={step}
                />
              ))}
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  );
}
