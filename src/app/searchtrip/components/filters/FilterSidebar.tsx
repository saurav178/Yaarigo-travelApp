"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Import smaller components
import SearchInput from "./SearchInput";
import RatingStars from "./RatingStars";
import MultiSelect from "./MultiSelect";
import RangeSlider from "./RangeSlider";
import FilterSection from "./FilterSection";
import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
import RadioButtonGroup from "./RadioButtonGroup";
import PriceRange from "./PriceRange";
import LocationInputs from "./LocationInputs";
import TagInput from "./TagInput";

// Types
import type { FilterPayload } from "../../types/types";

type FilterSidebarProps = {
  // Search
  query: string;
  setQuery: (v: string) => void;

  // Person-related
  age: number;
  setAge: (n: number) => void;

  // Duration & Travel
  duration: number;
  setDuration: (n: number) => void;
  travelMode?: string;
  setTravelMode?: (s: string) => void;

  // Budget & Price
  budget: number;
  setBudget: (n: number) => void;
  priceMin?: number;
  setPriceMin?: (n: number) => void;
  priceMax?: number;
  setPriceMax?: (n: number) => void;

  // Trip Styles/Interests
  tripStyles?: string[];
  setTripStyles?: (v: string[]) => void;
  interest?: string;
  setInterest?: (s: string) => void;

  // Preferences
  tripType?: string;
  setTripType?: (s: string) => void;
  foodPref?: string;
  setFoodPref?: (s: string) => void;

  // Location
  fromLocation?: string;
  setFromLocation?: (s: string) => void;
  toLocation?: string;
  setToLocation?: (s: string) => void;

  // Rating & Safety
  minRating: number;
  setMinRating: (n: number) => void;
  minSafeScore: number;
  setMinSafeScore: (n: number) => void;
  matchPercent?: number;
  setMatchPercent?: (n: number) => void;
  scorePercent?: number;
  setScorePercent?: (n: number) => void;

  // Callbacks
  onClear?: () => void;
  onApply?: (payload: FilterPayload) => void;
};

const percentOptions = [90, 80, 70, 60, 50, 0] as const;
const tripTypeOptions = ["+ Solo", "+ Couple", "+ Family", "+ Group", "+ All"] as const;
const foodPrefOptions = ["+ Vegetarian", "+ Non-Veg", "+ Vegan", "+ Halal", "+ All"] as const;
const tripStyleOptions = ["adventure", "backpacking", "luxury", "mountain", "beach", "cultural"] as const;
const travelModeOptions = ["GROUP", "SOLO", "COUPLE", "FAMILY"] as const;

