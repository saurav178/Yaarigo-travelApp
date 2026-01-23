"use client";

import { useEffect, useState } from "react";
import type { Trip } from "../types/types";
import TripCard from "../components/TripsCard";
 import { fetchTrips } from "@/lib/api/trips";

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips()
      .then((data) => setTrips(data as Trip[]))
      .catch(err => console.error("Trip fetch failed", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return <TripCard trips={trips} />;
}
