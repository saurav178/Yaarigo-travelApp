// types

export type HostCategory = "Travel Enthusiast" | "Featured Trip Leader" | "Featured Trip Agency";

export type Host = {
  name: string;
  age: number;
  verified: boolean;
  location: string;
  rating: number;
  match: number;
  safeScore: number;
  category: HostCategory;
};

export type Trip = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  from: string;
  to: string;
  travelersNeeded: number;
  price: string;
  date: string;
  spotsLeft: number;
  host: Host;
  image: string;
};

export type SimilarTrip = Trip & {
  interest?: string[];
  tripType?: string[];
  foodPref?: string[];
};

export type Leader = Trip & {
  interest?: string[];
  tripType?: string[];
  foodPref?: string[];
};

export type Agency = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  from: string;
  to: string;
  travelersNeeded: number;
  verified: boolean;
  price: string;
  date: string;
  spotsLeft: number;
  stats: {
    travelersEnrolled: string;
    tripsCompleted: string;
    yearsInBusiness: string;
  };
  host: Host;
  image: string;
};

export type FilterPayload = {
  query: string;
  age: number;
  duration: number;
  budget: number;
  minRating: number;
  minSafeScore: number;
  matchPercent: number;
  scorePercent: number;
  interest: string;
  tripType: string;
  foodPref: string;
};

// API Response Types
export interface ApiTripResponse {
  _id: string;
  title: string;
  description: string;
  category: string;
  tripStyles: string[];
  createdBy: {
    name: string;
    age: number;
    verified: boolean;
    rating: number;
  };
  creatorType: 'AGENCY' | 'LEADER' | 'USER';
  startDate: string;
  endDate: string;
  fromLocation: {
    city: string;
    country: string;
  };
  toLocation: {
    city: string;
    country: string;
  };
  totalSeats: number;
  bookedSeats: number;
  totalPrice?: number;
  gallery: string[];
  partnerPreferences?: {
    ageRange: { min: number; max: number };
    travelMode: string;
  };
  matchPercentage?: number;
  safetyScore?: number;
}

export interface ApiPackageResponse {
  _id: string;
  title: string;
  description: string;
  totalDays: number;
  totalNights: number;
  tripStyles: string[];
  fromLocation: {
    city: string;
  };
  toLocation: {
    city: string;
  };
  plans: Array<{
    name: string;
    category: string;
    discountedPrice: number;
    pricePerPerson: number;
  }>;
  createdBy: {
    name: string;
    age: number;
    verified: boolean;
    rating: number;
  };
  creatorType: string;
}
