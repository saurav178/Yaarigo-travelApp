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


