// "use client";

// import { useEffect, useState } from "react";
// import { apiService } from "../lib/api";
// import { CombinedFilters } from "../types/combinedFilters";

// import type {
//   ApiTripResponse,
//   ApiPackageResponse,
//   ApiTrip,
//   ApiPackage,
// } from "../types/types";

// export function useSearchData(filters: CombinedFilters) {
//   const [trips, setTrips] = useState<ApiTrip[]>([]);
//   const [packages, setPackages] = useState<ApiPackage[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [tripRes, packageRes]: [ApiTripResponse, ApiPackageResponse] =
//           await Promise.all([
//             apiService.trips.search(filters, controller.signal),
//             apiService.packages.search(filters, controller.signal),
//           ]);

//         // ✅ Defensive + typed
//         setTrips(Array.isArray(tripRes.results) ? tripRes.results : []);

//         setPackages(Array.isArray(packageRes.data) ? packageRes.data : []);
//       } catch (err: any) {
//         if (err?.name === "AbortError") return;

//         const status = err?.response?.status;

//         // ✅ Search miss is NOT an error
//         if (status === 404 || status === 204) {
//           setTrips([]);
//           setPackages([]);
//           setError(null); // 🔑 critical
//           return;
//         }

//         // ❌ Real server/network failure
//         setError("SERVER_ERROR");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     return () => controller.abort();
//   }, [filters]);

//   return { trips, packages, loading, error };
// }



"use client";

import { useEffect, useState } from "react";
import { apiService } from "../lib/api";
import { CombinedFilters } from "../types/combinedFilters";

import type {
  ApiTripResponse,
  ApiPackageResponse,
  ApiTrip,
  ApiPackage,
} from "../types/types";

export function useSearchData(filters: CombinedFilters) {
  const [trips, setTrips] = useState<ApiTrip[]>([]);
  const [packages, setPackages] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false); // ✅ ADD THIS

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

        setTrips(Array.isArray(tripRes.results) ? tripRes.results : []);
        setPackages(Array.isArray(packageRes.data) ? packageRes.data : []);
      } catch (err: any) {
        if (err?.name === "AbortError") return;

        const status = err?.response?.status;

        // ✅ Search miss ≠ error
        if (status === 404 || status === 204) {
          setTrips([]);
          setPackages([]);
          setError(null);
        } else {
          // ❌ real failure
          setError("SERVER_ERROR");
        }
      } finally {
        setHasFetched(true); // 🔑 CRITICAL LINE
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [filters]);

  return { trips, packages, loading, error, hasFetched };
}
