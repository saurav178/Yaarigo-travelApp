
export type Trip = {
  id: string;
  name: string;
  age?: number;           
  location?: string;
  from?: string;
  to?: string;
  price?: string | number;         
  rating?: number;
  duration?: string | number;     
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
