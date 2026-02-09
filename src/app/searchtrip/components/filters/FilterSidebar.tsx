// "use client";

// import React, { useState, useEffect } from "react";
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
// const LANGUAGES = ["English", "Hindi", "Odia"];
// const GENDERS = ["ANY", "MALE_ONLY", "FEMALE_ONLY"];

// const FROM_CITIES = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai"];
// const TO_CITIES = ["Goa", "Jaipur", "Manali", "Kochi", "Udaipur"];

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
//   /* ===============================
//      LOCAL INPUT STATE
//   =============================== */
//   const [keyword, setKeyword] = useState(filters.keyword ?? "");
//   const [fromCity, setFromCity] = useState(filters.fromCity ?? "");
//   const [toCity, setToCity] = useState(filters.toCity ?? "");
//   const [budget, setBudget] = useState<number>(filters.maxPrice ?? 50000);

//   /* ===============================
//      SYNC FROM PARENT
//   =============================== */
//   useEffect(() => setKeyword(filters.keyword ?? ""), [filters.keyword]);
//   useEffect(() => setFromCity(filters.fromCity ?? ""), [filters.fromCity]);
//   useEffect(() => setToCity(filters.toCity ?? ""), [filters.toCity]);

//   /* ===============================
//      DEBOUNCED UPDATES
//   =============================== */
//   useEffect(() => {
//     if (keyword === (filters.keyword ?? "")) return;
//     const t = setTimeout(
//       () => updateFilter("keyword", keyword || undefined),
//       400
//     );
//     return () => clearTimeout(t);
//   }, [keyword, filters.keyword, updateFilter]);

//   useEffect(() => {
//     if (fromCity === (filters.fromCity ?? "")) return;
//     const t = setTimeout(
//       () => updateFilter("fromCity", fromCity || undefined),
//       400
//     );
//     return () => clearTimeout(t);
//   }, [fromCity, filters.fromCity, updateFilter]);

//   useEffect(() => {
//     if (toCity === (filters.toCity ?? "")) return;
//     const t = setTimeout(
//       () => updateFilter("toCity", toCity || undefined),
//       400
//     );
//     return () => clearTimeout(t);
//   }, [toCity, filters.toCity, updateFilter]);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       updateFilter("maxPrice", budget);
//     }, 300);
//     return () => clearTimeout(t);
//   }, [budget, updateFilter]);

//   /* ===============================
//      HELPERS
//   =============================== */
//   // const toggleArrayValue = (
//   //   key: "tripStyles" | "languages",
//   //   value: string
//   // ) => {
//   //   const current = filters[key] || [];
//   //   const updated = current.includes(value)
//   //     ? current.filter((v) => v !== value)
//   //     : [...current, value];

//   //   updateFilter(key, updated as any);
//   // };


//   type ArrayFilterKeys = "tripStyles" | "languages";

// const toggleArrayValue = <K extends ArrayFilterKeys>(
//   key: K,
//   value: string
// ) => {
//   const current = (filters[key] ?? []) as string[];

//   const updated = current.includes(value)
//     ? current.filter((v) => v !== value)
//     : [...current, value];

//   updateFilter(key, updated as CombinedFilters[K]);
// };

//   /* ===============================
//      UI
//   =============================== */
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
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="w-full mt-2 px-3 py-2 border rounded-lg"
//           />
//         </div>

