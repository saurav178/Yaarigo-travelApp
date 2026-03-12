// "use client";

// import { useState, useRef, useEffect } from "react";

// interface DayPlan {
//   _id?: string;
//   dayTitle?: string;
//   summary?: string;
//   activities?: string[];
//   location?: string | { [key: string]: any };
//   startTime?: string;
// }

// interface DetailedItineraryProps {
//   itinerary?: DayPlan[];
// }

// const formatValue = (val: any): string => {
//   if (!val) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "object") return Object.values(val).join(", ");
//   return "";
// };

// const getActivityIcon = (activity: string): string => {
//   const a = activity.toLowerCase();
//   if (a.includes("food") || a.includes("eat") || a.includes("restaurant") || a.includes("lunch") || a.includes("dinner") || a.includes("cafe")) return "🍽️";
//   if (a.includes("hike") || a.includes("trek") || a.includes("trail")) return "🥾";
//   if (a.includes("beach") || a.includes("swim") || a.includes("ocean") || a.includes("sea")) return "🏖️";
//   if (a.includes("museum") || a.includes("art") || a.includes("gallery")) return "🏛️";
//   if (a.includes("shop") || a.includes("market") || a.includes("bazaar")) return "🛍️";
//   if (a.includes("temple") || a.includes("church") || a.includes("mosque")) return "🕌";
//   if (a.includes("photo") || a.includes("view") || a.includes("scenic") || a.includes("explore") || a.includes("visit")) return "📸";
//   if (a.includes("night") || a.includes("bar") || a.includes("club")) return "🌙";
//   if (a.includes("drive") || a.includes("transfer") || a.includes("bus") || a.includes("flight")) return "✈️";
//   return "📍";
// };

// const DetailedItinerary: React.FC<DetailedItineraryProps> = ({ itinerary = [] }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animating, setAnimating] = useState(false);
//   const [direction, setDirection] = useState<"up" | "down">("down");
//   const contentRef = useRef<HTMLDivElement>(null);

//   if (!itinerary || itinerary.length === 0) {
//     return (
//       <section className="rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 p-8">
//         <p className="text-gray-400 text-sm">No itinerary available.</p>
//       </section>
//     );
//   }

//   const changeDay = (index: number) => {
//     if (index === activeIndex || animating) return;
//     setDirection(index > activeIndex ? "down" : "up");
//     setAnimating(true);
//     setTimeout(() => {
//       setActiveIndex(index);
//       setAnimating(false);
//     }, 220);
//   };

//   const activeDay = itinerary[activeIndex];
//   const getTitle = (day: DayPlan, i: number) => formatValue(day.dayTitle) || `Day ${i + 1}`;
//   const getDescription = (day: DayPlan) => formatValue(day.summary) || "A memorable day of exploration.";
//   const getLocation = (day: DayPlan) => formatValue(day.location);
//   const getStartTime = (day: DayPlan) => formatValue(day.startTime);

//   return (
//     <section
//       className="rounded-3xl overflow-hidden shadow-lg border border-gray-100"
//       style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff" }}
//     >
//       {/* Google Font import via style tag */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');
//         .itinerary-day-enter-down { animation: slideInDown 0.22s cubic-bezier(0.4,0,0.2,1) forwards; }
//         .itinerary-day-enter-up   { animation: slideInUp   0.22s cubic-bezier(0.4,0,0.2,1) forwards; }
//         .itinerary-day-exit       { animation: fadeOut     0.15s ease forwards; }
//         @keyframes slideInDown {
//           from { opacity: 0; transform: translateY(14px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideInUp {
//           from { opacity: 0; transform: translateY(-14px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeOut {
//           to { opacity: 0; }
//         }
//         .activity-item { transition: all 0.18s ease; }
//         .activity-item:hover { transform: translateX(4px); background: #f8f9ff; }
//         .day-tab:hover .day-tab-inner { background: rgba(255,255,255,0.12); }
//         .scrollbar-none::-webkit-scrollbar { display: none; }
//         .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <div className="flex h-full" style={{ minHeight: 420 }}>

