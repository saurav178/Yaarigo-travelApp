// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { apiService } from "../lib/api";
// import { CombinedFilters } from "../types/combinedFilters";

// import type {
//   ApiTripResponse,
//   ApiPackageResponse,
//   ApiTrip,
//   ApiPackage,
// } from "../types/types";

// const PAGE_SIZE = 10;

// type ServerError = "SERVER_ERROR" | null;

// export function useSearchData(filters: CombinedFilters) {
//   const [trips, setTrips] = useState<ApiTrip[]>([]);
//   const [packages, setPackages] = useState<ApiPackage[]>([]);

//   const [page, setPage] = useState<number>(1);
//   const [totalTrips, setTotalTrips] = useState<number | null>(null);

//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<ServerError>(null);
//   const [hasFetched, setHasFetched] = useState<boolean>(false);

//   /* 🔁 Reset when filters change */
//   useEffect(() => {
//     setTrips([]);
//     setPackages([]);
//     setPage(1);
//     setTotalTrips(null);
//     setHasFetched(false);
//   }, [filters]);

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchData = async (): Promise<void> => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [tripRes, packageRes]: [
//           ApiTripResponse,
//           ApiPackageResponse
//         ] = await Promise.all([
//           apiService.trips.search(
//             {
//               ...filters,
//               page,
//               limit: PAGE_SIZE,
//             },
//             controller.signal
//           ),
//           apiService.packages.search(filters, controller.signal),
//         ]);

//         // ✅ Append trips (critical for lazy loading)
//         setTrips(prev => [
//           ...prev,
//           ...(Array.isArray(tripRes.results) ? tripRes.results : []),
//         ]);

//         // Packages usually don’t paginate here
//         setPackages(
//           Array.isArray(packageRes.data) ? packageRes.data : []
//         );

//         if (typeof tripRes.total === "number") {
//           setTotalTrips(tripRes.total);
//         }
//       } catch (err: unknown) {
//         if (err instanceof DOMException && err.name === "AbortError") {
//           return;
//         }

//         // Axios-style error narrowing
//         if (
//           typeof err === "object" &&
//           err !== null &&
//           "response" in err &&
//           typeof (err as { response?: { status?: number } }).response
//             ?.status === "number"
//         ) {
//           const status =
//             (err as { response: { status: number } }).response
//               .status;

//           if (status === 404 || status === 204) {
//             // search miss ≠ error
//             setError(null);
//             return;
//           }
//         }

//         setError("SERVER_ERROR");
//       } finally {
//         setHasFetched(true);
//         setLoading(false);
//       }
//     };

//     fetchData();
//     return () => controller.abort();
//   }, [filters, page]);

//   /* 🧠 Can we load more? */
//   const canLoadMore: boolean =
//     totalTrips === null || trips.length < totalTrips;

//   const loadMore = useCallback((): void => {
//     if (!loading && canLoadMore) {
//       setPage(prev => prev + 1);
//     }
//   }, [loading, canLoadMore]);

//   return {
//     trips,
//     packages,
//     loading,
//     error,
//     hasFetched,
//     loadMore,
//     canLoadMore,
//   };
// }


"use client";

import { useEffect, useState, useCallback, useRef} from "react";
import { apiService } from "../lib/api";
import { CombinedFilters } from "../types/combinedFilters";
import type {
  // ApiTripResponse,
  // ApiPackageResponse,
  ApiTrip,
  ApiPackage,
} from "../types/types";
import stringify from 'fast-json-stable-stringify';

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
  
  // Refs for tracking
  const prevFiltersRef = useRef<string>("");
  const isMountedRef = useRef(false);
  const fetchingRef = useRef(false);

  // 🔥 Cleanup refs on unmount
  useEffect(() => {
    return () => {
      prevFiltersRef.current = "";
      isMountedRef.current = false;
      fetchingRef.current = false;
    };
  }, []);

  /* 🔁 Reset ONLY when filter values actually change */
  useEffect(() => {
    const filtersKey = stringify(filters);
    
    // Skip initial mount reset in StrictMode
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    
    // Only reset if filter values actually changed
    if (prevFiltersRef.current !== filtersKey) {
      setTrips([]);
      setPackages([]);
      setPage(1);
      setTotalTrips(null);
      setHasFetched(false);
      prevFiltersRef.current = filtersKey;
    }
  }, [filters]);

  const filtersKey = stringify(filters);

  /* 🔥 Fetch data with abort controller */
  useEffect(() => {
    const controller = new AbortController();
    
    // Prevent duplicate fetches in StrictMode
    if (fetchingRef.current) return;
    
    // Skip if no page
    if (page < 1) return;

    const fetchData = async (): Promise<void> => {
      try {
        fetchingRef.current = true;
        setLoading(true);
        setError(null);

        const [tripRes, packageRes] = await Promise.all([
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

        if (!controller.signal.aborted) {
          // Replace on page 1, append on page 2+
          setTrips(prev => 
            page === 1 
              ? (Array.isArray(tripRes.results) ? tripRes.results : [])
              : [...prev, ...(Array.isArray(tripRes.results) ? tripRes.results : [])]
          );

          // Only set packages on first page
          if (page === 1) {
            setPackages(
              Array.isArray(packageRes.data) ? packageRes.data : []
            );
          }

          if (typeof tripRes.total === "number") {
            setTotalTrips(tripRes.total);
          }
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setError("SERVER_ERROR");
      } finally {
        if (!controller.signal.aborted) {
          setHasFetched(true);
          setLoading(false);
        }
        fetchingRef.current = false;
      }
    };

    fetchData();
    return () => {
      controller.abort();
      fetchingRef.current = false;
    };
  }, [
    filtersKey,
    page
  ]);

  const canLoadMore: boolean = totalTrips === null || trips.length < totalTrips;

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