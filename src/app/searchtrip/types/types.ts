// types

export type HostCategory = "Travel Enthusiast" | "Featured Trip Leader" | "Featured Trip Agency";

export type Host = {
  name: string;
 minAge?: number,
 MaxAge?: number,
  verified?: boolean;
  location: string;
  rating: number;
  match: number;
  safeScore: number;
  category: HostCategory;
};

export type Trip = {
  id: string;
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

export type PackageDisplay = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  from: string;
  to: string;
  totalDays: number;
  totalNights: number;
  plans: Array<{
    name: string;
    category: string;
    discountedPrice: number;
    pricePerPerson: number;
  }>;
  tripStyles: string[];
  fromLocation: {
    city: string;
  };
  toLocation: {
    city: string;
  };
  lowestPrice: number;
  host: Host;
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

export type TripFilterPayload = {
  page?: number;
  limit?: number;
  keyword?: string;
  fromCity?: string;
  toCity?: string;
  creatorType?: string;
  travelMode?: string;
  genderPreference?: string;
  languages?: string[];
  tripStyles?: string[];
  minPrice?: number;
  maxPrice?: number;
  startDateFrom?: string;
  startDateTo?: string;
};

export type PackageFilterPayload = {
  page?: number;
  limit?: number;
  keyword?: string;
  fromCity?: string;
  toCity?: string;
  creatorType?: string;
  tripStyles?: string[];
  minPrice?: number;
  maxPrice?: number;
  minDays?: number;
  maxDays?: number;
};

export type PartnerPreferences = {
  ageRange: {
    min: number;
    max: number;
  };
  budget: {
    min: number;
    max: number;
  };
  genderPreference: "ANY" | "MALE_ONLY" | "FEMALE_ONLY";
  languages: string[];
  tripStyles: string[];
  travelMode: "GROUP" | "SOLO";
  costPreference: "SELF" | "SHARE";
  _id: string;
};

export type Location = {
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
};


export type Commitments = {
  mustDeliver: string[];
  bestEffort: string[];
  _id: string;
};


export type ApiTrip = {
  _id: string;
  title: string;
  description: string;
  category: "SOLO" | "GROUP";
  tripStyles: string[];

  createdBy: string;
  creatorType: "AGENCY" | "LEADER" | "USER";
  organizationId: string;

  intent: "COMMERCIAL" | "PERSONAL";
  visibility: "PUBLIC" | "PRIVATE";

  startDate: string; // ISO
  endDate: string;   // ISO

  fromLocation: Location;
  toLocation: Location;

  totalSeats: number;
  bookedSeats: number;

  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";

  inclusions: string[];
  exclusions: string[];

  commitments: Commitments;
  joinRequests: unknown[];

  partnerPreferences: PartnerPreferences;

  gallery: string[];
  videos: string[];

  seoKeywords: string[];
  ogImage: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;

  createdAt: string;
  updatedAt: string;
  __v: number;
};


// API Response Types
export type ApiTripResponse = {
  results: ApiTrip[];
  availableFilters?: TripAvailableFilters;
  page: number;
  limit: number;
  total: number;
};


export interface ItineraryActivity {
  _id: string;
  name: string;
  description: string;
  location: string;
  startTime: string; // ISO or HH:mm (API is inconsistent)
}

export interface ItineraryBlock {
  _id: string;
  type: ComponentType;
  title: string;
  optional?: boolean;
}

export interface ItineraryDay {
  _id: string;
  dayTitle: string;
  summary: string;
  activities: ItineraryActivity[];
  blocks: ItineraryBlock[];
}

export interface PaymentTerm {
  _id: string;
  percentage: number;
  trigger: PaymentTrigger;
  beforeDays?: number;
}

export interface CancellationPolicy {
  _id: string;
  beforeDays: number;
  refundPercentage: number;
}

export interface PlanComponent {
  _id: string;
  type: ComponentType;
  title: string;
  description?: string;
  quantity?: number;
}

export interface PackagePlan {
  _id: string;
  name: string;
  category: PlanCategory;
  description: string;

  pricePerPerson: number;
  discountedPrice?: number;
  currency: "INR" | "USD" | string;

  minPeople: number;
  maxPeople: number;

  totalSlots: number;
  bookedSlots: number;

  paymentTerms: PaymentTerm[];
  refundType: RefundType;
  cancellationPolicy: CancellationPolicy[];

  inclusions: string[];
  exclusions: string[];
  components: PlanComponent[];

  active: boolean;
}
export interface ApiPackage {
  slug: string;
  coverImage: string;
  _id: string;
// category?: string;
  title: string;
  description: string;
  shortSummary?: string;

  totalDays: number;
  totalNights: number;

  tripStyles: string[];
  categories: string[];

  createdBy: string; // USER ID
  creatorType: CreatorType;
  // organizationId: string;

  fromLocation: Location;
  toLocation: Location;

  resale: {
    allowResale: boolean;
    agentOverrides: unknown[];
  };

  gallery: string[];
  videos: string[];
  seoKeywords: string[];
  seoTitle: string;   
  seoDescription: string; 

  status: TripStatus;
  active: boolean;

  itineraryTemplate: ItineraryDay[];
  plans: PackagePlan[];

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type CreatorType = "AGENCY" | "LEADER" | "USER";
export type TripStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type PlanCategory = "SOLO" | "COUPLE" | "GROUP";
export type RefundType = "REFUNDABLE" | "PARTIAL" | "NON_REFUNDABLE";
export type PaymentTrigger = "ON_BOOKING" | "BEFORE_DAYS";
export type ComponentType = "HOTEL" | "ACTIVITY" | "MEAL" | "STAY" | "TRANSFER";

export type AvailableFilters = {
  categories: string[];          // e.g. ["SOLO", "GROUP"]
  tripStyles: string[];          // e.g. ["ADVENTURE", "RELAX"]
  creatorTypes: CreatorType[];   // ["AGENCY", "LEADER"]

  priceRange: {
    min: number;
    max: number;
  };

  totalDays: number[];           // e.g. [3, 5, 7]
  totalNights: number[];         // e.g. [2, 4, 6]

  fromLocations: string[];       // city names
  toLocations: string[];         // city names
};



export interface ApiPackageResponse {
  total: number;
  page: number;
  limit: number;
  data: ApiPackage[];
   availableFilters?: PackageAvailableFilters;
}

export type BaseAvailableFilters = {
  priceRange?: {
    min: number;
    max: number;
  };

  fromLocations?: string[];
  toLocations?: string[];
};

export type TripAvailableFilters = BaseAvailableFilters & {
  categories?: ("SOLO" | "GROUP")[];
  tripStyles?: string[];
  creatorTypes?: CreatorType[];

  travelModes?: ("GROUP" | "SOLO")[];
  genderPreferences?: ("ANY" | "MALE_ONLY" | "FEMALE_ONLY")[];
  languages?: string[];
};

export type PackageAvailableFilters = BaseAvailableFilters & {
  categories?: string[];
  tripStyles?: string[];
  creatorTypes?: CreatorType[];

  totalDays?: number[];
  totalNights?: number[];
};

