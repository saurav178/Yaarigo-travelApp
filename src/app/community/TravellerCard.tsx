"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  CheckCircle,
  XCircle,
  Star,
  StarHalf,
  Info,
  Shield,
  MapPinned,
  CalendarDays,
} from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";
import { Traveller } from "./data/travellers";

interface TravellerCardProps {
  id: number;
  name: string;
  location: string;
  Destination?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  image?: string;
  verified?: boolean;
  age?: number;
  genderPreference?: string;
  compatibility?: number;
  rating?: number;
  onDismiss?: () => void;
  onInterested?: () => void;
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
  if (traveller.image) score += 15;
  if (traveller.rating && traveller.rating >= 4) score += 20;
  return Math.min(score, 100);
};

const TravellerCard: FC<TravellerCardProps> = ({
  id,
  name,
  location,
  Destination,
  startDate,
  endDate,
  description,
  image = "/images/user.png",
  verified = false,
  age = 30,
  genderPreference = "Male",
  compatibility = 85,
  rating = 4.5,
  onDismiss,
  onInterested,
  isActive,
  onToggle,
}) => {
  const [status, setStatus] = useState<"none" | "interested" | "dismissed">(
    "none"
  );
  const [progress, setProgress] = useState(100);

  const traveller = { verified, age, image, rating };
  const safetyScore = calculateSafetyScore(traveller);

  const [animatedScore, setAnimatedScore] = useState(0);
  const circleRadius = 26;
  const circleCircumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    let start = 0;
    const end = safetyScore;
    const duration = 1000;
    const increment = end / (duration / 16);

    const animate = () => {
      start += increment;
      if (start >= end) start = end;
      else requestAnimationFrame(animate);
      setAnimatedScore(Math.round(start));
    };

    requestAnimationFrame(animate);
  }, [safetyScore]);

  // Auto-close popup progress
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
      stars.push(<Star key={i} size={12} className="text-yellow-400" />);
    }
    if (halfStar)
      stars.push(<StarHalf key="half" size={12} className="text-yellow-400" />);
    return stars;
  };

  const [descExpanded, setDescExpanded] = useState(false);

  return (
    <div
      className={`bg-gradient-to-br from-blue-100/50 to-blue-200/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-md p-3 flex flex-col gap-2 w-[270px] sm:w-[300px] transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl relative ${
        descExpanded ? "min-h-[320px]" : "min-h-[180px]"
      }`}
    >
      {/* Info Icon */}
      <button
        onClick={() => onToggle(id)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition z-10 !bg-transparent !text-gray-600"
      >
        <Info className="w-4 h-4" />
      </button>

      {/* Top Section */}
      <div className="flex items-center gap-2 relative">
        <Image
          src={image}
          alt={name || "profile image"}
          width={50}
          height={50}
          className="rounded-full border border-gray-300 relative -translate-y-2"
        />
        <div>
          <h3 className="text-base font-semibold flex items-center gap-1 text-gray-900 pt-2 !text-[14px]">
            {name} {verified && <VerifiedBadge size={16} />}
          </h3>

          <div className="flex items-center justify-start gap-[2px] mt-[1px] text-[12px] text-gray-700 font-medium">
            {renderStars(rating)}
            <span>{rating.toFixed(1)}</span>
          </div>

          <p className="!text-[13px] text-gray-700 mt-[2px]">
            Location: {location}
          </p>

          {Destination && (
            <p
              className="flex items-center gap-1 !text-[13px]"
              title="Destination"
            >
              <MapPinned className="w-3 h-3 text-[#3636e4]" /> {Destination}
            </p>
          )}

          {startDate && endDate && (
            <p
              className="flex items-center gap-1 text-[10px]"
              title="Travel Dates"
            >
              <CalendarDays className="w-3 h-3 text-[#3636e4]" />
              <span className="bg-[#d2d3d6de] rounded-[6px] px-1 py-[1px] text-black text-[9px]">
                {format(new Date(startDate), "dd MMM yy")} -{" "}
                {format(new Date(endDate), "dd MMM yy")}
              </span>
            </p>
          )}
        </div>

        {/* Popup */}
        {isActive && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[200px] bg-green-50 p-2 rounded-xl shadow-md z-20 text-center transition-opacity duration-300 text-xs">
            <p className="text-gray-900 mt-1">
              Compatibility: {compatibility}%
            </p>
            <p className="text-gray-900 mt-1">Age: {age}</p>
            <p className="text-gray-900 mt-1">Gender: {genderPreference}</p>

            <div className="relative w-full bg-gray-200 rounded-full h-1 overflow-hidden mt-2">
              <div
                className="bg-blue-500 h-1 transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <p
        className={`text-[1px] text-gray-700 mt-1 overflow-hidden transition-all duration-300 ${
          descExpanded
            ? "h-auto line-clamp-none"
            : "h-8 line-clamp-2 cursor-pointer"
        }`}
        onClick={() => setDescExpanded(!descExpanded)}
      >
        {description || " "}
        {description.length > 50 && !descExpanded && " ... (click to expand)"}
        {descExpanded && " (click to collapse)"}
      </p>

      {/* Multi-Segment Safety Graph */}
      <div className="flex flex-col items-center mt-1">
        <div className="relative w-20 h-20 hover:scale-105 transition-transform duration-500 ease-out">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 64 64">
            {/* Gray background ring */}
            <circle
              className="text-gray-300"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius}
              cx="32"
              cy="32"
            />

            {/* Outer Green Segment */}
            <circle
              className="text-green-400 transition-all duration-700 ease-out"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius}
              cx="32"
              cy="32"
              strokeDasharray={circleCircumference}
              strokeDashoffset={
                circleCircumference -
                (Math.min(animatedScore, 100) / 100) * circleCircumference
              }
              strokeLinecap="round"
            />

            {/* Middle Blue/Yellow Segment */}
            <circle
              className="text-blue-400 transition-all duration-700 ease-out"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius - 6}
              cx="32"
              cy="32"
              strokeDasharray={circleCircumference}
              strokeDashoffset={
                circleCircumference -
                ((Math.min(animatedScore - 50, 50) || 0) / 100) *
                  circleCircumference
              }
              strokeLinecap="round"
            />

            {/* Inner Red Segment */}
            <circle
              className="text-red-400 transition-all duration-700 ease-out"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius - 8}
              cx="32"
              cy="32"
              strokeDasharray={circleCircumference}
              strokeDashoffset={
                circleCircumference -
                ((Math.min(animatedScore - 100, 50) || 0) / 100) *
                  circleCircumference
              }
              strokeLinecap="round"
            />
          </svg>

          {/* Center Number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-extrabold text-gray-800">
              {animatedScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-500 text-white p-1 rounded-full flex items-center justify-center shadow-sm">
            <Shield size={12} />
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            Safety Score
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3 mt-2">
        <button
          onClick={() => {
            setStatus("dismissed");
            onDismiss?.();
          }}
          className={`!bg-gray-500 !text-white px-3 py-1 rounded-md text-xs flex items-center gap-1 hover:!bg-gray-600 transition ${
            status === "dismissed" ? "opacity-80" : ""
          }`}
        >
          <XCircle size={14} />
          {status === "dismissed" ? "Dismissed" : "Dismiss"}
        </button>

        <button
          onClick={() => {
            setStatus("interested");
            onInterested?.();
          }}
          className={`!bg-blue-500 !text-white px-3 py-1 rounded-md text-xs flex items-center gap-1 hover:!bg-blue-600 transition ${
            status === "interested" ? "opacity-80" : ""
          }`}
        >
          <CheckCircle size={14} />
          {status === "interested" ? "Interested ✅" : "Interested"}
        </button>
      </div>
    </div>
  );
};

export default TravellerCard;

// TravellerCard.tsx
// "use client";

// import { FC, useEffect, useState } from "react";
// import Image from "next/image";
// import { format } from "date-fns";
// import {
//   CheckCircle,
//   XCircle,
//   Star,
//   StarHalf,
//   Info,
//   Shield,
//   MapPinned,
//   CalendarDays,
//   MessageCircle,
// } from "lucide-react";
// import VerifiedBadge from "./VerifiedBadge";

// interface TravellerCardProps {
//   id: number;
//   name: string;
//   location: string;
//   Destination?: string;
//   startDate?: string;
//   endDate?: string;
//   description: string;
//   image?: string;
//   verified?: boolean;
//   age?: number;
//   genderPreference?: string;
//   compatibility?: number;
//   rating?: number;
//   onDismiss?: () => void;
//   onInterested?: () => void;
//   isActive: boolean;
//   onToggle: (id: number) => void;
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
//   if (traveller.image) score += 15;
//   if (traveller.rating && traveller.rating >= 4) score += 20;
//   return Math.min(score, 100);
// };

// type AISuggestions = {
//   chatStarters: string[];
//   destinations: string[];
//   id?: string;
// };

// const TravellerCard: FC<TravellerCardProps> = ({
//   id,
//   name,
//   location,
//   Destination,
//   startDate,
//   endDate,
//   description,
//   image = "/images/user.png",
//   verified = false,
//   age = 30,
//   genderPreference = "Male",
//   compatibility = 85,
//   rating = 4.5,
//   onDismiss,
//   onInterested,
//   isActive,
//   onToggle,
// }) => {
//   const [status, setStatus] = useState<"none" | "interested" | "dismissed">(
//     "none"
//   );
//   const [progress, setProgress] = useState(100);
//   const traveller = { verified, age, image, rating };
//   const safetyScore = calculateSafetyScore(traveller);

//   // Safety score animation
//   const [animatedScore, setAnimatedScore] = useState(0);
//   const circleRadius = 26;
//   const circleCircumference = 2 * Math.PI * circleRadius;

//   useEffect(() => {
//     let start = 0;
//     const end = safetyScore;
//     const duration = 1000;
//     const increment = end / (duration / 16);

//     let raf = 0;
//     const animate = () => {
//       start += increment;
//       if (start >= end) start = end;
//       setAnimatedScore(Math.round(start));
//       if (start < end) raf = requestAnimationFrame(animate);
//     };

//     raf = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(raf);
//   }, [safetyScore]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isActive) {
//       setProgress(100);
//       interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev <= 0) {
//             clearInterval(interval);
//             onToggle(id);
//             return 0;
//           }
//           return prev - 2;
//         });
//       }, 100);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, onToggle, id]);

//   const renderStars = (rating: number) => {
//     const stars: JSX.Element[] = [];
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5;
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} size={12} className="text-yellow-400" />);
//     }
//     if (halfStar)
//       stars.push(<StarHalf key="half" size={12} className="text-yellow-400" />);
//     return stars;
//   };

//   const [descExpanded, setDescExpanded] = useState(false);

//   // ---------------------------
//   // AI Suggestions + Chat
//   // ---------------------------
//   const [aiOpen, setAiOpen] = useState(false);
//   const [aiSuggestions, setAiSuggestions] = useState<AISuggestions | null>(
//     null
//   );
//   const [loadingAI, setLoadingAI] = useState(false);
//   const [lastSig, setLastSig] = useState<string | null>(null);

//   const CHAT_STARTER_TEMPLATES = [
//     "Hey — I saw you’re headed to {destination}. What’s the one thing you’re most excited about?",
//     "What’s your favorite travel snack while exploring {destination}?",
//     "If you could only take one photo in {destination}, what would it be of?",
//     "I love trying local food — what would you recommend in {location}?",
//     "What’s a travel tip you wish you knew before visiting {destination}?",
//     "Mountains or beaches — what’s your go-to?",
//   ];

//   const DESTINATION_POOL = [
//     "Japan in Winter",
//     "Bali for Summer",
//     "Switzerland in Spring",
//     "Italy in Autumn",
//     "Thailand for Festivals",
//     "Portugal for the coast",
//   ];

//   const pickN = <T,>(pool: T[], n = 1) => {
//     const out: T[] = [];
//     const copy = [...pool];
//     while (out.length < n && copy.length > 0) {
//       const idx = Math.floor(Math.random() * copy.length);
//       out.push(copy.splice(idx, 1)[0]);
//     }
//     return out;
//   };

//   const makeSig = (s: AISuggestions) =>
//     `${s.chatStarters.join("|")}::${s.destinations.join("|")}`;

//   const generateMockSuggestions = (): AISuggestions => {
//     const dest = Destination || location || "travel";
//     const filled = CHAT_STARTER_TEMPLATES.map((t) =>
//       t.replace("{destination}", dest).replace("{location}", location || dest)
//     );
//     const chatStarters = pickN(filled, 2);
//     const destinations = pickN(DESTINATION_POOL, 1);
//     return { chatStarters, destinations };
//   };

//   const fetchAISuggestions = async () => {
//     setLoadingAI(true);
//     try {
//       const res = await fetch("/api/suggestions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ travellerId: id, name, location, Destination }),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         const suggestion: AISuggestions = {
//           chatStarters: data.chatStarters ?? [],
//           destinations: data.destinations ?? [],
//         };
//         const sig = makeSig(suggestion);
//         if (sig === lastSig) {
//           const mock = generateMockSuggestions();
//           setAiSuggestions(mock);
//           setLastSig(makeSig(mock));
//         } else {
//           setAiSuggestions(suggestion);
//           setLastSig(sig);
//         }
//       } else {
//         const mock = generateMockSuggestions();
//         setAiSuggestions(mock);
//         setLastSig(makeSig(mock));
//       }
//     } catch {
//       const mock = generateMockSuggestions();
//       setAiSuggestions(mock);
//       setLastSig(makeSig(mock));
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   const handleToggleAI = async () => {
//     const opening = !aiOpen;
//     setAiOpen(opening);
//     if (opening && !aiSuggestions) await fetchAISuggestions();
//   };

//   const handleRefreshAI = async () => {
//     await fetchAISuggestions();
//   };

//   const handleDismissAI = () => {
//     setAiSuggestions(null);
//     setAiOpen(false);
//   };

//   const handleUseStarter = async (text: string) => {
//     if (typeof navigator !== "undefined" && navigator.clipboard) {
//       try {
//         await navigator.clipboard.writeText(text);
//         alert("Chat starter copied to clipboard ✨");
//       } catch {}
//     }
//   };

//   // ---------------------------
//   // JSX
//   // ---------------------------
//   return (
//     <div
//       className={`text-[11px] sm:text-[12px] bg-gradient-to-br from-blue-100/50 to-blue-200/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-md p-2 flex flex-col gap-2 w-[300px] transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl relative ${
//         descExpanded ? "min-h-[360px]" : "min-h-[220px]"
//       }`}
//     >
//       {/* Info Icon */}
//       <button
//         onClick={() => onToggle(id)}
//         className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition z-10"
//       >
//         <Info className="w-4 h-4 text-gray-600" />
//       </button>

