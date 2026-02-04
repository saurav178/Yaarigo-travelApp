"use client";

import Image from "next/image";
import { 
  MapPin, 
  Heart, 
  Calendar, 
  Users, 
  Star,
  TrendingUp,
  Award,
  Clock
} from "lucide-react";
import { useState } from "react";
import { ApiPackage } from "../types/types";

type PackageCardProps = {
  pkg: ApiPackage;
};

export default function PackageCard({ pkg }: PackageCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Extract data
  const from = pkg?.fromLocation;
  const to = pkg?.toLocation;
  const firstPlan = pkg?.plans?.[0];
  const title = pkg?.title || "Amazing Travel Package";
  const image =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";
  
  // Price calculation
  const originalPrice = firstPlan?.pricePerPerson || 0;
  const discountedPrice = firstPlan?.discountedPrice || originalPrice;
  const discount = originalPrice > discountedPrice 
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  // Additional details
  const rating = 4.5;
  const reviews =  128;
  const category = pkg?.category || "Adventure";
  const isPopular =  discount > 20;
  const totalDays = pkg?.totalDays || 5;
  const totalNights = pkg?.totalNights || 4;
  const maxGroupSize =  15;

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group w-80 flex-shrink-0 rounded-lg">
      {/* Image Section */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform z-10"
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold shadow-md"
             style={{ color: '#1d4350' }}>
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        {/* Title */}
        <h3 className="font-bold text-base mb-1 line-clamp-1 group-hover:text-[#1d4350] transition-colors" 
            style={{ color: '#1f2937' }}>
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded"
               style={{ backgroundColor: '#fef3c7' }}>
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold text-yellow-700">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviews} reviews)</span>
        </div>

        {/* Locations */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#1d4350' }} />
          <span className="truncate">
            <span className="font-medium">{from?.name || from?.city || "Departure"}</span>
            <span className="mx-1">→</span>
            <span className="font-medium">{to?.name || to?.city || "Destination"}</span>
          </span>
        </div>

        {/* Duration & Group Size */}
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          <div className="flex items-center gap-1 text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded">
            <Clock className="w-3 h-3" style={{ color: '#1d4350' }} />
            <span className="font-medium">{totalDays}D / {totalNights}N</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded">
            <Users className="w-3 h-3" style={{ color: '#1d4350' }} />
            <span className="font-medium">Max {maxGroupSize}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-2">
          <p className="text-xs text-gray-500">Starting from</p>
          <div className="flex items-baseline gap-1.5">
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-bold" style={{ color: '#1d4350' }}>
              ₹{discountedPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500">per person</p>
        </div>

        {/* Action Button */}
        <button 
          className="w-full py-2 text-white text-sm font-semibold rounded hover:opacity-90 transition-all"
          style={{ backgroundColor: '#1d4350' }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}





// "use client";

// import Image from "next/image";
// import {
//   MapPin,
//   Heart,
//   Users,
//   Star,
//   Clock,
// } from "lucide-react";
// import { useState } from "react";

// /* ================= TYPES ================= */

// type Location = {
//   name?: string;
//   city?: string;
// };

// type Plan = {
//   price: number;
//   discountedPrice?: number;
//   maxGroupSize?: number;
// };

// type TravelPackage = {
//   title?: string;
//   image?: string;
//   coverImage?: string;
//   fromLocation?: Location;
//   toLocation?: Location;
//   plans?: Plan[];
//   rating?: number;
//   reviewsCount?: number;
//   category?: string;
//   totalDays?: number;
//   totalNights?: number;
// };

// type PackageCardProps = {
//   pkg: TravelPackage;
// };

// /* ================= COMPONENT ================= */

// export default function PackageCard({ pkg }: PackageCardProps) {
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Extract data
//   const from = pkg?.fromLocation;
//   const to = pkg?.toLocation;
//   const firstPlan = pkg?.plans?.[0];
//   const title = pkg?.title || "Amazing Travel Package";
//   const image =
//     pkg?.image ||
//     pkg?.coverImage ||
//     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";

//   // Price calculation
//   const originalPrice = firstPlan?.price || 0;
//   const discountedPrice = firstPlan?.discountedPrice || originalPrice;
//   const discount =
//     originalPrice > discountedPrice
//       ? Math.round(
//           ((originalPrice - discountedPrice) / originalPrice) * 100
//         )
//       : 0;

//   // Additional details
//   const rating = pkg?.rating || 4.5;
//   const reviews = pkg?.reviewsCount || 128;
//   const category = pkg?.category || "Adventure";
//   const totalDays = pkg?.totalDays || 5;
//   const totalNights = pkg?.totalNights || 4;
//   const maxGroupSize = firstPlan?.maxGroupSize || 15;

//   return (
//     <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group w-80 flex-shrink-0 rounded-lg">
//       {/* Image Section */}
//       <div className="relative h-40 overflow-hidden">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-500"
//           onError={(e) => {
//             e.currentTarget.style.display = "none";
//           }}
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

//         <button
//           onClick={() => setIsFavorite(!isFavorite)}
//           className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform z-10"
//         >
//           <Heart
//             className={`w-4 h-4 ${
//               isFavorite
//                 ? "fill-red-500 text-red-500"
//                 : "text-gray-600"
//             }`}
//           />
//         </button>

//         <div
//           className="absolute bottom-2 right-2 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold shadow-md"
//           style={{ color: "#1d4350" }}
//         >
//           {category}
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-3">
//         <h3
//           className="font-bold text-base mb-1 line-clamp-1 group-hover:text-[#1d4350] transition-colors"
//           style={{ color: "#1f2937" }}
//         >
//           {title}
//         </h3>

//         <div className="flex items-center gap-1.5 mb-2">
//           <div
//             className="flex items-center gap-0.5 px-1.5 py-0.5 rounded"
//             style={{ backgroundColor: "#fef3c7" }}
//           >
//             <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
//             <span className="text-xs font-semibold text-yellow-700">
//               {rating}
//             </span>
//           </div>
//           <span className="text-xs text-gray-500">
//             ({reviews} reviews)
//           </span>
//         </div>

//         <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
//           <MapPin
//             className="w-3.5 h-3.5 flex-shrink-0"
//             style={{ color: "#1d4350" }}
//           />
//           <span className="truncate">
//             <span className="font-medium">
//               {from?.name || from?.city || "Departure"}
//             </span>
//             <span className="mx-1">→</span>
//             <span className="font-medium">
//               {to?.name || to?.city || "Destination"}
//             </span>
//           </span>
//         </div>

//         <div className="grid grid-cols-2 gap-1.5 mb-2">
//           <div className="flex items-center gap-1 text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded">
//             <Clock className="w-3 h-3" style={{ color: "#1d4350" }} />
//             <span className="font-medium">
//               {totalDays}D / {totalNights}N
//             </span>
//           </div>
//           <div className="flex items-center gap-1 text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded">
//             <Users className="w-3 h-3" style={{ color: "#1d4350" }} />
//             <span className="font-medium">
//               Max {maxGroupSize}
//             </span>
//           </div>
//         </div>

//         <div className="mb-2">
//           <p className="text-xs text-gray-500">Starting from</p>
//           <div className="flex items-baseline gap-1.5">
//             {discount > 0 && (
//               <span className="text-xs text-gray-400 line-through">
//                 ₹{originalPrice.toLocaleString()}
//               </span>
//             )}
//             <span
//               className="text-xl font-bold"
//               style={{ color: "#1d4350" }}
//             >
//               ₹{discountedPrice.toLocaleString()}
//             </span>
//           </div>
//           <p className="text-xs text-gray-500">per person</p>
//         </div>

//         <button
//           className="w-full py-2 text-white text-sm font-semibold rounded hover:opacity-90 transition-all"
//           style={{ backgroundColor: "#1d4350" }}
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// }
