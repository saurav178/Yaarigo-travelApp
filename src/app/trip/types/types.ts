// types- for best matches...
export type Trip = {
  id: string;
  name: string;
  age?: number;
  location?: string;
  from?: string;
  price?: string;
  tags?: string[];
  match?: number;
  days?: number;
  avatar?: string;
  cover?: string;
  
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
  travelersCount?: number;
  years?: number;
  tags?: string[];
  avatar?: string; // small square
  cover?: string;  // wide cover image
  agencies:[];
};
