// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { FaHeart, FaShieldAlt } from "react-icons/fa";
// import ChatWindow from "./ChatWindow";

// interface HeroSectionProps {
//   hero: {
//     bannerImage: string;
//     logo: string;
//     agencyName: string;
//     category?: string;
//     safetyScore?: number;
//     location: string;
//     rating?: number;
//     reviews?: number;
//   };
// }

// export default function HeroSection({ hero }: HeroSectionProps) {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   if (!hero)
//     return <div className="h-64 bg-gray-200 animate-pulse rounded-b-2xl"></div>;

//   const { rating = 0, safetyScore = 0 } = hero;

//   // Safety colors
//   let safetyBg = "bg-red-100";
//   let safetyColor = "text-red-600";
//   if (safetyScore >= 85) {
//     safetyBg = "bg-green-100";
//     safetyColor = "text-green-600";
//   } else if (safetyScore >= 50) {
//     safetyBg = "bg-yellow-100";
//     safetyColor = "text-yellow-600";
//   }

//   // Stars logic
//   const fullStars = Math.floor(rating);
//   const halfStar = rating - fullStars >= 0.5;

//   return (
//     <div className="relative">
//       {/* Banner */}
//       <div className="w-full h-64 md:h-100 relative">
//         <Image src={hero.bannerImage} alt="Banner" fill className="object-cover" />
//       </div>

//       <div className="-mt-12 md:-mt-16 w-full relative">
//         <div className="flex flex-col md:flex-row items-start justify-between bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 p-4 md:p-6 mx-auto max-w-full relative">

//           {/* LEFT: Profile Info */}
//           <div className="flex items-start gap-4 md:gap-6 w-full md:w-auto">
//             <div className="relative w-48 h-48 md:w-72 md:h-72 -mt-32 md:-mt-36 overflow-hidden shadow-xl z-20 group">
//               <Image
//                 src={hero.logo}
//                 alt="Profile"
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-110"
//               />
//             </div>

//             <div className="flex flex-col gap-2 mt-0">

//               {/* Name + Verified */}
//               <h2 className="text-lg md:text-2xl font-bold flex flex-wrap items-center gap-2">
//                 {hero.agencyName}
//                 <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                   <Image
//                     src="/ic_baseline-check-circle-outline.png"
//                     alt="Verified"
//                     width={16}
//                     height={16}
//                   />
//                   Verified Traveler
//                 </span>
//               </h2>

//               {/* Location */}
//               <div className="flex items-center gap-1 text-gray-600 mt-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-black"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
//                 </svg>
//                 {hero.location}
//               </div>

//               {/* Ratings + Safety */}
//               <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                
//                 {/* Stars */}
//                 <div className="flex items-center gap-0.5 text-yellow-400">
//                   {[...Array(5)].map((_, i) => {
//                     if (i < fullStars)
//                       return <span key={i} style={{ fontSize: "20px" }}>★</span>;
//                     if (i === fullStars && halfStar)
//                       return (
//                         <span key={i} className="relative inline-block" style={{ fontSize: "18px" }}>
//                           <span className="absolute overflow-hidden" style={{ width: "50%" }}>★</span>
//                           <span className="text-gray-300">★</span>
//                         </span>
//                       );
//                     return (
//                       <span key={i} className="text-gray-300" style={{ fontSize: "18px" }}>
//                         ★
//                       </span>
//                     );
//                   })}
//                   <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
//                   <span className="ml-1 text-gray-500">({hero.reviews})</span>
//                 </div>

//                 {/* Safety */}
//                 <span className={`flex items-center gap-1 px-2 py-0.5 rounded-2xl ${safetyBg} ${safetyColor}`}>
//                   <FaShieldAlt className={safetyColor} size={16} />
//                   {safetyScore}% Safe
//                 </span>
//               </div>

//               {/* Category */}
//               {hero.category && (
//                 <span className="bg-[#1D4350] text-white px-2 py-1 text-xs font-medium mt-2 inline-block">
//                   {hero.category}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* RIGHT: Action Buttons */}
//           <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto items-start md:items-center">

//             {/* Follow */}
//             <button
//               onClick={() => setIsFollowing(!isFollowing)}
//               className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#1D4350] hover:bg-[#0f2a35] hover:scale-105 transition w-full sm:w-auto cursor-pointer"
//             >
//               <Image src="/join-trip.png" alt="Follow" width={20} height={20} className="filter invert" />
//               {isFollowing ? "Following" : "Follow"}
//             </button>

//             {/* Join Trip */}
//             <button className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#1D4350] hover:bg-[#0f2a35] hover:scale-105 transition w-full sm:w-auto cursor-pointer">
//               <Image src="/view-trip.png" alt="Join Trip" width={20} height={20} className="filter invert" />
//               Join Trip
//             </button>

//             {/* Chat */}
//             <div className="relative group">
//               <button
//                 onClick={() => setIsChatOpen(true)}
//                 className="flex items-center justify-center bg-[#1D4350] text-white p-3 rounded-full hover:bg-[#0f2a35] hover:scale-110 transition shadow-md cursor-pointer"
//               >
//                 <Image src="/chat-icon.png" alt="Chat" width={22} height={22} className="filter invert" />
//               </button>
//               <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                 Chat
//               </span>
//             </div>

