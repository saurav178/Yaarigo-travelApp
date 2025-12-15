'use client';
"use client";

import { useState } from "react";
import { Post } from "../types/types";
import { Bookmark, Sun } from "lucide-react";
import Image from "next/image";

type LiveMeta = {
  isLive?: boolean;
  status?: string; // e.g. "Live now" | "Starts in 15m"
  attendees?: number;
};

export default function FeedCard({
  post,
  live, // For live view
  eventDate, // For events/meetups view (replaces Best time chip)
  showRSVP = false, // Show Follow/Join row even if not live
  rsvpAttendees, // Attendees count for RSVP row when not live
}: {
  post: Post;
  live?: LiveMeta;
  eventDate?: string;
  showRSVP?: boolean;
  rsvpAttendees?: number;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(() => seedLikes(post.id));

  // RSVP actions
  const [following, setFollowing] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((count) => (liked ? count - 1 : count + 1));
  };

  const handleComment = () => {
    alert(`💬 Comment feature coming soon!\nPost by ${post.author}`);
  };

  const handleShare = async () => {
    const shareData = {
      title: post.location,
      text: post.text,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else if (shareData.url) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("🔗 Link copied to clipboard!");
      } catch {
        alert("Copy failed. You can copy the URL from the address bar.");
      }
    }
  };

  // RSVP row should render for live, or when explicitly asked (events)
  const shouldShowRSVP = Boolean(live?.isLive) || showRSVP;
  const attendeeCount = live?.attendees ?? rsvpAttendees ?? 0;

  return (
    <article className="bg-white border border-neutral-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 w-full">
      <div className="flex items-start justify-between gap-4">
        {/* Text */}
        <div className="flex-1">
          {/* Top row: meta + bookmark */}
          <div className="flex items-start justify-between mb-2 gap-3">
            <div className="text-sm text-neutral-600">
              <span className="font-bold text-base text-neutral-800">
                {post.author}
              </span>{" "}
              • <span className="capitalize">{post.location}</span> •{" "}
              {post.timeAgo}
            </div>

            <button
              className="text-neutral-400 hover:text-neutral-700 transition"
              aria-label="Bookmark"
            >
              <Bookmark size={18} />
            </button>
          </div>

          {/* Live badge + RSVP OR Event RSVP (no badge) */}
          {shouldShowRSVP && (
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              {/* Left badge (only for live) */}
              {live?.isLive && (
                <span className="inline-flex items-center gap-2 text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  {live.status || "Live now"}
                </span>
              )}

              {/* Right RSVP controls */}
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <span className="px-2 py-1 rounded bg-neutral-100 border border-neutral-200">
                  {Number(attendeeCount).toLocaleString()} attending
                </span>

                <button
                  onClick={() => setFollowing((v) => !v)}
                  className={`px-3 py-1.5 rounded-md border text-xs transition ${
                    following
                      ? "bg-neutral-800 text-white border-neutral-800"
                      : "bg-white text-neutral-800 hover:bg-neutral-50 border-neutral-300"
                  }`}
                >
                  {following ? "Following" : "Follow"}
                </button>

                <button
                  onClick={() => setJoined((v) => !v)}
                  className={`px-3 py-1.5 rounded-md text-xs transition ${
                    joined
                      ? "bg-green-600 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {joined ? "Joined ✓" : "Join"}
                </button>
              </div>
            </div>
          )}

          {/* Body */}
          <p className="leading-relaxed text-neutral-800 text-[15px]">
            {post.text}
          </p>

          {/* Chips section */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            {/* If eventDate is provided, show it instead of Best time */}
            {eventDate ? (
              <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                📅 Event: {eventDate}
              </span>
            ) : (
              // Otherwise keep the Best time chip (if provided)
              post.bestTime && (
                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  <Sun size={14} /> Best time: {post.bestTime}
                </span>
              )
            )}

            {/* Keep/weather chip only if NOT an event (optional – remove if you don’t want it at all) */}
            {!eventDate && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                ☀️ Clear Weather
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-neutral-600">
            <button
              onClick={handleLike}
              className={`transition flex items-center gap-1 ${
                liked
                  ? "text-red-600 cursor-pointer"
                  : "hover:text-orange-600 cursor-pointer"
              }`}
            >
              {liked ? "❤️ Liked" : "🤍 Like"} ({likeCount})
            </button>

            <button
              onClick={handleComment}
              className="hover:text-blue-600 transition flex items-center gap-1 cursor-pointer"
            >
              💬 Comment
            </button>

            <button
              onClick={handleShare}
              className="hover:text-green-600 transition flex items-center gap-1 cursor-pointer"
            >
              🔗 Share
            </button>
          </div>
        </div>

        

        <div className="relative shrink-0 w-56 h-40 sm:w-64 sm:h-44 overflow-hidden border border-neutral-200 bg-neutral-100">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.location}
              fill
              sizes="256px"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
              📸 No Image
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/** Deterministic seed for likes */
function seedLikes(key: string) {
  let h = 5381;
  for (let i = 0; i < key.length; i++) h = (h << 5) + h + key.charCodeAt(i);
  const n = Math.abs(h) % 109; // 0..108
  return 12 + n; // 12..120
}
