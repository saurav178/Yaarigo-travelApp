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

// "use client";

// import { useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import FeedCard from "./components/FeedCard";
// import Sidebar from "./components/Sidebar";
// // import Suggestions from "./components/Suggestions";
// import { getPosts } from "./data/posts";

// type TabKey = "trending" | "qa" | "events" | "travel-twins" | "live";

// /** Parse "2h ago" | "5m ago" | "3d ago" | "45s ago" | "1w ago" into a Date */
// function parseRelative(s: string): Date {
//   const now = Date.now();
//   const m = s?.trim().match(/^(\d+)\s*([smhdw])\s*ago$/i);
//   if (!m) return new Date(0); // unknown -> treat as very old
//   const n = Number(m[1]);
//   const unit = m[2].toLowerCase();
//   const mult: Record<string, number> = {
//     s: 1000,
//     m: 60 * 1000,
//     h: 60 * 60 * 1000,
//     d: 24 * 60 * 60 * 1000,
//     w: 7 * 24 * 60 * 60 * 1000,
//   };
//   return new Date(now - n * (mult[unit] ?? 0));
// }

// export default function Page() {
//   const search = useSearchParams();
//   const activeTab = (search.get("tab") as TabKey) || "trending";

//   // Sort state: "new" (newest first) or "old" (oldest first)
//   const [sortBy, setSortBy] = useState<"new" | "old">("new");

//   // Generate exactly 10 posts once per render
//   const posts = useMemo(() => getPosts(10), []);

//   // Tab filter
//   const filtered = useMemo(() => {
//     switch (activeTab) {
//       case "qa":
//         return posts.slice(0, 3);
//       case "events":
//         return posts.filter((p) => Boolean(p.bestTime));
//       case "travel-twins":
//         return posts.filter((p) => /meghalaya|kyoto|bali/i.test(p.location));
//       case "live":
//         return posts.slice(0, 5);
//       case "trending":
//       default:
//         return posts;
//     }
//   }, [posts, activeTab]);

//   // Sort by time (based on `timeAgo`)
//   const sorted = useMemo(() => {
//     const copy = [...filtered];
//     copy.sort((a, b) => {
//       const ta = parseRelative(a.timeAgo).getTime();
//       const tb = parseRelative(b.timeAgo).getTime();
//       return sortBy === "new" ? tb - ta : ta - tb;
//     });
//     return copy;
//   }, [filtered, sortBy]);

//   return (
//     <main className="w-full mx-auto px-4 py-6 mt-12">
//       {/* container */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Left */}
//         <div className="lg:col-span-3">
//           <Sidebar />
//         </div>

//         {/* Center feed */}
//         <div className="lg:col-span-6 space-y-4">
//           <div className="card p-4">
//             <div className="flex items-center justify-between gap-3">
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
//                 <span className="text-sm text-neutral-500">(users share ↑)</span>
//               </h1>

//               <button
//                 className="btn cursor-pointer"
//                 onClick={() => setSortBy((s) => (s === "new" ? "old" : "new"))}
//                 title={`Sort by ${sortBy === "new" ? "oldest" : "newest"}`}
//               >
//                 Sort: {sortBy === "new" ? "Newest" : "Oldest"}
//               </button>
//             </div>
//           </div>

//           {sorted.map((p) => (
//             <FeedCard key={p.id} post={p} />
//           ))}

//           <div className="card p-10 text-center text-neutral-500">
//             (Traveller with post)
//           </div>
//         </div>

//         {/* Right */}
//         {/* <div className="lg:col-span-3">
//           <Suggestions />
//         </div> */}
//       </div>
//     </main>
//   );
// }


// "use client";

// import { useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import FeedCard from "./components/FeedCard";
// import Sidebar from "./components/Sidebar";
// import { getPosts } from "./data/posts";

// // Include the AI tabs so URL parsing doesn't break
// type TabKey =
//   | "trending"
//   | "qa"
//   | "events"
//   | "travel-twins"
//   | "live"
//   | "solo"
//   | "travel-stories"
//   | "ai-spam"
//   | "ai-summary"
//   | "ai-feed"
//   | "ai-local";

// /** Parse "2h ago" | "5m ago" | "3d ago" | "45s ago" | "1w ago" into a Date */
// function parseRelative(s: string): Date {
//   const now = Date.now();
//   const m = s?.trim().match(/^(\d+)\s*([smhdw])\s*ago$/i);
//   if (!m) return new Date(0); // unknown -> very old
//   const n = Number(m[1]);
//   const unit = m[2].toLowerCase();
//   const mult: Record<string, number> = {
//     s: 1000,
//     m: 60 * 1000,
//     h: 60 * 60 * 1000,
//     d: 24 * 60 * 60 * 1000,
//     w: 7 * 24 * 60 * 60 * 1000,
//   };
//   return new Date(now - n * (mult[unit] ?? 0));
// }

// export default function Page() {
//   const search = useSearchParams();
//   const activeTab = (search.get("tab") as TabKey) || "trending";

//   // Sort state: "new" (newest first) or "old" (oldest first)
//   const [sortBy, setSortBy] = useState<"new" | "old">("new");

//   // Generate exactly 10 posts once per render
//   const posts = useMemo(() => getPosts(10), []);