//         {/* From / To City */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-xs font-semibold flex gap-1">
//               <MapPin className="w-3 h-3" /> From
//             </label>
//             <input
//               value={fromCity}
//               onChange={(e) => setFromCity(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//             />
//             <div className="mt-2 space-y-1">
//               {FROM_CITIES.map((c) => (
//                 <label key={c} className="flex items-center gap-2 text-xs">
//                   <input
//                     type="checkbox"
//                     checked={fromCity === c}
//                     onChange={() => setFromCity(c)}
//                   />
//                   {c}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="text-xs font-semibold flex gap-1">
//               <MapPin className="w-3 h-3" /> To
//             </label>
//             <input
//               value={toCity}
//               onChange={(e) => setToCity(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//             />
//             <div className="mt-2 space-y-1">
//               {TO_CITIES.map((c) => (
//                 <label key={c} className="flex items-center gap-2 text-xs">
//                   <input
//                     type="checkbox"
//                     checked={toCity === c}
//                     onChange={() => setToCity(c)}
//                   />
//                   {c}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Budget Slider */}
//         <div>
//           <label className="text-sm font-semibold flex gap-2">
//             <DollarSign className="w-4 h-4" /> Budget: ₹
//             {budget.toLocaleString()}
//           </label>
//           <input
//             type="range"
//             min={5000}
//             max={200000}
//             step={5000}
//             value={budget}
//             onChange={(e) => setBudget(Number(e.target.value))}
//             className="w-full mt-2"
//           />
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
//             value={filters.creatorType ?? ""}
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
//               value={filters.startDateFrom ?? ""}
//               onChange={(e) =>
//                 updateFilter("startDateFrom", e.target.value || undefined)
//               }
//               className="px-3 py-2 border rounded-lg"
//             />
//             <input
//               type="date"
//               value={filters.startDateTo ?? ""}
//               onChange={(e) =>
//                 updateFilter("startDateTo", e.target.value || undefined)
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
  X,
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
  /* =============================== LOCAL INPUT STATE =============================== */
  const [keyword, setKeyword] = useState(filters.keyword ?? "");
  const [fromCity, setFromCity] = useState(filters.fromCity ?? "");
  const [toCity, setToCity] = useState(filters.toCity ?? "");
  const [budget, setBudget] = useState(filters.maxPrice ?? 50000);

  /* =============================== SYNC FROM PARENT =============================== */
  useEffect(() => setKeyword(filters.keyword ?? ""), [filters.keyword]);
  useEffect(() => setFromCity(filters.fromCity ?? ""), [filters.fromCity]);
  useEffect(() => setToCity(filters.toCity ?? ""), [filters.toCity]);

  /* =============================== DEBOUNCED UPDATES =============================== */
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

  /* =============================== HELPERS =============================== */
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
const clearFilter = (key: keyof CombinedFilters) => {
  updateFilter(key, undefined as CombinedFilters[typeof key]);
  if (key === "keyword") setKeyword("");
  if (key === "fromCity") setFromCity("");
  if (key === "toCity") setToCity("");
  if (key === "maxPrice") setBudget(50000);
};
  /* =============================== UI =============================== */
  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 overflow-y-auto shadow-sm">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#1d4350] to-[#2d5560] rounded-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
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

        {/* From City */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 text-gray-500" />
              From City
            </label>
            {fromCity && (
              <button
                onClick={() => clearFilter("fromCity")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Select or type city..."
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
          />
          <div className="flex flex-wrap gap-2">
            {FROM_CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setFromCity(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  fromCity === c
                    ? "bg-[#1d4350] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* To City */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 text-gray-500" />
              To City
            </label>
            {toCity && (
              <button
                onClick={() => clearFilter("toCity")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Select or type city..."
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d4350] focus:border-transparent transition-all text-sm"
          />
          <div className="flex flex-wrap gap-2">
            {TO_CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setToCity(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  toCity === c
                    ? "bg-[#1d4350] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Slider */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <DollarSign className="w-4 h-4 text-gray-500" />
            Budget
          </label>
          <div className="bg-gradient-to-r from-[#1d4350] to-[#2d5560] text-white px-4 py-2 rounded-lg text-center">
            <span className="text-lg font-semibold">
              ₹{budget.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1d4350]"
            style={{
              background: `linear-gradient(to right, #1d4350 ${
                (budget / 100000) * 100
              }%, #e5e7eb ${(budget / 100000) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹0</span>
            <span>₹1,00,000</span>
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
                e.target.value as CombinedFilters["creatorType"]
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
                    g as CombinedFilters["genderPreference"]
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