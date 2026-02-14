// "use client";

// import { useState, useEffect } from "react";
// import { CombinedFilters } from "../types/combinedFilters";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { format } from "date-fns";

// interface CityOption {
//   mainText: string;
//   fullText: string;
//   placeId: string;
// }

// interface SearchSectionProps {
//   filters: CombinedFilters;
//   updateFilter: <K extends keyof CombinedFilters>(
//     key: K,
//     value: CombinedFilters[K],
//   ) => void;
// }

// export default function SearchSection({
//   filters,
//   updateFilter,
// }: SearchSectionProps) {
//   /* -----------------------------
//      DERIVED VALUES FROM FILTERS
//   ------------------------------ */

//   const fromCity = filters.fromCity || "";
//   const toCity = filters.toCity || "";
//   const selectedDate = filters.startDateFrom
//     ? new Date(filters.startDateFrom)
//     : undefined;

//   /* -----------------------------
//      LOCAL UI STATE ONLY
//   ------------------------------ */

//   const [adults, setAdults] = useState(2);
//   const [children, setChildren] = useState(0);

//   const [fromSuggestions, setFromSuggestions] = useState<CityOption[]>([]);
//   const [toSuggestions, setToSuggestions] = useState<CityOption[]>([]);

//   const [showFromDropdown, setShowFromDropdown] = useState(false);
//   const [showToDropdown, setShowToDropdown] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);

//   /* -----------------------------
//      POPULAR CITIES
//   ------------------------------ */

//   const popularCities: CityOption[] = [
//     { mainText: "Delhi", fullText: "Delhi, India", placeId: "delhi_1" },
//     { mainText: "Mumbai", fullText: "Mumbai, India", placeId: "mumbai_2" },
//     {
//       mainText: "Bangalore",
//       fullText: "Bangalore, India",
//       placeId: "bangalore_3",
//     },
//     {
//       mainText: "Hyderabad",
//       fullText: "Hyderabad, India",
//       placeId: "hyderabad_4",
//     },
//     { mainText: "Chennai", fullText: "Chennai, India", placeId: "chennai_5" },
//     { mainText: "Goa", fullText: "Goa, India", placeId: "goa_6" },
//   ];

//   /* -----------------------------
//      FETCH SUGGESTIONS
//   ------------------------------ */

//   const fetchSuggestions = async (value: string, type: "from" | "to") => {
//     try {
//       const res = await fetch(`/api/location?input=${value}`);
//       const data = await res.json();

//       if (!data?.predictions) return;

//       const cities: CityOption[] = data.predictions.map((item: any) => ({
//         mainText: item.structured_formatting.main_text,
//         fullText: item.description,
//         placeId: item.place_id,
//       }));

//       if (type === "from") setFromSuggestions(cities);
//       else setToSuggestions(cities);
//     } catch {
//       if (type === "from") setFromSuggestions([]);
//       else setToSuggestions([]);
//     }
//   };

//   /* -----------------------------
//      AUTOCOMPLETE DEBOUNCE
//   ------------------------------ */

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (fromCity.length > 2) {
//         fetchSuggestions(fromCity, "from");
//       } else {
//         setFromSuggestions([]);
//       }
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [fromCity]);

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (toCity.length > 2) {
//         fetchSuggestions(toCity, "to");
//       } else {
//         setToSuggestions([]);
//       }
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [toCity]);

//   /* -----------------------------
//      OUTSIDE CLICK HANDLER
//   ------------------------------ */

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;

//       if (!target.closest("#fromWrapper")) setShowFromDropdown(false);
//       if (!target.closest("#toWrapper")) setShowToDropdown(false);
//       if (!target.closest("#dateWrapper")) setShowCalendar(false);
//       if (!target.closest("#roomsWrapper")) setShowRoomsDropdown(false);
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* -----------------------------
//      HELPERS
//   ------------------------------ */

//   const formatDate = (date: Date | undefined): string =>
//     date ? format(date, "EEE, d MMM yyyy") : "Select date";

//   const getGuestsText = (): string => {
//     const parts: string[] = [];
//     if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
//     if (children > 0)
//       parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
//     return parts.length ? parts.join(", ") : "Select guests";
//   };

//   /* -----------------------------
//      RENDER
//   ------------------------------ */

