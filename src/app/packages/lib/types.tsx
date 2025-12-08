// lib/types.ts

export type Hero = {
  image: string;
  title: string;
  location: string;
  price: number;
  days: number;
  nights: number;
};

export type Package = {
  id: string;
  title: string;
  location: string;
  price: number;
  nights: number;
  days: number;
  rating?: number;
  reviews?: number;
  image: string;
  perks?: string[];
  badge?: string;
};

export type FeaturedPackage = {
  id: string;
  title: string;
  image: string;
  rating: number;
  price: number;
  days: number;
  nights: number;
  location: string;
  accommodation: string;
  includedMeals: string;
  extras: string;
  activities: string[];
};

export type RecommendedPackage = {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  days: number;
  nights: number;
};

export type PopularPackage = {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  days: number;
  nights: number;
  rating: number;
  reviews: number;
};
