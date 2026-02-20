import type { TripFilterPayload } from '../../types/types';
export const mapTripFiltersToQuery = (filters: TripFilterPayload) => {
  const q: Record<string, string> = {};
  const query = new URLSearchParams();


  if (filters.page) q.page = String(filters.page);
  if (filters.limit) q.limit = String(filters.limit);
  if (filters.keyword) q.keyword = filters.keyword;
  if (filters.fromCity) q.fromCity = filters.fromCity;
  if (filters.toCity) q.toCity = filters.toCity;
  if (filters.creatorType) q.creatorType = filters.creatorType;
  if (filters.travelMode) q.travelMode = filters.travelMode;
  if (filters.genderPreference) q.genderPreference = filters.genderPreference;
  
  // FIX: Send languages as array format
 if (filters.languages?.length) {
  filters.languages.forEach(lang => {
    query.append('languages', lang);
  });
}
  
   if (filters.tripStyles?.length) {
  filters.tripStyles.forEach(style => {
    query.append('partnerPreferences.tripStyles', style);
  });
}

  
  if (filters.minPrice) q.minPrice = String(filters.minPrice);
  if (filters.maxPrice) q.maxPrice = String(filters.maxPrice);
  if (filters.startDateFrom) q.startDateFrom = filters.startDateFrom;
  if (filters.startDateTo) q.startDateTo = filters.startDateTo;

  return q;
};