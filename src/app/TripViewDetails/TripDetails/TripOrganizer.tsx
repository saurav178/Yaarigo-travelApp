"use client";

interface Organizer {
  _id?: string;
  name?: string;
  fullName?: string;
  bio?: string;
  profileImage?: string;
  avatar?: string;
  role?: "agency" | "leader" | "guide";
  agencyName?: string;
  tripsLed?: number;
  rating?: number;
  verified?: boolean;
  location?: string;
  responseTime?: string;
}

interface TripOrganizerProps {
  organizer?: Organizer;
}

const DEMO_ORGANIZER: Organizer = {
  _id: "org_demo_1",
  fullName: "Courtney Henry",
  profileImage: "https://randomuser.me/api/portraits/women/75.jpg",
  role: "leader",
  bio: "Adventure seeker and culture enthusiast. Love exploring off-the-beaten-path destinations and meeting fellow travelers!",
  tripsLed: 47,
  rating: 4.8,
  verified: true,
};

const ROLE_LABEL: Record<string, string> = {
  agency: "Travel Agency",
  leader: "Trip Leader",
  guide: "Local Guide",
};

export default function TripOrganizer({ organizer = DEMO_ORGANIZER }: TripOrganizerProps) {
  const name    = organizer.fullName || organizer.name || "Organizer";
  const image   = organizer.profileImage || organizer.avatar || "/default-avatar.png";
  const roleKey = organizer.role || "leader";
  const role    = ROLE_LABEL[roleKey] ?? "Trip Leader";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      <section
        className="bg-white border border-gray-200 p-4 w-full -mt-2"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Role label */}
        <p className="text-xs font-semibold text-gray-500 mb-3">{role}</p>

        {/* Avatar + name row */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-900">{name}</span>
              {organizer.verified && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
                </svg>
              )}
            </div>

            {/* Rating + trips */}
            <div className="flex items-center gap-2 mt-0.5">
              {organizer.rating && (
                <span className="flex items-center gap-0.5 text-[11px] text-gray-500">
                  ★ <span>{organizer.rating}</span>
                </span>
              )}
              {organizer.tripsLed && (
                <span className="flex items-center gap-1 text-[11px] text-gray-500">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {organizer.tripsLed}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {organizer.bio && (
          <p className="text-[12px] text-gray-500 leading-relaxed">{organizer.bio}</p>
        )}
      </section>
    </>
  );
}