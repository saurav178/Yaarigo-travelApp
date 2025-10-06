"use client";

import { FC, useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Filters {
  gender: string;
  minSafety: string;
  minCompatibility: string;
  minRating: string;
  dateRange: { startDate: string; endDate: string };
  destination: string;
}

interface DropdownFiltersProps {
  filters: Filters;
  handleApplyFilters: (newFilters: Filters) => void;
}

const DropdownFilters: FC<DropdownFiltersProps> = ({
  filters,
  handleApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [showCalendar, setShowCalendar] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const parseDate = (d: string) => {
    const [month, day] = d.split("/").map(Number);
    return new Date(2026, month - 1, day);
  };

  const selectionRange = {
    startDate: localFilters.dateRange.startDate
      ? parseDate(localFilters.dateRange.startDate)
      : new Date(),
    endDate: localFilters.dateRange.endDate
      ? parseDate(localFilters.dateRange.endDate)
      : new Date(),
    key: "selection",
  };

  const handleSelect = (ranges: any) => {
    setLocalFilters({
      ...localFilters,
      dateRange: {
        startDate: `${
          ranges.selection.startDate.getMonth() + 1
        }/${ranges.selection.startDate.getDate()}`,
        endDate: `${
          ranges.selection.endDate.getMonth() + 1
        }/${ranges.selection.endDate.getDate()}`,
      },
    });
    setShowCalendar(false);
  };

  // Close calendar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col space-y-3 relative z-50 p-3 w-56"
    >
      {/* Destination */}
      <input
        type="text"
        placeholder="Destination"
        value={localFilters.destination}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, destination: e.target.value })
        }
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
      />

      {/* Gender checkboxes */}
      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm">Gender</label>
        {["Male", "Female"].map((g) => (
          <label key={g} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={localFilters.gender === g}
              onChange={() =>
                setLocalFilters({
                  ...localFilters,
                  gender: localFilters.gender === g ? "" : g,
                })
              }
            />
            <span>{g}</span>
          </label>
        ))}
      </div>

      {/* Safety */}
      <select
        value={localFilters.minSafety}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, minSafety: e.target.value })
        }
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="">Safety</option>
        <option value="50">50+</option>
        <option value="60">60+</option>
        <option value="70">70+</option>
        <option value="80">80+</option>
        <option value="90">90+</option>
      </select>

      {/* Compatibility */}
      <select
        value={localFilters.minCompatibility}
        onChange={(e) =>
          setLocalFilters({
            ...localFilters,
            minCompatibility: e.target.value,
          })
        }
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="">Compatibility</option>
        <option value="70">70+</option>
        <option value="80">80+</option>
        <option value="90">90+</option>
      </select>

      {/* Rating ✅ */}
      <select
        value={localFilters.minRating}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, minRating: e.target.value })
        }
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="">Rating</option>
        <option value="3">3★+</option>
        <option value="4">4★+</option>
        <option value="4.5">4.5★+</option>
      </select>

      {/* Date Range */}
      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className="px-3 py-2 border rounded-lg text-sm text-left"
      >
        {localFilters.dateRange.startDate && localFilters.dateRange.endDate
          ? `${localFilters.dateRange.startDate} - ${localFilters.dateRange.endDate}`
          : "Select Date Range"}
      </button>

      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 shadow-lg rounded-lg overflow-hidden border bg-white">
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
          />
        </div>
      )}

      {/* Apply Button */}
      <button
        onClick={() => handleApplyFilters(localFilters)}
        className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Apply
      </button>
    </div>
  );
};

export default DropdownFilters;
