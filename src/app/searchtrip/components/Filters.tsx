
"use client";

import { useEffect, useState } from "react";
import { Search, Mic, X, } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Filters({

  query,
  setQuery,
  age,
  setAge,
  duration,
  setDuration,
  budget,
  setBudget,
}: {
  query: string;
  setQuery: (v: string) => void;
  age: number;
  setAge: (n: number) => void;
  duration: number;
  setDuration: (n: number) => void;
  budget: number;
  setBudget: (n: number) => void;
}) {
  // local state (only applied to parent when user clicks Apply)
  
  const [localQuery, setLocalQuery] = useState(query);
  const [localAge, setLocalAge] = useState(age);
  const [localDuration, setLocalDuration] = useState(duration);
  const [localBudget, setLocalBudget] = useState(budget);
  const [inputLang, setInputLang] = useState("");
  const [languages, setLanguages] = useState<string[]>(["English", "Spanish"]);

  const Router = useRouter();

  // keep local state in sync if parent props change externally
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    setLocalAge(age);
  }, [age]);

  useEffect(() => {
    setLocalDuration(duration);
  }, [duration]);

  useEffect(() => {
    setLocalBudget(budget);
  }, [budget]);

  // Reset local filter controls (doesn't apply to parent until Apply is pressed)
  const handleClearAll = () => {
    setLocalQuery("");
    setLocalAge(18);
    setLocalDuration(7);
    setLocalBudget(0);
    setLanguages(["English"]);
    setInputLang("");
  };

  const addLang = () => {
    const v = inputLang.trim();
    if (!v) return;
    if (!languages.includes(v)) setLanguages((s) => [...s, v]);
    setInputLang("");
  };

  const removeLang = (l: string) => setLanguages((s) => s.filter((x) => x !== l));

  const startVoice = () => {
    // this demo will populate the local search field (not apply immediately)
    alert("Voice search (demo) — will populate the local destination field.");
    // example: setLocalQuery("Detected speech result");
  };

  // APPLY local filters to parent (this is the single source-of-truth apply action)
  const handleApply = () => {
    setQuery(localQuery);
    setAge(localAge);
    setDuration(localDuration);
    setBudget(localBudget);
    // If you also want to send languages to parent, add a prop for it.
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button className="text-sm text-gray-600 hover:text-gray-800 transition" onClick={()=>{Router.push("/")}}>← Back</button>
        <button
          onClick={handleClearAll}
          className="ml-auto text-sm text-[#f76c6c] hover:underline"
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
            onChange={(e) => setLocalQuery(e.target.value)} // local only
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
              onClick={() => setLocalQuery(tag)} // example: quick-fill local query
              className="px-3 py-1 bg-rose-50 text-[#F76c6c] rounded-full text-sm hover:bg-rose-100 transition"
            >
              {tag}
            </button>
          ))}
        </div>

      {/* Dropdowns */}

     {/* <label className="block text-xs font-medium text-gray-500 mt-2 mb-1">Travel Style</label>
//         <select className="w-full rounded-md border px-3 py-2 text-sm">
//           <option>Select an Option</option>
//         </select>

//         <label className="block text-xs font-medium text-gray-500 mt-0 mb-1">Interests</label>
//         <select className="w-full rounded-md border px-3 py-2 text-sm">
//           <option>Select an Option</option>
//         </select>

//         <label className="block text-xs font-medium text-gray-500 mt-0 mb-1">Gender Prefrencs</label>
//         <select className="w-full rounded-md border px-3 py-2 text-sm">
//           <option>Select an Option</option>
//         </select>

//         <label className="block text-xs font-medium text-gray-500 mt-0 mb-1">Rating Preferences</label>
//         <select className="w-full rounded-md border px-3 py-2 text-sm">
//           <option>Select an Option</option>
//         </select>

//         <label className="block text-xs font-medium text-gray-500 mt-0 mb-1">Food Preferences</label>
//         <select className="w-full rounded-md border px-3 py-2 text-sm">
//           <option>Select an Option</option>
//         </select>

//         <label className="block text-xs font-medium text-gray-500 mt-0 mb-1">Trips Type</label>
//         <select className="w-full rounded-md border px-3 py-2 text-sm">
//           <option>Select an Option</option>
//         </select> */}


        {/* Language input (local) */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Language</label>
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EB5757] text-sm font-medium hover:underline"
            >
              Add
            </button>
          </div>

          {/* Language chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => (
              <div
                key={l}
                className="flex items-center gap-2 bg-rose-50 text-[#F76c6c] px-3 py-1 rounded-full text-sm font-medium"
              >
                <span>{l}</span>
                <button onClick={() => removeLang(l)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sliders (local) */}
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
            className="w-full accent-[#EB5757]"
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
            className="w-full accent-[#EB5757]"
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
            className="w-full accent-[#EB5757]"
          />
          <div className="text-xs text-gray-500 mt-1">
            ₹{localBudget.toLocaleString()}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="mt-4 w-full bg-[#F76c6c] text-white py-2 rounded-lg font-semibold hover:bg-[#EB5757] transition"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
