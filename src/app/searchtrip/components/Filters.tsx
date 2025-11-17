
// Filters


"use client";

import { useEffect, useState } from "react";
import { Search, Mic, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaStar } from "react-icons/fa";

export type FilterPayload = {
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
};

type Props = {
  query: string;
  setQuery: (v: string) => void;
  age: number;
  setAge: (n: number) => void;
  duration: number;
  setDuration: (n: number) => void;
  budget: number;
  setBudget: (n: number) => void;
  minRating: number;
  setMinRating: (n: number) => void;
  minSafeScore: number;
  setMinSafeScore: (n: number) => void;
  matchPercent?: number;
  setMatchPercent?: (n: number) => void;
  scorePercent?: number;
  setScorePercent?: (n: number) => void;
  interest?: string;
  setInterest?: (s: string) => void;
  tripType?: string;
  setTripType?: (s: string) => void;
  foodPref?: string;
  setFoodPref?: (s: string) => void;
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

  const [likesInput, setLikesInput] = useState<string>("");
  const [likes, setLikes] = useState<string[]>([]);

  const [localTripType, setLocalTripType] = useState<string[]>([]);
  const [localFoodPref, setLocalFoodPref] = useState<string[]>([]);

  const [inputLang, setInputLang] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>(["English"]);

  const [ratingOpen, setRatingOpen] = useState<boolean>(true);
  const [campabilityOpen, setCampabilityOpen] = useState<boolean>(true);
  const [safeOpen, setSafeOpen] = useState<boolean>(true);
  const [tripTypeOpen, setTripTypeOpen] = useState<boolean>(true);
  const [foodPrefOpen, setFoodPrefOpen] = useState<boolean>(true);

  const percentOptions = [90, 80, 70, 60, 50, 0] as const;
  const tripTypeOptions = ["+ Solo", "+ Couple", "+ Family", "+ Group", "+ All"] as const;
  const foodPrefOptions = ["+ Vegetarian", "+ Non-Veg", "+ Vegan", "+ Halal", "+ All"] as const;
  const ALL_TRIP = "+ All";
  const ALL_FOOD = "+ All";

  const parseCSV = (value: string | undefined): string[] => {
    if (!value) return [];
    const trimmed = value.trim();
    if (!trimmed || trimmed === "All") return [];
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  };

  const parseMulti = (value: string | undefined, allLabel: string): string[] => {
    if (!value) return [];
    const trimmed = value.trim();
    if (!trimmed || trimmed === "All" || trimmed === allLabel) return [];
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  };

  useEffect(() => setLocalQuery(query), [query]);
  useEffect(() => setLocalAge(age), [age]);
  useEffect(() => setLocalDuration(duration), [duration]);
  useEffect(() => setLocalBudget(budget), [budget]);
  useEffect(() => setLocalMinRating(minRating ?? 0), [minRating]);
  useEffect(() => setLocalMinSafeScore(minSafeScore ?? 0), [minSafeScore]);
  useEffect(() => setLocalMatchPercent(matchPercent ?? 0), [matchPercent]);
  useEffect(() => setLocalScorePercent(scorePercent ?? 0), [scorePercent]);

  useEffect(() => {
    setLikes(parseCSV(interest));
  }, [interest]);

  useEffect(() => {
    setLocalTripType(parseMulti(tripType, ALL_TRIP));
  }, [tripType]);
  useEffect(() => {
    setLocalFoodPref(parseMulti(foodPref, ALL_FOOD));
  }, [foodPref]);

  const addLang = () => {
    const v = inputLang.trim();
    if (!v) return;
    if (!languages.includes(v)) {
      setLanguages((prev) => [...prev, v]);
    }
    setInputLang("");
  };
  const removeLang = (l: string) => setLanguages((prev) => prev.filter((x) => x !== l));

  const addLike = () => {
    const v = likesInput.trim();
    if (!v) return;
    if (!likes.includes(v)) {
      setLikes((prev) => [...prev, v]);
    }
    setLikesInput("");
  };
  const removeLike = (value: string) => setLikes((prev) => prev.filter((x) => x !== value));

  const startVoice = () => alert("Voice search demo — replace with real voice input if needed.");

  const toggleFromList = (prev: string[], opt: string, allLabel: string): string[] => {
    if (opt === allLabel) {
      const isAllOnly = prev.length === 0 || (prev.length === 1 && prev[0] === allLabel);
      if (isAllOnly) return [];
      return [allLabel];
    }
    let next = prev.filter((x) => x !== allLabel);
    if (next.includes(opt)) next = next.filter((x) => x !== opt);
    else next = [...next, opt];
    return next;
  };

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
    setLanguages(["English"]);
    setInputLang("");
    setLikesInput("");

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

  const isAllSelected = (list: string[], allLabel: string) => list.length === 0 || list.includes(allLabel);

  const onStarClick = (value: number) => {
    if (value === localMinRating) setLocalMinRating(0);
    else setLocalMinRating(value);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full max-w-md mx-auto max-h-[90vh] flex flex-col">
      <div className="flex items-center gap-3">
        <button className="text-sm text-gray-600 hover:text-gray-800 transition" onClick={() => router.push("/")}>
          ← Back
        </button>
        <button onClick={handleClearAll} className="ml-auto text-sm text-gray-600 hover:underline">
          Clear all filters
        </button>
      </div>

      <div className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={localQuery}
            onChange={(e) => {
              const v = e.target.value;
              setLocalQuery(v);
              setQuery(v);
            }}
            placeholder="Destination typing..."
            className="w-full pl-9 pr-10 py-2 rounded-md border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4350]"
          />
          <button type="button" onClick={startVoice} aria-label="Voice Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D4350] transition-colors">
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap gap-2 mt-2 cursor-pointer ">
          {[{ label: "Locals", queryKey: "Kolkata" }, { label: "Nearby", queryKey: "Mumbai" }, { label: "Starting point", queryKey: "Ahmedabad" }].map((tag) => (
            <button key={tag.label} onClick={() => { setLocalQuery(tag.label); setQuery(tag.queryKey); }} className="px-3 py-1 text-sm text-white rounded-full transition cursor-pointer bg-[#1D4350]">
              {tag.label}
            </button>
          ))}
        </div>

        {/* Language */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Language</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input value={inputLang} onChange={(e) => setInputLang(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addLang()} placeholder="Language typing..." className="w-full pl-9 pr-20 py-2 rounded-md border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4350]" />
            <button onClick={addLang} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium hover:underline">Add</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => (
              <div key={l} className="flex items-center gap-2 bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                <span>{l}</span>
                <button onClick={() => removeLang(l)}><X className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Interests (likes) */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Interests</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input value={likesInput} onChange={(e) => setLikesInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addLike()} placeholder="Add what you like... (e.g. Hiking, Beaches)" className="w-full pl-9 pr-20 py-2 rounded-md border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4350]" />
            <button onClick={addLike} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium hover:underline">Add</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {likes.map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                <span>{item}</span>
                <button onClick={() => removeLike(item)}><X className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Rating (stars) */}
        <div className="mb-3">
          <button onClick={() => setRatingOpen((o) => !o)} aria-expanded={ratingOpen} className="w-full flex items-center justify-between text-xs font-medium text-gray-700 mb-2">
            <span>Rating</span>
            <FaChevronDown className={`transition-transform duration-300 ${ratingOpen ? "rotate-180" : "rotate-0"}`} />
          </button>

          {ratingOpen && (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => onStarClick(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} className="focus:outline-none">
                  <FaStar className={`w-5 h-5 transition-colors ${n <= localMinRating ? "text-[#1D4350]" : "text-gray-300"}`} />
                </button>
              ))}
              <button onClick={() => setLocalMinRating(0)} className="ml-3 text-xs text-gray-600 underline" type="button">Any</button>
            </div>
          )}
        </div>

        {/* Compatibility */}
        <div className="mb-3">
          <button onClick={() => setCampabilityOpen((o) => !o)} aria-expanded={campabilityOpen} className="w-full flex items-center justify-between text-xs font-medium text-gray-700">
            <span>Compability</span>
            <FaChevronDown className={`transition-transform duration-300 ${campabilityOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
          {campabilityOpen && (
            <div className="flex flex-col gap-2 mt-3">
              {percentOptions.map((p) => {
                const isActive = localMatchPercent === p;
                return (
                  <label key={p} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${isActive ? "bg-[#E8F1F1]" : ""}`}>
                    <input type="radio" name="matchPercentFilter" value={p} checked={isActive} onChange={() => setLocalMatchPercent(p)} className="h-4 w-4 cursor-pointer accent-[#1D4350]" />
                    <span className="text-sm text-gray-800">{p === 0 ? "Any" : `${p}% +`}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Safe Score */}
        <div className="mb-3">
          <button onClick={() => setSafeOpen((o) => !o)} aria-expanded={safeOpen} className="w-full flex items-center justify-between text-xs font-medium text-gray-700">
            <span>Safe Score</span>
            <FaChevronDown className={`transition-transform duration-300 ${safeOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
          {safeOpen && (
            <div className="flex flex-col gap-2 mt-3">
              {percentOptions.map((p) => {
                const isActive = localScorePercent === p;
                return (
                  <label key={p} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${isActive ? "bg-[#E8F1F1]" : ""}`}>
                    <input type="radio" name="scorePercentFilter" value={p} checked={isActive} onChange={() => setLocalScorePercent(p)} className="h-4 w-4 cursor-pointer accent-[#1D4350]" />
                    <span className="text-sm text-gray-800">{p === 0 ? "Any" : `${p}% +`}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Trip Type */}
        <div className="mb-3">
          <button onClick={() => setTripTypeOpen((o) => !o)} aria-expanded={tripTypeOpen} className="w-full flex items-center justify-between text-xs font-medium text-gray-700">
            <span>Trip Type</span>
            <FaChevronDown className={`transition-transform duration-300 ${tripTypeOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
          {tripTypeOpen && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {tripTypeOptions.map((opt) => {
                const allSelected = isAllSelected(localTripType, ALL_TRIP);
                const isActive = opt === ALL_TRIP ? allSelected : localTripType.includes(opt);
                return (
                  <button key={opt} onClick={() => setLocalTripType((prev) => toggleFromList(prev, opt, ALL_TRIP))} className={`text-sm py-2 px-3 cursor-pointer rounded-xl w-full transition ${isActive ? "bg-[#E8F1F1] text-[#0A4D4A]" : "bg-transparent text-gray-700"}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Food Preference */}
        <div className="mb-3">
          <button onClick={() => setFoodPrefOpen((o) => !o)} aria-expanded={foodPrefOpen} className="w-full flex items-center justify-between text-xs font-medium text-gray-700">
            <span>Food Preference</span>
            <FaChevronDown className={`transition-transform duration-300 ${foodPrefOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
          {foodPrefOpen && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {foodPrefOptions.map((opt) => {
                const allSelected = isAllSelected(localFoodPref, ALL_FOOD);
                const isActive = opt === ALL_FOOD ? allSelected : localFoodPref.includes(opt);
                return (
                  <button key={opt} onClick={() => setLocalFoodPref((prev) => toggleFromList(prev, opt, ALL_FOOD))} className={`text-sm py-2 px-3 cursor-pointer rounded-xl w-full transition ${isActive ? "bg-[#E8F1F1] text-[#0A4D4A]" : "bg-transparent text-gray-700"}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Sliders */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mt-3 mb-2">Duration (days)</label>
          <input type="range" min={1} max={50} value={localDuration} onChange={(e) => setLocalDuration(Number(e.target.value))} className="w-full accent-[#1D4350]" />
          <div className="text-xs text-gray-500 mt-1">{localDuration} days</div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mt-3 mb-2">Age Range</label>
          <input type="range" min={12} max={50} value={localAge} onChange={(e) => setLocalAge(Number(e.target.value))} className="w-full accent-[#1D4350]" />
          <div className="text-xs text-gray-500 mt-1">{localAge} Years</div>
        </div>

        <div className="pb-2">
          <label className="block text-xs font-medium text-gray-500 mt-3 mb-2">Budget (Rs)</label>
          <input type="range" min={0} max={200000} step={500} value={localBudget} onChange={(e) => setLocalBudget(Number(e.target.value))} className="w-full accent-[#1D4350]" />
          <div className="text-xs text-gray-500 mt-1">₹{localBudget.toLocaleString()}</div>
        </div>
      </div>

      <button onClick={handleApply} className="mt-4 w-full bg-[#1D4350] text-white py-2 rounded-lg font-semibold hover:bg-[#163935] transition">
        Apply Filter
      </button>
    </div>
  );
}