//       {/* Top Section */}
//       <div className="flex items-center gap-2 relative">
//         <Image
//           src={image}
//           alt={name || "profile image"}
//           width={50}
//           height={50}
//           className="rounded-full border border-gray-300 relative -translate-y-2"
//         />
//         <div className="flex-1">
//           <h3 className="text-sm font-semibold flex items-center gap-1 text-gray-900 pt-2">
//             {name} {verified && <VerifiedBadge size={16} />}
//           </h3>

//           <div className="flex items-center justify-start gap-[4px] mt-[1px] text-[10px] text-gray-700 font-medium">
//             {renderStars(rating)}
//             <span>{rating.toFixed(1)}</span>
//           </div>

//           <p className="text-[11px] text-gray-800">Location: {location}</p>

//           {Destination && (
//             <p className="flex items-center gap-1 text-[10px]" title="Destination">
//               <MapPinned className="w-3 h-3 text-[#3636e4]" /> {Destination}
//             </p>
//           )}

//           {startDate && endDate && (
//             <p className="flex items-center gap-1 text-[10px]" title="Travel Dates">
//               <CalendarDays className="w-3 h-3 text-[#3636e4]" />
//               <span className="bg-[#d2d3d6de] rounded-[6px] px-1 py-[1px] text-black text-[9px]">
//                 {format(new Date(startDate), "dd MMM yy")} -{" "}
//                 {format(new Date(endDate), "dd MMM yy")}
//               </span>
//             </p>
//           )}
//         </div>

