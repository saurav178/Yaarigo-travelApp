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
  const [descExpanded, setDescExpanded] = useState(false);

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
      className={`bg-gradient-to-br from-blue-100/50 to-blue-200/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-md p-3 w-[300px] relative flex flex-col transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}
      style={{ minHeight: "300px" }} // shorter fixed height
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
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

      {/* Description (collapsible) */}
      <div className="text-sm text-gray-700 leading-relaxed mb-2">
        <p className={`${descExpanded ? "" : "line-clamp-2"}`}>{desc}</p>
        {desc.length > 80 && (
          <button
            onClick={() => setDescExpanded((prev) => !prev)}
            className="text-blue-500 text-xs mt-1 focus:outline-none"
          >
            {descExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Duration */}
      {duration && (
        <p className="text-xs text-gray-600 font-medium mb-1">
          <span className="font-semibold">Duration:</span> {duration}
        </p>
      )}

      {/* Amenities */}
      {amenities && amenities.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {amenities.map((item, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-700 text-[10px] px-2 py-[2px] rounded-md"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-1 mb-2">
          {renderStars(rating)}
          <span className="text-xs text-gray-700 font-medium">
            {rating.toFixed(1)}
          </span>
        </div>
      )}

      {/* Buttons - Fixed at bottom */}
      <div className="absolute bottom-3 left-0 w-full px-3">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setStatus("dismissed")}
            className={`px-3 py-1 rounded-md text-white text-xs flex items-center gap-1 transition
              ${
                status === "dismissed"
                  ? "bg-gray-400"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
          >
            <XCircle size={14} />
            {status === "dismissed" ? "Dismissed" : "Dismiss"}
          </button>
          <button
            onClick={() => setStatus("interested")}
            className={`px-3 py-1 rounded-md text-white text-xs flex items-center gap-1 transition
              ${
                status === "interested"
                  ? "bg-blue-500"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            <CheckCircle size={14} />
            {status === "interested" ? "Interested ✅" : "Interested"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