//   return (
//     <div className="w-full bg-gradient-to-br from-[#245766] via-[#2d6878] to-[#3a7a8a] py-4 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Floating Card/Box */}
//         <div className="backdrop-blur-sm rounded-lg shadow-xl p-3 border border-[#4a9eff]/20">
//           <div className="hidden lg:flex items-center gap-4">
//             {/* FROM */}
//             <div id="fromWrapper" className="flex-1 relative">
//               <label className="block text-[#4a9eff] text-xs mb-1 uppercase">
//                 Starting From
//               </label>
//               <input
//                 value={fromCity}
//                 onFocus={() => {
//                   setFromSuggestions(popularCities);
//                   setShowFromDropdown(true);
//                 }}
//                 onChange={(e) =>
//                   updateFilter("fromCity", e.target.value || undefined)
//                 }
//                 className="w-full bg-transparent text-white outline-none"
//                 placeholder="City"
//               />

//               {showFromDropdown && (
//                 <div className="absolute top-full mt-2 left-0 right-0 bg-white shadow-xl rounded-md max-h-60 overflow-y-auto z-50">
//                   {fromSuggestions.map((item) => (
//                     <div
//                       key={item.placeId}
//                       onMouseDown={() => {
//                         updateFilter("fromCity", item.mainText);
//                         setShowFromDropdown(false);
//                       }}
//                       className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
//                     >
//                       <div className="font-medium text-gray-800">
//                         {item.mainText}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {item.fullText}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="h-12 w-px bg-gray-600/50" />

//             {/* TO */}
//             <div id="toWrapper" className="flex-1 relative">
//               <label className="block text-[#4a9eff] text-xs mb-1 uppercase">
//                 Going To
//               </label>
//               <input
//                 value={toCity}
//                 onFocus={() => {
//                   setToSuggestions(popularCities);
//                   setShowToDropdown(true);
//                 }}
//                 onChange={(e) =>
//                   updateFilter("toCity", e.target.value || undefined)
//                 }
//                 className="w-full bg-transparent text-white outline-none"
//                 placeholder="Destination"
//               />

//               {showToDropdown && (
//                 <div className="absolute top-full mt-2 left-0 right-0 bg-white shadow-xl rounded-md max-h-60 overflow-y-auto z-50">
//                   {toSuggestions.map((item) => (
//                     <div
//                       key={item.placeId}
//                       onMouseDown={() => {
//                         updateFilter("toCity", item.mainText);
//                         setShowToDropdown(false);
//                       }}
//                       className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
//                     >
//                       <div className="font-medium text-gray-800">
//                         {item.mainText}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {item.fullText}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="h-12 w-px bg-gray-600/50" />

//             {/* DATE */}
//             <div id="dateWrapper" className="flex-1 relative">
//               <label className="block text-[#4a9eff] text-xs mb-1 uppercase">
//                 Starting Date
//               </label>

//               <div
//                 onClick={() => setShowCalendar((prev) => !prev)}
//                 className="cursor-pointer text-white"
//               >
//                 {formatDate(selectedDate)}
//               </div>

//               {showCalendar && (
//                 <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white shadow-2xl border z-50 p-3 w-[680px] rounded-lg">
//                   <DayPicker
//                     mode="single"
//                     selected={selectedDate}
//                     onSelect={(date) => {
//                       updateFilter(
//                         "startDateFrom",
//                         date ? date.toISOString() : undefined,
//                       );
//                       setShowCalendar(false);
//                     }}
//                     numberOfMonths={2}
//                     pagedNavigation
//                     disabled={{ before: new Date() }}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="h-12 w-px bg-gray-600/50" />

//             {/* GUESTS */}
//             <div id="roomsWrapper" className="flex-1 relative">
//               <label className="block text-[#4a9eff] text-xs mb-1 uppercase">
//                 Guests
//               </label>

//               <button
//                 onClick={() => setShowRoomsDropdown(!showRoomsDropdown)}
//                 className="text-white"
//               >
//                 {getGuestsText()}
//               </button>

//               {showRoomsDropdown && (
//                 <div className="absolute top-full mt-2 right-0 bg-white shadow-xl rounded-lg z-50 p-4 min-w-[280px]">
//                   <button
//                     onClick={() => setShowRoomsDropdown(false)}
//                     className="w-full bg-blue-500 text-white py-2 rounded"
//                   >
//                     Done
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useState, useEffect } from "react";
// import { CombinedFilters } from "../types/combinedFilters";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { format } from "date-fns";

// interface CityOption {
//   mainText: string;
//   fullText: string;
//   placeId: string;
// }

// interface SearchSectionProps {
//   filters: CombinedFilters;
//   updateFilter: <K extends keyof CombinedFilters>(
//     key: K,
//     value: CombinedFilters[K],
//   ) => void;
// }

// export default function SearchSection({
//   filters,
//   updateFilter,
// }: SearchSectionProps) {
//   /* -----------------------------
//      DERIVED VALUES FROM FILTERS
//   ------------------------------ */

//   const fromCity = filters.fromCity || "";
//   const toCity = filters.toCity || "";
//   const selectedDate = filters.startDateFrom
//     ? new Date(filters.startDateFrom)
//     : undefined;

