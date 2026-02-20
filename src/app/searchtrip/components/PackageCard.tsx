"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, Users, Star, Clock } from "lucide-react";
import { useState } from "react";
import { ApiPackage } from "../types/types";
import { APP_ROUTES } from "@/utils/constants";
type PackageCardProps = {
  pkg: ApiPackage;
};

/**
 * Static UI-only values (until backend supports it)
 */
const STATIC_RATING = 4.5;
const STATIC_REVIEWS = 128;

export default function PackageCard({ pkg }: PackageCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // ---- SAFETY GUARDS ----
  if (!pkg?.active || pkg.status !== "PUBLISHED") return null;
  if (!pkg.plans || pkg.plans.length === 0) return null;

  const plan = pkg.plans[0];

  // ---- CORE DATA ----
  const title = pkg.title;
  const image = pkg.coverImage || "/placeholder.jpg";

  const from = pkg.fromLocation;
  const to = pkg.toLocation;

  // const originalPrice = plan.pricePerPerson;
  // const discountedPrice = plan.discountedPrice ?? originalPrice;

  // const discount =
  //   originalPrice > discountedPrice
  //     ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
  //     : 0;

  const originalPrice = plan.pricePerPerson;
  const discountAmount = plan.discountedPrice ?? 0;

  const finalPrice =
    discountAmount > 0 ? originalPrice - discountAmount : originalPrice;

  const discount =
    discountAmount > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;

  const currencySymbol = plan.currency === "INR" ? "₹" : plan.currency;

  const category =
    pkg.categories?.[0] || pkg.tripStyles?.[0] || plan.category || "General";

  return (
    <Link href={`${APP_ROUTES.VIEW_PACKAGE}?packageId=${pkg._id}`}>
      <div className="bg-white shadow-md transition-all duration-300 overflow-hidden group w-80 cursor-pointer border border-[#e1e1e1]">
        {/* IMAGE */}
        <div className="relative h-35">
          <Image
            src={image}
            alt={title}
            fill
            sizes="320px"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Favorite */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Category */}
          <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-semibold bg-white/90 rounded-full">
            {category}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-3">
          {/* TITLE */}
          <h3 className="font-bold text-base line-clamp-1 mb-1">{title}</h3>

          {/* RATING */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold">{STATIC_RATING}</span>
            <span className="text-xs text-gray-500">
              ({STATIC_REVIEWS} reviews)
            </span>
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">
              {from?.city || "From"} → {to?.city || "To"}
            </span>
          </div>

          {/* META */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1 text-xs bg-gray-50 px-2 py-1 rounded">
              <Clock className="w-3 h-3" />
              {pkg.totalDays}D / {pkg.totalNights}N
            </div>

            <div className="flex items-center gap-1 text-xs bg-gray-50 px-2 py-1 rounded">
              <Users className="w-3 h-3" />
              {plan.minPeople}-{plan.maxPeople} People
            </div>
          </div>

          {/* PRICE */}
          {/* <div className="mb-3">
            <p className="text-xs text-gray-500">Starting from</p>

            <div className="flex items-center gap-2">
              {discount > 0 && (
                <span className="text-xs line-through text-gray-400">
                  {currencySymbol}
                  {originalPrice.toLocaleString()}
                </span>
              )}

              <span className="text-xl font-bold text-[#1d4350]">
                {currencySymbol}
                {discountedPrice.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-gray-500">per person</p>
          </div> */}

          {/* PRICE */}
          <div className="mb-3">
            <p className="text-xs text-gray-500">Starting from</p>

            <div className="flex items-end gap-3">
              {discountAmount > 0 && (
                <span className="text-sm line-through text-gray-400">
                  {currencySymbol}
                  {originalPrice.toLocaleString()}
                </span>
              )}

              <span className="text-xl font-bold text-[#1d4350]">
                {currencySymbol}
                {finalPrice.toLocaleString()}
              </span>
            </div>

            {discountAmount > 0 && (
              <p className="text-xs font-semibold text-green-600 mt-1">
                You save {currencySymbol}
                {discountAmount.toLocaleString()} ({discount}% OFF)
              </p>
            )}

            <p className="text-xs text-gray-500 mt-1">per person</p>
          </div>

          {/* CTA */}
          <button className="w-full py-2 text-sm font-semibold text-white rounded bg-[#276074] hover:opacity-90">
            View Details
          </button>
        </div>
      </div>
    </Link>
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
