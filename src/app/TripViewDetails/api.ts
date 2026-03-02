// src/app/TripViewDetails/api.ts

import { config } from "@/config";

export const BASE_URL = config.BASE_URL;

// ---------- Common Response Handler ----------

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorText = await res.text();
    // console.error("API Error:", errorText);
    throw new Error("API request failed");
  }
  return res.json();
};

// ---------- Interfaces ----------

export interface Location {
  name?: string;
  city?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface AgeRange {
  min?: number;
  max?: number;
}

export interface Budget {
  min?: number;
  max?: number;
}

export interface PartnerPreferences {
  ageRange?: AgeRange;
  budget?: Budget;
  genderPreference?: string;
  languages?: string[];
  tripStyles?: string[];
  travelMode?: string;
  costPreference?: string;
  safetyRating?: number;
  safetyInfo?: string;
  verifiedTravelers?: boolean;
  _id?: string;
}

export interface Package {
  name?: string;
  price?: number;
  inclusions?: string[];
  exclusions?: string[];
}

/**
 * 🔥 Added proper CancellationPolicy interface
 */
export interface CancellationPolicy {
  description?: string;
  freeCancellationDays?: number;
  refundable?: boolean;
}

/**
 * ✅ Updated Commitments interface
 */
export interface Commitments {
  mustDeliver?: string[];
  bestEffort?: string[];
  cancellationPolicy?: CancellationPolicy;
  _id?: string;
}

export interface DayPlan {
  _id?: string;
  dayTitle?: string;
  summary?: string;
  activities?: string[];
  blocks?: Record<string, unknown>[]; // ✅ fixed
  location?: string | Location;
  startTime?: string;
}

export interface TripData {
  _id: string;
  title?: string;
  description?: string;
  leaderId?: string;
  category?: string;
  tripStyles?: string[];
  createdBy?: string;
  creatorType?: string;
  organizationId?: string;
  intent?: string;
  visibility?: string;
  startDate?: string;
  endDate?: string;
  fromLocation?: Location;
  toLocation?: Location;
  totalSeats?: number;
  bookedSeats?: number;
  status?: string;
  itinerary?: DayPlan[];
  packages?: Package[];
  inclusions?: string[];
  exclusions?: string[];
  commitments?: Commitments;
  joinRequests?: any[];
  partnerPreferences?: PartnerPreferences;
  gallery?: string[];
  videos?: string[];
  seoKeywords?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  ogImage?: string;
  seoDescription?: string;
  seoTitle?: string;
  slug?: string;
  coverImage?: string;
}

// ---------- Leader Interfaces ----------

export interface LeaderData {
  _id?: string;
  fullName?: string;
  name?: string;
  profileImage?: string;
  avatar?: string;
  rating?: number;
  safetyScore?: number;
}

// ---------- Traveler Interfaces ----------

export interface Traveler {
  _id?: string;
  name?: string;
  fullName?: string;
  profileImage?: string;
  avatar?: string;
  rating?: number;
  safetyScore?: number;
}

// ---------- API Functions ----------

/**
 * Fetch trip details
 */
export const fetchTripById = async (
  tripId: string
): Promise<TripData> => {
  const res = await fetch(`${BASE_URL}/trips/${tripId}`);
  const json = await handleResponse(res);
  return json?.data || json;
};

/**
 * Fetch joined travelers
 */
export const fetchJoinedTravelers = async (
  tripId: string
): Promise<Traveler[]> => {
  const trip = await fetchTripById(tripId);

  if (!Array.isArray(trip.joinRequests)) return [];

  return trip.joinRequests.map((req: any) => ({
    _id: req?._id,
    fullName: req?.user?.fullName || req?.user?.name || "Traveler",
    profileImage: req?.user?.avatar || req?.user?.profileImage,
    rating: req?.user?.rating,
    safetyScore: req?.user?.safetyScore,
  }));
};

/**
 * Fetch leader details
 */
export const fetchLeaderById = async (
  leaderId: string
): Promise<LeaderData> => {
  const res = await fetch(`${BASE_URL}/leaders/${leaderId}`);
  const json = await handleResponse(res);
  return json?.data || json;
};

/**
 * Fetch itinerary separately
 */
export const fetchItineraryByTripId = async (
  tripId: string
): Promise<DayPlan[]> => {
  const res = await fetch(`${BASE_URL}/trips/${tripId}/itinerary`);
  const json = await handleResponse(res);
  return json?.data || json?.itinerary || [];
};

/**
 * Fetch cancellation policy
 */
export const fetchCancellationPolicy = async (
  tripId: string
): Promise<CancellationPolicy | null> => {
  const res = await fetch(
    `${BASE_URL}/trips/${tripId}/cancellation-policy`
  );

  const json = await handleResponse(res);

  return json?.data || json || null;
};