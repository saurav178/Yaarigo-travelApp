export interface CombinedFilters {
  // Pagination
  page: number;
  limit: number;

  // Search
  keyword?: string;
  fromCity?: string;
  toCity?: string;
  country?: string;

  // Pricing
  minPrice?: number;
  maxPrice?: number;

  // Common
  

  // Package specific
  creatorType?: "AGENCY" | "LEADER" | "HOST" | "GUIDE" | "TRIP_LEADER" | "INDIVIDUAL";
  category?: string;
  minDays?: number;
  maxDays?: number;
  currency?: string;

  // Trip specific
  travelMode?: string;
  languages?: string[];
  minAge?: number;
  maxAge?: number;
  startDateFrom?: string;
  startDateTo?: string;
  genderPreference?: string;

  // UI-only (not sent to API)
  activeFilter?: "all" | "best" | "agency" | "leader";
}



// // types/combinedFilters.ts

// /** -----------------------------
//  *  Base / Shared Filters
//  *  ----------------------------- */
// interface PaginationFilters {
//   page: number;
//   limit: number;
// }

// interface PriceFilters {
//   minPrice?: number;
//   maxPrice?: number;
// }

// interface LocationFilters {
//   fromCity?: string;
//   toCity?: string;
//   country?: string;
// }

// interface CommonFilters {
//   keyword?: string;
//   tripStyles?: string[];
// }

// /** -----------------------------
//  *  Trip-specific Filters
//  *  ----------------------------- */
// interface TripFilters {
//   travelMode?: string;
//   languages?: string[];
//   minAge?: number;
//   maxAge?: number;
//   startDateFrom?: string;
//   startDateTo?: string;

//   // backend expects this, NOT "gender"
//   genderPreference?: string;
// }

// /** -----------------------------
//  *  Package-specific Filters
//  *  ----------------------------- */
// interface PackageFilters {
//   category?: string;
//   minDays?: number;
//   maxDays?: number;
//   currency?: string;
// }

// /** -----------------------------
//  *  Creator / Ownership
//  *  ----------------------------- */
// type CreatorType = "AGENCY" | "LEADER";

// /** -----------------------------
//  *  UI-only Filters (NEVER sent to API)
//  *  ----------------------------- */
// interface UIFilters {
//   activeFilter?: "all" | "best" | "agency" | "leader";
// }

// /** -----------------------------
//  *  Combined Filters (FINAL)
//  *  ----------------------------- */
// export interface CombinedFilters
//   extends PaginationFilters,
//     PriceFilters,
//     LocationFilters,
//     CommonFilters,
//     TripFilters,
//     PackageFilters,
//     UIFilters {
//   creatorType?: CreatorType;
// }
