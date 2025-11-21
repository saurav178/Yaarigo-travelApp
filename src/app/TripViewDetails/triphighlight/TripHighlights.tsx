

 
"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../lib/api";
import { dummyData } from "../lib/dummyData";
import { MdCheck } from "react-icons/md"; // ✅ White tick icon
 
const TripHighlights = () => {
  const [highlights, setHighlights] = useState<string[]>([]);
 
  useEffect(() => {
    const getHighlights = async () => {
      const data = await fetchData("/api/trip/highlights"); // 🔁 Replace with real API later
      setHighlights(data?.highlights || dummyData.tripHighlights);
    };
    getHighlights();
  }, []);
 
  return (
<<<<<<< HEAD
<div className="rounded-lg p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
=======
<div className=" p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
>>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043
      <h2 className="text-lg font-semibold mb-3">Trip Highlights</h2>
      <div className="flex flex-wrap gap-4">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 text-sm"
          >
            {/* ✅ Black circle with white tick */}
            <div className="bg-black rounded-full p-1 flex items-center justify-center">
              <MdCheck className="text-white w-4 h-4" />
            </div>
 
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default TripHighlights;
 
 