// hooks/useSearchData.ts
"use client";

import { useState, useEffect } from "react";
import { apiService } from "../lib/api";
import { mapApiTripToTrip } from "../lib/mappers/mapApiTripToTrip";
import { mapApiPackageToDisplay } from "../lib/mappers/mapApiPackageToDisplay";

export function useSearchData() {
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
          apiService.trips.search(),
          apiService.packages.search(),
        ]);

        setRawTrips(tripRes?.results || []);
        setRawPackages(packageRes?.data || []);
      } catch (err) {
        console.error("Search data fetch failed:", err);
        setError("Failed to load trips and packages");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ✅ fetch ONCE

  return {
    rawTrips,
    rawPackages,
    loading,
    error,
  };
}
