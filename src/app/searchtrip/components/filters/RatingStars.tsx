"use client";

import { FaStar } from "react-icons/fa";

type RatingStarsProps = {
  value: number;
  onChange: (value: number) => void;
  maxStars?: number;
};

export default function RatingStars({
  value,
  onChange,
  maxStars = 5,
}: RatingStarsProps) {
  const handleStarClick = (starValue: number) => {
    if (starValue === value) {
      onChange(0); // Allow clearing rating
    } else {
      onChange(starValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            onClick={() => handleStarClick(starValue)}
            aria-label={`${starValue} star`}
            className="focus:outline-none cursor-pointer"
          >
            <FaStar
              className={`w-5 h-5 transition-colors ${
                starValue <= value ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
      <button
        onClick={() => onChange(0)}
        className="ml-3 text-xs text-gray-600 underline cursor-pointer"
      >
        Any
      </button>
    </div>
  );
}
