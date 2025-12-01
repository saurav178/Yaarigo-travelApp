
// import FeedCard from "./components/FeedCard";
// import Sidebar from "./components/Sidebar";
// import Suggestions from "./components/Suggestions";
// import { getPosts } from "./data/posts";

// export default function Page() {
//   // Generate exactly 10 posts
//   const posts = getPosts(10);

//   return (
//     <main className="container mx-auto px-4 py-6 mt-12">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Left */}
//         <div className="lg:col-span-3">
//           <Sidebar />
//         </div>

//         {/* Center feed */}
//         <div className="lg:col-span-6 space-y-4">
//           <div className="card p-4">
//             <div className="flex items-center justify-between">
//               <h1 className="text-3xl font-semibold">
//                 Trending feed{" "}
//                 <span className="text-sm text-neutral-500">(users share ↑)</span>
//               </h1>
//               <button className="btn">Sort</button>
//             </div>
//           </div>

//           {posts.map((p) => (
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

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import FeedCard from "./components/FeedCard";
import Sidebar from "./components/Sidebar";
import Suggestions from "./components/Suggestions";
import { getPosts } from "./data/posts";

type TabKey = "trending" | "qa" | "events" | "travel-twins" | "live";

export default function Page() {
  const search = useSearchParams();
  const activeTab = (search.get("tab") as TabKey) || "trending";

  // Generate exactly 10 posts once per render
  const posts = useMemo(() => getPosts(10), []);

  // Simple demo filters per tab — replace with real logic as needed
  const filtered = useMemo(() => {
    switch (activeTab) {
      case "qa":
        // e.g., show a few curated/Q&A style items
        return posts.slice(0, 3);
      case "events":
        // pretend "events" are posts that include a bestTime
        return posts.filter((p) => Boolean(p.bestTime));
      case "travel-twins":
        // e.g., show a few handpicked destinations
        return posts.filter((p) =>
          /meghalaya|kyoto|bali/i.test(p.location)
        );
      case "live":
        // a trimmed list for live updates
        return posts.slice(0, 5);
      case "trending":
      default:
        return posts;
    }
  }, [posts, activeTab]);

  return (
    <main className="container mx-auto px-4 py-6 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left */}
        <div className="lg:col-span-3">
          {/* Sidebar updates URL (?tab=...) and highlights active tab */}
          <Sidebar />
        </div>

        {/* Center feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
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
                <span className="text-sm text-neutral-500">
                  (users share ↑)
                </span>
              </h1>
              <button
                className="btn"
                onClick={() => {
                  // Placeholder sort; plug in your real sorter
                  // e.g., set state and re-order by time or likes
                  alert("Sorting options coming soon!");
                }}
              >
                Sort
              </button>
            </div>
          </div>

          {filtered.map((p) => (
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