//         {/* Active Popup */}
//         {isActive && (
//           <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[200px] bg-green-50 p-2 rounded-xl shadow-md z-20 text-center transition-opacity duration-300">
//             <p className="text-gray-900 text-xs mt-1">
//               Compatibility: {compatibility}%
//             </p>
//             <p className="text-gray-900 text-xs mt-1">Age: {age}</p>
//             <p className="text-gray-900 text-xs mt-1">Gender: {genderPreference}</p>

//             <div className="relative w-full bg-gray-200 rounded-full h-1 overflow-hidden mt-2">
//               <div
//                 className="bg-blue-500 h-1 transition-all duration-100"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Description */}
//       <p
//         className={`text-xs text-gray-700 mt-1 overflow-hidden transition-all duration-300 ${
//           descExpanded
//             ? "h-auto line-clamp-none"
//             : "h-8 line-clamp-2 cursor-pointer"
//         }`}
//         onClick={() => setDescExpanded(!descExpanded)}
//       >
//         {description || " "}
//         {description.length > 50 && !descExpanded && " ... (click to expand)"}
//         {descExpanded && " (click to collapse)"}
//       </p>

//       {/* Safety Score */}
//       <div className="flex flex-col items-center mt-1">
//         <div className="relative w-20 h-20 hover:scale-105 transition-transform duration-500 ease-out">
//           <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 64 64">
//             <circle
//               className="text-gray-300"
//               strokeWidth="6"
//               stroke="currentColor"
//               fill="transparent"
//               r={circleRadius}
//               cx="32"
//               cy="32"
//             />
//             <circle
//               className="text-green-400 transition-all duration-700 ease-out"
//               strokeWidth="4"
//               stroke="currentColor"
//               fill="transparent"
//               r={circleRadius}
//               cx="32"
//               cy="32"
//               strokeDasharray={circleCircumference}
//               strokeDashoffset={
//                 circleCircumference -
//                 (Math.min(animatedScore, 100) / 100) * circleCircumference
//               }
//               strokeLinecap="round"
//             />
//           </svg>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <span className="text-base font-extrabold text-gray-800">
//               {animatedScore}%
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mt-2">
//           <span className="bg-green-500 text-white p-1 rounded-full flex items-center justify-center shadow-sm">
//             <Shield size={12} />
//           </span>
//           <span className="text-sm text-gray-700 font-semibold">Safety Score</span>
//         </div>
//       </div>

