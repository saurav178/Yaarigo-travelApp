"use client";
import Image from "next/image";
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
              <Image
                src={t.image}
                alt={t.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-500">
                  ⭐ {t.rating} · {t.safety}%
                </p>
              </div>
            </div>
            <button className="px-3 py-1 border bg-[#1D4350] text-white hover:bg-[#16333b] transition-colors duration-300 cursor-pointer">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedTravelers;
