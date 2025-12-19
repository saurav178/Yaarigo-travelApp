import Image from "next/image";
import { tabs, recommendedCards } from "../data";

export default function RecommendedSection() {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Sponsored
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              tab === "Hotels"
                ? "text-[#1DA69B] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1DA69B]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedCards.map((card, index) => (
          <div
            key={index}
            className="group bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
          >
            <div className="relative h-40 overflow-hidden flex-shrink-0">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{card.description}</p>
              {card.mainText && (
                <p className="text-base font-semibold text-gray-800 mb-4 flex-grow">
                  {card.mainText}
                </p>
              )}
              <button className={`w-full py-3 ${card.buttonStyle} font-semibold hover:shadow-lg transition-shadow text-sm mt-auto`}>
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}