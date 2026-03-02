import type { TripFilterPayload } from '../../types/types';
export const mapTripFiltersToQuery = (filters: TripFilterPayload) => {
  const q: Record<string, string | string[]> = {};

  if (filters.page) q.page = String(filters.page);
  if (filters.limit) q.limit = String(filters.limit);
  if (filters.keyword) q.keyword = filters.keyword;
  if (filters.fromCity) q.fromCity = filters.fromCity;
  if (filters.toCity) q.toCity = filters.toCity;
  // ❌ creatorType NOT supported by trips API
  if (filters.travelMode) q.travelMode = filters.travelMode;
  if (filters.genderPreference) q.genderPreference = filters.genderPreference;
  
  // ❌ languages NOT supported by trips API - removed
  
  // tripStyles removed from query parameters per request

  if (filters.minPrice) q.minPrice = String(filters.minPrice);
  if (filters.maxPrice) q.maxPrice = String(filters.maxPrice);
  if (filters.startDateFrom) q.startDateFrom = filters.startDateFrom;
  if (filters.startDateTo) q.startDateTo = filters.startDateTo;

  return q;
};