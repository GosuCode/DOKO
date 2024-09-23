import {
  getReviewsAction,
  hasPurchasedAction,
} from "@/app/product/[productId]/actions";
import ReviewCard from "./review-card";
import WriteReview from "./write-review";
import { getUserReviewAction } from "@/app/actions/auth";
import { ANReviews } from "@/db/schema";
import { auth } from "@/auth";

type DisplayReviewProps = {
  productId: number;
};
const DisplayReview = async ({ productId }: DisplayReviewProps) => {
  const curUser = await auth();
  const reviews = await getReviewsAction(productId);
  const user = await getUserReviewAction(
    reviews.map((review) => review.userId)
  );
  const hasPurchased = await hasPurchasedAction(
    productId,
    curUser?.user?.id as string
  );
  return (
    <div className="flex flex-col gap-4 w-3/5 mx-auto">
      <h2 className="text-2xl font-bold text-left mt-12">Reviews</h2>
      {reviews.map((review: ANReviews) => (
        <ReviewCard key={review.id} {...review} user={user[review.userId]} />
      ))}
      {hasPurchased && <WriteReview productId={productId} />}
    </div>
  );
};

export default DisplayReview;
