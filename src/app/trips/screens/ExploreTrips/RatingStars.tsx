import { Star } from "lucide-react";

export default function RatingStars({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-blue-400 fill-blue-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
