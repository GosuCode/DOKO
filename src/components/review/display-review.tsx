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

  // Only check if user has purchased if they're logged in
  const hasPurchased = curUser?.user?.id
    ? await hasPurchasedAction(productId, curUser.user.id)
    : false;

  return (
    <div className="flex flex-col gap-4 w-3/5 mx-auto">
      <h2 className="text-2xl font-bold text-left mt-12">Reviews</h2>
      {reviews.map((review: ANReviews) => (
        <ReviewCard key={review.id} {...review} user={user[review.userId]} />
      ))}
      {curUser?.user?.id && hasPurchased && (
        <WriteReview productId={productId} />
      )}
      {!curUser?.user?.id && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Want to write a review?
          </h3>
          <p className="text-gray-600 text-sm">
            Sign in to write a review for products you&apos;ve purchased.
          </p>
        </div>
      )}
    </div>
  );
};

export default DisplayReview;
