"use client";

import { useState, useEffect } from "react";
import { apiService, mapApiTripToTrip }  from "../lib/api"; // ✅ Import mapper from api
import type { Trip, SimilarTrip, Leader, Agency } from "../types/types";

export const useTripsData = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [similarTrips, setSimilarTrips] = useState<SimilarTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch trips from API
        const response = await apiService.trips.search();
        
        if (!response.results || response.results.length === 0) {
          console.warn("No trips found in API response");
          setTrips([]);
          setLeaders([]);
          setAgencies([]);
          setSimilarTrips([]);
          return;
        }
        
        // Map API trips to app format
        const mappedTrips = response.results.map(mapApiTripToTrip);
        setTrips(mappedTrips);
        
        // Extract leaders (from trips with leader category)
        const leaderTrips = mappedTrips.filter(
            (          trip: { host: { category: string; }; }) => trip.host?.category === 'Featured Trip Leader'
        );
        setLeaders(leaderTrips as Leader[]);
        
        // Extract agencies (from trips with agency category)
        const agencyTrips = mappedTrips.filter(
            (          trip: { host: { category: string; }; }) => trip.host?.category === 'Featured Trip Agency'
        );

        // Map trips to agencies with stats
        const mappedAgencies = agencyTrips.map(trip => ({
          ...trip,
          stats: {
            travelersEnrolled: Math.floor(Math.random() * 500 + 100).toString(), // Mock data
            tripsCompleted: Math.floor(Math.random() * 50 + 10).toString(), // Mock data
            yearsInBusiness: Math.floor(Math.random() * 10 + 2).toString() // Mock data
          }
        }));

        setAgencies(mappedAgencies as Agency[]);
        
        // Use some trips as similar trips
        setSimilarTrips(mappedTrips.slice(0, 3) as SimilarTrip[]);
        
      } catch (err) {
        console.error("Failed to fetch trips:", err);
        setError("Failed to load data");
        setTrips([]);
        setLeaders([]);
        setAgencies([]);
        setSimilarTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { trips, leaders, agencies, similarTrips, loading, error };
};