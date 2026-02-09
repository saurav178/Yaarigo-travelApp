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


// "use client";
// import { useState, useEffect } from "react";
// import React from "react";
// import {
//   Filter,
//   Search,
//   MapPin,
//   DollarSign,
//   Calendar,
//   Users,
//   Globe,
// } from "lucide-react";
// import { CombinedFilters } from "../../types/combinedFilters";

// /* ===== STATIC OPTIONS ===== */
// const TRIP_STYLES = ["adventure", "leisure", "spiritual", "wildlife"];
// const CREATOR_TYPES = ["AGENCY", "TRIP_LEADER", "USER"];
// // const TRAVEL_MODES = ["SOLO", "GROUP"];
// const LANGUAGES = ["English", "Hindi", "Odia"];
// const GENDERS = ["ANY", "MALE_ONLY", "FEMALE_ONLY"];

// interface FilterSidebarProps {
//   filters: CombinedFilters;
//   updateFilter: <K extends keyof CombinedFilters>(
//     key: K,
//     value: CombinedFilters[K]
//   ) => void;
// }

// const FilterSidebar: React.FC<FilterSidebarProps> = ({
//   filters,
//   updateFilter,
// }) => {

// const [keyword, setKeyword] = useState(filters.keyword ?? "");
// const [fromCity, setFromCity] = useState(filters.fromCity ?? "");
// const [toCity, setToCity] = useState(filters.toCity ?? "");

// useEffect(() => {
//   const t = setTimeout(() => {
//     updateFilter("keyword", keyword || undefined);
//   }, 400);

//   return () => clearTimeout(t);
// }, [keyword, updateFilter]);

// useEffect(() => {
//   const t = setTimeout(() => {
//     updateFilter("fromCity", fromCity || undefined);
//   }, 400);

//   return () => clearTimeout(t);
// }, [fromCity, updateFilter]);

// useEffect(() => {
//   const t = setTimeout(() => {
//     updateFilter("toCity", toCity || undefined);
//   }, 400);

//   return () => clearTimeout(t);
// }, [toCity, updateFilter]);


//   const toggleArrayValue = (
//     key: "tripStyles" | "languages",
//     value: string
//   ) => {
//     const current = filters[key] || [];
//     const updated = current.includes(value)
//       ? current.filter((v) => v !== value)
//       : [...current, value];

//     updateFilter(key, updated);
//   };

//   return (
//     <aside className="sticky top-24 h-[calc(100vh-120px)] w-80 bg-white border border-gray-200 shadow-lg overflow-y-auto">
//       {/* Header */}
//       <div className="px-6 py-4 border-b bg-gradient-to-r from-[#1d4350] to-[#2a5d6d] text-white">
//         <div className="flex items-center gap-2">
//           <Filter className="w-5 h-5" />
//           <h2 className="font-semibold text-lg">Filters</h2>
//         </div>
//       </div>

//       <div className="p-5 space-y-5">
//         {/* Keyword */}
//         <div>
//           <label className="text-sm font-semibold flex items-center gap-2">
//             <Search className="w-4 h-4" /> Search
//           </label>
//           <input
//             type="text"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="w-full mt-2 px-3 py-2 border rounded-lg"
//           />
//         </div>

