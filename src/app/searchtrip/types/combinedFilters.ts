// Combined filter types for both Trips and Packages

export type CombinedFilterPayload = {
  // Search
  query: string;

  // Person-related
  age: number;

  // Duration & Travel
  duration: number;
  travelMode?: string; // GROUP, SOLO, COUPLE, etc.

  // Budget & Price
  budget: number;
  priceRange?: {
    min: number;
    max: number;
  };

  // Trip Styles/Interests
  tripStyles?: string[]; // e.g., ["adventure", "mountain", "backpacking"]
  interest?: string;

  // Preferences
  tripType?: string;
  foodPref?: string;
  gender?: string;
  costPreference?: string;
  languages?: string[];

  // Location
  fromLocation?: string;
  toLocation?: string;

  // Rating & Safety
  minRating: number;
  minSafeScore: number;
  matchPercent: number;
  scorePercent: number;

  // Package-specific
  category?: string; // COUPLE, SOLO, FAMILY, GROUP
  totalDays?: number;
  totalNights?: number;
  creatorType?: string; // AGENCY, LEADER
};

export type AvailableFilters = {
  // Trip search filters
  fromCities?: string[];
  toCities?: string[];
  genders?: string[];
  travelModes?: string[];
  costPreferences?: string[];
  languages?: string[];
  categories?: string[];
  tripStyles?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  budgetRange?: {
    min: number;
    max: number;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  durationRange?: {
    min: number;
    max: number;
  };
  availableSeatsRange?: {
    min: number;
    max: number;
  };

  // Package search filters
  fromLocations?: string[];
  toLocations?: string[];
  totalDays?: number[];
  totalNights?: number[];
  creatorTypes?: string[];
};

// Combined available filters from both sources
export type MergedAvailableFilters = {
  locations?: string[]; // Combined from cities
  tripStyles?: string[];
  travelModes?: string[];
  categories?: string[];
  languages?: string[];
  genders?: string[];
  costPreferences?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  durationRange?: {
    min: number;
    max: number;
  };
  ageRange?: {
    min: number;
    max: number;
  };
  budgetRange?: {
    min: number;
    max: number;
  };
  creatorTypes?: string[];
  totalDays?: number[];
  totalNights?: number[];
};