//         {/* ─── LEFT SIDEBAR: dark timeline ─── */}
//         <div
//           className="flex flex-col w-20 flex-shrink-0 py-6 overflow-y-auto scrollbar-none"
//           style={{ background: "linear-gradient(180deg, #0f2027 0%, #1d3a4a 60%, #0f2027 100%)" }}
//         >
//           {/* Vertical label */}
//           <div className="flex justify-center mb-5">
//             <span
//               className="text-[9px] font-semibold tracking-[0.2em] text-white/30 uppercase"
//               style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.25em" }}
//             >
//               Itinerary
//             </span>
//           </div>

//           {/* Day buttons */}
//           <div className="flex flex-col items-center gap-1 flex-1 px-2">
//             {itinerary.map((day, i) => {
//               const isActive = activeIndex === i;
//               return (
//                 <button
//                   key={day._id || i}
//                   className="day-tab w-full group relative flex flex-col items-center py-3 rounded-2xl transition-all duration-200"
//                   onClick={() => changeDay(i)}
//                   style={{
//                     background: isActive
//                       ? "rgba(255,255,255,0.12)"
//                       : "transparent",
//                   }}
//                 >
//                   {/* Active left indicator */}
//                   {isActive && (
//                     <span
//                       className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
//                       style={{ width: 3, height: 24, background: "#4ecdc4" }}
//                     />
//                   )}
//                   <span
//                     className="text-[10px] font-medium mb-0.5 transition-colors"
//                     style={{ color: isActive ? "#4ecdc4" : "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
//                   >
//                     DAY
//                   </span>
//                   <span
//                     className="text-xl font-bold leading-none transition-colors"
//                     style={{
//                       color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
//                       fontFamily: "'Playfair Display', serif",
//                     }}
//                   >
//                     {i + 1}
//                   </span>
//                   {/* Timeline dot */}
//                   {i < itinerary.length - 1 && (
//                     <span
//                       className="absolute -bottom-1 left-1/2 -translate-x-1/2"
//                       style={{ width: 1, height: 8, background: "rgba(255,255,255,0.1)" }}
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Total days */}
//           <div className="flex justify-center mt-4">
//             <span className="text-[9px] text-white/25 font-medium">
//               {itinerary.length}d
//             </span>
//           </div>
//         </div>

//         {/* ─── RIGHT CONTENT PANEL ─── */}
//         <div className="flex-1 flex flex-col overflow-hidden">

//           {/* Top bar */}
//           <div
//             className="flex items-center justify-between px-6 py-4 border-b"
//             style={{ borderColor: "#f0f2f5" }}
//           >
//             <div>
//               <h2
//                 className="text-lg font-bold leading-tight text-gray-900"
//                 style={{ fontFamily: "'Playfair Display', serif" }}
//               >
//                 Detailed Itinerary
//               </h2>
//               <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//                 {itinerary.length}-day journey
//               </p>
//             </div>

//             {/* Prev / Next */}
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() => changeDay(Math.max(0, activeIndex - 1))}
//                 disabled={activeIndex === 0}
//                 className="w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-25"
//                 style={{ background: "#f5f6f8" }}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d3a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M15 18l-6-6 6-6" />
//                 </svg>
//               </button>
//               <button
//                 onClick={() => changeDay(Math.min(itinerary.length - 1, activeIndex + 1))}
//                 disabled={activeIndex === itinerary.length - 1}
//                 className="w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-25"
//                 style={{ background: "#f5f6f8" }}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d3a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M9 18l6-6-6-6" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Day content */}
//           <div
//             ref={contentRef}
//             className={`flex-1 overflow-y-auto scrollbar-none px-6 py-5 ${
//               animating
//                 ? "itinerary-day-exit"
//                 : direction === "down"
//                 ? "itinerary-day-enter-down"
//                 : "itinerary-day-enter-up"
//             }`}
//             style={{ fontFamily: "'DM Sans', sans-serif" }}
//           >
//             {/* Day heading */}
//             <div className="flex items-start gap-3 mb-4">
//               <div
//                 className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-base"
//                 style={{ background: "#f0fafa", border: "1.5px solid #c2eeeb" }}
//               >
//                 <span style={{ color: "#1d3a4a", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15 }}>
//                   {activeIndex + 1}
//                 </span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3
//                   className="text-base font-bold text-gray-900 leading-tight"
//                   style={{ fontFamily: "'Playfair Display', serif" }}
//                 >
//                   {getTitle(activeDay, activeIndex)}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1 leading-relaxed">
//                   {getDescription(activeDay)}
//                 </p>
//               </div>
//             </div>

