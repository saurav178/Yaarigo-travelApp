const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.business.travio.cepialabs.com/api';

// Types for API responses
export interface ApiTripResponse {
  _id: string;
  title: string;
  description: string;
  category: string;
  tripStyles: string[];
  createdBy: {
    name: string;
    age: number;
    verified: boolean;
    rating: number;
  };
  creatorType: 'AGENCY' | 'LEADER' | 'USER';
  startDate: string;
  endDate: string;
  fromLocation: {
    city: string;
    country: string;
  };
  toLocation: {
    city: string;
    country: string;
  };
  totalSeats: number;
  bookedSeats: number;
  totalPrice?: number;
  gallery: string[];
  partnerPreferences?: {
    ageRange: { min: number; max: number };
    travelMode: string;
  };
  matchPercentage?: number;
  safetyScore?: number;
}

export interface ApiPackageResponse {
  _id: string;
  title: string;
  description: string;
  totalDays: number;
  totalNights: number;
  tripStyles: string[];
  fromLocation: {
    city: string;
  };
  toLocation: {
    city: string;
  };
  plans: Array<{
    name: string;
    category: string;
    discountedPrice: number;
    pricePerPerson: number;
  }>;
  createdBy: {
    name: string;
    age: number;
    verified: boolean;
    rating: number;
  };
  creatorType: string;
}

// Centralized API Service
export const apiService = {
  // Trips API
  trips: {
    search: async (params?: Record<string, any>): Promise<{ results: ApiTripResponse[] }> => {
      try {
        const queryParams = params ? new URLSearchParams(params).toString() : '';
        const response = await fetch(
          `${API_BASE_URL}/trips/search${queryParams ? `?${queryParams}` : ''}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch trips: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Trips API Error:', error);
        throw error;
      }
    },
  },

  // Packages API
  packages: {
    search: async (params?: Record<string, any>): Promise<{ data: ApiPackageResponse[] }> => {
      try {
        const queryParams = params ? new URLSearchParams(params).toString() : '';
        const response = await fetch(
          `${API_BASE_URL}/packages/search${queryParams ? `?${queryParams}` : ''}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch packages: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Packages API Error:', error);
        throw error;
      }
    },
  },
};

// Data Mapping Functions
export const mapApiTripToTrip = (apiTrip: ApiTripResponse): any => {
  const startDate = new Date(apiTrip.startDate);
  const endDate = new Date(apiTrip.endDate);
  const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  
  // Determine host category based on creatorType
  let hostCategory = 'Travel Enthusiast';
  if (apiTrip.creatorType === 'AGENCY') hostCategory = 'Featured Trip Agency';
  if (apiTrip.creatorType === 'LEADER') hostCategory = 'Featured Trip Leader';
  
  return {
    id: apiTrip._id,
    title: apiTrip.title || 'Untitled Trip',
    description: apiTrip.description || '',
    tags: apiTrip.tripStyles || [],
    from: apiTrip.fromLocation?.city || 'Unknown',
    to: apiTrip.toLocation?.city || 'Unknown',
    travelersNeeded: apiTrip.totalSeats - (apiTrip.bookedSeats || 0),
    price: `₹${apiTrip.totalPrice || 0}`,
    date: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
    spotsLeft: apiTrip.totalSeats - (apiTrip.bookedSeats || 0),
    host: {
      name: apiTrip.createdBy?.name || 'Unknown Host',
      age: apiTrip.createdBy?.age || 30,
      verified: apiTrip.createdBy?.verified || false,
      location: apiTrip.fromLocation?.city || 'Unknown',
      rating: apiTrip.createdBy?.rating || 4.5,
      match: apiTrip.matchPercentage || 85,
      safeScore: apiTrip.safetyScore || 90,
      category: hostCategory,
    },
    image: apiTrip.gallery?.[0] || '/default-trip.jpg',
    duration: durationDays,
    totalPrice: apiTrip.totalPrice || 0,
    category: apiTrip.category,
    tripStyles: apiTrip.tripStyles || [],
    partnerPreferences: apiTrip.partnerPreferences,
  };
};

export const mapApiPackageToDisplay = (apiPackage: ApiPackageResponse): any => {
  const plans = apiPackage.plans || [];
  
  // Find the lowest price from all plans
  let lowestPrice = 0;
  if (plans.length > 0) {
    const prices = plans
      .map(p => p.discountedPrice || p.pricePerPerson || 0)
      .filter(p => p > 0);
    lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
  }
  
  // Determine host category based on creatorType
  let hostCategory = 'Travel Enthusiast';
  if (apiPackage.creatorType === 'AGENCY') hostCategory = 'Featured Trip Agency';
  if (apiPackage.creatorType === 'LEADER') hostCategory = 'Featured Trip Leader';
  
  return {
    id: apiPackage._id,
    title: apiPackage.title || 'Package Trip',
    description: apiPackage.description || '',
    tags: apiPackage.tripStyles || [],
    from: apiPackage.fromLocation?.city || 'Unknown',
    to: apiPackage.toLocation?.city || 'Unknown',
    totalDays: apiPackage.totalDays || 0,
    totalNights: apiPackage.totalNights || 0,
    plans: apiPackage.plans || [],
    tripStyles: apiPackage.tripStyles || [],
    fromLocation: apiPackage.fromLocation,
    toLocation: apiPackage.toLocation,
    lowestPrice: lowestPrice,
    host: {
      name: apiPackage.createdBy?.name || 'Unknown Host',
      age: apiPackage.createdBy?.age || 35,
      verified: apiPackage.createdBy?.verified || false,
      location: apiPackage.fromLocation?.city || 'Unknown',
      rating: apiPackage.createdBy?.rating || 4.7,
      match: 90, // Default for packages
      safeScore: 95, // Default for packages
      category: hostCategory,
    },
  };
};

// Helper function to fetch both trips and packages
export const fetchAllData = async () => {
  try {
    const [tripsResponse, packagesResponse] = await Promise.all([
      apiService.trips.search(),
      apiService.packages.search()
    ]);
    
    return {
      trips: tripsResponse.results.map(mapApiTripToTrip),
      packages: packagesResponse.data.map(mapApiPackageToDisplay),
    };
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
};