// import { useState, useCallback } from "react";
// import { CombinedFilters } from "../types/combinedFilters";

// const INITIAL_FILTERS: CombinedFilters = {
//   page: 1,
//   limit: 10,

//   keyword: undefined,
//   fromCity: undefined,
//   toCity: undefined,
//   country: undefined,

//   minPrice: undefined,
//   maxPrice: undefined,

//   tripStyles: [],

//   category: undefined,
//   creatorType: undefined,

//   travelMode: undefined,
//   languages: [],

//   minAge: undefined,
//   maxAge: undefined,

//   startDateFrom: undefined,
//   startDateTo: undefined,

//   minDays: undefined,
//   maxDays: undefined,

//   activeFilter: "all",
// };

// export function useCombinedFilters() {
//  const [filters, setFilters] = useState<CombinedFilters>({
//     page: 1,
//     limit: 10,
//     ...initial,
//   });
//   const updateFilter = useCallback(
//     <K extends keyof CombinedFilters>(
//       key: K,
//       value: CombinedFilters[K]
//     ) => {
//       setFilters((prev) => ({
//         ...prev,
//         [key]: value,
//         page: key === "page" ? value as number : 1, // 🔥 logical fix
//       }));
//     },
//     []
//   );

//   const resetFilters = useCallback(() => {
//     setFilters(INITIAL_FILTERS);
//   }, []);

//   return {
//     filters,
//     updateFilter,
//     resetFilters,
//     setFilters, // exposed only if absolutely needed
//   };
// }



import { useState, useCallback } from "react";
import { CombinedFilters } from "../types/combinedFilters";

const INITIAL_FILTERS: CombinedFilters = {
  page: 1,
  limit: 10,

  keyword: undefined,
  fromCity: undefined,
  toCity: undefined,
  country: undefined,

  minPrice: undefined,
  maxPrice: undefined,

  tripStyles: [],

  category: undefined,
  creatorType: undefined,

  travelMode: undefined,
  languages: [],

  minAge: undefined,
  maxAge: undefined,

  startDateFrom: undefined,
  startDateTo: undefined,

  minDays: undefined,
  maxDays: undefined,

  activeFilter: "all",
};

export function useCombinedFilters(
  initial?: Partial<CombinedFilters>
) {
  const [filters, setFilters] = useState<CombinedFilters>({
    ...INITIAL_FILTERS,
    ...initial, // ✅ now this exists
  });

  const updateFilter = useCallback(
    <K extends keyof CombinedFilters>(
      key: K,
      value: CombinedFilters[K]
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        page: key === "page" ? (value as number) : 1, // reset page on filter change
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      ...INITIAL_FILTERS,
      ...initial, // reset but keep URL params if any
    });
  }, [initial]);

  return {
    filters,
    updateFilter,
    resetFilters,
    setFilters,
  };
}
