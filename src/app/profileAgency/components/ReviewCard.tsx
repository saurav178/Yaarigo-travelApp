// "use client";
// import { Users, Star, MoreVertical } from "lucide-react";
// import { useState } from "react";

// interface Review {
//   name: string;
//   date: string;
//   rating: number;
//   text: string;
// }

// interface ReviewCardProps {
//   review: Review;
// }

// export default function ReviewCard({ review }: ReviewCardProps) {
//   const [hoveredStar, setHoveredStar] = useState<number | null>(null);

//   return (
//     <div className="border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-3">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
//             <Users className="w-5 h-5 text-gray-600" />
//           </div>
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="font-semibold text-gray-900">{review.name}</span>
//               <span className="text-xs text-[#F76C6C] bg-red-50 px-2 py-0.5 rounded">
//                 Verified User
//               </span>
//             </div>
//             <span className="text-xs text-gray-500">{review.date}</span>
//           </div>
//         </div>
//         <button className="text-gray-400 hover:text-gray-600">
//           <MoreVertical className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Stars */}
//       <div className="flex items-center gap-1 mb-3 relative">
//         {[1, 2, 3, 4, 5].map((i) => {
//           const fillPercent = Math.min(
//             Math.max((review.rating - (i - 1)) * 100, 0),
//             100
//           );

//           return (
//             <div
//               key={i}
//               className="relative w-5 h-5"
//               onMouseEnter={() => setHoveredStar(i)}
//               onMouseLeave={() => setHoveredStar(null)}
//             >
//               {/* Background empty star */}
//               <Star className="w-5 h-5 text-gray-300 absolute top-0 left-0" />

//               {/* Yellow filled overlay */}
//               <div
//                 className="absolute top-0 left-0 overflow-hidden"
//                 style={{ width: `${fillPercent}%`, height: "100%" }}
//               >
//                 <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//               </div>

//               {/* Hover tooltip */}
//               {hoveredStar === i && (
//                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded pointer-events-none">
//                   {review.rating.toFixed(1)}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
//         {review.text}
//       </p>
//     </div>
//   );
// }












"use client";
import { Users, Star, MoreVertical } from "lucide-react";
import { useState } from "react";
import type { Review } from '../types/types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <div className="border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{review.name}</span>
              <span className="text-xs text-[#F76C6C] bg-red-50 px-2 py-0.5 rounded">
                Verified User
              </span>
            </div>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-1 mb-3 relative">
        {[1, 2, 3, 4, 5].map((i) => {
          const fillPercent = Math.min(
            Math.max((review.rating - (i - 1)) * 100, 0),
            100
          );

          return (
            <div
              key={i}
              className="relative w-5 h-5"
              onMouseEnter={() => setHoveredStar(i)}
              onMouseLeave={() => setHoveredStar(null)}
            >
              <Star className="w-5 h-5 text-gray-300 absolute top-0 left-0" />

              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercent}%`, height: "100%" }}
              >
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>

              {hoveredStar === i && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded pointer-events-none">
                  {review.rating.toFixed(1)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {review.text || review.comment}
      </p>
    </div>
  );
}