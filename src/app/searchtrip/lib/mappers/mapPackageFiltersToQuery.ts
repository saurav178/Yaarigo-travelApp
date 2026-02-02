export const mapPackageFiltersToQuery = (filters: any) => {
  const q: Record<string, string> = {};

  if (filters.page) q.page = String(filters.page);
  if (filters.limit) q.limit = String(filters.limit);
  if (filters.keyword) q.keyword = filters.keyword;
  if (filters.fromCity) q.fromCity = filters.fromCity;
  if (filters.toCity) q.toCity = filters.toCity;
  if (filters.creatorType) q.creatorType = filters.creatorType;
  if (filters.tripStyles?.length) q.tripStyles = filters.tripStyles.join(",");
  if (filters.minPrice) q.minPrice = String(filters.minPrice);
  if (filters.maxPrice) q.maxPrice = String(filters.maxPrice);
  if (filters.minDays) q.minDays = String(filters.minDays);
  if (filters.maxDays) q.maxDays = String(filters.maxDays);

  return q;
};