//   /* -----------------------------
//      LOCAL UI STATE ONLY
//   ------------------------------ */

//   const [adults, setAdults] = useState(2);
//   const [children, setChildren] = useState(0);

//   const [fromSuggestions, setFromSuggestions] = useState<CityOption[]>([]);
//   const [toSuggestions, setToSuggestions] = useState<CityOption[]>([]);

//   const [showFromDropdown, setShowFromDropdown] = useState(false);
//   const [showToDropdown, setShowToDropdown] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);

//   /* -----------------------------
//      POPULAR CITIES
//   ------------------------------ */

//   const popularCities: CityOption[] = [
//     { mainText: "Delhi", fullText: "Delhi, India", placeId: "delhi_1" },
//     { mainText: "Mumbai", fullText: "Mumbai, India", placeId: "mumbai_2" },
//     {
//       mainText: "Bangalore",
//       fullText: "Bangalore, India",
//       placeId: "bangalore_3",
//     },
//     {
//       mainText: "Hyderabad",
//       fullText: "Hyderabad, India",
//       placeId: "hyderabad_4",
//     },
//     { mainText: "Chennai", fullText: "Chennai, India", placeId: "chennai_5" },
//     { mainText: "Goa", fullText: "Goa, India", placeId: "goa_6" },
//   ];

//   /* -----------------------------
//      FETCH SUGGESTIONS
//   ------------------------------ */

//   const fetchSuggestions = async (value: string, type: "from" | "to") => {
//     try {
//       const res = await fetch(`/api/location?input=${value}`);
//       const data = await res.json();

//       if (!data?.predictions) return;

//       const cities: CityOption[] = data.predictions.map((item: any) => ({
//         mainText: item.structured_formatting.main_text,
//         fullText: item.description,
//         placeId: item.place_id,
//       }));

//       if (type === "from") setFromSuggestions(cities);
//       else setToSuggestions(cities);
//     } catch {
//       if (type === "from") setFromSuggestions([]);
//       else setToSuggestions([]);
//     }
//   };

//   /* -----------------------------
//      AUTOCOMPLETE DEBOUNCE
//   ------------------------------ */

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (fromCity.length > 2) {
//         fetchSuggestions(fromCity, "from");
//       } else {
//         setFromSuggestions([]);
//       }
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [fromCity]);

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (toCity.length > 2) {
//         fetchSuggestions(toCity, "to");
//       } else {
//         setToSuggestions([]);
//       }
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [toCity]);

//   /* -----------------------------
//      OUTSIDE CLICK HANDLER
//   ------------------------------ */

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;

//       if (!target.closest("#fromWrapper")) setShowFromDropdown(false);
//       if (!target.closest("#toWrapper")) setShowToDropdown(false);
//       if (!target.closest("#dateWrapper")) setShowCalendar(false);
//       if (!target.closest("#roomsWrapper")) setShowRoomsDropdown(false);
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* -----------------------------
//      HELPERS
//   ------------------------------ */

//   const formatDate = (date: Date | undefined): string =>
//     date ? format(date, "EEE, d MMM yyyy") : "Select date";

//   const getGuestsText = (): string => {
//     const parts: string[] = [];
//     if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
//     if (children > 0)
//       parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
//     return parts.length ? parts.join(", ") : "Select guests";
//   };

//   /* -----------------------------
//      RENDER
//   ------------------------------ */

//   return (
//     <div className="w-full bg-gradient-to-br from-[#245766] via-[#2d6878] to-[#3a7a8a] py-8 px-4 relative overflow-hidden">
//       {/* Background decorative elements - LOWEST Z-INDEX */}
//       <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
//       </div>

//       <div
//         className="max-w-7xl mx-auto relative overflow-visible"
//         style={{ zIndex: 10 }}
//       >
//         {/* Floating Cards Container */}
//         <div className="grid grid-cols-5 gap-4 relative" style={{ zIndex: 20 }}>
//           {/* 🏠 FROM - Floating Card */}
//           <div
//             id="fromWrapper"
//             className="group relative bg-[#1e4a57]/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-[#4a9eff]/30 hover:border-[#4a9eff]/60 transition-all duration-300 hover:shadow-[#4a9eff]/20 hover:shadow-2xl hover:-translate-y-1"
//             // style={{ zIndex: 9999 }}
//           >
//             {/* Glass reflection effect */}
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

//             <label className="block text-[#a0d8ff] text-xs mb-2 uppercase tracking-wider font-semibold flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full animate-pulse"></span>
//               Starting From
//             </label>

