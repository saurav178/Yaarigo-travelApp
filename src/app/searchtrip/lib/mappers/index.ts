import type { ApiTripResponse, ApiPackageResponse, Trip, PackageDisplay, ApiTrip, ApiPackage } from '../../types/types';

/**
 * Maps API trip response to internal Trip format
 */
export const mapApiTripToTrip = (apiTrip: ApiTrip): Trip => {
  const startDate = new Date(apiTrip.startDate);
  const endDate = new Date(apiTrip.endDate);

  // Determine host category based on creatorType
  let hostCategory: 'Travel Enthusiast' | 'Featured Trip Agency' | 'Featured Trip Leader' = 'Travel Enthusiast';
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
    price: `₹${0}`,
    date: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
    spotsLeft: apiTrip.totalSeats - (apiTrip.bookedSeats || 0),
    host: {
      name: apiTrip.toLocation?.name || 'Unknown Host',
      minAge: apiTrip.partnerPreferences.ageRange?.min || 30,
      MaxAge: apiTrip.partnerPreferences.ageRange?.min || 30,
      location: apiTrip.fromLocation?.city || 'Unknown',
      rating: 4.5,
      match: 85,
      safeScore: 90,
      category: hostCategory,
    },
    image: apiTrip.gallery?.[0] || '/default-trip.jpg',
  };
};

/**
 * Maps API package response to internal Package format
 */
export const mapApiPackageToDisplay = (apiPackage: ApiPackage): PackageDisplay => {
  const plans =apiPackage.plans ||  [];

  // Find the lowest price from all plans
  let lowestPrice = 0;
  if (plans.length > 0) {
    const prices = plans
      .map((p) => p.discountedPrice || p.pricePerPerson || 0)
      .filter((p: number) => p > 0);
    lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
  }

  // Determine host category based on creatorType
  let hostCategory: 'Travel Enthusiast' | 'Featured Trip Agency' | 'Featured Trip Leader' = 'Travel Enthusiast';
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
    lowestPrice: lowestPrice || 0,
    host: {
      name: apiPackage.toLocation?.name || 'Unknown Host',
      verified: false,
      location: apiPackage.fromLocation?.city || 'Unknown',
      rating: 4.7,
      match: 90, // Default for packages
      safeScore: 95, // Default for packages
      category: hostCategory,
    },
  };
};



// import type {
//   ApiTripResponse,
//   ApiPackageResponse,
// } from "../../types/types";
// import type { Trip } from "../types/trip";
// import type { PackageDisplay } from "../types/package";

// function getHostCategory(type?: string): string {
//   if (type === "AGENCY") return "Featured Trip Agency";
//   if (type === "LEADER") return "Featured Trip Leader";
//   return "Travel Enthusiast";
// }

// export const mapApiTripToTrip = (
//   apiTrip: ApiTripResponse
// ): Trip => {
//   const start = apiTrip.startDate ? new Date(apiTrip.startDate) : null;
//   const end = apiTrip.endDate ? new Date(apiTrip.endDate) : null;

//   const duration =
//     start && end
//       ? Math.ceil((end.getTime() - start.getTime()) / 86400000)
//       : 0;

//   const booked = apiTrip.bookedSeats ?? 0;
//   const totalSeats = apiTrip.totalSeats ?? 0;
//   const spotsLeft = Math.max(totalSeats - booked, 0);

//   return {
//     id: apiTrip._id,
//     title: apiTrip.title ?? "Untitled Trip",
//     description: apiTrip.description ?? "",
//     tags: apiTrip.tripStyles ?? [],
//     from: apiTrip.fromLocation?.city ?? "Unknown",
//     to: apiTrip.toLocation?.city ?? "Unknown",
//     duration,
//     dateRange:
//       start && end
//         ? `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
//         : "TBA",
//     totalPrice: apiTrip.totalPrice ?? 0,
//     spotsLeft,
//     host: {
//       name: apiTrip.createdBy?.name ?? "Unknown Host",
//       age: apiTrip.createdBy?.age ?? 30,
//       verified: apiTrip.createdBy?.verified ?? false,
//       location: apiTrip.fromLocation?.city ?? "Unknown",
//       rating: apiTrip.createdBy?.rating ?? 4.5,
//       match: apiTrip.matchPercentage ?? 85,
//       safeScore: apiTrip.safetyScore ?? 90,
//       category: getHostCategory(apiTrip.creatorType),
//     },
//     image: apiTrip.gallery?.[0] ?? "/default-trip.jpg",
//     category: apiTrip.category,
//     tripStyles: apiTrip.tripStyles ?? [],
//     partnerPreferences: apiTrip.partnerPreferences,
//   };
// };

// export const mapApiPackageToDisplay = (
//   apiPackage: ApiPackageResponse
// ): PackageDisplay => {
//   const prices =
//     apiPackage.plans
//       ?.map(
//         (p) => p.discountedPrice ?? p.pricePerPerson ?? 0
//       )
//       .filter((p) => p > 0) ?? [];

//   return {
//     id: apiPackage._id,
//     title: apiPackage.title ?? "Package Trip",
//     description: apiPackage.description ?? "",
//     tags: apiPackage.tripStyles ?? [],
//     from: apiPackage.fromLocation?.city ?? "Unknown",
//     to: apiPackage.toLocation?.city ?? "Unknown",
//     totalDays: apiPackage.totalDays ?? 0,
//     totalNights: apiPackage.totalNights ?? 0,
//     plans: apiPackage.plans ?? [],
//     tripStyles: apiPackage.tripStyles ?? [],
//     lowestPrice: prices.length ? Math.min(...prices) : 0,
//     host: {
//       name: apiPackage.createdBy?.name ?? "Unknown Host",
//       age: apiPackage.createdBy?.age ?? 35,
//       verified: apiPackage.createdBy?.verified ?? false,
//       location: apiPackage.fromLocation?.city ?? "Unknown",
//       rating: apiPackage.createdBy?.rating ?? 4.7,
//       match: 90,
//       safeScore: 95,
//       category: getHostCategory(apiPackage.creatorType),
//     },
//   };
// };
