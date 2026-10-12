import Container from "@/common/Container";
import SectionHeading from "@/components/Shared/SectionHeading";
import ReviewCard from "./ReviewCard";
import { reviews } from "./reviewDame";

export default function Reviews() {
  return (
    <div className="bg-white">
      <Container className=" flex flex-col gap-[60px]">
        <SectionHeading detail="See what farmers are saying about FarmLink">
          Trusted by New Zealand Farmers
        </SectionHeading>
        <div className="grid lg:grid-cols-3 gap-9">
          {reviews.map((review, index) => (
            <ReviewCard index={index} key={review.name} {...review} />
          ))}
        </div>
      </Container>
    </div>
  );
}