//             <div className="relative">
//               <input
//                 value={fromCity}
//                 onFocus={() => {
//                   setFromSuggestions(popularCities);
//                   setShowFromDropdown(true);
//                 }}
//                 onChange={(e) =>
//                   updateFilter("fromCity", e.target.value || undefined)
//                 }
//                 className="w-full bg-transparent text-white font-medium text-lg outline-none placeholder:text-white/50 border-b border-transparent focus:border-[#4a9eff]/50 transition-colors pb-1"
//                 placeholder="City"
//               />
//               <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#4a9eff] to-[#8ecaff] transition-all duration-300"></div>
//             </div>

//             {/* Decorative icon */}
//             <div className="absolute top-3 right-3 text-[#4a9eff]/30 group-hover:text-[#4a9eff]/50 transition-colors">
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             </div>

//             {showFromDropdown && (
//               <div
//                 className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl max-h-64 overflow-y-auto border border-gray-100"
//                 style={{ zIndex: 99999 }}
//               >
//                 {fromSuggestions.map((item) => (
//                   <div
//                     key={item.placeId}
//                     onMouseDown={() => {
//                       updateFilter("fromCity", item.mainText);
//                       setShowFromDropdown(false);
//                     }}
//                     className="px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-0"
//                   >
//                     <div className="font-medium text-gray-800 flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
//                       {item.mainText}
//                     </div>
//                     <div className="text-xs text-gray-500 mt-0.5 ml-3.5">
//                       {item.fullText}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* 🎯 TO - Floating Card */}
//           <div
//             id="toWrapper"
//             className="group relative bg-[#1e4a57]/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-[#4a9eff]/30 hover:border-[#4a9eff]/60 transition-all duration-300 hover:shadow-[#4a9eff]/20 hover:shadow-2xl hover:-translate-y-1"
//             style={{ zIndex: showToDropdown ? 9999 : 30 }}
//           >
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

//             <label className="block text-[#a0d8ff] text-xs mb-2 uppercase tracking-wider font-semibold flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full animate-pulse"></span>
//               Going To
//             </label>

//             <div className="relative">
//               <input
//                 value={toCity}
//                 onFocus={() => {
//                   setToSuggestions(popularCities);
//                   setShowToDropdown(true);
//                 }}
//                 onChange={(e) =>
//                   updateFilter("toCity", e.target.value || undefined)
//                 }
//                 className="w-full bg-transparent text-white font-medium text-lg outline-none placeholder:text-white/50 border-b border-transparent focus:border-[#4a9eff]/50 transition-colors pb-1"
//                 placeholder="Destination"
//               />
//               <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#4a9eff] to-[#8ecaff] transition-all duration-300"></div>
//             </div>

//             <div className="absolute top-3 right-3 text-[#4a9eff]/30 group-hover:text-[#4a9eff]/50 transition-colors">
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             </div>

//             {showToDropdown && (
//               <div
//                 className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl max-h-64 overflow-y-auto border border-gray-100"
//                 style={{ zIndex: 99999 }}
//               >
//                 {toSuggestions.map((item) => (
//                   <div
//                     key={item.placeId}
//                     onMouseDown={() => {
//                       updateFilter("toCity", item.mainText);
//                       setShowToDropdown(false);
//                     }}
//                     className="px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-0"
//                   >
//                     <div className="font-medium text-gray-800 flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
//                       {item.mainText}
//                     </div>
//                     <div className="text-xs text-gray-500 mt-0.5 ml-3.5">
//                       {item.fullText}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* 📅 DATE - Floating Card */}
//           <div
//             id="dateWrapper"
//             className="group relative bg-[#1e4a57]/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-[#4a9eff]/30 hover:border-[#4a9eff]/60 transition-all duration-300 hover:shadow-[#4a9eff]/20 hover:shadow-2xl hover:-translate-y-1"
//             style={{ zIndex: showCalendar ? 9999 : 30 }}
//           >
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

//             <label className="block text-[#a0d8ff] text-xs mb-2 uppercase tracking-wider font-semibold flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full animate-pulse"></span>
//               Starting Date
//             </label>

//             <button
//               onClick={() => setShowCalendar((prev) => !prev)}
//               className="w-full text-left text-white font-medium text-lg outline-none hover:text-white/90 transition-colors flex items-center gap-2 group"
//             >
//               <span>{formatDate(selectedDate)}</span>
//               <svg
//                 className="w-4 h-4 text-[#4a9eff]/70 group-hover:text-[#4a9eff] transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                 />
//               </svg>
//             </button>

//             <div className="absolute top-3 right-3 text-[#4a9eff]/30 group-hover:text-[#4a9eff]/50 transition-colors">
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                 />
//               </svg>
//             </div>