//       {/* AI Suggestions Popup */}
//       {aiOpen && (
//         <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[240px] bg-white/95 border border-gray-200 rounded-lg p-3 text-xs shadow-xl z-30 animate-fade-in">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <MessageCircle size={14} />
//               <span className="font-semibold text-gray-800">AI Suggestions</span>
//             </div>

//             <div className="flex items-center gap-2 text-[11px]">
//               <button
//                 onClick={handleRefreshAI}
//                 className="underline text-blue-600 disabled:opacity-40"
//                 disabled={loadingAI}
//               >
//                 Refresh
//               </button>
//               <button
//                 onClick={handleDismissAI}
//                 className="underline text-gray-600"
//                 aria-label="Dismiss suggestions"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>

//           <div className="mt-2">
//             {loadingAI && <div className="text-[12px]">Loading...</div>}

//             {!loadingAI && aiSuggestions && (
//               <div className="flex flex-col gap-2">
//                 <div>
//                   <div className="text-[11px] font-medium text-gray-700">
//                     🗣 Chat Starters
//                   </div>
//                   <ul className="mt-1 space-y-1">
//                     {aiSuggestions.chatStarters.map((s, i) => (
//                       <li key={i} className="flex items-start justify-between gap-2">
//                         <div className="text-[12px] text-gray-800">{s}</div>
//                         <button
//                           onClick={() => handleUseStarter(s)}
//                           className="text-[11px] px-2 py-0.5 rounded bg-blue-50 border border-blue-200 hover:bg-blue-100"
//                         >
//                           Use
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div>
//                   <div className="text-[11px] font-medium text-gray-700">
//                     🌍 Predicted Destination
//                   </div>
//                   <div className="mt-1 flex gap-2">
//                     {aiSuggestions.destinations.map((d, i) => (
//                       <span key={i} className="bg-gray-100 px-2 py-1 rounded text-[11px]">
//                         {d}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {!loadingAI && !aiSuggestions && (
//               <div className="text-[12px] text-gray-600">
//                 No suggestions. Click refresh to generate.
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Actions */}
//       <div className="flex justify-center gap-3 mt-2 relative z-10">
//         <button
//           onClick={handleToggleAI}
//           className={`px-3 py-1 rounded-md text-xs flex items-center gap-2 transition ${
//             aiOpen ? "bg-indigo-600 text-white" : "bg-indigo-400 text-white hover:bg-indigo-500"
//           }`}
//         >
//           <MessageCircle size={14} />
//           {aiOpen ? "Close" : "Chat"}
//         </button>

//         <button
//           onClick={() => {
//             setStatus("dismissed");
//             onDismiss?.();
//           }}
//           className={`px-3 py-1 rounded-md text-white text-xs flex items-center gap-1 transition ${
//             status === "dismissed"
//               ? "bg-gray-400"
//               : "bg-gray-400 hover:bg-gray-600"
//           }`}
//         >
//           <XCircle size={14} />
//           {status === "dismissed" ? "Dismissed" : "Dismiss"}
//         </button>

//         <button
//           onClick={() => {
//             setStatus("interested");
//             onInterested?.();
//           }}
//           className={`px-3 py-1 rounded-md text-white text-xs flex items-center gap-1 transition ${
//             status === "interested"
//               ? "bg-blue-500"
//               : "bg-blue-400 hover:bg-blue-500"
//           }`}
//         >
//           <CheckCircle size={14} />
//           {status === "interested" ? "Interested ✅" : "Interested"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TravellerCard;
