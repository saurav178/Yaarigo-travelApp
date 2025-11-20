
 
"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../lib/api";
import { dummyData } from "../lib/dummyData";
 
interface Traveler {
  name: string;
  rating: number;
  safety: number;
  image: string;
}
 
const JoinedTravelers = () => {
  const [travelers, setTravelers] = useState<Traveler[]>([]);
 
  useEffect(() => {
    const getTravelers = async () => {
      const data = await fetchData("/api/trip/travelers");
      setTravelers(data?.travelers || dummyData.travelers);
    };
    getTravelers();
  }, []);
 
  return (
    <div className="p-5 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 -mt-70">
      <h2 className="text-lg font-semibold mb-3">
        Joined Travelers ({travelers.length})
      </h2>
      <div className="space-y-3">
        {travelers.map((t, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-500">
                  ⭐ {t.rating} · {t.safety}%
                </p>
              </div>
            </div>
            <button className="px-3 py-1 border bg-[#121212] text-white hover:bg-gray-100">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default JoinedTravelers;
 
 