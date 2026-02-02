// "use client";

// import React, { useMemo, useState } from "react";
// import { Filter, X } from "lucide-react";
// import { CombinedFilters } from "../../types/combinedFilters";

// interface FilterSidebarProps {
//   filters: CombinedFilters;
//   updateFilter: <K extends keyof CombinedFilters>(
//     key: K,
//     value: CombinedFilters[K],
//   ) => void;
//   resetFilters: () => void;
//   trips: any[];
//   packages: any[];
// }

// const unique = (arr: any[]) => Array.from(new Set(arr)).filter(Boolean);

// const FilterSidebar: React.FC<FilterSidebarProps> = ({
//   filters,
//   updateFilter,
//   resetFilters,
//   trips,
//   packages,
// }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   /* =======================
//      🔥 DYNAMIC OPTIONS
//   ======================= */

//   const tripStyleOptions = useMemo(
//     () => unique(trips.flatMap((t) => t.tripStyles || [])),
//     [trips],
//   );

//   const creatorTypeOptions = useMemo(
//     () => unique(packages.map((p) => p.creatorType)),
//     [packages],
//   );
//   console.log("Creator Types:", creatorTypeOptions);

//   const categoryOptions = useMemo(
//     () => unique(packages.map((p) => p.category)),
//     [packages],
//   );

//   const travelModeOptions = useMemo(
//     () => unique(trips.map((t) => t.travelMode)),
//     [trips],
//   );

//   const languageOptions = useMemo(
//     () => unique(trips.flatMap((t) => t.languages || [])),
//     [trips],
//   );

//   /* ======================= */

//   if (isCollapsed) {
//     return (
//       <button
//         onClick={() => setIsCollapsed(false)}
//         className="sticky top-24 p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
//       >
//         <Filter className="w-6 h-6" />
//         <span className="block mt-2 text-sm">Show Filters</span>
//       </button>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 pb-4 border-b">
//         <div className="flex items-center gap-3">
//           <Filter className="w-5 h-5 text-blue-600" />
//           <h2 className="text-xl font-bold text-gray-800">Filters</h2>
//         </div>
//         <button
//           onClick={() => setIsCollapsed(true)}
//           className="p-2 hover:bg-gray-100 rounded-lg transition"
//         >
//           <X className="w-5 h-5 text-gray-500" />
//         </button>
//       </div>

//       <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
//         {/* Search Keyword */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Search</h3>
//           <input
//             type="text"
//             value={filters.keyword || ""}
//             onChange={(e) => updateFilter("keyword", e.target.value)}
//             placeholder="Search trips & packages..."
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* From City */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">From City</h3>
//           <input
//             type="text"
//             value={filters.fromCity || ""}
//             onChange={(e) => updateFilter("fromCity", e.target.value)}
//             placeholder="Departure city"
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           />
//         </div>

//         {/* To City */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">To City</h3>
//           <input
//             type="text"
//             value={filters.toCity || ""}
//             onChange={(e) => updateFilter("toCity", e.target.value)}
//             placeholder="Destination city"
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           />
//         </div>

//         {/* Country */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Country</h3>
//           <input
//             type="text"
//             value={filters.country || ""}
//             onChange={(e) => updateFilter("country", e.target.value)}
//             placeholder="Country"
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           />
//         </div>

