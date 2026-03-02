"use client";
import Image from "next/image";

// Updated Leader interface based on API payload
interface Leader {
  avatar?: string;       // profile image from API
  fullName?: string;     // full name of leader
  rating?: number;       // rating
  safetyScore?: number;  // optional extra info
  description?: string;  // bio/description if available
  contact?: string;      // optional contact info
}

interface LeaderProps {
  leader: Leader;
}

export default function TripLeader({ leader }: LeaderProps) {
  return (
    <div className="p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      <h3 className="text-md font-semibold mb-3">Hosted By</h3>

      <div className="flex items-center gap-3 mb-3">
        <Image
          src={leader.avatar || "/default-profile.png"} // API avatar or fallback
          alt={leader.fullName || "Leader"}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{leader.fullName || "Unknown Leader"}</p>
          {(leader.rating !== undefined || leader.safetyScore !== undefined) && (
            <p className="text-sm text-gray-500">
              {leader.rating !== undefined && <>⭐ {leader.rating.toFixed(1)} </>}
              {leader.safetyScore !== undefined && <>· Safety: {leader.safetyScore}%</>}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600">
        {leader.description || "No bio available."}
      </p>

      {leader.contact && (
        <p className="text-xs text-gray-400 mt-2">
          Contact: {leader.contact}
        </p>
      )}
    </div>
  );
}