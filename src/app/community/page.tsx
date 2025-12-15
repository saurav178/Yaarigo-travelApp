
"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import FeedCard from "./components/FeedCard";
import Sidebar from "./components/Sidebar";
import { getPosts } from "./data/posts";

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

// Separate component that uses useSearchParams
function CommunityContent() {
  const search = useSearchParams();
  const activeTab = (search.get("tab") as TabKey) || "trending";

  const [sortBy, setSortBy] = useState<"new" | "old">("new");

  // Generate posts once
  const posts = useMemo(() => getPosts(10), []);

  // Tab filter
  const filtered = useMemo(() => {
    switch (activeTab) {
      case "qa":
        return posts.slice(0, 3);
      case "events":
        // 🔹 now show 5 dynamic event cards
        return posts.slice(0, 5);
      case "travel-twins":
        return posts.filter((p) => /meghalaya|kyoto|bali/i.test(p.location));
      case "live":
        // exactly five live cards
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

  // simple rotating dates for events (you can swap for real data later)
  const eventDateFor = (index: number) => {
    const dates = [
      "Jan 12, 2026 • 6:00 PM IST",
      "Jan 15, 2026 • 7:30 PM IST",
      "Jan 20, 2026 • 5:00 PM IST",
      "Jan 24, 2026 • 6:45 PM IST",
      "Jan 28, 2026 • 8:00 PM IST",
    ];
    return dates[index % dates.length];
  };

  return (
    <main className="min-h-screen w-full bg-neutral-50">
      {/* Full-bleed wrapper */}
      <div className="mx-auto max-w-none px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>

          {/* Feed */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white border border-neutral-200 p-5 md:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {titleFor(activeTab)}{" "}
                  <span className="text-sm text-neutral-500">(users share ↑)</span>
                </h1>

                <button
                  className="inline-flex items-center justify-center border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer"
                  onClick={() => setSortBy((s) => (s === "new" ? "old" : "new"))}
                  title={`Sort by ${sortBy === "new" ? "oldest" : "newest"}`}
                >
                  Sort: {sortBy === "new" ? "Newest" : "Oldest"}
                </button>
              </div>
            </div>

            {sorted.map((p, i) => (
              <FeedCard
                key={p.id}
                post={p}
                /* LIVE: pass live meta so the red badge + RSVP appear */
                live={
                  activeTab === "live"
                    ? {
                        isLive: true,
                        status: i % 2 ? "Starts in 15m" : "Live now",
                        attendees: 150 + i * 25,
                      }
                    : undefined
                }
                /* EVENTS: now 5 cards, each with its own date; no live badge */
                eventDate={activeTab === "events" ? eventDateFor(i) : undefined}
                showRSVP={activeTab === "events" || activeTab === "live"}
                rsvpAttendees={activeTab === "events" ? 120 + i * 18 : undefined}
              />
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

// Main page component with Suspense wrapper
export default function Page() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-6 mt-12 text-center">
        <p className="text-lg text-gray-600">Loading community...</p>
      </div>
    }>
      <CommunityContent />
    </Suspense>
  );
}