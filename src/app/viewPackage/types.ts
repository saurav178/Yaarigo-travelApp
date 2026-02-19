export interface Location {
  name: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface AddOn {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  active: boolean;
}

export interface PaymentTerm {
  percentage: number;
  trigger: string;
  beforeDays?: number;
  _id: string;
}

export interface CancellationPolicy {
  beforeDays: number;
  refundPercentage: number;
  _id: string;
}

export interface Activity {
  name?: string;
  title?: string;
}

export interface Plan {
  name: string;
  category: string;
  description: string;
  pricePerPerson: number;
  discountedPrice: number;
  currency: string;
  minPeople: number;
  maxPeople: number;
  totalSlots: number;
  bookedSlots: number;
  paymentTerms: PaymentTerm[];
  refundType: string;
  cancellationPolicy: CancellationPolicy[];
  inclusions: string[];
  exclusions: string[];
  components: unknown[];
  active: boolean;
  _id: string;
}

export interface ItineraryDay {
  dayTitle: string;
  summary: string;
  activities: Activity[];
  blocks: unknown[];
  _id: string;
}

export interface Package {
  _id: string;
  title: string;
  description: string;
  shortSummary: string;
  totalDays: number;
  totalNights: number;
  tripStyles: string[];
  createdBy: string;
  creatorType: string;
  organizationId: string;
  fromLocation: Location;
  toLocation: Location;
  categories: string[];
  resale: {
    allowResale: boolean;
    agentOverrides: unknown[];
  };
  gallery: string[];
  videos: string[];
  seoKeywords: string[];
  status: string;
  active: boolean;
  itineraryTemplate: ItineraryDay[];
  plans: Plan[];
  addOns?: AddOn[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  coverImage: string;
  seoDescription: string;
  seoTitle: string;
  slug: string;
}

export interface Traveller {
  id: string;
  name: string;
  email: string;
  contact: string;
  gender: string;
  age: string;
}

export interface StaticAddOn {
  id: string;
  title: string;
  desc: string;
  price: number;
  tag: string;
}