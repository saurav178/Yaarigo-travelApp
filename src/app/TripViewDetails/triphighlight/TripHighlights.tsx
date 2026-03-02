"use client";
import { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md"; // ✅ White tick icon
import { fetchData } from "../lib/api"; // Your API helper

interface TripHighlightsProps {
  tripId: string;
}

const TripHighlights: React.FC<TripHighlightsProps> = ({ tripId }) => {
  const [highlights, setHighlights] = useState<string[]>([]);

  useEffect(() => {
    const getHighlights = async () => {
      try {
        // Fetch highlights for the specific trip ID
        const data = await fetchData(`/api/trip/highlights?tripId=${tripId}`);
        setHighlights(data?.highlights || []);
      } catch (error) {
        console.error("Failed to fetch trip highlights:", error);
        setHighlights([]); // fallback empty array
      }
    };

    if (tripId) getHighlights();
  }, [tripId]);

  return (
    <div className="p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      <h2 className="text-lg font-semibold mb-3">Trip Highlights</h2>
      <div className="flex flex-wrap gap-4">
        {highlights.length > 0 ? (
          highlights.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 text-sm"
            >
              <div className="bg-black rounded-full p-1 flex items-center justify-center">
                <MdCheck className="text-white w-4 h-4" />
              </div>
              {item}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No highlights available.</p>
        )}
      </div>
    </div>
  );
};

export default TripHighlights;