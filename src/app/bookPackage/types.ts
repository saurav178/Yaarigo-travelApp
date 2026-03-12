export interface AddOnDetail {
  id: string;
  title: string;
  desc: string;
  price: number;
  tag: string;
}

export interface Traveller {
  id: string;
  name: string;
  email: string;
  contact: string;
  gender: string;
  age: string | number;
  dob?: string;
  firstName?: string;
  lastName?: string;
  travelerType?: string;
  isAddedToCart?: boolean;
}

export interface ItineraryItem {
  dayTitle: string;
  summary: string;
  activities?: { name?: string; title?: string }[];
  blocks?: ItineraryBlock[];
}

export interface ItineraryBlock {
  _id?: string;
  type?: string;
  title?: string;
  location?: string;
  time?: string;
  description?: string;
  images?: string[];
}

export interface Location {
  name: string;
  city: string;
  country: string;
}

export interface CancellationPolicyItem {
  _id?: string;
  beforeDays: number;
  refundPercentage: number;
  trigger?: string;
}

export interface PlanData {
  name: string;
  category: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  minPeople?: number;
  maxPeople?: number;
  totalSlots?: number;
  bookedSlots?: number;
  
}

export interface TaxComponent {
  code: string;
  name: string;
  percentage: number;
  amount: number;
}

export interface PaymentTerm {
  _id?: string;
  trigger: string;
  percentage: number;
  beforeDays?: number;
}

export interface CartPricing {
  baseAmount: number;
  planPricePerPerson: string;
  addonAmount: number;
  taxAmount: number;
  totalAmount: number;
  payableNow: number;
  taxComponents: TaxComponent[];
  paymentTerms: PaymentTerm[];
}
