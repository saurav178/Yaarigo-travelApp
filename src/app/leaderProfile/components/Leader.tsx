// // LeaderTrips

// "use client";

// import { useState } from "react";
// import Image from "next/image";

// import { GoDotFill } from "react-icons/go";

// import {
//   FaExclamationTriangle,
//   FaUser,
//   FaStar,
//   FaHeart,
//   FaCheckCircle,
//   FaShieldAlt, 
//   FaWallet,
//   // FaCalendar,
//   FaFlag,
//   // FaCalendarAlt,
//   FaCalendar,
//   // FaMapMarkerAlt,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";
// import { PiMedalDuotone } from "react-icons/pi";

// import type { Leader } from "../../searchtrip/types/types";
// import { LEADERS_DEMO } from "../../searchtrip/data/data";
// import dots from "../../../../public/searchpageimg/Line 1.png";
// import TripImg from "../../../../public/searchpageimg/view_trips.png";
// import Join from "../../../../public/searchpageimg/join_trips.png";
// import Profile from "../../../../public/searchpageimg/view_profile.png";

// type Props = { leaders?: Leader[] };

// export default function LeaderTrips({ }: Props) {
//   const [liked, setLiked] = useState<number[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const toggleLike = (id: number) =>
//     setLiked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

//   const nextCard = () => {
//     setCurrentIndex((prev) => (prev + 1) % Headers.length);
//   };

//   const prevCard = () => {
//     setCurrentIndex((prev) => (prev - 1 + Headers.length) % leaders.length);
//   };

//   const getInitials = (name: string) =>
//     name
//       .split(" ")
//       .map((s) => s[0] ?? "")
//       .join("")
//       .toUpperCase();

//   const getCategoryStyle = (category: string) => {
//     switch (category) {
//       case "Travel Enthusiast":
//         return {
//           bg: "bg-blue-100 text-blue-800",
//           avatarBg: "bg-blue-500 text-white",
//         };
//       case "Featured Trip Leader":
//         return {
//           bg: "bg-yellow-100 text-yellow-800",
//           avatarBg: "bg-yellow-500 text-white",
//         };
//       case "Featured Trip Agency":
//         return {
//           bg: "bg-orange-100 text-orange-800",
//           avatarBg: "bg-orange-500 text-white",
//         };
//       default:
//         return {
//           bg: "bg-gray-100 text-gray-800",
//           avatarBg: "bg-gray-500 text-white",
//         };
//     }
//   };

//   const getSafeScoreStyle = (score: number) => {
//     if (score < 50)
//       return "bg-red-100 text-red-700 border border-red-300 px-1 py-[2px] rounded-md flex items-center gap-1 text-xs";
//     if (score < 75)
//       return "bg-yellow-100 text-yellow-800 border border-yellow-300 px-1 py-[2px] rounded-md flex items-center gap-1 text-xs";
//     return "bg-green-100 text-green-700 border border-green-300 px-1 py-[2px] rounded-md flex items-center gap-1 text-xs";
//   };

//   const currentTrip = leaders[currentIndex];
//   const catStyle = getCategoryStyle(currentTrip.host.category);

//   return (
//     <main className="w-full flex justify-start px-3 lg:px-0">
       
//       <div className="w-full mt-16 mb-8 flex flex-col gap-3">
//         <h1 className="text-2xl ml-6 font-bold text-gray-900 mb-4">Featured Trip Leaders</h1>
//         <div className="relative">
//           {/* Left Arrow */}
//           <button
//             onClick={prevCard}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
//           >
//             <FaChevronLeft size={20} />
//           </button>

//           {/* Card */}
//           <div className="bg-white self-start shadow-sm border border-gray-200 flex flex-col sm:flex-row overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_20px_-6px_rgba(0,0,0,0.25)] lg:h-80 max-w-6xl w-full relative">
//             {/* Image */}
//             <div className="relative flex shrink-0 w-full sm:w-48 md:w-56 h-32 sm:h-auto lg:h-auto">
//               <div className="relative w-full h-full overflow-hidden group">
//                 <Image
//                   src={currentTrip.image}
//                   alt={currentTrip.title}
//                   width={400}
//                   height={300}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   unoptimized={false}
//                 />
//               </div>

//               {/* <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
//               {currentTrip.host.match}% Match
//             </div> */}
//               <button
//                 onClick={() => toggleLike(currentTrip.id)}
//                 className={`absolute top-3 right-3 w-9 h-9 cursor-pointer flex items-center justify-center rounded-full ${
//                   liked.includes(currentTrip.id) ? "text-rose-500" : "text-white"
//                 }`}
//               >
//                 <FaHeart size={18} />
//               </button>
//             </div>

//             {/* Content */}
//             <div className="p-3 sm:p-4 flex-1">
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
//                 <div className="min-w-0">
//                   <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight mb-1 truncate">
//                     {currentTrip.title}
//                   </h2>
//                   <p className="text-gray-600 text-sm line-clamp-3 mb-1">
//                     {currentTrip.description}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-2 self-start">
//                   <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
//                     <span className="font-bold">{currentTrip.host.match}%</span>{" "}
//                     Match
//                   </span>

