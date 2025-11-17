


// export type Trip = {
//   id: number;
//   title: string;
//   description: string;
//   tags: string[];
//   from: string;
//   to: string;
//   travelersNeeded: number;
//   price: string;
//   date: string;
//   spotsLeft: number;
//   compact: boolean;
//   minAge?: number;
//   maxAge?: number;
//   durationDays?: number;
//   budget?: number;
//    interests : string[];
//   tripTypes : string[];
//   foodPreference : string[];

//   host: {
//     name: string;
//     age: number;
//     verified: boolean;
//     location: string;
//     rating: number;
//     match: number;
//     safeScore: number;
//     category: string;
//   };
//   image: string;
// };

// export type Leader = {
//   id: number;
//   title: string;
//   description: string;
//   tags: string[];
//   from: string;
//   to: string;
//   travelersNeeded: number;
//   price: string;
//   date: string;
//   spotsLeft: number;
//   compact: boolean;
//   minAge?: number;
//   maxAge?: number;
//   durationDays?: number;
//   budget?: number;
//   interest?: string;
//   tripType?: string;
//   foodPref?: string;
//   host: {
//     name: string;
//     age: number;
//     verified: boolean;
//     location: string;
//     rating: number;
//     match: number;
//     safeScore: number;
//     category: string;
//   };
//   image: string;
// };

// export type Agency = {
//   id: number;
//   title: string;
//   description: string;
//   tags: string[];
//   from: string;
//   to: string;
//   travelersNeeded: number;
//   price: string;
//   date: string;
//   spotsLeft: number;
//   minAge?: number;
//   maxAge?: number;
//   durationDays?: number;
//   budget?: number;
//   interest?: string;
//   tripType?: string;
//   foodPref?: string;
//   stats: {
//     travelersEnrolled: string;  // "500+"
//     tripsCompleted: string;     // "150+"
//     yearsInBusiness: string;    // "8+"
//   };
//   host: {
//     name: string;
//     age: number;
//     verified: boolean;
//     location: string;
//     rating: number;
//     match: number;
//     safeScore: number;
//     category: string;
//   };
//   image: string;
// };


// /src/lib/types.ts

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