export default function FilterSidebar({
  query,
  setQuery,
  age,
  setAge,
  duration,
  setDuration,
  travelMode = "",
  setTravelMode,
  budget,
  setBudget,
  priceMin = 0,
  setPriceMin,
  priceMax = 50000,
  setPriceMax,
  tripStyles = [],
  setTripStyles,
  interest = "",
  setInterest,
  tripType = "",
  setTripType,
  foodPref = "",
  setFoodPref,
  fromLocation = "",
  setFromLocation,
  toLocation = "",
  setToLocation,
  minRating,
  setMinRating,
  minSafeScore,
  setMinSafeScore,
  matchPercent = 0,
  setMatchPercent,
  scorePercent = 0,
  setScorePercent,
  onClear,
  onApply,
}: FilterSidebarProps) {
  const router = useRouter();

  // Local state for form inputs
  const [localQuery, setLocalQuery] = useState(query);
  const [localAge, setLocalAge] = useState(age);
  const [localDuration, setLocalDuration] = useState(duration);
  const [localBudget, setLocalBudget] = useState(budget);
  const [localMinRating, setLocalMinRating] = useState(minRating);
  const [localMinSafeScore, setLocalMinSafeScore] = useState(minSafeScore);
  const [localMatchPercent, setLocalMatchPercent] = useState(matchPercent);
  const [localScorePercent, setLocalScorePercent] = useState(scorePercent);

  // Parse multi-select values
  const [likes, setLikes] = useState<string[]>(interest ? interest.split(",").map(s => s.trim()).filter(Boolean) : []);
  const [localTripType, setLocalTripType] = useState<string[]>(tripType ? tripType.split(",").map(s => s.trim()).filter(Boolean) : []);
  const [localFoodPref, setLocalFoodPref] = useState<string[]>(foodPref ? foodPref.split(",").map(s => s.trim()).filter(Boolean) : []);

  // UI state
  const [ratingOpen, setRatingOpen] = useState(true);
  const [compatibilityOpen, setCompatibilityOpen] = useState(true);
  const [safeScoreOpen, setSafeScoreOpen] = useState(true);
  const [tripTypeOpen, setTripTypeOpen] = useState(true);
  const [foodPrefOpen, setFoodPrefOpen] = useState(true);
  const [tripStylesOpen, setTripStylesOpen] = useState(false);
  const [priceRangeOpen, setPriceRangeOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [travelModeOpen, setTravelModeOpen] = useState(false);

  // Sync local state with props
  useEffect(() => setLocalQuery(query), [query]);
  useEffect(() => setLocalAge(age), [age]);
  useEffect(() => setLocalDuration(duration), [duration]);
  useEffect(() => setLocalBudget(budget), [budget]);
  useEffect(() => setLocalMinRating(minRating), [minRating]);
  useEffect(() => setLocalMinSafeScore(minSafeScore), [minSafeScore]);
  useEffect(() => setLocalMatchPercent(matchPercent ?? 0), [matchPercent]);
  useEffect(() => setLocalScorePercent(scorePercent ?? 0), [scorePercent]);

  useEffect(() => {
    setLikes(interest ? interest.split(",").map(s => s.trim()).filter(Boolean) : []);
  }, [interest]);

  useEffect(() => {
    setLocalTripType(tripType ? tripType.split(",").map(s => s.trim()).filter(Boolean) : []);
  }, [tripType]);

  useEffect(() => {
    setLocalFoodPref(foodPref ? foodPref.split(",").map(s => s.trim()).filter(Boolean) : []);
  }, [foodPref]);

  // Helper functions
  const buildMultiString = (values: string[]): string => {
    if (!values.length) return "All";
    if (values.length === 1 && values[0].startsWith("+ All")) return "All";
    return values.join(", ");
  };

  const likesToString = (values: string[]): string => {
    if (!values.length) return "All";
    return values.join(", ");
  };

  const buildPayload = (): FilterPayload => ({
    query: localQuery,
    age: localAge,
    duration: localDuration,
    budget: localBudget,
    minRating: localMinRating,
    minSafeScore: localMinSafeScore,
    matchPercent: localMatchPercent,
    scorePercent: localScorePercent,
    interest: likesToString(likes),
    tripType: buildMultiString(localTripType),
    foodPref: buildMultiString(localFoodPref),
  });

  const handleApply = () => {
    const payload = buildPayload();
    setQuery(payload.query);
    setAge(payload.age);
    setDuration(payload.duration);
    setBudget(payload.budget);
    setMinRating(payload.minRating);
    setMinSafeScore(payload.minSafeScore);
    setMatchPercent?.(payload.matchPercent);
    setScorePercent?.(payload.scorePercent);
    setInterest?.(payload.interest);
    setTripType?.(payload.tripType);
    setFoodPref?.(payload.foodPref);
    onApply?.(payload);
  };

  const handleClearAll = () => {
    const cleared: FilterPayload = {
      query: "",
      age: 18,
      duration: 7,
      budget: 0,
      minRating: 0,
      minSafeScore: 0,
      matchPercent: 0,
      scorePercent: 0,
      interest: "All",
      tripType: "All",
      foodPref: "All",
    };

    setLocalQuery(cleared.query);
    setLocalAge(cleared.age);
    setLocalDuration(cleared.duration);
    setLocalBudget(cleared.budget);
    setLocalMinRating(cleared.minRating);
    setLocalMinSafeScore(cleared.minSafeScore);
    setLocalMatchPercent(cleared.matchPercent);
    setLocalScorePercent(cleared.scorePercent);
    setLikes([]);
    setLocalTripType([]);
    setLocalFoodPref([]);

    // Clear combined filter states
    setTripStyles?.([]);
    setPriceMin?.(0);
    setPriceMax?.(50000);
    setFromLocation?.("");
    setToLocation?.("");
    setTravelMode?.("");

    setQuery(cleared.query);
    setAge(cleared.age);
    setDuration(cleared.duration);
    setBudget(cleared.budget);
    setMinRating(cleared.minRating);
    setMinSafeScore(cleared.minSafeScore);
    setMatchPercent?.(cleared.matchPercent);
    setScorePercent?.(cleared.scorePercent);
    setInterest?.(cleared.interest);
    setTripType?.(cleared.tripType);
    setFoodPref?.(cleared.foodPref);

    onClear?.();
    onApply?.(cleared);
  };

  return (
    <div className="bg-white shadow w-full max-w-md mx-auto max-h-[88vh] flex flex-col px-3 -ml-3">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <button
          className="text-sm text-gray-600 cursor-pointer hover:bg-[#E8F1F1] transition"
          onClick={() => router.push("/")}
        >
          ← Back
        </button>
        <button
          onClick={handleClearAll}
          className="ml-auto text-sm text-gray-600 hover:underline cursor-pointer hover:bg-[#E8F1F1]"
        >
          Clear all filters
        </button>
      </div>

      {/* Scrollable content */}
      <div className="mt-1 space-y-4 overflow-y-auto pr-1 flex-1 p-3">
        {/* Search */}
        <SearchInput
          value={localQuery}
          onChange={setLocalQuery}
          placeholder="Destination typing..."
          onVoiceSearch={() => alert("Voice search demo — replace with real voice input if needed.")}
        />

        {/* Quick tags */}
        <div className="flex flex-wrap gap-2 mt-2 cursor-pointer">
          {[
            { label: "Locals", queryKey: "Kolkata" },
            { label: "Nearby", queryKey: "Mumbai" },
            { label: "Starting point", queryKey: "Ahmedabad" },
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => {
                setLocalQuery(tag.label);
                setQuery(tag.queryKey);
              }}
              className="px-3 py-1 text-sm text-white bg-[#1D4350] hover:bg-[#173844] transition"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Language */}
        <TagInput
          label="Language"
          placeholder="Language typing..."
          tags={[]} // TODO: Add language state
          onAddTag={() => {}} // TODO: Implement
          onRemoveTag={() => {}} // TODO: Implement
        />

        {/* Interests */}
        <TagInput
          label="Interests"
          placeholder="Add what you like... (e.g. Hiking, Beaches)"
          tags={likes}
          onAddTag={(tag) => setLikes(prev => [...prev, tag])}
          onRemoveTag={(tag) => setLikes(prev => prev.filter(t => t !== tag))}
        />

        {/* Rating */}
        <FilterSection
          title="Rating"
          isOpen={ratingOpen}
          onToggle={() => setRatingOpen(!ratingOpen)}
        >
          <RatingStars
            value={localMinRating}
            onChange={setLocalMinRating}
          />
        </FilterSection>

        {/* Compatibility */}
        <FilterSection
          title="Compatibility"
          isOpen={compatibilityOpen}
          onToggle={() => setCompatibilityOpen(!compatibilityOpen)}
        >
          <RadioGroup
            options={percentOptions}
            selectedValue={localMatchPercent}
            onChange={setLocalMatchPercent}
          />
        </FilterSection>

        {/* Safe Score */}
        <FilterSection
          title="Safe Score"
          isOpen={safeScoreOpen}
          onToggle={() => setSafeScoreOpen(!safeScoreOpen)}
        >
          <RadioGroup
            options={percentOptions}
            selectedValue={localScorePercent}
            onChange={setLocalScorePercent}
          />
        </FilterSection>

        {/* Trip Type */}
        <FilterSection
          title="Trip Type"
          isOpen={tripTypeOpen}
          onToggle={() => setTripTypeOpen(!tripTypeOpen)}
        >
          <MultiSelect
            options={tripTypeOptions}
            selectedValues={localTripType}
            onChange={setLocalTripType}
            allLabel="+ All"
          />
        </FilterSection>

        {/* Food Preference */}
        <FilterSection
          title="Food Preference"
          isOpen={foodPrefOpen}
          onToggle={() => setFoodPrefOpen(!foodPrefOpen)}
        >
          <MultiSelect
            options={foodPrefOptions}
            selectedValues={localFoodPref}
            onChange={setLocalFoodPref}
            allLabel="+ All"
          />
        </FilterSection>

        {/* Trip Styles */}
        <FilterSection
          title="Trip Styles"
          isOpen={tripStylesOpen}
          onToggle={() => setTripStylesOpen(!tripStylesOpen)}
        >
          <CheckboxGroup
            options={tripStyleOptions}
            selectedValues={tripStyles || []}
            onChange={setTripStyles || (() => {})}
          />
        </FilterSection>

        {/* Travel Mode */}
        <FilterSection
          title="Travel Mode"
          isOpen={travelModeOpen}
          onToggle={() => setTravelModeOpen(!travelModeOpen)}
        >
          <RadioButtonGroup
            options={travelModeOptions}
            selectedValue={travelMode}
            onChange={setTravelMode || (() => {})}
            showClear={true}
            onClear={() => setTravelMode?.("")}
          />
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isOpen={priceRangeOpen}
          onToggle={() => setPriceRangeOpen(!priceRangeOpen)}
        >
          <PriceRange
            minPrice={priceMin}
            maxPrice={priceMax}
            onMinChange={setPriceMin || (() => {})}
            onMaxChange={setPriceMax || (() => {})}
          />
        </FilterSection>

        {/* Locations */}
        <FilterSection
          title="From/To Location"
          isOpen={locationsOpen}
          onToggle={() => setLocationsOpen(!locationsOpen)}
        >
          <LocationInputs
            fromLocation={fromLocation}
            toLocation={toLocation}
            onFromChange={setFromLocation || (() => {})}
            onToChange={setToLocation || (() => {})}
          />
        </FilterSection>

        {/* Sliders */}
        <RangeSlider
          label="Duration (days)"
          value={localDuration}
          onChange={setLocalDuration}
          min={1}
          max={50}
          valueFormatter={(v) => `${v} days`}
        />

        <RangeSlider
          label="Age Range"
          value={localAge}
          onChange={setLocalAge}
          min={12}
          max={50}
          valueFormatter={(v) => `${v} Years`}
        />

        <RangeSlider
          label="Budget (Rs)"
          value={localBudget}
          onChange={setLocalBudget}
          min={0}
          max={200000}
          step={500}
          valueFormatter={(v) => `₹${v.toLocaleString()}`}
        />
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        className="mt-4 mb-3 mx-auto w-fit bg-[#1D4350] text-white py-2 px-14 font-semibold hover:bg-[#173844] transition cursor-pointer"
      >
        Apply Filter
      </button>
    </div>
  );
}
