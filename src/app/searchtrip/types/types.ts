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
