// hooks/useFilters.ts
"use client";

import { useState, useMemo } from "react";
import type { Trip, SimilarTrip, Leader, Agency } from "../types/types";

export const useFilters = (
  trips: Trip[],
  leaders: Leader[],
  agencies: Agency[],
  similarTrips: SimilarTrip[]
) => {
  // Filter states
  const [query, setQuery] = useState("");
  const [age, setAge] = useState(18);
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [minSafeScore, setMinSafeScore] = useState(0);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);
  
  // Combined filter states
  const [selectedTripStyles, setSelectedTripStyles] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(50000);
  const [selectedFromLocation, setSelectedFromLocation] = useState("");
  const [selectedToLocation, setSelectedToLocation] = useState("");
  const [selectedTravelMode, setSelectedTravelMode] = useState("");

  // Handle apply/clear
  const handleApplyFilters = () => {
    setHasAppliedFilters(true);
  };

  const handleClearFilters = () => {
    setHasAppliedFilters(false);
    setQuery("");
    setAge(18);
    setDuration(5);
    setBudget(15000);
    setMinRating(0);
    setMinSafeScore(0);
    setSelectedTripStyles([]);
    setPriceMin(0);
    setPriceMax(50000);
    setSelectedFromLocation("");
    setSelectedToLocation("");
    setSelectedTravelMode("");
  };

  // Filtered data
  const filteredTrips = useMemo(() => {
    let filtered = trips.filter(trip => 
      trip.title.toLowerCase().includes(query.toLowerCase()) ||
      trip.from.toLowerCase().includes(query.toLowerCase()) ||
      trip.to.toLowerCase().includes(query.toLowerCase())
    );

    // if (hasAppliedFilters) {
    //   filtered = filterItems(filtered, {
    //     minRating,
    //     minSafeScore,
    //     age,
    //     budget,
    //     duration,
    //     tripStyles: selectedTripStyles,
    //     priceRange: { min: priceMin, max: priceMax },
    //     fromLocation: selectedFromLocation,
    //     toLocation: selectedToLocation,
    //     travelMode: selectedTravelMode,
    //   });
    // }

    return filtered;
  }, [trips, query, hasAppliedFilters, minRating, minSafeScore, age, budget, duration, selectedTripStyles, priceMin, priceMax, selectedFromLocation, selectedToLocation, selectedTravelMode]);

  const filteredLeaders = useMemo(() => {
    let filtered = leaders.filter(leader =>
      leader.title.toLowerCase().includes(query.toLowerCase()) ||
      leader.from.toLowerCase().includes(query.toLowerCase()) ||
      leader.to.toLowerCase().includes(query.toLowerCase())
    );

    // if (hasAppliedFilters) {
    //   filtered = filterItems(filtered, { 
    //     minRating, 
    //     minSafeScore, 
    //     age, 
    //     budget 
    //   });
    // }

    return filtered;
  }, [leaders, query, hasAppliedFilters, minRating, minSafeScore, age, budget]);

  const filteredAgencies = useMemo(() => {
    let filtered = agencies.filter(agency =>
      agency.title.toLowerCase().includes(query.toLowerCase()) ||
      agency.from.toLowerCase().includes(query.toLowerCase()) ||
      agency.to.toLowerCase().includes(query.toLowerCase())
    );

    // if (hasAppliedFilters) {
    //   filtered = filterItems(filtered, { 
    //     minRating, 
    //     minSafeScore, 
    //     budget 
    //   });
    // }

    return filtered;
  }, [agencies, query, hasAppliedFilters, minRating, minSafeScore, budget]);

  const filteredSimilarTrips = useMemo(() => {
    let filtered = similarTrips.filter(trip =>
      trip.title.toLowerCase().includes(query.toLowerCase()) ||
      trip.from.toLowerCase().includes(query.toLowerCase()) ||
      trip.to.toLowerCase().includes(query.toLowerCase())
    );

    // if (hasAppliedFilters) {
    //   filtered = filterItems(filtered, { 
    //     minRating, 
    //     minSafeScore, 
    //     age, 
    //     budget 
    //   });
    // }

    return filtered;
  }, [similarTrips, query, hasAppliedFilters, minRating, minSafeScore, age, budget]);

  return {
    // State
    query,
    setQuery,
    age,
    setAge,
    duration,
    setDuration,
    budget,
    setBudget,
    minRating,
    setMinRating,
    minSafeScore,
    setMinSafeScore,
    hasAppliedFilters,
    selectedTripStyles,
    setSelectedTripStyles,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    selectedFromLocation,
    setSelectedFromLocation,
    selectedToLocation,
    setSelectedToLocation,
    selectedTravelMode,
    setSelectedTravelMode,
    
    // Filtered data
    filteredTrips,
    filteredLeaders,
    filteredAgencies,
    filteredSimilarTrips,
    
    // Actions
    handleApplyFilters,
    handleClearFilters,
  };
};