//   // Tab filter — unknown / AI tabs fall back to all posts (or tweak per need)
//   const filtered = useMemo(() => {
//     switch (activeTab) {
//       case "qa":
//         return posts.slice(0, 3);
//       case "events":
//         return posts.filter((p) => Boolean(p.bestTime));
//       case "travel-twins":
//         return posts.filter((p) => /meghalaya|kyoto|bali/i.test(p.location));
//       case "live":
//         return posts.slice(0, 5);
//       // AI tabs / solo / stories → default for now
//       case "ai-spam":
//       case "ai-summary":
//       case "ai-feed":
//       case "ai-local":
//       case "solo":
//       case "travel-stories":
//       case "trending":
//       default:
//         return posts;
//     }
//   }, [posts, activeTab]);

//   // Sort by time (based on `timeAgo`)
//   const sorted = useMemo(() => {
//     const copy = [...filtered];
//     copy.sort((a, b) => {
//       const ta = parseRelative(a.timeAgo).getTime();
//       const tb = parseRelative(b.timeAgo).getTime();
//       return sortBy === "new" ? tb - ta : ta - tb;
//     });
//     return copy;
//   }, [filtered, sortBy]);

//   const titleFor = (tab: TabKey): string => {
//     switch (tab) {
//       case "trending":
//         return "Trending feed";
//       case "qa":
//         return "Q&A Hub";
//       case "events":
//         return "Events / Meetups";
//       case "travel-twins":
//         return "Travel Twins";
//       case "live":
//         return "Live Updates";
//       case "solo":
//         return "Solo Female Travel";
//       case "travel-stories":
//         return "Travel Stories / Journals";
//       case "ai-spam":
//         return "AI • Spam Filtering";
//       case "ai-summary":
//         return "AI • Story Summarization";
//       case "ai-feed":
//         return "AI • Personalized Feed";
//       case "ai-local":
//         return "AI • Ask a Local";
//       default:
//         return "Community";
//     }
//   };

//   return (
//     <main className="min-h-screen w-full">
//       <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 pt-20 pb-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* Left */}
//           <div className="lg:col-span-3">
//             <Sidebar />
//           </div>

//           {/* Center feed */}
//           <div className="lg:col-span-6 space-y-4">
//             <div className="bg-white border border-neutral-200 rounded-md p-4 shadow-sm">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                 <h1 className="text-2xl md:text-3xl font-semibold">
//                   {titleFor(activeTab)}{" "}
//                   <span className="text-sm text-neutral-500">(users share ↑)</span>
//                 </h1>

//                 <button
//                   className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
//                   onClick={() => setSortBy((s) => (s === "new" ? "old" : "new"))}
//                   title={`Sort by ${sortBy === "new" ? "oldest" : "newest"}`}
//                 >
//                   Sort: {sortBy === "new" ? "Newest" : "Oldest"}
//                 </button>
//               </div>
//             </div>

//             {sorted.map((p) => (
//               <FeedCard key={p.id} post={p} />
//             ))}

//             <div className="bg-white border border-neutral-200 rounded-md p-10 text-center text-neutral-500">
//               (Traveller with post)
//             </div>
//           </div>

//           {/* Right spacer for future widgets (or remove) */}
//           <div className="lg:col-span-3 hidden lg:block" />
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
import { getPosts } from "./data/posts";

// include AI tabs so URL parsing is safe
type TabKey =
  | "trending"
  | "qa"
  | "events"
  | "travel-twins"
  | "live"
  | "solo"
  | "travel-stories"
  | "ai-spam"
  | "ai-summary"
  | "ai-feed"
  | "ai-local";

/** Parse "2h ago" | "5m ago" | "3d ago" | "45s ago" | "1w ago" into a Date */
function parseRelative(s: string): Date {
  const now = Date.now();
  const m = s?.trim().match(/^(\d+)\s*([smhdw])\s*ago$/i);
  if (!m) return new Date(0);
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

  const [sortBy, setSortBy] = useState<"new" | "old">("new");

  // Generate posts once
  const posts = useMemo(() => getPosts(10), []);

  // Tab filter (AI tabs currently show default feed)
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
      default:
        return posts;
    }
  }, [posts, activeTab]);

  // Sort by time
  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const ta = parseRelative(a.timeAgo).getTime();
      const tb = parseRelative(b.timeAgo).getTime();
      return sortBy === "new" ? tb - ta : ta - tb;
    });
    return copy;
  }, [filtered, sortBy]);

  const titleFor = (tab: TabKey): string => {
    switch (tab) {
      case "trending":
        return "Trending feed";
      case "qa":
        return "Q&A Hub";
      case "events":
        return "Events / Meetups";
      case "travel-twins":
        return "Travel Twins";
      case "live":
        return "Live Updates";
      case "solo":
        return "Solo Female Travel";
      case "travel-stories":
        return "Travel Stories / Journals";
      case "ai-spam":
        return "AI • Spam Filtering";
      case "ai-summary":
        return "AI • Story Summarization";
      case "ai-feed":
        return "AI • Personalized Feed";
      case "ai-local":
        return "AI • Ask a Local";
      default:
        return "Community";
    }
  };

  return (
    <main className="min-h-screen w-full bg-neutral-50">
      {/* Full-bleed wrapper, no max-width cap */}
      <div className="mx-auto max-w-none px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 pt-20 pb-12">
        {/* Wider grid: Sidebar 4 / Feed 8 on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
          {/* Left / Sidebar (wider) */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>

          {/* Center / Feed (wider) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white border border-neutral-200 rounded-md p-5 md:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {titleFor(activeTab)}{" "}
                  <span className="text-sm text-neutral-500">(users share ↑)</span>
                </h1>

                <button
                  className="inline-flex items-center justify-center  border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer"
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

            <div className="bg-white border border-neutral-200 rounded-md p-10 text-center text-neutral-500">
              (Traveller with post)
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
