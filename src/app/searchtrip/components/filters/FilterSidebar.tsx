// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Filter,
//   Search,
//   MapPin,
//   Calendar,
//   Users,
//   Globe,
//   X,
// } from "lucide-react";
// import { CombinedFilters } from "../../types/combinedFilters";
// import { FaIndianRupeeSign } from "react-icons/fa6";

// /* ===== STATIC OPTIONS ===== */
// const TRIP_STYLES = ["adventure", "leisure", "spiritual", "wildlife"];
// const CREATOR_TYPES = ["AGENCY", "TRIP_LEADER", "USER"];
// const LANGUAGES = ["English", "Hindi", "Odia"];
// const GENDERS = ["ANY", "MALE_ONLY", "FEMALE_ONLY"];
// const FROM_CITIES = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai"];
// const TO_CITIES = ["Goa", "Jaipur", "Manali", "Kochi", "Udaipur"];

// interface FilterSidebarProps {
//   filters: CombinedFilters;
//   updateFilter: <K extends keyof CombinedFilters>(
//     key: K,
//     value: CombinedFilters[K],
//   ) => void;
// }

// const FilterSidebar: React.FC<FilterSidebarProps> = ({
//   filters,
//   updateFilter,
// }) => {
//   /* =============================== LOCAL INPUT STATE =============================== */
//   const [keyword, setKeyword] = useState(filters.keyword ?? "");
//   const [fromCity, setFromCity] = useState(filters.fromCity ?? "");
//   const [toCity, setToCity] = useState(filters.toCity ?? "");
//   const [budget, setBudget] = useState(filters.maxPrice ?? 50000);

//   /* =============================== SYNC FROM PARENT =============================== */
//   useEffect(() => setKeyword(filters.keyword ?? ""), [filters.keyword]);
//   useEffect(() => setFromCity(filters.fromCity ?? ""), [filters.fromCity]);
//   useEffect(() => setToCity(filters.toCity ?? ""), [filters.toCity]);

//   /* =============================== DEBOUNCED UPDATES =============================== */
//   useEffect(() => {
//     if (keyword === (filters.keyword ?? "")) return;
//     const t = setTimeout(
//       () => updateFilter("keyword", keyword || undefined),
//       400,
//     );
//     return () => clearTimeout(t);
//   }, [keyword, filters.keyword, updateFilter]);

//   useEffect(() => {
//     if (fromCity === (filters.fromCity ?? "")) return;
//     const t = setTimeout(
//       () => updateFilter("fromCity", fromCity || undefined),
//       400,
//     );
//     return () => clearTimeout(t);
//   }, [fromCity, filters.fromCity, updateFilter]);

//   useEffect(() => {
//     if (toCity === (filters.toCity ?? "")) return;
//     const t = setTimeout(
//       () => updateFilter("toCity", toCity || undefined),
//       400,
//     );
//     return () => clearTimeout(t);
//   }, [toCity, filters.toCity, updateFilter]);

//   useEffect(() => {
//     if (budget === 50000) {
//       updateFilter("maxPrice", undefined);
//       return;
//     }

//     const t = setTimeout(() => {
//       updateFilter("maxPrice", budget);
//     }, 300);

//     return () => clearTimeout(t);
//   }, [budget, updateFilter]);

//   /* =============================== HELPERS =============================== */
//   type ArrayFilterKeys = "tripStyles" | "languages";

//   const toggleArrayValue = <K extends ArrayFilterKeys>(
//     key: K,
//     value: string,
//   ) => {
//     const current = (filters[key] ?? []) as string[];
//     const updated = current.includes(value)
//       ? current.filter((v) => v !== value)
//       : [...current, value];
//     updateFilter(key, updated as CombinedFilters[K]);
//   };

//   const clearAllFilters = () => {
//     setKeyword("");
//     setFromCity("");
//     setToCity("");
//     setBudget(50000);
//     updateFilter("keyword", undefined);
//     updateFilter("fromCity", undefined);
//     updateFilter("toCity", undefined);
//     updateFilter("maxPrice", 50000);
//     updateFilter("tripStyles", []);
//     updateFilter("creatorType", undefined);
//     updateFilter("genderPreference", "ANY");
//     updateFilter("languages", []);
//     updateFilter("startDateFrom", undefined);
//     updateFilter("startDateTo", undefined);
//   };