//             {showCalendar && (
//               <div
//                 className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100 p-4 w-[680px] rounded-2xl"
//                 style={{ zIndex: 99999 }}
//               >
//                 <DayPicker
//                   mode="single"
//                   selected={selectedDate}
//                   onSelect={(date) => {
//                     updateFilter(
//                       "startDateFrom",
//                       date ? date.toISOString() : undefined,
//                     );
//                     setShowCalendar(false);
//                   }}
//                   numberOfMonths={2}
//                   pagedNavigation
//                   disabled={{ before: new Date() }}
//                   className="text-xs"
//                   classNames={{
//                     months: "flex gap-4",
//                     month: "space-y-3",
//                     caption: "flex justify-between items-center mb-2 px-2",
//                     caption_label: "text-sm font-semibold text-gray-700",
//                     nav_button:
//                       "h-7 w-7 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors",
//                     head_row: "flex",
//                     head_cell: "w-10 text-xs font-medium text-gray-500",
//                     row: "flex w-full mt-1",
//                     cell: "w-10 h-10 text-center p-0",
//                     day: "h-9 w-9 rounded-full hover:bg-blue-100 text-sm transition-colors",
//                     day_selected: "bg-blue-500 text-white hover:bg-blue-600",
//                     day_today: "font-bold text-blue-500",
//                     day_disabled: "text-gray-300",
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* 👥 GUESTS - Floating Card */}
//           <div
//             id="roomsWrapper"
//             className="group relative bg-[#1e4a57]/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-[#4a9eff]/30 hover:border-[#4a9eff]/60 transition-all duration-300 hover:shadow-[#4a9eff]/20 hover:shadow-2xl hover:-translate-y-1"
//             style={{ zIndex: showRoomsDropdown ? 9999 : 30 }}
//           >
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

//             <label className="block text-[#a0d8ff] text-xs mb-2 uppercase tracking-wider font-semibold flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full animate-pulse"></span>
//               Guests
//             </label>

//             <button
//               onClick={() => setShowRoomsDropdown(!showRoomsDropdown)}
//               className="w-full text-left text-white font-medium text-lg outline-none hover:text-white/90 transition-colors flex items-center gap-2 group"
//             >
//               <span>{getGuestsText()}</span>
//               <svg
//                 className="w-4 h-4 text-[#4a9eff]/70 group-hover:text-[#4a9eff] transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//             </button>

//             <div className="absolute top-3 right-3 text-[#4a9eff]/30 group-hover:text-[#4a9eff]/50 transition-colors">
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                 />
//               </svg>
//             </div>

//             {showRoomsDropdown && (
//               <div
//                 className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-6 min-w-[320px] border border-gray-100"
//                 style={{ zIndex: 99999 }}
//               >
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="font-semibold text-gray-800">Adults</div>
//                       <div className="text-xs text-gray-500">Age 13+</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <button
//                         onClick={() => setAdults(Math.max(1, adults - 1))}
//                         className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-500"
//                       >
//                         -
//                       </button>
//                       <span className="w-6 text-center font-semibold text-gray-800">
//                         {adults}
//                       </span>
//                       <button
//                         onClick={() => setAdults(Math.min(10, adults + 1))}
//                         className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-500"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="font-semibold text-gray-800">
//                         Children
//                       </div>
//                       <div className="text-xs text-gray-500">Age 2-12</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <button
//                         onClick={() => setChildren(Math.max(0, children - 1))}
//                         className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-500"
//                       >
//                         -
//                       </button>
//                       <span className="w-6 text-center font-semibold text-gray-800">
//                         {children}
//                       </span>
//                       <button
//                         onClick={() => setChildren(Math.min(10, children + 1))}
//                         className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-500"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => {
//                       setShowRoomsDropdown(false);
//                     }}
//                     className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
//                   >
//                     Done
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* 🔍 SEARCH - Floating Card */}
//           <div
//             className="group relative bg-gradient-to-br from-[#4a9eff] to-[#6baeff] rounded-2xl shadow-2xl p-5 border border-white/30 hover:shadow-[#4a9eff]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center"
//             style={{ zIndex: 20 }}
//           >
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

//             <div className="relative z-10 flex flex-col items-center justify-center">
//               <label className="block text-white/80 text-xs mb-2 uppercase tracking-wider font-semibold">
//                 Ready to Go?
//               </label>

//               <button className="text-white font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all">
//                 Search
//                 <svg
//                   className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2.5}
//                     d="M14 5l7 7m0 0l-7 7m7-7H3"
//                   />
//                 </svg>
//               </button>

//               <div className="absolute -top-1 -right-1">
//                 <span className="relative flex h-3 w-3">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
//                 </span>
//               </div>
//             </div>

