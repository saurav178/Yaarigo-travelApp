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
}

export interface ItineraryItem {
  dayTitle: string;
  summary: string;
  activities?: { name?: string; title?: string }[];
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
}