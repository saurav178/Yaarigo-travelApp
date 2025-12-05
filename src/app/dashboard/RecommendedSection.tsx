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
        {["Hotels", "Restaurants", "Adventure spots"].map((tab) => (
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
        {/* Luxury Hotels */}
        <div className="group bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
          <div className="relative h-40 overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
              alt="Luxury Hotels"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80";
              }}
            />
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Luxury Hotels</h3>
            <p className="text-sm text-gray-600 mb-1">Deal</p>
            <p className="text-base font-semibold text-gray-800 mb-4 flex-grow">
              Flat 30% off on Premium rooms
            </p>
            <button className="w-full py-3 bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white font-semibold hover:shadow-lg transition-shadow text-sm mt-auto">
              Book Now
            </button>
          </div>
        </div>

        {/* Famous Restaurants */}
        <div className="group bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
          <div className="relative h-40 overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"              alt="Famous Restaurants"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80";
              }}
            />
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Famous Restaurants</h3>
            <p className="text-sm text-gray-600 mb-1 flex-grow">
              Best local food & rating near you
            </p>
            <button className="w-full py-3 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors text-sm mt-auto">
              Explore
            </button>
          </div>
        </div>

        {/* Adventure Spot */}
        <div className="group bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
          <div className="relative h-40 overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
              alt="Adventure spot"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-5002d6d90dad?w=800&q=80";
              }}
            />
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Adventure spot</h3>
            <p className="text-sm text-gray-600 mb-1 flex-grow">
              Top ride, trek & activities
            </p>
            <button className="w-full py-3 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors text-sm mt-auto">
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}