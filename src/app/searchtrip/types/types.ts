// types- for best matches...
// export type Trip = {
//   id: string;
//   name: string;
//   age?: number;
//   // maxAge?:number;
//   location?: string;
//   from?: string;
//   to?: string;
//   price?: string;
//   tags?: string[];
//   match?: number;
//   days?: number;
//   avatar?: string;
//   cover?: string;
//   rating: number;
  
// };

export type Trip = {
  id: string;
  name: string;
  age?: number;           // leader/owner age
  location?: string;
  days? : number;
  from?: string;
  to?: string;
  price?: string | number;         // numeric price in INR (single-number for filtering)
  rating?: number;
  duration?: string | number;     // days
  tags?: string[];
  match?: number;
  cover?: string;
};

// types- for similar trips

export type Similar = {
  id: string;
  name: string;
  age?: number;
  // maxAge?:number;
  location?: string;
  from?: string;
  to?: string;
  price?: string | number;
  tags?: string[];
  match?: number;
  days?: string | number;
  avatar?: string;
  cover?: string;
  rating: number;
  
};

// types- for feature leader trips...

export type Leader = {
  id: string;
  name: string;
  age?: number;
  // maxAge?:number;
  location?: string;
  from?: string;
  to?: string;
  price?: string | number;
  tags?: string[];
  match?: number;
  days?: string | number;
  avatar?: string;
  cover?: string;
  rating: number;
  
};



// types for agency---------

// export type Agency = {
//   id: string;
//   name: string;
//   tagline?: string;
//   description?: string;
//   rating?: number; // e.g. 4.1
//   trust?: "Verified" | "Moderate" | "Low";
//   tripsCount?: number;
//   verified: true,
//   travelersCount?: number;
//   years?: number;
//   tags?: string[];
//   avatar?: string; // small square
//   cover?: string;  // wide cover image
//   agencies:[];
// };


// src/app/searchtrip/types/types.ts
// ...other types you already have above

// Remove or replace any existing `Agency` type with the following:
export type Agency = {
  id: string;
  name: string;
  // fields commonly used in your data (make optional if absent)
  description?: string;
  rating?: number;
  trust?: string;
  verified?: boolean;
  tripsCount?: number;
  travelersCount?: number;
  years?: number;
  tags?: string[];
  avatar?: string;
  cover?: string;
  // any other optional fields your data might include
  [key: string]: unknown;
};

// data-recommendations

export type Rec = {
  id: string;
  name: string;
  age?: number;
  // maxAge?:number;
  location: string;
  from?: string;
  tags?: string[];
  match?: number;
  price?: string | number;
  days?: string | number;
  avatar?: string;
  cover?: string;
  rating: number;
};
