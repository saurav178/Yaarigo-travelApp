
// "use client";

// import RatingStars from "./RatingStars";
// import AvailabilityBadge from "./AvailabilityBadge";
// import SeasonTag from "./SeasonTag";
// import BudgetBadge from "./Budget";
// import DestinationBadge from "./Destination";
// import ImageSlider from "./ImageSlider";

// interface Trip {
//   title: string;
//   description: string;
//   images: string[];
//   rating: number;
//   availability: string;
//   season: string;
//   dates: string;
//   duration: string;
//   price: string; // e.g., "₹325"
//   originalPrice?: string; // optional for showing discount
//   discount?: string; // e.g., "74% off"
//   destination: string;
// }

// export default function TripCard({ trip }: { trip: Trip }) {
//   return (
//     <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col gap-2 relative">
//       {/* Heart icon (like Flipkart) */}
//       <span className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer">
//         ♥
//       </span>

//       {/* Image slider */}
//       <ImageSlider images={trip.images} title={trip.title} />

//       {/* Title */}
//       <h3 className="font-semibold text-sm sm:text-base text-black truncate">{trip.title}</h3>

//       {/* Description */}
//       <p className="text-xs text-gray-600 truncate">{trip.description}</p>

//       {/* Rating */}
//       <div className="flex items-center gap-1">
//         <RatingStars rating={trip.rating} />
//         <span className="text-xs text-gray-500">{trip.rating.toFixed(1)}</span>
//       </div>

//       {/* Badges */}
//       <div className="flex flex-wrap gap-1 mt-1">
//         <AvailabilityBadge status={trip.availability} />
//         <SeasonTag season={trip.season} />
//         <DestinationBadge destination={trip.destination} />
//       </div>

//       {/* Price & Discount */}
//       <div className="mt-1 flex flex-col gap-1">
//         <div className="flex items-center gap-2">
//           <BudgetBadge price={trip.price.replace("₹", "")} />
//           {trip.originalPrice && (
//             <span className="text-xs line-through text-gray-400">{trip.originalPrice}</span>
//           )}
//           {trip.discount && (
//             <span className="text-xs text-green-600 font-semibold">{trip.discount}</span>
//           )}
//         </div>
//         {/* Optional: highlight text */}
//         <span className="text-purple-600 text-xs font-medium">
//           Top Discount of the Sale
//         </span>
//       </div>

//       {/* Dates & Duration */}
//       <p className="text-xs text-gray-500 mt-1">{trip.dates} • {trip.duration}</p>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import RatingStars from "./RatingStars";
import AvailabilityBadge from "./AvailabilityBadge";
import SeasonTag from "./SeasonTag";
import BudgetBadge from "./Budget";
import DestinationBadge from "./Destination";
import ImageSlider from "./ImageSlider";

interface Trip {
  title: string;
  description: string;
  images: string[];
  rating: number;
  availability: string;
  season: string;
  dates: string;
  duration: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  destination: string;
}

export default function TripCard({ trip }: { trip: Trip }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success("Trip added to wishlist!");
    } else {
      toast("Trip removed from wishlist!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col gap-2 relative">
      {/* Toaster container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Image slider with heart overlay */}
      <div className="relative">
        <ImageSlider images={trip.images} title={trip.title} />
      <span
  onClick={handleWishlistToggle}
  className={`absolute top-2 right-2 cursor-pointer transition ${
    isWishlisted ? "text-red-500" : "text-white-400"
  } text-2xl sm:text-3xl hover:scale-125`}
>
  ♥
</span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-sm sm:text-base text-black truncate">
        {trip.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-600 truncate">{trip.description}</p>

      {/* Rating */}
      <div className="flex items-center gap-1">
        <RatingStars rating={trip.rating} />
        <span className="text-xs text-gray-500">{trip.rating.toFixed(1)}</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1 mt-1">
        <AvailabilityBadge status={trip.availability} />
        <SeasonTag season={trip.season} />
        <DestinationBadge destination={trip.destination} />
      </div>

      {/* Price & Discount */}
      <div className="mt-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <BudgetBadge price={trip.price.replace("₹", "")} />
          {trip.originalPrice && (
            <span className="text-xs line-through text-gray-400">{trip.originalPrice}</span>
          )}
          {trip.discount && (
            <span className="text-xs text-green-600 font-semibold">{trip.discount}</span>
          )}
        </div>
        <span className="text-purple-600 text-xs font-medium">Top Discount of the Sale</span>
      </div>

      {/* Dates & Duration */}
      <p className="text-xs text-gray-500 mt-1">
        {trip.dates} • {trip.duration}
      </p>
    </div>
  );
}
