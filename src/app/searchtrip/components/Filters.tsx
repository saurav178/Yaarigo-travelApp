// Filters

"use client";

import { useEffect, useState } from "react";
import { Search, Mic, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

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

  // ratings / scores (parent should use these in predicate)
  minRating: number;
  setMinRating: (n: number) => void;

  minSafeScore: number;
  setMinSafeScore: (n: number) => void;

  // optional match and score percent filters (parent may use or ignore)
  matchPercent?: number;
  setMatchPercent?: (n: number) => void;

  scorePercent?: number;
  setScorePercent?: (n: number) => void;

  // NEW optional fields for Interests / TripType / FoodPref (kept optional for backward compatibility)
  interest?: string;
  setInterest?: (s: string) => void;

  tripType?: string;
  setTripType?: (s: string) => void;

  foodPref?: string;
  setFoodPref?: (s: string) => void;

  // optional behaviour
  autoApply?: boolean; // when true, apply changes immediately instead of waiting for "Apply"

  // optional clear handler (parent can also derive clear by resetting setter props)
  onClear?: () => void;

  // NEW optional callback: parent receives full filters payload when Apply/Clear/autoApply triggers
  onApply?: (payload: {
    query: string;
    age: number;
    duration: number;
    budget: number;
    minRating: number;
    minSafeScore: number;
    matchPercent: number;
    scorePercent: number;
    interest: string;
    tripType: string;
    foodPref: string;
  }) => void;
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
  // NEW props (optional)
  interest = "All",
  setInterest,
  tripType = "All",
  setTripType,
  foodPref = "All",
  setFoodPref,
  autoApply = false,
  onClear,
  onApply,
}: Props) {
  const Router = useRouter();

  // Local (staged) state — user manipulates these until they press Apply (unless autoApply=true)
  const [localQuery, setLocalQuery] = useState(query);
  const [localAge, setLocalAge] = useState(age);
  const [localDuration, setLocalDuration] = useState(duration);
  const [localBudget, setLocalBudget] = useState(budget);

  // Radios (local)
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

  // New: Interests / Trip type / Food preference (local-only if parent doesn't provide setters)
  const [localInterest, setLocalInterest] = useState<string>(interest ?? "All");
  const [localTripType, setLocalTripType] = useState<string>(tripType ?? "All");
  const [localFoodPref, setLocalFoodPref] = useState<string>(foodPref ?? "All");

  // Languages
  const [inputLang, setInputLang] = useState("");
  const [languages, setLanguages] = useState<string[]>(["English"]);

  // (removed old interests input state)
  const [rating, setRating] = useState(true);
  const [campability, setCampability] = useState(true);
  const [safe, setSafe] = useState(true);

  // Collapsible toggles
  const [interestOpen, setInterestOpen] = useState(true);
  const [tripTypeOpen, setTripTypeOpen] = useState(true);
  const [foodPrefOpen, setFoodPrefOpen] = useState(true);

  // Sync local state when parent props change externally
  useEffect(() => setLocalQuery(query), [query]);
  useEffect(() => setLocalAge(age), [age]);
  useEffect(() => setLocalDuration(duration), [duration]);
  useEffect(() => setLocalBudget(budget), [budget]);

  useEffect(() => setLocalMinRating(minRating ?? 0), [minRating]);
  useEffect(() => setLocalMinSafeScore(minSafeScore ?? 0), [minSafeScore]);
  useEffect(() => setLocalMatchPercent(matchPercent ?? 0), [matchPercent]);
  useEffect(() => setLocalScorePercent(scorePercent ?? 0), [scorePercent]);

  // Sync new props if parent provided initial values
  useEffect(() => setLocalInterest(interest ?? "All"), [interest]);
  useEffect(() => setLocalTripType(tripType ?? "All"), [tripType]);
  useEffect(() => setLocalFoodPref(foodPref ?? "All"), [foodPref]);

  // Helpers
  const addLang = () => {
    const v = inputLang.trim();
    if (!v) return;
    if (!languages.includes(v)) setLanguages((s) => [...s, v]);
    setInputLang("");
  };
  const removeLang = (l: string) =>
    setLanguages((s) => s.filter((x) => x !== l));

  const startVoice = () => {
    // demo hook — populate localQuery as example
    // replace with Web Speech API if you want real voice input
    alert("Voice search demo — this will populate the destination field.");
  };

  // Build payload helper
  const buildPayload = () => ({
    query: localQuery,
    age: localAge,
    duration: localDuration,
    budget: localBudget,
    minRating: localMinRating,
    minSafeScore: localMinSafeScore,
    matchPercent: localMatchPercent,
    scorePercent: localScorePercent,
    interest: localInterest,
    tripType: localTripType,
    foodPref: localFoodPref,
  });

  // Apply local state to parent
  const handleApply = () => {
    // existing setters for backwards compatibility
    setQuery(localQuery);
    setAge(localAge);
    setDuration(localDuration);
    setBudget(localBudget);

    setMinRating(localMinRating);
    setMinSafeScore(localMinSafeScore);

    if (setMatchPercent) setMatchPercent(localMatchPercent);
    if (setScorePercent) setScorePercent(localScorePercent);

    // optional new setters
    if (setInterest) setInterest(localInterest);
    if (setTripType) setTripType(localTripType);
    if (setFoodPref) setFoodPref(localFoodPref);

    // call onApply callback if provided
    onApply?.(buildPayload());
  };

  // Clear all (local + optionally parent if autoApply)
  const handleClearAll = () => {
    // reset local
    setLocalQuery("");
    setLocalAge(18);
    setLocalDuration(7);
    setLocalBudget(0);
    setLanguages(["English"]);
    setInputLang("");
    // interests removed — reset local selections
    setLocalInterest("All");
    setLocalTripType("All");
    setLocalFoodPref("All");
    setLocalMinRating(0);
    setLocalMinSafeScore(0);
    setLocalMatchPercent(0);
    setLocalScorePercent(0);

    // existing parent setters when autoApply is true
    if (autoApply) {
      setQuery("");
      setAge(18);
      setDuration(7);
      setBudget(0);
      setMinRating(0);
      setMinSafeScore(0);
      if (setMatchPercent) setMatchPercent(0);
      if (setScorePercent) setScorePercent(0);

      if (setInterest) setInterest("All");
      if (setTripType) setTripType("All");
      if (setFoodPref) setFoodPref("All");
    }

    // call parent clear handler if provided
    onClear?.();

    // call onApply so parent can react to cleared filters immediately
    onApply?.(buildPayload());
  };

  // Optionally apply single controls immediately
  const maybeApplySingle = (
    field:
      | "query"
      | "age"
      | "duration"
      | "budget"
      | "minRating"
      | "minSafeScore"
      | "matchPercent"
      | "scorePercent"
      | "interest"
      | "tripType"
      | "foodPref"
  ) => {
    if (!autoApply) return;
    switch (field) {
      case "query":
        setQuery(localQuery);
        break;
      case "age":
        setAge(localAge);
        break;
      case "duration":
        setDuration(localDuration);
        break;
      case "budget":
        setBudget(localBudget);
        break;
      case "minRating":
        setMinRating(localMinRating);
        break;
      case "minSafeScore":
        setMinSafeScore(localMinSafeScore);
        break;
      case "matchPercent":
        setMatchPercent?.(localMatchPercent);
        break;
      case "scorePercent":
        setScorePercent?.(localScorePercent);
        break;
      case "interest":
        if (setInterest) setInterest(localInterest);
        break;
      case "tripType":
        if (setTripType) setTripType(localTripType);
        break;
      case "foodPref":
        if (setFoodPref) setFoodPref(localFoodPref);
        break;
    }

    // notify parent instantly if provided
    onApply?.(buildPayload());
  };

  // Radio/group options
  const ratingOptions = [4, 3, 2, 0] as const; // 0 == Any
  const percentOptions = [90, 80, 70, 60, 50, 0] as const; // 0 == Any

  // New options — edit these as you like
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

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          className="text-sm text-gray-600 hover:text-gray-800 transition"
          onClick={() => Router.push("/")}
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
        {/* Destination input (local only) */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              maybeApplySingle("query");
            }}
            placeholder="Destination typing..."
            className="w-full pl-9 pr-10 py-2 rounded-md border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EB5757]"
          />
          <button
            type="button"
            onClick={() => startVoice()}
            aria-label="Voice Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EB5757] transition-colors"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {["Locals", "Nearby", "Starting point"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setLocalQuery(tag);
                maybeApplySingle("query");
              }}
              className="px-3 py-1   text-sm text-gray-600 rounded-full  transition"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* <hr className="my-1 " /> */}
        {/* Language input */}
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
              className="w-full pl-9 pr-20 py-2 rounded-md border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EB5757]"
            />
            <button
              onClick={addLang}
              className="absolute right-3 top-1/2 -translate-y-1/2  text-gray-600 text-sm font-medium hover:underline"
            >
              Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => (
              <div
                key={l}
                className="flex items-center gap-2 bg-white  text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                <span>{l}</span>
                <button onClick={() => removeLang(l)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Rating (collapsible) - unchanged except minor style preserved ===== */}
        <div className="mb-3">
          {/* Header with arrow */}
          <button
            onClick={() => setRating(!rating)}
            aria-expanded={rating}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700 mb-2"
          >
            <span>Rating</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                rating ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Collapsible content */}

          {rating && (
            <div className="flex flex-col gap-2">
              {ratingOptions.map((r: number) => {
                const isActive = localMinRating === r;

                return (
                  <label
                    key={r}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition
                      ${isActive ? "bg-[#E8F1F1]" : ""}
                    `}
                  >
                    <input
                      type="radio"
                      name="ratingFilter"
                      value={r}
                      checked={isActive}
                      onChange={() => {
                        setLocalMinRating(r);
                        maybeApplySingle("minRating");
                      }}
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

        {/* ===== Compability (radio buttons) ===== */}

        <div className="mb-3">
          <button
            onClick={() => setCampability(!campability)}
            aria-expanded={campability}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700"
          >
            <span>Compability</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                campability ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {campability && (
            <div className="flex flex-col gap-2 mt-3">
              {percentOptions.map((p) => {
                const isActive = localMatchPercent === p;
                return (
                  <label
                    key={p}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition
              ${isActive ? "bg-[#E8F1F1]" : ""}`}
                  >
                    <input
                      type="radio"
                      name="matchPercentFilter"
                      value={p}
                      checked={isActive}
                      onChange={() => {
                        setLocalMatchPercent(p);
                        maybeApplySingle("matchPercent");
                      }}
                      className="h-4 w-4 cursor-pointer accent-[#1D4350]"
                    />
                    <span className="text-sm text-gray-800">
                      {p === 0 ? "Any" : ` ${p}% + `}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* ===== Safe Score (radio buttons) ===== */}

        <div className="mb-3">
          <button
            onClick={() => setSafe(!safe)}
            aria-expanded={safe}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-700"
          >
            <span>Safe Score</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                safe ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {safe && (
            <div className="flex flex-col gap-2 mt-3">
              {percentOptions.map((p) => {
                const isActive = localScorePercent === p;
                return (
                  <label
                    key={p}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition
              ${isActive ? "bg-[#E8F1F1]" : ""}`}
                  >
                    <input
                      type="radio"
                      name="scorePercentFilter"
                      value={p}
                      checked={isActive}
                      onChange={() => {
                        setLocalScorePercent(p);
                        maybeApplySingle("scorePercent");
                      }}
                      className="h-4 w-4 cursor-pointer accent-[#1D4350]"
                    />
                    <span className="text-sm text-gray-800">
                      {p === 0 ? "Any" : `${p}% + `}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* ===== New: Interests (replaces old input) ===== */}
        <div className="mb-3">
          <button
            onClick={() => setInterestOpen(!interestOpen)}
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
                const isActive = localInterest === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setLocalInterest(opt);
                      maybeApplySingle("interest");
                    }}
                    className={`text-sm py-2 px-3 rounded-xl w-full transition
                      ${
                        isActive
                          ? "bg-[#E8F1F1] text-[#1D4350]"
                          : "bg-transparent text-gray-700"
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ===== New: Trip Type ===== */}

        <div className="mb-3">
          <button
            onClick={() => setTripTypeOpen(!tripTypeOpen)}
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
                const isActive = localTripType === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setLocalTripType(opt);
                      maybeApplySingle("tripType");
                    }}
                    className={`text-sm py-2 px-3 rounded-xl w-full transition
                      ${
                        isActive
                          ? "bg-[#E8F1F1] text-[#0A4D4A]"
                          : "bg-transparent text-gray-700"
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ===== New: Food Preference ===== */}
        <div className="mb-3">
          <button
            onClick={() => setFoodPrefOpen(!foodPrefOpen)}
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
                const isActive = localFoodPref === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setLocalFoodPref(opt);
                      maybeApplySingle("foodPref");
                    }}
                    className={`text-sm py-2 px-3 rounded-xl w-full transition
                      ${
                        isActive
                          ? "bg-[#E8F1F1] text-[#0A4D4A]"
                          : "bg-transparent text-gray-700"
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Sliders */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mt-3 mb-2">
            Duration (days)
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={localDuration}
            onChange={(e) => {
              setLocalDuration(Number(e.target.value));
              maybeApplySingle("duration");
            }}
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
            onChange={(e) => {
              setLocalAge(Number(e.target.value));
              maybeApplySingle("age");
            }}
            className="w-full  accent-[#1D4350]"
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
            onChange={(e) => {
              setLocalBudget(Number(e.target.value));
              maybeApplySingle("budget");
            }}
            className="w-full accent-[#1D4350]"
          />
          <div className="text-xs text-gray-500 mt-1">
            ₹{localBudget.toLocaleString()}
          </div>
        </div>

        {/* Apply Button (keeps backward compatibility) */}
        {!autoApply && (
          <button
            onClick={handleApply}
            className="mt-4 w-full bg-[#1D4350] text-white py-2 rounded-lg font-semibold hover:bg-[#1D4350] transition"
          >
            Apply Filter
          </button>
        )}
      </div>
    </div>
  );
}
