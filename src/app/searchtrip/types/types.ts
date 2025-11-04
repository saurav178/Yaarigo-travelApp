// types- for best matches...
export type Trip = {
  id: string;
  name: string;
  age?: number;
  location?: string;
  from?: string;
  to?: string;
  price?: string;
  tags?: string[];
  match?: number;
  days?: number;
  avatar?: string;
  cover?: string;
  rating: number;
  
};

// types- for similar trips

export type Similar = {
  id: string;
  name: string;
  age?: number;
  location?: string;
  from?: string;
  to?: string;
  price?: string;
  tags?: string[];
  match?: number;
  days?: number;
  avatar?: string;
  cover?: string;
  rating: number;
  
};

// types- for feature leader trips...

export type Leader = {
  id: string;
  name: string;
  age?: number;
  location?: string;
  from?: string;
  to?: string;
  price?: string;
  tags?: string[];
  match?: number;
  days?: number;
  avatar?: string;
  cover?: string;
  rating: number;
  
};



// types for agency---------

export type Agency = {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  rating?: number; // e.g. 4.1
  trust?: "Verified" | "Moderate" | "Low";
  tripsCount?: number;
  verified: true,
  travelersCount?: number;
  years?: number;
  tags?: string[];
  avatar?: string; // small square
  cover?: string;  // wide cover image
  agencies:[];
};

// data-recommendations

export type Rec = {
  id: string;
  name: string;
  age?: number;
  location: string;
  from?: string;
  tags?: string[];
  match?: number;
  price?: string;
  days?: number;
  avatar?: string;
  cover?: string;
  rating: number;
};
