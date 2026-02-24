"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchJoinedTravelers, Traveler } from "../api";

interface JoinedTravelersProps {
  tripId: string;
}

const JoinedTravelers: React.FC<JoinedTravelersProps> = ({ tripId }) => {
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) return;

    const getTravelers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchJoinedTravelers(tripId);
        setTravelers(data);
      } catch (err: any) {
        console.error("Error fetching joined travelers:", err);
        setError("Failed to load travelers.");
        setTravelers([]);
      } finally {
        setLoading(false);
      }
    };

    getTravelers();
  }, [tripId]);

  if (loading) {
    return (
      <div className="p-5 bg-white shadow-lg rounded-lg">
        <p className="text-gray-500">Loading travelers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 bg-white shadow-lg rounded-lg">
        <p className="text-red-500">{error}</p>
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
            const name = t.fullName || t.name || "Traveler";
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