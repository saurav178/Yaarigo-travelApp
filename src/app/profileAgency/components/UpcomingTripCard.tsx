import { CalendarDays, Users, Clock, Wallet, TriangleAlert } from "lucide-react";

interface UpcomingTripCardProps {
  trip: {
    title: string;
    description: string;
    image: string;
    spotsLeft: number;
  };
}

export default function UpcomingTripCard({ trip }: UpcomingTripCardProps) {
  const tripDetails = [
    { icon: CalendarDays, text: "15/12/2025" },
    { icon: Users, text: "12/16" },
    { icon: Clock, text: "10 days" },
    { icon: Wallet, text: "₹750" },
  ];

  const tripTags = ["Entertainment", "Unexplored", "Entertainment"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-black overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-52 flex-shrink-0">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-56 md:h-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-[#1D4350] text-white px-1.5 py-0.5  rounded-2xl text-xs font-medium flex items-center gap-1">
            <TriangleAlert size={12} />
           {trip.spotsLeft} Spots left
          </span>
        </div>
        <div className="flex-1 p-5">
          <h3 className="text-lg font-bold mb-2 text-gray-900">{trip.title}</h3>
          <p className="text-gray-600 text-xs mb-3 leading-relaxed">
            {trip.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-3">
            {tripDetails.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-1">
                <Icon className="w-3.5 h-3.5 text-black" />
                <span className={i === 3 ? "font-medium" : ""}>{text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-6 mt-6">
            {tripTags.map((tag, i) => (
              <span
                key={i}
                className="border border-gray-700 px-2 py-0.5 rounded-full text-xs text-gray-500 font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
          <button className="bg-white border border-black hover:bg-[#1D4350] hover:text-white text-black text-xs px-8 py-2 rounded-md font-medium transition cursor-pointer">
            View Trip Details
          </button>
           <button className="bg-[#1D4350] hover:bg-[#1DA69B] text-white text-xs px-8 py-2 rounded-md font-medium transition cursor-pointer">
            Join Trip +
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
