
// Filters

"use client";

import { useEffect, useState } from "react";
import { Search, Mic, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

export type FilterPayload = {
  query: string;
  age: number;
  duration: number;
  budget: number;
  minRating: number;
  minSafeScore: number;
  matchPercent: number;
  scorePercent: number;
  interest: string; // still string, will be "Hiking, Beaches"
  tripType: string; // same
  foodPref: string; // same
};

type Props = {
  // core filters (parent state / setters)
  query: string;
  setQuery: (v: string) => void;

  age: number;
  setAge: (n: number) => void;

  duration: number;
  setDuration: (n: number) => void;

  budget: number;
  setBudget: (n: number) => void;

  // ratings / scores
  minRating: number;
  setMinRating: (n: number) => void;

  minSafeScore: number;
  setMinSafeScore: (n: number) => void;

  matchPercent?: number;
  setMatchPercent?: (n: number) => void;

  scorePercent?: number;
  setScorePercent?: (n: number) => void;

  // optional chips
  interest?: string; // comma separated string from parent (e.g., "Hiking, Beaches")
  setInterest?: (s: string) => void;

  tripType?: string;
  setTripType?: (s: string) => void;

  foodPref?: string;
  setFoodPref?: (s: string) => void;

  // optional
  onClear?: () => void;
  onApply?: (payload: FilterPayload) => void;
};

export default function Filters({
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
  matchPercent = 0,
  setMatchPercent,
  scorePercent = 0,
  setScorePercent,
  interest = "All",
  setInterest,
  tripType = "All",
  setTripType,
  foodPref = "All",
  setFoodPref,
  onClear,
  onApply,
}: Props) {
  const router = useRouter();

  // local state (only applied when clicking "Apply Filter")
  const [localQuery, setLocalQuery] = useState<string>(query);
  const [localAge, setLocalAge] = useState<number>(age);
  const [localDuration, setLocalDuration] = useState<number>(duration);
  const [localBudget, setLocalBudget] = useState<number>(budget);

  const [localMinRating, setLocalMinRating] = useState<number>(minRating ?? 0);
  const [localMinSafeScore, setLocalMinSafeScore] = useState<number>(
    minSafeScore ?? 0
  );
  const [localMatchPercent, setLocalMatchPercent] = useState<number>(
    matchPercent ?? 0
  );
  const [localScorePercent, setLocalScorePercent] = useState<number>(
    scorePercent ?? 0
  );

  // 🔄 NEW: multi-select local state as arrays
  const [localInterest, setLocalInterest] = useState<string[]>([]);
  const [localTripType, setLocalTripType] = useState<string[]>([]);
  const [localFoodPref, setLocalFoodPref] = useState<string[]>([]);

  // language pills (purely visual, not used in filter logic)
  const [inputLang, setInputLang] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>(["English"]);

  // collapsibles
  const [ratingOpen, setRatingOpen] = useState<boolean>(true);
  const [campabilityOpen, setCampabilityOpen] = useState<boolean>(true);
  const [safeOpen, setSafeOpen] = useState<boolean>(true);
  const [interestOpen, setInterestOpen] = useState<boolean>(true);
  const [tripTypeOpen, setTripTypeOpen] = useState<boolean>(true);
  const [foodPrefOpen, setFoodPrefOpen] = useState<boolean>(true);

  const ratingOptions = [4, 3, 2, 0] as const;
  const percentOptions = [90, 80, 70, 60, 50, 0] as const;

  const interestOptions = [
    "+ Hiking",
    "+ Beaches",
    "+ Culture",
    "+ Wildlife",
    "+ Nightlife",
    "+ All",
  ] as const;
  const tripTypeOptions = [
    "+ Solo",
    "+ Couple",
    "+ Family",
    "+ Group",
    "+ All",
  ] as const;
  const foodPrefOptions = [
    "+ Vegetarian",
    "+ Non-Veg",
    "+ Vegan",
    "+ Halal",
    "+ All",
  ] as const;

  const ALL_INTEREST = "+ All";
  const ALL_TRIP = "+ All";
  const ALL_FOOD = "+ All";

  // helper to parse a comma-separated string from parent into array
  const parseMulti = (value: string | undefined, allLabel: string): string[] => {
    if (!value) return [];
    const trimmed = value.trim();
    if (!trimmed || trimmed === "All" || trimmed === allLabel) {
      return [];
    }
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // sync local if parent changes from outside
  useEffect(() => setLocalQuery(query), [query]);
  useEffect(() => setLocalAge(age), [age]);
  useEffect(() => setLocalDuration(duration), [duration]);
  useEffect(() => setLocalBudget(budget), [budget]);
  useEffect(() => setLocalMinRating(minRating ?? 0), [minRating]);
  useEffect(
    () => setLocalMinSafeScore(minSafeScore ?? 0),
    [minSafeScore]
  );
  useEffect(
    () => setLocalMatchPercent(matchPercent ?? 0),
    [matchPercent]
  );
  useEffect(
    () => setLocalScorePercent(scorePercent ?? 0),
    [scorePercent]
  );

  // 🔄 sync multi-select from parent strings
  useEffect(() => {
    setLocalInterest(parseMulti(interest, ALL_INTEREST));
  }, [interest]);

  useEffect(() => {
    setLocalTripType(parseMulti(tripType, ALL_TRIP));
  }, [tripType]);

  useEffect(() => {
    setLocalFoodPref(parseMulti(foodPref, ALL_FOOD));
  }, [foodPref]);

  // helpers
  const addLang = () => {
    const v = inputLang.trim();
    if (!v) return;
    if (!languages.includes(v)) {
      setLanguages((prev) => [...prev, v]);
    }
    setInputLang("");
  };

  const removeLang = (l: string) =>
    setLanguages((prev) => prev.filter((x) => x !== l));

  const startVoice = () => {
    alert("Voice search demo — replace with real voice input if needed.");
  };

  // 🔁 toggle helpers for chips
  const toggleFromList = (
    prev: string[],
    opt: string,
    allLabel: string
  ): string[] => {
    // Special: All
    if (opt === allLabel) {
      const isAllOnly = prev.length === 0 || (prev.length === 1 && prev[0] === allLabel);
      // if only All or nothing -> clear
      if (isAllOnly) return [];
      // else -> All only
      return [allLabel];
    }

    // Normal option: remove All if present
    let next = prev.filter((x) => x !== allLabel);

    if (next.includes(opt)) {
      // unselect
      next = next.filter((x) => x !== opt);
    } else {
      // select
      next = [...next, opt];
    }

    return next;
  };

  const buildMultiString = (values: string[]): string => {
    // if nothing selected, treat as "All"
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
    // ⬇ convert arrays to strings before sending
    interest: buildMultiString(localInterest),
    tripType: buildMultiString(localTripType),
    foodPref: buildMultiString(localFoodPref),
  });

  // APPLY: push all local values to parent
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

  // CLEAR: reset everything
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

    // reset local
    setLocalQuery(cleared.query);
    setLocalAge(cleared.age);
    setLocalDuration(cleared.duration);
    setLocalBudget(cleared.budget);
    setLocalMinRating(cleared.minRating);
    setLocalMinSafeScore(cleared.minSafeScore);
    setLocalMatchPercent(cleared.matchPercent);
    setLocalScorePercent(cleared.scorePercent);
    setLocalInterest([]); // none => All
    setLocalTripType([]);
    setLocalFoodPref([]);
    setLanguages(["English"]);
    setInputLang("");

    // also clear parent
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
    <div className="bg-white p-5 rounded-xl shadow w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          className="text-sm text-gray-600 hover:text-gray-800 transition"
          onClick={() => router.push("/")}
        >
          ← Back
        </button>
        <button
          onClick={handleClearAll}
          className="ml-auto text-sm text-gray-600 hover:underline"
        >
          Clear all filters
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {/* Destination search (LIVE: updates parent immediately) */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={localQuery}
            onChange={(e) => {
              const v = e.target.value;
              setLocalQuery(v);
              setQuery(v); // live filtering for search
            }}
            placeholder="Destination typing..."
            className="w-full pl-9 pr-10 py-2 rounded-md border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4350]"
          />
          <button
            type="button"
            onClick={startVoice}
            aria-label="Voice Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D4350] transition-colors"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Quick tags – REAL location presets via queryKey */}
        <div className="flex flex-wrap gap-2 mt-2">
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
              className="px-3 py-1 text-sm text-gray-600 rounded-full transition"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Language input (visual only) */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Language
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={inputLang}
              onChange={(e) => setInputLang(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLang()}
              placeholder="Language typing..."
              className="w-full pl-9 pr-20 py-2 rounded-md border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4350]"
            />
            <button
              onClick={addLang}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium hover:underline"
            >
              Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => (
              <div
                key={l}
                className="flex items-center gap-2 bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                <span>{l}</span>
                <button onClick={() => removeLang(l)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <button
            onClick={() => setRatingOpen((o) => !o)}
            aria-expanded={ratingOpen}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700 mb-2"
          >
            <span>Rating</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                ratingOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {ratingOpen && (
            <div className="flex flex-col gap-2">
              {ratingOptions.map((r) => {
                const isActive = localMinRating === r;
                return (
                  <label
                    key={r}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                      isActive ? "bg-[#E8F1F1]" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="ratingFilter"
                      value={r}
                      checked={isActive}
                      onChange={() => setLocalMinRating(r)}
                      className="h-4 w-4 cursor-pointer accent-[#0A4D4A]"
                    />
                    <span className="text-sm text-gray-800">
                      {r === 0 ? "Any" : `⭐ ${r}.0+`}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Compatibility */}
        <div className="mb-3">
          <button
            onClick={() => setCampabilityOpen((o) => !o)}
            aria-expanded={campabilityOpen}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700"
          >
            <span>Compability</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                campabilityOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {campabilityOpen && (
            <div className="flex flex-col gap-2 mt-3">
              {percentOptions.map((p) => {
                const isActive = localMatchPercent === p;
                return (
                  <label
                    key={p}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                      isActive ? "bg-[#E8F1F1]" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="matchPercentFilter"
                      value={p}
                      checked={isActive}
                      onChange={() => setLocalMatchPercent(p)}
                      className="h-4 w-4 cursor-pointer accent-[#1D4350]"
                    />
                    <span className="text-sm text-gray-800">
                      {p === 0 ? "Any" : `${p}% +`}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Safe Score */}
        <div className="mb-3">
          <button
            onClick={() => setSafeOpen((o) => !o)}
            aria-expanded={safeOpen}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700"
          >
            <span>Safe Score</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                safeOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {safeOpen && (
            <div className="flex flex-col gap-2 mt-3">
              {percentOptions.map((p) => {
                const isActive = localScorePercent === p;
                return (
                  <label
                    key={p}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                      isActive ? "bg-[#E8F1F1]" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="scorePercentFilter"
                      value={p}
                      checked={isActive}
                      onChange={() => setLocalScorePercent(p)}
                      className="h-4 w-4 cursor-pointer accent-[#1D4350]"
                    />
                    <span className="text-sm text-gray-800">
                      {p === 0 ? "Any" : `${p}% +`}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Interests */}
        <div className="mb-3">
          <button
            onClick={() => setInterestOpen((o) => !o)}
            aria-expanded={interestOpen}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700"
          >
            <span>Interests</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                interestOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {interestOpen && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {interestOptions.map((opt) => {
                const isActive = localInterest.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() =>
                      setLocalInterest((prev) =>
                        toggleFromList(prev, opt, ALL_INTEREST)
                      )
                    }
                    className={`text-sm py-2 px-3 rounded-xl w-full transition ${
                      isActive
                        ? "bg-[#E8F1F1] text-[#1D4350]"
                        : "bg-transparent text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Trip Type */}
        <div className="mb-3">
          <button
            onClick={() => setTripTypeOpen((o) => !o)}
            aria-expanded={tripTypeOpen}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700"
          >
            <span>Trip Type</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                tripTypeOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {tripTypeOpen && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {tripTypeOptions.map((opt) => {
                const isActive = localTripType.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() =>
                      setLocalTripType((prev) =>
                        toggleFromList(prev, opt, ALL_TRIP)
                      )
                    }
                    className={`text-sm py-2 px-3 rounded-xl w-full transition ${
                      isActive
                        ? "bg-[#E8F1F1] text-[#0A4D4A]"
                        : "bg-transparent text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Food Preference */}
        <div className="mb-3">
          <button
            onClick={() => setFoodPrefOpen((o) => !o)}
            aria-expanded={foodPrefOpen}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700"
          >
            <span>Food Preference</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                foodPrefOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {foodPrefOpen && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {foodPrefOptions.map((opt) => {
                const isActive = localFoodPref.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() =>
                      setLocalFoodPref((prev) =>
                        toggleFromList(prev, opt, ALL_FOOD)
                      )
                    }
                    className={`text-sm py-2 px-3 rounded-xl w-full transition ${
                      isActive
                        ? "bg-[#E8F1F1] text-[#0A4D4A]"
                        : "bg-transparent text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Sliders (only applied on "Apply Filter") */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mt-3 mb-2">
            Duration (days)
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={localDuration}
            onChange={(e) => setLocalDuration(Number(e.target.value))}
            className="w-full accent-[#1D4350]"
          />
          <div className="text-xs text-gray-500 mt-1">{localDuration} days</div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mt-3 mb-2">
            Age Range
          </label>
          <input
            type="range"
            min={12}
            max={50}
            value={localAge}
            onChange={(e) => setLocalAge(Number(e.target.value))}
            className="w-full accent-[#1D4350]"
          />
          <div className="text-xs text-gray-500 mt-1">{localAge} Years</div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mt-3 mb-2">
            Budget (Rs)
          </label>
          <input
            type="range"
            min={0}
            max={200000}
            step={500}
            value={localBudget}
            onChange={(e) => setLocalBudget(Number(e.target.value))}
            className="w-full accent-[#1D4350]"
          />
          <div className="text-xs text-gray-500 mt-1">
            ₹{localBudget.toLocaleString()}
          </div>
        </div>

        {/* APPLY BUTTON – main trigger */}
        <button
          onClick={handleApply}
          className="mt-4 w-full bg-[#1D4350] text-white py-2 rounded-lg font-semibold hover:bg-[#1D4350] transition"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