//             {/* Meta chips */}
//             {(getLocation(activeDay) || getStartTime(activeDay)) && (
//               <div className="flex flex-wrap gap-2 mb-5">
//                 {getLocation(activeDay) && (
//                   <span
//                     className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5"
//                     style={{ background: "#f5f6f8", color: "#556070" }}
//                   >
//                     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
//                     </svg>
//                     {getLocation(activeDay)}
//                   </span>
//                 )}
//                 {getStartTime(activeDay) && (
//                   <span
//                     className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5"
//                     style={{ background: "#f5f6f8", color: "#556070" }}
//                   >
//                     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
//                     </svg>
//                     {getStartTime(activeDay)}
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* Divider */}
//             <div className="flex items-center gap-3 mb-4">
//               <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400">
//                 Activities
//               </span>
//               <div className="flex-1 h-px" style={{ background: "#f0f2f5" }} />
//               {activeDay.activities?.length && (
//                 <span
//                   className="text-[10px] font-semibold rounded-full px-2 py-0.5"
//                   style={{ background: "#f0fafa", color: "#1d3a4a" }}
//                 >
//                   {activeDay.activities.length}
//                 </span>
//               )}
//             </div>

//             {/* Activities list */}
//             {activeDay.activities && activeDay.activities.length > 0 ? (
//               <ul className="space-y-2">
//                 {activeDay.activities.map((act, idx) => {
//                   const label = formatValue(act);
//                   return (
//                     <li
//                       key={idx}
//                       className="activity-item flex items-start gap-3 rounded-xl px-3 py-3 cursor-default"
//                       style={{
//                         background: "#fafbfc",
//                         border: "1px solid #f0f2f5",
//                         animationDelay: `${idx * 40}ms`,
//                       }}
//                     >
//                       <span
//                         className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base"
//                         style={{ background: "#fff", border: "1px solid #eef0f3", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
//                       >
//                         {getActivityIcon(label)}
//                       </span>
//                       <span className="text-sm text-gray-700 leading-snug pt-0.5 font-medium">
//                         {label}
//                       </span>
//                     </li>
//                   );
//                 })}
//               </ul>
//             ) : (
//               <div
//                 className="rounded-xl px-4 py-5 text-center"
//                 style={{ background: "#fafbfc", border: "1px dashed #e5e7eb" }}
//               >
//                 <p className="text-sm text-gray-400">No activities listed for this day.</p>
//               </div>
//             )}
//           </div>

//           {/* Progress bar footer */}
//           <div className="px-6 py-3 border-t" style={{ borderColor: "#f0f2f5" }}>
//             <div className="flex items-center justify-between mb-1.5">
//               <span className="text-[10px] text-gray-400 font-medium">Progress</span>
//               <span className="text-[10px] text-gray-400 font-medium">
//                 {activeIndex + 1} / {itinerary.length} days
//               </span>
//             </div>
//             <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "#f0f2f5" }}>
//               <div
//                 className="h-full rounded-full transition-all duration-500"
//                 style={{
//                   width: `${((activeIndex + 1) / itinerary.length) * 100}%`,
//                   background: "linear-gradient(90deg, #1d3a4a, #4ecdc4)",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DetailedItinerary;

