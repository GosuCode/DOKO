import ReviewCard from "./review-card";
import WriteReview from "./write-review";
const DisplayReview = () => {
  return (
    <div className="flex flex-col gap-4 w-3/5 mx-auto">
      <h2 className="text-2xl font-bold text-left mt-12">Reviews</h2>
      <ReviewCard
        name="John Doe"
        avatarSrc="/logo.svg"
        rating={2}
        review="This is a great product!"
      />
      <WriteReview />
    </div>
  );
};

export default DisplayReview;