//         {/* Location */}
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="text-xs font-semibold flex gap-1">
//               <MapPin className="w-3 h-3" /> From
//             </label>
//             <input
//               type="text"
//               value={fromCity}
//               onChange={(e) => setFromCity(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-semibold flex gap-1">
//               <MapPin className="w-3 h-3" /> To
//             </label>
//             <input
//               type="text"
//               value={toCity}
//               onChange={(e) => setToCity(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Price */}
//         <div>
//           <label className="text-sm font-semibold flex gap-2">
//             <DollarSign className="w-4 h-4" /> Budget
//           </label>
//           <div className="grid grid-cols-2 gap-3 mt-2">
//             <input
//               type="number"
//               placeholder="Min"
//               value={filters.minPrice || ""}
//               onChange={(e) =>
//                 updateFilter("minPrice", Number(e.target.value))
//               }
//               className="px-3 py-2 border rounded-lg"
//             />
//             <input
//               type="number"
//               placeholder="Max"
//               value={filters.maxPrice || ""}
//               onChange={(e) =>
//                 updateFilter("maxPrice", Number(e.target.value))
//               }
//               className="px-3 py-2 border rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Trip Styles */}
//         <div>
//           <label className="text-sm font-semibold">Trip Style</label>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {TRIP_STYLES.map((style) => (
//               <button
//                 key={style}
//                 onClick={() => toggleArrayValue("tripStyles", style)}
//                 className={`px-3 py-1.5 rounded-full text-xs ${
//                   filters.tripStyles?.includes(style)
//                     ? "bg-[#1d4350] text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {style}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Creator */}
//         <div>
//           <label className="text-sm font-semibold">Creator</label>
//           <select
//             value={filters.creatorType || ""}
//             onChange={(e) =>
//               updateFilter(
//                 "creatorType",
//                 e.target.value as CombinedFilters["creatorType"]
//               )
//             }
//             className="w-full mt-2 px-3 py-2 border rounded-lg"
//           >
//             <option value="">All</option>
//             {CREATOR_TYPES.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Gender */}
//         <div>
//           <label className="text-sm font-semibold flex gap-2">
//             <Users className="w-4 h-4" /> Gender
//           </label>
//           <div className="flex gap-2 mt-2">
//             {GENDERS.map((g) => (
//               <button
//                 key={g}
//                 onClick={() =>
//                   updateFilter(
//                     "genderPreference",
//                     g as CombinedFilters["genderPreference"]
//                   )
//                 }
//                 className={`flex-1 py-2 rounded-lg text-xs ${
//                   filters.genderPreference === g
//                     ? "bg-[#1d4350] text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {g === "ANY" ? "Any" : g.replace("_", " ")}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Languages */}
//         <div>
//           <label className="text-sm font-semibold flex gap-2">
//             <Globe className="w-4 h-4" /> Languages
//           </label>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {LANGUAGES.map((lang) => (
//               <button
//                 key={lang}
//                 onClick={() => toggleArrayValue("languages", lang)}
//                 className={`px-3 py-1.5 rounded-full text-xs ${
//                   filters.languages?.includes(lang)
//                     ? "bg-[#1d4350] text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {lang}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Dates */}
//         <div>
//           <label className="text-sm font-semibold flex gap-2">
//             <Calendar className="w-4 h-4" /> Dates
//           </label>
//           <div className="grid grid-cols-2 gap-3 mt-2">
//             <input
//               type="date"
//               value={filters.startDateFrom || ""}
//               onChange={(e) =>
//                 updateFilter("startDateFrom", e.target.value)
//               }
//               className="px-3 py-2 border rounded-lg"
//             />
//             <input
//               type="date"
//               value={filters.startDateTo || ""}
//               onChange={(e) =>
//                 updateFilter("startDateTo", e.target.value)
//               }
//               className="px-3 py-2 border rounded-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default FilterSidebar;




"use client";

import React, { useState, useEffect } from "react";
import {
  Filter,
  Search,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Globe,
} from "lucide-react";
import { CombinedFilters } from "../../types/combinedFilters";

/* ===== STATIC OPTIONS ===== */
const TRIP_STYLES = ["adventure", "leisure", "spiritual", "wildlife"];
const CREATOR_TYPES = ["AGENCY", "TRIP_LEADER", "USER"];
const LANGUAGES = ["English", "Hindi", "Odia"];
const GENDERS = ["ANY", "MALE_ONLY", "FEMALE_ONLY"];

const FROM_CITIES = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai"];
const TO_CITIES = ["Goa", "Jaipur", "Manali", "Kochi", "Udaipur"];

