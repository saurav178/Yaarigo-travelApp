// import type { ApiTripResponse, ApiPackageResponse } from '../../types/types';
// import { mapPackageFiltersToQuery } from '../mappers/mapPackageFiltersToQuery';
// import { mapTripFiltersToQuery } from '../mappers/mapTripFiltersToQuery';

// const API_BASE_URL = 'https://api.business.travio.cepialabs.com/api';

// // Centralized API Service
// export const apiService = {
//   trips: {
//     search: async (filters: any) => {
//       const params = new URLSearchParams(
//         mapTripFiltersToQuery(filters)
//       ).toString();

//       const res = await fetch(
//         `${API_BASE_URL}/trips/search?${params}`
//       );

//       if (!res.ok) throw new Error("Failed to fetch trips");
//       return res.json();
//     },
//   },

//   packages: {
//     search: async (filters: any) => {
//       const params = new URLSearchParams(
//         mapPackageFiltersToQuery(filters)
//       ).toString();

//       const res = await fetch(
//         `${API_BASE_URL}/packages/search?${params}`
//       );

//       if (!res.ok) throw new Error("Failed to fetch packages");
//       return res.json();
//     },
//   },
// };



import type {
  ApiTripResponse,
  ApiPackageResponse,
} from '../../types/types';
import { CombinedFilters } from '../../types/combinedFilters';
import { mapPackageFiltersToQuery } from '../mappers/mapPackageFiltersToQuery';
import { mapTripFiltersToQuery } from '../mappers/mapTripFiltersToQuery';

const API_BASE_URL = 'https://api.business.travio.cepialabs.com/api';

async function fetchJson<T>(
  url: string,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const apiService = {
  trips: {
    search: (
      filters: CombinedFilters,
      signal?: AbortSignal
    ): Promise<ApiTripResponse> => {
      const params = new URLSearchParams(
        mapTripFiltersToQuery(filters)
      ).toString();

      return fetchJson<ApiTripResponse>(
        `${API_BASE_URL}/trips/search?${params}`,
        signal
      );
    },
  },

  packages: {
    search: (
      filters: CombinedFilters,
      signal?: AbortSignal
    ): Promise<ApiPackageResponse> => {
      const params = new URLSearchParams(
        mapPackageFiltersToQuery(filters)
      ).toString();

      return fetchJson<ApiPackageResponse>(
        `${API_BASE_URL}/packages/search?${params}`,
        signal
      );
    },
  },
};
