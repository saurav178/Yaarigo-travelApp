export interface Trip {
  id: string | number;
  title: string;
  location: string;
  date: string;
  image: string;
  avatars?: string[];
  travelers?: number;
  joined?: number;
  travelerImages?: string[];
  price?: number;
  duration?: string;
  description?: string;
  availableSeats?: number;
  [key: string]: unknown;
}

export interface Review {
  id?: string | number;
  name: string;
  date: string;
  rating: number;
  text: string;
  userName?: string;
  comment?: string;
  avatar?: string;
}

export interface HeroData {
  bannerImage: string;
  logo: string;
  agencyName: string;
  category?: string;
  safetyScore?: number;
  location: string;
  rating?: number;
  reviews?: number;
  title?: string;
  coverImage?: string;
  description?: string;
  [key: string]: unknown;
}

export interface StatsData {
  value: string;
  label: string;
}

export interface AboutData {
  title: string;
  description: string;
  specialities?: string[];
  certifications?: string[];
  specialties?: string[];
  [key: string]: unknown;
}

export interface ContactData {
  responseTime: string;
  phone: string;
  email: string;
  website: string;
  address?: string;
  socialMedia?: Record<string, string>;
  [key: string]: unknown;
}

export interface TrustSafetyItem {
  id?: string | number;
  title?: string;
  description?: string;
  icon?: string;
  [key: string]: unknown;
}

export interface Tab {
  id: string;
  label: string;
  count: number;
}

export interface Agency {
  id?: string | number;
  images?: string[];
  logo?: string;
  image?: string;
  name: string;
  rating?: number;
  trips?: number;
  [key: string]: unknown;
}

export interface SimilarAgency {
  id: string | number;
  name: string;
  image?: string;
  logo?: string;
  rating?: number;
  trips?: number;
  [key: string]: unknown;
}

export interface AgencyData {
  hero: HeroData;
  stats: StatsData[];
  about: AboutData;
  upcomingTrips: Trip[];
  pastTrips: Trip[];
  reviews: Review[];
  travelPhotos: string[];
  similarAgencies: SimilarAgency[];
  contactInfo: ContactData;
  trustSafety: string[];
}

export interface Message {
  id: number;
  message: string;
  timestamp: string;
  sender: string;
  userId: string;
}