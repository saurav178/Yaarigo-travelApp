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

import React, { useMemo, useState } from "react";
import { Filter, X } from "lucide-react";
import { CombinedFilters } from "../../types/combinedFilters";

interface FilterSidebarProps {
  filters: CombinedFilters;
  updateFilter: <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K],
  ) => void;
  resetFilters: () => void;
  trips: any[];
  packages: any[];
}

const unique = (arr: any[]) => Array.from(new Set(arr)).filter(Boolean);

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  updateFilter,
  resetFilters,
  trips,
  packages,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  /* =======================
     🔥 DYNAMIC OPTIONS
  ======================= */

  const tripStyleOptions = useMemo(
    () => unique(trips.flatMap((t) => t.tripStyles || [])),
    [trips],
  );

  const creatorTypeOptions = useMemo(
    () => unique(packages.map((p) => p.creatorType)),
    [packages],
  );

  const categoryOptions = useMemo(
    () => unique(packages.map((p) => p.category)),
    [packages],
  );

  const travelModeOptions = useMemo(
    () => unique(trips.map((t) => t.travelMode)),
    [trips],
  );

  const languageOptions = useMemo(
    () => unique(trips.flatMap((t) => t.languages || [])),
    [trips],
  );

  /* ======================= */

  const handleTempUpdate = <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K],
  ) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    Object.keys(tempFilters).forEach((key) => {
      updateFilter(key as keyof CombinedFilters, tempFilters[key as keyof CombinedFilters]);
    });
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="sticky top-24 p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          backgroundColor: "#1d4350",
        }}
      >
        <Filter className="w-6 h-6" />
        <span className="block mt-2 text-sm font-medium">Show Filters</span>
      </button>
    );
  }

  return (
    <div
      className="shadow-lg sticky top-24"
      style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #e0e0e0",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" style={{ color: "#1d4350" }} />
          <h2
            className="text-lg font-bold"
            style={{ color: "#1d4350" }}
          >
            Filters
          </h2>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div
        className="p-4 space-y-4 overflow-y-auto custom-scrollbar"
        style={{
          maxHeight: "calc(100vh - 250px)",
        }}
      >
        {/* Search Keyword */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Search
          </label>
          <input
            type="text"
            value={tempFilters.keyword || ""}
            onChange={(e) => handleTempUpdate("keyword", e.target.value)}
            placeholder="Search trips & packages..."
            className="w-full px-3 py-2.5 bg-white transition-all duration-200"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          />
        </div>

        {/* From City */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            From City
          </label>
          <input
            type="text"
            value={tempFilters.fromCity || ""}
            onChange={(e) => handleTempUpdate("fromCity", e.target.value)}
            placeholder="Departure city"
            className="w-full px-3 py-2.5 bg-white transition-all duration-200"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          />
        </div>

        {/* To City */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            To City
          </label>
          <input
            type="text"
            value={tempFilters.toCity || ""}
            onChange={(e) => handleTempUpdate("toCity", e.target.value)}
            placeholder="Destination city"
            className="w-full px-3 py-2.5 bg-white transition-all duration-200"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          />
        </div>

        {/* Country */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Country
          </label>
          <input
            type="text"
            value={tempFilters.country || ""}
            onChange={(e) => handleTempUpdate("country", e.target.value)}
            placeholder="Country"
            className="w-full px-3 py-2.5 bg-white transition-all duration-200"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          />
        </div>

        {/* Price Range */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Price Range (₹)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={tempFilters.minPrice || ""}
              onChange={(e) => handleTempUpdate("minPrice", Number(e.target.value))}
              placeholder="Min"
              className="w-full px-3 py-2.5 bg-white transition-all duration-200"
              style={{
                border: "1px solid #d1d5db",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1d4350";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
              }}
            />
            <input
              type="number"
              value={tempFilters.maxPrice || ""}
              onChange={(e) => handleTempUpdate("maxPrice", Number(e.target.value))}
              placeholder="Max"
              className="w-full px-3 py-2.5 bg-white transition-all duration-200"
              style={{
                border: "1px solid #d1d5db",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1d4350";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
              }}
            />
          </div>
        </div>

        {/* Trip Styles */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Trip Styles
          </label>
          <select
            multiple
            value={tempFilters.tripStyles || []}
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              );
              handleTempUpdate("tripStyles", selected);
            }}
            className="w-full px-3 py-2.5 bg-white transition-all duration-200"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
              minHeight: "100px",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          >
            {tripStyleOptions.map((style) => (
              <option key={style} value={style} className="py-1">
                {style}
              </option>
            ))}
          </select>
        </div>

        {/* Creator Type */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Creator Type
          </label>
          <select
            value={tempFilters.creatorType || ""}
            onChange={(e) =>
              handleTempUpdate(
                "creatorType",
                e.target.value ? (e.target.value as any) : undefined,
              )
            }
            className="w-full px-3 py-2.5 bg-white transition-all duration-200 appearance-none cursor-pointer"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231d4350'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25em 1.25em",
              paddingRight: "2.5rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          >
            <option value="">All</option>
            {creatorTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Category (Package) */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Category
          </label>
          <select
            value={tempFilters.category || ""}
            onChange={(e) => handleTempUpdate("category", e.target.value)}
            className="w-full px-3 py-2.5 bg-white transition-all duration-200 appearance-none cursor-pointer"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231d4350'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25em 1.25em",
              paddingRight: "2.5rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          >
            <option value="">All</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Travel Mode (Trip) */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Travel Mode
          </label>
          <select
            value={tempFilters.travelMode || ""}
            onChange={(e) => handleTempUpdate("travelMode", e.target.value)}
            className="w-full px-3 py-2.5 bg-white transition-all duration-200 appearance-none cursor-pointer"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231d4350'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25em 1.25em",
              paddingRight: "2.5rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          >
            <option value="">All</option>
            {travelModeOptions.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Preference (Trip) */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Gender Preference
          </label>
          <select
            value={tempFilters.genderPreference || "ANY"}
            onChange={(e) =>
              handleTempUpdate(
                "genderPreference",
                e.target.value ? (e.target.value as any) : undefined,
              )
            }
            className="w-full px-3 py-2.5 bg-white transition-all duration-200 appearance-none cursor-pointer"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231d4350'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25em 1.25em",
              paddingRight: "2.5rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          >
            <option value="ANY">Any</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Languages (Trip) */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Languages
          </label>
          <select
            multiple
            value={tempFilters.languages || []}
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              );
              handleTempUpdate("languages", selected);
            }}
            className="w-full px-3 py-2.5 bg-white transition-all duration-200"
            style={{
              border: "1px solid #d1d5db",
              outline: "none",
              minHeight: "80px",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1d4350";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
            }}
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang} className="py-1">
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Age Range (Trip) */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Age Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min="18"
              value={tempFilters.minAge || ""}
              onChange={(e) => handleTempUpdate("minAge", Number(e.target.value))}
              placeholder="Min Age"
              className="w-full px-3 py-2.5 bg-white transition-all duration-200"
              style={{
                border: "1px solid #d1d5db",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1d4350";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
              }}
            />
            <input
              type="number"
              min="18"
              value={tempFilters.maxAge || ""}
              onChange={(e) => handleTempUpdate("maxAge", Number(e.target.value))}
              placeholder="Max Age"
              className="w-full px-3 py-2.5 bg-white transition-all duration-200"
              style={{
                border: "1px solid #d1d5db",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1d4350";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
              }}
            />
          </div>
        </div>

        {/* Date Range (Trip) */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Trip Dates
          </label>
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Start From
              </label>
              <input
                type="date"
                value={tempFilters.startDateFrom || ""}
                onChange={(e) => handleTempUpdate("startDateFrom", e.target.value)}
                className="w-full px-3 py-2.5 bg-white transition-all duration-200"
                style={{
                  border: "1px solid #d1d5db",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1d4350";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                }}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Start To
              </label>
              <input
                type="date"
                value={tempFilters.startDateTo || ""}
                onChange={(e) => handleTempUpdate("startDateTo", e.target.value)}
                className="w-full px-3 py-2.5 bg-white transition-all duration-200"
                style={{
                  border: "1px solid #d1d5db",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1d4350";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                }}
              />
            </div>
          </div>
        </div>

        {/* Duration Days (Package) */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#1d4350" }}
          >
            Duration (Days)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min="1"
              value={tempFilters.minDays || ""}
              onChange={(e) => handleTempUpdate("minDays", Number(e.target.value))}
              placeholder="Min Days"
              className="w-full px-3 py-2.5 bg-white transition-all duration-200"
              style={{
                border: "1px solid #d1d5db",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1d4350";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
              }}
            />
            <input
              type="number"
              min="1"
              value={tempFilters.maxDays || ""}
              onChange={(e) => handleTempUpdate("maxDays", Number(e.target.value))}
              placeholder="Max Days"
              className="w-full px-3 py-2.5 bg-white transition-all duration-200"
              style={{
                border: "1px solid #d1d5db",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1d4350";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer with Action Buttons */}
      <div
        className="p-4 space-y-2"
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        {/* Apply Filter Button */}
        <button
          onClick={applyFilters}
          className="w-full py-3 text-white font-semibold transition-all duration-200 hover:opacity-90"
          style={{
            backgroundColor: "#1d4350",
          }}
        >
          Apply Filters
        </button>

        {/* Reset Button */}
        <button
          onClick={() => {
            resetFilters();
            setTempFilters({});
          }}
          className="w-full py-3 font-medium transition-all duration-200"
          style={{
            backgroundColor: "#e5e7eb",
            color: "#374151",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d1d5db";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#e5e7eb";
          }}
        >
          Reset All Filters
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5e7eb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1d4350;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2d5360;
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;