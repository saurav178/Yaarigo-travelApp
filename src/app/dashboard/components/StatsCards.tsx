import Image from "next/image";
import { statsCards } from "../data";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 bg-gradient-to-br ${card.gradient}`}
        >
          <div className="flex items-center h-32">
            {/* Left Side - Curved Image */}
            <div className="relative w-1/3 h-full overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "ellipse(100% 100% at 0% 50%)",
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 px-6 py-4">
              <p className="text-white/90 text-sm font-medium mb-1">{card.title}</p>
              <p className="text-5xl font-bold text-white mb-1">{card.count}</p>
              <p className="text-xs text-white/80 font-medium">{card.subText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}