//   const clearFilter = (key: keyof CombinedFilters) => {
//     updateFilter(key, undefined as CombinedFilters[typeof key]);
//     if (key === "keyword") setKeyword("");
//     if (key === "fromCity") setFromCity("");
//     if (key === "toCity") setToCity("");
//     if (key === "maxPrice") setBudget(50000);
//   };

//   // Format budget for display
//   const formatBudget = (value: number) => {
//     if (value >= 100000) return "₹1,00,000";
//     if (value >= 1000) {
//       const thousands = Math.floor(value / 1000);
//       const remainder = value % 1000;
//       if (remainder === 0) return `₹${thousands},000`;
//       return `₹${thousands},${remainder.toString().padStart(3, "0")}`;
//     }
//     return `₹${value}`;
//   };

//   /* =============================== UI =============================== */
//   return (
//     <div className="relative bg-white shadow-lg overflow-hidden">
//       {/* Header with decorative corner circles matching the image */}
//       <div className="sticky top-0 z-10 px-6 pt-6 pb-5 bg-gradient-to-br from-[#245766] via-[#2d6878] to-[#3a7a8a] relative overflow-hidden">
//         {/* Decorative Circles */}
//         <div className="absolute -top-12 -right-12 h-[125px] w-[125px] rounded-full bg-[#e5f3ff21]" />
//         <div className="absolute -bottom-12 -left-12 h-[100px] w-[100px] rounded-full bg-[#e5f3ff21]" />

//         <div className="relative flex items-center gap-3">
//           <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
//             <Filter className="w-4 h-4 text-white" />
//           </div>
//           <h2 className="text-sm font-bold text-white tracking-tight">
//             Filters
//           </h2>
//         </div>
//       </div>

//       <div className="px-6 py-6 space-y-7">
//         {/* Keyword Search */}
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//               <Search className="w-4 h-4 text-gray-500" />
//               Search Keywords
//             </label>

//             <button
//               onClick={clearAllFilters}
//               className="text-sm font-medium text-[#1d4350] hover:underline transition cursor-pointer"
//             >
//               Clear Filters
//             </button>

//             {keyword && (
//               <button
//                 onClick={() => clearFilter("keyword")}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="Search trips..."
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
//           />
//         </div>

//         {/* From City */}
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//               <MapPin className="w-4 h-4 text-gray-500" />
//               From City
//             </label>
//             {fromCity && (
//               <button
//                 onClick={() => clearFilter("fromCity")}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="Select or type city..."
//             value={fromCity}
//             onChange={(e) => setFromCity(e.target.value)}
//             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
//           />
//           <div className="flex flex-wrap gap-2">
//             {FROM_CITIES.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setFromCity(c)}
//                 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                   fromCity === c
//                     ? "bg-[#1d4350] text-white shadow-sm"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* To City */}
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//               <MapPin className="w-4 h-4 text-gray-500" />
//               To City
//             </label>
//             {toCity && (
//               <button
//                 onClick={() => clearFilter("toCity")}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//           <input
//             type="text"
//             placeholder="Select or type city..."
//             value={toCity}
//             onChange={(e) => setToCity(e.target.value)}
//             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
//           />
//           <div className="flex flex-wrap gap-2">
//             {TO_CITIES.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setToCity(c)}
//                 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                   toCity === c
//                     ? "bg-[#1d4350] text-white shadow-sm"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Budget Slider */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//             <FaIndianRupeeSign className="w-4 h-4 text-gray-500" />
//             Budget
//           </label>

//           <input
//             type="range"
//             min={0}
//             max={100000}
//             step={1000}
//             value={budget}
//             onChange={(e) => setBudget(Number(e.target.value))}
//             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1d4350]"
//             style={{
//               background: `linear-gradient(to right, #1d4350 ${
//                 (budget / 100000) * 100
//               }%, #e5e7eb ${(budget / 100000) * 100}%)`,
//             }}
//           />

//           <div className="flex justify-between text-xs text-gray-600 font-medium">
//             <span>₹10000</span>
//             <span>{formatBudget(budget)}</span>
//           </div>
//         </div>