//         {/* Price Range */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Price Range (₹)</h3>
//           <div className="flex gap-2">
//             <input
//               type="number"
//               value={filters.minPrice || ""}
//               onChange={(e) => updateFilter("minPrice", Number(e.target.value))}
//               placeholder="Min"
//               className="w-1/2 p-3 border border-gray-300 rounded-lg"
//             />
//             <input
//               type="number"
//               value={filters.maxPrice || ""}
//               onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
//               placeholder="Max"
//               className="w-1/2 p-3 border border-gray-300 rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Trip Styles */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Trip Styles</h3>
//           <select
//             multiple
//             value={filters.tripStyles || []}
//             onChange={(e) => {
//               const selected = Array.from(
//                 e.target.selectedOptions,
//                 (option) => option.value,
//               );
//               updateFilter("tripStyles", selected);
//             }}
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             size={4}
//           >
//             {tripStyleOptions.map((style) => (
//               <option key={style} value={style}>
//                 {style}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Creator Type */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Creator Type</h3>
//           <select
//             value={filters.creatorType || ""}
//             onChange={(e) =>
//               updateFilter(
//                 "creatorType",
//                 e.target.value ? (e.target.value as any) : undefined,
//               )
//             }
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           >
//             <option value="">All</option>
//             {creatorTypeOptions.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Category (Package) */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
//           <select
//             value={filters.category || ""}
//             onChange={(e) => updateFilter("category", e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           >
//             <option value="">All</option>
//             {categoryOptions.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
              
//             ))}
//           </select>
//         </div>

//         {/* Travel Mode (Trip) */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Travel Mode</h3>
//           <select
//             value={filters.travelMode || ""}
//             onChange={(e) => updateFilter("travelMode", e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           >
//             <option value="">All</option>
//             {travelModeOptions.map((mode) => (
//               <option key={mode} value={mode}>
//                 {mode}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Gender Preference (Trip) */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">
//             Gender Preference
//           </h3>
//           <select
//             value={filters.genderPreference || "ANY"}
//             onChange={(e) =>
//               updateFilter(
//                 "creatorType",
//                 e.target.value ? (e.target.value as any) : undefined,
//               )
//             }
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           >
//             {/* {genderOptions.map((gender) => (
//               <option key={gender} value={gender}>{gender}</option>
//             ))} */}
//           </select>
//         </div>

//         {/* Languages (Trip) */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Languages</h3>
//           <select
//             multiple
//             value={filters.languages || []}
//             onChange={(e) => {
//               const selected = Array.from(
//                 e.target.selectedOptions,
//                 (option) => option.value,
//               );
//               updateFilter("languages", selected);
//             }}
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             size={3}
//           >
//             {languageOptions.map((lang) => (
//               <option key={lang} value={lang}>
//                 {lang}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Age Range (Trip) */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Age Range</h3>
//           <div className="flex gap-2">
//             <input
//               type="number"
//               min="18"
//               value={filters.minAge || ""}
//               onChange={(e) => updateFilter("minAge", Number(e.target.value))}
//               placeholder="Min Age"
//               className="w-1/2 p-3 border border-gray-300 rounded-lg"
//             />
//             <input
//               type="number"
//               min="18"
//               value={filters.maxAge || ""}
//               onChange={(e) => updateFilter("maxAge", Number(e.target.value))}
//               placeholder="Max Age"
//               className="w-1/2 p-3 border border-gray-300 rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Date Range (Trip) */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Trip Dates</h3>
//           <div className="space-y-2">
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">
//                 Start From
//               </label>
//               <input
//                 type="date"
//                 value={filters.startDateFrom || ""}
//                 onChange={(e) => updateFilter("startDateFrom", e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">
//                 Start To
//               </label>
//               <input
//                 type="date"
//                 value={filters.startDateTo || ""}
//                 onChange={(e) => updateFilter("startDateTo", e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Duration Days (Package) */}
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-2">Duration (Days)</h3>
//           <div className="flex gap-2">
//             <input
//               type="number"
//               min="1"
//               value={filters.minDays || ""}
//               onChange={(e) => updateFilter("minDays", Number(e.target.value))}
//               placeholder="Min Days"
//               className="w-1/2 p-3 border border-gray-300 rounded-lg"
//             />
//             <input
//               type="number"
//               min="1"
//               value={filters.maxDays || ""}
//               onChange={(e) => updateFilter("maxDays", Number(e.target.value))}
//               placeholder="Max Days"
//               className="w-1/2 p-3 border border-gray-300 rounded-lg"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-8 pt-6 border-t border-gray-200">
//         <button
//           onClick={resetFilters}
//           className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
//         >
//           Reset All Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;




"use client";

import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import { CombinedFilters } from "../../types/combinedFilters";

