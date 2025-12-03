// "use client";

// import { useMemo } from "react";
// import { useSearchParams } from "next/navigation";

// import FeedCard from "./components/FeedCard";
// import Sidebar from "./components/Sidebar";
// import Suggestions from "./components/Suggestions";
// import { getPosts } from "./data/posts";

// type TabKey = "trending" | "qa" | "events" | "travel-twins" | "live";

// export default function Page() {
//   const search = useSearchParams();
//   const activeTab = (search.get("tab") as TabKey) || "trending";

//   // Generate exactly 10 posts once per render
//   const posts = useMemo(() => getPosts(10), []);

//   // Simple demo filters per tab — replace with real logic as needed
//   const filtered = useMemo(() => {
//     switch (activeTab) {
//       case "qa":
//         // e.g., show a few curated/Q&A style items
//         return posts.slice(0, 3);
//       case "events":
//         // pretend "events" are posts that include a bestTime
//         return posts.filter((p) => Boolean(p.bestTime));
//       case "travel-twins":
//         // e.g., show a few handpicked destinations
//         return posts.filter((p) =>
//           /meghalaya|kyoto|bali/i.test(p.location)
//         );
//       case "live":
//         // a trimmed list for live updates
//         return posts.slice(0, 5);
//       case "trending":
//       default:
//         return posts;
//     }
//   }, [posts, activeTab]);

//   return (
//     <main className="container mx-auto px-4 py-6 mt-12">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Left */}
//         <div className="lg:col-span-3">
//           {/* Sidebar updates URL (?tab=...) and highlights active tab */}
//           <Sidebar />
//         </div>

//         {/* Center feed */}
//         <div className="lg:col-span-6 space-y-4">
//           <div className="card p-4">
//             <div className="flex items-center justify-between">
//               <h1 className="text-3xl font-semibold">
//                 {activeTab === "trending"
//                   ? "Trending feed"
//                   : activeTab === "qa"
//                   ? "Q&A Hub"
//                   : activeTab === "events"
//                   ? "Events"
//                   : activeTab === "travel-twins"
//                   ? "Travel Twins"
//                   : "Live Updates"}{" "}
//                 <span className="text-sm text-neutral-500">
//                   (users share ↑)
//                 </span>
//               </h1>
//               <button
//                 className="btn"
//                 onClick={() => {
//                   // Placeholder sort; plug in your real sorter
//                   // e.g., set state and re-order by time or likes
//                   alert("Sorting options coming soon!");
//                 }}
//               >
//                 Sort
//               </button>
//             </div>
//           </div>

//           {filtered.map((p) => (
//             <FeedCard key={p.id} post={p} />
//           ))}

//           <div className="card p-10 text-center text-neutral-500">
//             (Traveller with post)
//           </div>
//         </div>

//         {/* Right */}
//         <div className="lg:col-span-3">
//           <Suggestions />
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import FeedCard from "./components/FeedCard";
import Sidebar from "./components/Sidebar";
import Suggestions from "./components/Suggestions";
import { getPosts } from "./data/posts";

type TabKey = "trending" | "qa" | "events" | "travel-twins" | "live";

/** Parse "2h ago" | "5m ago" | "3d ago" | "45s ago" | "1w ago" into a Date */
function parseRelative(s: string): Date {
  const now = Date.now();
  const m = s?.trim().match(/^(\d+)\s*([smhdw])\s*ago$/i);
  if (!m) return new Date(0); // unknown -> treat as very old
  const n = Number(m[1]);
  const unit = m[2].toLowerCase();
  const mult: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
  };
  return new Date(now - n * (mult[unit] ?? 0));
}

export default function Page() {
  const search = useSearchParams();
  const activeTab = (search.get("tab") as TabKey) || "trending";

  // Sort state: "new" (newest first) or "old" (oldest first)
  const [sortBy, setSortBy] = useState<"new" | "old">("new");

  // Generate exactly 10 posts once per render
  const posts = useMemo(() => getPosts(10), []);

  // Tab filter
  const filtered = useMemo(() => {
    switch (activeTab) {
      case "qa":
        return posts.slice(0, 3);
      case "events":
        return posts.filter((p) => Boolean(p.bestTime));
      case "travel-twins":
        return posts.filter((p) => /meghalaya|kyoto|bali/i.test(p.location));
      case "live":
        return posts.slice(0, 5);
      case "trending":
      default:
        return posts;
    }
  }, [posts, activeTab]);

  // Sort by time (based on `timeAgo`)
  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const ta = parseRelative(a.timeAgo).getTime();
      const tb = parseRelative(b.timeAgo).getTime();
      return sortBy === "new" ? tb - ta : ta - tb;
    });
    return copy;
  }, [filtered, sortBy]);

  return (
    <main className="w-full mx-auto px-4 py-6 mt-12">
      {/* container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left */}
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

        {/* Center feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-3xl font-semibold">
                {activeTab === "trending"
                  ? "Trending feed"
                  : activeTab === "qa"
                  ? "Q&A Hub"
                  : activeTab === "events"
                  ? "Events"
                  : activeTab === "travel-twins"
                  ? "Travel Twins"
                  : "Live Updates"}{" "}
                <span className="text-sm text-neutral-500">(users share ↑)</span>
              </h1>

              <button
                className="btn cursor-pointer"
                onClick={() => setSortBy((s) => (s === "new" ? "old" : "new"))}
                title={`Sort by ${sortBy === "new" ? "oldest" : "newest"}`}
              >
                Sort: {sortBy === "new" ? "Newest" : "Oldest"}
              </button>
            </div>
          </div>

          {sorted.map((p) => (
            <FeedCard key={p.id} post={p} />
          ))}

          <div className="card p-10 text-center text-neutral-500">
            (Traveller with post)
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-3">
          <Suggestions />
        </div>
      </div>
    </main>
  );
}
