// "use client";

// import React, { useState } from "react";
// import { Filter, X } from "lucide-react";
// import { CombinedFilters } from "../../types/combinedFilters";

// /* =========================
//    STATIC FILTER OPTIONS
//    (API DRIVEN – NOT UI DATA)
// ========================= */

// const TRIP_STYLES = ["adventure", "leisure", "spiritual", "wildlife"];
// const CREATOR_TYPES = [
//   "AGENCY",
//   "HOST",
//   "GUIDE",
//   "TRIP_LEADER",
//   "INDIVIDUAL",
// ];
// const TRAVEL_MODES = ["SOLO", "GROUP", "COUPLE"];
// const LANGUAGES = ["English", "Hindi", "Odia"];
// const GENDERS = ["ANY", "MALE_ONLY", "FEMALE_ONLY"];

// interface FilterSidebarProps {
//   filters: CombinedFilters;
//   updateFilter: <K extends keyof CombinedFilters>(
//     key: K,
//     value: CombinedFilters[K]
//   ) => void;
//   resetFilters: () => void;
// }

// const FilterSidebar: React.FC<FilterSidebarProps> = ({
//   filters,
//   updateFilter,
//   resetFilters,
// }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [tempFilters, setTempFilters] = useState<CombinedFilters>(filters);

//   const handleTempUpdate = <K extends keyof CombinedFilters>(
//     key: K,
//     value: CombinedFilters[K]
//   ) => {
//     setTempFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const applyFilters = () => {
//     Object.entries(tempFilters).forEach(([key, value]) => {
//       updateFilter(key as keyof CombinedFilters, value as any);
//     });
//   };

//   if (isCollapsed) {
//     return (
//       <button
//         onClick={() => setIsCollapsed(false)}
//         className="sticky top-24 p-4 bg-[#1d4350] text-white shadow-lg"
//       >
//         <Filter className="w-6 h-6" />
//         <span className="block mt-2 text-sm">Show Filters</span>
//       </button>
//     );
//   }

//   return (
//     <div className="sticky top-24 bg-[#f8f9fa] border shadow-lg">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 bg-white border-b">
//         <div className="flex items-center gap-2">
//           <Filter className="w-5 h-5 text-[#1d4350]" />
//           <h2 className="font-bold text-[#1d4350]">Filters</h2>
//         </div>
//         <button onClick={() => setIsCollapsed(true)}>
//           <X className="w-5 h-5 text-gray-500" />
//         </button>
//       </div>

//       {/* Body */}
//       <div className="p-4 space-y-4 max-h-[calc(100vh-260px)] overflow-y-auto">
//         {/* Keyword */}
//         <input
//           placeholder="Search keyword"
//           value={tempFilters.keyword || ""}
//           onChange={(e) => handleTempUpdate("keyword", e.target.value)}
//           className="w-full p-2 border"
//         />

//         {/* From / To */}
//         <input
//           placeholder="From city"
//           value={tempFilters.fromCity || ""}
//           onChange={(e) => handleTempUpdate("fromCity", e.target.value)}
//           className="w-full p-2 border"
//         />

//         <input
//           placeholder="To city"
//           value={tempFilters.toCity || ""}
//           onChange={(e) => handleTempUpdate("toCity", e.target.value)}
//           className="w-full p-2 border"
//         />

//         {/* Price */}
//         <div className="grid grid-cols-2 gap-2">
//           <input
//             type="number"
//             placeholder="Min ₹"
//             value={tempFilters.minPrice || ""}
//             onChange={(e) =>
//               handleTempUpdate("minPrice", Number(e.target.value))
//             }
//             className="p-2 border"
//           />
//           <input
//             type="number"
//             placeholder="Max ₹"
//             value={tempFilters.maxPrice || ""}
//             onChange={(e) =>
//               handleTempUpdate("maxPrice", Number(e.target.value))
//             }
//             className="p-2 border"
//           />
//         </div>

