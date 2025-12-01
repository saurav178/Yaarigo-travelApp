"use client";

export default function Suggestions() {
  return (

    <aside className="bg-white border border-neutral-200 shadow-soft  p-5 sticky top-5 mt-5" >
  {/* Create Button */}
  <button className="w-full mb-5 py-3 border-2 border-dashed border-orange-300 text-orange-600 font-semibold text-base hover:bg-orange-50 transition-all">
    + Create
  </button>

  {/* Smart Suggestions Section */}
  <div className="bg-neutral-50 border border-neutral-200  p-5">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      🌟 Smart Suggestions
    </h3>

    <ul className="space-y-3 text-sm text-neutral-700">
      <li className="hover:text-orange-600 cursor-pointer transition">🏕️ Budget backpacking in Vietnam</li>
      <li className="hover:text-orange-600 cursor-pointer transition">🧭 Solo female travel tips</li>
      <li className="hover:text-orange-600 cursor-pointer transition">🌤️ Best time to visit Moscow</li>
      <li className="hover:text-orange-600 cursor-pointer transition">📖 Travel Stories / Journals</li>
      <li className="hover:text-orange-600 cursor-pointer transition">💬 Discussion Forums</li>
      <li className="hover:text-orange-600 cursor-pointer transition">🎉 Events / Meetups</li>
    </ul>

    <div className="mt-5 border-t border-neutral-200 pt-4">
      <h4 className="font-semibold text-sm mb-2 text-neutral-800 flex items-center gap-1">
        🤖 AI Enhancements
      </h4>
      <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
        <li>Spam filtering & moderation</li>
        <li>Story summarization</li>
        <li>Personalized feed</li>
        <li>“Ask a Local” feature</li>
      </ul>
    </div>

    <div className="mt-5 border-t border-neutral-200 pt-4">
      <h4 className="font-semibold text-sm mb-2 text-neutral-800 flex items-center gap-1">
        🏆 Gamification
      </h4>
      <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
        <li>Badges</li>
        <li>Leaderboards</li>
        <li>Challenges</li>
      </ul>
    </div>
  </div>
</aside>
  );
}