//             {/* Favourite */}
//             <div className="relative group">
//               <button
//                 onClick={() => setIsFavourite(!isFavourite)}
//                 className="flex items-center justify-center bg-[#1D4350] text-white p-3 rounded-full hover:bg-[#0f2a35] hover:scale-110 transition shadow-md cursor-pointer"
//               >
//                 <FaHeart className={isFavourite ? "text-red-500" : "text-white"} size={22} />
//               </button>
//               <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                 Add to Favourite
//               </span>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Chat Window */}
//       {isChatOpen && <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
//     </div>
//   );
// }














"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaShieldAlt } from "react-icons/fa";
import ChatWindow from "./ChatWindow";
import type { HeroData } from '../types/types';

interface HeroSectionProps {
  hero: HeroData;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!hero) {
    return <div className="h-64 bg-gray-200 animate-pulse rounded-b-2xl"></div>;
  }

  const { rating = 0, safetyScore = 0 } = hero;

  let safetyBg = "bg-red-100";
  let safetyColor = "text-red-600";
  if (safetyScore >= 85) {
    safetyBg = "bg-green-100";
    safetyColor = "text-green-600";
  } else if (safetyScore >= 50) {
    safetyBg = "bg-yellow-100";
    safetyColor = "text-yellow-600";
  }

  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <div className="relative">
      <div className="w-full h-64 md:h-100 relative">
        <Image src={hero.bannerImage} alt="Banner" fill className="object-cover" />
      </div>

      <div className="-mt-12 md:-mt-16 w-full relative">
        <div className="flex flex-col md:flex-row items-start justify-between bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 p-4 md:p-6 mx-auto max-w-full relative">
          <div className="flex items-start gap-4 md:gap-6 w-full md:w-auto">
            <div className="relative w-48 h-48 md:w-72 md:h-72 -mt-32 md:-mt-36 overflow-hidden shadow-xl z-20 group">
              <Image
                src={hero.logo}
                alt="Profile"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="flex flex-col gap-2 mt-0">
              <h2 className="text-lg md:text-2xl font-bold flex flex-wrap items-center gap-2">
                {hero.agencyName}
                <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Image
                    src="/ic_baseline-check-circle-outline.png"
                    alt="Verified"
                    width={16}
                    height={16}
                  />
                  Verified Traveler
                </span>
              </h2>

              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
                {hero.location}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => {
                    if (i < fullStars) {
                      return <span key={i} style={{ fontSize: "20px" }}>★</span>;
                    }
                    if (i === fullStars && halfStar) {
                      return (
                        <span key={i} className="relative inline-block" style={{ fontSize: "18px" }}>
                          <span className="absolute overflow-hidden" style={{ width: "50%" }}>★</span>
                          <span className="text-gray-300">★</span>
                        </span>
                      );
                    }
                    return (
                      <span key={i} className="text-gray-300" style={{ fontSize: "18px" }}>
                        ★
                      </span>
                    );
                  })}
                  <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
                  <span className="ml-1 text-gray-500">({hero.reviews})</span>
                </div>

                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-2xl ${safetyBg} ${safetyColor}`}>
                  <FaShieldAlt className={safetyColor} size={16} />
                  {safetyScore}% Safe
                </span>
              </div>

              {hero.category && (
                <span className="bg-[#1D4350] text-white px-2 py-1 text-xs font-medium mt-2 inline-block">
                  {hero.category}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto items-start md:items-center">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#1D4350] hover:bg-[#0f2a35] hover:scale-105 transition w-full sm:w-auto cursor-pointer"
            >
              <Image src="/join-trip.png" alt="Follow" width={20} height={20} className="filter invert" />
              {isFollowing ? "Following" : "Follow"}
            </button>

            <button className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#1D4350] hover:bg-[#0f2a35] hover:scale-105 transition w-full sm:w-auto cursor-pointer">
              <Image src="/view-trip.png" alt="Join Trip" width={20} height={20} className="filter invert" />
              Join Trip
            </button>

            <div className="relative group">
              <button
                onClick={() => setIsChatOpen(true)}
                className="flex items-center justify-center bg-[#1D4350] text-white p-3 rounded-full hover:bg-[#0f2a35] hover:scale-110 transition shadow-md cursor-pointer"
              >
                <Image src="/chat-icon.png" alt="Chat" width={22} height={22} className="filter invert" />
              </button>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                Chat
              </span>
            </div>

            <div className="relative group">
              <button
                onClick={() => setIsFavourite(!isFavourite)}
                className="flex items-center justify-center bg-[#1D4350] text-white p-3 rounded-full hover:bg-[#0f2a35] hover:scale-110 transition shadow-md cursor-pointer"
              >
                <FaHeart className={isFavourite ? "text-red-500" : "text-white"} size={22} />
              </button>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                Add to Favourite
              </span>
            </div>
          </div>
        </div>
      </div>

      {isChatOpen && <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}