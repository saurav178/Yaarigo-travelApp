import type { ApiTripResponse, ApiPackageResponse } from '../../types/types';
import { mapPackageFiltersToQuery } from '../mappers/mapPackageFiltersToQuery';
import { mapTripFiltersToQuery } from '../mappers/mapTripFiltersToQuery';

const API_BASE_URL = 'https://api.business.travio.cepialabs.com/api';

// Centralized API Service
export const apiService = {
  trips: {
    search: async (filters: any) => {
      const params = new URLSearchParams(
        mapTripFiltersToQuery(filters)
      ).toString();

      const res = await fetch(
        `${API_BASE_URL}/trips/search?${params}`
      );

      if (!res.ok) throw new Error("Failed to fetch trips");
      return res.json();
    },
  },

  packages: {
    search: async (filters: any) => {
      const params = new URLSearchParams(
        mapPackageFiltersToQuery(filters)
      ).toString();

      const res = await fetch(
        `${API_BASE_URL}/packages/search?${params}`
      );

      if (!res.ok) throw new Error("Failed to fetch packages");
      return res.json();
    },
  },
};

