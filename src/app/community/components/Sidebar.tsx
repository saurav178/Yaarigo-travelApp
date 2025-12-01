"use client";
import {
  Flame,
  MessageCircleQuestion,
  CalendarDays,
  Users,
  Radio,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="card h-fit p-4 sticky top-4">
      <h2 className="text-2xl font-semibold mb-3">Community</h2>

      <div className="space-y-3 px-4 py-3 bg-white  shadow-soft border border-neutral-200">
        <button className="w-full flex items-center gap-3 px-4 py-3  hover:bg-orange-50 transition border border-transparent hover:border-orange-200 cursor-pointer">
          <Flame size={20} className="text-orange-500" />
          <span className="font-medium text-neutral-800">Trending</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3  hover:bg-blue-50 transition border border-transparent hover:border-blue-200 cursor-pointer ">
          <MessageCircleQuestion size={20} className="text-blue-500" />
          <span className="font-medium text-neutral-800">Q&A Hub</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3  hover:bg-indigo-50 transition border border-transparent hover:border-indigo-200 cursor-pointer">
          <CalendarDays size={20} className="text-indigo-500" />
          <span className="font-medium text-neutral-800">Events</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3  hover:bg-green-50 transition border border-transparent hover:border-green-200 cursor-pointer">
          <Users size={20} className="text-green-500" />
          <span className="font-medium text-neutral-800">Travel Twins</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3  hover:bg-red-50 transition border border-transparent hover:border-red-200 cursor-pointer">
          <Radio size={20} className="text-red-500" />
          <span className="font-medium text-neutral-800">Live Updates</span>
        </button>
      </div>

      <div className="mt-6 bg-white border border-neutral-200 shadow-soft  p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
            🧭 Your Journey
          </h3>
          <span className="px-3 py-1 text-sm font-medium text-white bg gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-sm">
            Level 7
          </span>
        </div>

        <div className="text-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-neutral-600">Countries Visited</span>
            <span className="font-semibold text-neutral-900">23</span>
          </div>

          <div className="text-neutral-600 flex items-center gap-1">
            🎯{" "}
            <span>
              Next milestone:{" "}
              <span className="font-medium text-neutral-800">25 countries</span>
            </span>
          </div>

          <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg gradient-to-r from-orange-400 to-pink-500 w-[46%]"></div>
          </div>
        </div>

        <div className="mt-4 text-xs text-neutral-600 border-t border-neutral-100 pt-3 flex justify-between">
          <span>
            💬 Community Answers:{" "}
            <span className="font-semibold text-neutral-800">62</span>/50
            helpful
          </span>
          <span className="text-orange-500 font-medium">★ +8 bonus</span>
        </div>
      </div>

      
    </aside>
  );
}
