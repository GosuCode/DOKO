"use client";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import RatingStars from "./rating-stars";
import { Button } from "../ui/button";

const WriteReview = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted review:", { review, rating });
    setReview("");
    setRating(0);
  };
  return (
    <div className="write-review">
      <h2 className="text-2xl font-bold text-left mt-12">Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <RatingStars rating={rating} />
        </div>
        <>
          <label htmlFor="review">Your Review:</label>
          <Textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
            required
          />
        </>
        <Button className="bg-palette-primary mt-4" type="submit">
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default WriteReview;
