// // components/TripCard.tsx
// "use client";

// import Image from "next/image";
// import { FaHeart, FaStar, FaShieldAlt } from "react-icons/fa";

// type TripCardProps = {
//   trip: any;
// };

// export default function TripCard({ trip }: TripCardProps) {
//   return (
//     <div className="bg-white border shadow-sm hover:shadow-md transition mt-12">
//       {/* Image */}
//       <div className="relative">
//         <Image
//           src={
//             trip.image
//               ? trip.image
//               : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop"
//           }
//           alt={trip.title || "Trip"}
//           width={400}
//           height={300}
//           loading="lazy"
//           className="w-full h-48 object-cover"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-semibold text-lg line-clamp-2">{trip.title}</h3>
//       </div>
//     </div>
//   );
// }





/// components/TripCard.tsx
"use client";

import Image from "next/image";
import { 
  FaHeart, 
  FaStar, 
  FaShieldAlt, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaMoneyBillWave,
  FaFlag,
  FaCheckCircle 
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { useState } from "react";

type TripCardProps = {
  trip: any;
};

export default function TripCard({ trip }: TripCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Extract trip data
  const title = trip.title || "Untitled Trip";
   const fromLocation = trip.fromLocation
  ? `${trip.fromLocation.city}${trip.fromLocation.country ? ", " + trip.fromLocation.country : ""}`
  : "N/A";

const toLocation = trip.toLocation
  ? `${trip.toLocation.city}${trip.toLocation.country ? ", " + trip.toLocation.country : ""}`
  : "N/A";
  const startDate = trip.startDate || trip.startDateFrom;
  const endDate = trip.endDate || trip.startDateTo;
  const minBudget = trip.minBudget || trip.minPrice || 10000;
  const maxBudget = trip.maxBudget || trip.maxPrice || 50000;
  const tripsCompleted = trip.tripsCompleted || trip.completedTrips || 30;
  const matchPercentage = trip.matchPercentage || "90%";
  const spotsLeft = trip.spotsLeft || trip.availableSeats || 1;
  
  // Agency/Creator info
  const agencyName = trip.creatorName || trip.agencyName || "Trip Agency";
  const agencyRating = trip.rating || trip.agencyRating || 4.5;
  const isVerified = trip.verified || trip.isVerified || true;
  const isFeatured = trip.featured || trip.isFeatured || false;
  const safetyScore = trip.safetyScore || "85%";
  const agencyInitials = agencyName.substring(0, 2).toUpperCase();

  // Image
  const imageUrl = trip.image || trip.imageUrl || trip.coverImage || 
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop";

  // Format dates
  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const dateRange = startDate && endDate 
    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
    : "Date TBD";

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex">
      {/* Image Section - Left Side */}
      <div className="relative w-80 h-64 bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback to gradient background if image fails
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Favorite Icon */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <FaHeart 
            className={`w-4 h-4 ${isFavorite ? 'text-red-500' : 'text-gray-300'}`} 
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span 
            className="px-2.5 py-1 text-xs font-bold text-white rounded-full shadow-md"
            style={{ backgroundColor: '#16a34a' }}
          >
            {matchPercentage} Match
          </span>
          <span 
            className="px-2.5 py-1 text-xs font-bold text-white rounded-full shadow-md"
            style={{ backgroundColor: '#dc2626' }}
          >
            🔥 {spotsLeft} spots left
          </span>
        </div>
      </div>

      {/* Content Section - Right Side */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-lg mb-1 line-clamp-1" style={{ color: '#1d4350' }}>
          {title}
        </h3>

        {/* Subtitle/Description */}
        <p className="text-xs text-gray-500 mb-3 line-clamp-1">
          {trip.description || trip.subtitle || "Explore amazing destinations"}
        </p>

        {/* Trip Details - 2 Columns */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3 text-xs">
          {/* From Location */}
          <div className="flex items-center gap-1.5 text-gray-600">
            <HiLocationMarker className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">From: {fromLocation}</span>
          </div>

          {/* To Location */}
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">To: {toLocation}</span>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-1.5 text-gray-600 col-span-2">
            <FaCalendarAlt className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{dateRange}</span>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaMoneyBillWave className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">₹{minBudget.toLocaleString()} - ₹{maxBudget.toLocaleString()}</span>
          </div>

          {/* Trips Completed */}
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaFlag className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{tripsCompleted} Trips Completed</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Agency/Creator Section */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {/* Agency Avatar */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: '#ff6b35' }}
            >
              {agencyInitials}
            </div>

            {/* Agency Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-semibold text-xs truncate" style={{ color: '#1d4350' }}>
                  {agencyName}
                </h4>
                {isVerified && (
                  <FaCheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="flex items-center gap-0.5">
                  ⭐ {agencyRating}
                </span>
              </div>
            </div>
          </div>

          {/* Badges - Compact */}
          <div className="flex gap-1.5">
            {isFeatured && (
              <span className="px-2 py-0.5 text-xs font-medium rounded whitespace-nowrap" style={{ 
                backgroundColor: '#fff7ed',
                color: '#c2410c'
              }}>
                🏆 Featured
              </span>
            )}
            <span className="px-2 py-0.5 text-xs font-medium rounded whitespace-nowrap" style={{ 
              backgroundColor: '#d1fae5',
              color: '#065f46'
            }}>
              🛡️ {safetyScore} Safe
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-auto">
          <button 
            className="py-2 text-white text-xs font-semibold hover:opacity-90 transition-all"
            style={{ backgroundColor: '#1d4350' }}
          >
            View Trip
          </button>
          <button 
            className="py-2 text-white text-xs font-semibold hover:opacity-90 transition-all"
            style={{ backgroundColor: '#1d4350' }}
          >
            Join Trip
          </button>
          <button 
            className="py-2 text-white text-xs font-semibold hover:opacity-90 transition-all"
            style={{ backgroundColor: '#1d4350' }}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}