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
    
    // Initialize on first mount
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      prevFiltersRef.current = filtersKey; // ✅ Initialize with current filters
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

        // Fetch trips first - if this fails it's a real error
        const tripRes = await apiService.trips.search(
          {
            ...filters,
            page,
            limit: PAGE_SIZE,
          },
          controller.signal
        );

        // Update trips (replace on page 1, append on page 2+)
        if (!controller.signal.aborted) {
          setTrips((prev) =>
            page === 1
              ? (Array.isArray(tripRes.results) ? tripRes.results : [])
              : [...prev, ...(Array.isArray(tripRes.results) ? tripRes.results : [])]
          );

          if (typeof tripRes.total === "number") {
            setTotalTrips(tripRes.total);
          }
        }

        // Try fetching packages but don't fail the whole search if packages endpoint errors
        try {
          const packageRes = await apiService.packages.search(
            {
              ...filters,
              page,
              limit: PAGE_SIZE,
            },
            controller.signal
          );
          if (!controller.signal.aborted) {
            const pkgArray = Array.isArray(packageRes.data) ? packageRes.data : [];
            // Accumulate packages (replace on page 1, append on page 2+)
            setPackages((prev) =>
              page === 1
                ? pkgArray
                : [...prev, ...pkgArray]
            );
          }
        } catch (pkgErr) {
          // Log package fetch failure but continue showing trips
          // eslint-disable-next-line no-console
          console.error("Package fetch failed", pkgErr, { filters, page });
          if (!controller.signal.aborted) {
            setPackages([]);
          }
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        // Log error with filters for debugging
        // eslint-disable-next-line no-console
        console.error("useSearchData fetch error", err, { filters, page });

        // If fetchJson threw an API status error like 'API error: 404' or 'API error: 204',
        // treat 404/204 as no-results (not a server error)
        let status: number | null = null;
        if (err instanceof Error) {
          const m = err.message.match(/API error:\s*(\d{3})/);
          if (m) status = parseInt(m[1], 10);
        }

        if (status === 404 || status === 204) {
          // search miss ≠ error
          setError(null);
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
    stringify(filters),
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