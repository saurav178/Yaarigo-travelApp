import { FC, useState } from "react";
import { CheckCircle, XCircle, Star, StarHalf } from "lucide-react";

interface TripProps {
  brand: string;
  location: string;
  desc: string;
  profileImage?: string;
  rating?: number;
  amenities?: string[];
  duration?: string;
}

const TripCard: FC<TripProps> = ({
  brand,
  location,
  desc,
  profileImage,
  rating,
  amenities,
  duration,
}) => {
  const [status, setStatus] = useState<"none" | "interested" | "dismissed">(
    "none"
  );

  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    brand
  )}&background=random&color=fff&size=40&rounded=true`;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="text-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<StarHalf key="half" size={16} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div
      className={`border-2 border-[#3B82F6] rounded-2xl bg-white 
        shadow-md w-[335px] h-[390px] p-4 flex flex-col 
        transition transform duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border bg-gray-200 flex items-center justify-center">
          <img
            src={profileImage || fallbackImage}
            alt={brand}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-base flex items-center gap-1">
            {brand}
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </h3>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-4">
        {desc}
      </p>

      {/* Duration */}
      {duration && (
        <p className="text-sm text-gray-600 font-medium mb-2">
          <span className="font-semibold">Duration:</span> {duration}
        </p>
      )}

      {/* Amenities */}
      {amenities && amenities.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {amenities.map((item, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-2 mb-3">
          {renderStars(rating)}
          <span className="text-sm text-gray-700 font-medium">
            {rating.toFixed(1)}
          </span>
        </div>
      )}

      {/* Spacer to push buttons down */}
      <div className="flex-grow" />

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setStatus("dismissed")}
          className={`px-4 py-2 rounded-md text-white text-sm flex items-center gap-1 transition
            ${
              status === "dismissed"
                ? "bg-gray-400"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
        >
          <XCircle size={16} />
          {status === "dismissed" ? "Dismissed" : "Dismiss"}
        </button>
        <button
          onClick={() => setStatus("interested")}
          className={`px-4 py-2 rounded-md text-white text-sm flex items-center gap-1 transition
            ${
              status === "interested"
                ? "bg-blue-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          <CheckCircle size={16} />
          {status === "interested" ? "Interested ✅" : "Interested"}
        </button>
      </div>
    </div>
  );
};

export default TripCard;
