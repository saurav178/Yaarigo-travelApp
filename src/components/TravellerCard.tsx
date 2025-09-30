// import { FC, useState, useEffect } from "react";
// import Image from "next/image";
// import { CheckCircle, XCircle, Star, StarHalf, Shield } from "lucide-react";
// import VerifiedBadge from "./VerifiedBadge";

// interface TravellerCardProps {
//   id: number;
//   name: string;
//   location: string;
//   description: string;
//   image?: string;
//   verified?: boolean;
//   age?: number;
//   genderPreference?: string;
//   compatibility?: number;
//   rating?: number;
//   onDismiss?: () => void;
//   isActive: boolean; // 👈 from parent
//   onToggle: (id: number) => void; // 👈 pass id back
// }

// const calculateSafetyScore = (traveller: {
//   verified?: boolean;
//   age?: number;
//   image?: string;
//   rating?: number;
// }) => {
//   let score = 0;
//   if (traveller.verified) score += 50;
//   if (traveller.age && traveller.age >= 18) score += 10;
//   if (traveller.image) score += 10;
//   if (traveller.rating && traveller.rating >= 4) score += 20;
//   return Math.min(score, 100);
// };

// const TravellerCard: FC<TravellerCardProps> = ({
//   id,
//   name,
//   location,
//   description,
//   image = "/images/user.png",
//   verified = false,
//   age = 30,
//   genderPreference = "Any",
//   compatibility = 85,
//   rating = 4.5,
//   onDismiss,
//   isActive,
//   onToggle,
// }) => {
//   const [status, setStatus] = useState<"none" | "interested" | "dismissed">(
//     "none"
//   );
//   const [progress, setProgress] = useState(100);

//   const traveller = { verified, age, image, rating };
//   const safetyScore = calculateSafetyScore(traveller);

//   // Progress bar countdown when card is active
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isActive) {
//       setProgress(100);
//       interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev <= 0) {
//             clearInterval(interval);
//             onToggle(id); // 👈 close the correct card
//             return 0;
//           }
//           return prev - 2;
//         });
//       }, 100);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, onToggle, id]);

//   const renderStars = (rating: number) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5;
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} size={18} className="text-yellow-400" />);
//     }
//     if (halfStar) {
//       stars.push(<StarHalf key="half" size={18} className="text-yellow-400" />);
//     }
//     return stars;
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 w-[340px] border border-[#3B82F6] hover:border-green-400 transition transform duration-300 hover:scale-[1.02] hover:shadow-lg">
//       {/* Top Section */}
//       <div className="flex items-center gap-4">
//         <Image
//           src={image}
//           alt={name}
//           width={56}
//           height={56}
//           className="rounded-full border border-gray-300"
//         />
//         <div>
//           <h3 className="text-lg font-semibold flex items-center gap-1 text-gray-900">
//             {name} {verified && <VerifiedBadge size={18} />}
//           </h3>
//           <p className="text-sm text-gray-500">{location}</p>
//         </div>
//       </div>

//       {/* Description */}
//       <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
//         {description}
//       </p>

//       {/* Compatibility (age removed here) */}
//       <div className="bg-blue-50 p-2 rounded-md text-center font-semibold text-blue-600">
//         <p>Compatibility: {compatibility}% Match</p>
//       </div>

//       {/* More Info Button */}
//       <button
//         onClick={() => onToggle(id)}
//         className="px-3 py-1 text-sm rounded-md bg-green-100 text-[#3B82F6] font-medium hover:bg-green-200 transition"
//       >
//         {isActive ? "Hide Info" : "More Info"}
//       </button>

//       {/* Collapsible Info Section */}
//       <div className="relative">
//         <div
//           className={`absolute left-1/2 -top-45 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
//             isActive ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         >
//           <div className="space-y-2 bg-green-50 p-3 rounded-xl shadow-md w-[280px] text-center max-h-[160px] overflow-y-auto">
//             {/* Safety Score */}
//             <p className="flex items-center justify-center gap-2 text-green-700 font-semibold">
//               <Shield size={16} /> Safety Score: {safetyScore}%
//             </p>

//             {/* Age in middle */}
//             <p className="text-gray-700 font-medium">Age: {age}</p>

//             {/* Rating */}
//             <div className="flex items-center justify-center gap-2">
//               {renderStars(rating)}
//               <span className="text-sm font-medium text-gray-700">
//                 {rating.toFixed(1)}
//               </span>
//             </div>

//             {/* Progress bar */}
//             <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//               <div
//                 className="bg-green-500 h-2 transition-all duration-100"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-center gap-4 mt-auto">
//         <button
//           onClick={() => {
//             setStatus("dismissed");
//             onDismiss?.();
//           }}
//           className={`px-4 py-2 rounded-md text-white text-sm flex items-center gap-1 transition ${
//             status === "dismissed"
//               ? "bg-red-400"
//               : "bg-red-400 hover:bg-red-500"
//           }`}
//         >
//           <XCircle size={16} />
//           {status === "dismissed" ? "Dismissed" : "Dismiss"}
//         </button>
//         <button
//           onClick={() => setStatus("interested")}
//           className={`px-4 py-2 rounded-md text-white text-sm flex items-center gap-1 transition ${
//             status === "interested"
//               ? "bg-green-400"
//               : "bg-green-400 hover:bg-green-500"
//           }`}
//         >
//           <CheckCircle size={16} />
//           {status === "interested" ? "Interested ✅" : "Interested"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TravellerCard;

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle,
  XCircle,
  Star,
  StarHalf,
  Info,
  Shield,
} from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";

