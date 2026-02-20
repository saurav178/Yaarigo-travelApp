"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Traveler {
  _id?: string;
  name?: string;
  fullName?: string;
  profileImage?: string;
  avatar?: string;
  rating?: number;
  safetyScore?: number;
}

interface JoinedTravelersProps {
  tripId: string;
}

const JoinedTravelers: React.FC<JoinedTravelersProps> = ({ tripId }) => {
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.dev.yaarigo.com/tpm-service/api/public";

  useEffect(() => {
    if (!tripId) return;

    const fetchTravelers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/trips/${tripId}/travelers`);
        if (!res.ok) throw new Error("Failed to fetch travelers");
        const json = await res.json();
        const data = json?.data || json?.travelers || [];
        setTravelers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load travelers", error);
        setTravelers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelers();
  }, [tripId]);

  if (loading) {
    return (
      <div className="p-5 bg-white shadow-lg">
        <p className="text-gray-500">Loading travelers...</p>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">
        Joined Travelers ({travelers.length})
      </h2>

      {travelers.length === 0 ? (
        <p className="text-sm text-gray-400">No travelers joined yet.</p>
      ) : (
        <div className="space-y-3">
          {travelers.map((t, index) => {
            const name = t.name || t.fullName || "Traveler";
            const image = t.profileImage || t.avatar || "/default-avatar.png";
            const rating = t.rating ?? "N/A";
            const safety = t.safetyScore ?? "N/A";

            return (
              <div
                key={t._id || index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium text-gray-800">{name}</p>
                    <p className="text-xs text-gray-500">
                      ⭐ {rating} · {safety}%
                    </p>
                  </div>
                </div>

                <button className="px-3 py-1 bg-[#1D4350] text-white hover:bg-[#16333b] transition-colors duration-300">
                  View
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JoinedTravelers;