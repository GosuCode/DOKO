"use client";

import React from "react";
import RatingStars from "./rating-stars";

type Props = {
  rating: number;
};

const Ratings = ({ rating }: Props) => {
  return (
    <div>
      <RatingStars rating={rating} setRating={() => {}} />
    </div>
  );
};

export default Ratings;