interface TravellerCardProps {
  id: number;
  name: string;
  location: string;
  currentLocation?: string; // added
  description: string;
  image?: string;
  verified?: boolean;
  age?: number;
  genderPreference?: string;
  compatibility?: number;
  rating?: number;
  onDismiss?: () => void;
  isActive: boolean;
  onToggle: (id: number) => void;
}

const calculateSafetyScore = (traveller: {
  verified?: boolean;
  age?: number;
  image?: string;
  rating?: number;
}) => {
  let score = 0;
  if (traveller.verified) score += 50;
  if (traveller.age && traveller.age >= 18) score += 10;
  if (traveller.image) score += 10;
  if (traveller.rating && traveller.rating >= 4) score += 20;
  return Math.min(score, 100);
};

const TravellerCard: FC<TravellerCardProps> = ({
  id,
  name,
  location,
  currentLocation, // added
  description,
  image = "/images/user.png",
  verified = false,
  age = 30,
  genderPreference = "Any",
  compatibility = 85,
  rating = 4.5,
  onDismiss,
  isActive,
  onToggle,
}) => {
  const [status, setStatus] = useState<"none" | "interested" | "dismissed">(
    "none"
  );
  const [progress, setProgress] = useState(100);

  const traveller = { verified, age, image, rating };
  const safetyScore = calculateSafetyScore(traveller);

  // Progress bar countdown when popup is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      setProgress(100);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            onToggle(id);
            return 0;
          }
          return prev - 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, onToggle, id]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={18} className="text-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<StarHalf key="half" size={18} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 w-[340px] border border-[#3B82F6] hover:border-green-400 transition transform duration-300 hover:scale-[1.02] hover:shadow-lg relative">
      {/* Info Icon in top-right corner */}
      <button
        onClick={() => onToggle(id)}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition z-10"
      >
        <Info className="w-5 h-5 text-gray-600" />
      </button>

      {/* Top Section */}
      <div className="flex items-center gap-4 relative">
        <Image
          src={image}
          alt={name}
          width={56}
          height={56}
          className="rounded-full border border-gray-300"
        />
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-1 text-gray-900">
            {name} {verified && <VerifiedBadge size={18} />}
          </h3>
          <p className="text-sm text-gray-800">Location: {location}</p>
          {currentLocation && (
            <p className="text-sm text-gray-800">Current: {currentLocation}</p>
          )}
        </div>

        {/* Popup below profile name */}
        {isActive && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[220px] bg-green-50 p-3 rounded-xl shadow-md z-20 text-center transition-opacity duration-300">
            <p className="flex items-center justify-center gap-2 text-green-700 font-semibold">
              <Shield size={16} /> Safety Score: {safetyScore}%
            </p>
            <p className="text-gray-700 font-medium mt-1">Age: {age}</p>

            {/* Progress Bar */}
            <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden mt-3">
              <div
                className="bg-green-500 h-2 transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
        {description}
      </p>

      {/* Compatibility */}
      <div className="bg-blue-50 p-2 rounded-md text-center font-semibold text-gray-600">
        Compatibility: {compatibility}% Match
      </div>

      {/* Rating & Gender */}
      <div className="flex items-center justify-between mt-2 text-sm text-gray-700 font-medium">
        <div className="flex items-center gap-1">
          {renderStars(rating)}
          <span className="ml-1">{rating.toFixed(1)}</span>
        </div>
        <div className="italic">{genderPreference}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-auto">
        <button
          onClick={() => {
            setStatus("dismissed");
            onDismiss?.();
          }}
          className={`px-4 py-2 rounded-md text-white text-sm flex items-center gap-1 transition ${
            status === "dismissed"
              ? "bg-gray-400"
              : "bg-gray-400 hover:bg-gray-600"
          }`}
        >
          <XCircle size={16} />
          {status === "dismissed" ? "Dismissed" : "Dismiss"}
        </button>
        <button
          onClick={() => setStatus("interested")}
          className={`px-4 py-2 rounded-md text-white text-sm flex items-center gap-1 transition ${
            status === "interested"
              ? "bg-blue-400"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
        >
          <CheckCircle size={16} />
          {status === "interested" ? "Interested ✅" : "Interested"}
        </button>
      </div>
    </div>
  );
};

export default TravellerCard;
