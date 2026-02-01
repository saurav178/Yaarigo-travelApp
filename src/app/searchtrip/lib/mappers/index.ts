import type { ApiTripResponse, ApiPackageResponse } from '../../types/types';

/**
 * Maps API trip response to internal Trip format
 */
export const mapApiTripToTrip = (apiTrip: ApiTripResponse): any => {
  const startDate = new Date(apiTrip.startDate);
  const endDate = new Date(apiTrip.endDate);
  const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

  // Determine host category based on creatorType
  let hostCategory = 'Travel Enthusiast';
  if (apiTrip.creatorType === 'AGENCY') hostCategory = 'Featured Trip Agency';
  if (apiTrip.creatorType === 'LEADER') hostCategory = 'Featured Trip Leader';

  return {
    id: apiTrip._id,
    title: apiTrip.title || 'Untitled Trip',
    description: apiTrip.description || '',
    tags: apiTrip.tripStyles || [],
    from: apiTrip.fromLocation?.city || 'Unknown',
    to: apiTrip.toLocation?.city || 'Unknown',
    travelersNeeded: apiTrip.totalSeats - (apiTrip.bookedSeats || 0),
    price: `₹${apiTrip.totalPrice || 0}`,
    date: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
    spotsLeft: apiTrip.totalSeats - (apiTrip.bookedSeats || 0),
    host: {
      name: apiTrip.createdBy?.name || 'Unknown Host',
      age: apiTrip.createdBy?.age || 30,
      verified: apiTrip.createdBy?.verified || false,
      location: apiTrip.fromLocation?.city || 'Unknown',
      rating: apiTrip.createdBy?.rating || 4.5,
      match: apiTrip.matchPercentage || 85,
      safeScore: apiTrip.safetyScore || 90,
      category: hostCategory,
    },
    image: apiTrip.gallery?.[0] || '/default-trip.jpg',
    duration: durationDays,
    totalPrice: apiTrip.totalPrice || 0,
    category: apiTrip.category,
    tripStyles: apiTrip.tripStyles || [],
    partnerPreferences: apiTrip.partnerPreferences,
  };
};

/**
 * Maps API package response to internal Package format
 */
export const mapApiPackageToDisplay = (apiPackage: ApiPackageResponse): any => {
  const plans = apiPackage.plans || [];

  // Find the lowest price from all plans
  let lowestPrice = 0;
  if (plans.length > 0) {
    const prices = plans
      .map((p: { discountedPrice: any; pricePerPerson: any; }) => p.discountedPrice || p.pricePerPerson || 0)
      .filter((p: number) => p > 0);
    lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
  }

  // Determine host category based on creatorType
  let hostCategory = 'Travel Enthusiast';
  if (apiPackage.creatorType === 'AGENCY') hostCategory = 'Featured Trip Agency';
  if (apiPackage.creatorType === 'LEADER') hostCategory = 'Featured Trip Leader';

  return {
    id: apiPackage._id,
    title: apiPackage.title || 'Package Trip',
    description: apiPackage.description || '',
    tags: apiPackage.tripStyles || [],
    from: apiPackage.fromLocation?.city || 'Unknown',
    to: apiPackage.toLocation?.city || 'Unknown',
    totalDays: apiPackage.totalDays || 0,
    totalNights: apiPackage.totalNights || 0,
    plans: apiPackage.plans || [],
    tripStyles: apiPackage.tripStyles || [],
    fromLocation: apiPackage.fromLocation,
    toLocation: apiPackage.toLocation,
    lowestPrice: lowestPrice,
    host: {
      name: apiPackage.createdBy?.name || 'Unknown Host',
      age: apiPackage.createdBy?.age || 35,
      verified: apiPackage.createdBy?.verified || false,
      location: apiPackage.fromLocation?.city || 'Unknown',
      rating: apiPackage.createdBy?.rating || 4.7,
      match: 90, // Default for packages
      safeScore: 95, // Default for packages
      category: hostCategory,
    },
  };
};
