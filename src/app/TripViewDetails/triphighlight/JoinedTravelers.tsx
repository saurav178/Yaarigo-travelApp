"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchJoinedTravelers, Traveler } from "../api";

interface JoinedTravelersProps {
  tripId: string;
}

type TravelerWithDemo = Traveler & {
  trips?: number;
  from?: string;
};

const DEMO_TRAVELERS: TravelerWithDemo[] = [
  {
    _id: "demo_1",
    fullName: "Arjun Mehta",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    safetyScore: 92,
    trips: 14,
    from: "Mumbai",
  },
  {
    _id: "demo_2",
    fullName: "Priya Sharma",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.6,
    safetyScore: 88,
    trips: 9,
    from: "Delhi",
  },
];

const JoinedTravelers: React.FC<JoinedTravelersProps> = ({ tripId }) => {
  const [travelers, setTravelers] = useState<TravelerWithDemo[]>(DEMO_TRAVELERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tripId) return;
    const getTravelers = async () => {
      try {
        setLoading(true);
        const data = await fetchJoinedTravelers(tripId);
        if (data?.length) setTravelers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTravelers();
  }, [tripId]);

  return (
    <div className="bg-white border border-gray-200 overflow-hidden w-full">
      {/* Header */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #f0f2f5" }}>
        <h2 className="text-sm font-semibold text-gray-800">
          Joined Travelers ({loading ? "…" : travelers.length})
        </h2>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-50">
        {travelers.length === 0 ? (
          <p className="text-xs text-gray-400 px-4 py-6 text-center">No travelers joined yet.</p>
        ) : (
          travelers.map((t, index) => {
            const name = t.fullName || t.name || "Traveler";
            const image = t.profileImage || t.avatar || "/default-avatar.png";
            const rating = t.rating ?? "N/A";
            const safety = t.safetyScore ?? null;

            return (
              <div key={t._id || index} className="flex items-center gap-3 px-4 py-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Green online dot */}
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                    style={{ background: "#22c55e" }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-amber-500">★ {rating}</span>
                    {safety !== null && (
                      <>
                        <span className="text-gray-300 text-[10px]">·</span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          </svg>
                          {safety}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* View button */}
                <button
                  className="flex-shrink-0 text-[11px] font-semibold text-white rounded-lg px-3 py-1.5"
                  style={{ background: "#1d4350" }}
                >
                  View
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default JoinedTravelers;