/* =========================
   STATIC FILTER OPTIONS
   (API DRIVEN – NOT UI DATA)
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
  const [tempFilters, setTempFilters] = useState<CombinedFilters>(filters);

  const handleTempUpdate = <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K]
  ) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    Object.entries(tempFilters).forEach(([key, value]) => {
      updateFilter(key as keyof CombinedFilters, value as any);
    });
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="sticky top-24 p-4 bg-[#1d4350] text-white shadow-lg"
      >
        <Filter className="w-6 h-6" />
        <span className="block mt-2 text-sm">Show Filters</span>
      </button>
    );
  }

  return (
    <div className="sticky top-24 bg-[#f8f9fa] border shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#1d4350]" />
          <h2 className="font-bold text-[#1d4350]">Filters</h2>
        </div>
        <button onClick={() => setIsCollapsed(true)}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4 max-h-[calc(100vh-260px)] overflow-y-auto">
        {/* Keyword */}
        <input
          placeholder="Search keyword"
          value={tempFilters.keyword || ""}
          onChange={(e) => handleTempUpdate("keyword", e.target.value)}
          className="w-full p-2 border"
        />

        {/* From / To */}
        <input
          placeholder="From city"
          value={tempFilters.fromCity || ""}
          onChange={(e) => handleTempUpdate("fromCity", e.target.value)}
          className="w-full p-2 border"
        />

        <input
          placeholder="To city"
          value={tempFilters.toCity || ""}
          onChange={(e) => handleTempUpdate("toCity", e.target.value)}
          className="w-full p-2 border"
        />

        {/* Price */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min ₹"
            value={tempFilters.minPrice || ""}
            onChange={(e) =>
              handleTempUpdate("minPrice", Number(e.target.value))
            }
            className="p-2 border"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={tempFilters.maxPrice || ""}
            onChange={(e) =>
              handleTempUpdate("maxPrice", Number(e.target.value))
            }
            className="p-2 border"
          />
        </div>

        {/* Trip Styles */}
        <select
          multiple
          value={tempFilters.tripStyles || []}
          onChange={(e) =>
            handleTempUpdate(
              "tripStyles",
              Array.from(e.target.selectedOptions, (o) => o.value)
            )
          }
          className="w-full p-2 border"
        >
          {TRIP_STYLES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Creator Type */}
        <select
          value={tempFilters.creatorType || ""}
          onChange={(e) =>
            handleTempUpdate("creatorType", e.target.value as any)
          }
          className="w-full p-2 border"
        >
          <option value="">All Creators</option>
          {CREATOR_TYPES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Travel Mode */}
        <select
          value={tempFilters.travelMode || ""}
          onChange={(e) =>
            handleTempUpdate("travelMode", e.target.value as any)
          }
          className="w-full p-2 border"
        >
          <option value="">All Modes</option>
          {TRAVEL_MODES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Gender */}
        <select
          value={tempFilters.genderPreference || "ANY"}
          onChange={(e) =>
            handleTempUpdate("genderPreference", e.target.value as any)
          }
          className="w-full p-2 border"
        >
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Languages */}
        <select
          multiple
          value={tempFilters.languages || []}
          onChange={(e) =>
            handleTempUpdate(
              "languages",
              Array.from(e.target.selectedOptions, (o) => o.value)
            )
          }
          className="w-full p-2 border"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        {/* Dates */}
        <input
          type="date"
          value={tempFilters.startDateFrom || ""}
          onChange={(e) =>
            handleTempUpdate("startDateFrom", e.target.value)
          }
          className="w-full p-2 border"
        />
        <input
          type="date"
          value={tempFilters.startDateTo || ""}
          onChange={(e) =>
            handleTempUpdate("startDateTo", e.target.value)
          }
          className="w-full p-2 border"
        />
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t space-y-2">
        <button
          onClick={applyFilters}
          className="w-full bg-[#1d4350] text-white py-2"
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            resetFilters();
          }}
          className="w-full bg-gray-200 py-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
