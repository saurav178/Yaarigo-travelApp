// src/app/searchtrip/lib/mappers/packageFilterMapper.ts
export const mapApiPackageToDisplay = (filters: any) => {
  const payload: Record<string, any> = {};
  
  // Only add defined values
  if (filters.page) payload.page = filters.page;
  if (filters.limit) payload.limit = filters.limit;
  if (filters.keyword) payload.keyword = filters.keyword;
  if (filters.fromCity) payload.fromCity = filters.fromCity;
  if (filters.toCity) payload.toCity = filters.toCity;
  if (filters.country) payload.country = filters.country;
  if (filters.creatorType) payload.creatorType = filters.creatorType;
  if (filters.category) payload.category = filters.category;
  if (filters.tripStyles?.length) payload.tripStyles = filters.tripStyles.join(',');
  if (filters.minDays) payload.minDays = filters.minDays;
  if (filters.maxDays) payload.maxDays = filters.maxDays;
  if (filters.minPrice) payload.minPrice = filters.minPrice;
  if (filters.maxPrice) payload.maxPrice = filters.maxPrice;
  
  // Default values
  payload.status = 'PUBLISHED';
  payload.active = true;
  payload.currency = 'INR';
  payload.minSlotsAvailable = 1;
  
  return payload;
};