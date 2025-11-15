


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
  compact: boolean;
  minAge?: number;
  maxAge?: number;
  durationDays?: number;
  budget?: number;
  interest?: string;
  tripType?: string;
  foodPref?: string;
  host: {
    name: string;
    age: number;
    verified: boolean;
    location: string;
    rating: number;
    match: number;
    safeScore: number;
    category: string;
  };
  image: string;
};

export type Leader = {
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
  compact: boolean;
  minAge?: number;
  maxAge?: number;
  durationDays?: number;
  budget?: number;
  interest?: string;
  tripType?: string;
  foodPref?: string;
  host: {
    name: string;
    age: number;
    verified: boolean;
    location: string;
    rating: number;
    match: number;
    safeScore: number;
    category: string;
  };
  image: string;
};

export type Agency = {
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
  minAge?: number;
  maxAge?: number;
  durationDays?: number;
  budget?: number;
  interest?: string;
  tripType?: string;
  foodPref?: string;
  stats: {
    travelersEnrolled: string;  // "500+"
    tripsCompleted: string;     // "150+"
    yearsInBusiness: string;    // "8+"
  };
  host: {
    name: string;
    age: number;
    verified: boolean;
    location: string;
    rating: number;
    match: number;
    safeScore: number;
    category: string;
  };
  image: string;
};
