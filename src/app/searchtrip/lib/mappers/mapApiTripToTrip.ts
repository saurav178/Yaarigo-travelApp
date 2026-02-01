// src/app/searchtrip/lib/mappers/tripFilterMapper.ts
export const mapApiTripToTrip = (filters: any) => {
  const payload: Record<string, any> = {};
  
  // Only add defined values
  if (filters.page) payload.page = filters.page;
  if (filters.limit) payload.limit = filters.limit;
  if (filters.keyword) payload.keyword = filters.keyword;
  if (filters.fromCity) payload.fromCity = filters.fromCity;
  if (filters.toCity) payload.toCity = filters.toCity;
  if (filters.creatorType) payload.creatorType = filters.creatorType;
  if (filters.travelMode) payload.travelMode = filters.travelMode;
  if (filters.gender) payload.genderPreference = filters.gender;
  if (filters.languages?.length) payload.languages = filters.languages.join(',');
  if (filters.tripStyles?.length) payload.tripStyles = filters.tripStyles.join(',');
  if (filters.minAge) payload.minAge = filters.minAge;
  if (filters.maxAge) payload.maxAge = filters.maxAge;
  if (filters.minPrice) payload.minBudget = filters.minPrice;
  if (filters.maxPrice) payload.maxBudget = filters.maxPrice;
  if (filters.startDateFrom) payload.startDateFrom = filters.startDateFrom;
  if (filters.startDateTo) payload.startDateTo = filters.startDateTo;
  
  // Default values
  payload.intent = 'COMMERCIAL';
  payload.visibility = 'PUBLIC';
  payload.minSeatsAvailable = 1;
  
  return payload;
};