//         {/* Trip Styles */}
//         <select
//           multiple
//           value={tempFilters.tripStyles || []}
//           onChange={(e) =>
//             handleTempUpdate(
//               "tripStyles",
//               Array.from(e.target.selectedOptions, (o) => o.value)
//             )
//           }
//           className="w-full p-2 border"
//         >
//           {TRIP_STYLES.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>

//         {/* Creator Type */}
//         <select
//           value={tempFilters.creatorType || ""}
//           onChange={(e) =>
//             handleTempUpdate("creatorType", e.target.value as any)
//           }
//           className="w-full p-2 border"
//         >
//           <option value="">All Creators</option>
//           {CREATOR_TYPES.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         {/* Travel Mode */}
//         <select
//           value={tempFilters.travelMode || ""}
//           onChange={(e) =>
//             handleTempUpdate("travelMode", e.target.value as any)
//           }
//           className="w-full p-2 border"
//         >
//           <option value="">All Modes</option>
//           {TRAVEL_MODES.map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>

//         {/* Gender */}
//         <select
//           value={tempFilters.genderPreference || "ANY"}
//           onChange={(e) =>
//             handleTempUpdate("genderPreference", e.target.value as any)
//           }
//           className="w-full p-2 border"
//         >
//           {GENDERS.map((g) => (
//             <option key={g} value={g}>
//               {g}
//             </option>
//           ))}
//         </select>

//         {/* Languages */}
//         <select
//           multiple
//           value={tempFilters.languages || []}
//           onChange={(e) =>
//             handleTempUpdate(
//               "languages",
//               Array.from(e.target.selectedOptions, (o) => o.value)
//             )
//           }
//           className="w-full p-2 border"
//         >
//           {LANGUAGES.map((l) => (
//             <option key={l} value={l}>
//               {l}
//             </option>
//           ))}
//         </select>

//         {/* Dates */}
//         <input
//           type="date"
//           value={tempFilters.startDateFrom || ""}
//           onChange={(e) =>
//             handleTempUpdate("startDateFrom", e.target.value)
//           }
//           className="w-full p-2 border"
//         />
//         <input
//           type="date"
//           value={tempFilters.startDateTo || ""}
//           onChange={(e) =>
//             handleTempUpdate("startDateTo", e.target.value)
//           }
//           className="w-full p-2 border"
//         />
//       </div>

//       {/* Footer */}
//       <div className="p-4 bg-white border-t space-y-2">
//         <button
//           onClick={applyFilters}
//           className="w-full bg-[#1d4350] text-white py-2"
//         >
//           Apply Filters
//         </button>
//         <button
//           onClick={() => {
//             resetFilters();
//           }}
//           className="w-full bg-gray-200 py-2"
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;




"use client";
import React, { useState } from "react";
import { Filter, X, Search, MapPin, DollarSign, Calendar, Users, Globe } from "lucide-react";
import { CombinedFilters } from "../../types/combinedFilters";

/* ========================= 
   STATIC FILTER OPTIONS (API DRIVEN – NOT UI DATA) 
   ========================= */
const TRIP_STYLES = ["adventure", "leisure", "spiritual", "wildlife"];
const CREATOR_TYPES = [
  "AGENCY",
  "HOST",
  "GUIDE",
  "TRIP_LEADER",
  "INDIVIDUAL",
];
const TRAVEL_MODES = ["SOLO", "GROUP", "COUPLE"];
const LANGUAGES = ["English", "Hindi", "Odia"];
const GENDERS = ["ANY", "MALE_ONLY", "FEMALE_ONLY"];

