"use client";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import RatingStars from "./rating-stars";
import { Button } from "../ui/button";
import { addReviewAction } from "@/app/product/[productId]/actions";

type WriteReviewProps = {
  productId: number;
};
const WriteReview = ({ productId }: WriteReviewProps) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = (formData: FormData) => {
    if (productId) {
      addReviewAction(productId, formData, rating);
    } else {
      console.error("Product ID is undefined");
    }
  };

  return (
    <div className="write-review">
      <h2 className="text-2xl font-bold text-left mt-12">Write a Review</h2>
      <form action={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <RatingStars rating={rating} setRating={setRating} />
        </div>
        <div>
          <label htmlFor="review">Your Review:</label>
          <Textarea
            id="review"
            name="review"
            placeholder="Your Review"
            rows={5}
            required
          />
        </div>
        <Button className="bg-palette-primary mt-4" type="submit">
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default WriteReview;