//             <div className="absolute bottom-2 left-0 right-0 text-center">
//               <div className="text-[10px] text-white/60 uppercase tracking-wider">
//                 Find your match
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { useState, useEffect } from "react";
import { CombinedFilters } from "../types/combinedFilters";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface CityOption {
  mainText: string;
  fullText: string;
  placeId: string;
}

interface SearchSectionProps {
  filters: CombinedFilters;
  updateFilter: <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K],
  ) => void;
}

export default function SearchSection({
  filters,
  updateFilter,
}: SearchSectionProps) {
  /* -----------------------------
     DERIVED VALUES FROM FILTERS
  ------------------------------ */
interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text?: string;
  };
}

  const fromCity = filters.fromCity || "";
  const toCity = filters.toCity || "";
  const selectedDate = filters.startDateFrom
    ? new Date(filters.startDateFrom)
    : undefined;

  /* -----------------------------
     LOCAL UI STATE ONLY
  ------------------------------ */

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [fromSuggestions, setFromSuggestions] = useState<CityOption[]>([]);
  const [toSuggestions, setToSuggestions] = useState<CityOption[]>([]);

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);

  /* -----------------------------
     TRACK WHICH DROPDOWN IS ACTIVE
  ------------------------------ */
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  /* -----------------------------
     POPULAR CITIES
  ------------------------------ */

  const popularCities: CityOption[] = [
    { mainText: "Delhi", fullText: "Delhi, India", placeId: "delhi_1" },
    { mainText: "Mumbai", fullText: "Mumbai, India", placeId: "mumbai_2" },
    {
      mainText: "Bangalore",
      fullText: "Bangalore, India",
      placeId: "bangalore_3",
    },
    {
      mainText: "Hyderabad",
      fullText: "Hyderabad, India",
      placeId: "hyderabad_4",
    },
    { mainText: "Chennai", fullText: "Chennai, India", placeId: "chennai_5" },
    { mainText: "Goa", fullText: "Goa, India", placeId: "goa_6" },
  ];

  /* -----------------------------
     FETCH SUGGESTIONS
  ------------------------------ */

  const fetchSuggestions = async (value: string, type: "from" | "to") => {
    try {
      const res = await fetch(`/api/location?input=${value}`);
      const data = await res.json();

      if (!data?.predictions) return;

      const cities: CityOption[] = data.predictions.map((item: PlacePrediction) => ({
        mainText: item.structured_formatting.main_text,
        fullText: item.description,
        placeId: item.place_id,
      }));

      if (type === "from") setFromSuggestions(cities);
      else setToSuggestions(cities);
    } catch {
      if (type === "from") setFromSuggestions([]);
      else setToSuggestions([]);
    }
  };

  /* -----------------------------
     AUTOCOMPLETE DEBOUNCE
  ------------------------------ */

  useEffect(() => {
    const delay = setTimeout(() => {
      if (fromCity.length > 2) {
        fetchSuggestions(fromCity, "from");
      } else {
        setFromSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [fromCity]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (toCity.length > 2) {
        fetchSuggestions(toCity, "to");
      } else {
        setToSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [toCity]);

  /* -----------------------------
     OUTSIDE CLICK HANDLER
  ------------------------------ */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("#fromWrapper")) {
        setShowFromDropdown(false);
        if (activeDropdown === 'from') setActiveDropdown(null);
      }
      if (!target.closest("#toWrapper")) {
        setShowToDropdown(false);
        if (activeDropdown === 'to') setActiveDropdown(null);
      }
      if (!target.closest("#dateWrapper")) {
        setShowCalendar(false);
        if (activeDropdown === 'date') setActiveDropdown(null);
      }
      if (!target.closest("#roomsWrapper")) {
        setShowRoomsDropdown(false);
        if (activeDropdown === 'rooms') setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  /* -----------------------------
     HANDLE DROPDOWN OPEN
  ------------------------------ */
  const handleFromFocus = () => {
    setFromSuggestions(popularCities);
    setShowFromDropdown(true);
    setActiveDropdown('from');
  };

  const handleToFocus = () => {
    setToSuggestions(popularCities);
    setShowToDropdown(true);
    setActiveDropdown('to');
  };

  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
    setActiveDropdown(showCalendar ? null : 'date');
  };

  const handleRoomsClick = () => {
    setShowRoomsDropdown(!showRoomsDropdown);
    setActiveDropdown(showRoomsDropdown ? null : 'rooms');
  };

  /* -----------------------------
     HELPERS
  ------------------------------ */

  const formatDate = (date: Date | undefined): string =>
    date ? format(date, "EEE, d MMM yyyy") : "Select date";

  const getGuestsText = (): string => {
    const parts: string[] = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
    return parts.length ? parts.join(", ") : "Select guests";
  };

  /* -----------------------------
     RENDER
  ------------------------------ */

 return (
    <div className="w-full bg-gradient-to-br from-[#245766] via-[#2d6878] to-[#3a7a8a] py-8 px-4 relative overflow-visible">
      {/* Background decorative elements - LOWEST Z-INDEX */}
      {/* <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div> */}

      <div
        className="max-w-7xl mx-auto relative overflow-visible"
        style={{ zIndex: 10 }}
      >
        {/* Floating Cards Container */}
        <div className="grid grid-cols-5 gap-4 relative overflow-visible">
          
          {/* 🏠 FROM - Floating Card - REDUCED HEIGHT */}
          <div
            id="fromWrapper"
            className={`group relative bg-[#1e4a57]/90 backdrop-blur-md rounded-2xl shadow-2xl px-4 pt-3 pb-2 border border-[#4a9eff]/30 hover:border-[#4a9eff]/60 transition-all duration-300 hover:shadow-[#4a9eff]/20 hover:shadow-2xl hover:-translate-y-1 ${
              activeDropdown === 'from' ? 'z-[100]' : 'z-[1]'
            }`}
          >
            {/* Glass reflection effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

            <label className="block text-[#a0d8ff] text-xs mb-0.5 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full animate-pulse"></span>
              Starting From
            </label>

            <div className="relative">
              <input
                value={fromCity}
                onFocus={handleFromFocus}
                onChange={(e) =>
                  updateFilter("fromCity", e.target.value || undefined)
                }
                className="w-full bg-transparent text-white font-medium text-base outline-none placeholder:text-white border-b border-transparent focus:border-[#4a9eff]/50 transition-colors pb-0.5"
                placeholder="City"
              />
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#4a9eff] to-[#8ecaff] transition-all duration-300"></div>
            </div>

            {/* Decorative icon - SMALLER */}
            <div className="absolute top-2 right-2 text-[#4a9eff]/30 group-hover:text-[#4a9eff]/50 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {showFromDropdown && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl max-h-64 overflow-y-auto border border-gray-100"
                style={{ zIndex: 99999 }}
              >
                {fromSuggestions.map((item) => (
                  <div
                    key={item.placeId}
                    onMouseDown={() => {
                      updateFilter("fromCity", item.mainText);
                      setShowFromDropdown(false);
                      setActiveDropdown(null);
                    }}
                    className="px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-0"
                  >
                    <div className="font-medium text-gray-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {item.mainText}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 ml-3.5">
                      {item.fullText}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🎯 TO - Floating Card - REDUCED HEIGHT */}
          <div
            id="toWrapper"
            className={`group relative bg-[#1e4a57]/90 backdrop-blur-md rounded-2xl shadow-2xl px-4 pt-3 pb-2 border border-[#4a9eff]/30 hover:border-[#4a9eff]/60 transition-all duration-300 hover:shadow-[#4a9eff]/20 hover:shadow-2xl hover:-translate-y-1 ${
              activeDropdown === 'to' ? 'z-[100]' : 'z-[1]'
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

            <label className="block text-[#a0d8ff] text-xs mb-0.5 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full animate-pulse"></span>
              Going To
            </label>

            <div className="relative">
              <input
                value={toCity}
                onFocus={handleToFocus}
                onChange={(e) =>
                  updateFilter("toCity", e.target.value || undefined)
                }
                className="w-full bg-transparent text-white font-medium text-base outline-none placeholder:text-white/50 border-b border-transparent focus:border-[#4a9eff]/50 transition-colors pb-0.5"
                placeholder="Destination"
              />
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#4a9eff] to-[#8ecaff] transition-all duration-300"></div>
            </div>

            <div className="absolute top-2 right-2 text-[#4a9eff]/30 group-hover:text-[#4a9eff]/50 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {showToDropdown && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl max-h-64 overflow-y-auto border border-gray-100"
                style={{ zIndex: 99999 }}
              >
                {toSuggestions.map((item) => (
                  <div
                    key={item.placeId}
                    onMouseDown={() => {
                      updateFilter("toCity", item.mainText);
                      setShowToDropdown(false);
                      setActiveDropdown(null);
                    }}
                    className="px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-0"
                  >
                    <div className="font-medium text-gray-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {item.mainText}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 ml-3.5">
                      {item.fullText}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 📅 DATE - Floating Card - REDUCED HEIGHT */}
          <div
            id="dateWrapper"
            className={`group relative bg-[#1e4a57]/90 backdrop-blur-md rounded-2xl shadow-2xl px-4 pt-3 pb-2 border border-[#4a9eff]/30 hover:border-[#4a9eff]/60 transition-all duration-300 hover:shadow-[#4a9eff]/20 hover:shadow-2xl hover:-translate-y-1 ${
              activeDropdown === 'date' ? 'z-[100]' : 'z-[1]'
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

            <label className="block text-[#a0d8ff] text-xs mb-0.5 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full animate-pulse"></span>
              Starting Date
            </label>

            <button
              onClick={handleDateClick}
              className="w-full text-left text-white font-medium text-base outline-none hover:text-white/90 transition-colors flex items-center gap-2 group"
            >
              <span>{formatDate(selectedDate)}</span>
              <svg
                className="w-4 h-4 text-[#4a9eff]/70 group-hover:text-[#4a9eff] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>

            <div className="absolute top-2 right-2 text-[#4a9eff]/30 group-hover:text-[#4a9eff]/50 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {showCalendar && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100 p-4 w-[680px] rounded-2xl"
                style={{ zIndex: 99999 }}
              >
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    updateFilter(
                      "startDateFrom",
                      date ? date.toISOString() : undefined,
                    );
                    setShowCalendar(false);
                    setActiveDropdown(null);
                  }}
                  numberOfMonths={2}
                  pagedNavigation
                  disabled={{ before: new Date() }}
                  className="text-xs"
                  classNames={{
                    months: "flex gap-4",
                    month: "space-y-3",
                    caption: "flex justify-between items-center mb-2 px-2",
                    caption_label: "text-sm font-semibold text-gray-700",
                    nav_button:
                      "h-7 w-7 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors",
                    head_row: "flex",
                    head_cell: "w-10 text-xs font-medium text-gray-500",
                    row: "flex w-full mt-1",
                    cell: "w-10 h-10 text-center p-0",
                    day: "h-9 w-9 rounded-full hover:bg-blue-100 text-sm transition-colors",
                    day_selected: "bg-blue-500 text-white hover:bg-blue-600",
                    day_today: "font-bold text-blue-500",
                    day_disabled: "text-gray-300",
                  }}
                />
              </div>
            )}
          </div>

          {/* 👥 GUESTS - Floating Card - REDUCED HEIGHT */}
          <div
            id="roomsWrapper"
            className={`group relative bg-[#1e4a57]/90 backdrop-blur-md rounded-2xl shadow-2xl px-4 pt-3 pb-2 border border-[#4a9eff]/30 hover:border-[#4a9eff]/60 transition-all duration-300 hover:shadow-[#4a9eff]/20 hover:shadow-2xl hover:-translate-y-1 ${
              activeDropdown === 'rooms' ? 'z-[100]' : 'z-[1]'
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

            <label className="block text-[#a0d8ff] text-xs mb-0.5 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full animate-pulse"></span>
              Guests
            </label>

            <button
              onClick={handleRoomsClick}
              className="w-full text-left text-white font-medium text-base outline-none hover:text-white/90 transition-colors flex items-center gap-2 group"
            >
              <span>{getGuestsText()}</span>
              <svg
                className="w-4 h-4 text-[#4a9eff]/70 group-hover:text-[#4a9eff] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <div className="absolute top-2 right-2 text-[#4a9eff]/30 group-hover:text-[#4a9eff]/50 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>

            {showRoomsDropdown && (
              <div
                className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-6 min-w-[320px] border border-gray-100"
                style={{ zIndex: 99999 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">Adults</div>
                      <div className="text-xs text-gray-500">Age 13+</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-500"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-800">
                        {adults}
                      </span>
                      <button
                        onClick={() => setAdults(Math.min(10, adults + 1))}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-500"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">
                        Children
                      </div>
                      <div className="text-xs text-gray-500">Age 2-12</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-500"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-800">
                        {children}
                      </span>
                      <button
                        onClick={() => setChildren(Math.min(10, children + 1))}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-600 hover:text-blue-500"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowRoomsDropdown(false);
                      setActiveDropdown(null);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 🔍 SEARCH - Floating Card - REDUCED HEIGHT */}
          <div
            className="group relative bg-gradient-to-br from-[#4a9eff] to-[#6baeff] rounded-2xl shadow-2xl px-4 pt-3 pb-2 border border-white/30 hover:shadow-[#4a9eff]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center"
            style={{ zIndex: 1 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              <label className="block text-white/80 text-[10px] mb-1 uppercase tracking-wider font-semibold">
                Ready to Go?
              </label>

              <button className="text-white font-bold text-base flex items-center gap-2 group-hover:gap-3 transition-all">
                Search
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>

              <div className="absolute -top-1 -right-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
              </div>
            </div>

            <div className="absolute bottom-1 left-0 right-0 text-center">
              <div className="text-[8px] text-white/60 uppercase tracking-wider">
                Find your match
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}