interface FilterSidebarProps {
  filters: CombinedFilters;
  updateFilter: <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K]
  ) => void;
  resetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  updateFilter,
  resetFilters,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const handleTempUpdate = <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K]
  ) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  // const applyFilters = () => {
  //   Object.entries(tempFilters).forEach(([key, value]) => {
  //     updateFilter(key as keyof CombinedFilters, value as any);
  //   });
  // };


  const applyFilters = () => {
  (Object.keys(tempFilters) as (keyof CombinedFilters)[]).forEach((key) => {
    updateFilter(key, tempFilters[key]);
  });
};


  const toggleArrayValue = (key: "tripStyles" | "languages", value: string) => {
    const currentArray = tempFilters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    handleTempUpdate(key, newArray);
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed left-0 top-24 z-50 bg-gradient-to-br from-[#1d4350] to-[#2a5d6d] text-white p-3 rounded-r-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
      >
        <Filter className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="sticky top-24 w-80 bg-white shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-[#1d4350] via-[#2a5d6d] to-[#1d4350] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Filters</h2>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body - Compact Grid Layout */}
      <div className="p-5 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
        {/* Search Keyword */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Search className="w-4 h-4 text-[#1d4350]" />
            Search
          </label>
          <input
            type="text"
            placeholder="Keywords..."
            value={tempFilters.keyword || ""}
            onChange={(e) => handleTempUpdate("keyword", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all"
          />
        </div>

        {/* Location Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-[#1d4350]" />
              From
            </label>
            <input
              type="text"
              placeholder="City"
              value={tempFilters.fromCity || ""}
              onChange={(e) => handleTempUpdate("fromCity", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-[#1d4350]" />
              To
            </label>
            <input
              type="text"
              placeholder="City"
              value={tempFilters.toCity || ""}
              onChange={(e) => handleTempUpdate("toCity", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <DollarSign className="w-4 h-4 text-[#1d4350]" />
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min"
              value={tempFilters.minPrice || ""}
              onChange={(e) => handleTempUpdate("minPrice", Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all"
            />
            <input
              type="number"
              placeholder="Max"
              value={tempFilters.maxPrice || ""}
              onChange={(e) => handleTempUpdate("maxPrice", Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Trip Styles - Chip Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Trip Style</label>
          <div className="flex flex-wrap gap-2">
            {TRIP_STYLES.map((style) => (
              <button
                key={style}
                onClick={() => toggleArrayValue("tripStyles", style)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  tempFilters.tripStyles?.includes(style)
                    ? "bg-gradient-to-r from-[#1d4350] to-[#2a5d6d] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Creator & Mode Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700">Creator</label>
            <select
              value={tempFilters.creatorType || ""}
              onChange={(e) => handleTempUpdate("creatorType", e.target.value as CombinedFilters["creatorType"])}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all bg-white"
            >
              <option value="">All</option>
              {CREATOR_TYPES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700">Mode</label>
            <select
              value={tempFilters.travelMode || ""}
              onChange={(e) => handleTempUpdate("travelMode", e.target.value as CombinedFilters["travelMode"])}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all bg-white"
            >
              <option value="">All</option>
              {TRAVEL_MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gender Selection - Compact Chips */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Users className="w-4 h-4 text-[#1d4350]" />
            Gender
          </label>
          <div className="flex gap-2">
            {GENDERS.map((gender) => (
              <button
                key={gender}
                onClick={() => handleTempUpdate("genderPreference", gender as CombinedFilters["genderPreference"])}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                  tempFilters.genderPreference === gender
                    ? "bg-gradient-to-r from-[#1d4350] to-[#2a5d6d] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {gender === "ANY" ? "Any" : gender.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Languages - Chip Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Globe className="w-4 h-4 text-[#1d4350]" />
            Languages
          </label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleArrayValue("languages", lang)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  tempFilters.languages?.includes(lang)
                    ? "bg-gradient-to-r from-[#1d4350] to-[#2a5d6d] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Calendar className="w-4 h-4 text-[#1d4350]" />
            Travel Dates
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={tempFilters.startDateFrom || ""}
              onChange={(e) => handleTempUpdate("startDateFrom", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all"
            />
            <input
              type="date"
              value={tempFilters.startDateTo || ""}
              onChange={(e) => handleTempUpdate("startDateTo", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
        <button
          onClick={applyFilters}
          className="flex-1 bg-gradient-to-r from-[#1d4350] to-[#2a5d6d] text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            resetFilters();
            setTempFilters(filters);
          }}
          className="px-5 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
        >
          Reset
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1d4350;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a5d6d;
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;