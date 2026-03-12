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

// TODO: replace with real API data
const DEMO_ORGANIZER: Organizer = {
  _id: "org_demo_1",
  fullName: "Rohan Verma",
  profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
  role: "agency",
  agencyName: "Wanderlust Trails Co.",
  tripsLed: 47,
  rating: 4.9,
  verified: true,
  location: "New Delhi, India",
  responseTime: "~1 hour",
};

const ROLE_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  agency: { label: "Travel Agency", color: "#1d4350", bg: "#f0fafa" },
  leader: { label: "Trip Leader",   color: "#7c3aed", bg: "#f5f3ff" },
  guide:  { label: "Local Guide",   color: "#b45309", bg: "#fffbeb" },
};

export default function TripOrganizer({ organizer = DEMO_ORGANIZER }: TripOrganizerProps) {
  const name      = organizer.fullName || organizer.name || "Organizer";
  const image     = organizer.profileImage || organizer.avatar || "/default-avatar.png";
  const roleKey   = organizer.role || "leader";
  const roleStyle = ROLE_LABEL[roleKey] ?? ROLE_LABEL.leader;

  const stats = [
    { label: "Trips Led",     value: organizer.tripsLed ?? "—" },
    { label: "Rating",        value: organizer.rating ? `${organizer.rating} ★` : "—" },
    { label: "Response",      value: organizer.responseTime ?? "—" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');
        .organizer-card { transition: box-shadow 0.2s ease; }
        .organizer-card:hover { box-shadow: 0 8px 32px rgba(29,67,80,0.10) !important; }
      `}</style>

      <section
        className="organizer-card overflow-hidden border border-gray-100"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "#fff",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}
      >
        {/* ── Top accent bar ── */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, #1d4350 0%, #4ecdc4 100%)" }}
        />

        <div className="px-4 -mt-6 pb-3">

          {/* ── Section label ── */}
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">
            Created By
          </p>

          {/* ── Header row ── */}
          <div className="flex items-start gap-4">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-14 h-14 rounded-2xl overflow-hidden"
                style={{ border: "2.5px solid #e0f2f1" }}
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Verified badge */}
              {organizer.verified && (
                <span
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#1d4350", border: "2px solid #fff" }}
                  title="Verified Organizer"
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </div>

            {/* Name + role */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className="text-base font-bold text-gray-900 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {name}
                </h3>
                {/* Role pill */}
                <span
                  className="text-[10px] font-bold rounded-full px-2.5 py-0.5"
                  style={{ background: roleStyle.bg, color: roleStyle.color }}
                >
                  {roleStyle.label}
                </span>
              </div>

              {/* Agency name */}
              {organizer.agencyName && (
                <p className="text-xs font-medium mt-0.5" style={{ color: "#4ecdc4" }}>
                  {organizer.agencyName}
                </p>
              )}

              {/* Location */}
              {organizer.location && (
                <p className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {organizer.location}
                </p>
              )}
            </div>
          </div>

          {/* ── Bio ── */}
          {organizer.bio && (
            <p
              className="text-sm text-gray-500 mt-4 leading-relaxed"
              style={{ lineHeight: "1.65" }}
            >
            </p>
          )}

          {/* ── Stats row ── */}
          <div
            className="grid grid-cols-3 gap-3 mt-4 rounded-2xl p-3"
            style={{ background: "#fafbfc", border: "1px solid #f0f2f5" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span
                  className="text-base font-bold"
                  style={{ color: "#1d4350", fontFamily: "'Playfair Display', serif" }}
                >
                  {s.value}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">{s.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ── Footer trust line ── */}
        <div
          className="flex items-center justify-center gap-1.5 py-2.5"
          style={{ borderTop: "1px solid #f0f2f5", background: "#fafbfc" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ecdc4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <p className="text-[10px] font-medium" style={{ color: "#8a9ab0" }}>
            Identity verified · Trusted organizer
          </p>
        </div>
      </section>
    </>
  );
}