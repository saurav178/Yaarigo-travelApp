// // hooks/useSearchData.ts
// "use client";

// import { useState, useEffect } from "react";
// import { apiService } from "../lib/api";
// import { CombinedFilters } from "../types/combinedFilters";

// export function useSearchData(filters: CombinedFilters) {
//   const [rawTrips, setRawTrips] = useState<any[]>([]);
//   const [rawPackages, setRawPackages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [tripRes, packageRes] = await Promise.all([
//           apiService.trips.search(filters),
//           apiService.packages.search(filters),
//         ]);

//         setRawTrips(tripRes?.results || []);
//         setRawPackages(packageRes?.data || []);
//       } catch (e) {
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filters]); // 🔥 THIS is the key

//   return { rawTrips, rawPackages, loading, error };
// }




// hooks/useSearchData.ts
// hooks/useSearchData.ts
"use client";

import { useEffect, useState } from "react";
import { apiService } from "../lib/api";
import { CombinedFilters } from "../types/combinedFilters";

import type {
  ApiTripResponse,
  ApiPackageResponse,
  Trip,
  PackageDisplay,
  ApiTrip,
  ApiPackage,
} from "../types/types";

import {
  mapApiTripToTrip,
  mapApiPackageToDisplay,
} from "../lib/mappers";

export function useSearchData(filters: CombinedFilters) {
  const [trips, setTrips] = useState<ApiTrip[]>([]);
  const [packages, setPackages] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [tripRes, packageRes]: [
          ApiTripResponse,
          ApiPackageResponse
        ] = await Promise.all([
          apiService.trips.search(filters, controller.signal),
          apiService.packages.search(filters, controller.signal),
        ]);

        // ✅ Defensive + typed
        setTrips(
          Array.isArray(tripRes.results)
            ? tripRes.results
            : []
        );

        setPackages(
          Array.isArray(packageRes.data)
            ? packageRes.data
            : []
        );
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [filters]);

  return { trips, packages, loading, error };
}

