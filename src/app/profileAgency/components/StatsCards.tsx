interface Stat {
  value: string;
  label: string;
}

interface StatsCardsProps {
  stats: Stat[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 px-2 sm:px-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 md:p-10 text-center h-40 md:h-35 flex flex-col justify-center"
        >
          <div className="text-[#1D4350] text-2xl md:text-4xl font-bold mb-1">
            {stat.value}
          </div>
          <div className="text-gray-600 text-xs">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
