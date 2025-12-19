import Image from "next/image";
import { quickActionCards, smartSuggestions, liveAlerts } from "../data";

export default function QuickActions() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - 4 Action Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {quickActionCards.map((card, index) => (
            <button
              key={index}
              className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-800">{card.title}</h3>
                  {card.badge && (
                    <span className="px-2 py-1 bg-[#1DA69B] text-white text-xs rounded font-medium">
                      {card.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{card.description}</p>
                {card.subDescription && (
                  <p className="text-sm text-gray-500">{card.subDescription}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Right Side - Smart Suggestions & Live Alerts */}
        <div className="space-y-6">
          {/* Smart Suggestions */}
          <div className="bg-white shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#1DA69B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Smart Suggestions
            </h3>
            <div className="space-y-3">
              {smartSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={suggestion.iconPath}
                    />
                  </svg>
                  <span className="text-sm text-gray-600">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Alerts */}
          <div className="bg-white shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Live Alerts
            </h3>
            <div className="space-y-3">
              {liveAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 ${alert.bgColor}`}
                >
                  <svg
                    className={`w-4 h-4 ${alert.iconColor} mt-0.5 flex-shrink-0`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={alert.iconPath}
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{alert.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}