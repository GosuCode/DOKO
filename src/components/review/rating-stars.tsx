"use client";

import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type Props = {
  rating: number;
  setRating: (rating: number) => void;
};

const TOTAL_STARS_COUNT = 5;

const RatingStars = ({ rating, setRating }: Props) => {
  const fillStar = Math.floor(rating);
  const emptyStar = TOTAL_STARS_COUNT - Math.ceil(rating);
  const halfStar = TOTAL_STARS_COUNT - fillStar - emptyStar;

  const handleStarClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    console.log("New rating set:", newRating);
    // Make sure this value is being properly submitted to the form
  };

  return (
    <span
      role="img"
      aria-label={`${rating} out of ${TOTAL_STARS_COUNT} stars`}
      className="flex"
    >
      {[...Array(TOTAL_STARS_COUNT)].map((_, index) => (
        <span
          key={index}
          className="relative cursor-pointer"
          onClick={() => handleStarClick(index)}
        >
          {index < fillStar && (
            <FaStar aria-hidden="true" className="text-palette-primary" />
          )}
          {index === Math.floor(rating) && halfStar > 0 && (
            <FaStarHalfAlt
              aria-hidden="true"
              className="text-palette-primary absolute top-0 left-0"
            />
          )}
          {index >= Math.ceil(rating) && (
            <FaRegStar aria-hidden="true" className="text-gray-300" />
          )}
        </span>
      ))}
    </span>
  );
};

export default RatingStars;