//         {/* Trip Styles */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//             <Globe className="w-4 h-4 text-gray-500" />
//             Trip Style
//           </label>
//           <div className="flex flex-wrap gap-2">
//             {TRIP_STYLES.map((style) => (
//               <button
//                 key={style}
//                 onClick={() => toggleArrayValue("tripStyles", style)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
//                   filters.tripStyles?.includes(style)
//                     ? "bg-[#1d4350] text-white shadow-sm"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {style}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Creator Type */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//             <Users className="w-4 h-4 text-gray-500" />
//             Creator Type
//           </label>
//           <select
//             value={filters.creatorType ?? ""}
//             onChange={(e) =>
//               updateFilter(
//                 "creatorType",
//                 e.target.value as CombinedFilters["creatorType"],
//               )
//             }
//             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm bg-white"
//           >
//             <option value="">All Creators</option>
//             {CREATOR_TYPES.map((c) => (
//               <option key={c} value={c}>
//                 {c.replace("_", " ")}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Gender Preference */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//             <Users className="w-4 h-4 text-gray-500" />
//             Gender Preference
//           </label>
//           <div className="grid grid-cols-3 gap-2">
//             {GENDERS.map((g) => (
//               <button
//                 key={g}
//                 onClick={() =>
//                   updateFilter(
//                     "genderPreference",
//                     g as CombinedFilters["genderPreference"],
//                   )
//                 }
//                 className={`py-2.5 rounded-lg text-xs font-medium transition-all ${
//                   filters.genderPreference === g
//                     ? "bg-[#1d4350] text-white shadow-sm"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {g === "ANY" ? "Any" : g.replace("_", " ")}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Languages */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//             <Globe className="w-4 h-4 text-gray-500" />
//             Languages
//           </label>
//           <div className="flex flex-wrap gap-2">
//             {LANGUAGES.map((lang) => (
//               <button
//                 key={lang}
//                 onClick={() => toggleArrayValue("languages", lang)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                   filters.languages?.includes(lang)
//                     ? "bg-[#1d4350] text-white shadow-sm"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {lang}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Date Range */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//             <Calendar className="w-4 h-4 text-gray-500" />
//             Travel Dates
//           </label>
//           <div className="space-y-3">
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">From</label>
//               <input
//                 type="date"
//                 value={filters.startDateFrom ?? ""}
//                 onChange={(e) =>
//                   updateFilter("startDateFrom", e.target.value || undefined)
//                 }
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
//               />
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">To</label>
//               <input
//                 type="date"
//                 value={filters.startDateTo ?? ""}
//                 onChange={(e) =>
//                   updateFilter("startDateTo", e.target.value || undefined)
//                 }
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;



"use client";

import React, { useState, useEffect } from "react";
import {
  Filter,
  Search,
  Calendar,
  Users,
  Globe,
  X,
} from "lucide-react";
import { CombinedFilters } from "../../types/combinedFilters";
import { FaIndianRupeeSign } from "react-icons/fa6";

/* ===== STATIC OPTIONS ===== */
const TRIP_STYLES = ["adventure", "leisure", "spiritual", "wildlife"];
const CREATOR_TYPES = ["AGENCY", "TRIP_LEADER", "USER"];
const LANGUAGES = ["English", "Hindi", "Odia"];
const GENDERS = ["ANY", "MALE_ONLY", "FEMALE_ONLY"];

