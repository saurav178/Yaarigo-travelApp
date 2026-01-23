// Utility functions for combined filters

import type { AvailableFilters, MergedAvailableFilters } from "../types/combinedFilters";

/**
 * Merges available filters from both trip and package API responses
 */
export const mergeAvailableFilters = (
  tripFilters: AvailableFilters,
  packageFilters: AvailableFilters
): MergedAvailableFilters => {
  // Merge locations
  const fromLocations = new Set([
    ...(tripFilters.fromCities || []),
    ...(packageFilters.fromLocations || []),
  ]);
  const toLocations = new Set([
    ...(tripFilters.toCities || []),
    ...(packageFilters.toLocations || []),
  ]);

  // Combine all unique locations
  const allLocations = new Set([...fromLocations, ...toLocations]);

  // Merge trip styles
  const tripStyles = new Set([
    ...(tripFilters.tripStyles || []),
    ...(packageFilters.tripStyles || []),
  ]);

  // Merge travel modes
  const travelModes = new Set(tripFilters.travelModes || []);

  // Merge categories
  const categories = new Set([
    ...(tripFilters.categories || []),
    ...(packageFilters.categories || []),
  ]);

  // Merge languages
  const languages = new Set(tripFilters.languages || []);

  // Merge genders
  const genders = new Set(tripFilters.genders || []);

  // Merge cost preferences
  const costPreferences = new Set(tripFilters.costPreferences || []);

  // Merge creator types
  const creatorTypes = new Set(packageFilters.creatorTypes || []);

  // Merge price range (take the broader range)
  const tripPriceRange = tripFilters.priceRange;
  const packagePriceRange = packageFilters.priceRange;
  const mergedPriceRange =
    tripPriceRange && packagePriceRange
      ? {
          min: Math.min(tripPriceRange.min, packagePriceRange.min),
          max: Math.max(tripPriceRange.max, packagePriceRange.max),
        }
      : tripPriceRange || packagePriceRange;

  // Merge duration range
  const mergedDurationRange = tripFilters.durationRange;

  // Merge age range
  const mergedAgeRange = tripFilters.ageRange;

  // Merge budget range
  const mergedBudgetRange = tripFilters.budgetRange;

  // Get total days and nights from packages
  const totalDays = packageFilters.totalDays || [];
  const totalNights = packageFilters.totalNights || [];

  return {
    locations: Array.from(allLocations).filter(Boolean),
    tripStyles: Array.from(tripStyles).filter(Boolean),
    travelModes: Array.from(travelModes).filter(Boolean),
    categories: Array.from(categories)
      .filter(Boolean)
      .filter((c) => c !== null),
    languages: Array.from(languages).filter(Boolean),
    genders: Array.from(genders).filter(Boolean),
    costPreferences: Array.from(costPreferences).filter(Boolean),
    creatorTypes: Array.from(creatorTypes).filter(Boolean),
    priceRange: mergedPriceRange,
    durationRange: mergedDurationRange,
    ageRange: mergedAgeRange,
    budgetRange: mergedBudgetRange,
    totalDays,
    totalNights,
  };
};

/**
 * Filters trips based on combined filter criteria
 */
export const filterTrips = (trips: any[], filterCriteria: any): any[] => {
  return trips.filter((trip) => {
    // Price filter
    if (filterCriteria.priceRange) {
      const tripPrice = trip.totalPrice || 0;
      if (
        tripPrice < filterCriteria.priceRange.min ||
        tripPrice > filterCriteria.priceRange.max
      ) {
        return false;
      }
    }

    // Trip styles filter
    if (filterCriteria.tripStyles && filterCriteria.tripStyles.length > 0) {
      const tripStyles = trip.tripStyles || [];
      const hasMatchingStyle = filterCriteria.tripStyles.some((style: string) =>
        tripStyles.includes(style)
      );
      if (!hasMatchingStyle) return false;
    }

    // Location filter
    if (filterCriteria.fromLocation) {
      const tripFrom = trip.fromLocation?.city || trip.from || "";
      if (!tripFrom.toLowerCase().includes(filterCriteria.fromLocation.toLowerCase())) {
        return false;
      }
    }

    if (filterCriteria.toLocation) {
      const tripTo = trip.toLocation?.city || trip.to || "";
      if (!tripTo.toLowerCase().includes(filterCriteria.toLocation.toLowerCase())) {
        return false;
      }
    }

    // Duration filter
    if (filterCriteria.duration) {
      const tripDuration = trip.duration || 0;
      if (tripDuration < filterCriteria.duration) {
        return false;
      }
    }

    // Age range filter
    if (filterCriteria.age && trip.partnerPreferences?.ageRange) {
      const { min, max } = trip.partnerPreferences.ageRange;
      if (filterCriteria.age < min || filterCriteria.age > max) {
        return false;
      }
    }

    // Travel mode filter
    if (filterCriteria.travelMode) {
      const tripTravelMode = trip.partnerPreferences?.travelMode || "";
      if (tripTravelMode !== filterCriteria.travelMode) {
        return false;
      }
    }

    // Gender preference filter
    if (filterCriteria.gender) {
      const tripGender = trip.partnerPreferences?.genderPreference || "ANY";
      if (tripGender !== "ANY" && tripGender !== filterCriteria.gender) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Filters packages based on combined filter criteria
 */
export const filterPackages = (packages: any[], filterCriteria: any): any[] => {
  return packages.filter((pkg) => {
    // Price filter - check all plans
    if (filterCriteria.priceRange && pkg.plans && pkg.plans.length > 0) {
      const hasAffordablePlan = pkg.plans.some((plan: any) => {
        const price = plan.discountedPrice || plan.pricePerPerson || 0;
        return (
          price >= filterCriteria.priceRange.min &&
          price <= filterCriteria.priceRange.max
        );
      });
      if (!hasAffordablePlan) return false;
    }

    // Trip styles filter
    if (filterCriteria.tripStyles && filterCriteria.tripStyles.length > 0) {
      const pkgStyles = pkg.tripStyles || [];
      const hasMatchingStyle = filterCriteria.tripStyles.some((style: string) =>
        pkgStyles.includes(style)
      );
      if (!hasMatchingStyle) return false;
    }

    // Location filter
    if (filterCriteria.fromLocation) {
      const pkgFrom = pkg.fromLocation?.city || "";
      if (!pkgFrom.toLowerCase().includes(filterCriteria.fromLocation.toLowerCase())) {
        return false;
      }
    }

    if (filterCriteria.toLocation) {
      const pkgTo = pkg.toLocation?.city || "";
      if (!pkgTo.toLowerCase().includes(filterCriteria.toLocation.toLowerCase())) {
        return false;
      }
    }

    // Total days filter
    if (filterCriteria.totalDays) {
      if (pkg.totalDays !== filterCriteria.totalDays) {
        return false;
      }
    }

    // Total nights filter
    if (filterCriteria.totalNights) {
      if (pkg.totalNights !== filterCriteria.totalNights) {
        return false;
      }
    }

    // Category filter
    if (filterCriteria.category && pkg.plans && pkg.plans.length > 0) {
      const hasCategory = pkg.plans.some(
        (plan: any) => plan.category === filterCriteria.category
      );
      if (!hasCategory) return false;
    }

    // Creator type filter
    if (filterCriteria.creatorType) {
      if (pkg.creatorType !== filterCriteria.creatorType) {
        return false;
      }
    }

    return true;
  });
};