//                   <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
//                     <FaExclamationTriangle /> {currentTrip.spotsLeft} spots left
//                   </span>
//                 </div>
//               </div>

//               {/* Tags */}
//               <div className="flex flex-wrap gap-2 mt-2 mb-3">
//                 {currentTrip.tags.map((t) => (
//                   <span
//                     key={t}
//                     className="bg-blue-100 text-blue-500 text-xs px-2 py-0.5 rounded-md"
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>

//               <div className="flex-wrap items-center gap-3 text-sm text-gray-600">
//                 <div className="flex items-center gap-1">
//                   <span className="w-3 h-3 rounded-full bg-white border-2 border-gray-400 inline-block mr-1"></span>{" "}
//                   {currentTrip.from}
//                 </div>
//                 <Image
//                   src={dots}
//                   alt="dot"
//                   className="ml-1.5 -mt-1"
//                   width={0}
//                   height={0}
//                 />
//                 <div className="flex items-center -mt-2 -ml-1.5">
//                   <GoDotFill className="text-black text-lg w-6 h-6 mr-1" />
//                   {currentTrip.to}
//                 </div>
//               </div>

//               {/* DATE / PRICE / TRIPS COMPLETED */}
//               <div className="flex flex-col sm:flex-row sm:items-center gap-15 mt-2 text-sm text-gray-600 mb-5">
//                 <div className="flex items-center gap-2 w-full sm:w-auto">
//                   <FaCalendar className="text-gray-600" />
//                   <div className="truncate">{currentTrip.date}</div>
//                 </div>
//                 <div className="flex items-center gap-2 w-full sm:w-auto">
//                   <FaWallet />
//                   <div className="truncate">{currentTrip.price}</div>
//                 </div>

//                 <div className="flex items-center gap-2 w-full sm:w-auto">
//                   <FaFlag />
//                   <span>30 Trips Completed</span>
//                 </div>
//               </div>

//               <hr className="my-3" />

//               {/* Host + actions */}
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
//                 <div className="flex items-center gap-3 relative">
//                   {/* Avatar */}
//                   <div
//                     className={`relative w-15 h-15 -ml-2.5 flex items-center justify-center rounded-full font-semibold text-2xl border ${catStyle.avatarBg}`}
//                   >
//                     {getInitials(currentTrip.host.name)}

//                     {currentTrip.host.category !== "Travel Enthusiast" && (
//                       <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
//                         <PiMedalDuotone
//                           className={`${
//                             currentTrip.host.category === "Featured Trip Leader"
//                               ? "text-yellow-500"
//                               : "text-orange-500"
//                           }`}
//                           size={12}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {/* Right side */}
//                   <div className="flex flex-col">
//                     <p className="text-md font-semibold text-gray-900 items-center gap-1 flex">
//                       {currentTrip.host.name}, {currentTrip.host.age}
//                       {currentTrip.host.verified && (
//                         // <FaCheckCircle className="text-sky-500" />

//                         <FaCheckCircle className="inline text-green-500 ml-1 w-5 h-5" />
//                       )}
//                     </p>

//                     <p className="text-xs text-gray-600 mt-1 flex items-center">
//                       {currentTrip.host.location} •
//                       <FaStar className="text-yellow-500 w-3.5 h-3.5 ml-1 mr-1.5" />
//                       {currentTrip.host.rating}
//                     </p>

//                     <div className="flex items-center gap-2 mt-1">
//                       <span
//                         className={`flex items-center gap-1 text-xs px-1 py-0.5 rounded-md font-small ${catStyle.bg}`}
//                       >
//                         <FaUser />
//                         {currentTrip.host.category}
//                       </span>

//                       <span
//                         className={getSafeScoreStyle(currentTrip.host.safeScore)}
//                       >
//                         <FaShieldAlt /> {currentTrip.host.safeScore}% Safe
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 mb-5 flex-wrap">
//                   <button className="bg-[#1D4350] text-white text-xs px-1 py-1 cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-26">
//                     <Image
//                       src={TripImg}
//                       alt="View Trip Icon"
//                       width={10}
//                       height={10}
//                       className="mr-1 filter brightness-0 invert"
//                     />{" "}
//                     View Trip
//                   </button>
//                   <button className="bg-[#1D4350] text-white text-xs px-1 py-1 cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-26">
//                     <Image
//                       src={Join}
//                       alt="Join Trip Icon"
//                       width={20}
//                       height={20}
//                       className="mr-1 filter brightness-0 invert"
//                     />{" "}
//                     Join Trip
//                   </button>
//                   <button className="bg-[#1D4350] text-white text-xs px-1 py-1 cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-27">
//                     <Image
//                       src={Profile}
//                       alt="View Profile Icon"
//                       width={12}
//                       height={12}
//                       className="mr-1 filter brightness-0 invert"
//                     />{" "}
//                     View Profile
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Arrow */}
//           <button
//             onClick={nextCard}
//             className="absolute right-80 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
//           >
//             <FaChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }