import { AddOnDetail } from './types';

export const AVAILABLE_ADDONS: AddOnDetail[] = [
  { id: 'addon_1', title: 'Airport Pickup', desc: 'Convenient pickup from the airport.', price: 1500, tag: 'Transport', quantity: 1, pricePerUnit: 1500 },
  { id: 'addon_2', title: 'Guided City Tour', desc: 'Explore the city with a local guide.', price: 3000, tag: 'Tour', quantity: 1, pricePerUnit: 3000 },
  { id: 'addon_3', title: 'Adventure Sports Package', desc: 'Experience thrilling adventure sports.', price: 5000, tag: 'Activity', quantity: 1, pricePerUnit: 5000 },
  { id: 'addon_4', title: 'Travel Insurance', desc: 'Comprehensive travel insurance.', price: 2000, tag: 'Insurance', quantity: 1, pricePerUnit: 2000 },
];
