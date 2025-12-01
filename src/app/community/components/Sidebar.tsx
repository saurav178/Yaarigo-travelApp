

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Flame,
  MessageCircleQuestion,
  CalendarDays,
  Users,
  Radio,
  X,
  SendHorizonal,
} from "lucide-react";

type TabKey = "trending" | "qa" | "events" | "travel-twins" | "live";

export default function Sidebar() {
  const router = useRouter();
  const search = useSearchParams();

  // read active tab from URL; safely cast to union or fallback
  const active: TabKey =
    ((search.get("tab") as TabKey | null) ?? "trending");

  // --- Q&A Chat State ---
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const tabs: Array<{
    key: TabKey;
    label: string;
    icon: React.ReactElement;
    hover: string;
    border: string;
  }> = useMemo(
    () => [
      {
        key: "trending",
        label: "Trending",
        icon: <Flame size={20} className="text-orange-500" />,
        hover: "hover:bg-orange-50",
        border: "hover:border-orange-200",
      },
      {
        key: "qa",
        label: "Q&A Hub",
        icon: <MessageCircleQuestion size={20} className="text-blue-500" />,
        hover: "hover:bg-blue-50",
        border: "hover:border-blue-200",
      },
      {
        key: "events",
        label: "Events",
        icon: <CalendarDays size={20} className="text-indigo-500" />,
        hover: "hover:bg-indigo-50",
        border: "hover:border-indigo-200",
      },
      {
        key: "travel-twins",
        label: "Travel Twins",
        icon: <Users size={20} className="text-green-500" />,
        hover: "hover:bg-green-50",
        border: "hover:border-green-200",
      },
      {
        key: "live",
        label: "Live Updates",
        icon: <Radio size={20} className="text-red-500" />,
        hover: "hover:bg-red-50",
        border: "hover:border-red-200",
      },
    ],
    []
  );

  const go = useCallback(
    (key: TabKey) => {
      const params = new URLSearchParams(search.toString());
      params.set("tab", key); // key is TabKey (string literal union) → ok
      router.push(`?${params.toString()}`);

      // Toggle small chat when clicking Q&A
      if (key === "qa") setShowChat((prev) => !prev);
    },
    [router, search]
  );

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setChat((prev) => [...prev, trimmed]);
    setMessage("");
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="card h-fit p-4 sticky top-4">
        <h2 className="text-2xl font-semibold mb-3">Community</h2>

        <nav
          aria-label="Community navigation"
          className="space-y-3 px-4 py-3 bg-white shadow-soft border border-neutral-200"
        >
          {tabs.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => go(t.key)}
                className={[
                  "w-full flex items-center justify-between px-4 py-3 transition border cursor-pointer rounded-md",
                  t.hover,
                  t.border,
                  isActive
                    ? "bg-neutral-100 border-neutral-300"
                    : "border-transparent",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex items-center gap-3">
                  {t.icon}
                  <span
                    className={[
                      "font-medium",
                      isActive ? "text-neutral-900" : "text-neutral-800",
                    ].join(" ")}
                  >
                    {t.label}
                  </span>
                </span>

                {t.key === "live" && (
                  <span
                    className="flex items-center gap-1 text-xs"
                    aria-label="live status"
                  >
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-neutral-500">live</span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Journey Card */}
        <div className="mt-6 bg-white border border-neutral-200 shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
              🧭 Your Journey
            </h3>
            <span className="px-3 py-1 text-sm font-medium text-white bg-linear-to-r from-orange-500 to-pink-500 rounded-full shadow-sm">
              Level 7
            </span>
          </div>

          <div className="text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Countries Visited</span>
              <span className="font-semibold text-neutral-900">23</span>
            </div>

            <div className="text-neutral-600 flex items-center gap-1">
              <span>🎯</span>
              <span>
                Next milestone:{" "}
                <span className="font-medium text-neutral-800">25 countries</span>
              </span>
            </div>

            <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-orange-400 to-pink-500 w-[46%]" />
            </div>
          </div>

          <div className="mt-4 text-xs text-neutral-600 border-t border-neutral-100 pt-3 flex justify-between">
            <span>
              💬 Community Answers:{" "}
              <span className="font-semibold text-neutral-800">62</span>/50 helpful
            </span>
            <span className="text-orange-500 font-medium">★ +8 bonus</span>
          </div>
        </div>
      </aside>

      {/* Bottom-right floating chat box */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden animate-fadeIn z-50">
          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-medium flex items-center gap-2">
              <MessageCircleQuestion size={18} /> Q&A Chat
            </span>
            <button
              onClick={() => setShowChat(false)}
              className="hover:text-gray-200 transition"
              aria-label="Close chat"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 h-60 overflow-y-auto bg-neutral-50 space-y-2 text-sm">
            {chat.length === 0 ? (
              <p className="text-neutral-400 text-center mt-10">
                💬 Ask a question below!
              </p>
            ) : (
              chat.map((msg, i) => (
                <div
                  key={i}
                  className="bg-blue-100 text-blue-900 px-3 py-2 rounded-md w-fit max-w-[85%]"
                >
                  {msg}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-neutral-200 p-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-neutral-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 flex items-center gap-1"
            >
              <SendHorizonal size={14} />
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