"use client";

import { useState, useRef } from "react";

interface DayPlan {
  _id?: string;
  dayTitle?: string;
  summary?: string;
  activities?: string[];
  location?: string | { [key: string]: any };
  startTime?: string;
}

interface DetailedItineraryProps {
  itinerary?: DayPlan[];
}

const formatValue = (val: any): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") return Object.values(val).join(", ");
  return "";
};

const getActivityIcon = (activity: string): string => {
  const a = activity.toLowerCase();
  if (
    a.includes("food") ||
    a.includes("eat") ||
    a.includes("restaurant") ||
    a.includes("lunch") ||
    a.includes("dinner") ||
    a.includes("cafe")
  )
    return "🍽️";
  if (a.includes("hike") || a.includes("trek") || a.includes("trail"))
    return "🥾";
  if (
    a.includes("beach") ||
    a.includes("swim") ||
    a.includes("ocean") ||
    a.includes("sea")
  )
    return "🏖️";
  if (a.includes("museum") || a.includes("art") || a.includes("gallery"))
    return "🏛️";
  if (a.includes("shop") || a.includes("market") || a.includes("bazaar"))
    return "🛍️";
  if (a.includes("temple") || a.includes("church") || a.includes("mosque"))
    return "🕌";
  if (
    a.includes("photo") ||
    a.includes("view") ||
    a.includes("scenic") ||
    a.includes("explore") ||
    a.includes("visit")
  )
    return "📸";
  if (a.includes("night") || a.includes("bar") || a.includes("club"))
    return "🌙";
  if (
    a.includes("drive") ||
    a.includes("transfer") ||
    a.includes("bus") ||
    a.includes("flight")
  )
    return "✈️";
  return "•";
};

