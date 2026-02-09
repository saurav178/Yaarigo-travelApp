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
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [hasFetched, setHasFetched] = useState(false); // ✅ ADD THIS

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [tripRes, packageRes]: [
//           ApiTripResponse,
//           ApiPackageResponse
//         ] = await Promise.all([
//           apiService.trips.search(filters, controller.signal),
//           apiService.packages.search(filters, controller.signal),
//         ]);

//         setTrips(Array.isArray(tripRes.results) ? tripRes.results : []);
//         setPackages(Array.isArray(packageRes.data) ? packageRes.data : []);
//       } catch (err: any) {
//         if (err?.name === "AbortError") return;

//         const status = err?.response?.status;

//         // ✅ Search miss ≠ error
//         if (status === 404 || status === 204) {
//           setTrips([]);
//           setPackages([]);
//           setError(null);
//         } else {
//           // ❌ real failure
//           setError("SERVER_ERROR");
//         }
//       } finally {
//         setHasFetched(true); // 🔑 CRITICAL LINE
//         setLoading(false);
//       }
//     };

//     fetchData();
//     return () => controller.abort();
//   }, [filters]);

//   return { trips, packages, loading, error, hasFetched };
// }



"use client";

import { useEffect, useState, useCallback } from "react";
import { apiService } from "../lib/api";
import { CombinedFilters } from "../types/combinedFilters";

import type {
  ApiTripResponse,
  ApiPackageResponse,
  ApiTrip,
  ApiPackage,
} from "../types/types";

const PAGE_SIZE = 10;

type ServerError = "SERVER_ERROR" | null;

export function useSearchData(filters: CombinedFilters) {
  const [trips, setTrips] = useState<ApiTrip[]>([]);
  const [packages, setPackages] = useState<ApiPackage[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalTrips, setTotalTrips] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ServerError>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  /* 🔁 Reset when filters change */
  useEffect(() => {
    setTrips([]);
    setPackages([]);
    setPage(1);
    setTotalTrips(null);
    setHasFetched(false);
  }, [filters]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const [tripRes, packageRes]: [
          ApiTripResponse,
          ApiPackageResponse
        ] = await Promise.all([
          apiService.trips.search(
            {
              ...filters,
              page,
              limit: PAGE_SIZE,
            },
            controller.signal
          ),
          apiService.packages.search(filters, controller.signal),
        ]);

        // ✅ Append trips (critical for lazy loading)
        setTrips(prev => [
          ...prev,
          ...(Array.isArray(tripRes.results) ? tripRes.results : []),
        ]);

        // Packages usually don’t paginate here
        setPackages(
          Array.isArray(packageRes.data) ? packageRes.data : []
        );

        if (typeof tripRes.total === "number") {
          setTotalTrips(tripRes.total);
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        // Axios-style error narrowing
        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          typeof (err as { response?: { status?: number } }).response
            ?.status === "number"
        ) {
          const status =
            (err as { response: { status: number } }).response
              .status;

          if (status === 404 || status === 204) {
            // search miss ≠ error
            setError(null);
            return;
          }
        }

        setError("SERVER_ERROR");
      } finally {
        setHasFetched(true);
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [filters, page]);

  /* 🧠 Can we load more? */
  const canLoadMore: boolean =
    totalTrips === null || trips.length < totalTrips;

  const loadMore = useCallback((): void => {
    if (!loading && canLoadMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, canLoadMore]);

  return {
    trips,
    packages,
    loading,
    error,
    hasFetched,
    loadMore,
    canLoadMore,
  };
}
