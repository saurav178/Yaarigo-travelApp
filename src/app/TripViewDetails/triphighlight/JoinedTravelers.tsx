"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchJoinedTravelers, Traveler } from "../api";

interface JoinedTravelersProps {
  tripId: string;
}

// TODO: remove once backend returns these fields
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) return;
    const getTravelers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchJoinedTravelers(tripId);
        if (data?.length) setTravelers(data);
      } catch (err: any) {
        console.error("Error fetching joined travelers:", err);
        // keep demo data on error
      } finally {
        setLoading(false);
      }
    };
    getTravelers();
  }, [tripId]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        .traveler-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .traveler-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(29,67,80,0.10); }
        .view-btn { transition: background 0.15s ease, transform 0.12s ease; }
        .view-btn:hover { background: #16333b; transform: scale(1.03); }
        .view-btn:active { transform: scale(0.97); }
      `}</style>

      <div
        className=" overflow-hidden"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "#fff",
          border: "1px solid #eef0f3",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #f0f2f5" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#f0fafa" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1d4350" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 leading-tight">
                Joined Travelers
              </h2>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                {loading ? "Loading…" : `${travelers.length} joined`}
              </p>
            </div>
          </div>

          {/* Live badge */}
          <span
            className="flex items-center gap-1.5 text-[10px] font-semibold rounded-full px-2.5 py-1"
            style={{ background: "#f0fdf4", color: "#16a34a" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        </div>

        {/* Traveler cards */}
        <div className="px-4 py-3 space-y-3">
          {travelers.length === 0 ? (
            <div
              className="rounded-xl px-4 py-6 text-center"
              style={{ background: "#fafbfc", border: "1px dashed #e5e7eb" }}
            >
              <svg className="mx-auto mb-2 opacity-30" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4350" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              </svg>
              <p className="text-xs text-gray-400">No travelers joined yet.</p>
            </div>
          ) : (
            travelers.map((t: TravelerWithDemo, index) => {
              const name = t.fullName || t.name || "Traveler";
              const image = t.profileImage || t.avatar || "/default-avatar.png";
              const rating = t.rating ?? "N/A";
              const safety = t.safetyScore ?? "N/A";
              const trips = t.trips ?? 0;
              const from = t.from ?? "";

              return (
                <div
                  key={t._id || index}
                  className="traveler-card flex items-center gap-3 rounded-xl p-3"
                  style={{
                    background: "#fafbfc",
                    border: "1px solid #f0f2f5",
                  }}
                >
                  {/* Avatar with ring */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-11 h-11 rounded-full overflow-hidden"
                      style={{ border: "2px solid #e0f2f1" }}
                    >
                      <Image
                        src={image}
                        alt={name}
                        width={44}
                        height={44}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Safety dot */}
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ background: Number(safety) >= 85 ? "#22c55e" : "#f59e0b" }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                        {name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {from && (
                        <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          {from}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-300">·</span>
                      <span className="flex items-center gap-0.5 text-[10px] text-amber-500 font-medium">
                        ★ {rating}
                      </span>
                      <span className="text-[10px] text-gray-300">·</span>
                      <span className="text-[10px] text-gray-400">
                        {trips} trips
                      </span>
                    </div>

                    {/* Safety bar */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#eef0f3" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${safety}%`,
                            background: Number(safety) >= 85
                              ? "linear-gradient(90deg,#4ecdc4,#44a08d)"
                              : "linear-gradient(90deg,#f59e0b,#ef4444)",
                            transition: "width 0.6s ease",
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold" style={{ color: Number(safety) >= 85 ? "#16a34a" : "#d97706", minWidth: 28 }}>
                        {safety}%
                      </span>
                    </div>
                  </div>

                  {/* View button */}
                  <button
                    className="view-btn flex-shrink-0 text-[11px] font-semibold text-white rounded-xl px-3 py-1.5"
                    style={{ background: "#1d4350", letterSpacing: "0.02em" }}
                  >
                    View
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {travelers.length > 0 && (
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid #f0f2f5" }}
          >
            <p className="text-[10px] text-gray-400">
              Verified travelers only
            </p>
            <button className="text-[11px] font-semibold text-[#1d4350] hover:underline transition">
              See all →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default JoinedTravelers;