interface FilterSidebarProps {
  filters: CombinedFilters;
  updateFilter: <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K]
  ) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  updateFilter,
}) => {
  /* ===============================
     LOCAL INPUT STATE
  =============================== */
  const [keyword, setKeyword] = useState(filters.keyword ?? "");
  const [fromCity, setFromCity] = useState(filters.fromCity ?? "");
  const [toCity, setToCity] = useState(filters.toCity ?? "");
  const [budget, setBudget] = useState<number>(filters.maxPrice ?? 50000);

  /* ===============================
     SYNC FROM PARENT
  =============================== */
  useEffect(() => setKeyword(filters.keyword ?? ""), [filters.keyword]);
  useEffect(() => setFromCity(filters.fromCity ?? ""), [filters.fromCity]);
  useEffect(() => setToCity(filters.toCity ?? ""), [filters.toCity]);

  /* ===============================
     DEBOUNCED UPDATES
  =============================== */
  useEffect(() => {
    if (keyword === (filters.keyword ?? "")) return;
    const t = setTimeout(
      () => updateFilter("keyword", keyword || undefined),
      400
    );
    return () => clearTimeout(t);
  }, [keyword, filters.keyword, updateFilter]);

  useEffect(() => {
    if (fromCity === (filters.fromCity ?? "")) return;
    const t = setTimeout(
      () => updateFilter("fromCity", fromCity || undefined),
      400
    );
    return () => clearTimeout(t);
  }, [fromCity, filters.fromCity, updateFilter]);

  useEffect(() => {
    if (toCity === (filters.toCity ?? "")) return;
    const t = setTimeout(
      () => updateFilter("toCity", toCity || undefined),
      400
    );
    return () => clearTimeout(t);
  }, [toCity, filters.toCity, updateFilter]);

  useEffect(() => {
    const t = setTimeout(() => {
      updateFilter("maxPrice", budget);
    }, 300);
    return () => clearTimeout(t);
  }, [budget, updateFilter]);

  /* ===============================
     HELPERS
  =============================== */
  // const toggleArrayValue = (
  //   key: "tripStyles" | "languages",
  //   value: string
  // ) => {
  //   const current = filters[key] || [];
  //   const updated = current.includes(value)
  //     ? current.filter((v) => v !== value)
  //     : [...current, value];

  //   updateFilter(key, updated as any);
  // };


  type ArrayFilterKeys = "tripStyles" | "languages";

const toggleArrayValue = <K extends ArrayFilterKeys>(
  key: K,
  value: string
) => {
  const current = (filters[key] ?? []) as string[];

  const updated = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];

  updateFilter(key, updated as CombinedFilters[K]);
};

  /* ===============================
     UI
  =============================== */
  return (
    <aside className="sticky top-24 h-[calc(100vh-120px)] w-80 bg-white border border-gray-200 shadow-lg overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-[#1d4350] to-[#2a5d6d] text-white">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Filters</h2>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Keyword */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-2">
            <Search className="w-4 h-4" /> Search
          </label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full mt-2 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* From / To City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold flex gap-1">
              <MapPin className="w-3 h-3" /> From
            </label>
            <input
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
            <div className="mt-2 space-y-1">
              {FROM_CITIES.map((c) => (
                <label key={c} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={fromCity === c}
                    onChange={() => setFromCity(c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold flex gap-1">
              <MapPin className="w-3 h-3" /> To
            </label>
            <input
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
            <div className="mt-2 space-y-1">
              {TO_CITIES.map((c) => (
                <label key={c} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={toCity === c}
                    onChange={() => setToCity(c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Slider */}
        <div>
          <label className="text-sm font-semibold flex gap-2">
            <DollarSign className="w-4 h-4" /> Budget: ₹
            {budget.toLocaleString()}
          </label>
          <input
            type="range"
            min={5000}
            max={200000}
            step={5000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        {/* Trip Styles */}
        <div>
          <label className="text-sm font-semibold">Trip Style</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {TRIP_STYLES.map((style) => (
              <button
                key={style}
                onClick={() => toggleArrayValue("tripStyles", style)}
                className={`px-3 py-1.5 rounded-full text-xs ${
                  filters.tripStyles?.includes(style)
                    ? "bg-[#1d4350] text-white"
                    : "bg-gray-100"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Creator */}
        <div>
          <label className="text-sm font-semibold">Creator</label>
          <select
            value={filters.creatorType ?? ""}
            onChange={(e) =>
              updateFilter(
                "creatorType",
                e.target.value as CombinedFilters["creatorType"]
              )
            }
            className="w-full mt-2 px-3 py-2 border rounded-lg"
          >
            <option value="">All</option>
            {CREATOR_TYPES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-semibold flex gap-2">
            <Users className="w-4 h-4" /> Gender
          </label>
          <div className="flex gap-2 mt-2">
            {GENDERS.map((g) => (
              <button
                key={g}
                onClick={() =>
                  updateFilter(
                    "genderPreference",
                    g as CombinedFilters["genderPreference"]
                  )
                }
                className={`flex-1 py-2 rounded-lg text-xs ${
                  filters.genderPreference === g
                    ? "bg-[#1d4350] text-white"
                    : "bg-gray-100"
                }`}
              >
                {g === "ANY" ? "Any" : g.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <label className="text-sm font-semibold flex gap-2">
            <Globe className="w-4 h-4" /> Languages
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleArrayValue("languages", lang)}
                className={`px-3 py-1.5 rounded-full text-xs ${
                  filters.languages?.includes(lang)
                    ? "bg-[#1d4350] text-white"
                    : "bg-gray-100"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="text-sm font-semibold flex gap-2">
            <Calendar className="w-4 h-4" /> Dates
          </label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <input
              type="date"
              value={filters.startDateFrom ?? ""}
              onChange={(e) =>
                updateFilter("startDateFrom", e.target.value || undefined)
              }
              className="px-3 py-2 border rounded-lg"
            />
            <input
              type="date"
              value={filters.startDateTo ?? ""}
              onChange={(e) =>
                updateFilter("startDateTo", e.target.value || undefined)
              }
              className="px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
