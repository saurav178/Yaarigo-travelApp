import type { ApiTripResponse, ApiPackageResponse } from '../../types/types';

const API_BASE_URL = 'https://api.business.travio.cepialabs.com/api';

// Centralized API Service
export const apiService = {
  // Trips API
  trips: {
    search: async (): Promise<{ results: any[] }> => {
      try {
        const response = await fetch(`${API_BASE_URL}/trips/search`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: params ? JSON.stringify(params) : JSON.stringify({}),
        });
 const data = await response.json(); // ✅ THIS is the response data

  console.log("API Response:", data);
  
  if (!response.ok) {
          throw new Error(`Failed to fetch trips: ${response.status} ${response.statusText}`);
        }

        return data;
      } catch (error) {
        console.error('Trips API Error:', error);
        throw error;
      }
    },
  },

  // Packages API
  packages: {
    search: async (): Promise<{ data: any[] }> => {
      try {
        const response = await fetch(`${API_BASE_URL}/packages/search`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

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

