// hooks/useSearchData.ts
"use client";

import { useState, useEffect } from "react";
import { apiService } from "../lib/api";
import { CombinedFilters } from "../types/combinedFilters";

export function useSearchData(filters: CombinedFilters) {
  const [rawTrips, setRawTrips] = useState<any[]>([]);
  const [rawPackages, setRawPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [tripRes, packageRes] = await Promise.all([
          apiService.trips.search(filters),
          apiService.packages.search(filters),
        ]);

        setRawTrips(tripRes?.results || []);
        setRawPackages(packageRes?.data || []);
      } catch (e) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]); // 🔥 THIS is the key

  return { rawTrips, rawPackages, loading, error };
}