const DetailedItinerary: React.FC<DetailedItineraryProps> = ({
  itinerary = [],
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!itinerary || itinerary.length === 0) {
    return (
      <section className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm">
        <p className="text-gray-400 text-sm">No itinerary available.</p>
      </section>
    );
  }

  const getTitle = (day: DayPlan, i: number) =>
    formatValue(day.dayTitle) || `Day ${i + 1}`;
  const getDescription = (day: DayPlan) => formatValue(day.summary);
  const getLocation = (day: DayPlan) => formatValue(day.location);

  const toggle = (i: number) =>
    setExpandedIndex(expandedIndex === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:wght@600;700&display=swap');

        .itin-item { transition: all 0.2s ease; }
        .itin-item:hover .itin-title { color: #7c5cbf !important; }

        .itin-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .itin-body.open {
          grid-template-rows: 1fr;
        }
        .itin-body-inner { overflow: hidden; }

        .activity-row { transition: background 0.15s ease; }
        .activity-row:hover { background: #f3f0fa !important; }
      `}</style>

      <section
        className="bg-white border border-gray-100 shadow-sm overflow-hidden w-full"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div
          className="px-6 pt-5 pb-4"
          style={{ borderBottom: "1px solid #f3f0fa" }}
        >
          <h2
            className="text-base font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Detailed Itinerary
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {itinerary.length}-day journey
          </p>
        </div>

        {/* Timeline */}
        <div className="px-6 py-5">
          <div className="relative">
            {/* Vertical spine line */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: 15,
                width: 2,
                background: "linear-gradient(180deg, #e8e0f5 0%, #d4c8ee 100%)",
                borderRadius: 2,
              }}
            />

            <div className="space-y-1">
              {itinerary.map((day, i) => {
                const isOpen = expandedIndex === i;
                const title = getTitle(day, i);
                const description = getDescription(day);
                const location = getLocation(day);
                const activities = day.activities || [];

                return (
                  <div key={day._id || i} className="itin-item relative pl-10">
                    {/* Circle node */}
                    <div
                      className="absolute flex items-center justify-center rounded-full text-white text-[11px] font-bold"
                      style={{
                        left: 2,
                        top: 14,
                        width: 28,
                        height: 28,
                        background: isOpen
                          ? "linear-gradient(135deg, #2d3a3a, #3d5a5a)"
                          : "linear-gradient(135deg, #344444, #4a6060)",
                        boxShadow: isOpen
                          ? "0 0 0 4px rgba(124,92,191,0.12), 0 2px 8px rgba(124,92,191,0.3)"
                          : "0 0 0 3px rgba(200,185,230,0.3)",
                        transition: "all 0.2s ease",
                        fontFamily: "'Playfair Display', serif",
                        zIndex: 1,
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Card */}
                    <div
                      className="rounded-xl mb-3 overflow-hidden cursor-pointer"
                      style={{
                        background: isOpen ? "#faf8ff" : "#fdfcff",
                        border: `1.5px solid ${isOpen ? "#d4c8ee" : "#ede8f7"}`,
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => toggle(i)}
                    >
                      {/* Card header */}
                      <div className="flex items-start justify-between px-4 py-3.5 gap-3">
                        <div className="flex-1 min-w-0">
                          <h3
                            className="itin-title text-sm font-semibold leading-tight transition-colors"
                            style={{
                              color: isOpen ? "#7c5cbf" : "#1a1a2e",
                              fontFamily: "'Playfair Display', serif",
                            }}
                          >
                            {title}
                          </h3>

                          {/* Meta row */}
                          <div className="flex items-center flex-wrap gap-2 mt-1.5">
                            {description && (
                              <p className="text-[11px] text-gray-400 leading-snug">
                                {description}
                              </p>
                            )}
                            {location && (
                              <span
                                className="inline-flex items-center gap-1 text-[10px] font-medium rounded-full px-2 py-0.5"
                                style={{
                                  background: "#f0ebfc",
                                  color: "#7c5cbf",
                                }}
                              >
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                {location}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Chevron */}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isOpen ? "#7c5cbf" : "#c4b5e0"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="flex-shrink-0 mt-1"
                          style={{
                            transform: isOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                          }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>

                      {/* Expandable activities */}
                      <div className={`itin-body ${isOpen ? "open" : ""}`}>
                        <div className="itin-body-inner">
                          <div
                            className="px-4 pb-3 pt-0"
                            style={{ borderTop: "1px solid #ede8f7" }}
                          >
                            {activities.length > 0 ? (
                              <ul className="mt-2.5 space-y-1.5">
                                {activities.map((act, idx) => {
                                  const label = formatValue(act);
                                  const icon = getActivityIcon(label);
                                  return (
                                    <li
                                      key={idx}
                                      className="activity-row flex items-start gap-2.5 rounded-lg px-2.5 py-2"
                                      style={{ background: "#f8f5ff" }}
                                    >
                                      <span className="flex-shrink-0 text-sm leading-none mt-0.5">
                                        {icon === "•" ? (
                                          <span
                                            className="block w-1.5 h-1.5 rounded-full mt-1.5"
                                            style={{ background: "#120922" }}
                                          />
                                        ) : (
                                          icon
                                        )}
                                      </span>
                                      <span className="text-[12px] text-gray-600 leading-snug font-medium">
                                        {label}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <p className="text-[11px] text-gray-400 italic mt-2">
                                No activities listed.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer progress */}
        <div
          className="px-6 py-3 flex items-center gap-3"
          style={{ borderTop: "1px solid #f3f0fa" }}
        >
          <div
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{ background: "#ede8f7" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((expandedIndex !== null ? expandedIndex + 1 : 1) / itinerary.length) * 100}%`,
                background: "linear-gradient(90deg, #2d3a3a, #4a6060)",
              }}
            />
          </div>
          <span
            className="text-[10px] font-semibold flex-shrink-0"
            style={{ color: "#b8a5d8" }}
          >
            {itinerary.length} days
          </span>
        </div>
      </section>
    </>
  );
};

export default DetailedItinerary;
