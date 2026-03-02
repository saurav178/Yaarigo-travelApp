import type {
  ApiTripResponse,
  ApiPackageResponse,
} from "../../types/types";
import { CombinedFilters } from "../../types/combinedFilters";
import { mapPackageFiltersToQuery } from "../mappers/mapPackageFiltersToQuery";
import { mapTripFiltersToQuery } from "../mappers/mapTripFiltersToQuery";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

async function fetchJson<T>(
  url: string,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    // try to capture response body for easier debugging
    let bodyText = "";
    try {
      bodyText = await res.text();
    } catch (e) {
      /* ignore */
    }
    // Log full info to the console to help debugging in dev
    // eslint-disable-next-line no-console
    console.error(`API error ${res.status} when fetching ${url}:`, bodyText);
    throw new Error(`API error: ${res.status} ${url}`);
  }

  return res.json() as Promise<T>;
}

// Helper to build URLSearchParams with proper array handling
function buildQueryString(params: Record<string, string | string[]>): string {
  const query = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // For arrays, append each element separately
      if (value.length > 0) {
        value.forEach(v => query.append(key, v));
      }
      // Skip empty arrays - don't append anything
    } else if (value !== undefined && value !== '') {
      query.append(key, value);
    }
  });
  
  return query.toString();
}

export const apiService = {
  trips: {
    search: (
      filters: CombinedFilters,
      signal?: AbortSignal
    ): Promise<ApiTripResponse> => {
      const paramsObj = mapTripFiltersToQuery(filters);
      const params = buildQueryString(paramsObj);

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
      const paramsObj = mapPackageFiltersToQuery(filters);
      const params = buildQueryString(paramsObj);

      return fetchJson<ApiPackageResponse>(
        `${API_BASE_URL}/packages/search?${params}`,
        signal
      );
    },
  },
};
