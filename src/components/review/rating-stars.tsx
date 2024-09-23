import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type Props = {
  rating: number;
};

const TOTAL_STARS_COUNT = 5;

const RatingStars = ({ rating }: Props) => {
  const fillStar = Math.floor(rating);
  const emptyStar = TOTAL_STARS_COUNT - Math.ceil(rating);
  const halfStar = TOTAL_STARS_COUNT - fillStar - emptyStar;

  return (
    <span
      role="img"
      aria-label={`${rating} out of ${TOTAL_STARS_COUNT} stars`}
      className="flex"
    >
      {[...Array(fillStar)].map((_, index) => (
        <FaStar
          key={`full-${index}`}
          aria-hidden="true"
          className="text-palette-primary"
        />
      ))}
      {[...Array(halfStar)].map((_, index) => (
        <FaStarHalfAlt
          key={`half-${index}`}
          aria-hidden="true"
          className="text-palette-primary"
        />
      ))}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          aria-hidden="true"
          className="text-gray-300"
        />
      ))}
    </span>
  );
};

export default RatingStars;