interface FilterSidebarProps {
  filters: CombinedFilters;
  updateFilter: <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K],
  ) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  updateFilter,
}) => {
  /* =============================== LOCAL INPUT STATE =============================== */
  const [keyword, setKeyword] = useState(filters.keyword ?? "");
  const [budget, setBudget] = useState(filters.maxPrice ?? 50000);

  /* =============================== SYNC FROM PARENT =============================== */
  useEffect(() => setKeyword(filters.keyword ?? ""), [filters.keyword]);

  /* =============================== DEBOUNCED UPDATES =============================== */
  useEffect(() => {
    if (keyword === (filters.keyword ?? "")) return;
    const t = setTimeout(
      () => updateFilter("keyword", keyword || undefined),
      400,
    );
    return () => clearTimeout(t);
  }, [keyword, filters.keyword, updateFilter]);

  useEffect(() => {
    if (budget === 50000) {
      updateFilter("maxPrice", undefined);
      return;
    }

    const t = setTimeout(() => {
      updateFilter("maxPrice", budget);
    }, 300);

    return () => clearTimeout(t);
  }, [budget, updateFilter]);

  /* =============================== HELPERS =============================== */
  type ArrayFilterKeys = "tripStyles" | "languages";

  const toggleArrayValue = <K extends ArrayFilterKeys>(
    key: K,
    value: string,
  ) => {
    const current = (filters[key] ?? []) as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated as CombinedFilters[K]);
  };

  const clearAllFilters = () => {
    setKeyword("");
    setBudget(50000);
    updateFilter("keyword", undefined);
    updateFilter("maxPrice", 50000);
    updateFilter("tripStyles", []);
    updateFilter("creatorType", undefined);
    updateFilter("genderPreference", "ANY");
    updateFilter("languages", []);
    updateFilter("startDateFrom", undefined);
    updateFilter("startDateTo", undefined);
  };

  const clearFilter = (key: keyof CombinedFilters) => {
    updateFilter(key, undefined as CombinedFilters[typeof key]);
    if (key === "keyword") setKeyword("");
    if (key === "maxPrice") setBudget(50000);
  };

  // Format budget for display
  const formatBudget = (value: number) => {
    if (value >= 100000) return "₹1,00,000";
    if (value >= 1000) {
      const thousands = Math.floor(value / 1000);
      const remainder = value % 1000;
      if (remainder === 0) return `₹${thousands},000`;
      return `₹${thousands},${remainder.toString().padStart(3, "0")}`;
    }
    return `₹${value}`;
  };

  /* =============================== UI =============================== */
  return (
    <div className="relative bg-white shadow-lg overflow-hidden">
      {/* Header with decorative corner circles matching the image */}
      <div className="sticky top-0 z-10 px-6 pt-6 pb-5 bg-gradient-to-br from-[#245766] via-[#2d6878] to-[#3a7a8a] relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-12 -right-12 h-[125px] w-[125px] rounded-full bg-[#e5f3ff21]" />
        <div className="absolute -bottom-12 -left-12 h-[100px] w-[100px] rounded-full bg-[#e5f3ff21]" />

        <div className="relative flex items-center gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-bold text-white tracking-tight">
            Filters
          </h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-7">
        {/* Keyword Search */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Search className="w-4 h-4 text-gray-500" />
              Search Keywords
            </label>

            <button
              onClick={clearAllFilters}
              className="text-sm font-medium text-[#1d4350] hover:underline transition cursor-pointer"
            >
              Clear Filters
            </button>

            {keyword && (
              <button
                onClick={() => clearFilter("keyword")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Search trips..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
          />
        </div>

        {/* Budget Slider */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaIndianRupeeSign className="w-4 h-4 text-gray-500" />
            Budget
          </label>

          <input
            type="range"
            min={0}
            max={100000}
            step={1000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1d4350]"
            style={{
              background: `linear-gradient(to right, #1d4350 ${
                (budget / 100000) * 100
              }%, #e5e7eb ${(budget / 100000) * 100}%)`,
            }}
          />

          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span>₹10000</span>
            <span>{formatBudget(budget)}</span>
          </div>
        </div>

        {/* Trip Styles */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Globe className="w-4 h-4 text-gray-500" />
            Trip Style
          </label>
          <div className="flex flex-wrap gap-2">
            {TRIP_STYLES.map((style) => (
              <button
                key={style}
                onClick={() => toggleArrayValue("tripStyles", style)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  filters.tripStyles?.includes(style)
                    ? "bg-[#1d4350] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Creator Type */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Users className="w-4 h-4 text-gray-500" />
            Creator Type
          </label>
          <select
            value={filters.creatorType ?? ""}
            onChange={(e) =>
              updateFilter(
                "creatorType",
                e.target.value as CombinedFilters["creatorType"],
              )
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm bg-white"
          >
            <option value="">All Creators</option>
            {CREATOR_TYPES.map((c) => (
              <option key={c} value={c}>
                {c.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Preference */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Users className="w-4 h-4 text-gray-500" />
            Gender Preference
          </label>
          <div className="grid grid-cols-3 gap-2">
            {GENDERS.map((g) => (
              <button
                key={g}
                onClick={() =>
                  updateFilter(
                    "genderPreference",
                    g as CombinedFilters["genderPreference"],
                  )
                }
                className={`py-2.5 rounded-lg text-xs font-medium transition-all ${
                  filters.genderPreference === g
                    ? "bg-[#1d4350] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {g === "ANY" ? "Any" : g.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Globe className="w-4 h-4 text-gray-500" />
            Languages
          </label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleArrayValue("languages", lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.languages?.includes(lang)
                    ? "bg-[#1d4350] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 text-gray-500" />
            Travel Dates
          </label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">From</label>
              <input
                type="date"
                value={filters.startDateFrom ?? ""}
                onChange={(e) =>
                  updateFilter("startDateFrom", e.target.value || undefined)
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">To</label>
              <input
                type="date"
                value={filters.startDateTo ?? ""}
                onChange={(e) =>
                  updateFilter("startDateTo", e.target.value || undefined)
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;